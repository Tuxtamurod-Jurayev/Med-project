// SVG Data URIs for instant, zero-network anatomical reference cards
export const SAMPLE_ANATOMY_IMAGES = {
  skull: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%230b1329"/>
    <circle cx="200" cy="170" r="110" fill="none" stroke="%2338bdf8" stroke-width="4"/>
    <ellipse cx="200" cy="230" rx="75" ry="65" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <circle cx="160" cy="180" r="28" fill="%23075985" stroke="%2338bdf8" stroke-width="3"/>
    <circle cx="240" cy="180" r="28" fill="%23075985" stroke="%2338bdf8" stroke-width="3"/>
    <path d="M190 220 L200 200 L210 220 Z" fill="%2338bdf8"/>
    <rect x="165" y="250" width="70" height="20" rx="6" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <path d="M175 250 L175 270 M190 250 L190 270 M205 250 L205 270 M220 250 L220 270" stroke="%2338bdf8" stroke-width="2"/>
    <text x="200" y="340" fill="%2338bdf8" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">CRANIUM (BOSH SUYAGI)</text>
    <text x="200" y="365" fill="%2394a3b8" font-family="monospace" font-size="12" text-anchor="middle">Rentgen / Anatomik Karta</text>
  </svg>`,

  heart: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%231a0a14"/>
    <path d="M200 130 C180 80, 110 80, 110 150 C110 230, 200 300, 200 300 C200 300, 290 230, 290 150 C290 80, 220 80, 200 130 Z" fill="%23991b1b" stroke="%23f87171" stroke-width="4"/>
    <path d="M175 110 C175 60, 225 60, 225 100" fill="none" stroke="%23ef4444" stroke-width="14" stroke-linecap="round"/>
    <path d="M225 110 L225 150" fill="none" stroke="%233b82f6" stroke-width="12" stroke-linecap="round"/>
    <circle cx="160" cy="180" r="16" fill="%23ef4444" opacity="0.6"/>
    <circle cx="230" cy="190" r="14" fill="%233b82f6" opacity="0.6"/>
    <text x="200" y="340" fill="%23f87171" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">COR (INSON YURAGI)</text>
    <text x="200" y="365" fill="%2394a3b8" font-family="monospace" font-size="12" text-anchor="middle">Kardiologik Sxema</text>
  </svg>`,

  arm_hand: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%230b1329"/>
    <rect x="165" y="230" width="70" height="70" rx="12" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="135" y="170" width="16" height="50" rx="8" fill="none" stroke="%2338bdf8" stroke-width="3" transform="rotate(-25 135 170)"/>
    <rect x="165" y="140" width="16" height="80" rx="8" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="192" y="130" width="16" height="90" rx="8" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="219" y="145" width="16" height="75" rx="8" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="246" y="170" width="14" height="50" rx="7" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <text x="200" y="340" fill="%2338bdf8" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">OSSA MANUS (QO'L PANJASI)</text>
    <text x="200" y="365" fill="%2394a3b8" font-family="monospace" font-size="12" text-anchor="middle">Rentgenogramma</text>
  </svg>`,

  ribcage_lungs: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%230b1329"/>
    <line x1="200" y1="80" x2="200" y2="280" stroke="%2338bdf8" stroke-width="8"/>
    <ellipse cx="140" cy="180" rx="45" ry="70" fill="%230369a1" opacity="0.4" stroke="%2338bdf8" stroke-width="2"/>
    <ellipse cx="260" cy="180" rx="45" ry="70" fill="%230369a1" opacity="0.4" stroke="%2338bdf8" stroke-width="2"/>
    <path d="M140 120 C180 100, 220 100, 260 120" fill="none" stroke="%2338bdf8" stroke-width="4"/>
    <path d="M120 160 C180 140, 220 140, 280 160" fill="none" stroke="%2338bdf8" stroke-width="4"/>
    <path d="M120 200 C180 180, 220 180, 280 200" fill="none" stroke="%2338bdf8" stroke-width="4"/>
    <path d="M135 240 C180 220, 220 220, 265 240" fill="none" stroke="%2338bdf8" stroke-width="4"/>
    <text x="200" y="340" fill="%2338bdf8" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">THORAX (KO'KRAK QAFASI)</text>
    <text x="200" y="365" fill="%2394a3b8" font-family="monospace" font-size="12" text-anchor="middle">Flyurografiya / Rentgen</text>
  </svg>`,

  spine: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <rect width="100%" height="100%" fill="%230b1329"/>
    <path d="M200 70 Q185 130 200 180 Q215 230 200 290" fill="none" stroke="%23facc15" stroke-width="6"/>
    <rect x="180" y="80" width="40" height="14" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="178" y="110" width="44" height="15" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="175" y="140" width="50" height="16" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="172" y="175" width="56" height="18" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="170" y="210" width="60" height="20" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <rect x="168" y="245" width="64" height="22" rx="4" fill="none" stroke="%2338bdf8" stroke-width="3"/>
    <text x="200" y="340" fill="%23facc15" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">COLUMNA VERTEBRALIS</text>
    <text x="200" y="365" fill="%2394a3b8" font-family="monospace" font-size="12" text-anchor="middle">Umurtqa Pog'onasi MRT</text>
  </svg>`
};
