/**
 * English4Kids - Interactive Animated Video Theatre Engine (Khan Academy Kids Style)
 * 18 Multi-Scene Episodes (Pre-A1 -> B2) with 4 Animated Hosts (Leo, Mimi, Toby, Lulu),
 * 4 Interactive Checkpoint Mechanics ('interact', 'count', 'sequence', 'dialogue'),
 * Timeline Scrubber with Checkpoint Stars, Bilingual Toggle & Natural Voiceover!
 */
(function () {
  const EPISODES = typeof STORY_EPISODES !== 'undefined' ? STORY_EPISODES : [];
  const HOSTS = typeof STORY_HOSTS !== 'undefined' ? STORY_HOSTS : {
    leo: { name: 'Leo', emoji: '🦁', role: 'Nhà Thám Hiểm' }
  };

  const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

  const sState = {
    epIndex: 0,
    sceneIndex: 0,
    playing: false,
    waitingForTap: false,
    solvedInEp: new Set(),
    activeLevelFilter: 'all',
    showViSubtitles: true,
    // Interactive sub-states
    countedIds: new Set(),
    seqStep: 0,
    timer: null
  };

  const $ = id => document.getElementById(id);

  function stopAudioCleanly() {
    if (typeof window.stopAllSpeech === 'function') {
      window.stopAllSpeech();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function clearStoryTimer() {
    if (sState.timer) {
      clearTimeout(sState.timer);
      sState.timer = null;
    }
  }

  function isInteractiveScene(sc) {
    return sc && sc.type !== 'story';
  }

  window.getStoriesTotalCount = function () {
    return EPISODES.length;
  };

  /* ------------------------------------------------------------------
     Stories Hub Grid with CEFR Filters & Watched Badges
     ------------------------------------------------------------------ */
  function renderEpisodesGrid() {
    const grid = $('stories-home-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = sState.activeLevelFilter === 'all'
      ? EPISODES.map((ep, idx) => ({ ep, idx }))
      : EPISODES.map((ep, idx) => ({ ep, idx })).filter(x => x.ep.level === sState.activeLevelFilter);

    filtered.forEach(({ ep, idx }) => {
      const host = HOSTS[ep.host] || HOSTS.leo;
      const watched = state.completedEpisodes && state.completedEpisodes.has(ep.id);

      const card = document.createElement('button');
      card.type = 'button';
      card.className = `story-ep-card ${ watched ? 'is-watched' : '' }`;
      card.id = `story-ep-${ ep.id }`;
      card.style.setProperty('--ep-color', ep.color);
      card.style.setProperty('--ep-bg', ep.bgSoft);
      card.innerHTML = `
        <div class="ep-thumb">
          <span class="ep-num-badge">${ ep.num }</span>
          <span class="ep-emoji">${ ep.icon }</span>
          <span class="ep-play-circle">${ watched ? '✓' : '▶' }</span>
        </div>
        <div class="ep-meta">
          <div class="ep-title-row">
            <h3>${ ep.titleVi }</h3>
            <span class="ep-level-pill cefr-${ (ep.level || 'Pre-A1').toLowerCase() }">${ ep.level || 'Pre-A1' }</span>
          </div>
          <span class="ep-en">${ ep.titleEn }</span>
          <div class="ep-foot-row">
            <span class="ep-dur">🎬 ${ ep.duration }</span>
            <span class="ep-host-tag">${ host.emoji } ${ host.name }</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        playSoundEffect('pop');
        openEpisode(idx);
      });
      grid.appendChild(card);
    });
  }

  window.refreshStoriesUI = renderEpisodesGrid;

  /* ------------------------------------------------------------------
     Open Episode & Timeline Scrubber
     ------------------------------------------------------------------ */
  function openEpisode(epIdx) {
    if (!EPISODES[epIdx]) epIdx = 0;
    clearStoryTimer();
    stopAudioCleanly();
    sState.epIndex = epIdx;
    sState.sceneIndex = 0;
    sState.playing = true;
    sState.waitingForTap = false;
    sState.solvedInEp = new Set();

    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-stories').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const ep = EPISODES[epIdx];
    const host = HOSTS[ep.host] || HOSTS.leo;
    $('story-ep-icon').textContent = ep.icon;
    $('story-ep-title').textContent = `${ ep.num } [${ ep.level }]: ${ ep.titleVi }`;

    // Update animated actor host (Leo / Mimi / Toby / Lulu)
    const actorEmoji = document.querySelector('#story-leo-actor .leo-actor-emoji');
    const actorName = document.querySelector('#story-leo-actor .leo-name-tag');
    if (actorEmoji) actorEmoji.textContent = host.emoji;
    if (actorName) actorName.textContent = host.name;

    if (typeof window.recordActivity === 'function') {
      window.recordActivity({
        kind: 'story',
        epIndex: epIdx,
        icon: ep.icon,
        title: `${ ep.num }: ${ ep.titleVi } (${ ep.level })`,
        subtitle: `Phim tương tác cùng ${ host.emoji } ${ host.name } • ${ ep.titleEn }`
      });
    }

    renderStoryTimeline();
    renderStoryScene();
  }

  window.openStoryEpisode = openEpisode;

  function renderStoryTimeline() {
    const ep = EPISODES[sState.epIndex];
    const bar = $('story-timeline-dots');
    if (!bar) return;
    bar.innerHTML = '';

    const typeIcons = { interact: '⭐', count: '🔢', sequence: '🧩', dialogue: '💬' };

    ep.scenes.forEach((sc, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      const interactive = isInteractiveScene(sc);
      dot.className = `timeline-dot ${ interactive ? 'is-checkpoint' : '' }`;
      if (idx < sState.sceneIndex) dot.classList.add('passed');
      if (idx === sState.sceneIndex) dot.classList.add('current');
      dot.textContent = interactive ? (typeIcons[sc.type] || '⭐') : String(idx + 1);
      dot.title = interactive ? 'Thử thách tương tác' : `Cảnh ${ idx + 1 }`;
      dot.addEventListener('click', () => {
        clearStoryTimer();
        playSoundEffect('pop');
        sState.sceneIndex = idx;
        sState.playing = true;
        renderStoryScene();
      });
      bar.appendChild(dot);
    });

    const pct = Math.round(((sState.sceneIndex + 1) / ep.scenes.length) * 100);
    const fill = $('story-progress-fill');
    if (fill) fill.style.width = `${ pct }%`;
  }

  function updatePlayPauseBtn() {
    const btn = $('btn-story-playpause');
    if (!btn) return;
    if (sState.waitingForTap) {
      btn.textContent = '👆 Hoàn thành tương tác trên màn hình!';
      btn.classList.add('waiting');
    } else if (sState.playing) {
      btn.textContent = '⏸ Tạm dừng';
      btn.classList.remove('waiting');
    } else {
      btn.textContent = '▶ Tiếp tục phát';
      btn.classList.remove('waiting');
    }
  }

  function setSubtitles(en, vi) {
    $('story-sub-en').textContent = en || '';
    const viEl = $('story-sub-vi');
    if (viEl) {
      viEl.textContent = vi || '';
      viEl.classList.toggle('hidden', !sState.showViSubtitles);
    }
    const bubble = $('story-speech-bubble');
    if (bubble) {
      bubble.textContent = en || '';
      bubble.classList.toggle('hidden', !en);
    }
  }

  function advanceAfterSuccess(scene) {
    sState.waitingForTap = false;
    $('story-leo-actor').className = 'story-leo-actor mood-celebrate';
    $('story-checkpoint-badge').textContent = '🎉 Xuất sắc! (+2 Sao vàng)';
    setSubtitles(scene.successEn, scene.successVi);

    if (!sState.solvedInEp.has(sState.sceneIndex)) {
      sState.solvedInEp.add(sState.sceneIndex);
      state.stars += 2;
      saveProgress();
      updateHeaderAndMissionUI();
    }

    playSoundEffect('star');
    launchConfettiBurst();
    speakEnglish(scene.successEn, 0.94);
    updatePlayPauseBtn();

    sState.timer = setTimeout(() => {
      const ep = EPISODES[sState.epIndex];
      if (sState.sceneIndex < ep.scenes.length - 1) {
        sState.sceneIndex += 1;
        sState.playing = true;
        renderStoryScene();
      } else {
        finishEpisode();
      }
    }, 2500);
  }

  /* ------------------------------------------------------------------
     Scene Renderer (Supports story, interact, count, sequence, dialogue)
     ------------------------------------------------------------------ */
  function renderStoryScene() {
    clearStoryTimer();
    const ep = EPISODES[sState.epIndex];
    const scene = ep.scenes[sState.sceneIndex];
    if (!scene) return;

    sState.countedIds = new Set();
    sState.seqStep = 0;

    const stage = $('story-stage');
    stage.className = `story-stage theme-${ ep.theme }`;

    const propsLayer = $('story-props-layer');
    propsLayer.innerHTML = '';

    const leo = $('story-leo-actor');
    leo.className = `story-leo-actor mood-${ scene.leoMood || 'wave' }`;

    const badge = $('story-checkpoint-badge');

    if (scene.type === 'story') {
      sState.waitingForTap = false;
      badge.classList.add('hidden');
      setSubtitles(scene.en, scene.vi);

      (scene.props || []).forEach(p => {
        const el = document.createElement('div');
        el.className = `stage-prop ${ p.anim ? `anim-${ p.anim }` : '' }`;
        el.style.left = `${ p.x }%`;
        el.style.top = `${ p.y }%`;
        el.style.fontSize = `${ p.size || 3 }rem`;
        el.textContent = p.emoji;
        propsLayer.appendChild(el);
      });

      speakEnglish(scene.en, 0.92);
      if (sState.playing) {
        sState.timer = setTimeout(() => {
          if (!sState.playing) return;
          if (sState.sceneIndex < ep.scenes.length - 1) {
            sState.sceneIndex += 1;
            renderStoryScene();
          } else {
            finishEpisode();
          }
        }, scene.durationMs || 4300);
      }
    } else if (scene.type === 'interact') {
      sState.waitingForTap = true;
      badge.classList.remove('hidden');
      badge.textContent = '⭐ TƯƠNG TÁC: Chạm vào hình đúng trên màn hình!';
      setSubtitles(scene.promptEn, scene.promptVi);

      scene.items.forEach(item => {
        const btn = buildStageItemButton(item);
        btn.addEventListener('click', () => handleInteractTap(btn, item, scene));
        propsLayer.appendChild(btn);
      });
      speakEnglish(scene.promptEn, 0.90);
    } else if (scene.type === 'count') {
      sState.waitingForTap = true;
      badge.classList.remove('hidden');
      badge.textContent = `🔢 TẬP ĐẾM (0 / ${ scene.items.length }): Chạm từng hình để cùng đếm!`;
      setSubtitles(scene.promptEn, scene.promptVi);

      scene.items.forEach(item => {
        const btn = buildStageItemButton(item);
        btn.classList.add('is-count-item');
        btn.addEventListener('click', () => handleCountTap(btn, item, scene));
        propsLayer.appendChild(btn);
      });
      speakEnglish(scene.promptEn, 0.90);
    } else if (scene.type === 'sequence') {
      sState.waitingForTap = true;
      badge.classList.remove('hidden');
      badge.textContent = `🧩 SẮP XẾP THỨ TỰ (Bước 1 / ${ scene.order.length })`;
      setSubtitles(scene.promptEn, scene.promptVi);

      scene.items.forEach(item => {
        const btn = buildStageItemButton(item);
        btn.classList.add('is-seq-item');
        btn.addEventListener('click', () => handleSequenceTap(btn, item, scene));
        propsLayer.appendChild(btn);
      });
      speakEnglish(scene.promptEn, 0.90);
    } else if (scene.type === 'dialogue') {
      sState.waitingForTap = true;
      badge.classList.remove('hidden');
      badge.textContent = '💬 HỘI THOẠI: Chọn câu trả lời tiếng Anh hay nhất!';
      setSubtitles(scene.promptEn, scene.promptVi);

      const box = document.createElement('div');
      box.className = 'stage-dialogue-stack';
      scene.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'stage-dialogue-btn';
        btn.dataset.itemId = opt.id;
        btn.innerHTML = `
          <span class="sdb-emoji">${ opt.emoji }</span>
          <span class="sdb-texts">
            <strong>${ opt.en }</strong>
            ${ sState.showViSubtitles ? `<small>${ opt.vi }</small>` : '' }
          </span>
        `;
        btn.addEventListener('click', () => handleDialogueTap(btn, opt, scene));
        box.appendChild(btn);
      });
      propsLayer.appendChild(box);
      speakEnglish(scene.promptEn, 0.90);
    }

    renderStoryTimeline();
    updatePlayPauseBtn();
  }

  function buildStageItemButton(item) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'stage-interactive-item';
    btn.dataset.itemId = item.id;
    btn.style.left = `${ item.x }%`;
    btn.style.top = `${ item.y }%`;
    const visual = item.colorHex
      ? `<span class="sii-swatch" style="background:${ item.colorHex }">${ item.emoji }</span>`
      : `<span class="sii-emoji">${ item.emoji }</span>`;
    btn.innerHTML = `${ visual }<span class="sii-label">${ item.label }</span>`;
    return btn;
  }

  function handleInteractTap(btn, item, scene) {
    if (!sState.waitingForTap) return;
    if (item.id === scene.targetId) {
      btn.classList.add('correct-hit');
      advanceAfterSuccess(scene);
    } else {
      triggerWrongBounce(btn, `Try again! ${ scene.promptEn }`);
    }
  }

  function handleCountTap(btn, item, scene) {
    if (!sState.waitingForTap || sState.countedIds.has(item.id)) return;
    sState.countedIds.add(item.id);
    const num = sState.countedIds.size;

    btn.classList.add('correct-hit', 'counted');
    const numBadge = document.createElement('span');
    numBadge.className = 'sii-order-badge';
    numBadge.textContent = String(num);
    btn.appendChild(numBadge);

    playSoundEffect('pop');
    const badge = $('story-checkpoint-badge');
    badge.textContent = `🔢 TẬP ĐẾM (${ num } / ${ scene.items.length }): ${ NUMBER_WORDS[num] || num }!`;

    if (num >= scene.items.length) {
      advanceAfterSuccess(scene);
    } else {
      speakEnglish(`${ NUMBER_WORDS[num] || num }!`, 0.96);
    }
  }

  function handleSequenceTap(btn, item, scene) {
    if (!sState.waitingForTap || btn.classList.contains('correct-hit')) return;
    const expectedId = scene.order[sState.seqStep];

    if (item.id === expectedId) {
      sState.seqStep += 1;
      btn.classList.add('correct-hit');
      const stepBadge = document.createElement('span');
      stepBadge.className = 'sii-order-badge';
      stepBadge.textContent = String(sState.seqStep);
      btn.appendChild(stepBadge);

      playSoundEffect('pop');
      if (sState.seqStep >= scene.order.length) {
        advanceAfterSuccess(scene);
      } else {
        $('story-checkpoint-badge').textContent = `🧩 SẮP XẾP THỨ TỰ (Bước ${ sState.seqStep + 1 } / ${ scene.order.length })`;
        speakEnglish(`${ item.label }!`, 0.95);
      }
    } else {
      triggerWrongBounce(btn, `Not yet! ${ scene.promptEn }`);
    }
  }

  function handleDialogueTap(btn, opt, scene) {
    if (!sState.waitingForTap) return;
    if (opt.id === scene.targetId) {
      btn.classList.add('correct-hit');
      advanceAfterSuccess(scene);
    } else {
      triggerWrongBounce(btn, `Hmm, try another answer!`);
    }
  }

  function triggerWrongBounce(btn, retryVoice) {
    btn.classList.remove('wrong-hit');
    void btn.offsetWidth;
    btn.classList.add('wrong-hit');
    playSoundEffect('wrong');
    speakEnglish(retryVoice, 0.90);
  }

  function finishEpisode() {
    clearStoryTimer();
    sState.playing = false;
    sState.waitingForTap = false;
    const ep = EPISODES[sState.epIndex];
    if (ep && state.completedEpisodes) {
      state.completedEpisodes.add(ep.id);
    }
    state.stars += 3;
    saveProgress();
    updateHeaderAndMissionUI();
    renderEpisodesGrid();
    playSoundEffect('star');
    launchConfettiBurst();

    const badge = $('story-checkpoint-badge');
    badge.classList.remove('hidden');
    badge.textContent = '🏆 Hoàn thành tập phim! (+3 Sao thưởng)';
    updatePlayPauseBtn();
  }

  function stopStories() {
    clearStoryTimer();
    sState.playing = false;
    sState.waitingForTap = false;
    stopAudioCleanly();
  }

  function bindStoryEvents() {
    // CEFR Filter pills inside #view-stories-hub
    document.querySelectorAll('#stories-cefr-filter [data-slevel]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        sState.activeLevelFilter = btn.dataset.slevel;
        document.querySelectorAll('#stories-cefr-filter [data-slevel]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderEpisodesGrid();
      });
    });

    // Bilingual subtitle toggle inside player
    const subToggle = $('btn-story-sub-toggle');
    if (subToggle) {
      subToggle.addEventListener('click', () => {
        playSoundEffect('pop');
        sState.showViSubtitles = !sState.showViSubtitles;
        subToggle.textContent = sState.showViSubtitles ? '🇻🇳 Phụ đề Việt: Bật' : '🇬🇧 Chỉ Tiếng Anh';
        const viEl = $('story-sub-vi');
        if (viEl) viEl.classList.toggle('hidden', !sState.showViSubtitles);
      });
    }

    $('btn-stories-back').addEventListener('click', () => {
      stopStories();
      playSoundEffect('pop');
      document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
      $('view-stories-hub').classList.add('active');
      renderEpisodesGrid();
    });

    $('btn-home-logo').addEventListener('click', stopStories);

    $('btn-story-playpause').addEventListener('click', () => {
      if (sState.waitingForTap) {
        const sc = EPISODES[sState.epIndex].scenes[sState.sceneIndex];
        if (sc) speakEnglish(sc.promptEn, 0.90);
        return;
      }
      playSoundEffect('pop');
      sState.playing = !sState.playing;
      if (sState.playing) {
        const ep = EPISODES[sState.epIndex];
        if (sState.sceneIndex >= ep.scenes.length - 1) {
          sState.sceneIndex = 0;
        }
        renderStoryScene();
      } else {
        clearStoryTimer();
        stopAudioCleanly();
        updatePlayPauseBtn();
      }
    });

    $('btn-story-prev').addEventListener('click', () => {
      clearStoryTimer();
      playSoundEffect('pop');
      sState.sceneIndex = Math.max(0, sState.sceneIndex - 1);
      sState.playing = true;
      renderStoryScene();
    });

    $('btn-story-next').addEventListener('click', () => {
      clearStoryTimer();
      playSoundEffect('pop');
      const ep = EPISODES[sState.epIndex];
      if (sState.sceneIndex < ep.scenes.length - 1) {
        sState.sceneIndex += 1;
        sState.playing = true;
        renderStoryScene();
      } else {
        finishEpisode();
      }
    });

    $('btn-story-replay-voice').addEventListener('click', () => {
      const sc = EPISODES[sState.epIndex].scenes[sState.sceneIndex];
      if (!sc) return;
      speakEnglish(isInteractiveScene(sc) ? sc.promptEn : sc.en, 0.90);
    });

    $('btn-story-next-ep').addEventListener('click', () => {
      playSoundEffect('pop');
      const nextIdx = (sState.epIndex + 1) % EPISODES.length;
      openEpisode(nextIdx);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderEpisodesGrid();
    bindStoryEvents();
  });
})();
