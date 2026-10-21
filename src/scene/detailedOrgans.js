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
