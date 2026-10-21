export const ANATOMY_DATA = {
  // 1. NERV SISTEMASI / MIYA
  brain: {
    id: "brain",
    nameUz: "Bosh miya",
    nameLat: "Encephalon",
    nameEn: "Human Brain 3D",
    systemKey: "nervous",
    system: "Nerv sistemasi (Systema nervosum)",
    category: "Oliy boshqaruv markazi",
    bonesCount: "100 milliard neyron",
    weight: "~1350 - 1450 g",
    keywords: ["bosh miyya", "bosh miya", "miya", "brain", "encephalon", "asab", "nerv", "nerv sistemasi", "cerebrum", "cerebellum", "yarimshar", "miyacha", "po'stloq", "peshona bo'lagi"],
    description: "Inson bosh miyasining rang-barang anatomik bo'laklarga ajratilgan yuqori aniqlikdagi 3D modeli: peshona bo'lagi (ko'k), tepa bo'lagi (yashil), ensa bo'lagi (sariq), chakka bo'lagi (binafsha), miyacha (qizil) va miya poyasi.",
    parts: [
      { id: "frontal_lobe", nameUz: "Peshona bo'lagi (Lobus frontalis)", nameLat: "Lobus frontalis", desc: "Mantiqiy fikrlash, iroda, ongli harakatlar (motorika) va Broka nutq markazi joylashgan oliy bo'lim." },
      { id: "parietal_lobe", nameUz: "Tepa bo'lagi (Lobus parietalis)", nameLat: "Lobus parietalis", desc: "Teri-mushak sezgilari (og'riq, harorat, teginish) va fazoviy oriyentatsiyani birlashtiradi." },
      { id: "occipital_lobe", nameUz: "Ensa bo'lagi (Lobus occipitalis)", nameLat: "Lobus occipitalis", desc: "Ko'rish analizatorining oliy po'stloq markazi; ko'rilgan shakl va ranglarni qayta ishlaydi." },
      { id: "temporal_lobe", nameUz: "Chakka bo'lagi (Lobus temporalis)", nameLat: "Lobus temporalis", desc: "Eshitish markazi, hid bilish, xotira tuzilmalari (gipokamp) va Vernike nutqni tushunish markazi." },
      { id: "cerebellum", nameUz: "Miyacha (Cerebellum)", nameLat: "Cerebellum", desc: "Nozik motor harakatlar koordinatsiyasi, tana muvozanati va mushaklar tonusini boshqaradi." },
      { id: "brainstem", nameUz: "Miya poyasi (Truncus encephali)", nameLat: "Truncus encephali", desc: "Uzunchoq miya, ko'prik va o'rta miya; nafas olish va qon aylanish hayotiy markazlari joylashgan." }
    ],
    functions: [
      "Ong, abstrakt tafakkur, iroda, xotira va nutqni boshqarish",
      "Barcha ixtiyoriy va g'ayriixtiyoriy harakatlarni koordinatsiya qilish",
      "Ichki a'zolar faoliyatini vegetativ nerv tizimi orqali muvofiqlashtirish",
      "Sezgi a'zolaridan keluvchi millionlab signallarni tahlil qilish"
    ],
    clinical: [
      "Insult (Iktus) - miya tomirlari trombozi yoki qon quyilishi oqibatida to'qima ishemiyasi.",
      "Parkinson kasalligi - qora modda (substantia nigra) dopaminerjik neyronlarining zararlanishi.",
      "Alsgeymer kasalligi - neyronlar degeneratsiyasi va xotira buzilishi."
    ],
    quiz: [
      {
        question: "Harakatlar koordinatsiyasi va tana muvozanati uchun miyaning qaysi bo'limi javobgar?",
        options: ["Peshona bo'lagi", "Miyacha (Cerebellum)", "Gipotalamus", "Ko'rish do'mbog'i"],
        correct: 1,
        answerIndex: 1,
        explanation: "Miyacha (Cerebellum) nozik harakatlarni uyg'unlashtirish va muvozanatni ta'minlaydi."
      },
      {
        question: "Ko'rish analizatorining oliy po'stloq markazi miyaning qaysi bo'lagida joylashgan?",
        options: ["Ensa bo'lagida (Lobus occipitalis)", "Chakka bo'lagida", "Peshona bo'lagida", "Tepa bo'lagida"],
        correct: 0,
        answerIndex: 0,
        explanation: "Ensa bo'lagi (Lobus occipitalis) ko'rish signallarini tahlil qiluvchi asosiy markaz hisoblanadi."
      }
    ]
  },

  // 2. TAYANCH-HARAKAT / BOSH SUYAGI
  skull: {
    id: "skull",
    nameUz: "Bosh suyagi",
    nameLat: "Cranium",
    nameEn: "Human Skull 3D",
    systemKey: "musculoskeletal",
    system: "Tayanch-harakat a'zolari (Systema skeletale)",
    category: "Aksial kalla skeleti",
    bonesCount: "22 ta suyak",
    weight: "~1000 - 1200 g",
    keywords: ["bosh suyagi", "kalla suyagi", "bosh", "suyak", "skull", "cranium", "bosh skeleti", "peshona suyagi", "chakka suyagi", "jag", "mandibula", "maxilla"],
    description: "Inson bosh suyagining boy rang-barang anatomik tuzilishi: kalla gumbazi, peshona suyagi (sariq), tepa suyaklari (yashil), chakka suyaklari (binafsha), ensa suyagi (qizil), yuqori va pastki jag' suyaklari hamda tishlar qatori.",
    parts: [
      { id: "frontal_bone", nameUz: "Peshona suyagi", nameLat: "Os frontale", desc: "Kalla suyagining oldingi qismini va ko'z kosasining yuqori devorini hosil qiladi." },
      { id: "parietal_bones", nameUz: "Tepa suyaklari", nameLat: "Ossa parietalia", desc: "Kalla suyagi gumbazining yuqori va yon devorlarini tashkil qiluvchi juft suyak." },
      { id: "temporal_bones", nameUz: "Chakka suyaklari", nameLat: "Ossa temporalia", desc: "Eshitish va muvozanat apparati joylashgan, piramida qismiga ega murakkab juft suyak." },
      { id: "occipital_bone", nameUz: "Ensa suyagi", nameLat: "Os occipitale", desc: "Kallaning orqa pastki sohasini hosil qiladi, katta ensa teshigi (foramen magnum) orqali orqa miyaga ulanadi." },
      { id: "mandible", nameUz: "Pastki jag' suyagi", nameLat: "Mandibula", desc: "Bosh suyagidagi yagona erkin harakatlanuvchi suyak; chaynash harakatini taminlaydi." },
      { id: "maxilla", nameUz: "Yuqori jag' suyagi", nameLat: "Maxilla", desc: "Yuz skeletining markaziy qismi, yuqori tishlar katakchalari va gaymor bo'shlig'iga ega." }
    ],
    functions: [
      "Bosh miyani mexanik shikastlanish va tashqi bosimlardan himoyalash",
      "Ko'rish, eshitish, muvozanat va hid bilish analizatorlari uchun qattiq himoya qutisi bo'lish",
      "Ovqatni chaynash va nutq tovushlarini hosil qilishda tayanch mexanizm"
    ],
    clinical: [
      "Kalla asosi sinishi (Fractura basis cranii) - ko'z atrofida 'ko'zoynak' gematomalari bilan kechadi.",
      "Gaymorit - yuqori jag' suyagidagi Gaymor bo'shlig'ining yallig'lanishi."
    ],
    quiz: [
      {
        question: "Bosh suyagidagi yagona erkin harakatlanuvchi suyak qaysi?",
        options: ["Maxilla", "Mandibula (Pastki jag')", "Os frontale", "Os temporale"],
        correct: 1,
        answerIndex: 1,
        explanation: "Mandibula (pastki jag') bosh suyagidagi yagona harakatchan suyakdir."
      }
    ]
  },

  // 3. SEZGI / KO'Z TO'QIMALARI
  eye: {
    id: "eye",
    nameUz: "Ko'z to'qimalari va olmasi",
    nameLat: "Bulbus oculi & Tunicae oculi",
    nameEn: "Human Eye & Ocular Tissues 3D",
    systemKey: "sensory",
    system: "Sezgi a'zolari (Organa sensuum)",
    category: "Ko'rish a'zosi to'qimalari",
    bonesCount: "0 ta suyak",
    weight: "~7.5 g",
    keywords: ["ko'z toqimalari", "koz toqimalari", "ko'z", "koz", "eye", "bulbus oculi", "to'r parda", "shox parda", "gavhar", "kamalak parda", "retina", "cornea", "iris", "ko'z olmasi"],
    description: "Inson ko'z olmasi to'qimalarining yorqin rangli 3D anatomik modeli: shaffof shox parda (cornea), oq parda (sclera), jozibador rangli kamalak parda (iris), qorachiq, botiq to'r parda (retina), ko'z gavhari, tomirli parda va ko'rish nervi (nervus opticus).",
    parts: [
      { id: "cornea", nameUz: "Shox parda (Cornea)", nameLat: "Cornea", desc: "Ko'zning oldingi butkul shaffof, qon tomirsiz nurni asosiy sindiruvchi sathi (40-43 dioptriya)." },
      { id: "iris_pupil", nameUz: "Kamalak parda va qorachiq", nameLat: "Iris & Pupilla", desc: "Ko'z rangini beruvchi pigmentli diafragma; qorachiq orqali ko'z ichiga tushuvchi yorug'lik miqdorini boshqaradi." },
      { id: "lens", nameUz: "Ko'z gavhari (Lens crystallina)", nameLat: "Lens", desc: "Yassi-qavariq tirik biologik linza; akkomodatsiya (yaqin va uzoqqa fokuslash) vazifasini bajaradi." },
      { id: "retina", nameUz: "To'r parda (Retina)", nameLat: "Retina", desc: "120 mln tayoqchalar (oq-qora ko'rish) va 7 mln kolbachalar (rangli ko'rish) joylashgan fotoretseptor qavat." },
      { id: "optic_nerve", nameUz: "Ko'rish nervi (N. opticus)", nameLat: "Nervus opticus", desc: "To'r pardadan hosil bo'lgan millionlab nerv tolalarini bosh miya ensa po'stlog'iga eltuvchi yo'l." },
      { id: "eye_muscles", nameUz: "Ko'z mushaklari (Musculi bulbi)", nameLat: "Musculi bulbi", desc: "Ko'z olmasini hamma tomonga chaqqon harakatlantiruvchi 4 ta to'g'ri va 2 ta qiyshiq mushaklar." }
    ],
    functions: [
      "Elektromagnit yorug'lik to'lqinlarini qabul qilish va sindirish",
      "Optik tasvirni to'r pardadagi fotoretseptorlarga fokuslash",
      "Ranglar gammasini (qizil, yashil, ko'k) farqlash va tasvirni elektr impulsiga aylantirish"
    ],
    clinical: [
      "Katarakta - ko'z gavhari oqsillarining xiralashishi va ko'rish keskinligining pasayishi.",
      "Glaukoma - ko'z ichi suyuqligi bosimi oshib, ko'rish nervining atrofiyaga uchrashi.",
      "Miopiya (Yaqindan ko'rish) - nur to'r parda oldida fokuslanishi."
    ],
    quiz: [
      {
        question: "Rangli ko'rish uchun javobgar fotoretseptorlar nima deb ataladi?",
        options: ["Tayoqchalar", "Kolbachalar (Cones)", "Ganglioz hujayralar", "Bipolyar hujayralar"],
        correct: 1,
        answerIndex: 1,
        explanation: "Kolbachalar (Cones) kunduzgi rangli ko'rishni ta'minlaydi."
      }
    ]
  },

  eye_tissues: {
    id: "eye_tissues",
    nameUz: "Ko'z olmasi ichki qatlamlari",
    nameLat: "Tunicae bulbi oculi",
    nameEn: "Ocular Layers & Extraocular Tissues 3D",
    systemKey: "sensory",
    system: "Sezgi a'zolari (Organa sensuum)",
    category: "Anatomik qatlamlar va to'qimalar",
    bonesCount: "0 ta suyak",
    weight: "~7.5 g",
    keywords: ["ko'z to'qimalari", "ko'z qatlamlari", "sclera", "cornea", "iris", "retina"],
    description: "Ko'z olmasi uchta asosiy pardadan (tashqi tolali, o'rta tomirli va ichki to'r parda) hamda yorug'lik sindiruvchi muhitlardan (shox parda, gavhar, shishasimon tana) iborat.",
    parts: [
      { id: "sclera", nameUz: "Oqsil parda (Sklera)", nameLat: "Sclera", desc: "Ko'z olmasining orqa 5/6 qismini qoplovchi pishiq tolali oq qobiq." },
      { id: "cornea", nameUz: "Shox parda (Kornea)", nameLat: "Cornea", desc: "Oldingi shaffof yorug'lik sindiruvchi sferik qism (sinish kuchi ~43 dioptriya)." },
      { id: "iris", nameUz: "Kamalak parda (Iris)", nameLat: "Iris", desc: "Ko'z rangini belgilovchi va qorachiq o'lchamini toraytirib-kengaytiruvchi mushakli parda." },
      { id: "lens", nameUz: "Gavhar (Linza)", nameLat: "Lens crystallina", desc: "Akkomodatsiyani (yaqin va uzoqqa moslanishni) ta'minlovchi ikki tomoni qabariq elastik linza." },
      { id: "retina", nameUz: "To'r parda (Retina)", nameLat: "Retina", desc: "Fotoretseptorlar (tayoqcha va kolbachalar) joylashgan yorug'lik sezuvchi asab qavati." },
      { id: "optic_nerve", nameUz: "Ko'ruv nervi (II juft)", nameLat: "Nervus opticus", desc: "Retinadan bosh miya ensa bo'lagiga vizual signallarni uzatuvchi qalin nerv dastasi." },
      { id: "muscles", nameUz: "Ko'zni harakatlantiruvchi mushaklar", nameLat: "Musculi bulbi", desc: "4 ta to'g'ri va 2 ta qiyshiq mushaklar (m. recti et m. obliqui)." }
    ],
    functions: [
      "Optik yorug'lik nurlarini fokuslab retinaga yo'naltirish",
      "Fotoretseptorlar orqali yorug'lik energiyasini nerv impulslariga aylantirish",
      "Rang ajratish (kolbachalar) va qorong'ida ko'rish (tayoqchalar)",
      "Binokulyar va stereoskopik (3D) fazoviy ko'rish",
      "Akkomodatsiya va qorachiq yorug'lik refleksini boshqarish"
    ],
    clinical: [
      "Miopiya (yaqindan ko'rish) va gipermetropiya (uzoqdan ko'rish)",
      "Katarakta — gavharning xiralashishi va ko'rish o'tkirligining pasayishi",
      "Glaukoma — ko'z ichki bosimining oshishi va ko'ruv nervining zararlanishi",
      "Retinopatiya — qandli diabet va gipertoniyada to'r parda tomirlarining zararlanishi"
    ],
    quiz: [
      {
        question: "Ko'z olmasining optik sindirish kuchi eng yuqori bo'lgan qismi qaysi?",
        options: ["Shox parda (Cornea)", "Gavhar (Lens)", "Shishasimon tana", "Sklera"],
        correct: 0,
        explanation: "Shox parda (Cornea) ~43 dioptriya bilan ko'zning eng kuchli yorug'lik sindiruvchi qismidir."
      },
      {
        question: "Rang ajratish uchun mas'ul bo'lgan fotoretseptorlar qaysilar?",
        options: ["Kolbachalar (Cones)", "Tayoqchalar (Rods)", "Ganglionar hujayralar", "Bipolyar hujayralar"],
        correct: 0,
        explanation: "Kolbachalar (Cones) rang ajratishga javobgardir."
      }
    ]
  },

  // 4. QON AYLANISH / YURAK
  heart: {
    id: "heart",
    nameUz: "Inson yuragi (Optimallashtirilgan)",
    nameLat: "Cor",
    nameEn: "Human Heart 3D Optimized",
    systemKey: "circulatory",
    system: "Qon aylanish sistemasi (Systema cardiovasculare)",
    category: "Markaziy nasos a'zosi",
    bonesCount: "0 ta suyak",
    weight: "~280 - 340 g",
    keywords: ["yurak", "yurak tuzilishi", "yurak tuzilishini", "cor", "heart", "aorta", "vena", "qorincha", "bolmacha", "miokard", "koronar tomir", "qon aylanish", "puls"],
    description: "Yuqori darajada optimallashtirilgan 3D kardiologik yurak modeli: alvon qizil Aorta yoyi va tarmoqlari, ko'k rangli Kovak venalar (Vena cava), feruza O'pka poyasi, qalin miokard mushak devori, yorqin toj (koronar) qon tomirlari hamda haqiqiy kardiologik 'lub-dub' pulsatsiyasi.",
    parts: [
      { id: "aorta_arch", nameUz: "Aorta yoyi (Arcus aortae)", nameLat: "Arcus aortae", desc: "Chap qorinchadan chiquvchi inson tanasidagi eng yirik arterial magistral; kislorodli qonni butun vujudga tarqatadi." },
      { id: "left_ventricle", nameUz: "Chap qorincha (Ventriculus sinister)", nameLat: "Ventriculus sinister", desc: "Eng qalin va kuchli miokard devoriga ega kamera (10-15 mm); qonni katta qon aylanish doirasiga otadi." },
      { id: "right_ventricle", nameUz: "O'ng qorincha (Ventriculus dexter)", nameLat: "Ventriculus dexter", desc: "Venoz qonni o'pka arteriyasi orqali kichik doiraga (o'pkalarga) haydaydi." },
      { id: "atria", nameUz: "Chap va O'ng bo'lmachalar", nameLat: "Atria cordis", desc: "Kovak va o'pka venalaridan qonni qabul qilib, qorinchalarga o'tkazuvchi yuqori kameralar." },
      { id: "pulmonary_trunk", nameUz: "O'pka poyasi (Truncus pulmonalis)", nameLat: "Truncus pulmonalis", desc: "O'ng qorinchadan venoz qonni kislorod bilan to'yintirish uchun o'pkalarga yetkazadi." },
      { id: "coronary_arteries", nameUz: "Toj (Koronar) arteriyalari", nameLat: "Arteriae coronariae", desc: "Yurak miokard to'qimasining o'zini uzluksiz kislorod va ozuqa bilan ta'minlovchi xususiy tomirlar." }
    ],
    functions: [
      "Katta va kichik qon aylanish doiralari bo'ylab qonni to'xtovsiz haydash (minutiga 5-6 litr)",
      "A'zo va to'qimalarni kislorod, ozuqa, ferment va gormonlar bilan ta'minlash",
      "Organizmda barqaror arterial qon bosimini saqlab turish"
    ],
    clinical: [
      "Miokard infarkti - toj arteriyasi trombozi oqibatida yurak mushagining nekrozga uchrashi.",
      "Aritmiyalar - yurak o'tkazuvchi tizimi (Gis tutami, sinus tuguni) faoliyatining buzilishi.",
      "Yurak klapanlari nuqsonlari (Stenoz va Yetishmovchilik)."
    ],
    quiz: [
      {
        question: "Aorta qon tomiri yurakning qaysi kamerasidan boshlanadi?",
        options: ["O'ng qorinchadan", "Chap qorinchadan", "Chap bo'lmachadan", "O'ng bo'lmachadan"],
        correct: 1,
        answerIndex: 1,
        explanation: "Aorta chap qorinchadan boshlanib, kislorodga to'yingan qonni tana bo'ylab tarqatadi."
      }
    ]
  },

  // 5. OVQAT HAZM / O'T PUFAGI
  gallbladder: {
    id: "gallbladder",
    nameUz: "O't pufagi va o't yo'llari",
    nameLat: "Vesica biliaris & Ductus biliares",
    nameEn: "Gallbladder & Biliary System 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Gepatobiliar rezervuar",
    bonesCount: "0 ta suyak",
    weight: "~40 - 70 ml hajm",
    keywords: ["ot pufagi", "o't pufagi", "gallbladder", "vesica biliaris", "safro", "o't", "ot yo'llari", "choledochus", "jigar", "hazm", "yog"],
    description: "Inson o't pufagining batafsil 3D modeli: noksimon tubi (fundus), tanasi (corpus), bo'yni (collum), pufak yo'li (ductus cysticus), umumiy jigar yo'li, umumiy o't yo'li (ductus choledochus) hamda 12 barmoqli ichakka ulanuvchi Fater so'rg'ichi (Oddi sfinkteri).",
    parts: [
      { id: "fundus_vesicae", nameUz: "O't pufagi tubi (Fundus vesicae)", nameLat: "Fundus vesicae biliaris", desc: "Jigarning oldingi pastki chetidan bir oz bo'rtib turuvchi kengaygan pastki qism." },
      { id: "corpus_vesicae", nameUz: "O't pufagi tanasi (Corpus vesicae)", nameLat: "Corpus vesicae biliaris", desc: "Jigar pastki yuzasidagi o't pufagi chuqurchasida yotuvchi asosiy rezervuar." },
      { id: "ductus_cysticus", nameUz: "Pufak yo'li (Ductus cysticus)", nameLat: "Ductus cysticus", desc: "Geyzter spiral klapanlariga ega ingichka chiqaruvchi naycha." },
      { id: "ductus_choledochus", nameUz: "Umumiy o't yo'li (Ductus choledochus)", nameLat: "Ductus choledochus", desc: "Safroni 12 barmoqli ichak bo'shlig'iga quyuvchi magistral o't yo'li." },
      { id: "sphincter_oddi", nameUz: "Oddi sfinkteri (Sphincter Oddi)", nameLat: "Sphincter ampullae hepatopancreaticae", desc: "O't va me'da osti bezi shirasi tushishini nazorat qiluvchi silliq mushakli klapan." }
    ],
    functions: [
      "Jigar ishlab chiqargan o't suyuqligini to'plash va 5-10 baravargacha quyultirish",
      "Yog'li ovqat iste'mol qilinganda xolesistokinin ta'sirida qisqarib o'tni ichakka quyish",
      "Yog'larni emulsiyalash va ichak peristaltikasini rag'batlantirish"
    ],
    clinical: [
      "Xoletsistit - o't pufagi devorining o'tkir yoki surunkali yallig'lanishi.",
      "O't-tosh kasalligi (Xolelitiaz) - xolesterin yoki bilirubin cho'kmasidan toshlar hosil bo'lishi.",
      "Mexanik sariqlik - umumiy o't yo'li tosh bilan tiqilib qolishi."
    ],
    quiz: [
      {
        question: "O't pufagining asosiy vazifasi nimadan iborat?",
        options: ["O't suyuqligini ishlab chiqarish", "O't suyuqligini to'plash va quyultirish", "Insulin ishlab chiqarish", "Oqsillarni parchalash"],
        correct: 1,
        answerIndex: 1,
        explanation: "O't suyuqligini jigar ishlab chiqaradi, o't pufagi esa uni to'playdi va quyultirib saqlaydi."
      }
    ]
  },

  // 6. OVQAT HAZM / OSHQOZON OSTI BEZI
  pancreas: {
    id: "pancreas",
    nameUz: "Oshqozon osti bezi",
    nameLat: "Pancreas",
    nameEn: "Human Pancreas 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish va Endokrin sistema",
    category: "Aralash sekretsiya bezi",
    bonesCount: "0 ta suyak",
    weight: "~70 - 100 g",
    keywords: ["oshqozon osti bezlari", "oshqozon osti bezi", "pancreas", "insulin", "glyukagon", "wirsung", "hazm", "endokrin", "ferment", "langergans"],
    description: "Inson oshqozon osti bezining anatomik 3D modeli: 12 barmoqli ichak (duodenum) qovuzlog'ida yotuvchi boshi (caput), bo'yni (collum), tanasi (corpus), dum qismi (cauda), bosh chiqaruvchi Virsung nayi (ductus pancreaticus) va taloq arteriyasi.",
    parts: [
      { id: "caput_pancreatis", nameUz: "Bezi boshi (Caput pancreatis)", nameLat: "Caput pancreatis", desc: "12 barmoqli ichakning taqasimon buralishi ichida mustahkam joylashgan eng keng qismi." },
      { id: "corpus_pancreatis", nameUz: "Bezi tanasi (Corpus pancreatis)", nameLat: "Corpus pancreatis", desc: "Umurtqa pog'onasi oldida, oshqozon orqasida ko'ndalangiga yotuvchi uchburchak shaklli tana." },
      { id: "cauda_pancreatis", nameUz: "Bezi dumi (Cauda pancreatis)", nameLat: "Cauda pancreatis", desc: "Chap qovurg'a ostiga, taloq darvozasiga yetib boruvchi ingichkalashgan uchi." },
      { id: "ductus_pancreaticus", nameUz: "Virsung nayi (Ductus pancreaticus)", nameLat: "Ductus pancreaticus", desc: "Bez bo'ylab o'tuvchi va hazm fermentlarini 12 barmoqli ichakka quyuvchi bosh nay." },
      { id: "islets_langerhans", nameUz: "Langergans orolchalari", nameLat: "Insulae pancreaticae", desc: "Qonga to'g'ridan-to'g'ri insulin va glyukagon gormonlarini chiqaruvchi mikroskopik klasterlar." }
    ],
    functions: [
      "Ekzokrin funksiya: tripsin, amilaza va lipaza hazm fermentlarini sintezlash",
      "Endokrin funksiya: beta-hujayralar orqali qon qandini tushiruvchi Insulin ajratish",
      "Alfa-hujayralar orqali qondagi qandni oshiruvchi Glyukagon sintez qilish"
    ],
    clinical: [
      "O'tkir pankreatit - bez fermentlarining o'z to'qimasini eritib yuborishi (autoliz).",
      "Qandli diabet (1 va 2-tur) - insulin yetishmovchiligi yoki retseptorlar sezgirligi yo'qolishi."
    ],
    quiz: [
      {
        question: "Qondagi glyukoza miqdorini kamaytiruvchi insulin gormonini qaysi hujayralar ishlab chiqaradi?",
        options: ["Alfa hujayralar", "Beta hujayralar", "Delta hujayralar", "F hujayralar"],
        correct: 1,
        answerIndex: 1,
        explanation: "Langergans orolchalaridagi Beta-hujayralar insulin gormonini sintezlaydi."
      }
    ]
  },

  // 7. OVQAT HAZM / OG'IZ BO'SHLIG'I (TISHLAR, TIL)
  oral_cavity: {
    id: "oral_cavity",
    nameUz: "Og'iz bo'shlig'i: Tishlar va Til",
    nameLat: "Cavitas oris, Dentes et Lingua",
    nameEn: "Oral Cavity, Teeth & Tongue 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Hazm traktining boshlang'ich bo'limi",
    bonesCount: "32 ta doimiy tish",
    weight: "~180 g (til va to'qimalar)",
    keywords: ["og'iz boshligi", "ogiz boshligi", "og'iz bo'shlig'i", "tishlar", "til", "tish", "dentes", "lingua", "tanglay", "chaynash", "oral cavity", "teeth", "tongue", "milk"],
    description: "Og'iz bo'shlig'i a'zolarining batafsil 3D modeli: yuqori va pastki tish yoylari (kesuvchi, qoziq, kichik va katta oziq tishlar), milk to'qimasi, harakatchan mushakli til (lingua), ta'm bilish so'rg'ichlari va qattiq hamda yumshoq tanglay.",
    parts: [
      { id: "teeth_arch", nameUz: "Tishlar qatori (32 ta)", nameLat: "Dentes permanentes", desc: "8 ta kurak tish (keskich), 4 ta qoziq tish, 8 ta kichik oziq tish va 12 ta katta oziq tish (aqldon tishlari bilan)." },
      { id: "tongue_body", nameUz: "Til (Lingua)", nameLat: "Lingua", desc: "Xususiy va skelet mushaklaridan iborat kuchli organ; chaynash, yutish va artikulyatsion nutqni ta'minlaydi." },
      { id: "taste_papillae", nameUz: "Ta'm bilish so'rg'ichlari", nameLat: "Papillae linguales", desc: "Til orqasidagi novsimon, zamburug'simon va ipsimon so'rg'ichlar; shirin, sho'r, nordon va achchiq ta'mni sezadi." },
      { id: "gingiva", nameUz: "Milk to'qimasi (Gingiva)", nameLat: "Gingiva", desc: "Tish bo'yni va alveolyar o'siqlarni qoplab turuvchi shilliq qavat." },
      { id: "palate", nameUz: "Qattiq va Yumshoq tanglay", nameLat: "Palatum durum et molle", desc: "Og'iz bo'shlig'i yuqori devorini hosil qilib, burun bo'shlig'idan ajratib turuvchi to'siq." }
    ],
    functions: [
      "Ovqatni mexanik maydalash, ezish va chaynash",
      "Ta'm bilish retseptorlari orqali taom sifatini aniqlash",
      "Tuprik fermentlari (ptialin) yordamida dastlabki uglevodlarni parchalash",
      "Insonning tushunarli so'zlashuvchi nutqi (artikulyatsiyasi)da ishtirok etish"
    ],
    clinical: [
      "Karies - tish emal va dentinining bakterial kislotalar ta'sirida yemirilishi.",
      "Gingivit va Parodontit - milk to'qimasining yallig'lanishi va tishlarning qimirlab qolishi.",
      "Glossit - til to'qimasining yallig'lanishi."
    ],
    quiz: [
      {
        question: "Voyaga yetgan sog'lom inson og'iz bo'shlig'ida nechta doimiy tish bo'ladi?",
        options: ["28 ta", "32 ta", "24 ta", "36 ta"],
        correct: 1,
        answerIndex: 1,
        explanation: "Voyaga yetgan insonda to'liq tish formulasida 32 ta doimiy tish bo'ladi."
      }
    ]
  },

  // 8. TAYANCH-HARAKAT / BARMOG'LAR VA QO'L TUZILISHI
  hand_fingers: {
    id: "hand_fingers",
    nameUz: "Barmoqlar va qo'l panjasi tuzilishi",
    nameLat: "Digiti manus & Skeleton manus",
    nameEn: "Hand & Finger Anatomy 3D",
    systemKey: "musculoskeletal",
    system: "Tayanch-harakat a'zolari (Systema skeletale)",
    category: "Yuqori erkin a'zo skeleti",
    bonesCount: "27 ta suyak (bir qo'lda)",
    weight: "~400 g",
    keywords: ["barmoqlar tuzulishi", "barmoqlar", "barmoq", "qo'l", "panja", "falanga", "kaft", "kaft usti", "fingers", "hand", "digiti manus", "carpus", "metacarpus", "bog'im"],
    description: "Inson qo'l panjasi va barmoqlarining nozik 3D modeli: kaft usti suyaklari (carpus - 8 ta), 5 ta kaft suyagi (metacarpus), barmoq suyaklari (proksimal, o'rta va distal falangalar), bo'g'im tog'aylari va barmoq harakatini ta'minlovchi paylar.",
    parts: [
      { id: "carpus_cluster", nameUz: "Kaft usti suyaklari (8 ta)", nameLat: "Ossa carpi", desc: "Qayiqsimon, oysimon, uchburchak, no'xatsimon, trapetsiya, trapetsiyasimon, boshchali va ilmoqli suyaklar." },
      { id: "metacarpal_bones", nameUz: "Kaft suyaklari (5 ta)", nameLat: "Ossa metacarpi I-V", desc: "Panja kaftini hosil qiluvchi naysimon suyaklar; boshchalari orqali barmoqlarga ulanadi." },
      { id: "phalanges_proximal", nameUz: "Proksimal falangalar", nameLat: "Phalanges proximales", desc: "Barmoqlarning kaftga tutashgan eng uzun asosiy suyaklari." },
      { id: "phalanges_middle", nameUz: "O'rta falangalar", nameLat: "Phalanges mediae", desc: "II-V barmoqlarda mavjud oraliq suyaklar (bosh barmoqda bo'lmaydi)." },
      { id: "phalanges_distal", nameUz: "Distal (Tirnoq) falangalar", nameLat: "Phalanges distales", desc: "Tirnoq plastinkasiga tayanch bo'luvchi eng chekka sezuvchan suyakchalar." }
    ],
    functions: [
      "Nozik va yuqori aniqlikdagi motorikani (yozish, asboblarni ushlash, musiqa chalish) bajarish",
      "Katta kuch talab qiluvchi siqish va ushlash harakatlari",
      "Taktil (sezish) axborotlarini barmoq uchlari orqali qabul qilish"
    ],
    clinical: [
      "Karpal kanal sindromi - o'rta nervning (nervus medianus) kaft usti sohasida qisilib qolishi.",
      "Falangalar sinishlari va bo'g'im chiqishlari.",
      "Revmotoid artrit - barmoq mayda bo'g'imlarining deformatsiyasi."
    ],
    quiz: [
      {
        question: "Inson bosh barmog'ida (Pollex) nechta falanga suyagi mavjud?",
        options: ["1 ta", "2 ta (Proksimal va Distal)", "3 ta", "4 ta"],
        correct: 1,
        answerIndex: 1,
        explanation: "Bosh barmoqda faqat 2 ta falanga (proksimal va distal) bo'ladi, qolgan 4 ta barmoqda 3 tadan bo'ladi."
      }
    ]
  },

  // 9. NERV SISTEMASI / TO'LIQ TIZIM
  nervous_system: {
    id: "nervous_system",
    nameUz: "Nerv sistemasi (To'liq tizim)",
    nameLat: "Systema nervosum",
    nameEn: "Human Nervous System 3D",
    systemKey: "nervous",
    system: "Nerv sistemasi: Bosh miya, orqa miya va nervlar",
    category: "Tana faoliyatini muvofiqlashtiruvchi yaxlit tizim",
    bonesCount: "Markaziy va Periferik tizim",
    weight: "~2000 g",
    keywords: ["nerv sistemasi", "nerv tizimi", "asab tizimi", "orqa miya", "bosh miya", "nervlar", "nerv", "systema nervosum", "periferik nervlar", "refleks", "neyron"],
    description: "Inson yaxlit asab tizimining to'liq 3D modeli: Bosh miya, umurtqa kanali bo'ylab o'tuvchi Orqa miya (Medulla spinalis), 12 juft kalla nervlari, yelka, bel va dumg'aza asab chigallari hamda oyoq-qo'llarga tarqaluvchi yirik periferik nervlar tarmog'i.",
    parts: [
      { id: "brain_core", nameUz: "Bosh miya (Encephalon)", nameLat: "Encephalon", desc: "Miya yarimsharlari, po'stloq osti tugunlari va tahlil markazlari." },
      { id: "spinal_cord", nameUz: "Orqa miya (Medulla spinalis)", nameLat: "Medulla spinalis", desc: "Umurtqa kanali ichida yotuvchi, 31 segmentdan iborat reflektor va o'tkazuvchi markaz." },
      { id: "brachial_plexus", nameUz: "Yelka asab chigali", nameLat: "Plexus brachialis", desc: "Qo'l mushaklari va terisini innervatsiya qiluvchi radial, ulnar va median nervlar manbai." },
      { id: "sciatic_nerve", nameUz: "Quyumg'ich nervi (N. ischiadicus)", nameLat: "Nervus ischiadicus", desc: "Inson tanasidagi eng yo'g'on va uzun periferik nerv; butun oyoq bo'ylab tarqaladi." },
      { id: "autonomic_system", nameUz: "Simpatik va Parasimpatik nervlar", nameLat: "Systema nervosum autonomicum", desc: "Ichki a'zolar, yurak urishi va qon tomirlar tonusini avtomatik tartibga soluvchi tizim." }
    ],
    functions: [
      "Barcha to'qima va a'zolar faoliyatini bir butun qilib muvofiqlashtirish",
      "Tashqi muhit signallariga tezkor reflektor javob qaytarish",
      "Oliy asab faoliyati: tafakkur, xotira, his-tuyg'ular va xulq-atvorni shakllantirish"
    ],
    clinical: [
      "Radikulit va Ishias - orqa miya nerv ildizlarining disk churrasi tufayli qisilishi.",
      "Ko'p tarmoqli skleroz - markaziy nerv tolalari miyelin qobig'ining autoimmun yemirilishi."
    ],
    quiz: [
      {
        question: "Inson orqa miyasidan jami nechta juft orqa miya nervlari chiqadi?",
        options: ["12 juft", "24 juft", "31 juft", "40 juft"],
        correct: 2,
        answerIndex: 2,
        explanation: "Orqa miyadan 31 juft spinal nervlar (8 bo'yin, 12 ko'krak, 5 bel, 5 dumg'aza, 1 dum) chiqadi."
      }
    ]
  },

  // 10. QON AYLANISH SISTEMASI / TO'LIQ TIZIM
  circulatory_system: {
    id: "circulatory_system",
    nameUz: "Qon aylanish sistemasi (Yurak, Arteriyalar, Venalar)",
    nameLat: "Systema cardiovasculare",
    nameEn: "Circulatory & Cardiovascular System 3D",
    systemKey: "circulatory",
    system: "Qon aylanish sistemasi: Yurak, arteriyalar, venalar va kapillyarlar",
    category: "Gemodinamik vaskulyar tizim",
    bonesCount: "100 000 km qon tomirlari",
    weight: "~5 litr qon",
    keywords: ["qon aylanish sistemasi", "qon aylanish", "qon tomir", "arteriya", "vena", "kapillyar", "yurak", "aorta", "kovak vena", "qon tomirlari", "systema cardiovasculare"],
    description: "Yaxlit qon aylanish tizimining 3D modeli: markaziy urib turuvchi Yurak, kislorodga boy qon eltuvchi qizil Arteriyalar daraxti (Aorta, uyqu, o'mrov osti, son va tizza arteriyalari), karbonat angidridli qonni qaytaruvchi ko'k Venalar tarmog'i (Yuqori va pastki kovak venalar) hamda mikroskopik kapillyarlar to'ri.",
    parts: [
      { id: "heart_engine", nameUz: "Yurak nasosi", nameLat: "Cor", desc: "4 kamerali ritmik qisqaruvchi mushak organi; doimiy qon bosimini yaratadi." },
      { id: "arterial_tree", nameUz: "Arterial daraxt (Qizil)", nameLat: "Arteriae", desc: "Kislorod va glyukoza eltuvchi yuqori bosimli qalin elastik devorli tomirlar." },
      { id: "venous_network", nameUz: "Venoz tarmoq (Ko'k)", nameLat: "Venae", desc: "Qonni a'zolardan yurakka qaytaruvchi, ichki yarimoysimon klapanlarga ega tomirlar." },
      { id: "capillary_bed", nameUz: "Mikrosirkulyator kapillyarlar", nameLat: "Vasa capillaria", desc: "Moddalar va gazlar almashinuvi to'g'ridan-to'g'ri to'qima bilan yuz beradigan mikroskopik naychalar." }
    ],
    functions: [
      "Kislorodni o'pkalardan to'qimalarga va CO2 ni to'qimalardan o'pkalarga tashish",
      "Oziq moddalar, vitaminlar va gormonlarni barcha hujayralarga yetkazish",
      "Tana haroratini bir me'yorda saqlash (termoregulyatsiya) va immunitet himoyasi"
    ],
    clinical: [
      "Ateroskleroz - arteriya devorlarida xolesterin pilakchalari to'planishi.",
      "Gipertoniya - arterial qon bosimining surunkali ko'tarilishi.",
      "Varikoz - venalar klapanlarining bo'shashishi va qon dimlanishi."
    ],
    quiz: [
      {
        question: "Qonni yurakdan a'zolarga olib boruvchi tomirlar nima deb ataladi?",
        options: ["Venalar", "Arteriyalar", "Kapillyarlar", "Limfa tomirlari"],
        correct: 1,
        answerIndex: 1,
        explanation: "Qonni yurakdan a'zo va to'qimalarga olib boruvchi tomirlar arteriyalar deb ataladi."
      }
    ]
  },

  // 11. HIQILDOQ VA OVOZ BOYLAMLARI (LARYNX & PLICA VOCALIS)
  larynx_vocal_cords: {
    id: "larynx_vocal_cords",
    nameUz: "Hiqildoq va ovoz boylamlari",
    nameLat: "Larynx & Plica vocalis",
    nameEn: "Larynx & Vocal Cords 3D",
    systemKey: "respiratory",
    system: "Nafas olish sistemasi (Systema respiratorium)",
    category: "Ovoz va nafas o'tkazuvchi a'zo",
    bonesCount: "Tog'ayli a'zo (Til osti suyagi bilan)",
    weight: "~40 - 50 g",
    keywords: ["hiqildoq", "larynx", "ovoz boylami", "vocal cords", "qalqonsimon tog'ay", "uzuksimon tog'ay", "epiglottis", "cho'michoqsimon", "ovoz yorig'i"],
    description: "Hiqildoq va ovoz boylamlarining aniq anatomik 3D modeli: Qalqonsimon tog'ay (Adam olmasi), Uzuksimon tog'ay, Cho'michoqsimon tog'aylar, Hiqildoq usti tog'ayi (Epiglottis) hamda marvariddek oq elastik Haqiqiy Ovoz Boylamlari (Plica vocalis) va ovoz yorig'i (Rima glottidis).",
    parts: [
      { id: "thyroid_cartilage", nameUz: "Qalqonsimon tog'ay (Cartilago thyroidea)", nameLat: "Cartilago thyroidea", desc: "Hiqildoqning eng yirik tog'ayi, oldingi burchagida Adam olmasi (laryngeal prominence) joylashgan." },
      { id: "cricoid_cartilage", nameUz: "Uzuksimon tog'ay (Cartilago cricoidea)", nameLat: "Cartilago cricoidea", desc: "Traxeyaning ustida joylashgan poydevor uzuksimon tog'ay." },
      { id: "arytenoid_cartilage", nameUz: "Cho'michoqsimon tog'aylar (Cartilagines arytenoideae)", nameLat: "Cartilagines arytenoideae", desc: "Ovoz boylamlarini harakatlantiruvchi piramidasimon juft tog'aylar." },
      { id: "true_vocal_cords", nameUz: "Haqiqiy ovoz boylamlari (Plica vocalis)", nameLat: "Plica vocalis", desc: "Ovoz hosil qilishda tebranuvchi yaltiroq oq elastik tolalar." },
      { id: "epiglottis", nameUz: "Hiqildoq usti tog'ayi (Epiglottis)", nameLat: "Epiglottis", desc: "Yutish vaqtida hiqildoq kirishini yopib, ovqatning nafas yo'liga tushishidan himoyalovchi bargsimon klapan." }
    ],
    functions: [
      "Fonatsiya: Ovoz hosil qilish va nutq tovushlarini yaratish",
      "Nafas o'tkazish: O'pkaga toza havo oqimini yo'naltirish",
      "Himoya refleksi: Nafas yo'llariga begona jism tushishiga yo'l qo'ymaslik"
    ],
    clinical: [
      "Laringit - ovoz boylamlari yallig'lanishi va ovoz yo'qolishi (afoniya).",
      "Hiqildoq shishi (Krup sindromi) - stenoz va nafas qisishi."
    ],
    quiz: []
  },

  // 12. TRAXEYA VA BRONXLAR DARAXTI
  trachea_bronchi: {
    id: "trachea_bronchi",
    nameUz: "Traxeya va bronxlar daraxti",
    nameLat: "Trachea & Arbor bronchialis",
    nameEn: "Trachea & Bronchial Tree 3D",
    systemKey: "respiratory",
    system: "Nafas olish sistemasi (Systema respiratorium)",
    category: "Havo o'tkazuvchi nafas yo'llari",
    bonesCount: "16-20 ta gialin tog'ay yarimhalqasi",
    weight: "~120 g",
    keywords: ["traxeya", "kengirdak", "bronx", "bronxial daraxt", "carina", "bronchus", "lobar bronx", "segmentar bronx"],
    description: "Traxeya (Kengirdak) va bronxlar daraxtining 3D modeli: 16-20 ta C-simon tog'ay halqalar, Karina bifurkatsiyasi, O'ng va chap bosh bronxlar, 5 ta bo'lak bronxlari hamda 18-20 ta segmentar bronxlar shoxlanishi.",
    parts: [
      { id: "trachea_rings", nameUz: "Kengirdak tog'ay yarimhalqalari", nameLat: "Cartilagines tracheales", desc: "Nafas yo'li doimo ochiq turishini ta'minlovchi C-simon gialin tog'aylar." },
      { id: "carina", nameUz: "Traxeya karinasi (Bifurkatsiya)", nameLat: "Carina tracheae", desc: "Kengirdakning o'ng va chap bosh bronxlarga ajralish chegarasi." },
      { id: "main_bronchi", nameUz: "Bosh bronxlar (O'ng va chap)", nameLat: "Bronchi principales", desc: "O'pka darvozasiga kiruvchi asosiy havo magistrallari." },
      { id: "bronchial_tree", nameUz: "Segmentar bronxial daraxt", nameLat: "Arbor bronchialis", desc: "O'pkaning har bir segmentiga kislorod yetkazuvchi shoxlanuvchi kanallar." }
    ],
    functions: [
      "Atmosfera havosini o'pka alveolalariga to'siqsiz o'tkazish",
      "Xillpillovchi epiteliy orqali chang va mikroblarni chiqarib yuborish"
    ],
    clinical: [
      "Traxeit va o'tkir bronxit - nafas naylarining shilliq yallig'lanishi.",
      "Begona jism aspiratsiyasi - ko'pincha vertikalroq bo'lgan o'ng bosh bronxga tushishi."
    ],
    quiz: []
  },

  // 13. QIZILO'NGACH VA HALQUM
  esophagus_pharynx: {
    id: "esophagus_pharynx",
    nameUz: "Qizilo'ngach va halqum",
    nameLat: "Esophagus & Pharynx",
    nameEn: "Esophagus & Pharynx 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Hazm trakti o'tkazuvchi bo'limi",
    bonesCount: "Mushakli nay",
    weight: "~160 g",
    keywords: ["qizilongach", "halqum", "esophagus", "pharynx", "yutish", "sfinkter", "peristaltika"],
    description: "Halqum (burun-halqum, og'iz-halqum, hiqildoq-halqum konstriktor mushaklari) va 25 sm uzunlikdagi Qizilo'ngachning yuqori hamda pastki kardial sfinkterlari bilan 3D anatomik modeli.",
    parts: [
      { id: "pharynx_constrictors", nameUz: "Halqum konstriktor mushaklari", nameLat: "Musculi constrictores pharyngis", desc: "Ovqat luqmasini qizilo'ngachga siqib kirituvchi halqa mushaklar." },
      { id: "ues", nameUz: "Yuqori qizilo'ngach sfinkteri", nameLat: "Sphincter esophagi superior", desc: "Krikofaringeal mushak klapani." },
      { id: "esophagus_body", nameUz: "Qizilo'ngach tanasi", nameLat: "Corpus esophagi", desc: "Ko'krak bo'shlig'i orqali peristaltik to'lqinlar bilan ovqatni oshqozonga yetkazuvchi nay." },
      { id: "les", nameUz: "Pastki qizilo'ngach sfinkteri (Kardial klapan)", nameLat: "Sphincter esophagi inferior", desc: "Oshqozon kislotasi qaytib chiqishiga to'sqinlik qiluvchi Z-chiziq sfinkteri." }
    ],
    functions: ["Ovqat luqmasini yutish va oshqozonga peristaltik yetkazish"],
    clinical: ["Gastroezofageal reflyuks kasalligi (GERD) - kislota chiqishi va jig'ildon qaynashi."],
    quiz: []
  },

  // 14. SO'LAK BEZLARI
  salivary_glands: {
    id: "salivary_glands",
    nameUz: "So'lak bezlari",
    nameLat: "Glandulae salivariae",
    nameEn: "Salivary Glands 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Hazm shiralari bezlari",
    bonesCount: "0 ta suyak (Pastki jag' suyagi chegarasida)",
    weight: "~60 g",
    keywords: ["solak bezlari", "so'lak", "parotis", "submandibularis", "sublingualis", "stensen", "wharton", "amilaza"],
    description: "Insonning 3 juft yirik so'lak bezlari: Quloqoldi bezi (Glandula parotidea) va Stensen yo'li, Jag'osti bezi (Glandula submandibularis) va Uorton yo'li, Tilosti bezi (Glandula sublingualis) 3D modeli.",
    parts: [
      { id: "parotid_gland", nameUz: "Quloqoldi so'lak bezi", nameLat: "Glandula parotidea", desc: "Eng yirik so'lak bezi, quloq suprasi oldida joylashgan." },
      { id: "stensen_duct", nameUz: "Stensen (Quloqoldi) yo'li", nameLat: "Ductus parotideus", desc: "Chaynash mushagi ustidan o'tib, yuqori 2-katta oziq tish qarshisiga ochiluvchi yo'l." },
      { id: "submandibular_gland", nameUz: "Jag'osti so'lak bezi", nameLat: "Glandula submandibularis", desc: "Pastki jag' burchagi ostida joylashgan yong'oqdek bez." },
      { id: "sublingual_gland", nameUz: "Tilosti so'lak bezi", nameLat: "Glandula sublingualis", desc: "Til osti shilliq qavati ostida joylashgan bodomsimon bez." }
    ],
    functions: ["So'lak ajratish, amilaza fermenti bilan uglevodlarni parchalash, luqmani namlash"],
    clinical: ["Parotit (Tepki) - quloqoldi bezining virusli yallig'lanishi.", "Sialolitiaz - so'lak yo'llarida tosh paydo bo'lishi."],
    quiz: []
  },

  // 15. INGICHKA ICHAK
  small_intestine: {
    id: "small_intestine",
    nameUz: "Ingichka ichak",
    nameLat: "Intestinum tenue",
    nameEn: "Small Intestine 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Oziq moddalarni so'rish a'zosi",
    bonesCount: "Ichak qovuzloqlari",
    weight: "~1.5 kg",
    keywords: ["ingichka ichak", "intestinum tenue", "duodenum", "jejunum", "ileum", "och ichak", "yonbosh ichak", "tutqich", "vorsinkalar"],
    description: "Ingichka ichakning 3D anatomik modeli: O'n ikki barmoqli ichak (Duodenum), Och ichak (Jejunum), Yonbosh ichak (Ileum) qovuzloqlari hamda ularni qon bilan ta'minlovchi tutqich qon tomir kamarlari (Mesenteric arcades).",
    parts: [
      { id: "duodenum_part", nameUz: "O'n ikki barmoqli ichak", nameLat: "Duodenum", desc: "Oshqozondan chiqqan ximus o't suyuqligi va me'da osti bezi fermentlari bilan aralashadigan C-simon bo'lim." },
      { id: "jejunum_part", nameUz: "Och ichak", nameLat: "Jejunum", desc: "Qon tomirlarga boy, qalin devorli, oziq moddalarni faol so'ruvchi qovuzloqlar." },
      { id: "ileum_part", nameUz: "Yonbosh ichak", nameLat: "Ileum", desc: "Ingichka ichakning oxirgi bo'limi, Baugin klapani orqali ko'r ichakka quyiladi." },
      { id: "mesentery", nameUz: "Ichak tutqichi va qon tomir kamarlari", nameLat: "Mesenterium & Vasa recta", desc: "Ichak qovuzloqlarini qorin orqa devoriga tutashtiruvchi va qon bilan ta'minlovchi tomirlar tarmog'i." }
    ],
    functions: ["Oqsillar, yog'lar va uglevodlarni yakuniy parchalash hamda vorsinkalar orqali qonga so'rish"],
    clinical: ["Enterit - ingichka ichak shilliq qavati yallig'lanishi.", "Ichak tutilishi (Ileus)."],
    quiz: []
  },

  // 16. YO'G'ON ICHAK VA APPENDIKS
  large_intestine: {
    id: "large_intestine",
    nameUz: "Yo'g'on ichak va appendiks",
    nameLat: "Intestinum crassum & Appendix",
    nameEn: "Large Intestine & Appendix 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish sistemasi (Systema digestorium)",
    category: "Suv so'rish va najas shakllantirish",
    bonesCount: "Xarakterli gaustralar va teniyalar",
    weight: "~1.2 kg",
    keywords: ["yo'g'on ichak", "appendiks", "ko'r ichak", "chambar ichak", "to'g'ri ichak", "colon", "cecum", "appendix", "haustra", "taenia"],
    description: "Yo'g'on ichakning to'liq 3D modeli: Ko'r ichak (Cecum) va Chuvalchangsimon o'simta (Appendiks), Ko'tariluvchi, Ko'ndalang, Tushuvchi, Sigmasimon chambar ichak va To'g'ri ichak; gaustralar (bo'rtiqlar) va 3 ta bo'ylama mushak tasmasi (Taenia coli).",
    parts: [
      { id: "cecum_organ", nameUz: "Ko'r ichak", nameLat: "Caecum", desc: "O'ng yonbosh chuqurchasida joylashgan yo'g'on ichakning boshlang'ich xaltasimon kengaymasi." },
      { id: "appendix_organ", nameUz: "Chuvalchangsimon o'simta (Appendiks)", nameLat: "Appendix vermiformis", desc: "Ko'r ichakdan chiquvchi, limfoid to'qimaga boy immun a'zo." },
      { id: "colon_segments", nameUz: "Chambar ichak (Ko'tariluvchi, Ko'ndalang, Tushuvchi, Sigmasimon)", nameLat: "Colon", desc: "Qorin bo'shlig'ini to'rtburchak kabi o'rab turuvchi gaustralli yo'g'on ichak bo'limlari." },
      { id: "rectum_organ", nameUz: "To'g'ri ichak", nameLat: "Rectum", desc: "Kichik chanoqda joylashgan najas to'planuvchi va chiqaruvchi oxirgi qism." },
      { id: "taenia_coli", nameUz: "Ichak lentalari (Teniyalar)", nameLat: "Taeniae coli", desc: "Yo'g'on ichak bo'ylab o'tuvchi 3 ta bo'ylama silliq mushak lentalari." }
    ],
    functions: ["Suv va elektrolitlarni qayta so'rish, axlat massalarini shakllantirish, vitaminlar (K, B) sintezi"],
    clinical: ["O'tkir appenditsit - zudlik bilan jarrohlik talab etuvchi yallig'lanish.", "Kolit va divertikuloz."],
    quiz: []
  },

  // 17. KO'Z OLMASI ICHKI QATLAMLARI
  eye_layers: {
    id: "eye_layers",
    nameUz: "Ko'z olmasi ichki qatlamlari",
    nameLat: "Bulbus oculi & Tunicae oculi",
    nameEn: "Internal Layers of the Eye 3D",
    systemKey: "sensory",
    system: "Sezgi a'zolari (Organa sensuum)",
    category: "Ko'rish analizatori qatlamlari",
    bonesCount: "Parda va optik muhitlar",
    weight: "~7 - 8 g",
    keywords: ["ko'z", "shox parda", "oq parda", "to'r parda", "retina", "gavhar", "shishasimon tana", "qorachiq", "uvea", "xorioidea"],
    description: "Ko'z olmasining sagittal kesimdagi ichki qatlamlari 3D modeli: Oq parda (Sclera), Shox parda (Cornea), Tomirli parda (Chorioidea), Kipriksimon tana va belbog', Rangdor parda (Iris), Billur gavhar (Lens), To'r parda (Retina, sariq dog' va tomirlar) hamda Ko'rish nervi.",
    parts: [
      { id: "sclera_cornea", nameUz: "Tashqi tolali qobiq: Sklera va Kornea", nameLat: "Tunica fibrosa bulbi", desc: "Orqa 5/6 oq sklera va oldingi 1/6 tiniq shaffof shox parda." },
      { id: "choroid_ciliary", nameUz: "O'rta tomirli qobiq: Xorioidea va Kipriksimon tana", nameLat: "Uvea & Corpus ciliare", desc: "Ko'zni oziqlantiruvchi qon tomirlar va gavharni ushlab turuvchi Zinn boylamlari." },
      { id: "crystalline_lens", nameUz: "Billur gavhar", nameLat: "Lens crystallina", desc: "Ikki tomoni qavariq, yorug'likni sindiruvchi tirik shaffof linza." },
      { id: "retina_layer", nameUz: "Ichki to'r parda", nameLat: "Retina", desc: "Fotoretseptorlar (tayoqcha va kolbachalar) joylashgan, yorug'likni nerv impulsiga aylantiruvchi qatlam." },
      { id: "optic_nerve", nameUz: "Ko'rish nervi (II juft)", nameLat: "Nervus opticus", desc: "Ko'rish signallarini miyaning ensa po'stlog'iga uzatuvchi qalin nerv tutami." }
    ],
    functions: ["Yorug'likni sindirish, fokuslash va ko'rish signallarini miyaga uzatish"],
    clinical: ["Katarakta - gavharning xiralashishi.", "Glaukoma - ko'z ichi bosimi oshishi va ko'rish nervi atrofiyasi."],
    quiz: []
  },

  // 12. OVQAT HAZM QILISH SISTEMASI / TO'LIQ TIZIM
  digestive_system: {
    id: "digestive_system",
    nameUz: "Ovqat hazm qilish sistemasi (To'liq trakt)",
    nameLat: "Systema digestorium",
    nameEn: "Digestive System Complete 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish: Og‘iz, qizilo‘ngach, oshqozon, ichaklar, jigar va oshqozon osti bezi",
    category: "Hazm va oziqlanish trakti",
    bonesCount: "8-9 metr uzunlikdagi trakt",
    weight: "~3500 g a'zolar",
    keywords: ["ovqat hazm qilish sistemasi", "ovqat hazm", "hazm", "qizilo'ngach", "qizilongach", "oshqozon", "ichaklar", "ingichka ichak", "yog'on ichak", "jigar", "oshqozon osti bezi", "systema digestorium", "esophagus", "gaster"],
    description: "Ovqat hazm qilish traktining yaxlit 3D modeli: Og'iz bo'shlig'i, mushakli Qizilo'ngach (Esophagus), J-shaklli Oshqozon, eng yirik filtr a'zosi Jigar va O't pufagi, Oshqozon osti bezi, oziq so'ruvchi Ingichka ichak hamda Yo'g'on ichak.",
    parts: [
      { id: "esophagus_tube", nameUz: "Qizilo'ngach (Esophagus)", nameLat: "Esophagus", desc: "Ovqat luqmasini halqumdan oshqozonga peristaltik to'lqinlar orqali yetkazuvchi mushakli nay (25 sm)." },
      { id: "stomach_chamber", nameUz: "Oshqozon (Gaster)", nameLat: "Gaster", desc: "Xlorid kislotasi va fermentlar yordamida ovqatni kimyoviy hamda mexanik suyuq bo'tqaga aylantiradi." },
      { id: "liver_gallbladder", nameUz: "Jigar va O't pufagi", nameLat: "Hepar & Vesica biliaris", desc: "O't ishlab chiqaruvchi eng yirik laboratoriya va organizmning asosiy detoksikatori." },
      { id: "pancreas_gland", nameUz: "Oshqozon osti bezi", nameLat: "Pancreas", desc: "Oqsillar, yog'lar va uglevodlarni parchalovchi eng qudratli hazm fermentlarini beradi." },
      { id: "small_intestine", nameUz: "Ingichka ichak (Enteron)", nameLat: "Intestinum tenue", desc: "12 barmoqli, och va yonbosh ichaklar; oziq moddalar vorsinkalar orqali to'liq qonga so'riladi (5-6 metr)." },
      { id: "large_intestine", nameUz: "Yo'g'on ichak (Colon)", nameLat: "Intestinum crassum", desc: "Ko'r ichak (appendiks bilan), chambar ichak va to'g'ri ichak; suvni qayta so'radi va najasni shakllantiradi." }
    ],
    functions: [
      "Ovqatni mexanik maydalash va kimyoviy fermentativ parchalash",
      "Oziq moddalar, aminokislotalar, glyukoza va vitaminlarni qonga so'rish",
      "Zaharli metabolitlarni jigarda zararsizlantirish va qoldiqlarni chiqarish"
    ],
    clinical: [
      "Appenditsit - ko'r ichak chuvalchangsimon o'simtasining o'tkir yallig'lanishi.",
      "Gastrit va Oshqozon yarasi kasalligi.",
      "Kolit va Enterit - ichak shilliq qavati yallig'lanishi."
    ],
    quiz: [
      {
        question: "Inson hazm traktida oziq moddalarning qonga asosiy so'rilishi qaysi bo'limda yuz beradi?",
        options: ["Oshqozonda", "Ingichka ichakda (Intestinum tenue)", "Yo'g'on ichakda", "Qizilo'ngachda"],
        correct: 1,
        answerIndex: 1,
        explanation: "Ingichka ichakdagi millionlab vorsinkalar (villi) orqali hazm bo'lgan ozuqalar to'liq qonga so'riladi."
      }
    ]
  },

  // 13. TAYANCH-HARAKAT SISTEMASI / INSON SKELETI
  musculoskeletal_system: {
    id: "musculoskeletal_system",
    nameUz: "Tayanch-harakat a'zolari: Inson skeleti (To'liq karkas)",
    nameLat: "Systema skeletale humanum",
    nameEn: "Human Skeleton 3D",
    systemKey: "musculoskeletal",
    system: "Tayanch-harakat a’zolari: Suyaklar, bo‘g‘imlar va skelet karkasi",
    category: "Lokomotor osteologik tizim",
    bonesCount: "206 ta suyak",
    weight: "~14-20% tana vazni (suyak massasi)",
    keywords: ["tayanch-harakat a'zolari", "tayanch harakat", "tayanch", "harakat", "suyaklar", "bogimlar", "bo'g'imlar", "skelet", "skalet", "inson skeleti", "systema skeletale", "skeleton", "bones"],
    description: "Inson skeletining to'liq haqiqiy 3D anatomik modeli: 206 ta mustahkam suyakdan iborat tabiiy karkas. Kalla suyagi, umurtqa pog'onasi (bo'yin, ko'krak va bel umurtqalari), 12 juft qovurg'a va to'sh suyagi, yelka va qo'l suyaklari (barcha bilakuzuk, kaft va barmoq falangalari bilan), tos suyagi hamda oyoq va tovon suyaklarini to'liq o'z ichiga oladi.",
    parts: [
      { id: "axial_skeleton", nameUz: "Aksial skelet", nameLat: "Skeleton axiale", desc: "Kalla suyagi, umurtqa pog'onasi (33-34 ta umurtqa), 12 juft qovurg'a va to'sh suyagi; ichki a'zolarni himoyalovchi karkas." },
      { id: "appendicular_skeleton", nameUz: "Qo'shimcha skelet", nameLat: "Skeleton appendiculare", desc: "Qo'l va oyoq kamarlari, yelka, bilak, kaft va barmoq suyaklari hamda son, boldir va tovon suyaklari." },
      { id: "hand_skeleton", nameUz: "Kaft va barmoqlar skeleti", nameLat: "Ossa manus & Digiti", desc: "8 ta bilakuzuk (carpus), 5 ta kaft (metacarpus) va 14 ta barmoq falangalari (proksimal, o'rta, distal)." },
      { id: "joints_cartilage", nameUz: "Bo'g'imlar va qovurg'a tog'aylari", nameLat: "Juncturae & Cartilagines", desc: "Qovurg'a tog'aylari, umurtqalararo disklar va yirik harakatchan sinovial bo'g'imlar." }
    ],
    functions: [
      "Gavdaga mustahkam shakl berish va vertikal tayanchni ta'minlash",
      "Bosh miya, yurak, o'pka va orqa miyani mexanik shikastlanishlardan ishonchli himoya qilish",
      "Fazoda erkin harakatlanish imkoniyatini yaratish (bo'g'imlar vositasida)",
      "Mineral moddalar (kaltsiy, fosfor) deposi va suyak ko'migida qon hujayralarini yaratish (gemopoez)"
    ],
    clinical: [
      "Osteoporoz - suyak to'qimasi zichligining pasayishi va mo'rtlashishi.",
      "Skolioz va lordoz - umurtqa pog'onasining g'ayritabiiy qiyshayishi.",
      "Artroz va Artrit - bo'g'im tog'aylarining yemirilishi va yallig'lanishi."
    ],
    quiz: [
      {
        question: "Voyaga yetgan inson skeleti o'rtacha nechta suyakdan tashkil topgan?",
        options: ["150 ta", "206 ta", "250 ta", "300 ta"],
        correct: 1,
        answerIndex: 1,
        explanation: "Voyaga yetgan odam skeletida o'rtacha 206 ta suyak bo'ladi (chaqaloqlarda 270 dan ortiq bo'lib, keyinchalik birikib ketadi)."
      }
    ]
  },

  // 14. SIYDIK CHIQARISH SISTEMASI / TO'LIQ TIZIM
  urinary_system: {
    id: "urinary_system",
    nameUz: "Siydik chiqarish sistemasi (Buyraklar, Siydik yo'llari, Pufak)",
    nameLat: "Systema urinarium",
    nameEn: "Urinary System 3D",
    systemKey: "urinary",
    system: "Siydik chiqarish sistemasi: Buyraklar, siydik yo‘llari va siydik pufagi",
    category: "Ekskretor suyuqlik balansi",
    bonesCount: "0 ta suyak",
    weight: "~350 g",
    keywords: ["siydik chiqarish sistemasi", "siydik chiqarish", "siydik", "buyraklar", "buyrak", "siydik yollari", "siydik yo'llari", "siydik pufagi", "qovuq", "nefron", "ureter", "uretra", "systema urinarium"],
    description: "Siydik ayirish tizimining to'liq 3D modeli: qonni filtrlovchi juft loviyasimon Buyraklar (Ren), buyrak usti bezlari, buyrak jomlaridan boshlanuvchi Siydik naylari (Ureter - o'ng va chap), elastik mushakli Siydik pufagi (qovuq - Vesica urinaria) va chiqaruvchi Uretra.",
    parts: [
      { id: "kidneys_pair", nameUz: "Juft buyraklar (Ren dexter & sinister)", nameLat: "Renes", desc: "Har birida 1 milliondan ortiq nefronlar qonni doimiy filtrlab ikkilamchi siydik hosil qiladi." },
      { id: "ureters_pair", nameUz: "Siydik yo'llari (Ureterlar)", nameLat: "Ureter dexter et sinister", desc: "Siydikni buyrak jomidan qovuqqa uzluksiz haydovchi silliq mushakli naychalar (25-30 sm)." },
      { id: "urinary_bladder", nameUz: "Siydik pufagi (Qovuq)", nameLat: "Vesica urinaria", desc: "Detruzor mushagiga ega, 500-700 ml siydik to'play oluvchi rezervuar a'zo." },
      { id: "urethra_tube", nameUz: "Siydik chiqarish kanali (Uretra)", nameLat: "Urethra", desc: "Siydikni organizmdan tashqariga chiqaruvchi sfinkterli yo'l." }
    ],
    functions: [
      "Qon plazmasini metabolizm qoldiqlari (mochevina, kreatinin, siydik kislotasi)dan tozalash",
      "Organizmda suv-tuz, elektrolit va kislota-ishqor (pH) muvozanatini saqlash",
      "Renin va eritropoetin gormonlarini ishlab chiqarish orqali qon bosimi va eritrotsitlar sintezini nazorat qilish"
    ],
    clinical: [
      "Piyelonefrit - buyrak jomi va buyrak to'qimalarining bakterial yallig'lanishi.",
      "Sistit - siydik pufagi (qovuq) devorining o'tkir shamollashi.",
      "Urolitiaz - buyrak va siydik yo'llarida tosh hosil bo'lishi."
    ],
    quiz: [
      {
        question: "Buyraklarda hosil bo'lgan ikkilamchi siydik qovuqqa qaysi a'zo orqali oqib boradi?",
        options: ["Uretra", "Siydik yo'li (Ureter)", "Buyrak arteriyasi", "Kovak vena"],
        correct: 1,
        answerIndex: 1,
        explanation: "Siydik yo'li (Ureter) buyrak jomini siydik pufagi bilan bog'lovchi naydir."
      }
    ]
  },

  // 15. ENDOKRIN SISTEMA / TO'LIQ TIZIM
  endocrine_system: {
    id: "endocrine_system",
    nameUz: "Endokrin sistema (Ichki sekretsiya bezlari)",
    nameLat: "Systema endocrinum",
    nameEn: "Endocrine System 3D",
    systemKey: "endocrine",
    system: "Endokrin sistema: Ichki sekretsiya bezlari va gormonal regulyatsiya",
    category: "Gumoral boshqaruv tizimi",
    bonesCount: "0 ta suyak",
    weight: "~100 g barcha bezlar",
    keywords: ["endokrin sistema", "endokrin", "ichki sekretsiya", "gipofiz", "qalqonsimon bez", "buyrak usti bezi", "gormon", "gormonlar", "qalqonsimon", "systema endocrinum", "thyroid", "adrenal"],
    description: "Inson endokrin tizimining to'liq 3D modeli: Bosh miya asosidagi boshqaruvchi Gipofiz va Epifiz bezlari, bo'yindagi kapalaksimon Qalqonsimon bez (Glandula thyroidea), ko'krak qafasidagi Timus, buyraklar tepasidagi Buyrak usti bezlari (Glandulae suprarenales) va oshqozon osti bezi orolchalari.",
    parts: [
      { id: "pituitary_gland", nameUz: "Gipofiz bezi (Hypophysis)", nameLat: "Hypophysis", desc: "Bosh miya turk egarchasida joylashgan boshqaruvchi bosh bez; o'sish gormoni va trop gormonlar ajratadi." },
      { id: "thyroid_gland", nameUz: "Qalqonsimon bez", nameLat: "Glandula thyroidea", desc: "Bo'yinda traxeya oldida yotuvchi kapalaksimon bez; tiroksin (T4) va triyodtironin (T3) orqali asosiy moddalar almashinuvini tezlashtiradi." },
      { id: "parathyroid_glands", nameUz: "Qalqonoldi bezlari", nameLat: "Glandulae parathyroideae", desc: "Qonda kaltsiy va fosfor darajasini paratgormon orqali qat'iy nazorat qiluvchi 4 ta mayda bez." },
      { id: "adrenal_glands", nameUz: "Buyrak usti bezlari", nameLat: "Glandulae suprarenales", desc: "Po'stloq qavatida kortizol va aldosteron, mag'zida adrenalin va noradrenalin (stress gormonlari) ishlab chiqaradi." },
      { id: "thymus_gland", nameUz: "Ayrisimon bez (Timus)", nameLat: "Thymus", desc: "Immunitet hujayralari (T-limfotsitlar) pishib yetiladigan muhim immunitet-endokrin bezi." }
    ],
    functions: [
      "Organizmda moddalar almashinuvi (metabolizm) tezligini muvozanatlash",
      "Jismoniy va aqliy o'sish, balog'atga yetish va reproduktiv funksiyalarni ta'minlash",
      "Stress va tashqi xavflarga qarshi tezkor moslashuv (adrenalin/kortizol) reaksiyasini yoqish"
    ],
    clinical: [
      "Bazedov kasalligi (Gipertireoz) - qalqonsimon bez gormonlarining ortiqcha ajralishi.",
      "Gipotireoz va endemik bo'qoq - yod yetishmovchiligi oqibatida gormonlar tanqisligi.",
      "Gipofizar gigantizm yoki pakanalik - o'sish gormoni (somatotrop) anomaliyalari."
    ],
    quiz: [
      {
        question: "Qalqonsimon bez gormonlari (T3 va T4) sintezi uchun qaysi mikroelement hayotiy zarur?",
        options: ["Temir", "Yod (Iodum)", "Sink", "Mis"],
        correct: 1,
        answerIndex: 1,
        explanation: "Yod mikroelementi tiroksin va triyodtironin gormonlari tarkibiga kiruvchi asosiy elementdir."
      }
    ]
  },

  // 16. O'PKA (YAKKA MODEL)
  lung: {
    id: "lung",
    nameUz: "O'pkalar",
    nameLat: "Pulmones",
    nameEn: "Human Lungs 3D",
    systemKey: "respiratory",
    system: "Nafas olish tizimi (Systema respiratorium)",
    category: "Gaz almashinuv organi",
    bonesCount: "0 ta suyak",
    weight: "~1000 - 1200 g",
    keywords: ["o'pka", "opka", "lung", "pulmones", "o'pkalar", "bronx", "alveola", "nafas", "o'ng o'pka", "chap o'pka"],
    description: "Inson o'pkalarining batafsil 3D modeli: 3 bo'lakli o'ng o'pka, 2 bo'lakli chap o'pka, kengirdak, bosh bronxlar va alveolyar gaz almashinuv sathi.",
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
        correct: 1,
        answerIndex: 1,
        explanation: "Chap o'pka yurak joylashuvi sababli 2 bo'lakdan iborat."
      }
    ]
  },

  // 17. OSHQOZON (YAKKA MODEL)
  stomach: {
    id: "stomach",
    nameUz: "Oshqozon",
    nameLat: "Gaster",
    nameEn: "Human Stomach 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish tizimi (Systema digestorium)",
    category: "Qorin bo'shlig'i a'zosi",
    bonesCount: "0 ta suyak",
    weight: "~150 - 200 g",
    keywords: ["oshqozon", "me'da", "meda", "stomach", "gaster", "gastrit", "hazm", "xlorid kislota", "pepsin"],
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
        correct: 0,
        answerIndex: 0,
        explanation: "Xlorid kislotasi (HCl) oqsillarni parchalash va mikroblarni o'ldirishda asosiy vositadir."
      }
    ]
  },

  // 18. JIGAR (YAKKA MODEL)
  liver: {
    id: "liver",
    nameUz: "Jigar",
    nameLat: "Hepar",
    nameEn: "Human Liver 3D",
    systemKey: "digestive",
    system: "Ovqat hazm qilish va moddalar almashinuvi",
    category: "Eng yirik bez",
    bonesCount: "0 ta suyak",
    weight: "~1400 - 1600 g",
    keywords: ["jigar", "liver", "hepar", "safro", "detoks", "gepatit", "hazm", "o't pufagi"],
    description: "Inson jigarining 3D modeli: o'ng va chap bo'laklar, darvoza venasi tizimi, o't pufagi va jigarning detoksikatsiya mikro-anatomiyasi.",
    parts: [
      { id: "lobes_liver", nameUz: "O'ng va chap bo'laklar", nameLat: "Lobus dexter et sinister", desc: "O'roqsimon boylam orqali ajralgan asosiy jigar massasi." },
      { id: "gallbladder_site", nameUz: "O't pufagi o'rni", nameLat: "Vesica biliaris", desc: "Jigar ishlab chiqargan o't suyuqligini to'plovchi rezervuar." }
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
        correct: 1,
        answerIndex: 1,
        explanation: "Jigar (Hepar) inson tanasidagi eng yirik bez bo'lib, o'rtacha 1.5 kg tosh bosadi."
      }
    ]
  },

  // 19. BUYRAK (YAKKA MODEL)
  kidney: {
    id: "kidney",
    nameUz: "Buyrak",
    nameLat: "Ren",
    nameEn: "Human Kidney 3D",
    systemKey: "urinary",
    system: "Siydik ayirish tizimi (Systema urinarium)",
    category: "Ekskretor a'zo",
    bonesCount: "0 ta suyak",
    weight: "~130 - 160 g",
    keywords: ["buyrak", "kidney", "ren", "siydik", "nefron", "siydik ayirish", "filtr", "glomerula"],
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
        correct: 1,
        answerIndex: 1,
        explanation: "Nefron (Nephron) buyrakning qon filtrlovchi asosiy mikroskopik birligidir."
      }
    ]
  },

  // 20. UMURTQA POG'ONASI (YAKKA MODEL)
  spine: {
    id: "spine",
    nameUz: "Umurtqa pog'onasi",
    nameLat: "Columna vertebralis",
    nameEn: "Human Spine 3D",
    systemKey: "musculoskeletal",
    system: "Skelet tizimi (Systema skeletale)",
    category: "Aksial skelet o'qi",
    bonesCount: "32-34 ta umurtqa",
    weight: "~1800 - 2000 g",
    keywords: ["umurtqa", "spine", "columna vertebralis", "bel", "boyin", "kokrak", "umurtqa pogonasi", "disk", "orqa miya"],
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
        correct: 1,
        answerIndex: 1,
        explanation: "Barcha sutemizuvchilarda 7 ta bo'yin umurtqasi mavjud."
      }
    ]
  }
};
