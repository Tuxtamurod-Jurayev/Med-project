import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { Real3DSceneManager } from './scene/real3dScene.js';

// Application State
let currentModelKey = 'brain';
let activeSystemKey = 'nervous';
let currentQuizScore = 0;
let userAnswers = {};

// Anatomical Systems & Organs Mapping
const SYSTEM_ORGANS_MAP = {
  nervous: {
    title: 'Nerv sistemasi',
    organs: [
      { id: 'nervous_system', label: 'Yaxlit asab tizimi, umurtqa va orqa miya' },
      { id: 'brain', label: 'Bosh miya (Rangli bo\'laklar)' },
      { id: 'spine', label: 'Umurtqa pog\'onasi' }
    ]
  },
  circulatory: {
    title: 'Qon aylanish',
    organs: [
      { id: 'circulatory_system', label: 'Yaxlit qon aylanish tizimi' },
      { id: 'heart', label: 'Inson yuragi (3D kardiologiya)' }
    ]
  },
  respiratory: {
    title: 'Nafas olish',
    organs: [
      { id: 'respiratory_system', label: 'Nafas olish tizimi' },
      { id: 'lung', label: 'O\'pkalar (3D lobi)' }
    ]
  },
  digestive: {
    title: 'Ovqat hazm',
    organs: [
      { id: 'oral_cavity', label: 'Og\'iz bo\'shlig\'i: Tishlar va Til' },
      { id: 'stomach', label: 'Oshqozon' },
      { id: 'pancreas', label: 'Oshqozon osti bezi' },
      { id: 'liver', label: 'Jigar' },
      { id: 'gallbladder', label: 'O\'t pufagi va yo\'llari' }
    ]
  },
  musculoskeletal: {
    title: 'Tayanch-harakat',
    organs: [
      { id: 'musculoskeletal_system', label: 'Skelet va mushaklar' },
      { id: 'skull', label: 'Bosh suyagi' },
      { id: 'spine', label: 'Umurtqa pog\'onasi' },
      { id: 'hand_fingers', label: 'Barmoqlar va panja tuzilishi' }
    ]
  },
  urinary: {
    title: 'Siydik chiqarish',
    organs: [
      { id: 'urinary_system', label: 'Siydik chiqarish sistemasi' },
      { id: 'kidney', label: 'Buyraklar (3D tuzilishi)' }
    ]
  },
  endocrine: {
    title: 'Endokrin',
    organs: [
      { id: 'endocrine_system', label: 'Endokrin sistema (Ichki sekretsiya bezlari)' },
      { id: 'pancreas', label: 'Oshqozon osti bezi' }
    ]
  },
  sensory: {
    title: 'Sezgi a\'zolari',
    organs: [
      { id: 'eye', label: 'Ko\'z to\'qimalari va olmasi' },
      { id: 'eye_tissues', label: 'Ko\'z olmasi ichki qatlamlari' }
    ]
  }
};

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const loadingBanner = document.getElementById('loadingBanner');
const loadingText = document.getElementById('loadingText');

// Menu Bar Elements
const systemsTabsList = document.getElementById('systemsTabsList');
const subOrgansBar = document.getElementById('subOrgansBar');

// Mobile Menu Elements
const openMobileMenuBtn = document.getElementById('openMobileMenuBtn');
const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const mobileSystemsAccordion = document.getElementById('mobileSystemsAccordion');

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
const mNavInfo = document.getElementById('mNavInfo');
const mNavQuiz = document.getElementById('mNavQuiz');

// Initialize 3D Scene Manager
const sceneManager = new Real3DSceneManager(canvasContainer, (isLoading, message) => {
  if (isLoading) {
    loadingBanner.classList.remove('hidden');
    loadingText.textContent = message;
  } else {
    loadingBanner.classList.add('hidden');
  }
});

/**
 * ORGAN SELECTION (Loads 3D Model + Medical Data)
 */
function selectOrgan(modelKey) {
  if (!ANATOMY_DATA[modelKey]) return;
  currentModelKey = modelKey;
  const data = ANATOMY_DATA[modelKey];

  // Update active system key if different
  if (data.systemKey && data.systemKey !== activeSystemKey) {
    activeSystemKey = data.systemKey;
    updateSystemsTabsUI();
  }

  // Update sub-organs row
  renderSubOrgansBar();

  // Load 3D model
  sceneManager.loadModel(modelKey);

  // Render medical data in sidebar
  renderOrganData(modelKey);
}

/**
 * MENU BAR: LEVEL 1 (SYSTEMS TABS)
 */
function updateSystemsTabsUI() {
  const tabs = systemsTabsList.querySelectorAll('.sys-menu-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-system') === activeSystemKey);
  });
}

systemsTabsList.addEventListener('click', (e) => {
  const btn = e.target.closest('.sys-menu-btn');
  if (!btn) return;

  const sysKey = btn.getAttribute('data-system');
  activeSystemKey = sysKey;
  updateSystemsTabsUI();

  const sysConfig = SYSTEM_ORGANS_MAP[sysKey];
  if (sysConfig && sysConfig.organs.length > 0) {
    const primaryOrganId = sysConfig.organs[0].id;
    if (currentModelKey !== primaryOrganId) {
      selectOrgan(primaryOrganId);
    } else {
      renderSubOrgansBar();
    }
  }
});

/**
 * MENU BAR: LEVEL 2 (SUB-ORGANS ROW)
 */
function renderSubOrgansBar() {
  if (!subOrgansBar) return;
  subOrgansBar.innerHTML = '';

  const sysConfig = SYSTEM_ORGANS_MAP[activeSystemKey];
  if (!sysConfig) return;

  sysConfig.organs.forEach(organ => {
    const chip = document.createElement('button');
    chip.className = `sub-organ-chip ${organ.id === currentModelKey ? 'active' : ''}`;
    chip.setAttribute('data-id', organ.id);
    chip.textContent = organ.label;

    chip.addEventListener('click', () => {
      selectOrgan(organ.id);
    });

    subOrgansBar.appendChild(chip);
  });
}

/**
 * MOBILE ACCORDION DRAWER MENU
 */
function renderMobileAccordionMenu() {
  if (!mobileSystemsAccordion) return;
  mobileSystemsAccordion.innerHTML = '';

  Object.entries(SYSTEM_ORGANS_MAP).forEach(([sysKey, sysData]) => {
    const card = document.createElement('div');
    card.className = `m-accordion-card ${sysKey === activeSystemKey ? 'active-system' : ''}`;

    const titleRow = document.createElement('div');
    titleRow.className = 'm-accordion-title';
    titleRow.innerHTML = `
      <div class="m-acc-text">
        <span class="m-acc-sys">${sysData.title}</span>
        <span class="m-acc-count">${sysData.organs.length} ta model</span>
      </div>
      <svg class="react-icon m-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    `;

    const body = document.createElement('div');
    body.className = 'm-accordion-body';

    sysData.organs.forEach(organ => {
      const organBtn = document.createElement('button');
      organBtn.className = `m-acc-organ-btn ${organ.id === currentModelKey ? 'selected' : ''}`;
      organBtn.innerHTML = `
        <span class="dot-indicator"></span>
        <span>${organ.label}</span>
      `;

      organBtn.addEventListener('click', () => {
        selectOrgan(organ.id);
        closeMobileMenu();
      });

      body.appendChild(organBtn);
    });

    titleRow.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    // Auto-expand active system
    if (sysKey === activeSystemKey) {
      card.classList.add('expanded');
    }

    card.appendChild(titleRow);
    card.appendChild(body);
    mobileSystemsAccordion.appendChild(card);
  });
}

function openMobileMenu() {
  renderMobileAccordionMenu();
  mobileMenuDrawer.classList.remove('hidden');
}

function closeMobileMenu() {
  mobileMenuDrawer.classList.add('hidden');
}

if (openMobileMenuBtn) openMobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
if (mNavOrgan) mNavOrgan.addEventListener('click', openMobileMenu);

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

// Initial Load: Bosh miya (Brain) in realistic atlas colors!
selectOrgan('brain');
