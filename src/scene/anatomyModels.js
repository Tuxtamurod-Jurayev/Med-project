import * as THREE from 'three';

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
  roughness: 0.4,
  metalness: 0.05
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

  // Sclera (Pearlescent White Outer Tunic)
  const scleraGeo = new THREE.SphereGeometry(1.2, 32, 28);
  const scleraMesh = new THREE.Mesh(scleraGeo, ScleraMaterial);
  group.add(scleraMesh);

  // Cornea (Transparent Glass Dome)
  const corneaGeo = new THREE.SphereGeometry(0.72, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.42);
  const corneaMesh = new THREE.Mesh(corneaGeo, CorneaGlassMaterial);
  corneaMesh.position.set(0, 0, 0.95);
  group.add(corneaMesh);

  // Iris (Vibrant Deep Blue & Hazel concentric rings)
  const irisGeo = new THREE.RingGeometry(0.24, 0.62, 32);
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.3,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const irisMesh = new THREE.Mesh(irisGeo, irisMat);
  irisMesh.position.set(0, 0, 1.15);
  group.add(irisMesh);

  // Pupil (Deep Black Velvet Center)
  const pupilGeo = new THREE.CircleGeometry(0.24, 32);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
  pupilMesh.position.set(0, 0, 1.152);
  group.add(pupilMesh);

  // Crystalline Lens (Biconvex Transparent Disc)
  const lensGeo = new THREE.SphereGeometry(0.48, 24, 20);
  lensGeo.scale(1.0, 1.0, 0.45);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0fdf4,
    transparent: true,
    opacity: 0.75,
    roughness: 0.1
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.position.set(0, 0, 0.88);
  group.add(lensMesh);

  // Optic Nerve (Nervus opticus - Golden-Ivory Cord)
  const nerveCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -1.18),
    new THREE.Vector3(0.08, -0.1, -1.7),
    new THREE.Vector3(0.18, -0.22, -2.3)
  ]);
  const nerveMesh = makeTube(nerveCurve.points, 0.22, 20, 16, NerveMaterial);
  group.add(nerveMesh);

  // 4 Rectus Extraocular Muscles (Musculi recti - Striated Muscle Crimson)
  const muscleConfigs = [
    { name: "Superior Rectus", rot: [0.65, 0, 0], pos: [0, 1.08, -0.2] },
    { name: "Inferior Rectus", rot: [-0.65, 0, 0], pos: [0, -1.08, -0.2] },
    { name: "Medial Rectus", rot: [0, 0.65, 0], pos: [1.08, 0, -0.2] },
    { name: "Lateral Rectus", rot: [0, -0.65, 0], pos: [-1.08, 0, -0.2] }
  ];

  muscleConfigs.forEach(cfg => {
    const mGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.6, 12);
    const mMesh = new THREE.Mesh(mGeo, MuscleMaterial);
    mMesh.rotation.x = cfg.rot[0] || (Math.PI / 2);
    mMesh.rotation.y = cfg.rot[1] || 0;
    mMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    group.add(mMesh);
  });

  group.scale.set(1.3, 1.3, 1.3);
  return group;
}

// -------------------------------------------------------------
// 4. GALLBLADDER MODEL (Vesica biliaris & Ductus biliares)
// -------------------------------------------------------------
export function createGallbladderModel() {
  const group = new THREE.Group();
  group.name = "gallbladder";

  // Gallbladder Fundus & Corpus (Pear-shaped green reservoir)
  const gbGeo = new THREE.SphereGeometry(0.85, 32, 24);
  gbGeo.scale(0.82, 1.55, 0.88);
  const gbMesh = new THREE.Mesh(gbGeo, BileGreenMaterial.clone());
  gbMesh.rotation.z = -0.35;
  gbMesh.rotation.x = 0.2;
  group.add(gbMesh);

  // Gallbladder Neck (Collum vesicae)
  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0.9, 0),
    new THREE.Vector3(0.35, 1.25, -0.1),
    new THREE.Vector3(0.15, 1.55, -0.25)
  ]);
  const neckMesh = makeTube(neckCurve.points, 0.16, 20, 12, BileGreenMaterial);
  group.add(neckMesh);

  // Cystic Duct (Ductus cysticus - spiral duct)
  const cysticCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, 1.55, -0.25),
    new THREE.Vector3(-0.05, 1.45, -0.35),
    new THREE.Vector3(-0.25, 1.3, -0.3)
  ]);
  const cysticMesh = makeTube(cysticCurve.points, 0.09, 16, 10, BileGreenMaterial);
  group.add(cysticMesh);

  // Common Hepatic Duct (from liver)
  const hepaticCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.45, 1.95, -0.2),
    new THREE.Vector3(-0.35, 1.6, -0.25),
    new THREE.Vector3(-0.25, 1.3, -0.3)
  ]);
  const hepaticMesh = makeTube(hepaticCurve.points, 0.1, 16, 10, BileGreenMaterial);
  group.add(hepaticMesh);

  // Left & Right Hepatic Ducts
  const rhdCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.75, 2.25, -0.1),
    new THREE.Vector3(-0.45, 1.95, -0.2)
  ]);
  const lhdCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 2.25, -0.25),
    new THREE.Vector3(-0.45, 1.95, -0.2)
  ]);
  group.add(makeTube(rhdCurve.points, 0.07, 10, 8, BileGreenMaterial));
  group.add(makeTube(lhdCurve.points, 0.07, 10, 8, BileGreenMaterial));

  // Common Bile Duct (Ductus choledochus - travels down to duodenum)
  const choledochusCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.25, 1.3, -0.3),
    new THREE.Vector3(-0.22, 0.6, -0.35),
    new THREE.Vector3(-0.18, -0.1, -0.35),
    new THREE.Vector3(-0.15, -0.7, -0.2)
  ]);
  const choledochusMesh = makeTube(choledochusCurve.points, 0.11, 24, 12, BileGreenMaterial);
  group.add(choledochusMesh);

  // Duodenum C-Loop Section (Curved intestinal frame)
  const duoCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.8, -0.3, 0.1),
    new THREE.Vector3(-0.4, -0.75, 0),
    new THREE.Vector3(0.2, -0.85, -0.1),
    new THREE.Vector3(0.65, -0.5, -0.2),
    new THREE.Vector3(0.5, 0.1, -0.1)
  ]);
  const duoMat = new THREE.MeshStandardMaterial({ color: 0xfda4af, roughness: 0.45 });
  const duoMesh = makeTube(duoCurve.points, 0.28, 28, 16, duoMat);
  group.add(duoMesh);

  // Sphincter of Oddi (Papilla of Vater connection point)
  const sphincterGeo = new THREE.SphereGeometry(0.16, 14, 14);
  const sphincterMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.3 });
  const sphincterMesh = new THREE.Mesh(sphincterGeo, sphincterMat);
  sphincterMesh.position.set(-0.15, -0.7, -0.15);
  group.add(sphincterMesh);

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

// -------------------------------------------------------------
// 5. PANCREAS MODEL (Pancreas & Duodenum)
// -------------------------------------------------------------
export function createPancreasModel() {
  const group = new THREE.Group();
  group.name = "pancreas";

  // Pancreas Lobulated Body (Yellow-Orange glandular texture)
  const bodyCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.1, -0.2, 0.1), // Caput (Head)
    new THREE.Vector3(-0.4, 0.05, 0.05), // Collum (Neck)
    new THREE.Vector3(0.4, 0.2, 0.0),    // Corpus (Body)
    new THREE.Vector3(1.3, 0.45, -0.15)  // Cauda (Tail)
  ]);
  const bodyMesh = makeTube(bodyCurve.points, 0.38, 32, 16, PancreasYellowMaterial);
  group.add(bodyMesh);

  // Head of Pancreas (Caput pancreatis - enlarged lower lobe)
  const headGeo = new THREE.SphereGeometry(0.65, 24, 20);
  headGeo.scale(0.85, 1.25, 0.9);
  const headMesh = new THREE.Mesh(headGeo, PancreasYellowMaterial.clone());
  headMesh.position.set(-1.15, -0.35, 0.12);
  group.add(headMesh);

  // Duodenum C-Loop Cradling the Head (Creamy-pink intestinal loop)
  const duoCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.9, 0.7, 0.2),
    new THREE.Vector3(-1.85, 0.3, 0.25),
    new THREE.Vector3(-1.95, -0.7, 0.2),
    new THREE.Vector3(-1.45, -1.35, 0.1),
    new THREE.Vector3(-0.45, -1.2, 0.0)
  ]);
  const duoMat = new THREE.MeshStandardMaterial({ color: 0xfda4af, roughness: 0.4 });
  const duoMesh = makeTube(duoCurve.points, 0.3, 28, 16, duoMat);
  group.add(duoMesh);

  // Pancreatic Duct of Wirsung (Ductus pancreaticus - inner glowing white duct)
  const ductCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.2, 0.42, -0.1),
    new THREE.Vector3(0.4, 0.2, 0.02),
    new THREE.Vector3(-0.4, 0.06, 0.08),
    new THREE.Vector3(-1.05, -0.15, 0.15),
    new THREE.Vector3(-1.3, -0.3, 0.18)
  ]);
  const ductMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.4,
    roughness: 0.2
  });
  const ductMesh = makeTube(ductCurve.points, 0.07, 24, 10, ductMat);
  group.add(ductMesh);

  // Splenic Artery (Arteria lienalis - tortuous red vessel on upper border)
  const arteryCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.3, 0.35, -0.1),
    new THREE.Vector3(0.0, 0.5, -0.05),
    new THREE.Vector3(0.3, 0.4, -0.1),
    new THREE.Vector3(0.65, 0.6, -0.15),
    new THREE.Vector3(1.0, 0.55, -0.2),
    new THREE.Vector3(1.4, 0.75, -0.25)
  ]);
  const arteryMesh = makeTube(arteryCurve.points, 0.065, 28, 10, AortaMaterial);
  group.add(arteryMesh);

  // Superior Mesenteric Vessels (Passing behind neck)
  const smaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0.6, -0.25),
    new THREE.Vector3(-0.38, -0.9, -0.15)
  ]);
  const smvCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.2, 0.6, -0.22),
    new THREE.Vector3(-0.23, -0.9, -0.12)
  ]);
  group.add(makeTube(smaCurve.points, 0.075, 12, 8, AortaMaterial));
  group.add(makeTube(smvCurve.points, 0.085, 12, 8, VeinMaterial));

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

// -------------------------------------------------------------
// 6. ORAL CAVITY MODEL (Cavitas oris, Dentes et Lingua)
// -------------------------------------------------------------
export function createOralCavityModel() {
  const group = new THREE.Group();
  group.name = "oral_cavity";

  // Upper & Lower Gingiva Arches (Pink Gums)
  const upperGumCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.95, 0.3, -0.4),
    new THREE.Vector3(-0.75, 0.3, 0.35),
    new THREE.Vector3(0, 0.3, 0.8),
    new THREE.Vector3(0.75, 0.3, 0.35),
    new THREE.Vector3(0.95, 0.3, -0.4)
  ]);
  const upperGum = makeTube(upperGumCurve.points, 0.16, 24, 12, GumPinkMaterial);
  group.add(upperGum);

  const lowerGumCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.95, -0.3, -0.4),
    new THREE.Vector3(-0.75, -0.3, 0.35),
    new THREE.Vector3(0, -0.3, 0.8),
    new THREE.Vector3(0.75, -0.3, 0.35),
    new THREE.Vector3(0.95, -0.3, -0.4)
  ]);
  const lowerGum = makeTube(lowerGumCurve.points, 0.16, 24, 12, GumPinkMaterial);
  group.add(lowerGum);

  // 32 Anatomical Teeth (White Enamel Crowns)
  const toothTypes = [
    { count: 16, yPos: 0.32, yDir: -1 },
    { count: 16, yPos: -0.32, yDir: 1 }
  ];

  toothTypes.forEach(row => {
    for (let i = 0; i < row.count; i++) {
      const t = i / (row.count - 1);
      const angle = (t - 0.5) * Math.PI * 0.95;
      const x = Math.sin(angle) * (0.8 + Math.abs(angle) * 0.15);
      const z = Math.cos(angle) * 0.85 - 0.2;

      // Distinguish molar vs incisor size
      const isMolar = (i < 3 || i > 12);
      const isCanine = (i === 4 || i === 11);
      const tRadius = isMolar ? 0.08 : isCanine ? 0.065 : 0.055;
      const tHeight = isMolar ? 0.14 : isCanine ? 0.18 : 0.15;

      const tGeo = isMolar ? new THREE.BoxGeometry(tRadius * 2, tHeight, tRadius * 2) : new THREE.CylinderGeometry(tRadius * 0.7, tRadius, tHeight, 10);
      const tMesh = new THREE.Mesh(tGeo, ToothEnamelMaterial);
      tMesh.position.set(x, row.yPos + row.yDir * (tHeight * 0.5), z);
      group.add(tMesh);
    }
  });

  // Muscular Tongue (Lingua - Anatomical crimson organ)
  const tongueGeo = new THREE.SphereGeometry(0.75, 28, 24);
  tongueGeo.scale(0.85, 0.45, 1.35);
  const tongueMesh = new THREE.Mesh(tongueGeo, TongueRedMaterial);
  tongueMesh.position.set(0, -0.18, 0.05);
  group.add(tongueMesh);

  // Median Lingual Sulcus (Middle groove)
  const sulcusCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.02, 0.7),
    new THREE.Vector3(0, -0.04, 0.0),
    new THREE.Vector3(0, -0.08, -0.6)
  ]);
  const sulcusMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 });
  group.add(makeTube(sulcusCurve.points, 0.045, 16, 8, sulcusMat));

  // Hard & Soft Palate (Roof of mouth)
  const palateGeo = new THREE.SphereGeometry(0.9, 24, 20, 0, Math.PI, 0, Math.PI * 0.5);
  palateGeo.scale(1.0, 0.35, 1.1);
  const palateMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.45, side: THREE.DoubleSide });
  const palateMesh = new THREE.Mesh(palateGeo, palateMat);
  palateMesh.rotation.x = Math.PI;
  palateMesh.position.set(0, 0.55, 0.1);
  group.add(palateMesh);

  // Uvula (Tilcha)
  const uvulaGeo = new THREE.ConeGeometry(0.08, 0.24, 10);
  const uvulaMesh = new THREE.Mesh(uvulaGeo, GumPinkMaterial);
  uvulaMesh.rotation.x = Math.PI;
  uvulaMesh.position.set(0, 0.28, -0.7);
  group.add(uvulaMesh);

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
// 8. NERVOUS SYSTEM MODEL (Systema nervosum)
// -------------------------------------------------------------
export function createNervousSystemModel() {
  const group = new THREE.Group();
  group.name = "nervous_system";

  // Glowing Brain at Top
  const brainGeo = new THREE.SphereGeometry(0.75, 28, 24);
  brainGeo.scale(0.9, 1.1, 1.0);
  const brainMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.45,
    roughness: 0.3
  });
  const brainMesh = new THREE.Mesh(brainGeo, brainMat);
  brainMesh.position.set(0, 2.2, 0);
  group.add(brainMesh);

  // Cerebellum (Red/Violet lower mass)
  const cereGeo = new THREE.SphereGeometry(0.38, 20, 20);
  const cereMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
  const cereMesh = new THREE.Mesh(cereGeo, cereMat);
  cereMesh.position.set(0, 1.7, -0.32);
  group.add(cereMesh);

  // Spinal Cord (Medulla spinalis - Glowing Golden Core)
  const spinalCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.8, -0.1),
    new THREE.Vector3(0, 1.1, -0.05),
    new THREE.Vector3(0, 0.2, -0.08),
    new THREE.Vector3(0, -0.7, -0.04),
    new THREE.Vector3(0, -1.6, -0.08)
  ]);
  const spinalMesh = makeTube(spinalCurve.points, 0.12, 32, 12, NerveMaterial);
  group.add(spinalMesh);

  // 12 Pairs of Cranial Nerves & Spinal Nerve Roots
  for (let i = 0; i < 18; i++) {
    const y = 1.3 - i * 0.15;
    const width = 0.6 + Math.sin(i * 0.25) * 0.45;
    [-1, 1].forEach(side => {
      const nerveRib = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.08, y, -0.06),
        new THREE.Vector3(side * (width * 0.5), y - 0.05, 0.05),
        new THREE.Vector3(side * width, y - 0.12, 0.2)
      ]);
      group.add(makeTube(nerveRib.points, 0.035, 12, 6, NerveMaterial));
    });
  }

  // Brachial Plexus & Arm Nerves (Both arms)
  [-1, 1].forEach(side => {
    const armNerve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.15, 1.2, 0),
      new THREE.Vector3(side * 0.8, 1.05, 0.05),
      new THREE.Vector3(side * 1.4, 0.6, 0),
      new THREE.Vector3(side * 1.8, -0.1, 0),
      new THREE.Vector3(side * 2.1, -0.8, 0)
    ]);
    group.add(makeTube(armNerve.points, 0.06, 24, 8, NerveMaterial));
  });

  // Lumbosacral Plexus & Massive Sciatic Nerves (Both legs)
  [-1, 1].forEach(side => {
    const legNerve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.18, -1.4, -0.05),
      new THREE.Vector3(side * 0.55, -1.8, -0.08),
      new THREE.Vector3(side * 0.65, -2.5, -0.05),
      new THREE.Vector3(side * 0.68, -3.3, 0),
      new THREE.Vector3(side * 0.72, -4.2, 0.05)
    ]);
    group.add(makeTube(legNerve.points, 0.08, 30, 8, NerveMaterial));
  });

  group.scale.set(0.9, 0.9, 0.9);
  group.position.y = 0.6;
  return group;
}

// -------------------------------------------------------------
// 9. CIRCULATORY SYSTEM MODEL (Systema cardiovasculare)
// -------------------------------------------------------------
export function createCirculatorySystemModel() {
  const group = new THREE.Group();
  group.name = "circulatory_system";

  // Central Beating Heart
  const heartSub = createHeartModel();
  heartSub.scale.set(0.48, 0.48, 0.48);
  heartSub.position.set(0, 0.6, 0.1);
  group.add(heartSub);

  // Aorta & Descending Arterial Tree (Red)
  const aortaDownCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.8, 0),
    new THREE.Vector3(0.04, 0.2, -0.1),
    new THREE.Vector3(0.05, -0.5, -0.1),
    new THREE.Vector3(0.06, -1.3, -0.08)
  ]);
  group.add(makeTube(aortaDownCurve.points, 0.14, 24, 12, AortaMaterial));

  // Inferior Vena Cava (Blue)
  const ivcDownCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, 0.5, -0.08),
    new THREE.Vector3(0.18, -0.5, -0.08),
    new THREE.Vector3(0.18, -1.3, -0.06)
  ]);
  group.add(makeTube(ivcDownCurve.points, 0.16, 24, 12, VeinMaterial));

  // Carotid Arteries & Jugular Veins (To Head)
  [-1, 1].forEach(side => {
    const carotid = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.12, 1.0, 0),
      new THREE.Vector3(side * 0.22, 1.6, 0.05),
      new THREE.Vector3(side * 0.28, 2.2, 0.08)
    ]);
    const jugular = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.24, 0.9, -0.02),
      new THREE.Vector3(side * 0.36, 1.55, 0.03),
      new THREE.Vector3(side * 0.42, 2.15, 0.06)
    ]);
    group.add(makeTube(carotid.points, 0.065, 16, 8, AortaMaterial));
    group.add(makeTube(jugular.points, 0.08, 16, 8, VeinMaterial));
  });

  // Arm Vessels (Subclavian & Brachial)
  [-1, 1].forEach(side => {
    const aArm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.2, 0.9, 0),
      new THREE.Vector3(side * 0.8, 0.8, 0.02),
      new THREE.Vector3(side * 1.5, 0.4, 0),
      new THREE.Vector3(side * 2.0, -0.4, 0)
    ]);
    const vArm = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.32, 0.85, -0.03),
      new THREE.Vector3(side * 0.85, 0.75, 0.0),
      new THREE.Vector3(side * 1.55, 0.35, -0.02),
      new THREE.Vector3(side * 2.05, -0.45, -0.02)
    ]);
    group.add(makeTube(aArm.points, 0.07, 20, 8, AortaMaterial));
    group.add(makeTube(vArm.points, 0.085, 20, 8, VeinMaterial));
  });

  // Leg Vessels (Iliac & Femoral)
  [-1, 1].forEach(side => {
    const aLeg = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.06, -1.3, -0.08),
      new THREE.Vector3(side * 0.45, -1.8, -0.05),
      new THREE.Vector3(side * 0.58, -2.6, 0),
      new THREE.Vector3(side * 0.62, -3.5, 0.02)
    ]);
    const vLeg = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, -1.3, -0.06),
      new THREE.Vector3(side * 0.55, -1.78, -0.04),
      new THREE.Vector3(side * 0.68, -2.58, 0.01),
      new THREE.Vector3(side * 0.72, -3.48, 0.03)
    ]);
    group.add(makeTube(aLeg.points, 0.08, 24, 8, AortaMaterial));
    group.add(makeTube(vLeg.points, 0.095, 24, 8, VeinMaterial));
  });

  group.scale.set(0.9, 0.9, 0.9);
  group.position.y = 0.5;
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

  // Spine & Ribs Foundation
  for (let r = 0; r < 7; r++) {
    const y = 0.8 - r * 0.18;
    [-1, 1].forEach(side => {
      const rib = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, y, -0.2),
        new THREE.Vector3(side * 0.7, y - 0.08, 0),
        new THREE.Vector3(side * 0.2, y - 0.16, 0.4)
      ]);
      group.add(makeTube(rib.points, 0.04, 12, 6, BoneMaterial));
    });
  }

  // Major Skeletal Muscles (Striated Red Fiber)
  // Pectoralis Major (Chest muscles)
  [-1, 1].forEach(side => {
    const pecGeo = new THREE.SphereGeometry(0.55, 16, 14);
    pecGeo.scale(1.1, 0.6, 0.4);
    const pecMesh = new THREE.Mesh(pecGeo, MuscleMaterial);
    pecMesh.position.set(side * 0.48, 0.55, 0.32);
    pecMesh.rotation.z = side * 0.2;
    group.add(pecMesh);
  });

  // Deltoideus (Shoulder muscles)
  [-1, 1].forEach(side => {
    const deltGeo = new THREE.SphereGeometry(0.42, 16, 14);
    deltGeo.scale(0.8, 1.2, 0.9);
    const deltMesh = new THREE.Mesh(deltGeo, MuscleMaterial);
    deltMesh.position.set(side * 1.05, 0.8, 0.05);
    group.add(deltMesh);
  });

  // Biceps Brachii (Arm flexor)
  [-1, 1].forEach(side => {
    const bicepGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.85, 12);
    const bicepMesh = new THREE.Mesh(bicepGeo, MuscleMaterial);
    bicepMesh.position.set(side * 1.25, 0.1, 0.05);
    group.add(bicepMesh);
  });

  // Rectus Abdominis (Abdominal 6-pack)
  for (let row = 0; row < 3; row++) {
    [-1, 1].forEach(side => {
      const abGeo = new THREE.BoxGeometry(0.24, 0.2, 0.1);
      const abMesh = new THREE.Mesh(abGeo, MuscleMaterial);
      abMesh.position.set(side * 0.16, 0.1 - row * 0.24, 0.35);
      group.add(abMesh);
    });
  }

  // Pelvis / Hip Bones
  const pelvisGeo = new THREE.TorusGeometry(0.65, 0.18, 12, 24);
  const pelvis = new THREE.Mesh(pelvisGeo, BoneMaterial);
  pelvis.rotation.x = Math.PI / 2.3;
  pelvis.position.set(0, -0.75, 0.05);
  group.add(pelvis);

  // Quadriceps Femoris (Thigh muscles)
  [-1, 1].forEach(side => {
    const quadGeo = new THREE.CylinderGeometry(0.28, 0.22, 1.4, 14);
    const quadMesh = new THREE.Mesh(quadGeo, MuscleMaterial);
    quadMesh.position.set(side * 0.52, -1.6, 0.05);
    group.add(quadMesh);

    // Knee Joint (Cartilage cap)
    const kneeGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const knee = new THREE.Mesh(kneeGeo, CartilageMaterial);
    knee.position.set(side * 0.52, -2.4, 0.08);
    group.add(knee);

    // Gastrocnemius (Calf muscle)
    const calfGeo = new THREE.SphereGeometry(0.24, 14, 14);
    calfGeo.scale(0.85, 1.4, 0.9);
    const calf = new THREE.Mesh(calfGeo, MuscleMaterial);
    calf.position.set(side * 0.52, -3.0, -0.05);
    group.add(calf);
  });

  group.scale.set(0.95, 0.95, 0.95);
  group.position.y = 0.6;
  return group;
}

// -------------------------------------------------------------
// 13. URINARY SYSTEM MODEL (Systema urinarium)
// -------------------------------------------------------------
export function createUrinarySystemModel() {
  const group = new THREE.Group();
  group.name = "urinary_system";

  // Left and Right Kidneys (Ren dexter & sinister)
  [-1, 1].forEach(side => {
    const kGeo = new THREE.SphereGeometry(0.65, 24, 20);
    kGeo.scale(0.82, 1.35, 0.72);
    const kMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.35 });
    const kMesh = new THREE.Mesh(kGeo, kMat);
    // Right kidney is slightly lower due to liver
    const yOffset = (side > 0) ? -0.1 : 0.05;
    kMesh.position.set(side * 1.05, 0.4 + yOffset, 0);
    kMesh.rotation.z = side * 0.15;
    group.add(kMesh);

    // Adrenal Glands (Golden-Yellow cap)
    const agGeo = new THREE.ConeGeometry(0.28, 0.35, 10);
    const agMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
    const agMesh = new THREE.Mesh(agGeo, agMat);
    agMesh.position.set(side * 1.05, 1.2 + yOffset, 0);
    group.add(agMesh);

    // Renal Artery (Red) & Vein (Blue)
    const rArt = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.45, -0.1),
      new THREE.Vector3(side * 0.85, 0.4 + yOffset, -0.05)
    ]);
    const rVein = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, 0.35, -0.08),
      new THREE.Vector3(side * 0.85, 0.32 + yOffset, 0.02)
    ]);
    group.add(makeTube(rArt.points, 0.07, 10, 8, AortaMaterial));
    group.add(makeTube(rVein.points, 0.085, 10, 8, VeinMaterial));

    // Ureters (Siydik naylari - Traveling down to bladder)
    const ureterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.88, 0.25 + yOffset, 0),
      new THREE.Vector3(side * 0.65, -0.4, 0.05),
      new THREE.Vector3(side * 0.42, -1.0, 0.08),
      new THREE.Vector3(side * 0.22, -1.5, 0.05)
    ]);
    const ureterMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4 });
    group.add(makeTube(ureterCurve.points, 0.055, 24, 8, ureterMat));
  });

  // Aorta & IVC Segments
  const aortaSeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.2, -0.1),
    new THREE.Vector3(0, -0.6, -0.1)
  ]);
  const ivcSeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.16, 1.2, -0.08),
    new THREE.Vector3(0.16, -0.6, -0.08)
  ]);
  group.add(makeTube(aortaSeg.points, 0.12, 14, 10, AortaMaterial));
  group.add(makeTube(ivcSeg.points, 0.14, 14, 10, VeinMaterial));

  // Urinary Bladder (Siydik pufagi / Qovuq - muscular pear)
  const bladderGeo = new THREE.SphereGeometry(0.62, 24, 20);
  bladderGeo.scale(1.05, 0.95, 0.92);
  const bladderMat = new THREE.MeshStandardMaterial({ color: 0xfb923c, roughness: 0.4 });
  const bladder = new THREE.Mesh(bladderGeo, bladderMat);
  bladder.position.set(0, -1.65, 0.08);
  group.add(bladder);

  // Urethra
  const urethraCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -2.1, 0.08),
    new THREE.Vector3(0, -2.55, 0.12)
  ]);
  group.add(makeTube(urethraCurve.points, 0.07, 10, 8, bladderMat));

  group.scale.set(1.2, 1.2, 1.2);
  group.position.y = 0.3;
  return group;
}

// -------------------------------------------------------------
// 14. ENDOCRINE SYSTEM MODEL (Systema endocrinum)
// -------------------------------------------------------------
export function createEndocrineSystemModel() {
  const group = new THREE.Group();
  group.name = "endocrine_system";

  // Pituitary Gland (Hypophysis - glowing blue orb at head level)
  const pitGeo = new THREE.SphereGeometry(0.24, 18, 18);
  const pitMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.5,
    roughness: 0.25
  });
  const pituitary = new THREE.Mesh(pitGeo, pitMat);
  pituitary.position.set(0, 2.2, 0);
  group.add(pituitary);

  // Thyroid Gland (Qalqonsimon bez - Butterfly shape in neck)
  const thyroidMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4 });
  [-1, 1].forEach(side => {
    const lobeGeo = new THREE.SphereGeometry(0.35, 18, 16);
    lobeGeo.scale(0.75, 1.35, 0.65);
    const lobe = new THREE.Mesh(lobeGeo, thyroidMat);
    lobe.position.set(side * 0.32, 1.3, 0.12);
    lobe.rotation.z = -side * 0.2;
    group.add(lobe);
  });
  // Isthmus
  const isthmusGeo = new THREE.BoxGeometry(0.35, 0.18, 0.12);
  const isthmus = new THREE.Mesh(isthmusGeo, thyroidMat);
  isthmus.position.set(0, 1.22, 0.18);
  group.add(isthmus);

  // Thymus Gland (In chest)
  const thymusGeo = new THREE.SphereGeometry(0.38, 18, 16);
  thymusGeo.scale(0.9, 1.2, 0.6);
  const thymusMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.45 });
  const thymus = new THREE.Mesh(thymusGeo, thymusMat);
  thymus.position.set(0, 0.65, 0.1);
  group.add(thymus);

  // Adrenal Glands (On kidneys)
  [-1, 1].forEach(side => {
    const agGeo = new THREE.ConeGeometry(0.26, 0.38, 10);
    const agMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.35 });
    const agMesh = new THREE.Mesh(agGeo, agMat);
    agMesh.position.set(side * 0.85, -0.2, 0);
    group.add(agMesh);
  });

  // Pancreatic Islets indicator (Pancreas with glowing hormone dots)
  const panc = createPancreasModel();
  panc.scale.set(0.65, 0.65, 0.65);
  panc.position.set(0.2, -0.65, 0.1);
  group.add(panc);

  // Glowing Hormone Distribution Beams (Translucent cyan-violet vertical lines)
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.35,
    wireframe: true
  });
  const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 4.6, 8);
  const beamMesh = new THREE.Mesh(beamGeo, beamMat);
  beamMesh.position.set(0, 0.1, 0);
  group.add(beamMesh);

  group.scale.set(1.15, 1.15, 1.15);
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
  eye: createEyeTissuesModel,
  gallbladder: createGallbladderModel,
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
  spine: createSpineModel
};
