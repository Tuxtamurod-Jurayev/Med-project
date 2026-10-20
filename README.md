# 🩺 MedAnatomy 3D AR — Tibbiyot Talabalari uchun Interaktiv Anatomiya Platformasi

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Three.js](https://img.shields.io/badge/Three.js-r174-black.svg)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)

**MedAnatomy 3D AR** — tibbiyot oliygohlari va kollejlari talabalari uchun inson suyaklari hamda ichki a'zolarini o'rganishga mo'ljallangan yagona sahifali (Single Page Application), tezkor va interaktiv 3D/AR anatomik atlas.

---

## ✨ Asosiy Imkoniyatlar

1. **3D Interaktiv Modellar (Three.js):**
   - 💀 **Bosh suyagi (Cranium)** — peshona, chakka, tepa, ensa, yuqori va pastki jag' suyaklari bilan.
   - ❤️ **Inson yuragi (Cor)** — chap/o'ng qorinchalar, bo'lmachalar, aorta yoyi, o'pka poyasi va real yurak urishi (EKG pulsatsiya) animatsiyasi.
   - 🦴 **Qo'l panjasi va bilak suyaklari (Ossa manus & antebrachii)** — tirsak, bilak, 8 ta kaft usti suyaklari, 5 ta kaft va 14 ta barmoq falangalari.
   - 🫁 **Ko'krak qafasi va o'pka (Thorax et Pulmones)** — 12 juft qovurg'a, to'sh suyagi, 2 bo'lakli chap va 3 bo'lakli o'ng o'pka (nafas olish animatsiyasi bilan).
   - 🧬 **Umurtqa pog'onasi (Columna vertebralis)** — bo'yin (C1-C7), ko'krak (Th1-Th12), bel (L1-L5), dumg'aza va orqa miya nerv o'qi.

2. **Kamera orqali AR (Kengaytirilgan Reallik) Rejimi:**
   - Veb-kamera yoki smartfon orqa kamerasini ulab, 3D modelni tana yoki anatomik darslik/rasm ustiga tushirish.
   - Shaffoflik (Opacity) regulyatori va old/orqa kamerani almashtirish.
   - Mo'ljal retikli (AR target alignment guide).

3. **Interaktiv Asboblar (Toolbar):**
   - **Rentgen (X-Ray)** — suyak va organlarni yarim-shaffof qilib ichki tuzilishini ko'rish.
   - **To'r (Wireframe)** — 3D to'r strukturasini tekshirish.
   - **360° Aylanma** — modelning avtomatik silliq aylanishi.
   - **Surat olish (Snapshot)** — konspekt yoki taqdimotlar uchun bir bosishda yuqori sifatli PNG rasm yuklab olish.
   - **Audio Talaffuz (TTS)** — lotincha anatomik nomlarni ovozli eshitish.

4. **Tibbiyot Talabalari uchun Bilimlar Bazasi:**
   - Lotincha rasmiy anatomik nomenklatura (*Nomina Anatomica*).
   - Fiziologik vazifalar va klinik ahamiyat (kasalliklar, sinishlar, sindromlar).
   - **Interaktiv Quiz (Test)** — har bir a'zo bo'yicha 3 tadan test savollari, to'g'ri/noto'g'ri tushuntirishlari va g'alaba konfettisi!

---

## 🚀 Loyihani Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 2. Dasturchi rejimida ishga tushirish (Local Dev)
```bash
npm run dev
```
Brauzeringizda `http://localhost:5173` manzilida ochiladi.

### 3. Loyihani ishlab chiqarishga yig'ish (Production Build)
```bash
npm run build
```
Natija `dist/` papkasiga ultra-tezkor statik fayllar ko'rinishida yig'iladi.

---

## 🌐 GitHub va Vercel'ga Joylash (Deploy)

### A. GitHub'ga yuklash:
1. GitHub'da yangi bo'sh repository oching (masalan, `med-anatomy-3d-ar`).
2. Terminalda quyidagi buyruqlarni ketma-ket bajaring:

```bash
git add .
git commit -m "feat: initial MedAnatomy 3D AR single page release"
git branch -M main
git remote add origin https://github.com/SIZNING_USERNAME/med-anatomy-3d-ar.git
git push -u origin main
```

### B. Vercel'ga joylash:
Loyiha `vercel.json` bilan to'liq sozlangan:
1. [vercel.com](https://vercel.com) saytiga kiring.
2. **"Add New Project"** tugmasini bosing.
3. Yuqorida ochilgan GitHub repozitoriyangizni tanlang.
4. Framework avtomatik tarzda **Vite** sifatida aniqlanadi.
5. **"Deploy"** tugmasini bosing. Loyihangiz 30 soniyada butun dunyoga bepul ochiladi!
