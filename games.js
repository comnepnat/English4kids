/**
 * English4Kids - 6 Interactive Mini-Games with 3 Difficulty Levels & Montessori Methodology
 * 1. Memory Match (4, 6, or 8 pairs)
 * 2. Picture Match (2x4, 3x4, or 4x5 rounds)
 * 3. Balloon Catch (60s/slow, 45s/medium, 45s/fast + Golden Bonus Balloons x2 stars & Combo)
 * 4. Montessori Category Baskets (Phân Loại Giỏ Montessori - 2 or 3 baskets)
 * 5. Montessori Moveable Alphabet (Bảng Chữ Cái Rời Montessori - color-coded vowels & consonants)
 * 6. Context Sentence Builder (Ghép Câu Giao Tiếp - audio & contextual sentence completion)
 */
(function () {
  const GAMES_META = {
    memory: {
      icon: '🃏',
      title: 'Lật Thẻ Nhớ (Memory Match)',
      instruction: 'Lật 2 thẻ để tìm cặp HÌNH và CHỮ giống nhau. Tìm hết các cặp để thắng nhé!'
    },
    match: {
      icon: '🔗',
      title: 'Nối Hình Với Chữ',
      instruction: 'Chạm vào một hình, nghe đọc phát âm, rồi chạm vào chữ tiếng Anh đúng với hình đó!'
    },
    balloon: {
      icon: '🎈',
      title: 'Bắt Bóng Từ Vựng',
      instruction: 'Nghe từ tiếng Anh và chạm thật nhanh vào quả bóng đúng! Bóng Vàng 🌟 thưởng +2 Sao!'
    },
    sorting: {
      icon: '🧺',
      title: 'Phân Loại Giỏ Montessori',
      instruction: 'Quan sát thẻ từ vựng ở khay giữa và chạm vào đúng Giỏ Chủ Đề Montessori để phân loại nhé!'
    },
    wordbuilder: {
      icon: '🔤',
      title: 'Bảng Chữ Cái Rời Montessori',
      instruction: 'Chạm vào các thẻ chữ cái rời Montessori (Nguyên âm Xanh dương • Phụ âm Đỏ hồng) để ghép thành từ đúng!'
    },
    sentence: {
      icon: '💬',
      title: 'Ghép Câu Giao Tiếp',
      instruction: 'Nghe câu giao tiếp thực tế và chọn từ vựng đúng nhất để hoàn thành chỗ trống trong câu!'
    }
  };

  const DIFF_CONFIG = {
    easy: {
      memoryPairs: 4,
      matchRounds: 2,
      matchPerRound: 4,
      balloonSeconds: 60,
      balloonDuration: [7.6, 9.4],
      balloonInterval: 1450,
      goldenChance: 0.15,
      sortingBaskets: 2,
      sortingItems: 6,
      wbRounds: 4,
      wbExtraLetters: 0,
      sentenceRounds: 5
    },
    medium: {
      memoryPairs: 6,
      matchRounds: 3,
      matchPerRound: 4,
      balloonSeconds: 45,
      balloonDuration: [5.8, 7.6],
      balloonInterval: 1120,
      goldenChance: 0.2,
      sortingBaskets: 3,
      sortingItems: 8,
      wbRounds: 6,
      wbExtraLetters: 2,
      sentenceRounds: 7
    },
    hard: {
      memoryPairs: 8,
      matchRounds: 4,
      matchPerRound: 5,
      balloonSeconds: 45,
      balloonDuration: [4.2, 5.6],
      balloonInterval: 920,
      goldenChance: 0.28,
      sortingBaskets: 3,
      sortingItems: 10,
      wbRounds: 8,
      wbExtraLetters: 3,
      sentenceRounds: 10
    }
  };

  const PAIR_COLORS = [
    { bg: '#DCFCE7', border: '#22C55E' },
    { bg: '#FEF3C7', border: '#F59E0B' },
    { bg: '#E0F2FE', border: '#0EA5E9' },
    { bg: '#FCE7F3', border: '#EC4899' },
    { bg: '#EDE9FE', border: '#8B5CF6' }
  ];

  const BALLOON_COLORS = ['#FF6B6B', '#FFB020', '#4ADE80', '#38BDF8', '#F472B6', '#A78BFA', '#FB923C'];
  const VOWELS_SET = new Set(['A', 'E', 'I', 'O', 'U']);

  const g = {
    current: null,
    topicId: 'all',
    difficulty: 'medium',
    timers: [],
    memory: {},
    match: {},
    balloon: {},
    sorting: {},
    wordbuilder: {},
    sentence: {}
  };

  const $ = id => document.getElementById(id);

  /* ------------------------------------------------------------------
     Shared helpers
     ------------------------------------------------------------------ */
  function getPool() {
    const all = TOPICS_DATA.flatMap(t => t.cards.map(c => ({ ...c, topicId: t.id, topicTitleVi: t.titleVi, topicIcon: t.icon })));
    if (g.topicId === 'all') return all;
    const topic = TOPICS_DATA.find(t => t.id === g.topicId);
    return topic ? topic.cards.map(c => ({ ...c, topicId: topic.id, topicTitleVi: topic.titleVi, topicIcon: topic.icon })) : all;
  }

  function uniquePool() {
    const seen = new Set();
    return getPool().filter(card => {
      const key = card.colorHex
        ? `color:${ card.colorHex }`
        : typeof card.numberVal === 'number'
          ? `num:${ card.numberVal }`
          : card.emoji;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function cardPicHTML(card) {
    if (card.colorHex) {
      return `<span class="pic-swatch" style="background:${ card.colorHex }"></span>`;
    }
    if (typeof card.numberVal === 'number') {
      return `<span class="pic-number">${ card.numberVal }</span>`;
    }
    return `<span class="pic-emoji">${ card.emoji }</span>`;
  }

  function later(fn, ms) {
    const id = setTimeout(fn, ms);
    g.timers.push(id);
    return id;
  }

  function every(fn, ms) {
    const id = setInterval(fn, ms);
    g.timers.push(id);
    return id;
  }

  function clearTimers() {
    g.timers.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    g.timers = [];
  }

  function setHud(left, mid, right) {
    $('game-hud-left').textContent = left;
    $('game-hud-mid').textContent = mid;
    $('game-hud-right').textContent = right;
  }

  function awardStars(n) {
    if (n <= 0) return;
    state.stars += n;
    saveProgress();
    updateHeaderAndMissionUI();
  }

  function stopAll() {
    clearTimers();
    if (g.balloon) g.balloon.running = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const sky = $('balloon-sky');
    if (sky) sky.querySelectorAll('.balloon').forEach(b => b.remove());
  }

  function showResult({ rating, earned, title, text }) {
    awardStars(earned);
    $('game-result-emoji').textContent = rating >= 3 ? '🏆' : rating === 2 ? '🎉' : rating === 1 ? '👍' : '💪';
    $('game-result-title').textContent = title;
    $('game-result-stars').textContent = '⭐'.repeat(rating) + '☆'.repeat(3 - rating);
    $('game-result-text').textContent = text;
    $('game-result-earned').textContent = earned > 0 ? `+${ earned } Sao vàng ⭐` : 'Thử lại để nhận sao nhé!';
    $('game-result-modal').classList.remove('hidden');
    if (rating > 0) {
      playSoundEffect('star');
      launchConfettiBurst();
      speakEnglish(rating >= 3 ? 'Excellent! You are a superstar!' : 'Well done!', 0.95);
    }
  }

  function hideResult() {
    $('game-result-modal').classList.add('hidden');
  }

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  function populateTopicSelect() {
    const select = $('game-topic-select');
    const options = [`<option value="all">🌈 Tất cả chủ đề (${ TOPICS_DATA.reduce((s, t) => s + t.cards.length, 0) } từ)</option>`].concat(
      TOPICS_DATA.map(t => `<option value="${ t.id }">${ t.icon } ${ t.titleVi } (${ t.cards.length })</option>`)
    );
    select.innerHTML = options.join('');
    select.value = g.topicId;
  }

  function openGame(name) {
    if (!GAMES_META[name]) name = 'memory';
    g.current = name;
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-games').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const meta = GAMES_META[name];
    $('game-title-icon').textContent = meta.icon;
    $('game-title-text').textContent = meta.title;
    $('game-instruction').textContent = meta.instruction;

    if (typeof window.recordActivity === 'function') {
      window.recordActivity({
        kind: 'game',
        gameName: name,
        icon: meta.icon,
        title: meta.title,
        subtitle: 'Khu trò chơi tương tác • Chơi tiếp để nhận sao!'
      });
    }

    ['memory', 'match', 'balloon', 'sorting', 'wordbuilder', 'sentence'].forEach(n => {
      const board = $(`game-${ n }`);
      if (board) board.classList.toggle('hidden', n !== name);
    });

    startCurrent();
  }

  window.openMiniGame = openGame;

  function startCurrent() {
    stopAll();
    hideResult();
    if (g.current === 'memory') startMemory();
    else if (g.current === 'match') startMatch();
    else if (g.current === 'balloon') startBalloon();
    else if (g.current === 'sorting') startSorting();
    else if (g.current === 'wordbuilder') startWordBuilder();
    else if (g.current === 'sentence') startSentenceGame();
  }

  function goHomeFromGames() {
    stopAll();
    hideResult();
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-games-hub').classList.add('active');
  }

  /* ------------------------------------------------------------------
     Game 1: Memory Match
     ------------------------------------------------------------------ */
  function startMemory() {
    const cfg = DIFF_CONFIG[g.difficulty];
    const pool = uniquePool();
    const pairCount = Math.min(cfg.memoryPairs, pool.length);
    const picks = shuffleArray(pool).slice(0, pairCount);
    const deck = shuffleArray(
      picks.flatMap(card => [
        { card, type: 'pic' },
        { card, type: 'word' }
      ])
    );

    g.memory = { open: [], matched: 0, moves: 0, total: picks.length, lock: false };

    const grid = $('memory-grid');
    grid.innerHTML = '';

    deck.forEach((item, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'memory-card';
      el.id = `memory-card-${ i }`;
      el.setAttribute('aria-label', 'Thẻ úp');
      const front = item.type === 'pic'
        ? cardPicHTML(item.card)
        : `<span class="mem-word">${ item.card.en }</span>`;
      el.innerHTML = `
        <div class="memory-inner">
          <div class="memory-face memory-back-face">⭐</div>
          <div class="memory-face memory-front-face ${ item.type === 'word' ? 'is-word' : '' }">${ front }</div>
        </div>
      `;
      el.addEventListener('click', () => flipMemoryCard(el, item));
      grid.appendChild(el);
    });

    updateMemoryHud();
  }

  function updateMemoryHud() {
    const m = g.memory;
    const bonus = g.difficulty === 'hard' ? 4 : 3;
    setHud(`🧩 Cặp: ${ m.matched } / ${ m.total }`, `👣 Lượt lật: ${ m.moves }`, `⭐ Thưởng: tối đa ${ bonus } sao`);
  }

  function flipMemoryCard(el, item) {
    const m = g.memory;
    if (m.lock || el.classList.contains('flipped') || el.classList.contains('matched')) return;

    el.classList.add('flipped');
    playSoundEffect('flip');
    speakEnglish(item.card.en, 0.9);
    m.open.push({ el, item });
    if (m.open.length < 2) return;

    m.moves += 1;
    m.lock = true;
    const [a, b] = m.open;
    const isPair = a.item.card.id === b.item.card.id && a.item.type !== b.item.type;

    if (isPair) {
      later(() => {
        a.el.classList.add('matched');
        b.el.classList.add('matched');
        playSoundEffect('correct');
        m.matched += 1;
        m.open = [];
        m.lock = false;
        updateMemoryHud();
        if (m.matched === m.total) later(finishMemory, 600);
      }, 450);
    } else {
      later(() => {
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        m.open = [];
        m.lock = false;
        updateMemoryHud();
      }, 1050);
    }
    updateMemoryHud();
  }

  function finishMemory() {
    const m = g.memory;
    const rating = m.moves <= m.total + 4 ? 3 : m.moves <= m.total * 2 + 2 ? 2 : 1;
    const earned = rating + (g.difficulty === 'hard' ? 1 : 0);
    showResult({
      rating,
      earned,
      title: 'Bé tìm đủ các cặp rồi!',
      text: `Bé đã tìm được ${ m.total } cặp sau ${ m.moves } lượt lật. Giỏi quá!`
    });
  }

  /* ------------------------------------------------------------------
     Game 2: Picture to Word Match
     ------------------------------------------------------------------ */
  function startMatch() {
    const cfg = DIFF_CONFIG[g.difficulty];
    g.match = {
      round: 0,
      rounds: cfg.matchRounds,
      perRound: cfg.matchPerRound,
      deck: shuffleArray(uniquePool()),
      mistakes: 0,
      selected: null,
      matchedInRound: 0,
      items: []
    };
    renderMatchRound();
  }

  function renderMatchRound() {
    const m = g.match;
    const start = m.round * m.perRound;
    m.items = Array.from({ length: m.perRound }, (_, i) => m.deck[(start + i) % m.deck.length]);
    m.matchedInRound = 0;
    m.selected = null;

    const picsCol = $('match-pictures');
    const wordsCol = $('match-words');
    picsCol.innerHTML = '';
    wordsCol.innerHTML = '';

    shuffleArray(m.items).forEach(card => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'match-item match-pic';
      btn.id = `match-pic-${ card.id }`;
      btn.innerHTML = cardPicHTML(card);
      btn.addEventListener('click', () => handleMatchTap('pic', card, btn));
      picsCol.appendChild(btn);
    });

    shuffleArray(m.items).forEach(card => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'match-item match-word';
      btn.id = `match-word-${ card.id }`;
      btn.textContent = card.en;
      btn.addEventListener('click', () => handleMatchTap('word', card, btn));
      wordsCol.appendChild(btn);
    });

    updateMatchHud();
  }

  function updateMatchHud() {
    const m = g.match;
    setHud(`🔗 Vòng ${ m.round + 1 } / ${ m.rounds }`, `✅ Đã nối: ${ m.matchedInRound } / ${ m.perRound }`, `❌ Nhầm: ${ m.mistakes }`);
  }

  function handleMatchTap(side, card, el) {
    const m = g.match;
    if (el.classList.contains('matched')) return;

    if (!m.selected || m.selected.side === side) {
      if (m.selected) m.selected.el.classList.remove('selected');
      m.selected = { side, card, el };
      el.classList.add('selected');
      playSoundEffect('pop');
      speakEnglish(card.en, 0.88);
      return;
    }

    const prev = m.selected;
    prev.el.classList.remove('selected');
    m.selected = null;

    if (prev.card.id === card.id) {
      const color = PAIR_COLORS[m.matchedInRound % PAIR_COLORS.length];
      [prev.el, el].forEach(node => {
        node.classList.add('matched');
        node.style.setProperty('--pair-bg', color.bg);
        node.style.setProperty('--pair-border', color.border);
      });
      m.matchedInRound += 1;
      playSoundEffect('correct');
      speakEnglish(`${ card.en }!`, 0.92);
      updateMatchHud();

      if (m.matchedInRound === m.perRound) {
        if (m.round < m.rounds - 1) {
          later(() => {
            m.round += 1;
            renderMatchRound();
          }, 950);
        } else {
          later(finishMatch, 750);
        }
      }
    } else {
      m.mistakes += 1;
      playSoundEffect('wrong');
      [prev.el, el].forEach(node => {
        node.classList.add('wrong');
        later(() => node.classList.remove('wrong'), 450);
      });
      updateMatchHud();
    }
  }

  function finishMatch() {
    const m = g.match;
    const rating = m.mistakes === 0 ? 3 : m.mistakes <= 3 ? 2 : 1;
    const earned = rating + (g.difficulty === 'hard' ? 2 : g.difficulty === 'medium' ? 1 : 0);
    showResult({
      rating,
      earned,
      title: 'Nối hình siêu giỏi!',
      text: `Bé đã nối đúng ${ m.rounds * m.perRound } cặp hình - chữ, nhầm ${ m.mistakes } lần.`
    });
  }

  /* ------------------------------------------------------------------
     Game 3: Balloon Catch
     ------------------------------------------------------------------ */
  function startBalloon() {
    const cfg = DIFF_CONFIG[g.difficulty];
    g.balloon = {
      score: 0,
      starsEarned: 0,
      combo: 0,
      timeLeft: cfg.balloonSeconds,
      target: null,
      running: false,
      spawnCount: 0,
      pool: uniquePool(),
      cfg
    };
    $('balloon-start-overlay').classList.remove('hidden');
    $('balloon-start-desc').textContent = `Có ${ cfg.balloonSeconds } giây! Bóng đúng +1 Sao, Bóng Vàng 🌟 thưởng +2 Sao!`;
    $('balloon-target-word').textContent = 'Sẵn sàng chưa?';
    updateBalloonHud();
  }

  function updateBalloonHud() {
    const b = g.balloon;
    setHud(`⏱️ Còn ${ b.timeLeft } giây`, `🎈 Bắt được: ${ b.score }`, `🔥 Combo: ${ b.combo } | ⭐ +${ b.starsEarned }`);
  }

  function runBalloon() {
    const b = g.balloon;
    if (b.running) return;
    b.running = true;
    $('balloon-start-overlay').classList.add('hidden');
    pickBalloonTarget();
    spawnBalloon();
    every(spawnBalloon, b.cfg.balloonInterval);
    every(() => {
      b.timeLeft -= 1;
      updateBalloonHud();
      if (b.timeLeft <= 0) endBalloon();
    }, 1000);
  }

  function pickBalloonTarget() {
    const b = g.balloon;
    let next = b.pool[Math.floor(Math.random() * b.pool.length)];
    if (b.pool.length > 1) {
      while (b.target && next.id === b.target.id) {
        next = b.pool[Math.floor(Math.random() * b.pool.length)];
      }
    }
    b.target = next;
    $('balloon-target-word').textContent = next.en;
    speakEnglish(next.en, 0.85);
  }

  function spawnBalloon() {
    const b = g.balloon;
    if (!b.running) return;
    const sky = $('balloon-sky');
    b.spawnCount += 1;

    const targetVisible = Array.from(sky.querySelectorAll('.balloon:not(.popped)'))
      .some(el => el.dataset.cardId === b.target.id);
    const useTarget = Math.random() < 0.38 || (!targetVisible && b.spawnCount % 2 === 0);

    let card = b.target;
    if (!useTarget) {
      const distractors = b.pool.filter(c => c.id !== b.target.id);
      if (distractors.length) card = distractors[Math.floor(Math.random() * distractors.length)];
    }

    const isGolden = useTarget && Math.random() < b.cfg.goldenChance;
    const [minD, maxD] = b.cfg.balloonDuration;
    const dur = minD + Math.random() * (maxD - minD);

    const el = document.createElement('button');
    el.type = 'button';
    el.className = `balloon ${ isGolden ? 'golden' : '' }`;
    el.dataset.cardId = card.id;
    el.dataset.golden = isGolden ? '1' : '0';
    el.style.left = `${ 4 + Math.random() * 78 }%`;
    el.style.setProperty('--dur', `${ dur.toFixed(2) }s`);
    el.style.setProperty('--balloon-color', isGolden ? '#F59E0B' : BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]);
    el.innerHTML = `
      ${ isGolden ? '<span class="balloon-gold-tag">x2⭐</span>' : '' }
      <span class="balloon-pic">${ cardPicHTML(card) }</span>
      <span class="balloon-string"></span>
    `;
    el.addEventListener('animationend', e => {
      if (e.target === el) el.remove();
    });
    el.addEventListener('pointerdown', e => {
      e.preventDefault();
      handleBalloonTap(el, card);
    });
    sky.appendChild(el);
  }

  function handleBalloonTap(el, card) {
    const b = g.balloon;
    if (!b.running || el.classList.contains('popped')) return;

    if (card.id === b.target.id) {
      el.classList.add('popped');
      const bonus = el.dataset.golden === '1' ? 2 : 1;
      b.score += 1;
      b.combo += 1;
      b.starsEarned += bonus;
      playSoundEffect(bonus > 1 ? 'star' : 'correct');
      updateBalloonHud();
      later(() => el.remove(), 350);
      pickBalloonTarget();
    } else {
      b.combo = 0;
      el.classList.remove('wrong');
      void el.offsetWidth;
      el.classList.add('wrong');
      playSoundEffect('wrong');
      updateBalloonHud();
      speakEnglish(b.target.en, 0.85);
    }
  }

  function endBalloon() {
    const b = g.balloon;
    const score = b.score;
    const earned = b.starsEarned;
    stopAll();
    const rating = score >= 12 ? 3 : score >= 6 ? 2 : score >= 1 ? 1 : 0;
    showResult({
      rating,
      earned,
      title: score > 0 ? 'Hết giờ rồi!' : 'Cố lên bé ơi!',
      text: `Bé đã bắt được ${ score } quả bóng đúng và giành được ${ earned } sao thưởng!`
    });
  }

  /* ------------------------------------------------------------------
     Game 4: Montessori Category Baskets (Phân Loại Giỏ Montessori)
     ------------------------------------------------------------------ */
  function startSorting() {
    const cfg = DIFF_CONFIG[g.difficulty];
    const basketCount = cfg.sortingBaskets; // 2 or 3
    const totalItems = cfg.sortingItems;    // 6, 8, or 10

    // Choose 2 or 3 distinct topics to serve as Montessori Category Baskets
    const ag = typeof window.getActiveAgeGroup === 'function' ? window.getActiveAgeGroup() : null;
    let topicCandidates = TOPICS_DATA;
    if (g.topicId !== 'all') {
      const selectedTopic = TOPICS_DATA.find(t => t.id === g.topicId);
      const others = shuffleArray(TOPICS_DATA.filter(t => t.id !== g.topicId));
      topicCandidates = selectedTopic ? [selectedTopic, ...others] : TOPICS_DATA;
    } else if (ag && ag.levels && ag.levels.length > 0) {
      const ageFit = TOPICS_DATA.filter(t => ag.levels.includes(t.level));
      if (ageFit.length >= basketCount) topicCandidates = shuffleArray(ageFit);
    } else {
      topicCandidates = shuffleArray(TOPICS_DATA);
    }

    const baskets = topicCandidates.slice(0, basketCount).map(t => ({
      id: t.id,
      icon: t.icon,
      titleVi: t.titleVi,
      titleEn: t.titleEn,
      color: t.theme ? t.theme.accent : '#FF7A00',
      bg: t.theme ? t.theme.bgSoft : '#FFF4D6',
      sorted: []
    }));

    // Build mixed item queue from the chosen basket topics
    const rawItems = [];
    baskets.forEach(b => {
      const topicObj = TOPICS_DATA.find(t => t.id === b.id);
      if (topicObj) {
        const picks = shuffleArray(topicObj.cards).slice(0, Math.ceil(totalItems / basketCount) + 1);
        picks.forEach(c => rawItems.push({ ...c, basketId: b.id, basketTitle: b.titleVi }));
      }
    });

    const queue = shuffleArray(rawItems).slice(0, totalItems);
    g.sorting = {
      baskets,
      queue,
      index: 0,
      mistakes: 0,
      combo: 0
    };

    renderSortingRound();
  }

  function updateSortingHud() {
    const s = g.sorting;
    setHud(
      `🧺 Thẻ ${ Math.min(s.index + 1, s.queue.length) } / ${ s.queue.length }`,
      `🔥 Combo: ${ s.combo }`,
      `❌ Nhầm: ${ s.mistakes }`
    );
  }

  function renderSortingRound() {
    const s = g.sorting;
    updateSortingHud();
    const card = s.queue[s.index];
    if (!card) {
      finishSorting();
      return;
    }

    const stage = $('sorting-stage');
    if (!stage) return;

    stage.innerHTML = `
      <div class="sorting-current-tray">
        <div class="sorting-card-preview" id="sorting-active-card">
          <div class="sorting-card-pic">${ cardPicHTML(card) }</div>
          <div class="sorting-card-words">
            <strong class="sorting-en">${ card.en }</strong>
            <span class="sorting-ipa">${ card.phonetic || '' }</span>
            <span class="sorting-vi">${ card.vi }</span>
          </div>
          <button type="button" class="btn-speak-slow" id="btn-sorting-audio">🔊 Nghe</button>
        </div>
        <p class="sorting-prompt-hint">👇 Chạm vào đúng <strong>Giỏ Chủ Đề Montessori</strong> bên dưới để cất thẻ này vào giỏ:</p>
      </div>
      <div class="sorting-baskets-grid cols-${ s.baskets.length }" id="sorting-baskets-grid"></div>
    `;

    $('btn-sorting-audio').addEventListener('click', () => speakEnglish(card.en, 0.88));

    const grid = $('sorting-baskets-grid');
    s.baskets.forEach(b => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sorting-basket-btn';
      btn.dataset.basketId = b.id;
      btn.style.setProperty('--basket-color', b.color);
      btn.style.setProperty('--basket-bg', b.bg);

      const miniChips = b.sorted.slice(-4).map(c => `<span class="basket-mini-chip">${ c.emoji } ${ c.en }</span>`).join('');
      btn.innerHTML = `
        <div class="basket-top">
          <span class="basket-icon">🧺 ${ b.icon }</span>
          <span class="basket-count">${ b.sorted.length } thẻ</span>
        </div>
        <div class="basket-title">${ b.titleVi }</div>
        <div class="basket-sub">${ b.titleEn }</div>
        <div class="basket-items-tray">${ miniChips || '<span class="basket-empty-hint">Chạm để bỏ thẻ vào giỏ</span>' }</div>
      `;
      btn.addEventListener('click', () => handleSortingTap(btn, b, card));
      grid.appendChild(btn);
    });

    speakEnglish(card.en, 0.88);
  }

  function handleSortingTap(btn, basket, card) {
    const s = g.sorting;
    if (basket.id === card.basketId) {
      basket.sorted.push(card);
      s.combo += 1;
      btn.classList.add('correct');
      playSoundEffect('correct');
      state.learnedIds.add(card.id);
      saveProgress();
      updateHeaderAndMissionUI();
      later(() => {
        s.index += 1;
        renderSortingRound();
      }, 480);
    } else {
      s.mistakes += 1;
      s.combo = 0;
      btn.classList.remove('wrong');
      void btn.offsetWidth;
      btn.classList.add('wrong');
      playSoundEffect('wrong');
      updateSortingHud();
      speakEnglish(card.en, 0.85);
    }
  }

  function finishSorting() {
    const s = g.sorting;
    const rating = s.mistakes === 0 ? 3 : s.mistakes <= 2 ? 2 : 1;
    const earned = rating + (g.difficulty === 'hard' ? 2 : g.difficulty === 'medium' ? 1 : 0);
    showResult({
      rating,
      earned,
      title: 'Phân loại giỏ Montessori xuất sắc!',
      text: `Bé đã phân loại đúng ${ s.queue.length } thẻ từ vựng vào các giỏ chủ đề với ${ s.mistakes } lần nhầm!`
    });
  }

  /* ------------------------------------------------------------------
     Game 5: Montessori Moveable Alphabet (Bảng Chữ Cái Rời Montessori)
     ------------------------------------------------------------------ */
  function startWordBuilder() {
    const cfg = DIFF_CONFIG[g.difficulty];
    const candidates = uniquePool().filter(c => /^[a-zA-Z]{3,9}$/.test(c.en.trim()));
    const fallback = TOPICS_DATA.flatMap(t => t.cards).filter(c => /^[a-zA-Z]{3,9}$/.test(c.en.trim()));
    const source = candidates.length >= cfg.wbRounds ? candidates : fallback;
    const queue = shuffleArray(source).slice(0, cfg.wbRounds);

    g.wordbuilder = {
      queue,
      index: 0,
      mistakes: 0,
      extraLetters: cfg.wbExtraLetters,
      placed: [],
      tiles: []
    };

    setupWordBuilderRound();
  }

  function setupWordBuilderRound() {
    const wb = g.wordbuilder;
    const card = wb.queue[wb.index];
    if (!card) {
      finishWordBuilder();
      return;
    }

    const letters = card.en.trim().toUpperCase().split('');
    const distractors = 'AEIOUBCDFGHJKLMNPRSTVWYZ'.split('').filter(ch => !letters.includes(ch));
    const extras = shuffleArray(distractors).slice(0, wb.extraLetters);
    const allChars = shuffleArray([...letters, ...extras]);

    wb.targetLetters = letters;
    wb.placed = [];
    wb.tiles = allChars.map((ch, idx) => ({
      id: `tile_${ idx }`,
      ch,
      isVowel: VOWELS_SET.has(ch),
      used: false
    }));

    renderWordBuilderUI();
    speakEnglish(card.en, 0.88);
  }

  function updateWordBuilderHud() {
    const wb = g.wordbuilder;
    setHud(
      `🔤 Từ ${ Math.min(wb.index + 1, wb.queue.length) } / ${ wb.queue.length }`,
      `🔵 Nguyên âm • 🔴 Phụ âm`,
      `❌ Nhầm: ${ wb.mistakes }`
    );
  }

  function renderWordBuilderUI() {
    const wb = g.wordbuilder;
    const card = wb.queue[wb.index];
    if (!card) return;
    updateWordBuilderHud();

    const stage = $('wordbuilder-stage');
    if (!stage) return;

    stage.innerHTML = `
      <div class="wb-prompt-card">
        <div class="wb-pic">${ cardPicHTML(card) }</div>
        <div class="wb-cue-info">
          <div class="wb-vi">${ card.vi }</div>
          <div class="wb-ipa">${ card.phonetic || '' }</div>
          <div class="wb-audio-btns">
            <button type="button" class="btn-speak-primary" id="btn-wb-speak">🔊 Nghe từ</button>
            <button type="button" class="btn-secondary-pill" id="btn-wb-hint">💡 Gợi ý 1 chữ</button>
            <button type="button" class="btn-secondary-pill" id="btn-wb-clear">🔄 Xếp lại</button>
          </div>
        </div>
      </div>
      <div class="wb-montessori-mat">
        <div class="wb-slots-row" id="wb-slots-row"></div>
        <div class="wb-tiles-bank" id="wb-tiles-bank"></div>
      </div>
    `;

    $('btn-wb-speak').addEventListener('click', () => speakEnglish(card.en, 0.86));
    $('btn-wb-clear').addEventListener('click', () => {
      playSoundEffect('pop');
      wb.placed = [];
      wb.tiles.forEach(t => { t.used = false; });
      renderWordBuilderUI();
    });
    $('btn-wb-hint').addEventListener('click', () => {
      const nextPos = wb.placed.length;
      if (nextPos >= wb.targetLetters.length) return;
      const neededChar = wb.targetLetters[nextPos];
      const tile = wb.tiles.find(t => !t.used && t.ch === neededChar);
      if (tile) {
        handleWordBuilderTileTap(tile);
      }
    });

    const slotsRow = $('wb-slots-row');
    wb.targetLetters.forEach((targetCh, idx) => {
      const placedTile = wb.placed[idx];
      const slot = document.createElement('button');
      slot.type = 'button';
      const vowelClass = placedTile ? (placedTile.isVowel ? 'is-vowel' : 'is-consonant') : '';
      slot.className = `wb-letter-slot ${ placedTile ? 'filled' : '' } ${ vowelClass }`;
      slot.textContent = placedTile ? placedTile.ch : '_';
      if (placedTile && idx === wb.placed.length - 1) {
        slot.addEventListener('click', () => {
          playSoundEffect('pop');
          placedTile.used = false;
          wb.placed.pop();
          renderWordBuilderUI();
        });
      }
      slotsRow.appendChild(slot);
    });

    const bank = $('wb-tiles-bank');
    wb.tiles.forEach(tile => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `wb-letter-tile ${ tile.isVowel ? 'is-vowel' : 'is-consonant' } ${ tile.used ? 'used' : '' }`;
      btn.dataset.letter = tile.ch;
      btn.textContent = tile.ch;
      btn.disabled = tile.used;
      btn.addEventListener('click', () => handleWordBuilderTileTap(tile, btn));
      bank.appendChild(btn);
    });
  }

  function handleWordBuilderTileTap(tile, btnEl) {
    const wb = g.wordbuilder;
    const card = wb.queue[wb.index];
    const nextPos = wb.placed.length;
    if (!card || nextPos >= wb.targetLetters.length || tile.used) return;

    const expectedChar = wb.targetLetters[nextPos];
    if (tile.ch === expectedChar) {
      tile.used = true;
      wb.placed.push(tile);
      playSoundEffect('pop');
      renderWordBuilderUI();

      if (wb.placed.length === wb.targetLetters.length) {
        playSoundEffect('correct');
        state.learnedIds.add(card.id);
        saveProgress();
        updateHeaderAndMissionUI();
        speakEnglish(`${ card.en }!`, 0.92);
        later(() => {
          wb.index += 1;
          setupWordBuilderRound();
        }, 780);
      }
    } else {
      wb.mistakes += 1;
      playSoundEffect('wrong');
      if (btnEl) {
        btnEl.classList.remove('wrong');
        void btnEl.offsetWidth;
        btnEl.classList.add('wrong');
      }
      updateWordBuilderHud();
    }
  }

  function finishWordBuilder() {
    const wb = g.wordbuilder;
    const rating = wb.mistakes === 0 ? 3 : wb.mistakes <= 3 ? 2 : 1;
    const earned = rating + (g.difficulty === 'hard' ? 2 : g.difficulty === 'medium' ? 1 : 0);
    showResult({
      rating,
      earned,
      title: 'Ghép chữ Montessori siêu chuẩn!',
      text: `Bé đã ghép đúng ${ wb.queue.length } từ tiếng Anh bằng Bảng Chữ Cái Rời với ${ wb.mistakes } lần nhầm!`
    });
  }

  /* ------------------------------------------------------------------
     Game 6: Context Sentence Builder (Ghép Câu Giao Tiếp)
     ------------------------------------------------------------------ */
  function maskSentenceTarget(sentence, word) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${ escaped }\\b`, 'i');
    if (regex.test(sentence)) {
      return sentence.replace(regex, '_______');
    }
    return `${ sentence } (_______)`;
  }

  function startSentenceGame() {
    const cfg = DIFF_CONFIG[g.difficulty];
    const pool = uniquePool().filter(c => c.exampleEn && c.exampleEn.length > 8);
    const queue = shuffleArray(pool).slice(0, cfg.sentenceRounds);

    g.sentence = {
      queue,
      index: 0,
      mistakes: 0,
      combo: 0,
      locked: false
    };

    renderSentenceRound();
  }

  function updateSentenceHud() {
    const st = g.sentence;
    setHud(
      `💬 Câu ${ Math.min(st.index + 1, st.queue.length) } / ${ st.queue.length }`,
      `🔥 Combo: ${ st.combo }`,
      `❌ Nhầm: ${ st.mistakes }`
    );
  }

  function renderSentenceRound() {
    const st = g.sentence;
    const card = st.queue[st.index];
    if (!card) {
      finishSentenceGame();
      return;
    }
    st.locked = false;
    updateSentenceHud();

    const stage = $('sentence-stage');
    if (!stage) return;

    const all = uniquePool();
    const distractors = shuffleArray(all.filter(c => c.id !== card.id)).slice(0, 3);
    const options = shuffleArray([card, ...distractors]);
    const masked = maskSentenceTarget(card.exampleEn, card.exampleWord || card.en);

    stage.innerHTML = `
      <div class="sent-prompt-card">
        <div class="sent-card-top">
          <span class="sent-topic-tag">${ card.topicIcon || '💬' } ${ card.topicTitleVi || 'Giao tiếp' }</span>
          <button type="button" class="btn-speak-primary" id="btn-sent-listen">🔊 Nghe cả câu</button>
        </div>
        <div class="sent-en-line" id="sent-en-line">${ masked.replace('_______', '<span class="sent-blank-pill">_______</span>') }</div>
        <div class="sent-vi-line">🇻🇳 ${ card.exampleVi }</div>
      </div>
      <div class="sent-options-grid" id="sent-options-grid"></div>
    `;

    $('btn-sent-listen').addEventListener('click', () => speakEnglish(card.exampleEn, 0.88));

    const grid = $('sent-options-grid');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sent-option-btn';
      btn.dataset.cardId = opt.id;
      btn.innerHTML = `
        <span class="sent-opt-emoji">${ opt.emoji }</span>
        <div class="sent-opt-texts">
          <strong>${ opt.en }</strong>
          <small>${ opt.vi }</small>
        </div>
      `;
      btn.addEventListener('click', () => handleSentenceOptionTap(btn, opt, card));
      grid.appendChild(btn);
    });

    speakEnglish(card.exampleEn, 0.88);
  }

  function handleSentenceOptionTap(btn, chosen, target) {
    const st = g.sentence;
    if (st.locked) return;

    if (chosen.id === target.id) {
      st.locked = true;
      st.combo += 1;
      btn.classList.add('correct');
      const enLine = $('sent-en-line');
      if (enLine) {
        const shownWord = target.exampleWord || target.en;
        enLine.innerHTML = target.exampleEn.replace(
          new RegExp(`\\b${ shownWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }\\b`, 'i'),
          match => `<span class="sent-filled-pill">${ match }</span>`
        );
      }
      playSoundEffect('correct');
      state.learnedIds.add(target.id);
      saveProgress();
      updateHeaderAndMissionUI();
      speakEnglish(target.exampleEn, 0.92);
      later(() => {
        st.index += 1;
        renderSentenceRound();
      }, 900);
    } else {
      st.mistakes += 1;
      st.combo = 0;
      btn.classList.add('wrong');
      btn.disabled = true;
      playSoundEffect('wrong');
      updateSentenceHud();
      speakEnglish(target.en, 0.86);
    }
  }

  function finishSentenceGame() {
    const st = g.sentence;
    const rating = st.mistakes === 0 ? 3 : st.mistakes <= 2 ? 2 : 1;
    const earned = rating + (g.difficulty === 'hard' ? 2 : g.difficulty === 'medium' ? 1 : 0);
    showResult({
      rating,
      earned,
      title: 'Ghép câu giao tiếp xuất sắc!',
      text: `Bé đã hoàn thành ${ st.queue.length } câu giao tiếp tiếng Anh với ${ st.mistakes } lần nhầm!`
    });
  }

  /* ------------------------------------------------------------------
     Wiring
     ------------------------------------------------------------------ */
  function bindGameEvents() {
    document.querySelectorAll('.game-tile[data-game]').forEach(tile => {
      tile.addEventListener('click', () => {
        playSoundEffect('pop');
        openGame(tile.dataset.game);
      });
    });

    document.querySelectorAll('#game-difficulty-bar [data-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        g.difficulty = btn.dataset.diff;
        document.querySelectorAll('#game-difficulty-bar [data-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        startCurrent();
      });
    });

    $('btn-games-back').addEventListener('click', () => {
      playSoundEffect('pop');
      goHomeFromGames();
    });

    $('btn-home-logo').addEventListener('click', () => {
      stopAll();
      hideResult();
    });

    $('game-topic-select').addEventListener('change', e => {
      g.topicId = e.target.value;
      startCurrent();
    });

    $('btn-game-restart').addEventListener('click', () => {
      playSoundEffect('pop');
      startCurrent();
    });

    $('btn-balloon-start').addEventListener('click', () => {
      playSoundEffect('pop');
      runBalloon();
    });

    $('btn-balloon-listen').addEventListener('click', () => {
      if (g.balloon.target) speakEnglish(g.balloon.target.en, 0.85);
    });

    $('btn-result-replay').addEventListener('click', () => {
      playSoundEffect('pop');
      startCurrent();
    });

    $('btn-result-home').addEventListener('click', () => {
      playSoundEffect('pop');
      goHomeFromGames();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateTopicSelect();
    bindGameEvents();
  });
})();
