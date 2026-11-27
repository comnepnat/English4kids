/**
 * English4Kids — Interactive Touch Letter Tracing Engine (tracing.js)
 * -------------------------------------------------------------------
 * - All 52 letters: Uppercase A–Z (26) + Lowercase a–z (26)
 * - Guided directional arrows, pulsing numbered start dots & primary ruled paper
 * - High-DPI Touch & Mouse PointerEvents (touch-action: none, forgiving hit radius)
 * - Animated ghost-pencil Demo Mode ("👀 Xem mẫu nét")
 * - Phoneme & Letter Name pronunciation + example word audio
 * - Crayon color picker + Rainbow mode, sparkle particles, +2 ⭐ reward & per-profile persistence
 */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);

  const CRAYON_COLORS = [
    { id: 'orange', label: 'Cam', hex: '#FF7A00' },
    { id: 'pink', label: 'Hồng', hex: '#EC4899' },
    { id: 'blue', label: 'Xanh dương', hex: '#0EA5E9' },
    { id: 'green', label: 'Xanh lá', hex: '#22C55E' },
    { id: 'purple', label: 'Tím', hex: '#8B5CF6' },
    { id: 'rainbow', label: 'Cầu vồng', hex: 'rainbow' }
  ];

  /* ==========================================================================
     1. GEOMETRIC PATH SAMPLING (Smooth curves & exact tangent arrows for A-Z / a-z)
     Coordinate space: 0..100 x 0..100
     Ruled paper: Top sky y=18, Middle dashed fence y=46, Ground baseline y=76, Descender y=92
     ========================================================================== */
  function sampleLine(x1, y1, x2, y2, steps = 22) {
    const pts = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t]);
    }
    return pts;
  }

  function sampleQuad(x0, y0, cx, cy, x1, y1, steps = 28) {
    const pts = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const mt = 1 - t;
      const x = mt * mt * x0 + 2 * mt * t * cx + t * t * x1;
      const y = mt * mt * y0 + 2 * mt * t * cy + t * t * y1;
      pts.push([x, y]);
    }
    return pts;
  }

  function sampleCubic(x0, y0, c1x, c1y, c2x, c2y, x1, y1, steps = 36) {
    const pts = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const mt = 1 - t;
      const x = mt * mt * mt * x0 + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x1;
      const y = mt * mt * mt * y0 + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y1;
      pts.push([x, y]);
    }
    return pts;
  }

  function sampleArc(cx, cy, rx, ry, startDeg, endDeg, steps = 40) {
    const pts = [];
    const s = (startDeg * Math.PI) / 180;
    const e = (endDeg * Math.PI) / 180;
    for (let i = 0; i <= steps; i += 1) {
      const a = s + ((e - s) * i) / steps;
      pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    return pts;
  }

  function joinSegments(...segs) {
    const out = [];
    segs.forEach(seg => {
      seg.forEach((pt, idx) => {
        if (out.length && idx === 0) {
          const prev = out[out.length - 1];
          if (Math.hypot(prev[0] - pt[0], prev[1] - pt[1]) < 0.25) return;
        }
        out.push(pt);
      });
    });
    return out;
  }

  // Resample any polyline to uniform arc-length intervals so tracing speed & arrows are uniform
  function resampleUniform(pts, spacing = 1.6) {
    if (!pts || pts.length <= 1) return pts || [];
    const out = [pts[0]];
    let accum = 0;
    for (let i = 1; i < pts.length; i += 1) {
      let [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      let segLen = Math.hypot(x1 - x0, y1 - y0);
      if (segLen < 0.001) continue;
      while (accum + segLen >= spacing) {
        const ratio = (spacing - accum) / segLen;
        const nx = x0 + (x1 - x0) * ratio;
        const ny = y0 + (y1 - y0) * ratio;
        out.push([nx, ny]);
        x0 = nx;
        y0 = ny;
        segLen = Math.hypot(x1 - x0, y1 - y0);
        accum = 0;
      }
      accum += segLen;
    }
    const last = pts[pts.length - 1];
    const tail = out[out.length - 1];
    if (Math.hypot(last[0] - tail[0], last[1] - tail[1]) > 0.3) {
      out.push(last);
    }
    return out;
  }

  function makeStroke(pts, isDot = false) {
    if (isDot) {
      return { isDot: true, points: [pts[0]], totalLen: 0 };
    }
    const uniform = resampleUniform(pts, 1.5);
    let totalLen = 0;
    for (let i = 1; i < uniform.length; i += 1) {
      totalLen += Math.hypot(uniform[i][0] - uniform[i - 1][0], uniform[i][1] - uniform[i - 1][1]);
    }
    return { isDot: false, points: uniform, totalLen };
  }

  // Build all 52 uppercase + lowercase letter stroke definitions
  function buildAllLetterPaths() {
    const L = sampleLine;
    const Q = sampleQuad;
    const C = sampleCubic;
    const A = sampleArc;
    const J = joinSegments;
    const S = makeStroke;

    return {
      /* ---------------- UPPERCASE A–Z (y: 18..76) ---------------- */
      A: [
        S(L(50, 18, 24, 76)),
        S(L(50, 18, 76, 76)),
        S(L(33, 56, 67, 56))
      ],
      B: [
        S(L(29, 18, 29, 76)),
        S(J(L(29, 18, 52, 18), C(52, 18, 70, 18, 70, 46, 52, 46), L(52, 46, 29, 46))),
        S(J(L(29, 46, 54, 46), C(54, 46, 74, 46, 74, 76, 54, 76), L(54, 76, 29, 76)))
      ],
      C: [
        S(A(52, 47, 25, 29, -42, -318, 48))
      ],
      D: [
        S(L(28, 18, 28, 76)),
        S(J(L(28, 18, 46, 18), C(46, 18, 76, 18, 76, 76, 46, 76), L(46, 76, 28, 76)))
      ],
      E: [
        S(L(30, 18, 30, 76)),
        S(L(30, 18, 71, 18)),
        S(L(30, 47, 64, 47)),
        S(L(30, 76, 71, 76))
      ],
      F: [
        S(L(31, 18, 31, 76)),
        S(L(31, 18, 71, 18)),
        S(L(31, 47, 63, 47))
      ],
      G: [
        S(J(A(51, 47, 25, 29, -40, -356, 52))),
        S(L(53, 48, 76, 48))
      ],
      H: [
        S(L(28, 18, 28, 76)),
        S(L(72, 18, 72, 76)),
        S(L(28, 47, 72, 47))
      ],
      I: [
        S(L(50, 18, 50, 76)),
        S(L(34, 18, 66, 18)),
        S(L(34, 76, 66, 76))
      ],
      J: [
        S(J(L(60, 18, 60, 58), C(60, 58, 60, 76, 36, 79, 28, 64))),
        S(L(40, 18, 74, 18))
      ],
      K: [
        S(L(29, 18, 29, 76)),
        S(L(70, 18, 29, 49)),
        S(L(43, 39, 72, 76))
      ],
      L: [
        S(L(30, 18, 30, 76)),
        S(L(30, 76, 71, 76))
      ],
      M: [
        S(L(22, 18, 22, 76)),
        S(J(L(22, 18, 50, 58), L(50, 58, 78, 18))),
        S(L(78, 18, 78, 76))
      ],
      N: [
        S(L(28, 18, 28, 76)),
        S(L(28, 18, 72, 76)),
        S(L(72, 18, 72, 76))
      ],
      O: [
        S(A(50, 47, 26, 29, -90, -450, 56))
      ],
      P: [
        S(L(31, 18, 31, 76)),
        S(J(L(31, 18, 54, 18), C(54, 18, 73, 18, 73, 49, 54, 49), L(54, 49, 31, 49)))
      ],
      Q: [
        S(A(50, 47, 25, 29, -90, -450, 56)),
        S(L(56, 60, 76, 79))
      ],
      R: [
        S(L(30, 18, 30, 76)),
        S(J(L(30, 18, 53, 18), C(53, 18, 72, 18, 72, 47, 53, 47), L(53, 47, 30, 47))),
        S(L(48, 47, 72, 76))
      ],
      S: [
        S(J(
          C(69, 28, 63, 16, 31, 16, 31, 32),
          C(31, 32, 31, 46, 71, 44, 71, 61),
          C(71, 61, 71, 77, 37, 78, 29, 66)
        ))
      ],
      T: [
        S(L(50, 18, 50, 76)),
        S(L(24, 18, 76, 18))
      ],
      U: [
        S(J(L(28, 18, 28, 55), A(50, 55, 22, 21, 180, 0, 32), L(72, 55, 72, 18)))
      ],
      V: [
        S(L(24, 18, 50, 76)),
        S(L(50, 76, 76, 18))
      ],
      W: [
        S(J(L(17, 18, 33, 76), L(33, 76, 50, 36))),
        S(J(L(50, 36, 67, 76), L(67, 76, 83, 18)))
      ],
      X: [
        S(L(26, 18, 74, 76)),
        S(L(74, 18, 26, 76))
      ],
      Y: [
        S(L(25, 18, 50, 48)),
        S(L(75, 18, 50, 48)),
        S(L(50, 48, 50, 76))
      ],
      Z: [
        S(J(L(26, 18, 74, 18), L(74, 18, 26, 76), L(26, 76, 74, 76)))
      ],

      /* ---------------- LOWERCASE a–z (x-height 46..76, asc 18, desc 92) ---------------- */
      a: [
        S(A(47, 61, 16, 15, -28, -332, 46)),
        S(L(63, 46, 63, 76))
      ],
      b: [
        S(L(34, 18, 34, 76)),
        S(A(50, 61, 16, 15, -155, 155, 44))
      ],
      c: [
        S(A(52, 61, 17, 15, -38, -322, 42))
      ],
      d: [
        S(A(48, 61, 16, 15, -25, -335, 46)),
        S(L(64, 18, 64, 76))
      ],
      e: [
        S(J(L(34, 60, 66, 60), A(50, 61, 16, 15, -4, -320, 48)))
      ],
      f: [
        S(J(C(64, 22, 54, 15, 46, 23, 46, 33), L(46, 33, 46, 76))),
        S(L(33, 46, 62, 46))
      ],
      g: [
        S(A(48, 61, 16, 15, -25, -335, 46)),
        S(J(L(64, 46, 64, 78), C(64, 78, 64, 92, 40, 94, 33, 84)))
      ],
      h: [
        S(L(34, 18, 34, 76)),
        S(J(Q(34, 57, 50, 40, 66, 56), L(66, 56, 66, 76)))
      ],
      i: [
        S(L(50, 46, 50, 76)),
        S([[50, 32]], true)
      ],
      j: [
        S(J(L(55, 46, 55, 79), C(55, 79, 55, 92, 37, 94, 32, 85))),
        S([[55, 32]], true)
      ],
      k: [
        S(L(35, 18, 35, 76)),
        S(L(64, 46, 35, 62)),
        S(L(46, 57, 66, 76))
      ],
      l: [
        S(L(50, 18, 50, 76))
      ],
      m: [
        S(L(22, 46, 22, 76)),
        S(J(Q(22, 56, 36, 40, 50, 56), L(50, 56, 50, 76))),
        S(J(Q(50, 56, 64, 40, 78, 56), L(78, 56, 78, 76)))
      ],
      n: [
        S(L(34, 46, 34, 76)),
        S(J(Q(34, 56, 50, 40, 66, 56), L(66, 56, 66, 76)))
      ],
      o: [
        S(A(50, 61, 17, 15, -90, -450, 48))
      ],
      p: [
        S(L(34, 46, 34, 92)),
        S(A(50, 61, 16, 15, -155, 155, 44))
      ],
      q: [
        S(A(48, 61, 16, 15, -25, -335, 46)),
        S(L(64, 46, 64, 92))
      ],
      r: [
        S(L(39, 46, 39, 76)),
        S(Q(39, 57, 50, 44, 64, 49))
      ],
      s: [
        S(J(
          C(63, 51, 58, 44, 36, 44, 36, 53),
          C(36, 53, 36, 61, 64, 60, 64, 69),
          C(64, 69, 64, 77, 42, 78, 35, 71)
        ))
      ],
      t: [
        S(J(L(48, 25, 48, 69), Q(48, 69, 49, 77, 62, 75))),
        S(L(35, 46, 63, 46))
      ],
      u: [
        S(J(L(34, 46, 34, 64), A(49, 64, 15, 12, 180, 0, 26), L(64, 64, 64, 46))),
        S(L(64, 46, 64, 76))
      ],
      v: [
        S(L(33, 46, 50, 76)),
        S(L(50, 76, 67, 46))
      ],
      w: [
        S(J(L(21, 46, 35, 76), L(35, 76, 50, 52))),
        S(J(L(50, 52, 65, 76), L(65, 76, 79, 46)))
      ],
      x: [
        S(L(33, 46, 67, 76)),
        S(L(67, 46, 33, 76))
      ],
      y: [
        S(L(33, 46, 50, 75)),
        S(L(67, 46, 38, 92))
      ],
      z: [
        S(J(L(33, 46, 67, 46), L(67, 46, 33, 76), L(33, 76, 67, 76)))
      ]
    };
  }

  const LETTER_PATHS = buildAllLetterPaths();

  /* ==========================================================================
     2. TRACING STATE & AUDIO HELPERS
     ========================================================================== */
  const tState = {
    letterIndex: 0,       // 0..25
    isLowercase: false,   // false = A-Z, true = a-z
    colorId: 'orange',
    currentStroke: 0,
    strokeProgress: 0,    // index into current stroke points (0 .. pts.length - 1)
    completedStrokes: [], // indices of finished strokes
    letterDone: false,
    isPointerDown: false,
    activePointerId: null,
    demoPlaying: false,
    demoRafId: null,
    demoStrokeIdx: 0,
    demoPointIdx: 0,
    pulseRafId: null,
    sparkles: [],
    offTrackFlash: 0,
    initialized: false
  };

  function getAlphabetList() {
    return Array.isArray(window.PHONICS_ALPHABET_DATA) ? window.PHONICS_ALPHABET_DATA : [];
  }

  function getCurrentLetterObj() {
    const list = getAlphabetList();
    return list[tState.letterIndex] || list[0] || {
      letter: 'A', nameIpa: '/eɪ/', nameVi: 'Đọc là "ây"', nameSpeak: 'Letter A',
      phonicsIpa: '/æ/', phonicsVi: 'Âm ngắn "e-a"', phonicsSpeak: 'ah, ah, apple',
      tip: 'Mở rộng miệng đọc âm ngắn "e-a", như trong từ Apple!',
      color: '#EF4444', bg: '#FEE2E2',
      examples: [{ en: 'Apple', vi: 'Quả Táo', emoji: '🍎' }]
    };
  }

  function getCurrentGlyphChar() {
    const obj = getCurrentLetterObj();
    return tState.isLowercase ? obj.letter.toLowerCase() : obj.letter.toUpperCase();
  }

  function getCurrentStrokes() {
    const ch = getCurrentGlyphChar();
    return LETTER_PATHS[ch] || LETTER_PATHS.A;
  }

  function getTracedSet() {
    if (typeof state !== 'undefined') {
      if (!(state.tracedLetters instanceof Set)) {
        state.tracedLetters = new Set(Array.isArray(state.tracedLetters) ? state.tracedLetters : []);
      }
      return state.tracedLetters;
    }
    return new Set();
  }

  function playStrokeChime(stepIdx) {
    if (typeof state !== 'undefined' && !state.soundEnabled) return;
    if (typeof getAudioContext !== 'function') return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0];
    const freq = notes[stepIdx % notes.length];
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  function speakCurrentPhoneme(includeWord = true) {
    const obj = getCurrentLetterObj();
    if (typeof window.speakEnglish !== 'function' || !obj) return;
    const text = includeWord
      ? `${ obj.phonicsSpeak }`
      : `${ obj.letter }, ${ obj.phonicsSpeak }`;
    window.speakEnglish(text, 0.84);
  }

  /* ==========================================================================
     3. CANVAS RENDERING (High-DPI Ruled Paper, Dashed Track, Arrows, Ink & Sparkles)
     ========================================================================== */
  function getCanvasMetrics() {
    const canvas = $('tracing-canvas');
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(240, Math.round(Math.min(rect.width || 360, rect.height || 360)));
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    if (canvas.width !== Math.round(size * dpr) || canvas.height !== Math.round(size * dpr)) {
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { canvas, ctx, size };
  }

  function toPx(pt, size) {
    return [(pt[0] / 100) * size, (pt[1] / 100) * size];
  }

  function toLogical(clientX, clientY) {
    const canvas = $('tracing-canvas');
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return [x, y];
  }

  function getStrokeColor(ctx, size, strokeIdx) {
    if (tState.colorId === 'rainbow') {
      const grad = ctx.createLinearGradient(size * 0.15, size * 0.15, size * 0.85, size * 0.85);
      grad.addColorStop(0, '#EF4444');
      grad.addColorStop(0.25, '#F59E0B');
      grad.addColorStop(0.5, '#22C55E');
      grad.addColorStop(0.75, '#0EA5E9');
      grad.addColorStop(1, '#A855F7');
      return grad;
    }
    const found = CRAYON_COLORS.find(c => c.id === tState.colorId);
    return found ? found.hex : '#FF7A00';
  }

  function drawRuledPaper(ctx, size) {
    // Warm cream handwriting paper background
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(0, 0, size, size);

    // Subtle sky band & grass band
    ctx.fillStyle = 'rgba(224, 242, 254, 0.35)';
    ctx.fillRect(0, size * 0.18, size, size * 0.28);
    ctx.fillStyle = 'rgba(220, 252, 231, 0.30)';
    ctx.fillRect(0, size * 0.76, size, size * 0.16);

    const drawLine = (yPct, color, dashed = false, width = 1.6) => {
      const y = (yPct / 100) * size;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      if (dashed) ctx.setLineDash([8, 6]);
      ctx.moveTo(size * 0.05, y);
      ctx.lineTo(size * 0.95, y);
      ctx.stroke();
      ctx.restore();
    };

    drawLine(18, '#93C5FD', false, 1.8);   // Top sky line
    drawLine(46, '#CBD5E1', true, 1.8);    // Middle fence line (x-height)
    drawLine(76, '#86EFAC', false, 2.2);   // Ground baseline
    drawLine(92, '#E2E8F0', true, 1.2);    // Descender guide
  }

  function drawPolyline(ctx, pts, size, limitIdx = null) {
    if (!pts || !pts.length) return;
    const end = limitIdx == null ? pts.length - 1 : Math.min(limitIdx, pts.length - 1);
    const [sx, sy] = toPx(pts[0], size);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    for (let i = 1; i <= end; i += 1) {
      const [x, y] = toPx(pts[i], size);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawDirectionalArrow(ctx, x, y, angle, size, color = '#FF7A00') {
    const r = Math.max(7, size * 0.025);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(r * 1.15, 0);
    ctx.lineTo(-r * 0.85, -r * 0.78);
    ctx.lineTo(-r * 0.42, 0);
    ctx.lineTo(-r * 0.85, r * 0.78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawNumberBadge(ctx, x, y, num, size, isActive, isDone, pulsePhase) {
    const baseR = Math.max(11, size * 0.036);
    if (isActive && !isDone) {
      const ringR = baseR + 4 + Math.sin(pulsePhase) * 4.5;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, ringR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 122, 0, 0.24)';
      ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, baseR, 0, Math.PI * 2);
    ctx.fillStyle = isDone ? '#22C55E' : isActive ? '#FF7A00' : '#94A3B8';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 ${ Math.round(baseR * 1.15) }px "Baloo 2", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isDone ? '✓' : String(num), x, y + 1);
    ctx.restore();
  }

  function spawnSparkles(lx, ly, count = 4) {
    const colors = ['#FFD24C', '#FF7A00', '#EC4899', '#22C55E', '#38BDF8'];
    for (let i = 0; i < count; i += 1) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 0.25 + Math.random() * 0.65;
      tState.sparkles.push({
        x: lx,
        y: ly,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 0.15,
        life: 1,
        r: 1.4 + Math.random() * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function renderCanvas(nowTs = performance.now()) {
    const m = getCanvasMetrics();
    if (!m) return;
    const { ctx, size } = m;
    const strokes = getCurrentStrokes();
    const trackWidth = Math.max(26, size * 0.095);
    const inkWidth = Math.max(20, size * 0.074);
    const pulsePhase = nowTs / 260;

    drawRuledPaper(ctx, size);

    // 1. Draw soft full-letter track outline for ALL strokes
    strokes.forEach((st, idx) => {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (st.isDot) {
        const [dx, dy] = toPx(st.points[0], size);
        ctx.beginPath();
        ctx.arc(dx, dy, trackWidth * 0.52, 0, Math.PI * 2);
        ctx.fillStyle = idx === tState.currentStroke && !tState.letterDone ? '#FEF3C7' : '#F1F5F9';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = idx === tState.currentStroke && !tState.letterDone ? '#F59E0B' : '#CBD5E1';
        ctx.stroke();
      } else {
        // Outer track tube
        ctx.strokeStyle = idx === tState.currentStroke && !tState.letterDone
          ? (tState.offTrackFlash > 0 ? '#FEE2E2' : '#FEF3C7')
          : '#F1F5F9';
        ctx.lineWidth = trackWidth;
        drawPolyline(ctx, st.points, size);

        // Inner dashed guide line
        ctx.strokeStyle = idx === tState.currentStroke && !tState.letterDone ? '#F59E0B' : '#CBD5E1';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([7, 7]);
        drawPolyline(ctx, st.points, size);
      }
      ctx.restore();
    });

    // 2. Draw directional arrows along the ACTIVE stroke (ahead of current progress)
    if (!tState.letterDone && !tState.demoPlaying) {
      const activeSt = strokes[tState.currentStroke];
      if (activeSt && !activeSt.isDot && activeSt.points.length > 4) {
        const pts = activeSt.points;
        const startIdx = Math.max(3, tState.strokeProgress + 3);
        const arrowStep = Math.max(7, Math.floor(pts.length / 4));
        for (let i = startIdx; i < pts.length - 2; i += arrowStep) {
          const p0 = pts[Math.max(0, i - 1)];
          const p1 = pts[Math.min(pts.length - 1, i + 1)];
          const [ax, ay] = toPx(pts[i], size);
          const ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
          drawDirectionalArrow(ctx, ax, ay, ang, size, '#FF7A00');
        }
        // End star target
        const [ex, ey] = toPx(pts[pts.length - 1], size);
        ctx.save();
        ctx.font = `${ Math.round(size * 0.055) }px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('⭐', ex, ey);
        ctx.restore();
      }
    }

    // 3. Draw user's COMPLETED strokes + partial ACTIVE stroke ink
    const inkFill = getStrokeColor(ctx, size, 0);
    strokes.forEach((st, idx) => {
      const isDone = tState.completedStrokes.includes(idx);
      const isCurrent = idx === tState.currentStroke && !tState.letterDone;
      if (!isDone && !(isCurrent && tState.strokeProgress > 0)) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = inkFill;
      ctx.fillStyle = inkFill;
      ctx.lineWidth = inkWidth;
      if (st.isDot) {
        const [dx, dy] = toPx(st.points[0], size);
        ctx.beginPath();
        ctx.arc(dx, dy, inkWidth * 0.48, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawPolyline(ctx, st.points, size, isDone ? null : tState.strokeProgress);
      }
      ctx.restore();
    });

    // 4. Draw Demo Mode Ghost Pencil & Trail
    if (tState.demoPlaying) {
      strokes.forEach((st, idx) => {
        if (idx > tState.demoStrokeIdx) return;
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.72)';
        ctx.fillStyle = 'rgba(139, 92, 246, 0.72)';
        ctx.lineWidth = inkWidth * 0.85;
        if (st.isDot) {
          const [dx, dy] = toPx(st.points[0], size);
          ctx.beginPath();
          ctx.arc(dx, dy, inkWidth * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const lim = idx < tState.demoStrokeIdx ? null : Math.floor(tState.demoPointIdx);
          drawPolyline(ctx, st.points, size, lim);
        }
        ctx.restore();
      });

      const curDemoSt = strokes[tState.demoStrokeIdx];
      if (curDemoSt) {
        const ptIdx = curDemoSt.isDot ? 0 : Math.min(curDemoSt.points.length - 1, Math.floor(tState.demoPointIdx));
        const [px, py] = toPx(curDemoSt.points[ptIdx], size);
        ctx.save();
        ctx.font = `${ Math.round(size * 0.095) }px sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText('✏️', px - 4, py + 6);
        ctx.restore();
      }
    }

    // 5. Draw numbered stroke start badges (inactive/done first, then active stroke ON TOP so 1 is never covered by 2!)
    if (!tState.demoPlaying) {
      strokes.forEach((st, idx) => {
        const isDone = tState.completedStrokes.includes(idx);
        const isActive = idx === tState.currentStroke && !tState.letterDone;
        if (isActive) return;
        const [bx, by] = toPx(st.points[0], size);
        drawNumberBadge(ctx, bx, by, idx + 1, size, false, isDone, pulsePhase);
      });
      if (!tState.letterDone && strokes[tState.currentStroke]) {
        const st = strokes[tState.currentStroke];
        const [bx, by] = toPx(st.points[0], size);
        drawNumberBadge(ctx, bx, by, tState.currentStroke + 1, size, tState.strokeProgress === 0, false, pulsePhase);
      }

      // If partially along active stroke, show pulsing orange handle at current tip so kid can resume easily
      if (!tState.letterDone && tState.strokeProgress > 0) {
        const activeSt = strokes[tState.currentStroke];
        if (activeSt && !activeSt.isDot) {
          const tip = activeSt.points[Math.min(tState.strokeProgress, activeSt.points.length - 1)];
          const [tx, ty] = toPx(tip, size);
          ctx.save();
          ctx.beginPath();
          ctx.arc(tx, ty, 13 + Math.sin(pulsePhase) * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 122, 0, 0.25)';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(tx, ty, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#FF7A00';
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = '#FFFFFF';
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // 6. Sparkle particles
    if (tState.sparkles.length) {
      for (let i = tState.sparkles.length - 1; i >= 0; i -= 1) {
        const sp = tState.sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= 0.045;
        if (sp.life <= 0) {
          tState.sparkles.splice(i, 1);
          continue;
        }
        const [sx, sy] = toPx([sp.x, sp.y], size);
        ctx.save();
        ctx.globalAlpha = sp.life;
        ctx.fillStyle = sp.color;
        ctx.beginPath();
        ctx.arc(sx, sy, (sp.r / 100) * size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    if (tState.offTrackFlash > 0) {
      tState.offTrackFlash = Math.max(0, tState.offTrackFlash - 1);
    }
  }

  function startPulseLoop() {
    if (tState.pulseRafId) return;
    const tick = (now) => {
      const panel = $('phonics-panel-trace');
      const view = $('view-phonics');
      if (!panel || panel.classList.contains('hidden') || !view || !view.classList.contains('active')) {
        tState.pulseRafId = null;
        return;
      }
      renderCanvas(now);
      tState.pulseRafId = requestAnimationFrame(tick);
    };
    tState.pulseRafId = requestAnimationFrame(tick);
  }

  /* ==========================================================================
     4. INTERACTIVE TOUCH / MOUSE GUIDED TRACING LOGIC
     ========================================================================== */
  function advanceTracingAt(lx, ly) {
    if (tState.letterDone || tState.demoPlaying) return;
    const strokes = getCurrentStrokes();
    const st = strokes[tState.currentStroke];
    if (!st) return;

    const HIT_RADIUS = 16.5; // Generous kid-friendly radius in 0..100 coordinates

    if (st.isDot) {
      const [dx, dy] = st.points[0];
      if (Math.hypot(lx - dx, ly - dy) <= HIT_RADIUS + 4) {
        spawnSparkles(dx, dy, 10);
        completeCurrentStroke();
      }
      return;
    }

    const pts = st.points;
    const curIdx = tState.strokeProgress;
    // Allow advancing smoothly up to 14 points ahead along the stroke so quick finger swipes feel instant
    const searchEnd = Math.min(pts.length - 1, curIdx + 14);
    let bestIdx = -1;
    let bestDist = HIT_RADIUS;

    for (let i = curIdx; i <= searchEnd; i += 1) {
      const d = Math.hypot(lx - pts[i][0], ly - pts[i][1]);
      if (d <= bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }

    if (bestIdx >= curIdx) {
      if (bestIdx > curIdx) {
        tState.strokeProgress = bestIdx;
        if (bestIdx % 3 === 0) {
          spawnSparkles(pts[bestIdx][0], pts[bestIdx][1], 2);
        }
      }
      // If within the last 2 points of the stroke, snap & complete!
      if (tState.strokeProgress >= pts.length - 3) {
        tState.strokeProgress = pts.length - 1;
        const endPt = pts[pts.length - 1];
        spawnSparkles(endPt[0], endPt[1], 10);
        completeCurrentStroke();
      }
    } else {
      // Gentle visual feedback if far from active stroke
      const targetPt = pts[Math.min(pts.length - 1, curIdx + 1)];
      if (Math.hypot(lx - targetPt[0], ly - targetPt[1]) > HIT_RADIUS * 1.4) {
        tState.offTrackFlash = 6;
      }
    }
  }

  function completeCurrentStroke() {
    const strokes = getCurrentStrokes();
    const doneIdx = tState.currentStroke;
    if (!tState.completedStrokes.includes(doneIdx)) {
      tState.completedStrokes.push(doneIdx);
    }
    tState.isPointerDown = false;
    tState.activePointerId = null;

    if (tState.currentStroke < strokes.length - 1) {
      tState.currentStroke += 1;
      tState.strokeProgress = 0;
      playStrokeChime(doneIdx);
      updateStrokeGuideText();
    } else {
      // ALL STROKES COMPLETED!
      tState.letterDone = true;
      onLetterCompleted();
    }
  }

  function onLetterCompleted() {
    const obj = getCurrentLetterObj();
    const glyph = getCurrentGlyphChar();
    const tracedSet = getTracedSet();
    const isFirstTime = !tracedSet.has(glyph);
    tracedSet.add(glyph);

    const reward = isFirstTime ? 2 : 1;
    if (typeof state !== 'undefined') {
      state.stars = (state.stars || 0) + reward;
      if (typeof saveProgress === 'function') saveProgress();
      if (typeof updateHeaderAndMissionUI === 'function') updateHeaderAndMissionUI();
    }

    if (typeof playSoundEffect === 'function') playSoundEffect('star');
    if (typeof launchConfettiBurst === 'function') launchConfettiBurst();

    const banner = $('trace-success-banner');
    if (banner) {
      banner.classList.remove('hidden');
      const msg = $('trace-success-msg');
      if (msg) {
        msg.textContent = `🎉 Tuyệt vời! Bé đã tô xong chữ "${ glyph }" (${ obj.phonicsIpa })! +${ reward } ⭐`;
      }
    }

    updateStrokeGuideText();
    renderTraceLetterStrip();
    updateTracingProgressPill();

    // Speak phoneme + example word right after finishing!
    setTimeout(() => {
      if (typeof window.speakEnglish === 'function') {
        window.speakEnglish(`${ obj.letter }! ${ obj.phonicsSpeak }!`, 0.86);
      }
    }, 220);
  }

  /* ==========================================================================
     5. DEMO ANIMATION ("👀 Xem mẫu nét")
     ========================================================================== */
  function stopDemo() {
    tState.demoPlaying = false;
    if (tState.demoRafId) {
      cancelAnimationFrame(tState.demoRafId);
      tState.demoRafId = null;
    }
    const btn = $('btn-trace-demo');
    if (btn) {
      btn.classList.remove('is-playing');
      btn.textContent = '👀 Xem mẫu nét';
    }
  }

  function startDemo() {
    if (tState.demoPlaying) {
      stopDemo();
      return;
    }
    tState.demoPlaying = true;
    tState.demoStrokeIdx = 0;
    tState.demoPointIdx = 0;
    const btn = $('btn-trace-demo');
    if (btn) {
      btn.classList.add('is-playing');
      btn.textContent = '⏹️ Dừng xem mẫu';
    }
    playStrokeChime(0);

    const strokes = getCurrentStrokes();
    let pauseFrames = 0;

    const step = () => {
      if (!tState.demoPlaying) return;
      if (pauseFrames > 0) {
        pauseFrames -= 1;
        tState.demoRafId = requestAnimationFrame(step);
        return;
      }
      const st = strokes[tState.demoStrokeIdx];
      if (!st) {
        stopDemo();
        return;
      }
      if (st.isDot) {
        pauseFrames = 18;
        tState.demoStrokeIdx += 1;
        tState.demoPointIdx = 0;
        if (tState.demoStrokeIdx < strokes.length) playStrokeChime(tState.demoStrokeIdx);
      } else {
        tState.demoPointIdx += 0.9;
        if (tState.demoPointIdx >= st.points.length - 1) {
          tState.demoPointIdx = st.points.length - 1;
          pauseFrames = 16;
          tState.demoStrokeIdx += 1;
          tState.demoPointIdx = 0;
          if (tState.demoStrokeIdx < strokes.length) playStrokeChime(tState.demoStrokeIdx);
        }
      }
      if (tState.demoStrokeIdx >= strokes.length) {
        setTimeout(() => {
          stopDemo();
        }, 420);
        return;
      }
      tState.demoRafId = requestAnimationFrame(step);
    };
    tState.demoRafId = requestAnimationFrame(step);
  }

  /* ==========================================================================
     6. UI RENDERING & STATE CONTROLS
     ========================================================================== */
  function resetCurrentCanvasState() {
    stopDemo();
    tState.currentStroke = 0;
    tState.strokeProgress = 0;
    tState.completedStrokes = [];
    tState.letterDone = false;
    tState.isPointerDown = false;
    tState.activePointerId = null;
    tState.sparkles = [];
    const banner = $('trace-success-banner');
    if (banner) banner.classList.add('hidden');
    updateStrokeGuideText();
  }

  function updateStrokeGuideText() {
    const strokes = getCurrentStrokes();
    const guideEl = $('trace-stroke-status');
    if (!guideEl) return;
    if (tState.letterDone) {
      guideEl.textContent = `🌟 Hoàn thành cả ${ strokes.length } nét rồi! Bé tô siêu quá!`;
      guideEl.classList.add('is-done');
    } else {
      guideEl.classList.remove('is-done');
      const cur = strokes[tState.currentStroke];
      guideEl.textContent = cur && cur.isDot
        ? `👆 Nét ${ tState.currentStroke + 1 } / ${ strokes.length }: Chạm chấm tròn số ${ tState.currentStroke + 1 } nhé!`
        : `👆 Nét ${ tState.currentStroke + 1 } / ${ strokes.length }: Đặt tay vào số ${ tState.currentStroke + 1 } và kéo theo mũi tên ➤`;
    }
  }

  function updateTracingProgressPill() {
    const pill = $('trace-progress-pill');
    if (!pill) return;
    const count = getTracedSet().size;
    pill.textContent = `✏️ Đã tô: ${ count } / 52 chữ`;
  }

  function renderTraceLetterInfo(autoSpeak = false) {
    const obj = getCurrentLetterObj();
    const glyph = getCurrentGlyphChar();

    const glyphEl = $('trace-current-glyph');
    if (glyphEl) {
      glyphEl.textContent = glyph;
      glyphEl.style.color = obj.color || '#FF7A00';
    }
    const pairEl = $('trace-pair-badge');
    if (pairEl) pairEl.textContent = `${ obj.letter } / ${ obj.letter.toLowerCase() }`;

    const ipaEl = $('trace-phoneme-ipa');
    if (ipaEl) ipaEl.textContent = obj.phonicsIpa || '';
    const viEl = $('trace-phoneme-vi');
    if (viEl) viEl.textContent = obj.phonicsVi || '';
    const nameEl = $('trace-name-ipa');
    if (nameEl) nameEl.textContent = `${ obj.nameIpa || '' } • ${ obj.nameVi || '' }`;
    const tipEl = $('trace-phoneme-tip');
    if (tipEl) tipEl.textContent = `💡 ${ obj.tip || '' }`;

    const ex = (obj.examples && obj.examples[0]) || { en: 'Apple', vi: 'Quả Táo', emoji: '🍎' };
    const exBtn = $('btn-trace-example-word');
    if (exBtn) {
      exBtn.innerHTML = `<span class="tex-emoji">${ ex.emoji }</span><span class="tex-text"><strong>${ ex.en }</strong><small>${ ex.vi }</small></span><span class="tex-spk">🔊</span>`;
    }

    // Sync case toggle pills
    $('btn-trace-upper')?.classList.toggle('active', !tState.isLowercase);
    $('btn-trace-lower')?.classList.toggle('active', tState.isLowercase);

    // Sync canvas card accent
    const card = $('tracing-stage-card');
    if (card) {
      card.style.setProperty('--trace-accent', obj.color || '#FF7A00');
      card.style.setProperty('--trace-soft', obj.bg || '#FFF7E0');
    }

    resetCurrentCanvasState();
    renderTraceLetterStrip();
    updateTracingProgressPill();
    startPulseLoop();

    if (autoSpeak) {
      setTimeout(() => speakCurrentPhoneme(true), 160);
    }
  }

  function renderTraceLetterStrip() {
    const strip = $('trace-letter-strip');
    if (!strip) return;
    const list = getAlphabetList();
    const tracedSet = getTracedSet();
    strip.innerHTML = '';

    list.forEach((item, idx) => {
      const ch = tState.isLowercase ? item.letter.toLowerCase() : item.letter.toUpperCase();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'trace-strip-btn';
      if (idx === tState.letterIndex) btn.classList.add('selected');
      if (tracedSet.has(ch)) btn.classList.add('is-traced');
      btn.style.setProperty('--ts-color', item.color || '#FF7A00');
      btn.innerHTML = `<span>${ ch }</span>${ tracedSet.has(ch) ? '<em class="ts-check" aria-hidden="true">✓</em>' : '' }`;
      btn.setAttribute('aria-label', `Tập tô chữ ${ ch }`);
      btn.addEventListener('click', () => {
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        tState.letterIndex = idx;
        renderTraceLetterInfo(true);
      });
      strip.appendChild(btn);
    });
  }

  function renderColorPicker() {
    const wrap = $('trace-color-picker');
    if (!wrap) return;
    wrap.innerHTML = '';
    CRAYON_COLORS.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `trace-color-dot ${ c.id === 'rainbow' ? 'is-rainbow' : '' } ${ tState.colorId === c.id ? 'active' : '' }`;
      if (c.id !== 'rainbow') btn.style.background = c.hex;
      btn.title = `Màu ${ c.label }`;
      btn.setAttribute('aria-label', `Chọn màu ${ c.label }`);
      btn.addEventListener('click', () => {
        if (typeof playSoundEffect === 'function') playSoundEffect('pop');
        tState.colorId = c.id;
        renderColorPicker();
      });
      wrap.appendChild(btn);
    });
  }

  /* ==========================================================================
     7. POINTER EVENTS & INITIALIZATION
     ========================================================================== */
  function bindCanvasEvents() {
    const canvas = $('tracing-canvas');
    if (!canvas || canvas._traceBound) return;
    canvas._traceBound = true;

    const onDown = (e) => {
      if (tState.demoPlaying) stopDemo();
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      tState.isPointerDown = true;
      tState.activePointerId = e.pointerId;
      const pt = toLogical(e.clientX, e.clientY);
      if (pt) advanceTracingAt(pt[0], pt[1]);
    };

    const onMove = (e) => {
      if (!tState.isPointerDown) return;
      if (tState.activePointerId !== null && e.pointerId !== tState.activePointerId) return;
      e.preventDefault();
      const pt = toLogical(e.clientX, e.clientY);
      if (pt) advanceTracingAt(pt[0], pt[1]);
    };

    const onUp = (e) => {
      if (tState.activePointerId !== null && e.pointerId !== tState.activePointerId) return;
      tState.isPointerDown = false;
      tState.activePointerId = null;
    };

    canvas.addEventListener('pointerdown', onDown, { passive: false });
    canvas.addEventListener('pointermove', onMove, { passive: false });
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
  }

  function bindTracingUIEvents() {
    if (tState.initialized) return;
    tState.initialized = true;

    bindCanvasEvents();
    renderColorPicker();

    $('btn-trace-upper')?.addEventListener('click', () => {
      if (!tState.isLowercase) return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      tState.isLowercase = false;
      renderTraceLetterInfo(true);
    });

    $('btn-trace-lower')?.addEventListener('click', () => {
      if (tState.isLowercase) return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      tState.isLowercase = true;
      renderTraceLetterInfo(true);
    });

    $('btn-trace-demo')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      startDemo();
    });

    $('btn-trace-clear')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      resetCurrentCanvasState();
    });

    $('btn-trace-prev')?.addEventListener('click', () => {
      const list = getAlphabetList();
      if (!list.length) return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      tState.letterIndex = (tState.letterIndex - 1 + list.length) % list.length;
      renderTraceLetterInfo(true);
    });

    const goNextLetter = () => {
      const list = getAlphabetList();
      if (!list.length) return;
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      tState.letterIndex = (tState.letterIndex + 1) % list.length;
      renderTraceLetterInfo(true);
    };

    $('btn-trace-next')?.addEventListener('click', goNextLetter);
    $('btn-trace-success-next')?.addEventListener('click', goNextLetter);

    $('btn-trace-play-phoneme')?.addEventListener('click', () => {
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      speakCurrentPhoneme(true);
    });

    $('btn-trace-play-name')?.addEventListener('click', () => {
      const obj = getCurrentLetterObj();
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (obj && typeof window.speakEnglish === 'function') {
        window.speakEnglish(obj.nameSpeak, 0.86);
      }
    });

    $('btn-trace-example-word')?.addEventListener('click', () => {
      const obj = getCurrentLetterObj();
      const ex = obj && obj.examples && obj.examples[0];
      if (typeof playSoundEffect === 'function') playSoundEffect('pop');
      if (ex && typeof window.speakEnglish === 'function') {
        window.speakEnglish(ex.en, 0.88);
      }
    });

    window.addEventListener('resize', () => {
      const panel = $('phonics-panel-trace');
      if (panel && !panel.classList.contains('hidden')) {
        renderCanvas();
      }
    });
  }

  /* ==========================================================================
     8. PUBLIC API
     ========================================================================== */
  window.initOrRefreshTracingView = function (letterChar = null) {
    bindTracingUIEvents();
    if (typeof letterChar === 'string' && letterChar.length === 1) {
      const isLow = letterChar === letterChar.toLowerCase() && letterChar !== letterChar.toUpperCase();
      const upper = letterChar.toUpperCase();
      const list = getAlphabetList();
      const foundIdx = list.findIndex(x => x.letter === upper);
      if (foundIdx >= 0) {
        tState.letterIndex = foundIdx;
        tState.isLowercase = isLow;
      }
    }
    renderTraceLetterInfo(true);
  };

  window.refreshTracingUI = function () {
    updateTracingProgressPill();
    renderTraceLetterStrip();
  };

  window.stopTracingDemo = stopDemo;

  // Exposed for automated verification / testing
  window._tracingDebug = {
    getAllKeys: () => Object.keys(LETTER_PATHS),
    getState: () => ({ ...tState, glyph: getCurrentGlyphChar() }),
    getStrokes: (ch) => LETTER_PATHS[ch]
  };
})();
