import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { SceneManager } from './scene/sceneManager.js';
import { ARCameraManager } from './camera/arCamera.js';

// Application State
let currentModelKey = 'skull';
let currentQuizScore = 0;
let userAnswers = {};

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const cameraFeed = document.getElementById('cameraFeed');
const toggleCameraBtn = document.getElementById('toggleCameraBtn');
const cameraBtnText = document.getElementById('cameraBtnText');
const arReticle = document.getElementById('arReticle');
const arControlsBar = document.getElementById('arControlsBar');
const arOpacitySlider = document.getElementById('arOpacitySlider');
const switchCameraBtn = document.getElementById('switchCameraBtn');
const cameraStatusIndicator = document.getElementById('cameraStatusIndicator');

// 3D Control Dock Buttons
const resetCamBtn = document.getElementById('resetCamBtn');
const xrayBtn = document.getElementById('xrayBtn');
const wireframeBtn = document.getElementById('wireframeBtn');
const autoRotateBtn = document.getElementById('autoRotateBtn');
const snapshotBtn = document.getElementById('snapshotBtn');
const speakNameBtn = document.getElementById('speakNameBtn');

// Navigation & Sidebar
const infoSidebar = document.getElementById('infoSidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const closeSidebarMobile = document.getElementById('closeSidebarMobile');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Sidebar Details
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

// Initialize 3D Scene Manager
const sceneManager = new SceneManager(canvasContainer);

// Initialize AR Camera
const arCamera = new ARCameraManager(cameraFeed, (status, message) => {
  if (status === 'active') {
    cameraBtnText.textContent = "AR O'chirish";
    toggleCameraBtn.classList.add('active');
    cameraFeed.style.opacity = '1';
    arReticle.classList.remove('hidden');
    arControlsBar.classList.remove('hidden');
    sceneManager.setTransparentBackground(true);
    cameraStatusIndicator.innerHTML = `
      <span class="dot" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
      <span style="color:#34d399;">AR Kamera Faol</span>
    `;
  } else {
    cameraBtnText.textContent = 'AR Kamera';
    toggleCameraBtn.classList.remove('active');
    cameraFeed.style.opacity = '0';
    arReticle.classList.add('hidden');
    arControlsBar.classList.add('hidden');
    sceneManager.setTransparentBackground(false);
    cameraStatusIndicator.innerHTML = `
      <span class="dot dot-idle"></span>
      <span>3D Studio Rejimi</span>
    `;
  }
});

// Sync 3D Raycasting clicks with Parts List
sceneManager.onPartSelectedCallback = (partData) => {
  const allCards = partsList.querySelectorAll('.part-card');
  allCards.forEach(c => c.classList.remove('active'));

  const matchingCard = partsList.querySelector(`[data-part-id="${partData.id}"]`);
  if (matchingCard) {
    matchingCard.classList.add('active');
    matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  switchTab('parts');
};

/**
 * Render Organ Details to Sidebar
 */
function renderOrganData(modelKey) {
  const data = ANATOMY_DATA[modelKey];
  if (!data) return;

  currentModelKey = modelKey;
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
      sceneManager.highlightPartById(part.id);
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
 * Render Interactive Quiz
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
        if (userAnswers[qIndex] !== undefined) return; // already answered

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

// Reset Quiz
resetQuizBtn.addEventListener('click', () => {
  const data = ANATOMY_DATA[currentModelKey];
  if (data) {
    currentQuizScore = 0;
    userAnswers = {};
    renderQuiz(data.quiz);
  }
});

/**
 * Tab Switching in Sidebar
 */
function switchTab(tabKey) {
  document.querySelectorAll('.s-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabKey);
  });

  const tabMap = {
    parts: 'tabParts',
    functions: 'tabFunctions',
    clinical: 'tabClinical',
    quiz: 'tabQuiz'
  };

  document.querySelectorAll('.tab-view').forEach(p => p.classList.add('hidden'));
  const activePanel = document.getElementById(tabMap[tabKey]);
  if (activePanel) activePanel.classList.remove('hidden');
}

document.querySelectorAll('.s-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.getAttribute('data-tab'));
  });
});

/**
 * Organ Model Selection (Header tabs)
 */
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const modelKey = tab.getAttribute('data-model');
    sceneManager.loadModel(modelKey);
    renderOrganData(modelKey);
  });
});

/**
 * 3D Dock Controls
 */
resetCamBtn.addEventListener('click', () => {
  sceneManager.resetCamera();
  sceneManager.clearHighlight();
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
  link.download = `MedAnatomy_${currentModelKey}_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
});

// Camera Controls
toggleCameraBtn.addEventListener('click', async () => {
  await arCamera.toggleCamera();
});

arOpacitySlider.addEventListener('input', (e) => {
  arCamera.setOpacity(parseFloat(e.target.value));
});

switchCameraBtn.addEventListener('click', async () => {
  await arCamera.switchCameraFacing();
});

// Latin Audio Pronunciation (TTS)
speakNameBtn.addEventListener('click', () => {
  const data = ANATOMY_DATA[currentModelKey];
  if (!data || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(`${data.nameLat}. ${data.nameUz}.`);
  utterance.lang = 'la';
  utterance.rate = 0.85;

  speakNameBtn.style.color = '#22d3ee';
  utterance.onend = () => {
    speakNameBtn.style.color = '';
  };
  window.speechSynthesis.speak(utterance);
});

// Mobile Sidebar Toggle
toggleSidebarBtn.addEventListener('click', () => {
  infoSidebar.classList.toggle('open');
});

closeSidebarMobile.addEventListener('click', () => {
  infoSidebar.classList.remove('open');
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// Initial Render
renderOrganData('skull');
