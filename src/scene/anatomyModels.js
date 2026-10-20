import * as THREE from 'three';

// Material helpers
export const BoneMaterial = new THREE.MeshStandardMaterial({
  color: 0xf4eedb,
  roughness: 0.45,
  metalness: 0.1,
  flatShading: false
});

export const CartilageMaterial = new THREE.MeshStandardMaterial({
  color: 0x93c5fd,
  roughness: 0.3,
  metalness: 0.1,
  transparent: true,
  opacity: 0.85
});

export const HeartMuscleMaterial = new THREE.MeshStandardMaterial({
  color: 0x991b1b,
  roughness: 0.35,
  metalness: 0.15
});

export const AortaMaterial = new THREE.MeshStandardMaterial({
  color: 0xdc2626,
  roughness: 0.3,
  metalness: 0.2
});

export const VeinMaterial = new THREE.MeshStandardMaterial({
  color: 0x2563eb,
  roughness: 0.3,
  metalness: 0.2
});

export const LungMaterial = new THREE.MeshStandardMaterial({
  color: 0xf87171,
  roughness: 0.5,
  metalness: 0.05,
  transparent: true,
  opacity: 0.9
});

export const HighlightMaterial = new THREE.MeshStandardMaterial({
  color: 0xfbbf24,
  roughness: 0.2,
  metalness: 0.3,
  emissive: 0xd97706,
  emissiveIntensity: 0.5
});

/**
 * 1. SKULL MODEL (Cranium)
 */
export function createSkullModel() {
  const group = new THREE.Group();
  group.name = "skull";

  // Cranium Vault (Frontal & Parietal)
  const vaultGeo = new THREE.SphereGeometry(1.2, 32, 28);
  vaultGeo.scale(1.0, 1.15, 1.25);
  const vaultMat = BoneMaterial.clone();
  const vaultMesh = new THREE.Mesh(vaultGeo, vaultMat);
  vaultMesh.position.set(0, 0.4, -0.1);
  vaultMesh.userData = { id: "parietal", name: "Tepa va Peshona gumbazi (Calvaria)" };
  group.add(vaultMesh);

  // Frontal bone forehead
  const frontalGeo = new THREE.SphereGeometry(0.9, 24, 20);
  frontalGeo.scale(1.05, 0.85, 0.9);
  const frontalMesh = new THREE.Mesh(frontalGeo, BoneMaterial.clone());
  frontalMesh.position.set(0, 0.65, 0.5);
  frontalMesh.userData = { id: "frontal", name: "Peshona suyagi (Os frontale)" };
  group.add(frontalMesh);

  // Occipital bone (Back)
  const occipitalGeo = new THREE.SphereGeometry(0.95, 24, 20);
  occipitalGeo.scale(0.95, 0.9, 1.05);
  const occipitalMesh = new THREE.Mesh(occipitalGeo, BoneMaterial.clone());
  occipitalMesh.position.set(0, 0.15, -0.7);
  occipitalMesh.userData = { id: "occipital", name: "Ensa suyagi (Os occipitale)" };
  group.add(occipitalMesh);

  // Temporal bones (Sides)
  [-1, 1].forEach((side) => {
    const tempGeo = new THREE.BoxGeometry(0.25, 0.7, 0.8);
    const tempMesh = new THREE.Mesh(tempGeo, BoneMaterial.clone());
    tempMesh.position.set(side * 1.15, 0.2, -0.1);
    tempMesh.userData = { id: "temporal", name: "Chakka suyagi (Os temporale)" };
    group.add(tempMesh);

    // Zygomatic arch (Cheekbone)
    const zygoGeo = new THREE.TorusGeometry(0.35, 0.08, 12, 24, Math.PI * 0.9);
    const zygoMesh = new THREE.Mesh(zygoGeo, BoneMaterial.clone());
    zygoMesh.rotation.y = side * Math.PI / 2;
    zygoMesh.rotation.x = 0.2;
    zygoMesh.position.set(side * 1.05, -0.15, 0.45);
    zygoMesh.userData = { id: "temporal", name: "Yonoq yoyi (Arcus zygomaticus)" };
    group.add(zygoMesh);

    // Eye Orbit rim
    const orbitGeo = new THREE.TorusGeometry(0.32, 0.07, 16, 28);
    const orbitMesh = new THREE.Mesh(orbitGeo, BoneMaterial.clone());
    orbitMesh.position.set(side * 0.45, 0.15, 1.02);
    orbitMesh.rotation.y = side * 0.15;
    orbitMesh.userData = { id: "frontal", name: "Ko'z kosasi (Orbita)" };
    group.add(orbitMesh);
  });

  // Nasal Bone
  const nasalGeo = new THREE.ConeGeometry(0.18, 0.55, 4);
  nasalGeo.scale(1.1, 1, 0.7);
  const nasalMesh = new THREE.Mesh(nasalGeo, BoneMaterial.clone());
  nasalMesh.rotation.x = -0.35;
  nasalMesh.position.set(0, 0.05, 1.15);
  nasalMesh.userData = { id: "frontal", name: "Burun suyagi (Os nasale)" };
  group.add(nasalMesh);

  // Maxilla (Upper Jaw)
  const maxillaGeo = new THREE.BoxGeometry(0.85, 0.55, 0.65);
  const maxillaMesh = new THREE.Mesh(maxillaGeo, BoneMaterial.clone());
  maxillaMesh.position.set(0, -0.3, 0.8);
  maxillaMesh.userData = { id: "maxilla", name: "Yuqori jag' suyagi (Maxilla)" };
  group.add(maxillaMesh);

  // Upper Teeth row
  const upperTeethGeo = new THREE.TorusGeometry(0.38, 0.06, 8, 20, Math.PI);
  const teethMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
  const upperTeeth = new THREE.Mesh(upperTeethGeo, teethMat);
  upperTeeth.rotation.x = Math.PI / 2;
  upperTeeth.rotation.z = Math.PI;
  upperTeeth.position.set(0, -0.56, 0.85);
  group.add(upperTeeth);

  // Mandible (Lower Jaw)
  const jawGroup = new THREE.Group();
  jawGroup.name = "mandible_group";

  const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.75);
  const jawMesh = new THREE.Mesh(jawGeo, BoneMaterial.clone());
  jawMesh.position.set(0, -0.85, 0.6);
  jawMesh.userData = { id: "mandible", name: "Pastki jag' suyagi (Mandibula)" };
  jawGroup.add(jawMesh);

  // Chin bump
  const chinGeo = new THREE.SphereGeometry(0.28, 16, 16);
  chinGeo.scale(1.2, 0.9, 1.1);
  const chinMesh = new THREE.Mesh(chinGeo, BoneMaterial.clone());
  chinMesh.position.set(0, -0.92, 0.95);
  chinMesh.userData = { id: "mandible", name: "Iyak do'mbog'i (Protuberantia mentalis)" };
  jawGroup.add(chinMesh);

  // Lower Teeth row
  const lowerTeeth = new THREE.Mesh(upperTeethGeo, teethMat);
  lowerTeeth.rotation.x = Math.PI / 2;
  lowerTeeth.rotation.z = Math.PI;
  lowerTeeth.position.set(0, -0.68, 0.84);
  jawGroup.add(lowerTeeth);

  // Jaw Rami (vertical sides)
  [-1, 1].forEach(side => {
    const ramusGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.75, 12);
    const ramusMesh = new THREE.Mesh(ramusGeo, BoneMaterial.clone());
    ramusMesh.position.set(side * 0.75, -0.5, 0.2);
    ramusMesh.rotation.x = 0.35;
    ramusMesh.userData = { id: "mandible", name: "Pastki jag' tarmog'i (Ramus mandibulae)" };
    jawGroup.add(ramusMesh);
  });

  group.add(jawGroup);
  group.position.y = 0.2;
  return group;
}

/**
 * 2. HEART MODEL (Cor)
 */
export function createHeartModel() {
  const group = new THREE.Group();
  group.name = "heart";

  // Main Ventricles Body (Heart cone)
  const ventricleGeo = new THREE.SphereGeometry(1.1, 32, 28);
  ventricleGeo.scale(0.9, 1.25, 0.95);
  const heartMesh = new THREE.Mesh(ventricleGeo, HeartMuscleMaterial.clone());
  heartMesh.rotation.z = -0.22;
  heartMesh.rotation.x = 0.15;
  heartMesh.userData = { id: "left_ventricle", name: "Chap va O'ng Qorinchalar (Ventriculi)" };
  group.add(heartMesh);

  // Heart Apex (tip)
  const apexGeo = new THREE.ConeGeometry(0.7, 0.9, 24);
  apexGeo.scale(1, 1, 0.8);
  const apexMesh = new THREE.Mesh(apexGeo, HeartMuscleMaterial.clone());
  apexMesh.rotation.z = Math.PI - 0.22;
  apexMesh.position.set(-0.25, -1.3, 0.1);
  apexMesh.userData = { id: "left_ventricle", name: "Yurak uchi (Apex cordis)" };
  group.add(apexMesh);

  // Right Ventricle bulge
  const rvGeo = new THREE.SphereGeometry(0.75, 20, 20);
  rvGeo.scale(0.8, 1.1, 0.9);
  const rvMesh = new THREE.Mesh(rvGeo, HeartMuscleMaterial.clone());
  rvMesh.position.set(0.5, -0.3, 0.3);
  rvMesh.userData = { id: "right_ventricle", name: "O'ng qorincha (Ventriculus dexter)" };
  group.add(rvMesh);

  // Left Atrium (auricle)
  const laGeo = new THREE.SphereGeometry(0.55, 18, 18);
  const laMesh = new THREE.Mesh(laGeo, HeartMuscleMaterial.clone());
  laMesh.position.set(-0.6, 0.75, -0.1);
  laMesh.userData = { id: "left_atrium", name: "Chap bo'lmacha (Atrium sinistrum)" };
  group.add(laMesh);

  // Right Atrium
  const raGeo = new THREE.SphereGeometry(0.65, 18, 18);
  const raMesh = new THREE.Mesh(raGeo, HeartMuscleMaterial.clone());
  raMesh.position.set(0.65, 0.6, 0.15);
  raMesh.userData = { id: "right_atrium", name: "O'ng bo'lmacha (Atrium dextrum)" };
  group.add(raMesh);

  // Aorta Arch (Arcus aortae)
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.6, 0.1),
    new THREE.Vector3(-0.1, 1.25, 0.15),
    new THREE.Vector3(0.05, 1.55, -0.05),
    new THREE.Vector3(0.35, 1.35, -0.35),
    new THREE.Vector3(0.3, 0.3, -0.45)
  ]);
  const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.25, 16, false);
  const aortaMesh = new THREE.Mesh(aortaGeo, AortaMaterial.clone());
  aortaMesh.userData = { id: "aorta", name: "Aorta yoyi (Arcus aortae)" };
  group.add(aortaMesh);

  // Aorta Branches (3 arteries: Brachiocephalic, Carotid, Subclavian)
  [-0.1, 0.05, 0.2].forEach((offset, idx) => {
    const branchGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.45, 12);
    const branchMesh = new THREE.Mesh(branchGeo, AortaMaterial.clone());
    branchMesh.position.set(offset, 1.65, -0.05 + idx * 0.05);
    branchMesh.rotation.z = (idx - 1) * 0.15;
    branchMesh.userData = { id: "aorta", name: `Aorta tarmog'i #${idx + 1}` };
    group.add(branchMesh);
  });

  // Pulmonary Trunk & Arteries (blue-red)
  const ptCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0.5, 0.45),
    new THREE.Vector3(0.05, 0.95, 0.35),
    new THREE.Vector3(-0.35, 1.15, 0.15)
  ]);
  const ptGeo = new THREE.TubeGeometry(ptCurve, 24, 0.22, 16, false);
  const ptMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
  const ptMesh = new THREE.Mesh(ptGeo, ptMat);
  ptMesh.userData = { id: "pulmonary_trunk", name: "O'pka poyasi (Truncus pulmonalis)" };
  group.add(ptMesh);

  // Superior Vena Cava (blue)
  const svcGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 16);
  const svcMesh = new THREE.Mesh(svcGeo, VeinMaterial.clone());
  svcMesh.position.set(0.75, 1.25, -0.2);
  svcMesh.userData = { id: "right_atrium", name: "Yuqori kovak vena (Vena cava superior)" };
  group.add(svcMesh);

  // Coronary Arteries (fine red lines on surface)
  const caCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.45, 0.9),
    new THREE.Vector3(-0.15, -0.1, 0.85),
    new THREE.Vector3(-0.25, -0.7, 0.7),
    new THREE.Vector3(-0.28, -1.1, 0.4)
  ]);
  const caGeo = new THREE.TubeGeometry(caCurve, 24, 0.04, 8, false);
  const caMesh = new THREE.Mesh(caGeo, AortaMaterial.clone());
  caMesh.userData = { id: "left_ventricle", name: "Oldingi qorinchalararo toj arteriya (Arteria coronaria)" };
  group.add(caMesh);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

/**
 * 3. HAND & FOREARM MODEL (Ossa membri superioris)
 */
export function createArmHandModel() {
  const group = new THREE.Group();
  group.name = "arm_hand";

  // Radius (Lateral bone)
  const radiusCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, -1.8, 0),
    new THREE.Vector3(-0.45, -0.8, 0.05),
    new THREE.Vector3(-0.55, 0.3, 0)
  ]);
  const radiusGeo = new THREE.TubeGeometry(radiusCurve, 20, 0.14, 12, false);
  const radiusMesh = new THREE.Mesh(radiusGeo, BoneMaterial.clone());
  radiusMesh.userData = { id: "radius", name: "Bilak suyagi (Radius)" };
  group.add(radiusMesh);

  // Ulna (Medial bone)
  const ulnaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.3, -1.8, 0),
    new THREE.Vector3(0.32, -0.8, -0.04),
    new THREE.Vector3(0.28, 0.4, 0)
  ]);
  const ulnaGeo = new THREE.TubeGeometry(ulnaCurve, 20, 0.15, 12, false);
  const ulnaMesh = new THREE.Mesh(ulnaGeo, BoneMaterial.clone());
  ulnaMesh.userData = { id: "ulna", name: "Tirsak suyagi (Ulna)" };
  group.add(ulnaMesh);

  // Olecranon (Elbow tip)
  const olecGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const olecMesh = new THREE.Mesh(olecGeo, BoneMaterial.clone());
  olecMesh.position.set(0.3, -1.9, -0.1);
  olecMesh.userData = { id: "ulna", name: "Tirsak o'sig'i (Olecranon)" };
  group.add(olecMesh);

  // Carpus (Wrist bones cluster - 8 bones)
  const carpusGroup = new THREE.Group();
  carpusGroup.userData = { id: "carpus", name: "Kaft usti suyaklari (Ossa carpi - 8 ta)" };
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const boneGeo = new THREE.DodecahedronGeometry(0.12);
      const boneMesh = new THREE.Mesh(boneGeo, BoneMaterial.clone());
      boneMesh.position.set((c - 1.5) * 0.26 - 0.1, 0.65 + r * 0.24, (Math.random() - 0.5) * 0.08);
      boneMesh.userData = { id: "carpus", name: "Kaft usti suyagi (Os carpi)" };
      carpusGroup.add(boneMesh);
    }
  }
  group.add(carpusGroup);

  // 5 Metacarpals (Palm bones)
  const fingerAngles = [-0.65, -0.22, 0.0, 0.22, 0.42];
  const fingerLengths = [0.85, 1.25, 1.35, 1.25, 1.05];

  fingerAngles.forEach((angle, i) => {
    const metaLen = (i === 0) ? 0.75 : 0.95;
    const metaGeo = new THREE.CylinderGeometry(0.08, 0.1, metaLen, 12);
    const metaMesh = new THREE.Mesh(metaGeo, BoneMaterial.clone());

    const startX = (i - 2) * 0.28 - 0.1;
    metaMesh.position.set(startX + Math.sin(angle) * (metaLen / 2), 1.25 + Math.cos(angle) * (metaLen / 2), 0);
    metaMesh.rotation.z = -angle;
    metaMesh.userData = { id: "metacarpus", name: `${i + 1}-kaft suyagi (Os metacarpi ${i + 1})` };
    group.add(metaMesh);

    // Phalanges (2 for thumb, 3 for other fingers)
    const phalCount = (i === 0) ? 2 : 3;
    let jointY = 1.25 + Math.cos(angle) * metaLen;
    let jointX = startX + Math.sin(angle) * metaLen;

    for (let p = 0; p < phalCount; p++) {
      const pLen = (fingerLengths[i] / phalCount) * (1 - p * 0.15);
      const pGeo = new THREE.CylinderGeometry(0.065 - p * 0.01, 0.075 - p * 0.01, pLen, 10);
      const pMesh = new THREE.Mesh(pGeo, BoneMaterial.clone());

      pMesh.position.set(
        jointX + Math.sin(angle) * (pLen / 2),
        jointY + Math.cos(angle) * (pLen / 2),
        0
      );
      pMesh.rotation.z = -angle;
      pMesh.userData = { id: "phalanges", name: `Barmoq falangasi (${p === 0 ? 'Proksimal' : p === 1 ? 'O\'rta' : 'Distal'})` };
      group.add(pMesh);

      // Joint sphere
      const jointGeo = new THREE.SphereGeometry(0.085 - p * 0.01, 10, 10);
      const jointMesh = new THREE.Mesh(jointGeo, CartilageMaterial.clone());
      jointMesh.position.set(jointX, jointY, 0);
      group.add(jointMesh);

      jointX += Math.sin(angle) * pLen;
      jointY += Math.cos(angle) * pLen;
    }
  });

  group.position.y = -0.5;
  return group;
}

/**
 * 4. RIBCAGE & LUNGS (Thorax et Pulmones)
 */
export function createRibcageLungsModel() {
  const group = new THREE.Group();
  group.name = "ribcage_lungs";

  // Sternum (Breastbone)
  const sternumGroup = new THREE.Group();
  sternumGroup.userData = { id: "sternum", name: "To'sh suyagi (Sternum)" };

  // Manubrium
  const manubriumGeo = new THREE.BoxGeometry(0.65, 0.45, 0.18);
  const manubrium = new THREE.Mesh(manubriumGeo, BoneMaterial.clone());
  manubrium.position.set(0, 1.15, 1.15);
  manubrium.userData = { id: "sternum", name: "To'sh dastasi (Manubrium sterni)" };
  sternumGroup.add(manubrium);

  // Body of sternum
  const corpusGeo = new THREE.BoxGeometry(0.48, 1.3, 0.16);
  const corpus = new THREE.Mesh(corpusGeo, BoneMaterial.clone());
  corpus.position.set(0, 0.35, 1.12);
  corpus.userData = { id: "sternum", name: "To'sh tanasi (Corpus sterni)" };
  sternumGroup.add(corpus);

  // Xiphoid process
  const xiphoidGeo = new THREE.ConeGeometry(0.18, 0.4, 4);
  const xiphoid = new THREE.Mesh(xiphoidGeo, CartilageMaterial.clone());
  xiphoid.position.set(0, -0.45, 1.08);
  xiphoid.rotation.z = Math.PI;
  xiphoid.userData = { id: "sternum", name: "Xanjarsimon o'siq (Processus xiphoideus)" };
  sternumGroup.add(xiphoid);

  group.add(sternumGroup);

  // 12 Pairs of Ribs
  for (let i = 0; i < 10; i++) {
    const y = 1.0 - i * 0.22;
    const width = 1.1 + Math.sin((i / 10) * Math.PI) * 0.75;
    const depth = 0.95 + Math.sin((i / 10) * Math.PI) * 0.45;

    [-1, 1].forEach(side => {
      const ribCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.25, y + 0.1, -0.7),
        new THREE.Vector3(side * width, y - 0.05, -0.1),
        new THREE.Vector3(side * (width * 0.9), y - 0.18, depth * 0.7),
        new THREE.Vector3(side * 0.25, y - 0.25, 1.05)
      ]);
      const ribGeo = new THREE.TubeGeometry(ribCurve, 20, 0.055, 10, false);
      const isCartilage = (i < 7);
      const ribMesh = new THREE.Mesh(ribGeo, isCartilage ? BoneMaterial.clone() : CartilageMaterial.clone());
      ribMesh.userData = { id: "ribs", name: `${i + 1}-qovurg'a (Costa ${i + 1})` };
      group.add(ribMesh);
    });
  }

  // Left Lung (2 lobes, smaller with cardiac notch)
  const leftLungGeo = new THREE.SphereGeometry(0.75, 24, 24);
  leftLungGeo.scale(0.85, 1.6, 0.85);
  const leftLungMesh = new THREE.Mesh(leftLungGeo, LungMaterial.clone());
  leftLungMesh.position.set(-0.7, 0.3, 0.05);
  leftLungMesh.userData = { id: "lungs_left", name: "Chap o'pka (Pulmo sinister - 2 bo'lakli)" };
  group.add(leftLungMesh);

  // Right Lung (3 lobes, larger)
  const rightLungGeo = new THREE.SphereGeometry(0.88, 24, 24);
  rightLungGeo.scale(0.95, 1.65, 0.9);
  const rightLungMesh = new THREE.Mesh(rightLungGeo, LungMaterial.clone());
  rightLungMesh.position.set(0.75, 0.3, 0.05);
  rightLungMesh.userData = { id: "lungs_right", name: "O'ng o'pka (Pulmo dexter - 3 bo'lakli)" };
  group.add(rightLungMesh);

  // Trachea & Main Bronchi
  const tracheaGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.8, 16);
  const tracheaMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.3 });
  const tracheaMesh = new THREE.Mesh(tracheaGeo, tracheaMat);
  tracheaMesh.position.set(0, 1.45, 0.1);
  tracheaMesh.userData = { id: "trachea", name: "Kengirdak (Trachea)" };
  group.add(tracheaMesh);

  // Bronchi split
  [-1, 1].forEach((side, idx) => {
    const bronchusGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.5, 12);
    const bronchusMesh = new THREE.Mesh(bronchusGeo, tracheaMat);
    bronchusMesh.position.set(side * 0.25, 0.95, 0.1);
    bronchusMesh.rotation.z = side * 0.65;
    bronchusMesh.userData = { id: "trachea", name: `${side < 0 ? 'Chap' : 'O\'ng'} asosiy bronx` };
    group.add(bronchusMesh);
  });

  group.position.y = -0.2;
  return group;
}

/**
 * 5. VERTEBRAL COLUMN (Columna vertebralis)
 */
export function createSpineModel() {
  const group = new THREE.Group();
  group.name = "spine";

  // Spinal Cord core (illuminated glowing yellow cord)
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.2, 0),
    new THREE.Vector3(0, 1.5, 0.08),
    new THREE.Vector3(0, 0.3, -0.1),
    new THREE.Vector3(0, -1.0, 0.1),
    new THREE.Vector3(0, -2.0, -0.05)
  ]);
  const cordGeo = new THREE.TubeGeometry(cordCurve, 40, 0.07, 12, false);
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xeab308,
    emissiveIntensity: 0.4
  });
  const cordMesh = new THREE.Mesh(cordGeo, cordMat);
  cordMesh.userData = { id: "cervical", name: "Orqa miya (Medulla spinalis)" };
  group.add(cordMesh);

  // 24 Vertebrae (7 Cervical, 12 Thoracic, 5 Lumbar)
  const totalVertebrae = [
    { count: 7, scale: 0.7, id: "cervical", name: "Bo'yin umurtqasi (Vertebra cervicalis)" },
    { count: 12, scale: 0.95, id: "thoracic", name: "Ko'krak umurtqasi (Vertebra thoracica)" },
    { count: 5, scale: 1.3, id: "lumbar", name: "Bel umurtqasi (Vertebra lumbalis)" }
  ];

  let currentY = 2.1;
  totalVertebrae.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      const vGroup = new THREE.Group();
      vGroup.userData = { id: sec.id, name: sec.name };

      // Vertebral Body (Corpus vertebrae)
      const bodyGeo = new THREE.CylinderGeometry(0.24 * sec.scale, 0.25 * sec.scale, 0.12 * sec.scale, 18);
      const bodyMesh = new THREE.Mesh(bodyGeo, BoneMaterial.clone());
      bodyMesh.position.set(0, 0, 0.15 * sec.scale);
      vGroup.add(bodyMesh);

      // Spinous Process (back protrusion)
      const spinousGeo = new THREE.ConeGeometry(0.08 * sec.scale, 0.45 * sec.scale, 6);
      const spinousMesh = new THREE.Mesh(spinousGeo, BoneMaterial.clone());
      spinousMesh.rotation.x = -Math.PI / 2.3;
      spinousMesh.position.set(0, -0.05, -0.35 * sec.scale);
      vGroup.add(spinousMesh);

      // Transverse Processes (left/right)
      [-1, 1].forEach(side => {
        const transGeo = new THREE.BoxGeometry(0.35 * sec.scale, 0.08 * sec.scale, 0.12 * sec.scale);
        const transMesh = new THREE.Mesh(transGeo, BoneMaterial.clone());
        transMesh.position.set(side * 0.32 * sec.scale, 0, 0);
        vGroup.add(transMesh);
      });

      // Intervertebral Disc
      const discGeo = new THREE.CylinderGeometry(0.25 * sec.scale, 0.25 * sec.scale, 0.045 * sec.scale, 18);
      const discMesh = new THREE.Mesh(discGeo, CartilageMaterial.clone());
      discMesh.position.set(0, -0.085 * sec.scale, 0.15 * sec.scale);
      vGroup.add(discMesh);

      // S-curve curvature offset
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
  sacrumMesh.userData = { id: "sacrum", name: "Dumg'aza suyagi (Os sacrum)" };
  group.add(sacrumMesh);

  const coccyxGeo = new THREE.ConeGeometry(0.2, 0.35, 4);
  const coccyxMesh = new THREE.Mesh(coccyxGeo, BoneMaterial.clone());
  coccyxMesh.rotation.x = 0.45;
  coccyxMesh.position.set(0, currentY - 0.85, -0.2);
  coccyxMesh.userData = { id: "coccyx", name: "Dum suyagi (Os coccygis)" };
  group.add(coccyxMesh);

  group.position.y = 0.2;
  return group;
}
