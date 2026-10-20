import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  createSkullModel,
  createHeartModel,
  createArmHandModel,
  createRibcageLungsModel,
  createSpineModel,
  HighlightMaterial
} from './anatomyModels.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.currentModelId = 'skull';
    this.currentModelGroup = null;
    this.isXRay = false;
    this.isWireframe = false;
    this.isAnimating = true;
    this.isAutoRotate = false;
    this.highlightedMesh = null;
    this.originalMaterial = null;
    this.onPartSelectedCallback = null;

    this.clock = new THREE.Clock();

    this.initScene();
    this.initLights();
    this.initControls();
    this.initRaycaster();
    this.loadModel('skull');
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a); // dark slate

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // Soft ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(this.ambientLight);

    // Key Light
    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    this.keyLight.position.set(5, 8, 6);
    this.scene.add(this.keyLight);

    // Fill Light (cyan tint for medical cyber feel)
    this.fillLight = new THREE.DirectionalLight(0x67e8f9, 0.8);
    this.fillLight.position.set(-5, 2, -3);
    this.scene.add(this.fillLight);

    // Rim Light (warm highlight)
    this.rimLight = new THREE.DirectionalLight(0xfef08a, 0.9);
    this.rimLight.position.set(0, -5, -4);
    this.scene.add(this.rimLight);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 12;
    this.controls.enablePan = true;
  }

  initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.checkIntersection();
    });
  }

  loadModel(modelId) {
    if (this.currentModelGroup) {
      this.scene.remove(this.currentModelGroup);
      this.clearHighlight();
    }

    this.currentModelId = modelId;

    switch (modelId) {
      case 'skull':
        this.currentModelGroup = createSkullModel();
        break;
      case 'heart':
        this.currentModelGroup = createHeartModel();
        break;
      case 'arm_hand':
        this.currentModelGroup = createArmHandModel();
        break;
      case 'ribcage_lungs':
        this.currentModelGroup = createRibcageLungsModel();
        break;
      case 'spine':
        this.currentModelGroup = createSpineModel();
        break;
      default:
        this.currentModelGroup = createSkullModel();
    }

    this.scene.add(this.currentModelGroup);
    this.applyXRayState();
    this.resetCamera();
  }

  checkIntersection() {
    if (!this.currentModelGroup) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.currentModelGroup.children, true);

    if (intersects.length > 0) {
      let targetMesh = intersects[0].object;

      // Find parent with userData if this mesh is nested
      let current = targetMesh;
      let partData = null;
      while (current && current !== this.currentModelGroup) {
        if (current.userData && current.userData.id) {
          partData = current.userData;
          break;
        }
        current = current.parent;
      }

      if (!partData && targetMesh.userData && targetMesh.userData.id) {
        partData = targetMesh.userData;
      }

      this.highlightMesh(targetMesh);

      if (this.onPartSelectedCallback && partData) {
        this.onPartSelectedCallback(partData);
      }
    }
  }

  highlightPartById(partId) {
    if (!this.currentModelGroup) return;

    let foundMesh = null;
    this.currentModelGroup.traverse((child) => {
      if (!foundMesh && child.userData && child.userData.id === partId) {
        if (child.isMesh) {
          foundMesh = child;
        } else if (child.children && child.children.length > 0) {
          const firstMesh = child.children.find(c => c.isMesh);
          if (firstMesh) foundMesh = firstMesh;
        }
      }
    });

    if (foundMesh) {
      this.highlightMesh(foundMesh);
    }
  }

  highlightMesh(mesh) {
    this.clearHighlight();
    if (!mesh || !mesh.isMesh) return;

    this.highlightedMesh = mesh;
    this.originalMaterial = mesh.material;
    mesh.material = HighlightMaterial;
  }

  clearHighlight() {
    if (this.highlightedMesh && this.originalMaterial) {
      this.highlightedMesh.material = this.originalMaterial;
    }
    this.highlightedMesh = null;
    this.originalMaterial = null;
  }

  setTransparentBackground(isTransparent) {
    if (isTransparent) {
      this.scene.background = null;
      this.renderer.setClearColor(0x000000, 0);
    } else {
      this.scene.background = new THREE.Color(0x0a0f1d);
      this.renderer.setClearColor(0x0a0f1d, 1);
    }
  }

  toggleXRay() {
    this.isXRay = !this.isXRay;
    this.applyXRayState();
    return this.isXRay;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    if (this.currentModelGroup) {
      this.currentModelGroup.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = this.isWireframe;
        }
      });
    }
    return this.isWireframe;
  }

  applyXRayState() {
    if (!this.currentModelGroup) return;

    this.currentModelGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        if (this.isXRay) {
          child.material.transparent = true;
          child.material.opacity = 0.35;
          child.material.depthWrite = false;
        } else {
          child.material.transparent = child.userData.transparent || false;
          child.material.opacity = child.userData.opacity || 1.0;
          child.material.depthWrite = true;
        }
        child.material.needsUpdate = true;
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
    this.camera.position.set(0, 0, 4.8);
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

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Heart pulsation animation
    if (this.currentModelId === 'heart' && this.currentModelGroup && this.isAnimating) {
      // Natural EKG heartbeat rhythm
      const beat = Math.sin(elapsedTime * 6.5);
      const pulse = 1 + (beat > 0.4 ? Math.pow(beat, 4) * 0.08 : 0);
      this.currentModelGroup.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1);
    }

    // Lungs breathing animation
    if (this.currentModelId === 'ribcage_lungs' && this.currentModelGroup && this.isAnimating) {
      const breath = 1 + Math.sin(elapsedTime * 1.8) * 0.045;
      const lungExpand = 1 + Math.sin(elapsedTime * 1.8) * 0.08;

      const leftLung = this.currentModelGroup.children.find(c => c.userData && c.userData.id === 'lungs_left');
      const rightLung = this.currentModelGroup.children.find(c => c.userData && c.userData.id === 'lungs_right');

      if (leftLung) leftLung.scale.set(0.85 * lungExpand, 1.6 * lungExpand, 0.85 * lungExpand);
      if (rightLung) rightLung.scale.set(0.95 * lungExpand, 1.65 * lungExpand, 0.9 * lungExpand);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
