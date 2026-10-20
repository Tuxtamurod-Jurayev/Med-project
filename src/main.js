import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { Real3DSceneManager } from './scene/real3dScene.js';
import { ARCameraManager } from './camera/arCamera.js';

// Application State
let currentModelKey = 'brain';
let currentMode = 'studio'; // 'studio' | 'camera'
let currentQuizScore = 0;
let userAnswers = {};
let activeSystemFilter = 'all';
let focusedSearchIndex = -1;
let currentSearchResults = [];

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const cameraFeed = document.getElementById('cameraFeed');
const arReticle = document.getElementById('arReticle');
const btnArDetect = document.getElementById('btnArDetect');
const loadingBanner = document.getElementById('loadingBanner');
const loadingText = document.getElementById('loadingText');

// Mode Switch & Camera Controls
const modeStudioBtn = document.getElementById('modeStudioBtn');
const modeCameraBtn = document.getElementById('modeCameraBtn');
const cameraControlsDock = document.getElementById('cameraControlsDock');
const arOpacitySlider = document.getElementById('arOpacitySlider');
const switchCameraBtn = document.getElementById('switchCameraBtn');
const cameraStatusIndicator = document.getElementById('cameraStatusIndicator');

// Search Elements
const anatomySearchInput = document.getElementById('anatomySearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchResultsDropdown = document.getElementById('searchResultsDropdown');
const activeBadgeDisplay = document.getElementById('activeBadgeDisplay');
const activeOrganTitle = document.getElementById('activeOrganTitle');
const activeOrganLatin = document.getElementById('activeOrganLatin');
const activeOrganSystem = document.getElementById('activeOrganSystem');
const systemChips = document.querySelectorAll('.sys-chip');

// Mobile Modal Elements
const mobileOrganModal = document.getElementById('mobileOrganModal');
const closeOrganModal = document.getElementById('closeOrganModal');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileOrganGrid = document.getElementById('mobileOrganGrid');

// 3D Tool Buttons
const resetCamBtn = document.getElementById('resetCamBtn');
const xrayBtn = document.getElementById('xrayBtn');
const wireframeBtn = document.getElementById('wireframeBtn');
const autoRotateBtn = document.getElementById('autoRotateBtn');
const snapshotBtn = document.getElementById('snapshotBtn');
const speakNameBtn = document.getElementById('speakNameBtn');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Sidebar & Tabs
const infoSidebar = document.getElementById('infoSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const drawerHandle = document.getElementById('drawerHandle');
const navSTabs = document.querySelectorAll('.nav-s-tab');

// Sidebar Fields
const organNameUz = document.getElementById('organNameUz');
const organNameLat = document.getElementById('organNameLat');
const organCategory = document.getElementById('organCategory');
const organSystem = document.getElementById('organSystem');
const organSpecs = document.getElementById('organSpecs');
const organDescription = document.getElementById('organDescription');
const partsList = document.getElementById('partsList');
const functionsList = document.getElementById('functionsList');
const clinicalList = document.getElementById('clinicalList');
const quizContainer = document.getElementById('quizContainer');
const quizScoreBadge = document.getElementById('quizScoreBadge');
const resetQuizBtn = document.getElementById('resetQuizBtn');

// Mobile Bottom Nav
const mNavOrgan = document.getElementById('mNavOrgan');
const mNavMode = document.getElementById('mNavMode');
const mNavInfo = document.getElementById('mNavInfo');
const mNavQuiz = document.getElementById('mNavQuiz');

// System color map
const SYSTEM_COLORS = {
  nervous: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', label: 'Nerv sistemasi' },
  circulatory: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', label: 'Qon aylanish' },
  respiratory: { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)', label: 'Nafas olish' },
  digestive: { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', label: 'Ovqat hazm' },
  musculoskeletal: { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)', label: 'Tayanch-harakat' },
  urinary: { color: '#facc15', bg: 'rgba(250, 204, 21, 0.12)', label: 'Siydik chiqarish' },
  endocrine: { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', label: 'Endokrin' },
  sensory: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', label: 'Sezgi a\'zolari' }
};

// SVG Icon Helper
function getOrganSvgIcon(systemKey) {
  switch (systemKey) {
    case 'circulatory':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.28"/></svg>`;
    case 'nervous':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A4.5 4.5 0 0 0 5 6.5c0 .7.17 1.36.46 1.95A4.5 4.5 0 0 0 4 12c0 1.25.5 2.39 1.33 3.22A4.5 4.5 0 0 0 5 17.5a4.5 4.5 0 0 0 4.5 4.5c1.17 0 2.22-.45 3-1.18.78.73 1.83 1.18 3 1.18a4.5 4.5 0 0 0 4.5-4.5c0-.68-.15-1.32-.42-1.9A4.5 4.5 0 0 0 20 12c0-1.13-.42-2.16-1.1-2.95.38-.7.6-1.5.6-2.35A4.5 4.5 0 0 0 14.5 2c-1.22 0-2.32.49-3.12 1.28A4.48 4.48 0 0 0 9.5 2z"/><path d="M12 4v16"/></svg>`;
    case 'respiratory':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v7"/><path d="M12 9l-3 3"/><path d="M12 9l3 3"/><path d="M17 10c2 1 3 3.5 3 6.5a6.5 6.5 0 0 1-6.5 6.5c-1 0-1.5-.5-1.5-1.5V12"/><path d="M7 10c-2 1-3 3.5-3 6.5A6.5 6.5 0 0 0 10.5 23c1 0 1.5-.5 1.5-1.5V12"/></svg>`;
    case 'digestive':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 6c-3 0-6 2-6 6 0 5 4 10 9 10s7-4 7-9c0-5-4-7-8-7"/><path d="M16 22v-3a2 2 0 0 1 2-2h2"/></svg>`;
    case 'musculoskeletal':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M8 20v2h8v-2"/><path d="M12 16v1"/><path d="M4 11a8 8 0 1 1 16 0c0 3-1.5 5.5-3 6.5V20H7v-2.5C5.5 16.5 4 14 4 11z"/></svg>`;
    case 'urinary':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4c-3.5 3-4 8-2 12s6 5 9 4 5-3 6-7-1-9-6-10c-3-.6-5 .5-7 1z"/><path d="M14 11a3 3 0 0 0-3 3"/></svg>`;
    case 'endocrine':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
    case 'sensory':
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    default:
      return `<svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
  }
}

// Normalize search text (remove accents and apostrophes)
function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/['`’‘ʻ]/g, '')
    .trim();
}

// Initialize 3D Scene Manager
const sceneManager = new Real3DSceneManager(canvasContainer, (isLoading, message) => {
  if (isLoading) {
    loadingBanner.classList.remove('hidden');
    loadingText.textContent = message;
  } else {
    loadingBanner.classList.add('hidden');
  }
});

// Initialize AR Camera Manager
const arCamera = new ARCameraManager(cameraFeed, (status) => {
  if (status === 'active') {
    cameraFeed.style.opacity = '1';
    arReticle.classList.remove('hidden');
    cameraControlsDock.classList.remove('hidden');
    sceneManager.setTransparentBackground(true);
    updateStatus('dot-active', 'AR Kamera Faol', '#10b981');
  } else {
    cameraFeed.style.opacity = '0';
    arReticle.classList.add('hidden');
    cameraControlsDock.classList.add('hidden');
    if (currentMode === 'studio') {
      sceneManager.setTransparentBackground(false);
      updateStatus('dot-idle', '3D Studio Rejimi', '#38bdf8');
    }
  }
});

function updateStatus(dotClass, text, color) {
  if (!cameraStatusIndicator) return;
  cameraStatusIndicator.innerHTML = `
    <span class="status-dot" style="background:${color}; box-shadow:0 0 8px ${color};"></span>
    <span style="color:${color}; font-weight:700;">${text}</span>
  `;
}

/**
 * AR CAMERA DETECTION TRIGGER
 */
if (btnArDetect) {
  btnArDetect.addEventListener('click', () => {
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.75 }
    });

    sceneManager.resetCamera();
    if (sceneManager.currentModelGroup) {
      sceneManager.currentModelGroup.scale.multiplyScalar(1.2);
      setTimeout(() => {
        sceneManager.loadModel(currentModelKey);
      }, 220);
    }

    if ('speechSynthesis' in window) {
      const data = ANATOMY_DATA[currentModelKey];
      const name = data ? data.nameUz : 'Anatomik a\'zo';
      const utterance = new SpeechSynthesisUtterance(`${name} 3D modeli aniqlandi va ishga tushirildi`);
      utterance.lang = 'uz';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  });
}

/**
 * MODE SWITCHING (3D Studio vs AR Kamera)
 */
async function switchMode(mode) {
  currentMode = mode;

  if (mode === 'studio') {
    modeStudioBtn.classList.add('active');
    modeCameraBtn.classList.remove('active');
    arCamera.stopCamera();
    sceneManager.setTransparentBackground(false);
    updateStatus('dot-idle', '3D Studio Rejimi', '#38bdf8');
  } else if (mode === 'camera') {
    modeCameraBtn.classList.add('active');
    modeStudioBtn.classList.remove('active');
    await arCamera.startCamera();
  }
}

if (modeStudioBtn) modeStudioBtn.addEventListener('click', () => switchMode('studio'));
if (modeCameraBtn) modeCameraBtn.addEventListener('click', () => switchMode('camera'));

/**
 * ORGAN SELECTION (Loads 3D Model + Medical Data)
 */
function selectOrgan(modelKey) {
  if (!ANATOMY_DATA[modelKey]) return;
  currentModelKey = modelKey;
  const data = ANATOMY_DATA[modelKey];

  // Update Active Badge Display
  if (activeOrganTitle) activeOrganTitle.textContent = data.nameUz;
  if (activeOrganLatin) activeOrganLatin.textContent = data.nameLat;
  if (activeOrganSystem) {
    activeOrganSystem.textContent = data.system;
    const sysMeta = SYSTEM_COLORS[data.systemKey];
    if (sysMeta) {
      activeOrganSystem.style.color = sysMeta.color;
      activeOrganSystem.style.background = sysMeta.bg;
      activeOrganSystem.style.borderColor = sysMeta.color;
    }
  }

  // Update input text & close dropdown
  if (anatomySearchInput) {
    anatomySearchInput.value = data.nameUz;
    if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
  }
  closeSearchDropdown();

  // Load 3D model
  sceneManager.loadModel(modelKey);

  // Render medical data in sidebar
  renderOrganData(modelKey);
}

/**
 * SEARCH FUNCTIONALITY
 */
function performSearch(query, systemFilter = 'all') {
  const normQuery = normalizeText(query);
  const results = [];

  for (const [key, item] of Object.entries(ANATOMY_DATA)) {
    // Check system filter
    if (systemFilter !== 'all' && item.systemKey !== systemFilter) {
      continue;
    }

    if (!normQuery) {
      results.push(item);
      continue;
    }

    // Match in nameUz, nameLat, nameEn, keywords, system, parts
    const matchUz = normalizeText(item.nameUz).includes(normQuery);
    const matchLat = normalizeText(item.nameLat).includes(normQuery);
    const matchEn = normalizeText(item.nameEn).includes(normQuery);
    const matchSystem = normalizeText(item.system).includes(normQuery);
    const matchKeywords = item.keywords && item.keywords.some(kw => normalizeText(kw).includes(normQuery));
    const matchParts = item.parts && item.parts.some(p => normalizeText(p.nameUz).includes(normQuery) || normalizeText(p.nameLat).includes(normQuery));

    if (matchUz || matchLat || matchEn || matchSystem || matchKeywords || matchParts) {
      // Prioritize exact or prefix matches
      const isPrefix = normalizeText(item.nameUz).startsWith(normQuery) || normalizeText(item.nameLat).startsWith(normQuery);
      results.push({
        ...item,
        score: isPrefix ? 2 : 1
      });
    }
  }

  // Sort by score
  results.sort((a, b) => (b.score || 0) - (a.score || 0));
  return results;
}

function renderSearchResults(results) {
  currentSearchResults = results;
  focusedSearchIndex = -1;

  if (results.length === 0) {
    searchResultsDropdown.innerHTML = `
      <div class="search-empty-state">
        <svg class="react-icon empty-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        <span class="empty-title">Mos keluvchi a'zo topilmadi</span>
        <span class="empty-sub">Boshqa so'z bilan qidiring yoki pastdagi tizimlardan tanlang</span>
      </div>
    `;
    searchResultsDropdown.classList.remove('hidden');
    return;
  }

  searchResultsDropdown.innerHTML = '';
  results.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = `search-result-card ${item.id === currentModelKey ? 'active' : ''}`;
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-index', idx);

    const sysMeta = SYSTEM_COLORS[item.systemKey] || { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', label: item.system };

    card.innerHTML = `
      <div class="card-icon-wrap" style="color:${sysMeta.color}; background:${sysMeta.bg}; border: 1px solid ${sysMeta.color}33;">
        ${getOrganSvgIcon(item.systemKey)}
      </div>
      <div class="card-text-wrap">
        <div class="card-title-row">
          <span class="card-name-uz">${item.nameUz}</span>
          <span class="card-sys-tag" style="color:${sysMeta.color}; background:${sysMeta.bg};">${sysMeta.label}</span>
        </div>
        <div class="card-sub-row">
          <span class="card-name-lat">${item.nameLat}</span>
          <span class="card-category-dot">•</span>
          <span class="card-category">${item.category}</span>
        </div>
      </div>
      <div class="card-action-icon">
        <svg class="react-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    `;

    card.addEventListener('click', () => {
      selectOrgan(item.id);
    });

    searchResultsDropdown.appendChild(card);
  });

  searchResultsDropdown.classList.remove('hidden');
}

function closeSearchDropdown() {
  searchResultsDropdown.classList.add('hidden');
  focusedSearchIndex = -1;
}

// Search Input Events
if (anatomySearchInput) {
  anatomySearchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (clearSearchBtn) clearSearchBtn.classList.toggle('hidden', !val);
    const results = performSearch(val, activeSystemFilter);
    renderSearchResults(results);
  });

  anatomySearchInput.addEventListener('focus', () => {
    const val = anatomySearchInput.value;
    const results = performSearch(val, activeSystemFilter);
    renderSearchResults(results);
  });

  anatomySearchInput.addEventListener('keydown', (e) => {
    if (searchResultsDropdown.classList.contains('hidden')) return;

    const cards = searchResultsDropdown.querySelectorAll('.search-result-card');
    if (cards.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedSearchIndex = (focusedSearchIndex + 1) % cards.length;
      updateFocusedCard(cards);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedSearchIndex = (focusedSearchIndex - 1 + cards.length) % cards.length;
      updateFocusedCard(cards);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedSearchIndex >= 0 && currentSearchResults[focusedSearchIndex]) {
        selectOrgan(currentSearchResults[focusedSearchIndex].id);
      } else if (currentSearchResults.length > 0) {
        selectOrgan(currentSearchResults[0].id);
      }
    } else if (e.key === 'Escape') {
      closeSearchDropdown();
    }
  });
}

function updateFocusedCard(cards) {
  cards.forEach((c, idx) => {
    c.classList.toggle('focused', idx === focusedSearchIndex);
    if (idx === focusedSearchIndex) {
      c.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
}

// Clear Search Button
if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    anatomySearchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    anatomySearchInput.focus();
    const results = performSearch('', activeSystemFilter);
    renderSearchResults(results);
  });
}

// Global hotkey '/' to focus search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== anatomySearchInput) {
    e.preventDefault();
    anatomySearchInput.focus();
    anatomySearchInput.select();
  } else if (e.key === 'Escape') {
    closeSearchDropdown();
  }
});

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  if (!anatomySearchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
    closeSearchDropdown();
  }
});

// System Filter Chips
systemChips.forEach(chip => {
  chip.addEventListener('click', () => {
    systemChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    activeSystemFilter = chip.getAttribute('data-system');
    const val = anatomySearchInput ? anatomySearchInput.value : '';
    const results = performSearch(val, activeSystemFilter);
    renderSearchResults(results);

    // If user clicked a specific system and the current organ doesn't belong to it, select first
    if (activeSystemFilter !== 'all' && results.length > 0) {
      const isCurrentInResults = results.some(r => r.id === currentModelKey);
      if (!isCurrentInResults) {
        selectOrgan(results[0].id);
      }
    }
  });
});

/**
 * POPULATE MOBILE ORGAN SELECTOR
 */
function renderMobileOrganGrid(filterText = '') {
  if (!mobileOrganGrid) return;
  mobileOrganGrid.innerHTML = '';

  const norm = normalizeText(filterText);
  const items = Object.values(ANATOMY_DATA).filter(item => {
    if (!norm) return true;
    return (
      normalizeText(item.nameUz).includes(norm) ||
      normalizeText(item.nameLat).includes(norm) ||
      normalizeText(item.system).includes(norm)
    );
  });

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = `m-organ-choice ${item.id === currentModelKey ? 'active' : ''}`;
    btn.setAttribute('data-model', item.id);

    const sysMeta = SYSTEM_COLORS[item.systemKey] || { color: '#38bdf8' };

    btn.innerHTML = `
      <div class="m-choice-icon" style="color:${sysMeta.color}">
        ${getOrganSvgIcon(item.systemKey)}
      </div>
      <div class="m-choice-text">
        <span class="m-o-name">${item.nameUz}</span>
        <span class="m-o-lat">${item.nameLat} • ${item.system}</span>
      </div>
    `;

    btn.addEventListener('click', () => {
      selectOrgan(item.id);
      mobileOrganModal.classList.add('hidden');
    });

    mobileOrganGrid.appendChild(btn);
  });
}

if (mobileSearchInput) {
  mobileSearchInput.addEventListener('input', (e) => {
    renderMobileOrganGrid(e.target.value);
  });
}

if (closeOrganModal) {
  closeOrganModal.addEventListener('click', () => {
    mobileOrganModal.classList.add('hidden');
  });
}

/**
 * RENDER ORGAN TEXT IN SIDEBAR
 */
function renderOrganData(modelKey) {
  const data = ANATOMY_DATA[modelKey];
  if (!data) return;

  currentQuizScore = 0;
  userAnswers = {};

  organNameUz.textContent = data.nameUz;
  organNameLat.textContent = `${data.nameLat} • ${data.nameEn}`;
  organCategory.textContent = data.category;
  organSystem.textContent = data.system;
  organSpecs.textContent = data.bonesCount ? data.bonesCount : data.weight;
  organDescription.textContent = data.description;

  // Render Parts
  partsList.innerHTML = '';
  data.parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
      <div class="part-header">
        <span class="part-name-uz">${part.nameUz}</span>
        <span class="part-name-lat">${part.nameLat}</span>
      </div>
      <p class="part-desc">${part.desc}</p>
    `;
    card.addEventListener('click', () => {
      if (sceneManager.currentModelGroup) {
        sceneManager.currentModelGroup.rotation.y += 0.45;
      }
    });
    partsList.appendChild(card);
  });

  // Render Functions
  functionsList.innerHTML = '';
  data.functions.forEach(fn => {
    const li = document.createElement('li');
    li.className = 'detail-item';
    li.textContent = fn;
    functionsList.appendChild(li);
  });

  // Render Clinical
  clinicalList.innerHTML = '';
  data.clinical.forEach(cl => {
    const li = document.createElement('li');
    li.className = 'detail-item';
    li.textContent = cl;
    clinicalList.appendChild(li);
  });

  // Render Quiz
  renderQuiz(data.quiz || []);
}

/**
 * RENDER QUIZ
 */
function renderQuiz(quizItems) {
  quizContainer.innerHTML = '';
  const total = quizItems.length;
  quizScoreBadge.textContent = `Ball: 0/${total}`;

  if (total === 0) {
    quizContainer.innerHTML = '<p class="quiz-empty-hint">Ushbu a\'zo bo\'yicha testlar tez kunda qo\'shiladi.</p>';
    return;
  }

  quizItems.forEach((q, qIdx) => {
    const qCard = document.createElement('div');
    qCard.className = 'quiz-q-card';

    const qTitle = document.createElement('div');
    qTitle.className = 'quiz-question-text';
    qTitle.textContent = `${qIdx + 1}. ${q.question}`;
    qCard.appendChild(qTitle);

    const ansList = document.createElement('div');
    ansList.className = 'quiz-answers-list';

    const correctIdx = (q.correct !== undefined) ? q.correct : q.answerIndex;

    q.options.forEach((opt, optIdx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz-ans-btn';
      optBtn.textContent = opt;

      optBtn.addEventListener('click', () => {
        if (userAnswers[qIdx] !== undefined) return;
        userAnswers[qIdx] = optIdx;

        const isCorrect = optIdx === correctIdx;
        if (isCorrect) {
          optBtn.classList.add('correct');
          currentQuizScore++;
          confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
        } else {
          optBtn.classList.add('wrong');
          if (ansList.children[correctIdx]) {
            ansList.children[correctIdx].classList.add('correct');
          }
        }

        quizScoreBadge.textContent = `Ball: ${currentQuizScore}/${total}`;

        if (Object.keys(userAnswers).length === total && currentQuizScore === total) {
          confetti({ particleCount: 85, spread: 100, origin: { y: 0.6 } });
        }
      });

      ansList.appendChild(optBtn);
    });

    qCard.appendChild(ansList);
    quizContainer.appendChild(qCard);
  });
}

// Reset Quiz
if (resetQuizBtn) {
  resetQuizBtn.addEventListener('click', () => {
    const data = ANATOMY_DATA[currentModelKey];
    if (data) renderQuiz(data.quiz || []);
  });
}

/**
 * 3D SCENE CONTROLS
 */
resetCamBtn.addEventListener('click', () => {
  sceneManager.resetCamera();
});

xrayBtn.addEventListener('click', () => {
  const active = sceneManager.toggleXRay();
  xrayBtn.classList.toggle('active', active);
});

wireframeBtn.addEventListener('click', () => {
  const active = sceneManager.toggleWireframe();
  wireframeBtn.classList.toggle('active', active);
});

autoRotateBtn.addEventListener('click', () => {
  const active = sceneManager.toggleAutoRotate();
  autoRotateBtn.classList.toggle('active', active);
});

snapshotBtn.addEventListener('click', () => {
  const dataUrl = sceneManager.captureSnapshot();
  const link = document.createElement('a');
  link.download = `medanatomy_${currentModelKey}.png`;
  link.href = dataUrl;
  link.click();
});

// Speak Latin Name
speakNameBtn.addEventListener('click', () => {
  if ('speechSynthesis' in window) {
    const data = ANATOMY_DATA[currentModelKey];
    if (!data) return;
    const utterance = new SpeechSynthesisUtterance(data.nameLat);
    utterance.lang = 'la';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
});

// Fullscreen
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });
}

// Toggle Sidebar on Desktop
if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener('click', () => {
    infoSidebar.classList.toggle('hidden-sidebar');
    setTimeout(() => sceneManager.onResize(), 150);
  });
}

// AR Opacity Slider & Camera Switch
if (arOpacitySlider) {
  arOpacitySlider.addEventListener('input', (e) => {
    arCamera.setOpacity(parseFloat(e.target.value));
  });
}

if (switchCameraBtn) {
  switchCameraBtn.addEventListener('click', () => {
    arCamera.switchCameraFacing();
  });
}

/**
 * SIDEBAR TABS (Tuzilishi, Vazifasi, Klinika, Test)
 */
navSTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    navSTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const tabKey = tab.getAttribute('data-tab');
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    const activePanel = document.getElementById(
      tabKey === 'parts' ? 'tabParts' :
      tabKey === 'functions' ? 'tabFunctions' :
      tabKey === 'clinical' ? 'tabClinical' : 'tabQuiz'
    );
    if (activePanel) activePanel.classList.remove('hidden');
  });
});

/**
 * MOBILE BOTTOM DRAWER & NAVIGATION
 */
function openMobileDrawer(targetTab = 'parts') {
  infoSidebar.classList.add('open-drawer');
  const targetTabBtn = document.querySelector(`.nav-s-tab[data-tab="${targetTab}"]`);
  if (targetTabBtn) targetTabBtn.click();
}

function closeMobileDrawer() {
  infoSidebar.classList.remove('open-drawer');
}

if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileDrawer);
if (drawerHandle) drawerHandle.addEventListener('click', closeMobileDrawer);

// Mobile Nav Items
if (mNavOrgan) {
  mNavOrgan.addEventListener('click', () => {
    renderMobileOrganGrid('');
    mobileOrganModal.classList.remove('hidden');
    if (mobileSearchInput) mobileSearchInput.focus();
  });
}

if (mNavMode) {
  mNavMode.addEventListener('click', () => {
    switchMode(currentMode === 'studio' ? 'camera' : 'studio');
    mNavMode.classList.toggle('active', currentMode === 'camera');
  });
}

if (mNavInfo) {
  mNavInfo.addEventListener('click', () => {
    openMobileDrawer('parts');
  });
}

if (mNavQuiz) {
  mNavQuiz.addEventListener('click', () => {
    openMobileDrawer('quiz');
  });
}

// Initial Load: Bosh miya (Brain) in vivid colors!
selectOrgan('brain');
