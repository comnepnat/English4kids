/**
 * English4Kids - Core Flashcards & Interactive Audio Learning Engine (Age 6)
 * Vocabulary data (20 Topics x 50 Words = 1,000 Words) is loaded from vocab-data.js (TOPICS_DATA).
 */
const LESSON_SIZE = 10;

/* ==========================================================================
   App State & LocalStorage Persistence
   ========================================================================== */
const STORAGE_KEY = 'english4kids_v1_progress';

const CEFR_LEVELS = [
  { id: 'Pre-A1', icon: '🌱', name: 'Pre-A1', subtitle: 'Khởi đầu (6 tuổi)', color: '#22C55E', bg: '#DCFCE7', desc: '400 từ vựng gần gũi, chào hỏi cơ bản & bảng chữ cái ABC.' },
  { id: 'A1', icon: '🌿', name: 'A1', subtitle: 'Sơ cấp (Starters)', color: '#0EA5E9', bg: '#E0F2FE', desc: '400 từ giao tiếp hàng ngày, nhà cửa, đồ ăn, thể thao & âm nhạc.' },
  { id: 'A2', icon: '🌳', name: 'A2', subtitle: 'Cơ bản (Movers/Flyers)', color: '#F59E0B', bg: '#FEF3C7', desc: '400 từ mô tả, mua sắm, nghề nghiệp, phố thị & vũ trụ.' },
  { id: 'B1', icon: '🚀', name: 'B1', subtitle: 'Trung cấp (PET)', color: '#3B82F6', bg: '#DBEAFE', desc: '400 từ khoa học, sức khỏe, nghệ thuật, tài chính & lịch sử.' },
  { id: 'B2', icon: '🏆', name: 'B2', subtitle: 'Trung cao cấp (FCE)', color: '#8B5CF6', bg: '#EDE9FE', desc: '400 từ tư duy phân tích, tâm lý, kinh tế, thiên văn & học thuật.' }
];

let _cachedAllCards = null;
let _cachedCardMap = null;

window.getAllVocabCards = function () {
  if (!_cachedAllCards) {
    _cachedAllCards = [];
    _cachedCardMap = new Map();
    TOPICS_DATA.forEach(t => {
      t.cards.forEach(c => {
        const enriched = { ...c, topicId: t.id, topicTitleVi: t.titleVi, topicIcon: t.icon, level: t.level };
        _cachedAllCards.push(enriched);
        _cachedCardMap.set(c.id, enriched);
      });
    });
  }
  return _cachedAllCards;
};

window.getVocabCardById = function (cardId) {
  if (!_cachedCardMap) window.getAllVocabCards();
  return _cachedCardMap.get(cardId) || null;
};

const state = {
  stars: 0,
  learnedIds: new Set(),
  learnedLetters: new Set(),
  completedEpisodes: new Set(),
  lastActivity: null,
  activeCefrFilter: 'all',
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
      dailyNewLimit: 20
    }
  },
  milestones: {
    results: {},
    placement: null
  },
  currentTopicId: 'animals',
  currentCardIndex: 0,
  isFlipped: false,
  activeMode: 'learn', // 'learn' | 'quiz'
  quiz: {
    pool: [],
    currentIndex: 0,
    streak: 0,
    currentAnswer: null,
    answered: false
  }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.stars === 'number') state.stars = parsed.stars;
    if (Array.isArray(parsed.learnedIds)) {
      state.learnedIds = new Set(parsed.learnedIds);
    }
    if (Array.isArray(parsed.learnedLetters)) {
      state.learnedLetters = new Set(parsed.learnedLetters);
    }
    if (Array.isArray(parsed.completedEpisodes)) {
      state.completedEpisodes = new Set(parsed.completedEpisodes);
    }
    if (parsed.lastActivity && typeof parsed.lastActivity === 'object') {
      state.lastActivity = parsed.lastActivity;
    }
    if (typeof parsed.soundEnabled === 'boolean') {
      state.soundEnabled = parsed.soundEnabled;
    }
    if (parsed.srs && typeof parsed.srs === 'object') {
      state.srs = {
        cards: parsed.srs.cards && typeof parsed.srs.cards === 'object' ? parsed.srs.cards : {},
        stats: { ...state.srs.stats, ...(parsed.srs.stats || {}) }
      };
    }
    if (parsed.milestones && typeof parsed.milestones === 'object') {
      state.milestones = {
        results: parsed.milestones.results && typeof parsed.milestones.results === 'object' ? parsed.milestones.results : {},
        placement: parsed.milestones.placement || null
      };
    }
  } catch (err) {
    console.warn('Could not read saved progress:', err);
  }
}

function saveProgress() {
  try {
    const payload = {
      stars: state.stars,
      learnedIds: Array.from(state.learnedIds),
      learnedLetters: Array.from(state.learnedLetters),
      completedEpisodes: Array.from(state.completedEpisodes),
      lastActivity: state.lastActivity,
      soundEnabled: state.soundEnabled,
      srs: state.srs,
      milestones: state.milestones
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Could not save progress:', err);
  }
}

window.recordActivity = function (activity) {
  state.lastActivity = { ...activity, ts: Date.now() };
  saveProgress();
  renderRecentActivityCard();
};

/* ==========================================================================
   Web Audio API Synthesized Sound Effects (No external MP3 required)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSoundEffect(type) {
  if (!state.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'pop' || type === 'flip') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(type === 'pop' ? 520 : 380, now);
    osc.frequency.exponentialRampToValueAtTime(type === 'pop' ? 780 : 620, now + 0.09);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'star' || type === 'correct') {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const startTime = now + idx * 0.075;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.23);
    });
  } else if (type === 'wrong') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(170, now + 0.22);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }
}

/* ==========================================================================
   Web Speech API - English Pronunciation (Normal, Slow & Spelling)
   ========================================================================== */
function speakEnglish(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.1; // Friendly, clear pitch for children

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find(v => v.lang === 'en-US' && /Google|Samantha|Natural|Zira|Aria/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith('en-US')) ||
    voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  const speakBtn = document.getElementById('btn-speak-normal');
  if (speakBtn) speakBtn.classList.add('speaking');

  utterance.onend = () => {
    if (speakBtn) speakBtn.classList.remove('speaking');
  };
  utterance.onerror = () => {
    if (speakBtn) speakBtn.classList.remove('speaking');
  };

  window.speechSynthesis.speak(utterance);
}

function spellWordOutLoud(word) {
  const letters = word
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .split('');
  const spelledSequence = `${ letters.join('. ') }. ${ word }!`;
  speakEnglish(spelledSequence, 0.78);
}

/* ==========================================================================
   UI Rendering: Header Stats & Home Topic Cards
   ========================================================================== */
function getCurrentCefrRank() {
  const count = state.learnedIds.size;
  const passedBoss = (lvl) =>
    state.milestones && state.milestones.results && state.milestones.results[`m_${ lvl }_boss`] && state.milestones.results[`m_${ lvl }_boss`].passed;
  if (passedBoss('B2') || count >= 1400) return '🏆 B2 (Trung cao cấp)';
  if (passedBoss('B1') || count >= 1000) return '🚀 B1 (Trung cấp)';
  if (passedBoss('A2') || count >= 600) return '🌳 A2 (Cơ bản)';
  if (passedBoss('A1') || count >= 250) return '🌿 A1 (Sơ cấp)';
  return '🌱 Pre-A1 (Khởi đầu)';
}

function updateHeaderAndMissionUI() {
  const totalStarsEl = document.getElementById('total-stars-count');
  const totalLearnedEl = document.getElementById('total-learned-count');
  const missionTextEl = document.getElementById('daily-mission-text');
  const missionBarEl = document.getElementById('daily-mission-bar');
  const soundIconEl = document.getElementById('sound-toggle-icon');

  const learnedCount = state.learnedIds.size;
  const totalWords = TOPICS_DATA.reduce((sum, t) => sum + t.cards.length, 0);
  totalStarsEl.textContent = state.stars;
  totalLearnedEl.textContent = learnedCount;

  const srsSum = typeof window.getSrsSummary === 'function' ? window.getSrsSummary() : null;
  const msSum = typeof window.getMilestonesSummary === 'function' ? window.getMilestonesSummary() : null;

  const dailyGoal = 10;
  const todayActions = Math.min(dailyGoal, (srsSum ? srsSum.reviewedToday : 0) + Math.min(learnedCount, dailyGoal));
  const percent = Math.round((todayActions / dailyGoal) * 100);
  missionTextEl.textContent = `${ todayActions } / ${ dailyGoal } mục tiêu hôm nay`;
  missionBarEl.style.width = `${ percent }%`;

  const wordsMetric = document.getElementById('metric-words-val');
  if (wordsMetric) wordsMetric.textContent = `${ learnedCount } / ${ totalWords.toLocaleString('vi-VN') }`;

  const ankiMetric = document.getElementById('metric-anki-val');
  if (ankiMetric && srsSum) {
    ankiMetric.textContent = srsSum.dueActionable > 0
      ? `${ srsSum.dueActionable } cần ôn`
      : `${ srsSum.newAvailable } thẻ mới`;
  }

  const msMetric = document.getElementById('metric-milestones-val');
  if (msMetric && msSum) {
    msMetric.textContent = `${ msSum.passedTotal } / ${ msSum.totalMilestones } mốc`;
  }

  const videosMetric = document.getElementById('metric-videos-val');
  if (videosMetric) videosMetric.textContent = `${ state.completedEpisodes.size }/6 • ${ state.learnedLetters.size }/26`;

  const hubSrsSub = document.getElementById('hub-srs-sub');
  if (hubSrsSub && srsSum) {
    hubSrsSub.textContent = `🔵 ${ srsSum.newAvailable } mới • 🟢 ${ srsSum.dueActionable } cần ôn`;
  }

  const hubMsSub = document.getElementById('hub-milestones-sub');
  if (hubMsSub && msSum) {
    hubMsSub.textContent = `16 Bài thi • Đạt ${ msSum.passedTotal }/${ msSum.totalMilestones } mốc`;
  }

  const cefrBadge = document.getElementById('current-cefr-badge');
  if (cefrBadge) cefrBadge.textContent = getCurrentCefrRank();

  soundIconEl.textContent = state.soundEnabled ? '🔊' : '🔇';
  renderCefrRoadmap();
}

function renderRecentActivityCard() {
  const iconEl = document.getElementById('recent-icon');
  const titleEl = document.getElementById('home-heading');
  const subEl = document.getElementById('recent-subtitle');
  const btnEl = document.getElementById('btn-continue-recent');
  if (!iconEl || !titleEl || !subEl || !btnEl) return;

  const act = state.lastActivity;
  if (!act) {
    iconEl.textContent = '🦁';
    titleEl.textContent = 'Động Vật & Thú Cưng (Pre-A1)';
    subEl.textContent = 'Chạm nút bên dưới để bắt đầu hành trình 2.000 từ cùng Sư Tử Leo!';
    btnEl.textContent = '▶ Bắt đầu học ngay ➔';
    return;
  }

  iconEl.textContent = act.icon || '⭐';
  titleEl.textContent = act.title || 'Tiếp tục bài học';
  subEl.textContent = act.subtitle || 'Quay lại đúng nơi bé vừa học lúc trước!';
  btnEl.textContent = '▶ Tiếp tục học ngay ➔';
}

function renderCefrRoadmap() {
  const grid = document.getElementById('cefr-path-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const msResults = (state.milestones && state.milestones.results) || {};

  CEFR_LEVELS.forEach(lvl => {
    const levelTopics = TOPICS_DATA.filter(t => t.level === lvl.id);
    const totalInLevel = levelTopics.reduce((s, t) => s + t.cards.length, 0);
    const learnedInLevel = levelTopics.reduce(
      (s, t) => s + t.cards.filter(c => state.learnedIds.has(c.id)).length,
      0
    );
    const pct = totalInLevel > 0 ? Math.round((learnedInLevel / totalInLevel) * 100) : 0;
    const bossPassed = !!(msResults[`m_${ lvl.id }_boss`] && msResults[`m_${ lvl.id }_boss`].passed);

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `cefr-step-card ${ bossPassed ? 'is-boss-passed' : '' }`;
    card.id = `cefr-card-${ lvl.id }`;
    card.style.setProperty('--cefr-color', lvl.color);
    card.style.setProperty('--cefr-bg', lvl.bg);

    card.innerHTML = `
      <div class="cefr-step-top">
        <span class="cefr-step-icon">${ bossPassed ? '👑' : lvl.icon }</span>
        <span class="cefr-step-code">${ lvl.name }</span>
        <span class="cefr-step-pct">${ pct }%</span>
      </div>
      <div class="cefr-step-sub">${ lvl.subtitle }</div>
      <div class="cefr-mini-track"><div class="cefr-mini-fill" style="width:${ pct }%"></div></div>
      <div class="cefr-step-meta">${ learnedInLevel }/${ totalInLevel } từ • ${ bossPassed ? 'Đã vượt mốc ✅' : `${ levelTopics.length } chủ đề` }</div>
    `;

    card.addEventListener('click', () => {
      playSoundEffect('pop');
      openVocabHub(lvl.id);
    });
    grid.appendChild(card);
  });
}

function openView(viewId) {
  document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openVocabHub(cefrLevel = null) {
  if (cefrLevel) {
    state.activeCefrFilter = cefrLevel;
  }
  document.querySelectorAll('#cefr-filter-bar [data-cefr]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cefr === state.activeCefrFilter);
  });
  renderTopicsGrid();
  openView('view-vocab-hub');
}

function renderTopicsGrid() {
  const grid = document.getElementById('topics-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = state.activeCefrFilter === 'all'
    ? TOPICS_DATA
    : TOPICS_DATA.filter(t => t.level === state.activeCefrFilter);

  filtered.forEach(topic => {
    const learnedInTopic = topic.cards.filter(c => state.learnedIds.has(c.id)).length;
    const totalInTopic = topic.cards.length;

    const cardBtn = document.createElement('button');
    cardBtn.type = 'button';
    cardBtn.className = 'topic-card';
    cardBtn.id = `topic-card-${ topic.id }`;
    cardBtn.style.setProperty('--topic-accent', topic.theme.accent);
    cardBtn.style.setProperty('--topic-border', topic.theme.border);
    cardBtn.style.setProperty('--topic-shadow', topic.theme.shadow);
    cardBtn.style.setProperty('--topic-bg-soft', topic.theme.bgSoft);

    cardBtn.innerHTML = `
      <div>
        <div class="topic-card-top">
          <div class="topic-icon-bubble" aria-hidden="true">${ topic.icon }</div>
          <div class="topic-info">
            <div class="topic-title-row">
              <h3>${ topic.titleVi }</h3>
              <span class="topic-cefr-tag cefr-${ (topic.level || 'A1').toLowerCase() }">${ topic.level || 'A1' }</span>
            </div>
            <span class="topic-en-subtitle">${ topic.titleEn }</span>
          </div>
        </div>
        <p class="topic-desc">${ topic.description }</p>
      </div>
      <div class="topic-card-footer">
        <span class="topic-progress-badge">
          ⭐ <strong>${ learnedInTopic }/${ totalInTopic }</strong>
        </span>
        <span class="topic-play-cta">Học ngay ➔</span>
      </div>
    `;

    cardBtn.addEventListener('click', () => {
      playSoundEffect('pop');
      openTopicDeck(topic.id, 'learn');
    });

    grid.appendChild(cardBtn);
  });
}

/* ==========================================================================
   UI Rendering: Flashcard Deck View
   ========================================================================== */
function getCurrentTopic() {
  return TOPICS_DATA.find(t => t.id === state.currentTopicId) || TOPICS_DATA[0];
}

function openTopicDeck(topicId, initialMode = 'learn', startIndex = 0) {
  state.currentTopicId = topicId;
  state.currentCardIndex = startIndex;
  state.isFlipped = false;

  openView('view-flashcard');

  const topic = getCurrentTopic();
  document.getElementById('current-topic-icon').textContent = topic.icon;
  document.getElementById('current-topic-title').textContent = `${ topic.titleVi } [${ topic.level || 'A1' }]`;

  const lessonNum = Math.floor(startIndex / LESSON_SIZE) + 1;
  window.recordActivity({
    kind: 'vocab',
    topicId: topic.id,
    cardIndex: startIndex,
    icon: topic.icon,
    title: `${ topic.titleVi } (${ topic.level || 'A1' })`,
    subtitle: `Thẻ từ vựng • Bài ${ lessonNum } (Từ ${ startIndex + 1 }/${ topic.cards.length })`
  });

  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.style.setProperty('--card-accent-border', topic.theme.border);
  flashcard3d.style.setProperty('--card-accent-shadow', topic.theme.shadow);

  switchMode(initialMode);
}

function switchMode(mode) {
  state.activeMode = mode;
  const tabLearn = document.getElementById('tab-mode-learn');
  const tabQuiz = document.getElementById('tab-mode-quiz');
  const subviewLearn = document.getElementById('subview-learn');
  const subviewQuiz = document.getElementById('subview-quiz');
  const dotsBar = document.getElementById('card-dots-bar');
  const lessonBar = document.getElementById('lesson-sets-bar');

  if (mode === 'learn') {
    tabLearn.classList.add('active');
    tabLearn.setAttribute('aria-selected', 'true');
    tabQuiz.classList.remove('active');
    tabQuiz.setAttribute('aria-selected', 'false');

    subviewLearn.classList.remove('hidden');
    dotsBar.classList.remove('hidden');
    if (lessonBar) lessonBar.classList.remove('hidden');
    subviewQuiz.classList.add('hidden');

    renderCurrentFlashcard(true);
  } else {
    tabQuiz.classList.add('active');
    tabQuiz.setAttribute('aria-selected', 'true');
    tabLearn.classList.remove('active');
    tabLearn.setAttribute('aria-selected', 'false');

    subviewLearn.classList.add('hidden');
    dotsBar.classList.add('hidden');
    if (lessonBar) lessonBar.classList.add('hidden');
    subviewQuiz.classList.remove('hidden');

    startTopicQuiz(getCurrentTopic().cards);
  }
}

function renderCardDots() {
  const topic = getCurrentTopic();
  const total = topic.cards.length;
  const currentLesson = Math.floor(state.currentCardIndex / LESSON_SIZE);
  const totalLessons = Math.ceil(total / LESSON_SIZE);

  // Render Lesson Set pills (Bài 1..Bài 5) for 50-word topics
  const lessonBar = document.getElementById('lesson-sets-bar');
  if (lessonBar) {
    lessonBar.innerHTML = '';
    if (totalLessons > 1) {
      for (let l = 0; l < totalLessons; l++) {
        const start = l * LESSON_SIZE;
        const end = Math.min(start + LESSON_SIZE, total);
        const learnedInSet = topic.cards.slice(start, end).filter(c => state.learnedIds.has(c.id)).length;
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `filter-pill ${ l === currentLesson ? 'active' : '' }`;
        pill.textContent = `Bài ${ l + 1 } (${ start + 1 }–${ end })${ learnedInSet > 0 ? ` ⭐${ learnedInSet }` : '' }`;
        pill.addEventListener('click', () => {
          playSoundEffect('pop');
          state.currentCardIndex = start;
          state.isFlipped = false;
          renderCurrentFlashcard(true);
        });
        lessonBar.appendChild(pill);
      }
    }
  }

  // Render only the 10 dots in the active lesson so the UI stays clean
  const dotsBar = document.getElementById('card-dots-bar');
  dotsBar.innerHTML = '';
  const sliceStart = currentLesson * LESSON_SIZE;
  const sliceEnd = Math.min(sliceStart + LESSON_SIZE, total);

  for (let index = sliceStart; index < sliceEnd; index++) {
    const card = topic.cards[index];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-dot-btn';
    if (index === state.currentCardIndex) btn.classList.add('active');
    if (state.learnedIds.has(card.id)) btn.classList.add('learned');
    btn.textContent = typeof card.numberVal === 'number' ? String(card.numberVal) : card.emoji;
    btn.title = `${ card.en } - ${ card.vi }`;

    btn.addEventListener('click', () => {
      playSoundEffect('pop');
      state.currentCardIndex = index;
      state.isFlipped = false;
      renderCurrentFlashcard(true);
    });

    dotsBar.appendChild(btn);
  }
}

function buildCardIllustrationHTML(card) {
  if (card.colorHex) {
    return `
      <div class="color-swatch-giant" style="background: ${ card.colorHex };">
        <span>${ card.emoji }</span>
      </div>
    `;
  }
  if (typeof card.numberVal === 'number') {
    const isLarge = card.numberVal > 10;
    const repeatedIcons = Array.from({ length: card.numberVal }, () => card.countIcon).join('');
    return `
      <div class="number-badge-giant ${ isLarge ? 'is-large' : '' }">
        <span>${ card.numberVal }</span>
        <div class="number-dots-row ${ isLarge ? 'compact' : '' }">${ repeatedIcons }</div>
      </div>
    `;
  }
  return `<div class="art-emoji-giant">${ card.emoji }</div>`;
}

function renderCurrentFlashcard(autoSpeak = false) {
  const topic = getCurrentTopic();
  const card = topic.cards[state.currentCardIndex];
  if (!card) return;

  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.classList.toggle('is-flipped', state.isFlipped);

  // Front side elements
  document.getElementById('card-index-badge').textContent = `${ state.currentCardIndex + 1 } / ${ topic.cards.length }`;
  const posEl = document.getElementById('card-pos-badge');
  if (posEl) {
    const posLabels = { n: 'Danh từ', v: 'Động từ', adj: 'Tính từ', adv: 'Trạng từ', conj: 'Liên từ', num: 'Số đếm', phrase: 'Giao tiếp' };
    posEl.textContent = posLabels[card.pos] || '';
    posEl.classList.toggle('hidden', !card.pos);
  }

  const isLearned = state.learnedIds.has(card.id);
  const learnedBadge = document.getElementById('card-learned-badge');
  learnedBadge.classList.toggle('visible', isLearned);

  const artBox = document.getElementById('card-illustration-box');
  artBox.style.setProperty('--card-art-bg', card.artBg || '#FFF5D6');
  artBox.innerHTML = buildCardIllustrationHTML(card);

  document.getElementById('card-en-word').textContent = card.en;
  document.getElementById('card-phonetic').textContent = card.phonetic;

  const syllablesEl = document.getElementById('card-syllables');
  syllablesEl.innerHTML = card.syllables
    .map(syl => `<span class="syllable-chip">${ syl }</span>`)
    .join('');

  // Back side elements
  document.getElementById('back-mini-illustration').textContent = typeof card.numberVal === 'number' ? card.countIcon : card.emoji;
  document.getElementById('back-en-word').textContent = `${ card.en } ${ card.phonetic }`;
  document.getElementById('back-vi-word').textContent = card.vi;
  document.getElementById('card-example-en').textContent = `"${ card.exampleEn }"`;
  document.getElementById('card-example-vi').textContent = card.exampleVi;
  document.getElementById('card-fact-text').textContent = card.funFact;

  // Mastered button state
  const markBtn = document.getElementById('btn-mark-learned');
  const markIcon = document.getElementById('mark-learned-icon');
  const markText = document.getElementById('mark-learned-text');

  if (isLearned) {
    markBtn.classList.add('is-learned');
    markIcon.textContent = '🌟';
    markText.textContent = 'Đã thuộc! (Nhận +1 Sao)';
  } else {
    markBtn.classList.remove('is-learned');
    markIcon.textContent = '⭐';
    markText.textContent = 'Bé đã thuộc từ này!';
  }

  renderCardDots();

  if (autoSpeak) {
    setTimeout(() => speakEnglish(card.en, 0.88), 180);
  }
}

function flipFlashcard() {
  state.isFlipped = !state.isFlipped;
  playSoundEffect('flip');
  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.classList.toggle('is-flipped', state.isFlipped);
}

function navigateCard(delta) {
  const topic = getCurrentTopic();
  const count = topic.cards.length;
  state.currentCardIndex = (state.currentCardIndex + delta + count) % count;
  state.isFlipped = false;
  playSoundEffect('pop');
  renderCurrentFlashcard(true);
}

function toggleMarkCardLearned() {
  const topic = getCurrentTopic();
  const card = topic.cards[state.currentCardIndex];
  if (!card) return;

  if (!state.learnedIds.has(card.id)) {
    state.learnedIds.add(card.id);
    state.stars += 1;
    if (typeof window.enrollCardInSrs === 'function') {
      window.enrollCardInSrs(card.id);
    }
    playSoundEffect('star');
    launchConfettiBurst();
    speakEnglish(`Awesome! ${ card.en }!`, 0.95);
  } else {
    state.learnedIds.delete(card.id);
    state.stars = Math.max(0, state.stars - 1);
    playSoundEffect('pop');
  }

  saveProgress();
  updateHeaderAndMissionUI();
  renderCurrentFlashcard(false);
}

/* ==========================================================================
   Listening Mini-Quiz Mode (Interactive Audio Challenge)
   ========================================================================== */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startTopicQuiz(cardsPool) {
  const allCards = TOPICS_DATA.flatMap(t => t.cards);
  const sourceCards = cardsPool && cardsPool.length >= 4 ? cardsPool : allCards;

  state.quiz.pool = shuffleArray(sourceCards).slice(0, 8);
  state.quiz.currentIndex = 0;
  state.quiz.streak = 0;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qIndex = state.quiz.currentIndex;
  const totalQ = state.quiz.pool.length;
  const targetCard = state.quiz.pool[qIndex];
  state.quiz.currentAnswer = targetCard;
  state.quiz.answered = false;

  document.getElementById('quiz-progress-label').textContent = `Câu ${ qIndex + 1 } / ${ totalQ }`;
  document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ state.quiz.streak }`;

  const wordReveal = document.getElementById('quiz-word-reveal');
  wordReveal.textContent = targetCard.en;
  wordReveal.classList.add('hidden');

  document.getElementById('quiz-feedback-banner').classList.add('hidden');

  // Build 4 options (1 target + 3 distractors)
  const allCards = TOPICS_DATA.flatMap(t => t.cards);
  const distractors = shuffleArray(allCards.filter(c => c.id !== targetCard.id)).slice(0, 3);
  const options = shuffleArray([targetCard, ...distractors]);

  const grid = document.getElementById('quiz-options-grid');
  grid.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.dataset.cardId = opt.id;
    const visualHTML = opt.colorHex
      ? `<span class="opt-swatch" style="background:${ opt.colorHex }"></span>`
      : typeof opt.numberVal === 'number'
        ? `<span class="opt-num-badge">${ opt.numberVal }</span>`
        : `<span class="opt-emoji">${ opt.emoji }</span>`;
    btn.innerHTML = `
      ${ visualHTML }
      <span class="opt-vi-label">${ opt.vi }</span>
    `;

    btn.addEventListener('click', () => handleQuizOptionClick(btn, opt));
    grid.appendChild(btn);
  });

  setTimeout(() => speakEnglish(targetCard.en, 0.86), 220);
}

function handleQuizOptionClick(clickedBtn, chosenCard) {
  if (state.quiz.answered) return;
  const target = state.quiz.currentAnswer;

  if (chosenCard.id === target.id) {
    state.quiz.answered = true;
    state.quiz.streak += 1;
    state.stars += 2;
    state.learnedIds.add(target.id);
    saveProgress();
    updateHeaderAndMissionUI();

    clickedBtn.classList.add('correct');
    playSoundEffect('correct');
    launchConfettiBurst();
    speakEnglish(`Great job! ${ target.en }!`, 0.95);

    const wordReveal = document.getElementById('quiz-word-reveal');
    wordReveal.classList.remove('hidden');

    const banner = document.getElementById('quiz-feedback-banner');
    const msg = document.getElementById('quiz-feedback-msg');
    const nextBtn = document.getElementById('btn-quiz-next');

    const isLast = state.quiz.currentIndex >= state.quiz.pool.length - 1;
    msg.textContent = `🎉 Giỏi quá! "${ target.en }" là ${ target.vi }! (+2 Sao)`;
    nextBtn.textContent = isLast ? '🏆 Hoàn thành & Chơi lại' : 'Câu tiếp theo ➔';
    banner.classList.remove('hidden');
    document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ state.quiz.streak }`;
  } else {
    state.quiz.streak = 0;
    document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: 0`;
    clickedBtn.classList.add('wrong');
    clickedBtn.disabled = true;
    playSoundEffect('wrong');
    speakEnglish(target.en, 0.85);
  }
}

/* ==========================================================================
   Celebration Confetti Particle System
   ========================================================================== */
function launchConfettiBurst() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FF7A00', '#FFC700', '#22C55E', '#22A2F2', '#FF4D8D', '#A855F7'];
  const particles = Array.from({ length: 55 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 140,
    y: canvas.height * 0.45,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 13 - 4,
    size: Math.random() * 9 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    vRot: (Math.random() - 0.5) * 12,
    gravity: 0.42
  }));

  let frameCount = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;

      if (p.y < canvas.height + 30) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      }
    });

    frameCount++;
    if (activeParticles > 0 && frameCount < 110) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   Event Listeners & Initialization
   ========================================================================== */
function bindEvents() {
  // Navigation back to Home
  const goHome = () => {
    playSoundEffect('pop');
    openView('view-home');
    updateHeaderAndMissionUI();
    renderRecentActivityCard();
  };

  document.getElementById('btn-home-logo').addEventListener('click', goHome);
  document.getElementById('btn-vocab-hub-back').addEventListener('click', goHome);
  document.getElementById('btn-stories-hub-back').addEventListener('click', goHome);
  document.getElementById('btn-games-hub-back').addEventListener('click', goHome);

  // From Flashcard Deck -> back to Vocabulary Library
  document.getElementById('btn-back-to-home').addEventListener('click', () => {
    playSoundEffect('pop');
    openVocabHub();
  });

  // 6 Main Content Hub buttons on Home
  document.getElementById('hub-btn-vocab').addEventListener('click', () => {
    playSoundEffect('pop');
    openVocabHub('all');
  });
  const srsHubBtn = document.getElementById('hub-btn-srs');
  if (srsHubBtn) {
    srsHubBtn.addEventListener('click', () => {
      playSoundEffect('pop');
      if (typeof window.openSrsHub === 'function') window.openSrsHub();
    });
  }
  const msHubBtn = document.getElementById('hub-btn-milestones');
  if (msHubBtn) {
    msHubBtn.addEventListener('click', () => {
      playSoundEffect('pop');
      if (typeof window.openMilestonesHub === 'function') window.openMilestonesHub();
    });
  }
  const cefrMsBtn = document.getElementById('btn-cefr-open-milestones');
  if (cefrMsBtn) {
    cefrMsBtn.addEventListener('click', () => {
      playSoundEffect('pop');
      if (typeof window.openMilestonesHub === 'function') window.openMilestonesHub();
    });
  }
  document.getElementById('hub-btn-stories').addEventListener('click', () => {
    playSoundEffect('pop');
    openView('view-stories-hub');
  });
  document.getElementById('hub-btn-games').addEventListener('click', () => {
    playSoundEffect('pop');
    openView('view-games-hub');
  });
  document.getElementById('hub-btn-phonics').addEventListener('click', () => {
    playSoundEffect('pop');
    if (typeof window.openPhonicsView === 'function') {
      window.openPhonicsView('board');
    } else {
      openView('view-phonics');
    }
  });

  // Continue Learning (Bài mới nhất vừa học)
  document.getElementById('btn-continue-recent').addEventListener('click', () => {
    playSoundEffect('pop');
    const act = state.lastActivity;
    if (!act) {
      openTopicDeck(TOPICS_DATA[0].id, 'learn', 0);
      return;
    }
    if (act.kind === 'srs' && typeof window.openSrsHub === 'function') {
      window.openSrsHub();
    } else if (act.kind === 'milestone' && typeof window.openMilestonesHub === 'function') {
      window.openMilestonesHub();
    } else if (act.kind === 'story' && typeof window.openStoryEpisode === 'function') {
      window.openStoryEpisode(act.epIndex || 0);
    } else if (act.kind === 'game' && typeof window.openMiniGame === 'function') {
      window.openMiniGame(act.gameName || 'memory');
    } else if (act.kind === 'phonics' && typeof window.openPhonicsView === 'function') {
      window.openPhonicsView(act.tab || 'board');
    } else {
      openTopicDeck(act.topicId || TOPICS_DATA[0].id, 'learn', act.cardIndex || 0);
    }
  });

  // CEFR Level Filter Pills inside Vocabulary Library
  document.querySelectorAll('#cefr-filter-bar [data-cefr]').forEach(btn => {
    btn.addEventListener('click', () => {
      playSoundEffect('pop');
      state.activeCefrFilter = btn.dataset.cefr;
      document.querySelectorAll('#cefr-filter-bar [data-cefr]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTopicsGrid();
    });
  });

  // Quick Quiz All Topics button inside Vocabulary Library
  document.getElementById('btn-quick-quiz-all').addEventListener('click', () => {
    playSoundEffect('pop');
    openTopicDeck(TOPICS_DATA[0].id, 'quiz');
    const allCards = TOPICS_DATA.flatMap(t => t.cards);
    document.getElementById('current-topic-icon').textContent = '🎮';
    document.getElementById('current-topic-title').textContent = 'Ôn Tập Tất Cả Chủ Đề';
    startTopicQuiz(allCards);
  });

  // Sound toggle
  document.getElementById('btn-sound-toggle').addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    saveProgress();
    updateHeaderAndMissionUI();
    if (state.soundEnabled) playSoundEffect('pop');
  });

  // Mode tabs inside Flashcard Deck
  document.getElementById('tab-mode-learn').addEventListener('click', () => {
    playSoundEffect('pop');
    switchMode('learn');
  });

  document.getElementById('tab-mode-quiz').addEventListener('click', () => {
    playSoundEffect('pop');
    switchMode('quiz');
  });

  // Flashcard 3D flip interactions
  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.addEventListener('click', e => {
    if (e.target.closest('button')) return;
    flipFlashcard();
  });

  flashcard3d.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flipFlashcard();
    }
  });

  document.getElementById('btn-toggle-flip').addEventListener('click', flipFlashcard);
  document.getElementById('btn-flip-to-front').addEventListener('click', e => {
    e.stopPropagation();
    flipFlashcard();
  });

  // Audio controls on card
  document.getElementById('btn-speak-normal').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.en, 0.9);
  });

  document.getElementById('btn-speak-slow').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.en, 0.55);
  });

  document.getElementById('btn-speak-spell').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) spellWordOutLoud(card.en);
  });

  document.getElementById('btn-speak-sentence').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.exampleEn, 0.85);
  });

  // Prev / Next Card Arrows + Keyboard Arrows
  document.getElementById('btn-prev-card').addEventListener('click', () => navigateCard(-1));
  document.getElementById('btn-next-card').addEventListener('click', () => navigateCard(1));

  window.addEventListener('keydown', e => {
    const inFlashcardView = document.getElementById('view-flashcard').classList.contains('active');
    if (!inFlashcardView || state.activeMode !== 'learn') return;
    if (e.key === 'ArrowRight') navigateCard(1);
    if (e.key === 'ArrowLeft') navigateCard(-1);
  });

  // Mark as Learned button
  document.getElementById('btn-mark-learned').addEventListener('click', toggleMarkCardLearned);

  // Quiz Buttons
  document.getElementById('btn-quiz-replay').addEventListener('click', () => {
    if (state.quiz.currentAnswer) {
      speakEnglish(state.quiz.currentAnswer.en, 0.85);
    }
  });

  document.getElementById('btn-quiz-show-word').addEventListener('click', () => {
    document.getElementById('quiz-word-reveal').classList.remove('hidden');
  });

  document.getElementById('btn-quiz-next').addEventListener('click', () => {
    playSoundEffect('pop');
    if (state.quiz.currentIndex < state.quiz.pool.length - 1) {
      state.quiz.currentIndex += 1;
      renderQuizQuestion();
    } else {
      startTopicQuiz(getCurrentTopic().cards);
    }
  });

  // Roadmap Modal
  const roadmapModal = document.getElementById('roadmap-modal');
  const openRoadmap = () => {
    playSoundEffect('pop');
    roadmapModal.classList.remove('hidden');
  };
  const closeRoadmap = () => {
    playSoundEffect('pop');
    roadmapModal.classList.add('hidden');
  };

  document.getElementById('btn-roadmap-modal').addEventListener('click', openRoadmap);
  document.getElementById('btn-close-roadmap').addEventListener('click', closeRoadmap);
  document.getElementById('btn-ok-roadmap').addEventListener('click', closeRoadmap);

  document.getElementById('btn-reset-progress').addEventListener('click', () => {
    state.stars = 0;
    state.learnedIds.clear();
    state.learnedLetters.clear();
    state.completedEpisodes.clear();
    state.lastActivity = null;
    state.srs = {
      cards: {},
      stats: { todayDate: '', reviewedToday: 0, newToday: 0, streakDays: 0, lastStudyDate: null, totalReviews: 0, dailyNewLimit: 20 }
    };
    state.milestones = { results: {}, placement: null };
    saveProgress();
    updateHeaderAndMissionUI();
    renderRecentActivityCard();
    renderTopicsGrid();
    if (typeof window.refreshPhonicsUI === 'function') window.refreshPhonicsUI();
    if (typeof window.refreshSrsUI === 'function') window.refreshSrsUI();
    if (typeof window.refreshMilestonesUI === 'function') window.refreshMilestonesUI();
    closeRoadmap();
  });
}

function bindVocabSearch() {
  const input = document.getElementById('vocab-search-input');
  const resultsBox = document.getElementById('vocab-search-results');
  const clearBtn = document.getElementById('btn-clear-search');
  if (!input || !resultsBox) return;

  const renderSearch = () => {
    const q = input.value.trim().toLowerCase();
    if (clearBtn) clearBtn.classList.toggle('hidden', q.length === 0);

    if (q.length < 2) {
      resultsBox.classList.add('hidden');
      resultsBox.innerHTML = '';
      return;
    }

    const matches = [];
    for (const topic of TOPICS_DATA) {
      for (let idx = 0; idx < topic.cards.length; idx++) {
        const card = topic.cards[idx];
        if (card.en.toLowerCase().includes(q) || card.vi.toLowerCase().includes(q)) {
          matches.push({ topic, card, idx });
          if (matches.length >= 12) break;
        }
      }
      if (matches.length >= 12) break;
    }

    resultsBox.classList.remove('hidden');
    if (matches.length === 0) {
      resultsBox.innerHTML = '<div class="search-empty">Không tìm thấy từ phù hợp. Bé thử gõ từ khác nhé! 🔍</div>';
      return;
    }

    resultsBox.innerHTML = '';
    matches.forEach(({ topic, card, idx }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-result-item';
      btn.innerHTML = `
        <span class="sri-emoji">${ card.emoji }</span>
        <div class="sri-text">
          <strong>${ card.en }</strong>
          <span>${ card.vi } • <em>${ topic.titleVi } (${ topic.level || 'A1' })</em></span>
        </div>
        <span class="sri-go">Mở thẻ ➔</span>
      `;
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        input.value = '';
        resultsBox.classList.add('hidden');
        if (clearBtn) clearBtn.classList.add('hidden');
        openTopicDeck(topic.id, 'learn', idx);
      });
      resultsBox.appendChild(btn);
    });
  };

  input.addEventListener('input', renderSearch);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      renderSearch();
      input.focus();
    });
  }
}

// Preload SpeechSynthesis voices on browsers that load them asynchronously
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  updateHeaderAndMissionUI();
  renderRecentActivityCard();
  renderTopicsGrid();
  bindEvents();
  bindVocabSearch();
});
