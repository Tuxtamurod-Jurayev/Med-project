export const ANATOMY_DATA = {
  head_neck: {
    id: "head_neck",
    nameUz: "Bosh va bo'yin anatomiyasi",
    nameLat: "Caput et Collum",
    nameEn: "Head & Neck Anatomy",
    system: "Skelet, mushak va tomir tizimi",
    category: "Bosh va bo'yin sohalari",
    bonesCount: "22 ta suyak + mushaklar",
    weight: "~4.5 - 5 kg",
    description: "Bosh va bo'yin sohasi inson tanasining eng murakkab anatomik qismi bo'lib, bosh suyagi, yuz va chaynash mushaklari, qon tomirlari (uyqu arteriyalari, bo'yinturuq venalari) hamda kranial nervlarni o'z ichiga oladi.",
    parts: [
      {
        id: "facial_muscles",
        nameUz: "Mimika va chaynash mushaklari",
        nameLat: "Musculi faciales et masticatorii",
        desc: "Yuz mimikasini ta'minlovchi teri osti mushaklari va og'izni ochib-yopuvchi chaynash (chakka, o'z chaynash) mushaklari."
      },
      {
        id: "neck_muscles",
        nameUz: "To'sh-o'mrov-so'rg'ichsimon mushak",
        nameLat: "M. sternocleidomastoideus",
        desc: "Bo'yinning eng yirik mushagi. Boshni burish, yonboshga egish va nafas olishda yordamchi vazifani bajaradi."
      },
      {
        id: "carotid_artery",
        nameUz: "Umumiy uyqu arteriyasi",
        nameLat: "Arteria carotis communis",
        desc: "Bosh miya va yuz sohasini arterial kislorodli qon bilan ta'minlovchi eng yirik magistral tomir."
      },
      {
        id: "cranium_base",
        nameUz: "Kalla asosi va yuz skeleti",
        nameLat: "Basis cranii et Viscerocranium",
        desc: "Ko'z kosasi, burun bo'shlig'i, yuqori va pastki jag' suyaklaridan tashkil topgan suyak karkasi."
      }
    ],
    functions: [
      "Bosh miya va ko'rish, eshitish, ta'm bilish a'zolarini himoya qilish",
      "Nutq, mimika va hissiyotlarni namoyon qilish",
      "Chaynash, yutish va birlamchi nafas olish harakatlari",
      "Boshni fazoda muvozanatda tutish va erkin burish"
    ],
    clinical: [
      "Yuz nervi nevriti (Bell falaji) - yuz mimika mushaklarining bir tomonlama falajlanishi.",
      "Uyqu arteriyasi stenozi - insultga (bosh miya ishemiyasiga) olib keluvchi aterosklerotik to'siq.",
      "Krivosheya (qiyshiq bo'yin) - to'sh-o'mrov-so'rg'ichsimon mushakning tug'ma yoki orttirilgan qisqarishi."
    ],
    quiz: [
      {
        question: "Bo'yindagi eng yirik va boshni buruvchi asosiy mushak qaysi?",
        options: ["M. trapezius", "M. sternocleidomastoideus", "M. platysma", "M. scalenus"],
        answerIndex: 1,
        explanation: "To'sh-o'mrov-so'rg'ichsimon mushak (M. sternocleidomastoideus) bo'yinning asosiy qavariq mushagi bo'lib, boshni qarama-qarshi tomonga buradi."
      },
      {
        question: "Bosh miyani qon bilan ta'minlovchi asosiy arteriya qaysi?",
        options: ["Arteria subclavia", "Arteria carotis interna", "Arteria facialis", "Arteria temporalis"],
        answerIndex: 1,
        explanation: "Ichki uyqu arteriyasi (Arteria carotis interna) umumiy uyqu arteriyasidan ajralib, bosh miya katta qismini qon bilan ta'minlaydi."
      },
      {
        question: "Mimika mushaklarini qaysi kranial nerv innervatsiya qiladi?",
        options: ["Uch shoxli nerv (V)", "Yuz nervi (VII juft)", "Sayyor nerv (X)", "Til osti nervi (XII)"],
        answerIndex: 1,
        explanation: "VII juft kranial nerv (Nervus facialis - yuz nervi) barcha mimika mushaklarini harakatlantiradi."
      }
    ]
  },

  brain: {
    id: "brain",
    nameUz: "Bosh miya modeli (4D anatomiya)",
    nameLat: "Encephalon",
    nameEn: "Human Brain 4D Anatomy",
    system: "Markaziy asab tizimi (Systema nervosum centrale)",
    category: "Miya bo'limlari",
    bonesCount: 0,
    weight: "~1300 - 1450 g",
    description: "Bosh miya (Encephalon) inson tanasining eng oliy boshqaruv markazi bo'lib, katta yarimsharlar (telencephalon), oraliq miya (diencephalon), o'rta miya (mesencephalon), miyacha (cerebellum) va miya poyasidan (truncus encephali) iborat.",
    parts: [
      {
        id: "cerebrum",
        nameUz: "Katta yarimsharlar po'stlog'i",
        nameLat: "Cortex cerebri",
        desc: "Oliy asab faoliyati, tafakkur, xotira, nutq va ongli harakatlarni boshqaruvchi kulrang modda qatlami."
      },
      {
        id: "cerebellum",
        nameUz: "Miyacha (Kichik miya)",
        nameLat: "Cerebellum",
        desc: "Harakatlar koordinatsiyasi, muvozanat va mushaklar tonusini boshqaruvchi bo'lim."
      },
      {
        id: "brainstem",
        nameUz: "Miya poyasi (Uzunchoq miya, ko'prik)",
        nameLat: "Truncus encephali",
        desc: "Nafas olish, yurak urishi va qon bosimi kabi hayotiy muhim reflektor markazlarni o'z ichiga olgan soha."
      },
      {
        id: "temporal_lobe",
        nameUz: "Chakka va ensa bo'laklari",
        nameLat: "Lobi temporalis et occipitalis",
        desc: "Eshitish, hid bilish va ko'rish analizatorlarining oliy markazlari joylashgan soha."
      }
    ],
    functions: [
      "Tafakkur, ong, nutq, xotira va his-tuyg'ularni shakllantirish",
      "Ichki a'zolar faoliyatini avtonom (vegetativ) boshqarish",
      "Sezgi organlaridan kelgan barcha signallarni qabul qilish va tahlil qilish",
      "Tana harakatlari koordinatsiyasi va muvozanatini saqlash"
    ],
    clinical: [
      "Bosh miya qon aylanishining o'tkir buzilishi (Insult) - ishemik yoki gemorragik miya to'qimasi zararlanishi.",
      "Miyacha ataksiyasi - harakatlar muvozanati va nozik motorikaning buzilishi.",
      "Altsgeymer kasalligi - miya po'stlog'idagi neyronlar degradatsiyasi natijasida xotira va aqlning pasayishi."
    ],
    quiz: [
      {
        question: "Inson harakatlari muvozanati va koordinatsiyasi uchun miyaning qaysi qismi javobgar?",
        options: ["Peshona bo'lagi", "Miyacha (Cerebellum)", "Gipotalamus", "Ko'rish do'mbog'i"],
        answerIndex: 1,
        explanation: "Miyacha (Cerebellum) murakkab harakatlar koordinatsiyasi, muvozanat va tana holatini boshqaradi."
      },
      {
        question: "Nafas olish va yurak urishi kabi hayotiy markazlar qayerda joylashgan?",
        options: ["Uzunchoq miyada (Medulla oblongata)", "Miya qadag'ida", "Ensa bo'lagida", "Gipofizda"],
        answerIndex: 0,
        explanation: "Uzunchoq miya (Medulla oblongata) va miya poyasida hayotiy muhim nafas va yurak-tomir markazlari joylashgan."
      },
      {
        question: "Odam bosh miyasi o'rtacha qancha og'irlikka ega?",
        options: ["~500 - 600 g", "~1300 - 1450 g", "~2500 g", "~900 g"],
        answerIndex: 1,
        explanation: "Kattalarda bosh miyaning o'rtacha massasi 1300-1450 grammni tashkil qiladi."
      }
    ]
  },

  heart_vascular: {
    id: "heart_vascular",
    nameUz: "Yurak va ko'krak qon-tomirlari",
    nameLat: "Cor et Angiologia",
    nameEn: "Thorax, Heart & Vascular Tree",
    system: "Yurak-qon tomir tizimi",
    category: "Qon aylanish markazi",
    bonesCount: "12 juft qovurg'a karkasi",
    weight: "~300 g (Yurak)",
    description: "Shaffof ko'krak qafasi ichida yurak, aorta yoyi va o'pka qon-tomir daraxtining (Arteria et venae pulmonales) joylashishi hamda qon aylanish sikli.",
    parts: [
      {
        id: "aorta_arch",
        nameUz: "Aorta yoyi va magistral tarmoqlar",
        nameLat: "Arcus aortae",
        desc: "Chap qorinchadan chiqib, bosh, bo'yin va qo'llarga qon beruvchi yirik tomir yoyi."
      },
      {
        id: "pulmonary_tree",
        nameUz: "O'pka qon-tomir daraxti",
        nameLat: "Arbor vasculosa pulmonalis",
        desc: "O'pka alveolalariga venoz qonni kislorod bilan to'yintirish uchun olib boruvchi shoxlangan tomirlar."
      },
      {
        id: "ventricles",
        nameUz: "Yurak qorinchalari",
        nameLat: "Ventriculi cordis",
        desc: "Qonni butun tana a'zolariga yuqori bosim bilan haydab beruvchi baquvvat mushak kameralari."
      },
      {
        id: "rib_cage_transparent",
        nameUz: "Ko'krak qafasi suyaklari",
        nameLat: "Cavea thoracis",
        desc: "Yurak va o'pkalarni tashqi zarbalardan asrovchi suyak-tog'ay himoya karkasi."
      }
    ],
    functions: [
      "Katta va kichik qon aylanish doiralarida uzluksiz qon harakatini ta'minlash",
      "O'pkalarda gazlar almashinuvini (gemoglobinni kislorod bilan to'yintirishni) amalga oshirish",
      "Arterial bosimni barqaror ushlab turish"
    ],
    clinical: [
      "Miokard infarkti - toj arteriyalar trombozi oqibatida yurak mushagining nekrozi.",
      "Aorta anevrizmasi - aorta devorining yupqalashishi va yorilish xavfi bo'lgan kengayishi.",
      "O'pka arteriyasi tromboemboliyasi (TELA) - o'pka qon-tomirining to'satdan tromb bilan tiqilib qolishi."
    ],
    quiz: [
      {
        question: "Aorta qaysi kameradan boshlanadi?",
        options: ["O'ng qorinchadan", "Chap qorinchadan", "Chap bo'lmachadan", "O'ng bo'lmachadan"],
        answerIndex: 1,
        explanation: "Aorta chap qorinchadan boshlanadi va kislorodga boy qonni butun tana to'qimalariga yetkazadi."
      },
      {
        question: "Kichik qon aylanish doirasi qaysi a'zoda amalga oshadi?",
        options: ["Jigarda", "Bosh miyada", "O'pkalarda", "Buyraklarda"],
        answerIndex: 2,
        explanation: "Kichik qon aylanish doirasi yurak va o'pkalar o'rtasida bo'lib, venoz qon o'pkada kislorodga to'yinadi."
      },
      {
        question: "Yurak toj tomirlari (koronar arteriyalar) qayerdan boshlanadi?",
        options: ["Aorta piyozchasidan (Bulbus aortae)", "O'pka arteriyasidan", "Kovak venadan", "Chap qorinchadan"],
        answerIndex: 0,
        explanation: "Toj arteriyalar bevosita aorta piyozchasining o'ng va chap cho'ntaklaridan boshlanadi."
      }
    ]
  },

  torso_organs: {
    id: "torso_organs",
    nameUz: "Gavda va ichki a'zolar kompleksi",
    nameLat: "Viscera thoracis et abdominis",
    nameEn: "Torso & Internal Organs",
    system: "Ichki a'zolar (Splanchnologia) va tomir-nervlar",
    category: "Ko'krak va qorin bo'shlig'i",
    bonesCount: "Qovurg'alar va to'sh",
    weight: "~10 - 12 kg (barcha a'zolar)",
    description: "Inson tanasining to'liq ichki a'zolari: o'pkalar, yurak, jigar, oshqozon, ichaklar, qo'l va ko'krak nerv chigallari hamda magistral qon tomirlarining haqiqiy 3D anatomik joylashuvi.",
    parts: [
      {
        id: "lungs_torso",
        nameUz: "O'pkalar va plevra",
        nameLat: "Pulmones",
        desc: "Ko'krak bo'shlig'ining asosiy qismini egallagan nafas a'zolari."
      },
      {
        id: "liver",
        nameUz: "Jigar (Insonning eng yirik bezi)",
        nameLat: "Hepar",
        desc: "O'ng qovurg'a ostida joylashgan yirik a'zo; qonni zaharlardan tozalash, o't suyuqligi ishlab chiqarish va moddalar almashinuvida ishtirok etadi."
      },
      {
        id: "stomach",
        nameUz: "Oshqozon",
        nameLat: "Gaster (Ventriculus)",
        desc: "Ovqatni mexanik va kimyoviy (xlorid kislota va pepsin yordamida) hazm qiluvchi qop shaklidagi mushak a'zosi."
      },
      {
        id: "brachial_plexus",
        nameUz: "Yelka va qo'l nerv chigallari",
        nameLat: "Plexus brachialis",
        desc: "Bo'yin umurtqalaridan chiqib, butun qo'l mushaklari va terisini innervatsiya qiluvchi sariq nerv tolalari."
      },
      {
        id: "intestines",
        nameUz: "Ingichka va yo'g'on ichaklar",
        nameLat: "Intestinum tenue et crassum",
        desc: "Oziq moddalarni qonga so'rish va hazm chiqindilarini shakllantirib chiqarish tizimi."
      }
    ],
    functions: [
      "Nafas olish, oziqlanish va hazm qilish jarayonlarini to'liq ta'minlash",
      "Organizmning metabolik va detoksikatsiya (zararsizlantirish) funksiyasi (Jigar)",
      "Qon aylanishi va immunitetni qo'llab-quvvatlash"
    ],
    clinical: [
      "Gepatit va jigar sirrozi - jigar to'qimasining yallig'lanishi va chandiqlanishi.",
      "Oshqozon yara kasalligi (Ulcus pepticum) - me'da shilliq qavatining kislotali eroziyasi.",
      "Pnevmoniya va plevrit - o'pka to'qimasi va plevra bo'shlig'i yallig'lanishi."
    ],
    quiz: [
      {
        question: "Inson organizmidagi eng yirik ichki a'zo va bez qaysi?",
        options: ["Oshqozon osti bezi", "Jigar (Hepar)", "Taloq", "O'pka"],
        answerIndex: 1,
        explanation: "Jigar (Hepar) inson tanasidagi eng yirik bez bo'lib, o'rtacha 1.5 kg og'irlikka ega."
      },
      {
        question: "Oshqozon shirasidagi asosiy kislota qaysi?",
        options: ["Sulfat kislotasi", "Xlorid kislotasi (HCl)", "Sirka kislotasi", "Fosfat kislotasi"],
        answerIndex: 1,
        explanation: "Oshqozonda xlorid kislotasi (HCl) ishlab chiqarilib, u oqsillarni parchalash va mikroblarni o'ldirishda xizmat qiladi."
      },
      {
        question: "Qo'lni harakatlantiruvchi nerv tolalari qaysi chigaldan boshlanadi?",
        options: ["Bel chigalidan", "Yelka chigalidan (Plexus brachialis)", "Dumg'aza chigalidan", "Quyosh chigalidan"],
        answerIndex: 1,
        explanation: "Yelka nerv chigali (Plexus brachialis) C5-Th1 segmentlaridan hosil bo'lib, butun yuqori sohani boshqaradi."
      }
    ]
  },

  cranial_nerves: {
    id: "cranial_nerves",
    nameUz: "Kranial nervlar tizimi (12 juft)",
    nameLat: "Nervi craniales (I-XII)",
    nameEn: "12 Cranial Nerves System",
    system: "Periferik va kranial nerv tizimi",
    category: "Bosh miya nervlari",
    bonesCount: "12 juft kranial nerv",
    weight: "~150 g",
    description: "Bosh miya asosidan chiquvchi 12 juft kranial nervlar yuz, ko'z, quloq, til, hid bilish, muvozanat va ichki a'zolarni innervatsiya qiluvchi eng muhim asab yo'llaridir.",
    parts: [
      {
        id: "olfactory_optic",
        nameUz: "I-II juft: Hid bilish va Ko'rish nervlari",
        nameLat: "N. olfactorius et N. opticus",
        desc: "Retinadan ko'rish signallarini va burun shilliq qavatidan hid signallarini miyaga to'g'ridan-to'g'ri eltuvchi sezuvchi nervlar."
      },
      {
        id: "trigeminal",
        nameUz: "V juft: Uch shoxli nerv",
        nameLat: "N. trigeminus",
        desc: "Yuz terisi, ko'z, tishlar va og'iz bo'shlig'i sezgirligini hamda chaynash mushaklarini ta'minlovchi yirik nerv."
      },
      {
        id: "facial_nerve",
        nameUz: "VII juft: Yuz nervi",
        nameLat: "N. facialis",
        desc: "Yuzdagi barcha mimika mushaklarini harakatlantiruvchi va tilning oldingi 2/3 qismidan ta'm sezuvchi nerv."
      },
      {
        id: "vagus_nerve",
        nameUz: "X juft: Sayyor nerv",
        nameLat: "N. vagus",
        desc: "Eng uzun kranial nerv bo'lib, yurak, o'pkalar, qizilo'ngach, oshqozon va ichaklarning parasimpatik boshqaruvini ta'minlaydi."
      }
    ],
    functions: [
      "Ko'rish, hid bilish, eshitish va ta'm bilish sezgilarini miyaga uzatish",
      "Ko'z soqqasi va yuz mimika mushaklarini boshqarish",
      "Yurak urishi, nafas va hazm a'zolari ritmini tinchlantiruvchi parasimpatik boshqaruv"
    ],
    clinical: [
      "Trigeminal nevralgiya (Uch shoxli nerv shamollashi) - yuzda kuchli, xurujli elektr toki urgandek og'riqlar.",
      "Yuz nervi parezi - ko'zning yumilmasligi, og'iz burchagining tushib qolishi.",
      "Vagus disfunksiyasi - yurak aritmiyalari va hazm qilish buzilishlari."
    ],
    quiz: [
      {
        question: "Qorin va ko'krak bo'shlig'i ichki a'zolarini innervatsiya qiluvchi eng uzun kranial nerv qaysi?",
        options: ["N. trigeminus (V)", "N. facialis (VII)", "N. vagus (X - Sayyor nerv)", "N. accessorius (XI)"],
        answerIndex: 2,
        explanation: "Sayyor nerv (Nervus vagus - X juft) boshdan boshlanib qorin bo'shlig'igacha tushib, ichki a'zolarni boshqaradi."
      },
      {
        question: "Ko'rish nervi nechanchi juft kranial nerv hisoblanadi?",
        options: ["I juft", "II juft (N. opticus)", "III juft", "IV juft"],
        answerIndex: 1,
        explanation: "II juft kranial nerv (Nervus opticus) ko'rish signallarini ko'z to'r pardasidan miya ensa po'stlog'iga yetkazadi."
      },
      {
        question: "Jami nechta kranial nervlar jufti mavjud?",
        options: ["8 juft", "10 juft", "12 juft", "31 juft"],
        answerIndex: 2,
        explanation: "Odamda jami 12 juft kranial nervlar mavjud (orqa miya nervlari esa 31 juft)."
      }
    ]
  }
};
