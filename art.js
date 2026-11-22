/**
 * English4Kids - Storybook & Montessori Visual Illustration Engine (art.js)
 * Provides:
 * 1. 4 Expressive Animated Storybook SVG Mascots (Leo, Mimi, Toby, Lulu) with eye blinking,
 *    speech-synced mouth animation (body.is-speaking) & 3 moods (wave, ask, celebrate).
 * 2. 18 Multi-Layer Illustrated SVG Backdrops for all 24 Interactive Video Episodes.
 * 3. 6 Custom Storybook Hub Illustrations for the Home Dashboard.
 * 4. 140+ Hand-Crafted Montessori & Storybook Card SVGs (Sensory Textures, Geometric Solids,
 *    Math Diagrams, Opposites Contrasts, Core Animals/Nature/Vehicles/Feelings).
 * 5. Unified Crisp Vector Artwork (Twemoji 15.1 SVG) for all 2,500 flashcards with instant
 *    zero-flicker offline fallback to native emoji.
 */
(function () {
  let _uid = 0;
  function uid(prefix) {
    _uid += 1;
    return `${ prefix }_${ _uid }`;
  }

  /* ==========================================================================
     1. EXPRESSIVE ANIMATED STORYBOOK SVG MASCOTS (Leo, Mimi, Toby, Lulu)
     ========================================================================== */
  function buildEyesAndMouth(mood, opts = {}) {
    const eyeY = opts.eyeY || 56;
    const lx = opts.lx || 46;
    const rx = opts.rx || 74;
    const mouthY = opts.mouthY || 74;
    const eyeColor = opts.eyeColor || '#1E293B';

    let eyesSvg = '';
    if (mood === 'celebrate') {
      eyesSvg = `
        <g class="mascot-eyes">
          <path d="M${ lx - 7 } ${ eyeY + 2 } Q${ lx } ${ eyeY - 9 } ${ lx + 7 } ${ eyeY + 2 }" fill="none" stroke="${ eyeColor }" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M${ rx - 7 } ${ eyeY + 2 } Q${ rx } ${ eyeY - 9 } ${ rx + 7 } ${ eyeY + 2 }" fill="none" stroke="${ eyeColor }" stroke-width="4.2" stroke-linecap="round"/>
        </g>
      `;
    } else {
      const browSvg = mood === 'ask'
        ? `<path d="M${ lx - 8 } ${ eyeY - 12 } Q${ lx } ${ eyeY - 17 } ${ lx + 6 } ${ eyeY - 12 }" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
           <path d="M${ rx - 6 } ${ eyeY - 14 } Q${ rx + 2 } ${ eyeY - 21 } ${ rx + 9 } ${ eyeY - 14 }" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>`
        : '';
      eyesSvg = `
        ${ browSvg }
        <g class="mascot-eyes">
          <circle cx="${ lx }" cy="${ eyeY }" r="6.5" fill="${ eyeColor }"/>
          <circle cx="${ lx - 2 }" cy="${ eyeY - 2.2 }" r="2.4" fill="#FFFFFF"/>
          <circle cx="${ lx + 2.2 }" cy="${ eyeY + 2 }" r="1.1" fill="#FFFFFF"/>
          <circle cx="${ rx }" cy="${ eyeY }" r="6.5" fill="${ eyeColor }"/>
          <circle cx="${ rx - 2 }" cy="${ eyeY - 2.2 }" r="2.4" fill="#FFFFFF"/>
          <circle cx="${ rx + 2.2 }" cy="${ eyeY + 2 }" r="1.1" fill="#FFFFFF"/>
        </g>
      `;
    }

    const idleMouth = mood === 'celebrate'
      ? `<path class="mascot-mouth-idle" d="M51 ${ mouthY - 2 } Q60 ${ mouthY + 11 } 69 ${ mouthY - 2 } Z" fill="#E11D48" stroke="#78350F" stroke-width="2.4" stroke-linejoin="round"/>`
      : mood === 'ask'
        ? `<ellipse class="mascot-mouth-idle" cx="60" cy="${ mouthY + 1 }" rx="5" ry="4.5" fill="#E11D48" stroke="#78350F" stroke-width="2.2"/>`
        : `<path class="mascot-mouth-idle" d="M51 ${ mouthY } Q60 ${ mouthY + 8 } 69 ${ mouthY }" fill="none" stroke="#78350F" stroke-width="3.2" stroke-linecap="round"/>`;

    const talkMouth = `
      <g class="mascot-mouth-talk">
        <ellipse cx="60" cy="${ mouthY + 2 }" rx="7.5" ry="6.2" fill="#E11D48" stroke="#78350F" stroke-width="2.4"/>
        <ellipse cx="60" cy="${ mouthY + 5.5 }" rx="4.2" ry="2.2" fill="#FDA4AF"/>
      </g>
    `;

    const moodDecor = mood === 'celebrate'
      ? `<g class="mascot-sparkles">
           <path d="M16 24 L19 16 L22 24 L30 27 L22 30 L19 38 L16 30 L8 27 Z" fill="#FACC15"/>
           <path d="M100 18 L102 12 L104 18 L110 20 L104 22 L102 28 L100 22 L94 20 Z" fill="#38BDF8"/>
         </g>`
      : mood === 'ask'
        ? `<g class="mascot-qmark">
             <circle cx="101" cy="22" r="12" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
             <text x="101" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#B45309">?</text>
           </g>`
        : '';

    return `${ eyesSvg }${ idleMouth }${ talkMouth }${ moodDecor }`;
  }

  window.renderMascotSvg = function (hostId = 'leo', mood = 'wave', compact = false) {
    const id = String(hostId || 'leo').toLowerCase();
    const cls = `mascot-svg mascot-${ id } mood-${ mood } ${ compact ? 'is-compact' : '' }`;

    if (id === 'mimi') {
      return `
        <svg class="${ cls }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="60" cy="111" rx="34" ry="7" fill="rgba(15,23,42,0.12)"/>
          <!-- Round Panda Ears -->
          <circle cx="29" cy="30" r="15" fill="#1E293B"/>
          <circle cx="29" cy="30" r="7" fill="#475569"/>
          <circle cx="91" cy="30" r="15" fill="#1E293B"/>
          <circle cx="91" cy="30" r="7" fill="#475569"/>
          <!-- Body & Lab Scarf -->
          <path d="M34 94 Q60 80 86 94 L92 110 Q60 116 28 110 Z" fill="#1E293B"/>
          <ellipse cx="60" cy="103" rx="16" ry="10" fill="#FFFFFF"/>
          <path d="M40 90 Q60 99 80 90 L76 99 Q60 105 44 99 Z" fill="#14B8A6"/>
          <!-- Head -->
          <ellipse cx="60" cy="60" rx="41" ry="37" fill="#FFFFFF" stroke="#1E293B" stroke-width="3.2"/>
          <ellipse cx="48" cy="34" rx="16" ry="7" fill="rgba(226,232,240,0.45)"/>
          <!-- Panda Eye Patches -->
          <ellipse cx="44" cy="57" rx="13" ry="15" transform="rotate(-14 44 57)" fill="#1E293B"/>
          <ellipse cx="76" cy="57" rx="13" ry="15" transform="rotate(14 76 57)" fill="#1E293B"/>
          <!-- Rosy Cheeks -->
          <ellipse cx="30" cy="70" rx="7" ry="4.5" fill="#FDA4AF" opacity="0.75"/>
          <ellipse cx="90" cy="70" rx="7" ry="4.5" fill="#FDA4AF" opacity="0.75"/>
          <!-- Cute Nose -->
          <ellipse cx="60" cy="66" rx="6" ry="4.2" fill="#1E293B"/>
          <!-- Bamboo leaf hair accent -->
          <path d="M74 23 Q86 12 92 22 Q82 28 74 23 Z" fill="#22C55E"/>
          <!-- Waving Paw -->
          <circle class="mascot-paw" cx="100" cy="86" r="10" fill="#1E293B"/>
          <circle class="mascot-paw" cx="100" cy="86" r="4.5" fill="#FDA4AF"/>
          ${ buildEyesAndMouth(mood, { eyeY: 57, lx: 45, rx: 75, mouthY: 76, eyeColor: '#FFFFFF' })
             .replace(/fill="#FFFFFF"\/>/g, 'fill="#38BDF8"/>')
             .replace(/fill="#FFFFFF"/g, 'fill="#FFFFFF"') }
        </svg>
      `;
    }

    if (id === 'toby') {
      return `
        <svg class="${ cls }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="60" cy="111" rx="34" ry="7" fill="rgba(15,23,42,0.12)"/>
          <!-- Pointy Fox Ears -->
          <polygon points="22,52 24,14 52,36" fill="#EA580C" stroke="#9A3412" stroke-width="2.6" stroke-linejoin="round"/>
          <polygon points="28,45 29,24 45,37" fill="#FEF3C7"/>
          <polygon points="98,52 96,14 68,36" fill="#EA580C" stroke="#9A3412" stroke-width="2.6" stroke-linejoin="round"/>
          <polygon points="92,45 91,24 75,37" fill="#FEF3C7"/>
          <!-- Body & Blue Explorer Bandana -->
          <path d="M35 94 Q60 80 85 94 L90 110 Q60 116 30 110 Z" fill="#EA580C"/>
          <polygon points="44,91 76,91 60,108" fill="#3B82F6"/>
          <!-- Fox Head -->
          <path d="M18 62 Q18 28 60 28 Q102 28 102 62 Q100 94 60 96 Q20 94 18 62 Z" fill="#F97316" stroke="#9A3412" stroke-width="2.8"/>
          <!-- Cream Cheek Fur -->
          <path d="M19 64 Q36 58 46 72 Q60 82 74 72 Q84 58 101 64 Q98 93 60 96 Q22 93 19 64 Z" fill="#FFFBEB"/>
          <!-- Rosy Cheeks -->
          <ellipse cx="32" cy="72" rx="6.5" ry="4" fill="#FB7185" opacity="0.55"/>
          <ellipse cx="88" cy="72" rx="6.5" ry="4" fill="#FB7185" opacity="0.55"/>
          <!-- Cute Triangle Nose -->
          <path d="M54 64 L66 64 L60 71 Z" fill="#1E293B"/>
          <!-- Waving Paw -->
          <circle class="mascot-paw" cx="100" cy="87" r="9.5" fill="#F97316" stroke="#9A3412" stroke-width="2.2"/>
          ${ buildEyesAndMouth(mood, { eyeY: 56, lx: 44, rx: 76, mouthY: 77 }) }
        </svg>
      `;
    }

    if (id === 'lulu') {
      return `
        <svg class="${ cls }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="60" cy="112" rx="33" ry="6.5" fill="rgba(15,23,42,0.12)"/>
          <!-- Tall Bunny Ears (one slightly tilted playfully) -->
          <ellipse cx="42" cy="28" rx="11" ry="26" transform="rotate(-10 42 28)" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.8"/>
          <ellipse cx="42" cy="29" rx="5.5" ry="18" transform="rotate(-10 42 29)" fill="#FBCFE8"/>
          <ellipse cx="78" cy="28" rx="11" ry="26" transform="rotate(14 78 28)" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.8"/>
          <ellipse cx="78" cy="29" rx="5.5" ry="18" transform="rotate(14 78 29)" fill="#FBCFE8"/>
          <!-- Cute Pink Hairbow -->
          <polygon points="56,36 45,30 47,42" fill="#EC4899"/>
          <polygon points="62,36 73,30 71,42" fill="#EC4899"/>
          <circle cx="59" cy="36" r="4" fill="#F472B6"/>
          <!-- Body -->
          <path d="M36 96 Q60 84 84 96 L88 111 Q60 116 32 111 Z" fill="#F472B6"/>
          <!-- Head -->
          <ellipse cx="60" cy="67" rx="38" ry="32" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.8"/>
          <!-- Rosy Cheeks -->
          <ellipse cx="32" cy="75" rx="7.5" ry="4.5" fill="#F9A8D4" opacity="0.8"/>
          <ellipse cx="88" cy="75" rx="7.5" ry="4.5" fill="#F9A8D4" opacity="0.8"/>
          <!-- Pink Bunny Nose -->
          <ellipse cx="60" cy="71" rx="5" ry="3.5" fill="#EC4899"/>
          <!-- Waving Paw -->
          <circle class="mascot-paw" cx="98" cy="90" r="9" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.4"/>
          ${ buildEyesAndMouth(mood, { eyeY: 63, lx: 46, rx: 74, mouthY: 80 }) }
        </svg>
      `;
    }

    // Default: Leo the Explorer Lion 🦁
    return `
      <svg class="${ cls }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="60" cy="112" rx="35" ry="6.5" fill="rgba(15,23,42,0.12)"/>
        <!-- Fluffy Scalloped Lion Mane -->
        <g fill="#EA580C" stroke="#C2410C" stroke-width="2">
          <circle cx="60" cy="21" r="14"/>
          <circle cx="82" cy="26" r="14"/>
          <circle cx="96" cy="44" r="14"/>
          <circle cx="98" cy="66" r="14"/>
          <circle cx="86" cy="84" r="14"/>
          <circle cx="60" cy="92" r="14"/>
          <circle cx="34" cy="84" r="14"/>
          <circle cx="22" cy="66" r="14"/>
          <circle cx="24" cy="44" r="14"/>
          <circle cx="38" cy="26" r="14"/>
        </g>
        <!-- Round Lion Ears -->
        <circle cx="32" cy="34" r="11" fill="#FBBF24" stroke="#D97706" stroke-width="2.4"/>
        <circle cx="32" cy="34" r="5.5" fill="#FDBA74"/>
        <circle cx="88" cy="34" r="11" fill="#FBBF24" stroke="#D97706" stroke-width="2.4"/>
        <circle cx="88" cy="34" r="5.5" fill="#FDBA74"/>
        <!-- Body & Explorer Scarf -->
        <path d="M36 96 Q60 86 84 96 L88 111 Q60 116 32 111 Z" fill="#FBBF24"/>
        <path d="M44 92 Q60 100 76 92 L72 103 Q60 107 48 103 Z" fill="#0EA5E9"/>
        <!-- Lion Face -->
        <ellipse cx="60" cy="60" rx="34" ry="32" fill="#FDE047" stroke="#D97706" stroke-width="2.5"/>
        <ellipse cx="52" cy="38" rx="14" ry="6" fill="rgba(255,255,255,0.4)"/>
        <!-- Snout -->
        <ellipse cx="60" cy="70" rx="16" ry="12" fill="#FEF9C3"/>
        <path d="M53 63 L67 63 Q67 69 60 71 Q53 69 53 63 Z" fill="#B45309"/>
        <!-- Rosy Cheeks -->
        <ellipse cx="35" cy="68" rx="6.5" ry="4" fill="#FB7185" opacity="0.6"/>
        <ellipse cx="85" cy="68" rx="6.5" ry="4" fill="#FB7185" opacity="0.6"/>
        <!-- Waving Paw -->
        <circle class="mascot-paw" cx="101" cy="89" r="9.5" fill="#FDE047" stroke="#D97706" stroke-width="2.2"/>
        ${ buildEyesAndMouth(mood, { eyeY: 55, lx: 46, rx: 74, mouthY: 75 }) }
      </svg>
    `;
  };

  /* ==========================================================================
     2. HOME DASHBOARD 6 STORYBOOK HUB SVG ICONS
     ========================================================================== */
  window.renderHubIconSvg = function (hubKey) {
    const map = {
      vocab: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="26" height="44" rx="5" fill="#FFEDD5" stroke="#EA580C" stroke-width="3"/>
        <rect x="38" y="14" width="26" height="44" rx="5" fill="#FFFBEB" stroke="#EA580C" stroke-width="3"/>
        <path d="M34 17 Q36 13 38 17 L38 56 Q36 53 34 56 Z" fill="#F97316"/>
        <circle cx="21" cy="30" r="7" fill="#FBBF24"/>
        <rect x="14" y="42" width="14" height="3.5" rx="2" fill="#FB923C"/>
        <rect x="44" y="24" width="14" height="3.5" rx="2" fill="#F97316"/>
        <rect x="44" y="33" width="12" height="3.5" rx="2" fill="#FDBA74"/>
        <rect x="44" y="42" width="14" height="3.5" rx="2" fill="#FDBA74"/>
        <path d="M56 7 L58 12 L63 14 L58 16 L56 21 L54 16 L49 14 L54 12 Z" fill="#FACC15"/>
      </svg>`,
      srs: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="38" r="24" fill="#D1FAE5"/>
        <path d="M36 18 C24 18 18 26 20 36 C16 42 20 53 31 53 L36 53 L36 18 Z" fill="#34D399" stroke="#047857" stroke-width="2.6"/>
        <path d="M36 18 C48 18 54 26 52 36 C56 42 52 53 41 53 L36 53 L36 18 Z" fill="#10B981" stroke="#047857" stroke-width="2.6"/>
        <path d="M26 30 Q30 27 32 32 M25 41 Q29 44 33 40 M46 30 Q42 27 40 32 M47 41 Q43 44 39 40" fill="none" stroke="#ECFDF5" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="56" cy="18" r="8" fill="#FACC15" stroke="#D97706" stroke-width="2"/>
        <path d="M53 18 L55.5 20.5 L60 15.5" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      milestones: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 44 L18 64 L30 58 L36 65 L36 44 Z" fill="#6366F1"/>
        <path d="M48 44 L54 64 L42 58 L36 65 L36 44 Z" fill="#4F46E5"/>
        <circle cx="36" cy="30" r="20" fill="#FACC15" stroke="#D97706" stroke-width="3"/>
        <circle cx="36" cy="30" r="14" fill="#FEF08A"/>
        <polygon points="36,19 39.5,26.5 47.5,27.5 41.5,33 43,41 36,37 29,41 30.5,33 24.5,27.5 32.5,26.5" fill="#F59E0B"/>
      </svg>`,
      stories: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="22" width="56" height="38" rx="10" fill="#F472B6" stroke="#BE185D" stroke-width="3"/>
        <path d="M10 22 L62 22 L58 12 L14 12 Z" fill="#1E293B"/>
        <polygon points="18,22 26,12 34,12 26,22" fill="#FFFFFF"/>
        <polygon points="36,22 44,12 52,12 44,22" fill="#FFFFFF"/>
        <circle cx="36" cy="41" r="13" fill="#FFFFFF"/>
        <polygon points="32,34 45,41 32,48" fill="#EC4899"/>
      </svg>`,
      games: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="22" width="52" height="32" rx="16" fill="#38BDF8" stroke="#1D4ED8" stroke-width="3"/>
        <rect x="20" y="34" width="14" height="5" rx="2.5" fill="#FFFFFF"/>
        <rect x="24.5" y="29.5" width="5" height="14" rx="2.5" fill="#FFFFFF"/>
        <circle cx="48" cy="34" r="3.6" fill="#FDE047"/>
        <circle cx="54" cy="40" r="3.6" fill="#F472B6"/>
        <circle cx="44" cy="42" r="3.6" fill="#4ADE80"/>
        <path d="M36 10 L38 15 L43 17 L38 19 L36 24 L34 19 L29 17 L34 15 Z" fill="#FACC15"/>
      </svg>`,
      phonics: `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="26" width="26" height="28" rx="7" fill="#DBEAFE" stroke="#2563EB" stroke-width="3"/>
        <text x="21" y="46" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="#1D4ED8">A</text>
        <rect x="38" y="26" width="26" height="28" rx="7" fill="#FFE4E6" stroke="#E11D48" stroke-width="3"/>
        <text x="51" y="46" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="900" fill="#BE123C">B</text>
        <rect x="23" y="8" width="26" height="24" rx="7" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
        <text x="36" y="26" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="900" fill="#B45309">C</text>
      </svg>`
    };
    return map[hubKey] || '';
  };

  /* ==========================================================================
     3. 18 MULTI-LAYER ILLUSTRATED STORY BACKDROPS (for 24 Interactive Videos)
     ========================================================================== */
  window.renderStoryBackdropSvg = function (theme = 'zoo') {
    const clouds = `
      <g class="bg-clouds-drift" fill="#FFFFFF" opacity="0.88">
        <g transform="translate(80,44)">
          <circle cx="0" cy="14" r="16"/><circle cx="20" cy="8" r="22"/><circle cx="44" cy="14" r="16"/>
          <rect x="0" y="14" width="44" height="16" rx="8"/>
        </g>
        <g transform="translate(520,34) scale(0.85)">
          <circle cx="0" cy="14" r="16"/><circle cx="20" cy="8" r="22"/><circle cx="44" cy="14" r="16"/>
          <rect x="0" y="14" width="44" height="16" rx="8"/>
        </g>
      </g>`;

    const sun = `
      <g transform="translate(715,58)">
        <circle r="38" fill="#FEF08A" opacity="0.45"/>
        <circle r="26" fill="#FACC15"/>
        <circle cx="-6" cy="-6" r="7" fill="#FEF9C3" opacity="0.7"/>
      </g>`;

    const scenes = {
      zoo: `
        <rect width="800" height="380" fill="#8EDBFF"/>
        <rect y="120" width="800" height="140" fill="#C7EEFF" opacity="0.7"/>
        ${ sun }${ clouds }
        <path d="M0 245 Q180 185 380 235 T800 220 L800 380 L0 380 Z" fill="#86EFAC"/>
        <path d="M0 265 Q240 230 500 265 T800 250 L800 380 L0 380 Z" fill="#4ADE80"/>
        <!-- Wooden Zoo Fence -->
        <g fill="#D97706" stroke="#92400E" stroke-width="2">
          <rect x="0" y="232" width="800" height="8"/><rect x="0" y="252" width="800" height="8"/>
          <rect x="40" y="220" width="12" height="54" rx="3"/><rect x="140" y="220" width="12" height="54" rx="3"/>
          <rect x="240" y="220" width="12" height="54" rx="3"/><rect x="340" y="220" width="12" height="54" rx="3"/>
          <rect x="440" y="220" width="12" height="54" rx="3"/><rect x="540" y="220" width="12" height="54" rx="3"/>
          <rect x="640" y="220" width="12" height="54" rx="3"/><rect x="740" y="220" width="12" height="54" rx="3"/>
        </g>
        <!-- Sunny Winding Path -->
        <path d="M310 380 Q390 315 470 300 Q540 290 610 380 Z" fill="#FDE68A" opacity="0.85"/>
        <!-- Lush Trees -->
        <rect x="74" y="175" width="18" height="80" rx="6" fill="#92400E"/>
        <circle cx="83" cy="155" r="40" fill="#16A34A"/><circle cx="62" cy="168" r="26" fill="#22C55E"/><circle cx="106" cy="168" r="24" fill="#22C55E"/>
        <rect x="692" y="185" width="16" height="72" rx="6" fill="#92400E"/>
        <circle cx="700" cy="168" r="34" fill="#15803D"/><circle cx="718" cy="178" r="22" fill="#22C55E"/>`,

      art: `
        <rect width="800" height="380" fill="#FDF2F8"/>
        <rect y="255" width="800" height="125" fill="#FDE68A"/>
        <rect y="248" width="800" height="12" fill="#F59E0B"/>
        <!-- Rainbow Pennant Bunting -->
        <path d="M0 30 Q400 90 800 30" fill="none" stroke="#94A3B8" stroke-width="3"/>
        <polygon points="70,40 105,46 84,74" fill="#EF4444"/>
        <polygon points="170,52 206,56 184,84" fill="#F59E0B"/>
        <polygon points="275,60 311,62 290,90" fill="#22C55E"/>
        <polygon points="382,63 418,63 400,92" fill="#3B82F6"/>
        <polygon points="488,61 524,59 508,88" fill="#8B5CF6"/>
        <polygon points="594,54 630,50 614,80" fill="#EC4899"/>
        <polygon points="695,43 730,38 716,68" fill="#14B8A6"/>
        <!-- Framed Art Wall & Paint Splashes -->
        <rect x="70" y="102" width="110" height="84" rx="10" fill="#FFFFFF" stroke="#F472B6" stroke-width="6"/>
        <circle cx="110" cy="144" r="20" fill="#FDE047"/><circle cx="138" cy="148" r="18" fill="#38BDF8" opacity="0.8"/>
        <rect x="620" y="106" width="112" height="84" rx="10" fill="#FFFFFF" stroke="#60A5FA" stroke-width="6"/>
        <path d="M640 170 Q676 112 712 170" fill="none" stroke="#F43F5E" stroke-width="9" stroke-linecap="round"/>
        <path d="M652 170 Q676 128 700 170" fill="none" stroke="#FACC15" stroke-width="8" stroke-linecap="round"/>`,

      market: `
        <rect width="800" height="380" fill="#FFF7ED"/>
        <rect y="252" width="800" height="128" fill="#FED7AA"/>
        <!-- Striped Awning -->
        <g>
          <rect x="0" y="0" width="80" height="68" fill="#EF4444"/><rect x="80" y="0" width="80" height="68" fill="#FFFBEB"/>
          <rect x="160" y="0" width="80" height="68" fill="#EF4444"/><rect x="240" y="0" width="80" height="68" fill="#FFFBEB"/>
          <rect x="320" y="0" width="80" height="68" fill="#EF4444"/><rect x="400" y="0" width="80" height="68" fill="#FFFBEB"/>
          <rect x="480" y="0" width="80" height="68" fill="#EF4444"/><rect x="560" y="0" width="80" height="68" fill="#FFFBEB"/>
          <rect x="640" y="0" width="80" height="68" fill="#EF4444"/><rect x="720" y="0" width="80" height="68" fill="#FFFBEB"/>
          <circle cx="40" cy="68" r="22" fill="#EF4444"/><circle cx="120" cy="68" r="22" fill="#FFFBEB"/>
          <circle cx="200" cy="68" r="22" fill="#EF4444"/><circle cx="280" cy="68" r="22" fill="#FFFBEB"/>
          <circle cx="360" cy="68" r="22" fill="#EF4444"/><circle cx="440" cy="68" r="22" fill="#FFFBEB"/>
          <circle cx="520" cy="68" r="22" fill="#EF4444"/><circle cx="600" cy="68" r="22" fill="#FFFBEB"/>
          <circle cx="680" cy="68" r="22" fill="#EF4444"/><circle cx="760" cy="68" r="22" fill="#FFFBEB"/>
        </g>
        <!-- Wooden Market Counter -->
        <rect x="40" y="232" width="720" height="26" rx="8" fill="#B45309"/>
        <rect x="65" y="258" width="670" height="90" rx="8" fill="#D97706" opacity="0.35"/>`,

      farm: `
        <rect width="800" height="380" fill="#7DD3FC"/>
        ${ sun }${ clouds }
        <path d="M0 240 Q200 180 420 225 T800 215 L800 380 L0 380 Z" fill="#BEF264"/>
        <path d="M0 272 Q260 232 520 275 T800 255 L800 380 L0 380 Z" fill="#84CC16"/>
        <!-- Red Barn -->
        <polygon points="85,175 150,122 215,175" fill="#991B1B"/>
        <rect x="96" y="175" width="108" height="84" fill="#DC2626"/>
        <rect x="128" y="205" width="44" height="54" fill="#7F1D1D" stroke="#FFFFFF" stroke-width="4"/>
        <line x1="128" y1="205" x2="172" y2="259" stroke="#FFFFFF" stroke-width="3.5"/>
        <line x1="172" y1="205" x2="128" y2="259" stroke="#FFFFFF" stroke-width="3.5"/>
        <!-- Windmill -->
        <polygon points="655,248 672,135 688,135 705,248" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/>
        <g class="bg-spin-slow" transform="translate(680,142)">
          <rect x="-5" y="-56" width="10" height="112" rx="4" fill="#F59E0B"/>
          <rect x="-56" y="-5" width="112" height="10" rx="4" fill="#F59E0B"/>
          <circle r="9" fill="#B45309"/>
        </g>`,

      city: `
        <rect width="800" height="380" fill="#BAE6FD"/>
        ${ sun }${ clouds }
        <!-- Colorful City Skyline -->
        <rect x="30" y="135" width="84" height="125" rx="6" fill="#60A5FA"/>
        <rect x="125" y="95" width="96" height="165" rx="6" fill="#F472B6"/>
        <rect x="234" y="145" width="80" height="115" rx="6" fill="#FBBF24"/>
        <rect x="500" y="120" width="92" height="140" rx="6" fill="#A78BFA"/>
        <rect x="606" y="148" width="86" height="112" rx="6" fill="#34D399"/>
        <rect x="704" y="110" width="76" height="150" rx="6" fill="#38BDF8"/>
        <!-- Building Windows -->
        <g fill="#FEF9C3" opacity="0.88">
          <rect x="46" y="152" width="18" height="18" rx="3"/><rect x="78" y="152" width="18" height="18" rx="3"/>
          <rect x="46" y="184" width="18" height="18" rx="3"/><rect x="78" y="184" width="18" height="18" rx="3"/>
          <rect x="144" y="115" width="20" height="20" rx="3"/><rect x="180" y="115" width="20" height="20" rx="3"/>
          <rect x="144" y="150" width="20" height="20" rx="3"/><rect x="180" y="150" width="20" height="20" rx="3"/>
          <rect x="520" y="140" width="20" height="20" rx="3"/><rect x="554" y="140" width="20" height="20" rx="3"/>
          <rect x="624" y="166" width="18" height="18" rx="3"/><rect x="656" y="166" width="18" height="18" rx="3"/>
        </g>
        <!-- Road -->
        <rect y="256" width="800" height="124" fill="#64748B"/>
        <rect y="250" width="800" height="12" fill="#CBD5E1"/>
        <g fill="#FDE047">
          <rect x="30" y="312" width="68" height="10" rx="5"/><rect x="150" y="312" width="68" height="10" rx="5"/>
          <rect x="270" y="312" width="68" height="10" rx="5"/><rect x="390" y="312" width="68" height="10" rx="5"/>
          <rect x="510" y="312" width="68" height="10" rx="5"/><rect x="630" y="312" width="68" height="10" rx="5"/>
        </g>`,

      home: `
        <rect width="800" height="380" fill="#FFFBEB"/>
        <!-- Soft Pastel Wallpaper Stripes -->
        <g fill="#FEF3C7" opacity="0.65">
          <rect x="0" width="50" height="260"/><rect x="100" width="50" height="260"/><rect x="200" width="50" height="260"/>
          <rect x="300" width="50" height="260"/><rect x="400" width="50" height="260"/><rect x="500" width="50" height="260"/>
          <rect x="600" width="50" height="260"/><rect x="700" width="50" height="260"/>
        </g>
        <!-- Sunny Arched Window -->
        <path d="M580 180 L580 95 A58 58 0 0 1 696 95 L696 180 Z" fill="#BAE6FD" stroke="#FFFFFF" stroke-width="10"/>
        <line x1="638" y1="38" x2="638" y2="180" stroke="#FFFFFF" stroke-width="7"/>
        <line x1="580" y1="115" x2="696" y2="115" stroke="#FFFFFF" stroke-width="7"/>
        <!-- Wooden Floor & Cozy Rug -->
        <rect y="256" width="800" height="124" fill="#FDE68A"/>
        <rect y="250" width="800" height="10" fill="#F59E0B"/>
        <ellipse cx="420" cy="328" rx="230" ry="38" fill="#FBCFE8" stroke="#F472B6" stroke-width="5"/>`,

      room: `
        <!-- Authentic Montessori Classroom with Natural Wood Shelves & Learning Mat -->
        <rect width="800" height="380" fill="#FAF6EE"/>
        <!-- Large Arched Garden Window -->
        <rect x="545" y="42" width="185" height="150" rx="22" fill="#BAE6FD" stroke="#E2C799" stroke-width="10"/>
        <circle cx="675" cy="84" r="20" fill="#FDE047"/>
        <path d="M550 188 Q610 150 670 175 T725 168 L725 188 Z" fill="#86EFAC"/>
        <!-- Natural Wooden Montessori Shelf (left) -->
        <rect x="42" y="138" width="230" height="114" rx="10" fill="#E6C28B" stroke="#B48342" stroke-width="4"/>
        <rect x="54" y="150" width="206" height="40" rx="5" fill="#F8EBD4"/>
        <rect x="54" y="200" width="206" height="40" rx="5" fill="#F8EBD4"/>
        <!-- Mini Pink Tower on Shelf -->
        <rect x="74" y="176" width="26" height="12" rx="2" fill="#F472B6"/>
        <rect x="78" y="166" width="18" height="10" rx="2" fill="#F472B6"/>
        <rect x="82" y="157" width="10" height="9" rx="2" fill="#EC4899"/>
        <!-- Wooden Color Trays on Shelf -->
        <rect x="130" y="176" width="54" height="10" rx="3" fill="#D97706"/>
        <circle cx="144" cy="171" r="6" fill="#EF4444"/><circle cx="158" cy="171" r="6" fill="#3B82F6"/><circle cx="172" cy="171" r="6" fill="#FACC15"/>
        <!-- Warm Wood Floor & Woven Montessori Work Mat -->
        <rect y="252" width="800" height="128" fill="#F3DFC1"/>
        <rect y="248" width="800" height="8" fill="#C89F65"/>
        <rect x="170" y="280" width="490" height="78" rx="14" fill="#DCFCE7" stroke="#4ADE80" stroke-width="5" stroke-dasharray="10 6"/>`,

      weather: `
        <rect width="800" height="380" fill="#7DD3FC"/>
        ${ sun }
        <!-- Giant Storybook Rainbow -->
        <g fill="none" stroke-linecap="round" opacity="0.88">
          <path d="M110 270 A290 240 0 0 1 690 270" stroke="#EF4444" stroke-width="18"/>
          <path d="M128 270 A272 222 0 0 1 672 270" stroke="#F97316" stroke-width="18"/>
          <path d="M146 270 A254 204 0 0 1 654 270" stroke="#FACC15" stroke-width="18"/>
          <path d="M164 270 A236 186 0 0 1 636 270" stroke="#22C55E" stroke-width="18"/>
          <path d="M182 270 A218 168 0 0 1 618 270" stroke="#3B82F6" stroke-width="18"/>
        </g>
        ${ clouds }
        <path d="M0 265 Q240 225 480 265 T800 250 L800 380 L0 380 Z" fill="#4ADE80"/>`,

      music: `
        <rect width="800" height="380" fill="#3B0764"/>
        <polygon points="180,0 40,260 320,260" fill="#A855F7" opacity="0.25"/>
        <polygon points="620,0 480,260 760,260" fill="#EC4899" opacity="0.25"/>
        <!-- Fairy String Lights -->
        <path d="M0 44 Q400 105 800 44" fill="none" stroke="#FDE047" stroke-width="2.5"/>
        <circle cx="90" cy="59" r="7" fill="#FDE047"/><circle cx="190" cy="70" r="7" fill="#F472B6"/>
        <circle cx="300" cy="76" r="7" fill="#38BDF8"/><circle cx="400" cy="78" r="7" fill="#4ADE80"/>
        <circle cx="500" cy="76" r="7" fill="#FDE047"/><circle cx="610" cy="70" r="7" fill="#FB923C"/>
        <circle cx="710" cy="59" r="7" fill="#F472B6"/>
        <!-- Wooden Forest Concert Stage -->
        <path d="M0 262 Q400 236 800 262 L800 380 L0 380 Z" fill="#92400E"/>
        <path d="M0 272 Q400 248 800 272 L800 286 Q400 262 0 286 Z" fill="#F59E0B" opacity="0.5"/>`,

      space: `
        <rect width="800" height="380" fill="#1E1B4B"/>
        <ellipse cx="180" cy="110" rx="180" ry="85" fill="#4338CA" opacity="0.35"/>
        <ellipse cx="640" cy="230" rx="200" ry="95" fill="#7E22CE" opacity="0.3"/>
        <!-- Twinkling Stars -->
        <g class="bg-stars-twinkle" fill="#FEF08A">
          <circle cx="65" cy="48" r="3"/><circle cx="155" cy="90" r="2.2"/><circle cx="260" cy="42" r="3.5"/>
          <circle cx="375" cy="74" r="2.5"/><circle cx="490" cy="36" r="3"/><circle cx="615" cy="82" r="2.8"/>
          <circle cx="735" cy="50" r="3.5"/><circle cx="110" cy="210" r="2.5"/><circle cx="690" cy="175" r="2.5"/>
          <circle cx="430" cy="145" r="2"/>
        </g>
        <!-- Ringed Saturn -->
        <g transform="translate(650,92)">
          <ellipse rx="56" ry="15" transform="rotate(-18)" fill="none" stroke="#FCD34D" stroke-width="8" opacity="0.75"/>
          <circle r="28" fill="#FB923C"/>
          <path d="M-26 -5 Q0 -12 26 -5" fill="none" stroke="#FDE68A" stroke-width="5" opacity="0.6"/>
        </g>
        <!-- Moon Surface Horizon -->
        <path d="M0 315 Q400 262 800 315 L800 380 L0 380 Z" fill="#312E81"/>
        <ellipse cx="220" cy="336" rx="34" ry="10" fill="#1E1B4B" opacity="0.45"/>
        <ellipse cx="590" cy="340" rx="44" ry="12" fill="#1E1B4B" opacity="0.45"/>`,

      ocean: `
        <rect width="800" height="380" fill="#0EA5E9"/>
        <rect y="140" width="800" height="240" fill="#0284C7" opacity="0.6"/>
        <!-- Shimmering Underwater Sunbeams -->
        <polygon points="120,0 240,0 160,380 40,380" fill="#E0F2FE" opacity="0.16"/>
        <polygon points="410,0 530,0 440,380 310,380" fill="#E0F2FE" opacity="0.14"/>
        <!-- Rising Air Bubbles -->
        <g class="bg-bubbles-rise" fill="none" stroke="#E0F2FE" stroke-width="2.4" opacity="0.75">
          <circle cx="110" cy="250" r="8"/><circle cx="128" cy="195" r="5"/><circle cx="680" cy="235" r="9"/><circle cx="660" cy="170" r="6"/>
          <circle cx="420" cy="145" r="6"/><circle cx="300" cy="215" r="5"/>
        </g>
        <!-- Sandy Seabed & Coral Reef -->
        <path d="M0 310 Q240 275 500 315 T800 295 L800 380 L0 380 Z" fill="#FDE68A"/>
        <path d="M70 322 Q55 270 72 248 Q84 272 78 322 M95 322 Q112 265 98 242 Q85 268 88 322" fill="#22C55E"/>
        <path d="M685 316 Q670 264 692 244 Q706 270 698 316 M718 316 Q736 266 720 246 Q705 270 710 316" fill="#F43F5E"/>`,

      bakery: `
        <rect width="800" height="380" fill="#FFF1F2"/>
        <!-- Pink Scalloped Patisserie Awning -->
        <g>
          <rect x="0" y="0" width="100" height="60" fill="#FB7185"/><rect x="100" y="0" width="100" height="60" fill="#FFFFFF"/>
          <rect x="200" y="0" width="100" height="60" fill="#FB7185"/><rect x="300" y="0" width="100" height="60" fill="#FFFFFF"/>
          <rect x="400" y="0" width="100" height="60" fill="#FB7185"/><rect x="500" y="0" width="100" height="60" fill="#FFFFFF"/>
          <rect x="600" y="0" width="100" height="60" fill="#FB7185"/><rect x="700" y="0" width="100" height="60" fill="#FFFFFF"/>
        </g>
        <rect x="70" y="106" width="660" height="14" rx="7" fill="#FBCFE8"/>
        <rect y="258" width="800" height="122" fill="#FFE4E6"/>
        <rect y="250" width="800" height="12" fill="#F43F5E" opacity="0.65"/>`,

      park: `
        <rect width="800" height="380" fill="#93DDFF"/>
        ${ sun }${ clouds }
        <path d="M0 240 Q220 190 440 235 T800 220 L800 380 L0 380 Z" fill="#86EFAC"/>
        <path d="M0 278 Q280 242 560 278 T800 262 L800 380 L0 380 Z" fill="#22C55E"/>
        <!-- Duck Pond -->
        <ellipse cx="625" cy="322" rx="115" ry="30" fill="#38BDF8" stroke="#BAE6FD" stroke-width="4"/>
        <!-- Leafy Park Trees & Flowers -->
        <rect x="76" y="176" width="16" height="72" rx="5" fill="#92400E"/>
        <circle cx="84" cy="158" r="38" fill="#16A34A"/>
        <circle cx="170" cy="324" r="6" fill="#F472B6"/><circle cx="188" cy="332" r="5" fill="#FACC15"/>
        <circle cx="430" cy="336" r="6" fill="#FB923C"/><circle cx="450" cy="326" r="5" fill="#F472B6"/>`,

      eco: `
        <rect width="800" height="380" fill="#A7F3D0"/>
        <rect width="800" height="220" fill="#BAE6FD"/>
        ${ sun }${ clouds }
        <path d="M0 235 Q200 175 430 225 T800 210 L800 380 L0 380 Z" fill="#34D399"/>
        <path d="M0 274 Q260 235 530 274 T800 258 L800 380 L0 380 Z" fill="#10B981"/>
        <!-- Spinning Clean Wind Turbines -->
        <rect x="135" y="128" width="8" height="115" fill="#FFFFFF"/>
        <g class="bg-spin-slow" transform="translate(139,130)">
          <path d="M0 0 L-4 -46 L4 -46 Z" fill="#FFFFFF"/><path d="M0 0 L40 22 L36 29 Z" fill="#FFFFFF"/><path d="M0 0 L-40 22 L-36 29 Z" fill="#FFFFFF"/>
          <circle r="5" fill="#0EA5E9"/>
        </g>
        <rect x="655" y="138" width="8" height="105" fill="#FFFFFF"/>
        <g class="bg-spin-slow" transform="translate(659,140)">
          <path d="M0 0 L-4 -42 L4 -42 Z" fill="#FFFFFF"/><path d="M0 0 L36 20 L32 27 Z" fill="#FFFFFF"/><path d="M0 0 L-36 20 L-32 27 Z" fill="#FFFFFF"/>
          <circle r="5" fill="#0EA5E9"/>
        </g>`,

      lab: `
        <rect width="800" height="380" fill="#ECFEFF"/>
        <!-- Chalkboard -->
        <rect x="195" y="42" width="410" height="156" rx="16" fill="#0F766E" stroke="#D97706" stroke-width="8"/>
        <text x="400" y="114" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="800" fill="rgba(255,255,255,0.28)">H₂O  •  E = mc²  •  O₂</text>
        <!-- Lab Bench -->
        <rect y="256" width="800" height="124" fill="#CFFAFE"/>
        <rect y="246" width="800" height="16" fill="#06B6D4"/>`,

      future: `
        <rect width="800" height="380" fill="#1E1B4B"/>
        <rect y="258" width="800" height="122" fill="#312E81"/>
        <g fill="#818CF8" opacity="0.45">
          <rect x="60" y="95" width="76" height="165" rx="18"/>
          <rect x="165" y="65" width="88" height="195" rx="22"/>
          <rect x="560" y="80" width="90" height="180" rx="22"/>
          <rect x="676" y="110" width="76" height="150" rx="18"/>
        </g>
        <!-- Glowing Skyway Arch -->
        <path d="M0 245 Q400 175 800 245" fill="none" stroke="#38BDF8" stroke-width="6" opacity="0.8"/>
        <circle cx="110" cy="52" r="2.5" fill="#FDE047"/><circle cx="340" cy="38" r="3" fill="#FDE047"/><circle cx="620" cy="48" r="2.5" fill="#38BDF8"/>`,

      detective: `
        <rect width="800" height="380" fill="#2E1065"/>
        <rect y="258" width="800" height="122" fill="#4C1D95"/>
        <!-- Bookshelf & Warm Spotlight -->
        <rect x="55" y="65" width="175" height="195" rx="10" fill="#581C87" stroke="#A855F7" stroke-width="4"/>
        <line x1="60" y1="125" x2="225" y2="125" stroke="#A855F7" stroke-width="4"/>
        <line x1="60" y1="185" x2="225" y2="185" stroke="#A855F7" stroke-width="4"/>
        <circle cx="680" cy="95" r="72" fill="#FDE047" opacity="0.16"/>
        <circle cx="680" cy="95" r="36" fill="#FDE047" opacity="0.22"/>`,

      summit: `
        <rect width="800" height="380" fill="#134E4A"/>
        <polygon points="220,0 80,260 360,260" fill="#2DD4BF" opacity="0.18"/>
        <polygon points="580,0 440,260 720,260" fill="#FACC15" opacity="0.16"/>
        <circle cx="400" cy="150" r="95" fill="none" stroke="#5EEAD4" stroke-width="3" opacity="0.35"/>
        <ellipse cx="400" cy="150" rx="95" ry="38" fill="none" stroke="#5EEAD4" stroke-width="2.5" opacity="0.35"/>
        <path d="M0 268 Q400 242 800 268 L800 380 L0 380 Z" fill="#0F766E"/>`
    };

    const body = scenes[theme] || scenes.zoo;
    return `<svg class="story-bg-svg" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ body }</svg>`;
  };

  /* ==========================================================================
     4. HAND-CRAFTED STORYBOOK & MONTESSORI CARD SVG LIBRARY (~140+ Concepts)
        Solves emoji ambiguity for Sensory Textures, Shapes/Geometry, Opposites,
        and gives core Pre-A1/A1 favorites adorable cohesive vector art!
     ========================================================================== */
  const CUSTOM_WORD_SVGS = {
    /* --- SHAPES & MONTESSORI GEOMETRIC SOLIDS --- */
    circle: `<circle cx="60" cy="60" r="38" fill="#3B82F6" stroke="#1D4ED8" stroke-width="5"/><circle cx="48" cy="46" r="10" fill="rgba(255,255,255,0.32)"/>`,
    square: `<rect x="22" y="22" width="76" height="76" rx="10" fill="#F97316" stroke="#C2410C" stroke-width="5"/><rect x="30" y="30" width="24" height="10" rx="5" fill="rgba(255,255,255,0.35)"/>`,
    triangle: `<polygon points="60,18 102,94 18,94" fill="#22C55E" stroke="#15803D" stroke-width="5" stroke-linejoin="round"/><polygon points="60,34 74,62 46,62" fill="rgba(255,255,255,0.22)"/>`,
    rectangle: `<rect x="14" y="32" width="92" height="56" rx="8" fill="#8B5CF6" stroke="#6D28D9" stroke-width="5"/><rect x="24" y="40" width="32" height="8" rx="4" fill="rgba(255,255,255,0.35)"/>`,
    oval: `<ellipse cx="60" cy="60" rx="44" ry="30" fill="#EC4899" stroke="#BE185D" stroke-width="5"/><ellipse cx="46" cy="48" rx="12" ry="6" fill="rgba(255,255,255,0.35)"/>`,
    diamond: `<polygon points="60,14 102,60 60,106 18,60" fill="#06B6D4" stroke="#0E7490" stroke-width="5" stroke-linejoin="round"/><polygon points="60,26 84,56 60,56" fill="rgba(255,255,255,0.3)"/>`,
    rhombus: `<polygon points="60,14 98,60 60,106 22,60" fill="#0EA5E9" stroke="#0369A1" stroke-width="5" stroke-linejoin="round"/><line x1="60" y1="22" x2="60" y2="98" stroke="#E0F2FE" stroke-width="2.5" stroke-dasharray="5 5"/>`,
    trapezoid: `<polygon points="34,28 86,28 104,92 16,92" fill="#F59E0B" stroke="#B45309" stroke-width="5" stroke-linejoin="round"/>`,
    parallelogram: `<polygon points="34,28 104,28 86,92 16,92" fill="#10B981" stroke="#047857" stroke-width="5" stroke-linejoin="round"/>`,
    pentagon: `<polygon points="60,16 102,46 86,96 34,96 18,46" fill="#6366F1" stroke="#4338CA" stroke-width="5" stroke-linejoin="round"/>`,
    hexagon: `<polygon points="60,15 98,37 98,83 60,105 22,83 22,37" fill="#14B8A6" stroke="#0F766E" stroke-width="5" stroke-linejoin="round"/>`,
    octagon: `<polygon points="42,16 78,16 104,42 104,78 78,104 42,104 16,78 16,42" fill="#EF4444" stroke="#B91C1C" stroke-width="5" stroke-linejoin="round"/>`,
    heart: `<path d="M60 98 C24 72 14 48 24 30 C34 15 52 20 60 34 C68 20 86 15 96 30 C106 48 96 72 60 98 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="4.5"/><ellipse cx="38" cy="36" rx="7" ry="4" transform="rotate(-30 38 36)" fill="rgba(255,255,255,0.4)"/>`,
    star: `<polygon points="60,14 73,43 105,46 80,67 88,99 60,82 32,99 40,67 15,46 47,43" fill="#FACC15" stroke="#D97706" stroke-width="4.5" stroke-linejoin="round"/>`,
    crescent: `<path d="M74 22 A38 38 0 1 0 92 86 A28 28 0 1 1 74 22 Z" fill="#FACC15" stroke="#D97706" stroke-width="4"/>`,
    cube: `<polygon points="60,16 100,36 60,56 20,36" fill="#60A5FA" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/><polygon points="20,36 60,56 60,104 20,84" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/><polygon points="100,36 60,56 60,104 100,84" fill="#2563EB" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/>`,
    sphere: `<circle cx="60" cy="60" r="39" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><ellipse cx="60" cy="60" rx="39" ry="14" fill="none" stroke="#93C5FD" stroke-width="3" stroke-dasharray="5 5"/><circle cx="44" cy="42" r="11" fill="rgba(255,255,255,0.42)"/>`,
    cone: `<polygon points="60,16 98,90 22,90" fill="#60A5FA" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/><ellipse cx="60" cy="90" rx="38" ry="12" fill="#2563EB" stroke="#1D4ED8" stroke-width="4"/>`,
    cylinder: `<path d="M26 32 L26 88 A34 12 0 0 0 94 88 L94 32 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><ellipse cx="60" cy="32" rx="34" ry="12" fill="#93C5FD" stroke="#1D4ED8" stroke-width="4"/>`,
    pyramid: `<polygon points="60,16 20,88 62,102" fill="#60A5FA" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/><polygon points="60,16 62,102 100,84" fill="#2563EB" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/>`,
    prism: `<polygon points="24,88 52,24 80,88" fill="#60A5FA" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/><polygon points="52,24 92,32 104,82 80,88" fill="#2563EB" stroke="#1D4ED8" stroke-width="4" stroke-linejoin="round"/>`,
    'right angle': `<path d="M28 24 L28 92 L96 92" fill="none" stroke="#1D4ED8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="28" y="68" width="24" height="24" fill="#FEF08A" stroke="#F59E0B" stroke-width="3.5"/><text x="68" y="64" font-size="18" font-weight="900" fill="#D97706">90°</text>`,
    'acute angle': `<path d="M88 30 L28 90 L96 90" fill="none" stroke="#16A34A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 90 A24 24 0 0 0 46 72" fill="none" stroke="#F59E0B" stroke-width="4.5"/>`,
    'obtuse angle': `<path d="M20 34 L54 90 L102 90" fill="none" stroke="#9333EA" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M78 90 A24 24 0 0 0 42 70" fill="none" stroke="#F59E0B" stroke-width="4.5"/>`,
    radius: `<circle cx="60" cy="60" r="38" fill="#EFF6FF" stroke="#3B82F6" stroke-width="5"/><line x1="60" y1="60" x2="98" y2="60" stroke="#EF4444" stroke-width="5.5" stroke-linecap="round"/><circle cx="60" cy="60" r="5.5" fill="#1E293B"/>`,
    diameter: `<circle cx="60" cy="60" r="38" fill="#EFF6FF" stroke="#3B82F6" stroke-width="5"/><line x1="22" y1="60" x2="98" y2="60" stroke="#EF4444" stroke-width="5.5" stroke-linecap="round"/><circle cx="60" cy="60" r="5" fill="#1E293B"/>`,
    semicircle: `<path d="M20 74 A40 40 0 0 1 100 74 Z" fill="#F59E0B" stroke="#B45309" stroke-width="5" stroke-linejoin="round"/>`,
    parallel: `<line x1="22" y1="42" x2="98" y2="42" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/><line x1="22" y1="78" x2="98" y2="78" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>`,
    symmetry: `<path d="M60 24 C36 16 16 38 28 58 C18 74 36 96 60 82 Z" fill="#EC4899"/><path d="M60 24 C84 16 104 38 92 58 C102 74 84 96 60 82 Z" fill="#F472B6"/><line x1="60" y1="14" x2="60" y2="106" stroke="#1E293B" stroke-width="3.5" stroke-dasharray="6 5"/>`,
    fraction: `<circle cx="60" cy="60" r="38" fill="#FEF3C7" stroke="#D97706" stroke-width="4.5"/><path d="M60 60 L60 22 A38 38 0 0 1 98 60 Z" fill="#F97316"/><line x1="60" y1="22" x2="60" y2="98" stroke="#D97706" stroke-width="3.5"/><line x1="22" y1="60" x2="98" y2="60" stroke="#D97706" stroke-width="3.5"/>`,
    half: `<circle cx="60" cy="60" r="38" fill="#E0F2FE" stroke="#0284C7" stroke-width="4.5"/><path d="M60 22 A38 38 0 0 1 60 98 Z" fill="#0EA5E9"/>`,
    quarter: `<circle cx="60" cy="60" r="38" fill="#DCFCE7" stroke="#16A34A" stroke-width="4.5"/><path d="M60 60 L60 22 A38 38 0 0 1 98 60 Z" fill="#22C55E"/>`,
    line: `<line x1="16" y1="60" x2="104" y2="60" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/><circle cx="16" cy="60" r="6" fill="#EF4444"/><circle cx="104" cy="60" r="6" fill="#EF4444"/>`,
    dot: `<circle cx="60" cy="60" r="20" fill="#1E293B"/><circle cx="60" cy="60" r="36" fill="none" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 6"/>`,
    curve: `<path d="M16 84 Q42 18 66 60 T104 34" fill="none" stroke="#EC4899" stroke-width="9" stroke-linecap="round"/>`,
    spiral: `<path d="M60 60 C60 52 70 52 70 60 C70 72 48 72 48 58 C48 40 82 40 82 60 C82 86 34 86 34 56 C34 26 94 26 94 62" fill="none" stroke="#8B5CF6" stroke-width="6.5" stroke-linecap="round"/>`,

    /* --- MONTESSORI SENSORY, TEXTURES & PRACTICAL LIFE --- */
    velvety: `<rect x="18" y="24" width="84" height="72" rx="18" fill="#9333EA" stroke="#6B21A8" stroke-width="4"/><path d="M22 46 Q48 34 72 48 T98 44" fill="none" stroke="#D8B4FE" stroke-width="7" stroke-linecap="round" opacity="0.75"/><path d="M22 72 Q50 58 76 74 T98 68" fill="none" stroke="#C084FC" stroke-width="7" stroke-linecap="round" opacity="0.7"/>`,
    glossy: `<circle cx="60" cy="60" r="38" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/><ellipse cx="44" cy="40" rx="14" ry="8" transform="rotate(-32 44 40)" fill="#FFFFFF" opacity="0.88"/><circle cx="35" cy="54" r="4" fill="#FFFFFF" opacity="0.75"/><path d="M92 22 L95 14 L98 22 L106 25 L98 28 L95 36 L92 28 L84 25 Z" fill="#FACC15"/>`,
    bumpy: `<path d="M12 78 C20 44 36 44 42 66 C48 36 68 36 74 66 C80 42 98 42 108 78 L108 98 L12 98 Z" fill="#F97316" stroke="#C2410C" stroke-width="4.5" stroke-linejoin="round"/><circle cx="28" cy="62" r="4" fill="#FED7AA"/><circle cx="58" cy="54" r="4.5" fill="#FED7AA"/><circle cx="90" cy="62" r="4" fill="#FED7AA"/>`,
    fluffy: `<g fill="#FFFFFF" stroke="#93C5FD" stroke-width="4"><circle cx="36" cy="66" r="20"/><circle cx="58" cy="48" r="24"/><circle cx="82" cy="64" r="20"/><circle cx="60" cy="72" r="20"/></g><circle cx="54" cy="42" r="6" fill="#E0F2FE"/>`,
    sticky: `<path d="M20 28 L100 28 L100 44 C84 44 82 78 72 78 C62 78 62 48 52 48 C42 48 44 92 34 92 C24 92 24 44 20 44 Z" fill="#F59E0B" stroke="#B45309" stroke-width="4" stroke-linejoin="round"/><circle cx="34" cy="82" r="3.5" fill="#FEF3C7"/><circle cx="72" cy="68" r="3" fill="#FEF3C7"/>`,
    slippery: `<rect x="34" y="26" width="48" height="44" rx="10" transform="rotate(-12 58 48)" fill="#BAE6FD" stroke="#0284C7" stroke-width="4"/><path d="M20 92 Q60 80 100 92" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"/><path d="M22 44 L10 48 M24 56 L12 60" stroke="#0EA5E9" stroke-width="4" stroke-linecap="round"/>`,
    prickly: `<rect x="44" y="24" width="32" height="74" rx="16" fill="#22C55E" stroke="#15803D" stroke-width="4"/><path d="M44 46 L26 46 L26 62 L44 62 M76 38 L94 38 L94 56 L76 56" fill="none" stroke="#16A34A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><g stroke="#FACC15" stroke-width="3.2" stroke-linecap="round"><line x1="40" y1="34" x2="32" y2="28"/><line x1="80" y1="30" x2="88" y2="24"/><line x1="40" y1="74" x2="32" y2="74"/><line x1="80" y1="72" x2="88" y2="72"/></g>`,
    sandpaper: `<rect x="18" y="22" width="84" height="76" rx="10" fill="#FDE68A" stroke="#B45309" stroke-width="5"/><rect x="28" y="32" width="64" height="56" rx="4" fill="#D97706" opacity="0.5"/><g fill="#78350F"><circle cx="38" cy="44" r="2.8"/><circle cx="54" cy="40" r="2.5"/><circle cx="72" cy="46" r="2.8"/><circle cx="44" cy="60" r="2.6"/><circle cx="62" cy="58" r="2.8"/><circle cx="80" cy="62" r="2.5"/><circle cx="38" cy="76" r="2.8"/><circle cx="58" cy="74" r="2.5"/><circle cx="76" cy="78" r="2.8"/></g>`,
    transparent: `<rect x="22" y="24" width="52" height="56" rx="10" fill="#F59E0B"/><rect x="44" y="38" width="54" height="58" rx="10" fill="rgba(186,230,253,0.58)" stroke="#0284C7" stroke-width="4"/><line x1="54" y1="50" x2="68" y2="64" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`,
    striped: `<rect x="18" y="22" width="84" height="76" rx="14" fill="#FFFFFF" stroke="#1E293B" stroke-width="4"/><rect x="22" y="32" width="76" height="11" fill="#3B82F6"/><rect x="22" y="54" width="76" height="11" fill="#F97316"/><rect x="22" y="76" width="76" height="11" fill="#22C55E"/>`,
    spotted: `<rect x="18" y="22" width="84" height="76" rx="14" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><circle cx="38" cy="42" r="9" fill="#EF4444"/><circle cx="74" cy="44" r="11" fill="#3B82F6"/><circle cx="54" cy="72" r="10" fill="#22C55E"/><circle cx="84" cy="76" r="7" fill="#EC4899"/>`,
    hollow: `<circle cx="60" cy="60" r="38" fill="none" stroke="#F97316" stroke-width="14"/><circle cx="60" cy="60" r="24" fill="none" stroke="#C2410C" stroke-width="3" stroke-dasharray="5 5"/>`,
    solid: `<circle cx="60" cy="60" r="38" fill="#475569" stroke="#1E293B" stroke-width="5"/><circle cx="48" cy="46" r="10" fill="#94A3B8" opacity="0.5"/>`,
    'work mat': `<rect x="16" y="30" width="88" height="60" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="4.5"/><rect x="24" y="38" width="72" height="44" rx="4" fill="none" stroke="#4ADE80" stroke-width="3" stroke-dasharray="6 4"/>`,
    'roll mat': `<ellipse cx="32" cy="60" rx="14" ry="28" fill="#86EFAC" stroke="#16A34A" stroke-width="4"/><path d="M32 32 L88 32 A14 28 0 0 1 88 88 L32 88" fill="#22C55E" stroke="#16A34A" stroke-width="4"/><ellipse cx="32" cy="60" rx="5" ry="12" fill="#15803D"/>`,
    'pour water': `<path d="M22 30 L56 26 L62 66 L30 70 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4" stroke-linejoin="round"/><path d="M62 42 Q82 44 82 88" fill="none" stroke="#0EA5E9" stroke-width="7" stroke-linecap="round"/><rect x="64" y="74" width="36" height="28" rx="6" fill="#BAE6FD" stroke="#0284C7" stroke-width="3.5"/>`,
    stack: `<rect x="20" y="76" width="80" height="20" rx="6" fill="#EF4444" stroke="#B91C1C" stroke-width="3.5"/><rect x="30" y="54" width="60" height="20" rx="6" fill="#FACC15" stroke="#CA8A04" stroke-width="3.5"/><rect x="42" y="32" width="36" height="20" rx="6" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.5"/>`,

    /* --- OPPOSITES VISUAL CONTRAST DIAGRAMS --- */
    big: `<circle cx="48" cy="60" r="34" fill="#F97316" stroke="#C2410C" stroke-width="4.5"/><circle cx="96" cy="82" r="11" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>`,
    small: `<circle cx="44" cy="60" r="30" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3.5" stroke-dasharray="5 5"/><circle cx="88" cy="78" r="13" fill="#22C55E" stroke="#15803D" stroke-width="4"/>`,
    tall: `<rect x="28" y="18" width="26" height="84" rx="8" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><rect x="68" y="68" width="24" height="34" rx="6" fill="#CBD5E1"/>`,
    short: `<rect x="28" y="20" width="24" height="82" rx="8" fill="#E2E8F0"/><rect x="66" y="68" width="28" height="34" rx="8" fill="#F43F5E" stroke="#BE123C" stroke-width="4"/>`,
    long: `<rect x="14" y="34" width="92" height="18" rx="9" fill="#10B981" stroke="#047857" stroke-width="4"/><rect x="14" y="68" width="34" height="18" rx="9" fill="#CBD5E1"/>`,
    wide: `<rect x="14" y="36" width="92" height="48" rx="10" fill="#0EA5E9" stroke="#0369A1" stroke-width="4"/><path d="M24 60 L96 60 M32 52 L24 60 L32 68 M88 52 L96 60 L88 68" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    narrow: `<rect x="46" y="20" width="28" height="80" rx="8" fill="#A855F7" stroke="#6B21A8" stroke-width="4"/><path d="M18 60 L38 60 M102 60 L82 60" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>`,
    empty: `<path d="M34 26 L42 96 L78 96 L86 26 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="4.5" stroke-linejoin="round"/><line x1="38" y1="42" x2="82" y2="42" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="5 5"/>`,
    full: `<path d="M34 26 L42 96 L78 96 L86 26 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4.5" stroke-linejoin="round"/><ellipse cx="60" cy="30" rx="24" ry="6" fill="#BAE6FD"/>`,
    rough: `<path d="M16 74 L28 46 L40 72 L54 42 L68 72 L82 44 L94 74 L104 54 L104 94 L16 94 Z" fill="#78716C" stroke="#44403C" stroke-width="4" stroke-linejoin="round"/>`,
    smooth: `<path d="M16 76 Q60 36 104 76 L104 94 L16 94 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/><path d="M34 62 Q60 46 86 62" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`,
    bright: `<circle cx="60" cy="60" r="24" fill="#FACC15" stroke="#D97706" stroke-width="4"/><g stroke="#F59E0B" stroke-width="5" stroke-linecap="round"><line x1="60" y1="14" x2="60" y2="26"/><line x1="60" y1="94" x2="60" y2="106"/><line x1="14" y1="60" x2="26" y2="60"/><line x1="94" y1="60" x2="106" y2="60"/><line x1="27" y1="27" x2="36" y2="36"/><line x1="84" y1="84" x2="93" y2="93"/><line x1="93" y1="27" x2="84" y2="36"/><line x1="36" y1="84" x2="27" y2="93"/></g>`,
    dark: `<rect x="16" y="16" width="88" height="88" rx="22" fill="#1E1B4B"/><path d="M68 34 A24 24 0 1 0 82 74 A18 18 0 1 1 68 34 Z" fill="#FDE047"/><circle cx="36" cy="38" r="3" fill="#FFFFFF"/><circle cx="84" cy="40" r="2.5" fill="#FFFFFF"/>`,
    soft: `<ellipse cx="60" cy="64" rx="40" ry="26" fill="#FCE7F3" stroke="#F472B6" stroke-width="4.5"/><path d="M32 62 Q60 72 88 62" fill="none" stroke="#F9A8D4" stroke-width="5" stroke-linecap="round"/>`,
    hard: `<polygon points="22,86 32,34 64,24 94,42 98,86" fill="#64748B" stroke="#334155" stroke-width="4.5" stroke-linejoin="round"/><polygon points="36,42 62,32 76,46 48,54" fill="#94A3B8" opacity="0.6"/>`,

    /* --- HERO STORYBOOK PRE-A1 & A1 FAVORITES (Animals, Fruits, Nature, Vehicles, Feelings) --- */
    lion: `<g fill="#EA580C"><circle cx="60" cy="24" r="14"/><circle cx="83" cy="30" r="14"/><circle cx="96" cy="52" r="14"/><circle cx="92" cy="76" r="14"/><circle cx="72" cy="92" r="14"/><circle cx="48" cy="92" r="14"/><circle cx="28" cy="76" r="14"/><circle cx="24" cy="52" r="14"/><circle cx="37" cy="30" r="14"/></g><circle cx="36" cy="36" r="10" fill="#FBBF24"/><circle cx="84" cy="36" r="10" fill="#FBBF24"/><circle cx="60" cy="60" r="31" fill="#FDE047" stroke="#D97706" stroke-width="3"/><circle cx="48" cy="55" r="5" fill="#1E293B"/><circle cx="46.5" cy="53.5" r="1.8" fill="#FFF"/><circle cx="72" cy="55" r="5" fill="#1E293B"/><circle cx="70.5" cy="53.5" r="1.8" fill="#FFF"/><ellipse cx="60" cy="69" rx="14" ry="10" fill="#FEF9C3"/><polygon points="54,63 66,63 60,70" fill="#B45309"/><path d="M52 74 Q60 80 68 74" fill="none" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>`,
    elephant: `<ellipse cx="26" cy="58" rx="18" ry="26" fill="#94A3B8" stroke="#475569" stroke-width="3.5"/><ellipse cx="94" cy="58" rx="18" ry="26" fill="#94A3B8" stroke="#475569" stroke-width="3.5"/><ellipse cx="26" cy="58" rx="10" ry="16" fill="#FBCFE8"/><ellipse cx="94" cy="58" rx="10" ry="16" fill="#FBCFE8"/><circle cx="60" cy="56" r="30" fill="#CBD5E1" stroke="#475569" stroke-width="3.5"/><path d="M53 66 Q53 96 72 96 Q78 96 78 90 Q78 84 72 84 Q66 84 66 66 Z" fill="#CBD5E1" stroke="#475569" stroke-width="3.5"/><circle cx="48" cy="50" r="4.8" fill="#1E293B"/><circle cx="72" cy="50" r="4.8" fill="#1E293B"/><ellipse cx="40" cy="62" rx="5.5" ry="3.5" fill="#FDA4AF" opacity="0.7"/><ellipse cx="80" cy="62" rx="5.5" ry="3.5" fill="#FDA4AF" opacity="0.7"/>`,
    cat: `<polygon points="26,50 28,18 52,36" fill="#FDBA74" stroke="#C2410C" stroke-width="3.5" stroke-linejoin="round"/><polygon points="94,50 92,18 68,36" fill="#FDBA74" stroke="#C2410C" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="60" cy="64" rx="36" ry="32" fill="#FED7AA" stroke="#C2410C" stroke-width="3.5"/><circle cx="46" cy="58" r="5" fill="#1E293B"/><circle cx="74" cy="58" r="5" fill="#1E293B"/><polygon points="55,66 65,66 60,72" fill="#F43F5E"/><path d="M50 76 Q55 81 60 75 Q65 81 70 76" fill="none" stroke="#9A3412" stroke-width="3" stroke-linecap="round"/><g stroke="#9A3412" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="64" x2="34" y2="66"/><line x1="18" y1="73" x2="34" y2="72"/><line x1="102" y1="64" x2="86" y2="66"/><line x1="102" y1="73" x2="86" y2="72"/></g>`,
    dog: `<ellipse cx="26" cy="58" rx="13" ry="26" transform="rotate(14 26 58)" fill="#92400E"/><ellipse cx="94" cy="58" rx="13" ry="26" transform="rotate(-14 94 58)" fill="#92400E"/><ellipse cx="60" cy="62" rx="34" ry="32" fill="#FDE68A" stroke="#92400E" stroke-width="3.5"/><ellipse cx="60" cy="73" rx="17" ry="12" fill="#FFFBEB"/><circle cx="47" cy="54" r="5.2" fill="#1E293B"/><circle cx="73" cy="54" r="5.2" fill="#1E293B"/><ellipse cx="60" cy="66" rx="7" ry="5" fill="#1E293B"/><path d="M53 76 Q60 84 67 76" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/><ellipse cx="60" cy="83" rx="5" ry="6" fill="#FB7185"/>`,
    rabbit: `<ellipse cx="44" cy="28" rx="10" ry="24" transform="rotate(-8 44 28)" fill="#FFF" stroke="#94A3B8" stroke-width="3.2"/><ellipse cx="44" cy="29" rx="5" ry="16" transform="rotate(-8 44 29)" fill="#FBCFE8"/><ellipse cx="76" cy="28" rx="10" ry="24" transform="rotate(8 76 28)" fill="#FFF" stroke="#94A3B8" stroke-width="3.2"/><ellipse cx="76" cy="29" rx="5" ry="16" transform="rotate(8 76 29)" fill="#FBCFE8"/><ellipse cx="60" cy="68" rx="34" ry="30" fill="#FFF" stroke="#94A3B8" stroke-width="3.2"/><circle cx="47" cy="62" r="5" fill="#1E293B"/><circle cx="73" cy="62" r="5" fill="#1E293B"/><ellipse cx="35" cy="72" rx="6" ry="3.8" fill="#F9A8D4"/><ellipse cx="85" cy="72" rx="6" ry="3.8" fill="#F9A8D4"/><ellipse cx="60" cy="70" rx="5" ry="3.5" fill="#EC4899"/><path d="M52 78 Q60 84 68 78" fill="none" stroke="#64748B" stroke-width="2.8" stroke-linecap="round"/>`,
    panda: `<circle cx="32" cy="30" r="14" fill="#1E293B"/><circle cx="88" cy="30" r="14" fill="#1E293B"/><ellipse cx="60" cy="62" rx="38" ry="34" fill="#FFFFFF" stroke="#1E293B" stroke-width="3.5"/><ellipse cx="44" cy="58" rx="11" ry="13" transform="rotate(-14 44 58)" fill="#1E293B"/><ellipse cx="76" cy="58" rx="11" ry="13" transform="rotate(14 76 58)" fill="#1E293B"/><circle cx="45" cy="56" r="3.5" fill="#FFFFFF"/><circle cx="75" cy="56" r="3.5" fill="#FFFFFF"/><ellipse cx="60" cy="68" rx="6" ry="4" fill="#1E293B"/><path d="M52 77 Q60 83 68 77" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>`,
    fox: `<polygon points="24,52 26,16 52,36" fill="#EA580C" stroke="#9A3412" stroke-width="3"/><polygon points="96,52 94,16 68,36" fill="#EA580C" stroke="#9A3412" stroke-width="3"/><ellipse cx="60" cy="62" rx="38" ry="32" fill="#F97316" stroke="#9A3412" stroke-width="3"/><path d="M23 64 Q42 60 60 76 Q78 60 97 64 Q94 92 60 94 Q26 92 23 64 Z" fill="#FFFBEB"/><circle cx="46" cy="56" r="5" fill="#1E293B"/><circle cx="74" cy="56" r="5" fill="#1E293B"/><polygon points="54,67 66,67 60,74" fill="#1E293B"/>`,
    apple: `<path d="M60 36 C44 26 22 36 22 62 C22 86 42 102 60 94 C78 102 98 86 98 62 C98 36 76 26 60 36 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/><path d="M60 36 Q62 18 72 14" fill="none" stroke="#78350F" stroke-width="5" stroke-linecap="round"/><path d="M64 24 Q84 14 88 28 Q74 34 64 24 Z" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/><ellipse cx="40" cy="54" rx="7" ry="13" transform="rotate(-18 40 54)" fill="rgba(255,255,255,0.35)"/>`,
    banana: `<path d="M24 76 C34 94 74 96 96 54 C102 42 98 28 90 22 C88 46 66 72 28 70 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="4.5" stroke-linejoin="round"/><path d="M88 20 L95 14" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>`,
    sun: `<circle cx="60" cy="60" r="28" fill="#FACC15" stroke="#D97706" stroke-width="4"/><g stroke="#F59E0B" stroke-width="6" stroke-linecap="round"><line x1="60" y1="12" x2="60" y2="24"/><line x1="60" y1="96" x2="60" y2="108"/><line x1="12" y1="60" x2="24" y2="60"/><line x1="96" y1="60" x2="108" y2="60"/><line x1="26" y1="26" x2="35" y2="35"/><line x1="85" y1="85" x2="94" y2="94"/><line x1="94" y1="26" x2="85" y2="35"/><line x1="35" y1="85" x2="26" y2="94"/></g><circle cx="51" cy="56" r="3.8" fill="#78350F"/><circle cx="69" cy="56" r="3.8" fill="#78350F"/><path d="M51 67 Q60 75 69 67" fill="none" stroke="#78350F" stroke-width="3.2" stroke-linecap="round"/>`,
    rainbow: `<g fill="none" stroke-linecap="round"><path d="M16 84 A44 44 0 0 1 104 84" stroke="#EF4444" stroke-width="9"/><path d="M25 84 A35 35 0 0 1 95 84" stroke="#F97316" stroke-width="9"/><path d="M34 84 A26 26 0 0 1 86 84" stroke="#FACC15" stroke-width="9"/><path d="M43 84 A17 17 0 0 1 77 84" stroke="#22C55E" stroke-width="9"/><path d="M52 84 A8 8 0 0 1 68 84" stroke="#3B82F6" stroke-width="8"/></g><circle cx="24" cy="86" r="12" fill="#FFF" stroke="#BAE6FD" stroke-width="3"/><circle cx="96" cy="86" r="12" fill="#FFF" stroke="#BAE6FD" stroke-width="3"/>`,
    cloud: `<g fill="#FFFFFF" stroke="#60A5FA" stroke-width="4"><circle cx="38" cy="68" r="18"/><circle cx="60" cy="52" r="24"/><circle cx="84" cy="68" r="18"/><rect x="38" y="62" width="46" height="24" fill="#FFFFFF" stroke="none"/></g><line x1="36" y1="86" x2="86" y2="86" stroke="#60A5FA" stroke-width="4" stroke-linecap="round"/>`,
    rain: `<g fill="#E0F2FE" stroke="#0284C7" stroke-width="3.5"><circle cx="40" cy="48" r="15"/><circle cx="60" cy="36" r="19"/><circle cx="80" cy="48" r="15"/></g><g fill="#0EA5E9"><path d="M40 72 Q46 84 40 92 Q34 84 40 72 Z"/><path d="M60 76 Q66 88 60 96 Q54 88 60 76 Z"/><path d="M80 72 Q86 84 80 92 Q74 84 80 72 Z"/></g>`,
    tree: `<rect x="50" y="64" width="20" height="40" rx="6" fill="#92400E"/><circle cx="60" cy="44" r="28" fill="#22C55E" stroke="#15803D" stroke-width="3.5"/><circle cx="40" cy="54" r="18" fill="#4ADE80"/><circle cx="80" cy="54" r="18" fill="#16A34A"/>`,
    sprout: `<path d="M22 92 Q60 76 98 92 Z" fill="#92400E"/><path d="M60 84 L60 44" stroke="#16A34A" stroke-width="6" stroke-linecap="round"/><path d="M60 54 C36 52 28 32 48 28 C58 26 60 42 60 54 Z" fill="#4ADE80" stroke="#15803D" stroke-width="3"/><path d="M60 48 C84 44 92 24 72 22 C62 20 60 36 60 48 Z" fill="#22C55E" stroke="#15803D" stroke-width="3"/>`,
    flower: `<g fill="#F472B6" stroke="#DB2777" stroke-width="3"><circle cx="60" cy="30" r="15"/><circle cx="86" cy="48" r="15"/><circle cx="76" cy="78" r="15"/><circle cx="44" cy="78" r="15"/><circle cx="34" cy="48" r="15"/></g><circle cx="60" cy="56" r="15" fill="#FACC15" stroke="#D97706" stroke-width="3"/>`,
    house: `<polygon points="16,56 60,18 104,56" fill="#EF4444" stroke="#B91C1C" stroke-width="4" stroke-linejoin="round"/><rect x="26" y="56" width="68" height="46" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><rect x="50" y="72" width="20" height="30" rx="4" fill="#92400E"/><rect x="34" y="66" width="12" height="12" rx="2" fill="#38BDF8"/><rect x="74" y="66" width="12" height="12" rx="2" fill="#38BDF8"/>`,
    rocket: `<path d="M60 14 C76 30 82 54 78 82 L42 82 C38 54 44 30 60 14 Z" fill="#F8FAFC" stroke="#334155" stroke-width="4"/><path d="M46 28 Q60 16 74 28 Z" fill="#EF4444"/><polygon points="42,64 24,84 42,84" fill="#EF4444"/><polygon points="78,64 96,84 78,84" fill="#EF4444"/><circle cx="60" cy="50" r="10" fill="#38BDF8" stroke="#0284C7" stroke-width="3"/><path d="M50 84 Q60 108 70 84 Z" fill="#F97316"/>`,
    car: `<path d="M24 62 L34 38 L82 38 L94 62 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4" stroke-linejoin="round"/><rect x="14" y="58" width="92" height="28" rx="10" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/><rect x="38" y="44" width="40" height="14" rx="4" fill="#BAE6FD"/><circle cx="34" cy="88" r="12" fill="#1E293B"/><circle cx="34" cy="88" r="5" fill="#CBD5E1"/><circle cx="86" cy="88" r="12" fill="#1E293B"/><circle cx="86" cy="88" r="5" fill="#CBD5E1"/>`,
    happy: `<circle cx="60" cy="60" r="40" fill="#FDE047" stroke="#D97706" stroke-width="4"/><circle cx="46" cy="50" r="5.5" fill="#1E293B"/><circle cx="74" cy="50" r="5.5" fill="#1E293B"/><ellipse cx="34" cy="64" rx="7" ry="4" fill="#FB7185" opacity="0.65"/><ellipse cx="86" cy="64" rx="7" ry="4" fill="#FB7185" opacity="0.65"/><path d="M42 68 Q60 86 78 68" fill="none" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>`,
    sad: `<circle cx="60" cy="60" r="40" fill="#93C5FD" stroke="#2563EB" stroke-width="4"/><circle cx="46" cy="52" r="5" fill="#1E293B"/><circle cx="74" cy="52" r="5" fill="#1E293B"/><path d="M44 78 Q60 66 76 78" fill="none" stroke="#1E3A8A" stroke-width="4.5" stroke-linecap="round"/><path d="M78 60 Q83 70 78 75 Q73 70 78 60 Z" fill="#0284C7"/>`,
    angry: `<circle cx="60" cy="60" r="40" fill="#FCA5A5" stroke="#DC2626" stroke-width="4"/><line x1="36" y1="42" x2="54" y2="50" stroke="#7F1D1D" stroke-width="4.5" stroke-linecap="round"/><line x1="84" y1="42" x2="66" y2="50" stroke="#7F1D1D" stroke-width="4.5" stroke-linecap="round"/><circle cx="46" cy="56" r="4.8" fill="#1E293B"/><circle cx="74" cy="56" r="4.8" fill="#1E293B"/><path d="M44 78 Q60 68 76 78" fill="none" stroke="#7F1D1D" stroke-width="4.5" stroke-linecap="round"/>`,
    surprised: `<circle cx="60" cy="60" r="40" fill="#FDE68A" stroke="#D97706" stroke-width="4"/><circle cx="46" cy="48" r="6.5" fill="#FFFFFF" stroke="#1E293B" stroke-width="3"/><circle cx="46" cy="48" r="2.8" fill="#1E293B"/><circle cx="74" cy="48" r="6.5" fill="#FFFFFF" stroke="#1E293B" stroke-width="3"/><circle cx="74" cy="48" r="2.8" fill="#1E293B"/><ellipse cx="60" cy="74" rx="9" ry="12" fill="#EF4444" stroke="#92400E" stroke-width="3"/>`,
    monkey: `<circle cx="26" cy="56" r="13" fill="#B45309"/><circle cx="26" cy="56" r="7" fill="#FDE68A"/><circle cx="94" cy="56" r="13" fill="#B45309"/><circle cx="94" cy="56" r="7" fill="#FDE68A"/><circle cx="60" cy="58" r="34" fill="#92400E"/><ellipse cx="48" cy="52" rx="14" ry="14" fill="#FDE68A"/><ellipse cx="72" cy="52" rx="14" ry="14" fill="#FDE68A"/><ellipse cx="60" cy="72" rx="22" ry="16" fill="#FDE68A"/><circle cx="48" cy="52" r="4.8" fill="#1E293B"/><circle cx="72" cy="52" r="4.8" fill="#1E293B"/><path d="M48 74 Q60 84 72 74" fill="none" stroke="#78350F" stroke-width="3.2" stroke-linecap="round"/>`,
    bear: `<circle cx="30" cy="30" r="14" fill="#92400E"/><circle cx="30" cy="30" r="7" fill="#FDBA74"/><circle cx="90" cy="30" r="14" fill="#92400E"/><circle cx="90" cy="30" r="7" fill="#FDBA74"/><ellipse cx="60" cy="64" rx="38" ry="34" fill="#B45309" stroke="#78350F" stroke-width="3.5"/><ellipse cx="60" cy="72" rx="18" ry="13" fill="#FDE68A"/><circle cx="46" cy="54" r="5" fill="#1E293B"/><circle cx="74" cy="54" r="5" fill="#1E293B"/><ellipse cx="60" cy="66" rx="7" ry="4.8" fill="#1E293B"/><path d="M52 76 Q60 82 68 76" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>`,
    frog: `<circle cx="38" cy="36" r="15" fill="#22C55E" stroke="#15803D" stroke-width="3.5"/><circle cx="82" cy="36" r="15" fill="#22C55E" stroke="#15803D" stroke-width="3.5"/><circle cx="38" cy="35" r="8" fill="#FFF"/><circle cx="38" cy="35" r="4.2" fill="#1E293B"/><circle cx="82" cy="35" r="8" fill="#FFF"/><circle cx="82" cy="35" r="4.2" fill="#1E293B"/><ellipse cx="60" cy="68" rx="40" ry="28" fill="#4ADE80" stroke="#15803D" stroke-width="3.5"/><ellipse cx="32" cy="68" rx="7" ry="4" fill="#FDA4AF" opacity="0.7"/><ellipse cx="88" cy="68" rx="7" ry="4" fill="#FDA4AF" opacity="0.7"/><path d="M40 72 Q60 86 80 72" fill="none" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>`,
    duck: `<circle cx="56" cy="54" r="30" fill="#FDE047" stroke="#CA8A04" stroke-width="3.5"/><path d="M80 56 Q104 54 102 64 Q100 74 78 68 Z" fill="#F97316" stroke="#C2410C" stroke-width="3"/><circle cx="64" cy="48" r="5" fill="#1E293B"/><circle cx="62.5" cy="46.5" r="1.8" fill="#FFF"/><path d="M26 78 Q56 96 86 78" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"/>`,
    whale: `<path d="M18 68 C18 36 46 28 72 34 C90 38 96 54 96 72 C96 82 86 88 60 88 C32 88 18 82 18 68 Z" fill="#0EA5E9" stroke="#0369A1" stroke-width="4"/><path d="M84 62 Q104 44 108 58 Q96 66 108 76 Q96 84 82 70 Z" fill="#0284C7"/><path d="M24 72 Q54 84 82 74 L78 86 Q50 90 26 82 Z" fill="#E0F2FE"/><circle cx="40" cy="56" r="4.8" fill="#1E293B"/><path d="M56 30 Q52 14 42 18 M56 30 Q62 14 72 18" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>`,
    fish: `<polygon points="90,60 108,38 108,82" fill="#F97316" stroke="#C2410C" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="56" cy="60" rx="38" ry="26" fill="#FB923C" stroke="#C2410C" stroke-width="3.5"/><path d="M54 35 Q62 60 54 85" fill="none" stroke="#FFFFFF" stroke-width="8"/><circle cx="34" cy="54" r="5" fill="#1E293B"/><circle cx="32.5" cy="52.5" r="1.8" fill="#FFF"/><path d="M24 66 Q30 72 36 68" fill="none" stroke="#9A3412" stroke-width="2.8" stroke-linecap="round"/>`,
    bee: `<ellipse cx="48" cy="36" rx="14" ry="18" transform="rotate(-18 48 36)" fill="#E0F2FE" stroke="#38BDF8" stroke-width="3"/><ellipse cx="72" cy="36" rx="14" ry="18" transform="rotate(18 72 36)" fill="#E0F2FE" stroke="#38BDF8" stroke-width="3"/><ellipse cx="60" cy="66" rx="34" ry="24" fill="#FACC15" stroke="#1E293B" stroke-width="3.5"/><rect x="50" y="43" width="9" height="46" fill="#1E293B"/><rect x="68" y="45" width="9" height="42" fill="#1E293B"/><circle cx="38" cy="62" r="4.5" fill="#1E293B"/><path d="M32 72 Q38 77 44 72" fill="none" stroke="#1E293B" stroke-width="2.6" stroke-linecap="round"/>`,
    butterfly: `<ellipse cx="38" cy="46" rx="22" ry="18" transform="rotate(-20 38 46)" fill="#F472B6" stroke="#BE185D" stroke-width="3.5"/><ellipse cx="82" cy="46" rx="22" ry="18" transform="rotate(20 82 46)" fill="#F472B6" stroke="#BE185D" stroke-width="3.5"/><ellipse cx="42" cy="76" rx="16" ry="14" fill="#A855F7" stroke="#6B21A8" stroke-width="3.5"/><ellipse cx="78" cy="76" rx="16" ry="14" fill="#A855F7" stroke="#6B21A8" stroke-width="3.5"/><circle cx="36" cy="44" r="6" fill="#FEF08A"/><circle cx="84" cy="44" r="6" fill="#FEF08A"/><rect x="55" y="34" width="10" height="54" rx="5" fill="#1E293B"/>`,
    strawberry: `<path d="M60 98 C34 86 24 58 30 42 C36 30 84 30 90 42 C96 58 86 86 60 98 Z" fill="#F43F5E" stroke="#BE123C" stroke-width="4"/><path d="M36 38 Q48 22 60 34 Q72 22 84 38 L70 44 L60 36 L50 44 Z" fill="#22C55E" stroke="#15803D" stroke-width="2.5"/><g fill="#FEF08A"><circle cx="46" cy="54" r="2.8"/><circle cx="62" cy="52" r="2.8"/><circle cx="76" cy="56" r="2.8"/><circle cx="52" cy="70" r="2.8"/><circle cx="68" cy="72" r="2.8"/><circle cx="60" cy="84" r="2.8"/></g>`,
    watermelon: `<path d="M16 54 A44 44 0 0 0 104 54 Z" fill="#16A34A" stroke="#15803D" stroke-width="4"/><path d="M23 54 A37 37 0 0 0 97 54 Z" fill="#DCFCE7"/><path d="M28 54 A32 32 0 0 0 92 54 Z" fill="#F43F5E"/><g fill="#1E293B"><circle cx="46" cy="64" r="3"/><circle cx="60" cy="70" r="3"/><circle cx="74" cy="64" r="3"/></g>`,
    bus: `<rect x="16" y="34" width="88" height="52" rx="12" fill="#FACC15" stroke="#CA8A04" stroke-width="4"/><rect x="24" y="44" width="20" height="18" rx="4" fill="#BAE6FD"/><rect x="50" y="44" width="20" height="18" rx="4" fill="#BAE6FD"/><rect x="76" y="44" width="20" height="18" rx="4" fill="#BAE6FD"/><rect x="16" y="68" width="88" height="7" fill="#F97316"/><circle cx="34" cy="88" r="11" fill="#1E293B"/><circle cx="34" cy="88" r="4.5" fill="#CBD5E1"/><circle cx="86" cy="88" r="11" fill="#1E293B"/><circle cx="86" cy="88" r="4.5" fill="#CBD5E1"/>`,
    boat: `<polygon points="60,20 60,68 94,68" fill="#F43F5E" stroke="#BE123C" stroke-width="3" stroke-linejoin="round"/><polygon points="56,28 56,68 30,68" fill="#FDE047" stroke="#CA8A04" stroke-width="3" stroke-linejoin="round"/><path d="M20 74 L100 74 L88 94 L32 94 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.5" stroke-linejoin="round"/><path d="M14 96 Q38 88 60 96 T106 96" fill="none" stroke="#38BDF8" stroke-width="5" stroke-linecap="round"/>`,
    plane: `<path d="M18 62 L52 54 L62 20 L74 20 L68 54 L96 48 Q106 48 104 58 Q102 66 90 66 L68 68 L74 96 L62 96 L52 68 L22 72 L16 66 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4" stroke-linejoin="round"/><circle cx="84" cy="57" r="4" fill="#FFFFFF"/>`,
    moon: `<path d="M76 20 A40 40 0 1 0 96 86 A30 30 0 1 1 76 20 Z" fill="#FDE047" stroke="#D97706" stroke-width="4"/><circle cx="84" cy="36" r="4" fill="#FEF08A"/><circle cx="96" cy="52" r="2.8" fill="#FEF08A"/>`,
    book: `<rect x="16" y="24" width="42" height="72" rx="6" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><rect x="62" y="24" width="42" height="72" rx="6" fill="#EFF6FF" stroke="#1D4ED8" stroke-width="4"/><line x1="70" y1="42" x2="94" y2="42" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/><line x1="70" y1="56" x2="94" y2="56" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/><line x1="70" y1="70" x2="88" y2="70" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>`,
    pencil: `<g transform="rotate(-35 60 60)"><rect x="48" y="20" width="24" height="62" rx="4" fill="#FACC15" stroke="#CA8A04" stroke-width="3.5"/><rect x="48" y="14" width="24" height="12" rx="4" fill="#F472B6" stroke="#BE185D" stroke-width="3"/><polygon points="48,82 72,82 60,104" fill="#FDE68A" stroke="#CA8A04" stroke-width="3.5" stroke-linejoin="round"/><polygon points="56,95 64,95 60,104" fill="#1E293B"/></g>`,
    wooden: `<rect x="18" y="28" width="84" height="64" rx="12" fill="#D97706" stroke="#92400E" stroke-width="4.5"/><path d="M22 46 Q56 38 98 48 M22 64 Q64 72 98 62 M22 80 Q50 74 98 82" fill="none" stroke="#92400E" stroke-width="3" opacity="0.55"/>`,
    metallic: `<rect x="20" y="26" width="80" height="68" rx="14" fill="#94A3B8" stroke="#475569" stroke-width="4.5"/><polygon points="34,28 52,28 32,92 20,92" fill="#FFFFFF" opacity="0.45"/><circle cx="32" cy="38" r="4" fill="#475569"/><circle cx="88" cy="38" r="4" fill="#475569"/><circle cx="32" cy="82" r="4" fill="#475569"/><circle cx="88" cy="82" r="4" fill="#475569"/>`,
    feather: `<path d="M24 96 Q44 36 96 20 Q84 68 38 86 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="3.5"/><line x1="20" y1="100" x2="86" y2="28" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>`,
    compass: `<circle cx="60" cy="60" r="40" fill="#FEF3C7" stroke="#D97706" stroke-width="5"/><circle cx="60" cy="60" r="32" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2"/><polygon points="60,28 69,60 51,60" fill="#EF4444"/><polygon points="60,92 69,60 51,60" fill="#3B82F6"/><circle cx="60" cy="60" r="5" fill="#1E293B"/>`,
    magnet: `<path d="M30 28 L30 64 A30 30 0 0 0 90 64 L90 28 L72 28 L72 64 A12 12 0 0 1 48 64 L48 28 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="4" stroke-linejoin="round"/><rect x="30" y="28" width="18" height="14" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/><rect x="72" y="28" width="18" height="14" fill="#E2E8F0" stroke="#64748B" stroke-width="3"/>`,
    leaf: `<path d="M24 92 C24 44 56 20 96 24 C92 68 68 94 24 92 Z" fill="#22C55E" stroke="#15803D" stroke-width="4" stroke-linejoin="round"/><path d="M22 94 Q54 64 88 32" fill="none" stroke="#DCFCE7" stroke-width="4" stroke-linecap="round"/>`,
    petal: `<path d="M60 20 C84 36 88 74 60 98 C32 74 36 36 60 20 Z" fill="#F472B6" stroke="#DB2777" stroke-width="4"/><path d="M60 36 Q60 66 60 88" stroke="#FCE7F3" stroke-width="3.5" stroke-linecap="round"/>`
  };

  /* ==========================================================================
     5. UNIFIED TWEMOJI 15.1 VECTOR CONVERTER + GRACEFUL OFFLINE FALLBACK
     ========================================================================== */
  function emojiToTwemojiUrl(emoji) {
    if (!emoji) return null;
    const str = String(emoji).trim();
    if (!str) return null;
    const hasZwj = str.indexOf('\u200d') >= 0;
    const cps = [];
    for (const ch of str) {
      const cp = ch.codePointAt(0);
      if (!hasZwj && cp === 0xfe0f) continue;
      cps.push(cp.toString(16));
    }
    if (!cps.length) return null;
    return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${ cps.join('-') }.svg`;
  }

  window.handleArtImgError = function (imgEl) {
    if (!imgEl || !imgEl.parentNode) return;
    const fallbackEmoji = imgEl.getAttribute('data-fallback-emoji') || '✨';
    const span = document.createElement('span');
    span.className = imgEl.getAttribute('data-fallback-class') || 'art-emoji-giant';
    span.textContent = fallbackEmoji;
    imgEl.parentNode.replaceChild(span, imgEl);
  };

  function renderEmojiVectorImg(emoji, imgClass = 'card-vector-img', fallbackClass = 'art-emoji-giant') {
    const url = emojiToTwemojiUrl(emoji);
    const safeEmoji = String(emoji || '✨').replace(/"/g, '&quot;');
    if (!url) {
      return `<span class="${ fallbackClass }">${ safeEmoji }</span>`;
    }
    return `<img class="${ imgClass }" src="${ url }" alt="" loading="lazy" decoding="async" draggable="false" data-fallback-emoji="${ safeEmoji }" data-fallback-class="${ fallbackClass }" onerror="window.handleArtImgError(this)" />`;
  }

  const EMOJI_TO_CUSTOM_KEY = {
    '🦁': 'lion', '🐘': 'elephant', '🐱': 'cat', '🐶': 'dog', '🐰': 'rabbit',
    '🐼': 'panda', '🦊': 'fox', '🐵': 'monkey', '🐻': 'bear', '🐸': 'frog',
    '🦆': 'duck', '🐳': 'whale', '🐋': 'whale', '🐟': 'fish', '🐝': 'bee',
    '🦋': 'butterfly', '🍎': 'apple', '🍌': 'banana', '🍓': 'strawberry',
    '🍉': 'watermelon', '☀️': 'sun', '🌈': 'rainbow', '☁️': 'cloud', '🌧️': 'rain',
    '🌳': 'tree', '🌱': 'sprout', '🌿': 'sprout', '🌸': 'flower', '🌻': 'flower',
    '🏠': 'house', '🏡': 'house', '🚀': 'rocket', '🚗': 'car', '🚌': 'bus',
    '⛵': 'boat', '✈️': 'plane', '🌙': 'moon', '📖': 'book', '✏️': 'pencil',
    '🧭': 'compass', '🧲': 'magnet', '🍃': 'leaf', '❤️': 'heart', '💖': 'heart',
    '⭐': 'star'
  };

  window.renderEmojiArt = function (emoji, wordHint = '', sizeClass = 'md') {
    const key = String(wordHint || '').toLowerCase().trim();
    const cleanEmoji = String(emoji || '').trim();
    const matchedKey = (key && CUSTOM_WORD_SVGS[key]) ? key : (EMOJI_TO_CUSTOM_KEY[cleanEmoji] || '');
    if (matchedKey && CUSTOM_WORD_SVGS[matchedKey]) {
      return `<svg class="custom-card-svg size-${ sizeClass }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ CUSTOM_WORD_SVGS[matchedKey] }</svg>`;
    }
    const cls = sizeClass === 'sm' ? 'card-vector-img is-sm' : sizeClass === 'stage' ? 'card-vector-img is-stage' : 'card-vector-img';
    const fb = sizeClass === 'sm' ? 'pic-emoji' : sizeClass === 'stage' ? 'sii-emoji' : 'art-emoji-giant';
    return renderEmojiVectorImg(emoji, cls, fb);
  };

  /* ==========================================================================
     6. UNIFIED FLASHCARD / MONTESSORI / GAME ARTWORK BUILDER
     ========================================================================== */
  window.renderCardArtHTML = function (card, mode = 'card') {
    if (!card) return '';

    // 1. Montessori Color Tablet Swatch
    if (card.colorHex) {
      if (mode === 'compact') {
        return `<span class="pic-swatch" style="background:${ card.colorHex }"></span>`;
      }
      return `
        <div class="color-swatch-giant montessori-tablet" style="background: ${ card.colorHex };">
          <div class="swatch-gloss" aria-hidden="true"></div>
          <span class="swatch-emblem">${ renderEmojiVectorImg(card.emoji, 'swatch-vector-img', 'swatch-emoji-fb') }</span>
        </div>
      `;
    }

    // 2. Montessori Number Counter
    if (typeof card.numberVal === 'number') {
      if (mode === 'compact') {
        return `<span class="pic-number">${ card.numberVal }</span>`;
      }
      const isLarge = card.numberVal > 10;
      const repeatedIcons = Array.from({ length: card.numberVal }, () => card.countIcon).join('');
      return `
        <div class="number-badge-giant ${ isLarge ? 'is-large' : '' }">
          <span>${ card.numberVal }</span>
          <div class="number-dots-row ${ isLarge ? 'compact' : '' }">${ repeatedIcons }</div>
        </div>
      `;
    }

    // 3. Hand-Crafted Storybook & Montessori SVG Illustration (if word matches!)
    const key = String(card.en || '').toLowerCase().trim();
    if (CUSTOM_WORD_SVGS[key]) {
      const sizeCls = mode === 'compact' ? 'sm' : 'lg';
      return `
        <div class="storybook-art-wrap is-custom-svg size-${ sizeCls }">
          <svg class="custom-card-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            ${ CUSTOM_WORD_SVGS[key] }
          </svg>
          ${ mode === 'compact' ? '' : '<span class="art-ground-shadow" aria-hidden="true"></span>' }
        </div>
      `;
    }

    // 4. Unified High-Res Vector Artwork (Twemoji 15.1 SVG) + Soft Ground Shadow
    if (mode === 'compact') {
      return renderEmojiVectorImg(card.emoji, 'card-vector-img is-sm', 'pic-emoji');
    }
    return `
      <div class="storybook-art-wrap is-vector">
        ${ renderEmojiVectorImg(card.emoji, 'card-vector-img', 'art-emoji-giant') }
        <span class="art-ground-shadow" aria-hidden="true"></span>
      </div>
    `;
  };

  /* ==========================================================================
     7. AUTO-ENHANCE STATIC HEADER MASCOT & HOME HUB ICONS ON LOAD
     ========================================================================== */
  function hydrateStaticStorybookArt() {
    // 1. Header Leo Mascot Badge
    const headerMascot = document.querySelector('#btn-home-logo .mascot-badge');
    if (headerMascot) {
      headerMascot.classList.add('is-svg-mascot');
      headerMascot.innerHTML = window.renderMascotSvg('leo', 'wave', true);
    }

    // 2. 6 Main Content Hub Cards on Home Dashboard
    const hubMap = [
      ['hub-btn-vocab', 'vocab'],
      ['hub-btn-srs', 'srs'],
      ['hub-btn-milestones', 'milestones'],
      ['hub-btn-stories', 'stories'],
      ['hub-btn-games', 'games'],
      ['hub-btn-phonics', 'phonics']
    ];
    hubMap.forEach(([btnId, key]) => {
      const iconWrap = document.querySelector(`#${ btnId } .hub-icon-wrap`);
      if (iconWrap) {
        iconWrap.classList.add('is-svg-hub');
        iconWrap.innerHTML = window.renderHubIconSvg(key);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', hydrateStaticStorybookArt);
})();
