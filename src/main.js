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
      { id: 'lung', label: "O'pka" },
      { id: 'larynx_vocal_cords', label: "Hiqildoq" },
      { id: 'trachea_bronchi', label: "Traxeya" }
    ]
  },
  digestive: {
    title: 'Ovqat hazm',
    organs: [
      { id: 'esophagus_pharynx', label: "Qizilo'ngach" },
      { id: 'salivary_glands', label: "So'lak bezlari" },
      { id: 'small_intestine', label: "Ingichka ichak" },
      { id: 'large_intestine', label: "Yo'g'on ichak" },
      { id: 'stomach', label: "Oshqozon" },
      { id: 'liver', label: "Jigar" },
      { id: 'pancreas', label: "Oshqozon osti bezi" },
      { id: 'oral_cavity', label: "Og'iz bo'shlig'i" }
    ]
  },
  sensory: {
    title: 'Sezgi a\'zolari',
    organs: [
      { id: 'eye_layers', label: "Ko'z olmasi ichki qatlamlari" },
      { id: 'ear', label: "Quloq" },
      { id: 'skin_layers', label: "Teri" }
    ]
  },
  nervous: {
    title: 'Nerv sistemasi',
    organs: [
      { id: 'brain', label: "Bosh miya" },
      { id: 'nervous_system', label: "Nerv sistemasi" },
      { id: 'spine', label: "Umurtqa pog'onasi" }
    ]
  },
  circulatory: {
    title: 'Qon aylanish',
    organs: [
      { id: 'heart', label: "Inson yuragi" },
      { id: 'circulatory_system', label: "Qon tomirlari" }
    ]
  },
  musculoskeletal: {
    title: 'Tayanch-harakat',
    organs: [
      { id: 'musculoskeletal_system', label: "Skelet" },
      { id: 'skull', label: "Bosh suyagi" },
      { id: 'hand_fingers', label: "Qo'l panjasi" }
    ]
  },
  urinary: {
    title: 'Siydik chiqarish',
    organs: [
      { id: 'kidney', label: "Buyraklar" },
      { id: 'ureters', label: "Siydik naylari" },
      { id: 'bladder_urethra', label: "Qovuq" },
      { id: 'urinary_system', label: "Siydik tizimi" }
    ]
  },
  microbiology: {
    title: 'Hujayra va mikro',
    organs: [
      { id: 'cell_structure', label: "Hujayra tuzilishi" },
      { id: 'dna_helix', label: "DNK spirali" },
      { id: 'blood_cells', label: "Qon hujayralari" }
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
const modelFloatingBadge = document.getElementById('modelFloatingBadge');

// Sidebar Info Elements
const infoSidebar = document.getElementById('infoSidebar');
const organCategory = document.getElementById('organCategory');
const organNameUz = document.getElementById('organNameUz');
const organNameLat = document.getElementById('organNameLat');
const organDescription = document.getElementById('organDescription');
const partsList = document.getElementById('partsList');
const clinicalList = document.getElementById('clinicalList');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const quickInfoBtn = document.getElementById('quickInfoBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const drawerHandle = document.getElementById('drawerHandle');
const navSTabs = document.querySelectorAll('.nav-s-tab');

// Menu Bar Elements
const systemsTabsList = document.getElementById('systemsTabsList');
const subOrgansBar = document.getElementById('subOrgansBar');

// Mobile Menu Elements
const openMobileMenuBtn = document.getElementById('openMobileMenuBtn');
const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const mobileSystemsAccordion = document.getElementById('mobileSystemsAccordion');

// Mobile Bottom Navigation Tabs (Ko'rinishi, Tuzilishi, Kasalliklar)
const mobTab3D = document.getElementById('mobTab3D');
const mobTabStructure = document.getElementById('mobTabStructure');
const mobTabDiseases = document.getElementById('mobTabDiseases');

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

  // Update accurate info and clinical diseases in sidebar
  updateInfoSidebar(data);
}

/**
 * UPDATE FLOATING MODEL BADGE ON 3D VIEWPORT
 */
function updateFloatingBadge(data) {
  if (badgeModelName && data) {
    badgeModelName.textContent = data.nameUz;
  }
  if (badgeModelLat && data) {
    badgeModelLat.textContent = data.nameLat;
  }
}

/**
 * MENU BAR: LEVEL 1 (SYSTEMS TABS)
 */
function updateSystemsTabsUI() {
  if (!systemsTabsList) return;
  const tabs = systemsTabsList.querySelectorAll('.sys-menu-btn');
  tabs.forEach(tab => {
    const isActive = tab.getAttribute('data-system') === activeSystemKey;
    tab.classList.toggle('active', isActive);
    if (isActive) {
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
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
    const isActive = organ.id === currentModelKey;
    chip.className = `sub-organ-chip ${isActive ? 'active' : ''}`;
    chip.setAttribute('data-id', organ.id);
    chip.textContent = organ.label;

    chip.addEventListener('click', () => {
      selectOrgan(organ.id);
    });

    subOrgansBar.appendChild(chip);
    if (isActive) {
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
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
    const isCurrentSystem = sysKey === activeSystemKey;
    card.className = `m-accordion-card ${isCurrentSystem ? 'active-system expanded' : ''}`;

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
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards to prevent multi-expansion squishing on mobile
      const allCards = mobileSystemsAccordion.querySelectorAll('.m-accordion-card');
      allCards.forEach(c => {
        if (c !== card) c.classList.remove('expanded');
      });

      card.classList.toggle('expanded', !isExpanded);
      if (!isExpanded) {
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
      }
    });

    card.appendChild(titleRow);
    card.appendChild(body);
    mobileSystemsAccordion.appendChild(card);
  });
}

function openMobileMenu() {
  renderMobileAccordionMenu();
  mobileMenuDrawer.classList.remove('hidden');
  setTimeout(() => {
    const activeCard = mobileSystemsAccordion.querySelector('.active-system');
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
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

/**
 * UPDATE INFO & CLINICAL DISEASES SIDEBAR
 */
function updateInfoSidebar(data) {
  if (!data) return;
  if (organCategory) organCategory.textContent = data.category || data.system || "Anatomiya";
  if (organNameUz) organNameUz.textContent = data.nameUz;
  if (organNameLat) organNameLat.textContent = data.nameLat;
  if (organDescription) organDescription.textContent = data.description || "Ushbu a'zo haqida aniq tibbiy ma'lumot.";

  renderParts(data.parts || []);
  renderClinical(data.clinical || []);
}

/**
 * RENDER ANATOMICAL PARTS (TUZILISHI)
 */
function renderParts(parts) {
  if (!partsList) return;
  partsList.innerHTML = '';

  if (!parts || parts.length === 0) {
    partsList.innerHTML = '<div class="part-card"><p class="part-desc">Ushbu a\'zo yaxlit anatomik tuzilishga ega.</p></div>';
    return;
  }

  parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
      <div class="part-header">
        <span class="part-name-uz">${part.nameUz}</span>
        <span class="part-name-lat">${part.nameLat || ''}</span>
      </div>
      <p class="part-desc">${part.desc || ''}</p>
    `;
    partsList.appendChild(card);
  });
}

/**
 * RENDER CLINICAL DISEASES (KASALLIKLAR)
 */
function renderClinical(clinical) {
  if (!clinicalList) return;
  clinicalList.innerHTML = '';

  if (!clinical || clinical.length === 0) {
    clinicalList.innerHTML = `
      <div class="clinical-card">
        <div class="clinical-card-header">
          <span class="clinical-badge">Patologiya</span>
          <span class="clinical-title">Klinik ma'lumot</span>
        </div>
        <p class="clinical-text">Ushbu a'zoga oid asosiy profilaktik va klinik ma'lumotlar normada saqlanadi.</p>
      </div>
    `;
    return;
  }

  clinical.forEach((item, idx) => {
    let title = `Kasallik #${idx + 1}`;
    let desc = item;

    if (item.includes(' - ')) {
      const parts = item.split(' - ');
      title = parts[0];
      desc = parts.slice(1).join(' - ');
    } else if (item.includes(': ')) {
      const parts = item.split(': ');
      title = parts[0];
      desc = parts.slice(1).join(': ');
    }

    const card = document.createElement('div');
    card.className = 'clinical-card';
    card.innerHTML = `
      <div class="clinical-card-header">
        <span class="clinical-badge">Kasallik</span>
        <span class="clinical-title">${title}</span>
      </div>
      <p class="clinical-text">${desc}</p>
    `;
    clinicalList.appendChild(card);
  });
}

/**
 * MOBILE BOTTOM NAVIGATION (3 TABS) & SIDEBAR DRAWER CONTROLLER
 */
function setMobileNavActive(activeView) {
  if (mobTab3D) mobTab3D.classList.toggle('active', activeView === '3d');
  if (mobTabStructure) mobTabStructure.classList.toggle('active', activeView === 'structure');
  if (mobTabDiseases) mobTabDiseases.classList.toggle('active', activeView === 'diseases');
}

function switchSidebarTab(tabKey) {
  const tabParts = document.getElementById('tabParts');
  const tabClinical = document.getElementById('tabClinical');

  if (navSTabs && navSTabs.length > 0) {
    navSTabs.forEach(t => {
      const match = t.getAttribute('data-tab') === tabKey;
      t.classList.toggle('active', match);
    });
  }

  if (tabKey === 'parts') {
    if (tabParts) tabParts.classList.remove('hidden');
    if (tabClinical) tabClinical.classList.add('hidden');
    setMobileNavActive('structure');
  } else if (tabKey === 'clinical') {
    if (tabParts) tabParts.classList.add('hidden');
    if (tabClinical) tabClinical.classList.remove('hidden');
    setMobileNavActive('diseases');
  }
}

/**
 * TOGGLE SIDEBAR / DRAWER
 */
function toggleInfoSidebar() {
  if (!infoSidebar) return;
  const isMobile = window.innerWidth <= 900;
  if (isMobile) {
    const willOpen = !infoSidebar.classList.contains('open-drawer');
    infoSidebar.classList.toggle('open-drawer', willOpen);
    if (!willOpen) {
      setMobileNavActive('3d');
    } else {
      const tabClinical = document.getElementById('tabClinical');
      if (tabClinical && !tabClinical.classList.contains('hidden')) {
        setMobileNavActive('diseases');
      } else {
        setMobileNavActive('structure');
      }
    }
  } else {
    infoSidebar.classList.toggle('hidden-sidebar');
    setTimeout(() => sceneManager.onResize(), 150);
  }
}

function closeInfoSidebar() {
  if (!infoSidebar) return;
  infoSidebar.classList.remove('open-drawer');
  const isMobile = window.innerWidth <= 900;
  if (!isMobile) {
    infoSidebar.classList.add('hidden-sidebar');
  }
  setMobileNavActive('3d');
  setTimeout(() => sceneManager.onResize(), 150);
}

// Sidebar Event Listeners
if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener('click', toggleInfoSidebar);
}

if (quickInfoBtn) {
  quickInfoBtn.addEventListener('click', toggleInfoSidebar);
}

if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener('click', closeInfoSidebar);
}

if (drawerHandle) {
  drawerHandle.addEventListener('click', closeInfoSidebar);
}

if (modelFloatingBadge) {
  modelFloatingBadge.style.cursor = 'pointer';
  modelFloatingBadge.setAttribute('title', "A'zo tuzilishi va kasalliklarini ochish");
  modelFloatingBadge.addEventListener('click', toggleInfoSidebar);
}

// Sidebar Tab switching (Tuzilishi <-> Kasalliklar)
if (navSTabs && navSTabs.length > 0) {
  navSTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      switchSidebarTab(tabKey);
    });
  });
}

// Mobile Bottom Navigation Buttons
if (mobTab3D) {
  mobTab3D.addEventListener('click', () => {
    if (infoSidebar) {
      infoSidebar.classList.remove('open-drawer');
    }
    setMobileNavActive('3d');
  });
}

if (mobTabStructure) {
  mobTabStructure.addEventListener('click', () => {
    if (infoSidebar) {
      infoSidebar.classList.remove('hidden-sidebar');
      infoSidebar.classList.add('open-drawer');
    }
    switchSidebarTab('parts');
  });
}

if (mobTabDiseases) {
  mobTabDiseases.addEventListener('click', () => {
    if (infoSidebar) {
      infoSidebar.classList.remove('hidden-sidebar');
      infoSidebar.classList.add('open-drawer');
    }
    switchSidebarTab('clinical');
  });
}

// STARTUP SPLASH SCREEN & PROGRESS LOADER (Optimized Modern Medical UI)
function initStartupSplashScreen() {
  const splash = document.getElementById('appStartupSplash');
  const fill = document.getElementById('splashProgressFill');
  const percentText = document.getElementById('splashPercentText');
  const statusText = document.getElementById('splashStatusText');
  const skipBtn = document.getElementById('skipSplashBtn');

  if (!splash) return;

  let isDismissed = false;
  let startTime = null;
  const DURATION_MS = 2500; // 2.5s smooth duration (2-3s window)

  function dismissSplash() {
    if (isDismissed) return;
    isDismissed = true;
    splash.classList.add('splash-fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      if (splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 450);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissSplash();
    });
  }

  splash.addEventListener('click', (e) => {
    if (e.target.closest('#skipSplashBtn')) return;
    dismissSplash();
  });

  function updateSplash(timestamp) {
    if (isDismissed) return;
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(elapsed / DURATION_MS, 1.0);
    // Smooth deceleration curve
    const progress = 1 - Math.pow(1 - rawProgress, 2.2);
    const pct = Math.min(100, Math.floor(progress * 100));

    if (fill) {
      fill.style.width = `${progress * 100}%`;
    }

    if (percentText) {
      percentText.textContent = `${pct}%`;
    }

    if (statusText) {
      if (pct < 25) {
        statusText.textContent = "Tizim tayyorlanmoqda...";
      } else if (pct < 55) {
        statusText.textContent = "3D modellar yuklanmoqda...";
      } else if (pct < 88) {
        statusText.textContent = "Interaktiv atlas faollashtirilmoqda...";
      } else {
        statusText.textContent = "Tayyor! Xush kelibsiz!";
        statusText.style.color = "#10b981";
      }
    }

    if (rawProgress < 1.0) {
      requestAnimationFrame(updateSplash);
    } else {
      setTimeout(() => {
        dismissSplash();
      }, 200);
    }
  }

  requestAnimationFrame(updateSplash);
}

// INITIAL APP LAUNCH WITH REAL LUNGS 3D MODEL
initStartupSplashScreen();
updateSystemsTabsUI();
selectOrgan('lung');
