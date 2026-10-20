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
// 8. NERVOUS SYSTEM MODEL (Systema nervosum, Columna vertebralis et Medulla spinalis)
// -------------------------------------------------------------
export function createNervousSystemModel() {
  const group = new THREE.Group();
  group.name = "nervous_system";

  // 1. BRAIN (Encephalon - Anatomical Lobes, Cerebellum & Brainstem)
  const brainGroup = new THREE.Group();
  brainGroup.position.set(0, 2.25, 0);

  // Left & Right Cerebral Hemispheres with distinct anatomical lobes
  [-1, 1].forEach(side => {
    // Frontal Lobe (Peshona bo'lagi - Sky Blue)
    const frontGeo = new THREE.SphereGeometry(0.42, 20, 18);
    frontGeo.scale(0.85, 0.95, 1.15);
    const frontMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.38 });
    const frontMesh = new THREE.Mesh(frontGeo, frontMat);
    frontMesh.position.set(side * 0.32, 0.18, 0.28);
    brainGroup.add(frontMesh);

    // Parietal Lobe (Tepa bo'lagi - Emerald Green)
    const pariGeo = new THREE.SphereGeometry(0.4, 18, 16);
    pariGeo.scale(0.85, 1.05, 1.0);
    const pariMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.38 });
    const pariMesh = new THREE.Mesh(pariGeo, pariMat);
    pariMesh.position.set(side * 0.34, 0.28, -0.15);
    brainGroup.add(pariMesh);

    // Occipital Lobe (Ensa bo'lagi - Amber Gold)
    const occGeo = new THREE.SphereGeometry(0.32, 16, 14);
    occGeo.scale(0.8, 0.85, 0.95);
    const occMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.38 });
    const occMesh = new THREE.Mesh(occGeo, occMat);
    occMesh.position.set(side * 0.28, 0.05, -0.48);
    brainGroup.add(occMesh);

    // Temporal Lobe (Chakka bo'lagi - Lavender Purple)
    const tempGeo = new THREE.SphereGeometry(0.35, 18, 14);
    tempGeo.scale(0.75, 0.8, 1.1);
    const tempMat = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.38 });
    const tempMesh = new THREE.Mesh(tempGeo, tempMat);
    tempMesh.position.set(side * 0.42, -0.12, 0.05);
    brainGroup.add(tempMesh);

    // Cerebellar Hemisphere (Miyacha yarimshari - Coral Red with folia)
    const cereGeo = new THREE.SphereGeometry(0.32, 18, 16);
    cereGeo.scale(0.9, 0.8, 0.85);
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
  eye: createEyeTissuesModel,
  eye_tissues: createEyeTissuesModel,
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
