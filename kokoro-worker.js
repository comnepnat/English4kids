/**
 * English4Kids — Kokoro AI Offline TTS Web Worker (kokoro-worker.js)
 * Runs Kokoro-82M (ONNX q8, ~86 MB, cached once in browser Cache Storage)
 * off the main thread so tablet & mobile UI stays silky smooth.
 */
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const CDN_URLS = [
  'https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm',
  'https://esm.sh/kokoro-js@1.2.1'
];

let ttsInstance = null;
let loadingPromise = null;
const fileProgress = new Map();

function emitAggregateProgress(info) {
  if (info && info.file) {
    if (typeof info.loaded === 'number' && typeof info.total === 'number' && info.total > 0) {
      fileProgress.set(info.file, { loaded: info.loaded, total: info.total });
    } else if (typeof info.progress === 'number') {
      fileProgress.set(info.file, { loaded: info.progress, total: 100 });
    }
  }
  let loaded = 0;
  let total = 0;
  for (const v of fileProgress.values()) {
    loaded += v.loaded;
    total += v.total;
  }
  const pct = total > 0 ? Math.min(99, Math.round((loaded / total) * 100)) : 0;
  self.postMessage({
    type: 'progress',
    progress: pct,
    file: info?.file || '',
    status: info?.status || 'progress'
  });
}

async function importKokoroModule() {
  let lastErr = null;
  for (const url of CDN_URLS) {
    try {
      const mod = await import(url);
      if (mod && mod.KokoroTTS) return mod;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error('Không thể tải thư viện Kokoro TTS.');
}

function encodeWavBlob(samples, sampleRate) {
  const numSamples = samples.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i += 1) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

async function ensureLoaded() {
  if (ttsInstance) return ttsInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    self.postMessage({ type: 'status', status: 'loading', progress: 2 });
    const { KokoroTTS } = await importKokoroModule();
    ttsInstance = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: emitAggregateProgress
    });
    self.postMessage({ type: 'ready', progress: 100 });
    return ttsInstance;
  })().catch(err => {
    loadingPromise = null;
    ttsInstance = null;
    throw err;
  });

  return loadingPromise;
}

self.addEventListener('message', async (ev) => {
  const msg = ev.data || {};
  if (msg.type === 'load') {
    try {
      await ensureLoaded();
    } catch (err) {
      self.postMessage({
        type: 'error',
        id: msg.id || null,
        error: String(err?.message || err || 'Lỗi tải mô hình Kokoro AI.')
      });
    }
    return;
  }

  if (msg.type === 'generate') {
    const { id, text, voice = 'af_heart', speed = 1.0 } = msg;
    try {
      const tts = await ensureLoaded();
      const raw = await tts.generate(text, { voice, speed });
      let blob = null;
      if (raw && typeof raw.toBlob === 'function') {
        blob = raw.toBlob();
      } else if (raw && raw.audio && raw.sampling_rate) {
        blob = encodeWavBlob(raw.audio, raw.sampling_rate);
      }
      if (!blob) throw new Error('Kokoro không trả về dữ liệu âm thanh.');
      self.postMessage({ type: 'audio', id, blob });
    } catch (err) {
      self.postMessage({
        type: 'error',
        id,
        error: String(err?.message || err || 'Lỗi tạo giọng Kokoro AI.')
      });
    }
  }
});
