/**
 * English4Kids - Phase 2: Mini-games
 * - Memory Match (Lật thẻ nhớ): pair a picture card with its English word card.
 * - Picture Match (Nối hình với chữ): tap a picture, then tap the matching English word.
 * - Balloon Catch (Bắt bóng từ vựng): hear a word, pop the balloon with the right picture.
 *
 * Reuses globals from app.js: TOPICS_DATA, state, saveProgress, updateHeaderAndMissionUI,
 * playSoundEffect, speakEnglish, launchConfettiBurst, shuffleArray, renderTopicsGrid.
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
      instruction: 'Chạm vào một hình, nghe Leo đọc, rồi chạm vào chữ tiếng Anh đúng với hình đó!'
    },
    balloon: {
      icon: '🎈',
      title: 'Bắt Bóng Từ Vựng',
      instruction: 'Nghe từ tiếng Anh và chạm thật nhanh vào quả bóng có hình đúng trước khi bóng bay mất!'
    }
  };

  const PAIR_COLORS = [
    { bg: '#DCFCE7', border: '#22C55E' },
    { bg: '#FEF3C7', border: '#F59E0B' },
    { bg: '#E0F2FE', border: '#0EA5E9' },
    { bg: '#FCE7F3', border: '#EC4899' }
  ];

  const BALLOON_COLORS = ['#FF6B6B', '#FFB020', '#4ADE80', '#38BDF8', '#F472B6', '#A78BFA', '#FB923C'];
  const BALLOON_GAME_SECONDS = 45;

  const g = {
    current: null,
    topicId: 'all',
    timers: [],
    memory: {},
    match: {},
    balloon: {}
  };

  const $ = id => document.getElementById(id);

  /* ------------------------------------------------------------------
     Shared helpers
     ------------------------------------------------------------------ */
  function getPool() {
    const all = TOPICS_DATA.flatMap(t => t.cards);
    if (g.topicId === 'all') return all;
    const topic = TOPICS_DATA.find(t => t.id === g.topicId);
    return topic ? topic.cards : all;
  }

  // Remove cards that would look identical as pictures (e.g. Red 🍓 vs Strawberry 🍓)
  function uniquePool() {
    const seen = new Set();
    return getPool().filter(card => {
      const key = card.colorHex ? `color:${ card.colorHex }` : card.emoji;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Color cards show a paint swatch instead of their helper emoji
  function cardPicHTML(card) {
    if (card.colorHex) {
      return `<span class="pic-swatch" style="background:${ card.colorHex }"></span>`;
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
    const options = [`<option value="all">🌈 Tất cả chủ đề</option>`].concat(
      TOPICS_DATA.map(t => `<option value="${ t.id }">${ t.icon } ${ t.titleVi }</option>`)
    );
    select.innerHTML = options.join('');
    select.value = g.topicId;
  }

  function openGame(name) {
    g.current = name;
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-games').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const meta = GAMES_META[name];
    $('game-title-icon').textContent = meta.icon;
    $('game-title-text').textContent = meta.title;
    $('game-instruction').textContent = meta.instruction;

    ['memory', 'match', 'balloon'].forEach(n => {
      $(`game-${ n }`).classList.toggle('hidden', n !== name);
    });

    startCurrent();
  }

  function startCurrent() {
    stopAll();
    hideResult();
    if (g.current === 'memory') startMemory();
    else if (g.current === 'match') startMatch();
    else if (g.current === 'balloon') startBalloon();
  }

  function goHomeFromGames() {
    stopAll();
    hideResult();
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-home').classList.add('active');
    renderTopicsGrid();
  }

  /* ------------------------------------------------------------------
     Game 1: Memory Match
     ------------------------------------------------------------------ */
  function startMemory() {
    const picks = shuffleArray(uniquePool()).slice(0, 6);
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
    setHud(`🧩 Cặp: ${ m.matched } / ${ m.total }`, `👣 Lượt lật: ${ m.moves }`, '⭐ Thưởng: tối đa 3 sao');
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
      }, 1100);
    }
    updateMemoryHud();
  }

  function finishMemory() {
    const m = g.memory;
    const rating = m.moves <= m.total + 4 ? 3 : m.moves <= m.total * 2 + 2 ? 2 : 1;
    showResult({
      rating,
      earned: rating,
      title: 'Bé tìm đủ các cặp rồi!',
      text: `Bé đã tìm được ${ m.total } cặp sau ${ m.moves } lượt lật. Giỏi quá!`
    });
  }

  /* ------------------------------------------------------------------
     Game 2: Picture to Word Match
     ------------------------------------------------------------------ */
  function startMatch() {
    g.match = {
      round: 0,
      rounds: 3,
      perRound: 4,
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

    // First tap, or switching selection on the same side
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
          }, 1000);
        } else {
          later(finishMatch, 800);
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
    showResult({
      rating,
      earned: rating,
      title: 'Nối hình siêu giỏi!',
      text: `Bé đã nối đúng ${ m.rounds * m.perRound } cặp hình - chữ, nhầm ${ m.mistakes } lần.`
    });
  }

  /* ------------------------------------------------------------------
     Game 3: Balloon Catch
     ------------------------------------------------------------------ */
  function startBalloon() {
    g.balloon = {
      score: 0,
      timeLeft: BALLOON_GAME_SECONDS,
      target: null,
      running: false,
      spawnCount: 0,
      pool: uniquePool()
    };
    $('balloon-start-overlay').classList.remove('hidden');
    $('balloon-target-word').textContent = 'Sẵn sàng chưa?';
    updateBalloonHud();
  }

  function updateBalloonHud() {
    const b = g.balloon;
    setHud(`⏱️ Còn ${ b.timeLeft } giây`, `🎈 Bắt được: ${ b.score }`, '⭐ +1 sao mỗi bóng đúng');
  }

  function runBalloon() {
    const b = g.balloon;
    if (b.running) return;
    b.running = true;
    $('balloon-start-overlay').classList.add('hidden');
    pickBalloonTarget();
    spawnBalloon();
    every(spawnBalloon, 1150);
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
    const useTarget = Math.random() < 0.35 || (!targetVisible && b.spawnCount % 2 === 0);

    let card = b.target;
    if (!useTarget) {
      const distractors = b.pool.filter(c => c.id !== b.target.id);
      if (distractors.length) card = distractors[Math.floor(Math.random() * distractors.length)];
    }

    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'balloon';
    el.dataset.cardId = card.id;
    el.style.left = `${ 4 + Math.random() * 78 }%`;
    el.style.setProperty('--dur', `${ 5.8 + Math.random() * 2.2 }s`);
    el.style.setProperty('--balloon-color', BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]);
    el.innerHTML = `<span class="balloon-pic">${ cardPicHTML(card) }</span><span class="balloon-string"></span>`;
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
      b.score += 1;
      playSoundEffect('correct');
      updateBalloonHud();
      later(() => el.remove(), 350);
      pickBalloonTarget();
    } else {
      el.classList.remove('wrong');
      void el.offsetWidth; // restart shake animation
      el.classList.add('wrong');
      playSoundEffect('wrong');
      speakEnglish(b.target.en, 0.85);
    }
  }

  function endBalloon() {
    const b = g.balloon;
    const score = b.score;
    stopAll();
    const rating = score >= 10 ? 3 : score >= 5 ? 2 : score >= 1 ? 1 : 0;
    showResult({
      rating,
      earned: score,
      title: score > 0 ? 'Hết giờ rồi!' : 'Cố lên bé ơi!',
      text: `Bé đã bắt được ${ score } quả bóng đúng trong ${ BALLOON_GAME_SECONDS } giây.`
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

    $('btn-games-back').addEventListener('click', () => {
      playSoundEffect('pop');
      goHomeFromGames();
    });

    // Header logo already returns home (app.js); make sure games stop too
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
