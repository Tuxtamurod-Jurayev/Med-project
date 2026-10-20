import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Real3DSceneManager {
  constructor(canvasContainer, onLoadingProgress) {
    this.container = canvasContainer;
    this.onProgress = onLoadingProgress || (() => {});

    this.currentModelKey = 'skull';
    this.loadedModelsCache = {};
    this.currentModelGroup = null;

    this.isXRay = false;
    this.isWireframe = false;
    this.isAutoRotate = false;
    this.isPulsing = false;

    this.clock = new THREE.Clock();
    this.loader = new GLTFLoader();

    this.modelConfigs = {
      skull: {
        path: '/models/skull.glb',
        targetScale: 1.8,
        yOffset: 0.0
      },
      brain: {
        path: '/models/brain.glb',
        targetScale: 2.2,
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
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.1);
    this.hemiLight.position.set(0, 20, 0);
    this.scene.add(this.hemiLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    this.keyLight.position.set(6, 8, 7);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    this.fillLight.position.set(-6, 2, -4);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0xfef08a, 1.3);
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

  async loadModel(key) {
    if (!this.modelConfigs[key]) return;
    this.currentModelKey = key;

    // Use cached model if available
    if (this.loadedModelsCache[key]) {
      this.displayModel(this.loadedModelsCache[key], key);
      return;
    }

    const cfg = this.modelConfigs[key];
    this.onProgress(true, `3D model yuklanmoqda...`);

    try {
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

      // Center and normalize bounding box
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

      // PBR optimization
      pivotGroup.traverse((child) => {
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

      this.loadedModelsCache[key] = pivotGroup;
      this.displayModel(pivotGroup, key);
      this.onProgress(false, 'Tayyor');
    } catch (err) {
      console.error(`Failed to load GLB model ${key}:`, err);
      this.onProgress(false, 'Yuklashda xatolik yuz berdi');
    }
  }

  displayModel(pivotGroup, key) {
    if (this.currentModelGroup) {
      this.scene.remove(this.currentModelGroup);
    }

    this.currentModelGroup = pivotGroup;
    this.scene.add(this.currentModelGroup);

    this.isPulsing = (key === 'heart' || key === 'lung');
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

    // Heartbeat pulsation or lungs breathing animation
    if (this.currentModelGroup && this.isPulsing) {
      if (this.currentModelKey === 'heart') {
        const beat = Math.sin(elapsedTime * 6.0);
        const pulse = 1 + (beat > 0.4 ? Math.pow(beat, 4) * 0.08 : 0);
        this.currentModelGroup.scale.set(pulse, pulse, pulse);
      } else if (this.currentModelKey === 'lung') {
        const breath = 1 + Math.sin(elapsedTime * 2.0) * 0.04;
        this.currentModelGroup.scale.set(breath, breath, breath);
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
