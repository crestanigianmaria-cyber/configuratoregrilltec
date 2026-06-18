import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* =============================================
   DATA
   ============================================= */
const EVENT_PHOTOS = [
  '/logo_grilltec.png',
  '/events/Grilltec-2.jpg',
  '/events/Grilltec-3.jpg',
  '/events/Grilltec-4.jpg',
  '/events/Grilltec-5.jpg',
  '/events/Grilltec-7.jpg',
  '/events/Grilltec-31.jpg',
  '/events/Grilltec-35.jpg',
  '/events/Grilltec-37.jpg',
  '/events/Grilltec-39.jpg',
  '/events/Grilltec-41.jpg',
  '/events/Grilltec-43.jpg',
  '/events/Grilltec-65.jpg',
  '/events/Grilltec-69.jpg',
  '/events/Grilltec-72.jpg',
  '/events/Grilltec-82.jpg',
  '/events/Grilltec-85.jpg',
  '/events/Grilltec-87.jpg'
];

const MATERIALS_DB = {
  inox: {
    id: "inox",
    code: "MAT-01",
    name: "Acciaio Inox 304",
    sub: "Stainless Steel",
    tagline: "Zero compromessi con gli agenti atmosferici. Lavabile, immortale, professionale.",
    draw: "inox",
    accentColor: "#378ADD",
    bars: [
      { label: "Resistenza calore", val: 82 },
      { label: "Anti-corrosione",   val: 98 },
      { label: "Longevità",         val: 95 },
      { label: "Manutenzione",      val: 97 },
      { label: "Massa termica",     val: 55 },
    ],
    tags: ["Inossidabile", "Alimentare", "Zero manutenzione"],
    note: "Spessore 3mm, finitura spazzolata satinata.",
  },
  corten: {
    id: "corten",
    code: "MAT-04",
    name: "Acciaio Corten",
    sub: "Weathering Steel",
    tagline: "Si ossida apposta. Lo strato rugginoso superficiale è la sua armatura permanente.",
    draw: "corten",
    accentColor: "#D85A30",
    bars: [
      { label: "Resistenza calore", val: 85 },
      { label: "Anti-corrosione",   val: 78 },
      { label: "Longevità",         val: 92 },
      { label: "Manutenzione",      val: 80 },
      { label: "Massa termica",     val: 72 },
    ],
    tags: ["Autoprotetto", "Design industriale", "No verniciatura"],
    note: "Ideale per installazioni permanenti all'aperto. Il colore ambrato ossidato è il suo stato naturale finale.",
  },
  grezza: {
    id: "grezza",
    code: "MAT-03",
    name: "Ferro Non Trattato",
    sub: "Raw Iron",
    tagline: "Grezzo, diretto, senza filtri. Per chi vuole un oggetto vivo che porta i segni del fuoco.",
    draw: "raw",
    accentColor: "#BA7517",
    bars: [
      { label: "Resistenza calore", val: 88 },
      { label: "Anti-corrosione",   val: 22 },
      { label: "Longevità",         val: 70 },
      { label: "Manutenzione",      val: 28 },
      { label: "Massa termica",     val: 85 },
    ],
    tags: ["Pezzo unico", "Patina naturale", "Massima cura"],
    note: "Il materiale dell'artigiano puro. Va oliato dopo ogni utilizzo. Con il tempo diventa irripetibile.",
  },
  verniciata: {
    id: "verniciata",
    code: "MAT-06",
    name: "Verniciato Alta Temp.",
    sub: "High Temp Paint",
    tagline: "Finitura opaca professionale resistente fino a 1200°.",
    draw: "carbonio", // Reuse carbonio texture
    accentColor: "#888780",
    bars: [
      { label: "Resistenza calore", val: 95 },
      { label: "Anti-corrosione",   val: 85 },
      { label: "Longevità",         val: 88 },
      { label: "Manutenzione",      val: 85 },
      { label: "Massa termica",     val: 75 },
    ],
    tags: ["Protezione 1200°", "Finitura opaca", "Resistente"],
    note: "Trattamento a polvere speciale che resiste alle fiamme dirette senza sfogliarsi.",
  },
  ral7016: {
    id: "ral7016",
    code: "MAT-07",
    name: "Verniciato RAL 7016",
    sub: "Powder Coated",
    tagline: "Finitura premium grigio antracite, elegante e duratura.",
    draw: "carbonio", // Reuse carbonio texture
    accentColor: "#61676b",
    bars: [
      { label: "Resistenza calore", val: 80 },
      { label: "Anti-corrosione",   val: 90 },
      { label: "Longevità",         val: 85 },
      { label: "Manutenzione",      val: 90 },
      { label: "Massa termica",     val: 70 },
    ],
    tags: ["Design elegante", "Antracite", "Alta qualità"],
    note: "Finitura estetica ideale per giardini moderni e verande.",
  }
};

const PRODUCTS = [
  {
    id: 'yellowstone',
    name: 'Yellowstone',
    tagline: 'L\'esperienza definitiva del barbecue off-road.',
    description: 'Yellowstone è progettato per le vere sfide all\'aperto. Scegli se equipaggiarlo con piedini per postazioni fisse o con robuste ruote per il vero off-road. Personalizza con mensole e paratie laterali (con o senza sportellino) per adattarlo ad ogni tua avventura.',
    image: '/yellowstone/1.jpeg',
    video: '/yellowstone/principale.mp4',
    intro360: '/yellowstone/360.mp4',
    thumbnail: '/yellowstone/1.jpeg',
    basePrice: 1295.64,
    variantType: 'yellowstone',
    features: [
      'Configurabile con ruote o piedini fissi',
      'Mensole modulari opzionali',
      'Paratie protettive laterali frontali',
    ],
    variantGroups: [
      {
        id: 'size',
        label: 'Dimensione',
        options: [
          { id: '800', label: 'L 800', sub: 'Camera 800×740×720H mm', specs: ['Camera L 800 × P 740 × H 720 mm', 'Ingombro L 900 × P 900 × H 2550 mm', 'Paratie 400x570 H, Posteriore 700x570 H'] },
          { id: '1000', label: 'L 1000', sub: 'Camera 1000×740×720H mm', specs: ['Camera L 1000 × P 740 × H 720 mm', 'Ingombro L 1100 × P 900 × H 2550 mm', 'Paratie 400x570 H, Posteriore 900x570 H'] },
          { id: '1200', label: 'L 1200', sub: 'Camera 1200×740×720H mm', specs: ['Camera L 1200 × P 740 × H 720 mm', 'Ingombro L 1300 × P 900 × H 2550 mm', 'Paratie 400x570 H, Posteriore 1100x570 H'] },
        ],
      },
      {
        id: 'finish',
        label: 'Materiale',
        options: [
          { id: 'ral7016', label: 'Verniciato RAL 7016', sub: 'Articolato verniciato RAL 7016' },
          { id: 'corten',  label: 'Acciaio Corten',     sub: 'Articolato corten' },
          { id: 'inox',    label: 'AISI 304',            sub: 'Articolato AISI 304 finitura spazzolata' },
        ],
      },
    ],
    pricingMatrix: {
      '800': { ral7016: 1295.64, corten: 1439.60, inox: 2159.40 },
      '1000': { ral7016: 1610.40, corten: 1811.70, inox: 2745.00 },
      '1200': { ral7016: 1822.68, corten: 2025.20, inox: 3037.80 },
    },
    baseOptions: [
      { id: 'piedini', name: 'Piedini Fissi', price: 0.00, image: '/yellowstone/B.jpeg' },
      { id: 'ruote_zincate', name: 'Ruote Zincate', price: 108.00, image: '/yellowstone/A.jpeg' },
      { id: 'ruote_inox', name: 'Ruote AISI 304', price: 180.00, image: '/yellowstone/A.jpeg' },
    ],
    accessories: [
      { 
        id: 'mensole', name: 'Mensole Laterali', image: '/yellowstone/2.jpeg',
        pricingMatrix: {
          '800': { ral7016: 375.76, corten: 409.92, inox: 614.88 },
          '1000': { ral7016: 389.18, corten: 434.56, inox: 636.84 },
          '1200': { ral7016: 402.60, corten: 439.20, inox: 658.80 }
        }
      },
      { 
        id: 'paratie', name: 'Paratie Laterali', image: '/yellowstone/3.jpeg',
        pricingMatrix: {
          '800': { ral7016: 241.56, corten: 263.52, inox: 395.28 },
          '1000': { ral7016: 254.98, corten: 278.16, inox: 417.24 },
          '1200': { ral7016: 268.40, corten: 292.80, inox: 439.20 }
        }
      },
      { 
        id: 'paratie_sportello', name: 'Paratie Laterali + Sportellino', image: '/yellowstone/3.jpeg',
        pricingMatrix: {
          '800': { ral7016: 322.08, corten: 351.36, inox: 527.04 },
          '1000': { ral7016: 362.34, corten: 395.28, inox: 592.92 },
          '1200': { ral7016: 402.60, corten: 439.20, inox: 658.80 }
        }
      },
    ],
  },
  {
    id: 'suma',
    name: 'Suma',
    tagline: 'Il barbecue da tavolo professionale.',
    description: 'Il Suma è il barbecue da tavolo di riferimento per ristoranti, locali outdoor e appassionati esigenti. Costruito in Italia con acciaio di prima scelta, è disponibile in due misure e tre finiture per adattarsi a ogni esigenza. La griglia intercambiabile e gli accessori modulari lo rendono la scelta più versatile sul mercato.',
    image: '/barbecuesumo.jpeg',
    video: '/sumo.mp4',
    thumbnail: '/barbecuesumo.jpeg',
    basePrice: 483.12,
    variantType: 'suma', // custom type
    features: [
      'Costruzione in acciaio di alta qualità',
      'Griglia intercambiabile modulare',
      'Accessori specifici per ogni taglia',
      'Adatto a uso professionale e domestico',
      'Design compatto e funzionale',
    ],
    variantGroups: [
      {
        id: 'size',
        label: 'Dimensione',
        options: [
          {
            id: 'compact',
            label: 'Compact',
            sub: 'Camera 500×110×210H mm',
            specs: ['Camera 500×110×210H mm', 'Ingombro 720×200×290H mm'],
          },
          {
            id: 'standard',
            label: 'Standard',
            sub: 'Camera 500×210×210H mm',
            specs: ['Camera 500×210×210H mm', 'Ingombro 720×300×290H mm'],
          },
        ],
      },
      {
        id: 'finish',
        label: 'Materiale',
        options: [
          { id: 'ral7016', label: 'Verniciato RAL 7016', sub: 'Finitura premium in polvere' },
          { id: 'corten',  label: 'Acciaio Corten',     sub: 'Patina naturale autoprotettiva' },
          { id: 'inox',    label: 'AISI 304',            sub: 'Inossidabile professionale' },
        ],
      },
    ],
    pricingMatrix: {
      compact:  { ral7016: 483.12, corten: 527.04, inox: 878.40 },
      standard: { ral7016: 603.90, corten: 658.80, inox: 988.20 },
    },
    accessories: [
      {
        id: 'spiedini',
        name: 'Griglia Arrosticini e Spiedini',
        subtitle: 'Perfetta per grigliate abbondanti',
        video: '/spiedini.mp4',
        sizeVariants: {
          compact:  { price: 72.00, specs: '720×150 mm' },
          standard: { price: 90.00, specs: '720×250 mm' },
        },
      },
      {
        id: 'costata',
        name: 'Griglia per Costata',
        subtitle: 'Cottura perfetta di costate e verdure',
        video: '/costata.mp4',
        sizeVariants: {
          compact:  { price: 81.00, specs: '720×150 mm' },
          standard: { price: 99.00, specs: '720×250 mm' },
        },
      },
      {
        id: 'coperchio',
        name: 'Coperchio con Termometro',
        subtitle: 'Controllo preciso della temperatura',
        video: '/coperchio.mp4',
        sizeVariants: {
          compact:  { price: 97.60, specs: '520×200×110H mm' },
          standard: { price: 122.00, specs: '520×300×110H mm' },
        },
      },
    ],
  },
  {
    id: 'arrosticini',
    name: 'Ultra Suma',
    tagline: 'Per i veri maestri degli arrosticini.',
    description: "L'Ultra Suma è il grill professionale per arrosticini e spiedini progettato per chi lavora ad alto volume. La camera di cottura allungata garantisce una cottura lineare e uniforme su tutta la lunghezza dello spiedino. Disponibile in due formati, si adatta sia al banco di lavoro che all'uso su piedistallo.",
    image: null,
    video: '/arrosticini.mp4',
    thumbnail: '/arrosticini.png',
    basePrice: 109.80,
    variantType: 'flat',
    features: [
      'Camera di cottura allungata ad hoc per spiedini',
      'Cottura lineare e uniforme',
      'Disponibile da banco o su piedistallo',
      'Acciaio resistente alle alte temperature',
    ],
    variants: [
      {
        id: 'arrosticini_500',
        label: 'Compact 500',
        price: 109.80,
        specs: ['Camera 500×110×126H mm', 'Ingombro 550×200×200H mm', 'BBQ da banco'],
      },
      {
        id: 'arrosticini_1000',
        label: 'Professionale 1000',
        price: 184.86,
        specs: ['Camera 1000×110×126H mm', 'Ingombro 1050×450×850H mm', 'Griglia a maglia 150×500 mm'],
      },
    ],
    accessories: [],
  },
  {
    id: 'grilltec360',
    name: 'Grilltec 360',
    tagline: 'Braciere a 360° con piastre girevoli.',
    description: 'Il Grilltec 360 redefines the concept of braciere. Tre ruote girevoli garantiscono massima mobilità, mentre le piastre di cottura estraibili su 360° permettono di servire direttamente dalla brace. La piastra interna filtra la cenere mantenendo il fuoco pulito. Disponibile in tre diametri e tre finiture, è la scelta definitiva per eventi e spazi outdoor di prestigio.',
    image: '/grilltec360.jpeg',
    video: '/grilltec360.mp4',
    thumbnail: '/grilltec360.jpeg',
    basePrice: 976.00,
    variantType: 'matrix',
    features: [
      '3 ruote girevoli per la massima mobilità',
      'Presa aria inferiore regolabile',
      'Piastra sostegno braci e filtra cenere',
      '2 piastre estraibili di cottura laterali',
      'Piastra centrale con foro di respiro',
      'Tappo di respiro e rialzio centrale',
    ],
    variantGroups: [
      {
        id: 'diameter',
        label: 'Diametro',
        options: [
          { id: '800',  label: 'Ø 800 × 540H mm' },
          { id: '900',  label: 'Ø 900 × 540H mm' },
          { id: '1000', label: 'Ø 1000 × 540H mm' },
        ],
      },
      {
        id: 'finish',
        label: 'Finitura',
        options: [
          { id: 'grezza',     label: 'Struttura nera grezza',       sub: 'Piastre cottura AISI 304' },
          { id: 'verniciata', label: 'Verniciata alta temp. 1200°', sub: 'Struttura + piastre AISI 304' },
          { id: 'inox',       label: 'Full Inox AISI 304',          sub: 'Struttura e piastre in AISI 304' },
        ],
      },
    ],
    pricingMatrix: {
      '800':  { grezza: 976.00,  verniciata: 1464.00, inox: 1952.00 },
      '900':  { grezza: 1122.40, verniciata: 1683.60, inox: 2244.80 },
      '1000': { grezza: 1244.40, verniciata: 1866.60, inox: 2488.80 },
    },
    accessories: [],
  },
];

/* =============================================
   TEXTURE CANVAS & MATERIALS HUD
   ============================================= */
function drawTexture(ctx, w, h, type, t) {
  ctx.clearRect(0, 0, w, h);

  if (type === "inox") {
    ctx.fillStyle = "#4a5a68";
    ctx.fillRect(0, 0, w, h);
    const lines = Math.floor(h / 3);
    for (let i = 0; i < lines; i++) {
      const y = i * 3;
      const b = 60 + Math.sin(i * 0.9 + t * 0.015) * 30;
      ctx.strokeStyle = `rgba(${b + 80},${b + 90},${b + 110},0.4)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const sx = (Math.sin(t * 0.035) * 0.5 + 0.5) * w;
    ctx.fillStyle = "rgba(180,210,240,0.1)";
    ctx.fillRect(sx - 40, 0, 80, h);
  }

  if (type === "carbonio") {
    ctx.fillStyle = "#252525";
    ctx.fillRect(0, 0, w, h);
    const g = 5;
    for (let x = 0; x < w; x += g) {
      for (let y = 0; y < h; y += g) {
        const v = Math.sin(x * 0.25 + t * 0.008) * Math.cos(y * 0.25) * 18;
        const c = Math.floor(38 + v);
        ctx.fillStyle = `rgb(${c},${c},${c})`;
        ctx.fillRect(x, y, g, g);
      }
    }
  }

  if (type === "raw") {
    ctx.fillStyle = "#4a3820";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 100; i++) {
      const rx = (Math.sin(i * 127.1) * 0.5 + 0.5) * w;
      const ry = (Math.sin(i * 311.7) * 0.5 + 0.5) * h;
      const rs = (Math.sin(i * 91.3) * 0.5 + 0.5) * 5 + 1;
      ctx.fillStyle = i % 2 === 0 ? "rgba(160,100,40,0.25)" : "rgba(60,35,10,0.2)";
      ctx.fillRect(rx, ry, rs, rs);
    }
    const rx2 = (Math.sin(t * 0.025) * 0.3 + 0.5) * w;
    ctx.fillStyle = "rgba(140,65,15,0.18)";
    ctx.beginPath();
    ctx.arc(rx2, h * 0.5, 35 + Math.sin(t * 0.04) * 8, 0, Math.PI * 2);
    ctx.fill();
  }

  if (type === "corten") {
    ctx.fillStyle = "#6a2e0c";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      const rx = (Math.sin(i * 173.1) * 0.5 + 0.5) * w;
      const ry = (Math.sin(i * 257.3) * 0.5 + 0.5) * h;
      const rs = (Math.sin(i * 83.7) * 0.5 + 0.5) * 7 + 2;
      const cols = ["rgba(190,95,30,0.3)", "rgba(110,40,8,0.28)", "rgba(210,130,50,0.2)", "rgba(80,28,4,0.3)"];
      ctx.fillStyle = cols[i % cols.length];
      ctx.beginPath();
      ctx.arc(rx, ry, rs, 0, Math.PI * 2);
      ctx.fill();
    }
    const ox = (Math.sin(t * 0.02) * 0.35 + 0.5) * w;
    ctx.fillStyle = "rgba(220,115,40,0.15)";
    ctx.beginPath();
    ctx.arc(ox, h * 0.45, 50, 0, Math.PI * 2);
    ctx.fill();
  }
}

function TextureCanvas({ type, className }) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let t = 0;
    const loop = () => {
      t++;
      drawTexture(ctx, canvas.width, canvas.height, type, t);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, [type]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}

function BarRow({ label, val, color, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(val), delay);
    return () => clearTimeout(timer);
  }, [val, delay]);

  return (
    <div className="mat-bar-row">
      <span className="mat-bar-label">{label}</span>
      <div className="mat-bar-track">
        <div className="mat-bar-fill" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
      <span className="mat-bar-val" style={{ color }}>{val}</span>
    </div>
  );
}

function MaterialPanel({ materialId }) {
  const mat = MATERIALS_DB[materialId];
  if (!mat) return null;

  return (
    <motion.div
      key={mat.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35 }}
      className="mat-detail-panel"
      style={{ '--mat-accent': mat.accentColor }}
    >
      <div className="mat-detail-header">
        <div className="mat-detail-pulse" style={{ backgroundColor: mat.accentColor }} />
        <span style={{ color: mat.accentColor }}>{mat.code} — Analisi materiale attiva</span>
      </div>

      <div className="mat-detail-body">
        <div className="mat-detail-texture">
          <TextureCanvas type={mat.draw} className="mat-texture-canvas" />
          <div className="mat-texture-overlay" />
          <div className="mat-texture-text">
            <span>Texture simulata</span>
            <span style={{ color: mat.accentColor }}>{mat.sub}</span>
          </div>
        </div>

        <div className="mat-detail-info">
          <h3>{mat.name}</h3>
          <p className="mat-tagline">{mat.tagline}</p>
          <div className="mat-bars">
            {mat.bars.map((b, i) => (
              <BarRow key={b.label} label={b.label} val={b.val} color={mat.accentColor} delay={i * 80} />
            ))}
          </div>
          <div className="mat-tags">
            {mat.tags.map(tag => (
              <span key={tag} style={{ borderColor: `${mat.accentColor}40`, color: mat.accentColor, backgroundColor: `${mat.accentColor}10` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mat-note" style={{ borderColor: mat.accentColor }}>
            {mat.note}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   SHARED COMPONENTS
   ============================================= */
function CheckBadge({ active }) {
  return (
    <motion.div
      className="acc-card-check"
      animate={active
        ? { backgroundColor: '#0a84ff', borderColor: '#0a84ff' }
        : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.25)' }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
        {active && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Check size={13} strokeWidth={3} color="#fff" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavBar({ onBack }) {
  return (
    <div className="config-nav">
      <motion.button
        className="config-back"
        onClick={onBack}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowLeft size={20} strokeWidth={2} />
      </motion.button>
      <img src="/logo_grilltec.png" alt="Grilltec" className="config-logo" />
      <div style={{ width: 40 }} />
    </div>
  );
}

function sendQuoteEmail(productName, configDetails, totalPrice) {
  const email = "grilltec@br9.it";
  const subject = `Richiesta preventivo: ${productName}`;
  const body = `Salve,\n\nVorrei richiedere un preventivo per la seguente configurazione:\n\nProdotto: ${productName}\n${configDetails}\nTotale stimato: € ${totalPrice.toFixed(2)}\n\nIn attesa di un vostro riscontro.\nCordiali saluti.`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FooterBar({ totalPrice, delay = 0.6, onRequestQuote }) {
  return (
    <motion.div
      className="config-footer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', bounce: 0.25 }}
    >
      <div className="config-footer-price">
        <span className="footer-label">Totale</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={totalPrice}
            className="footer-value"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
          >
            € {totalPrice.toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.button className="btn-primary btn-footer" whileTap={{ scale: 0.97 }} onClick={onRequestQuote}>
        Richiedi Preventivo
      </motion.button>
    </motion.div>
  );
}

function ProductViewer({ product, activeAccessories }) {
  const { scrollY } = useScroll();
  // Il video si rimpicciolisce del 35% e sale un po', ma NON sfuma.
  const scale = useTransform(scrollY, [0, 250], [1, 0.65]);
  const yOffset = useTransform(scrollY, [0, 250], [0, -30]);

  return (
    <div className="viewer">
      <div className="viewer-glow" />
      <motion.div className="viewer-product" style={{ scale, y: yOffset, transformOrigin: 'top center' }}>
        {product.video ? (
          <motion.video
            autoPlay loop muted playsInline
            key={product.id + '-video'}
            src={product.video}
            className="viewer-video"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, type: 'spring', bounce: 0.3 }}
          />
        ) : (
          <motion.img
            key={product.id + '-img'}
            src={product.image}
            alt={product.name}
            className="viewer-video viewer-img"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, type: 'spring', bounce: 0.3 }}
          />
        )}
      </motion.div>
      <motion.div className="viewer-accessories" style={{ scale, y: yOffset, transformOrigin: 'right center' }}>
        <AnimatePresence>
          {activeAccessories.map((acc, i) => (
            <motion.div
              key={acc.id}
              className="hologram"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
            >
              <video autoPlay loop muted playsInline src={acc.video} />
              <div className="hologram-label">{acc.name.split(' ').slice(0, 2).join(' ')}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* =============================================
   LANDING PAGE
   ============================================= */
function LandingPage({ onStart }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCurrentPhoto(p => (p + 1) % EVENT_PHOTOS.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div className="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.6 }}>
      <div className="landing-bg">
        <AnimatePresence mode="cross">
          <motion.img
            key={currentPhoto}
            src={EVENT_PHOTOS[currentPhoto]}
            alt=""
            className="landing-bg-img"
            style={{ 
              objectFit: EVENT_PHOTOS[currentPhoto] === '/logo_grilltec.png' ? 'contain' : 'cover',
              padding: EVENT_PHOTOS[currentPhoto] === '/logo_grilltec.png' ? '15%' : '0'
            }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="landing-bg-gradient" />
      </div>
      <div className="photo-dots">
        {EVENT_PHOTOS.map((_, i) => (
          <span key={i} className={`photo-dot ${i === currentPhoto ? 'active' : ''}`} />
        ))}
      </div>
      <div className="landing-body">
        {currentPhoto !== 0 && (
          <motion.img src="/logo_grilltec.png" alt="Grilltec" className="landing-logo" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} />
        )}
        <motion.div className="landing-headline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>
          <h1>L'arte della<br />griglia perfetta.</h1>
          <p>Progettato per i professionisti del fuoco.</p>
        </motion.div>
        <motion.div className="landing-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}>
          <motion.button className="btn-primary" onClick={onStart} whileTap={{ scale: 0.97 }}>
            Scopri il BBQ <ChevronRight size={18} strokeWidth={2} />
          </motion.button>
          <p className="landing-hint">Configuratore professionale Grilltec</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* =============================================
   PRODUCT SELECTION
   ============================================= */
function ProductSelect({ onSelect }) {
  return (
    <motion.div className="screen" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <div className="config-nav">
        <div style={{ width: 40 }} />
        <img src="/logo_grilltec.png" alt="Grilltec" className="config-logo" />
        <div style={{ width: 40 }} />
      </div>
      <div className="product-select-body">
        <motion.div className="product-select-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2>Scegli il tuo barbecue</h2>
          <p>Seleziona il modello da configurare</p>
        </motion.div>
        <div className="product-cards">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-select-card group"
              onClick={() => onSelect(product)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, type: 'spring', bounce: 0.2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="psc-media">
                {product.video
                  ? <video autoPlay loop muted playsInline src={product.video} className="psc-video" />
                  : <img src={product.image} alt={product.name} className="psc-img" />
                }
                <div className="psc-gradient" />
              </div>
              <div className="psc-body">
                <div className="psc-info">
                  <span className="psc-eyebrow">{product.tagline}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description?.slice(0, 100)}…</p>
                  <div className="psc-footer">
                    <span className="psc-price">A partire da € {product.basePrice.toFixed(2)}</span>
                    <span className="psc-action">Configura <ChevronRight size={16} /></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   SUMA CONFIGURATOR (size → finish + auto-sized accessories)
   ============================================= */
function SumaConfigurator({ product, onBack }) {
  const sizeGroup   = product.variantGroups.find(g => g.id === 'size');
  const finishGroup = product.variantGroups.find(g => g.id === 'finish');

  const [selectedSize,   setSelectedSize]   = useState(sizeGroup.options[0].id);
  const [selectedFinish, setSelectedFinish] = useState(finishGroup.options[0].id);
  const [selectedAcc,    setSelectedAcc]    = useState([]);

  // When size changes, reset accessories
  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
    setSelectedAcc([]);
  };

  const toggleAcc = (id) => {
    setSelectedAcc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const basePrice = product.pricingMatrix[selectedSize]?.[selectedFinish] ?? product.basePrice;
  const accTotal  = selectedAcc.reduce((sum, id) => {
    const acc = product.accessories.find(a => a.id === id);
    return sum + (acc?.sizeVariants[selectedSize]?.price ?? 0);
  }, 0);
  const totalPrice = basePrice + accTotal;

  const activeAccessories = product.accessories.filter(a => selectedAcc.includes(a.id));
  const currentSize = sizeGroup.options.find(o => o.id === selectedSize);

  const handleRequestQuote = () => {
    const sizeOpt = sizeGroup.options.find(o => o.id === selectedSize);
    const finishOpt = finishGroup.options.find(o => o.id === selectedFinish);
    let details = `- Misura: ${sizeOpt?.label || ''}\n- Finitura: ${finishOpt?.label || ''}\n`;
    if (activeAccessories.length > 0) {
      details += `- Accessori:\n`;
      activeAccessories.forEach(acc => {
        details += `  * ${acc.name}\n`;
      });
    }
    sendQuoteEmail(product.name, details, totalPrice);
  };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />

      <div className="config-layout">
        <ProductViewer product={product} activeAccessories={activeAccessories} />

        <div className="config-panel">
          {/* Product intro */}
          <motion.div className="config-product-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="config-model-name">{product.name}</h2>
            <p className="config-model-sub">{product.tagline}</p>
            <p className="config-description">{product.description}</p>
          </motion.div>

          {/* STEP 1: SIZE */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
            <div className="config-section-header">
              <span className="config-section-label">1 — Dimensione</span>
            </div>
            <div className="size-tabs">
              {sizeGroup.options.map(opt => {
                const active = selectedSize === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    className={`size-tab ${active ? 'size-tab--active' : ''}`}
                    onClick={() => handleSizeChange(opt.id)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="size-tab-label">{opt.label}</span>
                    <span className="size-tab-sub">{opt.sub}</span>
                  </motion.button>
                );
              })}
            </div>
            {/* Specs accordion */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={selectedSize}
                className="variant-specs variant-specs--inline"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {currentSize.specs.map((s, i) => <li key={i}>{s}</li>)}
              </motion.ul>
            </AnimatePresence>
          </motion.div>

          {/* STEP 2: FINISH with live price and HUD */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}>
            <div className="config-section-header">
              <span className="config-section-label">2 — Materiale</span>
            </div>
            <div className="matrix-group">
              {finishGroup.options.map(opt => {
                const active = selectedFinish === opt.id;
                const price  = product.pricingMatrix[selectedSize]?.[opt.id];
                return (
                  <motion.div
                    key={opt.id}
                    className={`matrix-option ${active ? 'matrix-option--active' : ''}`}
                    onClick={() => setSelectedFinish(opt.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="matrix-option-top">
                      <div className="matrix-option-info">
                        <p className="matrix-option-label">{opt.label}</p>
                        {opt.sub && <p className="matrix-option-sub">{opt.sub}</p>}
                        <p className="matrix-option-price">€ {price?.toFixed(2)}</p>
                      </div>
                      <CheckBadge active={active} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* MATERIAL DETAILS HUD */}
            <AnimatePresence mode="wait">
              {selectedFinish && <MaterialPanel materialId={selectedFinish} />}
            </AnimatePresence>

          </motion.div>

          {/* STEP 3: ACCESSORIES — auto-sized based on selectedSize */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54 }}>
            <div className="config-section-header">
              <span className="config-section-label">3 — Accessori opzionali</span>
              {selectedAcc.length > 0 && <span className="config-section-count">{selectedAcc.length} selezionati</span>}
            </div>
            {/* Size badge */}
            <div className="acc-size-badge">
              <span>Misura auto: {currentSize.specs[0].split('×')[1] === '110' ? '720×150' : '720×250'} mm</span>
            </div>
            <div className="acc-list">
              {product.accessories.map((acc, i) => {
                const isSelected = selectedAcc.includes(acc.id);
                const sizeVar = acc.sizeVariants[selectedSize];
                return (
                  <motion.div
                    key={acc.id}
                    className={`acc-card ${isSelected ? 'acc-card--selected' : ''}`}
                    onClick={() => toggleAcc(acc.id)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.58 + i * 0.09 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <div className="acc-card-img-wrap">
                      {acc.video ? (
                        <video autoPlay loop muted playsInline className="acc-card-video" src={acc.video} />
                      ) : (
                        <img src={acc.image} alt={acc.name} className="acc-card-img" />
                      )}
                    </div>
                    <div className="acc-card-body">
                      <p className="acc-card-name">{acc.name}</p>
                      <p className="acc-card-sub">{sizeVar.specs}</p>
                      <p className="acc-card-price">+ € {sizeVar.price.toFixed(2)}</p>
                    </div>
                    <motion.div
                      className="acc-card-check"
                      animate={isSelected
                        ? { backgroundColor: '#0a84ff', borderColor: '#0a84ff' }
                        : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.25)' }}
                      transition={{ duration: 0.22 }}
                    >
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }}>
                            <Check size={14} strokeWidth={3} color="#fff" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <FooterBar totalPrice={totalPrice} delay={0.65} onRequestQuote={handleRequestQuote} />
    </motion.div>
  );
}

/* =============================================
   FLAT CONFIGURATOR (Ultra Suma)
   ============================================= */
function FlatConfigurator({ product, onBack }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleRequestQuote = () => {
    const details = `- Variante: ${selectedVariant?.label || ''}\n`;
    sendQuoteEmail(product.name, details, selectedVariant.price);
  };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />
      <div className="config-layout">
        <ProductViewer product={product} activeAccessories={[]} />
        <div className="config-panel">
          <motion.div className="config-product-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="config-model-name">{product.name}</h2>
            <p className="config-model-sub">{product.tagline}</p>
            <p className="config-description">{product.description}</p>
          </motion.div>

          {product.features?.length > 0 && (
            <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <div className="config-section-header">
                <span className="config-section-label">Caratteristiche</span>
              </div>
              <ul className="feature-list">
                {product.features.map((f, i) => (
                  <motion.li key={i} className="feature-item" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                    <span className="feature-dot" />{f}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            <div className="config-section-header">
              <span className="config-section-label">Seleziona la misura</span>
            </div>
            <div className="variant-list">
              {product.variants.map(v => {
                const active = selectedVariant.id === v.id;
                return (
                  <motion.div key={v.id} className={`variant-card ${active ? 'variant-card--active' : ''}`} onClick={() => setSelectedVariant(v)} whileTap={{ scale: 0.98 }}>
                    <div className="variant-card-top">
                      <div>
                        <p className="variant-label">{v.label}</p>
                        <p className="variant-price">€ {v.price.toFixed(2)}</p>
                      </div>
                      <CheckBadge active={active} />
                    </div>
                    <AnimatePresence>
                      {active && v.specs.length > 0 && (
                        <motion.ul className="variant-specs" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          {v.specs.map((s, i) => <li key={i}>{s}</li>)}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <FooterBar totalPrice={selectedVariant.price} delay={0.6} onRequestQuote={handleRequestQuote} />
    </motion.div>
  );
}

/* =============================================
   MATRIX CONFIGURATOR (Grilltec 360)
   ============================================= */
function MatrixConfigurator({ product, onBack }) {
  const [selections, setSelections] = useState(() => {
    const init = {};
    product.variantGroups.forEach(g => { init[g.id] = g.options[0].id; });
    return init;
  });

  const totalPrice = product.pricingMatrix[selections['diameter']]?.[selections['finish']] ?? product.basePrice;

  const handleRequestQuote = () => {
    let details = "";
    product.variantGroups.forEach(g => {
      const opt = g.options.find(o => o.id === selections[g.id]);
      details += `- ${g.label}: ${opt?.label || ''}\n`;
    });
    sendQuoteEmail(product.name, details, totalPrice);
  };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />
      <div className="config-layout">
        <ProductViewer product={product} activeAccessories={[]} />
        <div className="config-panel">
          <motion.div className="config-product-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="config-model-name">{product.name}</h2>
            <p className="config-model-sub">{product.tagline}</p>
            <p className="config-description">{product.description}</p>
          </motion.div>

          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="config-section-header">
              <span className="config-section-label">Caratteristiche incluse</span>
            </div>
            <ul className="feature-list">
              {product.features.map((f, i) => (
                <motion.li key={i} className="feature-item" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                  <span className="feature-dot" />{f}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {product.variantGroups.map((group, gi) => (
            <motion.div key={group.id} className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + gi * 0.1 }}>
              <div className="config-section-header">
                <span className="config-section-label">{gi + 1} — {group.label}</span>
              </div>
              <div className="matrix-group">
                {group.options.map(opt => {
                  const active = selections[group.id] === opt.id;
                  const price = group.id === 'finish'
                    ? product.pricingMatrix[selections['diameter']]?.[opt.id]
                    : null;
                  return (
                    <motion.div
                      key={opt.id}
                      className={`matrix-option ${active ? 'matrix-option--active' : ''}`}
                      onClick={() => setSelections(prev => ({ ...prev, [group.id]: opt.id }))}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="matrix-option-top">
                        <div className="matrix-option-info">
                          <p className="matrix-option-label">{opt.label}</p>
                          {opt.sub && <p className="matrix-option-sub">{opt.sub}</p>}
                          {price != null && <p className="matrix-option-price">€ {price.toFixed(2)}</p>}
                        </div>
                        <CheckBadge active={active} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* MATERIAL DETAILS HUD */}
              <AnimatePresence mode="wait">
                {group.id === 'finish' && selections['finish'] && (
                  <MaterialPanel materialId={selections['finish']} />
                )}
              </AnimatePresence>

            </motion.div>
          ))}
        </div>
      </div>
      <FooterBar totalPrice={totalPrice} delay={0.6} onRequestQuote={handleRequestQuote} />
    </motion.div>
  );
}

function FlameTransition({ onComplete }) {
  const videoRef = React.useRef(null);
  const [isDone, setIsDone] = React.useState(false);

  useEffect(() => {
    // Safety fallback
    const timer = setTimeout(() => {
      if (!isDone) {
        setIsDone(true);
        onComplete();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isDone, onComplete]);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.playbackRate = 1.2; // Un po' più rapido per renderlo scattante
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.2;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDone) {
      const vid = videoRef.current;
      // If we are within 0.1s of the end, trigger complete
      if (vid.currentTime >= vid.duration - 0.1) {
        setIsDone(true);
        onComplete();
      }
    }
  };

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        src="/fiamma1.mp4"
        autoPlay
        muted
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => { if (!isDone) { setIsDone(true); onComplete(); } }}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          mixBlendMode: 'screen', 
          filter: 'contrast(1.3) brightness(1.2)' 
        }}
      />
    </motion.div>
  );
}

/* =============================================
   YELLOWSTONE CONFIGURATOR
   ============================================= */
function YellowstoneConfigurator({ product, onBack }) {
  const [introPhase, setIntroPhase] = useState(0); // 0: intro1, 1: intro2, 2: config
  const [selectedSize, setSelectedSize] = useState('800');
  const [selectedFinish, setSelectedFinish] = useState('ral7016');
  const [selectedBase, setSelectedBase] = useState('piedini');
  const [selectedAcc, setSelectedAcc] = useState([]);
  const [tempImage, setTempImage] = useState(null);

  const sizeGroup = product.variantGroups.find(g => g.id === 'size');
  const finishGroup = product.variantGroups.find(g => g.id === 'finish');

  const toggleAcc = (id) => {
    setSelectedAcc(prev => {
      let next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      // Mutually exclusive paratie logic
      if (id === 'paratie_sportello' && next.includes('paratie_sportello')) {
        next = next.filter(x => x !== 'paratie');
      } else if (id === 'paratie' && next.includes('paratie')) {
        next = next.filter(x => x !== 'paratie_sportello');
      }
      return next;
    });

    const accObj = product.accessories.find(a => a.id === id);
    if (accObj) {
      setTempImage(accObj.image);
      clearTimeout(window.tempImageTimeout);
      window.tempImageTimeout = setTimeout(() => setTempImage(null), 2500);
    }
  };

  const handleBaseSelect = (id) => {
    setSelectedBase(id);
    const b = product.baseOptions.find(o => o.id === id);
    if (b) {
      setTempImage(b.image);
      clearTimeout(window.tempImageTimeout);
      window.tempImageTimeout = setTimeout(() => setTempImage(null), 2500);
    }
  };

  const basePrice = product.pricingMatrix[selectedSize][selectedFinish];
  const baseOpt = product.baseOptions.find(o => o.id === selectedBase);
  const baseOptPrice = baseOpt?.price || 0;

  const accTotal = selectedAcc.reduce((sum, id) => {
    const acc = product.accessories.find(a => a.id === id);
    return sum + (acc?.pricingMatrix[selectedSize][selectedFinish] || 0);
  }, 0);
  
  const totalPrice = basePrice + baseOptPrice + accTotal;
  const activeAccessories = product.accessories.filter(a => selectedAcc.includes(a.id));
  const currentSize = sizeGroup.options.find(o => o.id === selectedSize);
  const currentFinish = finishGroup.options.find(o => o.id === selectedFinish);

  const handleRequestQuote = () => {
    let details = `- Misura: ${currentSize?.label || ''}\n`;
    details += `- Finitura: ${currentFinish?.label || ''}\n`;
    details += `- Appoggio: ${baseOpt?.name || ''}\n`;
    if (activeAccessories.length > 0) {
      details += `- Accessori:\n`;
      activeAccessories.forEach(acc => {
        details += `  * ${acc.name}\n`;
      });
    }
    sendQuoteEmail(product.name, details, totalPrice);
  };

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 250], [1, 0.65]);
  const yOffset = useTransform(scrollY, [0, 250], [0, -30]);

  if (introPhase === 0) {
    return (
      <div className="fullscreen-video" onClick={() => setIntroPhase(1)}>
        <video src={product.video} autoPlay muted playsInline onEnded={() => setIntroPhase(1)} />
        <div className="skip-hint">Tocca per saltare</div>
      </div>
    );
  }

  if (introPhase === 1) {
    return (
      <div className="fullscreen-video" onClick={() => setIntroPhase(2)}>
        <video src={product.intro360} autoPlay muted playsInline onEnded={() => setIntroPhase(2)} />
        <div className="skip-hint">Tocca per saltare</div>
      </div>
    );
  }

  const showTemp = !!tempImage;

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />

      <div className="config-layout">
        
        {/* VIEW AREA */}
        <div className="viewer" style={{ backgroundColor: '#000' }}>
          <div className="viewer-glow" />
          <motion.div className="viewer-product" style={{ scale, y: yOffset, transformOrigin: 'top center' }}>
            
            {/* BACKGROUND 360 VIDEO */}
            <video 
              src={product.intro360} 
              autoPlay loop muted playsInline 
              className="viewer-video" 
              style={{ opacity: showTemp ? 0 : 1, transition: 'opacity 0.6s ease' }} 
            />

            {/* TEMPORARY IMAGE OVERLAY */}
            <AnimatePresence mode="wait">
              {showTemp && (
                <motion.img
                  key={tempImage}
                  src={tempImage}
                  alt="Yellowstone Preview"
                  className="viewer-video viewer-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                />
              )}
            </AnimatePresence>

            {/* THUMBNAILS IN PICCOLO */}
            <div className="viewer-accessories" style={{ zIndex: 3, opacity: showTemp ? 0 : 1, transition: 'opacity 0.6s ease' }}>
              <AnimatePresence>
                {activeAccessories.map((acc, i) => (
                  <motion.div
                    key={acc.id}
                    className="hologram"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="hologram-inner">
                      <div style={{ backgroundImage: `url(${acc.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                    </div>
                    <span className="hologram-label">{acc.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>

        <div className="config-panel">
          <motion.div className="config-product-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="config-model-name">{product.name}</h2>
            <p className="config-model-sub">{product.tagline}</p>
            <p className="config-description">{product.description}</p>
          </motion.div>

          {/* STEP 1: SIZE */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="config-section-header">
              <span className="config-section-label">1 — Dimensione</span>
            </div>
            <div className="size-tabs">
              {sizeGroup.options.map(opt => {
                const active = selectedSize === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    className={`size-tab ${active ? 'size-tab--active' : ''}`}
                    onClick={() => setSelectedSize(opt.id)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="size-tab-label">{opt.label}</span>
                    <span className="size-tab-sub">{opt.sub}</span>
                  </motion.button>
                );
              })}
            </div>
            {/* Specs accordion */}
            <AnimatePresence mode="wait">
              <motion.ul
                key={selectedSize}
                className="variant-specs variant-specs--inline"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {currentSize.specs.map((s, i) => <li key={i}>{s}</li>)}
              </motion.ul>
            </AnimatePresence>
          </motion.div>

          {/* STEP 2: FINISH */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="config-section-header">
              <span className="config-section-label">2 — Materiale Base</span>
            </div>
            <div className="matrix-group">
              {finishGroup.options.map(opt => {
                const active = selectedFinish === opt.id;
                const price = product.pricingMatrix[selectedSize][opt.id];
                return (
                  <motion.div
                    key={opt.id}
                    className={`matrix-option ${active ? 'matrix-option--active' : ''}`}
                    onClick={() => setSelectedFinish(opt.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="matrix-option-top">
                      <div className="matrix-option-info">
                        <p className="matrix-option-label">{opt.label}</p>
                        {opt.sub && <p className="matrix-option-sub">{opt.sub}</p>}
                        <p className="matrix-option-price">€ {price.toFixed(2)}</p>
                      </div>
                      <CheckBadge active={active} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* STEP 3: BASE SELECTION */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="config-section-header">
              <span className="config-section-label">3 — Appoggio / Mobilità</span>
            </div>
            <div className="acc-grid">
              {product.baseOptions.map(opt => {
                const active = selectedBase === opt.id;
                return (
                  <motion.div
                    key={opt.id}
                    className={`acc-card ${active ? 'acc-card--selected' : ''}`}
                    onClick={() => handleBaseSelect(opt.id)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="acc-card-img-wrap">
                      <img src={opt.image} alt={opt.name} className="acc-card-img" />
                    </div>
                    <div className="acc-card-body">
                      <p className="acc-card-name">{opt.name}</p>
                      <p className="acc-card-price">{opt.price === 0 ? 'Incluso' : `+ € ${opt.price.toFixed(2)}`}</p>
                    </div>
                    <CheckBadge active={active} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* STEP 4: ACCESSORIES */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="config-section-header">
              <span className="config-section-label">4 — Accessori (prezzo in base a misura/finitura)</span>
            </div>
            <div className="acc-grid">
              {product.accessories.map(acc => {
                const active = selectedAcc.includes(acc.id);
                const accPrice = acc.pricingMatrix[selectedSize][selectedFinish];
                return (
                  <motion.div
                    key={acc.id}
                    className={`acc-card ${active ? 'acc-card--selected' : ''}`}
                    onClick={() => toggleAcc(acc.id)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="acc-card-img-wrap">
                      <img src={acc.image} alt={acc.name} className="acc-card-img" />
                    </div>
                    <div className="acc-card-body">
                      <p className="acc-card-name">{acc.name}</p>
                      <p className="acc-card-price">+ € {accPrice.toFixed(2)}</p>
                    </div>
                    <CheckBadge active={active} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Preload hidden images to guarantee instant flash */}
          <div style={{ display: 'none' }}>
            {product.accessories.map(a => <img key={a.id} src={a.image} alt="preload" />)}
            {product.baseOptions.map(b => <img key={b.id} src={b.image} alt="preload" />)}
          </div>

          {/* FOOTER */}
          <FooterBar totalPrice={totalPrice} delay={0.6} onRequestQuote={handleRequestQuote} />
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   ROOT
   ============================================= */
const CONFIG_MAP = {
  suma:   SumaConfigurator,
  flat:   FlatConfigurator,
  matrix: MatrixConfigurator,
  yellowstone: YellowstoneConfigurator,
};

export default function App() {
  const [view, setView] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const goToSelect = () => setView('flame');
  const handleFlameComplete = () => setView('select');
  const goToConfigurator = (product) => { setSelectedProduct(product); setView('configurator'); };
  const goBack = () => {
    if (view === 'configurator') setView('select');
    else if (view === 'select') setView('landing');
  };

  const ConfigComponent = selectedProduct ? CONFIG_MAP[selectedProduct.variantType] : null;

  return (
    <div className="root">
      <AnimatePresence>
        {view === 'flame' && <FlameTransition key="flame" onComplete={handleFlameComplete} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {(view === 'landing' || view === 'flame') && <LandingPage key="landing" onStart={goToSelect} />}
        {view === 'select'        && <ProductSelect  key="select"        onSelect={goToConfigurator} />}
        {view === 'configurator'  && selectedProduct && ConfigComponent && (
          <ConfigComponent key="configurator" product={selectedProduct} onBack={goBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
