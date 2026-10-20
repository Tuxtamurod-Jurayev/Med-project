// Real Medical Anatomical Assets provided by the user with exact landmark hotspots

export const REAL_ANATOMY_ASSETS = {
  head_neck: {
    id: "head_neck",
    name: "Bosh va bo'yin anatomiyasi (Disseksiya)",
    realImage: "/assets/real_anatomy/head_neck_dissection.png",
    xrayImage: "/assets/real_anatomy/cranial_nerves_brain.png",
    hotspots: [
      { id: "cranium_base", nameUz: "Bosh suyagi gumbazi", nameLat: "Calvaria", x: 53, y: 22 },
      { id: "facial_muscles", nameUz: "Mimika va chaynash mushaklari", nameLat: "M. masseter et faciales", x: 48, y: 40 },
      { id: "neck_muscles", nameUz: "To'sh-o'mrov-so'rg'ichsimon mushak", nameLat: "M. sternocleidomastoideus", x: 62, y: 66 },
      { id: "carotid_artery", nameUz: "Umumiy uyqu arteriyasi va vena", nameLat: "A. carotis et V. jugularis", x: 52, y: 62 }
    ]
  },

  brain: {
    id: "brain",
    name: "Bosh miya modeli (4D maket)",
    realImage: "/assets/real_anatomy/brain_model_4d.png",
    xrayImage: "/assets/real_anatomy/cranial_nerves_brain.png",
    hotspots: [
      { id: "cerebrum", nameUz: "Katta yarimshar po'stlog'i", nameLat: "Cortex cerebri", x: 60, y: 40 },
      { id: "cerebellum", nameUz: "Miyacha (Kichik miya)", nameLat: "Cerebellum", x: 67, y: 54 },
      { id: "brainstem", nameUz: "Miya poyasi va uzunchoq miya", nameLat: "Truncus encephali", x: 65, y: 70 },
      { id: "temporal_lobe", nameUz: "Chakka bo'lagi", nameLat: "Lobus temporalis", x: 48, y: 45 }
    ]
  },

  heart_vascular: {
    id: "heart_vascular",
    name: "Yurak va o'pka qon-tomir daraxti",
    realImage: "/assets/real_anatomy/thorax_heart_xray.png",
    xrayImage: "/assets/real_anatomy/thorax_heart_xray.png",
    hotspots: [
      { id: "aorta_arch", nameUz: "Aorta yoyi", nameLat: "Arcus aortae", x: 58, y: 30 },
      { id: "pulmonary_tree", nameUz: "O'pka qon-tomir shoxlari", nameLat: "Arbor pulmonalis", x: 32, y: 42 },
      { id: "ventricles", nameUz: "Yurak qorinchalari", nameLat: "Ventriculi cordis", x: 56, y: 58 },
      { id: "rib_cage_transparent", nameUz: "Shaffof qovurg'alar karkasi", nameLat: "Costae", x: 22, y: 52 }
    ]
  },

  torso_organs: {
    id: "torso_organs",
    name: "Gavda va ichki a'zolar kompleksi",
    realImage: "/assets/real_anatomy/torso_organs.png",
    xrayImage: "/assets/real_anatomy/thorax_heart_xray.png",
    hotspots: [
      { id: "lungs_torso", nameUz: "O'pkalar va plevra", nameLat: "Pulmones", x: 38, y: 44 },
      { id: "liver", nameUz: "Jigar (Insonning eng yirik bezi)", nameLat: "Hepar", x: 42, y: 76 },
      { id: "stomach", nameUz: "Oshqozon", nameLat: "Gaster", x: 56, y: 78 },
      { id: "brachial_plexus", nameUz: "Yelka va qo'l nervlari", nameLat: "Plexus brachialis", x: 23, y: 40 },
      { id: "intestines", nameUz: "Ingichka va yo'g'on ichaklar", nameLat: "Intestina", x: 50, y: 92 }
    ]
  },

  cranial_nerves: {
    id: "cranial_nerves",
    name: "Kranial nervlar tizimi (12 juft)",
    realImage: "/assets/real_anatomy/cranial_nerves_brain.png",
    xrayImage: "/assets/real_anatomy/brain_model_4d.png",
    hotspots: [
      { id: "olfactory_optic", nameUz: "Bosh miya va kranial nervlar", nameLat: "Encephalon et N. craniales", x: 50, y: 32 },
      { id: "trigeminal", nameUz: "Yuz va uch shoxli nerv tolalari", nameLat: "N. trigeminus et facialis", x: 56, y: 50 },
      { id: "facial_nerve", nameUz: "Yuz sohasi innervatsiyasi", nameLat: "Nervus facialis", x: 44, y: 58 },
      { id: "vagus_nerve", nameUz: "Bo'yin va sayyor nerv tarmoqlari", nameLat: "Nervus vagus", x: 50, y: 68 }
    ]
  }
};
