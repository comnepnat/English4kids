/**
 * English4Kids - Ultra-Natural 3-Layer Pronunciation Engine (voice.js)
 * Layer 1: Real Human Native Studio Audio (Free Dictionary API US/UK MP3s) with local cache & pitch-preserved slow playback
 * Layer 2: Smart Ranked Neural Browser Voices (Edge Online Natural, Apple Premium/Enhanced/Siri, Google Neural; penalizes robotic legacy voices; natural pitch 1.0)
 * Layer 3: Optional BYO Cloud AI TTS (Google Cloud Chirp 3 HD / Neural2 or OpenAI gpt-4o-mini-tts / tts-1) + Interactive Voice Picker Modal
 */
(function () {
  const PREFS_KEY = 'english4kids_voice_prefs_v1';
  const AUDIO_CACHE_KEY = 'english4kids_audio_cache_v1';
  const MAX_CACHE_ENTRIES = 600;

  const MIN_SPEED = 0.55;
  const MAX_SPEED = 1.40;
  const SPEED_STEP = 0.05;

  const DEFAULT_PREFS = {
    nativeWordAudio: true,     // Real human studio MP3 for single words
    accent: 'en-US',           // 'en-US' | 'en-GB'
    speedMultiplier: 1.0,      // 0.55 .. 1.40 (step 0.05)
    speechEngine: 'device',    // 'device' | 'kokoro' | 'google'
    voiceURI: 'auto',          // 'auto' or specific SpeechSynthesisVoice.voiceURI
    kokoroVoice: 'auto',       // 'auto' | 'af_heart' | 'af_bella' | 'am_michael' | 'bf_emma' | 'bm_george'
    kokoroCached: false,       // true once user downloaded Kokoro-82M into browser Cache Storage
    cloudProvider: 'google',   // 'google' | 'openai'
    cloudApiKey: ''
  };

  let prefs = { ...DEFAULT_PREFS };
  let audioCache = {};         // { "en-US:lion": "https://...", ... }
  let activeAudio = null;
  let speakToken = 0;          // Cancels stale async fetches when user clicks fast
  let cachedVoices = [];

  const $ = id => document.getElementById(id);

  function clampSpeed(val) {
    const num = Number(val);
    if (!Number.isFinite(num)) return 1.0;
    const clamped = Math.max(MIN_SPEED, Math.min(MAX_SPEED, num));
    return +(Math.round(clamped / SPEED_STEP) * SPEED_STEP).toFixed(2);
  }

  function describeSpeed(val) {
    const s = clampSpeed(val);
    if (s <= 0.70) return { emoji: '🐌', label: 'Rất chậm' };
    if (s <= 0.88) return { emoji: '🐢', label: 'Chậm rõ' };
    if (s <= 1.05) return { emoji: '✨', label: 'Tự nhiên' };
    if (s <= 1.22) return { emoji: '🐇', label: 'Nhanh' };
    return { emoji: '⚡', label: 'Bản xứ nhanh' };
  }

  /* ------------------------------------------------------------------
     Persistence
     ------------------------------------------------------------------ */
  function loadVoicePrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) || {};
        prefs = { ...DEFAULT_PREFS, ...parsed };
        // Backward-compatible migration for users who previously configured Cloud TTS
        if (!parsed.speechEngine) {
          prefs.speechEngine = (parsed.cloudProvider && parsed.cloudProvider !== 'none' && parsed.cloudApiKey)
            ? 'google'
            : 'device';
        }
        if (prefs.cloudProvider === 'none') prefs.cloudProvider = 'google';
        prefs.speedMultiplier = clampSpeed(prefs.speedMultiplier);
      }
    } catch (e) { /* ignore */ }
    try {
      const rawCache = localStorage.getItem(AUDIO_CACHE_KEY);
      if (rawCache) audioCache = JSON.parse(rawCache) || {};
    } catch (e) { audioCache = {}; }
  }

  function saveVoicePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch (e) { /* ignore */ }
  }

  function saveAudioCache() {
    try {
      const keys = Object.keys(audioCache);
      if (keys.length > MAX_CACHE_ENTRIES) {
        keys.slice(0, keys.length - MAX_CACHE_ENTRIES).forEach(k => delete audioCache[k]);
      }
      localStorage.setItem(AUDIO_CACHE_KEY, JSON.stringify(audioCache));
    } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------
     Speech text cleanup: strip emoji/markup and end every phrase with
     punctuation so TTS engines use a natural falling intonation instead
     of the flat "list item" tone they give to bare words.
     ------------------------------------------------------------------ */
  function prepareSpeechText(text) {
    let t = String(text || '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, ' ')
      .replace(/\s+\/\s+/g, ', ')
      .replace(/[_*#~]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (t && !/[.!?…]["'”’)]*$/.test(t)) t += '.';
    return t;
  }

  /* ------------------------------------------------------------------
     Smart Voice Quality Scoring (Ranks Neural HD Voices First!)
     ------------------------------------------------------------------ */
  function normalizeLang(lang) {
    return String(lang || '').replace('_', '-').toLowerCase();
  }

  function scoreVoice(v, targetAccent) {
    const lang = normalizeLang(v.lang);
    const name = v.name || '';
    const target = normalizeLang(targetAccent);

    if (!lang.startsWith('en')) return -999;

    let score = 0;

    // Accent match
    if (lang === target) score += 45;
    else if (lang.startsWith(target.slice(0, 2))) score += 10;

    // Tier 1: Modern Neural Voices (Microsoft Edge Online Natural & Apple Premium/Enhanced/Siri)
    if (/Natural|Neural/i.test(name)) score += 130;
    if (/Online \(Natural\)/i.test(name)) score += 20;
    if (/Microsoft (Ana|Aria|Jenny|Emma|Ava|Andrew|Brian|Guy|Sonia|Libby|Maisie)/i.test(name)) score += 25;
    if (/Premium|Enhanced/i.test(name)) score += 120;
    if (/\bSiri\b/i.test(name)) score += 110;

    // Tier 2: Google Chrome Cloud Neural Voices
    if (/Google US English/i.test(name)) score += target === 'en-us' ? 105 : 70;
    if (/Google UK English/i.test(name)) score += target === 'en-gb' ? 105 : 75;
    if (/Google/i.test(name)) score += 60;

    // Tier 3: Pleasant Apple / System Voices
    if (/\b(Ava|Zoe|Allison|Nicky|Samantha|Serena|Daniel|Karen|Moira|Tessa|Evan|Stephanie|Jamie|Alex)\b/i.test(name)) {
      score += 55;
    }

    // Prefer non-local cloud voices (often neural) slightly over compact offline
    if (v.localService === false) score += 22;
    // On Android, on-device voices play smoothly; streamed "-network" voices can stutter on weak Wi-Fi
    if (/Android/i.test(navigator.userAgent || '') && v.localService === true) score += 30;

    // Heavy Penalty: Legacy Robotic SAPI5, eSpeak, Compact & Novelty Voices
    if (/\b(Zira|David|Mark|Hazel|George|Susan|Richard|Heera|Ravi|eSpeak|Compact|Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Fred|Good News|Hysterical|Jester|Junior|Kathy|Organ|Princess|Ralph|Superstar|Trinoids|Whisper|Wobble|Zarvox|Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley)\b/i.test(name)) {
      score -= 95;
    }

    return score;
  }

  function refreshAvailableVoices() {
    if (!('speechSynthesis' in window)) return [];
    const list = window.speechSynthesis.getVoices() || [];
    cachedVoices = list
      .filter(v => normalizeLang(v.lang).startsWith('en'))
      .sort((a, b) => scoreVoice(b, prefs.accent) - scoreVoice(a, prefs.accent));
    return cachedVoices;
  }

  function pickBestBrowserVoice() {
    const voices = refreshAvailableVoices();
    if (!voices.length) return null;

    if (prefs.voiceURI && prefs.voiceURI !== 'auto') {
      const manual = voices.find(v => v.voiceURI === prefs.voiceURI || v.name === prefs.voiceURI);
      if (manual) return manual;
    }
    return voices[0];
  }

  function getVoiceQualityTag(v) {
    const s = scoreVoice(v, prefs.accent);
    if (s >= 140) return '⭐ HD Tự nhiên';
    if (s >= 90) return '✨ Rõ ràng';
    if (s < 10) return '🤖 Cơ bản';
    return '🔊 Chuẩn';
  }

  /* ------------------------------------------------------------------
     Layer 1: Real Human Native Studio MP3 Lookup (Dictionary API)
     ------------------------------------------------------------------ */
  function extractCleanSingleWord(text) {
    const trimmed = String(text || '').trim().replace(/[.!?,"'“”]+$/g, '').replace(/^["'“”]+/g, '').trim();
    // Single alphabetic word (including hyphenated like t-shirt, ice-cream)
    if (/^[a-zA-Z][a-zA-Z-]{1,28}$/.test(trimmed)) {
      return trimmed.toLowerCase();
    }
    return null;
  }

  function normalizeAudioUrl(url) {
    if (!url) return null;
    if (url.startsWith('//')) return `https:${ url }`;
    if (url.startsWith('http://')) return url.replace('http://', 'https://');
    return url;
  }

  async function resolveNativeWordAudioUrl(word, accent) {
    const cacheKey = `${ accent }:${ word }`;
    if (cacheKey in audioCache) {
      return audioCache[cacheKey]; // string URL or '' (known miss)
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1400);

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${ encodeURIComponent(word) }`, {
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!res.ok) {
        audioCache[cacheKey] = '';
        return '';
      }
      const entries = await res.json();
      const urls = [];
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          if (Array.isArray(entry.phonetics)) {
            for (const p of entry.phonetics) {
              if (p && p.audio && p.audio.trim()) {
                urls.push(normalizeAudioUrl(p.audio.trim()));
              }
            }
          }
        }
      }

      if (!urls.length) {
        audioCache[cacheKey] = '';
        return '';
      }

      const wantUK = accent === 'en-GB';
      const chosen =
        urls.find(u => wantUK ? /(-uk|_gb_|\/uk\/)/i.test(u) : /(-us|_us_|\/us\/)/i.test(u)) ||
        urls.find(u => /\.mp3(\?|$)/i.test(u)) ||
        urls[0];

      audioCache[cacheKey] = chosen || '';
      saveAudioCache();
      return audioCache[cacheKey];
    } catch (e) {
      clearTimeout(timer);
      return '';
    }
  }

  function playHtmlAudioUrl(url, playbackRate, onStart, onEnd, onError, maxStartMs = 0) {
    if (!activeAudio) {
      activeAudio = new Audio();
      activeAudio.crossOrigin = 'anonymous';
    }
    try {
      activeAudio.onended = null;
      activeAudio.onerror = null;
      activeAudio.onplaying = null;
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) { /* ignore */ }

    let finished = false;
    let startTimer = null;
    const finishOnce = (cb) => {
      if (finished) return;
      finished = true;
      if (startTimer) {
        clearTimeout(startTimer);
        startTimer = null;
      }
      if (activeAudio) {
        activeAudio.onended = null;
        activeAudio.onerror = null;
        activeAudio.onplaying = null;
      }
      if (cb) cb();
    };

    activeAudio.src = url;
    activeAudio.playbackRate = Math.max(0.5, Math.min(1.5, playbackRate));
    if ('preservesPitch' in activeAudio) activeAudio.preservesPitch = true;
    if ('webkitPreservesPitch' in activeAudio) activeAudio.webkitPreservesPitch = true;
    if ('mozPreservesPitch' in activeAudio) activeAudio.mozPreservesPitch = true;

    activeAudio.onplaying = () => {
      if (startTimer) {
        clearTimeout(startTimer);
        startTimer = null;
      }
    };
    activeAudio.onended = () => finishOnce(onEnd);
    activeAudio.onerror = () => finishOnce(onError);

    if (maxStartMs > 0) {
      startTimer = setTimeout(() => {
        if (!finished && activeAudio && activeAudio.currentTime < 0.02) {
          try { activeAudio.pause(); } catch (e) { /* ignore */ }
          finishOnce(onError);
        }
      }, maxStartMs);
    }

    if (onStart) onStart(activeAudio);
    const playPromise = activeAudio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        finishOnce(onError);
      });
    }
  }

  /* ------------------------------------------------------------------
     Layer 3 (Optional BYO Cloud AI TTS for Sentences & Stories)
     ------------------------------------------------------------------ */
  const cloudBlobCache = new Map();
  // Remember which cloud voice works so a missing Chirp voice isn't retried on every sentence,
  // and stop trying the cloud for this session after repeated failures (bad key, no quota, offline).
  const cloudVoiceStart = { google: 0, openai: 0 };
  let cloudFailStreak = 0;

  async function fetchWithTimeout(url, options, ms) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }

  async function synthesizeGoogle(text, rate) {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${ encodeURIComponent(prefs.cloudApiKey) }`;
    const speakingRate = Math.max(0.55, Math.min(1.4, rate));
    // Chirp 3 HD voices sound the most human; Neural2 is the long-standing fallback.
    const voiceNames = prefs.accent === 'en-GB'
      ? ['en-GB-Chirp3-HD-Aoede', 'en-GB-Neural2-A']
      : ['en-US-Chirp3-HD-Aoede', 'en-US-Neural2-F'];
    for (let i = cloudVoiceStart.google; i < voiceNames.length; i++) {
      const name = voiceNames[i];
      const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: prefs.accent, name },
          audioConfig: { audioEncoding: 'MP3', speakingRate }
        })
      }, 7000);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.audioContent) {
        cloudVoiceStart.google = i;
        return `data:audio/mp3;base64,${ data.audioContent }`;
      }
    }
    return null;
  }

  async function synthesizeOpenAI(text, rate) {
    const speed = Math.max(0.55, Math.min(1.4, rate));
    const attempts = [
      {
        model: 'gpt-4o-mini-tts',
        voice: 'coral',
        input: text,
        speed,
        instructions: 'Read in a warm, clear and natural voice, like a friendly teacher reading to young children. Do not exaggerate.'
      },
      { model: 'tts-1', voice: 'nova', input: text, speed }
    ];
    for (let i = cloudVoiceStart.openai; i < attempts.length; i++) {
      const body = attempts[i];
      const res = await fetchWithTimeout('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ prefs.cloudApiKey }`
        },
        body: JSON.stringify(body)
      }, 9000);
      if (!res.ok) continue;
      const blob = await res.blob();
      cloudVoiceStart.openai = i;
      return URL.createObjectURL(blob);
    }
    return null;
  }

  async function tryPlayCloudTts(rawText, rate, token, options = {}) {
    if (prefs.cloudProvider === 'none' || !prefs.cloudApiKey || cloudFailStreak >= 3) return false;
    const text = prepareSpeechText(rawText);
    const key = `${ prefs.cloudProvider }:${ prefs.accent }:${ rate.toFixed(2) }:${ text }`;

    try {
      let blobUrl = cloudBlobCache.get(key);
      if (!blobUrl) {
        if (prefs.cloudProvider === 'google') {
          blobUrl = await synthesizeGoogle(text, rate);
        } else if (prefs.cloudProvider === 'openai') {
          blobUrl = await synthesizeOpenAI(text, rate);
        }

        if (blobUrl) {
          cloudBlobCache.set(key, blobUrl);
          cloudFailStreak = 0;
        } else {
          cloudFailStreak += 1;
        }
      }

      if (!blobUrl || token !== speakToken) return false;

      return await new Promise(resolve => {
        setSpeakingVisual(true);
        playHtmlAudioUrl(
          blobUrl,
          1.0,
          (audioEl) => {
            if (options && typeof options.onAudioStart === 'function') {
              options.onAudioStart(audioEl, { engine: 'cloud', chunkIndex: 0, chunkCount: 1, chunkText: text });
            }
          },
          () => { setSpeakingVisual(false); resolve(true); },
          () => { setSpeakingVisual(false); resolve(false); }
        );
      });
    } catch (e) {
      cloudFailStreak += 1;
      return false;
    }
  }

  /* ------------------------------------------------------------------
     Engine 2: Kokoro-82M Offline AI TTS (Web Worker + Browser Cache)
     ------------------------------------------------------------------ */
  const KOKORO_MAX_CACHE = 80;
  let kokoroWorker = null;
  let kokoroState = 'idle'; // 'idle' | 'loading' | 'ready' | 'error'
  let kokoroProgress = 0;
  let kokoroErrorMsg = '';
  let kokoroJobId = 0;
  const kokoroPending = new Map();
  const kokoroBlobCache = new Map(); // key -> blobUrl
  let kokoroLoadPromise = null;

  function resolveKokoroVoiceId() {
    if (prefs.kokoroVoice && prefs.kokoroVoice !== 'auto') return prefs.kokoroVoice;
    return prefs.accent === 'en-GB' ? 'bf_emma' : 'af_heart';
  }

  function describeKokoroVoice(id) {
    const map = {
      af_heart: 'Heart (US)',
      af_bella: 'Bella (US)',
      am_michael: 'Michael (US)',
      bf_emma: 'Emma (UK)',
      bm_george: 'George (UK)'
    };
    return map[id] || id;
  }

  function updateKokoroUI() {
    const btn = $('btn-kokoro-download');
    const badge = $('voice-kokoro-status');
    const wrap = $('voice-kokoro-progress-wrap');
    const fill = $('voice-kokoro-progress-fill');

    if (btn) {
      if (kokoroState === 'loading') {
        btn.disabled = true;
        btn.textContent = `⏳ Đang tải Kokoro AI (${ kokoroProgress }%)...`;
      } else if (kokoroState === 'ready') {
        btn.disabled = false;
        btn.textContent = '✅ Kokoro AI đã sẵn sàng (Nghe thử)';
      } else if (prefs.kokoroCached) {
        btn.disabled = false;
        btn.textContent = '⚡ Nạp Kokoro AI từ bộ nhớ đệm';
      } else {
        btn.disabled = false;
        btn.textContent = '⬇️ Tải & Kích hoạt Kokoro AI (~86 MB)';
      }
    }

    if (badge) {
      badge.classList.remove('is-ready', 'is-loading', 'is-error');
      if (kokoroState === 'ready') {
        badge.classList.add('is-ready');
        badge.textContent = '✅ Đã sẵn sàng offline (không cần mạng)';
      } else if (kokoroState === 'loading') {
        badge.classList.add('is-loading');
        badge.textContent = prefs.kokoroCached
          ? `Đang nạp mô hình từ máy (${ kokoroProgress }%)...`
          : `Đang tải mô hình lần đầu (${ kokoroProgress }%)...`;
      } else if (kokoroState === 'error') {
        badge.classList.add('is-error');
        badge.textContent = `⚠️ ${ kokoroErrorMsg || 'Chưa tải được Kokoro (tự dự phòng giọng máy)' }`;
      } else if (prefs.kokoroCached) {
        badge.textContent = '💾 Đã lưu trên máy (sẽ tự nạp khi đọc)';
      } else {
        badge.textContent = 'Chưa tải mô hình (tự dự phòng giọng máy)';
      }
    }

    if (wrap && fill) {
      const showBar = kokoroState === 'loading';
      wrap.classList.toggle('hidden', !showBar);
      fill.style.width = `${ kokoroProgress }%`;
    }

    updateActiveVoiceStatusUI();
  }

  function ensureKokoroWorker() {
    if (kokoroWorker) return kokoroWorker;
    if (typeof Worker === 'undefined') {
      kokoroState = 'error';
      kokoroErrorMsg = 'Trình duyệt không hỗ trợ Web Worker.';
      updateKokoroUI();
      return null;
    }
    try {
      kokoroWorker = new Worker('./kokoro-worker.js', { type: 'module' });
      kokoroWorker.onmessage = (ev) => {
        const msg = ev.data || {};
        if (msg.type === 'status' && msg.status === 'loading') {
          kokoroState = 'loading';
          kokoroProgress = Math.max(kokoroProgress, msg.progress || 2);
          updateKokoroUI();
        } else if (msg.type === 'progress') {
          kokoroState = 'loading';
          kokoroProgress = Math.max(kokoroProgress, msg.progress || 0);
          updateKokoroUI();
        } else if (msg.type === 'ready') {
          kokoroState = 'ready';
          kokoroProgress = 100;
          kokoroErrorMsg = '';
          if (!prefs.kokoroCached) {
            prefs.kokoroCached = true;
            saveVoicePrefs();
          }
          updateKokoroUI();
        } else if (msg.type === 'audio' && msg.id != null) {
          const job = kokoroPending.get(msg.id);
          if (job) {
            kokoroPending.delete(msg.id);
            job.resolve(msg.blob);
          }
        } else if (msg.type === 'error') {
          if (msg.id != null && kokoroPending.has(msg.id)) {
            const job = kokoroPending.get(msg.id);
            kokoroPending.delete(msg.id);
            job.reject(new Error(msg.error || 'Kokoro error'));
          } else {
            kokoroState = 'error';
            kokoroErrorMsg = msg.error || 'Không thể tải mô hình Kokoro AI.';
            kokoroLoadPromise = null;
            updateKokoroUI();
          }
        }
      };
      kokoroWorker.onerror = (err) => {
        kokoroState = 'error';
        kokoroErrorMsg = 'Thiết bị không hỗ trợ tải module Kokoro AI.';
        kokoroLoadPromise = null;
        for (const job of kokoroPending.values()) job.reject(err);
        kokoroPending.clear();
        updateKokoroUI();
      };
      return kokoroWorker;
    } catch (e) {
      kokoroState = 'error';
      kokoroErrorMsg = 'Không khởi tạo được Kokoro Worker.';
      updateKokoroUI();
      return null;
    }
  }

  function loadKokoroModel() {
    if (kokoroState === 'ready') return Promise.resolve(true);
    if (kokoroLoadPromise) return kokoroLoadPromise;
    const worker = ensureKokoroWorker();
    if (!worker) return Promise.resolve(false);

    kokoroState = 'loading';
    kokoroProgress = 2;
    kokoroErrorMsg = '';
    updateKokoroUI();

    kokoroLoadPromise = new Promise(resolve => {
      const check = (ev) => {
        const msg = ev.data || {};
        if (msg.type === 'ready') {
          worker.removeEventListener('message', check);
          resolve(true);
        } else if (msg.type === 'error' && msg.id == null) {
          worker.removeEventListener('message', check);
          kokoroLoadPromise = null;
          resolve(false);
        }
      };
      worker.addEventListener('message', check);
      worker.postMessage({ type: 'load' });
    });
    return kokoroLoadPromise;
  }

  const KOKORO_IDB_NAME = 'e4k_kokoro_audio_v1';
  const KOKORO_IDB_STORE = 'clips';
  let kokoroDbPromise = null;

  function openKokoroDb() {
    if (kokoroDbPromise) return kokoroDbPromise;
    if (typeof indexedDB === 'undefined') return Promise.resolve(null);
    kokoroDbPromise = new Promise(resolve => {
      try {
        const req = indexedDB.open(KOKORO_IDB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(KOKORO_IDB_STORE)) {
            db.createObjectStore(KOKORO_IDB_STORE);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
    return kokoroDbPromise;
  }

  async function idbGetKokoroBlob(key) {
    const db = await openKokoroDb();
    if (!db) return null;
    return new Promise(resolve => {
      try {
        const tx = db.transaction(KOKORO_IDB_STORE, 'readonly');
        const req = tx.objectStore(KOKORO_IDB_STORE).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch { resolve(null); }
    });
  }

  async function idbPutKokoroBlob(key, blob) {
    const db = await openKokoroDb();
    if (!db || !blob) return;
    try {
      const tx = db.transaction(KOKORO_IDB_STORE, 'readwrite');
      tx.objectStore(KOKORO_IDB_STORE).put(blob, key);
    } catch { /* ignore quota errors */ }
  }

  function splitKokoroSentences(text) {
    const clean = prepareSpeechText(text);
    if (!clean) return [];
    const parts = clean.match(/[^.!?]+[.!?]+["'”’)]*\s*|[^.!?]+$/g) || [clean];
    return parts.map(s => s.trim()).filter(Boolean);
  }

  async function synthesizeKokoro(rawText) {
    if (kokoroState !== 'ready') return null;
    const worker = ensureKokoroWorker();
    if (!worker) return null;

    const text = prepareSpeechText(rawText);
    const voice = resolveKokoroVoiceId();
    const cacheKey = `${ voice }:${ text }`;
    if (kokoroBlobCache.has(cacheKey)) return kokoroBlobCache.get(cacheKey);

    // Check persistent IndexedDB cache first (0ms replay across reloads!)
    const cachedBlob = await idbGetKokoroBlob(cacheKey);
    if (cachedBlob) {
      const url = URL.createObjectURL(cachedBlob);
      kokoroBlobCache.set(cacheKey, url);
      return url;
    }

    const id = ++kokoroJobId;
    const blob = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        kokoroPending.delete(id);
        reject(new Error('Kokoro timeout'));
      }, 22000);
      kokoroPending.set(id, {
        resolve: (b) => { clearTimeout(timer); resolve(b); },
        reject: (err) => { clearTimeout(timer); reject(err); }
      });
      worker.postMessage({ type: 'generate', id, text, voice, speed: 1.0 });
    });

    if (!blob) return null;
    idbPutKokoroBlob(cacheKey, blob);
    const blobUrl = URL.createObjectURL(blob);
    if (kokoroBlobCache.size >= KOKORO_MAX_CACHE) {
      const firstKey = kokoroBlobCache.keys().next().value;
      const oldUrl = kokoroBlobCache.get(firstKey);
      if (oldUrl) try { URL.revokeObjectURL(oldUrl); } catch (e) { /* ignore */ }
      kokoroBlobCache.delete(firstKey);
    }
    kokoroBlobCache.set(cacheKey, blobUrl);
    return blobUrl;
  }

  // Sentence-by-sentence streaming: starts playing sentence 1 immediately while pre-generating sentence 2
  async function tryPlayKokoroTts(rawText, rate, token, options = {}) {
    if (kokoroState === 'idle' && prefs.kokoroCached) {
      loadKokoroModel().catch(() => {});
    }
    if (kokoroState !== 'ready') return false;

    const sentences = splitKokoroSentences(rawText);
    if (!sentences.length) return false;
    const audioRate = Math.max(0.55, Math.min(1.5, rate));

    try {
      let nextPromise = synthesizeKokoro(sentences[0]);
      for (let i = 0; i < sentences.length; i += 1) {
        const blobUrl = await nextPromise;
        if (!blobUrl || token !== speakToken) return i > 0;
        // Start generating next sentence immediately while current sentence plays
        nextPromise = (i + 1 < sentences.length)
          ? synthesizeKokoro(sentences[i + 1]).catch(() => null)
          : null;

        const ok = await new Promise(resolve => {
          setSpeakingVisual(true);
          playHtmlAudioUrl(
            blobUrl,
            audioRate,
            (audioEl) => {
              if (options && typeof options.onAudioStart === 'function') {
                options.onAudioStart(audioEl, {
                  engine: 'kokoro',
                  chunkIndex: i,
                  chunkCount: sentences.length,
                  chunkText: sentences[i]
                });
              }
            },
            () => { setSpeakingVisual(false); resolve(true); },
            () => { setSpeakingVisual(false); resolve(false); }
          );
        });
        if (!ok || token !== speakToken) return ok || token !== speakToken;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // Silently pre-generate the next sentence in Kokoro (sentence 1 first for instant start)
  window.prefetchSentenceAudio = function (text) {
    if (!text || prefs.speechEngine !== 'kokoro' || kokoroState !== 'ready') return;
    const parts = splitKokoroSentences(text);
    if (parts[0]) synthesizeKokoro(parts[0]).catch(() => {});
  };

  // Preload pre-recorded studio MP3s (e.g. next storybook page) into browser cache for 0ms playback
  const preloadedAudioUrls = new Set();
  window.preloadAudioUrl = function (url) {
    if (!url || preloadedAudioUrls.has(url)) return;
    preloadedAudioUrls.add(url);
    try {
      const a = new Audio();
      a.preload = 'auto';
      a.src = url;
    } catch (e) { /* ignore */ }
  };

  /* ------------------------------------------------------------------
     Layer 2: Natural Web Speech Synthesis (Pitch 1.0, Smart Voice)
     ------------------------------------------------------------------ */
  function setSpeakingVisual(isSpeaking) {
    const speakBtn = $('btn-speak-normal');
    if (speakBtn) speakBtn.classList.toggle('speaking', isSpeaking);
    if (document.body) document.body.classList.toggle('is-speaking', !!isSpeaking);
  }

  const IS_ANDROID = /Android/i.test(navigator.userAgent || '');
  // Chrome can garbage-collect an utterance mid-sentence (speech stops early, onend never
  // fires). Holding references until they finish prevents that.
  const liveUtterances = new Set();
  let finishCurrentSpeech = null; // resolves the promise of whatever is speaking now

  function splitIntoChunks(text) {
    // Long text is spoken sentence by sentence: Chrome's online voices cut off after ~15s.
    if (text.length <= 160) return [text];
    const parts = text.match(/[^.!?]+[.!?]+["'”’)]*\s*|[^.!?]+$/g) || [text];
    return parts.map(t => t.trim()).filter(Boolean);
  }

  function speakViaBrowserTts(text, requestedRate, options = {}) {
    return new Promise(resolve => {
      if (!('speechSynthesis' in window)) { resolve(); return; }
      const synth = window.speechSynthesis;
      const wasBusy = synth.speaking || synth.pending;
      synth.cancel();

      let settled = false;
      let safetyTimer = null;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(safetyTimer);
        if (finishCurrentSpeech === finish) finishCurrentSpeech = null;
        setSpeakingVisual(false);
        resolve();
      };
      finishCurrentSpeech = finish;

      const doSpeak = () => {
        if (settled) return;
        const prepared = prepareSpeechText(text);
        const chunks = splitIntoChunks(prepared);
        const bestVoice = pickBestBrowserVoice();
        // Calibrate natural rate while respecting the full 0.55x - 1.40x speed slider
        const baseRate = requestedRate <= 0.65 ? 0.72 : Math.min(1.04, Math.max(0.92, requestedRate + 0.04));
        const rate = Math.max(0.48, Math.min(1.5, +(baseRate * prefs.speedMultiplier).toFixed(2)));

        setSpeakingVisual(true);
        let searchCursor = 0;
        let startedNotified = false;
        const notifyStart = () => {
          if (startedNotified) return;
          startedNotified = true;
          if (options && typeof options.onSpeechStart === 'function') {
            options.onSpeechStart({ engine: 'browser', rate });
          }
        };

        chunks.forEach((chunk, i) => {
          const foundIdx = prepared.indexOf(chunk, searchCursor);
          const chunkOffset = foundIdx >= 0 ? foundIdx : searchCursor;
          searchCursor = chunkOffset + chunk.length;

          const utterance = new SpeechSynthesisUtterance(chunk);
          if (bestVoice) {
            utterance.voice = bestVoice;
            utterance.lang = bestVoice.lang || prefs.accent;
          } else {
            utterance.lang = prefs.accent;
          }
          utterance.rate = rate;
          utterance.pitch = 1.0; // natural pitch (1.1 sounds like a chipmunk)
          utterance.volume = 1.0;
          liveUtterances.add(utterance);

          utterance.onstart = () => {
            if (i === 0) notifyStart();
          };
          if (options && typeof options.onBoundary === 'function') {
            utterance.onboundary = (ev) => {
              if (!ev || (ev.name && ev.name !== 'word')) return;
              const charIndex = typeof ev.charIndex === 'number' ? ev.charIndex : 0;
              options.onBoundary({
                charIndex,
                charLength: typeof ev.charLength === 'number' ? ev.charLength : 0,
                globalCharIndex: chunkOffset + charIndex,
                chunkIndex: i,
                chunkText: chunk,
                rate
              });
            };
          }

          const done = () => {
            liveUtterances.delete(utterance);
            if (i === chunks.length - 1) finish();
          };
          utterance.onend = done;
          utterance.onerror = done;
          synth.speak(utterance);
        });

        // Wait briefly for utterance.onstart so Karaoke syncs to actual voice onset, with fast safety net
        setTimeout(() => { if (!settled) notifyStart(); }, 220);

        // Safety net in case the browser never reports the end of speech.
        const estimateMs = 2500 + (text.length * 95) / rate;
        safetyTimer = setTimeout(finish, Math.min(30000, estimateMs));
      };

      // Speaking right after cancel() makes some engines (notably Android) drop or clip
      // the new utterance, so give the engine a moment to settle.
      const settleMs = IS_ANDROID ? 150 : (wasBusy ? 60 : 0);
      if (settleMs) setTimeout(doSpeak, settleMs);
      else doSpeak();
    });
  }

  /* ------------------------------------------------------------------
     Public Unified Speech API (Replaces legacy speakEnglish seamlessly)
     ------------------------------------------------------------------ */
  let currentSpeech = Promise.resolve();

  window.stopAllSpeech = function () {
    speakToken += 1;
    if (activeAudio) {
      try { activeAudio.pause(); activeAudio.currentTime = 0; } catch (e) { /* ignore */ }
      if (typeof activeAudio.onended === 'function') activeAudio.onended();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (finishCurrentSpeech) finishCurrentSpeech();
    setSpeakingVisual(false);
  };

  window.prefetchWordAudio = function (text) {
    if (!prefs.nativeWordAudio) return;
    const word = extractCleanSingleWord(text);
    if (word) {
      resolveNativeWordAudioUrl(word, prefs.accent)
        .then(url => {
          if (url && typeof window.preloadAudioUrl === 'function') {
            window.preloadAudioUrl(url);
          }
        })
        .catch(() => {});
    }
  };

  async function tryPlayDirectAudioUrl(url, audioRate, myToken, options = {}, maxStartMs = 0) {
    if (!url || myToken !== speakToken) return false;
    const clampedRate = Math.max(0.55, Math.min(1.5, audioRate));
    return await new Promise(resolve => {
      setSpeakingVisual(true);
      playHtmlAudioUrl(
        url,
        clampedRate,
        (audioEl) => {
          if (options && typeof options.onAudioStart === 'function') {
            options.onAudioStart(audioEl, {
              engine: 'mp3',
              chunkIndex: 0,
              chunkCount: 1,
              chunkText: options.text || ''
            });
          }
        },
        () => { setSpeakingVisual(false); resolve(true); },
        () => { setSpeakingVisual(false); resolve(false); },
        maxStartMs
      );
    });
  }

  async function speakInternal(text, rate, myToken, options = {}) {
    const cleanWord = extractCleanSingleWord(text);
    const isSlow = rate <= 0.68;
    const effectiveRate = (isSlow ? 0.76 : 1.0) * prefs.speedMultiplier;
    const preRecordedUrl = options && options.audioUrl ? String(options.audioUrl) : '';
    const isInstantTap = Boolean(options && options.instant);
    const hookOpts = options ? { ...options, text } : { text };

    // Priority 0a (Pre-recorded Studio Audiobook MP3 for 16 storybooks — 0ms latency, Kokoro-82M fp32):
    // Played immediately unless user explicitly activated Google Cloud TTS with an API key.
    if (preRecordedUrl && prefs.nativeWordAudio && !(prefs.speechEngine === 'google' && prefs.cloudApiKey)) {
      const ok = await tryPlayDirectAudioUrl(preRecordedUrl, effectiveRate, myToken, hookOpts, 0);
      if (ok || myToken !== speakToken) return;
    }

    // Priority 0b (Single words): Real human studio MP3 when enabled — never stall >420ms on live taps!
    if (prefs.nativeWordAudio && cleanWord) {
      const cacheKey = `${ prefs.accent }:${ cleanWord }`;
      let mp3Url = '';
      if (cacheKey in audioCache) {
        mp3Url = audioCache[cacheKey] || '';
      } else if (isInstantTap) {
        // Warm cache in background without blocking the child's tap
        window.prefetchWordAudio(cleanWord);
      } else {
        // Fast 420ms race: play studio MP3 if quick, otherwise fall back immediately while caching in background
        const lookupPromise = resolveNativeWordAudioUrl(cleanWord, prefs.accent);
        mp3Url = await Promise.race([
          lookupPromise,
          new Promise(r => setTimeout(() => r(''), 420))
        ]);
      }
      if (myToken !== speakToken) return;
      if (mp3Url && (!isInstantTap || preloadedAudioUrls.has(mp3Url))) {
        const audioRate = isSlow ? 0.74 * prefs.speedMultiplier : 1.0 * prefs.speedMultiplier;
        const ok = await tryPlayDirectAudioUrl(mp3Url, audioRate, myToken, hookOpts, isInstantTap ? 450 : 650);
        if (ok || myToken !== speakToken) return;
      } else if (mp3Url && isInstantTap) {
        window.preloadAudioUrl(mp3Url);
      }
    }

    // Priority 1: User's selected main engine (with smart fallback so speech is never silent)
    if (prefs.speechEngine === 'google') {
      // 1a. Google Cloud TTS (or OpenAI if chosen in panel 3)
      if (prefs.cloudApiKey) {
        const ok = await tryPlayCloudTts(text, (isSlow ? 0.75 : 0.96) * prefs.speedMultiplier, myToken, hookOpts);
        if (ok || myToken !== speakToken) return;
      }
      // 1b. Smart fallback -> pre-recorded studio MP3 if available (0ms offline!)
      if (preRecordedUrl) {
        const ok = await tryPlayDirectAudioUrl(preRecordedUrl, effectiveRate, myToken, hookOpts);
        if (ok || myToken !== speakToken) return;
      }
      // 1c. Smart fallback -> Kokoro AI if already ready offline on this device
      if (kokoroState === 'ready') {
        const ok = await tryPlayKokoroTts(text, effectiveRate, myToken, hookOpts);
        if (ok || myToken !== speakToken) return;
      }
    } else if (prefs.speechEngine === 'kokoro') {
      // 1a. Kokoro AI Offline (WebGPU/WASM + sentence streaming + IndexedDB cache)
      const ok = await tryPlayKokoroTts(text, effectiveRate, myToken, hookOpts);
      if (ok || myToken !== speakToken) return;
    }

    // Final layer (always available): Best ranked device/browser voice
    if (myToken !== speakToken) return;
    await speakViaBrowserTts(text, rate, hookOpts);
  }

  // Returns a Promise that resolves when the speech has finished (or was interrupted).
  window.speakEnglish = function (text, rate = 0.92, options = {}) {
    if (!text || !String(text).trim()) return Promise.resolve();
    window.stopAllSpeech();
    const myToken = speakToken;
    let endNotified = false;
    const notifyEnd = () => {
      if (endNotified) return;
      endNotified = true;
      if (options && typeof options.onSpeechEnd === 'function') {
        try { options.onSpeechEnd(); } catch (e) { /* ignore */ }
      }
    };
    currentSpeech = speakInternal(text, rate, myToken, options)
      .catch(() => {})
      .finally(notifyEnd);
    return currentSpeech;
  };

  /**
   * Run `callback` once the current speech has finished, plus a short pause, so the next
   * scene/step never cuts a sentence off. `min` keeps a minimum pace, `max` caps the wait.
   * Returns { cancel } so callers can abort (e.g. when the user leaves the screen).
   */
  window.afterSpeech = function (callback, { gap = 600, min = 0, max = 20000 } = {}) {
    const started = Date.now();
    let cancelled = false;
    let timer = null;
    const scaledMax = Math.max(max, Math.round(max / Math.min(1, prefs.speedMultiplier || 1)));
    const capTimer = setTimeout(proceed, scaledMax);
    let proceeded = false;
    function proceed() {
      if (proceeded || cancelled) return;
      proceeded = true;
      clearTimeout(capTimer);
      const wait = Math.max(gap, min - (Date.now() - started));
      timer = setTimeout(() => { if (!cancelled) callback(); }, wait);
    }
    currentSpeech.then(proceed, proceed);
    return {
      cancel() {
        cancelled = true;
        clearTimeout(capTimer);
        clearTimeout(timer);
      }
    };
  };

  /* ------------------------------------------------------------------
     Synchronized Speech Speed Sliders (Voice Modal + Flashcards + Stories + SRS)
     ------------------------------------------------------------------ */
  function syncSpeedUI() {
    const speed = clampSpeed(prefs.speedMultiplier);
    const pct = Math.round(((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100);
    const speedStr = `${ speed.toFixed(2) }×`;
    const shortStr = `${ Number(speed.toFixed(2)) }×`;
    const desc = describeSpeed(speed);

    document.querySelectorAll('[data-speed-slider]').forEach(el => {
      el.value = String(speed);
      el.style.setProperty('--speed-pct', `${ pct }%`);
    });

    document.querySelectorAll('[data-speed-badge]').forEach(el => {
      el.textContent = speedStr;
    });

    const liveTag = $('voice-speed-live-tag');
    if (liveTag) {
      liveTag.textContent = `${ desc.emoji } ${ speedStr } • ${ desc.label }`;
    }

    const headerChip = $('header-speed-chip');
    if (headerChip) {
      const isDefault = Math.abs(speed - 1.0) < 0.001;
      headerChip.textContent = shortStr;
      headerChip.classList.toggle('hidden', isDefault);
    }

    document.querySelectorAll('#voice-speed-group [data-speed]').forEach(btn => {
      btn.classList.toggle('active', Math.abs(Number(btn.dataset.speed) - speed) < 0.005);
    });
  }

  window.getSpeechSpeed = function () {
    return clampSpeed(prefs.speedMultiplier);
  };

  window.setSpeechSpeed = function (value, { save = true, silent = false } = {}) {
    prefs.speedMultiplier = clampSpeed(value);
    if (save) saveVoicePrefs();
    syncSpeedUI();
    if (!silent && typeof playSoundEffect === 'function') {
      playSoundEffect('pop');
    }
    return prefs.speedMultiplier;
  };

  /* ------------------------------------------------------------------
     Voice Settings Modal UI (#voice-modal)
     ------------------------------------------------------------------ */
  function populateVoiceSelect() {
    const sel = $('voice-select-dropdown');
    if (!sel) return;
    const voices = refreshAvailableVoices();
    const best = voices[0];

    sel.innerHTML = '';
    const autoOpt = document.createElement('option');
    autoOpt.value = 'auto';
    autoOpt.textContent = best
      ? `✨ Tự động chọn hay nhất (${ best.name })`
      : '✨ Tự động chọn giọng hay nhất';
    sel.appendChild(autoOpt);

    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI || v.name;
      const tag = getVoiceQualityTag(v);
      opt.textContent = `${ tag } • ${ v.name } (${ v.lang })`;
      sel.appendChild(opt);
    });

    sel.value = prefs.voiceURI || 'auto';
    if (sel.selectedIndex < 0) sel.value = 'auto';

    updateActiveVoiceStatusUI();
  }

  function syncEnginePanelsUI() {
    const active = prefs.speechEngine || 'device';
    document.querySelectorAll('#voice-engine-group [data-engine]').forEach(btn => {
      const on = btn.dataset.engine === active;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    ['device', 'kokoro', 'google'].forEach(key => {
      const panel = $(`voice-panel-${ key }`);
      if (panel) panel.classList.toggle('hidden', key !== active);
    });
  }

  function updateActiveVoiceStatusUI() {
    const statusEl = $('voice-active-summary');
    if (!statusEl) return;
    const best = pickBestBrowserVoice();
    const accentLabel = prefs.accent === 'en-GB' ? '🇬🇧 Anh–Anh' : '🇺🇸 Anh–Mỹ';
    const voiceLabel = best ? best.name : 'Giọng mặc định hệ thống';

    let engineSummary = '';
    if (prefs.speechEngine === 'kokoro') {
      const kv = describeKokoroVoice(resolveKokoroVoiceId());
      engineSummary = kokoroState === 'ready'
        ? `🤖 Kokoro AI Offline (${ kv })`
        : kokoroState === 'loading'
          ? `⏳ Đang tải Kokoro AI (${ kokoroProgress }%) — tạm dùng ${ voiceLabel }`
          : `🤖 Kokoro AI (chưa tải — đang dự phòng ${ voiceLabel })`;
    } else if (prefs.speechEngine === 'google') {
      const provName = prefs.cloudProvider === 'openai' ? 'OpenAI GPT-4o TTS' : 'Google Cloud Chirp 3 HD';
      engineSummary = prefs.cloudApiKey
        ? `☁️ ${ provName }`
        : `☁️ ${ provName } (chưa nhập API Key — đang dự phòng ${ voiceLabel })`;
    } else {
      const roboticHint = (!best || scoreVoice(best, prefs.accent) < 90)
        ? ' • 💡 Xem mẹo bên dưới để chọn giọng máy tự nhiên hơn'
        : '';
      engineSummary = `📱 ${ voiceLabel }${ roboticHint }`;
    }

    statusEl.textContent = prefs.nativeWordAudio
      ? `🟢 Từ đơn: Giọng người thật (${ accentLabel }) • Câu & Truyện: ${ engineSummary }`
      : `🔊 Đang dùng (${ accentLabel }): ${ engineSummary }`;
  }

  function syncVoiceModalControls() {
    const nativeChk = $('chk-native-word-audio');
    if (nativeChk) nativeChk.checked = !!prefs.nativeWordAudio;

    document.querySelectorAll('#voice-accent-group [data-accent]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.accent === prefs.accent);
    });
    syncSpeedUI();
    syncEnginePanelsUI();

    const kSel = $('voice-kokoro-voice');
    if (kSel) kSel.value = prefs.kokoroVoice || 'auto';

    const provSel = $('voice-cloud-provider');
    const keyInp = $('voice-cloud-key');
    if (provSel) provSel.value = prefs.cloudProvider === 'openai' ? 'openai' : 'google';
    if (keyInp) keyInp.value = prefs.cloudApiKey || '';

    populateVoiceSelect();
    updateKokoroUI();
  }

  function bindVoiceModalEvents() {
    loadVoicePrefs();
    syncSpeedUI();

    if ('speechSynthesis' in window) {
      refreshAvailableVoices();
      const prevHandler = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = () => {
        if (typeof prevHandler === 'function') prevHandler();
        populateVoiceSelect();
      };
    }

    // If user chose Kokoro AI and already downloaded it previously, warm it up quietly in background
    if (prefs.speechEngine === 'kokoro' && prefs.kokoroCached) {
      setTimeout(() => loadKokoroModel().catch(() => {}), 1200);
    }

    // Bind ALL synchronized range sliders (Voice Modal, Flashcards, Stories, SRS)
    document.querySelectorAll('[data-speed-slider]').forEach(slider => {
      slider.addEventListener('input', () => {
        window.setSpeechSpeed(slider.value, { save: false, silent: true });
      });
      slider.addEventListener('change', () => {
        window.setSpeechSpeed(slider.value, { save: true, silent: false });
      });
    });

    // Bind 🐢 / 🐇 micro-step buttons (-0.05 / +0.05)
    document.querySelectorAll('[data-speed-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = Number(btn.dataset.speedStep) || 0;
        window.setSpeechSpeed(prefs.speedMultiplier + delta, { save: true, silent: false });
      });
    });

    const modal = $('voice-modal');
    if (!modal) return;

    const openModal = () => {
      playSoundEffect('pop');
      syncVoiceModalControls();
      modal.classList.remove('hidden');
    };
    const closeModal = () => {
      playSoundEffect('pop');
      modal.classList.add('hidden');
    };

    const openBtn = $('btn-voice-modal');
    if (openBtn) openBtn.addEventListener('click', openModal);
    const closeBtn = $('btn-close-voice');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // 3-Choice Engine Selector (Device / Kokoro / Google Cloud)
    document.querySelectorAll('#voice-engine-group [data-engine]').forEach(btn => {
      btn.addEventListener('click', () => {
        const eng = btn.dataset.engine || 'device';
        prefs.speechEngine = eng;
        saveVoicePrefs();
        syncEnginePanelsUI();
        updateActiveVoiceStatusUI();
        playSoundEffect('pop');
        if (eng === 'kokoro' && prefs.kokoroCached && kokoroState === 'idle') {
          loadKokoroModel().catch(() => {});
        }
      });
    });

    // Native human audio toggle
    const nativeChk = $('chk-native-word-audio');
    if (nativeChk) {
      nativeChk.addEventListener('change', () => {
        prefs.nativeWordAudio = nativeChk.checked;
        saveVoicePrefs();
        updateActiveVoiceStatusUI();
        playSoundEffect('pop');
      });
    }

    // Accent toggle (US / UK)
    document.querySelectorAll('#voice-accent-group [data-accent]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.accent = btn.dataset.accent;
        saveVoicePrefs();
        syncVoiceModalControls();
        playSoundEffect('pop');
        window.speakEnglish('Hello', 0.95);
      });
    });

    // Speed quick preset buttons
    document.querySelectorAll('#voice-speed-group [data-speed]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.setSpeechSpeed(btn.dataset.speed, { save: true, silent: false });
      });
    });

    // Manual browser voice dropdown (Engine 1: Device)
    const sel = $('voice-select-dropdown');
    if (sel) {
      sel.addEventListener('change', () => {
        prefs.voiceURI = sel.value;
        saveVoicePrefs();
        updateActiveVoiceStatusUI();
        window.speakEnglish('Hello! Welcome to English for kids.', 0.95);
      });
    }

    // Kokoro voice character dropdown + Download/Activate button (Engine 2: Kokoro)
    const kSel = $('voice-kokoro-voice');
    if (kSel) {
      kSel.addEventListener('change', () => {
        prefs.kokoroVoice = kSel.value || 'auto';
        saveVoicePrefs();
        updateActiveVoiceStatusUI();
        if (kokoroState === 'ready') {
          window.speakEnglish('Hello! Let us read a fun story together.', 0.96);
        }
      });
    }

    const kBtn = $('btn-kokoro-download');
    if (kBtn) {
      kBtn.addEventListener('click', async () => {
        prefs.speechEngine = 'kokoro';
        saveVoicePrefs();
        syncEnginePanelsUI();
        playSoundEffect('pop');
        const ok = await loadKokoroModel();
        if (ok) {
          playSoundEffect('star');
          window.speakEnglish('Hello! Kokoro voice is ready for story time!', 0.96);
        }
      });
    }

    // Sample test buttons
    const testWordBtn = $('btn-voice-test-word');
    if (testWordBtn) {
      testWordBtn.addEventListener('click', () => {
        window.speakEnglish('Elephant', 0.95);
      });
    }
    const testSentBtn = $('btn-voice-test-sentence');
    if (testSentBtn) {
      testSentBtn.addEventListener('click', () => {
        window.speakEnglish('The elephant drinks water with its long trunk.', 0.95);
      });
    }

    // Cloud AI TTS save (Engine 3: Google Cloud / OpenAI)
    const saveCloudBtn = $('btn-save-cloud-tts');
    if (saveCloudBtn) {
      saveCloudBtn.addEventListener('click', () => {
        prefs.cloudProvider = ($('voice-cloud-provider').value || 'google');
        prefs.cloudApiKey = ($('voice-cloud-key').value || '').trim();
        prefs.speechEngine = prefs.cloudApiKey ? 'google' : 'device';
        cloudFailStreak = 0;
        cloudVoiceStart.google = 0;
        cloudVoiceStart.openai = 0;
        cloudBlobCache.clear();
        saveVoicePrefs();
        syncEnginePanelsUI();
        updateActiveVoiceStatusUI();
        playSoundEffect('star');
        const msg = $('voice-cloud-status');
        if (msg) {
          msg.textContent = prefs.cloudApiKey
            ? '✅ Đã lưu API Key! Bấm "Nghe thử cả câu" để kiểm tra giọng Cloud AI.'
            : 'ℹ️ Bạn chưa nhập API Key — app tạm dùng Giọng máy thiết bị.';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', bindVoiceModalEvents);
})();
