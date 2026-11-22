/**
 * English4Kids - installable app support (pwa.js)
 * - Registers the service worker (offline + fast repeat visits).
 * - Shows a small "Install app" banner on the home screen when Chrome allows it.
 * - Handles home-screen shortcuts: ?start=quest and ?open=album.
 */
(function () {
  const DISMISS_KEY = 'english4kids_install_dismissed_v1';
  let deferredPrompt = null;

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.navigator.standalone === true;
  }

  function wasDismissed() {
    try { return localStorage.getItem(DISMISS_KEY) === '1'; } catch (e) { return false; }
  }

  function hideBanner() {
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.add('hidden');
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    if (isInstalled() || wasDismissed()) return;
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideBanner();
  });

  /* ------------------------------------------------------------------
     Android back gesture / back button
     The app switches screens inside one page, so without this the system
     back gesture leaves the app immediately. We keep one extra history
     entry above the start page; each back press is caught and turned into
     an in-app step back: close a dialog, otherwise press the current
     screen's own back button (so games, stories and audio clean up), and
     on the home screen ask for a second back before exiting.
     ------------------------------------------------------------------ */
  const GUARD = { e4kGuard: true };
  let exitArmed = false;
  let exitTimer = null;

  function isVisible(el) {
    return !!el && el.offsetParent !== null;
  }

  function pushGuard() {
    if (!history.state || !history.state.e4kGuard) history.pushState(GUARD, '');
  }

  function showToast(text) {
    let toast = document.getElementById('e4k-back-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'e4k-back-toast';
      toast.className = 'back-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
  }

  function handleInAppBack() {
    // 1. Close an open dialog
    const modal = [...document.querySelectorAll('.modal-backdrop')].find(m => !m.classList.contains('hidden'));
    if (modal) {
      const closeBtn = modal.querySelector('.btn-close-modal') || modal.querySelector('#btn-result-home');
      if (closeBtn) closeBtn.click();
      else modal.classList.add('hidden');
      return true;
    }

    // 2. Step back from the current screen using its own back button
    const view = document.querySelector('.view-section.active');
    if (!view || view.id === 'view-home') return false;

    // Leaving an exam half-way would lose it: ask first
    const examExit = document.getElementById('btn-ms-exit-exam');
    if (view.id === 'view-milestones' && isVisible(examExit)) {
      if (window.confirm('Thoát bài thi? Bài đang làm sẽ không được lưu.')) examExit.click();
      return true;
    }

    const backs = [...view.querySelectorAll('.btn-back, #btn-ms-exit-exam')].filter(isVisible);
    // Prefer an inner step ("Bộ thẻ") over jumping straight home
    const btn = backs.find(b => !/home$/i.test(b.id)) || backs[0];
    if (btn) btn.click();
    else if (typeof window.openView === 'function') window.openView('view-home');
    return true;
  }

  window.addEventListener('popstate', () => {
    // We are now on the start entry: the guard was just "used up"
    if (handleInAppBack()) {
      exitArmed = false;
      pushGuard();
      return;
    }
    // Home screen: the first back shows a hint, a second back within 2s exits
    if (exitArmed) return; // let this back leave the app
    exitArmed = true;
    showToast('Vuốt quay lại thêm lần nữa để thoát');
    clearTimeout(exitTimer);
    exitTimer = setTimeout(() => {
      exitArmed = false;
      pushGuard();
    }, 2000);
  });

  document.addEventListener('DOMContentLoaded', () => {
    pushGuard();

    const installBtn = document.getElementById('btn-install-app');
    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (e) { /* ignore */ }
        deferredPrompt = null;
        hideBanner();
      });
    }
    const closeBtn = document.getElementById('btn-install-dismiss');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* ignore */ }
        hideBanner();
      });
    }

    // Home-screen shortcuts (long-press the app icon)
    const params = new URLSearchParams(location.search);
    const target = params.get('start') === 'quest' ? 'btn-start-quest'
      : params.get('open') === 'album' ? 'btn-open-album' : null;
    if (target) {
      // Let the other modules finish their own start-up first
      setTimeout(() => {
        const btn = document.getElementById(target);
        if (btn) btn.click();
      }, 300);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(window.history.state, '', location.pathname);
      }
    }
  });
})();
