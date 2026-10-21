import * as THREE from 'three';

// ---------------------------------------------------------------------------
// HELPER UTILITIES FOR ANATOMICAL TUBES, SEGMENTS, AND ORGANS
// ---------------------------------------------------------------------------
function makeTube(points, radius = 0.08, segments = 24, radialSegments = 12, material) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, segments, radius, radialSegments, false);
  return new THREE.Mesh(geo, material.clone ? material.clone() : material);
}

// ===========================================================================
// 1. O'T PUFAGI VA O'T YO'LLARI (Vesica biliaris & Ductus biliares)
// ===========================================================================
export function createGallbladderBiliaryModel() {
  const group = new THREE.Group();
  group.name = "gallbladder_biliary_tree";

  const gbShader = new THREE.MeshPhysicalMaterial({
    color: 0x15803d, // Emerald olive bile green
    emissive: 0x052e16,
    emissiveIntensity: 0.12,
    roughness: 0.22,
    metalness: 0.04,
    clearcoat: 0.92,
    clearcoatRoughness: 0.1,
    transmission: 0.15,
    ior: 1.36,
    side: THREE.DoubleSide
  });

  const ductShader = new THREE.MeshPhysicalMaterial({
    color: 0x16a34a,
    roughness: 0.28,
    metalness: 0.03,
    clearcoat: 0.75,
    side: THREE.DoubleSide
  });

  const duodenumShader = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.38,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const pancreaticDuctShader = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    roughness: 0.3,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const arteryShader = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.25,
    metalness: 0.1
  });

  const veinShader = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.25,
    metalness: 0.1
  });

  // A. GALLBLADDER RESERVOIR (Fundus, Corpus, Collum, Hartmann's pouch)
  const fundusGeo = new THREE.SphereGeometry(0.55, 32, 28);
  fundusGeo.scale(0.85, 1.25, 0.9);
  const fundusMesh = new THREE.Mesh(fundusGeo, gbShader);
  fundusMesh.position.set(0.65, 0.45, 0.2);
  fundusMesh.rotation.z = -0.35;
  group.add(fundusMesh);

  const bodyGeo = new THREE.CylinderGeometry(0.38, 0.52, 0.95, 32);
  bodyGeo.scale(0.88, 1, 0.85);
  const bodyMesh = new THREE.Mesh(bodyGeo, gbShader);
  bodyMesh.position.set(0.48, 1.05, 0.12);
  bodyMesh.rotation.z = -0.32;
  group.add(bodyMesh);

  const neckGeo = new THREE.SphereGeometry(0.32, 24, 20);
  neckGeo.scale(0.85, 1.1, 0.85);
  const neckMesh = new THREE.Mesh(neckGeo, gbShader);
  neckMesh.position.set(0.32, 1.55, 0.05);
  neckMesh.rotation.z = -0.25;
  group.add(neckMesh);

  const pouchGeo = new THREE.SphereGeometry(0.22, 20, 18);
  const pouchMesh = new THREE.Mesh(pouchGeo, gbShader);
  pouchMesh.position.set(0.45, 1.48, 0.15);
  group.add(pouchMesh);

  // B. BILIARY DUCT TREE
  // Cystic duct with Heister's valve spiral folds
  const cysticPts = [
    new THREE.Vector3(0.28, 1.62, 0.04),
    new THREE.Vector3(0.12, 1.72, -0.02),
    new THREE.Vector3(0.04, 1.55, -0.05),
    new THREE.Vector3(-0.08, 1.35, -0.06)
  ];
  group.add(makeTube(cysticPts, 0.065, 24, 12, ductShader));

  for (let h = 0; h < 5; h++) {
    const t = h / 4;
    const pt = new THREE.CatmullRomCurve3(cysticPts).getPoint(t);
    const ringGeo = new THREE.TorusGeometry(0.075, 0.018, 8, 16);
    const ringMesh = new THREE.Mesh(ringGeo, ductShader);
    ringMesh.position.copy(pt);
    ringMesh.rotation.x = Math.PI * 0.4 + h * 0.4;
    group.add(ringMesh);
  }

  // Right & Left Hepatic Ducts
  const rHepaticPts = [
    new THREE.Vector3(0.35, 2.15, -0.1),
    new THREE.Vector3(0.12, 1.82, -0.08),
    new THREE.Vector3(-0.06, 1.62, -0.07)
  ];
  group.add(makeTube(rHepaticPts, 0.06, 16, 10, ductShader));

  const lHepaticPts = [
    new THREE.Vector3(-0.45, 2.05, -0.12),
    new THREE.Vector3(-0.22, 1.78, -0.09),
    new THREE.Vector3(-0.06, 1.62, -0.07)
  ];
  group.add(makeTube(lHepaticPts, 0.055, 16, 10, ductShader));

  // Common Hepatic Duct
  const comHepaticPts = [
    new THREE.Vector3(-0.06, 1.62, -0.07),
    new THREE.Vector3(-0.08, 1.35, -0.06)
  ];
  group.add(makeTube(comHepaticPts, 0.075, 12, 10, ductShader));

  // Common Bile Duct (Ductus choledochus)
  const choledochusPts = [
    new THREE.Vector3(-0.08, 1.35, -0.06),
    new THREE.Vector3(-0.1, 0.85, -0.05),
    new THREE.Vector3(-0.12, 0.35, -0.04),
    new THREE.Vector3(-0.14, -0.25, -0.02),
    new THREE.Vector3(-0.16, -0.72, 0.02)
  ];
  group.add(makeTube(choledochusPts, 0.085, 28, 12, ductShader));

  // Main Pancreatic Duct (Wirsung)
  const pancDuctPts = [
    new THREE.Vector3(-1.15, -0.55, -0.08),
    new THREE.Vector3(-0.75, -0.62, -0.05),
    new THREE.Vector3(-0.35, -0.68, -0.02),
    new THREE.Vector3(-0.16, -0.72, 0.02)
  ];
  group.add(makeTube(pancDuctPts, 0.055, 20, 10, pancreaticDuctShader));

  // Ampulla of Vater & Sphincter of Oddi
  const ampullaGeo = new THREE.SphereGeometry(0.12, 16, 14);
  const ampullaMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.3 });
  const ampullaMesh = new THREE.Mesh(ampullaGeo, ampullaMat);
  ampullaMesh.position.set(-0.16, -0.72, 0.02);
  group.add(ampullaMesh);

  const sphincterGeo = new THREE.TorusGeometry(0.09, 0.035, 8, 16);
  const sphincterMesh = new THREE.Mesh(sphincterGeo, ampullaMat);
  sphincterMesh.position.set(-0.16, -0.72, 0.02);
  sphincterMesh.rotation.y = Math.PI * 0.3;
  group.add(sphincterMesh);

  // Duodenum C-loop
  const duodCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, -0.15, 0.15),
    new THREE.Vector3(0.12, -0.35, 0.12),
    new THREE.Vector3(-0.08, -0.72, 0.08),
    new THREE.Vector3(-0.15, -1.15, 0.05),
    new THREE.Vector3(-0.55, -1.35, 0.02),
    new THREE.Vector3(-0.95, -1.15, -0.02)
  ]);
  group.add(makeTube(duodCurve.points, 0.28, 36, 16, duodenumShader));

  // Calot's triangle vessels
  const cystArtPts = [
    new THREE.Vector3(-0.25, 1.45, -0.12),
    new THREE.Vector3(0.05, 1.52, -0.06),
    new THREE.Vector3(0.28, 1.48, 0.05),
    new THREE.Vector3(0.42, 1.25, 0.18)
  ];
  group.add(makeTube(cystArtPts, 0.038, 18, 8, arteryShader));

  const pvPts = [
    new THREE.Vector3(-0.22, 0.2, -0.15),
    new THREE.Vector3(-0.18, 1.0, -0.16),
    new THREE.Vector3(-0.12, 1.8, -0.18)
  ];
  group.add(makeTube(pvPts, 0.11, 16, 10, veinShader));

  return group;
}

// ===========================================================================
// 2. KO'Z OLMASI ICHKI QATLAMLARI (Bulbus oculi & Tunicae oculi)
// ===========================================================================
export function createEyeInternalLayersModel() {
  const group = new THREE.Group();
  group.name = "eye_internal_layers";

  // Cutaway angle (0 to 1.55 * PI) allowing direct view of inner layers
  const cutAngle = Math.PI * 1.55;

  // 1. SCLERA (Outer Fibrous Tunic)
  const scleraGeo = new THREE.SphereGeometry(1.4, 48, 36, 0, cutAngle);
  const scleraMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.28,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
  group.add(scleraMesh);

  // 2. CORNEA (Anterior Transparent Window)
  const corneaGeo = new THREE.SphereGeometry(0.85, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.45);
  corneaGeo.scale(1.0, 1.0, 0.65);
  const corneaMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transmission: 0.95,
    roughness: 0.04,
    ior: 1.376,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });
  const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
  corneaMesh.position.set(0, 0, 1.15);
  group.add(corneaMesh);

  // 3. CHOROID (Middle Vascular Layer)
  const choroidGeo = new THREE.SphereGeometry(1.36, 48, 36, 0, cutAngle);
  const choroidMat = new THREE.MeshStandardMaterial({
    color: 0x31102b, // Dark brown-violet vascular pigment
    roughness: 0.42,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  const choroidMesh = new THREE.Mesh(choroidGeo, choroidMat);
  group.add(choroidMesh);

  // 4. RETINA (Inner Neural Layer with Ora Serrata)
  const retinaGeo = new THREE.SphereGeometry(1.32, 48, 36, 0, cutAngle, 0, Math.PI * 0.72);
  const retinaMat = new THREE.MeshStandardMaterial({
    color: 0xfb923c, // Sensory retinal amber/coral
    roughness: 0.35,
    metalness: 0.02,
    side: THREE.DoubleSide
  });
  const retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
  group.add(retinaMesh);

  // Macula Lutea & Fovea Centralis on Retina
  const maculaGeo = new THREE.CircleGeometry(0.12, 16);
  const maculaMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide });
  const maculaMesh = new THREE.Mesh(maculaGeo, maculaMat);
  maculaMesh.position.set(0.35, 0, -1.31);
  group.add(maculaMesh);

  // Optic Disc (Blind Spot / Papilla)
  const discGeo = new THREE.CircleGeometry(0.14, 16);
  const discMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.position.set(-0.25, 0, -1.31);
  group.add(discMesh);

  // Retinal Blood Vessels (Central retinal artery and vein branching)
  const artShader = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 });
  const veinShader = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25 });
  [
    [new THREE.Vector3(-0.25, 0, -1.31), new THREE.Vector3(-0.35, 0.45, -1.15), new THREE.Vector3(-0.25, 0.85, -0.85)],
    [new THREE.Vector3(-0.25, 0, -1.31), new THREE.Vector3(-0.38, -0.42, -1.15), new THREE.Vector3(-0.3, -0.82, -0.85)],
    [new THREE.Vector3(-0.25, 0, -1.31), new THREE.Vector3(0.15, 0.35, -1.22), new THREE.Vector3(0.55, 0.65, -0.95)],
    [new THREE.Vector3(-0.25, 0, -1.31), new THREE.Vector3(0.18, -0.32, -1.22), new THREE.Vector3(0.58, -0.62, -0.95)]
  ].forEach((pts, idx) => {
    group.add(makeTube(pts, 0.022, 12, 6, idx % 2 === 0 ? artShader : veinShader));
  });

  // 5. CILIARY BODY & ZONULAR FIBERS
  const ciliaryGeo = new THREE.TorusGeometry(0.88, 0.12, 16, 40);
  const ciliaryMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 });
  const ciliaryMesh = new THREE.Mesh(ciliaryGeo, ciliaryMat);
  ciliaryMesh.position.set(0, 0, 0.72);
  group.add(ciliaryMesh);

  // Zonular fibers (Zinn suspensory ligaments)
  for (let z = 0; z < 36; z++) {
    const angle = (z / 36) * Math.PI * 2;
    const fiberPts = [
      new THREE.Vector3(Math.cos(angle) * 0.85, Math.sin(angle) * 0.85, 0.72),
      new THREE.Vector3(Math.cos(angle) * 0.52, Math.sin(angle) * 0.52, 0.72)
    ];
    const fiberLine = makeTube(fiberPts, 0.008, 4, 4, new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.6 }));
    group.add(fiberLine);
  }

  // 6. IRIS & PUPIL
  const irisGeo = new THREE.RingGeometry(0.24, 0.78, 36);
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Brilliant medical blue iris
    roughness: 0.3,
    metalness: 0.05,
    side: THREE.DoubleSide
  });
  const irisMesh = new THREE.Mesh(irisGeo, irisMat);
  irisMesh.position.set(0, 0, 0.95);
  group.add(irisMesh);

  // 7. CRYSTALLINE BICONVEX LENS (Billur gavhar)
  const lensGeo = new THREE.SphereGeometry(0.52, 32, 24);
  lensGeo.scale(1.0, 1.0, 0.48);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.96,
    roughness: 0.05,
    ior: 1.413,
    transparent: true,
    opacity: 0.85
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.position.set(0, 0, 0.72);
  group.add(lensMesh);

  // 8. VITREOUS BODY (Shishasimon tana)
  const vitreousGeo = new THREE.SphereGeometry(1.28, 36, 24, 0, cutAngle);
  const vitreousMat = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    transmission: 0.88,
    roughness: 0.1,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });
  const vitreousMesh = new THREE.Mesh(vitreousGeo, vitreousMat);
  group.add(vitreousMesh);

  // 9. OPTIC NERVE CABLE (Nervus opticus)
  const opticPts = [
    new THREE.Vector3(-0.25, 0, -1.35),
    new THREE.Vector3(-0.35, -0.05, -1.85),
    new THREE.Vector3(-0.45, -0.1, -2.45)
  ];
  const opticMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.35 });
  group.add(makeTube(opticPts, 0.22, 16, 12, opticMat));

  return group;
}

// ===========================================================================
// 3. QIZILO'NGACH VA HALQUM (Esophagus & Pharynx)
// ===========================================================================
export function createEsophagusPharynxModel() {
  const group = new THREE.Group();
  group.name = "esophagus_pharynx";

  const pharynxMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b, // Pharyngeal constrictor muscle deep red
    roughness: 0.38,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const esophMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c, // Muscularis externa rose-crimson
    roughness: 0.36,
    metalness: 0.04,
    side: THREE.DoubleSide
  });

  const mucosaMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // Inner stratified mucosa pink
    roughness: 0.28,
    side: THREE.DoubleSide
  });

  const cartilageMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd, // Hyaline cartilage blue
    roughness: 0.25,
    transparent: true,
    opacity: 0.88
  });

  // A. PHARYNX (Halqum - Funnel from skull base to C6)
  // Superior, Middle, Inferior Constrictors
  const pharynxCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.2, -0.05), // Nasopharynx
    new THREE.Vector3(0, 1.7, 0.0),   // Oropharynx
    new THREE.Vector3(0, 1.25, 0.02)  // Laryngopharynx
  ]);
  const pharynxMesh = makeTube(pharynxCurve.points, 0.42, 24, 16, pharynxMat);
  group.add(pharynxMesh);

  // Posterior Pharyngeal Raphe (Fibrous midline seam)
  const raphePts = [
    new THREE.Vector3(0, 2.2, -0.44),
    new THREE.Vector3(0, 1.25, -0.42)
  ];
  group.add(makeTube(raphePts, 0.035, 12, 6, new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })));

  // Piriform Recesses (Noksimon chuqurchalar)
  [-1, 1].forEach(side => {
    const recessGeo = new THREE.SphereGeometry(0.14, 14, 12);
    recessGeo.scale(0.6, 1.4, 0.7);
    const recessMesh = new THREE.Mesh(recessGeo, mucosaMat);
    recessMesh.position.set(side * 0.32, 1.35, -0.15);
    group.add(recessMesh);
  });

  // Cricoid & Thyroid Cartilage Landmarks for Upper Sphincter
  const cricGeo = new THREE.CylinderGeometry(0.38, 0.36, 0.35, 20);
  const cricMesh = new THREE.Mesh(cricGeo, cartilageMat);
  cricMesh.position.set(0, 1.15, 0.18);
  group.add(cricMesh);

  // B. UPPER ESOPHAGEAL SPHINCTER (Cricopharyngeus muscle ring)
  const uesGeo = new THREE.TorusGeometry(0.28, 0.07, 12, 24);
  const uesMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.4 });
  const uesMesh = new THREE.Mesh(uesGeo, uesMat);
  uesMesh.rotation.x = Math.PI / 2;
  uesMesh.position.set(0, 1.12, 0);
  group.add(uesMesh);

  // C. ESOPHAGUS TUBE (Qizilo'ngach - 25cm anatomical course with physiological curves)
  const esophCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.1, 0),         // Cervical start (C6)
    new THREE.Vector3(-0.04, 0.65, -0.02), // Slight left deviation in neck
    new THREE.Vector3(0, 0.15, -0.05),    // Thoracic inlet
    new THREE.Vector3(0.03, -0.35, -0.06), // Aortic arch compression (T4)
    new THREE.Vector3(0.01, -0.85, -0.04), // Left bronchus compression (T5)
    new THREE.Vector3(-0.06, -1.35, 0.02), // Lower thoracic curving anterior-left
    new THREE.Vector3(-0.14, -1.75, 0.12)  // Diaphragmatic hiatus & Cardia (T10-T11)
  ]);
  const esophMesh = makeTube(esophCurve.points, 0.22, 40, 16, esophMat);
  group.add(esophMesh);

  // Longitudinal Muscular Striations (Outer layer)
  for (let s = 0; s < 8; s++) {
    const angle = (s / 8) * Math.PI * 2;
    const striationPts = esophCurve.getPoints(20).map(p => {
      return new THREE.Vector3(
        p.x + Math.cos(angle) * 0.225,
        p.y,
        p.z + Math.sin(angle) * 0.225
      );
    });
    group.add(makeTube(striationPts, 0.018, 20, 6, new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.4 })));
  }

  // D. LOWER ESOPHAGEAL SPHINCTER & CARDIAL JUNCTION (Z-line)
  const lesGeo = new THREE.CylinderGeometry(0.24, 0.38, 0.35, 24);
  const lesMesh = new THREE.Mesh(lesGeo, esophMat);
  lesMesh.position.set(-0.16, -1.82, 0.15);
  group.add(lesMesh);

  // Gastric Cardia Flare
  const cardiaGeo = new THREE.ConeGeometry(0.65, 0.5, 24, 1, true);
  const cardiaMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.35, side: THREE.DoubleSide });
  const cardiaMesh = new THREE.Mesh(cardiaGeo, cardiaMat);
  cardiaMesh.rotation.x = Math.PI;
  cardiaMesh.position.set(-0.2, -2.1, 0.18);
  group.add(cardiaMesh);

  // Diaphragmatic Muscular Ring at Hiatus
  const hiatRingGeo = new THREE.TorusGeometry(0.35, 0.065, 10, 24);
  const hiatRingMesh = new THREE.Mesh(hiatRingGeo, new THREE.MeshStandardMaterial({ color: 0x713f12, roughness: 0.5 }));
  hiatRingMesh.rotation.x = Math.PI * 0.45;
  hiatRingMesh.position.set(-0.11, -1.62, 0.08);
  group.add(hiatRingMesh);

  return group;
}

// ===========================================================================
// 4. SO'LAK BEZLARI (Glandulae salivariae: Parotis, Submandibularis, Sublingualis)
// ===========================================================================
export function createSalivaryGlandsModel() {
  const group = new THREE.Group();
  group.name = "salivary_glands";

  const glandMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Warm glandular lobular amber
    roughness: 0.45,
    metalness: 0.05
  });

  const ductMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // Excretory ducts pearly ivory
    roughness: 0.25,
    metalness: 0.08
  });

  const boneRefMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.42,
    transparent: true,
    opacity: 0.32
  });

  const tongueMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.45
  });

  // A. MANDIBLE BONE REFERENCE (Pastki jag' suyagi ko'rinishi)
  const jawCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.15, 1.15, -0.65), // Left condyle
    new THREE.Vector3(-1.25, 0.2, -0.45),  // Left angle
    new THREE.Vector3(-0.75, -0.25, 0.35),
    new THREE.Vector3(0, -0.35, 0.85),     // Chin / Symphysis menti
    new THREE.Vector3(0.75, -0.25, 0.35),
    new THREE.Vector3(1.25, 0.2, -0.45),   // Right angle
    new THREE.Vector3(1.15, 1.15, -0.65)   // Right condyle
  ]);
  group.add(makeTube(jawCurve.points, 0.12, 32, 12, boneRefMat));

  // Tongue Base
  const tongueGeo = new THREE.SphereGeometry(0.65, 24, 20);
  tongueGeo.scale(0.85, 0.55, 1.25);
  const tongueMesh = new THREE.Mesh(tongueGeo, tongueMat);
  tongueMesh.position.set(0, 0.15, 0.25);
  group.add(tongueMesh);

  // B. PAROTID GLANDS (Quloqoldi so'lak bezi & Stensen yo'li - bilateral)
  [-1, 1].forEach(side => {
    // Lobulated parotid mass (Wedge-shaped)
    const parotidGeo = new THREE.SphereGeometry(0.55, 24, 20);
    parotidGeo.scale(0.7, 1.35, 0.85);
    const parotidMesh = new THREE.Mesh(parotidGeo, glandMat);
    parotidMesh.position.set(side * 1.32, 0.55, -0.35);
    parotidMesh.rotation.z = side * 0.18;
    group.add(parotidMesh);

    // Stensen's Duct (Ductus parotideus - 5cm duct crossing masseter)
    const stensenPts = [
      new THREE.Vector3(side * 1.25, 0.65, -0.25),
      new THREE.Vector3(side * 1.15, 0.62, 0.15),
      new THREE.Vector3(side * 0.85, 0.55, 0.48),
      new THREE.Vector3(side * 0.52, 0.45, 0.42) // Piercing buccinator
    ];
    group.add(makeTube(stensenPts, 0.042, 20, 8, ductMat));

    // Accessory parotid gland lobule
    const accGeo = new THREE.SphereGeometry(0.16, 14, 12);
    const accMesh = new THREE.Mesh(accGeo, glandMat);
    accMesh.position.set(side * 1.05, 0.78, 0.08);
    group.add(accMesh);
  });

  // C. SUBMANDIBULAR GLANDS (Jag'osti so'lak bezi & Wharton yo'li)
  [-1, 1].forEach(side => {
    // Walnut-shaped gland under mandible angle
    const submanGeo = new THREE.SphereGeometry(0.42, 22, 18);
    submanGeo.scale(1.1, 0.85, 0.9);
    const submanMesh = new THREE.Mesh(submanGeo, glandMat);
    submanMesh.position.set(side * 0.85, -0.25, 0.05);
    group.add(submanMesh);

    // Wharton's Duct (Ductus submandibularis)
    const whartonPts = [
      new THREE.Vector3(side * 0.75, -0.18, 0.1),
      new THREE.Vector3(side * 0.45, -0.05, 0.35),
      new THREE.Vector3(side * 0.12, 0.02, 0.65) // Caruncula sublingualis
    ];
    group.add(makeTube(whartonPts, 0.038, 18, 8, ductMat));
  });

  // D. SUBLINGUAL GLANDS (Tilosti so'lak bezi - under anterior tongue)
  [-1, 1].forEach(side => {
    // Almond-shaped cluster
    const sublingGeo = new THREE.SphereGeometry(0.32, 20, 16);
    sublingGeo.scale(0.55, 0.45, 1.35);
    const sublingMesh = new THREE.Mesh(sublingGeo, glandMat);
    sublingMesh.position.set(side * 0.32, -0.02, 0.52);
    group.add(sublingMesh);

    // Minor sublingual ducts (Rivinus)
    for (let d = 0; d < 4; d++) {
      const dPts = [
        new THREE.Vector3(side * 0.32, 0.06, 0.35 + d * 0.12),
        new THREE.Vector3(side * 0.25, 0.15, 0.35 + d * 0.12)
      ];
      group.add(makeTube(dPts, 0.018, 6, 6, ductMat));
    }
  });

  // Facial Artery vascular curve
  [-1, 1].forEach(side => {
    const artPts = [
      new THREE.Vector3(side * 0.65, -0.65, -0.15),
      new THREE.Vector3(side * 0.88, -0.32, -0.05),
      new THREE.Vector3(side * 0.82, -0.12, 0.22),
      new THREE.Vector3(side * 0.65, 0.18, 0.45)
    ];
    group.add(makeTube(artPts, 0.035, 16, 8, new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 })));
  });

  return group;
}

// ===========================================================================
// 5. INGICHKA ICHAK (Intestinum tenue: Duodenum, Jejunum, Ileum & Mesenterium)
// ===========================================================================
export function createSmallIntestineModel() {
  const group = new THREE.Group();
  group.name = "small_intestine";

  const jejunumMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e, // Rich vascular pink-red for jejunum
    roughness: 0.38,
    metalness: 0.03,
    side: THREE.DoubleSide
  });

  const ileumMat = new THREE.MeshStandardMaterial({
    color: 0xfb7185, // Paler rose for ileum
    roughness: 0.4,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const mesenteryMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Fatty translucent yellow mesentery
    transparent: true,
    opacity: 0.55,
    roughness: 0.5,
    side: THREE.DoubleSide
  });

  const artMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25 });

  // A. JEJUNUM LOOPS (Upper left quadrant convoluted loops)
  const jejunumCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.45, 1.25, 0.0),   // Duodenojejunal flexure
    new THREE.Vector3(-0.95, 1.15, 0.15),
    new THREE.Vector3(-1.15, 0.75, 0.25),
    new THREE.Vector3(-0.65, 0.55, 0.35),
    new THREE.Vector3(-0.95, 0.35, 0.42),
    new THREE.Vector3(-1.25, 0.15, 0.25),
    new THREE.Vector3(-0.75, -0.05, 0.32),
    new THREE.Vector3(-0.35, 0.15, 0.28),
    new THREE.Vector3(-0.65, -0.25, 0.35),
    new THREE.Vector3(-1.05, -0.35, 0.22),
    new THREE.Vector3(-0.55, -0.55, 0.35),
    new THREE.Vector3(-0.15, -0.45, 0.28)
  ]);
  const jejMesh = makeTube(jejunumCurve.points, 0.18, 50, 14, jejunumMat);
  group.add(jejMesh);

  // Circular mucosal plicae rings on Jejunum
  const jejPts = jejunumCurve.getPoints(35);
  for (let i = 2; i < jejPts.length - 2; i += 2) {
    const pt = jejPts[i];
    const ringGeo = new THREE.TorusGeometry(0.19, 0.022, 6, 12);
    const ringMesh = new THREE.Mesh(ringGeo, jejunumMat);
    ringMesh.position.copy(pt);
    group.add(ringMesh);
  }

  // B. ILEUM LOOPS (Lower right quadrant convoluted loops terminating at cecum)
  const ileumCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, -0.45, 0.28),
    new THREE.Vector3(0.25, -0.35, 0.32),
    new THREE.Vector3(0.65, -0.15, 0.25),
    new THREE.Vector3(0.35, 0.15, 0.28),
    new THREE.Vector3(0.75, 0.35, 0.22),
    new THREE.Vector3(0.45, 0.55, 0.32),
    new THREE.Vector3(0.85, 0.75, 0.18),
    new THREE.Vector3(0.55, -0.65, 0.32),
    new THREE.Vector3(0.15, -0.85, 0.28),
    new THREE.Vector3(0.45, -1.05, 0.22),
    new THREE.Vector3(0.85, -0.95, 0.15),
    new THREE.Vector3(1.15, -0.85, 0.05) // Terminal ileum entering cecum
  ]);
  const ileumMesh = makeTube(ileumCurve.points, 0.155, 50, 14, ileumMat);
  group.add(ileumMesh);

  // C. MESENTERY SHEET & VASCULAR ARCADES
  const mesCenter = new THREE.Vector3(0, 0.35, -0.2);
  const mesGeo = new THREE.CylinderGeometry(0.15, 1.35, 1.8, 20, 8, true);
  mesGeo.scale(1.1, 1, 0.65);
  const mesMesh = new THREE.Mesh(mesGeo, mesenteryMat);
  mesMesh.position.set(0, 0.1, -0.05);
  group.add(mesMesh);

  // Superior Mesenteric Artery & Vein Trunk
  const smaPts = [
    new THREE.Vector3(0, 1.35, -0.25),
    new THREE.Vector3(-0.05, 0.65, -0.15),
    new THREE.Vector3(0.15, -0.25, -0.05)
  ];
  group.add(makeTube(smaPts, 0.065, 16, 8, artMat));

  const smvPts = [
    new THREE.Vector3(0.12, 1.35, -0.22),
    new THREE.Vector3(0.08, 0.65, -0.12),
    new THREE.Vector3(0.24, -0.25, -0.02)
  ];
  group.add(makeTube(smvPts, 0.075, 16, 8, veinMat));

  // Primary and Secondary Arterial Arcades (Kamarlar)
  for (let a = 0; a < 6; a++) {
    const angle = (a / 5) * Math.PI - Math.PI / 2;
    const arcPts = [
      new THREE.Vector3(-0.05, 0.65 - a * 0.15, -0.15),
      new THREE.Vector3(Math.cos(angle) * 0.65, 0.45 - a * 0.18, 0.05),
      new THREE.Vector3(Math.cos(angle) * 0.95, 0.35 - a * 0.22, 0.18)
    ];
    group.add(makeTube(arcPts, 0.025, 12, 6, artMat));
  }

  return group;
}

// ===========================================================================
// 6. YO'G'ON ICHAK VA APPENDIKS (Intestinum crassum: Cecum, Colon, Rectum & Appendix)
// ===========================================================================
export function createLargeIntestineAppendixModel() {
  const group = new THREE.Group();
  group.name = "large_intestine_appendix";

  const colonMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c, // Anatomical warm colon tissue
    roughness: 0.36,
    metalness: 0.03,
    side: THREE.DoubleSide
  });

  const appendixMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b, // Vermiform appendix crimson
    roughness: 0.38,
    metalness: 0.04
  });

  const taeniaMat = new THREE.MeshStandardMaterial({
    color: 0xfecdd3, // Pale longitudinal muscle bands
    roughness: 0.3
  });

  const fatMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Fatty yellow epiploic appendages
    roughness: 0.6
  });

  // A. MAIN COLON FRAME (Cecum -> Ascending -> Transverse -> Descending -> Sigmoid -> Rectum)
  const colonCurve = new THREE.CatmullRomCurve3([
    // Cecum (Right lower quadrant)
    new THREE.Vector3(1.15, -1.05, 0.12),
    // Ascending colon
    new THREE.Vector3(1.18, -0.45, 0.05),
    new THREE.Vector3(1.15, 0.35, 0.0),
    // Hepatic flexure (Right colic flexure)
    new THREE.Vector3(1.05, 0.95, 0.05),
    // Transverse colon
    new THREE.Vector3(0.55, 1.15, 0.22),
    new THREE.Vector3(0.0, 1.05, 0.25),
    new THREE.Vector3(-0.65, 1.18, 0.2),
    // Splenic flexure (Left colic flexure - higher and deeper)
    new THREE.Vector3(-1.15, 1.25, 0.02),
    // Descending colon
    new THREE.Vector3(-1.18, 0.45, -0.05),
    new THREE.Vector3(-1.15, -0.35, -0.02),
    // Sigmoid colon (S-shaped curve into pelvis)
    new THREE.Vector3(-0.95, -0.95, 0.15),
    new THREE.Vector3(-0.55, -1.25, 0.22),
    new THREE.Vector3(-0.15, -1.15, 0.05),
    // Rectum & Anal canal
    new THREE.Vector3(0, -1.55, -0.1),
    new THREE.Vector3(0, -1.95, -0.15)
  ]);

  const colonMesh = makeTube(colonCurve.points, 0.28, 60, 16, colonMat);
  group.add(colonMesh);

  // B. HAUSTRATIONS (Haustra coli - 45 distinct circular pouches along colon)
  const colonPts = colonCurve.getPoints(50);
  for (let h = 1; h < colonPts.length - 2; h += 2) {
    const pt = colonPts[h];
    const haustraGeo = new THREE.TorusGeometry(0.29, 0.05, 8, 16);
    const haustraMesh = new THREE.Mesh(haustraGeo, colonMat);
    haustraMesh.position.copy(pt);
    group.add(haustraMesh);

    // Appendices epiploicae (Fatty tags hanging along haustra)
    if (h % 4 === 0) {
      const tagGeo = new THREE.SphereGeometry(0.08, 10, 8);
      tagGeo.scale(0.8, 1.5, 0.6);
      const tagMesh = new THREE.Mesh(tagGeo, fatMat);
      tagMesh.position.set(pt.x + 0.26, pt.y - 0.08, pt.z + 0.12);
      group.add(tagMesh);
    }
  }

  // C. TAENIA COLI (3 distinct longitudinal muscle bands)
  [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach(offset => {
    const taeniaPts = colonCurve.getPoints(40).map(p => {
      return new THREE.Vector3(
        p.x + Math.cos(offset) * 0.285,
        p.y + Math.sin(offset) * 0.15,
        p.z + Math.sin(offset) * 0.285
      );
    });
    group.add(makeTube(taeniaPts, 0.028, 40, 6, taeniaMat));
  });

  // D. VERMIFORM APPENDIX (Appendiks / Chuvalchangsimon o'simta)
  // Originates precisely at the confluence of the 3 taeniae coli on the posteromedial cecum!
  const appendixCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.18, -1.22, 0.08),  // Cecal base
    new THREE.Vector3(1.28, -1.45, 0.12),
    new THREE.Vector3(1.15, -1.65, 0.18),  // Mid loop
    new THREE.Vector3(0.92, -1.72, 0.15),
    new THREE.Vector3(0.78, -1.62, 0.08)   // Terminal blind tip
  ]);
  const appendixMesh = makeTube(appendixCurve.points, 0.065, 24, 10, appendixMat);
  group.add(appendixMesh);

  // Appendicular Artery along Mesoappendix
  const appArtPts = [
    new THREE.Vector3(1.15, -1.15, 0.05),
    new THREE.Vector3(1.22, -1.38, 0.08),
    new THREE.Vector3(1.05, -1.58, 0.12),
    new THREE.Vector3(0.82, -1.62, 0.07)
  ];
  group.add(makeTube(appArtPts, 0.022, 16, 6, new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25 })));

  return group;
}

// ===========================================================================
// 7. HIQILDOQ VA OVOZ BOYLAMLARI (Larynx & Plica vocalis)
// ===========================================================================
export function createLarynxVocalCordsModel() {
  const group = new THREE.Group();
  group.name = "larynx_vocal_cords";

  const boneMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.38 });
  const cartilageMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd, // Hyaline cartilage translucent blue
    roughness: 0.28,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });

  const cricoidMat = new THREE.MeshStandardMaterial({
    color: 0xa5b4fc, // Cricoid cartilage soft indigo
    roughness: 0.32,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const vocalCordMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, // Pearlescent white true vocal cords
    roughness: 0.12,
    metalness: 0.02,
    clearcoat: 0.95,
    clearcoatRoughness: 0.06,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.12,
    side: THREE.DoubleSide
  });

  const falseCordMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // Pink mucosal vestibular fold
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const muscleMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c, // Vocalis muscle crimson
    roughness: 0.4
  });

  // A. HYOID BONE (Til osti suyagi - Os hyoideum)
  const hyoidPts = [
    new THREE.Vector3(-0.75, 1.85, -0.45), // Left greater horn
    new THREE.Vector3(-0.72, 1.78, 0.15),
    new THREE.Vector3(0, 1.75, 0.55),      // Body
    new THREE.Vector3(0.72, 1.78, 0.15),
    new THREE.Vector3(0.75, 1.85, -0.45)   // Right greater horn
  ];
  group.add(makeTube(hyoidPts, 0.08, 24, 10, boneMat));

  // Thyrohyoid Membrane sheet
  const thyroMemGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.55, 24, 1, true, 0, Math.PI * 1.5);
  const thyroMemMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    transparent: true,
    opacity: 0.45,
    roughness: 0.35,
    side: THREE.DoubleSide
  });
  const thyroMemMesh = new THREE.Mesh(thyroMemGeo, thyroMemMat);
  thyroMemMesh.position.set(0, 1.48, 0.05);
  group.add(thyroMemMesh);

  // B. EPIGLOTTIS (Hiqildoq usti tog'ayi)
  const epiglottisGeo = new THREE.SphereGeometry(0.48, 24, 20);
  epiglottisGeo.scale(0.85, 1.35, 0.18);
  const epiglottisMat = new THREE.MeshStandardMaterial({
    color: 0xfde047, // Elastic yellow cartilage
    roughness: 0.35,
    side: THREE.DoubleSide
  });
  const epiglottisMesh = new THREE.Mesh(epiglottisGeo, epiglottisMat);
  epiglottisMesh.position.set(0, 1.55, 0.08);
  epiglottisMesh.rotation.x = 0.32;
  group.add(epiglottisMesh);

  // C. THYROID CARTILAGE (Qalqonsimon tog'ay with Adam's Apple & Horns)
  // Left lamina
  const lLaminaGeo = new THREE.BoxGeometry(0.12, 1.1, 0.95);
  const lLaminaMesh = new THREE.Mesh(lLaminaGeo, cartilageMat);
  lLaminaMesh.position.set(-0.45, 0.85, 0.05);
  lLaminaMesh.rotation.y = 0.45;
  group.add(lLaminaMesh);

  // Right lamina
  const rLaminaMesh = new THREE.Mesh(lLaminaGeo, cartilageMat);
  rLaminaMesh.position.set(0.45, 0.85, 0.05);
  rLaminaMesh.rotation.y = -0.45;
  group.add(rLaminaMesh);

  // Laryngeal Prominence (Adam's apple / Prominentia laryngea)
  const adamPts = [
    new THREE.Vector3(0, 1.35, 0.38),
    new THREE.Vector3(0, 1.15, 0.48), // Peak notch
    new THREE.Vector3(0, 0.45, 0.35)
  ];
  group.add(makeTube(adamPts, 0.09, 12, 8, cartilageMat));

  // Superior & Inferior Thyroid Horns (Cornua)
  [-1, 1].forEach(side => {
    // Superior horn
    const sHornPts = [new THREE.Vector3(side * 0.72, 1.25, -0.35), new THREE.Vector3(side * 0.75, 1.72, -0.42)];
    group.add(makeTube(sHornPts, 0.065, 8, 6, cartilageMat));
    // Inferior horn
    const iHornPts = [new THREE.Vector3(side * 0.72, 0.45, -0.35), new THREE.Vector3(side * 0.58, 0.05, -0.25)];
    group.add(makeTube(iHornPts, 0.065, 8, 6, cartilageMat));
  });

  // D. CRICOID CARTILAGE (Uzuksimon tog'ay)
  // Complete signet ring: low anterior arch, tall posterior lamina
  const cricArchPts = [
    new THREE.Vector3(-0.55, 0.15, -0.25),
    new THREE.Vector3(0, 0.22, 0.32),
    new THREE.Vector3(0.55, 0.15, -0.25)
  ];
  group.add(makeTube(cricArchPts, 0.11, 18, 10, cricoidMat));

  const cricLaminaGeo = new THREE.BoxGeometry(0.92, 0.55, 0.14);
  const cricLaminaMesh = new THREE.Mesh(cricLaminaGeo, cricoidMat);
  cricLaminaMesh.position.set(0, 0.28, -0.32);
  group.add(cricLaminaMesh);

  // E. ARYTENOID CARTILAGES (Cho'michoqsimon tog'aylar - Pyramidal)
  [-1, 1].forEach(side => {
    const aryGeo = new THREE.ConeGeometry(0.14, 0.38, 5);
    const aryMesh = new THREE.Mesh(aryGeo, cartilageMat);
    aryMesh.position.set(side * 0.28, 0.65, -0.28);
    aryMesh.rotation.x = -0.15;
    group.add(aryMesh);
  });

  // F. TRUE VOCAL CORDS (Plica vocalis - Pearlescent White Ligaments)
  // Stretching from arytenoids vocal processes to anterior thyroid angle!
  const lCordPts = [
    new THREE.Vector3(-0.25, 0.58, -0.22),
    new THREE.Vector3(0, 0.62, 0.36)
  ];
  group.add(makeTube(lCordPts, 0.045, 14, 8, vocalCordMat));

  const rCordPts = [
    new THREE.Vector3(0.25, 0.58, -0.22),
    new THREE.Vector3(0, 0.62, 0.36)
  ];
  group.add(makeTube(rCordPts, 0.045, 14, 8, vocalCordMat));

  // Vocalis Muscle running lateral to true cords
  [-1, 1].forEach(side => {
    const vMuscPts = [
      new THREE.Vector3(side * 0.32, 0.55, -0.22),
      new THREE.Vector3(side * 0.08, 0.6, 0.32)
    ];
    group.add(makeTube(vMuscPts, 0.055, 12, 6, muscleMat));
  });

  // G. FALSE VOCAL CORDS (Plica vestibularis - Pink folds above true cords)
  const lFalsePts = [
    new THREE.Vector3(-0.32, 0.82, -0.18),
    new THREE.Vector3(0, 0.85, 0.32)
  ];
  group.add(makeTube(lFalsePts, 0.05, 14, 8, falseCordMat));

  const rFalsePts = [
    new THREE.Vector3(0.32, 0.82, -0.18),
    new THREE.Vector3(0, 0.85, 0.32)
  ];
  group.add(makeTube(rFalsePts, 0.05, 14, 8, falseCordMat));

  // Tracheal start rings underneath cricoid
  for (let r = 0; r < 3; r++) {
    const tRingGeo = new THREE.TorusGeometry(0.42, 0.05, 8, 20, Math.PI * 1.6);
    const tRingMesh = new THREE.Mesh(tRingGeo, cartilageMat);
    tRingMesh.rotation.x = Math.PI / 2;
    tRingMesh.rotation.z = Math.PI * 0.2;
    tRingMesh.position.set(0, -0.05 - r * 0.14, 0);
    group.add(tRingMesh);
  }

  return group;
}

// ===========================================================================
// 8. TRAXEYA VA BRONXLAR DARAXTI (Trachea & Arbor bronchialis)
// ===========================================================================
export function createTracheaBronchialTreeModel() {
  const group = new THREE.Group();
  group.name = "trachea_bronchial_tree";

  const cartRingMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd, // Hyaline cartilage rings translucent blue
    roughness: 0.28,
    metalness: 0.06,
    side: THREE.DoubleSide
  });

  const fibrousMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0, // Inter-cartilaginous annular ligaments
    roughness: 0.42
  });

  const muscleWallMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c, // Posterior membranous trachealis muscle
    roughness: 0.45,
    side: THREE.DoubleSide
  });

  const lobarBronchMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Secondary lobar bronchi
    roughness: 0.3
  });

  const segBronchMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Tertiary segmental bronchi
    roughness: 0.32
  });

  // A. TRACHEA TUBE (16 C-shaped cartilaginous rings with carina)
  const tracheaLength = 2.2;
  const numRings = 16;
  const ringSpacing = tracheaLength / numRings;

  for (let i = 0; i < numRings; i++) {
    const y = 1.45 - i * ringSpacing;

    // C-shaped cartilage ring (open posteriorly for trachealis muscle)
    const ringGeo = new THREE.TorusGeometry(0.38, 0.048, 8, 24, Math.PI * 1.55);
    const ringMesh = new THREE.Mesh(ringGeo, cartRingMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.rotation.z = Math.PI * 0.225;
    ringMesh.position.set(0, y, 0);
    group.add(ringMesh);

    // Annular ligament connectives between rings
    if (i < numRings - 1) {
      const ligGeo = new THREE.CylinderGeometry(0.36, 0.36, ringSpacing * 0.5, 24, 1, true);
      const ligMesh = new THREE.Mesh(ligGeo, fibrousMat);
      ligMesh.position.set(0, y - ringSpacing * 0.5, 0);
      group.add(ligMesh);
    }
  }

  // Posterior Membranous Wall (Paries membranaceus)
  const postWallGeo = new THREE.PlaneGeometry(0.48, tracheaLength);
  const postWallMesh = new THREE.Mesh(postWallGeo, muscleWallMat);
  postWallMesh.position.set(0, 1.45 - tracheaLength / 2, -0.37);
  group.add(postWallMesh);

  // B. CARINA TRACHEAE (Bifurcation keel)
  const carinaGeo = new THREE.ConeGeometry(0.12, 0.25, 12);
  const carinaMesh = new THREE.Mesh(carinaGeo, cartRingMat);
  carinaMesh.position.set(0, 1.45 - tracheaLength, 0);
  carinaMesh.rotation.x = Math.PI;
  group.add(carinaMesh);

  // C. MAIN (PRIMARY) BRONCHI
  // 1. Right Main Bronchus (Bronchus principalis dexter): wider, shorter, more vertical (25°)
  const rMainPts = [
    new THREE.Vector3(0, -0.75, 0),
    new THREE.Vector3(0.32, -1.05, 0.02),
    new THREE.Vector3(0.58, -1.35, 0.05)
  ];
  group.add(makeTube(rMainPts, 0.16, 16, 12, cartRingMat));

  // 2. Left Main Bronchus (Bronchus principalis sinister): narrower, longer, more horizontal (45°)
  const lMainPts = [
    new THREE.Vector3(0, -0.75, 0),
    new THREE.Vector3(-0.45, -0.98, -0.02),
    new THREE.Vector3(-0.95, -1.25, -0.05),
    new THREE.Vector3(-1.35, -1.48, -0.08)
  ];
  group.add(makeTube(lMainPts, 0.13, 20, 12, cartRingMat));

  // D. SECONDARY (LOBAR) BRONCHI
  // Right 3 lobes: Superior, Middle, Inferior
  const rSupLobar = [new THREE.Vector3(0.58, -1.35, 0.05), new THREE.Vector3(0.95, -1.15, 0.15)];
  group.add(makeTube(rSupLobar, 0.11, 10, 8, lobarBronchMat));

  const rMidLobar = [new THREE.Vector3(0.58, -1.35, 0.05), new THREE.Vector3(0.98, -1.55, 0.12)];
  group.add(makeTube(rMidLobar, 0.1, 10, 8, lobarBronchMat));

  const rInfLobar = [new THREE.Vector3(0.58, -1.35, 0.05), new THREE.Vector3(0.85, -1.95, 0.05)];
  group.add(makeTube(rInfLobar, 0.11, 10, 8, lobarBronchMat));

  // Left 2 lobes: Superior, Inferior
  const lSupLobar = [new THREE.Vector3(-1.35, -1.48, -0.08), new THREE.Vector3(-1.75, -1.35, 0.05)];
  group.add(makeTube(lSupLobar, 0.1, 10, 8, lobarBronchMat));

  const lInfLobar = [new THREE.Vector3(-1.35, -1.48, -0.08), new THREE.Vector3(-1.65, -1.95, -0.12)];
  group.add(makeTube(lInfLobar, 0.1, 10, 8, lobarBronchMat));

  // E. TERTIARY (SEGMENTAL) BRONCHIAL ARBORIZATION
  // Right segmental bronchi (10 segments)
  [
    // Superior lobe segments (Apical, Posterior, Anterior)
    [new THREE.Vector3(0.95, -1.15, 0.15), new THREE.Vector3(1.15, -0.75, 0.25)],
    [new THREE.Vector3(0.95, -1.15, 0.15), new THREE.Vector3(1.35, -0.95, 0.05)],
    [new THREE.Vector3(0.95, -1.15, 0.15), new THREE.Vector3(1.28, -1.25, 0.35)],
    // Middle lobe segments (Lateral, Medial)
    [new THREE.Vector3(0.98, -1.55, 0.12), new THREE.Vector3(1.45, -1.52, 0.28)],
    [new THREE.Vector3(0.98, -1.55, 0.12), new THREE.Vector3(1.38, -1.72, 0.18)],
    // Inferior lobe basal segments
    [new THREE.Vector3(0.85, -1.95, 0.05), new THREE.Vector3(1.15, -2.25, 0.18)],
    [new THREE.Vector3(0.85, -1.95, 0.05), new THREE.Vector3(0.88, -2.45, 0.02)],
    [new THREE.Vector3(0.85, -1.95, 0.05), new THREE.Vector3(0.65, -2.35, -0.12)],
    [new THREE.Vector3(0.85, -1.95, 0.05), new THREE.Vector3(1.35, -2.15, -0.05)],
    [new THREE.Vector3(0.85, -1.95, 0.05), new THREE.Vector3(1.25, -2.45, 0.12)]
  ].forEach(pts => {
    group.add(makeTube(pts, 0.055, 10, 6, segBronchMat));
    // Fine terminal subsegmental twigs
    const endPt = pts[1];
    const twig1 = [endPt, new THREE.Vector3(endPt.x + 0.12, endPt.y - 0.12, endPt.z + 0.06)];
    const twig2 = [endPt, new THREE.Vector3(endPt.x + 0.06, endPt.y - 0.15, endPt.z - 0.08)];
    group.add(makeTube(twig1, 0.025, 6, 4, segBronchMat));
    group.add(makeTube(twig2, 0.025, 6, 4, segBronchMat));
  });

  // Left segmental bronchi (8-10 segments)
  [
    // Superior lobe segments (Apicoposterior, Anterior, Superior/Inferior lingular)
    [new THREE.Vector3(-1.75, -1.35, 0.05), new THREE.Vector3(-1.95, -0.95, 0.18)],
    [new THREE.Vector3(-1.75, -1.35, 0.05), new THREE.Vector3(-2.15, -1.25, 0.02)],
    [new THREE.Vector3(-1.75, -1.35, 0.05), new THREE.Vector3(-2.05, -1.55, 0.25)],
    [new THREE.Vector3(-1.75, -1.35, 0.05), new THREE.Vector3(-1.85, -1.75, 0.32)],
    // Inferior lobe segments (Superior, Anteromedial, Lateral, Posterior basal)
    [new THREE.Vector3(-1.65, -1.95, -0.12), new THREE.Vector3(-1.95, -2.15, -0.05)],
    [new THREE.Vector3(-1.65, -1.95, -0.12), new THREE.Vector3(-1.75, -2.45, -0.15)],
    [new THREE.Vector3(-1.65, -1.95, -0.12), new THREE.Vector3(-1.45, -2.35, -0.22)],
    [new THREE.Vector3(-1.65, -1.95, -0.12), new THREE.Vector3(-2.15, -2.35, 0.08)]
  ].forEach(pts => {
    group.add(makeTube(pts, 0.055, 10, 6, segBronchMat));
    const endPt = pts[1];
    const twig1 = [endPt, new THREE.Vector3(endPt.x - 0.12, endPt.y - 0.12, endPt.z + 0.06)];
    const twig2 = [endPt, new THREE.Vector3(endPt.x - 0.06, endPt.y - 0.15, endPt.z - 0.08)];
    group.add(makeTube(twig1, 0.025, 6, 4, segBronchMat));
    group.add(makeTube(twig2, 0.025, 6, 4, segBronchMat));
  });

  return group;
}

// ===========================================================================
// 9. BUYRAKLAR: KESIMI VA NEFRON MIKROTUZILISHI
// ===========================================================================
export function createKidneyNephronModel() {
  const group = new THREE.Group();
  group.name = "kidney_nephron_microstructure";

  const capsuleMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.35, side: THREE.DoubleSide });
  const cortexMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4, side: THREE.DoubleSide });
  const pyramidMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.45, side: THREE.DoubleSide });
  const calyxMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.32, side: THREE.DoubleSide });
  const artMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.25 });
  const tubuleMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.32 }); // Yellow nephron tubules
  const glomerulusMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2 });

  // A. KIDNEY CORONAL CROSS-SECTION (Right side of scene)
  const kGroup = new THREE.Group();
  kGroup.position.set(0.65, 0, 0);

  // Outer Back Capsule
  const backGeo = new THREE.SphereGeometry(1.2, 36, 28, 0, Math.PI, 0, Math.PI);
  backGeo.scale(0.85, 1.4, 0.75);
  const backMesh = new THREE.Mesh(backGeo, capsuleMat);
  backMesh.rotation.y = -Math.PI / 2;
  kGroup.add(backMesh);

  // Cutaway Coronal Face: Renal Cortex (Qobiq modda)
  const cortexGeo = new THREE.RingGeometry(0.35, 1.2, 32);
  cortexGeo.scale(0.85, 1.4, 1);
  const cortexMesh = new THREE.Mesh(cortexGeo, cortexMat);
  cortexMesh.position.set(0, 0, 0.02);
  kGroup.add(cortexMesh);

  // 7 Renal Pyramids (Malpigi piramidalari) & Renal Papillae
  for (let p = 0; p < 7; p++) {
    const angle = -Math.PI * 0.42 + (p / 6) * Math.PI * 0.84;
    const pyrGeo = new THREE.ConeGeometry(0.24, 0.52, 8);
    const pyrMesh = new THREE.Mesh(pyrGeo, pyramidMat);
    pyrMesh.rotation.z = angle - Math.PI / 2;
    pyrMesh.position.set(Math.cos(angle) * 0.65, Math.sin(angle) * 0.95, 0.04);
    kGroup.add(pyrMesh);

    // Minor Calyx cup at papilla
    const calGeo = new THREE.CylinderGeometry(0.09, 0.06, 0.14, 10);
    const calMesh = new THREE.Mesh(calGeo, calyxMat);
    calMesh.rotation.z = angle - Math.PI / 2;
    calMesh.position.set(Math.cos(angle) * 0.38, Math.sin(angle) * 0.55, 0.04);
    kGroup.add(calMesh);
  }

  // Major Calyces & Funnel-shaped Renal Pelvis (Pelvis renalis - Jom)
  const pelvisCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.05, 0.45, 0.04),
    new THREE.Vector3(-0.15, 0.05, 0.04),
    new THREE.Vector3(-0.35, -0.45, 0.02),
    new THREE.Vector3(-0.45, -0.95, 0.0) // Ureter start
  ]);
  kGroup.add(makeTube(pelvisCurve.points, 0.16, 20, 12, calyxMat));

  // Renal Artery and Vein Hilum Branches
  const artPts = [
    new THREE.Vector3(-1.15, 0.15, -0.05),
    new THREE.Vector3(-0.45, 0.12, 0.0),
    new THREE.Vector3(-0.05, 0.08, 0.05)
  ];
  kGroup.add(makeTube(artPts, 0.11, 14, 8, artMat));

  const veinPts = [
    new THREE.Vector3(-1.15, -0.05, 0.05),
    new THREE.Vector3(-0.45, -0.08, 0.08),
    new THREE.Vector3(-0.05, -0.05, 0.1)
  ];
  kGroup.add(makeTube(veinPts, 0.13, 14, 8, veinMat));

  group.add(kGroup);

  // B. NEPHRON MICROSCOPIC UNIT (Enlarged callout on Left side)
  const nGroup = new THREE.Group();
  nGroup.position.set(-1.45, 0, 0);

  // 1. Bowman's Capsule & Glomerular Capillary Knot
  const bowmanGeo = new THREE.SphereGeometry(0.32, 20, 16, 0, Math.PI * 1.6);
  const bowmanMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, transparent: true, opacity: 0.75, side: THREE.DoubleSide });
  const bowmanMesh = new THREE.Mesh(bowmanGeo, bowmanMat);
  bowmanMesh.position.set(0, 1.25, 0);
  nGroup.add(bowmanMesh);

  const glomerulusGeo = new THREE.SphereGeometry(0.22, 16, 14);
  const glomerulusMesh = new THREE.Mesh(glomerulusGeo, glomerulusMat);
  glomerulusMesh.position.set(0, 1.25, 0);
  nGroup.add(glomerulusMesh);

  // Afferent & Efferent Arterioles
  const affPts = [new THREE.Vector3(-0.35, 1.55, 0), new THREE.Vector3(-0.08, 1.35, 0)];
  nGroup.add(makeTube(affPts, 0.045, 8, 6, artMat));

  const effPts = [new THREE.Vector3(0.08, 1.35, 0), new THREE.Vector3(0.35, 1.55, 0)];
  nGroup.add(makeTube(effPts, 0.035, 8, 6, artMat));

  // 2. Proximal Convoluted Tubule (PCT - convoluted coils)
  const pctPts = [
    new THREE.Vector3(0, 1.05, 0),
    new THREE.Vector3(-0.25, 0.95, 0.12),
    new THREE.Vector3(-0.45, 0.75, 0.05),
    new THREE.Vector3(-0.22, 0.65, -0.1),
    new THREE.Vector3(-0.35, 0.45, 0.0)
  ];
  nGroup.add(makeTube(pctPts, 0.048, 24, 8, tubuleMat));

  // 3. Loop of Henle (Genle qovuzlog'i - Descending & Ascending limbs with hairpin turn)
  const henlePts = [
    new THREE.Vector3(-0.35, 0.45, 0.0),
    new THREE.Vector3(-0.35, -0.45, 0.0),
    new THREE.Vector3(-0.32, -1.15, 0.0), // Thin descending limb
    new THREE.Vector3(-0.22, -1.35, 0.0), // Hairpin loop apex
    new THREE.Vector3(-0.12, -1.15, 0.0), // Thick ascending limb
    new THREE.Vector3(-0.12, 0.35, 0.0)
  ];
  nGroup.add(makeTube(henlePts, 0.038, 30, 8, tubuleMat));

  // 4. Distal Convoluted Tubule (DCT)
  const dctPts = [
    new THREE.Vector3(-0.12, 0.35, 0.0),
    new THREE.Vector3(0.05, 0.55, 0.1),
    new THREE.Vector3(-0.05, 0.75, 0.15),
    new THREE.Vector3(0.15, 0.85, 0.05),
    new THREE.Vector3(0.38, 0.75, 0.0)
  ];
  nGroup.add(makeTube(dctPts, 0.045, 24, 8, tubuleMat));

  // 5. Collecting Duct (Yig'uvchi naycha - tall straight duct receiving urine)
  const ductPts = [
    new THREE.Vector3(0.38, 1.35, 0.0),
    new THREE.Vector3(0.38, 0.75, 0.0),
    new THREE.Vector3(0.38, -0.25, 0.0),
    new THREE.Vector3(0.38, -1.45, 0.0) // Emptying at renal papilla
  ];
  nGroup.add(makeTube(ductPts, 0.075, 20, 10, new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3 })));

  // Secondary nephron tributaries into collecting duct
  [0.45, -0.15, -0.75].forEach(y => {
    const tribPts = [new THREE.Vector3(0.65, y + 0.12, 0), new THREE.Vector3(0.38, y, 0)];
    nGroup.add(makeTube(tribPts, 0.035, 6, 6, tubuleMat));
  });

  group.add(nGroup);
  return group;
}

// ===========================================================================
// 10. SIYDIK NAYLARI (URETERLAR)
// ===========================================================================
export function createUretersModel() {
  const group = new THREE.Group();
  group.name = "ureters_urinary_tract";

  const ureterMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Pale ivory-yellow muscular ureter
    roughness: 0.32,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const kidneyOutlineMat = new THREE.MeshStandardMaterial({
    color: 0x881337,
    roughness: 0.4,
    transparent: true,
    opacity: 0.4
  });

  const bladderOutlineMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c,
    roughness: 0.35,
    transparent: true,
    opacity: 0.45
  });

  const artMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.25 });

  // Renal & Bladder Reference Frames
  [-1, 1].forEach(side => {
    const kGeo = new THREE.SphereGeometry(0.55, 20, 16);
    kGeo.scale(0.85, 1.35, 0.75);
    const kMesh = new THREE.Mesh(kGeo, kidneyOutlineMat);
    kMesh.position.set(side * 1.15, 1.45, -0.05);
    kMesh.rotation.z = -side * 0.15;
    group.add(kMesh);
  });

  // Pelvic Urinary Bladder Base
  const bGeo = new THREE.SphereGeometry(0.65, 24, 20);
  bGeo.scale(1.2, 0.95, 1.0);
  const bMesh = new THREE.Mesh(bGeo, bladderOutlineMat);
  bMesh.position.set(0, -1.45, 0.05);
  group.add(bMesh);

  // Common Iliac Vessels at Pelvic Brim (Ureters cross right over them!)
  [-1, 1].forEach(side => {
    const aIliac = [new THREE.Vector3(0, 0.15, -0.15), new THREE.Vector3(side * 0.65, -0.45, -0.12)];
    group.add(makeTube(aIliac, 0.08, 12, 8, artMat));

    const vIliac = [new THREE.Vector3(0.12, 0.15, -0.12), new THREE.Vector3(side * 0.72, -0.42, -0.08)];
    group.add(makeTube(vIliac, 0.09, 12, 8, veinMat));
  });

  // BILATERAL URETERS (Left & Right 25-30cm muscular conduits)
  [-1, 1].forEach(side => {
    const ureterCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.95, 1.25, -0.02), // Pelviureteric junction (PUJ)
      new THREE.Vector3(side * 0.75, 0.75, -0.05),  // Abdominal course on psoas
      new THREE.Vector3(side * 0.58, 0.15, -0.06),
      new THREE.Vector3(side * 0.52, -0.38, -0.02), // Crossing pelvic brim over iliac vessels
      new THREE.Vector3(side * 0.62, -0.85, 0.08),  // Pelvic lateral curve
      new THREE.Vector3(side * 0.42, -1.25, 0.12),  // Intramural ureterovesical junction (UVJ)
      new THREE.Vector3(side * 0.22, -1.42, 0.08)   // Entering trigonum vesicae
    ]);

    const ureterMesh = makeTube(ureterCurve.points, 0.065, 36, 12, ureterMat);
    group.add(ureterMesh);

    // Physiological Narrowing Highlights (1. PUJ, 2. Pelvic Brim, 3. UVJ)
    [
      new THREE.Vector3(side * 0.95, 1.25, -0.02),
      new THREE.Vector3(side * 0.52, -0.38, -0.02),
      new THREE.Vector3(side * 0.42, -1.25, 0.12)
    ].forEach(pos => {
      const ringGeo = new THREE.TorusGeometry(0.075, 0.018, 6, 14);
      const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 }));
      ringMesh.position.copy(pos);
      group.add(ringMesh);
    });
  });

  return group;
}

// ===========================================================================
// 11. QOVUQ (SIYDIK PUFAGI) VA URETRA
// ===========================================================================
export function createBladderUrethraModel() {
  const group = new THREE.Group();
  group.name = "bladder_urethra";

  const detrusorMat = new THREE.MeshStandardMaterial({
    color: 0xbe123c, // Thick detrusor muscle crimson
    roughness: 0.38,
    side: THREE.DoubleSide
  });

  const mucosaMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // Transitional urothelium pink
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const trigonumMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24, // Smooth triangular trigone amber
    roughness: 0.28,
    side: THREE.DoubleSide
  });

  const prostateMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7, // Prostate gland purple
    roughness: 0.42
  });

  const sphincterMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626, // Muscular sphincter red
    roughness: 0.35
  });

  // A. URINARY BLADDER (Coronal anterior cutaway showing internal cavity)
  const backBladderGeo = new THREE.SphereGeometry(1.2, 36, 28, 0, Math.PI, 0, Math.PI);
  backBladderGeo.scale(1.15, 1.0, 0.95);
  const backBladderMesh = new THREE.Mesh(backBladderGeo, detrusorMat);
  backBladderMesh.rotation.y = -Math.PI / 2;
  backBladderMesh.position.set(0, 0.55, 0);
  group.add(backBladderMesh);

  // Inner Mucosa Cutaway Face with Detrusor Rim
  const rimGeo = new THREE.RingGeometry(0.35, 1.18, 36);
  rimGeo.scale(1.15, 1.0, 1.0);
  const rimMesh = new THREE.Mesh(rimGeo, detrusorMat);
  rimMesh.position.set(0, 0.55, 0.02);
  group.add(rimMesh);

  // Mucosal Rugae (Inner folds on posterior wall)
  for (let r = 0; r < 8; r++) {
    const angle = (r / 7) * Math.PI - Math.PI / 2;
    const rugaGeo = new THREE.TorusGeometry(0.45 + (r % 3) * 0.15, 0.028, 6, 16, Math.PI * 0.75);
    const rugaMesh = new THREE.Mesh(rugaGeo, mucosaMat);
    rugaMesh.position.set(Math.cos(angle) * 0.15, 0.75 + Math.sin(angle) * 0.2, -0.35);
    group.add(rugaMesh);
  }

  // B. TRIGONUM VESICAE (Lieutaud smooth triangle at base of bladder)
  const trigoneShape = new THREE.Shape();
  trigoneShape.moveTo(-0.35, 0.35); // Left ureteric orifice
  trigoneShape.lineTo(0.35, 0.35);  // Right ureteric orifice
  trigoneShape.lineTo(0, -0.15);    // Internal urethral orifice
  trigoneShape.closePath();
  const trigoneGeo = new THREE.ShapeGeometry(trigoneShape);
  const trigoneMesh = new THREE.Mesh(trigoneGeo, trigonumMat);
  trigoneMesh.position.set(0, 0.25, -0.38);
  group.add(trigoneMesh);

  // Left & Right Ureteric Orifices
  [-0.35, 0.35].forEach(x => {
    const ostGeo = new THREE.RingGeometry(0.02, 0.055, 12);
    const ostMesh = new THREE.Mesh(ostGeo, new THREE.MeshBasicMaterial({ color: 0xdc2626, side: THREE.DoubleSide }));
    ostMesh.position.set(x, 0.6, -0.37);
    group.add(ostMesh);

    // Incoming ureter stumps into bladder wall
    const uPts = [new THREE.Vector3(x * 1.8, 1.25, -0.55), new THREE.Vector3(x, 0.6, -0.4)];
    group.add(makeTube(uPts, 0.055, 10, 8, new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 })));
  });

  // Internal Urethral Sphincter Ring
  const intSphincterGeo = new THREE.TorusGeometry(0.12, 0.045, 8, 18);
  const intSphincterMesh = new THREE.Mesh(intSphincterGeo, sphincterMat);
  intSphincterMesh.rotation.x = Math.PI / 2;
  intSphincterMesh.position.set(0, 0.05, -0.2);
  group.add(intSphincterMesh);

  // C. PROSTATE GLAND (Around prostatic urethra)
  const prostateGeo = new THREE.ConeGeometry(0.55, 0.75, 20);
  prostateGeo.scale(1.15, 1, 0.85);
  const prostateMesh = new THREE.Mesh(prostateGeo, prostateMat);
  prostateMesh.rotation.x = Math.PI;
  prostateMesh.position.set(0, -0.38, -0.15);
  group.add(prostateMesh);

  // D. URETHRA (Prostatic, Membranous, and Spongy Urethra)
  const urethraCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.08, -0.2),    // Internal urethral orifice
    new THREE.Vector3(0, -0.38, -0.15),  // Prostatic urethra
    new THREE.Vector3(0, -0.75, -0.05),  // Membranous urethra
    new THREE.Vector3(0, -1.05, 0.12),   // Bulb of penis
    new THREE.Vector3(0, -1.55, 0.22),   // Spongy penile urethra
    new THREE.Vector3(0, -1.95, 0.18)    // External urethral orifice (meatus)
  ]);
  const urethraMesh = makeTube(urethraCurve.points, 0.09, 28, 12, mucosaMat);
  group.add(urethraMesh);

  // External Urethral Sphincter (Striated voluntary muscle at urogenital diaphragm)
  const extSphincterGeo = new THREE.TorusGeometry(0.16, 0.055, 10, 20);
  const extSphincterMesh = new THREE.Mesh(extSphincterGeo, sphincterMat);
  extSphincterMesh.rotation.x = Math.PI / 2;
  extSphincterMesh.position.set(0, -0.75, -0.05);
  group.add(extSphincterMesh);

  return group;
}

// ===========================================================================
// 12. QULOQ (TASHQI, O‘RTA VA ICHKI QULOQ — CHIG‘ANOQ VA YARIMAYLANA KANALLAR)
// ===========================================================================
export function createEarModel() {
  const group = new THREE.Group();
  group.name = "ear_full_anatomy";

  const pinnaMat = new THREE.MeshStandardMaterial({
    color: 0xf5d0c5, // Natural skin-cartilage peach
    roughness: 0.42,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const boneMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 });
  const tympanicMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    transparent: true,
    opacity: 0.65,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const labyrinthMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8, // Bony/membranous labyrinth glowing cyan
    emissive: 0x0284c7,
    emissiveIntensity: 0.18,
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 0.85
  });

  const nerveMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xca8a04,
    emissiveIntensity: 0.35,
    roughness: 0.25
  });

  // A. TASHQI QULOQ (Auris externa: Pinna & Meatus acusticus externus)
  // 1. Auricle / Pinna (Helix, Antihelix, Concha, Lobule)
  const pinnaGeo = new THREE.CylinderGeometry(0.75, 0.45, 1.8, 24, 1, true, 0, Math.PI * 1.6);
  pinnaGeo.scale(0.35, 1.0, 0.85);
  const pinnaMesh = new THREE.Mesh(pinnaGeo, pinnaMat);
  pinnaMesh.position.set(-1.75, 0.15, 0.2);
  pinnaMesh.rotation.y = -Math.PI * 0.35;
  group.add(pinnaMesh);

  // Helix Outer Rim Tube
  const helixPts = [
    new THREE.Vector3(-1.72, -0.65, 0.15), // Lobule
    new THREE.Vector3(-1.85, 0.15, 0.35),
    new THREE.Vector3(-1.75, 0.95, 0.25),  // Superior helix
    new THREE.Vector3(-1.55, 0.85, 0.05),
    new THREE.Vector3(-1.45, 0.45, -0.05)  // Crus of helix
  ];
  group.add(makeTube(helixPts, 0.065, 20, 8, pinnaMat));

  // 2. External Acoustic Meatus (Eshitish yo'li S-shaped canal)
  const canalPts = [
    new THREE.Vector3(-1.55, 0.25, 0.05),
    new THREE.Vector3(-1.15, 0.18, -0.05),
    new THREE.Vector3(-0.75, 0.12, -0.08)
  ];
  group.add(makeTube(canalPts, 0.14, 16, 10, pinnaMat));

  // B. O'RTA QULOQ (Auris media: Tympanic membrane & Auditory Ossicles)
  // 1. Tympanic Membrane (Nog'ora parda)
  const tympanicGeo = new THREE.CircleGeometry(0.24, 24);
  const tympanicMesh = new THREE.Mesh(tympanicGeo, tympanicMat);
  tympanicMesh.position.set(-0.75, 0.12, -0.08);
  tympanicMesh.rotation.y = Math.PI * 0.4;
  group.add(tympanicMesh);

  // 2. Auditory Ossicles (Eshitish suyakchalari): Malleus, Incus, Stapes
  // Malleus (Bolg'acha): handle attached to tympanic membrane, head
  const malleusPts = [
    new THREE.Vector3(-0.74, 0.12, -0.08), // Manubrium (handle) on membrane
    new THREE.Vector3(-0.62, 0.28, -0.06),
    new THREE.Vector3(-0.52, 0.38, -0.05)  // Head of malleus
  ];
  group.add(makeTube(malleusPts, 0.038, 10, 6, boneMat));

  // Incus (Sandoncha): body articulating with malleus, long process
  const incusPts = [
    new THREE.Vector3(-0.52, 0.38, -0.05),
    new THREE.Vector3(-0.38, 0.35, -0.12),
    new THREE.Vector3(-0.35, 0.15, -0.15) // Lenticular process
  ];
  group.add(makeTube(incusPts, 0.042, 10, 6, boneMat));

  // Stapes (Uzangicha): arch, head, and footplate in oval window
  const stapesPts = [
    new THREE.Vector3(-0.35, 0.15, -0.15),
    new THREE.Vector3(-0.22, 0.14, -0.18), // Footplate (base)
    new THREE.Vector3(-0.08, 0.14, -0.2)
  ];
  group.add(makeTube(stapesPts, 0.032, 8, 6, boneMat));

  // Eustachian Tube (Eshitish nayi) descending to nasopharynx
  const eustachianPts = [
    new THREE.Vector3(-0.65, 0.05, -0.15),
    new THREE.Vector3(-0.45, -0.45, -0.22),
    new THREE.Vector3(-0.25, -0.95, -0.32)
  ];
  group.add(makeTube(eustachianPts, 0.065, 14, 8, new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 })));

  // C. ICHKI QULOQ (Auris interna / Suyak labirinti)
  const labGroup = new THREE.Group();
  labGroup.position.set(0.45, 0.15, -0.2);

  // 1. Vestibule (Dahliz - central oval chamber)
  const vestGeo = new THREE.SphereGeometry(0.32, 20, 16);
  vestGeo.scale(1.1, 0.85, 0.9);
  const vestMesh = new THREE.Mesh(vestGeo, labyrinthMat);
  labGroup.add(vestMesh);

  // 2. Cochlea (Eshitish chig'anog'i - 2.5 turns helical spiral)
  const cochleaPts = [];
  for (let c = 0; c <= 50; c++) {
    const t = c / 50;
    const angle = t * Math.PI * 5; // 2.5 complete turns
    const r = (1 - t * 0.65) * 0.48;
    const x = Math.cos(angle) * r - 0.25;
    const y = Math.sin(angle) * r - 0.25;
    const z = t * 0.35 + 0.05;
    cochleaPts.push(new THREE.Vector3(x, y, z));
  }
  labGroup.add(makeTube(cochleaPts, 0.08, 50, 10, labyrinthMat));

  // 3. Three Semicircular Canals (Uchta yarimaylana kanallar with Ampullae)
  // Anterior / Superior Semicircular Canal (Vertical sagittal)
  const antCanalGeo = new THREE.TorusGeometry(0.42, 0.055, 10, 24, Math.PI * 1.4);
  const antCanalMesh = new THREE.Mesh(antCanalGeo, labyrinthMat);
  antCanalMesh.position.set(0.05, 0.38, 0);
  antCanalMesh.rotation.y = Math.PI / 2;
  labGroup.add(antCanalMesh);

  // Posterior Semicircular Canal (Vertical frontal)
  const postCanalGeo = new THREE.TorusGeometry(0.42, 0.055, 10, 24, Math.PI * 1.4);
  const postCanalMesh = new THREE.Mesh(postCanalGeo, labyrinthMat);
  postCanalMesh.position.set(-0.15, 0.25, -0.15);
  postCanalMesh.rotation.x = Math.PI / 2;
  labGroup.add(postCanalMesh);

  // Lateral / Horizontal Semicircular Canal (Horizontal plane)
  const latCanalGeo = new THREE.TorusGeometry(0.38, 0.055, 10, 24, Math.PI * 1.4);
  const latCanalMesh = new THREE.Mesh(latCanalGeo, labyrinthMat);
  latCanalMesh.position.set(0.12, 0.05, -0.12);
  latCanalMesh.rotation.z = Math.PI / 2;
  labGroup.add(latCanalMesh);

  // 4. Vestibulocochlear Nerve (VIII bosh miya nervi - Nervus vestibulocochlearis)
  const nervePts = [
    new THREE.Vector3(0.05, 0.05, 0.15),
    new THREE.Vector3(0.45, 0.02, 0.35),
    new THREE.Vector3(0.95, 0.0, 0.55)
  ];
  labGroup.add(makeTube(nervePts, 0.11, 14, 8, nerveMat));

  group.add(labGroup);
  return group;
}

// ===========================================================================
// 13. TERI QATLAMLARI (EPIDERMIS, DERMA, SOCH ILDIZI, RETSEPTORLAR)
// ===========================================================================
export function createSkinLayersModel() {
  const group = new THREE.Group();
  group.name = "skin_layers_anatomy";

  const epidermisMat = new THREE.MeshStandardMaterial({
    color: 0xf5d0c5, // Keratinized skin surface
    roughness: 0.45,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const dermisMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e, // Dense vascular dermis red-pink
    roughness: 0.38,
    metalness: 0.03,
    side: THREE.DoubleSide
  });

  const hypodermisMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a, // Subcutaneous yellow adipose lobules
    roughness: 0.55,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const hairShaftMat = new THREE.MeshStandardMaterial({
    color: 0x27272a, // Dark hair keratin
    roughness: 0.25,
    metalness: 0.15
  });

  const follicleMat = new THREE.MeshStandardMaterial({
    color: 0xfecdd3,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const glandMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 }); // Sebaceous yellow
  const muscleMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 }); // Arrector pili
  const nerveMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.25 }); // Sensory receptors

  // A. THREE-LAYER SKIN BLOCK (Epidermis, Dermis, Hypodermis)
  // 1. Epidermis (Top slice, Y = 0.9 to 1.1)
  const epiGeo = new THREE.BoxGeometry(2.4, 0.25, 2.0);
  const epiMesh = new THREE.Mesh(epiGeo, epidermisMat);
  epiMesh.position.set(0, 1.0, 0);
  group.add(epiMesh);

  // Dermal-Epidermal Interlocking Papillae (Wavy boundary ridges)
  for (let x = -1.0; x <= 1.0; x += 0.25) {
    const papGeo = new THREE.SphereGeometry(0.12, 12, 10);
    const papMesh = new THREE.Mesh(papGeo, dermisMat);
    papMesh.position.set(x, 0.88, 0.98);
    group.add(papMesh);
  }

  // 2. Dermis (Middle thick layer, Y = 0.1 to 0.88)
  const dermGeo = new THREE.BoxGeometry(2.4, 0.78, 2.0);
  const dermMesh = new THREE.Mesh(dermGeo, dermisMat);
  dermMesh.position.set(0, 0.48, 0);
  group.add(dermMesh);

  // 3. Hypodermis / Subcutis (Bottom adipose layer, Y = -0.7 to 0.1)
  const hypoGeo = new THREE.BoxGeometry(2.4, 0.75, 2.0);
  const hypoMesh = new THREE.Mesh(hypoGeo, hypodermisMat);
  hypoMesh.position.set(0, -0.28, 0);
  group.add(hypoMesh);

  // Adipose Lobules spherical clusters on cut face
  for (let ax = -0.9; ax <= 0.9; ax += 0.3) {
    for (let ay = -0.55; ay <= 0.05; ay += 0.25) {
      const adGeo = new THREE.SphereGeometry(0.11, 10, 8);
      const adMesh = new THREE.Mesh(adGeo, hypodermisMat);
      adMesh.position.set(ax, ay, 1.02);
      group.add(adMesh);
    }
  }

  // B. HAIR FOLLICLE & SHAFT (Pilosebaceous apparatus)
  // 1. Hair Shaft penetrating surface
  const hairPts = [
    new THREE.Vector3(-0.35, -0.45, 0.15), // Bulb in hypodermis
    new THREE.Vector3(-0.3, 0.25, 0.12),
    new THREE.Vector3(-0.25, 1.12, 0.08),  // Skin surface
    new THREE.Vector3(-0.15, 1.95, 0.02)   // Free shaft above skin
  ];
  group.add(makeTube(hairPts, 0.042, 20, 8, hairShaftMat));

  // 2. Hair Follicle sheath & Bulb
  const bulbGeo = new THREE.SphereGeometry(0.15, 16, 14);
  const bulbMesh = new THREE.Mesh(bulbGeo, follicleMat);
  bulbMesh.position.set(-0.35, -0.45, 0.15);
  group.add(bulbMesh);

  // 3. Sebaceous Gland (Yog' bezi attached to upper follicle)
  const sebGeo = new THREE.SphereGeometry(0.22, 14, 12);
  sebGeo.scale(1.2, 0.85, 0.9);
  const sebMesh = new THREE.Mesh(sebGeo, glandMat);
  sebMesh.position.set(-0.12, 0.65, 0.12);
  group.add(sebMesh);

  // 4. Arrector Pili Muscle (Sochni tiklovchi silliq mushak)
  const arrPts = [
    new THREE.Vector3(-0.32, -0.15, 0.15),
    new THREE.Vector3(-0.05, 0.35, 0.12),
    new THREE.Vector3(0.25, 0.85, 0.08)
  ];
  group.add(makeTube(arrPts, 0.038, 14, 6, muscleMat));

  // C. ECCRINE SWEAT GLAND (Ter bezi with coiled secretory base & spiral pore duct)
  const sweatCoilGeo = new THREE.TorusGeometry(0.18, 0.065, 10, 18);
  const sweatMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
  const sweatCoilMesh = new THREE.Mesh(sweatCoilGeo, sweatMat);
  sweatCoilMesh.position.set(0.65, -0.22, 0.15);
  group.add(sweatCoilMesh);

  // Corkscrew duct to epidermal pore
  const ductPts = [];
  for (let d = 0; d <= 25; d++) {
    const t = d / 25;
    const dy = -0.15 + t * 1.28;
    const dx = 0.65 + Math.sin(t * Math.PI * 6) * 0.045;
    ductPts.push(new THREE.Vector3(dx, dy, 0.15));
  }
  group.add(makeTube(ductPts, 0.022, 25, 6, sweatMat));

  // D. SENSORY RECEPTORS (Sezgi retseptorlari)
  // 1. Meissner's Tactile Corpuscle (in dermal papilla for light touch)
  const meissGeo = new THREE.SphereGeometry(0.09, 12, 10);
  meissGeo.scale(0.7, 1.4, 0.7);
  const meissMesh = new THREE.Mesh(meissGeo, nerveMat);
  meissMesh.position.set(0.25, 0.88, 0.95);
  group.add(meissMesh);

  // 2. Pacinian Lamellated Corpuscle (in deep dermis/subcutis for pressure/vibration)
  const pacGeo = new THREE.SphereGeometry(0.18, 16, 12);
  pacGeo.scale(0.65, 1.5, 0.65);
  const pacMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.25 });
  const pacMesh = new THREE.Mesh(pacGeo, pacMat);
  pacMesh.position.set(0.75, 0.15, 0.95);
  group.add(pacMesh);

  // Cutaneous sensory nerve branches
  const nPts = [
    new THREE.Vector3(0.75, -0.45, 0.95),
    new THREE.Vector3(0.75, 0.15, 0.95),
    new THREE.Vector3(0.55, 0.55, 0.95),
    new THREE.Vector3(0.25, 0.85, 0.95)
  ];
  group.add(makeTube(nPts, 0.025, 18, 6, nerveMat));

  return group;
}

// ===========================================================================
// 14. LIMFA VA IMMUN SISTEMASI (TALOQ, LIMFA TUGUNLARI VA TOMIRLARI)
// ===========================================================================
export function createLymphaticImmuneModel() {
  const group = new THREE.Group();
  group.name = "lymphatic_immune_system";

  const spleenMat = new THREE.MeshStandardMaterial({
    color: 0x581c87, // Splenic purple-crimson
    roughness: 0.35,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const redPulpMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.45, side: THREE.DoubleSide });
  const whitePulpMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 }); // Malpighian nodules
  const lymphNodeMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.32, side: THREE.DoubleSide }); // Emerald green node
  const lymphVesselMat = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.28 }); // Translucent jade vessels
  const artMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25 });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.25 });

  // A. TALOQ (Spleen / Lien - Left Hypochondrium organ with cutaway)
  const spleenGroup = new THREE.Group();
  spleenGroup.position.set(-1.15, 0.45, 0);

  // Outer Capsule with Splenic Notches
  const spGeo = new THREE.SphereGeometry(0.85, 32, 24, 0, Math.PI * 1.55);
  spGeo.scale(1.25, 0.85, 0.7);
  const spMesh = new THREE.Mesh(spGeo, spleenMat);
  spMesh.rotation.z = 0.35;
  spleenGroup.add(spMesh);

  // Cutaway Interior: Red Pulp & White Pulp Nodules
  const cutFaceGeo = new THREE.CircleGeometry(0.75, 24);
  cutFaceGeo.scale(1.2, 0.8, 1);
  const cutFaceMesh = new THREE.Mesh(cutFaceGeo, redPulpMat);
  cutFaceMesh.position.set(0, 0, 0.02);
  spleenGroup.add(cutFaceMesh);

  // White Pulp Lymphoid Follicles (Malpigi tanachalari)
  for (let w = 0; w < 12; w++) {
    const angle = (w / 12) * Math.PI * 2;
    const r = 0.2 + (w % 3) * 0.15;
    const nodGeo = new THREE.SphereGeometry(0.065, 10, 8);
    const nodMesh = new THREE.Mesh(nodGeo, whitePulpMat);
    nodMesh.position.set(Math.cos(angle) * r, Math.sin(angle) * (r * 0.65), 0.04);
    spleenGroup.add(nodMesh);
  }

  // Splenic Artery (Tortuous serpentine path) & Splenic Vein at Hilum
  const spArtPts = [
    new THREE.Vector3(1.15, 0.15, -0.15),
    new THREE.Vector3(0.75, 0.28, -0.05),
    new THREE.Vector3(0.45, 0.12, 0.05),
    new THREE.Vector3(0.12, 0.05, 0.02)
  ];
  spleenGroup.add(makeTube(spArtPts, 0.065, 20, 8, artMat));

  const spVeinPts = [
    new THREE.Vector3(1.15, -0.05, -0.1),
    new THREE.Vector3(0.55, -0.08, -0.02),
    new THREE.Vector3(0.12, -0.02, 0.02)
  ];
  spleenGroup.add(makeTube(spVeinPts, 0.08, 16, 8, veinMat));

  group.add(spleenGroup);

  // B. LIMFA TUGUNI (Lymph Node / Nodus lymphaticus - Detailed Cross-section on Right)
  const nodeGroup = new THREE.Group();
  nodeGroup.position.set(1.05, 0.15, 0);

  // Outer Capsule Half
  const nGeo = new THREE.SphereGeometry(0.72, 32, 24, 0, Math.PI);
  nGeo.scale(1.3, 0.85, 0.75);
  const nMesh = new THREE.Mesh(nGeo, lymphNodeMat);
  nMesh.rotation.y = -Math.PI / 2;
  nodeGroup.add(nMesh);

  // Cutaway Face showing Cortex (Follicles) and Medullary Cords
  const nFaceGeo = new THREE.CircleGeometry(0.68, 24);
  nFaceGeo.scale(1.25, 0.8, 1);
  const nFaceMesh = new THREE.Mesh(nFaceGeo, new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.38 }));
  nFaceMesh.position.set(0, 0, 0.02);
  nodeGroup.add(nFaceMesh);

  // Germinal Centers / Lymphoid Follicles in Cortex
  for (let f = 0; f < 8; f++) {
    const angle = (f / 7) * Math.PI - Math.PI / 2;
    const fGeo = new THREE.SphereGeometry(0.09, 12, 10);
    const fMesh = new THREE.Mesh(fGeo, new THREE.MeshStandardMaterial({ color: 0xa7f3d0, roughness: 0.3 }));
    fMesh.position.set(Math.cos(angle) * 0.65, Math.sin(angle) * 0.42, 0.04);
    nodeGroup.add(fMesh);
  }

  // Afferent Lymphatic Vessels (4 entering convex side with valves)
  for (let v = 0; v < 4; v++) {
    const angle = -Math.PI * 0.4 + (v / 3) * Math.PI * 0.8;
    const affPts = [
      new THREE.Vector3(Math.cos(angle) * 1.25, Math.sin(angle) * 0.75, 0),
      new THREE.Vector3(Math.cos(angle) * 0.85, Math.sin(angle) * 0.52, 0)
    ];
    nodeGroup.add(makeTube(affPts, 0.038, 8, 6, lymphVesselMat));
  }

  // Efferent Lymphatic Vessel (1 exiting hilum)
  const effPts = [new THREE.Vector3(-0.15, -0.05, 0), new THREE.Vector3(-0.65, -0.25, 0.05)];
  nodeGroup.add(makeTube(effPts, 0.055, 10, 8, lymphVesselMat));

  group.add(nodeGroup);

  // C. THORACIC DUCT (Ko'krak limfa yo'li with Cisterna Chyli)
  const thorCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -1.65, -0.15), // Inguinal collectors
    new THREE.Vector3(0, -1.05, -0.12), // Cisterna chyli (dilated sac)
    new THREE.Vector3(0.04, -0.25, -0.1),
    new THREE.Vector3(0.02, 0.65, -0.08),
    new THREE.Vector3(-0.15, 1.35, -0.05), // Arching into left subclavian angle
    new THREE.Vector3(-0.45, 1.45, -0.02)
  ]);
  group.add(makeTube(thorCurve.points, 0.05, 36, 8, lymphVesselMat));

  // Cisterna Chyli dilation
  const cistGeo = new THREE.SphereGeometry(0.12, 14, 12);
  cistGeo.scale(0.85, 1.8, 0.85);
  const cistMesh = new THREE.Mesh(cistGeo, lymphVesselMat);
  cistMesh.position.set(0, -1.05, -0.12);
  group.add(cistMesh);

  return group;
}

// ===========================================================================
// 15. HUJAYRA TUZILISHI (MITOXONDRIYA, YADRO, ORGANELLALAR)
// ===========================================================================
export function createCellStructureModel() {
  const group = new THREE.Group();
  group.name = "eukaryotic_cell_structure";

  const memMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const cytosolMat = new THREE.MeshStandardMaterial({
    color: 0x0c4a6e,
    transparent: true,
    opacity: 0.15,
    roughness: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const nucleusMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.35, side: THREE.DoubleSide }); // Purple nucleus
  const nucleolusMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.28 }); // Pink nucleolus
  const mitoOuterMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35 }); // Orange mitochondria
  const mitoCristaeMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 }); // Yellow cristae shelves
  const erMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.4, side: THREE.DoubleSide }); // Cyan ER folds
  const golgiMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.32, side: THREE.DoubleSide }); // Green Golgi
  const lysoMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.25 }); // Red lysosomes

  // A. CELL MEMBRANE HEMISECTION (Plazmolemma)
  const cellGeo = new THREE.SphereGeometry(1.65, 48, 36, 0, Math.PI * 1.55);
  const cellMesh = new THREE.Mesh(cellGeo, memMat);
  group.add(cellMesh);

  // Cytosol Core Volume
  const cytGeo = new THREE.SphereGeometry(1.6, 36, 24, 0, Math.PI * 1.55);
  const cytMesh = new THREE.Mesh(cytGeo, cytosolMat);
  group.add(cytMesh);

  // B. NUCLEUS & NUCLEOLUS (Yadro va yadrocha cutaway)
  const nucGeo = new THREE.SphereGeometry(0.65, 32, 24, 0, Math.PI * 1.55);
  const nucMesh = new THREE.Mesh(nucGeo, nucleusMat);
  nucMesh.position.set(-0.25, -0.15, -0.15);
  group.add(nucMesh);

  // Nucleolus (Yadrocha - site of ribosome synthesis)
  const nucleolusGeo = new THREE.SphereGeometry(0.24, 20, 16);
  const nucleolusMesh = new THREE.Mesh(nucleolusGeo, nucleolusMat);
  nucleolusMesh.position.set(-0.25, -0.15, -0.15);
  group.add(nucleolusMesh);

  // Nuclear Pores (Yadro g'ovalari)
  for (let np = 0; np < 16; np++) {
    const angle = (np / 16) * Math.PI * 2;
    const poreGeo = new THREE.TorusGeometry(0.042, 0.014, 6, 12);
    const poreMesh = new THREE.Mesh(poreGeo, new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    poreMesh.position.set(-0.25 + Math.cos(angle) * 0.62, -0.15 + Math.sin(angle) * 0.62, -0.15);
    group.add(poreMesh);
  }

  // C. MITOCHONDRIA (Powerhouses of the cell - 3 detailed cutaways)
  [
    { pos: [0.85, 0.65, 0.2], rot: [0.3, 0.4, 0] },
    { pos: [0.75, -0.75, 0.15], rot: [-0.4, 0.2, 0.5] },
    { pos: [-0.95, 0.75, 0.1], rot: [0.2, -0.5, 0.3] }
  ].forEach(m => {
    const mitoGroup = new THREE.Group();
    mitoGroup.position.set(...m.pos);
    mitoGroup.rotation.set(...m.rot);

    // Outer Capsule Cutaway
    const mCapsuleGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.55, 16, 1, false, 0, Math.PI * 1.5);
    const mCapsuleMesh = new THREE.Mesh(mCapsuleGeo, mitoOuterMat);
    mitoGroup.add(mCapsuleMesh);

    // Inner Cristae Shelves (Ichki kristalar)
    for (let c = -0.2; c <= 0.2; c += 0.08) {
      const cristaGeo = new THREE.BoxGeometry(0.24, 0.025, 0.12);
      const cristaMesh = new THREE.Mesh(cristaGeo, mitoCristaeMat);
      cristaMesh.position.set(0, c, 0);
      mitoGroup.add(cristaMesh);
    }
    group.add(mitoGroup);
  });

  // D. ENDOPLASMIC RETICULUM (Rough & Smooth ER folds)
  for (let e = 0; e < 4; e++) {
    const erFoldGeo = new THREE.TorusGeometry(0.85 + e * 0.12, 0.045, 8, 24, Math.PI * 0.85);
    const erFoldMesh = new THREE.Mesh(erFoldGeo, erMat);
    erFoldMesh.position.set(-0.25, -0.15, -0.15);
    erFoldMesh.rotation.z = Math.PI * 0.25 + e * 0.15;
    group.add(erFoldMesh);
  }

  // E. GOLGI APPARATUS (Stack of curved cisternae + secretory vesicles)
  const golgiGroup = new THREE.Group();
  golgiGroup.position.set(0.45, 0.12, 0.35);
  for (let g = 0; g < 5; g++) {
    const cisternaGeo = new THREE.TorusGeometry(0.42 - g * 0.03, 0.038, 8, 18, Math.PI * 0.65);
    const cisternaMesh = new THREE.Mesh(cisternaGeo, golgiMat);
    cisternaMesh.position.set(g * 0.07, 0, 0);
    cisternaMesh.rotation.y = Math.PI * 0.3;
    golgiGroup.add(cisternaMesh);
  }

  // Budding Secretory Vesicles around Golgi
  [
    [0.2, 0.3, 0], [0.35, -0.25, 0.1], [0.45, 0.2, -0.15], [-0.15, 0.35, 0.2]
  ].forEach(v => {
    const vGeo = new THREE.SphereGeometry(0.065, 10, 8);
    const vMesh = new THREE.Mesh(vGeo, golgiMat);
    vMesh.position.set(...v);
    golgiGroup.add(vMesh);
  });
  group.add(golgiGroup);

  // F. LYSOSOMES & CENTRIOLES
  [
    [-0.55, -0.95, 0.35], [0.25, -1.05, 0.25], [-0.85, -0.35, 0.45]
  ].forEach(l => {
    const lGeo = new THREE.SphereGeometry(0.11, 14, 12);
    const lMesh = new THREE.Mesh(lGeo, lysoMat);
    lMesh.position.set(...l);
    group.add(lMesh);
  });

  // Centrosome / Centrioles (Paired perpendicular microtubule barrels)
  const centGroup = new THREE.Group();
  centGroup.position.set(-0.65, 0.45, 0.25);
  const c1Geo = new THREE.CylinderGeometry(0.05, 0.05, 0.22, 9);
  const cMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
  const c1Mesh = new THREE.Mesh(c1Geo, cMat);
  centGroup.add(c1Mesh);

  const c2Mesh = new THREE.Mesh(c1Geo, cMat);
  c2Mesh.rotation.x = Math.PI / 2;
  centGroup.add(c2Mesh);
  group.add(centGroup);

  return group;
}

// ===========================================================================
// 16. DNK SPIRALI (DNA DOUBLE HELIX — WATSON-CRICK B-DNA)
// ===========================================================================
export function createDnaHelixModel() {
  const group = new THREE.Group();
  group.name = "dna_double_helix";

  const strandMat1 = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8, // Strand 1 sugar-phosphate backbone (Cyan)
    emissive: 0x0284c7,
    emissiveIntensity: 0.2,
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.95
  });

  const strandMat2 = new THREE.MeshPhysicalMaterial({
    color: 0xa855f7, // Strand 2 sugar-phosphate backbone (Violet)
    emissive: 0x7e22ce,
    emissiveIntensity: 0.2,
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 0.95
  });

  const phosphateMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });

  // Nitrogenous Base Materials (Watson-Crick pairs)
  const aMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25 }); // Adenine: Green
  const tMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.25 }); // Thymine: Gold
  const gMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25 }); // Guanine: Blue
  const cMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25 }); // Cytosine: Red
  const hBondMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Hydrogen bond bridge

  const totalSteps = 42;
  const height = 4.2;
  const radius = 0.85;
  const turns = 2.8;

  const strandPts1 = [];
  const strandPts2 = [];

  for (let i = 0; i <= totalSteps; i++) {
    const t = i / totalSteps;
    const angle = t * Math.PI * 2 * turns;
    const y = -height / 2 + t * height;

    // Strand 1 (5' to 3')
    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    strandPts1.push(new THREE.Vector3(x1, y, z1));

    // Strand 2 (Antiparallel 3' to 5', offset by Major/Minor groove angle: ~140 deg)
    const angle2 = angle + Math.PI;
    const x2 = Math.cos(angle2) * radius;
    const z2 = Math.sin(angle2) * radius;
    strandPts2.push(new THREE.Vector3(x2, y, z2));

    // Spherical Phosphate Group Nodes along backbone
    if (i % 2 === 0) {
      const p1Geo = new THREE.SphereGeometry(0.075, 12, 10);
      const p1Mesh = new THREE.Mesh(p1Geo, phosphateMat);
      p1Mesh.position.set(x1, y, z1);
      group.add(p1Mesh);

      const p2Mesh = new THREE.Mesh(p1Geo, phosphateMat);
      p2Mesh.position.set(x2, y, z2);
      group.add(p2Mesh);
    }

    // BASE PAIRS (Rungs of the DNA ladder connecting the two strands)
    if (i < totalSteps) {
      const midY = y;
      const isATPair = (i % 2 === 0);

      // Half-rung from Strand 1 to center
      const r1Pts = [
        new THREE.Vector3(x1, midY, z1),
        new THREE.Vector3(x1 * 0.12, midY, z1 * 0.12)
      ];
      group.add(makeTube(r1Pts, 0.048, 4, 6, isATPair ? aMat : gMat));

      // Half-rung from Strand 2 to center
      const r2Pts = [
        new THREE.Vector3(x2, midY, z2),
        new THREE.Vector3(x2 * 0.12, midY, z2 * 0.12)
      ];
      group.add(makeTube(r2Pts, 0.048, 4, 6, isATPair ? tMat : cMat));

      // Hydrogen Bond Bridge at center
      const hPts = [
        new THREE.Vector3(x1 * 0.12, midY, z1 * 0.12),
        new THREE.Vector3(x2 * 0.12, midY, z2 * 0.12)
      ];
      group.add(makeTube(hPts, 0.02, 3, 4, hBondMat));
    }
  }

  // Smooth Sugar-Phosphate Helical Ribbons
  group.add(makeTube(strandPts1, 0.075, totalSteps * 3, 10, strandMat1));
  group.add(makeTube(strandPts2, 0.075, totalSteps * 3, 10, strandMat2));

  return group;
}

// ===========================================================================
// 17. QON HUJAYRALARI (ERITROTSIT, LEYKOTSIT, TROMBOTSIT)
// ===========================================================================
export function createBloodCellsModel() {
  const group = new THREE.Group();
  group.name = "blood_cells_microstructure";

  // Specialized Hemoglobin Biconcave Material
  const rbcMat = new THREE.MeshPhysicalMaterial({
    color: 0xdc2626, // Glossy scarlet red hemoglobin
    emissive: 0x7f1d1d,
    emissiveIntensity: 0.12,
    roughness: 0.22,
    metalness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
    side: THREE.DoubleSide
  });

  const wbcMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // Pearly white leukocyte membrane
    roughness: 0.42,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const wbcNucleusMat = new THREE.MeshStandardMaterial({
    color: 0x7e22ce, // Multi-lobed neutrophil purple nucleus
    roughness: 0.35
  });

  const plateletMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // Active thrombocyte blue-violet
    roughness: 0.3,
    metalness: 0.05
  });

  // Helper: Authentic Biconcave Erythrocyte Disc (7.8 µm model)
  function createErythrocyteMesh() {
    const geo = new THREE.CylinderGeometry(0.48, 0.48, 0.16, 32);
    // Dimple the top and bottom center to form genuine biconcave profile
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const d = Math.sqrt(x * x + z * z);
      if (d < 0.32) {
        const factor = (1 - d / 0.32);
        const y = pos.getY(i);
        pos.setY(i, y > 0 ? y - 0.055 * factor : y + 0.055 * factor);
      }
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, rbcMat);
  }

  // A. ERYTHROCYTES (Eritrotsitlar - 8 realistic biconcave red blood cells floating)
  const rbcPositions = [
    { pos: [0, 0.15, 0.2], rot: [0.3, 0.4, 0.1], scale: 1.25 },
    { pos: [-0.85, 0.65, -0.15], rot: [-0.4, 0.8, 0.2], scale: 1.05 },
    { pos: [0.95, -0.55, 0.12], rot: [0.6, -0.3, 0.4], scale: 1.1 },
    { pos: [-0.75, -0.85, 0.05], rot: [0.2, 0.5, -0.6], scale: 1.0 },
    { pos: [0.75, 0.85, -0.25], rot: [-0.5, -0.4, 0.3], scale: 1.15 },
    { pos: [-1.25, -0.05, 0.35], rot: [0.8, 0.2, -0.3], scale: 0.95 },
    { pos: [1.35, 0.25, -0.05], rot: [0.1, 0.7, 0.5], scale: 1.0 },
    { pos: [0.15, -1.05, -0.2], rot: [-0.7, 0.1, 0.4], scale: 1.1 }
  ];

  rbcPositions.forEach(cfg => {
    const rbc = createErythrocyteMesh();
    rbc.position.set(...cfg.pos);
    rbc.rotation.set(...cfg.rot);
    rbc.scale.set(cfg.scale, cfg.scale, cfg.scale);
    group.add(rbc);
  });

  // B. LEUKOCYTE: NEUTROPHIL (Leykotsit with Multi-lobed Nucleus Cutaway)
  const wbcGroup = new THREE.Group();
  wbcGroup.position.set(-0.25, 0.95, 0.45);

  // Outer cell membrane cutaway
  const wbcGeo = new THREE.SphereGeometry(0.48, 28, 20, 0, Math.PI * 1.55);
  const wbcMesh = new THREE.Mesh(wbcGeo, wbcMat);
  wbcGroup.add(wbcMesh);

  // Surface Microvilli pseudopodia
  for (let m = 0; m < 20; m++) {
    const angle = (m / 20) * Math.PI * 2;
    const vGeo = new THREE.ConeGeometry(0.04, 0.12, 6);
    const vMesh = new THREE.Mesh(vGeo, wbcMat);
    vMesh.position.set(Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 0);
    vMesh.rotation.z = angle - Math.PI / 2;
    wbcGroup.add(vMesh);
  }

  // Multi-lobed Nucleus (3 connected lobes in purple)
  const lobe1 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), wbcNucleusMat);
  lobe1.position.set(-0.12, 0.08, 0);
  wbcGroup.add(lobe1);

  const lobe2 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), wbcNucleusMat);
  lobe2.position.set(0.12, 0.12, 0);
  wbcGroup.add(lobe2);

  const lobe3 = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), wbcNucleusMat);
  lobe3.position.set(0.02, -0.14, 0);
  wbcGroup.add(lobe3);

  // Chromatin bridges connecting lobes
  const bridgePts = [new THREE.Vector3(-0.12, 0.08, 0), new THREE.Vector3(0.02, -0.14, 0), new THREE.Vector3(0.12, 0.12, 0)];
  wbcGroup.add(makeTube(bridgePts, 0.035, 8, 6, wbcNucleusMat));

  group.add(wbcGroup);

  // C. THROMBOCYTES / PLATELETS (Trombotsitlar - Active discs with pseudopodia)
  const plateletConfigs = [
    { pos: [0.15, 0.15, 0.65], rot: [0.4, 0.2, 0.1] },
    { pos: [-0.45, -0.35, 0.55], rot: [0.2, -0.5, 0.3] },
    { pos: [0.55, -0.25, 0.45], rot: [-0.3, 0.4, 0.2] },
    { pos: [-0.15, -0.75, 0.35], rot: [0.5, 0.1, -0.4] }
  ];

  plateletConfigs.forEach(cfg => {
    const plGroup = new THREE.Group();
    plGroup.position.set(...cfg.pos);
    plGroup.rotation.set(...cfg.rot);

    // Lentiform disc core
    const pGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 14);
    const pMesh = new THREE.Mesh(pGeo, plateletMat);
    plGroup.add(pMesh);

    // Spiky pseudopodia extensions (Clotting activation)
    for (let s = 0; s < 5; s++) {
      const a = (s / 5) * Math.PI * 2;
      const sPts = [
        new THREE.Vector3(Math.cos(a) * 0.12, 0, Math.sin(a) * 0.12),
        new THREE.Vector3(Math.cos(a) * 0.24, (s % 2 === 0 ? 0.05 : -0.05), Math.sin(a) * 0.24)
      ];
      plGroup.add(makeTube(sPts, 0.018, 4, 4, plateletMat));
    }
    group.add(plGroup);
  });

  return group;
}
