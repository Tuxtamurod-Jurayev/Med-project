import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { Real3DSceneManager } from './scene/real3dScene.js';
import { ARCameraManager } from './camera/arCamera.js';

// Application State
let currentModelKey = 'skull';
let currentMode = 'studio'; // 'studio' | 'camera'
let currentQuizScore = 0;
let userAnswers = {};

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

// Organ Strip & Modal Elements
const organTabBtns = document.querySelectorAll('.organ-tab-btn');
const mobileOrganChoices = document.querySelectorAll('.m-organ-choice');
const mobileOrganModal = document.getElementById('mobileOrganModal');
const closeOrganModal = document.getElementById('closeOrganModal');

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
 * AR CAMERA DETECTION TRIGGER ("Telefondan kamerada belgilanganda 3D model ishga tushurilsin")
 */
if (btnArDetect) {
  btnArDetect.addEventListener('click', () => {
    // Visual celebrate effect
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.75 }
    });

    // Animate and re-center 3D model
    sceneManager.resetCamera();
    if (sceneManager.currentModelGroup) {
      sceneManager.currentModelGroup.scale.multiplyScalar(1.2);
      setTimeout(() => {
        sceneManager.loadModel(currentModelKey);
      }, 220);
    }

    // Voice announcement in Uzbek
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
 * ORGAN SELECTION (Loads Real 3D Model!)
 */
function selectOrgan(modelKey) {
  if (!ANATOMY_DATA[modelKey]) return;
  currentModelKey = modelKey;

  // Update Strip active state
  organTabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-model') === modelKey);
  });

  // Update Modal active state
  mobileOrganChoices.forEach(choice => {
    choice.classList.toggle('active', choice.getAttribute('data-model') === modelKey);
  });

  // Scroll active strip button into view smoothly
  const activeStripBtn = document.querySelector(`.organ-tab-btn[data-model="${modelKey}"]`);
  if (activeStripBtn) {
    activeStripBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  // Load 3D GLB model
  sceneManager.loadModel(modelKey);

  // Render medical data
  renderOrganData(modelKey);
}

// Strip button events
organTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-model');
    selectOrgan(key);
  });
});

// Modal choice events
mobileOrganChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    const key = choice.getAttribute('data-model');
    selectOrgan(key);
    mobileOrganModal.classList.add('hidden');
  });
});

// Modal close
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
  organSpecs.textContent = data.bonesCount > 0 ? `${data.bonesCount} ta suyak` : data.weight;
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
      // Gentle pulse on organ
      if (sceneManager.currentModelGroup) {
        sceneManager.currentModelGroup.rotation.y += 0.4;
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
  renderQuiz(data.quiz);
}

/**
 * RENDER QUIZ
 */
function renderQuiz(quizItems) {
  quizContainer.innerHTML = '';
  quizScoreBadge.textContent = `Ball: 0/${quizItems.length}`;

  quizItems.forEach((q, qIdx) => {
    const qCard = document.createElement('div');
    qCard.className = 'quiz-q-card';

    const qTitle = document.createElement('div');
    qTitle.className = 'quiz-question-text';
    qTitle.textContent = `${qIdx + 1}. ${q.question}`;
    qCard.appendChild(qTitle);

    const ansList = document.createElement('div');
    ansList.className = 'quiz-answers-list';

    q.options.forEach((opt, optIdx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz-ans-btn';
      optBtn.textContent = opt;

      optBtn.addEventListener('click', () => {
        if (userAnswers[qIdx] !== undefined) return;
        userAnswers[qIdx] = optIdx;

        const isCorrect = optIdx === q.correct;
        if (isCorrect) {
          optBtn.classList.add('correct');
          currentQuizScore++;
          confetti({ particleCount: 20, spread: 45, origin: { y: 0.8 } });
        } else {
          optBtn.classList.add('wrong');
          // Highlight correct answer
          ansList.children[q.correct].classList.add('correct');
        }

        quizScoreBadge.textContent = `Ball: ${currentQuizScore}/${quizItems.length}`;

        if (Object.keys(userAnswers).length === quizItems.length && currentQuizScore === quizItems.length) {
          confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });
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
    if (data) renderQuiz(data.quiz);
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
  sceneManager.takeSnapshot();
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
    mobileOrganModal.classList.remove('hidden');
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

// Initial Load
selectOrgan('skull');
