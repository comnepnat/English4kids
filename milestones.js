/**
 * English4Kids - CEFR Milestone Level Tests & Placement Exam
 * Features:
 * - 1 Placement Test (Pre-A1 -> B2) + 15 Structured Milestone Checkpoints (3 per CEFR Level)
 * - 5 Mixed Interactive Question Types: Listening, Reading, Sentence Cloze, Spelling Tiles, Speed True/False
 * - Gamified HUD: Progress Bar, 5 Hearts, Combo Streak, Timer, Instant Feedback Drawer
 * - 4-Skill Score Report, CEFR Certificates, and 1-Tap Push Mistakes to Spaced Repetition SRS
 */
(function () {
  const MAX_HEARTS = 5;
  const PASS_THRESHOLD = 80; // 80% to pass a CEFR Milestone

  const exam = {
    active: false,
    def: null,
    questions: [],
    currentIndex: 0,
    hearts: MAX_HEARTS,
    practiceNoHeartLoss: false,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,
    answered: false,
    mistakes: [],
    skillStats: {},
    levelStats: {}, // for placement test
    startTime: 0,
    timerId: null,
    // Spelling tile state
    spellingSelected: [],
    spellingTiles: []
  };

  const $ = id => document.getElementById(id);

  function ensureMilestoneState() {
    if (!state.milestones || typeof state.milestones !== 'object') {
      state.milestones = { results: {}, placement: null };
    }
    if (!state.milestones.results || typeof state.milestones.results !== 'object') {
      state.milestones.results = {};
    }
    return state.milestones;
  }

  /* ------------------------------------------------------------------
     Build Dynamic 15 Milestone Definitions + 1 Placement Test
     ------------------------------------------------------------------ */
  function getMilestoneDefinitions() {
    const list = [];
    CEFR_LEVELS.forEach(lvl => {
      const lvlTopics = TOPICS_DATA.filter(t => t.level === lvl.id);
      const mid = Math.ceil(lvlTopics.length / 2);
      const firstHalf = lvlTopics.slice(0, mid);
      const secondHalf = lvlTopics.slice(mid);
      const firstCards = firstHalf.flatMap(t => t.cards.map(c => ({ ...c, level: lvl.id, topicTitleVi: t.titleVi })));
      const secondCards = secondHalf.flatMap(t => t.cards.map(c => ({ ...c, level: lvl.id, topicTitleVi: t.titleVi })));
      const allCards = [...firstCards, ...secondCards];

      list.push({
        id: `m_${ lvl.id }_1`,
        level: lvl.id,
        tier: 'stage1',
        title: `Mốc ${ lvl.name } — Chặng 1`,
        shortLabel: 'Mốc 1',
        icon: '🚩',
        subtitle: firstHalf.map(t => t.icon).join(' ') + ` (${ firstHalf.length } chủ đề đầu • ${ firstCards.length } từ)`,
        questionCount: 10,
        rewardStars: 10,
        pool: firstCards,
        color: lvl.color,
        bg: lvl.bg
      });

      list.push({
        id: `m_${ lvl.id }_2`,
        level: lvl.id,
        tier: 'stage2',
        title: `Mốc ${ lvl.name } — Chặng 2`,
        shortLabel: 'Mốc 2',
        icon: '🏁',
        subtitle: secondHalf.map(t => t.icon).join(' ') + ` (${ secondHalf.length } chủ đề sau • ${ secondCards.length } từ)`,
        questionCount: 10,
        rewardStars: 10,
        pool: secondCards,
        color: lvl.color,
        bg: lvl.bg
      });

      list.push({
        id: `m_${ lvl.id }_boss`,
        level: lvl.id,
        tier: 'boss',
        title: `Vượt Mốc Trình Độ ${ lvl.name }`,
        shortLabel: `Thi Vượt Mốc ${ lvl.name }`,
        icon: '👑',
        subtitle: `Tổng hợp toàn bộ ${ allCards.length } từ chuẩn ${ lvl.name } (${ lvl.subtitle })`,
        questionCount: 15,
        rewardStars: 25,
        pool: allCards,
        color: lvl.color,
        bg: lvl.bg
      });
    });
    return list;
  }

  function getPlacementDefinition() {
    return {
      id: 'placement',
      level: 'ALL',
      tier: 'placement',
      title: 'Kiểm Tra Xếp Trình Độ (Pre-A1 ➔ B2)',
      shortLabel: '🧭 Xếp Trình Độ',
      icon: '🧭',
      subtitle: '15 câu phân tầng đa kỹ năng giúp xác định ngay trình độ phù hợp nhất!',
      questionCount: 15,
      rewardStars: 15,
      color: '#4F46E5',
      bg: '#E0E7FF'
    };
  }

  window.getMilestonesSummary = function () {
    const ms = ensureMilestoneState();
    const defs = getMilestoneDefinitions();
    const passedTotal = defs.filter(d => ms.results[d.id] && ms.results[d.id].passed).length;
    const passedLevels = CEFR_LEVELS
      .filter(lvl => ms.results[`m_${ lvl.id }_boss`] && ms.results[`m_${ lvl.id }_boss`].passed)
      .map(lvl => lvl.id);
    const totalStars = defs.reduce((sum, d) => sum + ((ms.results[d.id] && ms.results[d.id].stars) || 0), 0);
    return {
      passedTotal,
      totalMilestones: defs.length,
      passedLevels,
      totalStars,
      placement: ms.placement
    };
  };

  /* ------------------------------------------------------------------
     Question Generator (5 Multi-Skill Exercise Formats)
     ------------------------------------------------------------------ */
  function pickDistractors(target, pool, count = 3) {
    const candidates = pool.filter(c => c.id !== target.id && c.en.toLowerCase() !== target.en.toLowerCase());
    return shuffleArray(candidates).slice(0, count);
  }

  function maskWordInSentence(sentence, word) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${ escaped }\\b`, 'i');
    if (regex.test(sentence)) {
      return sentence.replace(regex, '_______');
    }
    return sentence;
  }

  function buildSpellingTokens(word) {
    // Use individual letters for clean single words up to 9 letters; chunks for longer/multi-word phrases
    const clean = word.trim();
    if (!clean.includes(' ') && !clean.includes('-') && clean.length <= 9) {
      return clean.toUpperCase().split('');
    }
    // Split into pronounceable 2-3 char chunks or words
    if (clean.includes(' ')) {
      return clean.split(/\s+/).map(p => p.toUpperCase());
    }
    const chunks = [];
    const upper = clean.toUpperCase();
    for (let i = 0; i < upper.length; i += 2) {
      chunks.push(upper.slice(i, i + 2));
    }
    return chunks;
  }

  function generateQuestions(def) {
    const allCards = window.getAllVocabCards();
    let chosenCards = [];

    if (def.tier === 'placement') {
      // 3 questions from each of the 5 CEFR levels (Pre-A1 -> B2) = 15 questions
      CEFR_LEVELS.forEach(lvl => {
        const lvlCards = allCards.filter(c => c.level === lvl.id);
        chosenCards.push(...shuffleArray(lvlCards).slice(0, 3));
      });
    } else {
      chosenCards = shuffleArray(def.pool).slice(0, def.questionCount);
    }

    // Balanced rotation of 5 multi-skill formats
    const typePattern = ['listening', 'reading', 'context', 'spelling', 'truefalse'];

    return chosenCards.map((card, idx) => {
      let qType = typePattern[idx % typePattern.length];
      // For spelling, make sure word is crisp and fun; if too complex (> 12 chars with spaces), swap to reading
      if (qType === 'spelling' && card.en.length > 12) {
        qType = 'context';
      }

      const sameLevelPool = allCards.filter(c => c.level === card.level);
      const distractors = pickDistractors(card, sameLevelPool.length >= 8 ? sameLevelPool : allCards, 3);
      const options = shuffleArray([card, ...distractors]);

      if (qType === 'truefalse') {
        const isTrue = Math.random() < 0.5;
        const shownVi = isTrue ? card.vi : distractors[0].vi;
        const shownEmoji = isTrue ? card.emoji : distractors[0].emoji;
        return {
          type: 'truefalse',
          skill: 'listening',
          card,
          isTrue,
          shownVi,
          shownEmoji
        };
      }

      if (qType === 'context') {
        return {
          type: 'context',
          skill: 'context',
          card,
          maskedEn: maskWordInSentence(card.exampleEn, card.exampleWord || card.en),
          options
        };
      }

      if (qType === 'spelling') {
        const tokens = buildSpellingTokens(card.en);
        const scrambled = shuffleArray(tokens.map((text, i) => ({ idx: i, text })));
        return {
          type: 'spelling',
          skill: 'spelling',
          card,
          targetTokens: tokens,
          tiles: scrambled
        };
      }

      if (qType === 'reading') {
        return {
          type: 'reading',
          skill: 'reading',
          card,
          options
        };
      }

      return {
        type: 'listening',
        skill: 'listening',
        card,
        options
      };
    });
  }

  /* ------------------------------------------------------------------
     UI Rendering: Milestone Arena Hub
     ------------------------------------------------------------------ */
  function renderMilestonesHub() {
    const ms = ensureMilestoneState();
    const defs = getMilestoneDefinitions();
    const summary = window.getMilestonesSummary();

    if ($('ms-hub-passed')) $('ms-hub-passed').textContent = `${ summary.passedTotal } / ${ summary.totalMilestones }`;
    if ($('ms-hub-crowns')) $('ms-hub-crowns').textContent = `${ summary.passedLevels.length } / 5`;
    if ($('ms-hub-stars')) $('ms-hub-stars').textContent = `${ summary.totalStars } / ${ summary.totalMilestones * 3 } ★`;

    // Placement test status banner
    const placementMeta = $('ms-placement-meta');
    if (placementMeta) {
      if (ms.placement) {
        placementMeta.textContent = `✅ Gần nhất: Trình độ đề xuất ${ ms.placement.recommendedLevel } (${ ms.placement.score }/${ ms.placement.total} câu đúng)`;
      } else {
        placementMeta.textContent = '15 câu trắc nghiệm nhanh qua 5 trình độ (Pre-A1 ➔ B2) để biết bé đang ở mốc nào!';
      }
    }

    const container = $('ms-chapters-list');
    if (!container) return;
    container.innerHTML = '';

    CEFR_LEVELS.forEach(lvl => {
      const levelDefs = defs.filter(d => d.level === lvl.id);
      const bossRes = ms.results[`m_${ lvl.id }_boss`];
      const chapterPassed = bossRes && bossRes.passed;

      const chapter = document.createElement('div');
      chapter.className = `ms-chapter-card ${ chapterPassed ? 'is-passed' : '' }`;
      chapter.style.setProperty('--ms-color', lvl.color);
      chapter.style.setProperty('--ms-bg', lvl.bg);

      chapter.innerHTML = `
        <div class="ms-chapter-head">
          <div class="ms-chapter-title">
            <span class="ms-chapter-icon">${ lvl.icon }</span>
            <div>
              <h3>Trình độ ${ lvl.name } — ${ lvl.subtitle }</h3>
              <p>${ lvl.desc }</p>
            </div>
          </div>
          <span class="ms-chapter-badge ${ chapterPassed ? 'passed' : '' }">
            ${ chapterPassed ? '👑 Đã vượt mốc' : '🎯 Chưa vượt mốc' }
          </span>
        </div>
        <div class="ms-nodes-track"></div>
      `;

      const track = chapter.querySelector('.ms-nodes-track');
      levelDefs.forEach((def, idx) => {
        const res = ms.results[def.id];
        const passed = !!(res && res.passed);
        const stars = (res && res.stars) || 0;
        const starIcons = '★'.repeat(stars) + '☆'.repeat(3 - stars);

        const node = document.createElement('button');
        node.type = 'button';
        node.className = `ms-node-btn ${ def.tier === 'boss' ? 'is-boss' : '' } ${ passed ? 'is-passed' : '' }`;
        node.id = `btn-start-${ def.id }`;
        node.innerHTML = `
          <div class="ms-node-top">
            <span class="ms-node-icon">${ def.icon }</span>
            <span class="ms-node-stars">${ starIcons }</span>
          </div>
          <div class="ms-node-title">${ def.shortLabel }</div>
          <div class="ms-node-sub">${ def.subtitle }</div>
          <div class="ms-node-foot">
            <span>${ res ? `Cao nhất: ${ res.bestScore }%` : `${ def.questionCount } câu • Đạt ≥ ${ PASS_THRESHOLD }%` }</span>
            <span class="ms-node-cta">${ passed ? 'Thi lại ➔' : 'Thi ngay ➔' }</span>
          </div>
        `;
        node.addEventListener('click', () => {
          playSoundEffect('pop');
          startMilestoneExam(def);
        });
        track.appendChild(node);

        if (idx < levelDefs.length - 1) {
          const arrow = document.createElement('div');
          arrow.className = 'ms-node-connector';
          arrow.textContent = '➔';
          track.appendChild(arrow);
        }
      });

      container.appendChild(chapter);
    });
  }

  /* ------------------------------------------------------------------
     Active Milestone Exam Flow
     ------------------------------------------------------------------ */
  function stopExamTimer() {
    if (exam.timerId) {
      clearInterval(exam.timerId);
      exam.timerId = null;
    }
  }

  function formatTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${ String(m).padStart(2, '0') }:${ String(s).padStart(2, '0') }`;
  }

  function startMilestoneExam(def) {
    stopExamTimer();
    exam.active = true;
    exam.def = def;
    exam.questions = generateQuestions(def);
    exam.currentIndex = 0;
    exam.hearts = MAX_HEARTS;
    exam.practiceNoHeartLoss = false;
    exam.combo = 0;
    exam.maxCombo = 0;
    exam.correctCount = 0;
    exam.answered = false;
    exam.mistakes = [];
    exam.skillStats = {
      listening: { right: 0, total: 0 },
      reading: { right: 0, total: 0 },
      context: { right: 0, total: 0 },
      spelling: { right: 0, total: 0 }
    };
    exam.levelStats = {};
    CEFR_LEVELS.forEach(l => { exam.levelStats[l.id] = { right: 0, total: 0 }; });
    exam.startTime = Date.now();

    window.recordActivity({
      kind: 'milestone',
      milestoneId: def.id,
      icon: def.icon,
      title: def.title,
      subtitle: 'Bài kiểm tra vượt mốc 4 kỹ năng CEFR!'
    });

    $('ms-hub').classList.add('hidden');
    $('ms-report').classList.add('hidden');
    $('ms-hearts-guard').classList.add('hidden');
    $('ms-exam').classList.remove('hidden');

    $('ms-exam-title').textContent = `${ def.icon } ${ def.title }`;
    $('ms-timer-val').textContent = '00:00';
    exam.timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - exam.startTime) / 1000);
      if ($('ms-timer-val')) $('ms-timer-val').textContent = formatTimer(elapsed);
    }, 1000);

    renderCurrentExamQuestion();
  }

  function updateExamHud() {
    const total = exam.questions.length;
    const cur = exam.currentIndex;
    $('ms-progress-text').textContent = `Câu ${ Math.min(cur + 1, total) } / ${ total }`;
    $('ms-progress-fill').style.width = `${ Math.round((cur / total) * 100) }%`;

    const heartsEl = $('ms-hearts-display');
    if (exam.practiceNoHeartLoss) {
      heartsEl.textContent = '🛡️ Luyện tập';
    } else {
      heartsEl.textContent = '❤️'.repeat(exam.hearts) + '🤍'.repeat(Math.max(0, MAX_HEARTS - exam.hearts));
    }

    const comboEl = $('ms-combo-pill');
    comboEl.textContent = `🔥 Combo x${ exam.combo }`;
    comboEl.classList.toggle('is-hot', exam.combo >= 3);
  }

  function renderCurrentExamQuestion() {
    const q = exam.questions[exam.currentIndex];
    if (!q) {
      finishMilestoneExam();
      return;
    }

    exam.answered = false;
    updateExamHud();
    $('ms-feedback-drawer').classList.add('hidden');
    $('ms-feedback-drawer').classList.remove('is-correct', 'is-wrong');

    const stage = $('ms-question-stage');
    stage.innerHTML = '';

    const typeBadges = {
      listening: '🎧 Nghe & Chọn Đúng',
      reading: '📖 Đọc Hiểu & Chọn Từ',
      context: '🧩 Điền Từ Vào Câu',
      spelling: '🔤 Ghép Chữ Chính Tả',
      truefalse: '⚡ Đúng Hay Sai?'
    };

    const headerHTML = `
      <div class="ms-q-meta">
        <span class="ms-q-type-pill">${ typeBadges[q.type] }</span>
        <span class="ms-q-level-pill">${ q.card.level } • ${ q.card.topicTitleVi }</span>
      </div>
    `;

    if (q.type === 'listening') {
      stage.innerHTML = `
        ${ headerHTML }
        <div class="ms-q-prompt-box">
          <p class="ms-q-instruction">Nghe từ tiếng Anh và chọn hình + nghĩa đúng nhất!</p>
          <div class="ms-audio-btns">
            <button type="button" class="btn-quiz-listen" id="btn-ms-audio-normal">🔊 Nghe từ</button>
            <button type="button" class="btn-speak-slow" id="btn-ms-audio-slow">🐢 Đọc chậm</button>
          </div>
        </div>
        <div class="ms-options-grid cols-2" id="ms-options-box"></div>
      `;
      $('btn-ms-audio-normal').addEventListener('click', () => speakEnglish(q.card.en, 0.88));
      $('btn-ms-audio-slow').addEventListener('click', () => speakEnglish(q.card.en, 0.55));

      const box = $('ms-options-box');
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ms-opt-card';
        btn.dataset.cardId = opt.id;
        btn.innerHTML = `
          <span class="ms-opt-emoji">${ opt.emoji }</span>
          <span class="ms-opt-text">${ opt.vi }</span>
        `;
        btn.addEventListener('click', () => submitChoiceAnswer(btn, opt.id === q.card.id, q));
        box.appendChild(btn);
      });
      setTimeout(() => speakEnglish(q.card.en, 0.88), 180);
      return;
    }

    if (q.type === 'reading') {
      stage.innerHTML = `
        ${ headerHTML }
        <div class="ms-q-prompt-box">
          <div class="ms-big-emoji">${ q.card.emoji }</div>
          <h3 class="ms-cue-vi">${ q.card.vi }</h3>
          <p class="ms-q-instruction">Chọn từ tiếng Anh tương ứng với nghĩa trên:</p>
        </div>
        <div class="ms-options-grid cols-2" id="ms-options-box"></div>
      `;
      const box = $('ms-options-box');
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ms-opt-card word-only';
        btn.dataset.cardId = opt.id;
        btn.innerHTML = `
          <span class="ms-opt-en">${ opt.en }</span>
          <span class="ms-opt-ipa">${ opt.phonetic }</span>
        `;
        btn.addEventListener('click', () => submitChoiceAnswer(btn, opt.id === q.card.id, q));
        box.appendChild(btn);
      });
      return;
    }

    if (q.type === 'context') {
      stage.innerHTML = `
        ${ headerHTML }
        <div class="ms-q-prompt-box context-box">
          <p class="ms-q-instruction">Chọn từ thích hợp để điền vào chỗ trống:</p>
          <div class="ms-cloze-sentence">${ q.maskedEn.replace('_______', '<span class="ms-blank-slot">_______</span>') }</div>
          <div class="ms-cloze-vi">💡 Nghĩa câu: ${ q.card.exampleVi }</div>
        </div>
        <div class="ms-options-grid cols-2" id="ms-options-box"></div>
      `;
      const box = $('ms-options-box');
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ms-opt-card word-only';
        btn.dataset.cardId = opt.id;
        btn.innerHTML = `
          <span class="ms-opt-en">${ opt.en }</span>
          <span class="ms-opt-ipa">${ opt.phonetic }</span>
        `;
        btn.addEventListener('click', () => submitChoiceAnswer(btn, opt.id === q.card.id, q));
        box.appendChild(btn);
      });
      return;
    }

    if (q.type === 'truefalse') {
      stage.innerHTML = `
        ${ headerHTML }
        <div class="ms-q-prompt-box tf-box">
          <p class="ms-q-instruction">Nghĩa Tiếng Việt này có khớp với từ tiếng Anh không?</p>
          <div class="ms-tf-pair">
            <div class="ms-tf-en-block">
              <strong class="ms-tf-en">${ q.card.en }</strong>
              <span class="ms-tf-ipa">${ q.card.phonetic }</span>
              <button type="button" class="btn-speak-slow" id="btn-ms-tf-audio">🔊 Nghe lại</button>
            </div>
            <div class="ms-tf-arrow">❓</div>
            <div class="ms-tf-vi-block">
              <span class="ms-tf-emoji">${ q.shownEmoji }</span>
              <strong class="ms-tf-vi">${ q.shownVi }</strong>
            </div>
          </div>
        </div>
        <div class="ms-tf-actions">
          <button type="button" class="btn-ms-tf is-true" id="btn-ms-true">✅ ĐÚNG (Khớp)</button>
          <button type="button" class="btn-ms-tf is-false" id="btn-ms-false">❌ SAI (Không khớp)</button>
        </div>
      `;
      $('btn-ms-tf-audio').addEventListener('click', () => speakEnglish(q.card.en, 0.88));
      $('btn-ms-true').addEventListener('click', () => submitChoiceAnswer($('btn-ms-true'), q.isTrue === true, q));
      $('btn-ms-false').addEventListener('click', () => submitChoiceAnswer($('btn-ms-false'), q.isTrue === false, q));
      setTimeout(() => speakEnglish(q.card.en, 0.88), 180);
      return;
    }

    if (q.type === 'spelling') {
      exam.spellingSelected = [];
      exam.spellingTiles = q.tiles.map(t => ({ ...t, used: false }));

      stage.innerHTML = `
        ${ headerHTML }
        <div class="ms-q-prompt-box spelling-box">
          <div class="ms-spelling-cue">
            <span class="ms-big-emoji-sm">${ q.card.emoji }</span>
            <div>
              <h3 class="ms-cue-vi">${ q.card.vi }</h3>
              <button type="button" class="btn-speak-slow" id="btn-ms-spell-audio">🔊 Nghe phát âm</button>
            </div>
          </div>
          <p class="ms-q-instruction">Chạm vào các mảnh chữ bên dưới để ghép thành từ tiếng Anh đúng:</p>
          <div class="ms-spelling-slots" id="ms-spelling-slots"></div>
          <div class="ms-spelling-bank" id="ms-spelling-bank"></div>
          <div class="ms-spelling-tools">
            <button type="button" class="btn-secondary-pill" id="btn-ms-spell-hint">💡 Gợi ý 1 ô</button>
            <button type="button" class="btn-secondary-pill" id="btn-ms-spell-clear">🔄 Xếp lại</button>
            <button type="button" class="btn-action-mastered" id="btn-ms-spell-check" disabled>✅ Kiểm tra</button>
          </div>
        </div>
      `;

      $('btn-ms-spell-audio').addEventListener('click', () => speakEnglish(q.card.en, 0.85));
      $('btn-ms-spell-clear').addEventListener('click', () => {
        if (exam.answered) return;
        playSoundEffect('pop');
        exam.spellingSelected = [];
        exam.spellingTiles.forEach(t => { t.used = false; });
        renderSpellingBoard(q);
      });
      $('btn-ms-spell-hint').addEventListener('click', () => {
        if (exam.answered) return;
        const pos = exam.spellingSelected.length;
        if (pos >= q.targetTokens.length) return;
        const needed = q.targetTokens[pos];
        const tile = exam.spellingTiles.find(t => !t.used && t.text === needed);
        if (tile) {
          playSoundEffect('pop');
          tile.used = true;
          exam.spellingSelected.push(tile);
          renderSpellingBoard(q);
        }
      });
      $('btn-ms-spell-check').addEventListener('click', () => {
        if (exam.answered) return;
        const userBuilt = exam.spellingSelected.map(t => t.text).join('');
        const targetBuilt = q.targetTokens.join('');
        evaluateExamAnswer(userBuilt === targetBuilt, q);
      });

      renderSpellingBoard(q);
      setTimeout(() => speakEnglish(q.card.en, 0.85), 180);
    }
  }

  function renderSpellingBoard(q) {
    const slotsEl = $('ms-spelling-slots');
    const bankEl = $('ms-spelling-bank');
    const checkBtn = $('btn-ms-spell-check');
    if (!slotsEl || !bankEl) return;

    slotsEl.innerHTML = '';
    for (let i = 0; i < q.targetTokens.length; i++) {
      const placed = exam.spellingSelected[i];
      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = `ms-spell-slot ${ placed ? 'filled' : '' }`;
      slotBtn.textContent = placed ? placed.text : '_';
      if (placed) {
        slotBtn.addEventListener('click', () => {
          if (exam.answered) return;
          playSoundEffect('pop');
          placed.used = false;
          exam.spellingSelected.splice(i, 1);
          renderSpellingBoard(q);
        });
      }
      slotsEl.appendChild(slotBtn);
    }

    bankEl.innerHTML = '';
    exam.spellingTiles.forEach(tile => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ms-spell-tile ${ tile.used ? 'used' : '' }`;
      btn.textContent = tile.text;
      btn.disabled = tile.used || exam.answered;
      btn.addEventListener('click', () => {
        if (exam.answered || tile.used) return;
        playSoundEffect('pop');
        tile.used = true;
        exam.spellingSelected.push(tile);
        renderSpellingBoard(q);
      });
      bankEl.appendChild(btn);
    });

    if (checkBtn) {
      checkBtn.disabled = exam.spellingSelected.length < q.targetTokens.length;
    }
  }

  function submitChoiceAnswer(clickedBtn, isCorrect, q) {
    if (exam.answered) return;
    document.querySelectorAll('#ms-question-stage .ms-opt-card, #ms-question-stage .btn-ms-tf').forEach(b => {
      b.disabled = true;
      if (b.dataset.cardId && b.dataset.cardId === q.card.id) {
        b.classList.add('is-correct');
      }
    });
    clickedBtn.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
    evaluateExamAnswer(isCorrect, q);
  }

  function evaluateExamAnswer(isCorrect, q) {
    exam.answered = true;
    const skillBucket = exam.skillStats[q.skill];
    if (skillBucket) skillBucket.total += 1;
    if (exam.levelStats[q.card.level]) exam.levelStats[q.card.level].total += 1;

    const drawer = $('ms-feedback-drawer');
    const titleEl = $('ms-fb-title');
    const detailEl = $('ms-fb-detail');
    const nextBtn = $('btn-ms-next-q');

    if (isCorrect) {
      exam.correctCount += 1;
      exam.combo += 1;
      exam.maxCombo = Math.max(exam.maxCombo, exam.combo);
      if (skillBucket) skillBucket.right += 1;
      if (exam.levelStats[q.card.level]) exam.levelStats[q.card.level].right += 1;
      state.learnedIds.add(q.card.id);

      playSoundEffect('correct');
      if (q.type === 'context') {
        speakEnglish(q.card.exampleEn, 0.88);
      } else {
        speakEnglish(q.card.en, 0.92);
      }

      drawer.classList.remove('is-wrong');
      drawer.classList.add('is-correct');
      titleEl.textContent = exam.combo >= 3
        ? `🔥 Xuất sắc! Chuỗi đúng x${ exam.combo }!`
        : '🎉 Chính xác tuyệt đối!';
      detailEl.textContent = `${ q.card.emoji } ${ q.card.en } ${ q.card.phonetic } — ${ q.card.vi }`;
    } else {
      exam.combo = 0;
      if (!exam.practiceNoHeartLoss) {
        exam.hearts = Math.max(0, exam.hearts - 1);
      }
      exam.mistakes.push(q.card);
      playSoundEffect('wrong');
      speakEnglish(q.card.en, 0.84);

      drawer.classList.remove('is-correct');
      drawer.classList.add('is-wrong');
      titleEl.textContent = '💡 Chưa đúng rồi — Ghi nhớ đáp án nhé!';
      detailEl.textContent = `Đáp án đúng: ${ q.card.emoji } ${ q.card.en } ${ q.card.phonetic } = ${ q.card.vi }`;
    }

    updateExamHud();
    const isLast = exam.currentIndex >= exam.questions.length - 1;
    nextBtn.textContent = isLast ? '🏆 Xem Kết Quả & Chứng Chỉ' : 'Tiếp tục ➔';
    drawer.classList.remove('hidden');

    if (!isCorrect && exam.hearts === 0 && !exam.practiceNoHeartLoss && !isLast) {
      setTimeout(() => {
        $('ms-hearts-guard').classList.remove('hidden');
      }, 450);
    }
  }

  /* ------------------------------------------------------------------
     Score Report, Certificates & Push Mistakes to Spaced Repetition
     ------------------------------------------------------------------ */
  function finishMilestoneExam() {
    stopExamTimer();
    exam.active = false;

    const total = exam.questions.length;
    const pct = total > 0 ? Math.round((exam.correctCount / total) * 100) : 0;
    const elapsedSec = Math.max(1, Math.floor((Date.now() - exam.startTime) / 1000));
    const passed = pct >= PASS_THRESHOLD;
    const stars = pct >= 95 ? 3 : pct >= PASS_THRESHOLD ? 2 : pct >= 60 ? 1 : 0;

    const ms = ensureMilestoneState();
    let rewardStarsEarned = 0;

    if (exam.def.tier === 'placement') {
      // Determine recommended CEFR level: highest level with >= 67% (2/3) right
      let recommended = 'Pre-A1';
      for (const lvl of CEFR_LEVELS) {
        const st = exam.levelStats[lvl.id];
        if (st && st.total > 0 && (st.right / st.total) >= 0.66) {
          recommended = lvl.id;
        } else {
          break;
        }
      }
      ms.placement = {
        recommendedLevel: recommended,
        score: exam.correctCount,
        total,
        pct,
        date: new Date().toISOString()
      };
      rewardStarsEarned = Math.max(5, Math.round((pct / 100) * exam.def.rewardStars));
    } else {
      const prev = ms.results[exam.def.id];
      ms.results[exam.def.id] = {
        bestScore: prev ? Math.max(prev.bestScore, pct) : pct,
        stars: prev ? Math.max(prev.stars, stars) : stars,
        passed: !!(passed || (prev && prev.passed)),
        attempts: (prev ? prev.attempts : 0) + 1,
        lastAt: new Date().toISOString()
      };
      rewardStarsEarned = passed ? exam.def.rewardStars : Math.max(2, Math.round(exam.correctCount / 2));
    }

    state.stars += rewardStarsEarned;
    saveProgress();
    updateHeaderAndMissionUI();

    // Render Report UI
    $('ms-exam').classList.add('hidden');
    $('ms-hearts-guard').classList.add('hidden');
    $('ms-report').classList.remove('hidden');

    const isPlacement = exam.def.tier === 'placement';
    $('ms-rep-badge').textContent = isPlacement ? '🧭' : passed ? (exam.def.tier === 'boss' ? '👑' : '🏆') : '💪';
    $('ms-rep-title').textContent = isPlacement
      ? `Trình Độ Đề Xuất: ${ ms.placement.recommendedLevel }`
      : passed
        ? `Chúc Mừng Vượt Mốc Thành Công!`
        : `Cố Lên Nhé! Cần đạt ≥ ${ PASS_THRESHOLD }% để vượt mốc`;

    $('ms-rep-sub').textContent = exam.def.title;
    $('ms-rep-stars').textContent = isPlacement ? '🌟🌟🌟' : ('⭐'.repeat(stars) + '☆'.repeat(3 - stars));
    $('ms-rep-score').textContent = `${ pct }%`;
    $('ms-rep-correct').textContent = `${ exam.correctCount } / ${ total } câu`;
    $('ms-rep-time').textContent = formatTimer(elapsedSec);
    $('ms-rep-combo').textContent = `x${ exam.maxCombo }`;
    $('ms-rep-reward').textContent = `+${ rewardStarsEarned } Sao vàng`;

    // Placement Level Breakdown Box
    const placeBox = $('ms-placement-result-box');
    if (isPlacement) {
      placeBox.classList.remove('hidden');
      const rec = ms.placement.recommendedLevel;
      const tierRows = CEFR_LEVELS.map(lvl => {
        const st = exam.levelStats[lvl.id];
        const lpct = st.total > 0 ? Math.round((st.right / st.total) * 100) : 0;
        return `
          <div class="ms-skill-row">
            <span class="ms-skill-name">${ lvl.icon } ${ lvl.name }</span>
            <div class="ms-skill-track"><div class="ms-skill-fill" style="width:${ lpct }%; background:${ lvl.color }"></div></div>
            <span class="ms-skill-val">${ st.right }/${ st.total }</span>
          </div>
        `;
      }).join('');
      placeBox.innerHTML = `
        <h4>🧭 Đánh Giá Chi Tiết 5 Tầng CEFR</h4>
        ${ tierRows }
        <button type="button" class="btn-action-mastered ms-jump-level-btn" id="btn-ms-jump-rec">
          🚀 Bắt đầu học ngay trình độ ${ rec } ➔
        </button>
      `;
      $('btn-ms-jump-rec').addEventListener('click', () => {
        playSoundEffect('pop');
        openVocabHub(rec);
      });
    } else {
      placeBox.classList.add('hidden');
    }

    // 4-Skill Breakdown Bars
    const skillMeta = [
      { key: 'listening', label: '🎧 Nghe hiểu', color: '#0EA5E9' },
      { key: 'reading', label: '📖 Đọc & Nghĩa', color: '#22C55E' },
      { key: 'context', label: '🧩 Ngữ cảnh câu', color: '#F59E0B' },
      { key: 'spelling', label: '🔤 Chính tả', color: '#8B5CF6' }
    ];
    $('ms-skills-breakdown').innerHTML = skillMeta.map(sk => {
      const st = exam.skillStats[sk.key];
      const spct = st.total > 0 ? Math.round((st.right / st.total) * 100) : 100;
      return `
        <div class="ms-skill-row">
          <span class="ms-skill-name">${ sk.label }</span>
          <div class="ms-skill-track"><div class="ms-skill-fill" style="width:${ spct }%; background:${ sk.color }"></div></div>
          <span class="ms-skill-val">${ st.right }/${ st.total } (${ spct }%)</span>
        </div>
      `;
    }).join('');

    // Mistakes Section + Push to Spaced Repetition SRS button
    const uniqueMistakes = [];
    const seenM = new Set();
    exam.mistakes.forEach(c => {
      if (!seenM.has(c.id)) {
        seenM.add(c.id);
        uniqueMistakes.push(c);
      }
    });

    const mistakesBox = $('ms-mistakes-section');
    const mistakesList = $('ms-mistakes-list');
    const pushBtn = $('btn-ms-push-anki');
    if (uniqueMistakes.length > 0) {
      mistakesBox.classList.remove('hidden');
      mistakesList.innerHTML = '';
      uniqueMistakes.forEach(c => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'ms-mistake-chip';
        chip.innerHTML = `<span>${ c.emoji }</span><strong>${ c.en }</strong><em>${ c.vi }</em><span>🔊</span>`;
        chip.addEventListener('click', () => speakEnglish(c.en, 0.85));
        mistakesList.appendChild(chip);
      });
      pushBtn.disabled = false;
      pushBtn.textContent = `🧠 Đẩy ${ uniqueMistakes.length } từ sai vào Ôn tập ghi nhớ`;
      pushBtn.onclick = () => {
        const pushed = window.queueMistakesToSrs(uniqueMistakes.map(c => c.id));
        playSoundEffect('star');
        pushBtn.disabled = true;
        pushBtn.textContent = `✅ Đã đưa ${ pushed } từ vào hàng đợi Ôn tập ghi nhớ!`;
      };
    } else {
      mistakesBox.classList.add('hidden');
    }

    if (passed || isPlacement) {
      playSoundEffect('star');
      launchConfettiBurst();
    } else {
      playSoundEffect('pop');
    }
    renderMilestonesHub();
  }

  function showMilestonesHubPanel() {
    stopExamTimer();
    exam.active = false;
    $('ms-exam').classList.add('hidden');
    $('ms-report').classList.add('hidden');
    $('ms-hearts-guard').classList.add('hidden');
    $('ms-hub').classList.remove('hidden');
    renderMilestonesHub();
  }

  window.openMilestonesHub = function () {
    openView('view-milestones');
    showMilestonesHubPanel();
  };

  window.refreshMilestonesUI = function () {
    renderMilestonesHub();
  };

  /* ------------------------------------------------------------------
     Event Binding
     ------------------------------------------------------------------ */
  function bindMilestoneEvents() {
    if (!$('view-milestones')) return;

    $('btn-ms-back-home').addEventListener('click', () => {
      playSoundEffect('pop');
      stopExamTimer();
      exam.active = false;
      openView('view-home');
      updateHeaderAndMissionUI();
      renderRecentActivityCard();
    });

    $('btn-ms-start-placement').addEventListener('click', () => {
      playSoundEffect('pop');
      startMilestoneExam(getPlacementDefinition());
    });

    $('btn-ms-exit-exam').addEventListener('click', () => {
      playSoundEffect('pop');
      showMilestonesHubPanel();
    });

    $('btn-ms-next-q').addEventListener('click', () => {
      playSoundEffect('pop');
      if (exam.currentIndex < exam.questions.length - 1) {
        exam.currentIndex += 1;
        renderCurrentExamQuestion();
      } else {
        finishMilestoneExam();
      }
    });

    $('btn-ms-guard-finish').addEventListener('click', () => {
      playSoundEffect('pop');
      finishMilestoneExam();
    });

    $('btn-ms-guard-continue').addEventListener('click', () => {
      playSoundEffect('pop');
      exam.practiceNoHeartLoss = true;
      $('ms-hearts-guard').classList.add('hidden');
      updateExamHud();
    });

    $('btn-ms-rep-hub').addEventListener('click', () => {
      playSoundEffect('pop');
      showMilestonesHubPanel();
    });

    $('btn-ms-rep-retry').addEventListener('click', () => {
      playSoundEffect('pop');
      if (exam.def) startMilestoneExam(exam.def);
    });
  }

  document.addEventListener('DOMContentLoaded', bindMilestoneEvents);
})();
