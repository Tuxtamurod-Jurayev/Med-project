import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { SAMPLE_ANATOMY_IMAGES } from './data/sampleImages.js';
import { Real3DSceneManager } from './scene/real3dScene.js';
import { ARCameraManager } from './camera/arCamera.js';

// Application State
let currentModelKey = 'skull';
let currentMode = 'studio'; // 'studio' | 'camera' | 'image'
let currentQuizScore = 0;
let userAnswers = {};

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const cameraFeed = document.getElementById('cameraFeed');
const imageFeedContainer = document.getElementById('imageFeedContainer');
const targetImageDisplay = document.getElementById('targetImageDisplay');
const targetImageLabel = document.getElementById('targetImageLabel');
const imageFileInput = document.getElementById('imageFileInput');
const arReticle = document.getElementById('arReticle');
const btnArDetect = document.getElementById('btnArDetect');
const loadingBanner = document.getElementById('loadingBanner');
const loadingText = document.getElementById('loadingText');

// Mode Switch & Docks
const modeButtons = document.querySelectorAll('.mode-btn');
const imageSelectDock = document.getElementById('imageSelectDock');
const cameraControlsDock = document.getElementById('cameraControlsDock');
const arOpacitySlider = document.getElementById('arOpacitySlider');
const switchCameraBtn = document.getElementById('switchCameraBtn');
const cameraStatusIndicator = document.getElementById('cameraStatusIndicator');

// 3D Tool Buttons
const resetCamBtn = document.getElementById('resetCamBtn');
const xrayBtn = document.getElementById('xrayBtn');
const wireframeBtn = document.getElementById('wireframeBtn');
const autoRotateBtn = document.getElementById('autoRotateBtn');
const snapshotBtn = document.getElementById('snapshotBtn');
const speakNameBtn = document.getElementById('speakNameBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Sidebar & Tabs
const infoSidebar = document.getElementById('infoSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const drawerHandle = document.getElementById('drawerHandle');

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

// Mobile Bottom Nav & Modal
const mNavOrgan = document.getElementById('mNavOrgan');
const mNavMode = document.getElementById('mNavMode');
const mNavInfo = document.getElementById('mNavInfo');
const mNavQuiz = document.getElementById('mNavQuiz');
const mobileOrganModal = document.getElementById('mobileOrganModal');
const closeOrganModal = document.getElementById('closeOrganModal');

// Initialize Real 3D Scene Manager
const sceneManager = new Real3DSceneManager(canvasContainer, (isLoading, message) => {
  if (isLoading) {
    loadingBanner.classList.remove('hidden');
    loadingText.textContent = message;
  } else {
    loadingBanner.classList.add('hidden');
  }
});

// Initialize AR Camera
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
  cameraStatusIndicator.innerHTML = `
    <span class="status-dot" style="background:${color}; box-shadow:0 0 8px ${color};"></span>
    <span style="color:${color}; font-weight:700;">${text}</span>
  `;
}

/**
 * AR CAMERA DETECTION TRIGGER ("Telefondan kamerada belgilanganda 3D model ishga tushirilsin")
 */
btnArDetect.addEventListener('click', () => {
  // Visual pulse / lock effect
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.7 }
  });

  // Re-center and spring 3D model
  sceneManager.resetCamera();
  if (sceneManager.currentModelGroup) {
    sceneManager.currentModelGroup.scale.multiplyScalar(1.2);
    setTimeout(() => {
      sceneManager.loadModel(currentModelKey);
    }, 200);
  }

  // Speak notification
  if ('speechSynthesis' in window) {
    const data = ANATOMY_DATA[currentModelKey];
    const text = `${data ? data.nameUz : 'Organ'} 3D modeli ishga tushirildi`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  btnArDetect.classList.add('active');
  setTimeout(() => btnArDetect.classList.remove('active'), 1500);
});

/**
 * MODE SWITCHING (3D Studio | Kamera AR | Rasm & 3D)
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
    sceneManager.setTransparentBackground(false);
    updateStatus('dot-idle', '3D Studio Rejimi', '#38bdf8');
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
    sceneManager.setTransparentBackground(true);

    loadTargetImage(currentModelKey);
    updateStatus('dot-image', 'Rasm & 3D Rejimi', '#38bdf8');
  }
}

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchMode(btn.getAttribute('data-mode'));
  });
});

/**
 * TARGET IMAGE LOADING
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
 * ORGAN SELECTION (Loads Real 3D Model!)
 */
function selectOrgan(modelKey) {
  currentModelKey = modelKey;
  sceneManager.loadModel(modelKey);
  renderOrganData(modelKey);

  document.querySelectorAll('.m-organ-choice').forEach(choice => {
    choice.classList.toggle('active', choice.getAttribute('data-model') === modelKey);
  });

  if (currentMode === 'image') {
    loadTargetImage(modelKey);
  }
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
 * 3D TOOLBAR CONTROLS
 */
resetCamBtn.addEventListener('click', () => {
  sceneManager.resetCamera();
  partsList.querySelectorAll('.part-card').forEach(c => c.classList.remove('active'));
});

xrayBtn.addEventListener('click', () => {
  const isXRay = sceneManager.toggleXRay();
  xrayBtn.classList.toggle('active', isXRay);
});

wireframeBtn.addEventListener('click', () => {
  const isWireframe = sceneManager.toggleWireframe();
  wireframeBtn.classList.toggle('active', isWireframe);
});

autoRotateBtn.addEventListener('click', () => {
  const isAutoRotate = sceneManager.toggleAutoRotate();
  autoRotateBtn.classList.toggle('active', isAutoRotate);
});

snapshotBtn.addEventListener('click', () => {
  const dataUrl = sceneManager.captureSnapshot();
  const link = document.createElement('a');
  link.download = `MedAnatomy_3D_${currentModelKey}_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
});

// Camera controls
arOpacitySlider.addEventListener('input', (e) => {
  arCamera.setOpacity(parseFloat(e.target.value));
});

switchCameraBtn.addEventListener('click', async () => {
  await arCamera.switchCameraFacing();
});

// Audio pronunciation (TTS)
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
