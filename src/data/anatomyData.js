export const ANATOMY_DATA = {
  skull: {
    id: "skull",
    nameUz: "Bosh suyagi",
    nameLat: "Cranium",
    nameEn: "Human Skull",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet",
    bonesCount: 22,
    weight: "~1000 - 1200 g",
    description: "Bosh suyagi (Cranium) inson bosh skeleti bo'lib, miya va sezgi a'zolarini (ko'rish, eshitish, hid bilish, ta'm bilish) tashqi shikastlanishlardan himoya qiladi hamda ovqat hazm qilish va nafas olish a'zolarining boshlang'ich qismlariga suyak poydevori vazifasini bajaradi.",
    parts: [
      {
        id: "frontal",
        nameUz: "Peshona suyagi",
        nameLat: "Os frontale",
        desc: "Kalla gumbazining oldingi qismini va ko'z kosasining yuqori devorini hosil qiluvchi toq suyak."
      },
      {
        id: "parietal",
        nameUz: "Tepa suyagi",
        nameLat: "Os parietale",
        desc: "Kalla suyagining yon va yuqori devorlarini tashkil qiluvchi juft suyak."
      },
      {
        id: "occipital",
        nameUz: "Ensa suyagi",
        nameLat: "Os occipitale",
        desc: "Kallaning orqa pastki qismida joylashgan toq suyak. Katta ensa teshigi (foramen magnum) orqali bosh miya orqa miya bilan tutashadi."
      },
      {
        id: "temporal",
        nameUz: "Chakka suyagi",
        nameLat: "Os temporale",
        desc: "Eshitish va muvozanat a'zolarini o'z ichiga olgan, kalla asosining murakkab juft suyagi."
      },
      {
        id: "mandible",
        nameUz: "Pastki jag' suyagi",
        nameLat: "Mandibula",
        desc: "Bosh suyagining yagona harakatchan suyagi bo'lib, chakka-pastki jag' bo'g'imi (articulatio temporomandibularis) orqali chakka suyagi bilan birikadi."
      },
      {
        id: "maxilla",
        nameUz: "Yuqori jag' suyagi",
        nameLat: "Maxilla",
        desc: "Yuz skeletining markaziy qismida joylashgan, yuqori tish katakchalarini o'z ichiga olgan juft suyak."
      }
    ],
    functions: [
      "Bosh miyani mexanik zarbalardan himoya qilish",
      "Ko'rish, eshitish, muvozanat, hid va ta'm bilish a'zolari uchun suyak qutisi bo'lish",
      "Chaynov va mimika mushaklarining birikish asosi",
      "Nafas va ovqat hazm qilish yo'llari kirish qismlarini shakllantirish"
    ],
    clinical: [
      "Kalla asosi sinishlari (Fractura basis cranii) - ko'pincha miya chayqalishi va qon ketish bilan kechuvchi xavfli jarohat.",
      "Kranial choklarning erta bitishi (Kraniosinostoz) - chaqaloqlarda kalla shakli va miya rivojlanishiga ta'sir qiladi.",
      "Sinusitlar - gaymor (yuqori jag') va peshona bo'shliqlarining yallig'lanishi."
    ],
    quiz: [
      {
        question: "Bosh suyagidagi yagona erkin harakatlanuvchi suyak qaysi?",
        options: ["Maxilla (Yuqori jag')", "Mandibula (Pastki jag')", "Os frontale (Peshona)", "Os temporale (Chakka)"],
        answerIndex: 1,
        explanation: "Mandibula (pastki jag') bosh suyagidagi yagona erkin harakatlanuvchi suyak bo'lib, chakka suyagi bilan bo'g'im hosil qiladi."
      },
      {
        question: "Bosh miya orqa miya bilan qaysi teshik orqali tutashadi?",
        options: ["Foramen magnum", "Foramen ovale", "Foramen jugulare", "Canalis caroticus"],
        answerIndex: 0,
        explanation: "Ensa suyagidagi katta teshik (Foramen magnum) orqali miya poyasi orqa miya bilan davom etadi."
      },
      {
        question: "Bosh suyagi jami nechta suyakdan iborat (eshitish suyakchalarisiz)?",
        options: ["18 ta", "22 ta", "30 ta", "12 ta"],
        answerIndex: 1,
        explanation: "Bosh suyagi 22 ta suyakdan iborat: 8 tasi kalla qutisi (miya bo'limi), 14 tasi yuz bo'limiga tegishli."
      }
    ]
  },

  heart: {
    id: "heart",
    nameUz: "Inson yuragi",
    nameLat: "Cor",
    nameEn: "Human Heart",
    system: "Yurak-qon tomir tizimi (Systema cardiovasculare)",
    category: "Qon aylanish markazi",
    bonesCount: 0,
    weight: "~250 - 350 g",
    description: "Yurak (Cor) - ko'krak qafasining o'rta ko'ks oralig'ida joylashgan konus shaklidagi ichi kovak mushak a'zosi bo'lib, qonni butun tana a'zo va to'qimalariga uzluksiz haydab beruvchi tirik nasos vazifasini bajaradi.",
    parts: [
      {
        id: "left_ventricle",
        nameUz: "Chap qorincha",
        nameLat: "Ventriculus sinister",
        desc: "Yurakning eng qalin devorli kamerasi. Kislorodga boy qonni aorta orqali katta qon aylanish doirasiga haydaydi."
      },
      {
        id: "right_ventricle",
        nameUz: "O'ng qorincha",
        nameLat: "Ventriculus dexter",
        desc: "Venoz qonni o'pka poyasi (truncus pulmonalis) orqali kichik qon aylanish doirasiga (o'pkalarga) yo'naltiradi."
      },
      {
        id: "left_atrium",
        nameUz: "Chap bo'lmacha",
        nameLat: "Atrium sinistrum",
        desc: "O'pkalardan kislorod bilan to'yingan arterial qonni 4 ta o'pka venasi orqali qabul qiladi."
      },
      {
        id: "right_atrium",
        nameUz: "O'ng bo'lmacha",
        nameLat: "Atrium dextrum",
        desc: "Yuqori va pastki kovak venalardan kislorodga kambag'al qonni qabul qiladi."
      },
      {
        id: "aorta",
        nameUz: "Aorta qon tomiri",
        nameLat: "Aorta",
        desc: "Inson organizmidagi eng yirik arterial qon tomir. Chap qorinchadan boshlanadi."
      },
      {
        id: "pulmonary_trunk",
        nameUz: "O'pka poyasi / arteriyasi",
        nameLat: "Truncus pulmonalis",
        desc: "O'ng qorinchadan chiqib, o'ng va chap o'pka arteriyalariga bo'linadi va venoz qonni o'pkaga tashiydi."
      }
    ],
    functions: [
      "Qonni organizm bo'ylab uzluksiz sirkulyatsiyasini ta'minlash",
      "Hujayralarni kislorod va oziq moddalar bilan ta'minlash",
      "Moddalar almashinuvi qoldiqlarini va karbonat angidridni chiqarish a'zolariga yetkazish",
      "Gormonlar va immunitet omillarini tana bo'ylab tarqatish"
    ],
    clinical: [
      "Miokard infarkti (Ishemic heart disease) - toj (koronar) tomirlarning to'silib qolishi natijasida yurak mushagining nekrozi.",
      "Yurak yetishmovchiligi - qon haydash faoliyatining zaiflashishi.",
      "Aritmiyalar - yurak o'tkazuvchi tizimidagi buzilishlar tufayli ritmning o'zgarishi."
    ],
    quiz: [
      {
        question: "Katta qon aylanish doirasi qayerdan boshlanadi?",
        options: ["O'ng qorinchadan", "Chap qorinchadan (Aorta orqali)", "Chap bo'lmachadan", "O'ng bo'lmachadan"],
        answerIndex: 1,
        explanation: "Katta qon aylanish doirasi chap qorinchadan (aorta orqali) boshlanadi va butun tanani qon bilan ta'minlaydi."
      },
      {
        question: "Yurakning eng baquvvat va qalin devorli kamerasi qaysi?",
        options: ["O'ng bo'lmacha", "O'ng qorincha", "Chap qorincha", "Chap bo'lmacha"],
        answerIndex: 2,
        explanation: "Chap qorincha devori butun tanaga yuqori bosim bilan qon haydashi kerakligi sababli o'ng qorinchadan taxminan 3 baravar qalinroqdir."
      },
      {
        question: "Qonni o'pkalarga tozalanish uchun qaysi tomir tashiydi?",
        options: ["Aorta", "Truncus pulmonalis (O'pka poyasi)", "Vena cava superior", "Arteria carotis"],
        answerIndex: 1,
        explanation: "O'pka poyasi (Truncus pulmonalis) o'ng qorinchadan venoz qonni o'pkalarga olib boradi."
      }
    ]
  },

  arm_hand: {
    id: "arm_hand",
    nameUz: "Qo'l panjasi va bilak suyaklari",
    nameLat: "Ossa membri superioris",
    nameEn: "Hand & Forearm Bones",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Erkin yuqori qism skeleti",
    bonesCount: 30,
    weight: "~600 - 800 g",
    description: "Yuqori erkin qo'l skeleti inson mehnat faoliyati va nozik harakatlarni bajarishga moslashgan bo'lib, bilak (radius, ulna) va qo'l panjasi (kaft usti, kaft va barmoq falangalari) suyaklaridan tashkil topgan.",
    parts: [
      {
        id: "radius",
        nameUz: "Bilak suyagi (Nursimon)",
        nameLat: "Radius",
        desc: "Bilakning bosh barmoq tomonida joylashgan suyak. Supinatsiya va pronatsiya (aylanma) harakatlarida asosiy o'rin tutadi."
      },
      {
        id: "ulna",
        nameUz: "Tirsak suyagi",
        nameLat: "Ulna",
        desc: "Bilakning jimjiloq tomonida joylashgan suyak bo'lib, yuqori qismi tirsak o'sig'i (olecranon) bilan tugaydi."
      },
      {
        id: "carpus",
        nameUz: "Kaft usti suyaklari (8 ta)",
        nameLat: "Ossa carpi",
        desc: "Ikki qatorda joylashgan 8 ta g'ovak suyakcha: qayiqsimon, oysimon, uchburchak, no'xatsimon, trapetsiya, trapetsiyasimon, boshchali va ilmoqli suyaklar."
      },
      {
        id: "metacarpus",
        nameUz: "Kaft suyaklari (5 ta)",
        nameLat: "Ossa metacarpi",
        desc: "Kaft sohasini hosil qiluvchi 5 ta kalta naysimon suyak."
      },
      {
        id: "phalanges",
        nameUz: "Barmoq falangalari (14 ta)",
        nameLat: "Phalanges digitorum manus",
        desc: "Bosh barmoqda 2 ta (proksimal, distal), qolgan 4 barmoqda 3 tadan (proksimal, o'rta, distal) falanga suyaklari bor."
      }
    ],
    functions: [
      "Nozik va murakkab motorik harakatlarni (yozish, asboblarni ushlash) bajarish",
      "Ob'ektlarni ushlash va ushlab turish",
      "Sezgi (taktil sezish) organi sifatida atrof-muhitni o'rganish"
    ],
    clinical: [
      "Kolle sinishi (Fractura Colles) - bilak suyagi pastki uchining odatiy joyda sinishi (yiqilganda qo'lga tayanish oqibatida).",
      "Karpal kanal sindromi (Karpal tunnel sindromi) - o'rta nervning (nervus medianus) kaft usti boylami ostida qisilib qolishi.",
      "Falanga sinishlari va bo'g'im chiqishlari - sport va mehnat jarohatlari."
    ],
    quiz: [
      {
        question: "Qo'l kaft usti (carpus) nechta suyakdan tashkil topgan?",
        options: ["5 ta", "8 ta", "10 ta", "14 ta"],
        answerIndex: 1,
        explanation: "Kaft usti (carpus) 2 qatorda joylashgan 8 ta mayda suyakdan iborat."
      },
      {
        question: "Inson bosh barmog'ida nechta falanga suyagi bor?",
        options: ["1 ta", "2 ta", "3 ta", "4 ta"],
        answerIndex: 1,
        explanation: "Bosh barmoqda 2 ta falanga (proksimal va distal), qolgan 4 ta barmoqda esa 3 tadan falanga mavjud."
      },
      {
        question: "Qo'lni tashqariga va ichkariga burish (pronatsiya va supinatsiya) asosan qaysi suyak hisobiga amalga oshadi?",
        options: ["Radius (Bilak suyagi)", "Ulna (Tirsak suyagi)", "Clavicula (O'mrov)", "Scapula (Kurak)"],
        answerIndex: 0,
        explanation: "Radius suyagi tirsak suyagi atrofida aylanib, qo'lning aylanma harakatlarini ta'minlaydi."
      }
    ]
  },

  ribcage_lungs: {
    id: "ribcage_lungs",
    nameUz: "Ko'krak qafasi va o'pka",
    nameLat: "Thorax et Pulmones",
    nameEn: "Thorax & Lungs",
    system: "Nafas va himoya tizimi (Systema respiratorium)",
    category: "Gavda skeleti va ichki a'zolar",
    bonesCount: 25,
    weight: "~1000 - 1500 g",
    description: "Ko'krak qafasi (Thorax) 12 juft qovurg'a, to'sh suyagi va ko'krak umurtqalaridan iborat suyak-tog'ay karkas bo'lib, ichida joylashgan o'pkalar va yurakni himoya qiladi hamda nafas harakatlarini ta'minlaydi.",
    parts: [
      {
        id: "sternum",
        nameUz: "To'sh suyagi",
        nameLat: "Sternum",
        desc: "Ko'krak qafasining oldingi devorida joylashgan yassi suyak: dasta (manubrium), tana (corpus) va xanjarsimon o'siq (processus xiphoideus)."
      },
      {
        id: "ribs",
        nameUz: "Qovurg'alar (12 juft)",
        nameLat: "Costae",
        desc: "7 juft chin qovurg'a (to'g'ridan-to'g'ri to'shga tutashadi), 3 juft soxta qovurg'a va 2 juft tebranuvchi qovurg'a (oldingi uchi erkin)."
      },
      {
        id: "lungs_right",
        nameUz: "O'ng o'pka (3 bo'lakli)",
        nameLat: "Pulmo dexter",
        desc: "Yuqori, o'rta va pastki bo'laklardan iborat bo'lib, chap o'pkaga qaraganda kattaroq va kengroq."
      },
      {
        id: "lungs_left",
        nameUz: "Chap o'pka (2 bo'lakli)",
        nameLat: "Pulmo sinister",
        desc: "Yurak joylashishi sababli yurak o'ymasiga ega bo'lib, faqat 2 bo'lakdan (yuqori va pastki) iborat."
      },
      {
        id: "trachea",
        nameUz: "Kengirdak va bronxlar",
        nameLat: "Trachea et bronchi",
        desc: "Havo o'tkazuvchi tog'ay naylar bo'lib, o'pka to'qimalariga shoxlanib bronxial daraxt hosil qiladi."
      }
    ],
    functions: [
      "Gazlar almashinuvi: kislorodni qonga singdirish va karbonat angidridni chiqarish",
      "Yurak va yirik qon tomirlarini mexanik shikastlanishdan asrash",
      "Nafas olishda ko'krak qafasi hajmini o'zgartirish (ekskursiya)"
    ],
    clinical: [
      "Pnevmotoraks - plevra bo'shlig'iga havo yig'ilishi oqibatida o'pkaning siqilishi.",
      "Qovurg'a sinishlari - ko'krak qafasining o'tkir travmalari.",
      "Pnevmoniya - o'pka to'qimasining yuqumli yallig'lanishi."
    ],
    quiz: [
      {
        question: "Inson ko'krak qafasida nechta chin qovurg'a (Costae verae) bor?",
        options: ["5 juft", "7 juft", "10 juft", "12 juft"],
        answerIndex: 1,
        explanation: "1-7-juft qovurg'alar to'sh suyagiga o'z tog'aylari bilan bevosita tutashgani uchun chin qovurg'alar deb ataladi."
      },
      {
        question: "Chap o'pka nechta bo'lakdan (lobi) tashkil topgan?",
        options: ["1 ta", "2 ta", "3 ta", "4 ta"],
        answerIndex: 1,
        explanation: "Chap o'pka yurak o'ymasi sababli 2 ta bo'lakdan (yuqori va pastki), o'ng o'pka esa 3 ta bo'lakdan iborat."
      },
      {
        question: "Nafas olishdagi asosiy nafas mushagi qaysi?",
        options: ["Diafragma (Diaphragma)", "Qovurg'alararo tashqi mushaklar", "To'sh-o'mrov-so'rg'ichsimon mushak", "Qorin to'g'ri mushagi"],
        answerIndex: 0,
        explanation: "Diafragma nafas olishdagi eng asosiy mushak bo'lib, nafas olish hajmining 70-80% ini ta'minlaydi."
      }
    ]
  },

  spine: {
    id: "spine",
    nameUz: "Umurtqa pog'onasi",
    nameLat: "Columna vertebralis",
    nameEn: "Vertebral Column",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet o'qi",
    bonesCount: "32-34",
    weight: "~1800 - 2000 g",
    description: "Umurtqa pog'onasi inson tanasining tayanch o'qi bo'lib, bosh suyagini tutib turadi, orqa miyani himoya qiladi va tananing barcha harakatlarida (egilish, burilish, amortizatsiya) ishtirok etadi.",
    parts: [
      {
        id: "cervical",
        nameUz: "Bo'yin umurtqalari (7 ta)",
        nameLat: "Vertebrae cervicales (C1-C7)",
        desc: "C1 (Atlant) va C2 (Aksis) kalla suyagini tutib va aylantirib beruvchi maxsus tuzilishga ega."
      },
      {
        id: "thoracic",
        nameUz: "Ko'krak umurtqalari (12 ta)",
        nameLat: "Vertebrae thoracicae (Th1-Th12)",
        desc: "Qovurg'alar bilan tutashuvchi bo'g'im yuzalariga ega."
      },
      {
        id: "lumbar",
        nameUz: "Bel umurtqalari (5 ta)",
        nameLat: "Vertebrae lumbales (L1-L5)",
        desc: "Eng yirik va massiv umurtqalar bo'lib, tana og'irligining asosiy qismini ko'taradi."
      },
      {
        id: "sacrum",
        nameUz: "Dumg'aza suyagi (5 ta birlashgan)",
        nameLat: "Os sacrum (S1-S5)",
        desc: "Chanoq suyaklari bilan birikib chanoq halqasini hosil qiladi."
      },
      {
        id: "coccyx",
        nameUz: "Dum suyagi (3-5 ta)",
        nameLat: "Os coccygis",
        desc: "Umurtqaning reduktsiyalangan pastki qismi."
      }
    ],
    functions: [
      "Inson tanasining vertikal o'qi va asosiy tayanchi",
      "Orqa miya (Medulla spinalis) uchun mustahkam suyak kanali",
      "Yurish, yugurish va sakrashda zarbalarni yumshatish (amortizatsiya)"
    ],
    clinical: [
      "Skolioz - umurtqa pog'onasining yon tomonga egrilanishi.",
      "Umurtqalararo disk churrasi (Gryja) - nerv ildizlarining qisilishi va qattiq og'riq.",
      "Osteoxondroz - disklar va suyak to'qimasining degenerativ o'zgarishlari."
    ],
    quiz: [
      {
        question: "Inson bo'yin bo'limida nechta umurtqa bor?",
        options: ["5 ta", "7 ta", "8 ta", "12 ta"],
        answerIndex: 1,
        explanation: "Barcha sutemizuvchilarda (shu jumladan insonda ham) 7 ta bo'yin umurtqasi (C1-C7) bo'ladi."
      },
      {
        question: "Birinchi bo'yin umurtqasining (C1) anatomik nomi nima?",
        options: ["Atlant (Atlas)", "Aksis (Axis)", "Prominens", "Coccyx"],
        answerIndex: 0,
        explanation: "C1 umurtqasi Atlant (Atlas) deb nomlanadi va kalla suyagining ensa suyagi bilan bevosita bo'g'im hosil qiladi."
      },
      {
        question: "Eng massiv va yirik tana og'irligini ko'taruvchi umurtqalar qaysi sohada?",
        options: ["Bo'yin", "Ko'krak", "Bel (Lumbales)", "Dum"],
        answerIndex: 2,
        explanation: "Bel umurtqalari (L1-L5) tananing asosiy vertikal og'irligini ko'targani sababli eng yirik va baquvvat tanaga ega."
      }
    ]
  }
};
