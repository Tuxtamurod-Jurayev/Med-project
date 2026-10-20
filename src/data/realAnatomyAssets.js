// Ultra-high definition realistic medical anatomical visualizations
// Both in Full Realistic Anatomy mode and Radiography (X-Ray) mode with precise landmark coordinates

export const REAL_ANATOMY_ASSETS = {
  skull: {
    id: "skull",
    name: "Bosh suyagi (Cranium)",
    hotspots: [
      { id: "frontal", nameUz: "Peshona suyagi", nameLat: "Os frontale", x: 50, y: 22 },
      { id: "parietal", nameUz: "Tepa suyagi", nameLat: "Os parietale", x: 72, y: 26 },
      { id: "temporal", nameUz: "Chakka suyagi", nameLat: "Os temporale", x: 70, y: 50 },
      { id: "occipital", nameUz: "Ensa suyagi", nameLat: "Os occipitale", x: 80, y: 64 },
      { id: "maxilla", nameUz: "Yuqori jag'", nameLat: "Maxilla", x: 50, y: 65 },
      { id: "mandible", nameUz: "Pastki jag'", nameLat: "Mandibula", x: 50, y: 84 }
    ],
    // High-definition Realistic Medical Anatomy Illustration
    realImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <defs>
        <radialGradient id="boneGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stop-color="%23fdfbf7"/>
          <stop offset="45%" stop-color="%23f1e7d0"/>
          <stop offset="85%" stop-color="%23d8c8a7"/>
          <stop offset="100%" stop-color="%239c8763"/>
        </radialGradient>
        <radialGradient id="orbitGrad" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stop-color="%230f172a"/>
          <stop offset="80%" stop-color="%23050811"/>
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="%23000" flood-opacity="0.6"/>
        </filter>
      </defs>
      
      <!-- Skull Cranium Vault -->
      <g filter="url(%23shadow)">
        <path d="M 300 70 C 430 70, 500 160, 490 290 C 480 380, 440 430, 420 460 C 420 520, 390 600, 350 620 C 320 635, 280 635, 250 620 C 210 600, 180 520, 180 460 C 160 430, 120 380, 110 290 C 100 160, 170 70, 300 70 Z" fill="url(%23boneGrad)" stroke="%23846e4b" stroke-width="3"/>
        
        <!-- Cranial Sutures (Coronal & Sagittal) -->
        <path d="M 300 70 Q 295 120 302 160 Q 298 200 300 240" fill="none" stroke="%239c8763" stroke-width="2" stroke-dasharray="4,2"/>
        <path d="M 170 170 Q 240 190 300 180 Q 360 190 430 170" fill="none" stroke="%239c8763" stroke-width="2" stroke-dasharray="3,2"/>
        
        <!-- Eye Orbits (Ko'z kosalari) -->
        <ellipse cx="230" cy="330" rx="46" ry="42" fill="url(%23orbitGrad)" stroke="%235a4a30" stroke-width="3"/>
        <ellipse cx="370" cy="330" rx="46" ry="42" fill="url(%23orbitGrad)" stroke="%235a4a30" stroke-width="3"/>
        <ellipse cx="235" cy="335" rx="30" ry="24" fill="%23000"/>
        <ellipse cx="365" cy="335" rx="30" ry="24" fill="%23000"/>
        
        <!-- Nasal Aperture (Burun teshigi) -->
        <path d="M 300 360 L 280 430 C 285 445, 315 445, 320 430 Z" fill="%231a140d" stroke="%235a4a30" stroke-width="2"/>
        
        <!-- Zygomatic Arches (Yonoq suyaklari) -->
        <path d="M 130 350 Q 170 380 200 420" fill="none" stroke="%23846e4b" stroke-width="6"/>
        <path d="M 470 350 Q 430 380 400 420" fill="none" stroke="%23846e4b" stroke-width="6"/>
        
        <!-- Maxilla & Upper Teeth -->
        <path d="M 220 450 Q 300 460 380 450 L 375 500 Q 300 515 225 500 Z" fill="url(%23boneGrad)" stroke="%237a6543" stroke-width="2"/>
        <!-- Upper teeth details -->
        <g fill="%23ffffff" stroke="%23baa682" stroke-width="1.5">
          <rect x="240" y="495" width="12" height="18" rx="3"/>
          <rect x="254" y="495" width="13" height="19" rx="3"/>
          <rect x="269" y="495" width="14" height="20" rx="3"/>
          <rect x="285" y="495" width="14" height="21" rx="3"/>
          <rect x="301" y="495" width="14" height="21" rx="3"/>
          <rect x="317" y="495" width="14" height="20" rx="3"/>
          <rect x="333" y="495" width="13" height="19" rx="3"/>
          <rect x="348" y="495" width="12" height="18" rx="3"/>
        </g>
        
        <!-- Mandible (Pastki jag') -->
        <path d="M 205 490 L 225 565 Q 300 625 375 565 L 395 490 Q 300 520 205 490 Z" fill="url(%23boneGrad)" stroke="%23685435" stroke-width="2.5"/>
        <g fill="%23ffffff" stroke="%23baa682" stroke-width="1.5">
          <rect x="250" y="525" width="13" height="17" rx="3"/>
          <rect x="265" y="525" width="14" height="18" rx="3"/>
          <rect x="281" y="525" width="18" height="19" rx="3"/>
          <rect x="301" y="525" width="18" height="19" rx="3"/>
          <rect x="321" y="525" width="14" height="18" rx="3"/>
          <rect x="337" y="525" width="13" height="17" rx="3"/>
        </g>
        
        <!-- Chin prominence (Iyak) -->
        <ellipse cx="300" cy="595" rx="35" ry="16" fill="%23e3d6bc" opacity="0.6"/>
      </g>
    </svg>`,

    // Real Medical Radiography (X-Ray)
    xrayImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%23050c18"/>
      <g filter="blur(1px)">
        <path d="M 300 70 C 430 70, 500 160, 490 290 C 480 380, 440 430, 420 460 C 420 520, 390 600, 350 620 C 320 635, 280 635, 250 620 C 210 600, 180 520, 180 460 C 160 430, 120 380, 110 290 C 100 160, 170 70, 300 70 Z" fill="none" stroke="%2367e8f9" stroke-width="12" opacity="0.75"/>
        <ellipse cx="230" cy="330" rx="46" ry="42" fill="%23020813" stroke="%2338bdf8" stroke-width="8" opacity="0.85"/>
        <ellipse cx="370" cy="330" rx="46" ry="42" fill="%23020813" stroke="%2338bdf8" stroke-width="8" opacity="0.85"/>
        <path d="M 300 360 L 280 430 C 285 445, 315 445, 320 430 Z" fill="%23020813" stroke="%2338bdf8" stroke-width="6"/>
        <path d="M 205 490 L 225 565 Q 300 625 375 565 L 395 490" fill="none" stroke="%2367e8f9" stroke-width="10" opacity="0.8"/>
        <text x="300" y="660" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="4">CRANIAL RADIOGRAPHY (X-RAY)</text>
      </g>
    </svg>`
  },

  heart: {
    id: "heart",
    name: "Inson yuragi (Cor)",
    hotspots: [
      { id: "aorta", nameUz: "Aorta yoyi", nameLat: "Arcus aortae", x: 52, y: 18 },
      { id: "pulmonary_trunk", nameUz: "O'pka poyasi", nameLat: "Truncus pulmonalis", x: 68, y: 32 },
      { id: "right_atrium", nameUz: "O'ng bo'lmacha", nameLat: "Atrium dextrum", x: 74, y: 50 },
      { id: "left_atrium", nameUz: "Chap bo'lmacha", nameLat: "Atrium sinistrum", x: 30, y: 46 },
      { id: "right_ventricle", nameUz: "O'ng qorincha", nameLat: "Ventriculus dexter", x: 62, y: 68 },
      { id: "left_ventricle", nameUz: "Chap qorincha", nameLat: "Ventriculus sinister", x: 36, y: 76 }
    ],
    realImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <defs>
        <radialGradient id="muscleGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stop-color="%23ef4444"/>
          <stop offset="50%" stop-color="%23b91c1c"/>
          <stop offset="85%" stop-color="%237f1d1d"/>
          <stop offset="100%" stop-color="%23450a0a"/>
        </radialGradient>
        <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23f87171"/>
          <stop offset="50%" stop-color="%23dc2626"/>
          <stop offset="100%" stop-color="%23991b1b"/>
        </linearGradient>
        <linearGradient id="veinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%2360a5fa"/>
          <stop offset="50%" stop-color="%232563eb"/>
          <stop offset="100%" stop-color="%231e40af"/>
        </linearGradient>
        <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="%23450a0a" flood-opacity="0.8"/>
        </filter>
      </defs>

      <g filter="url(%23heartShadow)" id="heartGroup">
        <!-- Superior Vena Cava -->
        <rect x="400" y="80" width="60" height="160" rx="30" fill="url(%23veinGrad)" stroke="%231d4ed8" stroke-width="3"/>
        
        <!-- Pulmonary Trunk & Arteries -->
        <path d="M 330 200 C 370 170, 420 180, 440 220" fill="none" stroke="url(%23veinGrad)" stroke-width="48" stroke-linecap="round"/>
        <path d="M 280 200 C 240 170, 190 180, 170 220" fill="none" stroke="url(%23veinGrad)" stroke-width="44" stroke-linecap="round"/>
        
        <!-- Aorta Arch (Arcus aortae) -->
        <path d="M 310 240 C 310 110, 220 90, 220 180" fill="none" stroke="url(%23aortaGrad)" stroke-width="60" stroke-linecap="round"/>
        <!-- 3 Aortic Branches -->
        <rect x="250" y="60" width="22" height="60" rx="10" fill="url(%23aortaGrad)"/>
        <rect x="280" y="55" width="20" height="65" rx="10" fill="url(%23aortaGrad)"/>
        <rect x="310" y="65" width="18" height="55" rx="9" fill="url(%23aortaGrad)"/>

        <!-- Main Heart Body / Ventricles -->
        <path d="M 300 240 C 440 220, 490 340, 460 440 C 430 540, 320 620, 240 640 C 180 610, 120 480, 150 360 C 170 280, 220 250, 300 240 Z" fill="url(%23muscleGrad)" stroke="%237f1d1d" stroke-width="4"/>
        
        <!-- Coronary Arteries (Yurak toj tomirlari) -->
        <path d="M 310 250 Q 280 360 260 480 Q 250 560 240 640" fill="none" stroke="%23fca5a5" stroke-width="7" stroke-linecap="round"/>
        <path d="M 280 340 Q 240 370 200 400" fill="none" stroke="%23fca5a5" stroke-width="4" stroke-linecap="round"/>
        <path d="M 268 430 Q 300 460 330 480" fill="none" stroke="%23fca5a5" stroke-width="4" stroke-linecap="round"/>
        <path d="M 255 520 Q 230 550 210 570" fill="none" stroke="%23fca5a5" stroke-width="3" stroke-linecap="round"/>
        
        <!-- Cardiac Veins (Toj venalari) -->
        <path d="M 325 270 Q 360 380 380 470" fill="none" stroke="%2360a5fa" stroke-width="5" stroke-linecap="round"/>
        <path d="M 360 370 Q 400 390 430 410" fill="none" stroke="%2360a5fa" stroke-width="3" stroke-linecap="round"/>

        <!-- Apex of heart (Uchi) highlight -->
        <ellipse cx="245" cy="630" rx="35" ry="18" fill="%23ef4444" opacity="0.4"/>
      </g>
    </svg>`,

    xrayImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%23050c18"/>
      <g filter="blur(1px)">
        <!-- Angiography (Tomarlar angiografiyasi) -->
        <path d="M 300 240 C 440 220, 490 340, 460 440 C 430 540, 320 620, 240 640 C 180 610, 120 480, 150 360 C 170 280, 220 250, 300 240 Z" fill="%230a192f" stroke="%2338bdf8" stroke-width="8" opacity="0.8"/>
        <!-- Glowing Coronary Artery tree -->
        <path d="M 310 250 Q 280 360 260 480 Q 250 560 240 640" fill="none" stroke="%2367e8f9" stroke-width="10" stroke-linecap="round"/>
        <path d="M 280 340 Q 240 370 200 400" fill="none" stroke="%2367e8f9" stroke-width="6" stroke-linecap="round"/>
        <path d="M 268 430 Q 300 460 330 480" fill="none" stroke="%2367e8f9" stroke-width="6" stroke-linecap="round"/>
        <text x="300" y="660" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="4">CORONARY ANGIOGRAPHY</text>
      </g>
    </svg>`
  },

  arm_hand: {
    id: "arm_hand",
    name: "Qo'l panjasi va bilak suyaklari (Ossa manus)",
    hotspots: [
      { id: "radius", nameUz: "Bilak suyagi", nameLat: "Radius", x: 38, y: 80 },
      { id: "ulna", nameUz: "Tirsak suyagi", nameLat: "Ulna", x: 62, y: 80 },
      { id: "carpus", nameUz: "Kaft usti (8 ta)", nameLat: "Carpus", x: 50, y: 58 },
      { id: "metacarpus", nameUz: "Kaft suyaklari", nameLat: "Metacarpus", x: 50, y: 44 },
      { id: "phalanges", nameUz: "Falangalar", nameLat: "Phalanges", x: 50, y: 20 }
    ],
    realImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <defs>
        <linearGradient id="handBoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23ffffff"/>
          <stop offset="50%" stop-color="%23f1e7d0"/>
          <stop offset="100%" stop-color="%23c4b595"/>
        </linearGradient>
      </defs>
      <g stroke="%23685435" stroke-width="2" fill="url(%23handBoneGrad)">
        <!-- Radius & Ulna (Forearm) -->
        <rect x="200" y="460" width="36" height="200" rx="12"/>
        <rect x="360" y="460" width="30" height="200" rx="10"/>

        <!-- Carpus (8 bones cluster) -->
        <circle cx="270" cy="420" r="14"/>
        <circle cx="300" cy="420" r="13"/>
        <circle cx="330" cy="420" r="14"/>
        <circle cx="260" cy="390" r="13"/>
        <circle cx="285" cy="390" r="15"/>
        <circle cx="315" cy="390" r="14"/>
        <circle cx="340" cy="390" r="13"/>

        <!-- 5 Metacarpals -->
        <rect x="180" y="320" width="22" height="70" rx="9" transform="rotate(-30 180 320)"/>
        <rect x="250" y="270" width="22" height="95" rx="9"/>
        <rect x="290" y="250" width="24" height="110" rx="9"/>
        <rect x="330" y="265" width="22" height="100" rx="9"/>
        <rect x="370" y="295" width="20" height="85" rx="8"/>

        <!-- Phalanges (Fingers) -->
        <!-- Thumb (2 phalanges) -->
        <rect x="125" y="245" width="20" height="45" rx="8" transform="rotate(-35 125 245)"/>
        <rect x="100" y="200" width="18" height="38" rx="7" transform="rotate(-35 100 200)"/>

        <!-- Index finger (3 phalanges) -->
        <rect x="250" y="210" width="20" height="42" rx="7"/>
        <rect x="250" y="160" width="18" height="38" rx="6"/>
        <rect x="250" y="120" width="16" height="30" rx="5"/>

        <!-- Middle finger (3 phalanges) -->
        <rect x="292" y="190" width="20" height="46" rx="7"/>
        <rect x="292" y="135" width="18" height="42" rx="6"/>
        <rect x="292" y="90" width="16" height="34" rx="5"/>

        <!-- Ring finger (3 phalanges) -->
        <rect x="332" y="205" width="20" height="44" rx="7"/>
        <rect x="332" y="155" width="18" height="38" rx="6"/>
        <rect x="332" y="115" width="16" height="30" rx="5"/>

        <!-- Little finger (3 phalanges) -->
        <rect x="372" y="235" width="18" height="40" rx="6"/>
        <rect x="372" y="190" width="16" height="34" rx="5"/>
        <rect x="372" y="150" width="14" height="28" rx="4"/>
      </g>
    </svg>`,

    xrayImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%23020617"/>
      <!-- Soft tissue outline in blue translucent -->
      <path d="M 180 500 C 130 380, 80 280, 70 200 C 60 160, 100 140, 130 180 L 180 250 L 220 100 C 230 70, 270 70, 280 100 L 280 220 L 310 70 C 320 40, 360 40, 370 70 L 370 220 L 400 90 C 410 60, 450 60, 460 90 L 440 230 L 470 140 C 480 120, 510 130, 500 160 L 470 380 C 450 480, 420 540, 420 540" fill="%230284c7" opacity="0.15" stroke="%2338bdf8" stroke-width="2"/>
      <!-- X-Ray Glowing Bones -->
      <g stroke="%2367e8f9" stroke-width="8" stroke-linecap="round" fill="none">
        <line x1="218" y1="480" x2="218" y2="650"/>
        <line x1="375" y1="480" x2="375" y2="650"/>
        <!-- Metacarpals & Phalanges rays -->
        <line x1="260" y1="270" x2="260" y2="120" stroke-width="10"/>
        <line x1="302" y1="250" x2="302" y2="90" stroke-width="10"/>
        <line x1="342" y1="265" x2="342" y2="115" stroke-width="10"/>
        <line x1="380" y1="295" x2="380" y2="150" stroke-width="9"/>
        <line x1="200" y1="360" x2="110" y2="200" stroke-width="10"/>
      </g>
      <text x="300" y="670" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="4">HAND RADIOGRAPH (AP VIEW)</text>
    </svg>`
  },

  ribcage_lungs: {
    id: "ribcage_lungs",
    name: "Ko'krak qafasi va o'pka (Thorax et Pulmones)",
    hotspots: [
      { id: "trachea", nameUz: "Kengirdak", nameLat: "Trachea", x: 50, y: 16 },
      { id: "lungs_right", nameUz: "O'ng o'pka (3 bo'lak)", nameLat: "Pulmo dexter", x: 28, y: 46 },
      { id: "lungs_left", nameUz: "Chap o'pka (2 bo'lak)", nameLat: "Pulmo sinister", x: 72, y: 46 },
      { id: "sternum", nameUz: "To'sh suyagi", nameLat: "Sternum", x: 50, y: 40 },
      { id: "ribs", nameUz: "Qovurg'alar (12 juft)", nameLat: "Costae", x: 80, y: 62 }
    ],
    realImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <defs>
        <radialGradient id="lungGrad" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stop-color="%23fca5a5"/>
          <stop offset="60%" stop-color="%23f87171"/>
          <stop offset="100%" stop-color="%23dc2626"/>
        </radialGradient>
      </defs>

      <!-- Trachea & Bronchi -->
      <path d="M 300 80 L 300 180 L 230 240 M 300 180 L 370 240" fill="none" stroke="%2393c5fd" stroke-width="20" stroke-linecap="round"/>

      <!-- Right Lung (3 lobes) -->
      <path d="M 280 200 C 260 120, 160 140, 140 220 C 120 300, 110 440, 150 510 C 190 540, 260 520, 275 480 C 285 400, 285 300, 280 200 Z" fill="url(%23lungGrad)" opacity="0.9" stroke="%23b91c1c" stroke-width="2"/>
      
      <!-- Left Lung (2 lobes with cardiac notch) -->
      <path d="M 320 200 C 340 120, 440 140, 460 220 C 480 300, 490 440, 450 510 C 410 540, 365 520, 350 480 C 330 420, 310 320, 320 200 Z" fill="url(%23lungGrad)" opacity="0.9" stroke="%23b91c1c" stroke-width="2"/>

      <!-- Heart Silhouette in middle -->
      <ellipse cx="320" cy="420" rx="60" ry="75" fill="%23991b1b" opacity="0.85"/>

      <!-- Sternum (To'sh) -->
      <path d="M 285 160 L 315 160 L 310 360 L 300 390 L 290 360 Z" fill="%23f8fafc" stroke="%2394a3b8" stroke-width="2"/>

      <!-- 10 Rib curves (Costae) -->
      <g fill="none" stroke="%23f1f5f9" stroke-width="9" stroke-linecap="round" opacity="0.85">
        <path d="M 280 180 Q 200 190 150 240"/>
        <path d="M 320 180 Q 400 190 450 240"/>
        
        <path d="M 280 220 Q 180 240 130 300"/>
        <path d="M 320 220 Q 420 240 470 300"/>

        <path d="M 280 260 Q 160 290 120 370"/>
        <path d="M 320 260 Q 440 290 480 370"/>

        <path d="M 285 300 Q 150 340 125 430"/>
        <path d="M 315 300 Q 450 340 475 430"/>

        <path d="M 290 340 Q 170 390 145 490"/>
        <path d="M 310 340 Q 430 390 455 490"/>
      </g>
    </svg>`,

    xrayImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%23020617"/>
      <!-- Radiographic Lung fields (dark radiolucent air) -->
      <ellipse cx="200" cy="350" rx="80" ry="160" fill="%23050c18" stroke="%2338bdf8" stroke-width="4"/>
      <ellipse cx="400" cy="350" rx="75" ry="155" fill="%23050c18" stroke="%2338bdf8" stroke-width="4"/>
      <!-- Mediastinum & Cardiac Shadow (Radio-opaque white) -->
      <ellipse cx="330" cy="400" rx="75" ry="95" fill="%23e0f2fe" opacity="0.8"/>
      <!-- Ribs X-ray white stripes -->
      <g fill="none" stroke="%23e2e8f0" stroke-width="8" opacity="0.75">
        <path d="M 280 180 Q 200 190 150 240"/>
        <path d="M 320 180 Q 400 190 450 240"/>
        <path d="M 280 240 Q 180 260 130 320"/>
        <path d="M 320 240 Q 420 260 470 320"/>
        <path d="M 280 300 Q 160 330 120 400"/>
        <path d="M 320 300 Q 440 330 480 400"/>
      </g>
      <text x="300" y="670" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="4">CHEST RADIOGRAPH (PA CHEST X-RAY)</text>
    </svg>`
  },

  spine: {
    id: "spine",
    name: "Umurtqa pog'onasi (Columna vertebralis)",
    hotspots: [
      { id: "cervical", nameUz: "Bo'yin (C1-C7)", nameLat: "Vertebrae cervicales", x: 50, y: 18 },
      { id: "thoracic", nameUz: "Ko'krak (Th1-Th12)", nameLat: "Vertebrae thoracicae", x: 50, y: 42 },
      { id: "lumbar", nameUz: "Bel (L1-L5)", nameLat: "Vertebrae lumbales", x: 50, y: 68 },
      { id: "sacrum", nameUz: "Dumg'aza", nameLat: "Os sacrum", x: 50, y: 84 },
      { id: "coccyx", nameUz: "Dum suyagi", nameLat: "Os coccygis", x: 50, y: 94 }
    ],
    realImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <defs>
        <linearGradient id="vertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23fdfbf7"/>
          <stop offset="70%" stop-color="%23f1e7d0"/>
          <stop offset="100%" stop-color="%23c4b595"/>
        </linearGradient>
      </defs>

      <!-- Spinal Cord (Yellow neural pathway in center) -->
      <path d="M 300 60 Q 285 220 300 380 Q 315 500 300 640" fill="none" stroke="%23facc15" stroke-width="8" stroke-linecap="round"/>

      <!-- Stack of Realistic Vertebrae Bodies with Intervertebral Discs -->
      <g stroke="%2378613f" stroke-width="2" fill="url(%23vertGrad)">
        <!-- 7 Cervical Vertebrae -->
        <rect x="260" y="70" width="80" height="15" rx="4"/>
        <rect x="258" y="90" width="84" height="15" rx="4"/>
        <rect x="256" y="110" width="88" height="16" rx="4"/>
        <rect x="254" y="132" width="92" height="16" rx="4"/>
        <rect x="252" y="154" width="96" height="17" rx="4"/>

        <!-- 12 Thoracic Vertebrae -->
        <rect x="245" y="180" width="110" height="18" rx="5"/>
        <rect x="243" y="205" width="114" height="19" rx="5"/>
        <rect x="241" y="232" width="118" height="20" rx="5"/>
        <rect x="239" y="260" width="122" height="21" rx="5"/>
        <rect x="237" y="290" width="126" height="22" rx="5"/>
        <rect x="235" y="320" width="130" height="23" rx="5"/>
        <rect x="233" y="352" width="134" height="24" rx="5"/>

        <!-- 5 Lumbar Vertebrae (Massive) -->
        <rect x="225" y="390" width="150" height="28" rx="6"/>
        <rect x="222" y="428" width="156" height="30" rx="6"/>
        <rect x="219" y="468" width="162" height="32" rx="6"/>
        <rect x="216" y="510" width="168" height="34" rx="6"/>
        <rect x="213" y="555" width="174" height="36" rx="6"/>

        <!-- Sacrum & Coccyx -->
        <path d="M 210 600 L 390 600 L 330 670 L 300 690 L 270 670 Z" fill="url(%23vertGrad)"/>
      </g>
    </svg>`,

    xrayImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%23020617"/>
      <!-- MRI Lumbar Spine Sagittal View -->
      <path d="M 300 60 Q 285 220 300 380 Q 315 500 300 640" fill="none" stroke="%2338bdf8" stroke-width="14" opacity="0.6"/>
      <g fill="%23f1f5f9" stroke="%2367e8f9" stroke-width="3" opacity="0.85">
        <rect x="240" y="390" width="120" height="28" rx="5"/>
        <rect x="235" y="430" width="130" height="30" rx="5"/>
        <rect x="230" y="472" width="140" height="32" rx="5"/>
        <rect x="225" y="518" width="150" height="34" rx="5"/>
        <rect x="220" y="565" width="160" height="36" rx="5"/>
      </g>
      <text x="300" y="670" fill="%2338bdf8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="4">SPINAL MRI (SAGITTAL T2 VIEW)</text>
    </svg>`
  }
};
