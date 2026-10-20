import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PROCEDURAL_MODEL_BUILDERS } from './anatomyModels.js';

export class Real3DSceneManager {
  constructor(canvasContainer, onLoadingProgress) {
    this.container = canvasContainer;
    this.onProgress = onLoadingProgress || (() => {});

    this.currentModelKey = 'brain';
    this.loadedModelsCache = {};
    this.currentModelGroup = null;

    this.isXRay = false;
    this.isWireframe = false;
    this.isAutoRotate = false;
    this.isPulsing = false;

    this.clock = new THREE.Clock();
    this.loader = new GLTFLoader();

    // Model configuration map for GLB paths & scales
    this.modelConfigs = {
      brain: {
        path: '/models/brain.glb',
        targetScale: 2.2,
        yOffset: 0.0
      },
      skull: {
        path: '/models/skull.glb',
        targetScale: 1.85,
        yOffset: 0.0
      },
      eye: {
        path: '/models/eye.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      heart: {
        path: '/models/heart.glb',
        targetScale: 2.2,
        yOffset: 0.0
      },
      lung: {
        path: '/models/lung.glb',
        targetScale: 2.1,
        yOffset: 0.0
      },
      stomach: {
        path: '/models/stomach.glb',
        targetScale: 2.2,
        yOffset: 0.0
      },
      liver: {
        path: '/models/liver.glb',
        targetScale: 2.2,
        yOffset: 0.0
      },
      kidney: {
        path: '/models/kidney.glb',
        targetScale: 2.2,
        yOffset: 0.0
      },
      spine: {
        path: '/models/spine.glb',
        targetScale: 2.5,
        yOffset: -0.1
      }
    };

    this.initScene();
    this.initLights();
    this.initControls();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060a14);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 4.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.2);
    this.hemiLight.position.set(0, 20, 0);
    this.scene.add(this.hemiLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.keyLight.position.set(6, 8, 7);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    this.fillLight.position.set(-6, 2, -4);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0xfef08a, 1.35);
    this.rimLight.position.set(0, -6, -5);
    this.scene.add(this.rimLight);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 14;
    this.controls.enablePan = true;
  }

  /**
   * Load any 3D model (GLB or Procedural)
   */
  async loadModel(key) {
    this.currentModelKey = key;

    // Use cached model if available
    if (this.loadedModelsCache[key]) {
      this.displayModel(this.loadedModelsCache[key], key);
      return;
    }

    this.onProgress(true, `3D model yuklanmoqda...`);

    // Check if a GLB configuration exists
    if (this.modelConfigs[key]) {
      try {
        const pivotGroup = await this.loadGLBModel(key);
        this.loadedModelsCache[key] = pivotGroup;
        this.displayModel(pivotGroup, key);
        this.onProgress(false, 'Tayyor');
        return;
      } catch (err) {
        console.warn(`GLB load failed for ${key}, falling back to procedural model:`, err);
      }
    }

    // Load Procedural Model
    if (PROCEDURAL_MODEL_BUILDERS[key]) {
      try {
        const pivotGroup = this.loadProceduralModel(key);
        this.loadedModelsCache[key] = pivotGroup;
        this.displayModel(pivotGroup, key);
        this.onProgress(false, 'Tayyor');
        return;
      } catch (err) {
        console.error(`Procedural model creation failed for ${key}:`, err);
      }
    }

    this.onProgress(false, 'Modelni yuklashda xatolik yuz berdi');
  }

  /**
   * Loads and enhances a GLB model with anatomical materials & tissue coloring
   */
  async loadGLBModel(key) {
    const cfg = this.modelConfigs[key];

    const gltf = await new Promise((resolve, reject) => {
      this.loader.load(
        cfg.path,
        (loadedGltf) => resolve(loadedGltf),
        (xhr) => {
          if (xhr.lengthComputable) {
            const pct = Math.round((xhr.loaded / xhr.total) * 100);
            this.onProgress(true, `3D model yuklanmoqda (${pct}%)...`);
          }
        },
        (err) => reject(err)
      );
    });

    const modelRoot = gltf.scene;

    // Normalize Bounding Box
    const bbox = new THREE.Box3().setFromObject(modelRoot);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = (cfg.targetScale || 2.0) / maxDim;
    modelRoot.scale.set(scale, scale, scale);

    modelRoot.position.x = -center.x * scale;
    modelRoot.position.y = -center.y * scale + (cfg.yOffset || 0);
    modelRoot.position.z = -center.z * scale;

    const pivotGroup = new THREE.Group();
    pivotGroup.add(modelRoot);

    // Apply specialized Medical PBR Colorizing
    this.colorizeModelTissues(pivotGroup, key);

    return pivotGroup;
  }

  /**
   * Loads a procedurally generated Three.js medical model
   */
  loadProceduralModel(key) {
    const builderFn = PROCEDURAL_MODEL_BUILDERS[key];
    const modelRoot = builderFn();

    // Normalize Bounding Box
    const bbox = new THREE.Box3().setFromObject(modelRoot);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 2.0;
    const targetScale = 2.2;
    const scale = targetScale / maxDim;
    modelRoot.scale.set(scale, scale, scale);

    modelRoot.position.x = -center.x * scale;
    modelRoot.position.y = -center.y * scale;
    modelRoot.position.z = -center.z * scale;

    const pivotGroup = new THREE.Group();
    pivotGroup.add(modelRoot);

    pivotGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return pivotGroup;
  }

  /**
   * Colorizes anatomical tissues for Brain, Skull, Eye, Heart, and Organs
   */
  colorizeModelTissues(group, key) {
    if (key === 'brain') {
      // Vivid anatomical coloring for brain lobes & structures
      const brainLobeColors = {
        'Frontal lobe': { color: 0x2563eb, roughness: 0.4, metalness: 0.05 }, // Royal Blue (Peshona bo'lagi)
        'Parietal lobe': { color: 0x10b981, roughness: 0.4, metalness: 0.05 }, // Emerald Green (Tepa bo'lagi)
        'Occipital lobe': { color: 0xf59e0b, roughness: 0.4, metalness: 0.05 }, // Amber / Gold (Ensa bo'lagi)
        'Temporal lobe': { color: 0x8b5cf6, roughness: 0.4, metalness: 0.05 }, // Violet / Purple (Chakka bo'lagi)
        'Cerebellum': { color: 0xef4444, roughness: 0.42, metalness: 0.05 }, // Coral Red (Miyacha)
        'White matter': { color: 0xf8fafc, roughness: 0.35, metalness: 0.05 }, // Pearl White
        'Nerve': { color: 0xfacc15, roughness: 0.25, metalness: 0.1, emissive: 0xca8a04, emissiveIntensity: 0.3 }, // Glowing Nerve Yellow
        'Brain-Inner': { color: 0xec4899, roughness: 0.4, metalness: 0.05 }, // Deep Rose Pink
        'Insula': { color: 0x06b6d4, roughness: 0.4, metalness: 0.05 }, // Cyan
        'Limbic lobe': { color: 0x14b8a6, roughness: 0.4, metalness: 0.05 }, // Teal
        'Nucleus': { color: 0xf97316, roughness: 0.35, metalness: 0.08 },
        'Nucleus (afferent fibers)': { color: 0xe11d48, roughness: 0.35, metalness: 0.08 },
        'Nucleus (efferent fibers)': { color: 0x0284c7, roughness: 0.35, metalness: 0.08 },
        'LCR': { color: 0x93c5fd, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.75 },
        'Brain': { color: 0x38bdf8, roughness: 0.4, metalness: 0.05 }
      };

      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name || '';
          const nodeName = child.name.toLowerCase();

          if (brainLobeColors[matName]) {
            const cfg = brainLobeColors[matName];
            child.material = new THREE.MeshStandardMaterial({
              color: cfg.color,
              roughness: cfg.roughness,
              metalness: cfg.metalness,
              emissive: cfg.emissive || 0x000000,
              emissiveIntensity: cfg.emissiveIntensity || 0,
              transparent: !!cfg.transparent,
              opacity: cfg.opacity || 1.0
            });
          } else if (nodeName.includes('medulla') || nodeName.includes('pons') || nodeName.includes('stem') || nodeName.includes('pyramid')) {
            // Brainstem / Medulla Oblongata
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfef08a,
              roughness: 0.38,
              metalness: 0.05
            });
          } else {
            // Default soft cortical hue
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              roughness: 0.4,
              metalness: 0.05
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'skull') {
      // Natural warm ivory bone shading with organic depth
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xf6efe2,
            roughness: 0.42,
            metalness: 0.08
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'eye') {
      // Vivid Ocular Tissues: Cornea glass, Sapphire Iris, Clean Sclera
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name || '';
          if (matName.toLowerCase().includes('glass') || child.name.toLowerCase().includes('glass')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.32,
              roughness: 0.05,
              transmission: 0.9,
              ior: 1.376
            });
          } else {
            child.material.roughness = Math.max(child.material.roughness, 0.25);
            child.material.metalness = Math.min(child.material.metalness || 0, 0.1);
          }
          child.castShadow = true;
        }
      });
    } else if (key === 'heart') {
      // Optimized Cardiology: Aorta Red, Vena Cava Blue, Pulmonary Cyan, Muscle Crimson
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name || '';
          const nodeName = child.name.toLowerCase();

          if (matName === 'Artery' || nodeName.includes('aorta') || nodeName.includes('artery')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626, // Vivid Arterial Red
              roughness: 0.28,
              metalness: 0.15
            });
          } else if (matName === 'Pulmonary artery' || nodeName.includes('pulmonary')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x0284c7, // Cyan-Blue
              roughness: 0.3,
              metalness: 0.12
            });
          } else if (nodeName.includes('vena') || nodeName.includes('vein')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x1d4ed8, // Royal Blue
              roughness: 0.28,
              metalness: 0.15
            });
          } else if (matName === 'Trapezius.001' || nodeName.includes('ventricle') || nodeName.includes('surface')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b, // Rich Myocardium Crimson
              roughness: 0.32,
              metalness: 0.1
            });
          } else if (matName === 'Ligament.002' || matName === 'Cartilage.002') {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1f5f9,
              roughness: 0.25,
              metalness: 0.05
            });
          } else {
            child.material.roughness = 0.35;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else {
      // General PBR optimization
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material.metalness !== undefined) {
            child.material.metalness = Math.min(child.material.metalness, 0.2);
          }
          if (child.material.roughness !== undefined) {
            child.material.roughness = Math.max(child.material.roughness, 0.35);
          }
        }
      });
    }
  }

  displayModel(pivotGroup, key) {
    if (this.currentModelGroup) {
      this.scene.remove(this.currentModelGroup);
    }

    this.currentModelGroup = pivotGroup;
    this.scene.add(this.currentModelGroup);

    this.isPulsing = (key === 'heart' || key === 'circulatory_system' || key === 'lung' || key === 'respiratory_system');
    this.applyXRayState();
    this.applyWireframeState();
    this.resetCamera();
  }

  setTransparentBackground(isTransparent) {
    if (isTransparent) {
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 0);
    } else {
      this.scene.background = new THREE.Color(0x060a14);
      this.renderer.setClearColor(0x060a14, 1);
    }
  }

  toggleXRay() {
    this.isXRay = !this.isXRay;
    this.applyXRayState();
    return this.isXRay;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.applyWireframeState();
    return this.isWireframe;
  }

  applyXRayState() {
    if (!this.currentModelGroup) return;

    this.currentModelGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        if (this.isXRay) {
          child.material.transparent = true;
          child.material.opacity = 0.45;
          child.material.depthWrite = false;
        } else {
          child.material.transparent = false;
          child.material.opacity = 1.0;
          child.material.depthWrite = true;
        }
        child.material.needsUpdate = true;
      }
    });
  }

  applyWireframeState() {
    if (!this.currentModelGroup) return;

    this.currentModelGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = this.isWireframe;
      }
    });
  }

  toggleAutoRotate() {
    this.isAutoRotate = !this.isAutoRotate;
    this.controls.autoRotate = this.isAutoRotate;
    this.controls.autoRotateSpeed = 2.0;
    return this.isAutoRotate;
  }

  resetCamera() {
    this.camera.position.set(0, 0, 4.5);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  captureSnapshot() {
    return this.renderer.domElement.toDataURL('image/png');
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    // Rhythmic organic animations
    if (this.currentModelGroup && this.isPulsing) {
      if (this.currentModelKey === 'heart' || this.currentModelKey === 'circulatory_system') {
        // Anatomical dual-phase heartbeat (Lub-Dub rhythm at ~72 bpm)
        const cycle = (elapsedTime * 1.2) % 1.0;
        let heartPulse = 1.0;
        if (cycle < 0.14) {
          heartPulse = 1.0 + Math.sin((cycle / 0.14) * Math.PI) * 0.05;
        } else if (cycle > 0.18 && cycle < 0.44) {
          const vProg = (cycle - 0.18) / 0.26;
          heartPulse = 1.0 + Math.sin(vProg * Math.PI) * 0.09;
        }
        this.currentModelGroup.scale.set(heartPulse, heartPulse, heartPulse);
      } else if (this.currentModelKey === 'lung' || this.currentModelKey === 'respiratory_system') {
        // Natural thoracic respiration
        const breath = 1.0 + Math.sin(elapsedTime * 1.8) * 0.045;
        this.currentModelGroup.scale.set(breath, breath, breath);
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
