/**
 * English4Kids — Illustrated Read & Listen Storybooks Engine (books.js)
 * ---------------------------------------------------------------------
 * - Home Featured Illustrated Books Shelf (#home-books-shelf)
 * - Full 10-Book Library with CEFR & Age-Group Filtering (#view-books-hub)
 * - Interactive Two-Page Open Picture Book Reader (#view-book-reader):
 *   * Full-bleed hand-painted scenes + full-body characters + tappable 3D props
 *   * Inline clickable highlighted vocabulary with IPA & Vietnamese tooltip
 *   * Read This Page + Auto-Read Full Book (smooth page turning via afterSpeech)
 *   * Toggleable Vietnamese translation + synchronized Reading Speed Slider
 *   * 2-question Reading Comprehension Mini-Quiz & +20 ⭐ reward
 */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);

  const VI_PREF_KEY = 'e4k_book_show_vi';
  let activeBookFilter = 'all';
  let currentBook = null;
  let currentPageIndex = 0;
  let showViTranslation = (() => {
    try {
      const saved = localStorage.getItem(VI_PREF_KEY);
      return saved === null ? true : saved === '1';
    } catch { return true; }
  })();
  let isAutoReading = false;
  let autoTurnHandle = null;
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;
  let inQuizMode = false;

  // Karaoke Read-Aloud state
  let currentPageTokens = [];    // [{ widx, sidx, word, norm, charStart, charEnd, weight, vocabIdx }]
  let currentPageSentences = []; // [{ sidx, text, charStart, charEnd, wordIndices }]
  let karaokeRunId = 0;
  let karaokeRafId = null;
  let karaokeFallbackTimer = null;
  let karaokeBoundarySeen = false;
  let karaokeActiveWidx = -1;

  // Kid Read-Back Microphone state
  let readbackOpen = false;
  let readbackSentenceIdx = 0;   // 0..N-1 or -1 for entire page
  let readbackRecognition = null;
  let isBookMicListening = false;
  const rewardedReadbackKeys = new Set();

  const CHAR_IMG = {
    leo:  'assets/art/painted_leo.webp',
    mimi: 'assets/art/painted_mimi.webp',
    toby: 'assets/art/painted_toby.webp',
    lulu: 'assets/art/painted_lulu.webp'
  };

  function getBookCategory(book) {
    return book.category || 'original';
  }

  function getCategoryBadgeHtml(book) {
    const cat = getBookCategory(book);
    if (cat === 'fairytale') return '<span class="book-cat-badge is-fairytale">🏰 Cổ tích</span>';
    if (cat === 'fable') return '<span class="book-cat-badge is-fable">🦊 Ngụ ngôn</span>';
    return '';
  }

  function syncViVisibility() {
    const readerSection = $('view-book-reader');
    if (readerSection) readerSection.classList.toggle('vi-hidden', !showViTranslation);

    const viEl = $('book-text-vi');
    if (viEl) viEl.classList.toggle('hidden', !showViTranslation);

    const peekBtn = $('btn-book-vi-peek');
    if (peekBtn) peekBtn.classList.toggle('hidden', showViTranslation);

    const quizVi = $('book-quiz-q-vi');
    if (quizVi) quizVi.classList.toggle('hidden', !showViTranslation);

    const subToggle = $('btn-book-vi-toggle');
    if (subToggle) {
      subToggle.textContent = showViTranslation ? '🇻🇳 Dịch Việt: Đang hiện' : '🙈 Dịch Việt: Đang ẩn';
      subToggle.classList.toggle('is-vi-off', !showViTranslation);
      subToggle.setAttribute('aria-pressed', String(showViTranslation));
    }
  }

  function setShowViTranslation(val) {
    showViTranslation = !!val;
    try { localStorage.setItem(VI_PREF_KEY, showViTranslation ? '1' : '0'); } catch {}
    syncViVisibility();
  }

  function getCompletedBooksSet() {
    if (typeof state !== 'undefined') {
      if (!(state.completedBooks instanceof Set)) {
        state.completedBooks = new Set(Array.isArray(state.completedBooks) ? state.completedBooks : []);
      }
      return state.completedBooks;
    }
    return new Set();
  }

  function clearKaraokeHighlights() {
    karaokeActiveWidx = -1;
    const enEl = $('book-text-en');
    if (!enEl) return;
    enEl.querySelectorAll('.book-kword').forEach(el => {
      el.classList.remove('is-karaoke-active', 'is-karaoke-past');
    });
  }

  function stopKaraoke() {
    karaokeRunId += 1;
    if (karaokeRafId) {
      cancelAnimationFrame(karaokeRafId);
      karaokeRafId = null;
    }
    if (karaokeFallbackTimer) {
      clearTimeout(karaokeFallbackTimer);
      karaokeFallbackTimer = null;
    }
    karaokeBoundarySeen = false;
    clearKaraokeHighlights();
    const speakBtn = $('btn-book-speak-page');
    if (speakBtn) speakBtn.classList.remove('is-karaoke-reading');
  }

  function stopBookMic() {
    isBookMicListening = false;
    if (readbackRecognition) {
      try {
        readbackRecognition.onresult = null;
        readbackRecognition.onerror = null;
        readbackRecognition.onend = null;
        readbackRecognition.stop();
      } catch { /* ignore */ }
      readbackRecognition = null;
    }
    updateReadbackMicButtonUI();
  }

  function cancelAutoRead() {
    isAutoReading = false;
    if (autoTurnHandle && typeof autoTurnHandle.cancel === 'function') {
      autoTurnHandle.cancel();
    }
    autoTurnHandle = null;
    stopKaraoke();
    updateAutoReadButtonUI();
  }

  function updateAutoReadButtonUI() {
    const btn = $('btn-book-autoread');
    if (!btn) return;
    if (isAutoReading) {
      btn.classList.add('is-playing');
      btn.textContent = '⏸ Dừng đọc tự động';
    } else {
      btn.classList.remove('is-playing');
      btn.textContent = '▶ Đọc tự động cả truyện';
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ==========================================================================
     1. BOOK COVER BUILDER (Shared by Home Shelf & Full Library)
     ========================================================================== */
  function buildBookCoverCard(book, compact = false) {
    const completed = getCompletedBooksSet().has(book.id);
    const charSrc = CHAR_IMG[book.coverChar] || CHAR_IMG.leo;
    const emblemHtml = typeof window.renderEmojiArt === 'function'
      ? window.renderEmojiArt(book.coverEmoji, '', 'sm')
      : escapeHtml(book.coverEmoji);

    let heroHtml = '';
    if (book.fullCoverArt) {
      heroHtml = '';
    } else if (Array.isArray(book.coverActors) && book.coverActors.length) {
      heroHtml = book.coverActors.map(a => {
        const art = typeof window.renderEmojiArt === 'function'
          ? window.renderEmojiArt(a.emoji, a.svg || '', 'stage')
          : escapeHtml(a.emoji);
        const flip = a.flip ? 'scaleX(-1)' : 'scaleX(1)';
        const w = a.w || a.size || 68;
        const h = a.h || a.size || 68;
        return `<span class="book-cover-actor" style="left:${ a.x || 30 }%; bottom:${ a.y || 6 }%; width:${ w }px; height:${ h }px; transform:translateX(-50%) ${ flip };" aria-hidden="true">${ art }</span>`;
      }).join('');
    } else {
      heroHtml = `<img class="book-cover-char" src="${ charSrc }" alt="" loading="lazy" decoding="async" draggable="false" />`;
    }

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `book-cover-card ${ compact ? 'is-compact' : '' } ${ completed ? 'is-read' : '' }`;
    card.style.setProperty('--book-accent', book.accent || '#FF7A00');
    card.style.setProperty('--book-soft', book.softBg || '#FFF7E0');
    card.innerHTML = `
      <div class="book-cover-visual">
        <span class="book-spine" aria-hidden="true"></span>
        <img class="book-cover-bg" src="${ book.coverBg }" alt="" loading="lazy" decoding="async" draggable="false" />
        ${ heroHtml }
        <span class="book-cover-prop" aria-hidden="true">${ emblemHtml }</span>
        <span class="book-level-badge cefr-${ (book.level || 'Pre-A1').toLowerCase() }">${ book.level }</span>
        ${ getCategoryBadgeHtml(book) }
        ${ completed ? '<span class="book-done-badge">✅ Đã đọc</span>' : '' }
      </div>
      <div class="book-cover-meta">
        <strong class="book-title-vi">${ escapeHtml(book.titleVi) }</strong>
        <span class="book-title-en">${ escapeHtml(book.titleEn) }</span>
        <div class="book-cover-foot">
          <span>📖 ${ book.pages.length } trang • 🎧 ${ book.minutes }</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      openBookReader(book.id, 0);
    });
    return card;
  }

  /* ==========================================================================
     2. HOME FEATURED STORYBOOK SHELF + FULL LIBRARY (#view-books-hub)
     ========================================================================== */
  function getAgeRecommendedBooks() {
    const ag = typeof window.getActiveAgeGroup === 'function' ? window.getActiveAgeGroup() : null;
    const levels = (ag && Array.isArray(ag.levels) && ag.levels.length) ? ag.levels : ['Pre-A1', 'A1'];
    const byAge = BOOKS_DATA.filter(b => levels.includes(b.level));
    const pool = byAge.length >= 4 ? byAge : BOOKS_DATA;

    // Showcase a lively mix on Home: at least 1 Fairy Tale, 1 Fable, and age-matched adventures
    const picks = [];
    const addFirst = pred => {
      const found = pool.find(b => !picks.includes(b) && pred(b))
        || BOOKS_DATA.find(b => !picks.includes(b) && pred(b));
      if (found) picks.push(found);
    };
    addFirst(b => getBookCategory(b) === 'fairytale');
    addFirst(b => getBookCategory(b) === 'fable');
    pool.forEach(b => { if (picks.length < 4 && !picks.includes(b)) picks.push(b); });
    BOOKS_DATA.forEach(b => { if (picks.length < 4 && !picks.includes(b)) picks.push(b); });
    return picks.slice(0, 4);
  }

  function renderHomeBooksShelf() {
    const grid = $('home-books-grid');
    if (!grid || typeof BOOKS_DATA === 'undefined') return;
    grid.innerHTML = '';
    const picks = getAgeRecommendedBooks();
    picks.forEach(book => grid.appendChild(buildBookCoverCard(book, true)));

    const sub = $('home-books-sub');
    if (sub) {
      const done = getCompletedBooksSet().size;
      sub.textContent = `${ BOOKS_DATA.length } truyện tranh (Cổ tích, Ngụ ngôn & Phiêu lưu) • Đã đọc ${ done }/${ BOOKS_DATA.length }`;
    }
  }

  function renderBooksHub() {
    const grid = $('books-library-grid');
    if (!grid || typeof BOOKS_DATA === 'undefined') return;
    grid.innerHTML = '';

    const ag = typeof window.getActiveAgeGroup === 'function' ? window.getActiveAgeGroup() : null;
    const ageBtn = $('btn-books-filter-age');
    if (ageBtn && ag) {
      ageBtn.textContent = `${ ag.icon || ag.emoji || '🌱' } Hợp tuổi bé (${ ag.levels.join('–') })`;
    }

    let list = BOOKS_DATA;
    if (activeBookFilter === 'age' && ag && Array.isArray(ag.levels)) {
      list = BOOKS_DATA.filter(b => ag.levels.includes(b.level));
    } else if (activeBookFilter.startsWith('cat:')) {
      const targetCat = activeBookFilter.slice(4);
      list = BOOKS_DATA.filter(b => getBookCategory(b) === targetCat);
    } else if (activeBookFilter !== 'all') {
      list = BOOKS_DATA.filter(b => b.level === activeBookFilter);
    }

    document.querySelectorAll('#books-cefr-filter [data-blevel]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.blevel === activeBookFilter);
    });

    list.forEach(book => grid.appendChild(buildBookCoverCard(book, false)));
  }

  /* ==========================================================================
     3. OPEN PICTURE BOOK READER (#view-book-reader)
     ========================================================================== */
  function normalizeSpokenWord(w) {
    return String(w || '')
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/[^a-z0-9']/g, '')
      .replace(/^'+|'+$/g, '');
  }

  function splitStorySentences(text) {
    const str = String(text || '');
    const sentences = [];
    const re = /[^.!?]+(?:[.!?]+["'”’)\]]*)?|[^.!?]+$/g;
    let m;
    while ((m = re.exec(str)) !== null) {
      const raw = m[0];
      const trimmed = raw.trim();
      if (!trimmed) continue;
      const leadSpace = raw.indexOf(trimmed);
      const charStart = m.index + (leadSpace >= 0 ? leadSpace : 0);
      const charEnd = charStart + trimmed.length;
      sentences.push({
        sidx: sentences.length,
        text: trimmed,
        charStart,
        charEnd,
        wordIndices: []
      });
    }
    if (!sentences.length && str.trim()) {
      sentences.push({ sidx: 0, text: str.trim(), charStart: 0, charEnd: str.length, wordIndices: [] });
    }
    return sentences;
  }

  function tokenizeStoryPage(text, vocabList) {
    const str = String(text || '');
    const sentences = splitStorySentences(str);
    const tokens = [];
    const wordRe = /[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g;
    let m;

    // Pre-find vocab character spans (case-insensitive whole-word matches)
    const vocabSpans = [];
    if (Array.isArray(vocabList)) {
      vocabList.forEach((v, idx) => {
        if (!v || !v.w) return;
        const escaped = v.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const vre = new RegExp(`\\b(${ escaped })\\b`, 'i');
        const vm = vre.exec(str);
        if (vm) {
          vocabSpans.push({ start: vm.index, end: vm.index + vm[0].length, vidx: idx });
        }
      });
    }

    while ((m = wordRe.exec(str)) !== null) {
      const word = m[0];
      const charStart = m.index;
      const charEnd = charStart + word.length;
      let sidx = sentences.findIndex(s => charStart >= s.charStart && charStart < s.charEnd);
      if (sidx < 0) sidx = Math.max(0, sentences.length - 1);

      // Look ahead for trailing punctuation to weight natural speech pauses
      const afterSlice = str.slice(charEnd, charEnd + 3);
      let pauseWeight = 0;
      if (/^["'”’)\]]*[.!?…]/.test(afterSlice)) pauseWeight = 5.4;
      else if (/^["'”’)\]]*[,;:]/.test(afterSlice)) pauseWeight = 2.6;
      else if (/^\s*[—–-]/.test(afterSlice)) pauseWeight = 2.4;

      const cleanLen = word.replace(/[^A-Za-z0-9]/g, '').length;
      const vowelGroups = (word.toLowerCase().match(/[aeiouy]+/g) || []).length;
      const weight = Math.max(2.3, cleanLen * 0.85 + vowelGroups * 0.65) + pauseWeight;

      const matchedVocab = vocabSpans.find(vs => charStart >= vs.start && charEnd <= vs.end);
      const widx = tokens.length;
      tokens.push({
        widx,
        sidx,
        word,
        norm: normalizeSpokenWord(word),
        charStart,
        charEnd,
        weight,
        vocabIdx: matchedVocab ? matchedVocab.vidx : -1
      });
      if (sentences[sidx]) sentences[sidx].wordIndices.push(widx);
    }

    // Build HTML with every word wrapped as a karaoke span/button
    let html = '';
    let cursor = 0;
    tokens.forEach(tok => {
      if (tok.charStart > cursor) {
        html += escapeHtml(str.slice(cursor, tok.charStart));
      }
      if (tok.vocabIdx >= 0) {
        html += `<button type="button" class="book-kword book-vocab-word" data-widx="${ tok.widx }" data-sidx="${ tok.sidx }" data-vidx="${ tok.vocabIdx }">${ escapeHtml(tok.word) }</button>`;
      } else {
        html += `<span class="book-kword" role="button" tabindex="0" data-widx="${ tok.widx }" data-sidx="${ tok.sidx }">${ escapeHtml(tok.word) }</span>`;
      }
      cursor = tok.charEnd;
    });
    if (cursor < str.length) {
      html += escapeHtml(str.slice(cursor));
    }

    return { html, tokens, sentences };
  }

  function showWordTooltip(v) {
    const tip = $('book-word-tooltip');
    if (!tip || !v) return;
    tip.innerHTML = `
      <span class="bwt-emoji">${ v.emoji || '✨' }</span>
      <strong>${ escapeHtml(v.w) }</strong>
      <span class="bwt-ipa">${ escapeHtml(v.ipa || '') }</span>
      <span class="bwt-vi">${ escapeHtml(v.vi || '') }</span>
    `;
    tip.classList.remove('hidden');
    clearTimeout(tip._hideTimer);
    tip._hideTimer = setTimeout(() => tip.classList.add('hidden'), 3600);
  }

  function renderIllustrationScene(page) {
    const sceneEl = $('book-illustration-stage');
    if (!sceneEl) return;

    const moodClass = `mood-${ page.mood || 'sunny' }`;
    const panClass = `pan-${ page.pan || 'center' }`;

    let fxHtml = '';
    if (page.mood === 'rainy') {
      fxHtml = '<div class="book-fx-rain" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>';
    } else if (page.mood === 'starry') {
      fxHtml = '<div class="book-fx-stars" aria-hidden="true"><span>✦</span><span>★</span><span>✦</span><span>★</span><span>✦</span></div>';
    } else if (page.mood === 'ocean') {
      fxHtml = '<div class="book-fx-bubbles" aria-hidden="true"><span></span><span></span><span></span><span></span></div>';
    } else if (page.mood === 'snowy') {
      fxHtml = '<div class="book-fx-stars is-snow" aria-hidden="true"><span>❄</span><span>❅</span><span>❄</span><span>❅</span><span>❄</span></div>';
    } else if (page.mood === 'windy') {
      fxHtml = '<div class="book-fx-wind" aria-hidden="true"><span></span><span></span><span></span><span></span></div>';
    }

    const charsHtml = (page.chars || []).map(c => {
      const src = CHAR_IMG[c.id] || CHAR_IMG.leo;
      const flip = c.flip ? 'scaleX(-1)' : 'scaleX(1)';
      const sc = c.scale || 1;
      return `
        <div class="book-scene-char" style="left:${ c.x }%; bottom:${ c.y }%; --char-scale:${ sc }; --char-flip:${ flip };">
          <img src="${ src }" alt="${ c.id }" draggable="false" />
        </div>
      `;
    }).join('');

    const propsHtml = (page.props || []).map((p, idx) => {
      const hintKey = p.svg || p.label;
      if (p.role === 'hotspot') {
        const iconHtml = typeof window.renderEmojiArt === 'function'
          ? window.renderEmojiArt(p.emoji, '', 'sm')
          : escapeHtml(p.emoji);
        return `
          <button type="button" class="book-scene-prop is-hotspot" data-pidx="${ idx }"
            style="left:${ p.x }%; bottom:${ p.y }%; z-index:${ p.z || 5 };"
            title="${ escapeHtml(p.label) } — ${ escapeHtml(p.vi) }"
            aria-label="${ escapeHtml(p.label) }">
            <span class="book-hotspot-dot">${ iconHtml }</span>
            <span class="book-hotspot-label">${ escapeHtml(p.label) }</span>
          </button>
        `;
      }
      const artHtml = typeof window.renderEmojiArt === 'function'
        ? window.renderEmojiArt(p.emoji, hintKey, 'stage')
        : escapeHtml(p.emoji);
      const w = p.w || p.size || 86;
      const h = p.h || p.size || 86;
      const roleClass = p.role === 'badge'
        ? 'is-badge'
        : p.role === 'scenery'
          ? 'is-scenery'
          : (Math.max(w, h) >= 84 || p.role === 'actor')
            ? 'is-actor'
            : 'is-object';
      const flipVal = p.flip ? -1 : 1;
      const rotVal = p.tilt ? `${ p.tilt }deg` : '0deg';
      const zVal = p.z || (roleClass === 'is-scenery' ? 2 : roleClass === 'is-actor' ? 4 : 5);
      return `
        <button type="button" class="book-scene-prop ${ roleClass }" data-pidx="${ idx }"
          style="left:${ p.x }%; bottom:${ p.y }%; --prop-w:${ w }px; --prop-h:${ h }px; --prop-flip:${ flipVal }; --prop-rot:${ rotVal }; z-index:${ zVal };"
          title="${ escapeHtml(p.label) } — ${ escapeHtml(p.vi) }"
          aria-label="${ escapeHtml(p.label) }">
          <span class="book-prop-art">${ artHtml }</span>
          <span class="book-prop-caption">${ escapeHtml(p.label) }</span>
        </button>
      `;
    }).join('');

    const fullArtClass = page.fullArt ? 'is-full-art' : '';
    sceneEl.className = `book-illustration-stage ${ moodClass } ${ panClass } ${ fullArtClass }`;
    sceneEl.innerHTML = `
      <img class="book-scene-bg" src="${ page.bg }" alt="" draggable="false" />
      <div class="book-scene-atmosphere" aria-hidden="true"></div>
      ${ fxHtml }
      <div class="book-scene-actors">${ charsHtml }</div>
      <div class="book-scene-props">${ propsHtml }</div>
      <div class="book-prop-toast hidden" id="book-prop-toast"></div>
      <span class="book-scene-hint">👆 Chạm nhân vật &amp; đồ vật để nghe tiếng Anh!</span>
    `;

    sceneEl.querySelectorAll('.book-scene-prop').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = page.props[Number(btn.dataset.pidx)];
        if (!p) return;
        cancelAutoRead();
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        btn.classList.remove('is-popped');
        void btn.offsetWidth;
        btn.classList.add('is-popped');
        const toast = $('book-prop-toast');
        if (toast) {
          toast.innerHTML = `<strong>${ escapeHtml(p.label) }</strong> <span>${ escapeHtml(p.vi) }</span>`;
          toast.classList.remove('hidden');
          clearTimeout(toast._t);
          toast._t = setTimeout(() => toast.classList.add('hidden'), 2400);
        }
        if (typeof window.speakEnglish === 'function') {
          window.speakEnglish(p.speak || p.label, 0.92);
        }
      });
    });
  }

  /* ==========================================================================
     3B. KARAOKE READ-ALOUD ENGINE (Word-by-Word Light-Up across MP3/Kokoro/Cloud/Browser TTS)
     ========================================================================== */
  function setActiveKaraokeWord(widx, rangeIndices = null) {
    if (widx === karaokeActiveWidx) return;
    karaokeActiveWidx = widx;
    const enEl = $('book-text-en');
    if (!enEl) return;
    const allowedSet = Array.isArray(rangeIndices) ? new Set(rangeIndices) : null;
    enEl.querySelectorAll('.book-kword').forEach(el => {
      const idx = Number(el.dataset.widx);
      if (allowedSet && !allowedSet.has(idx)) {
        el.classList.remove('is-karaoke-active', 'is-karaoke-past');
        return;
      }
      el.classList.toggle('is-karaoke-active', idx === widx);
      el.classList.toggle('is-karaoke-past', widx >= 0 && idx < widx);
    });
  }

  function buildWeightSchedule(wordIndices) {
    const cum = [];
    let total = 0;
    wordIndices.forEach(widx => {
      const tok = currentPageTokens[widx];
      total += tok ? tok.weight : 3;
      cum.push(total);
    });
    return { cum, total: Math.max(total, 1) };
  }

  function pickWordIndexAtProgress(wordIndices, schedule, progress) {
    if (!wordIndices.length) return -1;
    const p = Math.max(0, Math.min(0.9999, progress));
    const target = p * schedule.total;
    for (let i = 0; i < schedule.cum.length; i += 1) {
      if (target <= schedule.cum[i]) return wordIndices[i];
    }
    return wordIndices[wordIndices.length - 1];
  }

  function startAudioElementKaraoke(audioEl, wordIndices, runId) {
    if (!audioEl || !wordIndices.length || runId !== karaokeRunId) return;
    if (karaokeRafId) cancelAnimationFrame(karaokeRafId);
    const schedule = buildWeightSchedule(wordIndices);

    const tick = () => {
      if (runId !== karaokeRunId) return;
      const dur = audioEl.duration;
      const t = audioEl.currentTime || 0;
      if (Number.isFinite(dur) && dur > 0.12) {
        const headPad = Math.min(0.09, dur * 0.025);
        const tailPad = Math.min(0.16, dur * 0.045);
        const span = Math.max(0.08, dur - headPad - tailPad);
        const progress = (t - headPad) / span;
        if (progress >= 0) {
          const widx = pickWordIndexAtProgress(wordIndices, schedule, progress);
          setActiveKaraokeWord(widx, wordIndices);
        }
      }
      if (!audioEl.ended && runId === karaokeRunId) {
        karaokeRafId = requestAnimationFrame(tick);
      }
    };
    setActiveKaraokeWord(wordIndices[0], wordIndices);
    karaokeRafId = requestAnimationFrame(tick);
  }

  function startFallbackTimerKaraoke(wordIndices, rate, runId) {
    if (!wordIndices.length || runId !== karaokeRunId) return;
    if (karaokeRafId) cancelAnimationFrame(karaokeRafId);
    const schedule = buildWeightSchedule(wordIndices);
    const chars = wordIndices.reduce((acc, idx) => acc + ((currentPageTokens[idx]?.word.length) || 4) + 1, 0);
    const speed = Math.max(0.5, Number(rate) || 0.92);
    const estDurationMs = Math.max(900, (chars / (14.2 * speed)) * 1000);
    const startTs = performance.now();

    const tick = (now) => {
      if (runId !== karaokeRunId || karaokeBoundarySeen) return;
      const progress = (now - startTs) / estDurationMs;
      const widx = pickWordIndexAtProgress(wordIndices, schedule, progress);
      setActiveKaraokeWord(widx, wordIndices);
      if (progress < 1.0 && runId === karaokeRunId) {
        karaokeRafId = requestAnimationFrame(tick);
      }
    };
    setActiveKaraokeWord(wordIndices[0], wordIndices);
    karaokeRafId = requestAnimationFrame(tick);
  }

  function speakTextWithKaraoke(text, wordIndices, baseCharOffset, rate = 0.92, audioUrl = '') {
    stopKaraoke();
    if (!text || typeof window.speakEnglish !== 'function') return;
    const runId = ++karaokeRunId;
    karaokeBoundarySeen = false;
    const speakBtn = $('btn-book-speak-page');
    if (speakBtn) speakBtn.classList.add('is-karaoke-reading');

    const opts = {
      audioUrl: audioUrl || '',
      onAudioStart(audioEl, meta) {
        if (runId !== karaokeRunId) return;
        let activeIndices = wordIndices;
        if (meta && meta.engine === 'kokoro' && meta.chunkCount > 1 && currentPageSentences[meta.chunkIndex]) {
          activeIndices = currentPageSentences[meta.chunkIndex].wordIndices;
        }
        startAudioElementKaraoke(audioEl, activeIndices, runId);
      },
      onSpeechStart(meta) {
        if (runId !== karaokeRunId) return;
        // Give browser onboundary a brief moment; if unsupported (e.g. Android), drive smooth weighted karaoke
        const effRate = (meta && meta.rate) || rate;
        setActiveKaraokeWord(wordIndices[0] ?? -1, wordIndices);
        karaokeFallbackTimer = setTimeout(() => {
          if (runId === karaokeRunId && !karaokeBoundarySeen) {
            startFallbackTimerKaraoke(wordIndices, effRate, runId);
          }
        }, 320);
      },
      onBoundary(ev) {
        if (runId !== karaokeRunId || !ev) return;
        karaokeBoundarySeen = true;
        if (karaokeFallbackTimer) {
          clearTimeout(karaokeFallbackTimer);
          karaokeFallbackTimer = null;
        }
        if (karaokeRafId) {
          cancelAnimationFrame(karaokeRafId);
          karaokeRafId = null;
        }
        const absChar = baseCharOffset + (ev.globalCharIndex || 0);
        // Find matching word token covering absChar (or nearest following)
        let matchIdx = -1;
        for (let i = 0; i < wordIndices.length; i += 1) {
          const tok = currentPageTokens[wordIndices[i]];
          if (!tok) continue;
          if (absChar >= tok.charStart && absChar <= tok.charEnd + 1) {
            matchIdx = tok.widx;
            break;
          }
          if (tok.charStart >= absChar) {
            matchIdx = tok.widx;
            break;
          }
        }
        if (matchIdx >= 0) setActiveKaraokeWord(matchIdx, wordIndices);
      },
      onSpeechEnd() {
        if (runId === karaokeRunId) {
          stopKaraoke();
        }
      }
    };

    window.speakEnglish(text, rate, opts);
  }

  /* ==========================================================================
     3C. KID READ-BACK MICROPHONE ("🎙️ Bé đọc lại câu")
     ========================================================================== */
  function clearReadbackWordClasses() {
    const enEl = $('book-text-en');
    if (!enEl) return;
    enEl.querySelectorAll('.book-kword').forEach(el => {
      el.classList.remove('is-rb-target', 'is-spoken-hit', 'is-spoken-miss');
    });
  }

  function getActiveReadbackTarget() {
    if (!currentPageSentences.length) {
      return { text: '', wordIndices: [], charOffset: 0, label: 'Trang này', keySuffix: 'all' };
    }
    if (readbackSentenceIdx < 0 || readbackSentenceIdx >= currentPageSentences.length) {
      const page = currentBook?.pages?.[currentPageIndex];
      return {
        text: page ? page.en : '',
        wordIndices: currentPageTokens.map(t => t.widx),
        charOffset: 0,
        label: 'Cả trang',
        keySuffix: 'all'
      };
    }
    const sent = currentPageSentences[readbackSentenceIdx];
    return {
      text: sent.text,
      wordIndices: sent.wordIndices,
      charOffset: sent.charStart,
      label: `Câu ${ sent.sidx + 1 }`,
      keySuffix: `s${ sent.sidx }`
    };
  }

  function highlightReadbackTargetWords() {
    clearReadbackWordClasses();
    if (!readbackOpen) return;
    const target = getActiveReadbackTarget();
    const set = new Set(target.wordIndices);
    const enEl = $('book-text-en');
    if (!enEl) return;
    enEl.querySelectorAll('.book-kword').forEach(el => {
      if (set.has(Number(el.dataset.widx))) {
        el.classList.add('is-rb-target');
      }
    });
  }

  function updateReadbackMicButtonUI() {
    const recBtn = $('btn-book-rb-record');
    if (recBtn) {
      recBtn.classList.toggle('is-listening', isBookMicListening);
      recBtn.innerHTML = isBookMicListening
        ? '<span class="mic-pulse">🔴</span> Đang nghe bé đọc... (Bấm dừng)'
        : '🎙️ Bấm để bé đọc câu này';
    }
    const openBtn = $('btn-book-mic');
    if (openBtn) {
      openBtn.classList.toggle('is-active', readbackOpen);
      openBtn.textContent = readbackOpen ? '🎙️ Đóng Micro luyện đọc' : '🎙️ Bé đọc lại câu';
    }
  }

  function expandContractions(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/\b(i'm)\b/g, 'i am')
      .replace(/\b(he's)\b/g, 'he is')
      .replace(/\b(she's)\b/g, 'she is')
      .replace(/\b(it's)\b/g, 'it is')
      .replace(/\b(that's)\b/g, 'that is')
      .replace(/\b(let's)\b/g, 'let us')
      .replace(/\b(we're)\b/g, 'we are')
      .replace(/\b(they're)\b/g, 'they are')
      .replace(/\b(you're)\b/g, 'you are')
      .replace(/\b(don't)\b/g, 'do not')
      .replace(/\b(doesn't)\b/g, 'does not')
      .replace(/\b(can't)\b/g, 'cannot')
      .replace(/\b(won't)\b/g, 'will not')
      .replace(/\b(i'll)\b/g, 'i will')
      .replace(/\b(i've)\b/g, 'i have');
  }

  function levenshteinDist(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
      let corner = prev[0];
      prev[0] = i;
      for (let j = 1; j <= b.length; j += 1) {
        const temp = prev[j];
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, corner + cost);
        corner = temp;
      }
    }
    return prev[b.length];
  }

  function wordsMatchForKids(expectedNorm, spokenWords) {
    if (!expectedNorm) return true;
    const expFlat = expectedNorm.replace(/'/g, '');
    const expExpanded = expandContractions(expectedNorm).split(/\s+/).filter(Boolean);
    for (let i = 0; i < spokenWords.length; i += 1) {
      const sw = spokenWords[i];
      if (!sw) continue;
      if (sw === expectedNorm || sw.replace(/'/g, '') === expFlat) return true;
      if (expExpanded.includes(sw)) return true;
      if (expFlat.length >= 4 && sw.length >= 4 && levenshteinDist(expFlat, sw.replace(/'/g, '')) <= 1) return true;
      // Forgive plural/3rd-person -s drops for young kids
      if (expFlat.length >= 4 && (expFlat === `${ sw }s` || `${ expFlat }s` === sw)) return true;
    }
    return false;
  }

  function evaluateReadbackWords(transcript, isFinal) {
    const target = getActiveReadbackTarget();
    const expandedSpoken = expandContractions(transcript)
      .replace(/[^a-z0-9'\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
    const rawSpoken = String(transcript || '')
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/[^a-z0-9'\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
    const spokenPool = [...new Set([...rawSpoken, ...expandedSpoken])];

    let hits = 0;
    const total = target.wordIndices.length;
    const enEl = $('book-text-en');

    target.wordIndices.forEach(widx => {
      const tok = currentPageTokens[widx];
      const matched = wordsMatchForKids(tok ? tok.norm : '', spokenPool);
      if (matched) hits += 1;
      const el = enEl?.querySelector(`.book-kword[data-widx="${ widx }"]`);
      if (el) {
        el.classList.toggle('is-spoken-hit', matched);
        el.classList.toggle('is-spoken-miss', isFinal && !matched);
      }
    });

    const pct = total ? Math.round((hits / total) * 100) : 0;
    return { hits, total, pct };
  }

  function awardReadbackStars(starsEarned, keySuffix) {
    if (!currentBook || starsEarned <= 0) return 0;
    const key = `${ currentBook.id }_p${ currentPageIndex }_${ keySuffix }`;
    if (rewardedReadbackKeys.has(key)) return 0;
    rewardedReadbackKeys.add(key);
    if (typeof state !== 'undefined') {
      state.stars = (state.stars || 0) + starsEarned;
      if (typeof saveProgress === 'function') saveProgress();
      if (typeof updateHeaderAndMissionUI === 'function') updateHeaderAndMissionUI();
    }
    return starsEarned;
  }

  function renderReadbackPanel() {
    const panel = $('book-readback-panel');
    if (!panel) return;
    panel.classList.toggle('hidden', !readbackOpen);
    updateReadbackMicButtonUI();

    if (!readbackOpen) {
      clearReadbackWordClasses();
      return;
    }

    const sBar = $('book-rb-sentences');
    if (sBar) {
      const multi = currentPageSentences.length > 1;
      const buttonsHtml = currentPageSentences.map(s => `
        <button type="button" class="book-rb-pill ${ readbackSentenceIdx === s.sidx ? 'active' : '' }" data-rbs="${ s.sidx }">
          Câu ${ s.sidx + 1 }
        </button>
      `).join('');
      const allBtnHtml = multi && currentPageTokens.length <= 34
        ? `<button type="button" class="book-rb-pill ${ readbackSentenceIdx === -1 ? 'active' : '' }" data-rbs="-1">📄 Cả trang</button>`
        : '';
      sBar.innerHTML = buttonsHtml + allBtnHtml;
      sBar.classList.toggle('hidden', !multi);

      sBar.querySelectorAll('[data-rbs]').forEach(btn => {
        btn.addEventListener('click', () => {
          stopBookMic();
          stopKaraoke();
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          readbackSentenceIdx = Number(btn.dataset.rbs);
          renderReadbackPanel();
        });
      });
    }

    const target = getActiveReadbackTarget();
    const promptEl = $('book-rb-target-text');
    if (promptEl) {
      promptEl.textContent = `“${ target.text }”`;
    }

    const resEl = $('book-rb-result');
    if (resEl) {
      resEl.className = 'book-rb-result hidden';
      resEl.innerHTML = '';
    }

    const nextSentBtn = $('btn-book-rb-next-sent');
    if (nextSentBtn) {
      const hasNext = readbackSentenceIdx >= 0 && readbackSentenceIdx < currentPageSentences.length - 1;
      nextSentBtn.classList.toggle('hidden', !hasNext);
    }

    highlightReadbackTargetWords();
  }

  function startBookReadbackMic() {
    if (isBookMicListening) {
      stopBookMic();
      return;
    }
    cancelAutoRead();
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();

    const target = getActiveReadbackTarget();
    const resEl = $('book-rb-result');
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition || null;

    if (!Ctor) {
      if (resEl) {
        resEl.className = 'book-rb-result is-info';
        resEl.innerHTML = `
          <div>ℹ️ Trình duyệt này chưa hỗ trợ Micro tự động. Bé bấm <strong>🔊 Nghe mẫu</strong> rồi đọc to cùng bố mẹ nhé!</div>
          <button type="button" class="btn-book-rb-self" id="btn-book-rb-self-ok">✅ Bé đã đọc to câu này! (+1 ⭐)</button>
        `;
        $('btn-book-rb-self-ok')?.addEventListener('click', () => {
          const gained = awardReadbackStars(1, target.keySuffix);
          if (typeof playSoundEffect === 'function') playSoundEffect('star');
          if (typeof launchConfettiBurst === 'function') launchConfettiBurst();
          resEl.className = 'book-rb-result is-great';
          resEl.innerHTML = `⭐⭐⭐ <strong>Giỏi lắm!</strong> Bé đọc to rất tự tin! ${ gained ? `(+${ gained } ⭐)` : '' }`;
        });
      }
      return;
    }

    highlightReadbackTargetWords();
    let finalTranscript = '';

    try {
      const rec = new Ctor();
      readbackRecognition = rec;
      rec.lang = 'en-US';
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.continuous = false;

      isBookMicListening = true;
      updateReadbackMicButtonUI();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');

      if (resEl) {
        resEl.className = 'book-rb-result is-listening';
        resEl.textContent = '🎙️ Bé hãy đọc to câu được tô nổi phía trên bằng tiếng Anh nhé...';
      }

      rec.onresult = (ev) => {
        let interim = '';
        for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
          const txt = ev.results[i][0]?.transcript || '';
          if (ev.results[i].isFinal) finalTranscript += `${ txt } `;
          else interim += txt;
        }
        const liveText = (finalTranscript + interim).trim();
        if (liveText) {
          evaluateReadbackWords(liveText, false);
          if (resEl) {
            resEl.className = 'book-rb-result is-listening';
            resEl.textContent = `🎙️ Đang nghe bé: “${ liveText }”`;
          }
        }
      };

      rec.onerror = (ev) => {
        const err = ev?.error || '';
        isBookMicListening = false;
        readbackRecognition = null;
        updateReadbackMicButtonUI();
        if (resEl) {
          resEl.className = 'book-rb-result is-info';
          resEl.innerHTML = err === 'not-allowed'
            ? `<div>⚠️ Chưa cấp quyền Micro. Bố mẹ bật quyền Micro hoặc cho bé đọc cùng bố mẹ nhé!</div>
               <button type="button" class="btn-book-rb-self" id="btn-book-rb-self-ok">✅ Bé đã đọc to câu này! (+1 ⭐)</button>`
            : '🎙️ Chưa nghe rõ giọng bé — bấm nút Micro để thử đọc lại nhé!';
          $('btn-book-rb-self-ok')?.addEventListener('click', () => {
            const gained = awardReadbackStars(1, target.keySuffix);
            if (typeof playSoundEffect === 'function') playSoundEffect('star');
            resEl.className = 'book-rb-result is-great';
            resEl.innerHTML = `⭐⭐⭐ <strong>Tuyệt vời!</strong> ${ gained ? `(+${ gained } ⭐)` : '' }`;
          });
        }
      };

      rec.onend = () => {
        const spoken = finalTranscript.trim();
        isBookMicListening = false;
        readbackRecognition = null;
        updateReadbackMicButtonUI();

        if (!spoken) {
          if (resEl && resEl.classList.contains('is-listening')) {
            resEl.className = 'book-rb-result is-info';
            resEl.textContent = '🎙️ Chưa nghe thấy tiếng — bé bấm nút Micro và đọc to hơn chút nhé!';
          }
          return;
        }

        const { hits, total, pct } = evaluateReadbackWords(spoken, true);
        let starsCount = 1;
        let cls = 'is-encourage';
        let praise = 'Cố lên bé ơi! Chạm vào từ gạch vàng để nghe lại rồi thử đọc tiếp nhé!';
        if (pct >= 80) {
          starsCount = 3;
          cls = 'is-great';
          praise = 'Tuyệt vời! Bé đọc chuẩn và tự nhiên lắm!';
          if (typeof playSoundEffect === 'function') playSoundEffect('star');
          if (typeof launchConfettiBurst === 'function') launchConfettiBurst();
        } else if (pct >= 50) {
          starsCount = 2;
          cls = 'is-good';
          praise = 'Giỏi lắm! Bé đọc được rất nhiều từ đúng rồi!';
          if (typeof playSoundEffect === 'function') playSoundEffect('correct');
        } else {
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        }

        const gained = awardReadbackStars(starsCount, target.keySuffix);
        const starsIcons = '⭐'.repeat(starsCount);
        if (resEl) {
          resEl.className = `book-rb-result ${ cls }`;
          resEl.innerHTML = `
            <div class="brb-score-row">
              <span class="brb-stars">${ starsIcons }</span>
              <strong>${ pct }% (${ hits }/${ total } từ)</strong>
              ${ gained ? `<span class="brb-bonus">+${ gained } ⭐</span>` : '' }
            </div>
            <div class="brb-praise">${ praise }</div>
            <div class="brb-heard">💬 Micro nghe thấy: <em>“${ escapeHtml(spoken) }”</em></div>
          `;
        }
      };

      rec.start();
    } catch {
      isBookMicListening = false;
      readbackRecognition = null;
      updateReadbackMicButtonUI();
    }
  }

  function renderCurrentBookPage(autoSpeak = false) {
    if (!currentBook) return;
    inQuizMode = false;
    stopKaraoke();
    stopBookMic();

    const spreadEl = $('book-spread-view');
    const navEl = $('book-nav-bar');
    const quizEl = $('book-quiz-view');
    const doneEl = $('book-done-view');
    if (spreadEl) spreadEl.classList.remove('hidden');
    if (navEl) navEl.classList.remove('hidden');
    if (quizEl) quizEl.classList.add('hidden');
    if (doneEl) doneEl.classList.add('hidden');

    const total = currentBook.pages.length;
    const page = currentBook.pages[currentPageIndex];
    if (!page) return;

    // Header title
    const headerTitle = $('book-reader-title');
    if (headerTitle) {
      headerTitle.textContent = `${ currentBook.titleVi } [${ currentBook.level }]`;
    }

    // Left page illustration
    renderIllustrationScene(page);

    // Right page text (Tokenized for Karaoke Read-Aloud & Tap-Any-Word)
    const pageBadge = $('book-page-badge');
    if (pageBadge) pageBadge.textContent = `Trang ${ currentPageIndex + 1 } / ${ total }`;

    const bookSub = $('book-page-bookname');
    if (bookSub) bookSub.textContent = currentBook.titleEn;

    const tokenized = tokenizeStoryPage(page.en, page.vocab);
    currentPageTokens = tokenized.tokens;
    currentPageSentences = tokenized.sentences;
    readbackSentenceIdx = 0;

    const enEl = $('book-text-en');
    if (enEl) {
      enEl.innerHTML = tokenized.html;
      enEl.querySelectorAll('.book-kword').forEach(el => {
        const handleTapWord = () => {
          const widx = Number(el.dataset.widx);
          const tok = currentPageTokens[widx];
          if (!tok) return;
          cancelAutoRead();
          stopBookMic();
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          setActiveKaraokeWord(widx, [widx]);
          setTimeout(() => {
            if (karaokeActiveWidx === widx) clearKaraokeHighlights();
          }, 900);
          if (tok.vocabIdx >= 0 && page.vocab && page.vocab[tok.vocabIdx]) {
            const v = page.vocab[tok.vocabIdx];
            showWordTooltip(v);
            if (typeof window.speakEnglish === 'function') window.speakEnglish(v.w, 0.90);
          } else {
            if (typeof window.speakEnglish === 'function') window.speakEnglish(tok.word, 0.90);
          }
        };
        el.addEventListener('click', handleTapWord);
        if (el.tagName !== 'BUTTON') {
          el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTapWord();
            }
          });
        }
      });
    }

    const viEl = $('book-text-vi');
    if (viEl) {
      viEl.textContent = page.vi;
      viEl.classList.toggle('hidden', !showViTranslation);
    }

    const tipEl = $('book-word-tooltip');
    if (tipEl) tipEl.classList.add('hidden');

    // Vocab chips strip
    const vocabBar = $('book-page-vocab');
    if (vocabBar) {
      vocabBar.innerHTML = (page.vocab || []).map((v, idx) => `
        <button type="button" class="book-vocab-chip" data-vidx="${ idx }">
          <span>${ v.emoji || '✨' }</span>
          <strong>${ escapeHtml(v.w) }</strong>
          <small>${ escapeHtml(v.vi) }</small>
        </button>
      `).join('');
      vocabBar.querySelectorAll('.book-vocab-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const v = page.vocab[Number(btn.dataset.vidx)];
          if (!v) return;
          cancelAutoRead();
          stopBookMic();
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          showWordTooltip(v);
          if (typeof window.speakEnglish === 'function') window.speakEnglish(v.w, 0.92);
        });
      });
    }

    // Update Read-Back panel if open
    renderReadbackPanel();

    // Page navigation buttons & dots
    const prevBtn = $('btn-book-prev');
    const nextBtn = $('btn-book-next');
    if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
    if (nextBtn) {
      nextBtn.textContent = currentPageIndex === total - 1
        ? '🎯 Câu hỏi hiểu truyện ➔'
        : 'Trang sau ➔';
    }

    const dotsWrap = $('book-page-dots');
    if (dotsWrap) {
      dotsWrap.innerHTML = currentBook.pages.map((_, idx) => `
        <button type="button" class="book-dot ${ idx === currentPageIndex ? 'active' : idx < currentPageIndex ? 'read' : '' }"
          data-p="${ idx }" aria-label="Trang ${ idx + 1 }">${ idx + 1 }</button>
      `).join('');
      dotsWrap.querySelectorAll('.book-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          cancelAutoRead();
          stopBookMic();
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          currentPageIndex = Number(dot.dataset.p) || 0;
          renderCurrentBookPage(false);
        });
      });
    }

    syncViVisibility();

    // Smooth flip animation on spread
    if (spreadEl) {
      spreadEl.classList.remove('page-turn-in');
      void spreadEl.offsetWidth;
      spreadEl.classList.add('page-turn-in');
    }

    if (autoSpeak) {
      speakCurrentPage();
    }

    const nextPage = currentBook.pages[currentPageIndex + 1];
    if (nextPage && nextPage.en) {
      const nextAudioUrl = getBookPageAudioUrl(currentBook.id, currentPageIndex + 1);
      if (typeof window.preloadAudioUrl === 'function') {
        window.preloadAudioUrl(nextAudioUrl);
      }
      if (typeof window.prefetchSentenceAudio === 'function') {
        setTimeout(() => window.prefetchSentenceAudio(nextPage.en), 450);
      }
    }
  }

  function getBookPageAudioUrl(bookId, pageIdx) {
    return `assets/audio/books/${ bookId }_p${ pageIdx + 1 }.mp3`;
  }

  function speakCurrentPage() {
    if (!currentBook || inQuizMode) return;
    const page = currentBook.pages[currentPageIndex];
    if (!page) return;
    stopBookMic();
    if (autoTurnHandle && typeof autoTurnHandle.cancel === 'function') {
      autoTurnHandle.cancel();
      autoTurnHandle = null;
    }
    const allIndices = currentPageTokens.map(t => t.widx);
    const audioUrl = getBookPageAudioUrl(currentBook.id, currentPageIndex);
    speakTextWithKaraoke(page.en, allIndices, 0, 0.92, audioUrl);

    if (isAutoReading && typeof window.afterSpeech === 'function') {
      autoTurnHandle = window.afterSpeech(() => {
        if (!isAutoReading || !currentBook) return;
        if (currentPageIndex < currentBook.pages.length - 1) {
          currentPageIndex += 1;
          renderCurrentBookPage(true);
        } else {
          cancelAutoRead();
          startBookQuiz();
        }
      }, { gap: 950, max: 25000 });
    }
  }

  /* ==========================================================================
     4. END-OF-BOOK COMPREHENSION MINI-QUIZ & CELEBRATION
     ========================================================================== */
  function startBookQuiz() {
    if (!currentBook) return;
    cancelAutoRead();
    stopBookMic();
    readbackOpen = false;
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();

    const questions = currentBook.quiz || [];
    if (!questions.length) {
      finishBook();
      return;
    }

    inQuizMode = true;
    quizIndex = 0;
    quizScore = 0;

    $('book-spread-view')?.classList.add('hidden');
    $('book-nav-bar')?.classList.add('hidden');
    $('book-done-view')?.classList.add('hidden');
    $('book-quiz-view')?.classList.remove('hidden');
    renderBookQuizQuestion();
  }

  function renderBookQuizQuestion() {
    const questions = currentBook.quiz || [];
    const q = questions[quizIndex];
    if (!q) {
      finishBook();
      return;
    }
    quizAnswered = false;

    const prog = $('book-quiz-progress');
    if (prog) prog.textContent = `Câu hỏi hiểu truyện ${ quizIndex + 1 } / ${ questions.length }`;

    const qEn = $('book-quiz-q-en');
    const qVi = $('book-quiz-q-vi');
    if (qEn) qEn.textContent = q.qEn;
    if (qVi) qVi.textContent = q.qVi;

    const fb = $('book-quiz-feedback');
    if (fb) fb.classList.add('hidden');

    const optsWrap = $('book-quiz-options');
    if (optsWrap) {
      // Deterministic gentle shuffle
      const opts = [...q.options].sort(() => Math.random() - 0.5);
      optsWrap.innerHTML = '';
      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'book-quiz-opt';
        const art = typeof window.renderEmojiArt === 'function'
          ? window.renderEmojiArt(opt.emoji, '', 'sm')
          : escapeHtml(opt.emoji);
        btn.innerHTML = `<span class="bqo-art">${ art }</span><span class="bqo-text">${ escapeHtml(opt.text) }</span>`;
        btn.addEventListener('click', () => {
          if (quizAnswered) return;
          quizAnswered = true;
          if (opt.correct) {
            quizScore += 1;
            btn.classList.add('correct');
            if (typeof playSoundEffect === 'function') playSoundEffect('star');
            if (fb) {
              fb.textContent = '🎉 Chính xác rồi! Bé hiểu câu chuyện rất giỏi!';
              fb.className = 'book-quiz-feedback is-correct';
            }
          } else {
            btn.classList.add('wrong');
            if (typeof playSoundEffect === 'function') playSoundEffect('wrong');
            if (fb) {
              fb.textContent = '💡 Gần đúng rồi! Thử xem đáp án đúng màu xanh nhé!';
              fb.className = 'book-quiz-feedback is-wrong';
            }
            // Highlight the right answer
            optsWrap.querySelectorAll('.book-quiz-opt').forEach((b, i) => {
              if (opts[i] && opts[i].correct) b.classList.add('correct');
            });
          }
          setTimeout(() => {
            quizIndex += 1;
            if (quizIndex < questions.length) renderBookQuizQuestion();
            else finishBook();
          }, 1350);
        });
        optsWrap.appendChild(btn);
      });
    }

    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(q.qEn, 0.92);
    }
  }

  function finishBook() {
    if (!currentBook) return;
    inQuizMode = false;
    cancelAutoRead();

    const completedSet = getCompletedBooksSet();
    const firstTime = !completedSet.has(currentBook.id);
    completedSet.add(currentBook.id);

    const bonus = firstTime ? 20 : 5;
    if (typeof state !== 'undefined') {
      state.stars = (state.stars || 0) + bonus;
      if (typeof saveProgress === 'function') saveProgress();
      if (typeof updateHeaderAndMissionUI === 'function') updateHeaderAndMissionUI();
    }
    if (typeof playSoundEffect === 'function') playSoundEffect('win');
    if (typeof launchConfetti === 'function') launchConfetti(70);

    $('book-spread-view')?.classList.add('hidden');
    $('book-nav-bar')?.classList.add('hidden');
    $('book-quiz-view')?.classList.add('hidden');
    const doneEl = $('book-done-view');
    if (doneEl) {
      doneEl.classList.remove('hidden');
      const titleEl = $('book-done-title');
      if (titleEl) titleEl.textContent = `Chúc mừng bé đã đọc xong "${ currentBook.titleVi }"!`;
      const rewardEl = $('book-done-reward');
      if (rewardEl) {
        rewardEl.textContent = `⭐ +${ bonus } Sao thưởng • Trả lời đúng ${ quizScore }/${ (currentBook.quiz || []).length } câu hỏi`;
      }
      const moralEl = $('book-done-moral');
      if (moralEl) {
        if (currentBook.moralEn) {
          moralEl.innerHTML = `
            <div class="bdm-kicker">💡 Bài học câu chuyện (Moral of the Story)</div>
            <strong class="bdm-en">“${ escapeHtml(currentBook.moralEn) }”</strong>
            <span class="bdm-vi">${ escapeHtml(currentBook.moralVi || '') }</span>
          `;
          moralEl.classList.remove('hidden');
        } else {
          moralEl.classList.add('hidden');
        }
      }
      const mascotWrap = $('book-done-mascot');
      if (mascotWrap && typeof window.renderMascotSvg === 'function') {
        mascotWrap.innerHTML = window.renderMascotSvg(currentBook.coverChar || 'leo', 'celebrate', false);
      }
    }

    renderHomeBooksShelf();
    renderBooksHub();
    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(`Hooray! You finished reading ${ currentBook.titleEn }! Great job!`, 0.94);
    }
  }

  /* ==========================================================================
     5. PUBLIC API & EVENT WIRING
     ========================================================================== */
  function openBookReader(bookId, startPage = 0) {
    if (typeof BOOKS_DATA === 'undefined') return;
    const book = BOOKS_DATA.find(b => b.id === bookId) || BOOKS_DATA[0];
    if (!book) return;

    cancelAutoRead();
    stopBookMic();
    readbackOpen = false;
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();

    currentBook = book;
    currentPageIndex = Math.max(0, Math.min(book.pages.length - 1, startPage));

    if (typeof window.recordActivity === 'function') {
      window.recordActivity({
        kind: 'book',
        bookId: book.id,
        icon: book.coverEmoji || '📖',
        title: `${ book.titleVi } (${ book.level })`,
        subtitle: `Truyện đọc & nghe • ${ book.titleEn }`
      });
    }

    if (typeof openView === 'function') {
      openView('view-book-reader');
    }
    renderCurrentBookPage(false);
  }

  function openBooksHub(filter = null) {
    cancelAutoRead();
    stopBookMic();
    readbackOpen = false;
    if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
    if (filter) activeBookFilter = filter;
    renderBooksHub();
    if (typeof openView === 'function') openView('view-books-hub');
  }

  window.openBooksHub = openBooksHub;
  window.openBookReader = openBookReader;
  window.refreshBooksUI = function () {
    renderHomeBooksShelf();
    renderBooksHub();
  };

  function bindBooksEvents() {
    renderHomeBooksShelf();
    renderBooksHub();
    syncViVisibility();

    $('btn-home-open-books')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      openBooksHub('all');
    });

    $('btn-books-hub-back')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof openView === 'function') openView('view-home');
    });

    document.querySelectorAll('#books-cefr-filter [data-blevel]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        activeBookFilter = btn.dataset.blevel || 'all';
        renderBooksHub();
      });
    });

    $('btn-book-reader-back')?.addEventListener('click', () => {
      cancelAutoRead();
      stopBookMic();
      readbackOpen = false;
      if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      openBooksHub();
    });

    $('btn-book-prev')?.addEventListener('click', () => {
      if (!currentBook || currentPageIndex <= 0) return;
      cancelAutoRead();
      stopBookMic();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      currentPageIndex -= 1;
      renderCurrentBookPage(false);
    });

    $('btn-book-next')?.addEventListener('click', () => {
      if (!currentBook) return;
      cancelAutoRead();
      stopBookMic();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (currentPageIndex < currentBook.pages.length - 1) {
        currentPageIndex += 1;
        renderCurrentBookPage(false);
      } else {
        startBookQuiz();
      }
    });

    $('btn-book-speak-page')?.addEventListener('click', () => {
      cancelAutoRead();
      speakCurrentPage();
    });

    $('btn-book-autoread')?.addEventListener('click', () => {
      if (!currentBook) return;
      if (isAutoReading) {
        cancelAutoRead();
        if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
      } else {
        stopBookMic();
        isAutoReading = true;
        updateAutoReadButtonUI();
        speakCurrentPage();
      }
    });

    // Kid Read-Back Microphone controls
    $('btn-book-mic')?.addEventListener('click', () => {
      if (!currentBook || inQuizMode) return;
      cancelAutoRead();
      stopBookMic();
      if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      readbackOpen = !readbackOpen;
      renderReadbackPanel();
    });

    $('btn-book-rb-close')?.addEventListener('click', () => {
      stopBookMic();
      stopKaraoke();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      readbackOpen = false;
      renderReadbackPanel();
    });

    $('btn-book-rb-listen')?.addEventListener('click', () => {
      if (!currentBook) return;
      stopBookMic();
      cancelAutoRead();
      const target = getActiveReadbackTarget();
      if (!target.text) return;
      // If practicing the whole page, use the studio MP3; if single sentence, speak that sentence with Karaoke!
      const useFullMp3 = readbackSentenceIdx === -1 || currentPageSentences.length <= 1;
      const audioUrl = useFullMp3 ? getBookPageAudioUrl(currentBook.id, currentPageIndex) : '';
      speakTextWithKaraoke(target.text, target.wordIndices, target.charOffset, 0.88, audioUrl);
    });

    $('btn-book-rb-record')?.addEventListener('click', () => {
      startBookReadbackMic();
    });

    $('btn-book-rb-next-sent')?.addEventListener('click', () => {
      if (readbackSentenceIdx < currentPageSentences.length - 1) {
        stopBookMic();
        stopKaraoke();
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        readbackSentenceIdx += 1;
        renderReadbackPanel();
      }
    });

    $('btn-book-vi-toggle')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      setShowViTranslation(!showViTranslation);
    });

    $('btn-book-vi-peek')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      setShowViTranslation(true);
    });

    $('btn-book-done-reread')?.addEventListener('click', () => {
      if (!currentBook) return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      currentPageIndex = 0;
      renderCurrentBookPage(true);
    });

    $('btn-book-done-next')?.addEventListener('click', () => {
      if (!currentBook || typeof BOOKS_DATA === 'undefined') return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      const idx = BOOKS_DATA.findIndex(b => b.id === currentBook.id);
      const nextBook = BOOKS_DATA[(idx + 1) % BOOKS_DATA.length];
      openBookReader(nextBook.id, 0);
    });

    $('btn-book-done-library')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      openBooksHub();
    });

    // Stop auto-read & mic if user clicks top logo to go home
    $('btn-home-logo')?.addEventListener('click', () => {
      cancelAutoRead();
      stopBookMic();
      readbackOpen = false;
    });

    // Touch swipe left/right on open book spread
    const spread = $('book-spread-view');
    if (spread) {
      let touchX = 0;
      spread.addEventListener('touchstart', e => {
        if (e.touches && e.touches[0]) touchX = e.touches[0].clientX;
      }, { passive: true });
      spread.addEventListener('touchend', e => {
        if (!touchX || !e.changedTouches || !e.changedTouches[0]) return;
        const dx = e.changedTouches[0].clientX - touchX;
        touchX = 0;
        if (Math.abs(dx) < 55) return;
        if (dx < 0) $('btn-book-next')?.click();
        else if (dx > 0) $('btn-book-prev')?.click();
      }, { passive: true });
    }
  }

  document.addEventListener('DOMContentLoaded', bindBooksEvents);
})();
