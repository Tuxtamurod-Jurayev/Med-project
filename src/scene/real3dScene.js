import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { PROCEDURAL_MODEL_BUILDERS, BoneMaterial, CartilageMaterial, NerveMaterial, MuscleMaterial, TendonMaterial } from './anatomyModels.js';

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
    this.isPulsing = true;

    this.clock = new THREE.Clock();

    // Initialize GLTFLoader with DRACOLoader for compressed models (e.g. spine.glb)
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/gltf/');
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.setMeshoptDecoder(MeshoptDecoder);

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
        targetScale: 2.2,
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
      spine: {
        path: '/models/spine.glb',
        targetScale: 2.5,
        yOffset: -0.1
      },
      musculoskeletal_system: {
        path: '/models/skeleton.glb',
        targetScale: 2.7,
        yOffset: 0.0
      },
      hand_fingers: {
        path: '/models/hand.glb',
        targetScale: 2.5,
        yOffset: 0.0
      },
      pancreas: {
        path: '/models/pancreas.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      oral_cavity: {
        path: '/models/oral_cavity.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      gallbladder: {
        path: '/models/gallbladder.glb',
        targetScale: 2.45,
        yOffset: 0.05
      },
      esophagus_pharynx: {
        path: '/models/esophagus_pharynx.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      salivary_glands: {
        path: '/models/salivary_glands.glb',
        targetScale: 2.4,
        yOffset: 0.0
      },
      small_intestine: {
        path: '/models/small_intestine.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      large_intestine: {
        path: '/models/large_intestine.glb',
        targetScale: 2.3,
        yOffset: 0.0
      },
      ear: {
        path: '/models/ear.glb',
        targetScale: 2.4,
        yOffset: 0.0
      },
      skin_layers: {
        path: '/models/skin_layers.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      skin: {
        path: '/models/skin_layers.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      larynx_vocal_cords: {
        path: '/models/larynx_vocal_cords.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      larynx: {
        path: '/models/larynx_vocal_cords.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      kidney: {
        path: '/models/kidney.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      kidney_nephron: {
        path: '/models/kidney.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      ureters: {
        path: '/models/ureters.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      bladder_urethra: {
        path: '/models/bladder_urethra.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      bladder: {
        path: '/models/bladder_urethra.glb',
        targetScale: 2.35,
        yOffset: 0.0
      },
      urinary_system: {
        path: '/models/urinary_system.glb',
        targetScale: 2.6,
        yOffset: -0.05
      },
      endocrine_system: {
        path: '/models/endocrine_system.glb',
        targetScale: 2.6,
        yOffset: -0.05
      },
      circulatory_system: {
        path: '/models/circulatory_system.glb',
        targetScale: 2.7,
        yOffset: -0.05
      },
      nervous_system: {
        path: '/models/nervous_system.glb',
        targetScale: 2.7,
        yOffset: -0.05
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
    this.scene.background = new THREE.Color(0x2f2f2f);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 4.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x2f2f2f, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // Ambient light - balanced illumination so no angle is pitch black
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(this.ambientLight);

    // Hemisphere light - natural neutral ground tone matching #2f2f2f
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x383838, 1.25);
    this.hemiLight.position.set(0, 20, 0);
    this.scene.add(this.hemiLight);

    // Key front light
    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    this.keyLight.position.set(6, 8, 7);
    this.scene.add(this.keyLight);

    // Fill side light (soft cool blue)
    this.fillLight = new THREE.DirectionalLight(0x93c5fd, 1.3);
    this.fillLight.position.set(-6, 3, 4);
    this.scene.add(this.fillLight);

    // Rim back light for crisp edges
    this.rimLight = new THREE.DirectionalLight(0xfef08a, 1.15);
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
   * Load any 3D model (GLB file or Procedural 3D model)
   */
  async loadModel(key) {
    this.currentModelKey = key;

    // Use cached model if available
    if (this.loadedModelsCache[key]) {
      this.displayModel(this.loadedModelsCache[key], key);
      return;
    }

    this.onProgress(true, `3D model yuklanmoqda...`);

    // 1. Try GLB if configured
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

    // 2. Load Procedural 3D Model
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
   * Loads a GLB model and applies precise anatomical shader corrections
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

    // Remove any 3D floating label/pin groups (e.g. from Sketchfab models)
    const labelsToRemove = [];
    modelRoot.traverse((child) => {
      const name = (child.name || '').toLowerCase();
      if (name.includes('labelgroup') || name.startsWith('label') || name.includes('label_') || name.includes(':label')) {
        labelsToRemove.push(child);
      }
    });
    labelsToRemove.forEach((c) => {
      if (c.parent) c.parent.remove(c);
    });

    // Apply specialized Medical PBR Colorizing & Texture Preservations
    this.colorizeModelTissues(modelRoot, key);

    // Normalize Bounding Box and Center at (0, 0, 0)
    modelRoot.updateMatrixWorld(true);
    let center = new THREE.Vector3();
    let maxDim = 1.0;

    if (key === 'gallbladder') {
      const gbBox = new THREE.Box3();
      modelRoot.traverse((c) => {
        if (c.isMesh && (c.name.toLowerCase().includes('gallbladder') || c.name.toLowerCase().includes('artery') || c.name.toLowerCase().includes('vein'))) {
          gbBox.expandByObject(c);
        }
      });
      const fullBox = new THREE.Box3().setFromObject(modelRoot);
      const fullSize = fullBox.getSize(new THREE.Vector3());
      maxDim = Math.max(fullSize.x, fullSize.y, fullSize.z) || 1.0;
      center = gbBox.isEmpty() ? fullBox.getCenter(new THREE.Vector3()) : gbBox.getCenter(new THREE.Vector3());
      modelRoot.rotation.x = -0.28;
    } else {
      const bbox = new THREE.Box3().setFromObject(modelRoot);
      const size = bbox.getSize(new THREE.Vector3());
      center = bbox.getCenter(new THREE.Vector3());
      maxDim = Math.max(size.x, size.y, size.z) || 1.0;
    }
    const scale = (cfg.targetScale || 2.2) / maxDim;
    modelRoot.scale.set(scale, scale, scale);

    modelRoot.position.set(
      -center.x * scale,
      -center.y * scale + (cfg.yOffset || 0),
      -center.z * scale
    );

    const pivotGroup = new THREE.Group();
    pivotGroup.add(modelRoot);

    return pivotGroup;
  }

  /**
   * Loads a procedurally generated Three.js medical model
   */
  loadProceduralModel(key) {
    const builderFn = PROCEDURAL_MODEL_BUILDERS[key];
    const modelRoot = builderFn();

    // Normalize Bounding Box and Center at (0, 0, 0)
    modelRoot.updateMatrixWorld(true);
    const bbox = new THREE.Box3().setFromObject(modelRoot);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
    const targetScale = (key === 'oral_cavity' || key === 'pancreas' || key === 'gallbladder') ? 2.45 : 2.2;
    const scale = targetScale / maxDim;
    modelRoot.scale.set(scale, scale, scale);

    modelRoot.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    const pivotGroup = new THREE.Group();
    pivotGroup.add(modelRoot);

    pivotGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material.metalness !== undefined) {
          child.material.metalness = Math.min(child.material.metalness, 0.15);
        }
      }
    });

    return pivotGroup;
  }

  /**
   * Helper promise wrapper for GLTFLoader with progress
   */
  loadGLTFAsync(path, onProgress) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => resolve(gltf),
        (xhr) => {
          if (onProgress && xhr.lengthComputable) {
            onProgress(xhr.loaded / xhr.total);
          }
        },
        (err) => reject(err)
      );
    });
  }

  /**
   * Anatomically accurate shading & tissue coloring without stripping textures
   */
  colorizeModelTissues(group, key) {
    if (key === 'brain') {
      // Natural medical atlas colors for distinct cerebral lobes & structures
      const brainLobeColors = {
        'Frontal lobe': { color: 0x38bdf8, roughness: 0.4 }, // Soft Cerulean Blue (Peshona bo'lagi)
        'Parietal lobe': { color: 0x34d399, roughness: 0.4 }, // Pastel Emerald Green (Tepa bo'lagi)
        'Occipital lobe': { color: 0xfbbf24, roughness: 0.4 }, // Warm Amber Gold (Ensa bo'lagi)
        'Temporal lobe': { color: 0xa78bfa, roughness: 0.4 }, // Soft Lavender Purple (Chakka bo'lagi)
        'Cerebellum': { color: 0xf87171, roughness: 0.42 }, // Anatomical Coral Red (Miyacha)
        'White matter': { color: 0xf8fafc, roughness: 0.35 }, // Pearl White
        'Nerve': { color: 0xfacc15, roughness: 0.25, emissive: 0xca8a04, emissiveIntensity: 0.3 }, // Bright golden nerves
        'Brain-Inner': { color: 0xf5d0c5, roughness: 0.45 }, // Natural deep cerebral tissue flesh tone
        'Insula': { color: 0x22d3ee, roughness: 0.4 }, // Cyan
        'Limbic lobe': { color: 0x2dd4bf, roughness: 0.4 }, // Teal
        'Nucleus': { color: 0xfb923c, roughness: 0.38 }, // Soft Orange
        'Nucleus (afferent fibers)': { color: 0xf43f5e, roughness: 0.38 },
        'Nucleus (efferent fibers)': { color: 0x0ea5e9, roughness: 0.38 },
        'LCR': { color: 0x7dd3fc, roughness: 0.15, transparent: true, opacity: 0.65, depthWrite: false },
        'Interlobar sulci': { color: 0x334155, roughness: 0.6 },
        'Brain': { color: 0xf1e5df, roughness: 0.42 }
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
              metalness: 0.05,
              emissive: cfg.emissive || 0x000000,
              emissiveIntensity: cfg.emissiveIntensity || 0,
              transparent: !!cfg.transparent,
              opacity: cfg.opacity || 1.0,
              depthWrite: cfg.depthWrite !== undefined ? cfg.depthWrite : true,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('medulla') || nodeName.includes('pons') || nodeName.includes('stem') || nodeName.includes('pyramid')) {
            // Brainstem / Medulla Oblongata
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfef08a,
              roughness: 0.4,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1e5df,
              roughness: 0.42,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'skull' || key === 'skeleton' || key === 'musculoskeletal_system' || key === 'hand_fingers') {
      // Anatomical Pedagogical Color Coding (Medical Atlas standard)
      const getBoneColor = (node) => {
        const n = (node.name || '').toLowerCase();
        const p = (node.parent && node.parent.name ? node.parent.name : '').toLowerCase();
        const mat = (node.material && node.material.name ? node.material.name : '').toLowerCase();
        const all = n + ' ' + p;

        // Teeth: High gloss white enamel
        if (mat.includes('teeth') || mat.includes('dentine') || all.includes('tooth') || all.includes('teeth')) {
          return { color: 0xffffff, roughness: 0.12, metalness: 0.02 };
        }
        // Cranial Sutures: Fibrous slate
        if (mat.includes('suture') || all.includes('suture')) {
          return { color: 0x475569, roughness: 0.65, metalness: 0.0 };
        }
        // Costal & Articular Cartilage: Translucent Aqua Blue
        if (mat.includes('cartilage') || all.includes('cartilage')) {
          return { color: 0x38bdf8, roughness: 0.25, metalness: 0.02, transparent: true, opacity: 0.88 };
        }

        // Cranium & Facial Bones (Bosh suyagi bo'limlari)
        if (all.includes('frontal')) return { color: 0x38bdf8, roughness: 0.38 }; // Cerulean Blue (Peshona)
        if (all.includes('parietal')) return { color: 0xfacc15, roughness: 0.38 }; // Amber Gold (Tepa)
        if (all.includes('temporal')) return { color: 0x10b981, roughness: 0.38 }; // Emerald Green (Chakka)
        if (all.includes('occipital')) return { color: 0x6366f1, roughness: 0.38 }; // Indigo (Ensa)
        if (all.includes('sphenoid')) return { color: 0xa855f7, roughness: 0.38 }; // Violet Purple (Ponasimon)
        if (all.includes('ethmoid')) return { color: 0xec4899, roughness: 0.38 }; // Magenta Pink (G'alvirsimon)
        if (all.includes('maxilla')) return { color: 0xf97316, roughness: 0.38 }; // Warm Orange (Yuqori jag')
        if (all.includes('mandible')) return { color: 0x06b6d4, roughness: 0.38 }; // Cyan (Pastki jag')
        if (all.includes('zygomatic')) return { color: 0xf43f5e, roughness: 0.38 }; // Coral Rose (Yonoq)
        if (all.includes('nasal')) return { color: 0x14b8a6, roughness: 0.38 }; // Teal (Burun)
        if (all.includes('lacrimal')) return { color: 0x84cc16, roughness: 0.38 }; // Lime Green (Ko'z yoshi)
        if (all.includes('palatine') || all.includes('vomer')) return { color: 0xeab308, roughness: 0.38 };
        if (all.includes('hyoid')) return { color: 0xf59e0b, roughness: 0.38 };
        if (all.includes('incus') || all.includes('malleus') || all.includes('stapes')) return { color: 0xfb7185, roughness: 0.35 };

        // Vertebral Column (Umurtqa pog'onasi zonalari)
        if (all.includes('c1') || all.includes('c2') || all.includes('c3') || all.includes('c4') || all.includes('c5') || all.includes('c6') || all.includes('c7') || all.includes('atlas') || all.includes('axis')) {
          return { color: 0x818cf8, roughness: 0.38 }; // Cervical periwinkle (Bo'yin umurtqalari)
        }
        if (all.includes('vertebra_t') || all.includes('thoracic')) return { color: 0x34d399, roughness: 0.38 }; // Thoracic emerald (Ko'krak)
        if (all.includes('vertebra_l') || all.includes('lumbar')) return { color: 0xfbbf24, roughness: 0.38 }; // Lumbar gold (Bel umurtqalari)
        if (all.includes('sacrum') || all.includes('coccyx')) return { color: 0xc084fc, roughness: 0.38 }; // Sacrum lavender (Dumg'aza va dum)

        // Thoracic Cage & Pelvis
        if (all.includes('rib')) return { color: 0xfb7185, roughness: 0.38 }; // Coral ribs (Qovurg'alar)
        if (all.includes('sternum') || all.includes('xiphoid') || all.includes('manubrium')) return { color: 0xe11d48, roughness: 0.38 }; // Crimson (To'sh)
        if (all.includes('clavicle')) return { color: 0xf59e0b, roughness: 0.38 }; // Gold (O'mrov)
        if (all.includes('scapula')) return { color: 0xd97706, roughness: 0.38 }; // Amber (Kurak)
        if (all.includes('hip') || all.includes('ilium') || all.includes('ischium') || all.includes('pubis')) return { color: 0x0284c7, roughness: 0.38 }; // Pelvis blue (Tos suyaklari)

        // Upper Limbs (Qo'l suyaklari)
        if (all.includes('humerus')) return { color: 0xa855f7, roughness: 0.38 }; // Purple (Yelka)
        if (all.includes('radius')) return { color: 0x06b6d4, roughness: 0.38 }; // Cyan (Bilak - radius)
        if (all.includes('ulna')) return { color: 0x3b82f6, roughness: 0.38 }; // Blue (Tirsak - ulna)

        // Hand Bones & Phalanges (Kaft va barmoqlar)
        if (all.includes('scaphoid')) return { color: 0xf43f5e, roughness: 0.38 };
        if (all.includes('lunate')) return { color: 0xec4899, roughness: 0.38 };
        if (all.includes('triquetrum')) return { color: 0xd946ef, roughness: 0.38 };
        if (all.includes('pisiform')) return { color: 0xc084fc, roughness: 0.38 };
        if (all.includes('trapezium')) return { color: 0x8b5cf6, roughness: 0.38 };
        if (all.includes('trapezoid')) return { color: 0x6366f1, roughness: 0.38 };
        if (all.includes('capitate')) return { color: 0xa855f7, roughness: 0.38 };
        if (all.includes('hamate')) return { color: 0x7c3aed, roughness: 0.38 };
        if (all.includes('carpal')) return { color: 0xec4899, roughness: 0.38 };

        if (all.includes('first_metacarpal')) return { color: 0xef4444, roughness: 0.38 };
        if (all.includes('second_metacarpal')) return { color: 0xf97316, roughness: 0.38 };
        if (all.includes('third_metacarpal')) return { color: 0xf59e0b, roughness: 0.38 };
        if (all.includes('fourth_metacarpal')) return { color: 0xeab308, roughness: 0.38 };
        if (all.includes('fifth_metacarpal') || all.includes('metacarpal')) return { color: 0x10b981, roughness: 0.38 };

        if (all.includes('distal_phalanx')) return { color: 0xef4444, roughness: 0.38 }; // Red tip (Tirnoq falangalari)
        if (all.includes('middle_phalanx')) return { color: 0xfacc15, roughness: 0.38 }; // Yellow middle (O'rta falangalar)
        if (all.includes('proximal_phalanx') || all.includes('phalanx')) return { color: 0x10b981, roughness: 0.38 }; // Green base (Asosiy falangalar)

        // Lower Limbs (Oyoq suyaklari)
        if (all.includes('femur')) return { color: 0x6366f1, roughness: 0.38 }; // Indigo (Son)
        if (all.includes('patella')) return { color: 0xf43f5e, roughness: 0.38 }; // Rose (Tizza qopqog'i)
        if (all.includes('tibia')) return { color: 0x0d9488, roughness: 0.38 }; // Teal (Katta boldir)
        if (all.includes('fibula')) return { color: 0x84cc16, roughness: 0.38 }; // Lime (Kichik boldir)
        if (all.includes('tarsal') || all.includes('calcaneus') || all.includes('talus') || all.includes('cuneiform') || all.includes('cuboid') || all.includes('navicular')) return { color: 0x8b5cf6, roughness: 0.38 };
        if (all.includes('metatarsal')) return { color: 0xf97316, roughness: 0.38 };

        return { color: 0xf5eedb, roughness: 0.44 }; // Default bone
      };

      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const cfg = getBoneColor(child);
          child.material = new THREE.MeshStandardMaterial({
            color: cfg.color,
            roughness: cfg.roughness !== undefined ? cfg.roughness : 0.4,
            metalness: cfg.metalness !== undefined ? cfg.metalness : 0.05,
            transparent: !!cfg.transparent,
            opacity: cfg.opacity !== undefined ? cfg.opacity : 1.0,
            side: THREE.DoubleSide
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'eye') {
      // Correct ocular shaders: crystal clear glass cornea with depthWrite=false so textured eye shines through!
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name || '';
          if (matName.toLowerCase().includes('glass') || child.name.toLowerCase().includes('glass')) {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.14,
              roughness: 0.02,
              metalness: 0.0,
              transmission: 0.98,
              ior: 1.376,
              depthWrite: false, // Essential: never occlude inner eye!
              side: THREE.FrontSide
            });
          } else {
            // Inner eyeball (with high-res baked iris, pupil and sclera texture from Sketchfab)
            if (child.material.map) {
              child.material.roughness = 0.22;
              child.material.metalness = 0.0;
              child.material.depthWrite = true;
              child.material.side = THREE.DoubleSide;
              if (child.material.normalMap && child.material.normalScale) {
                child.material.normalScale.set(1.2, 1.2);
              }
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf8fafc,
                roughness: 0.22,
                metalness: 0.0,
                side: THREE.DoubleSide
              });
            }
          }
          child.castShadow = true;
        }
      });
    } else if (key === 'heart') {
      // Cardiology: Aorta arterial red, Pulmonary trunk cyan-blue, Myocardium rich crimson, Valves pearl white
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = (child.material.name || '').toLowerCase();
          const nodeName = (child.name || '').toLowerCase();

          if (matName.includes('artery') || nodeName.includes('aorta') || nodeName.includes('artery') || nodeName.includes('coronary')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626, // Arterial scarlet red
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('pulmonary') || nodeName.includes('pulmonary')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x0284c7, // Pulmonary cyan-blue
              roughness: 0.3,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('trapezius') || nodeName.includes('ventricle') || nodeName.includes('atrium') || nodeName.includes('sulcus') || nodeName.includes('surface') || nodeName.includes('apex') || nodeName.includes('border') || nodeName.includes('base')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b, // Rich Myocardium crimson
              roughness: 0.35,
              metalness: 0.06,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('ligament') || matName.includes('cartilage') || nodeName.includes('valve') || nodeName.includes('leaflet')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf8fafc, // Pearl white valve leaflets
              roughness: 0.25,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else {
            child.material.roughness = 0.35;
            child.material.side = THREE.DoubleSide;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'circulatory_system') {
      // Full Human Circulatory System: 676 meshes (Arteries, Veins, Heart, Cartilage)
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = (child.material.name || '').toLowerCase();
          const nodeName = (child.name || '').toLowerCase();

          if (matName.includes('artery') || nodeName.includes('artery') || nodeName.includes('aorta') || nodeName.includes('trunk')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626, // Arterial oxygenated bright red
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('vein') || nodeName.includes('vein') || nodeName.includes('vena') || nodeName.includes('sinus')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x2563eb, // Venous deoxygenated royal blue
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('heart') || nodeName.includes('heart') || nodeName.includes('cardiac')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b, // Cardiac pump myocardium crimson
              roughness: 0.32,
              metalness: 0.06,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('cartilage') || nodeName.includes('cartilage')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xe2e8f0, // Pearly costal cartilage
              roughness: 0.35,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else {
            child.material.side = THREE.DoubleSide;
            child.material.roughness = 0.32;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'nervous_system') {
      // Full Human Nervous System: 582 meshes (Brain, Spinal Cord, Cranial & Peripheral Nerves, CSF)
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const matName = (child.material.name || '').toLowerCase();
          const nodeName = (child.name || '').toLowerCase();

          if (matName.includes('nerve') || nodeName.includes('nerve') || nodeName.includes('plexus') || nodeName.includes('ganglion') || nodeName.includes('tract') || nodeName.includes('rami') || nodeName.includes('funiculus') || nodeName.includes('fasciculus')) {
            // Radiant golden peripheral & central nerve fibers
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfacc15,
              emissive: 0xca8a04,
              emissiveIntensity: 0.28,
              roughness: 0.26,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('brain') || nodeName.includes('brain') || nodeName.includes('cortex') || nodeName.includes('cerebell') || nodeName.includes('thalamus') || nodeName.includes('forebrain') || nodeName.includes('amygdal')) {
            // Cerebral cortex & cerebellum soft neural peach-ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfecdd3,
              roughness: 0.36,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('csf') || nodeName.includes('csf') || nodeName.includes('ventricle')) {
            // Cerebrospinal fluid translucent glowing aqua
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              transparent: true,
              opacity: 0.45,
              depthWrite: false,
              roughness: 0.15,
              metalness: 0.0,
              side: THREE.DoubleSide
            });
            child.userData.isGlass = true;
            child.userData.defaultOpacity = 0.45;
            child.userData.defaultDepthWrite = false;
          } else if (matName.includes('eye') || nodeName.includes('eye') || nodeName.includes('eyeball')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf8fafc,
              roughness: 0.2,
              metalness: 0.02,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('artery') || nodeName.includes('artery')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626,
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName.includes('muscle') || nodeName.includes('muscle')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x881337,
              roughness: 0.4,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else {
            // Bones, ligaments, cartilage reference frame
            child.material = new THREE.MeshStandardMaterial({
              color: 0xe2e8f0,
              roughness: 0.42,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'urinary_system') {
      // Complete Urinary System: Bilateral Kidneys, Adrenals, Aorta & IVC, Renal/Iliac vessels, Ureters, Bladder
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const nodeName = (child.name || '').toLowerCase();
          const parentName = (child.parent?.name || '').toLowerCase();
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;

          if (nodeName.includes('skeleton') || parentName.includes('skeleton')) {
            // Skeletal cage reference frame: semi-translucent anatomical bone ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1f5f9,
              roughness: 0.45,
              metalness: 0.05,
              transparent: true,
              opacity: 0.42,
              depthWrite: true,
              side: THREE.DoubleSide
            });
            child.userData.isGlass = true;
            child.userData.defaultOpacity = 0.42;
            child.userData.defaultDepthWrite = true;
          } else if (nodeName.includes('suprarenal')) {
            // Adrenal glands (Glandulae suprarenales)
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf59e0b,
              roughness: 0.38,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('ureter') && !nodeName.includes('orifice') && !nodeName.includes('bladder')) {
            // Bilateral Ureters
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xf43f5e,
              roughness: 0.24,
              metalness: 0.04,
              clearcoat: 0.85,
              clearcoatRoughness: 0.1,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('pelvis')) {
            // Renal Pelvis
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfde047,
              roughness: 0.32,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('pyramid') || nodeName.includes('medulla')) {
            // Renal Medullary Pyramids
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b,
              roughness: 0.38,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('column')) {
            // Renal Columns of Bertin
            child.material = new THREE.MeshStandardMaterial({
              color: 0xa21caf,
              roughness: 0.36,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('papilla')) {
            // Renal Papillae
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfef08a,
              roughness: 0.30,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('cortex') || (nodeName.includes('kidney') && !nodeName.includes('capsule'))) {
            // Renal Cortex
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x881337,
              roughness: 0.35,
              metalness: 0.04,
              clearcoat: 0.35,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('capsule')) {
            // Fibrous Capsule
            child.material = new THREE.MeshStandardMaterial({
              color: 0x94a3b8,
              roughness: 0.25,
              transparent: true,
              opacity: 0.40,
              side: THREE.DoubleSide
            });
            child.userData.isGlass = true;
            child.userData.defaultOpacity = 0.40;
          } else if (nodeName.includes('trigone')) {
            // Trigone plate
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfed7aa,
              roughness: 0.25,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('orifice')) {
            // Ureteral orifices
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfef08a,
              emissive: 0xd97706,
              emissiveIntensity: 0.35,
              roughness: 0.20,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('bladder') || nodeName.includes('fundus') || nodeName.includes('neck')) {
            // Bladder Detrusor
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xe11d48,
              roughness: 0.28,
              metalness: 0.04,
              clearcoat: 0.75,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('artery') || nodeName.includes('aorta')) {
            // Arteries: Aorta, Renal & Iliac Arteries
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626,
              roughness: 0.26,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('vein') || nodeName.includes('cava')) {
            // Veins: IVC, Renal & Iliac Veins
            child.material = new THREE.MeshStandardMaterial({
              color: 0x2563eb,
              roughness: 0.26,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (child.material.map) {
            child.material.roughness = 0.32;
            child.material.metalness = 0.05;
            child.material.side = THREE.DoubleSide;
            if (child.material.color) {
              child.material.color.setHex(0xffffff);
            }
            child.material.needsUpdate = true;
          } else {
            child.material.roughness = 0.35;
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    } else if (key === 'endocrine_system') {
      // Endocrine System: Pituitary, Thyroid, Parathyroid, Adrenals, Pancreas, Gonads
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          const nodeName = (child.name || '').toLowerCase();
          const parentName = (child.parent?.name || '').toLowerCase();

          if (nodeName.includes('skin') || parentName.includes('skin') || child.name === 'Object_12') {
            // Elegant holographic human body silhouette so all internal endocrine glands are clearly visible
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              transparent: true,
              opacity: 0.12,
              roughness: 0.25,
              metalness: 0.05,
              depthWrite: false,
              side: THREE.DoubleSide
            });
            child.userData.isGlass = true;
            child.userData.defaultOpacity = 0.12;
            child.userData.defaultDepthWrite = false;
          } else if (nodeName.includes('skeleton') || parentName.includes('skeleton') || child.name === 'Object_9') {
            // Skeletal reference frame: translucent bone ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1f5f9,
              roughness: 0.45,
              metalness: 0.05,
              transparent: true,
              opacity: 0.38,
              depthWrite: true,
              side: THREE.DoubleSide
            });
            child.userData.isGlass = true;
            child.userData.defaultOpacity = 0.38;
            child.userData.defaultDepthWrite = true;
          } else if (child.material.map) {
            // Endocrine glands (Pituitary, Thyroid, Thymus, Adrenals, Pancreas, Ovaries/Testes)
            child.material.roughness = 0.28;
            child.material.metalness = 0.04;
            child.material.side = THREE.DoubleSide;
            if (child.material.color) {
              child.material.color.setHex(0xffffff);
            }
            child.material.needsUpdate = true;
          } else {
            child.material.roughness = 0.32;
            child.material.side = THREE.DoubleSide;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    } else if (key === 'gallbladder') {
      // Photorealistic Gallbladder & Biliary System: Fundus, Corpus, Collum, Cystic duct, Portal triad vessels
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const nodeName = (child.name || '').toLowerCase();

          if (nodeName.includes('gallbladder')) {
            // Gallbladder: High-gloss emerald-olive bile luster with clearcoat sheen
            if (child.material.map) {
              child.material.roughness = 0.16;
              child.material.metalness = 0.04;
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0x166534,
                emissive: 0x052e16,
                emissiveIntensity: 0.15,
                roughness: 0.18,
                metalness: 0.04,
                clearcoat: 0.92,
                clearcoatRoughness: 0.08,
                side: THREE.DoubleSide
              });
            }
          } else if (nodeName.includes('artery')) {
            // Hepatic / Cystic Arteries: Oxygenated arterial crimson
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626,
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('portal') || nodeName.includes('vein')) {
            // Portal Vein / Venous branches: Rich sapphire blue
            child.material = new THREE.MeshStandardMaterial({
              color: 0x2563eb,
              roughness: 0.28,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('inferior_vena_cava')) {
            // IVC: Deep venous navy
            child.material = new THREE.MeshStandardMaterial({
              color: 0x1d4ed8,
              roughness: 0.3,
              metalness: 0.06,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('liver')) {
            // Visceral Liver bed: Translucent anatomical context so the gallbladder & biliary vessels shine forward
            if (child.material.map) {
              child.material.transparent = true;
              child.material.opacity = 0.36;
              child.material.depthWrite = true;
              child.material.roughness = 0.42;
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0x7f1d1d,
                transparent: true,
                opacity: 0.36,
                depthWrite: true,
                roughness: 0.42,
                side: THREE.DoubleSide
              });
            }
          } else {
            child.material.roughness = 0.28;
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    } else if (key === 'esophagus_pharynx' || key === 'esophagus') {
      // Pharynx & Esophagus: Pharyngeal constrictor muscles, Esophageal muscularis, Stomach cardia & Hyoid bone
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const nodeName = (child.name || '').toLowerCase();

          if (nodeName.includes('esophagus') || nodeName.includes('oesophagus')) {
            // Esophagus muscular tube: glistening muscular pinkish-crimson with smooth peristaltic mucosa
            child.material = new THREE.MeshStandardMaterial({
              color: 0xb91c1c, // Rich esophageal muscularis crimson
              roughness: 0.28,
              metalness: 0.06,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('pharyngeal') || nodeName.includes('palato') || nodeName.includes('stylo')) {
            // Pharyngeal constrictor muscles: striated deep red muscle fibers
            child.material = new THREE.MeshStandardMaterial({
              color: 0x881337, // Striated muscular ruby
              roughness: 0.36,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('stomach') || nodeName.includes('cardia')) {
            // Stomach cardia & fundus: gastroesophageal junction
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf472b6, // Mucosal gastric pink
              roughness: 0.34,
              metalness: 0.02,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('hyoid')) {
            // Hyoid bone anatomical landmark: pearly bone ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf6efe2,
              roughness: 0.38,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else {
            child.material.roughness = 0.34;
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    } else if (key === 'salivary_glands') {
      // Salivary Glands: Parotid + Stensen's duct, Submandibular + Wharton's duct, Sublingual, Mandible & Mylohyoid
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const nodeName = (child.name || '').toLowerCase();

          if (nodeName.includes('parotid_gland') || nodeName.includes('accessory_parotid')) {
            // Parotid gland: Lobulated glandular amber-gold
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf59e0b,
              roughness: 0.36,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('parotid_duct')) {
            // Stensen's duct: Translucent glistening salivary duct aqua-pearl
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              emissive: 0x0284c7,
              emissiveIntensity: 0.28,
              roughness: 0.18,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('submandibular_gland')) {
            // Submandibular gland: Warm glandular salmon-orange
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf97316,
              roughness: 0.36,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('submandibular_duct')) {
            // Wharton's duct: Translucent salivary duct cyan
            child.material = new THREE.MeshStandardMaterial({
              color: 0x22d3ee,
              emissive: 0x0891b2,
              emissiveIntensity: 0.28,
              roughness: 0.18,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('sublingual_gland')) {
            // Sublingual gland: Soft glandular coral-pink
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf43f5e,
              roughness: 0.35,
              metalness: 0.04,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('mandible')) {
            // Lower jaw mandible reference frame: semi-translucent surgical bone ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1f5f9,
              transparent: true,
              opacity: 0.38,
              roughness: 0.44,
              metalness: 0.05,
              depthWrite: true,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('hyoid')) {
            // Hyoid bone
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf1f5f9,
              transparent: true,
              opacity: 0.45,
              roughness: 0.42,
              side: THREE.DoubleSide
            });
          } else if (nodeName.includes('mylohyoid')) {
            // Mylohyoid muscle (oral floor diaphragm)
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b,
              transparent: true,
              opacity: 0.42,
              roughness: 0.38,
              side: THREE.DoubleSide
            });
          } else {
            child.material.roughness = 0.35;
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    } else if (key === 'small_intestine') {
      // Small Intestine: Highlight Jejunum and Ileum with vibrant PBR, subtle colon frame
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const name = (child.name || '').toLowerCase();
          const parentName = (child.parent?.name || '').toLowerCase();

          if (name.includes('tunntarm') || parentName.includes('tunntarm') || name.includes('small')) {
            // Small intestine: high detail mucosal folds with healthy enteric luster
            if (child.material.map) {
              child.material.roughness = 0.28;
              child.material.metalness = 0.04;
              child.material.transparent = false;
              child.material.opacity = 1.0;
              if (child.material.color) child.material.color.setHex(0xffffff);
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xf472b6,
                roughness: 0.28,
                metalness: 0.04,
                clearcoat: 0.7,
                side: THREE.DoubleSide
              });
            }
          } else if (name.includes('tjocktarm') || parentName.includes('tjocktarm') || name.includes('large')) {
            // Large intestine frame: semi-translucent anatomical context
            if (child.material.map) {
              child.material.transparent = true;
              child.material.opacity = 0.25;
              child.material.depthWrite = true;
              child.material.roughness = 0.42;
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd97706,
                transparent: true,
                opacity: 0.25,
                depthWrite: true,
                roughness: 0.42,
                side: THREE.DoubleSide
              });
            }
          }
        }
      });
    } else if (key === 'large_intestine') {
      // Large Intestine: Highlight Colon framing, haustra, and appendix, subtle small intestine loops
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const name = (child.name || '').toLowerCase();
          const parentName = (child.parent?.name || '').toLowerCase();

          if (name.includes('tjocktarm') || parentName.includes('tjocktarm') || name.includes('large')) {
            // Large intestine: full vibrant PBR textures with glossy haustra and appendix
            if (child.material.map) {
              child.material.roughness = 0.32;
              child.material.metalness = 0.04;
              child.material.transparent = false;
              child.material.opacity = 1.0;
              if (child.material.color) child.material.color.setHex(0xffffff);
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xd97706,
                roughness: 0.32,
                metalness: 0.04,
                clearcoat: 0.65,
                side: THREE.DoubleSide
              });
            }
          } else if (name.includes('tunntarm') || parentName.includes('tunntarm') || name.includes('small')) {
            // Inner small intestine loops: subtle semi-translucent inner mass
            if (child.material.map) {
              child.material.transparent = true;
              child.material.opacity = 0.22;
              child.material.depthWrite = true;
              child.material.roughness = 0.45;
              child.material.needsUpdate = true;
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf472b6,
                transparent: true,
                opacity: 0.22,
                depthWrite: true,
                roughness: 0.45,
                side: THREE.DoubleSide
              });
            }
          }
        }
      });
    } else if (key === 'ear') {
      // Complete Ear: Pinna, Ear Canal, Tympanic membrane, Malleus/Incus/Stapes ossicles, Cochlea & Semicircular canals
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const name = (child.name || '').toLowerCase();

          if (name.includes('cochlea')) {
            // Cochlea snail spiral: crystalline acoustic sky-blue
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x38bdf8,
              emissive: 0x0284c7,
              emissiveIntensity: 0.25,
              roughness: 0.16,
              metalness: 0.08,
              clearcoat: 0.95,
              side: THREE.DoubleSide
            });
          } else if (name.includes('vestibule') || name.includes('canal')) {
            if (name.includes('external')) {
              // External acoustic meatus: ear canal skin tissue
              child.material = new THREE.MeshStandardMaterial({
                color: 0xf5d0c5,
                roughness: 0.35,
                side: THREE.DoubleSide
              });
            } else {
              // Vestibule and semicircular canals: crystalline balance aqua
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0x0ea5e9,
                emissive: 0x0369a1,
                emissiveIntensity: 0.22,
                roughness: 0.16,
                metalness: 0.08,
                clearcoat: 0.95,
                side: THREE.DoubleSide
              });
            }
          } else if (name.includes('tympanic')) {
            // Tympanic membrane: translucent pearly eardrum
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0xe2e8f0,
              transparent: true,
              opacity: 0.65,
              roughness: 0.15,
              metalness: 0.04,
              clearcoat: 0.9,
              side: THREE.DoubleSide
            });
          } else if (name.includes('malleus') || name.includes('incus') || name.includes('stapes') || name.includes('ossicle')) {
            // Auditory ossicles: polished acoustic bone ivory
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf8fafc,
              roughness: 0.22,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (name.includes('nerve')) {
            // Vestibulocochlear & auditory nerves: radiant golden fibers
            child.material = new THREE.MeshStandardMaterial({
              color: 0xfacc15,
              emissive: 0xca8a04,
              emissiveIntensity: 0.35,
              roughness: 0.22,
              metalness: 0.05,
              side: THREE.DoubleSide
            });
          } else if (name.includes('pinna') || name.includes('auricle') || name.includes('helix') || name.includes('tragus')) {
            // External ear pinna: natural cartilage and flesh
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf5d0c5,
              roughness: 0.38,
              metalness: 0.02,
              side: THREE.DoubleSide
            });
          } else {
            child.material.roughness = 0.32;
            child.material.side = THREE.DoubleSide;
          }
        }
      });
    } else if (key === 'skin_layers' || key === 'skin') {
      // Human Skin Block Anatomy: Epidermis, Dermis, Hypodermis, Hair follicle, Glands & Capillary network
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;

          if (child.material.map) {
            // High-resolution baked anatomical textures: preserve texture and optimize PBR
            child.material.roughness = 0.35;
            child.material.metalness = 0.04;
            if (child.material.color) child.material.color.setHex(0xffffff);
            child.material.needsUpdate = true;
          } else {
            const name = (child.name || '').toLowerCase();
            const matName = (child.material.name || '').toLowerCase();
            const all = name + ' ' + matName;

            if (all.includes('hair') || all.includes('follicle')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.22, metalness: 0.15, side: THREE.DoubleSide });
            } else if (all.includes('gland') || all.includes('sebaceous')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.38, side: THREE.DoubleSide });
            } else if (all.includes('nerve') || all.includes('receptor')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xca8a04, emissiveIntensity: 0.3, roughness: 0.25, side: THREE.DoubleSide });
            } else if (all.includes('artery') || all.includes('art')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25, side: THREE.DoubleSide });
            } else if (all.includes('vein')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25, side: THREE.DoubleSide });
            } else if (all.includes('fat') || all.includes('hypoderm') || all.includes('adipose')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5, side: THREE.DoubleSide });
            } else if (all.includes('dermis')) {
              child.material = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.36, side: THREE.DoubleSide });
            } else {
              child.material = new THREE.MeshStandardMaterial({ color: 0xf5d0c5, roughness: 0.38, side: THREE.DoubleSide });
            }
          }
        }
      });
    } else if (key === 'oral_cavity') {
      // Photorealistic oral mucosa, teeth enamel and wet saliva glossiness
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
          const matName = (child.material.name || '').toLowerCase();
          if (matName.includes('teeth')) {
            child.material.roughness = 0.16;
            child.material.metalness = 0.02;
          } else if (matName.includes('wet') || child.name.toLowerCase().includes('wet') || matName.includes('material')) {
            child.material.roughness = 0.06;
            child.material.metalness = 0.0;
            child.material.transparent = true;
            child.material.opacity = 0.82;
          } else {
            child.material.roughness = 0.36;
          }
          child.material.needsUpdate = true;
        }
      });
    } else if (key === 'larynx_vocal_cords' || key === 'larynx') {
      // Larynx & Vocal Cords: CT-based accurate cartilages, muscles, vocal folds and membranes
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;

          if (child.material.map) {
            // High-resolution CT-data baked textures: optimize medical PBR
            child.material.roughness = 0.32;
            child.material.metalness = 0.04;
            if (child.material.color) {
              child.material.color.setHex(0xffffff);
            }
            child.material.needsUpdate = true;
          } else {
            const nodeName = (child.name || '').toLowerCase();
            const parentName = (child.parent?.name || '').toLowerCase();
            if (nodeName.includes('corniculate') || parentName.includes('corniculate')) {
              child.material = new THREE.MeshStandardMaterial({
                color: 0xfef08a, // Corniculate elastic cartilage yellowish tone
                roughness: 0.28,
                metalness: 0.04,
                side: THREE.DoubleSide
              });
            } else {
              child.material.roughness = 0.32;
              child.material.metalness = 0.04;
              child.material.side = THREE.DoubleSide;
            }
          }
        }
      });
    } else {
      // For all models with textures (lung, liver, stomach): PRESERVE TEXTURES & optimize PBR!
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material.map) {
            // High-res texture present: keep it, fix lighting & side!
            child.material.roughness = 0.38;
            child.material.metalness = 0.05;
            child.material.side = THREE.DoubleSide;
            if (child.material.color) {
              child.material.color.setHex(0xffffff); // Neutral base so texture colors show purely
            }
            child.material.needsUpdate = true;
          } else {
            // Procedural bone or tissue fallback
            if (key === 'spine') {
              const nodeName = (child.name || '').toLowerCase();
              if (nodeName.includes('disc') || nodeName.includes('cartilage')) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x93c5fd,
                  roughness: 0.28,
                  metalness: 0.05,
                  transparent: true,
                  opacity: 0.88,
                  side: THREE.DoubleSide
                });
              } else {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xf6efe2,
                  roughness: 0.42,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              }
            } else if (key === 'kidney' || key === 'kidney_nephron') {
              const meshName = (child.name || '');
              if (meshName === 'Object_12') {
                // 1. Renal Cortex & Outer Parenchyma (Cortex renalis) - 65,532 verts
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0x881337,
                  roughness: 0.35,
                  metalness: 0.04,
                  clearcoat: 0.35,
                  clearcoatRoughness: 0.15,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_13') {
                // 2. Renal Medullary Pyramids (Pyramides renales) - 35,285 verts
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0x991b1b,
                  roughness: 0.40,
                  metalness: 0.04,
                  clearcoat: 0.25,
                  clearcoatRoughness: 0.2,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_11') {
                // 3. Renal Columns of Bertin & Calyx Junctions - 5,623 verts
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xa21caf,
                  roughness: 0.36,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_10') {
                // 4. Renal Pelvis (Pelvis renalis) - 4,346 verts
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xfde68a,
                  roughness: 0.30,
                  metalness: 0.04,
                  clearcoat: 0.45,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_4') {
                // 5. Proximal Ureter tube (Ureter) - 1,280 verts
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xf472b6,
                  roughness: 0.35,
                  metalness: 0.04,
                  clearcoat: 0.6,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_2' || meshName === 'Object_3') {
                // 6. Calyces renales minores et majores (Minor and Major Calyces)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef08a,
                  roughness: 0.32,
                  metalness: 0.04,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_5' || meshName === 'Object_7') {
                // 7. Renal Artery branches (Scarlet Red)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xdc2626,
                  roughness: 0.25,
                  metalness: 0.08,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_6' || meshName === 'Object_8') {
                // 8. Renal Vein branches (Royal Blue)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x1d4ed8,
                  roughness: 0.25,
                  metalness: 0.08,
                  side: THREE.DoubleSide
                });
              } else if (meshName === 'Object_9') {
                // 9. Fibrous Renal Capsule (Capsula fibrosa)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xe2e8f0,
                  roughness: 0.22,
                  metalness: 0.05,
                  transparent: true,
                  opacity: 0.62,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.62;
              } else {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef3c7,
                  roughness: 0.35,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              }
            } else if (key === 'ureters') {
              const nodeName = (child.name || '').toLowerCase();
              if (nodeName.includes('ureter') && !nodeName.includes('orifice') && !nodeName.includes('bladder')) {
                // Highlighted Star: Bilateral Ureters (25-30 cm muscular conduit with peristaltic luster)
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xf43f5e,
                  emissive: 0x881337,
                  emissiveIntensity: 0.2,
                  roughness: 0.22,
                  metalness: 0.04,
                  clearcoat: 0.88,
                  clearcoatRoughness: 0.1,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('pelvis')) {
                // Renal Pelvis (PUJ pyeloureteric junction)
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xfde047,
                  roughness: 0.30,
                  metalness: 0.04,
                  clearcoat: 0.5,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('orifice')) {
                // Ureteral Orifices (UVJ vesicoureteral junction in bladder)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef08a,
                  emissive: 0xf59e0b,
                  emissiveIntensity: 0.4,
                  roughness: 0.2,
                  metalness: 0.1,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('kidney') || nodeName.includes('cortex')) {
                // Translucent Kidney Parenchyma context
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x991b1b,
                  roughness: 0.45,
                  metalness: 0.05,
                  transparent: true,
                  opacity: 0.35,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.35;
              } else if (nodeName.includes('capsule')) {
                // Translucent Renal Capsule
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x94a3b8,
                  roughness: 0.3,
                  transparent: true,
                  opacity: 0.22,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.22;
              } else if (nodeName.includes('bladder')) {
                // Translucent Bladder context
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xe11d48,
                  roughness: 0.35,
                  transparent: true,
                  opacity: 0.32,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.32;
              } else if (nodeName.includes('trigone')) {
                // Trigone plate
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfed7aa,
                  roughness: 0.3,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('artery')) {
                // Common / Internal / External Iliac & Renal Arteries
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xdc2626,
                  roughness: 0.28,
                  metalness: 0.08,
                  transparent: true,
                  opacity: 0.75,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.75;
              } else if (nodeName.includes('vein')) {
                // Common / External Iliac & Renal Veins
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x2563eb,
                  roughness: 0.28,
                  metalness: 0.08,
                  transparent: true,
                  opacity: 0.75,
                  side: THREE.DoubleSide
                });
                child.userData.isGlass = true;
                child.userData.defaultOpacity = 0.75;
              } else {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xf472b6,
                  roughness: 0.35,
                  side: THREE.DoubleSide
                });
              }
            } else if (key === 'bladder_urethra' || key === 'bladder') {
              const nodeName = (child.name || '').toLowerCase();
              if (nodeName.includes('trigone')) {
                // Lieutaud's Trigone (Trigonum vesicae) - Smooth triangular mucosal floor
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xfed7aa,
                  roughness: 0.22,
                  metalness: 0.04,
                  clearcoat: 0.85,
                  clearcoatRoughness: 0.12,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('orifice')) {
                // Bilateral Ureteral Orifices
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef08a,
                  emissive: 0xd97706,
                  emissiveIntensity: 0.35,
                  roughness: 0.20,
                  metalness: 0.08,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('neck') || nodeName.includes('smooth_muscle')) {
                // Internal Urethral Sphincter (M. sphincter urethrae internus)
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0x9f1239,
                  roughness: 0.30,
                  metalness: 0.05,
                  clearcoat: 0.65,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('urethra') && !nodeName.includes('external_urethral_sphincter')) {
                // Urethral canal
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xfb7185,
                  roughness: 0.28,
                  metalness: 0.04,
                  clearcoat: 0.75,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('external_urethral_sphincter')) {
                // External voluntary striated sphincter
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xb91c1c,
                  roughness: 0.35,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('ureter')) {
                // Terminal ureter segments entering bladder
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xf472b6,
                  roughness: 0.30,
                  metalness: 0.04,
                  clearcoat: 0.75,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('dome')) {
                // Bladder Dome / Body (Detrusor muscle)
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xbe123c,
                  roughness: 0.32,
                  metalness: 0.04,
                  clearcoat: 0.72,
                  clearcoatRoughness: 0.15,
                  side: THREE.DoubleSide
                });
              } else if (nodeName.includes('base') || nodeName.includes('fundus')) {
                // Bladder Fundus & Base (Thick detrusor muscle)
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0xe11d48,
                  roughness: 0.28,
                  metalness: 0.04,
                  clearcoat: 0.78,
                  clearcoatRoughness: 0.12,
                  side: THREE.DoubleSide
                });
              } else {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xe11d48,
                  roughness: 0.32,
                  metalness: 0.04,
                  side: THREE.DoubleSide
                });
              }
            } else {
              child.material.roughness = 0.35;
              child.material.side = THREE.DoubleSide;
            }
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

    this.isPulsing = (key === 'heart' || key === 'circulatory_system' || key === 'lung' || key === 'respiratory_system' || key === 'larynx_vocal_cords' || key === 'larynx');
    this.applyXRayState();
    this.applyWireframeState();
    this.resetCamera();
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
        const isGlass = child.userData?.isGlass || (child.material.name || '').toLowerCase().includes('glass') || child.name.toLowerCase().includes('glass');
        if (this.isXRay) {
          child.material.transparent = true;
          child.material.opacity = 0.45;
          child.material.depthWrite = false;
        } else {
          child.material.transparent = isGlass ? true : false;
          child.material.opacity = isGlass ? (child.userData?.defaultOpacity ?? 0.14) : 1.0;
          child.material.depthWrite = isGlass ? (child.userData?.defaultDepthWrite ?? false) : true;
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
      if (this.currentModelKey === 'heart') {
        // Anatomical dual-phase heartbeat (Lub-Dub rhythm at ~72 bpm)
        const cycle = (elapsedTime * 1.2) % 1.0;
        let heartPulse = 1.0;
        if (cycle < 0.14) {
          heartPulse = 1.0 + Math.sin((cycle / 0.14) * Math.PI) * 0.05;
        } else if (cycle > 0.18 && cycle < 0.44) {
          const vProg = (cycle - 0.18) / 0.26;
          heartPulse = 1.0 + Math.sin(vProg * Math.PI) * 0.08;
        }
        this.currentModelGroup.scale.set(heartPulse, heartPulse, heartPulse);
      } else if (this.currentModelKey === 'circulatory_system') {
        // Gentle systemic vascular pressure pulse
        const vascularPulse = 1.0 + Math.sin(elapsedTime * 4.2) * 0.012;
        this.currentModelGroup.scale.set(vascularPulse, vascularPulse, vascularPulse);
      } else if (this.currentModelKey === 'lung' || this.currentModelKey === 'respiratory_system') {
        // Natural thoracic respiration
        const breath = 1.0 + Math.sin(elapsedTime * 1.8) * 0.045;
        this.currentModelGroup.scale.set(breath, breath, breath);
      } else if (this.currentModelKey === 'larynx_vocal_cords' || this.currentModelKey === 'larynx') {
        // Phonetic resonance & subtle vocal cord / larynx respiration oscillation
        const phonPulse = 1.0 + Math.sin(elapsedTime * 2.2) * 0.012;
        this.currentModelGroup.scale.set(phonPulse, phonPulse, phonPulse);
      } else if (this.currentModelKey === 'eye') {
        // Natural micro-saccades and subtle physiological gaze
        const saccadeX = Math.sin(elapsedTime * 0.8) * 0.035;
        const saccadeY = Math.cos(elapsedTime * 0.6) * 0.02;
        if (this.currentModelGroup.children[0]) {
          this.currentModelGroup.children[0].rotation.y = saccadeX;
          this.currentModelGroup.children[0].rotation.x = saccadeY;
        }
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
