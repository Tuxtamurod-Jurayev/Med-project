import * as THREE from 'three';
import {
  createGallbladderBiliaryModel,
  createEyeInternalLayersModel,
  createEsophagusPharynxModel,
  createSalivaryGlandsModel,
  createSmallIntestineModel,
  createLargeIntestineAppendixModel,
  createLarynxVocalCordsModel,
  createTracheaBronchialTreeModel,
  createKidneyNephronModel,
  createUretersModel,
  createBladderUrethraModel,
  createEarModel,
  createSkinLayersModel,
  createLymphaticImmuneModel,
  createCellStructureModel,
  createDnaHelixModel,
  createBloodCellsModel
} from './detailedOrgans.js';

export {
  createGallbladderBiliaryModel,
  createEyeInternalLayersModel,
  createEsophagusPharynxModel,
  createSalivaryGlandsModel,
  createSmallIntestineModel,
  createLargeIntestineAppendixModel,
  createLarynxVocalCordsModel,
  createTracheaBronchialTreeModel,
  createKidneyNephronModel,
  createUretersModel,
  createBladderUrethraModel,
  createEarModel,
  createSkinLayersModel,
  createLymphaticImmuneModel,
  createCellStructureModel,
  createDnaHelixModel,
  createBloodCellsModel
};

// -------------------------------------------------------------
// ANATOMICAL MATERIALS & PALETTE
// -------------------------------------------------------------
export const BoneMaterial = new THREE.MeshStandardMaterial({
  color: 0xf6efe2,
  roughness: 0.42,
  metalness: 0.08
});

export const CartilageMaterial = new THREE.MeshStandardMaterial({
  color: 0x93c5fd,
  roughness: 0.28,
  metalness: 0.1,
  transparent: true,
  opacity: 0.88
});

export const HeartMuscleMaterial = new THREE.MeshStandardMaterial({
  color: 0x991b1b,
  roughness: 0.32,
  metalness: 0.12
});

export const AortaMaterial = new THREE.MeshStandardMaterial({
  color: 0xdc2626,
  roughness: 0.28,
  metalness: 0.15
});

export const VeinMaterial = new THREE.MeshStandardMaterial({
  color: 0x1d4ed8,
  roughness: 0.28,
  metalness: 0.15
});

export const PulmonaryArteryMaterial = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  roughness: 0.3,
  metalness: 0.12
});

export const NerveMaterial = new THREE.MeshStandardMaterial({
  color: 0xfacc15,
  roughness: 0.25,
  metalness: 0.1,
  emissive: 0xca8a04,
  emissiveIntensity: 0.35
});

export const MuscleMaterial = new THREE.MeshStandardMaterial({
  color: 0xb91c1c,
  roughness: 0.38,
  metalness: 0.05
});

export const TendonMaterial = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.22,
  metalness: 0.08
});

export const BileGreenMaterial = new THREE.MeshStandardMaterial({
  color: 0x16a34a,
  roughness: 0.35,
  metalness: 0.12
});

export const PancreasYellowMaterial = new THREE.MeshStandardMaterial({
  color: 0xf59e0b,
  roughness: 0.45,
  metalness: 0.08
});

export const ToothEnamelMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.15,
  metalness: 0.1
});

export const GumPinkMaterial = new THREE.MeshStandardMaterial({
  color: 0xf43f5e,
  roughness: 0.35,
  metalness: 0.05
});

export const TongueRedMaterial = new THREE.MeshStandardMaterial({
  color: 0xe11d48,
  roughness: 0.45,
  metalness: 0.05
});

export const ScleraMaterial = new THREE.MeshStandardMaterial({
  color: 0xf8fafc,
  roughness: 0.2,
  metalness: 0.05
});

export const CorneaGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.35,
  roughness: 0.05,
  transmission: 0.9,
  ior: 1.376
});

export const IrisBlueMaterial = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  roughness: 0.25,
  metalness: 0.1
});

// Helper for smooth tube curves
function makeTube(points, radius = 0.08, segments = 24, radialSegments = 12, material = BoneMaterial) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, segments, radius, radialSegments, false);
  return new THREE.Mesh(geo, material.clone());
}

// -------------------------------------------------------------
// 1. SKULL MODEL (Cranium) - Color-coded & natural bones
// -------------------------------------------------------------
export function createSkullModel() {
  const group = new THREE.Group();
  group.name = "skull";

  // Calvaria / Parietal Bones (Emerald Green)
  const parietalGeo = new THREE.SphereGeometry(1.2, 32, 28);
  parietalGeo.scale(1.0, 1.15, 1.25);
  const parietalMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 }); // Parietal
  const parietalMesh = new THREE.Mesh(parietalGeo, parietalMat);
  parietalMesh.position.set(0, 0.4, -0.1);
  group.add(parietalMesh);

  // Frontal Bone Forehead (Cobalt Blue)
  const frontalGeo = new THREE.SphereGeometry(0.9, 28, 24);
  frontalGeo.scale(1.05, 0.88, 0.9);
  const frontalMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 }); // Frontal
  const frontalMesh = new THREE.Mesh(frontalGeo, frontalMat);
  frontalMesh.position.set(0, 0.65, 0.5);
  group.add(frontalMesh);

  // Occipital Bone (Amber / Gold)
  const occipitalGeo = new THREE.SphereGeometry(0.95, 24, 20);
  occipitalGeo.scale(0.95, 0.9, 1.05);
  const occipitalMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 }); // Occipital
  const occipitalMesh = new THREE.Mesh(occipitalGeo, occipitalMat);
  occipitalMesh.position.set(0, 0.15, -0.7);
  group.add(occipitalMesh);

  // Temporal Bones (Violet)
  const temporalMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.4 });
  [-1, 1].forEach((side) => {
    const tempGeo = new THREE.BoxGeometry(0.25, 0.7, 0.8);
    const tempMesh = new THREE.Mesh(tempGeo, temporalMat);
    tempMesh.position.set(side * 1.15, 0.2, -0.1);
    group.add(tempMesh);

    // Zygomatic arch
    const zygoGeo = new THREE.TorusGeometry(0.35, 0.08, 12, 24, Math.PI * 0.9);
    const zygoMesh = new THREE.Mesh(zygoGeo, temporalMat);
    zygoMesh.rotation.y = side * Math.PI / 2;
    zygoMesh.rotation.x = 0.2;
    zygoMesh.position.set(side * 1.05, -0.15, 0.45);
    group.add(zygoMesh);

    // Eye Orbit rims (Dark teal)
    const orbitGeo = new THREE.TorusGeometry(0.32, 0.07, 16, 28);
    const orbitMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.4 });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.position.set(side * 0.45, 0.15, 1.02);
    orbitMesh.rotation.y = side * 0.15;
    group.add(orbitMesh);
  });

  // Nasal Bone
  const nasalGeo = new THREE.ConeGeometry(0.18, 0.55, 6);
  nasalGeo.scale(1.1, 1, 0.7);
  const nasalMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.4 });
  const nasalMesh = new THREE.Mesh(nasalGeo, nasalMat);
  nasalMesh.rotation.x = -0.35;
  nasalMesh.position.set(0, 0.05, 1.15);
  group.add(nasalMesh);

  // Maxilla (Upper Jaw - Warm Yellow)
  const maxillaGeo = new THREE.BoxGeometry(0.85, 0.55, 0.65);
  const maxillaMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
  const maxillaMesh = new THREE.Mesh(maxillaGeo, maxillaMat);
  maxillaMesh.position.set(0, -0.3, 0.8);
  group.add(maxillaMesh);

  // Teeth (Pure Enamel White)
  const upperTeethGeo = new THREE.TorusGeometry(0.38, 0.065, 8, 20, Math.PI);
  const upperTeeth = new THREE.Mesh(upperTeethGeo, ToothEnamelMaterial);
  upperTeeth.rotation.x = Math.PI / 2;
  upperTeeth.rotation.z = Math.PI;
  upperTeeth.position.set(0, -0.56, 0.85);
  group.add(upperTeeth);

  // Mandible (Lower Jaw - Crimson/Coral)
  const jawGroup = new THREE.Group();
  const jawMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
  const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.75);
  const jawMesh = new THREE.Mesh(jawGeo, jawMat);
  jawMesh.position.set(0, -0.85, 0.6);
  jawGroup.add(jawMesh);

  const chinGeo = new THREE.SphereGeometry(0.28, 16, 16);
  chinGeo.scale(1.2, 0.9, 1.1);
  const chinMesh = new THREE.Mesh(chinGeo, jawMat);
  chinMesh.position.set(0, -0.92, 0.95);
  jawGroup.add(chinMesh);

  const lowerTeeth = new THREE.Mesh(upperTeethGeo, ToothEnamelMaterial);
  lowerTeeth.rotation.x = Math.PI / 2;
  lowerTeeth.rotation.z = Math.PI;
  lowerTeeth.position.set(0, -0.68, 0.84);
  jawGroup.add(lowerTeeth);

  [-1, 1].forEach(side => {
    const ramusGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.75, 12);
    const ramusMesh = new THREE.Mesh(ramusGeo, jawMat);
    ramusMesh.position.set(side * 0.75, -0.5, 0.2);
    ramusMesh.rotation.x = 0.35;
    jawGroup.add(ramusMesh);
  });

  group.add(jawGroup);
  group.position.y = 0.2;
  return group;
}

// -------------------------------------------------------------
// 2. HEART MODEL (Cor) - Optimized anatomical colors & vessels
// -------------------------------------------------------------
export function createHeartModel() {
  const group = new THREE.Group();
  group.name = "heart";

  // Ventricles Body (Left and Right Myocardium)
  const ventricleGeo = new THREE.SphereGeometry(1.15, 32, 28);
  ventricleGeo.scale(0.92, 1.25, 0.95);
  const heartMesh = new THREE.Mesh(ventricleGeo, HeartMuscleMaterial.clone());
  heartMesh.rotation.z = -0.22;
  heartMesh.rotation.x = 0.15;
  group.add(heartMesh);

  // Heart Apex (tip)
  const apexGeo = new THREE.ConeGeometry(0.72, 0.95, 24);
  apexGeo.scale(1, 1, 0.82);
  const apexMesh = new THREE.Mesh(apexGeo, HeartMuscleMaterial.clone());
  apexMesh.rotation.z = Math.PI - 0.22;
  apexMesh.position.set(-0.25, -1.32, 0.1);
  group.add(apexMesh);

  // Right Ventricle Bulge
  const rvGeo = new THREE.SphereGeometry(0.75, 20, 20);
  rvGeo.scale(0.82, 1.1, 0.9);
  const rvMesh = new THREE.Mesh(rvGeo, HeartMuscleMaterial.clone());
  rvMesh.position.set(0.5, -0.3, 0.3);
  group.add(rvMesh);

  // Left Atrium (auricle)
  const laGeo = new THREE.SphereGeometry(0.58, 20, 20);
  const laMesh = new THREE.Mesh(laGeo, HeartMuscleMaterial.clone());
  laMesh.position.set(-0.62, 0.75, -0.1);
  group.add(laMesh);

  // Right Atrium
  const raGeo = new THREE.SphereGeometry(0.68, 20, 20);
  const raMesh = new THREE.Mesh(raGeo, HeartMuscleMaterial.clone());
  raMesh.position.set(0.68, 0.6, 0.15);
  group.add(raMesh);

  // Aorta Arch (Arcus aortae - Vivid Scarlet Red)
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.6, 0.1),
    new THREE.Vector3(-0.1, 1.3, 0.15),
    new THREE.Vector3(0.08, 1.6, -0.05),
    new THREE.Vector3(0.38, 1.4, -0.35),
    new THREE.Vector3(0.35, 0.3, -0.5)
  ]);
  const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.26, 16, false);
  const aortaMesh = new THREE.Mesh(aortaGeo, AortaMaterial.clone());
  group.add(aortaMesh);

  // Aorta 3 Branches (Brachiocephalic, Carotid, Subclavian)
  [-0.1, 0.06, 0.22].forEach((offset, idx) => {
    const branchGeo = new THREE.CylinderGeometry(0.075, 0.085, 0.48, 12);
    const branchMesh = new THREE.Mesh(branchGeo, AortaMaterial.clone());
    branchMesh.position.set(offset, 1.7, -0.05 + idx * 0.05);
    branchMesh.rotation.z = (idx - 1) * 0.15;
    group.add(branchMesh);
  });

  // Pulmonary Trunk & Arteries (Cyan-Blue)
  const ptCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0.5, 0.45),
    new THREE.Vector3(0.05, 0.98, 0.35),
    new THREE.Vector3(-0.35, 1.18, 0.15)
  ]);
  const ptGeo = new THREE.TubeGeometry(ptCurve, 24, 0.22, 16, false);
  const ptMesh = new THREE.Mesh(ptGeo, PulmonaryArteryMaterial.clone());
  group.add(ptMesh);

  // Superior & Inferior Vena Cava (Royal Blue)
  const svcGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.85, 16);
  const svcMesh = new THREE.Mesh(svcGeo, VeinMaterial.clone());
  svcMesh.position.set(0.78, 1.25, -0.2);
  group.add(svcMesh);

  const ivcGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.65, 16);
  const ivcMesh = new THREE.Mesh(ivcGeo, VeinMaterial.clone());
  ivcMesh.position.set(0.7, -1.0, -0.3);
  group.add(ivcMesh);

  // Coronary Arteries (Crisp Red branches)
  const caCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.45, 0.92),
    new THREE.Vector3(-0.16, -0.1, 0.88),
    new THREE.Vector3(-0.26, -0.7, 0.72),
    new THREE.Vector3(-0.28, -1.15, 0.42)
  ]);
  const caGeo = new THREE.TubeGeometry(caCurve, 24, 0.045, 8, false);
  const caMesh = new THREE.Mesh(caGeo, AortaMaterial.clone());
  group.add(caMesh);

  // Coronary Vein (Blue branch tracing sulcus)
  const cvCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.42, 0.9),
    new THREE.Vector3(-0.06, -0.1, 0.86),
    new THREE.Vector3(-0.16, -0.68, 0.7),
    new THREE.Vector3(-0.2, -1.05, 0.45)
  ]);
  const cvGeo = new THREE.TubeGeometry(cvCurve, 24, 0.04, 8, false);
  const cvMesh = new THREE.Mesh(cvGeo, VeinMaterial.clone());
  group.add(cvMesh);

  group.scale.set(1.15, 1.15, 1.15);
  return group;
}

// -------------------------------------------------------------
// 3. EYE TISSUES MODEL (Bulbus oculi & Tunicae oculi)
// -------------------------------------------------------------
export function createEyeTissuesModel() {
  const group = new THREE.Group();
  group.name = "eye_tissues";

  // 1. Sclera (Pearlescent White Outer Fibrous Tunic)
  const scleraGeo = new THREE.SphereGeometry(1.22, 36, 32);
  const scleraMesh = new THREE.Mesh(scleraGeo, ScleraMaterial);
  group.add(scleraMesh);

  // Episcleral Microvascular Network (Fine branched capillary vessels on sclera)
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2;
    const rStart = 1.23;
    const vCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0.72),
      new THREE.Vector3(Math.cos(angle + 0.1) * 1.15, Math.sin(angle + 0.1) * 1.15, 0.35),
      new THREE.Vector3(Math.cos(angle - 0.08) * 1.21, Math.sin(angle - 0.08) * 1.21, -0.2)
    ]);
    const vTube = makeTube(vCurve.points, 0.018, 14, 6, AortaMaterial);
    group.add(vTube);
  }

  // 2. Cornea (Optically Accurate Crystal Clear Glass Dome)
  const corneaGeo = new THREE.SphereGeometry(0.74, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.44);
  const corneaMesh = new THREE.Mesh(corneaGeo, new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.03,
    transmission: 0.96,
    ior: 1.376,
    depthWrite: false,
    side: THREE.FrontSide
  }));
  corneaMesh.position.set(0, 0, 0.96);
  group.add(corneaMesh);

  // Corneoscleral Limbus (Delicate transition ring)
  const limbusGeo = new THREE.TorusGeometry(0.66, 0.03, 16, 48);
  const limbusMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3 });
  const limbusMesh = new THREE.Mesh(limbusGeo, limbusMat);
  limbusMesh.position.set(0, 0, 0.96);
  group.add(limbusMesh);

  // 3. Iris (Multi-layered hazel-cerulean blue stroma with radial ridges)
  const irisOuterGeo = new THREE.RingGeometry(0.24, 0.65, 48);
  const irisOuterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Vibrant azure blue
    roughness: 0.28,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  const irisOuterMesh = new THREE.Mesh(irisOuterGeo, irisOuterMat);
  irisOuterMesh.position.set(0, 0, 1.15);
  group.add(irisOuterMesh);

  // Inner Pupillary Ring / Sphincter
  const irisInnerGeo = new THREE.RingGeometry(0.23, 0.38, 48);
  const irisInnerMat = new THREE.MeshStandardMaterial({
    color: 0x0369a1, // Deep cerulean
    roughness: 0.35,
    side: THREE.DoubleSide
  });
  const irisInnerMesh = new THREE.Mesh(irisInnerGeo, irisInnerMat);
  irisInnerMesh.position.set(0, 0, 1.155);
  group.add(irisInnerMesh);

  // 4. Pupil (Apertura pupillae - Deep velvet black light absorber)
  const pupilGeo = new THREE.CircleGeometry(0.23, 36);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
  const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
  pupilMesh.position.set(0, 0, 1.156);
  group.add(pupilMesh);

  // 5. Crystalline Lens (Biconvex Transparent Optical Lens)
  const lensGeo = new THREE.SphereGeometry(0.48, 28, 24);
  lensGeo.scale(1.0, 1.0, 0.42);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fafc,
    transparent: true,
    opacity: 0.85,
    roughness: 0.08,
    transmission: 0.88,
    ior: 1.41
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.position.set(0, 0, 0.88);
  group.add(lensMesh);

  // Zonule of Zinn (Ciliary suspensory ligaments around lens)
  const zonuleGeo = new THREE.TorusGeometry(0.52, 0.02, 12, 36);
  const zonuleMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.6 });
  const zonuleMesh = new THREE.Mesh(zonuleGeo, zonuleMat);
  zonuleMesh.position.set(0, 0, 0.88);
  group.add(zonuleMesh);

  // 6. Optic Nerve (Nervus opticus / II cranial nerve - Dural Sheath)
  const nerveCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -1.2),
    new THREE.Vector3(0.08, -0.1, -1.75),
    new THREE.Vector3(0.18, -0.24, -2.45)
  ]);
  const nerveMesh = makeTube(nerveCurve.points, 0.23, 24, 16, BoneMaterial);
  group.add(nerveMesh);

  // Central Retinal Artery (Red) & Vein (Blue) within Optic Nerve
  const craCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.04, 0.02, -1.21),
    new THREE.Vector3(0.1, -0.08, -1.75),
    new THREE.Vector3(0.2, -0.22, -2.45)
  ]);
  group.add(makeTube(craCurve.points, 0.045, 18, 8, AortaMaterial));

  const crvCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.04, -0.02, -1.21),
    new THREE.Vector3(0.05, -0.12, -1.75),
    new THREE.Vector3(0.15, -0.26, -2.45)
  ]);
  group.add(makeTube(crvCurve.points, 0.05, 18, 8, VeinMaterial));

  // 7. Extraocular Muscles (All 6 Oculomotor Muscles)
  // 4 Rectus Muscles: Superior, Inferior, Medial, Lateral
  const rectusConfigs = [
    { name: "Superior Rectus", rot: [0.65, 0, 0], pos: [0, 1.1, -0.22] },
    { name: "Inferior Rectus", rot: [-0.65, 0, 0], pos: [0, -1.1, -0.22] },
    { name: "Medial Rectus", rot: [0, 0.65, 0], pos: [1.1, 0, -0.22] },
    { name: "Lateral Rectus", rot: [0, -0.65, 0], pos: [-1.1, 0, -0.22] }
  ];

  rectusConfigs.forEach(cfg => {
    const mGeo = new THREE.CylinderGeometry(0.16, 0.24, 1.75, 14);
    const mMesh = new THREE.Mesh(mGeo, MuscleMaterial);
    mMesh.rotation.x = cfg.rot[0] || (Math.PI / 2);
    mMesh.rotation.y = cfg.rot[1] || 0;
    mMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    group.add(mMesh);

    // Glistening white tendon insertion into sclera
    const tendonGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.35, 12);
    const tendonMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
    const tendonMesh = new THREE.Mesh(tendonGeo, tendonMat);
    tendonMesh.rotation.x = cfg.rot[0] || (Math.PI / 2);
    tendonMesh.rotation.y = cfg.rot[1] || 0;
    tendonMesh.position.set(cfg.pos[0] * 0.9, cfg.pos[1] * 0.9, cfg.pos[2] + 0.6);
    group.add(tendonMesh);
  });

  // 2 Oblique Muscles: Superior Oblique (via Trochlea) & Inferior Oblique
  const soCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, 0.3, -2.1),
    new THREE.Vector3(0.72, 1.15, -0.1),
    new THREE.Vector3(0.55, 1.25, 0.3),
    new THREE.Vector3(0, 1.15, 0.2)
  ]);
  group.add(makeTube(soCurve.points, 0.12, 24, 8, MuscleMaterial));

  // Trochlea (Cartilaginous pulley loop)
  const trochleaGeo = new THREE.TorusGeometry(0.14, 0.04, 8, 16);
  const trochleaMesh = new THREE.Mesh(trochleaGeo, CartilageMaterial);
  trochleaMesh.position.set(0.68, 1.25, 0.25);
  group.add(trochleaMesh);

  // Inferior Oblique
  const ioCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.75, -1.0, 0.3),
    new THREE.Vector3(0.2, -1.2, 0.1),
    new THREE.Vector3(-0.85, -0.9, -0.3)
  ]);
  group.add(makeTube(ioCurve.points, 0.13, 20, 8, MuscleMaterial));

  // 8. Lacrimal Gland (Glandula lacrimalis - superolateral orbit)
  const lacGeo = new THREE.SphereGeometry(0.32, 16, 14);
  lacGeo.scale(1.4, 0.8, 0.6);
  const lacMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.42 });
  const lacMesh = new THREE.Mesh(lacGeo, lacMat);
  lacMesh.position.set(-0.88, 0.92, 0.3);
  lacMesh.rotation.z = 0.4;
  group.add(lacMesh);

  group.scale.set(1.25, 1.25, 1.25);
  return group;
}

// -------------------------------------------------------------
// 4. GALLBLADDER MODEL (Vesica biliaris & Ductus biliares)
// -------------------------------------------------------------
export function createGallbladderModel() {
  const group = new THREE.Group();
  group.name = "gallbladder";

  // Specialized PBR Physical shaders for the biliary system
  const gbShader = new THREE.MeshPhysicalMaterial({
    color: 0x166534,
    emissive: 0x052e16,
    emissiveIntensity: 0.15,
    roughness: 0.18,
    metalness: 0.03,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
    transmission: 0.18,
    ior: 1.36,
    side: THREE.DoubleSide
  });

  const ductShader = new THREE.MeshPhysicalMaterial({
    color: 0x15803d,
    roughness: 0.24,
    metalness: 0.04,
    clearcoat: 0.8,
    clearcoatRoughness: 0.12,
    side: THREE.DoubleSide
  });

  // A. PEAR-SHAPED GALLBLADDER RESERVOIR (Vesica biliaris)
  // 1. Fundus vesicae biliaris (Expanded rounded blind end)
  const fundusGeo = new THREE.SphereGeometry(0.52, 32, 28);
  fundusGeo.scale(0.88, 1.15, 0.92);
  const fundusMesh = new THREE.Mesh(fundusGeo, gbShader);
  fundusMesh.rotation.z = -0.42;
  fundusMesh.rotation.x = 0.28;
  fundusMesh.position.set(0.68, -0.72, 0.45);
  group.add(fundusMesh);

  // 2. Corpus vesicae biliaris (Main body tapering posterosuperiorly)
  const bodyPoints = [
    new THREE.Vector3(0.68, -0.72, 0.45),
    new THREE.Vector3(0.52, -0.35, 0.32),
    new THREE.Vector3(0.36, 0.08, 0.18),
    new THREE.Vector3(0.22, 0.48, 0.02)
  ];
  const bodyMesh = makeTube(bodyPoints, 0.42, 28, 18, gbShader);
  group.add(bodyMesh);

  // 3. Collum vesicae biliaris with Hartmann's Pouch (Infundibulum)
  const neckPoints = [
    new THREE.Vector3(0.22, 0.48, 0.02),
    new THREE.Vector3(0.18, 0.78, -0.12),
    new THREE.Vector3(0.06, 1.05, -0.25)
  ];
  const neckMesh = makeTube(neckPoints, 0.24, 20, 16, gbShader);
  group.add(neckMesh);

  // Hartmann's pouch anatomical bulging
  const pouchGeo = new THREE.SphereGeometry(0.25, 20, 18);
  pouchGeo.scale(1.1, 0.85, 0.9);
  const pouchMesh = new THREE.Mesh(pouchGeo, gbShader);
  pouchMesh.position.set(0.22, 0.65, -0.06);
  group.add(pouchMesh);

  // Peritoneal serosa reflection fold (Mesocyst)
  const serosaGeo = new THREE.TorusGeometry(0.48, 0.045, 8, 24, Math.PI * 0.9);
  const serosaMat = new THREE.MeshStandardMaterial({
    color: 0x86efac,
    transparent: true,
    opacity: 0.6,
    roughness: 0.3
  });
  const serosaMesh = new THREE.Mesh(serosaGeo, serosaMat);
  serosaMesh.rotation.x = Math.PI / 2.2;
  serosaMesh.rotation.y = -0.3;
  serosaMesh.position.set(0.46, -0.25, 0.22);
  group.add(serosaMesh);

  // B. CYSTIC DUCT & SPIRAL VALVE OF HEISTER (Ductus cysticus & Plica spiralis)
  const cysticCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.06, 1.05, -0.25),
    new THREE.Vector3(-0.08, 1.18, -0.32),
    new THREE.Vector3(-0.16, 0.98, -0.36),
    new THREE.Vector3(-0.25, 0.82, -0.32)
  ]);
  const cysticMesh = makeTube(cysticCurve.points, 0.085, 24, 12, ductShader);
  group.add(cysticMesh);

  // Helical ridges representing the Spiral Valve of Heister
  for (let s = 0; s < 7; s++) {
    const t = s / 7;
    const pt = cysticCurve.getPoint(t);
    const ringGeo = new THREE.TorusGeometry(0.095, 0.016, 8, 16);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(pt);
    ringMesh.rotation.x = Math.PI / 2 + s * 0.45;
    ringMesh.rotation.y = s * 0.35;
    group.add(ringMesh);
  }

  // C. INTRAHEPATIC & COMMON HEPATIC DUCTS (Ductus hepaticus)
  // Right Hepatic Duct (Anterior & Posterior branches)
  const rhdAnt = [new THREE.Vector3(-0.75, 1.75, -0.15), new THREE.Vector3(-0.48, 1.45, -0.26)];
  const rhdPost = [new THREE.Vector3(-0.68, 1.62, -0.42), new THREE.Vector3(-0.48, 1.45, -0.26)];
  group.add(makeTube(rhdAnt, 0.065, 12, 8, ductShader));
  group.add(makeTube(rhdPost, 0.06, 12, 8, ductShader));

  // Left Hepatic Duct (Medial & Lateral branches)
  const lhdLat = [new THREE.Vector3(-0.12, 1.78, -0.18), new THREE.Vector3(-0.32, 1.45, -0.28)];
  const lhdMed = [new THREE.Vector3(-0.02, 1.60, -0.38), new THREE.Vector3(-0.32, 1.45, -0.28)];
  group.add(makeTube(lhdLat, 0.065, 12, 8, ductShader));
  group.add(makeTube(lhdMed, 0.06, 12, 8, ductShader));

  // Common Hepatic Duct Confluence
  const hepaticConfluence = [
    new THREE.Vector3(-0.40, 1.45, -0.27),
    new THREE.Vector3(-0.32, 1.15, -0.30),
    new THREE.Vector3(-0.25, 0.82, -0.32)
  ];
  group.add(makeTube(hepaticConfluence, 0.095, 18, 10, ductShader));

  // D. COMMON BILE DUCT (Ductus choledochus)
  const choledochusCurve = [
    new THREE.Vector3(-0.25, 0.82, -0.32),
    new THREE.Vector3(-0.22, 0.35, -0.36),
    new THREE.Vector3(-0.18, -0.15, -0.38),
    new THREE.Vector3(-0.14, -0.62, -0.34),
    new THREE.Vector3(-0.12, -0.92, -0.22)
  ];
  group.add(makeTube(choledochusCurve, 0.105, 30, 12, ductShader));

  // E. CALOT'S TRIANGLE & ARTERIAL SUPPLY (Arteria cystica)
  // Proper Hepatic Artery
  const phaCurve = [
    new THREE.Vector3(-0.48, 0.45, -0.28),
    new THREE.Vector3(-0.44, 0.95, -0.26),
    new THREE.Vector3(-0.42, 1.35, -0.24)
  ];
  group.add(makeTube(phaCurve, 0.068, 16, 8, AortaMaterial));

  // Cystic Artery branching from RHA and fanning over gallbladder
  const cysticArteryMain = [
    new THREE.Vector3(-0.43, 1.05, -0.25),
    new THREE.Vector3(-0.15, 0.95, -0.15),
    new THREE.Vector3(0.08, 0.72, 0.02)
  ];
  group.add(makeTube(cysticArteryMain, 0.038, 14, 8, AortaMaterial));

  const cysticArtSuperficial = [
    new THREE.Vector3(0.08, 0.72, 0.02),
    new THREE.Vector3(0.28, 0.42, 0.22),
    new THREE.Vector3(0.48, 0.05, 0.34),
    new THREE.Vector3(0.58, -0.42, 0.42)
  ];
  group.add(makeTube(cysticArtSuperficial, 0.026, 16, 8, AortaMaterial));

  const cysticArtDeep = [
    new THREE.Vector3(0.08, 0.72, 0.02),
    new THREE.Vector3(0.20, 0.45, -0.05),
    new THREE.Vector3(0.32, 0.05, 0.08),
    new THREE.Vector3(0.42, -0.38, 0.18)
  ];
  group.add(makeTube(cysticArtDeep, 0.024, 16, 8, AortaMaterial));

  // Portal Vein Trunk in the hepatoduodenal ligament
  const pvCurve = [
    new THREE.Vector3(-0.35, 0.35, -0.42),
    new THREE.Vector3(-0.38, 0.90, -0.38),
    new THREE.Vector3(-0.40, 1.40, -0.34)
  ];
  group.add(makeTube(pvCurve, 0.095, 16, 8, VeinMaterial));

  // F. DUODENUM SECTION & SPHINCTER OF ODDI (Papilla duodeni major)
  // Duodenum C-loop descending limb
  const duoCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.75, -0.45, 0.05),
    new THREE.Vector3(-0.42, -0.88, -0.05),
    new THREE.Vector3(0.12, -1.05, -0.15),
    new THREE.Vector3(0.62, -0.75, -0.22),
    new THREE.Vector3(0.68, -0.15, -0.12)
  ]);
  const duoMat = new THREE.MeshStandardMaterial({
    color: 0xfda4af,
    roughness: 0.38,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  group.add(makeTube(duoCurve.points, 0.28, 32, 16, duoMat));

  // Duodenal mucosal circular folds (Plicae circulares / Kerckring)
  for (let d = 0; d < 10; d++) {
    const t = 0.15 + (d / 10) * 0.7;
    const pt = duoCurve.getPoint(t);
    const foldGeo = new THREE.TorusGeometry(0.29, 0.022, 6, 20);
    const foldMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
    const foldMesh = new THREE.Mesh(foldGeo, foldMat);
    foldMesh.position.copy(pt);
    foldMesh.rotation.y = Math.PI / 2;
    group.add(foldMesh);
  }

  // Major Duodenal Papilla (Ampulla of Vater) & Sphincter of Oddi
  const papillaGeo = new THREE.SphereGeometry(0.14, 16, 14);
  papillaGeo.scale(1.2, 0.9, 0.8);
  const papillaMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.28,
    emissive: 0x9f1239,
    emissiveIntensity: 0.3
  });
  const papillaMesh = new THREE.Mesh(papillaGeo, papillaMat);
  papillaMesh.position.set(-0.12, -0.92, -0.16);
  group.add(papillaMesh);

  // Concentric muscular ring representing the Sphincter of Oddi
  const oddiRingGeo = new THREE.TorusGeometry(0.11, 0.035, 8, 16);
  const oddiRingMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.35 });
  const oddiRingMesh = new THREE.Mesh(oddiRingGeo, oddiRingMat);
  oddiRingMesh.position.set(-0.12, -0.92, -0.14);
  oddiRingMesh.rotation.y = Math.PI / 2.5;
  group.add(oddiRingMesh);

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

// -------------------------------------------------------------
// 5. PANCREAS MODEL (Pancreas & Duodenum)
// -------------------------------------------------------------
export function createPancreasModel() {
  const group = new THREE.Group();
  group.name = "pancreas";

  // Specialized PBR shaders
  const pancShader = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.38,
    metalness: 0.06,
    bumpScale: 0.04
  });

  const ductShader = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.55,
    roughness: 0.15,
    transparent: true,
    opacity: 0.92
  });

  // A. LOBULATED GLANDULAR PARENCHYMA (Caput, Collum, Corpus, Cauda)
  // 1. Caput pancreatis (Head) nestled in duodenum C-loop
  const headGeo = new THREE.SphereGeometry(0.72, 32, 24);
  headGeo.scale(0.85, 1.25, 0.82);
  const headMesh = new THREE.Mesh(headGeo, pancShader.clone());
  headMesh.position.set(-1.18, -0.32, 0.10);
  group.add(headMesh);

  // 2. Processus uncinatus (Uncinate process hooking behind mesenteric vessels)
  const uncinateGeo = new THREE.CylinderGeometry(0.22, 0.34, 0.48, 16);
  uncinateGeo.scale(1.1, 1.0, 0.7);
  const uncinateMesh = new THREE.Mesh(uncinateGeo, pancShader.clone());
  uncinateMesh.rotation.z = Math.PI / 3.8;
  uncinateMesh.rotation.y = -0.25;
  uncinateMesh.position.set(-0.95, -0.78, -0.05);
  group.add(uncinateMesh);

  // 3. Collum & Corpus pancreatis (Neck & Triangular body)
  const bodyPoints = [
    new THREE.Vector3(-1.12, -0.18, 0.10), // Head junction
    new THREE.Vector3(-0.55, 0.05, 0.06),  // Neck (Collum)
    new THREE.Vector3(0.15, 0.22, 0.01),   // Mid-body
    new THREE.Vector3(0.85, 0.36, -0.08),  // Distal body
    new THREE.Vector3(1.48, 0.52, -0.18)   // Cauda (Tail)
  ];
  const bodyMesh = makeTube(bodyPoints, 0.36, 32, 16, pancShader);
  group.add(bodyMesh);

  // 4. Cauda pancreatis (Tapered tail reaching splenic hilum)
  const tailGeo = new THREE.ConeGeometry(0.32, 0.65, 16);
  tailGeo.scale(1.0, 1.0, 0.65);
  const tailMesh = new THREE.Mesh(tailGeo, pancShader.clone());
  tailMesh.rotation.z = -Math.PI / 2.2;
  tailMesh.rotation.y = 0.2;
  tailMesh.position.set(1.58, 0.54, -0.20);
  group.add(tailMesh);

  // 5. Glandular Acinar Lobules (Surface nodular clusters / Lobuli pancreatis)
  // Generates genuine human cobblestone lobular texture
  const lobuleGroup = new THREE.Group();
  lobuleGroup.name = "acinar_lobules";
  const lobulePositions = [
    // Head lobules
    [-1.35, -0.15, 0.32], [-1.45, -0.45, 0.22], [-1.25, -0.72, 0.24],
    [-1.02, -0.58, 0.35], [-0.85, -0.32, 0.30], [-1.22, 0.05, 0.25],
    // Body lobules
    [-0.45, 0.20, 0.26], [-0.20, 0.26, 0.22], [0.05, 0.32, 0.20],
    [0.35, 0.38, 0.15], [0.65, 0.44, 0.10], [0.95, 0.48, 0.05],
    [1.25, 0.55, -0.05],
    // Inferior border lobules
    [-0.50, -0.10, 0.20], [-0.15, -0.02, 0.18], [0.25, 0.08, 0.14],
    [0.60, 0.16, 0.08], [1.00, 0.25, -0.02]
  ];
  lobulePositions.forEach(pos => {
    const lGeo = new THREE.DodecahedronGeometry(0.14 + Math.random() * 0.06, 1);
    lGeo.scale(1.1, 0.9, 0.9);
    const lMesh = new THREE.Mesh(lGeo, pancShader);
    lMesh.position.set(pos[0], pos[1], pos[2]);
    lobuleGroup.add(lMesh);
  });
  group.add(lobuleGroup);

  // B. MAIN PANCREATIC DUCT OF WIRSUNG & ACCESSORY DUCT OF SANTORINI
  // 1. Ductus pancreaticus (Wirsung)
  const wirsungCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.50, 0.50, -0.14),
    new THREE.Vector3(0.95, 0.38, -0.04),
    new THREE.Vector3(0.25, 0.24, 0.04),
    new THREE.Vector3(-0.45, 0.08, 0.08),
    new THREE.Vector3(-1.05, -0.12, 0.12),
    new THREE.Vector3(-1.32, -0.42, 0.16)
  ]);
  const wirsungMesh = makeTube(wirsungCurve.points, 0.065, 32, 12, ductShader);
  group.add(wirsungMesh);

  // Interlobular herringbone tributary branches
  for (let b = 1; b < 7; b++) {
    const t = b / 7;
    const pt = wirsungCurve.getPoint(t);
    [-1, 1].forEach(side => {
      const tribPts = [
        pt,
        new THREE.Vector3(pt.x + 0.04, pt.y + side * 0.16, pt.z + side * 0.08)
      ];
      group.add(makeTube(tribPts, 0.022, 8, 6, ductShader));
    });
  }

  // 2. Ductus pancreaticus accessorius (Santorini)
  const santoriniCurve = [
    new THREE.Vector3(-1.05, -0.12, 0.12),
    new THREE.Vector3(-1.22, 0.12, 0.15),
    new THREE.Vector3(-1.42, 0.28, 0.20)
  ];
  group.add(makeTube(santoriniCurve, 0.042, 14, 8, ductShader));

  // C. DUODENUM C-LOOP WITH ANATOMICAL WINDOW (Kerckring folds & Papillae)
  const duoCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.85, 0.75, 0.18),  // Pars superior (bulb)
    new THREE.Vector3(-1.85, 0.35, 0.24),  // Superior flexure
    new THREE.Vector3(-2.02, -0.45, 0.18), // Pars descendens
    new THREE.Vector3(-1.65, -1.25, 0.08), // Inferior flexure
    new THREE.Vector3(-0.65, -1.28, 0.02), // Pars horizontalis
    new THREE.Vector3(-0.15, -0.95, -0.04) // Pars ascendens
  ]);
  const duoMat = new THREE.MeshStandardMaterial({
    color: 0xfda4af,
    roughness: 0.38,
    side: THREE.DoubleSide
  });
  group.add(makeTube(duoCurve.points, 0.28, 36, 16, duoMat));

  // Circular mucosal folds (Plicae circulares of Kerckring)
  for (let k = 0; k < 12; k++) {
    const t = 0.12 + (k / 12) * 0.75;
    const pt = duoCurve.getPoint(t);
    const foldGeo = new THREE.TorusGeometry(0.29, 0.022, 6, 20);
    const foldMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
    const foldMesh = new THREE.Mesh(foldGeo, foldMat);
    foldMesh.position.copy(pt);
    foldMesh.rotation.y = Math.PI / 2;
    group.add(foldMesh);
  }

  // Major Duodenal Papilla (Ampulla of Vater) with Sphincter of Oddi
  const majPapillaGeo = new THREE.SphereGeometry(0.14, 14, 14);
  const majPapillaMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.28,
    emissive: 0x9f1239,
    emissiveIntensity: 0.35
  });
  const majPapilla = new THREE.Mesh(majPapillaGeo, majPapillaMat);
  majPapilla.position.set(-1.75, -0.45, 0.20);
  group.add(majPapilla);

  // Minor Duodenal Papilla (Santorini entrance)
  const minPapilla = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 10),
    majPapillaMat.clone()
  );
  minPapilla.position.set(-1.68, 0.15, 0.22);
  group.add(minPapilla);

  // D. PERIPANCREATIC VASCULAR ARCHITECTURE
  // 1. Splenic Artery (Arteria lienalis - famously serpentine & tortuous)
  const splenicArtPoints = [
    new THREE.Vector3(-0.55, 0.18, -0.06),
    new THREE.Vector3(-0.30, 0.42, -0.04),
    new THREE.Vector3(-0.05, 0.26, -0.08),
    new THREE.Vector3(0.25, 0.48, -0.10),
    new THREE.Vector3(0.55, 0.34, -0.14),
    new THREE.Vector3(0.90, 0.58, -0.16),
    new THREE.Vector3(1.22, 0.45, -0.22),
    new THREE.Vector3(1.65, 0.72, -0.26)
  ];
  group.add(makeTube(splenicArtPoints, 0.062, 32, 10, AortaMaterial));

  // Pancreatic branches from splenic artery
  [0.2, 0.5, 0.8].forEach(pct => {
    const curve = new THREE.CatmullRomCurve3(splenicArtPoints);
    const pt = curve.getPoint(pct);
    const branchPts = [pt, new THREE.Vector3(pt.x, pt.y - 0.22, pt.z + 0.08)];
    group.add(makeTube(branchPts, 0.024, 8, 6, AortaMaterial));
  });

  // 2. Splenic Vein (Vena lienalis - straight posterior groove)
  const splenicVeinPoints = [
    new THREE.Vector3(1.55, 0.45, -0.28),
    new THREE.Vector3(0.85, 0.32, -0.20),
    new THREE.Vector3(0.15, 0.18, -0.14),
    new THREE.Vector3(-0.55, 0.05, -0.12)
  ];
  group.add(makeTube(splenicVeinPoints, 0.078, 18, 10, VeinMaterial));

  // 3. Superior Mesenteric Artery & Vein (AMS & VMS)
  // Passing through the incisura pancreatis over uncinate process
  const smaPoints = [
    new THREE.Vector3(-0.52, 0.48, -0.18),
    new THREE.Vector3(-0.55, -0.05, 0.08),
    new THREE.Vector3(-0.58, -0.85, 0.16)
  ];
  group.add(makeTube(smaPoints, 0.075, 14, 8, AortaMaterial));

  const smvPoints = [
    new THREE.Vector3(-0.38, 0.45, -0.16),
    new THREE.Vector3(-0.42, -0.05, 0.10),
    new THREE.Vector3(-0.46, -0.85, 0.18)
  ];
  group.add(makeTube(smvPoints, 0.085, 14, 8, VeinMaterial));

  // 4. Common Bile Duct entering the pancreatic head
  const cbdPoints = [
    new THREE.Vector3(-0.85, 0.65, -0.15),
    new THREE.Vector3(-0.95, 0.05, -0.12),
    new THREE.Vector3(-1.15, -0.28, -0.02),
    new THREE.Vector3(-1.42, -0.42, 0.12)
  ];
  const bileMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 });
  group.add(makeTube(cbdPoints, 0.07, 16, 8, bileMat));

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

// -------------------------------------------------------------
// 6. ORAL CAVITY MODEL (Cavitas oris, Dentes et Lingua)
// -------------------------------------------------------------
export function createOralCavityModel() {
  const group = new THREE.Group();
  group.name = "oral_cavity";

  // Dedicated PBR shaders for oral structures
  const enamelMat = new THREE.MeshPhysicalMaterial({
    color: 0xfdfcf8,
    roughness: 0.14,
    metalness: 0.03,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12
  });

  const gingivaMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.38,
    metalness: 0.04
  });

  const tongueMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c,
    roughness: 0.32,
    metalness: 0.04
  });

  const palateMat = new THREE.MeshStandardMaterial({
    color: 0xfb7185,
    roughness: 0.42,
    side: THREE.DoubleSide
  });

  // A. GINGIVAL ALVEOLAR ARCHES (Gingiva propria & Processus alveolaris)
  // Upper arch (Maxillary) and Lower arch (Mandibular)
  const archRadii = [
    { yPos: 0.38, tilt: -0.18, isUpper: true },
    { yPos: -0.38, tilt: 0.18, isUpper: false }
  ];

  archRadii.forEach(arch => {
    // Parabolic horseshoe gum arch
    const gumCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, arch.yPos, -0.55),
      new THREE.Vector3(-0.78, arch.yPos, 0.05),
      new THREE.Vector3(-0.55, arch.yPos, 0.48),
      new THREE.Vector3(0.00, arch.yPos, 0.72),
      new THREE.Vector3(0.55, arch.yPos, 0.48),
      new THREE.Vector3(0.78, arch.yPos, 0.05),
      new THREE.Vector3(0.85, arch.yPos, -0.55)
    ]);
    const gumMesh = makeTube(gumCurve.points, 0.18, 32, 14, gingivaMat);
    group.add(gumMesh);

    // Scalloped cervical collar & interdental papillae
    for (let p = 0; p < 15; p++) {
      const t = p / 14;
      const pt = gumCurve.getPoint(t);
      const papGeo = new THREE.ConeGeometry(0.045, 0.12, 6);
      const papMesh = new THREE.Mesh(papGeo, gingivaMat);
      papMesh.rotation.x = arch.isUpper ? Math.PI : 0;
      papMesh.position.set(pt.x, arch.yPos + (arch.isUpper ? -0.06 : 0.06), pt.z);
      group.add(papMesh);
    }
  });

  // B. 32 INDIVIDUAL ANATOMICAL TEETH (Dentes)
  // Upper & Lower Jaw with true morphological differentiation
  archRadii.forEach(arch => {
    const count = 16;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1); // 0 (right 3rd molar) to 1 (left 3rd molar)
      // Parabolic dental arch coordinates
      const angle = (t - 0.5) * Math.PI * 0.94;
      const x = Math.sin(angle) * (0.74 + Math.abs(angle) * 0.18);
      const z = Math.cos(angle) * 0.88 - 0.28;
      const dirY = arch.isUpper ? -1 : 1;

      // Identify tooth type (0-15 from Right 3rd Molar to Left 3rd Molar)
      // Quadrant index from midline (0 = Central Incisor, 7 = 3rd Molar)
      const qIdx = Math.abs(i - 7.5) - 0.5;

      const tGroup = new THREE.Group();
      tGroup.position.set(x, arch.yPos, z);

      // Rotate tooth to face radially outward along arch normal
      const normalAngle = Math.atan2(x, z + 0.1);
      tGroup.rotation.y = normalAngle;

      if (qIdx === 0) {
        // CENTRAL INCISOR (D. incisivus centralis) - Chisel crown with incisal edge
        const crownW = arch.isUpper ? 0.16 : 0.11;
        const crownH = arch.isUpper ? 0.22 : 0.18;
        const crownD = 0.09;
        const incGeo = new THREE.BoxGeometry(crownW, crownH, crownD);
        incGeo.scale(1.0, 1.0, 0.85);
        const incMesh = new THREE.Mesh(incGeo, enamelMat);
        incMesh.position.set(0, dirY * (crownH * 0.5), 0);
        tGroup.add(incMesh);

        // Anatomical root into gum
        const rootGeo = new THREE.ConeGeometry(crownW * 0.42, 0.28, 8);
        const rootMesh = new THREE.Mesh(rootGeo, enamelMat);
        rootMesh.rotation.x = arch.isUpper ? 0 : Math.PI;
        rootMesh.position.set(0, -dirY * 0.14, 0);
        tGroup.add(rootMesh);
      } else if (qIdx === 1) {
        // LATERAL INCISOR (D. incisivus lateralis)
        const crownW = arch.isUpper ? 0.13 : 0.11;
        const crownH = 0.20;
        const crownD = 0.09;
        const incGeo = new THREE.BoxGeometry(crownW, crownH, crownD);
        const incMesh = new THREE.Mesh(incGeo, enamelMat);
        incMesh.position.set(0, dirY * (crownH * 0.5), 0);
        tGroup.add(incMesh);

        const rootGeo = new THREE.ConeGeometry(crownW * 0.42, 0.26, 8);
        const rootMesh = new THREE.Mesh(rootGeo, enamelMat);
        rootMesh.rotation.x = arch.isUpper ? 0 : Math.PI;
        rootMesh.position.set(0, -dirY * 0.13, 0);
        tGroup.add(rootMesh);
      } else if (qIdx === 2) {
        // CANINE (D. caninus) - Strong conical spear-point cusp & labial ridge
        const crownR = 0.09;
        const crownH = 0.26;
        const canGeo = new THREE.ConeGeometry(crownR, crownH, 10);
        canGeo.scale(1.1, 1.0, 0.85);
        const canMesh = new THREE.Mesh(canGeo, enamelMat);
        canMesh.rotation.x = arch.isUpper ? Math.PI : 0;
        canMesh.position.set(0, dirY * (crownH * 0.5), 0);
        tGroup.add(canMesh);

        const rootGeo = new THREE.ConeGeometry(crownR * 0.85, 0.35, 8);
        const rootMesh = new THREE.Mesh(rootGeo, enamelMat);
        rootMesh.rotation.x = arch.isUpper ? 0 : Math.PI;
        rootMesh.position.set(0, -dirY * 0.17, 0);
        tGroup.add(rootMesh);
      } else if (qIdx === 3 || qIdx === 4) {
        // PREMOLARS 1 & 2 (D. premolares) - Bicuspid with buccal & lingual cusps
        const bicuspidGroup = new THREE.Group();
        const bGeo = new THREE.ConeGeometry(0.065, 0.18, 8);
        const bMesh = new THREE.Mesh(bGeo, enamelMat);
        bMesh.rotation.x = arch.isUpper ? Math.PI : 0;
        bMesh.position.set(0, dirY * 0.09, 0.04);
        bicuspidGroup.add(bMesh);

        const lGeo = new THREE.ConeGeometry(0.055, 0.15, 8);
        const lMesh = new THREE.Mesh(lGeo, enamelMat);
        lMesh.rotation.x = arch.isUpper ? Math.PI : 0;
        lMesh.position.set(0, dirY * 0.075, -0.04);
        bicuspidGroup.add(lMesh);

        // Base crown table
        const baseGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.08, 12);
        const baseMesh = new THREE.Mesh(baseGeo, enamelMat);
        baseMesh.position.set(0, dirY * 0.04, 0);
        bicuspidGroup.add(baseMesh);

        tGroup.add(bicuspidGroup);
      } else {
        // MOLARS 1, 2 & 3 (D. molares / Wisdom tooth) - Multicuspid occlusal tables (4-5 cusps)
        const molarGroup = new THREE.Group();
        const mW = qIdx === 7 ? 0.18 : 0.22;
        const mH = 0.16;
        const mGeo = new THREE.BoxGeometry(mW, mH, mW * 0.95);
        const mMesh = new THREE.Mesh(mGeo, enamelMat);
        mMesh.position.set(0, dirY * (mH * 0.5), 0);
        molarGroup.add(mMesh);

        // 4 Occlusal Cusps on biting table
        const cuspR = mW * 0.26;
        const cuspH = 0.07;
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(cOffset => {
          const cGeo = new THREE.ConeGeometry(cuspR, cuspH, 6);
          const cMesh = new THREE.Mesh(cGeo, enamelMat);
          cMesh.rotation.x = arch.isUpper ? Math.PI : 0;
          cMesh.position.set(
            cOffset[0] * cuspR * 0.9,
            dirY * (mH + cuspH * 0.4),
            cOffset[1] * cuspR * 0.9
          );
          molarGroup.add(cMesh);
        });

        // Dual/Triple roots
        [-1, 1].forEach(rSide => {
          const rootGeo = new THREE.ConeGeometry(0.055, 0.28, 6);
          const rootMesh = new THREE.Mesh(rootGeo, enamelMat);
          rootMesh.rotation.x = arch.isUpper ? 0 : Math.PI;
          rootMesh.position.set(rSide * 0.05, -dirY * 0.14, 0);
          molarGroup.add(rootMesh);
        });

        tGroup.add(molarGroup);
      }

      group.add(tGroup);
    }
  });

  // C. THE MUSCULAR TONGUE (Lingua - Dorsum, Sulcus medianus, Sulcus terminalis, Papillae)
  const tongueGroup = new THREE.Group();
  tongueGroup.name = "muscular_tongue";
  tongueGroup.position.set(0, -0.22, 0.02);

  // 1. Muscular Body (Corpus linguae) with natural dorsal arch
  const tongueGeo = new THREE.SphereGeometry(0.68, 32, 28);
  tongueGeo.scale(0.88, 0.42, 1.35);
  const tongueMesh = new THREE.Mesh(tongueGeo, tongueMat);
  tongueGroup.add(tongueMesh);

  // 2. Apex linguae (Tip of tongue)
  const tipGeo = new THREE.ConeGeometry(0.32, 0.42, 16);
  tipGeo.scale(1.0, 0.35, 1.1);
  const tipMesh = new THREE.Mesh(tipGeo, tongueMat);
  tipMesh.rotation.x = Math.PI / 2.2;
  tipMesh.position.set(0, -0.04, 0.85);
  tongueGroup.add(tipMesh);

  // 3. Median Lingual Sulcus (Sulcus medianus linguae)
  const sulcusCurve = [
    new THREE.Vector3(0, 0.08, 0.78),
    new THREE.Vector3(0, 0.09, 0.35),
    new THREE.Vector3(0, 0.07, -0.05),
    new THREE.Vector3(0, 0.02, -0.38)
  ];
  const sulcusMesh = makeTube(sulcusCurve, 0.038, 20, 8, new THREE.MeshStandardMaterial({
    color: 0x9f1239,
    roughness: 0.55
  }));
  tongueGroup.add(sulcusMesh);

  // 4. V-Shaped Terminal Sulcus (Sulcus terminalis) & Foramen Cecum
  const vLeft = [new THREE.Vector3(0, 0.02, -0.38), new THREE.Vector3(-0.35, 0.04, -0.65)];
  const vRight = [new THREE.Vector3(0, 0.02, -0.38), new THREE.Vector3(0.35, 0.04, -0.65)];
  tongueGroup.add(makeTube(vLeft, 0.025, 10, 6, new THREE.MeshStandardMaterial({ color: 0x881337 })));
  tongueGroup.add(makeTube(vRight, 0.025, 10, 6, new THREE.MeshStandardMaterial({ color: 0x881337 })));

  // Foramen caecum
  const foramenMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0x4c0519, roughness: 0.8 })
  );
  foramenMesh.position.set(0, 0.02, -0.38);
  tongueGroup.add(foramenMesh);

  // 5. Circumvallate Papillae (Papillae vallatae - 9 buttons along the V)
  for (let cp = 0; cp < 9; cp++) {
    const t = cp / 8;
    const px = (t - 0.5) * 0.65;
    const pz = -0.38 - Math.abs(px) * 0.8;
    const papGeo = new THREE.CylinderGeometry(0.032, 0.035, 0.025, 10);
    const papMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 });
    const papMesh = new THREE.Mesh(papGeo, papMat);
    papMesh.position.set(px, 0.045, pz);
    tongueGroup.add(papMesh);
  }

  // 6. Sublingual Frenulum (Frenulum linguae on underside)
  const frenGeo = new THREE.BoxGeometry(0.03, 0.22, 0.45);
  const frenMesh = new THREE.Mesh(frenGeo, gingivaMat);
  frenMesh.position.set(0, -0.22, 0.25);
  tongueGroup.add(frenMesh);

  group.add(tongueGroup);

  // D. HARD & SOFT PALATE, UVULA, AND TONSILS
  // 1. Vaulted Palate (Palatum durum & molle)
  const palateGeo = new THREE.SphereGeometry(0.85, 32, 20, 0, Math.PI, 0, Math.PI * 0.55);
  palateGeo.scale(0.92, 0.35, 1.05);
  const palateMesh = new THREE.Mesh(palateGeo, palateMat);
  palateMesh.rotation.x = Math.PI;
  palateMesh.position.set(0, 0.62, 0.08);
  group.add(palateMesh);

  // 2. Transverse Palatine Rugae (Plicae palatinae transversae)
  for (let r = 0; r < 4; r++) {
    const rz = 0.45 - r * 0.14;
    const rCurve = [
      new THREE.Vector3(-0.35, 0.44 + r * 0.02, rz),
      new THREE.Vector3(0.0, 0.52 + r * 0.02, rz + 0.05),
      new THREE.Vector3(0.35, 0.44 + r * 0.02, rz)
    ];
    group.add(makeTube(rCurve, 0.024, 12, 6, gingivaMat));
  }

  // 3. Palatine Uvula (Uvula palatina hanging down from soft palate)
  const uvulaGeo = new THREE.ConeGeometry(0.075, 0.28, 12);
  const uvulaMesh = new THREE.Mesh(uvulaGeo, gingivaMat);
  uvulaMesh.rotation.x = Math.PI;
  uvulaMesh.position.set(0, 0.32, -0.68);
  group.add(uvulaMesh);

  // 4. Palatine Tonsils (Tonsillae palatinae nestled bilaterally)
  [-1, 1].forEach(side => {
    const tonsilGeo = new THREE.DodecahedronGeometry(0.14, 1);
    tonsilGeo.scale(0.7, 1.2, 0.9);
    const tonsilMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.45,
      emissive: 0x881337,
      emissiveIntensity: 0.2
    });
    const tonsilMesh = new THREE.Mesh(tonsilGeo, tonsilMat);
    tonsilMesh.position.set(side * 0.56, 0.05, -0.62);
    group.add(tonsilMesh);

    // Palatoglossal arch (anterior tonsillar pillar)
    const pillarCurve = [
      new THREE.Vector3(side * 0.35, 0.45, -0.55),
      new THREE.Vector3(side * 0.62, 0.12, -0.58),
      new THREE.Vector3(side * 0.48, -0.18, -0.42)
    ];
    group.add(makeTube(pillarCurve, 0.035, 12, 6, gingivaMat));
  });

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

// -------------------------------------------------------------
// 7. HAND & FINGERS MODEL (Digiti manus & Ossa carpi)
// -------------------------------------------------------------
export function createHandFingersModel() {
  const group = new THREE.Group();
  group.name = "hand_fingers";

  // Radius & Ulna Lower Ends
  const radiusLower = new THREE.CylinderGeometry(0.18, 0.24, 1.2, 14);
  const radiusMesh = new THREE.Mesh(radiusLower, BoneMaterial.clone());
  radiusMesh.position.set(-0.45, -1.5, 0);
  group.add(radiusMesh);

  const ulnaLower = new THREE.CylinderGeometry(0.14, 0.18, 1.2, 14);
  const ulnaMesh = new THREE.Mesh(ulnaLower, BoneMaterial.clone());
  ulnaMesh.position.set(0.35, -1.5, 0);
  group.add(ulnaMesh);

  // 8 Carpal Bones (2 rows: proximal & distal)
  const carpalMat = new THREE.MeshStandardMaterial({ color: 0xf1e8d9, roughness: 0.38 });
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const cGeo = new THREE.DodecahedronGeometry(0.14);
      const cMesh = new THREE.Mesh(cGeo, carpalMat);
      cMesh.position.set((col - 1.5) * 0.28, -0.65 + row * 0.26, (Math.random() - 0.5) * 0.06);
      group.add(cMesh);
    }
  }

  // 5 Metacarpals & 14 Phalanges
  const fingers = [
    { id: "thumb", angle: -0.62, metaLen: 0.85, phalanges: [0.45, 0.35], xOffset: -0.65 },
    { id: "index", angle: -0.18, metaLen: 1.15, phalanges: [0.55, 0.38, 0.28], xOffset: -0.28 },
    { id: "middle", angle: 0.0, metaLen: 1.25, phalanges: [0.62, 0.42, 0.3], xOffset: 0.02 },
    { id: "ring", angle: 0.18, metaLen: 1.15, phalanges: [0.54, 0.36, 0.26], xOffset: 0.28 },
    { id: "little", angle: 0.38, metaLen: 0.95, phalanges: [0.44, 0.28, 0.22], xOffset: 0.54 }
  ];

  fingers.forEach(f => {
    // Metacarpal shaft
    const mGeo = new THREE.CylinderGeometry(0.09, 0.11, f.metaLen, 12);
    const mMesh = new THREE.Mesh(mGeo, BoneMaterial.clone());
    const mAngle = f.angle * 0.65;
    mMesh.rotation.z = -mAngle;
    mMesh.position.set(
      f.xOffset + Math.sin(mAngle) * (f.metaLen * 0.5),
      -0.25 + Math.cos(mAngle) * (f.metaLen * 0.5),
      0
    );
    group.add(mMesh);

    // Knuckle joint (Metacarpophalangeal)
    let currX = f.xOffset + Math.sin(mAngle) * f.metaLen;
    let currY = -0.25 + Math.cos(mAngle) * f.metaLen;

    const knuckleGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const knuckle = new THREE.Mesh(knuckleGeo, CartilageMaterial);
    knuckle.position.set(currX, currY, 0);
    group.add(knuckle);

    // Phalanges sequence
    f.phalanges.forEach((pLen, pIdx) => {
      const pGeo = new THREE.CylinderGeometry(0.075 - pIdx * 0.012, 0.085 - pIdx * 0.012, pLen, 12);
      const pMesh = new THREE.Mesh(pGeo, BoneMaterial.clone());
      pMesh.rotation.z = -f.angle;
      pMesh.position.set(
        currX + Math.sin(f.angle) * (pLen * 0.5),
        currY + Math.cos(f.angle) * (pLen * 0.5),
        0
      );
      group.add(pMesh);

      // Interphalangeal joint
      currX += Math.sin(f.angle) * pLen;
      currY += Math.cos(f.angle) * pLen;

      if (pIdx < f.phalanges.length - 1) {
        const jointGeo = new THREE.SphereGeometry(0.095 - pIdx * 0.01, 10, 10);
        const jointMesh = new THREE.Mesh(jointGeo, CartilageMaterial);
        jointMesh.position.set(currX, currY, 0);
        group.add(jointMesh);
      }
    });
  });

  group.scale.set(1.2, 1.2, 1.2);
  group.position.y = 0.4;
  return group;
}

// -------------------------------------------------------------
// 8. NERVOUS SYSTEM MODEL (Systema nervosum, Columna vertebralis et Medulla spinalis)
// -------------------------------------------------------------
export function createNervousSystemModel() {
  const group = new THREE.Group();
  group.name = "nervous_system";

  // 1. BRAIN (Encephalon - Anatomically Convoluted Lobes, Cerebellum & Brainstem)
  const brainGroup = new THREE.Group();
  brainGroup.position.set(0, 2.25, 0);

  // Helper to generate organic convoluted cortex with gyri & sulci grooves
  const makeCortexGeo = (radius, sx, sy, sz) => {
    const geo = new THREE.SphereGeometry(radius, 28, 24);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const gyrus = Math.sin(x * 18) * Math.cos(y * 16) * Math.sin(z * 18) * 0.028
                  + Math.sin(y * 28 + z * 20) * 0.015;
      const len = Math.sqrt(x * x + y * y + z * z) || 1.0;
      const factor = (len + gyrus) / len;
      pos.setXYZ(i, x * factor * sx, y * factor * sy, z * factor * sz);
    }
    geo.computeVertexNormals();
    return geo;
  };

  // Helper for cerebellar horizontal folia
  const makeFoliaGeo = (radius, sx, sy, sz) => {
    const geo = new THREE.SphereGeometry(radius, 28, 22);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const folia = Math.sin(y * 48) * 0.02;
      const len = Math.sqrt(x * x + y * y + z * z) || 1.0;
      const factor = (len + folia) / len;
      pos.setXYZ(i, x * factor * sx, y * factor * sy, z * factor * sz);
    }
    geo.computeVertexNormals();
    return geo;
  };

  // Left & Right Cerebral Hemispheres with distinct anatomical lobes
  [-1, 1].forEach(side => {
    // Frontal Lobe (Peshona bo'lagi - Sky Blue)
    const frontGeo = makeCortexGeo(0.42, 0.85, 0.95, 1.15);
    const frontMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.38 });
    const frontMesh = new THREE.Mesh(frontGeo, frontMat);
    frontMesh.position.set(side * 0.32, 0.18, 0.28);
    brainGroup.add(frontMesh);

    // Parietal Lobe (Tepa bo'lagi - Emerald Green)
    const pariGeo = makeCortexGeo(0.4, 0.85, 1.05, 1.0);
    const pariMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.38 });
    const pariMesh = new THREE.Mesh(pariGeo, pariMat);
    pariMesh.position.set(side * 0.34, 0.28, -0.15);
    brainGroup.add(pariMesh);

    // Occipital Lobe (Ensa bo'lagi - Amber Gold)
    const occGeo = makeCortexGeo(0.32, 0.8, 0.85, 0.95);
    const occMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.38 });
    const occMesh = new THREE.Mesh(occGeo, occMat);
    occMesh.position.set(side * 0.28, 0.05, -0.48);
    brainGroup.add(occMesh);

    // Temporal Lobe (Chakka bo'lagi - Lavender Purple)
    const tempGeo = makeCortexGeo(0.35, 0.75, 0.8, 1.1);
    const tempMat = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.38 });
    const tempMesh = new THREE.Mesh(tempGeo, tempMat);
    tempMesh.position.set(side * 0.42, -0.12, 0.05);
    brainGroup.add(tempMesh);

    // Cerebellar Hemisphere (Miyacha yarimshari - Coral Red with folia)
    const cereGeo = makeFoliaGeo(0.32, 0.9, 0.8, 0.85);
    const cereMat = new THREE.MeshStandardMaterial({ color: 0xf87171, roughness: 0.42 });
    const cereMesh = new THREE.Mesh(cereGeo, cereMat);
    cereMesh.position.set(side * 0.24, -0.32, -0.35);
    brainGroup.add(cereMesh);
  });

  // Brainstem (Miya ustuni: Midbrain, Pons & Medulla oblongata - Ivory)
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.1, -0.05),
    new THREE.Vector3(0, -0.35, -0.1),
    new THREE.Vector3(0, -0.65, -0.15)
  ]);
  const stemMat = new THREE.MeshStandardMaterial({ color: 0xf5eee6, roughness: 0.35 });
  brainGroup.add(makeTube(stemCurve.points, 0.14, 16, 12, stemMat));

  group.add(brainGroup);

  // 2. VERTEBRAL COLUMN (Columna vertebralis - Complete 24 Vertebrae, Discs, Sacrum & Coccyx)
  const spineGroup = new THREE.Group();
  const vertSections = [
    { count: 7, scale: 0.72, id: 'cervical' },
    { count: 12, scale: 0.96, id: 'thoracic' },
    { count: 5, scale: 1.25, id: 'lumbar' }
  ];

  let currentVertY = 1.6;
  vertSections.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      const vUnit = new THREE.Group();

      // Vertebral Body (Corpus vertebrae)
      const bodyGeo = new THREE.CylinderGeometry(0.22 * sec.scale, 0.24 * sec.scale, 0.09 * sec.scale, 16);
      const bodyMesh = new THREE.Mesh(bodyGeo, BoneMaterial.clone());
      bodyMesh.position.set(0, 0, 0.12 * sec.scale);
      vUnit.add(bodyMesh);

      // Spinous Process (Processus spinosus)
      const spGeo = new THREE.ConeGeometry(0.06 * sec.scale, 0.38 * sec.scale, 6);
      const spMesh = new THREE.Mesh(spGeo, BoneMaterial.clone());
      spMesh.rotation.x = -Math.PI / 2.25;
      spMesh.position.set(0, -0.04, -0.28 * sec.scale);
      vUnit.add(spMesh);

      // Transverse Processes (Processus transversi)
      [-1, 1].forEach(side => {
        const trGeo = new THREE.BoxGeometry(0.28 * sec.scale, 0.06 * sec.scale, 0.09 * sec.scale);
        const trMesh = new THREE.Mesh(trGeo, BoneMaterial.clone());
        trMesh.position.set(side * 0.26 * sec.scale, 0, 0);
        vUnit.add(trMesh);
      });

      // Intervertebral Disc (Discus intervertebralis - Cartilage)
      const discGeo = new THREE.CylinderGeometry(0.23 * sec.scale, 0.23 * sec.scale, 0.035 * sec.scale, 16);
      const discMesh = new THREE.Mesh(discGeo, CartilageMaterial.clone());
      discMesh.position.set(0, -0.065 * sec.scale, 0.12 * sec.scale);
      vUnit.add(discMesh);

      let zCurve = 0;
      if (sec.id === 'cervical') zCurve = 0.04;
      else if (sec.id === 'thoracic') zCurve = -0.12 * Math.sin((i / 12) * Math.PI);
      else if (sec.id === 'lumbar') zCurve = 0.1 * Math.sin((i / 5) * Math.PI);

      vUnit.position.set(0, currentVertY, zCurve);
      spineGroup.add(vUnit);
      currentVertY -= 0.13 * sec.scale;
    }
  });

  // Sacrum & Coccyx
  const sacrumGeo = new THREE.ConeGeometry(0.48, 0.72, 6);
  sacrumGeo.scale(1.15, 1, 0.6);
  const sacrumMesh = new THREE.Mesh(sacrumGeo, BoneMaterial.clone());
  sacrumMesh.rotation.x = 0.32;
  sacrumMesh.position.set(0, currentVertY - 0.3, -0.06);
  spineGroup.add(sacrumMesh);

  group.add(spineGroup);

  // 3. SPINAL CORD (Medulla spinalis - Luminous Golden Core with Enlargements & Cauda Equina)
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.7, -0.15),
    new THREE.Vector3(0, 1.25, -0.1),  // Cervical enlargement
    new THREE.Vector3(0, 0.4, -0.18),   // Thoracic cord
    new THREE.Vector3(0, -0.3, -0.08),  // Lumbar enlargement
    new THREE.Vector3(0, -0.7, -0.05)   // Conus medullaris at L1-L2
  ]);
  const cordMesh = makeTube(cordCurve.points, 0.09, 36, 12, NerveMaterial);
  group.add(cordMesh);

  // Cauda Equina ("Ot dumi" - Dense descending filaments in lumbosacral canal)
  for (let c = 0; c < 16; c++) {
    const spread = (c - 7.5) * 0.022;
    const caudaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.65, -0.05),
      new THREE.Vector3(spread * 0.7, -1.2, -0.06 + Math.abs(spread) * 0.2),
      new THREE.Vector3(spread * 1.2, -1.8, -0.08)
    ]);
    group.add(makeTube(caudaCurve.points, 0.018, 18, 6, NerveMaterial));
  }

  // 4. CRANIAL NERVES (12 pairs emerging from brainstem)
  [-1, 1].forEach(side => {
    // Optic Nerves (II) with Optic Chiasm
    const opticCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.95, 0.05),
      new THREE.Vector3(side * 0.15, 1.98, 0.22),
      new THREE.Vector3(side * 0.35, 2.05, 0.48)
    ]);
    group.add(makeTube(opticCurve.points, 0.04, 14, 6, NerveMaterial));

    // Trigeminal Nerve (V - thick root)
    const trigemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.12, 1.82, -0.08),
      new THREE.Vector3(side * 0.42, 1.78, 0.08),
      new THREE.Vector3(side * 0.65, 1.72, 0.28)
    ]);
    group.add(makeTube(trigemCurve.points, 0.042, 14, 6, NerveMaterial));

    // Vagus Nerve (X - long descending parasympathetic trunk)
    const vagusCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.14, 1.68, -0.12),
      new THREE.Vector3(side * 0.24, 1.15, -0.04),
      new THREE.Vector3(side * 0.28, 0.45, 0.02),
      new THREE.Vector3(side * 0.22, -0.2, 0.05)
    ]);
    group.add(makeTube(vagusCurve.points, 0.038, 24, 6, NerveMaterial));
  });

  // 5. 31 PAIRS OF SPINAL NERVES (With Dorsal Root Ganglia)
  for (let i = 0; i < 24; i++) {
    const y = 1.55 - i * 0.095;
    const isThoracic = (i >= 7 && i < 19);
    const ribWidth = isThoracic ? 0.75 + Math.sin(((i - 7) / 12) * Math.PI) * 0.45 : 0.45;

    [-1, 1].forEach(side => {
      // Intervertebral nerve root
      const nerveRib = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.07, y, -0.1),
        new THREE.Vector3(side * (ribWidth * 0.5), y - 0.04, 0.02),
        new THREE.Vector3(side * ribWidth, y - 0.1, 0.18)
      ]);
      group.add(makeTube(nerveRib.points, 0.028, 14, 6, NerveMaterial));

      // Dorsal Root Ganglion (Spinal ganglion nodule)
      const drgGeo = new THREE.SphereGeometry(0.042, 8, 8);
      const drgMesh = new THREE.Mesh(drgGeo, NerveMaterial);
      drgMesh.position.set(side * 0.16, y - 0.015, -0.08);
      group.add(drgMesh);
    });
  }

  // 6. BRACHIAL PLEXUS & ARM NERVES (Median, Ulnar, Radial, Musculocutaneous)
  [-1, 1].forEach(side => {
    // Brachial Plexus Root
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.16, 1.35, -0.08),
      new THREE.Vector3(side * 0.48, 1.25, 0.02),
      new THREE.Vector3(side * 0.85, 1.05, 0.05)
    ]);
    group.add(makeTube(trunkCurve.points, 0.065, 16, 8, NerveMaterial));

    // Median & Ulnar Nerves down forearm to hand
    const medianArm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.85, 1.05, 0.05),
      new THREE.Vector3(side * 1.35, 0.55, 0.02),
      new THREE.Vector3(side * 1.75, -0.05, 0.03),
      new THREE.Vector3(side * 2.05, -0.65, 0.05)
    ]);
    group.add(makeTube(medianArm.points, 0.048, 22, 6, NerveMaterial));

    const radialArm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.85, 1.05, 0.05),
      new THREE.Vector3(side * 1.28, 0.6, -0.05),
      new THREE.Vector3(side * 1.82, -0.02, -0.04),
      new THREE.Vector3(side * 2.12, -0.62, 0.0)
    ]);
    group.add(makeTube(radialArm.points, 0.042, 22, 6, NerveMaterial));
  });

  // 7. LUMBOSACRAL PLEXUS & SCIATIC NERVES (Nervus ischiadicus - Thicker nerve trunks)
  [-1, 1].forEach(side => {
    // Sciatic Nerve Trunk (Main motor/sensory highway to lower limb)
    const sciatic = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.22, -0.75, -0.05),
      new THREE.Vector3(side * 0.52, -1.35, -0.12),
      new THREE.Vector3(side * 0.65, -2.1, -0.08),
      new THREE.Vector3(side * 0.68, -2.85, -0.05)
    ]);
    group.add(makeTube(sciatic.points, 0.08, 24, 8, NerveMaterial));

    // Bifurcation into Tibial & Common Peroneal Nerves
    const tibial = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.68, -2.85, -0.05),
      new THREE.Vector3(side * 0.66, -3.55, -0.02),
      new THREE.Vector3(side * 0.68, -4.2, 0.05)
    ]);
    group.add(makeTube(tibial.points, 0.05, 20, 6, NerveMaterial));

    const peroneal = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.68, -2.85, -0.05),
      new THREE.Vector3(side * 0.78, -3.45, 0.05),
      new THREE.Vector3(side * 0.76, -4.15, 0.12)
    ]);
    group.add(makeTube(peroneal.points, 0.042, 20, 6, NerveMaterial));
  });

  group.scale.set(0.92, 0.92, 0.92);
  group.position.y = 0.5;
  return group;
}

// -------------------------------------------------------------
// 9. CIRCULATORY SYSTEM MODEL (Systema cardiovasculare - Real Anatomical Tree)
// -------------------------------------------------------------
export function createCirculatorySystemModel() {
  const group = new THREE.Group();
  group.name = "circulatory_system";

  // 1. ANATOMICAL BEATING HEART IN CENTER
  const heartSub = createHeartModel();
  heartSub.scale.set(0.55, 0.55, 0.55);
  heartSub.position.set(0, 0.62, 0.1);
  group.add(heartSub);

  // 2. ARTERIAL SYSTEM (High-Gloss Arterial Crimson: #dc2626)
  // Aortic Arch & Descending Thoracic / Abdominal Aorta
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.06, 0.82, 0.12),
    new THREE.Vector3(-0.04, 1.25, 0.14), // Ascending aorta
    new THREE.Vector3(0.06, 1.42, 0.0),    // Arcus aortae
    new THREE.Vector3(0.18, 1.28, -0.15),  // Arch curve
    new THREE.Vector3(0.08, 0.7, -0.12),   // Descending thoracic aorta
    new THREE.Vector3(0.06, 0.0, -0.1),    // Diaphragm level
    new THREE.Vector3(0.05, -0.65, -0.08), // Abdominal aorta
    new THREE.Vector3(0.04, -1.35, -0.06)  // Bifurcation at L4
  ]);
  group.add(makeTube(aortaCurve.points, 0.12, 36, 14, AortaMaterial));

  // 3 Aortic Arch Branches:
  // 1) Brachiocephalic Trunk -> Right Subclavian & Right Carotid
  const brachioCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.04, 1.38, 0.05),
    new THREE.Vector3(0.2, 1.62, 0.05)
  ]);
  group.add(makeTube(brachioCurve.points, 0.065, 12, 8, AortaMaterial));

  // 2) Left Common Carotid Artery (To Head)
  // 3) Left Subclavian Artery (To Left Arm)
  [-1, 1].forEach(side => {
    // Common Carotid Arteries -> Internal & External Carotids
    const carotid = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.12, 1.5, 0.04),
      new THREE.Vector3(side * 0.18, 1.95, 0.06),
      new THREE.Vector3(side * 0.22, 2.35, 0.08) // Base of skull
    ]);
    group.add(makeTube(carotid.points, 0.055, 18, 8, AortaMaterial));

    // Circle of Willis (Circulus arteriosus cerebri) at skull base
    const circleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.22, 2.35, 0.08),
      new THREE.Vector3(side * 0.28, 2.55, 0.14),
      new THREE.Vector3(side * 0.12, 2.65, 0.2)
    ]);
    group.add(makeTube(circleCurve.points, 0.035, 14, 6, AortaMaterial));

    // Subclavian, Axillary, Brachial, Radial and Ulnar Arteries
    const armArtery = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.22, 1.45, 0.02),
      new THREE.Vector3(side * 0.75, 1.25, 0.02), // Subclavian / Axillary
      new THREE.Vector3(side * 1.35, 0.75, 0.0),  // Brachial artery
      new THREE.Vector3(side * 1.78, 0.15, 0.02), // Cubital fossa
      new THREE.Vector3(side * 2.1, -0.55, 0.05)  // Radial / Ulnar into Palmar Arch
    ]);
    group.add(makeTube(armArtery.points, 0.06, 24, 8, AortaMaterial));

    // Palmar Arch & Digital Arteries in hand
    [-0.04, 0, 0.04].forEach(d => {
      const digitalArt = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 2.1, -0.55, 0.05),
        new THREE.Vector3(side * (2.18 + d), -0.78, 0.06)
      ]);
      group.add(makeTube(digitalArt.points, 0.022, 8, 6, AortaMaterial));
    });
  });

  // Intercostal Arteries (9 pairs wrapping laterally around rib cage)
  for (let r = 0; r < 8; r++) {
    const y = 0.95 - r * 0.12;
    const ribW = 0.72 + Math.sin((r / 8) * Math.PI) * 0.42;
    [-1, 1].forEach(side => {
      const ribArt = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, y, -0.12),
        new THREE.Vector3(side * (ribW * 0.5), y - 0.02, 0.0),
        new THREE.Vector3(side * ribW, y - 0.06, 0.15)
      ]);
      group.add(makeTube(ribArt.points, 0.024, 14, 6, AortaMaterial));
    });
  }

  // Abdominal Branches: Celiac Trunk, Mesenteric & Renal Arteries
  const celiac = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.06, 0.15, -0.08),
    new THREE.Vector3(0.02, 0.12, 0.12),
    new THREE.Vector3(-0.35, 0.16, 0.18) // Splenic artery
  ]);
  group.add(makeTube(celiac.points, 0.045, 12, 6, AortaMaterial));

  [-1, 1].forEach(side => {
    // Renal Arteries branching into kidneys
    const renalArt = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, -0.15, -0.08),
      new THREE.Vector3(side * 0.55, -0.18, -0.04),
      new THREE.Vector3(side * 0.88, -0.22, 0.0)
    ]);
    group.add(makeTube(renalArt.points, 0.05, 14, 6, AortaMaterial));
  });

  // Aortic Bifurcation -> Common Iliac, Internal & External Iliac, Femoral Arteries
  [-1, 1].forEach(side => {
    const legArtery = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.04, -1.35, -0.06),
      new THREE.Vector3(side * 0.42, -1.82, -0.04), // Common iliac
      new THREE.Vector3(side * 0.58, -2.45, 0.0),   // Femoral artery
      new THREE.Vector3(side * 0.62, -3.2, -0.04),  // Popliteal artery
      new THREE.Vector3(side * 0.65, -4.0, 0.02),   // Anterior/posterior tibial
      new THREE.Vector3(side * 0.68, -4.4, 0.15)    // Dorsalis pedis
    ]);
    group.add(makeTube(legArtery.points, 0.07, 30, 8, AortaMaterial));
  });

  // 3. VENOUS SYSTEM (Deep Royal Blue: #1d4ed8)
  // Superior Vena Cava (SVC)
  const svcCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 1.45, 0.0),
    new THREE.Vector3(0.22, 1.05, 0.04),
    new THREE.Vector3(0.18, 0.72, 0.08) // Entering Right Atrium
  ]);
  group.add(makeTube(svcCurve.points, 0.14, 18, 12, VeinMaterial));

  // Inferior Vena Cava (IVC)
  const ivcCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, 0.52, 0.08),
    new THREE.Vector3(0.16, 0.0, -0.06),
    new THREE.Vector3(0.15, -0.65, -0.06),
    new THREE.Vector3(0.14, -1.35, -0.05) // Confluence of iliac veins
  ]);
  group.add(makeTube(ivcCurve.points, 0.15, 24, 12, VeinMaterial));

  // Jugular Veins & Arm Veins (Cephalic / Basilic / Subclavian)
  [-1, 1].forEach(side => {
    // Internal & External Jugular Veins from head
    const jugular = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.35, 2.3, 0.06),
      new THREE.Vector3(side * 0.3, 1.85, 0.03),
      new THREE.Vector3(side * 0.26, 1.45, 0.0)
    ]);
    group.add(makeTube(jugular.points, 0.07, 18, 8, VeinMaterial));

    // Arm Veins (Cephalic & Basilic)
    const armVein = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.28, 1.45, 0.0),
      new THREE.Vector3(side * 0.85, 1.2, -0.02),
      new THREE.Vector3(side * 1.42, 0.7, -0.03),
      new THREE.Vector3(side * 1.85, 0.1, -0.02),
      new THREE.Vector3(side * 2.15, -0.58, 0.02)
    ]);
    group.add(makeTube(armVein.points, 0.072, 24, 8, VeinMaterial));

    // Renal Veins
    const renalVein = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.16, -0.2, -0.06),
      new THREE.Vector3(side * 0.55, -0.22, -0.02),
      new THREE.Vector3(side * 0.88, -0.26, 0.02)
    ]);
    group.add(makeTube(renalVein.points, 0.065, 14, 6, VeinMaterial));

    // Common Iliac, Femoral & Great Saphenous Veins (Legs)
    const legVein = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.14, -1.35, -0.05),
      new THREE.Vector3(side * 0.52, -1.8, -0.03),
      new THREE.Vector3(side * 0.68, -2.42, 0.01),
      new THREE.Vector3(side * 0.72, -3.18, -0.02),
      new THREE.Vector3(side * 0.74, -3.98, 0.03),
      new THREE.Vector3(side * 0.75, -4.38, 0.12)
    ]);
    group.add(makeTube(legVein.points, 0.082, 30, 8, VeinMaterial));
  });

  // 4. PULMONARY CIRCULATION (Truncus pulmonalis & 4 Pulmonary Veins)
  // Pulmonary trunk branching to Left & Right Pulmonary Arteries (Cyan-Blue)
  const pTrunk = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.72, 0.28),
    new THREE.Vector3(0.0, 0.98, 0.22),
    new THREE.Vector3(-0.24, 1.12, 0.08)
  ]);
  group.add(makeTube(pTrunk.points, 0.12, 16, 10, PulmonaryArteryMaterial));

  [-1, 1].forEach(side => {
    const pBranch = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.12, 1.05, 0.14),
      new THREE.Vector3(side * 0.45, 1.02, -0.05),
      new THREE.Vector3(side * 0.85, 0.95, -0.15) // Into lungs
    ]);
    group.add(makeTube(pBranch.points, 0.08, 16, 8, PulmonaryArteryMaterial));

    // Pulmonary Veins (Red) entering Left Atrium
    const pVein = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.82, 0.75, -0.12),
      new THREE.Vector3(side * 0.42, 0.68, -0.05),
      new THREE.Vector3(side * 0.12, 0.65, 0.02)
    ]);
    group.add(makeTube(pVein.points, 0.065, 14, 8, AortaMaterial));
  });

  group.scale.set(0.92, 0.92, 0.92);
  group.position.y = 0.55;
  return group;
}

// -------------------------------------------------------------
// 10. RESPIRATORY SYSTEM MODEL (Systema respiratorium)
// -------------------------------------------------------------
export function createRespiratorySystemModel() {
  const group = new THREE.Group();
  group.name = "respiratory_system";

  // Nasal Cavity & Pharynx
  const nasalGeo = new THREE.ConeGeometry(0.35, 0.7, 12);
  const nasalMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.35 });
  const nasalMesh = new THREE.Mesh(nasalGeo, nasalMat);
  nasalMesh.position.set(0, 2.3, 0.1);
  group.add(nasalMesh);

  // Larynx (Thyroid & Cricoid Cartilage)
  const larynxGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.48, 14);
  const larynxMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.3 });
  const larynxMesh = new THREE.Mesh(larynxGeo, larynxMat);
  larynxMesh.position.set(0, 1.7, 0.05);
  group.add(larynxMesh);

  // Trachea with Cartilage Rings
  const tracheaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.45, 0.05),
    new THREE.Vector3(0, 0.65, 0.0)
  ]);
  group.add(makeTube(tracheaCurve.points, 0.16, 16, 12, CartilageMaterial));

  // Trachea Rings
  for (let r = 0; r < 8; r++) {
    const ringGeo = new THREE.TorusGeometry(0.18, 0.025, 8, 20);
    const ringMesh = new THREE.Mesh(ringGeo, CartilageMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 1.35 - r * 0.09, 0.02);
    group.add(ringMesh);
  }

  // Left & Right Bronchi
  [-1, 1].forEach((side, idx) => {
    const bronchus = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.65, 0),
      new THREE.Vector3(side * 0.45, 0.42, 0.02),
      new THREE.Vector3(side * 0.75, 0.2, 0.05)
    ]);
    group.add(makeTube(bronchus.points, 0.1, 14, 10, CartilageMaterial));
  });

  // Lungs: Left (2 lobes) & Right (3 lobes) - Translucent Rose
  const lungMat = new THREE.MeshStandardMaterial({
    color: 0xf87171,
    roughness: 0.4,
    transparent: true,
    opacity: 0.88
  });

  // Right Lung (Larger, 3 lobes)
  const rLungGeo = new THREE.SphereGeometry(0.85, 24, 24);
  rLungGeo.scale(0.95, 1.6, 0.9);
  const rLung = new THREE.Mesh(rLungGeo, lungMat);
  rLung.position.set(0.9, 0.2, 0);
  group.add(rLung);

  // Left Lung (Smaller, with cardiac notch)
  const lLungGeo = new THREE.SphereGeometry(0.78, 24, 24);
  lLungGeo.scale(0.85, 1.55, 0.85);
  const lLung = new THREE.Mesh(lLungGeo, lungMat);
  lLung.position.set(-0.85, 0.2, 0);
  group.add(lLung);

  group.scale.set(1.2, 1.2, 1.2);
  group.position.y = 0.2;
  return group;
}

// -------------------------------------------------------------
// 11. DIGESTIVE SYSTEM MODEL (Systema digestorium)
// -------------------------------------------------------------
export function createDigestiveSystemModel() {
  const group = new THREE.Group();
  group.name = "digestive_system";

  // Esophagus (Muscular pink tube from throat)
  const esoCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.0, -0.15),
    new THREE.Vector3(0, 1.1, -0.12),
    new THREE.Vector3(-0.05, 0.55, -0.05)
  ]);
  const esoMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
  group.add(makeTube(esoCurve.points, 0.12, 20, 10, esoMat));

  // Stomach (J-shaped Gaster)
  const stomachGeo = new THREE.SphereGeometry(0.68, 24, 24);
  stomachGeo.scale(1.2, 0.9, 0.85);
  const stomachMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.35 });
  const stomach = new THREE.Mesh(stomachGeo, stomachMat);
  stomach.position.set(-0.35, 0.35, 0.1);
  stomach.rotation.z = -0.3;
  group.add(stomach);

  // Liver (Right and left lobes - reddish brown)
  const liverGeo = new THREE.ConeGeometry(1.1, 1.3, 16);
  liverGeo.scale(1.4, 0.7, 0.9);
  const liverMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.4 });
  const liver = new THREE.Mesh(liverGeo, liverMat);
  liver.rotation.z = 0.8;
  liver.position.set(0.65, 0.55, 0.05);
  group.add(liver);

  // Gallbladder (Green sac under liver)
  const gbGeo = new THREE.SphereGeometry(0.24, 16, 14);
  gbGeo.scale(0.8, 1.4, 0.8);
  const gb = new THREE.Mesh(gbGeo, BileGreenMaterial);
  gb.position.set(0.42, 0.22, 0.4);
  group.add(gb);

  // Pancreas (Tucked behind stomach)
  const pancGeo = new THREE.CylinderGeometry(0.12, 0.16, 1.0, 12);
  const panc = new THREE.Mesh(pancGeo, PancreasYellowMaterial);
  panc.rotation.z = Math.PI / 2.2;
  panc.position.set(-0.15, 0.1, -0.05);
  group.add(panc);

  // Large Intestine / Colon (Framing the abdomen)
  const colonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.85, -1.2, 0.1),  // Cecum
    new THREE.Vector3(0.9, -0.2, 0.1),   // Ascending Colon
    new THREE.Vector3(0.6, 0.05, 0.15),  // Hepatic Flexure
    new THREE.Vector3(0.0, -0.05, 0.2),  // Transverse Colon
    new THREE.Vector3(-0.6, 0.05, 0.15), // Splenic Flexure
    new THREE.Vector3(-0.85, -0.3, 0.1), // Descending Colon
    new THREE.Vector3(-0.7, -1.1, 0.05), // Sigmoid Colon
    new THREE.Vector3(0, -1.4, -0.05)    // Rectum
  ]);
  const colonMat = new THREE.MeshStandardMaterial({ color: 0xfca5a5, roughness: 0.45 });
  group.add(makeTube(colonCurve.points, 0.22, 32, 14, colonMat));

  // Small Intestine (Dense central loops)
  const smallIntGroup = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const sGeo = new THREE.TorusGeometry(0.35 + (i % 3) * 0.08, 0.09, 8, 16, Math.PI * 1.5);
    const sMat = new THREE.MeshStandardMaterial({ color: 0xfecdd3, roughness: 0.4 });
    const sMesh = new THREE.Mesh(sGeo, sMat);
    sMesh.position.set(((i % 3) - 1) * 0.28, -0.55 - Math.floor(i / 3) * 0.22, 0.12);
    sMesh.rotation.z = i * 0.4;
    smallIntGroup.add(sMesh);
  }
  group.add(smallIntGroup);

  group.scale.set(1.15, 1.15, 1.15);
  group.position.y = 0.2;
  return group;
}

// -------------------------------------------------------------
// 12. MUSCULOSKELETAL SYSTEM MODEL (Systema musculoskeletale)
// -------------------------------------------------------------
export function createMusculoskeletalSystemModel() {
  const group = new THREE.Group();
  group.name = "musculoskeletal_system";

  // Reusable tube helper
  const makeSeg = (pts, radius = 0.05, segs = 14, rSegs = 8, mat = BoneMaterial) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, segs, radius, rSegs, false);
    const mesh = new THREE.Mesh(geo, mat.clone());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  // 1. AXIAL SKELETON: CRANIUM, SPINE, THORAX & PELVIS
  // A. Cranium & Facial Skeleton (Skull)
  const skullGroup = new THREE.Group();
  skullGroup.position.set(0, 1.82, 0);

  // Calvaria / Cranial Vault
  const calvGeo = new THREE.SphereGeometry(0.38, 28, 24);
  calvGeo.scale(0.88, 1.05, 1.12);
  const calvMesh = new THREE.Mesh(calvGeo, BoneMaterial.clone());
  skullGroup.add(calvMesh);

  // Facial Skeleton & Maxilla
  const faceGeo = new THREE.BoxGeometry(0.36, 0.32, 0.34);
  const faceMesh = new THREE.Mesh(faceGeo, BoneMaterial.clone());
  faceMesh.position.set(0, -0.22, 0.16);
  skullGroup.add(faceMesh);

  // Orbits (Eye sockets)
  [-1, 1].forEach(side => {
    const orbGeo = new THREE.TorusGeometry(0.09, 0.024, 8, 16);
    const orbMesh = new THREE.Mesh(orbGeo, BoneMaterial.clone());
    orbMesh.position.set(side * 0.14, -0.14, 0.33);
    skullGroup.add(orbMesh);
  });

  // Mandible (Jawbone with chin and ramus)
  const jawCurve = [
    new THREE.Vector3(-0.24, -0.15, 0.02),
    new THREE.Vector3(-0.22, -0.38, 0.18),
    new THREE.Vector3(0.00, -0.42, 0.34),
    new THREE.Vector3(0.22, -0.38, 0.18),
    new THREE.Vector3(0.24, -0.15, 0.02)
  ];
  skullGroup.add(makeSeg(jawCurve, 0.042, 18, 8, BoneMaterial));
  group.add(skullGroup);

  // B. Cervical Vertebral Column (C1-C7)
  for (let c = 0; c < 7; c++) {
    const cy = 1.62 - c * 0.06;
    const cvGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.04, 16);
    const cvMesh = new THREE.Mesh(cvGeo, BoneMaterial.clone());
    cvMesh.position.set(0, cy, -0.04);
    group.add(cvMesh);

    // Intervertebral disc
    const cdGeo = new THREE.CylinderGeometry(0.125, 0.125, 0.018, 16);
    const cdMesh = new THREE.Mesh(cdGeo, CartilageMaterial.clone());
    cdMesh.position.set(0, cy - 0.025, -0.04);
    group.add(cdMesh);
  }

  // C. Thoracic Cage & Vertebral Axis
  // 12 Thoracic Vertebrae & Spinous processes
  for (let t = 0; t < 12; t++) {
    const ty = 1.18 - t * 0.085;
    const tz = -0.06 - Math.sin((t / 12) * Math.PI) * 0.05;
    const tvGeo = new THREE.CylinderGeometry(0.14 + t * 0.004, 0.15 + t * 0.004, 0.055, 16);
    const tvMesh = new THREE.Mesh(tvGeo, BoneMaterial.clone());
    tvMesh.position.set(0, ty, tz);
    group.add(tvMesh);

    // Spinous process pointing posteroinferiorly
    const spGeo = new THREE.ConeGeometry(0.04, 0.18, 6);
    const spMesh = new THREE.Mesh(spGeo, BoneMaterial.clone());
    spMesh.rotation.x = -Math.PI / 2.3;
    spMesh.position.set(0, ty - 0.02, tz - 0.14);
    group.add(spMesh);
  }

  // Sternum (Manubrium, Body, Xiphoid process)
  const sternumCurve = [
    new THREE.Vector3(0, 1.15, 0.32),
    new THREE.Vector3(0, 0.85, 0.36),
    new THREE.Vector3(0, 0.52, 0.30),
    new THREE.Vector3(0, 0.38, 0.24) // Xiphoid
  ];
  group.add(makeSeg(sternumCurve, 0.065, 18, 8, BoneMaterial));

  // Clavicles (Collar bones - S-curve from manubrium to shoulders)
  [-1, 1].forEach(side => {
    const clavCurve = [
      new THREE.Vector3(side * 0.08, 1.18, 0.30),
      new THREE.Vector3(side * 0.38, 1.20, 0.22),
      new THREE.Vector3(side * 0.68, 1.15, 0.08)
    ];
    group.add(makeSeg(clavCurve, 0.045, 16, 8, BoneMaterial));
  });

  // Scapulae (Shoulder blades dorsal plates)
  [-1, 1].forEach(side => {
    const scapGeo = new THREE.BoxGeometry(0.36, 0.48, 0.04);
    const scapMesh = new THREE.Mesh(scapGeo, BoneMaterial.clone());
    scapMesh.position.set(side * 0.46, 0.95, -0.22);
    scapMesh.rotation.y = -side * 0.25;
    group.add(scapMesh);
  });

  // 12 Pairs of True & False Ribs (Costa)
  for (let r = 0; r < 12; r++) {
    const ry = 1.14 - r * 0.075;
    const rzVertebra = -0.06 - Math.sin((r / 12) * Math.PI) * 0.05;
    const rWidth = 0.36 + Math.sin((r / 12) * Math.PI) * 0.32;
    const antY = 1.12 - r * 0.068;

    [-1, 1].forEach(side => {
      const ribPts = [
        new THREE.Vector3(side * 0.08, ry, rzVertebra),
        new THREE.Vector3(side * (rWidth * 0.7), ry - 0.02, -0.15),
        new THREE.Vector3(side * rWidth, ry - 0.05, 0.08),
        new THREE.Vector3(side * (rWidth * 0.6), antY - 0.06, 0.30),
        new THREE.Vector3(side * 0.12, antY - 0.08, 0.32)
      ];
      group.add(makeSeg(ribPts, 0.028, 18, 6, BoneMaterial));

      // Costal cartilage connecting to sternum for ribs 1-7
      if (r < 7) {
        const cartPts = [
          new THREE.Vector3(side * 0.12, antY - 0.08, 0.32),
          new THREE.Vector3(side * 0.03, antY - 0.07, 0.33)
        ];
        group.add(makeSeg(cartPts, 0.026, 6, 6, CartilageMaterial));
      }
    });
  }

  // D. Lumbar Spine & Pelvis (Pelvic Girdle)
  for (let l = 0; l < 5; l++) {
    const ly = 0.14 - l * 0.09;
    const lGeo = new THREE.CylinderGeometry(0.18, 0.19, 0.065, 16);
    const lMesh = new THREE.Mesh(lGeo, BoneMaterial.clone());
    lMesh.position.set(0, ly, -0.03 + l * 0.015);
    group.add(lMesh);
  }

  // Sacrum & Coccyx
  const sacrumGeo = new THREE.ConeGeometry(0.28, 0.38, 12);
  sacrumGeo.scale(1.0, 1.0, 0.55);
  const sacrumMesh = new THREE.Mesh(sacrumGeo, BoneMaterial.clone());
  sacrumMesh.rotation.x = Math.PI * 0.94;
  sacrumMesh.position.set(0, -0.42, -0.08);
  group.add(sacrumMesh);

  // Pelvis / Iliac Blades (Ossa coxae)
  [-1, 1].forEach(side => {
    const iliumGeo = new THREE.TorusGeometry(0.38, 0.09, 10, 24, Math.PI * 1.15);
    const iliumMesh = new THREE.Mesh(iliumGeo, BoneMaterial.clone());
    iliumMesh.rotation.y = side * 0.42;
    iliumMesh.rotation.z = side * 0.38;
    iliumMesh.position.set(side * 0.38, -0.35, -0.04);
    group.add(iliumMesh);

    // Ischium & Pubic ramus (forming the acetabulum hip socket)
    const acetGeo = new THREE.SphereGeometry(0.14, 12, 10);
    const acetMesh = new THREE.Mesh(acetGeo, BoneMaterial.clone());
    acetMesh.position.set(side * 0.34, -0.55, 0.02);
    group.add(acetMesh);
  });

  // 2. APPENDICULAR SKELETON: UPPER & LOWER LIMBS
  // A. Upper Limbs (Bones: Humerus, Radius, Ulna, Hands)
  [-1, 1].forEach(side => {
    // Shoulder joint & Humerus
    const humPts = [
      new THREE.Vector3(side * 0.72, 1.12, 0.05), // Head of humerus
      new THREE.Vector3(side * 0.78, 0.75, 0.04), // Shaft
      new THREE.Vector3(side * 0.82, 0.42, 0.02)  // Condyles (Elbow)
    ];
    group.add(makeSeg(humPts, 0.055, 16, 8, BoneMaterial));

    // Elbow Joint (Trochlea & Capitulum)
    const elbowGeo = new THREE.SphereGeometry(0.085, 12, 10);
    const elbowMesh = new THREE.Mesh(elbowGeo, CartilageMaterial.clone());
    elbowMesh.position.set(side * 0.82, 0.42, 0.02);
    group.add(elbowMesh);

    // Radius & Ulna (Forearm)
    const radPts = [
      new THREE.Vector3(side * 0.84, 0.40, 0.02),
      new THREE.Vector3(side * 0.88, 0.08, 0.05),
      new THREE.Vector3(side * 0.90, -0.18, 0.08)
    ];
    const ulnPts = [
      new THREE.Vector3(side * 0.80, 0.40, 0.00),
      new THREE.Vector3(side * 0.82, 0.08, 0.02),
      new THREE.Vector3(side * 0.84, -0.18, 0.04)
    ];
    group.add(makeSeg(radPts, 0.038, 14, 8, BoneMaterial));
    group.add(makeSeg(ulnPts, 0.036, 14, 8, BoneMaterial));

    // Carpal bones & Metacarpals (Hand skeleton)
    const handPts = [
      new THREE.Vector3(side * 0.87, -0.20, 0.06),
      new THREE.Vector3(side * 0.90, -0.38, 0.08),
      new THREE.Vector3(side * 0.92, -0.52, 0.10)
    ];
    group.add(makeSeg(handPts, 0.045, 10, 6, BoneMaterial));
  });

  // B. Lower Limbs (Bones: Femur, Patella, Tibia, Fibula, Feet)
  [-1, 1].forEach(side => {
    // Femur (Thigh bone)
    const femPts = [
      new THREE.Vector3(side * 0.34, -0.55, 0.02),  // Femoral head in acetabulum
      new THREE.Vector3(side * 0.42, -0.62, 0.02),  // Greater trochanter
      new THREE.Vector3(side * 0.38, -1.05, 0.04),  // Femoral shaft
      new THREE.Vector3(side * 0.32, -1.48, 0.02)   // Condyles (Knee)
    ];
    group.add(makeSeg(femPts, 0.075, 20, 10, BoneMaterial));

    // Patella (Kneecap)
    const patGeo = new THREE.SphereGeometry(0.09, 14, 10);
    patGeo.scale(1.1, 1.2, 0.55);
    const patMesh = new THREE.Mesh(patGeo, BoneMaterial.clone());
    patMesh.position.set(side * 0.32, -1.48, 0.12);
    group.add(patMesh);

    // Knee Articular Cartilage
    const kneeGeo = new THREE.SphereGeometry(0.12, 12, 10);
    const kneeMesh = new THREE.Mesh(kneeGeo, CartilageMaterial.clone());
    kneeMesh.position.set(side * 0.32, -1.48, 0.02);
    group.add(kneeMesh);

    // Tibia (Shinbone - weight-bearing)
    const tibPts = [
      new THREE.Vector3(side * 0.32, -1.52, 0.02),
      new THREE.Vector3(side * 0.30, -1.95, 0.04),
      new THREE.Vector3(side * 0.28, -2.35, 0.02) // Medial malleolus (Ankle)
    ];
    group.add(makeSeg(tibPts, 0.065, 18, 10, BoneMaterial));

    // Fibula (Lateral slender bone)
    const fibPts = [
      new THREE.Vector3(side * 0.42, -1.56, 0.00),
      new THREE.Vector3(side * 0.40, -1.95, 0.02),
      new THREE.Vector3(side * 0.36, -2.35, 0.00) // Lateral malleolus
    ];
    group.add(makeSeg(fibPts, 0.035, 16, 8, BoneMaterial));

    // Foot Skeleton (Calcaneus heel, Talus, Metatarsals)
    const footPts = [
      new THREE.Vector3(side * 0.32, -2.38, -0.12), // Calcaneus heel
      new THREE.Vector3(side * 0.30, -2.42, 0.08),  // Midfoot arch
      new THREE.Vector3(side * 0.28, -2.46, 0.32)   // Metatarsals & Toes
    ];
    group.add(makeSeg(footPts, 0.065, 14, 8, BoneMaterial));
  });

  group.scale.set(0.95, 0.95, 0.95);
  return group;
}

// -------------------------------------------------------------
// 13. URINARY SYSTEM MODEL (Systema urinarium - Real Anatomical Kidney & Urinary Tract)
// -------------------------------------------------------------
export function createUrinarySystemModel() {
  const group = new THREE.Group();
  group.name = "urinary_system";

  // 1. ABDOMINAL AORTA & INFERIOR VENA CAVA (Major Vascular Axis)
  const aortaSeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.45, -0.1),
    new THREE.Vector3(0, 0.4, -0.1),
    new THREE.Vector3(0, -0.75, -0.08),
    new THREE.Vector3(0, -1.35, -0.06) // Bifurcation at L4
  ]);
  group.add(makeTube(aortaSeg.points, 0.12, 20, 10, AortaMaterial));

  const ivcSeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, 1.45, -0.08),
    new THREE.Vector3(0.16, 0.4, -0.08),
    new THREE.Vector3(0.15, -0.75, -0.06),
    new THREE.Vector3(0.14, -1.35, -0.05)
  ]);
  group.add(makeTube(ivcSeg.points, 0.14, 20, 10, VeinMaterial));

  // Common Iliac Vessels at Pelvic Brim
  [-1, 1].forEach(side => {
    const aIliac = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.35, -0.06),
      new THREE.Vector3(side * 0.42, -1.75, -0.04)
    ]);
    group.add(makeTube(aIliac.points, 0.07, 12, 8, AortaMaterial));

    const vIliac = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.14, -1.35, -0.05),
      new THREE.Vector3(side * 0.48, -1.72, -0.02)
    ]);
    group.add(makeTube(vIliac.points, 0.08, 12, 8, VeinMaterial));
  });

  // 2. RIGHT KIDNEY (Ren dexter - Smooth Fibrous Capsule Surface)
  // Positioned slightly lower due to liver impression
  const rkGroup = new THREE.Group();
  const rkGeo = new THREE.SphereGeometry(0.72, 32, 24);
  rkGeo.scale(0.85, 1.35, 0.72);
  const rkMat = new THREE.MeshStandardMaterial({
    color: 0x881337, // Rich Crimson Renal Parenchyma
    roughness: 0.35,
    metalness: 0.05
  });
  const rkMesh = new THREE.Mesh(rkGeo, rkMat);
  rkMesh.position.set(1.15, 0.28, 0);
  rkMesh.rotation.z = 0.12;
  rkGroup.add(rkMesh);

  // Right Renal Hilum vessels & Pelvis
  const rArt = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.35, -0.1),
    new THREE.Vector3(0.65, 0.32, -0.06),
    new THREE.Vector3(0.98, 0.28, 0)
  ]);
  rkGroup.add(makeTube(rArt.points, 0.065, 14, 8, AortaMaterial));

  const rVein = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 0.24, -0.06),
    new THREE.Vector3(0.65, 0.22, -0.02),
    new THREE.Vector3(0.98, 0.2, 0.02)
  ]);
  rkGroup.add(makeTube(rVein.points, 0.08, 14, 8, VeinMaterial));

  // Right Adrenal Gland (Triangular Pyramidal Cap)
  const ragGeo = new THREE.ConeGeometry(0.32, 0.42, 8);
  ragGeo.scale(1.1, 1, 0.65);
  const agMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.38 }); // Golden Cortex
  const ragMesh = new THREE.Mesh(ragGeo, agMat);
  ragMesh.position.set(1.12, 1.15, 0.02);
  ragMesh.rotation.z = -0.18;
  rkGroup.add(ragMesh);

  group.add(rkGroup);

  // 3. LEFT KIDNEY (Ren sinister - Detailed Coronal Anatomical Cutaway)
  // Higher position (T12-L3)
  const lkGroup = new THREE.Group();

  // Outer Back Capsule Half
  const lkBackGeo = new THREE.SphereGeometry(0.72, 32, 24, 0, Math.PI * 2, 0, Math.PI);
  lkBackGeo.scale(0.85, 1.35, 0.72);
  const lkBackMesh = new THREE.Mesh(lkBackGeo, rkMat);
  lkBackMesh.position.set(-1.15, 0.45, 0);
  lkBackMesh.rotation.z = -0.12;
  lkGroup.add(lkBackMesh);

  // Inner Coronal Cutaway Face: Renal Cortex (Qobiq modda)
  const cortexGeo = new THREE.RingGeometry(0.25, 0.72, 32);
  cortexGeo.scale(0.85, 1.35, 1);
  const cortexMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b, // Cortex Crimson
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const cortexMesh = new THREE.Mesh(cortexGeo, cortexMat);
  cortexMesh.position.set(-1.15, 0.45, 0.02);
  cortexMesh.rotation.z = -0.12;
  lkGroup.add(cortexMesh);

  // Renal Medulla Pyramids (Malpigi piramidalari - 7 triangular segments)
  for (let p = 0; p < 7; p++) {
    const pAngle = -Math.PI * 0.45 + (p / 6) * Math.PI * 0.9;
    const pyrGeo = new THREE.ConeGeometry(0.14, 0.32, 6);
    const pyrMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.45 });
    const pyrMesh = new THREE.Mesh(pyrGeo, pyrMat);
    pyrMesh.rotation.z = pAngle - Math.PI / 2;
    pyrMesh.position.set(
      -1.15 + Math.cos(pAngle) * 0.42,
      0.45 + Math.sin(pAngle) * 0.62,
      0.03
    );
    lkGroup.add(pyrMesh);

    // Minor Calyx cup at apex
    const calyxGeo = new THREE.CylinderGeometry(0.06, 0.04, 0.08, 8);
    const calyxMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.35 });
    const calyxMesh = new THREE.Mesh(calyxGeo, calyxMat);
    calyxMesh.rotation.z = pAngle - Math.PI / 2;
    calyxMesh.position.set(
      -1.15 + Math.cos(pAngle) * 0.24,
      0.45 + Math.sin(pAngle) * 0.35,
      0.03
    );
    lkGroup.add(calyxMesh);
  }

  // Major Calyces & Funnel-shaped Renal Pelvis (Pelvis renalis - Buyrak jomi)
  const pelvisGeo = new THREE.ConeGeometry(0.24, 0.48, 12);
  pelvisGeo.scale(1.2, 1, 0.6);
  const pelvisMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.35 });
  const pelvisMesh = new THREE.Mesh(pelvisGeo, pelvisMat);
  pelvisMesh.rotation.z = Math.PI / 2 + 0.15;
  pelvisMesh.position.set(-0.95, 0.42, 0.04);
  lkGroup.add(pelvisMesh);

  // Left Renal Artery & Vein
  const lArt = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.48, -0.1),
    new THREE.Vector3(-0.55, 0.46, -0.06),
    new THREE.Vector3(-0.92, 0.42, 0)
  ]);
  lkGroup.add(makeTube(lArt.points, 0.065, 14, 8, AortaMaterial));

  const lVein = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 0.38, -0.06),
    new THREE.Vector3(-0.45, 0.36, -0.02),
    new THREE.Vector3(-0.92, 0.35, 0.02)
  ]);
  lkGroup.add(makeTube(lVein.points, 0.08, 14, 8, VeinMaterial));

  // Left Adrenal Gland (Crescentic Semilunar Cap)
  const lagGeo = new THREE.TorusGeometry(0.28, 0.09, 8, 16, Math.PI);
  const lagMesh = new THREE.Mesh(lagGeo, agMat);
  lagMesh.position.set(-1.12, 1.25, 0.02);
  lagMesh.rotation.z = Math.PI - 0.2;
  lkGroup.add(lagMesh);

  group.add(lkGroup);

  // 4. URETERS (Siydik naylari - Retroperitoneal Muscular Conduits with Physiological S-Curves)
  // Right Ureter
  const rUreterCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.02, 0.15, 0.02),
    new THREE.Vector3(0.82, -0.35, 0.06),
    new THREE.Vector3(0.55, -0.95, 0.08),
    new THREE.Vector3(0.32, -1.45, 0.06),
    new THREE.Vector3(0.18, -1.68, 0.04) // Oblique entry into bladder
  ]);
  const ureterMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.38 });
  group.add(makeTube(rUreterCurve.points, 0.055, 24, 8, ureterMat));

  // Left Ureter
  const lUreterCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.95, 0.28, 0.04),
    new THREE.Vector3(-0.76, -0.32, 0.06),
    new THREE.Vector3(-0.52, -0.95, 0.08),
    new THREE.Vector3(-0.28, -1.45, 0.06),
    new THREE.Vector3(-0.16, -1.68, 0.04)
  ]);
  group.add(makeTube(lUreterCurve.points, 0.055, 24, 8, ureterMat));

  // 5. URINARY BLADDER (Vesica urinaria / Qovuq - Muscular Pear Reservoir)
  const bladderGeo = new THREE.SphereGeometry(0.68, 28, 24);
  bladderGeo.scale(1.08, 0.95, 0.92);
  const bladderMat = new THREE.MeshStandardMaterial({
    color: 0xf97316, // Muscular Detrusor Orange
    roughness: 0.38,
    metalness: 0.05
  });
  const bladder = new THREE.Mesh(bladderGeo, bladderMat);
  bladder.position.set(0, -1.75, 0.08);
  group.add(bladder);

  // Internal Trigone Window indicator (Trigonum vesicae)
  const trigoneGeo = new THREE.CircleGeometry(0.24, 16);
  const trigoneMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.65 });
  const trigoneMesh = new THREE.Mesh(trigoneGeo, trigoneMat);
  trigoneMesh.position.set(0, -1.82, 0.72);
  group.add(trigoneMesh);

  // Ureteral orifices (Ostium ureteris)
  [-0.1, 0.1].forEach(ux => {
    const dotGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const dotMesh = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    dotMesh.position.set(ux, -1.78, 0.73);
    group.add(dotMesh);
  });

  // 6. URETHRA (Siydik chiqarish kanali with Sphincter)
  const urethraCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -2.25, 0.08),
    new THREE.Vector3(0, -2.7, 0.12)
  ]);
  group.add(makeTube(urethraCurve.points, 0.068, 12, 8, bladderMat));

  // External Urethral Sphincter Ring
  const sphGeo = new THREE.TorusGeometry(0.12, 0.04, 8, 16);
  const sphMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4 });
  const sphMesh = new THREE.Mesh(sphGeo, sphMat);
  sphMesh.rotation.x = Math.PI / 2;
  sphMesh.position.set(0, -2.48, 0.1);
  group.add(sphMesh);

  group.scale.set(1.15, 1.15, 1.15);
  group.position.y = 0.35;
  return group;
}

// -------------------------------------------------------------
// 14. ENDOCRINE SYSTEM MODEL (Systema endocrinum - Real Internal Secretion Glands)
// -------------------------------------------------------------
export function createEndocrineSystemModel() {
  const group = new THREE.Group();
  group.name = "endocrine_system";

  // 1. PITUITARY GLAND & HYPOTHALAMUS (Gipofiz bezi - Master Neuroendocrine Hub)
  const pitGroup = new THREE.Group();
  pitGroup.position.set(0, 2.3, 0);

  // Infundibular Stalk from Hypothalamus
  const infCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.22, 0),
    new THREE.Vector3(0, 0.04, 0.02)
  ]);
  pitGroup.add(makeTube(infCurve.points, 0.045, 8, 8, NerveMaterial));

  // Anterior Pituitary (Adenohypophysis - Scarlet/Amber)
  const adenoGeo = new THREE.SphereGeometry(0.2, 18, 16);
  adenoGeo.scale(1.1, 0.9, 0.85);
  const adenoMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.5,
    roughness: 0.25
  });
  const adenoMesh = new THREE.Mesh(adenoGeo, adenoMat);
  adenoMesh.position.set(0, 0, 0.08);
  pitGroup.add(adenoMesh);

  // Posterior Pituitary (Neurohypophysis - Neural Golden tone)
  const neuroGeo = new THREE.SphereGeometry(0.16, 16, 14);
  neuroGeo.scale(0.9, 0.85, 0.8);
  const neuroMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
  const neuroMesh = new THREE.Mesh(neuroGeo, neuroMat);
  neuroMesh.position.set(0, 0.02, -0.06);
  pitGroup.add(neuroMesh);

  // Sella Turcica (Bone saddle seat)
  const sellaGeo = new THREE.TorusGeometry(0.24, 0.05, 8, 16, Math.PI);
  const sellaMesh = new THREE.Mesh(sellaGeo, BoneMaterial);
  sellaMesh.rotation.x = -Math.PI / 2;
  sellaMesh.position.set(0, -0.1, 0);
  pitGroup.add(sellaMesh);

  group.add(pitGroup);

  // 2. PINEAL GLAND (Epifiz bezi - Glandula pinealis)
  const pinealGeo = new THREE.ConeGeometry(0.1, 0.18, 8);
  const pinealMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.35 });
  const pinealMesh = new THREE.Mesh(pinealGeo, pinealMat);
  pinealMesh.rotation.x = -Math.PI / 2;
  pinealMesh.position.set(0, 2.38, -0.22);
  group.add(pinealMesh);

  // 3. THYROID GLAND (Qalqonsimon bez - Butterfly Architecture with Trachea)
  const thyGroup = new THREE.Group();
  thyGroup.position.set(0, 1.35, 0.08);

  // Tracheal Cartilage Rings beneath thyroid
  for (let t = 0; t < 5; t++) {
    const trGeo = new THREE.TorusGeometry(0.22, 0.035, 8, 20, Math.PI * 1.6);
    const trMesh = new THREE.Mesh(trGeo, CartilageMaterial);
    trMesh.rotation.x = Math.PI / 2;
    trMesh.position.set(0, 0.25 - t * 0.12, 0.04);
    thyGroup.add(trMesh);
  }

  // Left & Right Thyroid Lobes (Rich vascular crimson: #b91c1c)
  const thyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.38, metalness: 0.05 });
  [-1, 1].forEach(side => {
    const lobeGeo = new THREE.SphereGeometry(0.34, 20, 18);
    lobeGeo.scale(0.72, 1.45, 0.65);
    const lobe = new THREE.Mesh(lobeGeo, thyMat);
    lobe.position.set(side * 0.32, 0.05, 0.06);
    lobe.rotation.z = -side * 0.22;
    thyGroup.add(lobe);

    // Superior & Inferior Parathyroid Glands (Qalqonoldi bezlari - 4 small lentil glands)
    [-0.12, 0.15].forEach(py => {
      const paraGeo = new THREE.SphereGeometry(0.055, 8, 8);
      const paraMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 }); // Amber
      const paraMesh = new THREE.Mesh(paraGeo, paraMat);
      paraMesh.position.set(side * 0.32, py, -0.12); // Posterior capsule
      thyGroup.add(paraMesh);
    });
  });

  // Thyroid Isthmus across trachea
  const isthGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.32, 12);
  isthGeo.scale(1, 1, 0.5);
  const isthMesh = new THREE.Mesh(isthGeo, thyMat);
  isthMesh.rotation.z = Math.PI / 2;
  isthMesh.position.set(0, -0.04, 0.18);
  thyGroup.add(isthMesh);

  group.add(thyGroup);

  // 4. THYMUS GLAND (Ayrsimon bez / Timus - Bi-lobed Mediastinal Gland)
  const thymusGeo = new THREE.SphereGeometry(0.38, 20, 18);
  thymusGeo.scale(0.85, 1.25, 0.55);
  const thymusMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.42 });
  const thymus = new THREE.Mesh(thymusGeo, thymusMat);
  thymus.position.set(0, 0.68, 0.12);
  group.add(thymus);

  // 5. ADRENAL GLANDS (Buyrak usti bezlari / Glandulae suprarenales)
  // Left and Right Adrenal Glands capping the kidneys
  [-1, 1].forEach(side => {
    const agGeo = new THREE.ConeGeometry(0.28, 0.42, 8);
    agGeo.scale(1.15, 1, 0.65);
    const agMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.35 });
    const agMesh = new THREE.Mesh(agGeo, agMat);
    agMesh.position.set(side * 0.95, -0.15, 0);
    agMesh.rotation.z = -side * 0.22;
    group.add(agMesh);
  });

  // 6. ENDOCRINE PANCREAS (Oshqozon osti bezi - Islets of Langerhans / Langergans orolchalari)
  const panc = createPancreasModel();
  panc.scale.set(0.7, 0.7, 0.7);
  panc.position.set(0.15, -0.65, 0.08);
  group.add(panc);

  // Luminous Langerhans Islet nodes (Glowing hormone synthesis clusters)
  for (let n = 0; n < 8; n++) {
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.position.set(-0.35 + n * 0.14, -0.62 + (n % 2) * 0.05, 0.25);
    group.add(nodeMesh);
  }

  // 7. ENDOCRINE GONADS (Tuxumdonlar / Moyaklar - Ovaries / Testes)
  [-1, 1].forEach(side => {
    const gonadGeo = new THREE.SphereGeometry(0.18, 14, 12);
    gonadGeo.scale(0.85, 1.25, 0.85);
    const gonadMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.38 });
    const gonadMesh = new THREE.Mesh(gonadGeo, gonadMat);
    gonadMesh.position.set(side * 0.45, -1.85, 0.06);
    group.add(gonadMesh);
  });

  // 8. GLOWING HORMONAL DISTRIBUTION CHANNELS (Endocrine Systemic Signaling Axis)
  const axisMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
    wireframe: true
  });
  const axisGeo = new THREE.CylinderGeometry(0.035, 0.035, 4.4, 8);
  const axisMesh = new THREE.Mesh(axisGeo, axisMat);
  axisMesh.position.set(0, 0.2, 0);
  group.add(axisMesh);

  group.scale.set(1.15, 1.15, 1.15);
  group.position.y = 0.2;
  return group;
}

// -------------------------------------------------------------
// 15. SPINE MODEL (Columna vertebralis)
// -------------------------------------------------------------
export function createSpineModel() {
  const group = new THREE.Group();
  group.name = "spine";

  // Spinal Cord Core (Luminous Golden Cord)
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.2, 0),
    new THREE.Vector3(0, 1.5, 0.08),
    new THREE.Vector3(0, 0.3, -0.1),
    new THREE.Vector3(0, -1.0, 0.1),
    new THREE.Vector3(0, -2.0, -0.05)
  ]);
  const cordMesh = makeTube(cordCurve.points, 0.075, 40, 12, NerveMaterial);
  group.add(cordMesh);

  // 24 Vertebrae (7 Cervical, 12 Thoracic, 5 Lumbar)
  const sections = [
    { count: 7, scale: 0.72, id: "cervical" },
    { count: 12, scale: 0.95, id: "thoracic" },
    { count: 5, scale: 1.32, id: "lumbar" }
  ];

  let currentY = 2.1;
  sections.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      const vGroup = new THREE.Group();

      const bodyGeo = new THREE.CylinderGeometry(0.24 * sec.scale, 0.25 * sec.scale, 0.12 * sec.scale, 18);
      const bodyMesh = new THREE.Mesh(bodyGeo, BoneMaterial.clone());
      bodyMesh.position.set(0, 0, 0.15 * sec.scale);
      vGroup.add(bodyMesh);

      const spinousGeo = new THREE.ConeGeometry(0.08 * sec.scale, 0.45 * sec.scale, 6);
      const spinousMesh = new THREE.Mesh(spinousGeo, BoneMaterial.clone());
      spinousMesh.rotation.x = -Math.PI / 2.3;
      spinousMesh.position.set(0, -0.05, -0.35 * sec.scale);
      vGroup.add(spinousMesh);

      [-1, 1].forEach(side => {
        const transGeo = new THREE.BoxGeometry(0.35 * sec.scale, 0.08 * sec.scale, 0.12 * sec.scale);
        const transMesh = new THREE.Mesh(transGeo, BoneMaterial.clone());
        transMesh.position.set(side * 0.32 * sec.scale, 0, 0);
        vGroup.add(transMesh);
      });

      // Disc
      const discGeo = new THREE.CylinderGeometry(0.25 * sec.scale, 0.25 * sec.scale, 0.045 * sec.scale, 18);
      const discMesh = new THREE.Mesh(discGeo, CartilageMaterial.clone());
      discMesh.position.set(0, -0.085 * sec.scale, 0.15 * sec.scale);
      vGroup.add(discMesh);

      let zOffset = 0;
      if (sec.id === "cervical") zOffset = 0.06;
      else if (sec.id === "thoracic") zOffset = -0.12 * Math.sin((i / 12) * Math.PI);
      else if (sec.id === "lumbar") zOffset = 0.12 * Math.sin((i / 5) * Math.PI);

      vGroup.position.set(0, currentY, zOffset);
      group.add(vGroup);
      currentY -= 0.15 * sec.scale;
    }
  });

  // Sacrum & Coccyx
  const sacrumGeo = new THREE.ConeGeometry(0.55, 0.8, 6);
  sacrumGeo.scale(1.2, 1, 0.65);
  const sacrumMesh = new THREE.Mesh(sacrumGeo, BoneMaterial.clone());
  sacrumMesh.rotation.x = 0.35;
  sacrumMesh.position.set(0, currentY - 0.35, -0.08);
  group.add(sacrumMesh);

  group.position.y = 0.2;
  return group;
}

// Registry map for procedural models
export const PROCEDURAL_MODEL_BUILDERS = {
  skull: createSkullModel,
  heart: createHeartModel,
  eye: createEyeInternalLayersModel,
  eye_tissues: createEyeInternalLayersModel,
  eye_layers: createEyeInternalLayersModel,
  gallbladder: createGallbladderBiliaryModel,
  pancreas: createPancreasModel,
  oral_cavity: createOralCavityModel,
  hand_fingers: createHandFingersModel,
  nervous_system: createNervousSystemModel,
  circulatory_system: createCirculatorySystemModel,
  respiratory_system: createRespiratorySystemModel,
  digestive_system: createDigestiveSystemModel,
  musculoskeletal_system: createMusculoskeletalSystemModel,
  urinary_system: createUrinarySystemModel,
  endocrine_system: createEndocrineSystemModel,
  spine: createSpineModel,
  // Detailed models:
  esophagus_pharynx: createEsophagusPharynxModel,
  salivary_glands: createSalivaryGlandsModel,
  small_intestine: createSmallIntestineModel,
  large_intestine: createLargeIntestineAppendixModel,
  larynx_vocal_cords: createLarynxVocalCordsModel,
  trachea_bronchi: createTracheaBronchialTreeModel,
  // Urinary detailed models:
  kidney: createKidneyNephronModel,
  kidney_nephron: createKidneyNephronModel,
  ureters: createUretersModel,
  bladder_urethra: createBladderUrethraModel,
  // Sensory detailed models:
  ear: createEarModel,
  skin_layers: createSkinLayersModel,
  // Lymphatic & Immune:
  lymphatic_system: createLymphaticImmuneModel,
  // Cell & Microbiology:
  cell_structure: createCellStructureModel,
  dna_helix: createDnaHelixModel,
  blood_cells: createBloodCellsModel
};
