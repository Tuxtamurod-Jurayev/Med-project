import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { Real3DSceneManager } from './scene/real3dScene.js';

// Application State
let currentModelKey = 'lung';
let activeSystemKey = 'respiratory';

// Anatomical Systems & Organs Mapping
const SYSTEM_ORGANS_MAP = {
  respiratory: {
    title: 'Nafas olish',
    organs: [
      { id: 'lung', label: "O'pka (3D Anatomiya)" },
      { id: 'larynx_vocal_cords', label: "Hiqildoq va ovoz boylamlari" },
      { id: 'trachea_bronchi', label: "Traxeya va bronxlar daraxti" }
    ]
  },
  digestive: {
    title: 'Ovqat hazm',
    organs: [
      { id: 'gallbladder', label: "O't pufagi va o't yo'llari" },
      { id: 'esophagus_pharynx', label: "Qizilo'ngach va halqum" },
      { id: 'salivary_glands', label: "So'lak bezlari" },
      { id: 'small_intestine', label: "Ingichka ichak" },
      { id: 'large_intestine', label: "Yo'g'on ichak va appendiks" },
      { id: 'stomach', label: "Oshqozon" },
      { id: 'liver', label: "Jigar" },
      { id: 'pancreas', label: "Oshqozon osti bezi" },
      { id: 'oral_cavity', label: "Og'iz bo'shlig'i va tishlar" }
    ]
  },
  sensory: {
    title: 'Sezgi a\'zolari',
    organs: [
      { id: 'eye_layers', label: "Ko'z olmasi ichki qatlamlari" },
      { id: 'ear', label: "Quloq (tashqi, o'rta, ichki)" },
      { id: 'skin_layers', label: "Teri qatlamlari va soch" },
      { id: 'eye', label: "Ko'z olmasi (Tashqi tuzilishi)" }
    ]
  },
  nervous: {
    title: 'Nerv sistemasi',
    organs: [
      { id: 'brain', label: "Bosh miya" },
      { id: 'nervous_system', label: "Yaxlit nerv tizimi" },
      { id: 'spine', label: "Umurtqa pog'onasi" }
    ]
  },
  circulatory: {
    title: 'Qon aylanish',
    organs: [
      { id: 'heart', label: "Inson yuragi" },
      { id: 'circulatory_system', label: "Qon aylanish tizimi" }
    ]
  },
  musculoskeletal: {
    title: 'Tayanch-harakat',
    organs: [
      { id: 'musculoskeletal_system', label: "Inson skeleti" },
      { id: 'skull', label: "Bosh suyagi" },
      { id: 'hand_fingers', label: "Panja va barmoqlar" }
    ]
  },
  urinary: {
    title: 'Siydik chiqarish',
    organs: [
      { id: 'kidney', label: "Buyraklar (kesimi va nefron)" },
      { id: 'ureters', label: "Siydik naylari (ureterlar)" },
      { id: 'bladder_urethra', label: "Qovuq va uretra" },
      { id: 'urinary_system', label: "Yaxlit siydik tizimi" }
    ]
  },
  lymphatic: {
    title: 'Limfa va immun',
    organs: [
      { id: 'lymphatic_system', label: "Taloq va limfa tarmog'i" }
    ]
  },
  microbiology: {
    title: 'Hujayra va mikro',
    organs: [
      { id: 'cell_structure', label: "Hujayra tuzilishi (organellalar)" },
      { id: 'dna_helix', label: "DNK qo'sh spirali" },
      { id: 'blood_cells', label: "Qon hujayralari (eritrotsit, leykotsit)" }
    ]
  },
  endocrine: {
    title: 'Endokrin',
    organs: [
      { id: 'endocrine_system', label: "Endokrin bezlar" },
      { id: 'pancreas', label: "Oshqozon osti bezi" }
    ]
  }
};

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const loadingBanner = document.getElementById('loadingBanner');
const loadingText = document.getElementById('loadingText');

// Floating badge elements
const badgeModelName = document.getElementById('badgeModelName');
const badgeModelLat = document.getElementById('badgeModelLat');

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
const fullscreenBtn = document.getElementById('fullscreenBtn');

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
 * ORGAN SELECTION (Loads 3D Model + Updates Floating Badge)
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

  // Load 3D model in Three.js
  sceneManager.loadModel(modelKey);

  // Update floating label on the 3D canvas
  updateFloatingBadge(data);
}

/**
 * UPDATE FLOATING MODEL BADGE ON 3D VIEWPORT
 */
function updateFloatingBadge(data) {
  if (badgeModelName && data) {
    badgeModelName.textContent = data.nameUz;
  }
  if (badgeModelLat && data) {
    badgeModelLat.textContent = `${data.nameLat} • 3D Anatomiya`;
  }
}

/**
 * MENU BAR: LEVEL 1 (SYSTEMS TABS)
 */
function updateSystemsTabsUI() {
  if (!systemsTabsList) return;
  const tabs = systemsTabsList.querySelectorAll('.sys-menu-btn');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-system') === activeSystemKey);
  });
}

if (systemsTabsList) {
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
}

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

/**
 * 3D SCENE CONTROLS
 */
if (resetCamBtn) {
  resetCamBtn.addEventListener('click', () => {
    sceneManager.resetCamera();
  });
}

if (xrayBtn) {
  xrayBtn.addEventListener('click', () => {
    const active = sceneManager.toggleXRay();
    xrayBtn.classList.toggle('active', active);
  });
}

if (wireframeBtn) {
  wireframeBtn.addEventListener('click', () => {
    const active = sceneManager.toggleWireframe();
    wireframeBtn.classList.toggle('active', active);
  });
}

if (autoRotateBtn) {
  autoRotateBtn.addEventListener('click', () => {
    const active = sceneManager.toggleAutoRotate();
    autoRotateBtn.classList.toggle('active', active);
  });
}

if (snapshotBtn) {
  snapshotBtn.addEventListener('click', () => {
    const dataUrl = sceneManager.captureSnapshot();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `MedAnatomy_${currentModelKey}.png`;
      link.href = dataUrl;
      link.click();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    }
  });
}

// Speak Latin Name using Web Speech API
if (speakNameBtn) {
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
}

// Fullscreen Toggle
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });
}

// INITIAL APP LAUNCH WITH REAL LUNGS 3D MODEL
updateSystemsTabsUI();
selectOrgan('lung');
