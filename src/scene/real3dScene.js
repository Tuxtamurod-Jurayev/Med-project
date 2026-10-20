import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { PROCEDURAL_MODEL_BUILDERS, BoneMaterial, CartilageMaterial, NerveMaterial } from './anatomyModels.js';

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
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // Ambient light - balanced illumination so no angle is pitch black
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(this.ambientLight);

    // Hemisphere light - subtle sky/ground natural tone
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.25);
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

    // SPECIAL: Photorealistic Unified Nervous System (Real Brain GLB + Articulated Spine GLB + Medulla Spinalis + PNS)
    if (key === 'nervous_system') {
      try {
        const pivotGroup = await this.loadRealisticNervousSystem();
        this.loadedModelsCache[key] = pivotGroup;
        this.displayModel(pivotGroup, key);
        this.onProgress(false, 'Tayyor');
        return;
      } catch (err) {
        console.warn('Realistic nervous system load failed, falling back to procedural:', err);
      }
    }

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

    // Apply specialized Medical PBR Colorizing & Texture Preservations
    this.colorizeModelTissues(modelRoot, key);

    // Normalize Bounding Box and Center at (0, 0, 0)
    modelRoot.updateMatrixWorld(true);
    const bbox = new THREE.Box3().setFromObject(modelRoot);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
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
   * Constructs a photorealistic, unified Nervous System 3D model
   * combining high-res brain.glb, spine.glb, continuous spinal cord (Medulla spinalis),
   * cauda equina, cervical/brachial/lumbosacral plexuses, and sciatic nerves.
   */
  async loadRealisticNervousSystem() {
    this.onProgress(true, "Haqiqiy bosh miya 3D modeli yuklanmoqda...");

    const compositeGroup = new THREE.Group();
    compositeGroup.name = "unified_photorealistic_nervous_system";

    // Reusable tube builder
    const makeTube = (points, radius = 0.025, segments = 16, radSegs = 8, mat = NerveMaterial) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, segments, radius, radSegs, false);
      const mesh = new THREE.Mesh(geo, mat.clone());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // 1. LOAD REAL HUMAN BRAIN (brain.glb - 250 high-res meshes of gyri, sulci, lobes, cerebellum, brainstem)
    try {
      const brainGltf = await this.loadGLTFAsync('/models/brain.glb', (p) => {
        this.onProgress(true, `Bosh miya yuklanmoqda (${Math.round(p * 50)}%)...`);
      });
      const brainModel = brainGltf.scene;
      this.colorizeModelTissues(brainModel, 'brain');

      brainModel.updateMatrixWorld(true);
      const bBbox = new THREE.Box3().setFromObject(brainModel);
      const bSize = bBbox.getSize(new THREE.Vector3());
      const bCenter = bBbox.getCenter(new THREE.Vector3());
      const bMaxDim = Math.max(bSize.x, bSize.y, bSize.z) || 1.0;

      // Scale brain to anatomical proportions
      const bScale = 0.78 / bMaxDim;
      brainModel.scale.set(bScale, bScale, bScale);

      // Place brain so its brainstem (medulla) rests directly at Y = 0.68
      const bOffsetY = 0.68 - (bBbox.min.y * bScale);
      brainModel.position.set(
        -bCenter.x * bScale,
        bOffsetY,
        -bCenter.z * bScale - 0.02
      );
      compositeGroup.add(brainModel);
    } catch (brainErr) {
      console.warn("Real brain GLB load failed:", brainErr);
    }

    // 2. LOAD REAL ARTICULATED SPINE (spine.glb with vertebrae, sacrum & pelvis)
    let spineLoaded = false;
    try {
      this.onProgress(true, "Umurtqa pog'onasi 3D modeli yuklanmoqda...");
      const spineGltf = await this.loadGLTFAsync('/models/spine.glb', (p) => {
        this.onProgress(true, `Umurtqa pog'onasi yuklanmoqda (${50 + Math.round(p * 50)}%)...`);
      });
      const spineModel = spineGltf.scene;
      this.colorizeModelTissues(spineModel, 'spine');

      spineModel.updateMatrixWorld(true);
      const sBbox = new THREE.Box3().setFromObject(spineModel);
      const sSize = sBbox.getSize(new THREE.Vector3());
      const sCenter = sBbox.getCenter(new THREE.Vector3());

      const sTargetHeight = 1.32;
      const sScale = sTargetHeight / (sSize.y || 1.0);
      spineModel.scale.set(sScale, sScale, sScale);

      // Align top of thoracic spine right at Y = 0.45, extending down to sacrum/pelvis at Y = -0.85
      const sOffsetY = 0.45 - (sBbox.max.y * sScale);
      spineModel.position.set(
        -sCenter.x * sScale,
        sOffsetY,
        -sCenter.z * sScale - 0.04
      );
      compositeGroup.add(spineModel);
      spineLoaded = true;
    } catch (spineErr) {
      console.warn("Real spine GLB load failed, building articulated anatomical spine fallback:", spineErr);
    }

    // 3. ARTICULATED CERVICAL SPINE (C1-C7)
    // Connects base of skull/brainstem (Y = 0.68) smoothly to T1 (Y = 0.45)
    const cervicalGroup = new THREE.Group();
    cervicalGroup.name = "cervical_spine_C1_C7";
    const cCount = 7;
    const cStartY = 0.66;
    const cEndY = 0.46;
    const cStep = (cStartY - cEndY) / cCount;

    for (let i = 0; i < cCount; i++) {
      const cy = cStartY - i * cStep;
      const cVert = new THREE.Group();
      cVert.position.set(0, cy, -0.045 + Math.sin((i / cCount) * Math.PI) * 0.015);

      // Vertebral Body (Corpus vertebrae)
      const r = i === 0 ? 0.16 : (0.13 + i * 0.008); // C1 (Atlas) is wider to support skull condyles
      const h = cStep * 0.65;
      const bodyGeo = new THREE.CylinderGeometry(r, r * 1.05, h, 18);
      const bodyMesh = new THREE.Mesh(bodyGeo, BoneMaterial.clone());
      cVert.add(bodyMesh);

      // Spinous Process (Processus spinosus)
      const spGeo = new THREE.ConeGeometry(0.045, 0.16 + (i === 6 ? 0.08 : 0), 6);
      const spMesh = new THREE.Mesh(spGeo, BoneMaterial.clone());
      spMesh.rotation.x = -Math.PI / 2.3;
      spMesh.position.set(0, -0.01, -r - 0.05);
      cVert.add(spMesh);

      // Transverse Processes (Processus transversi) with foramina
      [-1, 1].forEach(side => {
        const tpGeo = new THREE.BoxGeometry(0.12, h * 0.6, 0.06);
        const tpMesh = new THREE.Mesh(tpGeo, BoneMaterial.clone());
        tpMesh.position.set(side * (r + 0.06), 0, 0);
        cVert.add(tpMesh);
      });

      // Intervertebral Disc (Discus intervertebralis)
      if (i > 0) {
        const discGeo = new THREE.CylinderGeometry(r * 1.02, r * 1.02, cStep * 0.32, 18);
        const discMesh = new THREE.Mesh(discGeo, CartilageMaterial.clone());
        discMesh.position.set(0, h * 0.55, 0);
        cVert.add(discMesh);
      }

      cervicalGroup.add(cVert);
    }
    compositeGroup.add(cervicalGroup);

    // If spine.glb wasn't loaded, create articulated Thoracic, Lumbar and Pelvic spine fallback
    if (!spineLoaded) {
      const backupSpineGroup = new THREE.Group();
      backupSpineGroup.name = "backup_thoracolumbar_spine";
      const spineLevels = [
        { count: 12, startY: 0.44, endY: -0.10, baseR: 0.18, name: 'Thoracic' },
        { count: 5,  startY: -0.11, endY: -0.42, baseR: 0.24, name: 'Lumbar' }
      ];
      spineLevels.forEach(lvl => {
        const step = (lvl.startY - lvl.endY) / lvl.count;
        for (let j = 0; j < lvl.count; j++) {
          const y = lvl.startY - j * step;
          const v = new THREE.Group();
          const zCurve = lvl.name === 'Thoracic'
            ? -0.06 - Math.sin((j / 12) * Math.PI) * 0.04
            : -0.05 + Math.sin((j / 5) * Math.PI) * 0.03;
          v.position.set(0, y, zCurve);

          const r = lvl.baseR * (1 + j * 0.02);
          const h = step * 0.68;
          const bGeo = new THREE.CylinderGeometry(r, r * 1.05, h, 18);
          v.add(new THREE.Mesh(bGeo, BoneMaterial.clone()));

          const spGeo = new THREE.ConeGeometry(0.06, 0.22, 6);
          const spMesh = new THREE.Mesh(spGeo, BoneMaterial.clone());
          spMesh.rotation.x = -Math.PI / 2.3;
          spMesh.position.set(0, -0.02, -r - 0.07);
          v.add(spMesh);

          const dGeo = new THREE.CylinderGeometry(r * 1.02, r * 1.02, step * 0.3, 18);
          const dMesh = new THREE.Mesh(dGeo, CartilageMaterial.clone());
          dMesh.position.set(0, h * 0.55, 0);
          v.add(dMesh);

          backupSpineGroup.add(v);
        }
      });

      // Sacrum & Coccyx
      const sacGeo = new THREE.ConeGeometry(0.32, 0.38, 12);
      sacGeo.scale(1.0, 1.0, 0.45);
      const sacMesh = new THREE.Mesh(sacGeo, BoneMaterial.clone());
      sacMesh.rotation.x = Math.PI * 0.95;
      sacMesh.position.set(0, -0.60, -0.08);
      backupSpineGroup.add(sacMesh);

      // Pelvic Hip Bones (Ossa coxae)
      [-1, 1].forEach(side => {
        const iliumGeo = new THREE.TorusGeometry(0.28, 0.07, 8, 20, Math.PI * 1.1);
        const iliumMesh = new THREE.Mesh(iliumGeo, BoneMaterial.clone());
        iliumMesh.rotation.y = side * 0.35;
        iliumMesh.rotation.z = side * 0.4;
        iliumMesh.position.set(side * 0.36, -0.52, -0.05);
        backupSpineGroup.add(iliumMesh);
      });

      compositeGroup.add(backupSpineGroup);
    }

    // 4. CONTINUOUS SPINAL CORD (Medulla spinalis)
    // From brainstem (Medulla oblongata) to Conus medullaris at L1-L2
    const cordMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef9c3,
      roughness: 0.3,
      metalness: 0.08,
      emissive: 0xca8a04,
      emissiveIntensity: 0.18
    });

    const spinalCordPoints = [
      new THREE.Vector3(0, 0.69, -0.055),   // Brainstem junction
      new THREE.Vector3(0, 0.58, -0.040),   // Cervical enlargement (C5-C6)
      new THREE.Vector3(0, 0.45, -0.035),   // C7-T1
      new THREE.Vector3(0, 0.30, -0.055),   // T3 - thoracic kyphosis
      new THREE.Vector3(0, 0.12, -0.075),   // T7
      new THREE.Vector3(0, -0.06, -0.055),  // T11
      new THREE.Vector3(0, -0.18, -0.030),  // L1 - Lumbar enlargement
      new THREE.Vector3(0, -0.27, -0.015)   // Conus medullaris
    ];
    const spinalCordMesh = makeTube(spinalCordPoints, 0.038, 36, 12, cordMaterial);
    compositeGroup.add(spinalCordMesh);

    // 5. CAUDA EQUINA ("Ot dumi" - Horse's tail)
    // Bundles of spinal nerve roots descending from conus medullaris through lumbar & sacral canal
    const caudaGroup = new THREE.Group();
    caudaGroup.name = "cauda_equina";
    const caudaCount = 20;
    for (let c = 0; c < caudaCount; c++) {
      const angle = (c / caudaCount) * Math.PI * 2;
      const spreadR = 0.015 + ((c * 17) % 25) * 0.001;
      const endX = Math.cos(angle) * spreadR * 2.2;
      const endZ = -0.03 + Math.sin(angle) * spreadR * 1.5;
      const endY = -0.45 - (c / caudaCount) * 0.32;

      const filamentPts = [
        new THREE.Vector3(Math.cos(angle) * 0.012, -0.26, -0.015),
        new THREE.Vector3(endX * 0.6, -0.38, endZ * 0.8),
        new THREE.Vector3(endX, endY, endZ)
      ];
      caudaGroup.add(makeTube(filamentPts, 0.007, 10, 6, NerveMaterial));
    }
    // Filum terminale in the median line
    caudaGroup.add(makeTube([
      new THREE.Vector3(0, -0.26, -0.015),
      new THREE.Vector3(0, -0.55, -0.04),
      new THREE.Vector3(0, -0.74, -0.06)
    ], 0.006, 12, 6, cordMaterial));
    compositeGroup.add(caudaGroup);

    // 6. PERIPHERAL NERVOUS SYSTEM (Systema nervosum periphericum)
    const pnsGroup = new THREE.Group();
    pnsGroup.name = "peripheral_nerves_network";

    // A. CRANIAL NERVES (Nervi craniales)
    // Optic Nerves (CN II) exiting forward toward orbits
    [-1, 1].forEach(side => {
      const optPts = [
        new THREE.Vector3(side * 0.02, 0.74, 0.06),
        new THREE.Vector3(side * 0.09, 0.76, 0.18),
        new THREE.Vector3(side * 0.18, 0.78, 0.28)
      ];
      pnsGroup.add(makeTube(optPts, 0.018, 12, 8, NerveMaterial));
    });

    // Trigeminal Nerves (CN V) fanning to temples & face
    [-1, 1].forEach(side => {
      const trigPts = [
        new THREE.Vector3(side * 0.06, 0.71, 0.01),
        new THREE.Vector3(side * 0.16, 0.70, 0.12),
        new THREE.Vector3(side * 0.28, 0.68, 0.20)
      ];
      pnsGroup.add(makeTube(trigPts, 0.016, 12, 8, NerveMaterial));
    });

    // Vagus Nerves (CN X) descending along neck
    [-1, 1].forEach(side => {
      const vagPts = [
        new THREE.Vector3(side * 0.05, 0.67, -0.02),
        new THREE.Vector3(side * 0.09, 0.55, 0.01),
        new THREE.Vector3(side * 0.12, 0.42, 0.02),
        new THREE.Vector3(side * 0.14, 0.25, 0.00)
      ];
      pnsGroup.add(makeTube(vagPts, 0.014, 14, 8, NerveMaterial));
    });

    // B. BRACHIAL PLEXUS (Plexus brachialis C5-T1)
    // Major bilateral nerve networks radiating into the shoulders and arms
    [-1, 1].forEach(side => {
      const cLevels = [0.56, 0.52, 0.48, 0.44];
      cLevels.forEach((cy, idx) => {
        // Root exiting intervertebral foramen
        const rootPts = [
          new THREE.Vector3(side * 0.04, cy, -0.04),
          new THREE.Vector3(side * 0.14, cy - 0.02, -0.01),
          new THREE.Vector3(side * 0.26, 0.45 - idx * 0.02, 0.04)
        ];
        pnsGroup.add(makeTube(rootPts, 0.015, 10, 8, NerveMaterial));
      });

      // 1. Radial Nerve (Nervus radialis - posterior)
      const radPts = [
        new THREE.Vector3(side * 0.26, 0.42, 0.04),
        new THREE.Vector3(side * 0.42, 0.35, -0.02),
        new THREE.Vector3(side * 0.58, 0.24, -0.04),
        new THREE.Vector3(side * 0.74, 0.12, -0.02)
      ];
      pnsGroup.add(makeTube(radPts, 0.016, 14, 8, NerveMaterial));

      // 2. Median Nerve (Nervus medianus - anterior)
      const medPts = [
        new THREE.Vector3(side * 0.26, 0.42, 0.04),
        new THREE.Vector3(side * 0.40, 0.32, 0.06),
        new THREE.Vector3(side * 0.56, 0.22, 0.08),
        new THREE.Vector3(side * 0.72, 0.10, 0.09)
      ];
      pnsGroup.add(makeTube(medPts, 0.016, 14, 8, NerveMaterial));

      // 3. Ulnar Nerve (Nervus ulnaris - medial)
      const ulnPts = [
        new THREE.Vector3(side * 0.26, 0.40, 0.02),
        new THREE.Vector3(side * 0.38, 0.28, 0.02),
        new THREE.Vector3(side * 0.52, 0.16, 0.01),
        new THREE.Vector3(side * 0.68, 0.05, 0.02)
      ];
      pnsGroup.add(makeTube(ulnPts, 0.014, 14, 8, NerveMaterial));
    });

    // C. INTERCOSTAL NERVES (Nervi intercostales 12 pairs T1-T12)
    const tCount = 12;
    const tStartY = 0.42;
    const tEndY = -0.08;
    const tStep = (tStartY - tEndY) / tCount;

    for (let i = 0; i < tCount; i++) {
      const ty = tStartY - i * tStep;
      const tz = -0.055 - Math.sin((i / tCount) * Math.PI) * 0.035;
      const ribW = 0.24 + Math.sin((i / tCount) * Math.PI) * 0.28;

      [-1, 1].forEach(side => {
        const interPts = [
          new THREE.Vector3(side * 0.04, ty, tz),
          new THREE.Vector3(side * (ribW * 0.5), ty - 0.015, tz + 0.08),
          new THREE.Vector3(side * ribW, ty - 0.03, tz + 0.18),
          new THREE.Vector3(side * (ribW * 0.8), ty - 0.045, tz + 0.26)
        ];
        pnsGroup.add(makeTube(interPts, 0.009, 12, 6, NerveMaterial));

        // Sympathetic trunk ganglion at this level
        const gGeo = new THREE.SphereGeometry(0.014, 8, 8);
        const gMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.3,
          emissive: 0xd97706,
          emissiveIntensity: 0.4
        });
        const gMesh = new THREE.Mesh(gGeo, gMat);
        gMesh.position.set(side * 0.065, ty, tz + 0.02);
        pnsGroup.add(gMesh);
      });
    }

    // D. LUMBAR PLEXUS & FEMORAL NERVES (Plexus lumbalis & Nervus femoralis L1-L4)
    [-1, 1].forEach(side => {
      const femPts = [
        new THREE.Vector3(side * 0.05, -0.15, -0.02),
        new THREE.Vector3(side * 0.16, -0.28, 0.03),
        new THREE.Vector3(side * 0.28, -0.48, 0.12),
        new THREE.Vector3(side * 0.32, -0.72, 0.14),
        new THREE.Vector3(side * 0.34, -0.98, 0.11)
      ];
      pnsGroup.add(makeTube(femPts, 0.018, 16, 8, NerveMaterial));
    });

    // E. SCIATIC NERVE (Nervus ischiadicus L4-S3) - Thickest nerve in the human body!
    [-1, 1].forEach(side => {
      // Main sciatic nerve trunk
      const sciPts = [
        new THREE.Vector3(side * 0.04, -0.24, -0.02),
        new THREE.Vector3(side * 0.18, -0.38, -0.08),
        new THREE.Vector3(side * 0.28, -0.56, -0.14), // Exits greater sciatic notch behind pelvis
        new THREE.Vector3(side * 0.30, -0.82, -0.13), // Deep in gluteal & posterior thigh
        new THREE.Vector3(side * 0.31, -1.05, -0.11)  // Popliteal fossa
      ];
      pnsGroup.add(makeTube(sciPts, 0.026, 18, 10, NerveMaterial));

      // Bifurcation into Tibial Nerve (Nervus tibialis)
      const tibPts = [
        new THREE.Vector3(side * 0.31, -1.05, -0.11),
        new THREE.Vector3(side * 0.30, -1.22, -0.09),
        new THREE.Vector3(side * 0.29, -1.40, -0.07)
      ];
      pnsGroup.add(makeTube(tibPts, 0.016, 12, 8, NerveMaterial));

      // Bifurcation into Common Fibular / Peroneal Nerve (Nervus fibularis communis)
      const fibPts = [
        new THREE.Vector3(side * 0.31, -1.05, -0.11),
        new THREE.Vector3(side * 0.38, -1.22, -0.06),
        new THREE.Vector3(side * 0.42, -1.40, -0.03)
      ];
      pnsGroup.add(makeTube(fibPts, 0.014, 12, 8, NerveMaterial));
    });

    // Sympathetic Trunks (Truncus sympathicus) - longitudinal cords connecting ganglia
    [-1, 1].forEach(side => {
      const symPts = [
        new THREE.Vector3(side * 0.065, 0.58, -0.02),
        new THREE.Vector3(side * 0.065, 0.35, -0.04),
        new THREE.Vector3(side * 0.065, 0.05, -0.06),
        new THREE.Vector3(side * 0.065, -0.22, -0.03),
        new THREE.Vector3(side * 0.05,  -0.55, -0.05)
      ];
      pnsGroup.add(makeTube(symPts, 0.007, 16, 6, NerveMaterial));
    });

    compositeGroup.add(pnsGroup);

    // 7. NORMALIZE & CENTER UNIFIED NERVOUS SYSTEM
    compositeGroup.updateMatrixWorld(true);
    const fullBbox = new THREE.Box3().setFromObject(compositeGroup);
    const fullSize = fullBbox.getSize(new THREE.Vector3());
    const fullCenter = fullBbox.getCenter(new THREE.Vector3());

    const maxDim = Math.max(fullSize.x, fullSize.y, fullSize.z) || 1.0;
    const targetScale = 2.45;
    const scale = targetScale / maxDim;
    compositeGroup.scale.set(scale, scale, scale);

    compositeGroup.position.set(
      -fullCenter.x * scale,
      -fullCenter.y * scale,
      -fullCenter.z * scale
    );

    const pivotGroup = new THREE.Group();
    pivotGroup.name = "nervous_system_pivot";
    pivotGroup.add(compositeGroup);

    return pivotGroup;
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
    } else if (key === 'skull') {
      // Natural warm ivory bone osteo-material
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xf5eedb,
            roughness: 0.45,
            metalness: 0.05,
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
          const matName = child.material.name || '';
          const nodeName = child.name.toLowerCase();

          if (matName === 'Artery' || nodeName.includes('aorta') || nodeName.includes('artery')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xdc2626, // Arterial red
              roughness: 0.28,
              metalness: 0.1,
              side: THREE.DoubleSide
            });
          } else if (matName === 'Pulmonary artery' || nodeName.includes('pulmonary')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x0284c7, // Cyan-blue
              roughness: 0.3,
              metalness: 0.1,
              side: THREE.DoubleSide
            });
          } else if (matName === 'Trapezius.001' || nodeName.includes('ventricle') || nodeName.includes('atrium')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x991b1b, // Rich Myocardium crimson
              roughness: 0.35,
              metalness: 0.08,
              side: THREE.DoubleSide
            });
          } else if (matName === 'Ligament.002' || matName === 'Cartilage.002' || nodeName.includes('valve') || nodeName.includes('leaflet')) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xf8fafc, // Pearl white valve leaflets
              roughness: 0.25,
              metalness: 0.05,
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
            } else if (key === 'kidney') {
              const meshName = (child.name || '');
              if (meshName.includes('10')) {
                // Renal Cortex & Fibrous Capsule
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x881337,
                  roughness: 0.35,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (meshName.includes('11')) {
                // Renal Medulla Pyramids
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x7f1d1d,
                  roughness: 0.4,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (meshName.includes('2') || meshName.includes('8')) {
                // Ureter & Renal Pelvis (Ivory / Pale Yellow)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef08a,
                  roughness: 0.35,
                  metalness: 0.05,
                  side: THREE.DoubleSide
                });
              } else if (meshName.includes('0') || meshName.includes('3') || meshName.includes('4')) {
                // Renal Artery branches (Scarlet Red)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xdc2626,
                  roughness: 0.28,
                  metalness: 0.1,
                  side: THREE.DoubleSide
                });
              } else if (meshName.includes('1') || meshName.includes('5')) {
                // Renal Vein branches (Royal Blue)
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x1d4ed8,
                  roughness: 0.28,
                  metalness: 0.1,
                  side: THREE.DoubleSide
                });
              } else {
                // Minor and Major Calyces
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xfef3c7,
                  roughness: 0.35,
                  metalness: 0.05,
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

    this.isPulsing = (key === 'heart' || key === 'circulatory_system' || key === 'lung' || key === 'respiratory_system');
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
        const isGlass = (child.material.name || '').toLowerCase().includes('glass') || child.name.toLowerCase().includes('glass');
        if (this.isXRay) {
          child.material.transparent = true;
          child.material.opacity = 0.45;
          child.material.depthWrite = false;
        } else {
          child.material.transparent = isGlass ? true : false;
          child.material.opacity = isGlass ? 0.14 : 1.0;
          child.material.depthWrite = isGlass ? false : true;
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
