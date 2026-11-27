/**
 * English4Kids - Multi-Profile Family Manager & Age-Based Learning Tiers (profiles.js)
 * Allows multiple children to share one device with completely isolated progress
 * (Stars, 2,500 Vocab, Spaced Repetition SRS, CEFR Milestones, 24 Stories, ABC Phonics)
 * and age-appropriate CEFR recommendations, daily goals, and game difficulties.
 */
(function () {
  const PROFILES_INDEX_KEY = 'english4kids_profiles_v1';
  const LEGACY_PROGRESS_KEY = 'english4kids_v1_progress';
  const PROGRESS_PREFIX = 'english4kids_progress_';

  const AGE_GROUPS = [
    {
      id: 'age_4_5',
      icon: '🐣',
      label: '3–5 tuổi',
      shortLabel: '3–5t',
      stageName: 'Mầm non (Bé Nhỏ • Khám phá & Giác quan)',
      levels: ['Pre-A1'],
      defaultCefr: 'Pre-A1',
      starterTopicId: 'animals',
      dailyGoal: 5,
      ankiNewLimit: 10,
      gameDiff: 'easy',
      color: '#22C55E',
      bg: '#DCFCE7',
      desc: '500 từ Pre-A1 gần gũi, Chế độ Bé Nhỏ nút hình lớn, tập tô ABC, truyện sáng đèn & trò chơi Dễ.'
    },
    {
      id: 'age_6_7',
      icon: '🌱',
      label: '6–7 tuổi',
      shortLabel: '6–7t',
      stageName: 'Tiểu học sớm (Lớp 1–2)',
      levels: ['Pre-A1', 'A1'],
      defaultCefr: 'Pre-A1',
      starterTopicId: 'animals',
      dailyGoal: 10,
      ankiNewLimit: 15,
      gameDiff: 'easy',
      color: '#0EA5E9',
      bg: '#E0F2FE',
      desc: '1.000 từ Pre-A1 & A1, ghép vần Phonics, phim tương tác đa giác quan & ôn tập ghi nhớ nhẹ nhàng.'
    },
    {
      id: 'age_8_10',
      icon: '🌿',
      label: '8–10 tuổi',
      shortLabel: '8–10t',
      stageName: 'Tiểu học nâng cao (Lớp 3–5)',
      levels: ['A1', 'A2'],
      defaultCefr: 'A1',
      starterTopicId: 'food_drinks',
      dailyGoal: 15,
      ankiNewLimit: 20,
      gameDiff: 'medium',
      color: '#F59E0B',
      bg: '#FEF3C7',
      desc: 'Chuẩn Cambridge Starters–Movers–Flyers (A1–A2 • 1.000 từ), ôn tập 20 từ/ngày & thi vượt mốc.'
    },
    {
      id: 'age_11_15',
      icon: '🚀',
      label: '11–15+ tuổi',
      shortLabel: '11–15t',
      stageName: 'THCS & Chinh phục B1, B2',
      levels: ['B1', 'B2'],
      defaultCefr: 'B1',
      starterTopicId: 'b1_science_tech',
      dailyGoal: 20,
      ankiNewLimit: 30,
      gameDiff: 'hard',
      color: '#8B5CF6',
      bg: '#EDE9FE',
      desc: '1.000 từ học thuật B1–B2 (PET/FCE), ôn tập ngắt quãng tăng tốc, phim khoa học & tranh luận.'
    }
  ];

  const AVATARS = ['🦁', '🐼', '🦊', '🐰', '🐱', '🐶', '🦄', '🦖', '🐸', '🐨', '🐙', '🚀'];

  let store = {
    activeId: 'prof_default',
    profiles: []
  };

  let editingProfileId = null;
  let formSelectedAvatar = '🦁';
  let formSelectedAge = 'age_6_7';

  const $ = id => document.getElementById(id);

  function getAgeGroupById(ageId) {
    return AGE_GROUPS.find(a => a.id === ageId) || AGE_GROUPS[1];
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function progressKeyFor(profileId) {
    return `${ PROGRESS_PREFIX }${ profileId }`;
  }

  function saveProfilesIndex() {
    try {
      localStorage.setItem(PROFILES_INDEX_KEY, JSON.stringify(store));
    } catch (e) { /* ignore */ }
  }

  function initProfilesStore() {
    try {
      const raw = localStorage.getItem(PROFILES_INDEX_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
          store = parsed;
          if (!store.profiles.some(p => p.id === store.activeId)) {
            store.activeId = store.profiles[0].id;
          }
          return;
        }
      }
    } catch (e) { /* ignore */ }

    // First-time migration from legacy single-user storage without losing data
    const defaultProfile = {
      id: 'prof_default',
      name: 'Bé 1',
      avatar: '🦁',
      ageGroup: 'age_6_7',
      createdAt: new Date().toISOString()
    };
    store = { activeId: defaultProfile.id, profiles: [defaultProfile] };

    try {
      const legacyRaw = localStorage.getItem(LEGACY_PROGRESS_KEY);
      if (legacyRaw && !localStorage.getItem(progressKeyFor(defaultProfile.id))) {
        localStorage.setItem(progressKeyFor(defaultProfile.id), legacyRaw);
      }
    } catch (e) { /* ignore */ }

    saveProfilesIndex();
  }

  // Initialize synchronously BEFORE app.js DOMContentLoaded runs!
  initProfilesStore();

  /* ------------------------------------------------------------------
     Public Global API used by app.js, games.js, stories.js, backup.js
     ------------------------------------------------------------------ */
  window.AGE_GROUPS_DATA = AGE_GROUPS;

  window.getActiveProfile = function () {
    return store.profiles.find(p => p.id === store.activeId) || store.profiles[0];
  };

  window.getActiveAgeGroup = function () {
    const prof = window.getActiveProfile();
    return getAgeGroupById(prof ? prof.ageGroup : 'age_6_7');
  };

  window.getActiveProgressKey = function () {
    const prof = window.getActiveProfile();
    return progressKeyFor(prof ? prof.id : 'prof_default');
  };

  window.getAllProfilesBundle = function () {
    // Save active profile first so bundle is 100% up-to-date
    if (typeof saveProgress === 'function') saveProgress();
    const progressById = {};
    store.profiles.forEach(p => {
      try {
        const raw = localStorage.getItem(progressKeyFor(p.id));
        progressById[p.id] = raw ? JSON.parse(raw) : null;
      } catch (e) {
        progressById[p.id] = null;
      }
    });
    return {
      activeId: store.activeId,
      profiles: store.profiles.map(p => ({ ...p })),
      progressById
    };
  };

  window.restoreAllProfilesBundle = function (bundle) {
    if (!bundle || !Array.isArray(bundle.profiles) || bundle.profiles.length === 0) return false;
    store = {
      activeId: bundle.activeId || bundle.profiles[0].id,
      profiles: bundle.profiles.map(p => ({
        id: p.id,
        name: String(p.name || 'Bé').slice(0, 40),
        avatar: p.avatar || '🦁',
        ageGroup: p.ageGroup || 'age_6_7',
        createdAt: p.createdAt || new Date().toISOString()
      }))
    };
    if (!store.profiles.some(p => p.id === store.activeId)) {
      store.activeId = store.profiles[0].id;
    }
    saveProfilesIndex();

    if (bundle.progressById && typeof bundle.progressById === 'object') {
      Object.entries(bundle.progressById).forEach(([pid, pdata]) => {
        if (pdata && typeof pdata === 'object') {
          try {
            localStorage.setItem(progressKeyFor(pid), JSON.stringify(pdata));
          } catch (e) { /* ignore */ }
        }
      });
    }

    if (typeof window.reloadActiveProfileState === 'function') {
      window.reloadActiveProfileState();
    }
    updateProfileBadgesUI();
    renderProfileCardsGrid();
    return true;
  };

  function getProfileSummaryStats(profileId) {
    try {
      const raw = localStorage.getItem(progressKeyFor(profileId));
      if (!raw) return { stars: 0, words: 0, milestones: 0 };
      const parsed = JSON.parse(raw);
      const stars = typeof parsed.stars === 'number' ? parsed.stars : 0;
      const words = Array.isArray(parsed.learnedIds) ? parsed.learnedIds.length : 0;
      const msRes = (parsed.milestones && parsed.milestones.results) || {};
      const milestones = Object.values(msRes).filter(r => r && r.passed).length;
      return { stars, words, milestones };
    } catch (e) {
      return { stars: 0, words: 0, milestones: 0 };
    }
  }

  function applyAgeDefaultsToActiveViews() {
    const ag = window.getActiveAgeGroup();
    // Apply age-appropriate game difficulty button highlight if present
    const diffBtn = document.querySelector(`#game-difficulty-bar [data-diff="${ ag.gameDiff }"]`);
    if (diffBtn && !diffBtn.classList.contains('active')) {
      diffBtn.click();
    }
    // Update "Theo tuổi bé" filter pills label in Vocab & Stories hubs
    const vocabAgeBtn = $('btn-vocab-filter-age');
    if (vocabAgeBtn) {
      vocabAgeBtn.textContent = `${ ag.icon } Hợp tuổi bé (${ ag.levels.join('–') })`;
    }
    const storyAgeBtn = $('btn-stories-filter-age');
    if (storyAgeBtn) {
      storyAgeBtn.textContent = `${ ag.icon } Hợp tuổi bé (${ ag.levels.join('–') })`;
    }
  }

  function switchToProfile(profileId) {
    if (!store.profiles.some(p => p.id === profileId)) return;
    // Save outgoing profile before switching
    if (typeof saveProgress === 'function') saveProgress();

    store.activeId = profileId;
    saveProfilesIndex();

    if (typeof window.reloadActiveProfileState === 'function') {
      window.reloadActiveProfileState();
    }
    updateProfileBadgesUI();
    applyAgeDefaultsToActiveViews();
    renderProfileCardsGrid();

    // Navigate cleanly to Home dashboard so the child sees their own dashboard
    if (typeof openView === 'function') openView('view-home');
  }

  window.updateProfileBadgesUI = updateProfileBadgesUI;

  function updateProfileBadgesUI() {
    const prof = window.getActiveProfile();
    const ag = window.getActiveAgeGroup();
    if (!prof) return;

    if (document.body && ag) document.body.dataset.age = ag.id;

    if ($('header-profile-avatar')) $('header-profile-avatar').textContent = prof.avatar;
    if ($('header-profile-name')) $('header-profile-name').textContent = prof.name;
    if ($('header-profile-age')) $('header-profile-age').textContent = ag.shortLabel;

    if ($('home-welcome-profile')) {
      $('home-welcome-profile').textContent = `${ prof.avatar } ${ prof.name } • ${ ag.icon } ${ ag.label } (${ ag.levels.join('–') })`;
    }

    const vocabAgeBtn = $('btn-vocab-filter-age');
    if (vocabAgeBtn) vocabAgeBtn.textContent = `${ ag.icon } Hợp tuổi bé (${ ag.levels.join('–') })`;
    const storyAgeBtn = $('btn-stories-filter-age');
    if (storyAgeBtn) storyAgeBtn.textContent = `${ ag.icon } Hợp tuổi bé (${ ag.levels.join('–') })`;

    if (typeof window.refreshHomeHero === 'function') window.refreshHomeHero();
  }

  /* ------------------------------------------------------------------
     Modal Rendering: Profile Switcher Cards + Add/Edit Form
     ------------------------------------------------------------------ */
  function renderProfileCardsGrid() {
    const grid = $('profile-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    store.profiles.forEach(prof => {
      const ag = getAgeGroupById(prof.ageGroup);
      const isActive = prof.id === store.activeId;
      const stats = getProfileSummaryStats(prof.id);

      const card = document.createElement('div');
      card.className = `profile-item-card ${ isActive ? 'is-active' : '' }`;
      card.style.setProperty('--prof-color', ag.color);
      card.style.setProperty('--prof-bg', ag.bg);

      card.innerHTML = `
        <button type="button" class="profile-select-area" data-prof-id="${ escapeHtml(prof.id) }">
          <div class="prof-avatar-circle">${ escapeHtml(prof.avatar) }</div>
          <div class="prof-card-info">
            <div class="prof-name-row">
              <strong>${ escapeHtml(prof.name) }</strong>
              ${ isActive ? '<span class="prof-active-tag">✅ Đang học</span>' : '' }
            </div>
            <span class="prof-age-pill">${ ag.icon } ${ ag.label } • ${ ag.levels.join('–') }</span>
            <div class="prof-mini-stats">⭐ ${ stats.stars } • 📚 ${ stats.words } từ • 🏅 ${ stats.milestones } mốc</div>
          </div>
        </button>
        <div class="prof-card-actions">
          <button type="button" class="btn-prof-mini edit-btn" title="Sửa hồ sơ">✏️</button>
          ${ store.profiles.length > 1 ? '<button type="button" class="btn-prof-mini del-btn" title="Xóa hồ sơ">🗑️</button>' : '' }
        </div>
      `;

      card.querySelector('.profile-select-area').addEventListener('click', () => {
        playSoundEffect('star');
        if (!isActive) {
          switchToProfile(prof.id);
        }
        closeProfileModal();
      });

      card.querySelector('.edit-btn').addEventListener('click', e => {
        e.stopPropagation();
        playSoundEffect('pop');
        openProfileForm(prof);
      });

      const delBtn = card.querySelector('.del-btn');
      if (delBtn) {
        delBtn.addEventListener('click', e => {
          e.stopPropagation();
          if (store.profiles.length <= 1) return;
          if (!window.confirm(`Xóa hồ sơ "${ prof.name }" và tiến trình của bé này?`)) return;
          playSoundEffect('pop');
          const wasActive = prof.id === store.activeId;
          store.profiles = store.profiles.filter(p => p.id !== prof.id);
          try { localStorage.removeItem(progressKeyFor(prof.id)); } catch (err) { /* ignore */ }
          if (wasActive) {
            store.activeId = store.profiles[0].id;
            saveProfilesIndex();
            switchToProfile(store.activeId);
          } else {
            saveProfilesIndex();
            renderProfileCardsGrid();
          }
        });
      }

      grid.appendChild(card);
    });
  }

  function renderAvatarPicker() {
    const wrap = $('prof-avatar-picker');
    if (!wrap) return;
    wrap.innerHTML = '';
    AVATARS.forEach(emoji => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `avatar-pick-btn ${ emoji === formSelectedAvatar ? 'active' : '' }`;
      btn.textContent = emoji;
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        formSelectedAvatar = emoji;
        renderAvatarPicker();
      });
      wrap.appendChild(btn);
    });
  }

  function renderAgeGroupPicker() {
    const wrap = $('prof-age-picker');
    if (!wrap) return;
    wrap.innerHTML = '';
    AGE_GROUPS.forEach(ag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `age-pick-card ${ ag.id === formSelectedAge ? 'active' : '' }`;
      btn.dataset.ageId = ag.id;
      btn.style.setProperty('--age-color', ag.color);
      btn.style.setProperty('--age-bg', ag.bg);
      btn.innerHTML = `
        <div class="age-pick-head">
          <span>${ ag.icon } <strong>${ ag.label }</strong></span>
          <span class="age-pick-cefr">${ ag.levels.join(' ➔ ') }</span>
        </div>
        <div class="age-pick-stage">${ ag.stageName }</div>
        <p class="age-pick-desc">${ ag.desc }</p>
      `;
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        formSelectedAge = ag.id;
        renderAgeGroupPicker();
      });
      wrap.appendChild(btn);
    });
  }

  function openProfileForm(profToEdit = null) {
    editingProfileId = profToEdit ? profToEdit.id : null;
    formSelectedAvatar = profToEdit ? profToEdit.avatar : AVATARS[store.profiles.length % AVATARS.length];
    formSelectedAge = profToEdit ? profToEdit.ageGroup : 'age_6_7';

    $('prof-form-title').textContent = profToEdit
      ? `✏️ Chỉnh Sửa Hồ Sơ: ${ profToEdit.name }`
      : '➕ Tạo Hồ Sơ Bé Mới';
    $('prof-name-input').value = profToEdit ? profToEdit.name : '';
    $('btn-prof-save').textContent = profToEdit ? '💾 Lưu thay đổi' : '✨ Tạo hồ sơ & Bắt đầu học';

    renderAvatarPicker();
    renderAgeGroupPicker();

    $('profile-list-panel').classList.add('hidden');
    $('profile-form-panel').classList.remove('hidden');
    setTimeout(() => $('prof-name-input').focus(), 80);
  }

  function showProfileListPanel() {
    $('profile-form-panel').classList.add('hidden');
    $('profile-list-panel').classList.remove('hidden');
    renderProfileCardsGrid();
  }

  function openProfileModal() {
    const modal = $('profile-modal');
    if (!modal) return;
    if (typeof saveProgress === 'function') saveProgress();
    playSoundEffect('pop');
    showProfileListPanel();
    modal.classList.remove('hidden');
  }

  function closeProfileModal() {
    const modal = $('profile-modal');
    if (!modal) return;
    playSoundEffect('pop');
    modal.classList.add('hidden');
  }

  function handleSaveProfileForm() {
    const rawName = ($('prof-name-input').value || '').trim();
    const name = rawName || `Bé ${ store.profiles.length + 1 }`;
    const ag = getAgeGroupById(formSelectedAge);

    if (editingProfileId) {
      const target = store.profiles.find(p => p.id === editingProfileId);
      if (target) {
        target.name = name;
        target.avatar = formSelectedAvatar;
        target.ageGroup = formSelectedAge;
        saveProfilesIndex();
        if (target.id === store.activeId) {
          // Sync Anki daily new limit if user hasn't reviewed yet
          if (state.srs && state.srs.stats && state.srs.stats.totalReviews === 0) {
            state.srs.stats.dailyNewLimit = ag.ankiNewLimit;
            saveProgress();
          }
          updateProfileBadgesUI();
          applyAgeDefaultsToActiveViews();
          if (typeof updateHeaderAndMissionUI === 'function') updateHeaderAndMissionUI();
          if (typeof renderRecentActivityCard === 'function') renderRecentActivityCard();
        }
      }
      playSoundEffect('star');
      showProfileListPanel();
      return;
    }

    // Create brand-new profile with age-calibrated defaults!
    const newId = `prof_${ Date.now() }_${ Math.floor(Math.random() * 1000) }`;
    const newProf = {
      id: newId,
      name,
      avatar: formSelectedAvatar,
      ageGroup: formSelectedAge,
      createdAt: new Date().toISOString()
    };
    store.profiles.push(newProf);
    saveProfilesIndex();

    // Seed clean initial progress with age-tailored Anki daily limit
    const initialProgress = {
      stars: 0,
      learnedIds: [],
      learnedLetters: [],
      completedEpisodes: [],
      lastActivity: null,
      soundEnabled: true,
      srs: {
        cards: {},
        stats: {
          todayDate: '',
          reviewedToday: 0,
          newToday: 0,
          streakDays: 0,
          lastStudyDate: null,
          totalReviews: 0,
          dailyNewLimit: ag.ankiNewLimit
        }
      },
      milestones: { results: {}, placement: null }
    };
    try {
      localStorage.setItem(progressKeyFor(newId), JSON.stringify(initialProgress));
    } catch (e) { /* ignore */ }

    playSoundEffect('star');
    launchConfettiBurst();
    switchToProfile(newId);
    closeProfileModal();
  }

  window.openProfileModal = openProfileModal;

  function bindProfileEvents() {
    updateProfileBadgesUI();

    const headerBtn = $('btn-profile-switcher');
    if (headerBtn) headerBtn.addEventListener('click', openProfileModal);

    const homeSwitchBtn = $('btn-home-switch-profile');
    if (homeSwitchBtn) homeSwitchBtn.addEventListener('click', openProfileModal);

    const closeBtn = $('btn-close-profile');
    if (closeBtn) closeBtn.addEventListener('click', closeProfileModal);

    const addBtn = $('btn-add-new-profile');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        playSoundEffect('pop');
        openProfileForm(null);
      });
    }

    const cancelFormBtn = $('btn-prof-cancel');
    if (cancelFormBtn) {
      cancelFormBtn.addEventListener('click', () => {
        playSoundEffect('pop');
        showProfileListPanel();
      });
    }

    const saveFormBtn = $('btn-prof-save');
    if (saveFormBtn) saveFormBtn.addEventListener('click', handleSaveProfileForm);

    const nameInput = $('prof-name-input');
    if (nameInput) {
      nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSaveProfileForm();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindProfileEvents();
    applyAgeDefaultsToActiveViews();
  });
})();
