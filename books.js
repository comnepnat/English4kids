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

  function cancelAutoRead() {
    isAutoReading = false;
    if (autoTurnHandle && typeof autoTurnHandle.cancel === 'function') {
      autoTurnHandle.cancel();
    }
    autoTurnHandle = null;
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
  function highlightStoryVocab(text, vocabList) {
    let html = escapeHtml(text);
    if (!Array.isArray(vocabList) || !vocabList.length) return html;
    vocabList.forEach((v, idx) => {
      const escapedW = v.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\\b(${ escapedW })\\b`, 'i');
      html = html.replace(re, `<button type="button" class="book-vocab-word" data-vidx="${ idx }">$1</button>`);
    });
    return html;
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

  function renderCurrentBookPage(autoSpeak = false) {
    if (!currentBook) return;
    inQuizMode = false;

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

    // Right page text
    const pageBadge = $('book-page-badge');
    if (pageBadge) pageBadge.textContent = `Trang ${ currentPageIndex + 1 } / ${ total }`;

    const bookSub = $('book-page-bookname');
    if (bookSub) bookSub.textContent = currentBook.titleEn;

    const enEl = $('book-text-en');
    if (enEl) {
      enEl.innerHTML = highlightStoryVocab(page.en, page.vocab);
      enEl.querySelectorAll('.book-vocab-word').forEach(btn => {
        btn.addEventListener('click', () => {
          const v = page.vocab[Number(btn.dataset.vidx)];
          if (!v) return;
          cancelAutoRead();
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          showWordTooltip(v);
          if (typeof window.speakEnglish === 'function') window.speakEnglish(v.w, 0.92);
        });
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
          if (typeof playSoundEffect === 'function') playSoundEffect('pop');
          showWordTooltip(v);
          if (typeof window.speakEnglish === 'function') window.speakEnglish(v.w, 0.92);
        });
      });
    }

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
    if (nextPage && nextPage.en && typeof window.prefetchSentenceAudio === 'function') {
      setTimeout(() => window.prefetchSentenceAudio(nextPage.en), 450);
    }
  }

  function speakCurrentPage() {
    if (!currentBook || inQuizMode) return;
    const page = currentBook.pages[currentPageIndex];
    if (!page) return;
    if (autoTurnHandle && typeof autoTurnHandle.cancel === 'function') {
      autoTurnHandle.cancel();
      autoTurnHandle = null;
    }
    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(page.en, 0.92);
    }
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
      if (typeof window.stopAllSpeech === 'function') window.stopAllSpeech();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      openBooksHub();
    });

    $('btn-book-prev')?.addEventListener('click', () => {
      if (!currentBook || currentPageIndex <= 0) return;
      cancelAutoRead();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      currentPageIndex -= 1;
      renderCurrentBookPage(false);
    });

    $('btn-book-next')?.addEventListener('click', () => {
      if (!currentBook) return;
      cancelAutoRead();
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
        isAutoReading = true;
        updateAutoReadButtonUI();
        speakCurrentPage();
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

    // Stop auto-read if user clicks top logo to go home
    $('btn-home-logo')?.addEventListener('click', () => {
      cancelAutoRead();
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
