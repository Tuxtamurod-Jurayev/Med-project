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
    this.isPulsing = true;

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
    const targetScale = 2.2;
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
