/**
 * English4Kids — Interactive Speaking & Conversation Studio (talk.js)
 * -------------------------------------------------------------------
 * Dual-Mode Speaking Companion ("🎙️ Trò Chuyện Cùng Leo"):
 *  1. Roleplay Mode (100% Free, No API Key): 8 branching conversations (Pre-A1 -> B1)
 *     with real Microphone SpeechRecognition, friendly pronunciation scoring,
 *     listen-first suggestion chips, typing input, and +15 ⭐ rewards.
 *  2. AI Free Chat Mode (Optional Gemini Free Tier BYO API Key):
 *     Age/CEFR-adapted child-safe English conversation with Leo/Mimi/Toby/Lulu,
 *     automatic spoken audio, toggleable Vietnamese subtitles, and 3 smart reply chips.
 */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);

  const TALK_PREFS_KEY = 'e4k_talk_prefs_v1';
  const TALK_DONE_KEY = 'e4k_talk_completed_v1';

  const MASCOT_INFO = {
    leo:  { name: 'Sư tử Leo',  enName: 'Leo the friendly lion',   img: 'assets/art/painted_leo.webp',  bg: 'assets/art/painted_home_meadow.webp' },
    mimi: { name: 'Gấu trúc Mimi', enName: 'Mimi the gentle panda', img: 'assets/art/painted_mimi.webp', bg: 'assets/art/books/scene_valley_green.webp' },
    toby: { name: 'Cáo Toby',   enName: 'Toby the curious fox',    img: 'assets/art/painted_toby.webp', bg: 'assets/art/books/scene_forest.webp' },
    lulu: { name: 'Thỏ Lulu',   enName: 'Lulu the cheerful bunny', img: 'assets/art/painted_lulu.webp', bg: 'assets/art/books/scene_cottage.webp' }
  };

  let prefs = {
    showVi: true,
    geminiKey: '',
    geminiModel: 'gemini-2.5-flash',
    aiMascot: 'leo'
  };

  let completedMissions = new Set();
  let activeTab = 'roleplay'; // 'roleplay' | 'ai'
  let activeMission = null;
  let missionTurnIdx = 0;
  let missionMessages = [];
  let missionFinished = false;
  let missionBusy = false;

  let aiMessages = []; // { role: 'bot'|'user', en, vi?, praiseVi?, scoreTag?, viaMic? }
  let aiHistory = [];  // Gemini conversation history
  let aiSuggestions = [];
  let aiBusy = false;
  let aiStarsAwardedSession = 0;

  let recognition = null;
  let isListening = false;
  let micTargetMode = 'roleplay';

  /* ==========================================================================
     1. PERSISTENCE & HELPERS
     ========================================================================== */
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(TALK_PREFS_KEY);
      if (raw) prefs = { ...prefs, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    try {
      const rawDone = localStorage.getItem(TALK_DONE_KEY);
      if (rawDone) completedMissions = new Set(JSON.parse(rawDone) || []);
    } catch { completedMissions = new Set(); }
  }

  function savePrefs() {
    try { localStorage.setItem(TALK_PREFS_KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
  }

  function saveCompleted() {
    try { localStorage.setItem(TALK_DONE_KEY, JSON.stringify([...completedMissions])); } catch { /* ignore */ }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeWords(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^a-z0-9'\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
  }

  function awardStars(amount) {
    if (typeof state !== 'undefined' && amount > 0) {
      state.stars = (state.stars || 0) + amount;
      if (typeof saveProgress === 'function') saveProgress();
      if (typeof updateHeaderAndMissionUI === 'function') updateHeaderAndMissionUI();
    }
  }

  function syncViToggleUI() {
    const view = $('view-talk-studio');
    if (view) view.classList.toggle('talk-vi-hidden', !prefs.showVi);
    const btn = $('btn-talk-vi-toggle');
    if (btn) {
      btn.textContent = prefs.showVi ? '🇻🇳 Dịch Việt: Đang hiện' : '🙈 Dịch Việt: Đang ẩn';
      btn.classList.toggle('is-vi-off', !prefs.showVi);
      btn.setAttribute('aria-pressed', String(prefs.showVi));
    }
  }

  /* ==========================================================================
     2. MICROPHONE SPEECH RECOGNITION (Web Speech API)
     ========================================================================== */
  function getSpeechRecognitionCtor() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function stopMicListening() {
    isListening = false;
    if (recognition) {
      try { recognition.onresult = null; recognition.onerror = null; recognition.onend = null; recognition.stop(); } catch { /* ignore */ }
      recognition = null;
    }
    updateMicButtonsUI();
  }

  function updateMicButtonsUI(interimText = '') {
    ['btn-talk-mic', 'btn-ai-mic'].forEach(id => {
      const btn = $(id);
      if (!btn) return;
      const active = isListening && ((id === 'btn-talk-mic' && micTargetMode === 'roleplay') || (id === 'btn-ai-mic' && micTargetMode === 'ai'));
      btn.classList.toggle('is-listening', active);
      btn.innerHTML = active
        ? '<span class="mic-pulse">🔴</span> Đang nghe bé nói... (Bấm dừng)'
        : '<span class="mic-icon">🎙️</span> Bấm để nói tiếng Anh';
    });

    const liveId = micTargetMode === 'ai' ? 'ai-mic-live' : 'talk-mic-live';
    const liveEl = $(liveId);
    if (liveEl) {
      if (isListening) {
        liveEl.classList.remove('hidden');
        liveEl.textContent = interimText ? `🎙️ "${ interimText }"` : '🎙️ Bé cứ nói tự nhiên bằng tiếng Anh nhé...';
      } else if (!interimText) {
        liveEl.classList.add('hidden');
      }
    }
  }

  function startMicListening(mode, onFinalTranscript) {
    if (isListening) {
      stopMicListening();
      return;
    }
    const Ctor = getSpeechRecognitionCtor();
    const liveEl = $(mode === 'ai' ? 'ai-mic-live' : 'talk-mic-live');
    if (!Ctor) {
      if (liveEl) {
        liveEl.classList.remove('hidden');
        liveEl.textContent = 'ℹ️ Trình duyệt này chưa hỗ trợ Micro trực tiếp — bé hãy chạm thẻ gợi ý hoặc gõ câu trả lời bên dưới nhé!';
      }
      return;
    }

    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
    micTargetMode = mode;
    let finalTranscript = '';

    try {
      const rec = new Ctor();
      recognition = rec;
      rec.lang = 'en-US';
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.continuous = false;

      isListening = true;
      updateMicButtonsUI('');
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');

      rec.onresult = (ev) => {
        let interim = '';
        for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
          const text = ev.results[i][0]?.transcript || '';
          if (ev.results[i].isFinal) finalTranscript += `${ text } `;
          else interim += text;
        }
        updateMicButtonsUI((finalTranscript + interim).trim());
      };

      rec.onerror = (ev) => {
        const err = ev.error || '';
        isListening = false;
        recognition = null;
        updateMicButtonsUI('');
        if (liveEl) {
          liveEl.classList.remove('hidden');
          liveEl.textContent = err === 'not-allowed'
            ? '⚠️ Chưa cấp quyền Micro. Bé hãy cho phép trình duyệt dùng Micro hoặc chạm thẻ gợi ý bên dưới nhé!'
            : '🎙️ Chưa nghe rõ tiếng bé — bấm Micro thử nói lại hoặc chạm thẻ gợi ý nhé!';
        }
      };

      rec.onend = () => {
        const spoken = finalTranscript.trim();
        isListening = false;
        recognition = null;
        updateMicButtonsUI('');
        if (spoken && typeof onFinalTranscript === 'function') {
          onFinalTranscript(spoken);
        }
      };

      rec.start();
    } catch {
      isListening = false;
      recognition = null;
      updateMicButtonsUI('');
    }
  }

  /* ==========================================================================
     3. ROLEPLAY MODE (100% FREE — 8 BRANCHING MISSIONS)
     ========================================================================== */
  function matchUserUtterance(userText, turn) {
    const words = normalizeWords(userText);
    const wordSet = new Set(words);
    let bestOpt = null;
    let bestScore = 0;

    (turn.options || []).forEach(opt => {
      const optWords = normalizeWords(opt.en);
      const kwList = opt.keywords || [];
      let kwHits = 0;
      kwList.forEach(kw => {
        if (userText.toLowerCase().includes(kw.toLowerCase())) kwHits += 1;
      });
      let overlap = 0;
      optWords.forEach(w => { if (wordSet.has(w)) overlap += 1; });
      const ratio = optWords.length ? overlap / optWords.length : 0;
      const score = kwHits * 2 + ratio * 3;
      if (score > bestScore) {
        bestScore = score;
        bestOpt = opt;
      }
    });

    let praiseTag = '👍 Rất cố gắng!';
    if (bestScore >= 3.2 || words.length >= 4) praiseTag = '🌟 Nói cực rõ & tự nhiên!';
    else if (bestScore >= 1.5 || words.length >= 2) praiseTag = '👏 Phát âm rõ ràng!';

    if (bestOpt && bestScore >= 1.0) {
      return {
        replyEn: bestOpt.replyEn,
        replyVi: bestOpt.replyVi,
        praiseTag
      };
    }
    return {
      replyEn: turn.fallbackReplyEn || 'Awesome! You spoke English so well!',
      replyVi: turn.fallbackReplyVi || 'Tuyệt vời! Bạn nói tiếng Anh tốt lắm!',
      praiseTag
    };
  }

  function renderHomeTalkBanner() {
    const sub = $('home-talk-sub');
    if (sub && typeof TALK_MISSIONS !== 'undefined') {
      sub.textContent = `${ TALK_MISSIONS.length } tình huống nhập vai miễn phí + Micro nói thật & AI Gemini • Hoàn thành ${ completedMissions.size }/${ TALK_MISSIONS.length }`;
    }
  }

  function renderMissionGrid() {
    const grid = $('talk-missions-grid');
    if (!grid || typeof TALK_MISSIONS === 'undefined') return;
    grid.innerHTML = '';

    TALK_MISSIONS.forEach(m => {
      const done = completedMissions.has(m.id);
      const mascot = MASCOT_INFO[m.mascot] || MASCOT_INFO.leo;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `talk-mission-card ${ done ? 'is-done' : '' }`;
      card.style.setProperty('--tm-accent', m.accent);
      card.style.setProperty('--tm-soft', m.softBg);
      card.innerHTML = `
        <div class="talk-mission-visual">
          <img class="tm-bg" src="${ m.bg }" alt="" loading="lazy" decoding="async" draggable="false" />
          <img class="tm-mascot" src="${ mascot.img }" alt="${ escapeHtml(m.mascotName) }" loading="lazy" decoding="async" draggable="false" />
          <span class="book-level-badge cefr-${ m.level.toLowerCase() }">${ m.level }</span>
          <span class="tm-icon-pill">${ m.icon }</span>
          ${ done ? '<span class="book-done-badge">⭐ Đã xong</span>' : '' }
        </div>
        <div class="talk-mission-body">
          <strong>${ escapeHtml(m.titleVi) }</strong>
          <span class="tm-en">${ escapeHtml(m.titleEn) }</span>
          <p>${ escapeHtml(m.descVi) }</p>
          <div class="tm-foot">
            <span>🎭 ${ m.turns.length } lượt hội thoại • 🎙️ Micro</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        startRoleplayMission(m.id);
      });
      grid.appendChild(card);
    });
  }

  function startRoleplayMission(missionId) {
    const m = (typeof TALK_MISSIONS !== 'undefined' ? TALK_MISSIONS : []).find(x => x.id === missionId);
    if (!m) return;
    stopMicListening();
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();

    activeMission = m;
    missionTurnIdx = 0;
    missionFinished = false;
    missionBusy = false;
    missionMessages = [];

    $('talk-roleplay-hub')?.classList.add('hidden');
    $('talk-roleplay-room')?.classList.remove('hidden');

    const mascot = MASCOT_INFO[m.mascot] || MASCOT_INFO.leo;
    const bgEl = $('talk-room-bg');
    if (bgEl) bgEl.src = m.bg;
    const avatarEl = $('talk-room-avatar');
    if (avatarEl) { avatarEl.src = mascot.img; avatarEl.alt = m.mascotName; }
    const nameEl = $('talk-room-mascot-name');
    if (nameEl) nameEl.textContent = `${ m.mascotName } • ${ m.titleVi }`;
    const badgeEl = $('talk-room-level');
    if (badgeEl) badgeEl.textContent = `${ m.level } • Lượt 1/${ m.turns.length }`;

    const firstTurn = m.turns[0];
    missionMessages.push({ role: 'bot', en: firstTurn.botEn, vi: firstTurn.botVi });
    renderRoleplayMessages();
    renderRoleplaySuggestions();
    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(firstTurn.botEn, 0.93);
    }
  }

  function exitRoleplayMission() {
    stopMicListening();
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
    activeMission = null;
    $('talk-roleplay-room')?.classList.add('hidden');
    $('talk-roleplay-hub')?.classList.remove('hidden');
    renderMissionGrid();
    renderHomeTalkBanner();
  }

  function renderChatList(containerId, list, mascotInfo) {
    const box = $(containerId);
    if (!box) return;
    box.innerHTML = list.map((msg, idx) => {
      if (msg.role === 'user') {
        return `
          <div class="talk-bubble is-user">
            <div class="tb-main">
              <p class="tb-en">${ msg.viaMic ? '🎙️ ' : '' }${ escapeHtml(msg.en) }</p>
              ${ msg.scoreTag ? `<span class="tb-score">${ escapeHtml(msg.scoreTag) }</span>` : '' }
            </div>
          </div>
        `;
      }
      return `
        <div class="talk-bubble is-bot">
          <img class="tb-mini-avatar" src="${ mascotInfo.img }" alt="" draggable="false" />
          <div class="tb-main">
            <div class="tb-row-top">
              <p class="tb-en">${ escapeHtml(msg.en) }</p>
              <button type="button" class="tb-replay-btn" data-replay-idx="${ idx }" title="Nghe lại câu này" aria-label="Nghe lại">🔊</button>
            </div>
            ${ msg.vi ? `<p class="tb-vi">${ escapeHtml(msg.vi) }</p>` : '' }
            ${ msg.praiseVi ? `<span class="tb-praise">💡 ${ escapeHtml(msg.praiseVi) }</span>` : '' }
          </div>
        </div>
      `;
    }).join('');

    box.querySelectorAll('[data-replay-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = list[Number(btn.dataset.replayIdx)];
        if (m && m.en && typeof window.speakEnglish === 'function') {
          window.speakEnglish(m.en, 0.92);
        }
      });
    });

    box.scrollTop = box.scrollHeight;
  }

  function renderRoleplayMessages() {
    if (!activeMission) return;
    const mascot = MASCOT_INFO[activeMission.mascot] || MASCOT_INFO.leo;
    renderChatList('talk-messages', missionMessages, mascot);
  }

  function renderRoleplaySuggestions() {
    const sugBox = $('talk-suggestions');
    const doneBox = $('talk-mission-done');
    const inputBar = $('talk-input-bar');
    if (!sugBox || !activeMission) return;

    if (missionFinished) {
      sugBox.innerHTML = '';
      inputBar?.classList.add('hidden');
      doneBox?.classList.remove('hidden');
      return;
    }

    inputBar?.classList.remove('hidden');
    doneBox?.classList.add('hidden');

    const turn = activeMission.turns[missionTurnIdx];
    const badgeEl = $('talk-room-level');
    if (badgeEl) badgeEl.textContent = `${ activeMission.level } • Lượt ${ missionTurnIdx + 1 }/${ activeMission.turns.length }`;

    sugBox.innerHTML = (turn?.options || []).map((opt, idx) => `
      <div class="talk-chip-wrap">
        <button type="button" class="talk-chip-listen" data-opt-listen="${ idx }" title="Nghe mẫu trước" aria-label="Nghe mẫu">🔊</button>
        <button type="button" class="talk-chip-send" data-opt-send="${ idx }">
          <span class="tc-en">${ opt.icon || '💬' } ${ escapeHtml(opt.en) }</span>
          <span class="tc-vi">${ escapeHtml(opt.vi) }</span>
        </button>
      </div>
    `).join('');

    sugBox.querySelectorAll('[data-opt-listen]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opt = turn.options[Number(btn.dataset.optListen)];
        if (opt && typeof window.speakEnglish === 'function') {
          window.speakEnglish(opt.en, 0.88);
        }
      });
    });

    sugBox.querySelectorAll('[data-opt-send]').forEach(btn => {
      btn.addEventListener('click', () => {
        const opt = turn.options[Number(btn.dataset.optSend)];
        if (opt) handleRoleplayUserReply(opt.en, false, opt);
      });
    });
  }

  function handleRoleplayUserReply(userText, viaMic = false, exactOption = null) {
    if (!activeMission || missionFinished || missionBusy) return;
    const cleaned = String(userText || '').trim();
    if (!cleaned) return;
    missionBusy = true;

    const turn = activeMission.turns[missionTurnIdx];
    const matched = exactOption
      ? { replyEn: exactOption.replyEn, replyVi: exactOption.replyVi, praiseTag: viaMic ? '🌟 Phát âm chuẩn!' : '✨ Trả lời rất hay!' }
      : matchUserUtterance(cleaned, turn);

    if (typeof playSoundEffect === 'function') playSoundEffect('correct');
    missionMessages.push({
      role: 'user',
      en: cleaned,
      viaMic,
      scoreTag: matched.praiseTag
    });
    renderRoleplayMessages();

    // Advance turn
    const isLast = missionTurnIdx >= activeMission.turns.length - 1;
    setTimeout(() => {
      if (!activeMission) { missionBusy = false; return; }
      let nextBotEn = matched.replyEn;
      let nextBotVi = matched.replyVi;

      if (!isLast) {
        missionTurnIdx += 1;
        const nextTurn = activeMission.turns[missionTurnIdx];
        nextBotEn = `${ matched.replyEn } ${ nextTurn.botEn }`;
        nextBotVi = `${ matched.replyVi } ${ nextTurn.botVi }`;
        missionMessages.push({ role: 'bot', en: nextBotEn, vi: nextBotVi });
        missionBusy = false;
        renderRoleplayMessages();
        renderRoleplaySuggestions();
        if (typeof window.speakEnglish === 'function') window.speakEnglish(nextBotEn, 0.93);
      } else {
        missionMessages.push({ role: 'bot', en: nextBotEn, vi: nextBotVi });
        missionFinished = true;
        missionBusy = false;

        const firstTime = !completedMissions.has(activeMission.id);
        completedMissions.add(activeMission.id);
        saveCompleted();
        const bonus = firstTime ? 15 : 5;
        awardStars(bonus);
        if (typeof playSoundEffect === 'function') playSoundEffect('win');
        if (typeof launchConfetti === 'function') launchConfetti(60);

        const rewardEl = $('talk-done-reward');
        if (rewardEl) {
          rewardEl.textContent = `🎉 Tuyệt vời! Bé nhận được +${ bonus } ⭐ Sao thưởng luyện nói!`;
        }
        renderRoleplayMessages();
        renderRoleplaySuggestions();
        renderHomeTalkBanner();
        if (typeof window.speakEnglish === 'function') window.speakEnglish(nextBotEn, 0.93);
      }
    }, 320);
  }

  /* ==========================================================================
     4. AI FREE CHAT MODE (Optional Gemini Free Tier BYO API Key)
     ========================================================================== */
  function getChildContextForPrompt() {
    const prof = typeof window.getActiveProfile === 'function' ? window.getActiveProfile() : null;
    const ag = typeof window.getActiveAgeGroup === 'function' ? window.getActiveAgeGroup() : null;
    const childName = (prof && prof.name) ? prof.name : 'my friend';
    const levels = (ag && Array.isArray(ag.levels) && ag.levels.length) ? ag.levels.join('–') : 'Pre-A1–A1';
    const ageLabel = (ag && ag.label) ? ag.label : '6–8 years old';
    return { childName, levels, ageLabel };
  }

  function buildGeminiSystemPrompt() {
    const mascot = MASCOT_INFO[prefs.aiMascot] || MASCOT_INFO.leo;
    const { childName, levels, ageLabel } = getChildContextForPrompt();
    return [
      `You are ${ mascot.enName }, a warm, playful, encouraging English speaking companion for a Vietnamese child named "${ childName }" (age group: ${ ageLabel }, CEFR level: ${ levels }).`,
      'Rules:',
      '1. Keep every reply 100% child-safe, wholesome, upbeat, and cheerful.',
      '2. Match the CEFR level strictly: use short, natural spoken English (1 to 2 simple sentences for Pre-A1/A1, 2 to 3 sentences for A2/B1/B2), and end with one fun easy question to keep the child talking.',
      '3. If the child makes a small grammar or spelling mistake, never scold; gently model the natural phrasing inside your reply and put a tiny friendly tip in Vietnamese inside "praiseVi".',
      '4. Always return ONLY valid JSON matching this exact schema:',
      '{"replyEn":"...","replyVi":"Natural Vietnamese translation of replyEn","praiseVi":"Short encouraging Vietnamese compliment or gentle tip (max 14 words)","suggestions":[{"en":"short easy reply 1","vi":"nghĩa tiếng Việt"},{"en":"short easy reply 2","vi":"nghĩa tiếng Việt"},{"en":"short easy reply 3","vi":"nghĩa tiếng Việt"}]}'
    ].join('\n');
  }

  function parseGeminiJson(rawText) {
    const cleaned = String(rawText || '').trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
    try {
      const obj = JSON.parse(cleaned);
      if (obj && obj.replyEn) return obj;
    } catch { /* fallback below */ }
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        const obj = JSON.parse(cleaned.slice(start, end + 1));
        if (obj && obj.replyEn) return obj;
      } catch { /* fallback below */ }
    }
    return {
      replyEn: cleaned.slice(0, 260) || 'That sounds wonderful! Tell me more!',
      replyVi: '',
      praiseVi: 'Bé luyện nói rất tốt!',
      suggestions: []
    };
  }

  async function callGeminiFreeChat(userText) {
    const key = (prefs.geminiKey || '').trim();
    if (!key) throw new Error('NO_KEY');

    const model = prefs.geminiModel || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${ encodeURIComponent(model) }:generateContent?key=${ encodeURIComponent(key) }`;

    const contents = [
      ...aiHistory.slice(-10),
      { role: 'user', parts: [{ text: userText }] }
    ];

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 16000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildGeminiSystemPrompt() }] },
          contents,
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 360,
            responseMimeType: 'application/json'
          }
        })
      });
      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        if (res.status === 400 || res.status === 403) throw new Error('BAD_KEY');
        if (res.status === 429) throw new Error('RATE_LIMIT');
        throw new Error(`HTTP_${ res.status }:${ errBody.slice(0, 80) }`);
      }
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const parsed = parseGeminiJson(raw);
      aiHistory.push({ role: 'user', parts: [{ text: userText }] });
      aiHistory.push({ role: 'model', parts: [{ text: JSON.stringify(parsed) }] });
      return parsed;
    } finally {
      clearTimeout(timer);
    }
  }

  function resetAiChat() {
    const mascot = MASCOT_INFO[prefs.aiMascot] || MASCOT_INFO.leo;
    const { childName } = getChildContextForPrompt();
    aiHistory = [];
    aiMessages = [{
      role: 'bot',
      en: `Hi ${ childName }! I am ${ mascot.enName.split(' ')[0] }. What would you like to talk about in English today?`,
      vi: `Chào ${ childName }! Tớ là ${ mascot.name }. Hôm nay bạn muốn trò chuyện tiếng Anh về chủ đề gì nào?`
    }];
    aiSuggestions = (typeof TALK_AI_STARTERS !== 'undefined' ? TALK_AI_STARTERS : []).slice();
    renderAiStage();
  }

  function renderAiStage() {
    const mascot = MASCOT_INFO[prefs.aiMascot] || MASCOT_INFO.leo;
    const bgEl = $('ai-room-bg');
    if (bgEl) bgEl.src = mascot.bg;
    const avEl = $('ai-room-avatar');
    if (avEl) { avEl.src = mascot.img; avEl.alt = mascot.name; }
    const nameEl = $('ai-room-mascot-name');
    if (nameEl) nameEl.textContent = `${ mascot.name } • Trò chuyện AI tự do`;

    const badge = $('ai-key-status-badge');
    if (badge) {
      if (prefs.geminiKey) {
        badge.className = 'voice-kokoro-badge is-ready';
        badge.textContent = `✅ Đã kết nối Gemini (${ prefs.geminiModel })`;
      } else {
        badge.className = 'voice-kokoro-badge';
        badge.textContent = '🔑 Chưa dán Gemini API Key (miễn phí tại Google AI Studio)';
      }
    }

    renderChatList('ai-messages', aiMessages, mascot);

    const sugBox = $('ai-suggestions');
    if (sugBox) {
      sugBox.innerHTML = aiSuggestions.map((opt, idx) => `
        <div class="talk-chip-wrap">
          <button type="button" class="talk-chip-listen" data-ai-listen="${ idx }" title="Nghe mẫu trước" aria-label="Nghe mẫu">🔊</button>
          <button type="button" class="talk-chip-send" data-ai-send="${ idx }">
            <span class="tc-en">${ opt.icon || '✨' } ${ escapeHtml(opt.en) }</span>
            <span class="tc-vi">${ escapeHtml(opt.vi || '') }</span>
          </button>
        </div>
      `).join('');

      sugBox.querySelectorAll('[data-ai-listen]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const opt = aiSuggestions[Number(btn.dataset.aiListen)];
          if (opt && typeof window.speakEnglish === 'function') window.speakEnglish(opt.en, 0.9);
        });
      });
      sugBox.querySelectorAll('[data-ai-send]').forEach(btn => {
        btn.addEventListener('click', () => {
          const opt = aiSuggestions[Number(btn.dataset.aiSend)];
          if (opt) handleAiUserMessage(opt.en, false);
        });
      });
    }
  }

  async function handleAiUserMessage(userText, viaMic = false) {
    const cleaned = String(userText || '').trim();
    if (!cleaned || aiBusy) return;

    if (!prefs.geminiKey) {
      const guide = $('talk-ai-config-details');
      if (guide) guide.open = true;
      const errEl = $('talk-ai-status');
      if (errEl) errEl.textContent = '🔑 Bạn cần dán Gemini API Key miễn phí bên trên (hoặc chuyển sang tab "🎭 Nhập vai miễn phí" dùng ngay không cần Key nhé!).';
      return;
    }

    aiBusy = true;
    aiMessages.push({ role: 'user', en: cleaned, viaMic });
    renderAiStage();
    const typingEl = $('ai-typing-indicator');
    typingEl?.classList.remove('hidden');

    try {
      const reply = await callGeminiFreeChat(cleaned);
      aiMessages.push({
        role: 'bot',
        en: reply.replyEn,
        vi: reply.replyVi || '',
        praiseVi: reply.praiseVi || ''
      });
      if (Array.isArray(reply.suggestions) && reply.suggestions.length) {
        aiSuggestions = reply.suggestions.slice(0, 3);
      }
      if (aiStarsAwardedSession < 20) {
        aiStarsAwardedSession += 2;
        awardStars(2);
      }
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      renderAiStage();
      if (typeof window.speakEnglish === 'function') {
        window.speakEnglish(reply.replyEn, 0.93);
      }
    } catch (err) {
      const code = String(err?.message || '');
      let msgVi = 'Không kết nối được Gemini lúc này. Kiểm tra lại mạng hoặc thử lại sau nhé!';
      if (code === 'BAD_KEY') msgVi = 'API Key chưa đúng hoặc đã bị thu hồi. Bạn kiểm tra lại Key từ Google AI Studio nhé!';
      else if (code === 'RATE_LIMIT') msgVi = 'Gói miễn phí Gemini vừa chạm giới hạn phút — bé đợi 15 giây rồi nói tiếp, hoặc dùng tab Nhập vai miễn phí nhé!';
      aiMessages.push({
        role: 'bot',
        en: 'Oops! I could not hear the cloud right now. Let us try again!',
        vi: msgVi
      });
      renderAiStage();
    } finally {
      typingEl?.classList.add('hidden');
      aiBusy = false;
    }
  }

  /* ==========================================================================
     5. NAVIGATION, TABS & EVENT WIRING
     ========================================================================== */
  function switchTalkTab(tab) {
    stopMicListening();
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
    activeTab = tab === 'ai' ? 'ai' : 'roleplay';

    document.querySelectorAll('#talk-mode-tabs [data-talk-tab]').forEach(btn => {
      const on = btn.dataset.talkTab === activeTab;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    $('talk-pane-roleplay')?.classList.toggle('hidden', activeTab !== 'roleplay');
    $('talk-pane-ai')?.classList.toggle('hidden', activeTab !== 'ai');

    if (activeTab === 'ai' && !aiMessages.length) {
      resetAiChat();
    } else if (activeTab === 'ai') {
      renderAiStage();
    }
  }

  window.openTalkStudio = function (initialTab = 'roleplay') {
    stopMicListening();
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
    if (typeof openView === 'function') openView('view-talk-studio');
    syncViToggleUI();
    renderMissionGrid();
    switchTalkTab(initialTab);
    if (initialTab === 'roleplay') {
      $('talk-roleplay-room')?.classList.add('hidden');
      $('talk-roleplay-hub')?.classList.remove('hidden');
      activeMission = null;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function bindTalkEvents() {
    loadPrefs();
    syncViToggleUI();
    renderHomeTalkBanner();
    renderMissionGrid();

    // Home banner quick launchers
    $('btn-home-open-talk')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      window.openTalkStudio('roleplay');
    });
    $('btn-home-open-talk-ai')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      window.openTalkStudio('ai');
    });

    // Studio Back button
    $('btn-talk-back')?.addEventListener('click', () => {
      if (activeTab === 'roleplay' && activeMission) {
        exitRoleplayMission();
        return;
      }
      stopMicListening();
      if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
      if (typeof openView === 'function') openView('view-home');
    });

    // Vietnamese toggle
    $('btn-talk-vi-toggle')?.addEventListener('click', () => {
      prefs.showVi = !prefs.showVi;
      savePrefs();
      syncViToggleUI();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
    });

    // Mode tabs (Free Roleplay vs AI Free Chat)
    document.querySelectorAll('#talk-mode-tabs [data-talk-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        switchTalkTab(btn.dataset.talkTab);
      });
    });

    // Roleplay Room controls
    $('btn-talk-exit-mission')?.addEventListener('click', exitRoleplayMission);
    $('btn-talk-done-again')?.addEventListener('click', () => {
      if (activeMission) startRoleplayMission(activeMission.id);
    });
    $('btn-talk-done-list')?.addEventListener('click', exitRoleplayMission);

    $('btn-talk-mic')?.addEventListener('click', () => {
      startMicListening('roleplay', (spoken) => handleRoleplayUserReply(spoken, true));
    });

    const rpForm = $('talk-text-form');
    if (rpForm) {
      rpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = $('talk-text-input');
        if (!inp || !inp.value.trim()) return;
        const val = inp.value.trim();
        inp.value = '';
        handleRoleplayUserReply(val, false);
      });
    }

    // AI Mode controls
    const keyInp = $('talk-gemini-key');
    const modSel = $('talk-gemini-model');
    if (keyInp) keyInp.value = prefs.geminiKey || '';
    if (modSel) modSel.value = prefs.geminiModel || 'gemini-2.5-flash';

    document.querySelectorAll('#talk-ai-mascots [data-ai-mascot]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.aiMascot === prefs.aiMascot);
      btn.addEventListener('click', () => {
        prefs.aiMascot = btn.dataset.aiMascot || 'leo';
        savePrefs();
        document.querySelectorAll('#talk-ai-mascots [data-ai-mascot]').forEach(b => {
          b.classList.toggle('active', b.dataset.aiMascot === prefs.aiMascot);
        });
        resetAiChat();
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      });
    });

    $('btn-save-gemini-key')?.addEventListener('click', () => {
      prefs.geminiKey = ($('talk-gemini-key')?.value || '').trim();
      prefs.geminiModel = $('talk-gemini-model')?.value || 'gemini-2.5-flash';
      savePrefs();
      renderAiStage();
      if (typeof playSoundEffect === 'function') playSoundEffect('star');
      const st = $('talk-ai-status');
      if (st) {
        st.textContent = prefs.geminiKey
          ? '✅ Đã lưu Gemini API Key trên máy! Bé bấm Micro hoặc chọn gợi ý bên dưới để trò chuyện ngay.'
          : 'ℹ️ Đã xóa API Key. Bé vẫn có thể dùng thoải mái tab "🎭 Nhập vai miễn phí" nhé!';
      }
      if (prefs.geminiKey) {
        const det = $('talk-ai-config-details');
        if (det) det.open = false;
      }
    });

    $('btn-ai-reset')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      resetAiChat();
    });

    $('btn-ai-mic')?.addEventListener('click', () => {
      startMicListening('ai', (spoken) => handleAiUserMessage(spoken, true));
    });

    const aiForm = $('ai-text-form');
    if (aiForm) {
      aiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = $('ai-text-input');
        if (!inp || !inp.value.trim()) return;
        const val = inp.value.trim();
        inp.value = '';
        handleAiUserMessage(val, false);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', bindTalkEvents);
})();
