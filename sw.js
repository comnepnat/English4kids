/**
 * English4Kids service worker: makes repeat visits fast and lets the app work offline.
 *
 * - App code (HTML/JS/CSS): network first, so a new version on GitHub Pages shows up
 *   right away; the cached copy is used only when offline.
 * - Images, fonts and word-audio MP3s: cache first, so each picture or sound is
 *   downloaded once and then appears instantly.
 */
const VERSION = 'e4k-v6';
const SHELL_CACHE = `${ VERSION }-shell`;
const MEDIA_CACHE = `${ VERSION }-media`;
const MAX_MEDIA_ENTRIES = 1500;

const SHELL_FILES = [
  './',
  'index.html',
  'styles.css',
  'vocab-data.js',
  'profiles.js',
  'app.js',
  'voice.js',
  'art.js',
  'games.js',
  'phonics.js',
  'stories-data.js',
  'stories.js',
  'books-data.js',
  'books.js',
  'srs.js',
  'milestones.js',
  'backup.js',
  'quest.js',
  'pwa.js',
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

function isMediaRequest(url, request) {
  if (request.destination === 'image' || request.destination === 'font' || request.destination === 'audio') return true;
  if (/\.(webp|png|svg|jpg|jpeg|gif|woff2?|mp3|ogg)$/i.test(url.pathname)) return true;
  return url.hostname === 'fonts.googleapis.com';
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - maxEntries; i++) {
    await cache.delete(keys[i]);
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(MEDIA_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  // Opaque (cross-origin, no-cors) responses are fine to cache for images and audio.
  if (response && (response.ok || response.type === 'opaque')) {
    cache.put(request, response.clone()).then(() => trimCache(MEDIA_CACHE, MAX_MEDIA_ENTRIES));
  }
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await cache.match('index.html');
      if (shell) return shell;
    }
    throw err;
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (isMediaRequest(url, request)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
  }
  // Other cross-origin requests (dictionary lookups, cloud TTS, Google Drive) go straight to the network.
});
