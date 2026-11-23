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
    '1f981': 'assets/art/painted_leo.webp',
    '1f43c': 'assets/art/painted_mimi.webp',
    '1f98a': 'assets/art/painted_toby.webp',
    '1f430': 'assets/art/painted_lulu.webp',
    '1f407': 'assets/art/painted_lulu.webp',
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

  // Fluent 3D images served from this site (assets/fluent3d) so cards load instantly,
  // work offline and don't depend on a third-party mirror. Keys are code points without FE0F.
  const SELF_HOSTED_3D = new Set('1f0cf 1f17f 1f195 1f300 1f303 1f305 1f306 1f308 1f309 1f30a 1f30b 1f30c 1f30d 1f30e 1f30f 1f310 1f311 1f313 1f317 1f319 1f31e 1f31f 1f320 1f321 1f324 1f327 1f328 1f329 1f32a 1f32b 1f32c 1f32d 1f330 1f331 1f332 1f333 1f334 1f335 1f336 1f337 1f338 1f339 1f33a 1f33b 1f33c 1f33d 1f33e 1f33f 1f340 1f342 1f343 1f344 1f345 1f346 1f347 1f348 1f349 1f34a 1f34b 1f34c 1f34d 1f34e 1f350 1f351 1f352 1f353 1f354 1f355 1f357 1f35a 1f35c 1f35d 1f35e 1f35f 1f360 1f363 1f366 1f369 1f36a 1f36b 1f36c 1f36d 1f36f 1f371 1f372 1f373 1f374 1f375 1f37c 1f37d 1f37f 1f380 1f381 1f382 1f383 1f384 1f385 1f386 1f388 1f389 1f38a 1f38b 1f390 1f392 1f393 1f399 1f39b 1f39e 1f39f 1f3a0 1f3a1 1f3a4 1f3a5 1f3a7 1f3a8 1f3a9 1f3aa 1f3ab 1f3ac 1f3ad 1f3ae 1f3af 1f3b2 1f3b3 1f3b5 1f3b6 1f3b7 1f3b8 1f3b9 1f3ba 1f3bb 1f3bc 1f3be 1f3c0 1f3c1 1f3c3 1f3c4 1f3c5 1f3c6 1f3c9 1f3ca 1f3cb 1f3cd 1f3ce 1f3d0 1f3d1 1f3d3 1f3d4 1f3d5 1f3d6 1f3d7 1f3d8 1f3d9 1f3da 1f3db 1f3dc 1f3dd 1f3de 1f3df 1f3e0 1f3e1 1f3e2 1f3e3 1f3e5 1f3e6 1f3e7 1f3e8 1f3ea 1f3eb 1f3ec 1f3ed 1f3ee 1f3ef 1f3f0 1f3f3 1f3f4-200d-2620 1f3f5 1f3f7 1f3f8 1f3f9 1f3fa 1f400 1f401 1f402 1f404 1f406 1f407 1f409 1f40a 1f40b 1f40c 1f40d 1f410 1f411 1f413 1f414 1f415 1f416 1f418 1f419 1f41a 1f41b 1f41c 1f41d 1f41e 1f41f 1f420 1f421 1f422 1f423 1f425 1f426 1f427 1f428 1f42a 1f42c 1f42d 1f42e 1f42f 1f430 1f431 1f433 1f434 1f435 1f436 1f437 1f438 1f439 1f43a 1f43b 1f43b-200d-2744 1f43c 1f43e 1f43f 1f440 1f441 1f442 1f443 1f444 1f445 1f446 1f447 1f449 1f44b 1f44c 1f44d 1f44e 1f44f 1f451 1f453 1f454 1f455 1f456 1f457 1f45b 1f45c 1f45e 1f45f 1f461 1f463 1f465 1f466 1f467 1f468 1f468-200d-1f33e 1f468-200d-1f373 1f468-200d-2695 1f469 1f469-200d-1f373 1f469-200d-1f3a4 1f469-200d-1f3eb 1f469-200d-2695 1f46e 1f471-200d-2640 1f474 1f475 1f476 1f477 1f477-200d-2642 1f478 1f479 1f47b 1f47d 1f47e 1f483 1f485 1f486 1f487 1f488 1f489 1f48a 1f48d 1f48e 1f490 1f493 1f494 1f496 1f49a 1f49b 1f49c 1f49d 1f49e 1f4a0 1f4a1 1f4a4 1f4a5 1f4a6 1f4a7 1f4a8 1f4aa 1f4ab 1f4ac 1f4ad 1f4af 1f4b0 1f4b1 1f4b3 1f4b5 1f4b8 1f4b9 1f4ba 1f4bb 1f4bc 1f4be 1f4c1 1f4c2 1f4c3 1f4c4 1f4c5 1f4c6 1f4c8 1f4c9 1f4ca 1f4cb 1f4cc 1f4cd 1f4ce 1f4cf 1f4d0 1f4d1 1f4d2 1f4d3 1f4d4 1f4d6 1f4d8 1f4da 1f4db 1f4dc 1f4dd 1f4de 1f4e0 1f4e1 1f4e2 1f4e3 1f4e5 1f4e6 1f4e7 1f4e9 1f4ee 1f4ef 1f4f0 1f4f1 1f4f2 1f4f6 1f4f7 1f4f8 1f4f9 1f4fa 1f4fb 1f4ff 1f500 1f501 1f504 1f507 1f50a 1f50b 1f50c 1f50d 1f50e 1f510 1f511 1f512 1f514 1f516 1f517 1f518 1f51f 1f522 1f524 1f525 1f526 1f527 1f528 1f529 1f52a 1f52c 1f52d 1f52e 1f534 1f535 1f537 1f538 1f53a 1f54a 1f552 1f56f 1f570 1f573 1f575 1f576 1f577 1f578 1f58a 1f58b 1f58c 1f58d 1f590 1f5a5 1f5a8 1f5bc 1f5c2 1f5c4 1f5d1 1f5d3 1f5de 1f5e3 1f5ef 1f5f3 1f5fa 1f5fc 1f5fd 1f5ff 1f601 1f602 1f604 1f607 1f60a 1f60b 1f60c 1f610 1f615 1f618 1f61c 1f61f 1f620 1f622 1f624 1f628 1f62c 1f62e 1f632 1f633 1f634 1f637 1f642 1f647 1f648 1f64b 1f64c 1f64f 1f680 1f681 1f682 1f687 1f689 1f68a 1f68c 1f690 1f691 1f692 1f693 1f695 1f697 1f699 1f69a 1f69c 1f6a2 1f6a3 1f6a4 1f6a6 1f6a7 1f6a8 1f6a9 1f6aa 1f6ab 1f6b0 1f6b2 1f6b4 1f6b6 1f6b8 1f6bd 1f6bf 1f6c1 1f6c2 1f6c3 1f6cb 1f6cc 1f6cd 1f6ce 1f6cf 1f6d1 1f6d2 1f6d5 1f6d6 1f6d7 1f6dd 1f6de 1f6e0 1f6e1 1f6e2 1f6e3 1f6e4 1f6e5 1f6e9 1f6eb 1f6ec 1f6f0 1f6f3 1f6f4 1f6f6 1f6f7 1f6f8 1f6f9 1f6fc 1f7e0 1f7e2 1f7e3 1f7e4 1f7e5 1f7e6 1f7e7 1f7e8 1f7e9 1f90d 1f90f 1f910 1f912 1f914 1f915 1f916 1f917 1f919 1f91d 1f921 1f927 1f928 1f929 1f92a 1f92b 1f92d 1f930 1f932 1f934 1f938 1f93a 1f93e 1f93f 1f940 1f941 1f944 1f945 1f947 1f948 1f949 1f94a 1f94b 1f94f 1f950 1f951 1f952 1f953 1f954 1f955 1f956 1f957 1f95a 1f95b 1f95c 1f95d 1f95e 1f95f 1f962 1f963 1f964 1f965 1f966 1f967 1f968 1f969 1f96a 1f96b 1f96c 1f96d 1f971 1f97a 1f97d 1f97e 1f980 1f981 1f982 1f983 1f984 1f985 1f986 1f987 1f988 1f989 1f98a 1f98b 1f98c 1f98d 1f98e 1f98f 1f990 1f991 1f992 1f993 1f994 1f995 1f996 1f997 1f998 1f99a 1f99b 1f99c 1f99e 1f99f 1f9a0 1f9a1 1f9a2 1f9a3 1f9a5 1f9a6 1f9a9 1f9aa 1f9ab 1f9ad 1f9b4 1f9b5 1f9b6 1f9b7 1f9b8 1f9ba 1f9c0 1f9c1 1f9c2 1f9c3 1f9c4 1f9c5 1f9c7 1f9c8 1f9ca 1f9cc 1f9cd 1f9d0 1f9d1 1f9d1-200d-1f33e 1f9d1-200d-1f373 1f9d1-200d-1f393 1f9d1-200d-1f3a4 1f9d1-200d-1f3a8 1f9d1-200d-1f4bb 1f9d1-200d-1f4bc 1f9d1-200d-1f527 1f9d1-200d-1f52c 1f9d1-200d-1f680 1f9d1-200d-1f692 1f9d1-200d-2695 1f9d1-200d-2708 1f9d2 1f9d4 1f9d7 1f9d8 1f9d9 1f9da 1f9dc-200d-2640 1f9dd 1f9e0 1f9e2 1f9e3 1f9e4 1f9e5 1f9e6 1f9e9 1f9ea 1f9eb 1f9ec 1f9ed 1f9ee 1f9f0 1f9f1 1f9f2 1f9f3 1f9f4 1f9f5 1f9f6 1f9f8 1f9f9 1f9fa 1f9fb 1f9fc 1f9fd 1f9fe 1fa70 1fa71 1fa73 1fa74 1fa79 1fa7a 1fa80 1fa81 1fa82 1fa84 1fa86 1fa87 1fa88 1fa90 1fa91 1fa93 1fa94 1fa95 1fa96 1fa97 1fa98 1fa99 1fa9a 1fa9c 1fa9e 1fa9f 1faa0 1faa1 1faa2 1faa3 1faa5 1faa7 1faa8 1faae 1fab0 1fab1 1fab2 1fab3 1fab4 1fab5 1fab6 1fab7 1fab8 1fab9 1fabb 1fabc 1fabd 1fac0 1fac1 1fad0 1fad1 1fad2 1fad5 1fad6 1fad7 1fad8 1fad9 1fada 1fadb 1fae7 1faf6 1faf7 1faf8 2194 2195 21a9 231a 2328 23ed 23ee 23f0 23f1 23f3 23f8 23f9 25b6 2600 2601 2602 2604 2614 2615 2618 2622 262f 265f 2668 267b 2693 2694 2696 2697 2699 269b 26a1 26aa 26ab 26bd 26be 26c4 26c5 26c8 26cf 26d1 26d3 26ea 26f0 26f2 26f3 26f4 26f5 26f7 26f8 26fa 2702 2705 2708 2709 270a 270b 270c 270d 270f 2714 2716 2728 2744 274c 2753 2757 2764 2764-200d-1fa79 2795 2796 2797 27a1 2b05 2b06 2b07 2b1c 2b50 2b55 30-20e3 31-20e3 32-20e3 33-20e3 34-20e3 35-20e3 36-20e3 37-20e3 38-20e3 39-20e3'.split(' '));

  function selfHosted3dSrc(parsed) {
    if (SELF_HOSTED_3D.has(parsed.noFe)) return `assets/fluent3d/${ parsed.noFe }.webp`;
    return null;
  }

  function buildArtImg(emoji, imgClass = 'card-vector-img', fallbackClass = 'art-emoji-giant') {
    const parsed = parseEmojiCodepoints(emoji);
    const safeEmoji = String(emoji || '✨').replace(/"/g, '&quot;');
    if (!parsed) {
      return `<span class="${ fallbackClass }">${ safeEmoji }</span>`;
    }
    const localSrc = LOCAL_3D_BY_CODE[parsed.noFe] || LOCAL_3D_BY_CODE[parsed.full] || selfHosted3dSrc(parsed);
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
     2. HAND-PAINTED STORYBOOK CHARACTERS (Leo, Mimi, Toby, Lulu)
        Full-body transparent watercolor/gouache characters standing freely on
        meadow & stage, plus crisp zoomed face portraits for circular badges!
     ========================================================================== */
  const MASCOT_META = {
    leo:  { img: 'assets/art/painted_leo.webp',  face: 'assets/art/face_leo.webp',  name: 'Leo',  bg: 'radial-gradient(circle at 35% 28%, #FFFBEB 0%, #FDE68A 75%, #F59E0B 100%)', ring: '#F59E0B', greetEn: "Hi! I'm Leo! Let's learn new English words together!", greetVi: 'Chào bé! Cùng Sư Tử Leo học tiếng Anh thật vui nhé!' },
    mimi: { img: 'assets/art/painted_mimi.webp', face: 'assets/art/face_mimi.webp', name: 'Mimi', bg: 'radial-gradient(circle at 35% 28%, #F0FDF4 0%, #BBF7D0 75%, #22C55E 100%)', ring: '#16A34A', greetEn: "Hello! I'm Mimi! Ready for a Montessori adventure?", greetVi: 'Xin chào! Gấu Trúc Mimi sẽ cùng bé khám phá Montessori!' },
    toby: { img: 'assets/art/painted_toby.webp', face: 'assets/art/face_toby.webp', name: 'Toby', bg: 'radial-gradient(circle at 35% 28%, #FFF7ED 0%, #FED7AA 75%, #FB923C 100%)', ring: '#EA580C', greetEn: "Yay! I'm Toby! Let's count and play games!", greetVi: 'Tuyệt vời! Cáo Toby rủ bé chơi trò chơi và tập đếm nhé!' },
    lulu: { img: 'assets/art/painted_lulu.webp', face: 'assets/art/face_lulu.webp', name: 'Lulu', bg: 'radial-gradient(circle at 35% 28%, #FDF2F8 0%, #FBCFE8 75%, #F472B6 100%)', ring: '#DB2777', greetEn: "Hooray! I'm Lulu! Let's sing and practice phonics!", greetVi: 'Hoan hô! Thỏ Lulu cùng bé hát ABC và tập phát âm chuẩn nào!' }
  };

  window.renderMascotSvg = function (hostId = 'leo', mood = 'wave', compact = false) {
    const id = MASCOT_META[hostId] ? hostId : 'leo';
    const meta = MASCOT_META[id];
    const moodCls = mood === 'celebrate' ? 'mood-celebrate' : mood === 'ask' ? 'mood-ask' : 'mood-wave';

    if (compact) {
      return `
        <div class="mascot-3d-rig is-painted host-${ id } ${ moodCls } is-compact" aria-hidden="true">
          <span class="m3d-aura" style="background:${ meta.bg }; border-color:${ meta.ring };"></span>
          <img class="m3d-portrait is-face" src="${ meta.face }" alt="${ meta.name }" draggable="false" />
        </div>
      `;
    }

    const extras = mood === 'celebrate'
      ? `<img class="m3d-star m3d-star-1" src="assets/art/hub_star.webp" alt="" aria-hidden="true" />
         <img class="m3d-star m3d-star-2" src="assets/art/hub_sparkles.webp" alt="" aria-hidden="true" />`
      : (mood === 'ask' ? `<span class="m3d-ask-bubble" aria-hidden="true">?</span>` : '');

    return `
      <div class="mascot-3d-rig is-painted is-fullbody host-${ id } ${ moodCls } is-full" aria-hidden="true">
        <span class="m3d-speech-ring"></span>
        <img class="m3d-portrait is-fullbody-img" src="${ meta.img }" alt="${ meta.name }" draggable="false" />
        ${ extras }
        <span class="m3d-shadow"></span>
      </div>
    `;
  };

  /* ==========================================================================
     3. KHAN-KIDS-STYLE HAND-PAINTED HOME TREEHOUSE MEADOW WORLD
     ========================================================================== */
  function renderHomeTreehouseSceneSvg() {
    return `<img class="home-world-painted" src="assets/art/painted_home_meadow.webp" alt="" draggable="false" aria-hidden="true" />`;
  }

  /* ==========================================================================
     4. 6 FULL-BLEED HAND-PAINTED STORYBOOK HUB CARD ILLUSTRATIONS
     ========================================================================== */
  const PAINTED_HUB_ART = {
    vocab:      'assets/art/painted_hub_vocab.webp',
    srs:        'assets/art/painted_hub_srs.webp',
    milestones: 'assets/art/painted_hub_milestones.webp',
    stories:    'assets/art/painted_hub_stories.webp',
    games:      'assets/art/painted_hub_games.webp',
    phonics:    'assets/art/painted_hub_phonics.webp'
  };

  window.renderHubIconSvg = function (hubKey) {
    const src = PAINTED_HUB_ART[hubKey] || PAINTED_HUB_ART.vocab;
    return `
      <div class="hub-scenic-banner is-painted-banner hub-scene-${ hubKey }">
        <img class="hub-painted-img" src="${ src }" alt="" draggable="false" aria-hidden="true" />
        <span class="hub-painted-sheen" aria-hidden="true"></span>
      </div>
    `;
  };

  /* ==========================================================================
     5. FULL-BLEED HAND-PAINTED STORYBOOK VIDEO BACKDROPS (All 24 Episodes)
     ========================================================================== */
  const PAINTED_STORY_BG = {
    zoo:       'assets/art/painted_bg_zoo.webp',
    room:      'assets/art/painted_bg_montessori.webp',
    home:      'assets/art/painted_bg_montessori.webp',
    lab:       'assets/art/painted_bg_montessori.webp',
    ocean:     'assets/art/painted_bg_ocean.webp',
    farm:      'assets/art/painted_home_meadow.webp',
    weather:   'assets/art/painted_home_meadow.webp',
    park:      'assets/art/painted_home_meadow.webp',
    eco:       'assets/art/painted_hub_srs.webp',
    music:     'assets/art/painted_hub_phonics.webp',
    art:       'assets/art/painted_hub_vocab.webp',
    bakery:    'assets/art/painted_hub_stories.webp',
    market:    'assets/art/painted_hub_games.webp',
    city:      'assets/art/painted_hub_milestones.webp',
    summit:    'assets/art/painted_hub_milestones.webp',
    detective: 'assets/art/painted_hub_srs.webp',
    future:    'assets/art/painted_hub_milestones.webp'
  };

  window.renderStoryBackdropSvg = function (theme = 'zoo') {
    if (PAINTED_STORY_BG[theme]) {
      return `<img class="story-bg-painted" src="${ PAINTED_STORY_BG[theme] }" alt="" loading="lazy" decoding="async" draggable="false" aria-hidden="true" />`;
    }
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
    hard: `<polygon points="20,88 30,32 64,22 96,42 100,88" fill="#64748B" stroke="#334155" stroke-width="4.5" stroke-linejoin="round"/><polygon points="36,40 62,30 78,46 48,54" fill="#94A3B8" opacity="0.65"/>`,

    // Storybook custom illustrated elements (Three Little Pigs houses, Jack's beanstalk & harp, Lion's net, Clock tower)
    'svg:straw_house': `<g>
      <ellipse cx="60" cy="108" rx="46" ry="7" fill="rgba(15,23,42,0.18)"/>
      <rect x="24" y="54" width="72" height="52" rx="6" fill="#FDE68A" stroke="#D97706" stroke-width="3.5"/>
      <path d="M28 66 H92 M28 78 H92 M28 90 H92" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 4"/>
      <polygon points="12,58 60,16 108,58" fill="#FBBF24" stroke="#B45309" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M60 18 L30 56 M60 18 L48 56 M60 18 L72 56 M60 18 L90 56" stroke="#D97706" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="49" y="72" width="22" height="34" rx="10" fill="#B45309" stroke="#78350F" stroke-width="3"/>
      <circle cx="65" cy="89" r="2.3" fill="#FEF08A"/>
    </g>`,
    'svg:stick_house': `<g>
      <ellipse cx="60" cy="108" rx="46" ry="7" fill="rgba(15,23,42,0.18)"/>
      <rect x="22" y="52" width="76" height="54" rx="5" fill="#A16207" stroke="#451A03" stroke-width="3.5"/>
      <g stroke="#78350F" stroke-width="4" stroke-linecap="round">
        <line x1="25" y1="62" x2="95" y2="62"/><line x1="25" y1="73" x2="95" y2="73"/><line x1="25" y1="84" x2="95" y2="84"/><line x1="25" y1="95" x2="95" y2="95"/>
      </g>
      <polygon points="12,56 60,16 108,56" fill="#854D0E" stroke="#451A03" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M26 48 L60 22 L94 48" fill="none" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/>
      <rect x="49" y="72" width="22" height="34" rx="4" fill="#713F12" stroke="#451A03" stroke-width="3"/>
      <rect x="30" y="66" width="13" height="13" rx="2" fill="#FEF08A" stroke="#451A03" stroke-width="2.5"/>
    </g>`,
    'svg:brick_house': `<g>
      <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(15,23,42,0.22)"/>
      <rect x="76" y="16" width="16" height="28" rx="2" fill="#B91C1C" stroke="#7F1D1D" stroke-width="3"/>
      <rect x="20" y="50" width="80" height="56" rx="5" fill="#DC2626" stroke="#7F1D1D" stroke-width="3.5"/>
      <g stroke="#FCA5A5" stroke-width="2" opacity="0.85">
        <line x1="22" y1="62" x2="98" y2="62"/><line x1="22" y1="74" x2="98" y2="74"/><line x1="22" y1="86" x2="98" y2="86"/><line x1="22" y1="98" x2="98" y2="98"/>
        <line x1="42" y1="50" x2="42" y2="62"/><line x1="74" y1="50" x2="74" y2="62"/>
        <line x1="32" y1="62" x2="32" y2="74"/><line x1="60" y1="62" x2="60" y2="74"/><line x1="86" y1="62" x2="86" y2="74"/>
        <line x1="40" y1="74" x2="40" y2="86"/><line x1="78" y1="74" x2="78" y2="86"/>
      </g>
      <polygon points="10,54 60,16 110,54" fill="#991B1B" stroke="#450A0A" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="48" y="70" width="24" height="36" rx="11" fill="#78350F" stroke="#451A03" stroke-width="3.5"/>
      <circle cx="66" cy="88" r="2.6" fill="#FACC15"/>
      <rect x="27" y="64" width="15" height="15" rx="3" fill="#FEF08A" stroke="#7F1D1D" stroke-width="2.5"/>
      <rect x="78" y="64" width="15" height="15" rx="3" fill="#FEF08A" stroke="#7F1D1D" stroke-width="2.5"/>
    </g>`,
    'svg:beanstalk': `<g>
      <ellipse cx="60" cy="264" rx="34" ry="6" fill="rgba(20,83,45,0.28)"/>
      <path d="M54 264 C26 226, 86 192, 48 152 C24 122, 84 88, 52 46 C38 26, 68 12, 58 2" fill="none" stroke="#166534" stroke-width="15" stroke-linecap="round"/>
      <path d="M54 264 C26 226, 86 192, 48 152 C24 122, 84 88, 52 46 C38 26, 68 12, 58 2" fill="none" stroke="#22C55E" stroke-width="9" stroke-linecap="round"/>
      <path d="M66 264 C92 224, 32 188, 70 148 C94 118, 34 84, 68 44 C82 26, 52 10, 62 2" fill="none" stroke="#15803D" stroke-width="12" stroke-linecap="round"/>
      <path d="M66 264 C92 224, 32 188, 70 148 C94 118, 34 84, 68 44 C82 26, 52 10, 62 2" fill="none" stroke="#4ADE80" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M40 218 C14 210, 12 194, 24 196 C30 198, 28 206, 20 205" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 134 C104 126, 108 110, 94 112 C88 114, 90 122, 98 120" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M48 242 C16 238, 10 214, 38 210 C48 209, 52 226, 48 242 Z" fill="#4ADE80" stroke="#14532D" stroke-width="2.6"/>
      <path d="M46 236 L26 220" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M70 212 C104 206, 110 182, 80 180 C70 180, 66 196, 70 212 Z" fill="#22C55E" stroke="#14532D" stroke-width="2.6"/>
      <path d="M72 204 L94 190" stroke="#14532D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M46 176 C12 170, 8 144, 38 142 C48 142, 52 160, 46 176 Z" fill="#4ADE80" stroke="#14532D" stroke-width="2.6"/>
      <path d="M44 168 L22 152" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M72 146 C106 140, 110 116, 80 114 C70 114, 66 130, 72 146 Z" fill="#22C55E" stroke="#14532D" stroke-width="2.6"/>
      <path d="M74 138 L94 124" stroke="#14532D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M46 110 C14 104, 10 80, 38 78 C48 78, 52 94, 46 110 Z" fill="#4ADE80" stroke="#14532D" stroke-width="2.6"/>
      <path d="M44 102 L24 88" stroke="#15803D" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M70 76 C102 70, 106 48, 78 46 C68 46, 64 62, 70 76 Z" fill="#22C55E" stroke="#14532D" stroke-width="2.6"/>
      <path d="M48 44 C20 38, 16 18, 42 16 C50 16, 54 30, 48 44 Z" fill="#86EFAC" stroke="#14532D" stroke-width="2.4"/>
      <path d="M68 26 C92 22, 96 6, 74 6 C66 6, 64 16, 68 26 Z" fill="#86EFAC" stroke="#14532D" stroke-width="2.2"/>
      <circle cx="38" cy="182" r="4.5" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/>
      <circle cx="82" cy="96" r="4.5" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/>
      <circle cx="44" cy="54" r="4" fill="#FEF9C3" stroke="#CA8A04" stroke-width="1.5"/>
    </g>`,
    'svg:golden_harp': `<g>
      <ellipse cx="58" cy="108" rx="32" ry="6" fill="rgba(15,23,42,0.18)"/>
      <g stroke="#FEF08A" stroke-width="2">
        <line x1="42" y1="26" x2="42" y2="94"/><line x1="50" y1="30" x2="50" y2="94"/><line x1="58" y1="32" x2="58" y2="92"/><line x1="66" y1="32" x2="66" y2="88"/><line x1="74" y1="32" x2="74" y2="80"/>
      </g>
      <path d="M32 100 L32 20 C48 16, 66 32, 88 22 C92 52, 76 88, 56 100 Z" fill="none" stroke="#D97706" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M32 100 L32 20 C48 16, 66 32, 88 22 C92 52, 76 88, 56 100 Z" fill="none" stroke="#FDE047" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
      <rect x="24" y="96" width="44" height="10" rx="5" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
      <circle cx="32" cy="19" r="5" fill="#FEF08A" stroke="#B45309" stroke-width="1.8"/>
    </g>`,
    'svg:rope_net': `<g>
      <rect x="14" y="18" width="92" height="84" rx="14" fill="rgba(180,83,9,0.12)" stroke="#B45309" stroke-width="5" stroke-dasharray="10 6"/>
      <g stroke="#D97706" stroke-width="3.5" stroke-linecap="round">
        <line x1="22" y1="26" x2="98" y2="94"/><line x1="46" y1="20" x2="102" y2="72"/><line x1="18" y1="50" x2="74" y2="100"/>
        <line x1="98" y1="26" x2="22" y2="94"/><line x1="74" y1="20" x2="18" y2="72"/><line x1="102" y1="50" x2="46" y2="100"/>
      </g>
      <g fill="#F59E0B" stroke="#78350F" stroke-width="2">
        <circle cx="60" cy="60" r="5"/><circle cx="42" cy="44" r="4.5"/><circle cx="78" cy="44" r="4.5"/><circle cx="42" cy="76" r="4.5"/><circle cx="78" cy="76" r="4.5"/>
      </g>
    </g>`,
    'svg:red_hood_girl': `<g>
      <ellipse cx="60" cy="112" rx="26" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <rect x="47" y="94" width="9" height="14" rx="4.5" fill="#7C2D12"/><rect x="64" y="94" width="9" height="14" rx="4.5" fill="#7C2D12"/>
      <ellipse cx="51" cy="108" rx="7" ry="4" fill="#5C2D18"/><ellipse cx="69" cy="108" rx="7" ry="4" fill="#5C2D18"/>
      <path d="M27 98 C29 66, 40 53, 60 53 C80 53, 91 66, 93 98 Q60 104 27 98 Z" fill="#DC2626" stroke="#881337" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M35 97 C38 72, 46 60, 60 60 C74 60, 82 72, 85 97 Z" fill="#B91C1C" opacity="0.35"/>
      <path d="M46 66 L39 98 Q60 102 81 98 L74 66 Z" fill="#FFFDF7" stroke="#A16207" stroke-width="1.8"/>
      <path d="M44 65 Q60 72 76 65" fill="none" stroke="#991B1B" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M60 68 L54 78 M60 68 L66 78" stroke="#991B1B" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="38" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="82" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <path d="M34 44 C34 20, 48 12, 60 12 C72 12, 86 20, 86 44 C86 58, 76 64, 60 64 C44 64, 34 58, 34 44 Z" fill="#EF4444" stroke="#881337" stroke-width="2.4"/>
      <ellipse cx="44" cy="54" rx="5" ry="9" fill="#854D27" stroke="#5C3116" stroke-width="1.6"/>
      <ellipse cx="76" cy="54" rx="5" ry="9" fill="#854D27" stroke="#5C3116" stroke-width="1.6"/>
      <circle cx="60" cy="41" r="17.5" fill="#FDE6C9" stroke="#9A5B36" stroke-width="2"/>
      <path d="M43 37 C46 25, 55 24, 60 31 C65 24, 74 25, 77 37 C72 30, 48 30, 43 37 Z" fill="#7C4321"/>
      <ellipse cx="53" cy="41" rx="2.4" ry="2.8" fill="#291B12"/><ellipse cx="67" cy="41" rx="2.4" ry="2.8" fill="#291B12"/>
      <circle cx="52.2" cy="39.8" r="0.9" fill="#FFF"/><circle cx="66.2" cy="39.8" r="0.9" fill="#FFF"/>
      <ellipse cx="47.5" cy="46.5" rx="3.4" ry="2" fill="#FDA4AF" opacity="0.78"/>
      <ellipse cx="72.5" cy="46.5" rx="3.4" ry="2" fill="#FDA4AF" opacity="0.78"/>
      <path d="M55 49 Q60 53.5 65 49" fill="none" stroke="#9A3412" stroke-width="2" stroke-linecap="round"/>
    </g>`,
    'svg:jack_boy': `<g>
      <ellipse cx="60" cy="112" rx="25" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <rect x="46" y="84" width="11" height="22" rx="5" fill="#2563EB" stroke="#1E3A8A" stroke-width="2.1"/>
      <rect x="63" y="84" width="11" height="22" rx="5" fill="#2563EB" stroke="#1E3A8A" stroke-width="2.1"/>
      <ellipse cx="51" cy="107" rx="7.5" ry="4.2" fill="#78350F" stroke="#451A03" stroke-width="1.6"/>
      <ellipse cx="69" cy="107" rx="7.5" ry="4.2" fill="#78350F" stroke="#451A03" stroke-width="1.6"/>
      <path d="M38 60 C38 54, 82 54, 82 60 L84 86 Q60 90 36 86 Z" fill="#22C55E" stroke="#166534" stroke-width="2.2"/>
      <path d="M47 55 L60 66 L73 55" fill="#FEF3C7" stroke="#166534" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="37" y="76" width="46" height="5.5" rx="2" fill="#854D27"/>
      <rect x="55" y="74.5" width="10" height="8.5" rx="2" fill="#FACC15" stroke="#92400E" stroke-width="1.5"/>
      <path d="M38 62 L28 73" stroke="#16A34A" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M82 62 L92 73" stroke="#16A34A" stroke-width="7.5" stroke-linecap="round"/>
      <circle cx="27" cy="75" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="93" cy="75" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="60" cy="36" r="19" fill="#FDE6C9" stroke="#9A5B36" stroke-width="2"/>
      <path d="M40 34 C38 15, 54 11, 63 14 C76 11, 83 22, 80 35 C74 25, 65 28, 59 24 C53 28, 45 25, 40 34 Z" fill="#B45309" stroke="#78350F" stroke-width="2"/>
      <ellipse cx="53" cy="37" rx="2.5" ry="2.9" fill="#291B12"/><ellipse cx="67" cy="37" rx="2.5" ry="2.9" fill="#291B12"/>
      <circle cx="52.2" cy="35.8" r="0.9" fill="#FFF"/><circle cx="66.2" cy="35.8" r="0.9" fill="#FFF"/>
      <ellipse cx="47.5" cy="42.5" rx="3.3" ry="2" fill="#FDA4AF" opacity="0.75"/>
      <ellipse cx="72.5" cy="42.5" rx="3.3" ry="2" fill="#FDA4AF" opacity="0.75"/>
      <path d="M54 45.5 Q60 50 66 45.5" fill="none" stroke="#9A3412" stroke-width="2.1" stroke-linecap="round"/>
    </g>`,
    'svg:big_wolf': `<g>
      <ellipse cx="60" cy="112" rx="32" ry="5.5" fill="rgba(15,23,42,0.22)"/>
      <path d="M80 86 Q106 68 102 94 Q93 105 78 96 Z" fill="#64748B" stroke="#334155" stroke-width="2.4"/>
      <path d="M96 80 Q101 86 96 94" fill="none" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="43" y="85" width="11" height="22" rx="5" fill="#475569" stroke="#1E293B" stroke-width="2.2"/>
      <rect x="66" y="85" width="11" height="22" rx="5" fill="#475569" stroke="#1E293B" stroke-width="2.2"/>
      <path d="M36 90 C34 58, 44 50, 60 50 C76 50, 86 58, 84 90 Q60 95 36 90 Z" fill="#64748B" stroke="#334155" stroke-width="2.4"/>
      <ellipse cx="60" cy="72" rx="14" ry="16" fill="#E2E8F0"/>
      <polygon points="36,36 41,11 54,28" fill="#64748B" stroke="#334155" stroke-width="2.4" stroke-linejoin="round"/>
      <polygon points="41,31 43,18 50,28" fill="#FDA4AF" opacity="0.7"/>
      <polygon points="84,36 79,11 66,28" fill="#64748B" stroke="#334155" stroke-width="2.4" stroke-linejoin="round"/>
      <polygon points="79,31 77,18 70,28" fill="#FDA4AF" opacity="0.7"/>
      <path d="M37 40 C37 22, 83 22, 83 40 C83 54, 72 58, 60 58 C48 58, 37 54, 37 40 Z" fill="#64748B" stroke="#334155" stroke-width="2.4"/>
      <ellipse cx="60" cy="46" rx="14" ry="9.5" fill="#F1F5F9" stroke="#475569" stroke-width="1.8"/>
      <path d="M46 30 L56 33 M74 30 L64 33" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="52" cy="36" r="3.4" fill="#FDE047" stroke="#1E293B" stroke-width="1.4"/>
      <circle cx="68" cy="36" r="3.4" fill="#FDE047" stroke="#1E293B" stroke-width="1.4"/>
      <circle cx="52" cy="36" r="1.6" fill="#0F172A"/><circle cx="68" cy="36" r="1.6" fill="#0F172A"/>
      <ellipse cx="60" cy="43" rx="4.8" ry="3.2" fill="#1E293B"/>
      <path d="M51 50 Q60 54 69 50" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
    </g>`,
    'svg:wolf_in_bed': `<g>
      <ellipse cx="70" cy="112" rx="58" ry="6" fill="rgba(15,23,42,0.24)"/>
      <rect x="10" y="48" width="12" height="60" rx="5" fill="#854D27" stroke="#451A03" stroke-width="2.4"/>
      <rect x="118" y="68" width="12" height="40" rx="5" fill="#854D27" stroke="#451A03" stroke-width="2.4"/>
      <rect x="18" y="76" width="104" height="28" rx="6" fill="#92400E" stroke="#451A03" stroke-width="2.4"/>
      <ellipse cx="42" cy="66" rx="22" ry="13" fill="#FFFDF7" stroke="#CBD5E1" stroke-width="2.2"/>
      <path d="M26 42 C24 20, 72 18, 70 42 Q48 47 26 42 Z" fill="#FCE7F3" stroke="#F472B6" stroke-width="2.4"/>
      <circle cx="30" cy="40" r="4" fill="#FCE7F3" stroke="#F472B6" stroke-width="1.6"/>
      <circle cx="66" cy="40" r="4" fill="#FCE7F3" stroke="#F472B6" stroke-width="1.6"/>
      <polygon points="34,36 31,12 46,27" fill="#64748B" stroke="#334155" stroke-width="2.4" stroke-linejoin="round"/>
      <polygon points="60,34 66,12 50,26" fill="#64748B" stroke="#334155" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="49" cy="48" r="18" fill="#64748B" stroke="#334155" stroke-width="2.4"/>
      <ellipse cx="56" cy="54" rx="13" ry="8.5" fill="#F1F5F9" stroke="#475569" stroke-width="1.8"/>
      <circle cx="44" cy="44" r="5.2" fill="#FEF9C3" stroke="#334155" stroke-width="1.8"/>
      <circle cx="57" cy="44" r="5.2" fill="#FEF9C3" stroke="#334155" stroke-width="1.8"/>
      <line x1="49.2" y1="44" x2="51.8" y2="44" stroke="#334155" stroke-width="1.8"/>
      <circle cx="44" cy="44" r="2.2" fill="#0F172A"/><circle cx="57" cy="44" r="2.2" fill="#0F172A"/>
      <ellipse cx="63" cy="52" rx="4.2" ry="2.8" fill="#1E293B"/>
      <path d="M28 70 Q72 55 120 72 L120 98 L28 98 Z" fill="#F43F5E" stroke="#9F1239" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M36 74 H114 M36 86 H114 M54 66 V98 M78 65 V98 M100 68 V98" stroke="#FECDD3" stroke-width="2" opacity="0.82"/>
      <rect x="55" y="74" width="22" height="12" fill="#FBBF24" opacity="0.72"/>
      <rect x="79" y="86" width="20" height="10" fill="#60A5FA" opacity="0.65"/>
    </g>`,
    'svg:brown_puppy': `<g>
      <ellipse cx="60" cy="110" rx="34" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <path d="M84 74 C98 62, 108 66, 98 80" fill="none" stroke="#B45309" stroke-width="7.5" stroke-linecap="round"/>
      <rect x="35" y="82" width="11" height="23" rx="5.5" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
      <rect x="70" y="82" width="11" height="23" rx="5.5" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
      <ellipse cx="40.5" cy="105" rx="6.5" ry="3.5" fill="#FEF3C7" stroke="#78350F" stroke-width="1.6"/>
      <ellipse cx="75.5" cy="105" rx="6.5" ry="3.5" fill="#FEF3C7" stroke="#78350F" stroke-width="1.6"/>
      <ellipse cx="60" cy="76" rx="28" ry="18" fill="#F59E0B" stroke="#78350F" stroke-width="2.4"/>
      <ellipse cx="56" cy="81" rx="14" ry="9" fill="#FEF3C7" opacity="0.72"/>
      <rect x="38" y="54" width="26" height="8" rx="4" fill="#EF4444" stroke="#991B1B" stroke-width="1.8"/>
      <circle cx="51" cy="64" r="4.2" fill="#FACC15" stroke="#92400E" stroke-width="1.6"/>
      <ellipse cx="26" cy="45" rx="8.5" ry="17" fill="#92400E" stroke="#5C2D18" stroke-width="2" transform="rotate(14 26 45)"/>
      <ellipse cx="64" cy="45" rx="8.5" ry="17" fill="#92400E" stroke="#5C2D18" stroke-width="2" transform="rotate(-14 64 45)"/>
      <circle cx="45" cy="41" r="19" fill="#F59E0B" stroke="#78350F" stroke-width="2.4"/>
      <ellipse cx="45" cy="48.5" rx="12" ry="8.5" fill="#FFFBEB"/>
      <ellipse cx="38" cy="38.5" rx="2.8" ry="3.2" fill="#291B12"/><ellipse cx="52" cy="38.5" rx="2.8" ry="3.2" fill="#291B12"/>
      <circle cx="37.2" cy="37.2" r="1.1" fill="#FFF"/><circle cx="51.2" cy="37.2" r="1.1" fill="#FFF"/>
      <ellipse cx="33" cy="44" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.72"/><ellipse cx="57" cy="44" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.72"/>
      <ellipse cx="45" cy="45.5" rx="4.2" ry="2.9" fill="#291B12"/>
      <path d="M40 51.5 Q45 55.5 50 51.5" fill="none" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="45" cy="55.5" rx="3.2" ry="3.8" fill="#FB7185"/>
    </g>`,
    'svg:giant_ogre': `<g>
      <ellipse cx="60" cy="112" rx="36" ry="6" fill="rgba(15,23,42,0.24)"/>
      <rect x="38" y="84" width="15" height="24" rx="6" fill="#78350F" stroke="#451A03" stroke-width="2.4"/>
      <rect x="67" y="84" width="15" height="24" rx="6" fill="#78350F" stroke="#451A03" stroke-width="2.4"/>
      <path d="M26 56 C26 46, 94 46, 94 56 L92 86 Q60 92 28 86 Z" fill="#B45309" stroke="#5C2D18" stroke-width="2.6"/>
      <path d="M44 48 L60 64 L76 48" fill="#FEF3C7" stroke="#5C2D18" stroke-width="2" stroke-linejoin="round"/>
      <rect x="27" y="75" width="66" height="7" rx="2" fill="#451A03"/>
      <rect x="53" y="72.5" width="14" height="12" rx="2.5" fill="#FACC15" stroke="#92400E" stroke-width="1.6"/>
      <circle cx="22" cy="68" r="7.5" fill="#FDBA74" stroke="#9A3412" stroke-width="2.1"/>
      <circle cx="98" cy="68" r="7.5" fill="#FDBA74" stroke="#9A3412" stroke-width="2.1"/>
      <circle cx="60" cy="31" r="20.5" fill="#FDBA74" stroke="#9A3412" stroke-width="2.4"/>
      <path d="M40 34 C40 53, 80 53, 80 34 C74 39, 46 39, 40 34 Z" fill="#78350F"/>
      <path d="M45 21 L56 26 M75 21 L64 26" stroke="#451A03" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="52" cy="29.5" r="2.8" fill="#1E293B"/><circle cx="68" cy="29.5" r="2.8" fill="#1E293B"/>
      <path d="M52 40 Q60 36 68 40" fill="none" stroke="#FFFBEB" stroke-width="2.5" stroke-linecap="round"/>
    </g>`,
    'svg:woodcutter': `<g>
      <ellipse cx="60" cy="112" rx="26" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <rect x="45" y="84" width="11" height="23" rx="5" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="2.1"/>
      <rect x="64" y="84" width="11" height="23" rx="5" fill="#1D4ED8" stroke="#1E3A8A" stroke-width="2.1"/>
      <ellipse cx="50" cy="107" rx="7.5" ry="4" fill="#5C2D18"/><ellipse cx="70" cy="107" rx="7.5" ry="4" fill="#5C2D18"/>
      <rect x="35" y="53" width="50" height="35" rx="11" fill="#DC2626" stroke="#881337" stroke-width="2.3"/>
      <path d="M48 53 V88 M72 53 V88 M35 67 H85 M35 78 H85" stroke="#991B1B" stroke-width="2" opacity="0.72"/>
      <circle cx="31" cy="72" r="5.2" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="89" cy="72" r="5.2" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="60" cy="35" r="18.5" fill="#FDE6C9" stroke="#9A5B36" stroke-width="2"/>
      <path d="M42 38 C43 54, 77 54, 78 38 C72 43, 48 43, 42 38 Z" fill="#78350F"/>
      <path d="M38 25 C43 11, 77 11, 82 25 Q60 29 38 25 Z" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
      <ellipse cx="53" cy="33" rx="2.4" ry="2.8" fill="#291B12"/><ellipse cx="67" cy="33" rx="2.4" ry="2.8" fill="#291B12"/>
      <circle cx="52.2" cy="31.8" r="0.9" fill="#FFF"/><circle cx="66.2" cy="31.8" r="0.9" fill="#FFF"/>
      <path d="M54 42 Q60 46 66 42" fill="none" stroke="#FFFBEB" stroke-width="2.1" stroke-linecap="round"/>
    </g>`,
    'svg:grandmother': `<g>
      <ellipse cx="60" cy="112" rx="27" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <path d="M30 104 C33 64, 43 54, 60 54 C77 54, 87 64, 90 104 Q60 109 30 104 Z" fill="#4F7CAC" stroke="#2C4C73" stroke-width="2.3"/>
      <path d="M46 68 L40 104 Q60 107 80 104 L74 68 Z" fill="#EFF6FF" stroke="#3B6998" stroke-width="1.6"/>
      <path d="M45 57 Q60 70 75 57" fill="#FFFDF7" stroke="#3B6998" stroke-width="2"/>
      <circle cx="36" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="84" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="60" cy="18" r="9.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
      <circle cx="60" cy="38" r="18.5" fill="#FDE6C9" stroke="#9A5B36" stroke-width="2"/>
      <path d="M41 37 C41 19, 79 19, 79 37 C72 28, 48 28, 41 37 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.8"/>
      <circle cx="53" cy="39" r="5.5" fill="rgba(255,255,255,0.45)" stroke="#64748B" stroke-width="1.8"/>
      <circle cx="67" cy="39" r="5.5" fill="rgba(255,255,255,0.45)" stroke="#64748B" stroke-width="1.8"/>
      <line x1="58.5" y1="39" x2="61.5" y2="39" stroke="#64748B" stroke-width="1.8"/>
      <circle cx="53" cy="39" r="2.2" fill="#291B12"/><circle cx="67" cy="39" r="2.2" fill="#291B12"/>
      <ellipse cx="46.5" cy="45" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.72"/><ellipse cx="73.5" cy="45" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.72"/>
      <path d="M54 48 Q60 52.5 66 48" fill="none" stroke="#9A3412" stroke-width="2" stroke-linecap="round"/>
    </g>`,
    'svg:mother_woman': `<g>
      <ellipse cx="60" cy="112" rx="27" ry="5.5" fill="rgba(30,27,75,0.20)"/>
      <path d="M31 104 C34 64, 44 54, 60 54 C76 54, 86 64, 89 104 Q60 109 31 104 Z" fill="#0EA5E9" stroke="#0369A1" stroke-width="2.3"/>
      <path d="M46 68 L41 104 Q60 107 79 104 L74 68 Z" fill="#FFFDF7" stroke="#0284C7" stroke-width="1.7"/>
      <circle cx="36" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <circle cx="84" cy="79" r="5" fill="#FDE3C3" stroke="#9A5B36" stroke-width="1.8"/>
      <ellipse cx="60" cy="37" rx="22" ry="20" fill="#7C4321" stroke="#5C2D18" stroke-width="2"/>
      <circle cx="60" cy="37" r="18" fill="#FDE6C9" stroke="#9A5B36" stroke-width="2"/>
      <path d="M42 35 C44 19, 76 19, 78 35 C71 26, 49 26, 42 35 Z" fill="#7C4321"/>
      <ellipse cx="53" cy="38" rx="2.4" ry="2.8" fill="#291B12"/><ellipse cx="67" cy="38" rx="2.4" ry="2.8" fill="#291B12"/>
      <circle cx="52.2" cy="36.8" r="0.9" fill="#FFF"/><circle cx="66.2" cy="36.8" r="0.9" fill="#FFF"/>
      <ellipse cx="47.5" cy="43.5" rx="3.2" ry="1.9" fill="#FDA4AF" opacity="0.78"/>
      <ellipse cx="72.5" cy="43.5" rx="3.2" ry="1.9" fill="#FDA4AF" opacity="0.78"/>
      <path d="M54 46.5 Q60 51 66 46.5" fill="none" stroke="#9A3412" stroke-width="2" stroke-linecap="round"/>
    </g>`,
    'svg:clock_tower': `<g>
      <ellipse cx="60" cy="180" rx="42" ry="5" fill="rgba(15,23,42,0.25)"/>
      <rect x="24" y="138" width="72" height="40" rx="4" fill="#E7E5E4" stroke="#78716C" stroke-width="2.5"/>
      <path d="M26 150 H94 M26 164 H94 M48 138 V150 M72 138 V150 M38 150 V164 M82 150 V164" stroke="#A8A29E" stroke-width="1.5" opacity="0.7"/>
      <rect x="48" y="148" width="24" height="30" rx="12" fill="#854D27" stroke="#451A03" stroke-width="2.2"/>
      <circle cx="66" cy="164" r="2.2" fill="#FACC15"/>
      <rect x="32" y="54" width="56" height="86" rx="3" fill="#FDE68A" stroke="#92400E" stroke-width="2.6"/>
      <rect x="36" y="54" width="48" height="86" fill="#F59E0B" opacity="0.24"/>
      <rect x="26" y="50" width="68" height="9" rx="3" fill="#D97706" stroke="#78350F" stroke-width="2.2"/>
      <polygon points="22,52 60,12 98,52" fill="#B45309" stroke="#5C2D18" stroke-width="2.8" stroke-linejoin="round"/>
      <line x1="60" y1="2" x2="60" y2="14" stroke="#78350F" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="60" cy="9" r="4" fill="#FACC15" stroke="#78350F" stroke-width="1.8"/>
      <circle cx="60" cy="86" r="21" fill="#FFFDF7" stroke="#92400E" stroke-width="3.2"/>
      <circle cx="60" cy="86" r="17" fill="none" stroke="#F59E0B" stroke-width="1.6" stroke-dasharray="2 4.2"/>
      <line x1="60" y1="86" x2="60" y2="73" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
      <line x1="60" y1="86" x2="71" y2="86" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="60" cy="86" r="3" fill="#78350F"/>
      <rect x="46" y="114" width="11" height="17" rx="5.5" fill="#78350F" stroke="#451A03" stroke-width="1.8"/>
      <rect x="63" y="114" width="11" height="17" rx="5.5" fill="#78350F" stroke="#451A03" stroke-width="1.8"/>
    </g>`,
    'svg:galaxy_swirl': `<g>
      <circle cx="60" cy="60" r="44" fill="rgba(167,139,250,0.18)"/>
      <circle cx="60" cy="60" r="30" fill="rgba(251,191,36,0.18)"/>
      <path d="M60 60 C72 44, 96 48, 94 68 C92 92, 54 102, 34 86 C16 70, 22 36, 46 24 C68 14, 94 24, 102 42" fill="none" stroke="#C4B5FD" stroke-width="5.5" stroke-linecap="round" opacity="0.85"/>
      <path d="M60 60 C48 76, 24 72, 26 52 C28 28, 66 18, 86 34 C104 50, 98 84, 74 96" fill="none" stroke="#93C5FD" stroke-width="4.5" stroke-linecap="round" opacity="0.8"/>
      <circle cx="60" cy="60" r="10" fill="#FEF08A"/>
      <circle cx="60" cy="60" r="5" fill="#FFFFFF"/>
      <path d="M30 34 L34 34 M32 32 L32 36" stroke="#FEF08A" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M88 80 L94 80 M91 77 L91 83" stroke="#FEF08A" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="84" cy="36" r="2.6" fill="#FDE047"/>
      <circle cx="38" cy="84" r="2.4" fill="#E0E7FF"/>
      <circle cx="96" cy="58" r="2" fill="#FFFFFF"/>
    </g>`
  };

  const SVG_VIEWBOXES = {
    'svg:beanstalk': '0 0 120 270',
    'svg:clock_tower': '0 0 120 185',
    'svg:wolf_in_bed': '0 0 140 120'
  };

  /* ==========================================================================
     7. UNIFIED 3D ARTWORK RENDERERS (Flashcards, Montessori, Stories, Games)
     ========================================================================== */
  window.renderEmojiArt = function (emoji, wordHint = '', sizeClass = 'md') {
    const key = String(wordHint || '').toLowerCase().trim();
    if (key && PEDAGOGICAL_3D_SVGS[key]) {
      const vb = SVG_VIEWBOXES[key] || '0 0 120 120';
      return `<svg class="custom-card-svg size-${ sizeClass }" viewBox="${ vb }" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ PEDAGOGICAL_3D_SVGS[key] }</svg>`;
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

    // 3. 6 Mini-Game Tiles -> Hand-Painted Storybook Backdrop + 3D Game Cluster
    const gameSceneMap = {
      'game-tile-memory':      { bg: 'assets/art/painted_hub_vocab.webp',      main: 'assets/art/game_cards.webp',  left: 'assets/art/painted_leo.webp',  right: 'assets/art/hub_star.webp' },
      'game-tile-match':       { bg: 'assets/art/painted_bg_zoo.webp',         main: 'assets/art/game_link.webp',   left: 'assets/art/word_apple.webp',   right: 'assets/art/word_cat.webp' },
      'game-tile-balloon':     { bg: 'assets/art/painted_hub_games.webp',      main: 'assets/art/hub_balloon.webp', left: 'assets/art/hub_star.webp',     right: 'assets/art/hub_sparkles.webp' },
      'game-tile-sorting':     { bg: 'assets/art/painted_bg_montessori.webp',  main: 'assets/art/game_basket.webp', left: 'assets/art/word_apple.webp',   right: 'assets/art/hub_teddy.webp' },
      'game-tile-wordbuilder': { bg: 'assets/art/painted_hub_phonics.webp',    main: 'assets/art/hub_abc.webp',     left: 'assets/art/painted_lulu.webp', right: 'assets/art/hub_star.webp' },
      'game-tile-sentence':    { bg: 'assets/art/painted_hub_stories.webp',    main: 'assets/art/game_chat.webp',   left: 'assets/art/painted_mimi.webp', right: 'assets/art/hub_sparkles.webp' }
    };
    Object.entries(gameSceneMap).forEach(([id, s]) => {
      const tile = document.getElementById(id);
      const iconBox = tile && tile.querySelector('.game-tile-icon');
      if (tile && iconBox) {
        tile.classList.add('is-scenic-game');
        iconBox.classList.add('is-3d-game-icon', 'is-scenic-banner');
        iconBox.innerHTML = `
          <div class="hub-scenic-banner is-game-painted">
            <img class="hub-painted-img is-soft-game-bg" src="${ s.bg }" alt="" loading="lazy" decoding="async" draggable="false" aria-hidden="true" />
            <div class="hub-3d-cluster" aria-hidden="true">
              <img class="hub-3d-side is-left" src="${ s.left }" alt="" loading="lazy" decoding="async" draggable="false" />
              <img class="hub-3d-main" src="${ s.main }" alt="" loading="lazy" decoding="async" draggable="false" />
              <img class="hub-3d-side is-right" src="${ s.right }" alt="" loading="lazy" decoding="async" draggable="false" />
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
