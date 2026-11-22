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

  document.addEventListener('DOMContentLoaded', () => {
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
        window.history.replaceState(null, '', location.pathname);
      }
    }
  });
})();
