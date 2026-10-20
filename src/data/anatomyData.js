export const ANATOMY_DATA = {
  skull: {
    id: "skull",
    nameUz: "Bosh suyagi",
    nameLat: "Cranium",
    nameEn: "Human Skull 3D",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet",
    bonesCount: "22 ta suyak",
    weight: "~1000 - 1200 g",
    description: "Bosh suyagi inson bosh skeleti bo'lib, miya va sezgi a'zolarini tashqi shikastlanishlardan himoya qiladi. Haqiqiy inson kalla suyagining yuqori aniqlikdagi 3D modeli.",
    parts: [
      { id: "frontal", nameUz: "Peshona suyagi", nameLat: "Os frontale", desc: "Kalla gumbazining oldingi qismi va ko'z kosasining yuqori devorini hosil qiladi." },
      { id: "parietal", nameUz: "Tepa suyagi", nameLat: "Os parietale", desc: "Kalla suyagining yon va yuqori devorlarini tashkil qiluvchi juft suyak." },
      { id: "temporal", nameUz: "Chakka suyagi", nameLat: "Os temporale", desc: "Eshitish va muvozanat a'zolarini o'z ichiga olgan murakkab suyak." },
      { id: "mandible", nameUz: "Pastki jag' suyagi", nameLat: "Mandibula", desc: "Bosh suyagining yagona harakatchan suyagi; chaynash harakatini ta'minlaydi." }
    ],
    functions: [
      "Bosh miyani mexanik zarbalardan himoya qilish",
      "Ko'rish, eshitish va hid bilish a'zolari uchun suyak qutisi bo'lish",
      "Chaynov va mimika mushaklarining birikish asosi"
    ],
    clinical: [
      "Kalla asosi sinishlari (Fractura basis cranii) - og'ir kranial travmalar.",
      "Chakka-pastki jag' bo'g'imi disfunksiyasi - chaynashda og'riq va qisirlash."
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
      }
    ]
  },

  brain: {
    id: "brain",
    nameUz: "Bosh miya",
    nameLat: "Encephalon",
    nameEn: "Human Brain 3D",
    system: "Markaziy asab tizimi (Systema nervosum centrale)",
    category: "Oliy boshqaruv markazi",
    bonesCount: "100 milliard neyron",
    weight: "~1350 - 1450 g",
    description: "Inson bosh miyasining yuqori aniqlikdagi anatomik 3D modeli: yarimsharlar po'stlog'i, egatlar va burmalar, miyacha, miya poyasi va asab yo'llari.",
    parts: [
      { id: "cerebrum", nameUz: "Katta yarimsharlar po'stlog'i", nameLat: "Cortex cerebri", desc: "Oliy asab faoliyati, tafakkur, xotira, ongli harakatlar va nutq markazi." },
      { id: "cerebellum", nameUz: "Miyacha (Kichik miya)", nameLat: "Cerebellum", desc: "Harakatlar koordinatsiyasi, muvozanat va mushak tonusini boshqaradi." },
      { id: "brainstem", nameUz: "Miya poyasi", nameLat: "Truncus encephali", desc: "Nafas olish va yurak urishi kabi hayotiy markazlar sohasidir." }
    ],
    functions: [
      "Ong, tafakkur, xotira va his-tuyg'ularni shakllantirish",
      "Ichki a'zolar va vegetativ tizim faoliyatini boshqarish",
      "Tana muvozanati va murakkab motor harakatlarni muvofiqlashtirish"
    ],
    clinical: [
      "Insult - miya qon aylanishining o'tkir buzilishi va to'qima ishemiyasi.",
      "Miyacha ataksiyasi - harakat koordinatsiyasi va muvozanatning yo'qolishi."
    ],
    quiz: [
      {
        question: "Harakatlar koordinatsiyasi va tana muvozanati uchun miyaning qaysi bo'limi javobgar?",
        options: ["Peshona bo'lagi", "Miyacha (Cerebellum)", "Gipotalamus", "Ko'rish do'mbog'i"],
        answerIndex: 1,
        explanation: "Miyacha (Cerebellum) nozik motor harakatlar va muvozanatni ta'minlaydi."
      }
    ]
  },

  eye: {
    id: "eye",
    nameUz: "Ko'z olmasi",
    nameLat: "Bulbus oculi",
    nameEn: "Human Eye 3D",
    system: "Sezgi a'zolari (Organa sensuum)",
    category: "Ko'rish a'zosi",
    bonesCount: "0 ta suyak",
    weight: "~7.5 g",
    description: "Inson ko'z olmasining 3D modeli: shox parda (cornea), oq parda (sclera), kamalak parda (iris), qorachiq, ko'z gavhari va ko'rish nervi (N. opticus).",
    parts: [
      { id: "cornea", nameUz: "Shox parda", nameLat: "Cornea", desc: "Ko'zning oldingi shaffof qismi; yorug'lik nurlarini asosiy sindiruvchi optik muhit." },
      { id: "iris", nameUz: "Kamalak parda va qorachiq", nameLat: "Iris et Pupilla", desc: "Ko'z rangini belgilaydi va ko'z ichiga tushadigan yorug'lik oqimini tartibga soladi." },
      { id: "retina", nameUz: "To'r parda", nameLat: "Retina", desc: "Yorug'likni sezuvchi fotoretseptorlar (tayoqchalar va kolbachalar) qavati." }
    ],
    functions: [
      "Tashqi olamdagi yorug'lik va ranglarni qabul qilish",
      "Optik tasvirni to'r pardada hosil qilish",
      "Nerv impulslarini miya ensa po'stlog'iga yetkazish"
    ],
    clinical: [
      "Katarakta - ko'z gavharining xiralashishi.",
      "Glaukoma - ko'z ichi bosimining oshishi oqibatida ko'rish nervi atrofiyasi."
    ],
    quiz: [
      {
        question: "Rangli ko'rish uchun javobgar fotoretseptorlar qaysilar?",
        options: ["Tayoqchalar", "Kolbachalar (Cones)", "Ganglioz hujayralar", "Bipolyar neyronlar"],
        answerIndex: 1,
        explanation: "Kolbachalar (Cones) kunduzgi va rangli ko'rishni ta'minlaydi."
      }
    ]
  },

  heart: {
    id: "heart",
    nameUz: "Inson yuragi",
    nameLat: "Cor",
    nameEn: "Human Heart 3D",
    system: "Yurak-qon tomir tizimi",
    category: "Qon aylanish markazi",
    bonesCount: "0 ta suyak",
    weight: "~280 - 340 g",
    description: "Inson yuragining haqiqiy 3D kardiologik modeli: qorinchalar, bo'lmachalar, aorta yoyi, o'pka poyasi va toj (koronar) qon-tomirlar tarmog'i.",
    parts: [
      { id: "aorta", nameUz: "Aorta yoyi", nameLat: "Arcus aortae", desc: "Chap qorinchadan boshlanuvchi eng yirik magistral arterial tomir." },
      { id: "left_ventricle", nameUz: "Chap qorincha", nameLat: "Ventriculus sinister", desc: "Yurakning eng baquvvat mushak devorli kamerasi." },
      { id: "right_ventricle", nameUz: "O'ng qorincha", nameLat: "Ventriculus dexter", desc: "Venoz qonni o'pkalarga yo'naltiradi." }
    ],
    functions: [
      "Qonni organizm bo'ylab uzluksiz haydab berish",
      "A'zo va to'qimalarni kislorod bilan ta'minlash",
      "Arterial qon bosimini hosil qilish"
    ],
    clinical: [
      "Miokard infarkti - koronar tomir to'silib yurak to'qimasi nobud bo'lishi.",
      "Aritmiya - yurak qisqarish ritmining buzilishi."
    ],
    quiz: [
      {
        question: "Aorta qon tomiri yurakning qaysi kamerasidan boshlanadi?",
        options: ["O'ng qorinchadan", "Chap qorinchadan", "Chap bo'lmachadan", "O'ng bo'lmachadan"],
        answerIndex: 1,
        explanation: "Aorta chap qorinchadan boshlanadi va kislorodga boy qonni butun tanaga tarqatadi."
      }
    ]
  },

  lung: {
    id: "lung",
    nameUz: "O'pkalar",
    nameLat: "Pulmones",
    nameEn: "Human Lungs 3D",
    system: "Nafas olish tizimi (Systema respiratorium)",
    category: "Nafas a'zolari",
    bonesCount: "0 ta suyak",
    weight: "~1000 - 1200 g",
    description: "Inson o'pkalarining 3D modeli: 3 bo'lakli o'ng o'pka, 2 bo'lakli chap o'pka, traxeya, bosh bronxlar va alveolyar gaz almashinuv sathi.",
    parts: [
      { id: "right_lung", nameUz: "O'ng o'pka (3 bo'lakli)", nameLat: "Pulmo dexter", desc: "Yuqori, o'rta va pastki bo'laklardan tashkil topgan kattaroq o'pka." },
      { id: "left_lung", nameUz: "Chap o'pka (2 bo'lakli)", nameLat: "Pulmo sinister", desc: "Yurak o'ymasiga ega bo'lgan 2 bo'lakli o'pka." },
      { id: "trachea_bronchi", nameUz: "Kengirdak va bronxial daraxt", nameLat: "Trachea et bronchi", desc: "Havo o'tkazuvchi tog'ay naychalar tarmog'i." }
    ],
    functions: [
      "Gazlar almashinuvi: kislorodni qonga o'tkazish va CO2 ni chiqarish",
      "Qonning kislota-ishqor (pH) muvozanatini saqlash",
      "Termoregulyatsiya va suv bug'lantirish"
    ],
    clinical: [
      "Pnevmoniya - o'pka to'qimasining o'tkir infektsion yallig'lanishi.",
      "Bronxial astma - bronxlar spazmi va nafas qisishi."
    ],
    quiz: [
      {
        question: "Chap o'pka nechta bo'lakdan (lobi) iborat?",
        options: ["1 ta", "2 ta", "3 ta", "4 ta"],
        answerIndex: 1,
        explanation: "Chap o'pka yurak joylashuvi sababli 2 bo'lakdan iborat."
      }
    ]
  },

  stomach: {
    id: "stomach",
    nameUz: "Oshqozon",
    nameLat: "Gaster",
    nameEn: "Human Stomach 3D",
    system: "Ovqat hazm qilish tizimi (Systema digestorium)",
    category: "Qorin bo'shlig'i a'zosi",
    bonesCount: "0 ta suyak",
    weight: "~150 - 200 g",
    description: "Inson oshqozonining 3D modeli: kirish qismi (cardia), tubi (fundus), tanasi (corpus) va pilorik chiqish qismi (pylorus).",
    parts: [
      { id: "fundus", nameUz: "Oshqozon tubi va tanasi", nameLat: "Fundus et Corpus gastricum", desc: "Ovqat to'planadigan va xlorid kislota ajraladigan asosiy soha." },
      { id: "pylorus", nameUz: "Pilorik qism va sfinkter", nameLat: "Pylorus", desc: "Oshqozondan 12 barmoqli ichakka ovqat o'tishini tartibga soluvchi klapan." }
    ],
    functions: [
      "Ovqatni mexanik va kimyoviy hazm qilish",
      "Xlorid kislotasi (HCl) va pepsin ajratish",
      "Mikroblarni zararsizlantirish"
    ],
    clinical: [
      "Gastrit - oshqozon shilliq qavatining yallig'lanishi.",
      "Oshqozon yarasi - me'da devorining kislota ta'sirida yemirilishi."
    ],
    quiz: [
      {
        question: "Oshqozon shirasidagi asosiy kislota qaysi?",
        options: ["Xlorid kislotasi (HCl)", "Sulfat kislotasi", "Sirka kislotasi", "Fosfat kislotasi"],
        answerIndex: 0,
        explanation: "Xlorid kislotasi (HCl) oqsillarni parchalash va mikroblarni o'ldirishda asosiy vositadir."
      }
    ]
  },

  liver: {
    id: "liver",
    nameUz: "Jigar",
    nameLat: "Hepar",
    nameEn: "Human Liver 3D",
    system: "Ovqat hazm qilish va moddalar almashinuvi",
    category: "Eng yirik bez",
    bonesCount: "0 ta suyak",
    weight: "~1400 - 1600 g",
    description: "Inson jigarining 3D modeli: o'ng va chap bo'laklar, darvoza venasi tizimi, o't pufagi va jigarning detoksikatsiya mikro-anatomiyasi.",
    parts: [
      { id: "lobes_liver", nameUz: "O'ng va chap bo'laklar", nameLat: "Lobus dexter et sinister", desc: "O'roqsimon boylam orqali ajralgan asosiy jigar massasi." },
      { id: "gallbladder", nameUz: "O't pufagi", nameLat: "Vesica biliaris", desc: "Jigar ishlab chiqargan o't suyuqligini to'plovchi rezervuar." }
    ],
    functions: [
      "Qonni toksinlar va zaharlardan tozalash (detoksikatsiya)",
      "Yog'larni hazm qilish uchun o't suyuqligi ishlab chiqarish",
      "Glikogen, vitaminlar va temir moddasini zaxiralash"
    ],
    clinical: [
      "Gepatit - jigar hujayralarining virusli yoki toksik yallig'lanishi.",
      "Jigar sirrozi - jigar to'qimasining fibroz bilan almashinishi."
    ],
    quiz: [
      {
        question: "Inson organizmidagi eng yirik ichki a'zo va bez qaysi?",
        options: ["Taloq", "Jigar (Hepar)", "Oshqozon osti bezi", "Buyrak"],
        answerIndex: 1,
        explanation: "Jigar (Hepar) inson tanasidagi eng yirik bez bo'lib, o'rtacha 1.5 kg tosh bosadi."
      }
    ]
  },

  kidney: {
    id: "kidney",
    nameUz: "Buyrak",
    nameLat: "Ren",
    nameEn: "Human Kidney 3D",
    system: "Siydik ayirish tizimi (Systema urinarium)",
    category: "Ekskretor a'zo",
    bonesCount: "0 ta suyak",
    weight: "~130 - 160 g",
    description: "Inson buyragining 3D modeli: po'stloq modda, mag'iz piramidalari, buyrak jomi, nefronlar va siydik yo'li (ureter).",
    parts: [
      { id: "cortex_renal", nameUz: "Buyrak po'stloq qavati", nameLat: "Cortex renalis", desc: "Birlamchi siydik filtratsiyasi amalga oshuvchi qon tomirli soha." },
      { id: "pelvis_renal", nameUz: "Buyrak jomi va siydik nayi", nameLat: "Pelvis renalis et Ureter", desc: "Filtrlangan ikkilamchi siydikni qovuqqa yo'naltiruvchi naycha." }
    ],
    functions: [
      "Qonni doimiy filtrlab zararli qoldiqlarni siydik bilan chiqarish",
      "Suv-tuz va elektrolit muvozanatini saqlash",
      "Qon bosimini regulyatsiya qiluvchi renin gormonini sintezlash"
    ],
    clinical: [
      "Piyelonefrit - buyrak jomi va to'qimalarining yallig'lanishi.",
      "Buyrak tosh kasalligi (Urolitiaz) - tuzlar kristallarining toshga aylanishi."
    ],
    quiz: [
      {
        question: "Buyrakning struktur-funktsional birligi nima deb ataladi?",
        options: ["Neyron", "Nefron (Nephron)", "Alveola", "Osteon"],
        answerIndex: 1,
        explanation: "Nefron (Nephron) buyrakning qon filtrlovchi asosiy mikroskopik birligidir."
      }
    ]
  },

  spine: {
    id: "spine",
    nameUz: "Umurtqa pog'onasi",
    nameLat: "Columna vertebralis",
    nameEn: "Human Spine 3D",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet o'qi",
    bonesCount: "32-34 ta umurtqa",
    weight: "~1800 - 2000 g",
    description: "Inson umurtqa pog'onasi va orqa miya kanalining 3D modeli: bo'yin (C1-C7), ko'krak (Th1-Th12), bel (L1-L5), umurtqalararo disklar va dumg'aza suyagi.",
    parts: [
      { id: "cervical", nameUz: "Bo'yin umurtqalari (7 ta)", nameLat: "Vertebrae cervicales", desc: "Boshni tutib turuvchi eng erkin umurtqalar (Atlant va Aksis)." },
      { id: "thoracic", nameUz: "Ko'krak umurtqalari (12 ta)", nameLat: "Vertebrae thoracicae", desc: "Qovurg'alar bilan birikuvchi soha." },
      { id: "lumbar", nameUz: "Bel umurtqalari (5 ta)", nameLat: "Vertebrae lumbales", desc: "Tananing asosiy og'irligini ko'taruvchi eng massiv umurtqalar." }
    ],
    functions: [
      "Inson tanasining vertikal o'qi va asosiy tayanchi",
      "Orqa miyani mexanik shikastlanishlardan asrash",
      "Yurish va sakrashda zarbalarni amortizatsiya qilish"
    ],
    clinical: [
      "Disk churrasi (Gryja) - umurtqalararo diskning ezilishi va nerv qisilishi.",
      "Skolioz - umurtqaning yon tomonga egrilanishi."
    ],
    quiz: [
      {
        question: "Inson bo'yin bo'limida nechta umurtqa bor?",
        options: ["5 ta", "7 ta (C1-C7)", "8 ta", "12 ta"],
        answerIndex: 1,
        explanation: "Barcha sutemizuvchilarda 7 ta bo'yin umurtqasi mavjud."
      }
    ]
  }
};
