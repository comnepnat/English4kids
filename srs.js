/**
 * English4Kids - Spaced Repetition Memory Review System (SM-2 SRS)
 * Implements SM-2 algorithm with learning steps, learn-ahead queue (20m),
 * dynamic interval previews on 4 rating buttons, deck filters, card directions, and Undo.
 */
(function () {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MIN_MS = 60 * 1000;
  const LEARN_AHEAD_MS = 20 * MIN_MS;

  const srsSession = {
    active: false,
    deckKey: 'all',          // 'all' | 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'topic:<id>'
    direction: 'en-vi',      // 'en-vi' | 'vi-en' | 'audio'
    cramMode: false,
    queue: [],               // Array of { cardId, bucket: 'new' | 'learning' | 'review' }
    currentItem: null,
    revealed: false,
    reviewedInSession: 0,
    correctInSession: 0,
    starsInSession: 0,
    lastUndo: null           // { cardId, prevRecord, prevLearned, prevStars, prevStats, item }
  };

  const $ = id => document.getElementById(id);

  function todayStr() {
    const d = new Date();
    return `${ d.getFullYear() }-${ String(d.getMonth() + 1).padStart(2, '0') }-${ String(d.getDate()).padStart(2, '0') }`;
  }

  function ensureSrsState() {
    if (!state.srs || typeof state.srs !== 'object') {
      state.srs = { cards: {}, stats: {} };
    }
    if (!state.srs.cards || typeof state.srs.cards !== 'object') {
      state.srs.cards = {};
    }
    if (!state.srs.stats || typeof state.srs.stats !== 'object') {
      state.srs.stats = {};
    }
    const st = state.srs.stats;
    const today = todayStr();
    if (st.todayDate !== today) {
      // Check streak continuity
      if (st.lastStudyDate) {
        const prev = new Date(`${ st.lastStudyDate }T00:00:00`);
        const cur = new Date(`${ today }T00:00:00`);
        const diffDays = Math.round((cur - prev) / DAY_MS);
        if (diffDays > 1) {
          st.streakDays = 0;
        }
      }
      st.todayDate = today;
      st.reviewedToday = 0;
      st.newToday = 0;
    }
    if (typeof st.streakDays !== 'number') st.streakDays = 0;
    if (typeof st.totalReviews !== 'number') st.totalReviews = 0;
    if (typeof st.dailyNewLimit !== 'number') st.dailyNewLimit = 20;
    if (typeof st.reviewedToday !== 'number') st.reviewedToday = 0;
    if (typeof st.newToday !== 'number') st.newToday = 0;
    return state.srs;
  }

  function getCardRecord(cardId) {
    ensureSrsState();
    return state.srs.cards[cardId] || {
      state: 'new',
      reps: 0,
      lapses: 0,
      interval: 0,
      ease: 2.5,
      due: 0,
      lastReview: 0
    };
  }

  /* ------------------------------------------------------------------
     SM-2 Spaced Repetition Scheduling & Interval Preview
     rating: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
     ------------------------------------------------------------------ */
  function computeNextSchedule(rec, rating, now = Date.now()) {
    const next = { ...rec };
    const ease = typeof next.ease === 'number' ? next.ease : 2.5;
    next.lastReview = now;

    if (next.state === 'new' || next.state === 'learning') {
      if (rating === 1) {
        // Again: < 1 min
        next.state = 'learning';
        next.interval = 1 / 1440;
        next.due = now + 1 * MIN_MS;
        next.ease = Math.max(1.3, +(ease - 0.15).toFixed(2));
        return { record: next, label: '< 1 phút', requeueInSession: true };
      }
      if (rating === 2) {
        // Hard: 6 min
        next.state = 'learning';
        next.interval = 6 / 1440;
        next.due = now + 6 * MIN_MS;
        next.ease = Math.max(1.3, +(ease - 0.1).toFixed(2));
        return { record: next, label: '6 phút', requeueInSession: true };
      }
      if (rating === 3) {
        // Good: step 0 (new) -> 10 min; step 1 (learning) -> graduate to 1 day
        if (next.state === 'new') {
          next.state = 'learning';
          next.interval = 10 / 1440;
          next.due = now + 10 * MIN_MS;
          next.reps = (next.reps || 0) + 1;
          return { record: next, label: '10 phút', requeueInSession: true };
        }
        next.state = 'review';
        next.interval = 1;
        next.due = now + 1 * DAY_MS;
        next.reps = (next.reps || 0) + 1;
        return { record: next, label: '1 ngày', requeueInSession: false };
      }
      // Rating 4 (Easy): immediately graduate with 4 days
      next.state = 'review';
      next.interval = 4;
      next.due = now + 4 * DAY_MS;
      next.ease = Math.min(3.0, +(ease + 0.15).toFixed(2));
      next.reps = (next.reps || 0) + 1;
      return { record: next, label: '4 ngày', requeueInSession: false };
    }

    // Graduated Review card (interval >= 1 day)
    const curInt = Math.max(1, next.interval || 1);
    if (rating === 1) {
      // Lapse -> back to learning
      next.state = 'learning';
      next.lapses = (next.lapses || 0) + 1;
      next.interval = 1 / 1440;
      next.due = now + 1 * MIN_MS;
      next.ease = Math.max(1.3, +(ease - 0.2).toFixed(2));
      return { record: next, label: '< 1 phút', requeueInSession: true };
    }
    if (rating === 2) {
      // Hard -> 1.2x
      const iv = Math.max(1, Math.round(curInt * 1.2));
      next.state = 'review';
      next.interval = iv;
      next.due = now + iv * DAY_MS;
      next.ease = Math.max(1.3, +(ease - 0.15).toFixed(2));
      next.reps = (next.reps || 0) + 1;
      return { record: next, label: formatIntervalVi(iv), requeueInSession: false };
    }
    if (rating === 3) {
      // Good -> curInt * ease
      const iv = Math.max(curInt + 1, Math.round(curInt * ease));
      next.state = 'review';
      next.interval = iv;
      next.due = now + iv * DAY_MS;
      next.reps = (next.reps || 0) + 1;
      return { record: next, label: formatIntervalVi(iv), requeueInSession: false };
    }
    // Easy -> curInt * ease * 1.3
    const iv = Math.max(curInt + 2, Math.round(curInt * ease * 1.3));
    next.state = 'review';
    next.interval = iv;
    next.due = now + iv * DAY_MS;
    next.ease = Math.min(3.0, +(ease + 0.15).toFixed(2));
    next.reps = (next.reps || 0) + 1;
    return { record: next, label: formatIntervalVi(iv), requeueInSession: false };
  }

  function formatIntervalVi(days) {
    if (days < 1) return '< 1 ngày';
    if (days < 30) return `${ days } ngày`;
    if (days < 365) {
      const months = +(days / 30).toFixed(1);
      return `${ months } tháng`;
    }
    const years = +(days / 365).toFixed(1);
    return `${ years } năm`;
  }

  /* ------------------------------------------------------------------
     Deck Counts & Queue Construction
     ------------------------------------------------------------------ */
  function getCardsForDeck(deckKey) {
    const all = window.getAllVocabCards();
    if (!deckKey || deckKey === 'all') return all;
    if (deckKey.startsWith('topic:')) {
      const tid = deckKey.slice(6);
      return all.filter(c => c.topicId === tid);
    }
    return all.filter(c => c.level === deckKey);
  }

  function computeDeckCounts(deckKey, ignoreDailyNewCap = false) {
    const srs = ensureSrsState();
    const now = Date.now();
    const cards = getCardsForDeck(deckKey);
    const remainingNewAllowance = ignoreDailyNewCap
      ? 9999
      : Math.max(0, srs.stats.dailyNewLimit - srs.stats.newToday);

    let totalNew = 0;
    let learningDue = 0;
    let reviewDue = 0;
    let mature = 0;
    let tracked = 0;

    for (const c of cards) {
      const rec = srs.cards[c.id];
      if (!rec || rec.state === 'new') {
        totalNew++;
      } else {
        tracked++;
        if (rec.state === 'learning') {
          if (!rec.due || rec.due <= now + LEARN_AHEAD_MS) learningDue++;
        } else if (rec.state === 'review') {
          if (rec.interval >= 21) mature++;
          if (!rec.due || rec.due <= now) reviewDue++;
        }
      }
    }

    const newAvailable = Math.min(totalNew, remainingNewAllowance);
    return {
      total: cards.length,
      newAvailable,
      totalNew,
      learningDue,
      reviewDue,
      mature,
      tracked,
      totalDueNow: newAvailable + learningDue + reviewDue
    };
  }

  function buildQueueForDeck(deckKey, options = {}) {
    const srs = ensureSrsState();
    const now = Date.now();
    const cards = getCardsForDeck(deckKey);
    const extraNew = options.extraNew || 0;
    const cram = !!options.cram;

    const learningList = [];
    const reviewList = [];
    const newList = [];

    for (const c of cards) {
      const rec = srs.cards[c.id];
      if (!rec || rec.state === 'new') {
        newList.push({ cardId: c.id, bucket: 'new', due: 0 });
      } else if (rec.state === 'learning') {
        if (cram || !rec.due || rec.due <= now + LEARN_AHEAD_MS) {
          learningList.push({ cardId: c.id, bucket: 'learning', due: rec.due || 0 });
        }
      } else if (rec.state === 'review') {
        if (cram || !rec.due || rec.due <= now) {
          reviewList.push({ cardId: c.id, bucket: 'review', due: rec.due || 0 });
        }
      }
    }

    learningList.sort((a, b) => a.due - b.due);
    reviewList.sort((a, b) => a.due - b.due);

    if (cram) {
      // Cram mode: prioritize learning + review due + random mix up to 20 cards
      const pool = [...learningList, ...reviewList];
      if (pool.length < 20) {
        const needed = 20 - pool.length;
        pool.push(...newList.slice(0, needed));
      }
      return pool.slice(0, 20);
    }

    const cap = extraNew > 0
      ? extraNew
      : Math.max(0, srs.stats.dailyNewLimit - srs.stats.newToday);
    const chosenNew = newList.slice(0, cap);

    // SM-2 order: Learning due first, then Reviews due, then New cards
    return [...learningList, ...reviewList, ...chosenNew];
  }

  /* ------------------------------------------------------------------
     Public Hooks for app.js & milestones.js
     ------------------------------------------------------------------ */
  window.getSrsSummary = function () {
    const srs = ensureSrsState();
    const counts = computeDeckCounts('all');
    return {
      ...counts,
      dueActionable: counts.learningDue + counts.reviewDue,
      reviewedToday: srs.stats.reviewedToday,
      streakDays: srs.stats.streakDays,
      totalReviews: srs.stats.totalReviews
    };
  };

  window.enrollCardInSrs = function (cardId) {
    const srs = ensureSrsState();
    if (!srs.cards[cardId]) {
      srs.cards[cardId] = {
        state: 'review',
        reps: 1,
        lapses: 0,
        interval: 1,
        ease: 2.5,
        due: Date.now() + DAY_MS,
        lastReview: Date.now()
      };
    }
  };

  window.queueMistakesToSrs = function (cardIds) {
    const srs = ensureSrsState();
    const now = Date.now();
    let count = 0;
    (cardIds || []).forEach(id => {
      const existing = srs.cards[id];
      srs.cards[id] = {
        state: 'learning',
        reps: existing ? existing.reps : 0,
        lapses: existing ? (existing.lapses || 0) + 1 : 0,
        interval: 1 / 1440,
        ease: existing ? Math.max(1.3, +(existing.ease - 0.15).toFixed(2)) : 2.3,
        due: now,
        lastReview: now
      };
      count++;
    });
    saveProgress();
    updateHeaderAndMissionUI();
    window.refreshSrsUI();
    return count;
  };

  /* ------------------------------------------------------------------
     UI Rendering: Spaced Repetition Deck Overview
     ------------------------------------------------------------------ */
  function renderSrsOverview() {
    const srs = ensureSrsState();
    const allCounts = computeDeckCounts('all');

    if ($('srs-stat-new')) $('srs-stat-new').textContent = allCounts.newAvailable;
    if ($('srs-stat-learn')) $('srs-stat-learn').textContent = allCounts.learningDue;
    if ($('srs-stat-due')) $('srs-stat-due').textContent = allCounts.reviewDue;
    if ($('srs-stat-streak')) $('srs-stat-streak').textContent = `${ srs.stats.streakDays } ngày`;
    if ($('srs-stat-today')) $('srs-stat-today').textContent = `${ srs.stats.reviewedToday } thẻ`;
    if ($('srs-stat-mature')) $('srs-stat-mature').textContent = `${ allCounts.mature } / ${ allCounts.total }`;

    // Sync settings selects
    const limitSel = $('srs-daily-limit');
    if (limitSel) limitSel.value = String(srs.stats.dailyNewLimit);

    document.querySelectorAll('#srs-direction-bar [data-dir]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.dir === srsSession.direction);
    });

    // Populate Topic dropdown
    const topicSel = $('srs-topic-select');
    if (topicSel && topicSel.options.length <= 1) {
      topicSel.innerHTML = '<option value="">-- Chọn nhanh 1 trong 50 chủ đề --</option>';
      TOPICS_DATA.forEach(t => {
        const opt = document.createElement('option');
        opt.value = `topic:${ t.id }`;
        opt.textContent = `[${ t.level }] ${ t.icon } ${ t.titleVi } (${ t.cards.length } từ)`;
        topicSel.appendChild(opt);
      });
    }

    // Build Spaced Repetition Deck List
    const deckList = $('srs-deck-list');
    if (!deckList) return;
    deckList.innerHTML = '';

    const deckDefs = [
      { key: 'all', icon: '🌈', title: 'Tổng Hợp Tất Cả Từ Vựng', sub: '50 Chủ đề • 2.500 Từ (Pre-A1 ➔ B2)', color: '#FF7A00' },
      ...CEFR_LEVELS.map(lvl => ({
        key: lvl.id,
        icon: lvl.icon,
        title: `Bộ Thẻ ${ lvl.name } — ${ lvl.subtitle }`,
        sub: `10 Chủ đề • 500 Từ chuẩn ${ lvl.name }`,
        color: lvl.color
      }))
    ];

    deckDefs.forEach(deck => {
      const c = computeDeckCounts(deck.key);
      const row = document.createElement('div');
      row.className = 'srs-deck-row';
      row.style.setProperty('--deck-color', deck.color);

      const readyCount = c.totalDueNow;
      row.innerHTML = `
        <div class="srs-deck-left">
          <div class="srs-deck-icon">${ deck.icon }</div>
          <div class="srs-deck-info">
            <h3>${ deck.title }</h3>
            <p>${ deck.sub } • Đã ôn: <strong>${ c.tracked }</strong></p>
          </div>
        </div>
        <div class="srs-deck-counts" aria-label="Thống kê thẻ ôn tập">
          <span class="anki-cnt is-new" title="Thẻ mới hôm nay">${ c.newAvailable }</span>
          <span class="anki-cnt is-learn" title="Thẻ đang học">${ c.learningDue }</span>
          <span class="anki-cnt is-due" title="Thẻ đến hạn ôn">${ c.reviewDue }</span>
        </div>
        <div class="srs-deck-actions">
          <button type="button" class="btn-srs-study-deck" data-deck="${ deck.key }">
            ${ readyCount > 0 ? '▶ Ôn ngay' : '⚡ Ôn thêm' }
          </button>
        </div>
      `;

      row.querySelector('.btn-srs-study-deck').addEventListener('click', () => {
        playSoundEffect('pop');
        startSrsSession(deck.key, { cram: readyCount === 0 });
      });

      deckList.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------
     Active Spaced Repetition Review Session
     ------------------------------------------------------------------ */
  function startSrsSession(deckKey, options = {}) {
    srsSession.deckKey = deckKey;
    srsSession.cramMode = !!options.cram;
    srsSession.queue = buildQueueForDeck(deckKey, options);
    srsSession.active = true;
    srsSession.currentItem = null;
    srsSession.revealed = false;
    srsSession.reviewedInSession = 0;
    srsSession.correctInSession = 0;
    srsSession.starsInSession = 0;
    srsSession.lastUndo = null;

    const labelMap = {
      all: 'Tất cả 2.500 từ',
      'Pre-A1': 'Bộ thẻ Pre-A1',
      A1: 'Bộ thẻ A1',
      A2: 'Bộ thẻ A2',
      B1: 'Bộ thẻ B1',
      B2: 'Bộ thẻ B2'
    };
    let deckName = labelMap[deckKey] || 'Bộ thẻ chủ đề';
    if (deckKey.startsWith('topic:')) {
      const t = TOPICS_DATA.find(x => x.id === deckKey.slice(6));
      if (t) deckName = `${ t.icon } ${ t.titleVi }`;
    }
    if ($('srs-active-deck-name')) {
      $('srs-active-deck-name').textContent = srsSession.cramMode ? `⚡ ${ deckName } (Ôn tự do)` : `🧠 ${ deckName }`;
    }

    window.recordActivity({
      kind: 'srs',
      deckKey,
      icon: '🧠',
      title: `Ôn tập ghi nhớ: ${ deckName }`,
      subtitle: 'Lặp lại ngắt quãng thông minh ghi nhớ từ vựng siêu lâu!'
    });

    $('srs-overview').classList.add('hidden');
    $('srs-done').classList.add('hidden');
    $('srs-study').classList.remove('hidden');

    nextSrsCard();
  }

  function updateSessionCountersUI() {
    let n = 0, l = 0, r = 0;
    const allItems = srsSession.currentItem ? [srsSession.currentItem, ...srsSession.queue] : srsSession.queue;
    allItems.forEach(item => {
      if (item.bucket === 'new') n++;
      else if (item.bucket === 'learning') l++;
      else r++;
    });

    const elN = $('srs-live-new');
    const elL = $('srs-live-learn');
    const elR = $('srs-live-due');
    if (elN) {
      elN.textContent = n;
      elN.classList.toggle('is-active-bucket', srsSession.currentItem && srsSession.currentItem.bucket === 'new');
    }
    if (elL) {
      elL.textContent = l;
      elL.classList.toggle('is-active-bucket', srsSession.currentItem && srsSession.currentItem.bucket === 'learning');
    }
    if (elR) {
      elR.textContent = r;
      elR.classList.toggle('is-active-bucket', srsSession.currentItem && srsSession.currentItem.bucket === 'review');
    }

    const total = srsSession.reviewedInSession + allItems.length;
    const pct = total > 0 ? Math.round((srsSession.reviewedInSession / total) * 100) : 100;
    if ($('srs-session-progress-fill')) {
      $('srs-session-progress-fill').style.width = `${ pct }%`;
    }
    const undoBtn = $('btn-srs-undo');
    if (undoBtn) undoBtn.disabled = !srsSession.lastUndo;
  }

  function nextSrsCard() {
    if (srsSession.queue.length === 0) {
      finishSrsSession();
      return;
    }

    srsSession.currentItem = srsSession.queue.shift();
    srsSession.revealed = false;
    renderSrsStudyCard();
  }

  function renderSrsStudyCard() {
    const item = srsSession.currentItem;
    if (!item) return;
    const card = window.getVocabCardById(item.cardId);
    if (!card) {
      nextSrsCard();
      return;
    }

    const rec = getCardRecord(card.id);
    updateSessionCountersUI();

    const posMap = { n: 'Danh từ', v: 'Động từ', adj: 'Tính từ', adv: 'Trạng từ', conj: 'Liên từ', num: 'Số đếm', phrase: 'Giao tiếp' };
    $('srs-card-meta-left').textContent = `${ card.level } • ${ card.topicTitleVi }`;
    $('srs-card-meta-right').textContent = posMap[card.pos] || 'Từ vựng';

    const dir = srsSession.direction;
    const frontVisual = $('srs-front-visual');
    const frontPrompt = $('srs-front-prompt');
    const frontSub = $('srs-front-sub');
    const frontAudioRow = $('srs-front-audio-row');

    if (dir === 'en-vi') {
      frontVisual.innerHTML = buildCardIllustrationHTML(card);
      frontVisual.classList.remove('hidden');
      frontPrompt.textContent = card.en;
      frontSub.textContent = card.phonetic;
      frontAudioRow.classList.remove('hidden');
      setTimeout(() => speakEnglish(card.en, 0.88), 160);
    } else if (dir === 'vi-en') {
      frontVisual.innerHTML = buildCardIllustrationHTML(card);
      frontVisual.classList.remove('hidden');
      frontPrompt.textContent = card.vi;
      frontSub.textContent = '🤔 Từ tiếng Anh là gì nhỉ? Nhớ lại rồi bấm Hiện đáp án!';
      frontAudioRow.classList.add('hidden');
    } else {
      // Listening mode
      frontVisual.innerHTML = '<div class="srs-audio-mystery">🎧</div>';
      frontVisual.classList.remove('hidden');
      frontPrompt.textContent = 'Nghe & Đoán Nghĩa';
      frontSub.textContent = '👂 Bấm loa để nghe lại rồi tự nhớ từ và nghĩa Tiếng Việt!';
      frontAudioRow.classList.remove('hidden');
      setTimeout(() => speakEnglish(card.en, 0.85), 160);
    }

    if (typeof window.prefetchWordAudio === 'function' && srsSession.queue.length > 0) {
      const nextCard = window.getVocabCardById(srsSession.queue[0].cardId);
      if (nextCard) window.prefetchWordAudio(nextCard.en);
    }

    // Populate answer panel (hidden until revealed)
    $('srs-ans-en').textContent = card.en;
    $('srs-ans-ipa').textContent = card.phonetic;
    const ansEnLine = $('srs-ans-en') && $('srs-ans-en').parentElement;
    if (ansEnLine) ansEnLine.classList.toggle('hidden', dir === 'en-vi');
    $('srs-ans-vi').textContent = card.vi;
    $('srs-ans-ex-en').textContent = `"${ card.exampleEn }"`;
    $('srs-ans-ex-vi').textContent = card.exampleVi;
    const easePct = Math.round((rec.ease || 2.5) * 100);
    $('srs-ans-stats').textContent = `📊 Đã ôn: ${ rec.reps || 0 } lần • Hệ số nhớ (Ease): ${ easePct }% • Khoảng cách: ${ rec.interval >= 1 ? formatIntervalVi(rec.interval) : 'Thẻ mới/đang học' }`;

    // Precompute exact SM-2 interval labels for 4 buttons
    const preview1 = computeNextSchedule(rec, 1);
    const preview2 = computeNextSchedule(rec, 2);
    const preview3 = computeNextSchedule(rec, 3);
    const preview4 = computeNextSchedule(rec, 4);

    $('srs-iv-1').textContent = preview1.label;
    $('srs-iv-2').textContent = preview2.label;
    $('srs-iv-3').textContent = preview3.label;
    $('srs-iv-4').textContent = preview4.label;

    $('srs-answer-panel').classList.add('hidden');
    $('srs-rating-bar').classList.add('hidden');
    $('btn-srs-show-answer').classList.remove('hidden');
  }

  function revealSrsAnswer() {
    if (!srsSession.active || !srsSession.currentItem || srsSession.revealed) return;
    srsSession.revealed = true;
    playSoundEffect('flip');

    const card = window.getVocabCardById(srsSession.currentItem.cardId);
    $('srs-answer-panel').classList.remove('hidden');
    $('srs-rating-bar').classList.remove('hidden');
    $('btn-srs-show-answer').classList.add('hidden');

    if (card && srsSession.direction === 'vi-en') {
      speakEnglish(card.en, 0.9);
    }
  }

  function rateCurrentSrsCard(rating) {
    if (!srsSession.active || !srsSession.currentItem || !srsSession.revealed) return;
    const srs = ensureSrsState();
    const item = srsSession.currentItem;
    const cardId = item.cardId;
    const prevRecord = srs.cards[cardId] ? { ...srs.cards[cardId] } : null;
    const prevLearned = state.learnedIds.has(cardId);
    const prevStars = state.stars;
    const prevStats = { ...srs.stats };

    // Save Undo snapshot
    srsSession.lastUndo = {
      cardId,
      prevRecord,
      prevLearned,
      prevStars,
      prevStats,
      item: { ...item }
    };

    const currentRec = getCardRecord(cardId);
    const wasNew = !prevRecord || prevRecord.state === 'new';
    const scheduled = computeNextSchedule(currentRec, rating);
    srs.cards[cardId] = scheduled.record;

    // Update daily stats & streak
    const today = todayStr();
    if (srs.stats.lastStudyDate !== today) {
      const prevDate = srs.stats.lastStudyDate ? new Date(`${ srs.stats.lastStudyDate }T00:00:00`) : null;
      const curDate = new Date(`${ today }T00:00:00`);
      const diff = prevDate ? Math.round((curDate - prevDate) / DAY_MS) : 0;
      srs.stats.streakDays = diff === 1 ? (srs.stats.streakDays || 0) + 1 : 1;
      srs.stats.lastStudyDate = today;
    }
    srs.stats.reviewedToday += 1;
    srs.stats.totalReviews += 1;
    if (wasNew) srs.stats.newToday += 1;

    srsSession.reviewedInSession += 1;
    if (rating >= 3) {
      srsSession.correctInSession += 1;
      state.learnedIds.add(cardId);
      state.stars += 1;
      srsSession.starsInSession += 1;
      playSoundEffect('correct');
    } else if (rating === 2) {
      playSoundEffect('pop');
    } else {
      playSoundEffect('wrong');
    }

    // Learn-Ahead re-queue inside the same session!
    if (scheduled.requeueInSession && !srsSession.cramMode) {
      const insertAt = Math.min(srsSession.queue.length, rating === 1 ? 2 : 4);
      srsSession.queue.splice(insertAt, 0, { cardId, bucket: 'learning' });
    } else if (rating === 1 && srsSession.cramMode) {
      const insertAt = Math.min(srsSession.queue.length, 2);
      srsSession.queue.splice(insertAt, 0, { cardId, bucket: 'learning' });
    }

    saveProgress();
    updateHeaderAndMissionUI();
    nextSrsCard();
  }

  function undoLastSrsRating() {
    const snap = srsSession.lastUndo;
    if (!snap || !srsSession.active) return;

    const srs = ensureSrsState();
    if (snap.prevRecord) {
      srs.cards[snap.cardId] = snap.prevRecord;
    } else {
      delete srs.cards[snap.cardId];
    }
    if (snap.prevLearned) state.learnedIds.add(snap.cardId);
    else state.learnedIds.delete(snap.cardId);
    state.stars = snap.prevStars;
    srs.stats = snap.prevStats;

    // Remove any re-queued duplicate of this card and push current item back to front
    srsSession.queue = srsSession.queue.filter(q => q.cardId !== snap.cardId);
    if (srsSession.currentItem) {
      srsSession.queue.unshift(srsSession.currentItem);
    }
    srsSession.currentItem = snap.item;
    srsSession.revealed = false;
    srsSession.reviewedInSession = Math.max(0, srsSession.reviewedInSession - 1);
    srsSession.lastUndo = null;

    saveProgress();
    updateHeaderAndMissionUI();
    playSoundEffect('pop');
    renderSrsStudyCard();
  }

  function finishSrsSession() {
    srsSession.active = false;
    srsSession.currentItem = null;

    $('srs-study').classList.add('hidden');
    $('srs-done').classList.remove('hidden');

    const acc = srsSession.reviewedInSession > 0
      ? Math.round((srsSession.correctInSession / srsSession.reviewedInSession) * 100)
      : 100;

    $('srs-done-reviewed').textContent = srsSession.reviewedInSession;
    $('srs-done-accuracy').textContent = `${ acc }%`;
    $('srs-done-stars').textContent = `+${ srsSession.starsInSession } ⭐`;

    // Tomorrow forecast
    const srs = ensureSrsState();
    const tomorrowEnd = Date.now() + DAY_MS;
    const dueTomorrow = Object.values(srs.cards).filter(r => r.state === 'review' && r.due <= tomorrowEnd).length;
    $('srs-done-forecast').textContent = `📅 Dự kiến ngày mai có khoảng ${ dueTomorrow } thẻ đến hạn ôn tập lại.`;

    playSoundEffect('star');
    launchConfettiBurst();
    renderSrsOverview();
  }

  function showSrsOverviewPanel() {
    srsSession.active = false;
    $('srs-study').classList.add('hidden');
    $('srs-done').classList.add('hidden');
    $('srs-overview').classList.remove('hidden');
    renderSrsOverview();
  }

  window.openSrsHub = function (autoDeckKey = null) {
    openView('view-srs');
    showSrsOverviewPanel();
    if (autoDeckKey) {
      startSrsSession(autoDeckKey);
    }
  };

  window.refreshSrsUI = function () {
    renderSrsOverview();
  };

  /* ------------------------------------------------------------------
     Event Binding
     ------------------------------------------------------------------ */
  function bindSrsEvents() {
    if (!$('view-srs')) return;

    $('btn-srs-back-home').addEventListener('click', () => {
      playSoundEffect('pop');
      srsSession.active = false;
      openView('view-home');
      updateHeaderAndMissionUI();
      renderRecentActivityCard();
    });

    $('btn-srs-back-decks').addEventListener('click', () => {
      playSoundEffect('pop');
      showSrsOverviewPanel();
    });

    $('btn-srs-done-decks').addEventListener('click', () => {
      playSoundEffect('pop');
      showSrsOverviewPanel();
    });

    $('btn-srs-study-more').addEventListener('click', () => {
      playSoundEffect('pop');
      startSrsSession(srsSession.deckKey, { extraNew: 10 });
    });

    $('btn-srs-cram').addEventListener('click', () => {
      playSoundEffect('pop');
      startSrsSession('all', { cram: true });
    });

    // Direction switcher
    document.querySelectorAll('#srs-direction-bar [data-dir]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        srsSession.direction = btn.dataset.dir;
        document.querySelectorAll('#srs-direction-bar [data-dir]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Daily new limit select
    $('srs-daily-limit').addEventListener('change', e => {
      const srs = ensureSrsState();
      srs.stats.dailyNewLimit = Number(e.target.value) || 20;
      saveProgress();
      updateHeaderAndMissionUI();
      renderSrsOverview();
      playSoundEffect('pop');
    });

    // Topic quick launch
    $('srs-topic-select').addEventListener('change', e => {
      const val = e.target.value;
      if (!val) return;
      playSoundEffect('pop');
      e.target.value = '';
      const counts = computeDeckCounts(val);
      startSrsSession(val, { cram: counts.totalDueNow === 0 });
    });

    // Active card buttons
    $('btn-srs-show-answer').addEventListener('click', revealSrsAnswer);
    $('btn-srs-undo').addEventListener('click', undoLastSrsRating);

    $('btn-srs-speak').addEventListener('click', () => {
      const card = srsSession.currentItem && window.getVocabCardById(srsSession.currentItem.cardId);
      if (card) speakEnglish(card.en, 0.9);
    });
    $('btn-srs-speak-slow').addEventListener('click', () => {
      const card = srsSession.currentItem && window.getVocabCardById(srsSession.currentItem.cardId);
      if (card) speakEnglish(card.en, 0.55);
    });
    $('btn-srs-speak-ex').addEventListener('click', () => {
      const card = srsSession.currentItem && window.getVocabCardById(srsSession.currentItem.cardId);
      if (card) speakEnglish(card.exampleEn, 0.85);
    });

    document.querySelectorAll('#srs-rating-bar [data-rating]').forEach(btn => {
      btn.addEventListener('click', () => {
        rateCurrentSrsCard(Number(btn.dataset.rating));
      });
    });

    // AnkiDroid Desktop Keyboard Shortcuts: Space (Show), 1-4 (Rate), Z (Undo)
    window.addEventListener('keydown', e => {
      if (!srsSession.active) return;
      const inSrsView = $('view-srs').classList.contains('active');
      if (!inSrsView) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;

      if (e.key === ' ' && !srsSession.revealed) {
        e.preventDefault();
        revealSrsAnswer();
      } else if (srsSession.revealed && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        rateCurrentSrsCard(Number(e.key));
      } else if ((e.key === 'z' || e.key === 'Z') && srsSession.lastUndo) {
        e.preventDefault();
        undoLastSrsRating();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', bindSrsEvents);
})();
