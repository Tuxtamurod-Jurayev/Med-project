import confetti from 'canvas-confetti';
import { ANATOMY_DATA } from './data/anatomyData.js';
import { SceneManager } from './scene/sceneManager.js';
import { ARCameraManager } from './camera/arCamera.js';

// App State
let currentModelKey = 'skull';
let currentQuizScore = 0;
let userAnswers = {};

// DOM Elements
const canvasContainer = document.getElementById('canvasContainer');
const cameraFeed = document.getElementById('cameraFeed');
const toggleCameraBtn = document.getElementById('toggleCameraBtn');
const cameraBtnText = document.getElementById('cameraBtnText');
const indicatorDot = toggleCameraBtn.querySelector('.indicator-dot');
const arReticle = document.getElementById('arReticle');
const arControlsBar = document.getElementById('arControlsBar');
const arOpacitySlider = document.getElementById('arOpacitySlider');
const switchCameraBtn = document.getElementById('switchCameraBtn');
const cameraStatusIndicator = document.getElementById('cameraStatusIndicator');

// 3D Toolbar Buttons
const resetCamBtn = document.getElementById('resetCamBtn');
const xrayBtn = document.getElementById('xrayBtn');
const wireframeBtn = document.getElementById('wireframeBtn');
const autoRotateBtn = document.getElementById('autoRotateBtn');
const snapshotBtn = document.getElementById('snapshotBtn');
const speakNameBtn = document.getElementById('speakNameBtn');

// Sidebar & Tabs
const infoSidebar = document.getElementById('infoSidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const closeSidebarMobile = document.getElementById('closeSidebarMobile');
const fullscreenBtn = document.getElementById('fullscreenBtn');

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

// Initialize 3D Scene
const sceneManager = new SceneManager(canvasContainer);

// Initialize AR Camera
const arCamera = new ARCameraManager(cameraFeed, (status, message) => {
  if (status === 'active') {
    indicatorDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse indicator-dot';
    cameraBtnText.textContent = 'AR Kamerani o\'chirish';
    toggleCameraBtn.classList.add('bg-emerald-950/60', 'border-emerald-500/50', 'text-emerald-300');
    cameraFeed.classList.remove('opacity-0');
    cameraFeed.classList.add('opacity-100');
    arReticle.classList.remove('hidden');
    arControlsBar.classList.remove('hidden');
    sceneManager.setTransparentBackground(true);
    cameraStatusIndicator.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-emerald-300 font-medium">AR Kamera Faol</span>
    `;
  } else {
    indicatorDot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500 indicator-dot';
    cameraBtnText.textContent = 'AR Kamerani yoqish';
    toggleCameraBtn.classList.remove('bg-emerald-950/60', 'border-emerald-500/50', 'text-emerald-300');
    cameraFeed.classList.remove('opacity-100');
    cameraFeed.classList.add('opacity-0');
    arReticle.classList.add('hidden');
    arControlsBar.classList.add('hidden');
    sceneManager.setTransparentBackground(false);
    cameraStatusIndicator.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-slate-600"></span>
      <span>3D Studio Rejimi</span>
    `;
  }
});

// Sync 3D Raycasting click with UI
sceneManager.onPartSelectedCallback = (partData) => {
  // Highlight card in parts list
  const allCards = partsList.querySelectorAll('.part-card');
  allCards.forEach(c => c.classList.remove('active'));

  const matchingCard = partsList.querySelector(`[data-part-id="${partData.id}"]`);
  if (matchingCard) {
    matchingCard.classList.add('active');
    matchingCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Switch to "Tuzilishi" tab if on another tab
  switchTab('parts');
};

/**
 * RENDER ORGAN DATA TO SIDEBAR
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
  organSpecs.textContent = `${data.bonesCount > 0 ? data.bonesCount + ' ta suyak' : data.weight}`;
  organDescription.textContent = data.description;

  // Render Parts
  partsList.innerHTML = '';
  data.parts.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.setAttribute('data-part-id', part.id);
    card.innerHTML = `
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-xs text-white">${part.nameUz}</span>
        <span class="text-[10px] font-mono text-cyan-400 italic">${part.nameLat}</span>
      </div>
      <p class="text-[11px] text-slate-400 leading-snug">${part.desc}</p>
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
    li.className = 'flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40 text-slate-300';
    li.innerHTML = `
      <span class="text-cyan-400 font-bold mt-0.5">•</span>
      <span>${func}</span>
    `;
    functionsList.appendChild(li);
  });

  // Render Clinical
  clinicalList.innerHTML = '';
  data.clinical.forEach(clin => {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-amber-500/20 text-slate-300';
    li.innerHTML = `
      <span class="text-amber-400 font-bold mt-0.5">⚠️</span>
      <span>${clin}</span>
    `;
    clinicalList.appendChild(li);
  });

  // Render Quiz
  renderQuiz(data.quiz);
}

/**
 * QUIZ ENGINE
 */
function renderQuiz(quizQuestions) {
  quizContainer.innerHTML = '';
  quizScoreBadge.textContent = `Ball: 0/${quizQuestions.length}`;

  quizQuestions.forEach((q, qIndex) => {
    const qBox = document.createElement('div');
    qBox.className = 'bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-2';

    qBox.innerHTML = `
      <p class="text-xs font-semibold text-slate-100">${qIndex + 1}. ${q.question}</p>
      <div class="options-container space-y-1.5" data-q-index="${qIndex}">
        ${q.options.map((opt, optIndex) => `
          <button class="quiz-option" data-opt-index="${optIndex}">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div class="explanation-box hidden text-[11px] p-2 rounded-lg bg-slate-900/80 border border-slate-700/50 text-slate-300 mt-2">
      </div>
    `;

    const optButtons = qBox.querySelectorAll('.quiz-option');
    const explanationBox = qBox.querySelector('.explanation-box');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (userAnswers[qIndex] !== undefined) return; // already answered

        const selectedIndex = parseInt(btn.getAttribute('data-opt-index'));
        userAnswers[qIndex] = selectedIndex;

        // Disable all options for this question
        optButtons.forEach(b => b.disabled = true);

        // Highlight correct and wrong
        if (selectedIndex === q.answerIndex) {
          btn.classList.add('correct');
          currentQuizScore++;
          // Mini confetti blast
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 }
          });
        } else {
          btn.classList.add('wrong');
          optButtons[q.answerIndex].classList.add('correct');
        }

        // Show explanation
        explanationBox.classList.remove('hidden');
        explanationBox.innerHTML = `
          <strong class="${selectedIndex === q.answerIndex ? 'text-emerald-400' : 'text-amber-400'} block mb-1">
            ${selectedIndex === q.answerIndex ? '✓ To\'g\'ri javob!' : '✗ Noto\'g\'ri!'}
          </strong>
          ${q.explanation}
        `;

        // Update score
        quizScoreBadge.textContent = `Ball: ${currentQuizScore}/${quizQuestions.length}`;

        // If completed all and perfect score
        if (Object.keys(userAnswers).length === quizQuestions.length && currentQuizScore === quizQuestions.length) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      });
    });

    quizContainer.appendChild(qBox);
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
 * TABS SWITCHING
 */
function switchTab(tabKey) {
  document.querySelectorAll('.sidebar-tab').forEach(t => {
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

document.querySelectorAll('.sidebar-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.getAttribute('data-tab'));
  });
});

/**
 * ORGAN SWITCHING
 */
document.querySelectorAll('.organ-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.organ-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const modelKey = tab.getAttribute('data-model');
    sceneManager.loadModel(modelKey);
    renderOrganData(modelKey);
  });
});

/**
 * TOOLBAR ACTIONS
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

// AR Camera toggle
toggleCameraBtn.addEventListener('click', async () => {
  await arCamera.toggleCamera();
});

// AR Opacity Slider
arOpacitySlider.addEventListener('input', (e) => {
  arCamera.setOpacity(parseFloat(e.target.value));
});

// Switch Camera Facing (front/back)
switchCameraBtn.addEventListener('click', async () => {
  await arCamera.switchCameraFacing();
});

// Speech Synthesis (Audio Pronunciation)
speakNameBtn.addEventListener('click', () => {
  const data = ANATOMY_DATA[currentModelKey];
  if (!data || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const textToSpeak = `${data.nameLat}. ${data.nameUz}.`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'la'; // Latin or default fallback
  utterance.rate = 0.85;

  speakNameBtn.classList.add('text-cyan-400', 'border-cyan-400');
  utterance.onend = () => {
    speakNameBtn.classList.remove('text-cyan-400', 'border-cyan-400');
  };
  window.speechSynthesis.speak(utterance);
});

// Mobile Sidebar Open/Close
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
