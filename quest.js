/**
 * English4Kids - Leo's Daily Quest, Sticker Album, Leo's Garden & Quick Checks (quest.js)
 *
 * 1. Leo's Daily Quest: a ~5 minute session mixing cards that are due for review with a few
 *    new age-appropriate words. Every answer is a tap-the-picture / tap-the-word game; the
 *    result is fed straight into the spaced-repetition schedule (no Again/Hard/Good/Easy
 *    buttons for children).
 * 2. Sticker Album & Leo's Garden: a word becomes a sticker once the child still remembers it
 *    on a later day (SRS interval >= 2 days). Each day the quest is finished, a flower grows.
 * 3. Quick checks: after every 10-card lesson a 1-minute check; wrong answers come back
 *    later in the same session instead of being shown again immediately.
 */
(function () {
  const $ = id => document.getElementById(id);
  const FLOWERS = ['🌷', '🌻', '🌼', '🌸', '🌹', '🌺', '🪻'];
  const WEEKDAYS_VI = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const NEW_WORDS_BY_AGE = { age_4_5: 3, age_6_7: 5, age_8_10: 6, age_11_15: 8 };
  const MAX_REVIEWS = 10;
  const STICKER_MIN_INTERVAL_DAYS = 2;
  const QUICK_CHECK_SIZE = 5;

  let q = null; // active session

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function todayStr(d = new Date()) {
    return `${ d.getFullYear() }-${ String(d.getMonth() + 1).padStart(2, '0') }-${ String(d.getDate()).padStart(2, '0') }`;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function cardById(id) {
    return typeof window.getVocabCardById === 'function' ? window.getVocabCardById(id) : null;
  }

  function cardArt(card, mode) {
    if (typeof window.renderCardArtHTML === 'function') return window.renderCardArtHTML(card, mode);
    return `<span class="pic-emoji">${ esc(card.emoji) }</span>`;
  }

  function ageGroup() {
    return typeof window.getActiveAgeGroup === 'function' ? window.getActiveAgeGroup() : null;
  }

  function srsCards() {
    return (state.srs && state.srs.cards) || {};
  }

  function isSticker(cardId) {
    const rec = srsCards()[cardId];
    return !!rec && rec.state === 'review' && (rec.interval || 0) >= STICKER_MIN_INTERVAL_DAYS;
  }

  function isHatching(cardId) {
    const rec = srsCards()[cardId];
    return !!rec && rec.state !== 'new' && !isSticker(cardId);
  }

  function ensureQuestState() {
    if (!state.quest || typeof state.quest !== 'object') state.quest = { days: [], stickersSeen: [] };
    if (!Array.isArray(state.quest.days)) state.quest.days = [];
    if (!Array.isArray(state.quest.stickersSeen)) state.quest.stickersSeen = [];
    return state.quest;
  }

  /* ------------------------------------------------------------------
     Quest planning
     ------------------------------------------------------------------ */
  function getDueReviewIds() {
    const now = Date.now();
    return Object.entries(srsCards())
      .filter(([id, rec]) => rec && rec.state !== 'new' && (rec.due || 0) <= now && cardById(id))
      .sort((a, b) => (a[1].due || 0) - (b[1].due || 0))
      .map(([id]) => id);
  }

  function getNewCandidateIds(limit) {
    if (limit <= 0) return [];
    const ag = ageGroup();
    const levels = ag ? ag.levels : ['Pre-A1', 'A1'];
    const topics = TOPICS_DATA.filter(t => levels.includes(t.level));
    // Start from the topic the child is currently studying, then continue in order
    const startIdx = Math.max(0, topics.findIndex(t => t.id === state.currentTopicId));
    const ordered = topics.slice(startIdx).concat(topics.slice(0, startIdx));
    const known = srsCards();
    const out = [];
    for (const t of ordered) {
      for (const c of t.cards) {
        if (!known[c.id] && !state.learnedIds.has(c.id)) out.push(c.id);
        if (out.length >= limit) return out;
      }
    }
    return out;
  }

  function planQuest() {
    const ag = ageGroup();
    const due = getDueReviewIds().slice(0, MAX_REVIEWS);
    const newTarget = NEW_WORDS_BY_AGE[ag ? ag.id : 'age_6_7'] || 5;
    // Fewer new words on days with lots of reviews, but always at least one
    const newCount = due.length >= MAX_REVIEWS ? 1 : Math.max(1, newTarget - Math.floor(due.length / 3));
    const fresh = getNewCandidateIds(newCount);
    return { due, fresh };
  }

  function questDoneToday() {
    return ensureQuestState().days.includes(todayStr());
  }

  /* ------------------------------------------------------------------
     Session engine (shared by the daily quest and quick checks)
     ------------------------------------------------------------------ */
  function startSession(mode, items, options = {}) {
    q = {
      mode, // 'quest' | 'check' | 'bonus'
      queue: items,
      done: 0,
      correct: 0,
      answered: 0,
      stars: 0,
      practiced: new Set(),
      stickersBefore: new Set(Object.keys(srsCards()).filter(isSticker)),
      onFinish: options.onFinish || null,
      busy: false
    };
    $('quest-mode-title').textContent = mode === 'check'
      ? '⚡ Kiểm tra nhanh 1 phút'
      : mode === 'bonus' ? '🎈 Chơi thêm cùng Leo' : '⭐ Nhiệm vụ của Leo';
    $('quest-stars').textContent = '0';
    if (typeof openView === 'function') openView('view-quest');
    nextItem();
  }

  function updateProgress() {
    const total = q.done + q.queue.length;
    const pct = total ? Math.round((q.done / total) * 100) : 100;
    $('quest-progress-fill').style.width = `${ pct }%`;
    $('quest-progress-runner').style.left = `${ pct }%`;
    $('quest-stars').textContent = String(q.stars);
  }

  function requeue(item, gap) {
    const at = Math.min(q.queue.length, gap);
    q.queue.splice(at, 0, item);
  }

  function nextItem() {
    if (!q) return;
    updateProgress();
    if (!q.queue.length) {
      finishSession();
      return;
    }
    const item = q.queue.shift();
    const card = cardById(item.cardId);
    if (!card) { nextItem(); return; }
    q.busy = false;
    if (item.kind === 'intro') renderIntro(item, card);
    else renderQuiz(item, card);
  }

  function renderIntro(item, card) {
    const stage = $('quest-stage');
    stage.innerHTML = `
      <div class="quest-card quest-intro">
        <span class="quest-new-badge">✨ Từ mới</span>
        <div class="quest-intro-art">${ cardArt(card, 'card') }</div>
        <h3 class="quest-intro-word">${ typeof window.renderColorfulWord === 'function' ? window.renderColorfulWord(card.en) : esc(card.en) }</h3>
        <p class="quest-intro-vi">${ esc(card.vi) }</p>
        <div class="quest-intro-actions">
          <button type="button" class="quest-sound-btn" id="btn-quest-hear">🔊 Nghe lại</button>
          <button type="button" class="quest-go-btn" id="btn-quest-got-it">Con nhớ rồi! ➔</button>
        </div>
      </div>`;
    const say = () => speakEnglish(card.en, 0.9);
    $('btn-quest-hear').addEventListener('click', say);
    $('btn-quest-got-it').addEventListener('click', () => {
      playSoundEffect('pop');
      q.done += 1;
      // Test the new word a little later, not straight away (retrieval after a short gap)
      requeue({ cardId: card.id, kind: 'quiz', requeues: 0 }, 2);
      nextItem();
    });
    setTimeout(say, 250);
  }

  function pickDistractors(card, count) {
    const all = window.getAllVocabCards();
    const sameTopic = all.filter(c => c.topicId === card.topicId);
    const sameLevel = all.filter(c => c.level === card.level);
    const usedEmoji = new Set([card.emoji]);
    const usedWords = new Set([card.en.toLowerCase()]);
    const out = [];
    for (const pool of [shuffle(sameTopic), shuffle(sameLevel)]) {
      for (const c of pool) {
        if (out.length >= count) break;
        if (usedEmoji.has(c.emoji) || usedWords.has(c.en.toLowerCase())) continue;
        usedEmoji.add(c.emoji);
        usedWords.add(c.en.toLowerCase());
        out.push(c);
      }
    }
    return out;
  }

  function chooseQuizType() {
    const ag = ageGroup();
    // Pre-readers (4-5) always answer by listening and tapping a picture
    if (ag && ag.id === 'age_4_5') return 'listen';
    return Math.random() < 0.5 ? 'listen' : 'look';
  }

  function renderQuiz(item, card) {
    const type = item.type || chooseQuizType();
    item.type = type;
    const options = shuffle([card, ...pickDistractors(card, 3)]);
    const stage = $('quest-stage');

    const prompt = type === 'listen'
      ? `<div class="quest-prompt">
           <button type="button" class="quest-listen-btn" id="btn-quest-listen" aria-label="Nghe lại">🔊</button>
           <span>Nghe và chạm vào hình đúng!</span>
         </div>`
      : `<div class="quest-prompt quest-prompt-look">
           <div class="quest-look-art">${ cardArt(card, 'card') }</div>
           <span>Đây là gì? Chạm vào từ đúng!</span>
         </div>`;

    const optionsHtml = options.map(opt => type === 'listen'
      ? `<button type="button" class="quest-option is-picture" data-id="${ esc(opt.id) }">${ cardArt(opt, 'compact') }</button>`
      : `<button type="button" class="quest-option is-word" data-id="${ esc(opt.id) }">${ esc(opt.en) }</button>`
    ).join('');

    stage.innerHTML = `
      <div class="quest-card quest-quiz" data-card="${ esc(card.id) }">
        ${ prompt }
        <div class="quest-options ${ type === 'listen' ? 'is-picture-grid' : 'is-word-grid' }">${ optionsHtml }</div>
      </div>`;

    if (type === 'listen') {
      const say = () => speakEnglish(card.en, 0.88);
      $('btn-quest-listen').addEventListener('click', say);
      setTimeout(say, 250);
    }

    stage.querySelectorAll('.quest-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(item, card, btn));
    });
  }

  function handleAnswer(item, card, btn) {
    if (!q || q.busy) return;
    q.busy = true;
    const correct = btn.dataset.id === card.id;
    const stage = $('quest-stage');
    stage.querySelectorAll('.quest-option').forEach(b => { b.disabled = true; });
    q.practiced.add(card.id);
    q.answered += 1;

    if (correct) {
      btn.classList.add('is-correct');
      playSoundEffect('correct');
      const rec = window.srsRecordAnswer(card.id, 3);
      q.correct += 1;
      q.stars += 1;
      state.stars += 1;
      // Still in the short "learning" steps? See it once more later in this session.
      if (rec && rec.state === 'learning' && (item.requeues || 0) < 2) {
        requeue({ cardId: card.id, kind: 'quiz', requeues: (item.requeues || 0) + 1 }, 4);
      }
      speakEnglish(`${ card.en }!`, 0.92);
    } else {
      btn.classList.add('is-wrong');
      const right = stage.querySelector(`.quest-option[data-id="${ CSS.escape(card.id) }"]`);
      if (right) right.classList.add('is-answer');
      playSoundEffect('wrong');
      window.srsRecordAnswer(card.id, 1);
      // Mistakes come back a few questions later in the same session
      if ((item.requeues || 0) < 3) {
        requeue({ cardId: card.id, kind: 'quiz', requeues: (item.requeues || 0) + 1 }, 3);
      }
      speakEnglish(`This is ${ card.en }.`, 0.88);
    }

    saveProgress();
    updateHeaderAndMissionUI();
    q.done += 1;
    updateProgress();
    window.afterSpeech(() => nextItem(), { gap: correct ? 450 : 900, min: correct ? 900 : 1600, max: 8000 });
  }

  /* ------------------------------------------------------------------
     Finish screens
     ------------------------------------------------------------------ */
  function finishSession() {
    const session = q;
    q = null;
    const quest = ensureQuestState();
    const isDaily = session.mode === 'quest';
    let grewFlower = false;

    if (isDaily && !quest.days.includes(todayStr())) {
      quest.days.push(todayStr());
      quest.days = quest.days.slice(-400);
      grewFlower = true;
      state.stars += 3;
      session.stars += 3;
    }

    const newStickers = Object.keys(srsCards())
      .filter(id => isSticker(id) && !session.stickersBefore.has(id) && !quest.stickersSeen.includes(id));
    quest.stickersSeen.push(...newStickers);

    saveProgress();
    updateHeaderAndMissionUI();
    refreshQuestUI();

    const stickerHtml = newStickers.slice(0, 8).map(id => {
      const c = cardById(id);
      return c ? `<div class="sticker is-earned is-new"><div class="sticker-art">${ cardArt(c, 'compact') }</div><span>${ esc(c.en) }</span></div>` : '';
    }).join('');

    const stage = $('quest-stage');
    const accuracy = session.answered ? Math.round((session.correct / session.answered) * 100) : 100;
    const isCheck = session.mode === 'check';

    stage.innerHTML = `
      <div class="quest-card quest-finish">
        <div class="quest-finish-leo">${ typeof window.renderMascotSvg === 'function' ? window.renderMascotSvg('leo', 'celebrate', false) : '🦁' }</div>
        <h3>${ isCheck ? '🎉 Kiểm tra xong rồi!' : '🎉 Hoàn thành nhiệm vụ!' }</h3>
        <p class="quest-finish-stats">⭐ +${ session.stars } sao • ✅ ${ session.correct } câu đúng • 🧠 ${ session.practiced.size } từ</p>
        ${ grewFlower ? `<div class="quest-finish-garden"><span>Khu vườn của Leo có thêm một bông hoa!</span>${ gardenHtml() }</div>` : '' }
        ${ newStickers.length ? `<div class="quest-finish-stickers"><strong>📒 Sticker mới cho album (${ newStickers.length }):</strong><div class="album-grid is-mini">${ stickerHtml }</div></div>` : '' }
        <div class="quest-finish-actions">
          ${ isCheck
            ? `<button type="button" class="quest-sound-btn" id="btn-check-back">↩ Xem lại thẻ</button>
               <button type="button" class="quest-go-btn" id="btn-check-next">Học bài tiếp theo ➔</button>`
            : `<button type="button" class="quest-sound-btn" id="btn-finish-album">📒 Xem album</button>
               <button type="button" class="quest-go-btn" id="btn-finish-home">🏠 Về trang chủ</button>` }
        </div>
      </div>`;

    $('quest-progress-fill').style.width = '100%';
    $('quest-progress-runner').style.left = '100%';
    $('quest-stars').textContent = String(session.stars);
    if (typeof launchConfettiBurst === 'function') launchConfettiBurst();
    playSoundEffect('star');
    speakEnglish(accuracy >= 80 ? 'Amazing! You did it!' : 'Well done! Keep practicing!', 0.95);

    if (isCheck) {
      $('btn-check-back').addEventListener('click', () => session.onFinish && session.onFinish('back'));
      $('btn-check-next').addEventListener('click', () => session.onFinish && session.onFinish('next'));
    } else {
      $('btn-finish-album').addEventListener('click', () => openAlbum());
      $('btn-finish-home').addEventListener('click', () => openView('view-home'));
    }
  }

  /* ------------------------------------------------------------------
     Public entry points
     ------------------------------------------------------------------ */
  function startDailyQuest() {
    const { due, fresh } = planQuest();
    if (questDoneToday() || (!due.length && !fresh.length)) {
      // Bonus round: practice words the child already knows
      const known = shuffle(Object.keys(srsCards()).filter(id => cardById(id))).slice(0, 6);
      const pool = known.length ? known : getNewCandidateIds(4);
      startSession('bonus', pool.map(id => ({ cardId: id, kind: known.length ? 'quiz' : 'intro', requeues: 0 })));
      return;
    }
    const items = [];
    // Interleave: a review, then a new word, so new words are spread across the session
    const reviews = shuffle(due);
    const news = fresh.slice();
    while (reviews.length || news.length) {
      if (reviews.length) items.push({ cardId: reviews.shift(), kind: 'quiz', requeues: 0 });
      if (reviews.length) items.push({ cardId: reviews.shift(), kind: 'quiz', requeues: 0 });
      if (news.length) items.push({ cardId: news.shift(), kind: 'intro', requeues: 0 });
    }
    startSession('quest', items);
  }

  /** Quick 1-minute check over a lesson's cards; onDone('back' | 'next') */
  window.startQuickCheck = function (cardIds, onDone) {
    const ids = shuffle(cardIds.filter(id => cardById(id))).slice(0, QUICK_CHECK_SIZE);
    if (!ids.length) { if (onDone) onDone('next'); return; }
    startSession('check', ids.map(id => ({ cardId: id, kind: 'quiz', requeues: 0 })), { onFinish: onDone });
  };

  /* ------------------------------------------------------------------
     Garden & home banner
     ------------------------------------------------------------------ */
  function gardenHtml() {
    const days = new Set(ensureQuestState().days);
    const now = new Date();
    const mondayOffset = (now.getDay() + 6) % 7;
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
    const today = todayStr(now);
    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      const key = todayStr(d);
      let content;
      let cls;
      if (days.has(key)) {
        content = typeof window.renderEmojiArt === 'function' ? window.renderEmojiArt(FLOWERS[d.getDate() % FLOWERS.length], '', 'sm') : FLOWERS[0];
        cls = 'is-bloom';
      } else if (key === today) {
        content = typeof window.renderEmojiArt === 'function' ? window.renderEmojiArt('🌱', '', 'sm') : '🌱';
        cls = 'is-today';
      } else if (key < today) {
        content = '';
        cls = 'is-missed';
      } else {
        content = '';
        cls = 'is-future';
      }
      html += `<div class="garden-day ${ cls }"><div class="garden-pot">${ content }</div><span>${ WEEKDAYS_VI[i] }</span></div>`;
    }
    return `<div class="garden-row">${ html }</div>`;
  }

  function stickerCount() {
    return Object.keys(srsCards()).filter(isSticker).length;
  }

  window.refreshQuestUI = function () {
    const banner = $('quest-banner');
    if (!banner) return;
    const { due, fresh } = planQuest();
    const total = due.length + fresh.length * 2;
    const done = questDoneToday();
    const title = $('quest-banner-title');
    const sub = $('quest-banner-sub');
    const btn = $('btn-start-quest');
    banner.classList.toggle('is-done', done);
    if (done) {
      title.textContent = '✅ Hôm nay bé đã hoàn thành nhiệm vụ!';
      sub.textContent = 'Giỏi quá! Mai quay lại để vườn của Leo nở thêm hoa nhé 🌸';
      btn.textContent = '🎈 Chơi thêm';
    } else {
      const minutes = Math.max(2, Math.round(total * 0.3));
      title.textContent = `${ due.length } từ cần ôn • ${ fresh.length } từ mới • khoảng ${ minutes } phút`;
      sub.textContent = due.length
        ? 'Ôn lại đúng lúc để nhớ thật lâu, rồi học thêm vài từ mới!'
        : 'Hôm nay học vài từ mới bằng trò chơi cùng Leo!';
      btn.textContent = '▶ Bắt đầu';
    }
    const icon = $('quest-banner-icon');
    if (icon && typeof window.renderMascotSvg === 'function' && !icon.dataset.hydrated) {
      icon.innerHTML = window.renderMascotSvg('leo', 'wave', true);
      icon.dataset.hydrated = '1';
    }
    $('garden-strip').innerHTML = gardenHtml();
    $('album-count-pill').textContent = String(stickerCount());
  };

  /* ------------------------------------------------------------------
     Sticker album
     ------------------------------------------------------------------ */
  let albumTopicId = null;

  function albumTopics() {
    const ag = ageGroup();
    const levels = ag ? ag.levels : ['Pre-A1', 'A1'];
    const cards = srsCards();
    return TOPICS_DATA.filter(t => levels.includes(t.level) || t.cards.some(c => cards[c.id]));
  }

  function renderAlbum() {
    const topics = albumTopics();
    if (!albumTopicId || !topics.some(t => t.id === albumTopicId)) {
      const withStickers = topics.find(t => t.cards.some(c => isSticker(c.id)));
      albumTopicId = (withStickers || topics.find(t => t.id === state.currentTopicId) || topics[0] || TOPICS_DATA[0]).id;
    }
    const bar = $('album-topic-bar');
    bar.innerHTML = topics.map(t => {
      const n = t.cards.filter(c => isSticker(c.id)).length;
      return `<button type="button" class="filter-pill ${ t.id === albumTopicId ? 'active' : '' }" data-topic="${ esc(t.id) }">${ esc(t.icon) } ${ esc(t.titleVi) } <strong>${ n }/${ t.cards.length }</strong></button>`;
    }).join('');
    const activePill = bar.querySelector('.filter-pill.active');
    if (activePill) bar.scrollLeft = Math.max(0, activePill.offsetLeft - 12);
    bar.querySelectorAll('[data-topic]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        albumTopicId = btn.dataset.topic;
        renderAlbum();
      });
    });

    const topic = TOPICS_DATA.find(t => t.id === albumTopicId);
    const grid = $('album-grid');
    grid.innerHTML = topic.cards.map(c => {
      if (isSticker(c.id)) {
        return `<button type="button" class="sticker is-earned" data-word="${ esc(c.en) }"><div class="sticker-art">${ cardArt(c, 'compact') }</div><span>${ esc(c.en) }</span></button>`;
      }
      if (isHatching(c.id)) {
        return `<div class="sticker is-hatching" title="Đang ấp"><div class="sticker-art">${ cardArt(c, 'compact') }</div><span class="sticker-egg" aria-hidden="true">🥚</span></div>`;
      }
      return `<div class="sticker is-locked" aria-hidden="true"><div class="sticker-art">${ cardArt(c, 'compact') }</div><span>?</span></div>`;
    }).join('');
    grid.querySelectorAll('.sticker.is-earned').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.remove('is-bounce');
        void btn.offsetWidth;
        btn.classList.add('is-bounce');
        speakEnglish(btn.dataset.word, 0.9);
      });
    });
    $('album-total').textContent = String(stickerCount());
  }

  function openAlbum() {
    playSoundEffect('pop');
    renderAlbum();
    openView('view-stickers');
  }

  /* ------------------------------------------------------------------
     Wiring
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    ensureQuestState();
    const startBtn = $('btn-start-quest');
    if (startBtn) startBtn.addEventListener('click', () => { playSoundEffect('pop'); startDailyQuest(); });
    const albumBtn = $('btn-open-album');
    if (albumBtn) albumBtn.addEventListener('click', openAlbum);
    const albumBack = $('btn-album-back');
    if (albumBack) albumBack.addEventListener('click', () => { playSoundEffect('pop'); openView('view-home'); });
    const exitBtn = $('btn-quest-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        playSoundEffect('pop');
        if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
        const session = q;
        q = null;
        refreshQuestUI();
        if (session && session.mode === 'check' && session.onFinish) session.onFinish('back');
        else openView('view-home');
      });
    }
    // Wait for the other modules to finish their own DOMContentLoaded setup
    setTimeout(() => window.refreshQuestUI(), 0);
  });
})();
