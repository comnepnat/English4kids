/**
 * English4Kids — Little Kids Mode (3–5 tuổi) (little-mode.js)
 * -----------------------------------------------------------
 * Ultra-simple, large pictorial button interface with 1-tap toggle ON/OFF:
 * - Persisted in localStorage (e4k_little_kids_mode_v1)
 * - 1-tap header toggle (#btn-little-mode-toggle) + bottom parent switch bar
 * - Distraction-free header & giant candy-colored pictorial Home Playground (#little-kids-home)
 * - Direct 1-tap access to Letter Tracing, Pre-A1 Storybooks, Pre-A1 Flashcards,
 *   ABC Song & Board, Pre-A1 Animated Stories, and Easy Games
 * - Quick 1-tap picture topic bubbles (Animals, Fruits, Colors, Numbers)
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'e4k_little_kids_mode_v1';
  const $ = id => document.getElementById(id);

  let isLittleMode = false;

  function loadPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  function savePreference(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val ? '1' : '0');
    } catch { /* ignore */ }
  }

  function syncToggleButtonsUI() {
    document.body.classList.toggle('little-kids-mode', isLittleMode);

    const hdrBtn = $('btn-little-mode-toggle');
    if (hdrBtn) {
      hdrBtn.classList.toggle('is-active', isLittleMode);
      hdrBtn.setAttribute('aria-pressed', String(isLittleMode));
      hdrBtn.title = isLittleMode
        ? 'Đang bật Chế độ Bé Nhỏ (3–5 tuổi) — Chạm 1 lần để về chế độ đầy đủ'
        : 'Bật Chế độ Bé Nhỏ (3–5 tuổi) — Giao diện nút hình lớn tối giản';
      const labelEl = hdrBtn.querySelector('.little-toggle-label');
      if (labelEl) {
        labelEl.textContent = isLittleMode ? 'Bé Nhỏ: BẬT' : 'Bé 3–5t';
      }
    }

    const littleHome = $('little-kids-home');
    if (littleHome) {
      littleHome.setAttribute('aria-hidden', String(!isLittleMode));
    }

    // Update greeting with active child's name if available
    const greetName = $('little-greet-name');
    if (greetName && typeof window.getActiveProfile === 'function') {
      const prof = window.getActiveProfile();
      greetName.textContent = prof && prof.name ? prof.name : 'Bé yêu';
    }
  }

  function setLittleKidsMode(enabled, { announce = true, goHome = true } = {}) {
    isLittleMode = Boolean(enabled);
    savePreference(isLittleMode);
    syncToggleButtonsUI();

    if (typeof playSoundEffect === 'function') playSoundEffect('pop');

    if (goHome && typeof openView === 'function') {
      // Stop active audio/timers cleanly before showing the clean playground
      if (typeof window.stopTracingDemo === 'function') window.stopTracingDemo();
      openView('view-home');
    }

    if (isLittleMode) {
      // Gently default game difficulty to Easy for 3–5 year olds
      const easyBtn = $('btn-diff-easy');
      if (easyBtn && !easyBtn.classList.contains('active')) {
        easyBtn.click();
      }
      if (announce && typeof window.speakEnglish === 'function') {
        window.speakEnglish("Hello! Let's play!", 0.9);
      }
    }
  }

  function toggleLittleKidsMode() {
    setLittleKidsMode(!isLittleMode, { announce: true, goHome: true });
  }

  function bindLittleKidsEvents() {
    // Restore saved mode silently on startup
    isLittleMode = loadPreference();
    syncToggleButtonsUI();

    $('btn-little-mode-toggle')?.addEventListener('click', toggleLittleKidsMode);
    $('btn-little-exit-mode')?.addEventListener('click', () => {
      setLittleKidsMode(false, { announce: false, goHome: true });
    });

    // Interactive Leo mascot greeting button
    $('little-leo-btn')?.addEventListener('click', () => {
      const btn = $('little-leo-btn');
      if (btn) {
        btn.classList.remove('is-bouncing');
        void btn.offsetWidth;
        btn.classList.add('is-bouncing');
      }
      if (typeof playSoundEffect === 'function') playSoundEffect('star');
      if (typeof window.speakEnglish === 'function') {
        window.speakEnglish("Hello! I'm Leo! Tap a big picture to play!", 0.9);
      }
    });

    // 6 Giant Pictorial Home Buttons
    $('little-btn-trace')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof window.openLetterTracing === 'function') {
        window.openLetterTracing();
      } else if (typeof window.openPhonicsView === 'function') {
        window.openPhonicsView('trace');
      }
    });

    $('little-btn-books')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof window.openBooksHub === 'function') {
        window.openBooksHub('Pre-A1');
      }
    });

    $('little-btn-vocab')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof openVocabHub === 'function') {
        openVocabHub('Pre-A1');
      }
    });

    $('little-btn-abc')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof window.openPhonicsView === 'function') {
        window.openPhonicsView('board');
      }
    });

    $('little-btn-stories')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (typeof openView === 'function') openView('view-stories-hub');
      const preBtn = document.querySelector('#stories-cefr-filter [data-slevel="Pre-A1"]');
      if (preBtn && !preBtn.classList.contains('active')) preBtn.click();
    });

    $('little-btn-games')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      const easyBtn = $('btn-diff-easy');
      if (easyBtn && !easyBtn.classList.contains('active')) easyBtn.click();
      if (typeof openView === 'function') openView('view-games-hub');
    });

    // 4 Quick 1-Tap Picture Topic Bubbles (direct into Flashcards!)
    document.querySelectorAll('#little-quick-topics [data-little-topic]').forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.littleTopic;
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        if (typeof openTopicDeck === 'function' && topicId) {
          openTopicDeck(topicId, 'learn', 0);
        }
      });
    });
  }

  window.isLittleKidsMode = () => isLittleMode;
  window.setLittleKidsMode = setLittleKidsMode;
  window.toggleLittleKidsMode = toggleLittleKidsMode;
  window.refreshLittleModeUI = syncToggleButtonsUI;

  document.addEventListener('DOMContentLoaded', bindLittleKidsEvents);
})();
