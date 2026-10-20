import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { REAL_ANATOMY_ASSETS } from './data/realAnatomyAssets.js';
import { SAMPLE_ANATOMY_IMAGES } from './data/sampleImages.js';
import { ARCameraManager } from './camera/arCamera.js';

// Application State
let currentModelKey = 'skull';
let currentMode = 'studio'; // 'studio' | 'camera' | 'image'
let isXRayMode = false;
let isShowingPins = true;
let isPulsing = false;
let currentQuizScore = 0;
let userAnswers = {};

// 3D Tilt & Zoom State
let zoomLevel = 1.0;
let tiltX = 0;
let tiltY = 0;

// DOM Elements
const cameraFeed = document.getElementById('cameraFeed');
const imageFeedContainer = document.getElementById('imageFeedContainer');
const targetImageDisplay = document.getElementById('targetImageDisplay');
const targetImageLabel = document.getElementById('targetImageLabel');
const imageFileInput = document.getElementById('imageFileInput');
const arReticle = document.getElementById('arReticle');

// Real Anatomy Viewer Elements
const realAnatomyViewer = document.getElementById('realAnatomyViewer');
const tiltWrapper = document.getElementById('tiltWrapper');
const realAnatomyImg = document.getElementById('realAnatomyImg');
const xrayAnatomyImg = document.getElementById('xrayAnatomyImg');
const hotspotsOverlay = document.getElementById('hotspotsOverlay');

// Tools & Controls
const toggleLayerBtn = document.getElementById('toggleLayerBtn');
const layerBtnText = document.getElementById('layerBtnText');
const togglePinsBtn = document.getElementById('togglePinsBtn');
const pulseAnimBtn = document.getElementById('pulseAnimBtn');
const resetViewBtn = document.getElementById('resetViewBtn');
const snapshotBtn = document.getElementById('snapshotBtn');
const speakNameBtn = document.getElementById('speakNameBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Mode Switch & Docks
const modeButtons = document.querySelectorAll('.mode-btn');
const imageSelectDock = document.getElementById('imageSelectDock');
const cameraControlsDock = document.getElementById('cameraControlsDock');
const arOpacitySlider = document.getElementById('arOpacitySlider');
const switchCameraBtn = document.getElementById('switchCameraBtn');
const cameraStatusIndicator = document.getElementById('cameraStatusIndicator');

// Sidebar & Details
const infoSidebar = document.getElementById('infoSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const drawerHandle = document.getElementById('drawerHandle');
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

// Mobile Bottom Bar & Modal
const mNavOrgan = document.getElementById('mNavOrgan');
const mNavMode = document.getElementById('mNavMode');
const mNavInfo = document.getElementById('mNavInfo');
const mNavQuiz = document.getElementById('mNavQuiz');
const mobileOrganModal = document.getElementById('mobileOrganModal');
const closeOrganModal = document.getElementById('closeOrganModal');

// Initialize AR Camera Manager
const arCamera = new ARCameraManager(cameraFeed, (status) => {
  if (status === 'active') {
    cameraFeed.style.opacity = '1';
    arReticle.classList.remove('hidden');
    cameraControlsDock.classList.remove('hidden');
    tiltWrapper.style.opacity = '0.85';
    updateStatus('dot-active', 'AR Kamera Faol', '#10b981');
  } else {
    cameraFeed.style.opacity = '0';
    arReticle.classList.add('hidden');
    cameraControlsDock.classList.add('hidden');
    tiltWrapper.style.opacity = '1';
    if (currentMode === 'studio') {
      updateStatus('dot-idle', 'Haqiqiy Anatomiya Rejimi', '#38bdf8');
    }
  }
});

function updateStatus(dotClass, text, color) {
  cameraStatusIndicator.innerHTML = `
    <span class="status-dot" style="background:${color}; box-shadow:0 0 8px ${color};"></span>
    <span style="color:${color}; font-weight:700;">${text}</span>
  `;
}

/**
 * LOAD REAL ANATOMICAL IMAGERY & HOTSPOTS
 */
function loadRealAnatomy(organKey) {
  const asset = REAL_ANATOMY_ASSETS[organKey];
  if (!asset) return;

  // Set real images
  realAnatomyImg.src = asset.realImage;
  xrayAnatomyImg.src = asset.xrayImage;

  // Handle pulse animation automatically for heart
  if (organKey === 'heart') {
    isPulsing = true;
    tiltWrapper.classList.add('pulsing');
    pulseAnimBtn.classList.add('active');
  } else {
    isPulsing = false;
    tiltWrapper.classList.remove('pulsing');
    pulseAnimBtn.classList.remove('active');
  }

  // Populate Hotspots
  hotspotsOverlay.innerHTML = '';
  asset.hotspots.forEach(pin => {
    const pinEl = document.createElement('div');
    pinEl.className = 'hotspot-pin';
    pinEl.setAttribute('data-pin-id', pin.id);
    pinEl.style.left = `${pin.x}%`;
    pinEl.style.top = `${pin.y}%`;

    pinEl.innerHTML = `
      <div class="pin-ring"></div>
      <div class="pin-core"></div>
      <div class="pin-tooltip">
        <span class="pin-tooltip-uz">${pin.nameUz}</span>
        <span class="pin-tooltip-lat">${pin.nameLat}</span>
      </div>
    `;

    // Click pin -> highlight in sidebar
    pinEl.addEventListener('click', (e) => {
      e.stopPropagation();
      highlightPin(pin.id);
      highlightPartInSidebar(pin.id);
    });

    hotspotsOverlay.appendChild(pinEl);
  });

  resetTiltAndZoom();
}

/**
 * 3D SPATIAL TILT & TOUCH INTERACTION
 */
function applyTransform() {
  tiltWrapper.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${zoomLevel})`;
}

function resetTiltAndZoom() {
  zoomLevel = 1.0;
  tiltX = 0;
  tiltY = 0;
  applyTransform();
}

// Mouse move 3D tilt
realAnatomyViewer.addEventListener('pointermove', (e) => {
  const rect = realAnatomyViewer.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = (e.clientX - centerX) / (rect.width / 2);
  const deltaY = (e.clientY - centerY) / (rect.height / 2);

  tiltY = deltaX * 14;
  tiltX = -deltaY * 14;
  applyTransform();
});

realAnatomyViewer.addEventListener('pointerleave', () => {
  tiltX = 0;
  tiltY = 0;
  applyTransform();
});

// Zoom with mouse scroll
realAnatomyViewer.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoomLevel += e.deltaY * -0.0012;
  zoomLevel = Math.min(Math.max(0.7, zoomLevel), 1.8);
  applyTransform();
}, { passive: false });

/**
 * HIGHLIGHTING HELPERS
 */
function highlightPin(partId) {
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    pin.classList.toggle('active', pin.getAttribute('data-pin-id') === partId);
  });
}

function highlightPartInSidebar(partId) {
  const allCards = partsList.querySelectorAll('.part-card');
  allCards.forEach(c => c.classList.remove('active'));

  const matchingCard = partsList.querySelector(`[data-part-id="${partId}"]`);
  if (matchingCard) {
    matchingCard.classList.add('active');
    matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  switchTab('parts');
}

/**
 * MODE SWITCHING (Haqiqiy Anatomiya | Kamera AR | Rasm Belgilash)
 */
async function switchMode(mode) {
  currentMode = mode;

  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });

  if (mode === 'studio') {
    arCamera.stopCamera();
    imageFeedContainer.classList.add('hidden');
    imageSelectDock.classList.add('hidden');
    cameraControlsDock.classList.add('hidden');
    arReticle.classList.add('hidden');
    tiltWrapper.style.opacity = '1';
    updateStatus('dot-idle', 'Haqiqiy Anatomiya Rejimi', '#38bdf8');
  } else if (mode === 'camera') {
    imageFeedContainer.classList.add('hidden');
    imageSelectDock.classList.add('hidden');
    await arCamera.startCamera();
  } else if (mode === 'image') {
    arCamera.stopCamera();
    imageFeedContainer.classList.remove('hidden');
    imageSelectDock.classList.remove('hidden');
    cameraControlsDock.classList.add('hidden');
    arReticle.classList.add('hidden');
    tiltWrapper.style.opacity = '0.9';

    loadTargetImage(currentModelKey);
    updateStatus('dot-image', 'Rasm Belgilash Rejimi', '#38bdf8');
  }
}

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchMode(btn.getAttribute('data-mode'));
  });
});

/**
 * TARGET IMAGE SELECTION & UPLOAD
 */
function loadTargetImage(key) {
  if (SAMPLE_ANATOMY_IMAGES[key]) {
    targetImageDisplay.src = SAMPLE_ANATOMY_IMAGES[key];
    const organName = ANATOMY_DATA[key] ? ANATOMY_DATA[key].nameUz : key;
    targetImageLabel.textContent = `Belgilangan: ${organName} sxemasi`;

    document.querySelectorAll('.sample-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-img-key') === key);
    });
  }
}

document.querySelectorAll('.sample-card').forEach(card => {
  card.addEventListener('click', () => {
    const imgKey = card.getAttribute('data-img-key');
    selectOrgan(imgKey);
    loadTargetImage(imgKey);
  });
});

imageFileInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    targetImageDisplay.src = event.target.result;
    targetImageLabel.textContent = `Yuklangan rasm: ${file.name.substring(0, 24)}`;
  };
  reader.readAsDataURL(file);
});

/**
 * ORGAN SELECTION
 */
function selectOrgan(modelKey) {
  currentModelKey = modelKey;
  loadRealAnatomy(modelKey);
  renderOrganData(modelKey);

  document.querySelectorAll('.m-organ-choice').forEach(choice => {
    choice.classList.toggle('active', choice.getAttribute('data-model') === modelKey);
  });

  if (currentMode === 'image') {
    loadTargetImage(modelKey);
  }
}

/**
 * RENDER ORGAN TEXT DATA IN SIDEBAR
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
    card.setAttribute('data-part-id', part.id);
    card.innerHTML = `
      <div class="part-header">
        <span class="part-name-uz">${part.nameUz}</span>
        <span class="part-name-lat">${part.nameLat}</span>
      </div>
      <p class="part-desc">${part.desc}</p>
    `;

    card.addEventListener('click', () => {
      partsList.querySelectorAll('.part-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      highlightPin(part.id);
    });

    partsList.appendChild(card);
  });

  // Render Functions
  functionsList.innerHTML = '';
  data.functions.forEach(func => {
    const li = document.createElement('li');
    li.textContent = func;
    functionsList.appendChild(li);
  });

  // Render Clinical
  clinicalList.innerHTML = '';
  data.clinical.forEach(clin => {
    const li = document.createElement('li');
    li.textContent = clin;
    clinicalList.appendChild(li);
  });

  // Render Quiz
  renderQuiz(data.quiz);
}

/**
 * QUIZ SYSTEM
 */
function renderQuiz(quizQuestions) {
  quizContainer.innerHTML = '';
  quizScoreBadge.textContent = `Ball: 0/${quizQuestions.length}`;

  quizQuestions.forEach((q, qIndex) => {
    const qCard = document.createElement('div');
    qCard.className = 'quiz-card';

    qCard.innerHTML = `
      <p class="quiz-question-text">${qIndex + 1}. ${q.question}</p>
      <div class="quiz-options-group" data-q-index="${qIndex}">
        ${q.options.map((opt, optIndex) => `
          <button class="quiz-opt-btn" data-opt-index="${optIndex}">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div class="quiz-explanation hidden"></div>
    `;

    const optButtons = qCard.querySelectorAll('.quiz-opt-btn');
    const explanationBox = qCard.querySelector('.quiz-explanation');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (userAnswers[qIndex] !== undefined) return;

        const selectedIndex = parseInt(btn.getAttribute('data-opt-index'));
        userAnswers[qIndex] = selectedIndex;

        optButtons.forEach(b => b.disabled = true);

        if (selectedIndex === q.answerIndex) {
          btn.classList.add('correct');
          currentQuizScore++;
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.8 }
          });
        } else {
          btn.classList.add('wrong');
          optButtons[q.answerIndex].classList.add('correct');
        }

        explanationBox.classList.remove('hidden');
        explanationBox.innerHTML = `
          <strong style="color:${selectedIndex === q.answerIndex ? '#34d399' : '#f59e0b'}; display:block; margin-bottom:4px;">
            ${selectedIndex === q.answerIndex ? '✓ To\'g\'ri javob!' : '✗ Noto\'g\'ri!'}
          </strong>
          ${q.explanation}
        `;

        quizScoreBadge.textContent = `Ball: ${currentQuizScore}/${quizQuestions.length}`;

        if (Object.keys(userAnswers).length === quizQuestions.length && currentQuizScore === quizQuestions.length) {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      });
    });

    quizContainer.appendChild(qCard);
  });
}

resetQuizBtn.addEventListener('click', () => {
  const data = ANATOMY_DATA[currentModelKey];
  if (data) {
    currentQuizScore = 0;
    userAnswers = {};
    renderQuiz(data.quiz);
  }
});

/**
 * SIDEBAR TAB SWITCHING
 */
function switchTab(tabKey) {
  document.querySelectorAll('.nav-s-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabKey);
  });

  const tabMap = {
    parts: 'tabParts',
    functions: 'tabFunctions',
    clinical: 'tabClinical',
    quiz: 'tabQuiz'
  };

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  const activePanel = document.getElementById(tabMap[tabKey]);
  if (activePanel) activePanel.classList.remove('hidden');
}

document.querySelectorAll('.nav-s-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.getAttribute('data-tab'));
  });
});

/**
 * TOOLBAR CONTROLS
 */
// Toggle Real Anatomy vs X-Ray
toggleLayerBtn.addEventListener('click', () => {
  isXRayMode = !isXRayMode;
  xrayAnatomyImg.style.opacity = isXRayMode ? '1' : '0';
  toggleLayerBtn.classList.toggle('active', isXRayMode);
  layerBtnText.textContent = isXRayMode ? 'Haqiqiy Anatomiya' : 'Rentgen (X-Ray)';
});

// Toggle Pins
togglePinsBtn.addEventListener('click', () => {
  isShowingPins = !isShowingPins;
  hotspotsOverlay.classList.toggle('hidden', !isShowingPins);
  togglePinsBtn.classList.toggle('active', isShowingPins);
});

// Pulse animation
pulseAnimBtn.addEventListener('click', () => {
  isPulsing = !isPulsing;
  tiltWrapper.classList.toggle('pulsing', isPulsing);
  pulseAnimBtn.classList.toggle('active', isPulsing);
});

// Reset view
resetViewBtn.addEventListener('click', () => {
  resetTiltAndZoom();
  document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  partsList.querySelectorAll('.part-card').forEach(c => c.classList.remove('active'));
});

// Snapshot capture
snapshotBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `MedAnatomy_${currentModelKey}_${Date.now()}.svg`;
  link.href = isXRayMode ? REAL_ANATOMY_ASSETS[currentModelKey].xrayImage : REAL_ANATOMY_ASSETS[currentModelKey].realImage;
  link.click();
});

// Camera opacity slider
arOpacitySlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  tiltWrapper.style.opacity = val;
});

// Switch camera facing (front/back)
switchCameraBtn.addEventListener('click', async () => {
  await arCamera.switchCameraFacing();
});

// Speech pronunciation (TTS)
speakNameBtn.addEventListener('click', () => {
  const data = ANATOMY_DATA[currentModelKey];
  if (!data || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${data.nameLat}. ${data.nameUz}.`);
  utterance.lang = 'la';
  utterance.rate = 0.85;

  speakNameBtn.style.color = '#38bdf8';
  utterance.onend = () => {
    speakNameBtn.style.color = '';
  };
  window.speechSynthesis.speak(utterance);
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// Mobile Bottom Nav Handlers
mNavOrgan.addEventListener('click', () => {
  mobileOrganModal.classList.remove('hidden');
});

closeOrganModal.addEventListener('click', () => {
  mobileOrganModal.classList.add('hidden');
});

mobileOrganModal.addEventListener('click', (e) => {
  if (e.target === mobileOrganModal) mobileOrganModal.classList.add('hidden');
});

document.querySelectorAll('.m-organ-choice').forEach(choice => {
  choice.addEventListener('click', () => {
    const key = choice.getAttribute('data-model');
    selectOrgan(key);
    mobileOrganModal.classList.add('hidden');
  });
});

mNavMode.addEventListener('click', () => {
  const modes = ['studio', 'camera', 'image'];
  const nextIndex = (modes.indexOf(currentMode) + 1) % modes.length;
  switchMode(modes[nextIndex]);
});

mNavInfo.addEventListener('click', () => {
  switchTab('parts');
  infoSidebar.classList.toggle('open');
});

mNavQuiz.addEventListener('click', () => {
  switchTab('quiz');
  infoSidebar.classList.add('open');
});

closeSidebarBtn.addEventListener('click', () => {
  infoSidebar.classList.remove('open');
});

drawerHandle.addEventListener('click', () => {
  infoSidebar.classList.toggle('open');
});

// Initial Setup
selectOrgan('skull');
