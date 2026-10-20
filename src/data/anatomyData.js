export const ANATOMY_DATA = {
  skull: {
    id: "skull",
    nameUz: "Bosh suyagi (Real 3D skan)",
    nameLat: "Cranium",
    nameEn: "Human Skull 3D",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet",
    bonesCount: 22,
    weight: "~1000 - 1200 g",
    description: "Bosh suyagi inson bosh skeleti bo'lib, miya va sezgi a'zolarini (ko'rish, eshitish, hid bilish, ta'm bilish) tashqi shikastlanishlardan himoya qiladi. Haqiqiy inson kalla suyagining yuqori aniqlikdagi 3D modeli.",
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
        id: "temporal",
        nameUz: "Chakka suyagi",
        nameLat: "Os temporale",
        desc: "Eshitish va muvozanat a'zolarini o'z ichiga olgan kalla suyagi."
      },
      {
        id: "mandible",
        nameUz: "Pastki jag' suyagi",
        nameLat: "Mandibula",
        desc: "Bosh suyagining yagona harakatchan suyagi; chaynash faoliyatini ta'minlaydi."
      }
    ],
    functions: [
      "Bosh miyani mexanik zarbalardan himoya qilish",
      "Ko'rish, eshitish va hid bilish a'zolari uchun mustahkam suyak qutisi bo'lish",
      "Chaynov va mimika mushaklarining tayanchi"
    ],
    clinical: [
      "Kalla asosi sinishlari (Fractura basis cranii) - og'ir kranial travmalar.",
      "Chakka-pastki jag' bo'g'imi disfunksiyasi - chaynashda og'riq va qisirlash.",
      "Kraniosinostoz - chaqaloqlarda suyak choklarining erta bitishi."
    ],
    quiz: [
      {
        question: "Bosh suyagidagi yagona erkin harakatlanuvchi suyak qaysi?",
        options: ["Maxilla", "Mandibula (Pastki jag')", "Os frontale", "Os temporale"],
        answerIndex: 1,
        explanation: "Mandibula (pastki jag') bosh suyagidagi yagona erkin harakatlanuvchi suyakdir."
      },
      {
        question: "Bosh suyagi jami nechta suyakdan iborat (eshitish suyakchalarisiz)?",
        options: ["18 ta", "22 ta", "30 ta", "12 ta"],
        answerIndex: 1,
        explanation: "Bosh suyagi 22 ta suyakdan (8 ta miya bo'limi, 14 ta yuz bo'limi) iborat."
      },
      {
        question: "Bosh miya orqa miya bilan qaysi teshik orqali tutashadi?",
        options: ["Foramen magnum", "Foramen ovale", "Foramen jugulare", "Canalis caroticus"],
        answerIndex: 0,
        explanation: "Ensa suyagidagi katta teshik (Foramen magnum) orqali bosh miya orqa miya bilan davom etadi."
      }
    ]
  },

  brain: {
    id: "brain",
    nameUz: "Bosh miya (Real 3D model)",
    nameLat: "Encephalon",
    nameEn: "Human Brain 3D Anatomy",
    system: "Markaziy asab tizimi (Systema nervosum centrale)",
    category: "Miya bo'limlari",
    bonesCount: 0,
    weight: "~1350 - 1450 g",
    description: "Inson bosh miyasining yuqori aniqlikdagi anatomik 3D modeli: yarimsharlar po'stlog'i, egatlar va burmalar, miyacha, miya poyasi va asab yo'llari.",
    parts: [
      {
        id: "cerebrum",
        nameUz: "Katta yarimsharlar po'stlog'i",
        nameLat: "Cortex cerebri",
        desc: "Oliy asab faoliyati, tafakkur, xotira, ongli harakatlar va nutq markazi."
      },
      {
        id: "cerebellum",
        nameUz: "Miyacha (Kichik miya)",
        nameLat: "Cerebellum",
        desc: "Harakatlar koordinatsiyasi, muvozanat va mushak tonusini boshqaradi."
      },
      {
        id: "brainstem",
        nameUz: "Miya poyasi",
        nameLat: "Truncus encephali",
        desc: "Nafas olish va yurak-qon tomir faoliyati kabi hayotiy reflekslar markazi."
      },
      {
        id: "lobes",
        nameUz: "Peshona, chakka, tepa va ensa bo'laklari",
        nameLat: "Lobi cerebri",
        desc: "Ko'rish, eshitish, taktil sezish va irodaviy harakat zonalari."
      }
    ],
    functions: [
      "Ong, tafakkur, mantiq va xotirani boshqarish",
      "Ichki a'zolar va gormonal tizim faoliyatini nazorat qilish",
      "Tana muvozanati va murakkab motor harakatlarni muvofiqlashtirish"
    ],
    clinical: [
      "Insult - miya qon aylanishining o'tkir buzilishi va to'qima ishemiyasi.",
      "Miyacha ataksiyasi - harakat koordinatsiyasi va muvozanatning yo'qolishi.",
      "Epilepsiya - miya po'stlog'idagi patologik neyronal qo'zg'alishlar."
    ],
    quiz: [
      {
        question: "Harakatlar koordinatsiyasi va tana muvozanati uchun miyaning qaysi bo'limi javobgar?",
        options: ["Peshona bo'lagi", "Miyacha (Cerebellum)", "Gipotalamus", "Ko'rish do'mbog'i"],
        answerIndex: 1,
        explanation: "Miyacha (Cerebellum) nozik motor harakatlar va muvozanatni ta'minlaydi."
      },
      {
        question: "Nafas olish va yurak urishi kabi hayotiy markazlar qayerda joylashgan?",
        options: ["Uzunchoq miyada (Medulla oblongata)", "Gipofizda", "Ensa bo'lagida", "Qadoqsimon tanada"],
        answerIndex: 0,
        explanation: "Uzunchoq miya va miya poyasida hayotiy muhim reflektor markazlar joylashgan."
      },
      {
        question: "Ko'rish analizatorining oliy po'stloq markazi miyaning qaysi bo'lagida?",
        options: ["Peshona", "Chakka", "Ensa (Lobus occipitalis)", "Tepa"],
        answerIndex: 2,
        explanation: "Ko'rish markazi ensa bo'lagi (Lobus occipitalis) po'stlog'ida joylashgan."
      }
    ]
  },

  heart: {
    id: "heart",
    nameUz: "Inson yuragi (Real 3D kardiologiya)",
    nameLat: "Cor",
    nameEn: "Human Heart 3D Model",
    system: "Yurak-qon tomir tizimi",
    category: "Qon aylanish markazi",
    bonesCount: 0,
    weight: "~280 - 340 g",
    description: "Inson yuragining haqiqiy 3D anatomik modeli: qorinchalar, bo'lmachalar, aorta yoyi, o'pka arteriyasi, kovak venalar va toj (koronar) qon-tomirlar tarmog'i.",
    parts: [
      {
        id: "aorta",
        nameUz: "Aorta yoyi",
        nameLat: "Arcus aortae",
        desc: "Chap qorinchadan chiqib, butun tanaga arterial qon tarqatuvchi eng yirik magistral tomir."
      },
      {
        id: "left_ventricle",
        nameUz: "Chap qorincha",
        nameLat: "Ventriculus sinister",
        desc: "Yurakning eng baquvvat, qalin devorli qismi bo'lib, katta qon aylanish doirasini ta'minlaydi."
      },
      {
        id: "right_ventricle",
        nameUz: "O'ng qorincha",
        nameLat: "Ventriculus dexter",
        desc: "Venoz qonni o'pkalarga tozalanish uchun haydaydi."
      },
      {
        id: "coronary",
        nameUz: "Toj (Koronar) arteriyalari",
        nameLat: "Arteriae coronariae",
        desc: "Yurak mushagini oziqlantiruvchi o'ng va chap toj tomirlar."
      }
    ],
    functions: [
      "Qonni organizm bo'ylab uzluksiz sirkulyatsiyasini ta'minlash",
      "Organ va to'qimalarni kislorod bilan to'yintirish",
      "Moddalar almashinuv mahsulotlarini chiqarish a'zolariga yetkazish"
    ],
    clinical: [
      "Miokard infarkti - koronar arteriyalar trombozi oqibatida yurak mushagining nekrozi.",
      "Aritmiyalar - yurak o'tkazuvchanlik tizimidagi buzilishlar tufayli ritmning o'zgarishi.",
      "Yurak yetishmovchiligi - qon haydash faoliyatining susayishi."
    ],
    quiz: [
      {
        question: "Aorta qon tomiri yurakning qaysi kamerasidan boshlanadi?",
        options: ["O'ng qorinchadan", "Chap qorinchadan", "Chap bo'lmachadan", "O'ng bo'lmachadan"],
        answerIndex: 1,
        explanation: "Aorta chap qorinchadan boshlanadi va kislorodga boy qonni butun tanaga tarqatadi."
      },
      {
        question: "Yurakning eng qalin va baquvvat devorga ega kamerasi qaysi?",
        options: ["Chap qorincha", "O'ng qorincha", "Chap bo'lmacha", "O'ng bo'lmacha"],
        answerIndex: 0,
        explanation: "Chap qorincha devori butun tanaga yuqori bosim ostida qon haydashi sababli o'ng qorinchadan 3 baravar qalinroqdir."
      },
      {
        question: "Yurak mushagining o'zini qon bilan ta'minlovchi tomirlar nima deyiladi?",
        options: ["Kovak venalar", "Toj (Koronar) arteriyalari", "Uyqu arteriyalari", "O'mrov osti arteriyalari"],
        answerIndex: 1,
        explanation: "Toj (koronar) arteriyalari aorta asosidan boshlanib, miokardni bevosita qon bilan ta'minlaydi."
      }
    ]
  },

  eye: {
    id: "eye",
    nameUz: "Ko'z olmasi (Real 3D oftalmologiya)",
    nameLat: "Oculus / Bulbus oculi",
    nameEn: "Human Eye 3D Anatomy",
    system: "Sezgi a'zolari (Organa sensuum)",
    category: "Ko'rish a'zosi",
    bonesCount: 0,
    weight: "~7.5 g",
    description: "Inson ko'z olmasining yuqori aniqlikdagi 3D modeli: shox parda (cornea), oq parda (sclera), kamalak parda (iris), qorachiq, ko'z gavhari (lens), to'r parda (retina) va ko'rish nervi (N. opticus).",
    parts: [
      {
        id: "cornea",
        nameUz: "Shox parda",
        nameLat: "Cornea",
        desc: "Ko'zning oldingi shaffof qismi bo'lib, yorug'lik nurlarini asosiy sindiruvchi optik muhit."
      },
      {
        id: "iris",
        nameUz: "Kamalak parda va qorachiq",
        nameLat: "Iris et Pupilla",
        desc: "Ko'z rangini belgilovchi va ko'z ichiga tushayotgan yorug'lik miqdorini diafragma kabi boshqaruvchi tuzilma."
      },
      {
        id: "retina",
        nameUz: "To'r parda",
        nameLat: "Retina",
        desc: "Yorug'likni sezuvchi fotoretseptorlar (tayoqchalar va kolbachalar) joylashgan sezgir qavat."
      },
      {
        id: "optic_nerve",
        nameUz: "Ko'rish nervi (II juft)",
        nameLat: "Nervus opticus",
        desc: "To'r pardada hosil bo'lgan elektr signallarni bosh miya ensa po'stlog'iga yetkazuvchi asab tolalari."
      }
    ],
    functions: [
      "Tashqi olamdagi yorug'lik va tasvirlarni qabul qilish",
      "Ranglar, yorug'lik va fazoviy chuqurlikni farqlash",
      "Vizual signallarni nerv impulslariga aylantirib miyaga uzatish"
    ],
    clinical: [
      "Katarakta - ko'z gavharining xiralashishi natijasida ko'rish qobiliyatining yo'qolishi.",
      "Glaukoma - ko'z ichi bosimining oshishi oqibatida ko'rish nervining atrofiyasi.",
      "Miopiya (Yaqindan ko'rish) - tasvirning to'r parda oldiga tushib qolishi."
    ],
    quiz: [
      {
        question: "Ko'z ichiga tushadigan yorug'lik oqimini diafragma kabi nima boshqaradi?",
        options: ["Shox parda", "Qorachiq va kamalak parda (Iris)", "To'r parda", "Shishasimon tana"],
        answerIndex: 1,
        explanation: "Kamalak parda (Iris) mushaklari qorachiq hajmini o'zgartirib, yorug'lik miqdorini boshqaradi."
      },
      {
        question: "Rangli ko'rish uchun javobgar fotoretseptorlar qaysilar?",
        options: ["Tayoqchalar", "Kolbachalar (Cones)", "Ganglioz hujayralar", "Bipolyar neyronlar"],
        answerIndex: 1,
        explanation: "Kolbachalar (Cones) kunduzgi va rangli ko'rishni ta'minlaydi."
      },
      {
        question: "Ko'rish nervi nechanchi juft kranial nerv hisoblanadi?",
        options: ["I juft", "II juft (N. opticus)", "III juft", "IV juft"],
        answerIndex: 1,
        explanation: "II juft kranial nerv (Nervus opticus) ko'rish nervi hisoblanadi."
      }
    ]
  },

  spine: {
    id: "spine",
    nameUz: "Umurtqa pog'onasi (Real 3D model)",
    nameLat: "Columna vertebralis",
    nameEn: "Human Spine 3D Anatomy",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet o'qi",
    bonesCount: "32-34 ta umurtqa",
    weight: "~1800 - 2000 g",
    description: "Inson umurtqa pog'onasi va orqa miya kanalining haqiqiy 3D anatomik modeli: bo'yin, ko'krak, bel umurtqalari, umurtqalararo disklar va dumg'aza suyagi.",
    parts: [
      {
        id: "cervical",
        nameUz: "Bo'yin umurtqalari (7 ta)",
        nameLat: "Vertebrae cervicales (C1-C7)",
        desc: "Boshni tutib turuvchi va harakatlantiruvchi eng erkin umurtqalar (C1 - Atlant, C2 - Aksis)."
      },
      {
        id: "thoracic",
        nameUz: "Ko'krak umurtqalari (12 ta)",
        nameLat: "Vertebrae thoracicae (Th1-Th12)",
        desc: "Qovurg'alar bilan birikib ko'krak qafasini hosil qiluvchi umurtqalar."
      },
      {
        id: "lumbar",
        nameUz: "Bel umurtqalari (5 ta)",
        nameLat: "Vertebrae lumbales (L1-L5)",
        desc: "Tananing asosiy og'irligini ko'taruvchi eng yirik va massiv umurtqalar."
      },
      {
        id: "sacrum",
        nameUz: "Dumg'aza suyagi",
        nameLat: "Os sacrum",
        desc: "Birlashgan 5 ta umurtqadan iborat bo'lib, chanoq halqasini mustahkamlaydi."
      }
    ],
    functions: [
      "Inson tanasining vertikal o'qi va asosiy tayanchi",
      "Orqa miyani mexanik shikastlanishlardan asrash",
      "Yurish va yugurishda elastik amortizatsiya qilish"
    ],
    clinical: [
      "Disk churrasi (Gryja) - umurtqalararo disk tolasining yorilishi va nerv ildizining qisilishi.",
      "Skolioz - umurtqa pog'onasining yon tomonga patologik egrilanishi.",
      "Osteoxondroz - disklar va tog'aylarning degenerativ yemirilib borishi."
    ],
    quiz: [
      {
        question: "Inson bo'yin bo'limida nechta umurtqa bor?",
        options: ["5 ta", "7 ta (C1-C7)", "8 ta", "12 ta"],
        answerIndex: 1,
        explanation: "Barcha sutemizuvchilarda (jumladan insonda) 7 ta bo'yin umurtqasi mavjud."
      },
      {
        question: "Birinchi bo'yin umurtqasining (C1) nomi nima?",
        options: ["Atlant (Atlas)", "Aksis", "Prominens", "Sakrum"],
        answerIndex: 0,
        explanation: "C1 umurtqasi Atlant deb ataladi va kalla suyagini tutib turadi."
      },
      {
        question: "Tananing asosiy vertikal og'irligini ko'taruvchi eng massiv umurtqalar qaysilar?",
        options: ["Bo'yin umurtqalari", "Ko'krak umurtqalari", "Bel umurtqalari (L1-L5)", "Dum suyagi"],
        answerIndex: 2,
        explanation: "Bel umurtqalari (L1-L5) tananing eng katta yuk tushadigan qismidir."
      }
    ]
  }
};
