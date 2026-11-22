/**
 * English4Kids — Khan-Kids-Inspired 3D Storybook & Montessori Visual Engine (art.js)
 * ---------------------------------------------------------------------------------
 * 1. Local 70-asset Studio 3D Pixar/Clay WebP Kit (Microsoft Fluent Emoji 3D, MIT)
 *    + Global Fluent 3D CDN engine (~98.8% hit rate across all 2,500 cards) with
 *    seamless automatic cascade (Local WebP -> Fluent 3D -> Twemoji SVG -> Emoji).
 * 2. Expressive 3D Mascot Rigs (Leo, Mimi, Toby, Lulu) with bounce, speech ripples,
 *    celebratory star bursts & curious thought bubbles.
 * 3. Full-Bleed Sunlit Storybook Treehouse Meadow World on Home Dashboard with all
 *    4 interactive 3D animal friends standing on the meadow.
 * 4. 6 Full-Bleed Scenic 3D Storybook Hub Cards + 6 Illustrated Mini-Game Banners.
 * 5. 18 Multi-Gradient Atmospheric Storybook Video Backdrops (unique gradient IDs).
 * 6. Plush 3D-Shaded Pedagogical Montessori SVGs for Geometry, Sensory Textures & Opposites.
 */
(function () {
  'use strict';

  let uidCounter = 0;
  function nextUid(prefix) {
    uidCounter += 1;
    return `${ prefix }${ uidCounter }_`;
  }

  /* ==========================================================================
     1. LOCAL BUNDLED STUDIO 3D ASSET MAP (70 WebP files, instant 0ms load!)
     ========================================================================== */
  const LOCAL_3D_BY_CODE = {
    '1f981': 'assets/art/mascot_leo.webp',
    '1f43c': 'assets/art/mascot_mimi.webp',
    '1f98a': 'assets/art/mascot_toby.webp',
    '1f430': 'assets/art/mascot_lulu.webp',
    '1f407': 'assets/art/mascot_lulu.webp',
    '1f4da': 'assets/art/hub_books.webp',
    '1f9e0': 'assets/art/hub_brain.webp',
    '2728':  'assets/art/hub_sparkles.webp',
    '1f3c6': 'assets/art/hub_trophy.webp',
    '1f451': 'assets/art/hub_crown.webp',
    '1f3ac': 'assets/art/hub_clapper.webp',
    '1f37f': 'assets/art/hub_popcorn.webp',
    '1f3ae': 'assets/art/hub_gamepad.webp',
    '1f9f8': 'assets/art/hub_teddy.webp',
    '1f388': 'assets/art/hub_balloon.webp',
    '1f9e9': 'assets/art/hub_puzzle.webp',
    '1f524': 'assets/art/hub_abc.webp',
    '1f3b5': 'assets/art/hub_music.webp',
    '1f426': 'assets/art/hub_bird.webp',
    '1f31f': 'assets/art/hub_star.webp',
    '2b50':  'assets/art/hub_star.webp',
    '1f4a1': 'assets/art/hub_bulb.webp',
    '1f3af': 'assets/art/hub_target.webp',
    '1f3a8': 'assets/art/hub_palette.webp',
    '1f0cf': 'assets/art/game_cards.webp',
    '1f517': 'assets/art/game_link.webp',
    '1f9fa': 'assets/art/game_basket.webp',
    '1f4ac': 'assets/art/game_chat.webp',
    '1f3c5': 'assets/art/ui_medal.webp',
    '1f393': 'assets/art/ui_grad.webp',
    '1f381': 'assets/art/ui_gift.webp',
    '1f418': 'assets/art/word_elephant.webp',
    '1f435': 'assets/art/word_monkey.webp',
    '1f412': 'assets/art/word_monkey.webp',
    '1f436': 'assets/art/word_dog.webp',
    '1f415': 'assets/art/word_dog.webp',
    '1f431': 'assets/art/word_cat.webp',
    '1f408': 'assets/art/word_cat.webp',
    '1f986': 'assets/art/word_duck.webp',
    '1f42f': 'assets/art/word_tiger.webp',
    '1f405': 'assets/art/word_tiger.webp',
    '1f43b': 'assets/art/word_bear.webp',
    '1f438': 'assets/art/word_frog.webp',
    '1f425': 'assets/art/word_chick.webp',
    '1f424': 'assets/art/word_chick.webp',
    '1f433': 'assets/art/word_whale.webp',
    '1f40b': 'assets/art/word_whale.webp',
    '1f98b': 'assets/art/word_butterfly.webp',
    '1f41d': 'assets/art/word_bee.webp',
    '1f34e': 'assets/art/word_apple.webp',
    '1f34c': 'assets/art/word_banana.webp',
    '1f353': 'assets/art/word_strawberry.webp',
    '1f349': 'assets/art/word_watermelon.webp',
    '2600':  'assets/art/word_sun.webp',
    '1f308': 'assets/art/word_rainbow.webp',
    '1f33b': 'assets/art/word_flower.webp',
    '1f338': 'assets/art/word_flower.webp',
    '1f333': 'assets/art/word_tree.webp',
    '1f331': 'assets/art/word_sprout.webp',
    '1f33f': 'assets/art/word_sprout.webp',
    '1f3e1': 'assets/art/word_house.webp',
    '1f3e0': 'assets/art/word_house.webp',
    '1f680': 'assets/art/word_rocket.webp',
    '1f697': 'assets/art/word_car.webp',
    '2708':  'assets/art/word_plane.webp',
    '1f3b8': 'assets/art/word_guitar.webp',
    '1f9c1': 'assets/art/word_cupcake.webp',
    '1f496': 'assets/art/word_heart.webp',
    '2764':  'assets/art/word_heart.webp',
    '1f30d': 'assets/art/word_globe.webp',
    '1f30e': 'assets/art/word_globe.webp',
    '1f52c': 'assets/art/word_microscope.webp',
    '1f916': 'assets/art/word_robot.webp',
    '1f9ed': 'assets/art/word_compass.webp',
    '2601':  'assets/art/word_cloud.webp',
    '1f319': 'assets/art/word_moon.webp',
    '1f68c': 'assets/art/word_bus.webp',
    '26f5':  'assets/art/word_boat.webp',
    '1f4d6': 'assets/art/word_book.webp',
    '270f':  'assets/art/word_pencil.webp',
    '1f382': 'assets/art/word_cake.webp',
    '1f420': 'assets/art/word_fish.webp',
    '1f41f': 'assets/art/word_fish.webp',
    '1f604': 'assets/art/word_happy.webp',
    '1f60a': 'assets/art/word_happy.webp',
    '1f9cd': 'assets/art/topic_body.webp',
    '1f522': 'assets/art/topic_numbers.webp',
    '1f392': 'assets/art/topic_school.webp',
    '1f44b': 'assets/art/topic_wave.webp',
    '1f9f9': 'assets/art/topic_broom.webp',
    '270b':  'assets/art/topic_sensory.webp',
    '1f590': 'assets/art/topic_sensory.webp',
    '1f468-200d-1f469-200d-1f467-200d-1f466': 'assets/art/word_house.webp',
    '1f468-200d-1f469-200d-1f467': 'assets/art/word_house.webp'
  };

  function parseEmojiCodepoints(emoji) {
    if (!emoji) return null;
    const str = String(emoji).trim();
    if (!str) return null;
    const full = [];
    const noFe = [];
    for (const ch of str) {
      const cp = ch.codePointAt(0);
      const hex = cp.toString(16);
      full.push(hex);
      if (cp !== 0xfe0f) noFe.push(hex);
    }
    if (!noFe.length) return null;
    const hasZwj = str.indexOf('\u200d') >= 0;
    return {
      noFe: noFe.join('-'),
      full: full.join('-'),
      tw: (hasZwj ? full : noFe).join('-')
    };
  }

  function buildArtImg(emoji, imgClass = 'card-vector-img', fallbackClass = 'art-emoji-giant') {
    const parsed = parseEmojiCodepoints(emoji);
    const safeEmoji = String(emoji || '✨').replace(/"/g, '&quot;');
    if (!parsed) {
      return `<span class="${ fallbackClass }">${ safeEmoji }</span>`;
    }
    const localSrc = LOCAL_3D_BY_CODE[parsed.noFe] || LOCAL_3D_BY_CODE[parsed.full];
    if (localSrc) {
      return `<img class="${ imgClass } is-fluent3d" src="${ localSrc }" alt="" loading="lazy" decoding="async" draggable="false" data-fallback-emoji="${ safeEmoji }" data-fallback-class="${ fallbackClass }" onerror="window.handleArtImgError(this)" />`;
    }
    const primaryUrl = `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${ parsed.noFe }_3d.png`;
    const altFluent = parsed.full !== parsed.noFe
      ? `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${ parsed.full }_3d.png`
      : '';
    const twUrl = `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${ parsed.tw }.svg`;
    return `<img class="${ imgClass } is-fluent3d" src="${ primaryUrl }" alt="" loading="lazy" decoding="async" draggable="false" data-fb1="${ altFluent }" data-fb2="${ twUrl }" data-fallback-emoji="${ safeEmoji }" data-fallback-class="${ fallbackClass }" onerror="window.handleArtImgError(this)" />`;
  }

  window.handleArtImgError = function (imgEl) {
    if (!imgEl || !imgEl.parentNode) return;
    const step = Number(imgEl.getAttribute('data-fb-step') || '0');
    const fb1 = imgEl.getAttribute('data-fb1');
    const fb2 = imgEl.getAttribute('data-fb2');
    if (step === 0 && fb1) {
      imgEl.setAttribute('data-fb-step', '1');
      imgEl.src = fb1;
      return;
    }
    if (step < 2 && fb2) {
      imgEl.setAttribute('data-fb-step', '2');
      imgEl.src = fb2;
      return;
    }
    const fallbackEmoji = imgEl.getAttribute('data-fallback-emoji') || '✨';
    const span = document.createElement('span');
    span.className = imgEl.getAttribute('data-fallback-class') || 'art-emoji-giant';
    span.textContent = fallbackEmoji;
    imgEl.parentNode.replaceChild(span, imgEl);
  };

  /* ==========================================================================
     2. EXPRESSIVE 3D STUDIO MASCOTS (Leo, Mimi, Toby, Lulu)
        High-craft 3D Pixar-style portraits inside animated character rigs
     ========================================================================== */
  const MASCOT_META = {
    leo:  { img: 'assets/art/mascot_leo.webp',  name: 'Leo',  bg: 'radial-gradient(circle at 35% 28%, #FFFBEB 0%, #FDE68A 65%, #F59E0B 100%)', ring: '#F59E0B', greetEn: "Hi! I'm Leo! Let's learn new English words together!", greetVi: 'Chào bé! Cùng Sư Tử Leo học tiếng Anh thật vui nhé!' },
    mimi: { img: 'assets/art/mascot_mimi.webp', name: 'Mimi', bg: 'radial-gradient(circle at 35% 28%, #F0FDF4 0%, #BBF7D0 68%, #22C55E 100%)', ring: '#16A34A', greetEn: "Hello! I'm Mimi! Ready for a Montessori adventure?", greetVi: 'Xin chào! Gấu Trúc Mimi sẽ cùng bé khám phá Montessori!' },
    toby: { img: 'assets/art/mascot_toby.webp', name: 'Toby', bg: 'radial-gradient(circle at 35% 28%, #FFF7ED 0%, #FED7AA 68%, #FB923C 100%)', ring: '#EA580C', greetEn: "Yay! I'm Toby! Let's count and play games!", greetVi: 'Tuyệt vời! Cáo Toby rủ bé chơi trò chơi và tập đếm nhé!' },
    lulu: { img: 'assets/art/mascot_lulu.webp', name: 'Lulu', bg: 'radial-gradient(circle at 35% 28%, #FDF2F8 0%, #FBCFE8 68%, #F472B6 100%)', ring: '#DB2777', greetEn: "Hooray! I'm Lulu! Let's sing and practice phonics!", greetVi: 'Hoan hô! Thỏ Lulu cùng bé hát ABC và tập phát âm chuẩn nào!' }
  };

  window.renderMascotSvg = function (hostId = 'leo', mood = 'wave', compact = false) {
    const id = MASCOT_META[hostId] ? hostId : 'leo';
    const meta = MASCOT_META[id];
    const moodCls = mood === 'celebrate' ? 'mood-celebrate' : mood === 'ask' ? 'mood-ask' : 'mood-wave';
    const compactCls = compact ? 'is-compact' : 'is-full';

    const extras = !compact && mood === 'celebrate'
      ? `<img class="m3d-star m3d-star-1" src="assets/art/hub_star.webp" alt="" aria-hidden="true" />
         <img class="m3d-star m3d-star-2" src="assets/art/hub_sparkles.webp" alt="" aria-hidden="true" />`
      : (!compact && mood === 'ask'
        ? `<span class="m3d-ask-bubble" aria-hidden="true">?</span>`
        : '');

    return `
      <div class="mascot-3d-rig host-${ id } ${ moodCls } ${ compactCls }" aria-hidden="true">
        <span class="m3d-speech-ring"></span>
        <span class="m3d-aura" style="background:${ meta.bg }; border-color:${ meta.ring };"></span>
        <img class="m3d-portrait" src="${ meta.img }" alt="${ meta.name }" draggable="false" />
        ${ extras }
        ${ compact ? '' : '<span class="m3d-shadow"></span>' }
      </div>
    `;
  };

  /* ==========================================================================
     3. KHAN-KIDS-INSPIRED HOME TREEHOUSE MEADOW WORLD (Hero Scene Backdrop)
     ========================================================================== */
  function renderHomeTreehouseSceneSvg() {
    const g = nextUid('hm');
    return `
      <svg class="home-world-svg" viewBox="0 0 1120 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="${ g }sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#67C6FF"/>
            <stop offset="52%" stop-color="#BBE8FF"/>
            <stop offset="100%" stop-color="#FFF5D6"/>
          </linearGradient>
          <radialGradient id="${ g }sunglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF9C4" stop-opacity="0.95"/>
            <stop offset="45%" stop-color="#FDE047" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#FDE047" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="${ g }hillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#A7F3B8"/>
            <stop offset="100%" stop-color="#6EE787"/>
          </linearGradient>
          <linearGradient id="${ g }hillMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7EE065"/>
            <stop offset="100%" stop-color="#48B84A"/>
          </linearGradient>
          <linearGradient id="${ g }hillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#65D150"/>
            <stop offset="100%" stop-color="#35A13B"/>
          </linearGradient>
          <linearGradient id="${ g }bark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7C4A22"/>
            <stop offset="55%" stop-color="#A1622F"/>
            <stop offset="100%" stop-color="#6B3D1A"/>
          </linearGradient>
          <linearGradient id="${ g }roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FB7185"/>
            <stop offset="100%" stop-color="#E11D48"/>
          </linearGradient>
          <linearGradient id="${ g }woodwall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FEF3C7"/>
            <stop offset="100%" stop-color="#FCD34D"/>
          </linearGradient>
          <radialGradient id="${ g }foliage" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#86EFAC"/>
            <stop offset="55%" stop-color="#22C55E"/>
            <stop offset="100%" stop-color="#15803D"/>
          </radialGradient>
        </defs>

        <!-- Warm Morning Sky -->
        <rect width="1120" height="320" fill="url(#${ g }sky)"/>

        <!-- Radiant Sun & Soft Glow -->
        <circle cx="965" cy="72" r="108" fill="url(#${ g }sunglow)"/>
        <circle cx="965" cy="72" r="34" fill="#FDE047" stroke="#F59E0B" stroke-width="3"/>
        <circle cx="954" cy="61" r="9" fill="#FFFBEB" opacity="0.7"/>

        <!-- Soft Pastel Rainbow Arc -->
        <g fill="none" stroke-linecap="round" opacity="0.46">
          <path d="M120 260 A290 215 0 0 1 680 260" stroke="#FB7185" stroke-width="11"/>
          <path d="M132 260 A278 203 0 0 1 668 260" stroke="#FBBF24" stroke-width="11"/>
          <path d="M144 260 A266 191 0 0 1 656 260" stroke="#4ADE80" stroke-width="11"/>
          <path d="M156 260 A254 179 0 0 1 644 260" stroke="#60A5FA" stroke-width="11"/>
        </g>

        <!-- Puffy Shaded Storybook Clouds -->
        <g class="bg-clouds-drift">
          <g transform="translate(80,34)" opacity="0.95">
            <ellipse cx="52" cy="36" rx="46" ry="18" fill="#E0F2FE"/>
            <circle cx="28" cy="28" r="20" fill="#FFFFFF"/>
            <circle cx="54" cy="20" r="26" fill="#FFFFFF"/>
            <circle cx="80" cy="28" r="19" fill="#FFFFFF"/>
          </g>
          <g transform="translate(470,22)" opacity="0.9">
            <ellipse cx="46" cy="32" rx="40" ry="15" fill="#E0F2FE"/>
            <circle cx="24" cy="24" r="17" fill="#FFFFFF"/>
            <circle cx="48" cy="18" r="22" fill="#FFFFFF"/>
            <circle cx="72" cy="25" r="16" fill="#FFFFFF"/>
          </g>
          <g transform="translate(760,44)" opacity="0.88">
            <ellipse cx="38" cy="26" rx="34" ry="12" fill="#E0F2FE"/>
            <circle cx="22" cy="20" r="14" fill="#FFFFFF"/>
            <circle cx="42" cy="15" r="18" fill="#FFFFFF"/>
            <circle cx="62" cy="21" r="13" fill="#FFFFFF"/>
          </g>
        </g>

        <!-- Distant Atmospheric Rolling Hills -->
        <path d="M0 205 Q210 140 460 190 T960 170 T1120 185 L1120 320 L0 320 Z" fill="url(#${ g }hillFar)"/>

        <!-- Cozy Storybook Wooden Treehouse Library (Visible Meadow Landmark on Right) -->
        <g transform="translate(888,118) scale(0.72)">
          <!-- Lush Oak Tree Canopy Back Layer -->
          <circle cx="62" cy="76" r="54" fill="#16A34A"/>
          <circle cx="152" cy="82" r="52" fill="#15803D"/>
          <!-- Tree Trunk & Roots -->
          <path d="M88 215 Q96 150 92 98 L128 98 Q124 150 138 215 Z" fill="url(#${ g }bark)"/>
          <path d="M122 130 Q158 116 178 96" fill="none" stroke="#8C5327" stroke-width="11" stroke-linecap="round"/>
          <!-- Lush Oak Canopy Front -->
          <circle cx="48" cy="64" r="44" fill="url(#${ g }foliage)"/>
          <circle cx="108" cy="40" r="52" fill="url(#${ g }foliage)"/>
          <circle cx="164" cy="66" r="44" fill="url(#${ g }foliage)"/>
          <circle cx="108" cy="24" r="22" fill="#86EFAC" opacity="0.55"/>
          <!-- Wooden Platform Deck & Railing -->
          <rect x="44" y="132" width="132" height="12" rx="6" fill="#92400E"/>
          <rect x="52" y="116" width="8" height="18" rx="3" fill="#B45309"/>
          <rect x="160" y="116" width="8" height="18" rx="3" fill="#B45309"/>
          <line x1="48" y1="120" x2="172" y2="120" stroke="#D97706" stroke-width="4" stroke-linecap="round"/>
          <!-- Cozy Wooden Clubhouse Cabin -->
          <rect x="64" y="76" width="92" height="58" rx="8" fill="url(#${ g }woodwall)" stroke="#B45309" stroke-width="3.5"/>
          <!-- Arched Glowing Window & Round Door -->
          <path d="M76 134 L76 102 A14 14 0 0 1 104 102 L104 134 Z" fill="#92400E"/>
          <circle cx="97" cy="116" r="2.8" fill="#FDE047"/>
          <circle cx="132" cy="102" r="14" fill="#FEF08A" stroke="#D97706" stroke-width="3.5"/>
          <line x1="132" y1="88" x2="132" y2="116" stroke="#D97706" stroke-width="2.5"/>
          <line x1="118" y1="102" x2="146" y2="102" stroke="#D97706" stroke-width="2.5"/>
          <!-- Red Shingled Storybook Roof -->
          <polygon points="52,82 110,42 168,82" fill="url(#${ g }roof)" stroke="#9F1239" stroke-width="3.5" stroke-linejoin="round"/>
          <circle cx="110" cy="64" r="7" fill="#FEF08A" stroke="#F59E0B" stroke-width="2.5"/>
          <!-- Rope Ladder Hanging Down -->
          <g stroke="#B45309" stroke-width="3" stroke-linecap="round">
            <line x1="68" y1="144" x2="64" y2="205"/>
            <line x1="86" y1="144" x2="82" y2="205"/>
            <line x1="66" y1="158" x2="84" y2="158"/>
            <line x1="65" y1="174" x2="83" y2="174"/>
            <line x1="64" y1="190" x2="82" y2="190"/>
          </g>
          <!-- Festive Pennant Bunting -->
          <path d="M18 96 Q58 114 96 96" fill="none" stroke="#F59E0B" stroke-width="2"/>
          <polygon points="28,100 38,104 31,114" fill="#F43F5E"/>
          <polygon points="48,105 58,106 52,117" fill="#3B82F6"/>
          <polygon points="68,104 78,102 74,114" fill="#FACC15"/>
        </g>

        <!-- Midground & Foreground Lush Meadow Hills -->
        <path d="M0 232 Q280 185 590 228 T1120 212 L1120 320 L0 320 Z" fill="url(#${ g }hillMid)"/>
        <path d="M0 264 Q360 228 740 262 T1120 250 L1120 320 L0 320 Z" fill="url(#${ g }hillNear)"/>

        <!-- Soft Meadow Stepping Stones & Wildflower Clusters -->
        <ellipse cx="420" cy="292" rx="34" ry="8" fill="#FEF3C7" opacity="0.65"/>
        <ellipse cx="485" cy="282" rx="26" ry="6.5" fill="#FEF3C7" opacity="0.58"/>
        <ellipse cx="545" cy="274" rx="20" ry="5.5" fill="#FEF3C7" opacity="0.5"/>

        <!-- Painted Wildflowers along Meadow Edge -->
        <g>
          <circle cx="52" cy="284" r="6" fill="#F472B6"/><circle cx="52" cy="284" r="2.6" fill="#FEF08A"/>
          <circle cx="88" cy="294" r="5" fill="#FFFFFF"/><circle cx="88" cy="294" r="2.2" fill="#FACC15"/>
          <circle cx="142" cy="278" r="5.5" fill="#A78BFA"/><circle cx="142" cy="278" r="2.4" fill="#FEF08A"/>
          <circle cx="675" cy="286" r="5.5" fill="#FB7185"/><circle cx="675" cy="286" r="2.4" fill="#FEF08A"/>
          <circle cx="1010" cy="282" r="6" fill="#FFFFFF"/><circle cx="1010" cy="282" r="2.6" fill="#F59E0B"/>
          <circle cx="1058" cy="294" r="5.5" fill="#F472B6"/><circle cx="1058" cy="294" r="2.4" fill="#FEF08A"/>
        </g>
      </svg>
    `;
  }

  /* ==========================================================================
     4. 6 FULL-BLEED SCENIC 3D STORYBOOK HUB CARD BANNERS
        Replaces tiny flat icons inside blank white squares with lush mini-worlds!
     ========================================================================== */
  const HUB_SCENES = {
    vocab: {
      skyTop: '#FFE8A3', skyBot: '#FFF8E1', hill1: '#A7F3B8', hill2: '#4ADE80',
      mainImg: 'assets/art/hub_books.webp',
      subLeft: 'assets/art/mascot_leo.webp',
      subRight: 'assets/art/word_apple.webp',
      decor: '<circle cx="245" cy="34" r="20" fill="#FDE047" opacity="0.85"/><path d="M18 46 Q42 32 66 46" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.7"/>'
    },
    srs: {
      skyTop: '#A7F3D0', skyBot: '#ECFDF5', hill1: '#6EE7B7', hill2: '#10B981',
      mainImg: 'assets/art/hub_brain.webp',
      subLeft: 'assets/art/hub_star.webp',
      subRight: 'assets/art/hub_sparkles.webp',
      decor: '<circle cx="52" cy="30" r="14" fill="#FEF08A" opacity="0.75"/><circle cx="236" cy="38" r="10" fill="#FFFFFF" opacity="0.65"/>'
    },
    milestones: {
      skyTop: '#C7D2FE', skyBot: '#EEF2FF', hill1: '#A5B4FC', hill2: '#6366F1',
      mainImg: 'assets/art/hub_trophy.webp',
      subLeft: 'assets/art/hub_crown.webp',
      subRight: 'assets/art/hub_star.webp',
      decor: '<path d="M38 110 A110 85 0 0 1 262 110" fill="none" stroke="#FDE047" stroke-width="8" opacity="0.5"/><path d="M52 110 A96 72 0 0 1 248 110" fill="none" stroke="#F472B6" stroke-width="7" opacity="0.45"/>'
    },
    stories: {
      skyTop: '#FBCFE8', skyBot: '#FFF1F2', hill1: '#F9A8D4', hill2: '#EC4899',
      mainImg: 'assets/art/hub_clapper.webp',
      subLeft: 'assets/art/hub_popcorn.webp',
      subRight: 'assets/art/hub_sparkles.webp',
      decor: '<path d="M0 0 L300 0 L300 22 Q275 34 250 22 Q225 34 200 22 Q175 34 150 22 Q125 34 100 22 Q75 34 50 22 Q25 34 0 22 Z" fill="#F43F5E" opacity="0.82"/>'
    },
    games: {
      skyTop: '#BAE6FD', skyBot: '#F0F9FF', hill1: '#7DD3FC', hill2: '#38BDF8',
      mainImg: 'assets/art/hub_gamepad.webp',
      subLeft: 'assets/art/hub_balloon.webp',
      subRight: 'assets/art/hub_puzzle.webp',
      decor: '<path d="M0 16 Q150 42 300 16" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.85"/><polygon points="35,20 52,24 41,38" fill="#FACC15"/><polygon points="248,24 265,20 259,38" fill="#FB7185"/>'
    },
    phonics: {
      skyTop: '#DDD6FE', skyBot: '#F5F3FF', hill1: '#C4B5FD', hill2: '#8B5CF6',
      mainImg: 'assets/art/hub_abc.webp',
      subLeft: 'assets/art/hub_bird.webp',
      subRight: 'assets/art/hub_music.webp',
      decor: '<path d="M36 108 A112 80 0 0 1 264 108" fill="none" stroke="#FB7185" stroke-width="7" opacity="0.45"/><path d="M46 108 A102 70 0 0 1 254 108" fill="none" stroke="#38BDF8" stroke-width="7" opacity="0.45"/>'
    }
  };

  window.renderHubIconSvg = function (hubKey) {
    const s = HUB_SCENES[hubKey] || HUB_SCENES.vocab;
    const g = nextUid('hb');
    return `
      <div class="hub-scenic-banner hub-scene-${ hubKey }">
        <svg class="hub-banner-bg" viewBox="0 0 300 130" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="${ g }bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${ s.skyTop }"/>
              <stop offset="100%" stop-color="${ s.skyBot }"/>
            </linearGradient>
          </defs>
          <rect width="300" height="130" fill="url(#${ g }bg)"/>
          ${ s.decor }
          <ellipse cx="150" cy="70" rx="74" ry="52" fill="#FFFFFF" opacity="0.52"/>
          <path d="M0 98 Q85 72 175 94 T300 88 L300 130 L0 130 Z" fill="${ s.hill1 }" opacity="0.65"/>
          <path d="M0 112 Q110 90 215 108 T300 104 L300 130 L0 130 Z" fill="${ s.hill2 }" opacity="0.5"/>
        </svg>
        <div class="hub-3d-cluster" aria-hidden="true">
          <img class="hub-3d-side is-left" src="${ s.subLeft }" alt="" draggable="false" />
          <img class="hub-3d-main" src="${ s.mainImg }" alt="" draggable="false" />
          <img class="hub-3d-side is-right" src="${ s.subRight }" alt="" draggable="false" />
          <span class="hub-3d-shadow"></span>
        </div>
      </div>
    `;
  };

  /* ==========================================================================
     5. 18 MULTI-GRADIENT ATMOSPHERIC STORYBOOK BACKDROPS (Zero ID Collisions)
     ========================================================================== */
  window.renderStoryBackdropSvg = function (theme = 'zoo') {
    const g = nextUid('bg');
    const scenes = {
      zoo: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#60C8FF"/><stop offset="65%" stop-color="#CBEFFF"/><stop offset="100%" stop-color="#FEF3C7"/></linearGradient>
          <linearGradient id="${ g }h" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#22C55E"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <circle cx="695" cy="74" r="56" fill="#FEF08A" opacity="0.45"/>
        <circle cx="695" cy="74" r="34" fill="#FDE047" stroke="#F59E0B" stroke-width="3"/>
        <g class="bg-clouds-drift" fill="#FFFFFF" opacity="0.92">
          <ellipse cx="145" cy="76" rx="54" ry="20"/><circle cx="122" cy="64" r="22"/><circle cx="158" cy="58" r="26"/>
          <ellipse cx="470" cy="62" rx="46" ry="16"/><circle cx="452" cy="52" r="18"/><circle cx="484" cy="48" r="22"/>
        </g>
        <path d="M0 242 Q190 176 410 230 T800 212 L800 380 L0 380 Z" fill="#A7F3B8"/>
        <path d="M0 272 Q260 228 530 266 T800 250 L800 380 L0 380 Z" fill="url(#${ g }h)"/>
        <!-- Savanna Acacia & Wooden Zoo Fence -->
        <rect x="64" y="168" width="16" height="92" rx="6" fill="#92400E"/>
        <ellipse cx="72" cy="156" rx="68" ry="24" fill="#16A34A"/>
        <ellipse cx="72" cy="148" rx="50" ry="15" fill="#4ADE80" opacity="0.65"/>
        <g fill="#D97706" stroke="#92400E" stroke-width="2">
          <rect x="0" y="254" width="800" height="8"/><rect x="0" y="274" width="800" height="8"/>
          <rect x="85" y="242" width="14" height="54" rx="4"/><rect x="225" y="242" width="14" height="54" rx="4"/>
          <rect x="385" y="242" width="14" height="54" rx="4"/><rect x="545" y="242" width="14" height="54" rx="4"/>
          <rect x="705" y="242" width="14" height="54" rx="4"/>
        </g>
        <path d="M295 380 Q395 316 535 380 Z" fill="#FDE68A" opacity="0.72"/>`,

      art: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFE4F1"/><stop offset="100%" stop-color="#FFF7ED"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <rect y="266" width="800" height="114" fill="#FDE68A"/>
        <rect x="520" y="42" width="215" height="145" rx="18" fill="#E0F2FE" stroke="#F472B6" stroke-width="6"/>
        <path d="M542 155 A76 76 0 0 1 712 155" fill="none" stroke="#F43F5E" stroke-width="10"/>
        <path d="M554 155 A64 64 0 0 1 700 155" fill="none" stroke="#FACC15" stroke-width="10"/>
        <path d="M566 155 A52 52 0 0 1 688 155" fill="none" stroke="#38BDF8" stroke-width="10"/>
        <path d="M0 32 Q200 72 400 32 T800 32" fill="none" stroke="#EC4899" stroke-width="3"/>
        <polygon points="72,44 96,49 81,74" fill="#FB7185"/><polygon points="154,53 178,54 165,80" fill="#FACC15"/>
        <polygon points="244,50 268,46 258,74" fill="#38BDF8"/><polygon points="338,40 362,38 351,64" fill="#4ADE80"/>
        <polygon points="444,44 468,48 454,74" fill="#A78BFA"/>
        <line x1="120" y1="108" x2="88" y2="292" stroke="#92400E" stroke-width="8" stroke-linecap="round"/>
        <line x1="158" y1="108" x2="190" y2="292" stroke="#92400E" stroke-width="8" stroke-linecap="round"/>
        <rect x="86" y="114" width="106" height="106" rx="12" fill="#FFFFFF" stroke="#F59E0B" stroke-width="5"/>`,

      market: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFBEB"/><stop offset="100%" stop-color="#FED7AA"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <g>
          <rect x="0" y="0" width="80" height="72" rx="16" fill="#EF4444"/><rect x="80" y="0" width="80" height="72" rx="16" fill="#FFFFFF"/>
          <rect x="160" y="0" width="80" height="72" rx="16" fill="#EF4444"/><rect x="240" y="0" width="80" height="72" rx="16" fill="#FFFFFF"/>
          <rect x="320" y="0" width="80" height="72" rx="16" fill="#EF4444"/><rect x="400" y="0" width="80" height="72" rx="16" fill="#FFFFFF"/>
          <rect x="480" y="0" width="80" height="72" rx="16" fill="#EF4444"/><rect x="560" y="0" width="80" height="72" rx="16" fill="#FFFFFF"/>
          <rect x="640" y="0" width="80" height="72" rx="16" fill="#EF4444"/><rect x="720" y="0" width="80" height="72" rx="16" fill="#FFFFFF"/>
        </g>
        <rect y="262" width="800" height="118" fill="#D97706"/>
        <rect y="256" width="800" height="16" fill="#B45309"/>
        <rect x="55" y="182" width="128" height="76" rx="14" fill="#FDE68A" stroke="#92400E" stroke-width="4"/>
        <rect x="615" y="182" width="128" height="76" rx="14" fill="#FDE68A" stroke="#92400E" stroke-width="4"/>`,

      farm: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#60C8FF"/><stop offset="100%" stop-color="#FEF9C3"/></linearGradient>
          <linearGradient id="${ g }g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#86EFAC"/><stop offset="100%" stop-color="#16A34A"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <circle cx="115" cy="74" r="52" fill="#FEF08A" opacity="0.45"/>
        <circle cx="115" cy="74" r="32" fill="#FDE047" stroke="#F59E0B" stroke-width="3"/>
        <g class="bg-clouds-drift" fill="#FFFFFF" opacity="0.9">
          <ellipse cx="420" cy="64" rx="52" ry="18"/><circle cx="402" cy="54" r="20"/><circle cx="436" cy="50" r="22"/>
        </g>
        <path d="M0 245 Q220 182 470 235 T800 218 L800 380 L0 380 Z" fill="#BEF264"/>
        <path d="M0 280 Q320 240 640 278 T800 264 L800 380 L0 380 Z" fill="url(#${ g }g)"/>
        <!-- Storybook Red Barn -->
        <polygon points="555,155 645,98 735,155" fill="#B91C1C"/>
        <rect x="570" y="155" width="150" height="106" fill="#EF4444" stroke="#991B1B" stroke-width="3"/>
        <rect x="618" y="192" width="54" height="68" fill="#7F1D1D" stroke="#FFFFFF" stroke-width="3.5"/>
        <line x1="618" y1="192" x2="672" y2="260" stroke="#FFFFFF" stroke-width="3"/>
        <line x1="672" y1="192" x2="618" y2="260" stroke="#FFFFFF" stroke-width="3"/>
        <!-- Spinning Windmill -->
        <polygon points="164,256 178,136 196,136 210,256" fill="#D97706"/>
        <g class="bg-spin-slow" transform="translate(187,138)">
          <rect x="-5" y="-56" width="10" height="112" rx="4" fill="#FEF3C7" stroke="#92400E" stroke-width="2"/>
          <rect x="-56" y="-5" width="112" height="10" rx="4" fill="#FEF3C7" stroke="#92400E" stroke-width="2"/>
          <circle cx="0" cy="0" r="9" fill="#B45309"/>
        </g>`,

      city: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <g class="bg-clouds-drift" fill="#FFFFFF" opacity="0.88">
          <ellipse cx="195" cy="58" rx="46" ry="16"/><circle cx="176" cy="48" r="18"/><circle cx="210" cy="46" r="20"/>
          <ellipse cx="635" cy="68" rx="50" ry="18"/><circle cx="618" cy="56" r="18"/><circle cx="652" cy="54" r="22"/>
        </g>
        <rect x="44" y="128" width="96" height="148" rx="10" fill="#93C5FD"/>
        <rect x="158" y="88" width="108" height="188" rx="10" fill="#A5B4FC"/>
        <rect x="536" y="102" width="112" height="174" rx="10" fill="#F9A8D4"/>
        <rect x="668" y="140" width="96" height="136" rx="10" fill="#FDBA74"/>
        <g fill="#FEF9C3">
          <rect x="62" y="148" width="20" height="24" rx="4"/><rect x="102" y="148" width="20" height="24" rx="4"/>
          <rect x="178" y="110" width="22" height="24" rx="4"/><rect x="224" y="110" width="22" height="24" rx="4"/>
          <rect x="558" y="124" width="22" height="24" rx="4"/><rect x="606" y="124" width="22" height="24" rx="4"/>
        </g>
        <rect y="274" width="800" height="106" fill="#475569"/>
        <line x1="0" y1="326" x2="800" y2="326" stroke="#FACC15" stroke-width="8" stroke-dasharray="38 26"/>`,

      home: `
        <defs>
          <linearGradient id="${ g }w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFBEB"/><stop offset="100%" stop-color="#FEF3C7"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }w)"/>
        <rect y="266" width="800" height="114" fill="#FDBA74"/>
        <rect x="556" y="48" width="176" height="148" rx="18" fill="#BAE6FD" stroke="#D97706" stroke-width="7"/>
        <circle cx="678" cy="96" r="24" fill="#FDE047"/>
        <line x1="644" y1="48" x2="644" y2="196" stroke="#D97706" stroke-width="5"/>
        <line x1="556" y1="122" x2="732" y2="122" stroke="#D97706" stroke-width="5"/>
        <ellipse cx="400" cy="322" rx="225" ry="38" fill="#FB7185" opacity="0.45"/>`,

      room: `
        <defs>
          <linearGradient id="${ g }w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FEFCE8"/><stop offset="100%" stop-color="#FDE68A"/></linearGradient>
          <linearGradient id="${ g }f" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F3D5A5"/><stop offset="100%" stop-color="#D9A05B"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }w)"/>
        <rect y="256" width="800" height="124" fill="url(#${ g }f)"/>
        <!-- Sunny Classroom Window -->
        <rect x="580" y="36" width="166" height="132" rx="16" fill="#E0F2FE" stroke="#B45309" stroke-width="6"/>
        <circle cx="685" cy="76" r="20" fill="#FDE047"/>
        <path d="M580 144 Q640 120 746 144 L746 168 L580 168 Z" fill="#86EFAC"/>
        <line x1="663" y1="36" x2="663" y2="168" stroke="#B45309" stroke-width="4.5"/>
        <line x1="580" y1="102" x2="746" y2="102" stroke="#B45309" stroke-width="4.5"/>
        <!-- Authentic Natural Wood Montessori Shelves -->
        <rect x="44" y="142" width="234" height="114" rx="10" fill="#FDE68A" stroke="#B45309" stroke-width="5"/>
        <line x1="46" y1="198" x2="276" y2="198" stroke="#B45309" stroke-width="5"/>
        <rect x="68" y="160" width="44" height="32" rx="6" fill="#F97316"/>
        <rect x="128" y="166" width="52" height="26" rx="6" fill="#3B82F6"/>
        <rect x="196" y="164" width="52" height="28" rx="6" fill="#22C55E"/>
        <!-- Iconic Montessori Pink Tower -->
        <g fill="#F472B6" stroke="#BE185D" stroke-width="2.5">
          <rect x="678" y="226" width="52" height="30" rx="4"/><rect x="686" y="202" width="36" height="24" rx="4"/>
          <rect x="693" y="182" width="22" height="20" rx="3"/><rect x="698" y="168" width="12" height="14" rx="2"/>
        </g>
        <!-- Woven Green Montessori Floor Work Mat -->
        <rect x="215" y="276" width="370" height="72" rx="14" fill="#DCFCE7" stroke="#22C55E" stroke-width="4.5"/>`,

      weather: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <path d="M105 280 A295 230 0 0 1 695 280" fill="none" stroke="#EF4444" stroke-width="15" opacity="0.72"/>
        <path d="M120 280 A280 215 0 0 1 680 280" fill="none" stroke="#F97316" stroke-width="15" opacity="0.72"/>
        <path d="M135 280 A265 200 0 0 1 665 280" fill="none" stroke="#FACC15" stroke-width="15" opacity="0.72"/>
        <path d="M150 280 A250 185 0 0 1 650 280" fill="none" stroke="#22C55E" stroke-width="15" opacity="0.72"/>
        <path d="M165 280 A235 170 0 0 1 635 280" fill="none" stroke="#3B82F6" stroke-width="15" opacity="0.72"/>
        <circle cx="132" cy="82" r="36" fill="#FDE047" stroke="#F59E0B" stroke-width="3"/>
        <path d="M0 264 Q240 220 480 260 T800 248 L800 380 L0 380 Z" fill="#4ADE80"/>`,

      music: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#312E81"/><stop offset="100%" stop-color="#6D28D9"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <polygon points="180,0 50,285 310,285" fill="#FDE047" opacity="0.16"/>
        <polygon points="620,0 490,285 750,285" fill="#F472B6" opacity="0.16"/>
        <path d="M0 44 Q200 94 400 44 T800 44" fill="none" stroke="#FDE047" stroke-width="3"/>
        <g class="bg-stars-twinkle" fill="#FEF08A">
          <circle cx="95" cy="64" r="6"/><circle cx="235" cy="70" r="6"/><circle cx="400" cy="48" r="6"/>
          <circle cx="565" cy="70" r="6"/><circle cx="705" cy="64" r="6"/>
        </g>
        <path d="M0 258 Q400 222 800 258 L800 380 L0 380 Z" fill="#4C1D95"/>`,

      space: `
        <defs>
          <radialGradient id="${ g }neb" cx="55%" cy="40%" r="65%"><stop offset="0%" stop-color="#4338CA"/><stop offset="55%" stop-color="#1E1B4B"/><stop offset="100%" stop-color="#090B24"/></radialGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }neb)"/>
        <g class="bg-stars-twinkle" fill="#FFFFFF">
          <circle cx="80" cy="52" r="3"/><circle cx="170" cy="96" r="2.2"/><circle cx="290" cy="42" r="3.4"/>
          <circle cx="445" cy="78" r="2.4"/><circle cx="560" cy="40" r="3"/><circle cx="715" cy="68" r="3.2"/>
          <circle cx="655" cy="148" r="2.4"/><circle cx="140" cy="182" r="2.5"/><circle cx="365" cy="128" r="2"/>
        </g>
        <circle cx="650" cy="112" r="46" fill="#F59E0B"/>
        <circle cx="636" cy="98" r="14" fill="#FDE047" opacity="0.5"/>
        <ellipse cx="650" cy="112" rx="88" ry="18" transform="rotate(-16 650 112)" fill="none" stroke="#FDE68A" stroke-width="9" opacity="0.88"/>
        <circle cx="134" cy="94" r="26" fill="#38BDF8"/>
        <path d="M0 278 Q400 232 800 278 L800 380 L0 380 Z" fill="#312E81"/>`,

      ocean: `
        <defs>
          <linearGradient id="${ g }w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#22D3EE"/><stop offset="55%" stop-color="#0284C7"/><stop offset="100%" stop-color="#0369A1"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }w)"/>
        <!-- Sunlit Underwater God Rays -->
        <polygon points="140,0 245,0 320,300 180,300" fill="#FFFFFF" opacity="0.12"/>
        <polygon points="480,0 590,0 680,300 530,300" fill="#FFFFFF" opacity="0.1"/>
        <g class="bg-bubbles-rise" fill="rgba(255,255,255,0.45)">
          <circle cx="105" cy="195" r="12"/><circle cx="132" cy="148" r="7"/><circle cx="675" cy="175" r="14"/><circle cx="705" cy="122" r="8"/><circle cx="425" cy="112" r="9"/>
        </g>
        <path d="M0 288 Q210 260 440 284 T800 274 L800 380 L0 380 Z" fill="#FDE68A"/>
        <g stroke-linecap="round" fill="none">
          <path d="M74 306 Q56 248 82 204 M82 252 Q106 232 106 206" stroke="#FB7185" stroke-width="14"/>
          <path d="M702 306 Q724 244 696 198 M702 258 Q674 236 672 210" stroke="#F472B6" stroke-width="14"/>
          <path d="M168 312 Q184 264 168 224" stroke="#34D399" stroke-width="11"/>
        </g>`,

      bakery: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFF1F2"/><stop offset="100%" stop-color="#FCE7F3"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <rect x="65" y="76" width="215" height="12" rx="6" fill="#D97706"/>
        <rect x="520" y="76" width="215" height="12" rx="6" fill="#D97706"/>
        <rect x="92" y="42" width="30" height="34" rx="7" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>
        <rect x="142" y="46" width="32" height="30" rx="7" fill="#FDE68A" stroke="#D97706" stroke-width="3"/>
        <rect y="260" width="800" height="120" fill="#FED7AA"/>
        <rect y="254" width="800" height="14" fill="#F97316"/>`,

      park: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7DD3FC"/><stop offset="100%" stop-color="#FEFCE8"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <circle cx="670" cy="70" r="34" fill="#FDE047"/>
        <path d="M0 245 Q230 192 490 240 T800 225 L800 380 L0 380 Z" fill="#86EFAC"/>
        <path d="M0 278 Q310 248 620 278 T800 268 L800 380 L0 380 Z" fill="#4ADE80"/>
        <rect x="78" y="160" width="18" height="94" rx="5" fill="#92400E"/>
        <circle cx="87" cy="136" r="46" fill="#F9A8D4"/>
        <circle cx="64" cy="148" r="28" fill="#FBCFE8"/>
        <rect x="605" y="218" width="128" height="12" rx="5" fill="#B45309"/>
        <rect x="605" y="236" width="128" height="12" rx="5" fill="#D97706"/>`,

      eco: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#67E8F9"/><stop offset="100%" stop-color="#ECFDF5"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <circle cx="685" cy="70" r="34" fill="#FDE047"/>
        <path d="M0 244 Q240 184 510 236 T800 218 L800 380 L0 380 Z" fill="#6EE7B7"/>
        <path d="M0 282 Q340 248 680 280 T800 270 L800 380 L0 380 Z" fill="#10B981"/>
        <rect x="138" y="114" width="10" height="144" rx="4" fill="#FFFFFF"/>
        <g class="bg-spin-slow" transform="translate(143,116)">
          <ellipse cx="0" cy="-34" rx="6" ry="34" fill="#FFFFFF"/>
          <ellipse cx="30" cy="18" rx="6" ry="34" transform="rotate(120 30 18)" fill="#FFFFFF"/>
          <ellipse cx="-30" cy="18" rx="6" ry="34" transform="rotate(240 -30 18)" fill="#FFFFFF"/>
          <circle cx="0" cy="0" r="8" fill="#0EA5E9"/>
        </g>`,

      lab: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E0E7FF"/><stop offset="100%" stop-color="#F8FAFC"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <rect x="44" y="54" width="194" height="132" rx="14" fill="#FFFFFF" stroke="#6366F1" stroke-width="5"/>
        <circle cx="110" cy="118" r="24" fill="none" stroke="#818CF8" stroke-width="3.5"/>
        <circle cx="152" cy="108" r="20" fill="none" stroke="#22C55E" stroke-width="3.5"/>
        <rect y="264" width="800" height="116" fill="#CBD5E1"/>
        <rect y="256" width="800" height="14" fill="#64748B"/>`,

      future: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0F172A"/><stop offset="100%" stop-color="#1E3A8A"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <g fill="#38BDF8" opacity="0.26">
          <rect x="52" y="102" width="76" height="160" rx="16"/><rect x="150" y="66" width="84" height="196" rx="18"/>
          <rect x="560" y="80" width="90" height="182" rx="20"/><rect x="676" y="110" width="76" height="152" rx="16"/>
        </g>
        <path d="M0 246 Q400 176 800 246" fill="none" stroke="#38BDF8" stroke-width="6" opacity="0.82"/>`,

      detective: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2E1065"/><stop offset="100%" stop-color="#581C87"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <rect y="258" width="800" height="122" fill="#4C1D95"/>
        <rect x="55" y="65" width="175" height="195" rx="10" fill="#581C87" stroke="#A855F7" stroke-width="4"/>
        <line x1="60" y1="125" x2="225" y2="125" stroke="#A855F7" stroke-width="4"/>
        <line x1="60" y1="185" x2="225" y2="185" stroke="#A855F7" stroke-width="4"/>
        <circle cx="680" cy="95" r="76" fill="#FDE047" opacity="0.18"/>`,

      summit: `
        <defs>
          <linearGradient id="${ g }s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#134E4A"/><stop offset="100%" stop-color="#0F766E"/></linearGradient>
        </defs>
        <rect width="800" height="380" fill="url(#${ g }s)"/>
        <polygon points="220,0 80,260 360,260" fill="#2DD4BF" opacity="0.18"/>
        <polygon points="580,0 440,260 720,260" fill="#FACC15" opacity="0.18"/>
        <circle cx="400" cy="150" r="95" fill="none" stroke="#5EEAD4" stroke-width="3" opacity="0.4"/>
        <ellipse cx="400" cy="150" rx="95" ry="38" fill="none" stroke="#5EEAD4" stroke-width="2.5" opacity="0.4"/>
        <path d="M0 268 Q400 242 800 268 L800 380 L0 380 Z" fill="#115E59"/>`
    };

    const body = scenes[theme] || scenes.zoo;
    return `<svg class="story-bg-svg" viewBox="0 0 800 380" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ body }</svg>`;
  };

  /* ==========================================================================
     6. PLUSH 3D-SHADED PEDAGOGICAL MONTESSORI SVGS
        Only used for Geometry Solids/Angles, Tactile Textures & Opposites where
        purpose-built visual diagrams teach much clearer than any emoji!
     ========================================================================== */
  const PEDAGOGICAL_3D_SVGS = {
    circle: `<circle cx="60" cy="60" r="40" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><circle cx="56" cy="54" r="32" fill="#60A5FA" opacity="0.55"/><ellipse cx="44" cy="40" rx="12" ry="7" transform="rotate(-28 44 40)" fill="#FFFFFF" opacity="0.55"/>`,
    square: `<rect x="20" y="20" width="80" height="80" rx="16" fill="#F97316" stroke="#C2410C" stroke-width="4"/><rect x="26" y="25" width="68" height="32" rx="10" fill="#FDBA74" opacity="0.45"/><rect x="30" y="29" width="28" height="9" rx="4.5" fill="#FFFFFF" opacity="0.6"/>`,
    triangle: `<polygon points="60,16 104,96 16,96" fill="#22C55E" stroke="#15803D" stroke-width="4.5" stroke-linejoin="round"/><polygon points="60,26 84,74 36,74" fill="#86EFAC" opacity="0.45"/>`,
    rectangle: `<rect x="12" y="30" width="96" height="60" rx="12" fill="#8B5CF6" stroke="#6D28D9" stroke-width="4"/><rect x="20" y="36" width="80" height="22" rx="8" fill="#C4B5FD" opacity="0.45"/>`,
    oval: `<ellipse cx="60" cy="60" rx="46" ry="31" fill="#EC4899" stroke="#BE185D" stroke-width="4"/><ellipse cx="46" cy="46" rx="15" ry="7" transform="rotate(-14 46 46)" fill="#FFFFFF" opacity="0.48"/>`,
    diamond: `<polygon points="60,12 104,60 60,108 16,60" fill="#06B6D4" stroke="#0E7490" stroke-width="4" stroke-linejoin="round"/><polygon points="60,18 86,58 60,58" fill="#A5F3FC" opacity="0.55"/>`,
    rhombus: `<polygon points="60,14 98,60 60,106 22,60" fill="#0EA5E9" stroke="#0369A1" stroke-width="4.5" stroke-linejoin="round"/><polygon points="60,20 88,60 60,60" fill="#7DD3FC" opacity="0.45"/><line x1="60" y1="22" x2="60" y2="98" stroke="#E0F2FE" stroke-width="2.5" stroke-dasharray="5 5"/>`,
    trapezoid: `<polygon points="34,26 86,26 106,94 14,94" fill="#F59E0B" stroke="#B45309" stroke-width="4.5" stroke-linejoin="round"/><polygon points="38,32 82,32 90,56 30,56" fill="#FDE68A" opacity="0.45"/>`,
    parallelogram: `<polygon points="34,26 106,26 86,94 14,94" fill="#10B981" stroke="#047857" stroke-width="4.5" stroke-linejoin="round"/><polygon points="38,32 96,32 88,54 32,54" fill="#6EE7B7" opacity="0.42"/>`,
    pentagon: `<polygon points="60,14 104,46 87,98 33,98 16,46" fill="#6366F1" stroke="#4338CA" stroke-width="4.5" stroke-linejoin="round"/><polygon points="60,22 90,46 60,64 30,46" fill="#A5B4FC" opacity="0.42"/>`,
    hexagon: `<polygon points="60,14 100,37 100,83 60,106 20,83 20,37" fill="#14B8A6" stroke="#0F766E" stroke-width="4.5" stroke-linejoin="round"/><polygon points="60,20 92,39 60,58 28,39" fill="#99F6E4" opacity="0.45"/>`,
    octagon: `<polygon points="41,14 79,14 106,41 106,79 79,106 41,106 14,79 14,41" fill="#EF4444" stroke="#B91C1C" stroke-width="4.5" stroke-linejoin="round"/><rect x="34" y="24" width="52" height="18" rx="8" fill="#FCA5A5" opacity="0.4"/>`,
    cube: `<polygon points="60,14 102,35 60,56 18,35" fill="#93C5FD" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/><polygon points="18,35 60,56 60,105 18,84" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/><polygon points="102,35 60,56 60,105 102,84" fill="#2563EB" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/>`,
    sphere: `<circle cx="60" cy="60" r="40" fill="#2563EB" stroke="#1D4ED8" stroke-width="3.8"/><circle cx="52" cy="50" r="28" fill="#60A5FA" opacity="0.65"/><ellipse cx="60" cy="60" rx="40" ry="14" fill="none" stroke="#BFDBFE" stroke-width="3" stroke-dasharray="5 5"/><ellipse cx="42" cy="38" rx="11" ry="7" transform="rotate(-30 42 38)" fill="#FFFFFF" opacity="0.65"/>`,
    cone: `<polygon points="60,14 100,90 20,90" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/><polygon points="60,18 78,88 32,88" fill="#93C5FD" opacity="0.48"/><ellipse cx="60" cy="90" rx="40" ry="12" fill="#2563EB" stroke="#1D4ED8" stroke-width="3.8"/>`,
    cylinder: `<path d="M24 32 L24 88 A36 12 0 0 0 96 88 L96 32 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.8"/><rect x="34" y="38" width="16" height="52" rx="8" fill="#93C5FD" opacity="0.48"/><ellipse cx="60" cy="32" rx="36" ry="12" fill="#BFDBFE" stroke="#1D4ED8" stroke-width="3.8"/>`,
    pyramid: `<polygon points="60,14 18,88 62,104" fill="#60A5FA" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/><polygon points="60,14 62,104 102,84" fill="#2563EB" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/>`,
    prism: `<polygon points="22,88 52,22 82,88" fill="#93C5FD" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/><polygon points="52,22 94,30 106,82 82,88" fill="#2563EB" stroke="#1D4ED8" stroke-width="3.8" stroke-linejoin="round"/>`,
    'right angle': `<path d="M28 24 L28 92 L96 92" fill="none" stroke="#1D4ED8" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="28" y="68" width="24" height="24" fill="#FEF08A" stroke="#F59E0B" stroke-width="3.5"/><text x="66" y="62" font-size="19" font-weight="900" fill="#D97706">90°</text>`,
    'acute angle': `<path d="M88 30 L28 90 L96 90" fill="none" stroke="#16A34A" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M52 90 A24 24 0 0 0 46 72" fill="none" stroke="#F59E0B" stroke-width="5"/>`,
    'obtuse angle': `<path d="M20 34 L54 90 L102 90" fill="none" stroke="#9333EA" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M78 90 A24 24 0 0 0 42 70" fill="none" stroke="#F59E0B" stroke-width="5"/>`,
    radius: `<circle cx="60" cy="60" r="39" fill="#EFF6FF" stroke="#3B82F6" stroke-width="5"/><line x1="60" y1="60" x2="99" y2="60" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/><circle cx="60" cy="60" r="6" fill="#1E293B"/>`,
    diameter: `<circle cx="60" cy="60" r="39" fill="#EFF6FF" stroke="#3B82F6" stroke-width="5"/><line x1="21" y1="60" x2="99" y2="60" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/><circle cx="60" cy="60" r="5.5" fill="#1E293B"/>`,
    semicircle: `<path d="M18 76 A42 42 0 0 1 102 76 Z" fill="#F59E0B" stroke="#B45309" stroke-width="4.5" stroke-linejoin="round"/><path d="M30 68 A30 30 0 0 1 78 52" fill="none" stroke="#FEF3C7" stroke-width="6" stroke-linecap="round" opacity="0.65"/>`,
    parallel: `<line x1="20" y1="42" x2="100" y2="42" stroke="#2563EB" stroke-width="9" stroke-linecap="round"/><line x1="20" y1="78" x2="100" y2="78" stroke="#2563EB" stroke-width="9" stroke-linecap="round"/>`,
    symmetry: `<path d="M60 22 C34 14 14 38 26 58 C16 76 34 98 60 84 Z" fill="#EC4899"/><path d="M60 22 C86 14 106 38 94 58 C104 76 86 98 60 84 Z" fill="#F472B6"/><line x1="60" y1="12" x2="60" y2="108" stroke="#1E293B" stroke-width="3.5" stroke-dasharray="6 5"/>`,
    fraction: `<circle cx="60" cy="60" r="39" fill="#FEF3C7" stroke="#D97706" stroke-width="4.5"/><path d="M60 60 L60 21 A39 39 0 0 1 99 60 Z" fill="#F97316"/><line x1="60" y1="21" x2="60" y2="99" stroke="#D97706" stroke-width="3.5"/><line x1="21" y1="60" x2="99" y2="60" stroke="#D97706" stroke-width="3.5"/>`,
    half: `<circle cx="60" cy="60" r="39" fill="#E0F2FE" stroke="#0284C7" stroke-width="4.5"/><path d="M60 21 A39 39 0 0 1 60 99 Z" fill="#0EA5E9"/>`,
    quarter: `<circle cx="60" cy="60" r="39" fill="#DCFCE7" stroke="#16A34A" stroke-width="4.5"/><path d="M60 60 L60 21 A39 39 0 0 1 99 60 Z" fill="#22C55E"/>`,
    line: `<line x1="16" y1="60" x2="104" y2="60" stroke="#2563EB" stroke-width="8.5" stroke-linecap="round"/><circle cx="16" cy="60" r="7" fill="#EF4444"/><circle cx="104" cy="60" r="7" fill="#EF4444"/>`,
    dot: `<circle cx="60" cy="60" r="22" fill="#1E293B"/><circle cx="53" cy="53" r="6" fill="#64748B"/><circle cx="60" cy="60" r="38" fill="none" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 6"/>`,
    curve: `<path d="M16 84 Q42 18 66 60 T104 34" fill="none" stroke="#EC4899" stroke-width="9.5" stroke-linecap="round"/>`,
    spiral: `<path d="M60 60 C60 52 70 52 70 60 C70 72 48 72 48 58 C48 40 82 40 82 60 C82 86 34 86 34 56 C34 26 94 26 94 62" fill="none" stroke="#8B5CF6" stroke-width="7" stroke-linecap="round"/>`,
    velvety: `<rect x="16" y="22" width="88" height="76" rx="20" fill="#9333EA" stroke="#6B21A8" stroke-width="4"/><path d="M22 46 Q48 32 72 48 T98 44" fill="none" stroke="#E9D5FF" stroke-width="8" stroke-linecap="round" opacity="0.8"/><path d="M22 72 Q50 58 76 74 T98 68" fill="none" stroke="#D8B4FE" stroke-width="8" stroke-linecap="round" opacity="0.72"/>`,
    glossy: `<circle cx="60" cy="60" r="39" fill="#EF4444" stroke="#B91C1C" stroke-width="4"/><circle cx="54" cy="54" r="28" fill="#F87171" opacity="0.5"/><ellipse cx="43" cy="39" rx="14" ry="8" transform="rotate(-32 43 39)" fill="#FFFFFF" opacity="0.92"/><circle cx="34" cy="54" r="4.5" fill="#FFFFFF" opacity="0.8"/><path d="M92 20 L95 11 L98 20 L107 23 L98 26 L95 35 L92 26 L83 23 Z" fill="#FACC15"/>`,
    bumpy: `<path d="M12 78 C20 42 36 42 42 66 C48 34 68 34 74 66 C80 40 98 40 108 78 L108 98 L12 98 Z" fill="#F97316" stroke="#C2410C" stroke-width="4.5" stroke-linejoin="round"/><circle cx="28" cy="60" r="4.5" fill="#FFEDD5"/><circle cx="58" cy="52" r="5" fill="#FFEDD5"/><circle cx="90" cy="60" r="4.5" fill="#FFEDD5"/>`,
    fluffy: `<g fill="#FFFFFF" stroke="#93C5FD" stroke-width="4"><circle cx="36" cy="66" r="21"/><circle cx="58" cy="48" r="25"/><circle cx="82" cy="64" r="21"/><circle cx="60" cy="72" r="21"/></g><circle cx="52" cy="40" r="7" fill="#E0F2FE"/>`,
    sticky: `<path d="M20 26 L100 26 L100 44 C84 44 82 78 72 78 C62 78 62 48 52 48 C42 48 44 94 34 94 C24 94 24 44 20 44 Z" fill="#F59E0B" stroke="#B45309" stroke-width="4" stroke-linejoin="round"/><circle cx="34" cy="82" r="4" fill="#FEF3C7"/><circle cx="72" cy="68" r="3.5" fill="#FEF3C7"/>`,
    slippery: `<rect x="34" y="24" width="50" height="46" rx="12" transform="rotate(-12 58 48)" fill="#BAE6FD" stroke="#0284C7" stroke-width="4"/><path d="M20 92 Q60 80 100 92" fill="none" stroke="#38BDF8" stroke-width="6.5" stroke-linecap="round"/><path d="M22 44 L10 48 M24 56 L12 60" stroke="#0EA5E9" stroke-width="4" stroke-linecap="round"/>`,
    prickly: `<rect x="44" y="22" width="32" height="76" rx="16" fill="#22C55E" stroke="#15803D" stroke-width="4"/><path d="M44 46 L26 46 L26 62 L44 62 M76 38 L94 38 L94 56 L76 56" fill="none" stroke="#16A34A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><g stroke="#FACC15" stroke-width="3.5" stroke-linecap="round"><line x1="40" y1="34" x2="32" y2="28"/><line x1="80" y1="30" x2="88" y2="24"/><line x1="40" y1="74" x2="32" y2="74"/><line x1="80" y1="72" x2="88" y2="72"/></g>`,
    sandpaper: `<rect x="16" y="20" width="88" height="80" rx="12" fill="#FDE68A" stroke="#B45309" stroke-width="5"/><rect x="26" y="30" width="68" height="60" rx="6" fill="#D97706" opacity="0.52"/><g fill="#78350F"><circle cx="38" cy="44" r="3"/><circle cx="54" cy="40" r="2.6"/><circle cx="72" cy="46" r="3"/><circle cx="44" cy="60" r="2.8"/><circle cx="62" cy="58" r="3"/><circle cx="80" cy="62" r="2.6"/><circle cx="38" cy="76" r="3"/><circle cx="58" cy="74" r="2.6"/><circle cx="76" cy="78" r="3"/></g>`,
    transparent: `<rect x="20" y="22" width="54" height="58" rx="12" fill="#F59E0B"/><rect x="44" y="36" width="56" height="60" rx="12" fill="rgba(186,230,253,0.62)" stroke="#0284C7" stroke-width="4"/><line x1="54" y1="48" x2="70" y2="64" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>`,
    striped: `<rect x="16" y="20" width="88" height="80" rx="16" fill="#FFFFFF" stroke="#1E293B" stroke-width="4"/><rect x="21" y="31" width="78" height="12" rx="4" fill="#3B82F6"/><rect x="21" y="54" width="78" height="12" rx="4" fill="#F97316"/><rect x="21" y="77" width="78" height="12" rx="4" fill="#22C55E"/>`,
    spotted: `<rect x="16" y="20" width="88" height="80" rx="16" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/><circle cx="38" cy="42" r="10" fill="#EF4444"/><circle cx="74" cy="44" r="12" fill="#3B82F6"/><circle cx="54" cy="74" r="11" fill="#22C55E"/><circle cx="84" cy="76" r="8" fill="#EC4899"/>`,
    hollow: `<circle cx="60" cy="60" r="38" fill="none" stroke="#F97316" stroke-width="15"/><circle cx="60" cy="60" r="24" fill="none" stroke="#C2410C" stroke-width="3" stroke-dasharray="5 5"/>`,
    solid: `<circle cx="60" cy="60" r="39" fill="#475569" stroke="#1E293B" stroke-width="5"/><ellipse cx="46" cy="44" rx="13" ry="8" transform="rotate(-25 46 44)" fill="#94A3B8" opacity="0.6"/>`,
    'work mat': `<rect x="14" y="28" width="92" height="64" rx="10" fill="#DCFCE7" stroke="#16A34A" stroke-width="4.5"/><rect x="24" y="38" width="72" height="44" rx="5" fill="none" stroke="#4ADE80" stroke-width="3" stroke-dasharray="6 4"/>`,
    'roll mat': `<ellipse cx="32" cy="60" rx="14" ry="28" fill="#86EFAC" stroke="#16A34A" stroke-width="4"/><path d="M32 32 L88 32 A14 28 0 0 1 88 88 L32 88" fill="#22C55E" stroke="#16A34A" stroke-width="4"/><ellipse cx="32" cy="60" rx="5" ry="12" fill="#15803D"/>`,
    'pour water': `<path d="M22 30 L56 26 L62 66 L30 70 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4" stroke-linejoin="round"/><path d="M62 42 Q82 44 82 88" fill="none" stroke="#0EA5E9" stroke-width="7.5" stroke-linecap="round"/><rect x="64" y="74" width="36" height="28" rx="6" fill="#BAE6FD" stroke="#0284C7" stroke-width="3.5"/>`,
    stack: `<rect x="18" y="76" width="84" height="22" rx="7" fill="#EF4444" stroke="#B91C1C" stroke-width="3.5"/><rect x="28" y="52" width="64" height="22" rx="7" fill="#FACC15" stroke="#CA8A04" stroke-width="3.5"/><rect x="40" y="28" width="40" height="22" rx="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3.5"/>`,
    wooden: `<rect x="16" y="26" width="88" height="68" rx="14" fill="#D97706" stroke="#92400E" stroke-width="4.5"/><path d="M22 46 Q56 38 98 48 M22 64 Q64 72 98 62 M22 80 Q50 74 98 82" fill="none" stroke="#92400E" stroke-width="3" opacity="0.55"/>`,
    metallic: `<rect x="18" y="24" width="84" height="72" rx="16" fill="#94A3B8" stroke="#475569" stroke-width="4.5"/><polygon points="34,26 54,26 32,94 20,94" fill="#FFFFFF" opacity="0.5"/><circle cx="32" cy="38" r="4" fill="#475569"/><circle cx="88" cy="38" r="4" fill="#475569"/><circle cx="32" cy="82" r="4" fill="#475569"/><circle cx="88" cy="82" r="4" fill="#475569"/>`,
    big: `<circle cx="48" cy="60" r="35" fill="#F97316" stroke="#C2410C" stroke-width="4.5"/><ellipse cx="38" cy="44" rx="11" ry="6" transform="rotate(-25 38 44)" fill="#FFEDD5" opacity="0.6"/><circle cx="96" cy="82" r="11" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>`,
    small: `<circle cx="44" cy="60" r="30" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3.5" stroke-dasharray="5 5"/><circle cx="88" cy="78" r="14" fill="#22C55E" stroke="#15803D" stroke-width="4"/>`,
    tall: `<rect x="28" y="16" width="28" height="86" rx="9" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/><rect x="68" y="68" width="24" height="34" rx="6" fill="#CBD5E1"/>`,
    short: `<rect x="28" y="18" width="24" height="84" rx="8" fill="#E2E8F0"/><rect x="66" y="68" width="28" height="34" rx="9" fill="#F43F5E" stroke="#BE123C" stroke-width="4"/>`,
    long: `<rect x="12" y="34" width="96" height="20" rx="10" fill="#10B981" stroke="#047857" stroke-width="4"/><rect x="12" y="68" width="36" height="18" rx="9" fill="#CBD5E1"/>`,
    wide: `<rect x="12" y="34" width="96" height="52" rx="12" fill="#0EA5E9" stroke="#0369A1" stroke-width="4"/><path d="M24 60 L96 60 M32 52 L24 60 L32 68 M88 52 L96 60 L88 68" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    narrow: `<rect x="45" y="18" width="30" height="84" rx="9" fill="#A855F7" stroke="#6B21A8" stroke-width="4"/><path d="M18 60 L38 60 M102 60 L82 60" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>`,
    empty: `<path d="M34 24 L42 96 L78 96 L86 24 Z" fill="#F8FAFC" stroke="#64748B" stroke-width="4.5" stroke-linejoin="round"/><line x1="38" y1="42" x2="82" y2="42" stroke="#CBD5E1" stroke-width="3" stroke-dasharray="5 5"/>`,
    full: `<path d="M34 24 L42 96 L78 96 L86 24 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4.5" stroke-linejoin="round"/><ellipse cx="60" cy="28" rx="24" ry="6" fill="#BAE6FD"/>`,
    rough: `<path d="M14 74 L28 44 L40 72 L54 40 L68 72 L82 42 L94 74 L106 52 L106 96 L14 96 Z" fill="#78716C" stroke="#44403C" stroke-width="4" stroke-linejoin="round"/>`,
    smooth: `<path d="M14 76 Q60 34 106 76 L106 96 L14 96 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/><path d="M32 62 Q60 44 88 62" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>`,
    bright: `<circle cx="60" cy="60" r="25" fill="#FACC15" stroke="#D97706" stroke-width="4"/><g stroke="#F59E0B" stroke-width="5.5" stroke-linecap="round"><line x1="60" y1="12" x2="60" y2="24"/><line x1="60" y1="96" x2="60" y2="108"/><line x1="12" y1="60" x2="24" y2="60"/><line x1="96" y1="60" x2="108" y2="60"/><line x1="26" y1="26" x2="35" y2="35"/><line x1="85" y1="85" x2="94" y2="94"/><line x1="94" y1="26" x2="85" y2="35"/><line x1="35" y1="85" x2="26" y2="94"/></g>`,
    dark: `<rect x="14" y="14" width="92" height="92" rx="24" fill="#1E1B4B"/><path d="M68 32 A25 25 0 1 0 84 74 A18 18 0 1 1 68 32 Z" fill="#FDE047"/><circle cx="36" cy="38" r="3.2" fill="#FFFFFF"/><circle cx="84" cy="40" r="2.8" fill="#FFFFFF"/>`,
    soft: `<ellipse cx="60" cy="64" rx="42" ry="27" fill="#FCE7F3" stroke="#F472B6" stroke-width="4.5"/><path d="M30 62 Q60 72 90 62" fill="none" stroke="#F9A8D4" stroke-width="5" stroke-linecap="round"/>`,
    hard: `<polygon points="20,88 30,32 64,22 96,42 100,88" fill="#64748B" stroke="#334155" stroke-width="4.5" stroke-linejoin="round"/><polygon points="36,40 62,30 78,46 48,54" fill="#94A3B8" opacity="0.65"/>`
  };

  /* ==========================================================================
     7. UNIFIED 3D ARTWORK RENDERERS (Flashcards, Montessori, Stories, Games)
     ========================================================================== */
  window.renderEmojiArt = function (emoji, wordHint = '', sizeClass = 'md') {
    const key = String(wordHint || '').toLowerCase().trim();
    if (key && PEDAGOGICAL_3D_SVGS[key]) {
      return `<svg class="custom-card-svg size-${ sizeClass }" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ PEDAGOGICAL_3D_SVGS[key] }</svg>`;
    }
    const cls = sizeClass === 'sm' ? 'card-vector-img is-sm' : sizeClass === 'stage' ? 'card-vector-img is-stage' : 'card-vector-img';
    const fb = sizeClass === 'sm' ? 'pic-emoji' : sizeClass === 'stage' ? 'sii-emoji' : 'art-emoji-giant';
    return buildArtImg(emoji, cls, fb);
  };

  window.renderCardArtHTML = function (card, mode = 'card') {
    if (!card) return '';

    // 1. Glossy Montessori Color Tablet
    if (card.colorHex) {
      if (mode === 'compact') {
        return `<span class="pic-swatch" style="background:${ card.colorHex }"></span>`;
      }
      return `
        <div class="color-swatch-giant montessori-tablet" style="background: ${ card.colorHex };">
          <div class="swatch-gloss" aria-hidden="true"></div>
          <span class="swatch-emblem">${ buildArtImg(card.emoji, 'swatch-vector-img', 'swatch-emoji-fb') }</span>
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

    // 3. Plush 3D-Shaded Pedagogical Montessori Diagrams (Geometry / Textures / Opposites)
    const key = String(card.en || '').toLowerCase().trim();
    if (PEDAGOGICAL_3D_SVGS[key]) {
      const sizeCls = mode === 'compact' ? 'sm' : 'lg';
      return `
        <div class="storybook-art-wrap is-custom-svg size-${ sizeCls }">
          <svg class="custom-card-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            ${ PEDAGOGICAL_3D_SVGS[key] }
          </svg>
          ${ mode === 'compact' ? '' : '<span class="art-ground-shadow" aria-hidden="true"></span>' }
        </div>
      `;
    }

    // 4. Studio Microsoft Fluent 3D Pixar/Clay Illustration (Local 0ms or CDN)
    if (mode === 'compact') {
      return buildArtImg(card.emoji, 'card-vector-img is-sm', 'pic-emoji');
    }
    return `
      <div class="storybook-art-wrap is-vector">
        <span class="art-vignette-halo" aria-hidden="true"></span>
        ${ buildArtImg(card.emoji, 'card-vector-img', 'art-emoji-giant') }
        <span class="art-ground-shadow" aria-hidden="true"></span>
      </div>
    `;
  };

  /* ==========================================================================
     8. AUTO-HYDRATE HOME WORLD, 6 SCENIC HUB CARDS, 6 GAMES & PROGRESS ICONS
     ========================================================================== */
  const HERO_GREETINGS = [
    ['Hi', "Let's play and learn!", 'Cùng các bạn thú vừa chơi vừa học nhé!'],
    ['Hello', 'Ready for new words?', 'Sẵn sàng khám phá từ vựng mới chưa nào?'],
    ['Yay', 'You are doing great!', 'Bé đang học giỏi lắm đấy!']
  ];

  function triggerFriendGreet(hostId, btnEl) {
    const meta = MASCOT_META[hostId] || MASCOT_META.leo;
    if (btnEl) {
      btnEl.classList.remove('is-jumping');
      void btnEl.offsetWidth;
      btnEl.classList.add('is-jumping');
    }
    const bubbleEn = document.querySelector('#home-hero-mascot .hero-line-en');
    const bubbleVi = document.querySelector('#home-hero-mascot .hero-line-vi');
    if (bubbleEn && bubbleVi) {
      bubbleEn.textContent = meta.greetEn;
      bubbleVi.textContent = meta.greetVi;
    }
    if (typeof window.speakEnglish === 'function') {
      window.speakEnglish(meta.greetEn, 0.94);
    }
  }

  function hydrateStorybookUI() {
    // 1. Header 3D Leo Mascot Badge
    const headerMascot = document.querySelector('#btn-home-logo .mascot-badge');
    if (headerMascot) {
      headerMascot.classList.add('is-svg-mascot');
      headerMascot.innerHTML = window.renderMascotSvg('leo', 'wave', true);
    }

    // 2. 6 Main Content Hub Cards -> Full-Bleed Scenic 3D Banners
    const hubMap = [
      ['hub-btn-vocab', 'vocab'],
      ['hub-btn-srs', 'srs'],
      ['hub-btn-milestones', 'milestones'],
      ['hub-btn-stories', 'stories'],
      ['hub-btn-games', 'games'],
      ['hub-btn-phonics', 'phonics']
    ];
    hubMap.forEach(([btnId, key]) => {
      const btn = document.getElementById(btnId);
      const iconWrap = btn && btn.querySelector('.hub-icon-wrap');
      if (btn && iconWrap) {
        btn.classList.add('is-scenic-hub');
        iconWrap.classList.add('is-svg-hub', 'is-scenic-banner');
        iconWrap.innerHTML = window.renderHubIconSvg(key);
      }
    });

    // 3. 6 Mini-Game Tiles -> Full-Bleed Scenic 3D Storybook Banners
    const gameSceneMap = {
      'game-tile-memory':      { skyTop: '#FFE8A3', skyBot: '#FFF8E1', hill1: '#FCD34D', hill2: '#F59E0B', main: 'assets/art/game_cards.webp',  left: 'assets/art/mascot_leo.webp',  right: 'assets/art/hub_star.webp' },
      'game-tile-match':       { skyTop: '#BAE6FD', skyBot: '#F0F9FF', hill1: '#7DD3FC', hill2: '#38BDF8', main: 'assets/art/game_link.webp',   left: 'assets/art/word_apple.webp',  right: 'assets/art/word_cat.webp' },
      'game-tile-balloon':     { skyTop: '#FBCFE8', skyBot: '#FFF1F2', hill1: '#F9A8D4', hill2: '#EC4899', main: 'assets/art/hub_balloon.webp', left: 'assets/art/hub_star.webp',    right: 'assets/art/hub_sparkles.webp' },
      'game-tile-sorting':     { skyTop: '#A7F3D0', skyBot: '#ECFDF5', hill1: '#6EE7B7', hill2: '#10B981', main: 'assets/art/game_basket.webp', left: 'assets/art/word_apple.webp',  right: 'assets/art/hub_teddy.webp' },
      'game-tile-wordbuilder': { skyTop: '#C7D2FE', skyBot: '#EEF2FF', hill1: '#A5B4FC', hill2: '#6366F1', main: 'assets/art/hub_abc.webp',     left: 'assets/art/hub_bird.webp',    right: 'assets/art/hub_star.webp' },
      'game-tile-sentence':    { skyTop: '#DDD6FE', skyBot: '#F5F3FF', hill1: '#C4B5FD', hill2: '#8B5CF6', main: 'assets/art/game_chat.webp',   left: 'assets/art/mascot_mimi.webp', right: 'assets/art/hub_sparkles.webp' }
    };
    Object.entries(gameSceneMap).forEach(([id, s]) => {
      const tile = document.getElementById(id);
      const iconBox = tile && tile.querySelector('.game-tile-icon');
      if (tile && iconBox) {
        const g = nextUid('gm');
        tile.classList.add('is-scenic-game');
        iconBox.classList.add('is-3d-game-icon', 'is-scenic-banner');
        iconBox.innerHTML = `
          <div class="hub-scenic-banner">
            <svg class="hub-banner-bg" viewBox="0 0 300 130" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><linearGradient id="${ g }bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${ s.skyTop }"/><stop offset="100%" stop-color="${ s.skyBot }"/></linearGradient></defs>
              <rect width="300" height="130" fill="url(#${ g }bg)"/>
              <ellipse cx="150" cy="68" rx="76" ry="50" fill="#FFFFFF" opacity="0.58"/>
              <path d="M0 98 Q90 74 180 94 T300 88 L300 130 L0 130 Z" fill="${ s.hill1 }" opacity="0.58"/>
              <path d="M0 112 Q115 92 220 108 T300 104 L300 130 L0 130 Z" fill="${ s.hill2 }" opacity="0.45"/>
            </svg>
            <div class="hub-3d-cluster" aria-hidden="true">
              <img class="hub-3d-side is-left" src="${ s.left }" alt="" draggable="false" />
              <img class="hub-3d-main" src="${ s.main }" alt="" draggable="false" />
              <img class="hub-3d-side is-right" src="${ s.right }" alt="" draggable="false" />
              <span class="hub-3d-shadow"></span>
            </div>
          </div>`;
      }
    });

    // 4. Progress Metric Icons -> Crisp Local 3D Icons
    const metricIcons = [
      'assets/art/hub_books.webp',
      'assets/art/hub_brain.webp',
      'assets/art/ui_medal.webp',
      'assets/art/hub_clapper.webp'
    ];
    document.querySelectorAll('#progress-overview-card .metric-chip .m-icon').forEach((el, idx) => {
      if (metricIcons[idx]) {
        el.innerHTML = `<img class="metric-3d-img" src="${ metricIcons[idx] }" alt="" draggable="false" />`;
      }
    });

    // 5. Inject Sunlit Storybook Treehouse World Backdrop into Home Dashboard Container
    const dashGrid = document.querySelector('#view-home .home-dashboard-grid');
    if (dashGrid && !dashGrid.querySelector('.home-world-stage-bg')) {
      dashGrid.classList.add('is-storybook-world');
      const bgWrap = document.createElement('div');
      bgWrap.className = 'home-world-stage-bg';
      bgWrap.setAttribute('aria-hidden', 'true');
      bgWrap.innerHTML = renderHomeTreehouseSceneSvg();
      dashGrid.insertBefore(bgWrap, dashGrid.firstChild);

      // Add interactive 3D animal friends (Mimi, Toby, Lulu) standing right on the sunny meadow!
      const friendsBar = document.createElement('div');
      friendsBar.className = 'meadow-friends-strip';
      friendsBar.innerHTML = ['mimi', 'toby', 'lulu'].map((fid) => `
        <button type="button" class="meadow-friend-btn friend-${ fid }" data-friend="${ fid }" title="Chạm vào ${ MASCOT_META[fid].name } để nghe lời chào!">
          ${ window.renderMascotSvg(fid, 'wave', false) }
          <span class="friend-tag">${ MASCOT_META[fid].name }</span>
        </button>
      `).join('');
      dashGrid.appendChild(friendsBar);
      friendsBar.querySelectorAll('.meadow-friend-btn').forEach((btn) => {
        btn.addEventListener('click', () => triggerFriendGreet(btn.dataset.friend, btn));
      });
    }
  }

  window.refreshHomeHero = function () {
    const card = document.getElementById('recent-activity-card');
    if (!card) return;
    let hero = document.getElementById('home-hero-mascot');
    if (!hero) {
      card.classList.add('has-hero');
      hero = document.createElement('div');
      hero.className = 'home-hero';
      hero.id = 'home-hero-mascot';
      hero.innerHTML = `
        <button type="button" class="home-hero-leo" aria-label="Sư tử Leo">${ window.renderMascotSvg('leo', 'wave', false) }</button>
        <div class="home-hero-bubble">
          <strong class="hero-line-en"></strong>
          <span class="hero-line-vi"></span>
        </div>`;
      card.insertBefore(hero, card.querySelector('.recent-body'));
      hero.querySelector('.home-hero-leo').addEventListener('click', () => {
        const en = hero.querySelector('.hero-line-en').textContent;
        const leo = hero.querySelector('.home-hero-leo');
        leo.classList.remove('is-jumping');
        void leo.offsetWidth;
        leo.classList.add('is-jumping');
        if (typeof window.speakEnglish === 'function') window.speakEnglish(en, 0.92);
      });
    }
    const prof = typeof window.getActiveProfile === 'function' ? window.getActiveProfile() : null;
    const name = prof && prof.name ? prof.name : 'friend';
    const [hi, en, vi] = HERO_GREETINGS[new Date().getDate() % HERO_GREETINGS.length];
    hero.querySelector('.hero-line-en').textContent = `${ hi }, ${ name }! ${ en }`;
    hero.querySelector('.hero-line-vi').textContent = vi;
  };

  /* Montessori colors for the big flashcard word: vowels blue, consonants red */
  window.renderColorfulWord = function (word) {
    const esc = ch => ch.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return Array.from(String(word || '')).map((ch, i) => {
      if (!/[a-z]/i.test(ch)) return `<span class="cw-gap">${ esc(ch) }</span>`;
      const cls = /[aeiou]/i.test(ch) ? 'cw-vowel' : 'cw-consonant';
      return `<span class="cw-letter ${ cls }" style="animation-delay:${ i * 45 }ms">${ ch }</span>`;
    }).join('');
  };

  document.addEventListener('DOMContentLoaded', () => {
    hydrateStorybookUI();
    window.refreshHomeHero();
  });
})();
