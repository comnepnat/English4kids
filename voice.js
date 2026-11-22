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

  const DEFAULT_PREFS = {
    nativeWordAudio: true,     // Real human studio MP3 for single words
    accent: 'en-US',           // 'en-US' | 'en-GB'
    speedMultiplier: 1.0,      // 0.85 | 1.0 | 1.1
    voiceURI: 'auto',          // 'auto' or specific SpeechSynthesisVoice.voiceURI
    cloudProvider: 'none',     // 'none' | 'google' | 'openai'
    cloudApiKey: ''
  };

  let prefs = { ...DEFAULT_PREFS };
  let audioCache = {};         // { "en-US:lion": "https://...", ... }
  let activeAudio = null;
  let speakToken = 0;          // Cancels stale async fetches when user clicks fast
  let cachedVoices = [];

  const $ = id => document.getElementById(id);

  /* ------------------------------------------------------------------
     Persistence
     ------------------------------------------------------------------ */
  function loadVoicePrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) prefs = { ...DEFAULT_PREFS, ...JSON.parse(raw) };
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
    // Android Chrome exposes Google's high-quality server voices as "...-network"
    if (/-network\b/i.test(name)) score += 40;

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

  function playHtmlAudioUrl(url, playbackRate, onStart, onEnd, onError) {
    if (!activeAudio) {
      activeAudio = new Audio();
      activeAudio.crossOrigin = 'anonymous';
    }
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) { /* ignore */ }

    activeAudio.src = url;
    activeAudio.playbackRate = Math.max(0.6, Math.min(1.25, playbackRate));
    if ('preservesPitch' in activeAudio) activeAudio.preservesPitch = true;
    if ('webkitPreservesPitch' in activeAudio) activeAudio.webkitPreservesPitch = true;
    if ('mozPreservesPitch' in activeAudio) activeAudio.mozPreservesPitch = true;

    activeAudio.onended = () => { if (onEnd) onEnd(); };
    activeAudio.onerror = () => { if (onError) onError(); };

    if (onStart) onStart();
    const playPromise = activeAudio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (onError) onError();
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
    const speakingRate = Math.max(0.65, Math.min(1.2, rate));
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
    const attempts = [
      {
        model: 'gpt-4o-mini-tts',
        voice: 'coral',
        input: text,
        instructions: 'Read in a warm, clear and natural voice, like a friendly teacher reading to young children. Do not exaggerate.'
      },
      { model: 'tts-1', voice: 'nova', input: text, speed: Math.max(0.65, Math.min(1.25, rate)) }
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

  async function tryPlayCloudTts(rawText, rate, token) {
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
          null,
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
     Layer 2: Natural Web Speech Synthesis (Pitch 1.0, Smart Voice)
     ------------------------------------------------------------------ */
  function setSpeakingVisual(isSpeaking) {
    const speakBtn = $('btn-speak-normal');
    if (speakBtn) speakBtn.classList.toggle('speaking', isSpeaking);
  }

  function speakViaBrowserTts(text, requestedRate) {
    if (!('speechSynthesis' in window)) return;

    const wasSpeaking = window.speechSynthesis.speaking || window.speechSynthesis.pending;
    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(prepareSpeechText(text));
      const bestVoice = pickBestBrowserVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
        utterance.lang = bestVoice.lang || prefs.accent;
      } else {
        utterance.lang = prefs.accent;
      }

      // Calibrate natural rate: avoid overly slow distortion (0.55 -> 0.70; 0.85..0.95 -> ~0.95)
      let baseRate = requestedRate <= 0.65 ? 0.70 : Math.min(1.05, Math.max(0.90, requestedRate + 0.06));
      utterance.rate = Math.max(0.62, Math.min(1.2, +(baseRate * prefs.speedMultiplier).toFixed(2)));

      // CRITICAL: Natural pitch 1.0 (avoid robotic chipmunk pitch 1.1!)
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      setSpeakingVisual(true);
      utterance.onend = () => setSpeakingVisual(false);
      utterance.onerror = () => setSpeakingVisual(false);

      window.speechSynthesis.speak(utterance);
    };

    // Tiny settle guard prevents Chrome/Safari from clipping the first syllable after cancel()
    if (wasSpeaking) {
      setTimeout(doSpeak, 25);
    } else {
      doSpeak();
    }
  }

  /* ------------------------------------------------------------------
     Public Unified Speech API (Replaces legacy speakEnglish seamlessly)
     ------------------------------------------------------------------ */
  window.stopAllSpeech = function () {
    speakToken += 1;
    if (activeAudio) {
      try { activeAudio.pause(); activeAudio.currentTime = 0; } catch (e) { /* ignore */ }
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingVisual(false);
  };

  window.prefetchWordAudio = function (text) {
    if (!prefs.nativeWordAudio) return;
    const word = extractCleanSingleWord(text);
    if (word) {
      resolveNativeWordAudioUrl(word, prefs.accent).catch(() => {});
    }
  };

  window.speakEnglish = async function (text, rate = 0.92) {
    if (!text || !String(text).trim()) return;
    window.stopAllSpeech();
    const myToken = speakToken;

    const cleanWord = extractCleanSingleWord(text);
    const isSlow = rate <= 0.68;

    // Layer 1: Try Real Human Studio MP3 for single words (instant when cached, ~200ms first time)
    if (prefs.nativeWordAudio && cleanWord) {
      const mp3Url = await resolveNativeWordAudioUrl(cleanWord, prefs.accent);
      if (myToken !== speakToken) return;
      if (mp3Url) {
        const audioRate = isSlow ? 0.74 * prefs.speedMultiplier : 1.0 * prefs.speedMultiplier;
        const ok = await new Promise(resolve => {
          setSpeakingVisual(true);
          playHtmlAudioUrl(
            mp3Url,
            audioRate,
            null,
            () => { setSpeakingVisual(false); resolve(true); },
            () => { setSpeakingVisual(false); resolve(false); }
          );
        });
        if (ok || myToken !== speakToken) return;
      }
    }

    // Layer 3 (Optional): Cloud AI Neural TTS for sentences/stories when user configured an API key
    if (prefs.cloudProvider !== 'none' && prefs.cloudApiKey) {
      const ok = await tryPlayCloudTts(text, (isSlow ? 0.75 : 0.96) * prefs.speedMultiplier, myToken);
      if (ok || myToken !== speakToken) return;
    }

    // Layer 2: Best Ranked Neural Browser Voice (natural pitch 1.0)
    if (myToken !== speakToken) return;
    speakViaBrowserTts(text, rate);
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

  function updateActiveVoiceStatusUI() {
    const statusEl = $('voice-active-summary');
    if (!statusEl) return;
    const best = pickBestBrowserVoice();
    const accentLabel = prefs.accent === 'en-GB' ? '🇬🇧 Anh–Anh' : '🇺🇸 Anh–Mỹ';
    const voiceLabel = best ? best.name : 'Giọng mặc định hệ thống';
    const cloudLabel = prefs.cloudProvider !== 'none' && prefs.cloudApiKey
      ? ` + ☁️ ${ prefs.cloudProvider === 'google' ? 'Google Chirp 3 HD' : 'OpenAI GPT-4o TTS' }`
      : '';
    const roboticHint = !cloudLabel && (!best || scoreVoice(best, prefs.accent) < 90)
      ? ' • ⚠️ Giọng trên thiết bị này còn hơi máy móc, xem mẹo bên dưới để tải giọng tự nhiên miễn phí.'
      : '';
    statusEl.textContent = prefs.nativeWordAudio
      ? `🟢 Từ vựng: Giọng người thật (${ accentLabel }) • Câu & Truyện: ${ voiceLabel }${ cloudLabel }${ roboticHint }`
      : `🔊 Đang dùng (${ accentLabel }): ${ voiceLabel }${ cloudLabel }${ roboticHint }`;
  }

  function syncVoiceModalControls() {
    const nativeChk = $('chk-native-word-audio');
    if (nativeChk) nativeChk.checked = !!prefs.nativeWordAudio;

    document.querySelectorAll('#voice-accent-group [data-accent]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.accent === prefs.accent);
    });
    document.querySelectorAll('#voice-speed-group [data-speed]').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.speed) === Number(prefs.speedMultiplier));
    });

    const provSel = $('voice-cloud-provider');
    const keyInp = $('voice-cloud-key');
    if (provSel) provSel.value = prefs.cloudProvider || 'none';
    if (keyInp) keyInp.value = prefs.cloudApiKey || '';

    populateVoiceSelect();
  }

  function bindVoiceModalEvents() {
    loadVoicePrefs();

    if ('speechSynthesis' in window) {
      refreshAvailableVoices();
      const prevHandler = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = () => {
        if (typeof prevHandler === 'function') prevHandler();
        populateVoiceSelect();
      };
    }

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

    // Speed toggle
    document.querySelectorAll('#voice-speed-group [data-speed]').forEach(btn => {
      btn.addEventListener('click', () => {
        prefs.speedMultiplier = Number(btn.dataset.speed) || 1.0;
        saveVoicePrefs();
        syncVoiceModalControls();
        playSoundEffect('pop');
      });
    });

    // Manual browser voice dropdown
    const sel = $('voice-select-dropdown');
    if (sel) {
      sel.addEventListener('change', () => {
        prefs.voiceURI = sel.value;
        saveVoicePrefs();
        updateActiveVoiceStatusUI();
        window.speakEnglish('Hello! Welcome to English for kids.', 0.95);
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

    // Optional Cloud AI TTS save
    const saveCloudBtn = $('btn-save-cloud-tts');
    if (saveCloudBtn) {
      saveCloudBtn.addEventListener('click', () => {
        prefs.cloudProvider = ($('voice-cloud-provider').value || 'none');
        prefs.cloudApiKey = ($('voice-cloud-key').value || '').trim();
        cloudFailStreak = 0;
        cloudVoiceStart.google = 0;
        cloudVoiceStart.openai = 0;
        cloudBlobCache.clear();
        saveVoicePrefs();
        updateActiveVoiceStatusUI();
        playSoundEffect('star');
        const msg = $('voice-cloud-status');
        if (msg) {
          msg.textContent = prefs.cloudProvider !== 'none' && prefs.cloudApiKey
            ? '✅ Đã lưu cấu hình AI TTS! Bấm "Thử đọc câu" để nghe ngay.'
            : 'ℹ️ Đã chuyển về chế độ miễn phí (Giọng người thật + Giọng thiết bị).';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', bindVoiceModalEvents);
})();
