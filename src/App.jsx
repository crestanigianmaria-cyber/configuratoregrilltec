import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, ArrowLeft, ShoppingCart, Trash2, X, Flame } from 'lucide-react';
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
    id: 'cucina_yellowstone',
    name: 'Cucina barbecue modello Yellowstone',
    tagline: 'Il massimo per la tua cucina outdoor.',
    description: 'Modello Yellowstone configurabile con o senza bancone di base. Aggiungi il BBQ Grill, mensole laterali, pannelli e ruote per personalizzare la tua postazione di cottura perfetta.',
    image: '/cucina_yellowstone/B.jpeg',
    video: '/cucina_yellowstone/PrincipaleC.mp4',
    intro360: '/cucina_yellowstone/360C.mp4',
    thumbnail: '/cucina_yellowstone/B.jpeg',
    basePrice: 0,
    variantType: 'yellowstone',
    features: [
      'Configurabile con o senza bancone',
      'BBQ Grill a legna/carbonella',
      'Mensole laterali e pannelli su misura',
    ],
    variantGroups: [
      {
        id: 'size',
        label: 'Dimensione',
        options: [
          { id: '700', label: 'L 700', sub: 'Bancone L700×P750×H630', specs: ['Misura L700'] },
          { id: '900', label: 'L 900', sub: 'Bancone L900×P750×H630', specs: ['Misura L900'] },
          { id: '1100', label: 'L 1100', sub: 'Bancone L1100×P750×H630', specs: ['Misura L1100'] },
        ]
      },
      {
        id: 'finish',
        label: 'Materiale',
        options: [
          { id: 'ral7016', label: 'Verniciato RAL 7016', sub: 'Finitura Premium' },
          { id: 'corten', label: 'Acciaio Corten', sub: 'Materiale naturale' },
          { id: 'inox', label: 'AISI 304 Spazzolato', sub: 'Acciaio Inossidabile' }
        ]
      }
    ],
    pricingMatrix: {
      '700': { ral7016: 0, corten: 0, inox: 0 },
      '900': { ral7016: 0, corten: 0, inox: 0 },
      '1100': { ral7016: 0, corten: 0, inox: 0 }
    },
    baseOptions: [
      { id: 'senza_base', name: 'Senza Bancone', price: 0, image: null },
      { 
        id: 'bancone', name: 'Bancone di base', image: '/cucina_yellowstone/B.jpeg',
        pricingMatrix: {
          '700': { ral7016: 395.28, corten: 439.20, inox: 592.92 },
          '900': { ral7016: 461.16, corten: 512.40, inox: 691.74 },
          '1100': { ral7016: 527.04, corten: 585.60, inox: 790.56 }
        }
      }
    ],
    accessories: [
      {
        id: 'grill', name: 'BBQ Grill a legna/carbonella', image: '/cucina_yellowstone/1.jpeg',
        requiresBase: false,
        sizeVariants: {
          '700': { specs: 'Camera L630/P500' },
          '900': { specs: 'Camera L830/P500' },
          '1100': { specs: 'Camera L1030/P500' }
        },
        pricingMatrix: {
          '700': { ral7016: 585.60, corten: 658.80, inox: 988.20 },
          '900': { ral7016: 702.72, corten: 790.56, inox: 1185.84 },
          '1100': { ral7016: 810.90, corten: 922.32, inox: 1383.48 }
        }
      },
      {
        id: 'mensole', name: 'Mensole laterali per caminetto', image: '/cucina_yellowstone/2.jpeg',
        requiresBase: true,
        sizeVariants: {
          '700': { specs: 'Barre inox L1700' },
          '900': { specs: 'Barre inox L1900' },
          '1100': { specs: 'Barre inox L2100' }
        },
        pricingMatrix: {
          '700': { ral7016: 335.50, corten: 366.00, inox: 549.00 },
          '900': { ral7016: 348.92, corten: 380.67, inox: 570.96 },
          '1100': { ral7016: 362.34, corten: 395.28, inox: 592.92 }
        }
      },
      {
        id: 'pannelli_fissi', name: 'Pannelli di tamponamento fisso (3 lati)', image: '/cucina_yellowstone/3.jpeg',
        requiresBase: true,
        excludes: ['pannelli_porta'],
        sizeVariants: {
          '700': { specs: 'Retro 700x570' },
          '900': { specs: 'Retro 900x570' },
          '1100': { specs: 'Retro 1100x570' }
        },
        pricingMatrix: {
          '700': { ral7016: 134.20, corten: 146.40, inox: 219.60 },
          '900': { ral7016: 161.04, corten: 175.68, inox: 263.52 },
          '1100': { ral7016: 187.88, corten: 204.96, inox: 307.44 }
        }
      },
      {
        id: 'pannelli_porta', name: 'Pannelli su 3 lati + porta anteriore', image: '/cucina_yellowstone/3.jpeg',
        requiresBase: true,
        excludes: ['pannelli_fissi'],
        sizeVariants: {
          '700': { specs: 'Porta anteriore 700x570' },
          '900': { specs: 'Porta anteriore 900x570' },
          '1100': { specs: 'Porta anteriore 1100x570' }
        },
        pricingMatrix: {
          '700': { ral7016: 201.30, corten: 219.60, inox: 329.40 },
          '900': { ral7016: 241.56, corten: 263.52, inox: 395.28 },
          '1100': { ral7016: 281.82, corten: 307.44, inox: 461.16 }
        }
      },
      {
        id: 'ruote_zincate', name: 'Coppia di ruote zincate', image: '/cucina_yellowstone/A.jpeg',
        requiresBase: true,
        excludes: ['ruote_inox'],
        sizeVariants: {
          '700': { specs: 'Ø 200 mm' },
          '900': { specs: 'Ø 200 mm' },
          '1100': { specs: 'Ø 200 mm' }
        },
        pricingMatrix: {
          '700': { ral7016: 108.00, corten: 108.00, inox: 108.00 },
          '900': { ral7016: 108.00, corten: 108.00, inox: 108.00 },
          '1100': { ral7016: 108.00, corten: 108.00, inox: 108.00 }
        }
      },
      {
        id: 'ruote_inox', name: 'Coppia di ruote inox', image: '/cucina_yellowstone/A.jpeg',
        requiresBase: true,
        excludes: ['ruote_zincate'],
        sizeVariants: {
          '700': { specs: 'Ø 200 mm' },
          '900': { specs: 'Ø 200 mm' },
          '1100': { specs: 'Ø 200 mm' }
        },
        pricingMatrix: {
          '700': { ral7016: 180.00, corten: 180.00, inox: 180.00 },
          '900': { ral7016: 180.00, corten: 180.00, inox: 180.00 },
          '1100': { ral7016: 180.00, corten: 180.00, inox: 180.00 }
        }
      }
    ]
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
      {
        id: 'coperchio_inox',
        name: 'Coperchio in Acciaio Inox',
        subtitle: 'Per cotture profonde e uniformi e per mantenere la temperatura nel tempo',
        image: '/copercchiosumo.png',
        sizeVariants: {
          compact:  { price: 97.60, specs: '520×200×110H mm' },
          standard: { price: 122.00, specs: '520×300×110H mm' },
        },
      },
      {
        id: 'tavolo_suma_acc',
        name: 'Tavolo Suma (con incasso BBQ)',
        subtitle: 'Integrazione perfetta per il tuo outdoor',
        video: '/arredogiardino/tavolo-suma.mp4',
        sizeVariants: {
          compact:  { price: 0, specs: 'Su preventivo' },
          standard: { price: 0, specs: 'Su preventivo' },
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
    accessories: [
      {
        id: 'motore_arrosticini',
        name: 'Motore per arrosticini',
        video: '/arrosticini/motorearrosticini.mp4',
        image: '/arrosticini/motorearrosticini.mp4',
        prices: {
          'arrosticini_500': 241.20,
          'arrosticini_1000': 211.14
        }
      }
    ],
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
  {
    id: 'arredo_giardino',
    name: 'Linea Arredo Giardino IPE',
    tagline: 'Componi il tuo spazio relax outdoor.',
    description: 'La nostra esclusiva linea di arredo giardino combina la solidità dell\'acciaio alla raffinatezza del legno IPE ad altissima densità. Personalizza le dimensioni e le finiture per ogni singolo elemento: tavoli, panche e accessori perfettamente abbinati.',
    video: '/arredogiardino/tavolo.mp4',
    image: '/arredogiardino/tavolo.mp4',
    thumbnail: '/arredogiardino/tavolo.mp4',
    basePrice: 988.20,
    variantType: 'composition',
    features: [
      'Legno IPE 120 mm ad altissima densità',
      'Strutture modulari in acciaio',
      'Componibile su misura',
      'Massima resistenza alle intemperie'
    ],
    items: [
      {
        id: 'tavolo',
        name: 'Tavolo Outdoor',
        video: '/arredogiardino/tavolo.mp4',
        image: '/arredogiardino/tavolo.mp4',
        materials: [
          { id: 'ral', label: 'Verniciato RAL' },
          { id: 'aisi', label: 'Acciaio AISI 304' }
        ],
        sizes: [
          { id: '2000', label: '2000x1000', sub: 'H 750 mm' },
          { id: '2500', label: '2500x1000', sub: 'H 750 mm' },
          { id: '3000', label: '3000x1000', sub: 'H 750 mm' }
        ],
        pricingMatrix: {
          '2000': { ral: 988.20, aisi: 1185.84 },
          '2500': { ral: 1207.80, aisi: 1449.36 },
          '3000': { ral: 1427.40, aisi: 1712.88 }
        }
      },

      {
        id: 'panca',
        name: 'Panca',
        video: '/arredogiardino/panca.mp4',
        image: '/arredogiardino/panca.mp4',
        materials: [
          { id: 'grezzo', label: 'Ferro Grezzo' },
          { id: 'aisi', label: 'Acciaio AISI 304' }
        ],
        sizes: [
          { id: '600', label: '600x400', sub: 'H 450 mm' },
          { id: '800', label: '800x400', sub: 'H 450 mm' },
          { id: '1000', label: '1000x400', sub: 'H 450 mm' }
        ],
        pricingMatrix: {
          '600': { grezzo: 237.90, aisi: 285.48 },
          '800': { grezzo: 292.80, aisi: 351.36 },
          '1000': { grezzo: 347.70, aisi: 417.24 }
        }
      },
      {
        id: 'panca_schienale',
        name: 'Panca con Schienale',
        video: '/arredogiardino/panca-schienale.mp4',
        image: '/arredogiardino/panca-schienale.mp4',
        materials: [
          { id: 'grezzo', label: 'Ferro Grezzo' },
          { id: 'aisi', label: 'Acciaio AISI 304' }
        ],
        sizes: [
          { id: '600', label: '600x400', sub: 'H 450+300 mm' },
          { id: '800', label: '800x400', sub: 'H 450+300 mm' },
          { id: '1000', label: '1000x400', sub: 'H 450+300 mm' }
        ],
        pricingMatrix: {
          '600': { grezzo: 329.40, aisi: 395.28 },
          '800': { grezzo: 402.60, aisi: 483.12 },
          '1000': { grezzo: 475.80, aisi: 570.96 }
        }
      },
      {
        id: 'cestino',
        name: 'Cover Copribidone',
        video: '/arredogiardino/cestino.mp4',
        image: '/arredogiardino/cestino.mp4',
        materials: [
          { id: 'aisi', label: 'AISI 304 + IPE' }
        ],
        sizes: [
          { id: 'standard', label: 'Est. 467x467', sub: 'H 800 mm' }
        ],
        pricingMatrix: {
          'standard': { aisi: 497.76 }
        }
      }
    ]
  },
  {
    id: 'bracieri_tavoli',
    name: 'Bracieri e Tavoli da Cottura',
    tagline: 'Il calore del fuoco, la convivialità del tavolo.',
    description: 'Una collezione di bracieri e tavoli da cottura progettati per unire design e funzionalità. Perfetti per creare postazioni di cottura all\'aperto o angoli relax con fuoco a vista.',
    video: '/tavoli_cottura/bracierequadro-corten.mp4',
    image: '/tavoli_cottura/bracierequadro-corten.mp4',
    thumbnail: '/tavoli_cottura/bracierequadro-corten.mp4',
    basePrice: 1629.00,
    variantType: 'composition',
    features: [
      'Materiali premium: Corten, Lamiera e Legno IPE',
      'Piastre di cottura in acciaio AISI 304',
      'Bracieri integrati nel design',
      'Alta resistenza agli agenti atmosferici'
    ],
    items: [
      {
        id: 'braciere_quadro_corten',
        name: 'Braciere Quadro in Corten',
        video: '/tavoli_cottura/bracierequadro-corten.mp4',
        image: '/tavoli_cottura/bracierequadro-corten.mp4',
        materials: [{ id: 'corten', label: 'Acciaio Corten' }],
        sizes: [{ id: '810', label: '810x810', sub: 'H 860 mm' }],
        pricingMatrix: { '810': { corten: 1629.00 } }
      },
      {
        id: 'braciere_quadro_verniciato',
        name: 'Braciere Quadro Verniciato',
        video: '/tavoli_cottura/bracierequadro-verniciato.mp4',
        image: '/tavoli_cottura/bracierequadro-verniciato.mp4',
        materials: [{ id: 'ral9016', label: 'Verniciato RAL 9016' }],
        sizes: [{ id: '1220', label: '1220x1220', sub: 'H 860 mm' }],
        pricingMatrix: { '1220': { ral9016: 1773.00 } }
      },
      {
        id: 'tavolo_braciere_metallo',
        name: 'Tavolo Braciere in Lamiera',
        video: '/tavoli_cottura/tavolobraciere-metallo.mp4',
        image: '/tavoli_cottura/tavolobraciere-metallo.mp4',
        materials: [{ id: 'ral7016', label: 'Verniciato RAL 7016' }],
        sizes: [{ id: '1700', label: '1700x1700', sub: 'H 800 mm' }],
        pricingMatrix: { '1700': { ral7016: 2349.00 } }
      },
      {
        id: 'tavolo_braciere_legno',
        name: 'Tavolo Braciere in Legno IPE',
        video: '/tavoli_cottura/tavolobraciere-legno.mp4',
        image: '/tavoli_cottura/tavolobraciere-legno.mp4',
        materials: [{ id: 'ipe', label: 'Legno IPE' }],
        sizes: [{ id: '1825', label: '1825x1825', sub: 'H 750 mm' }],
        pricingMatrix: { '1825': { ipe: 2718.00 } }
      },
      {
        id: 'tavolo_suma',
        name: 'Tavolo Suma (con incasso BBQ)',
        video: '/arredogiardino/tavolo-suma.mp4',
        image: '/arredogiardino/tavolo-suma.mp4',
        materials: [
          { id: 'ral', label: 'Verniciato RAL' },
          { id: 'aisi', label: 'Acciaio AISI 304' }
        ],
        sizes: [
          { id: '2000', label: '2000x1000', sub: 'H 750 mm' },
          { id: '2500', label: '2500x1000', sub: 'H 750 mm' },
          { id: '3000', label: '3000x1000', sub: 'H 750 mm' }
        ],
        pricingMatrix: {
          '2000': { ral: 0, aisi: 0 },
          '2500': { ral: 0, aisi: 0 },
          '3000': { ral: 0, aisi: 0 }
        }
      }
    ]
  }
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

function sendQuoteEmailGlobal(cart, total) {
  const email = "grilltec@br9.it";
  let body = "Ciao, vorrei ricevere un preventivo per i seguenti prodotti configurati:\n\n";
  cart.forEach((item, i) => {
    body += `--- PRODOTTO ${i+1}: ${item.productName} ---\n`;
    body += item.details + "\n";
    body += `Subtotale stimato: € ${item.price.toFixed(2)}\n\n`;
  });
  body += `===============================\nTOTALE STIMATO: € ${total.toFixed(2)}\n\n`;
  body += "In attesa di un vostro riscontro.\nGrazie.";
  
  window.location.href = `mailto:${email}?subject=${encodeURIComponent("Richiesta Preventivo Multiplo - Grilltec")}&body=${encodeURIComponent(body)}`;
}

function CartDrawer({ cart, onClose, onRemoveItem, onSendQuote }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <motion.div className="cart-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      <motion.div className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 400, backgroundColor: '#111', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #333' }}>
        <div className="cart-header" style={{ padding: '24px 20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Il tuo Preventivo</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        
        <div className="cart-body" style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {cart.length === 0 ? (
            <div className="cart-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
              <ShoppingCart size={48} style={{ marginBottom: 16 }} />
              <p>Nessun prodotto configurato.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map((item, i) => (
                <div key={i} className="cart-item" style={{ backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, border: '1px solid #333' }}>
                  <div className="cart-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#0a84ff' }}>{item.productName}</h3>
                    <button onClick={() => onRemoveItem(i)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', padding: 4 }}><Trash2 size={16} /></button>
                  </div>
                  <pre className="cart-item-details" style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.4 }}>{item.details}</pre>
                  <p className="cart-item-price" style={{ margin: '12px 0 0', fontSize: '0.9rem', fontWeight: 600, textAlign: 'right' }}>€ {item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer" style={{ padding: 24, borderTop: '1px solid #333', backgroundColor: '#0a0a0a' }}>
            <div className="cart-total" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Totale stimato:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>€ {total.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} onClick={() => onSendQuote(total)}>
              Invia Richiesta Unica
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CartFloatingButton({ count, onClick }) {
  if (count === 0) return null;
  return (
    <motion.button
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 90 }}
      whileHover={{ scale: 1.08, rotate: -5 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 85,
        right: 24,
        width: 72,
        height: 72,
        borderRadius: 36,
        background: 'linear-gradient(135deg, #0a84ff, #005bb5)',
        color: '#fff',
        border: '2px solid rgba(255,255,255,0.2)',
        boxShadow: '0 12px 40px rgba(10,132,255,0.4), inset 0 -4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ShoppingCart size={26} strokeWidth={2.5} style={{ position: 'relative', zIndex: 2 }} />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -14, color: '#ffaa44', zIndex: 1 }}
        >
          <Flame size={20} strokeWidth={3} fill="rgba(255,170,68,0.5)" />
        </motion.div>
      </div>
      <div style={{
        position: 'absolute',
        bottom: -6,
        backgroundColor: '#ff3b30',
        color: '#fff',
        padding: '2px 10px',
        borderRadius: 12,
        fontSize: '0.8rem',
        fontWeight: '900',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        border: '2px solid #111'
      }}>
        {count}
      </div>
    </motion.button>
  );
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
        Aggiungi al Preventivo
      </motion.button>
    </motion.div>
  );
}

function ProductViewer({ product, activeAccessories, tempMedia }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 250], [1, 0.65]);
  const yOffset = useTransform(scrollY, [0, 250], [0, -30]);

  const showTemp = !!tempMedia;
  const isTempVideo = tempMedia && tempMedia.endsWith('.mp4');

  return (
    <div className="viewer" style={{ backgroundColor: '#000' }}>
      <div className="viewer-glow" />
      <motion.div className="viewer-product" style={{ scale, y: yOffset, transformOrigin: 'top center' }}>
        
        {/* Main Background */}
        {product.video ? (
          <motion.video
            autoPlay loop muted playsInline
            key={product.id + '-video'}
            src={product.video}
            className="viewer-video"
            style={{ opacity: showTemp ? 0 : 1, transition: 'opacity 0.6s ease' }}
          />
        ) : (
          <motion.img
            key={product.id + '-img'}
            src={product.image}
            alt={product.name}
            className="viewer-video viewer-img"
            style={{ opacity: showTemp ? 0 : 1, transition: 'opacity 0.6s ease' }}
          />
        )}

        {/* Temporary Media Overlay */}
        <AnimatePresence mode="wait">
          {showTemp && (
            isTempVideo ? (
              <motion.video
                key={tempMedia}
                autoPlay muted playsInline
                src={tempMedia}
                className="viewer-video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
              />
            ) : (
              <motion.img
                key={tempMedia}
                src={tempMedia}
                alt="Preview"
                className="viewer-video viewer-img"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
              />
            )
          )}
        </AnimatePresence>

      </motion.div>
      
      {/* Thumbnails in Piccolo */}
      <motion.div className="viewer-accessories" style={{ scale, y: yOffset, transformOrigin: 'right center', zIndex: 3, opacity: showTemp ? 0 : 1, transition: 'opacity 0.6s ease' }}>
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
              <div className="hologram-inner">
                {acc.video ? (
                  <video autoPlay loop muted playsInline src={acc.video} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ backgroundImage: `url(${acc.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
                )}
              </div>
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
function SumaConfigurator({ product, onBack, onNavigate, onAddToCart }) {
  const sizeGroup   = product.variantGroups.find(g => g.id === 'size');
  const finishGroup = product.variantGroups.find(g => g.id === 'finish');

  const [selectedSize,   setSelectedSize]   = useState(sizeGroup.options[0].id);
  const [selectedFinish, setSelectedFinish] = useState(finishGroup.options[0].id);
  const [selectedAcc,    setSelectedAcc]    = useState([]);
  const [tempMedia, setTempMedia] = useState(null);

  // When size changes, reset accessories
  const handleSizeChange = (sizeId) => {
    setSelectedSize(sizeId);
    setSelectedAcc([]);
  };

  const toggleAcc = (id) => {
    setSelectedAcc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const accObj = product.accessories.find(a => a.id === id);
    if (accObj) {
      setTempMedia(accObj.video || accObj.image);
      clearTimeout(window.tempMediaTimeoutSuma);
      window.tempMediaTimeoutSuma = setTimeout(() => setTempMedia(null), 2500);
    }
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
        const accPrice = acc.sizeVariants[selectedSize]?.price ?? 0;
        details += `  * ${acc.name} ${accPrice === 0 ? '(Su preventivo)' : ''}\n`;
      });
    }
    onAddToCart(product.name, details, totalPrice);
  };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />

      <div className="config-layout">
        <ProductViewer product={product} activeAccessories={activeAccessories} tempMedia={tempMedia} />

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
                      <p className="acc-card-price">{sizeVar.price === 0 ? 'Su preventivo' : `+ € ${sizeVar.price.toFixed(2)}`}</p>
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
            
            <AnimatePresence>
              {selectedAcc.includes('tavolo_suma_acc') && onNavigate && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #1f1c18, #332115)',
                    border: '1px solid #ffaa44',
                    borderRadius: 16,
                    padding: 16,
                    marginTop: 16,
                    display: 'flex',
                    gap: 16,
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const bracieriProd = PRODUCTS.find(p => p.id === 'bracieri_tavoli');
                    if (bracieriProd) {
                      const sizeOpt = sizeGroup.options.find(o => o.id === selectedSize);
                      const finishOpt = finishGroup.options.find(o => o.id === selectedFinish);
                      let details = `- Misura: ${sizeOpt?.label || ''}\n- Finitura: ${finishOpt?.label || ''}\n`;
                      if (activeAccessories.length > 0) {
                        details += `- Accessori:\n`;
                        activeAccessories.forEach(acc => {
                          const accPrice = acc.sizeVariants[selectedSize]?.price ?? 0;
                          details += `  * ${acc.name} ${accPrice === 0 ? '(Su preventivo)' : ''}\n`;
                        });
                      }
                      onAddToCart(product.name, details, totalPrice, bracieriProd);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ width: 80, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,170,68,0.5)' }}>
                    <video src="/arredogiardino/tavolo-suma.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#ffaa44', fontWeight: 600 }}>Scegli le misure del tavolo!</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#fff', lineHeight: 1.3 }}>Il tuo Suma verrà aggiunto al preventivo e passerai a Bracieri e Tavoli da cottura.</p>
                  </div>
                  <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#ffaa44', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    →
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
function FlatConfigurator({ product, onBack, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedAcc, setSelectedAcc] = useState([]);

  const toggleAcc = (id) => {
    setSelectedAcc(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const accTotal = selectedAcc.reduce((sum, id) => {
    const acc = product.accessories?.find(a => a.id === id);
    return sum + (acc?.prices?.[selectedVariant.id] || 0);
  }, 0);

  const totalPrice = selectedVariant.price + accTotal;
  const activeAccessories = product.accessories?.filter(a => selectedAcc.includes(a.id)) || [];

  const handleRequestQuote = () => {
    let details = `- Variante: ${selectedVariant?.label || ''}\n`;
    if (activeAccessories.length > 0) {
      details += `- Accessori:\n`;
      activeAccessories.forEach(acc => {
        details += `  * ${acc.name}\n`;
      });
    }
    onAddToCart(product.name, details, totalPrice);
  };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />
      <div className="config-layout">
        <ProductViewer product={product} activeAccessories={activeAccessories} />
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

          {product.accessories && product.accessories.length > 0 && (
            <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
              <div className="config-section-header">
                <span className="config-section-label">Accessori opzionali</span>
                {selectedAcc.length > 0 && <span className="config-section-count">{selectedAcc.length} selezionati</span>}
              </div>
              <div className="acc-list">
                {product.accessories.map((acc, i) => {
                  const isSelected = selectedAcc.includes(acc.id);
                  const accPrice = acc.prices?.[selectedVariant.id] || 0;
                  return (
                    <motion.div
                      key={acc.id}
                      className={`acc-card ${isSelected ? 'acc-card--selected' : ''}`}
                      onClick={() => toggleAcc(acc.id)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.52 + i * 0.08 }}
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
                        <p className="acc-card-price">+ € {accPrice.toFixed(2)}</p>
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
          )}
        </div>
      </div>
      <FooterBar totalPrice={totalPrice} delay={0.6} onRequestQuote={handleRequestQuote} />
    </motion.div>
  );
}

/* =============================================
   MATRIX CONFIGURATOR (Grilltec 360)
   ============================================= */
function MatrixConfigurator({ product, onBack, onAddToCart }) {
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
    onAddToCart(product.name, details, totalPrice);
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
function YellowstoneConfigurator({ product, onBack, onAddToCart }) {
  const [introPhase, setIntroPhase] = useState(0); // 0: intro1, 1: intro2, 2: config
  const [selectedSize, setSelectedSize] = useState(() => product.variantGroups.find(g => g.id === 'size').options[0].id);
  const [selectedFinish, setSelectedFinish] = useState(() => product.variantGroups.find(g => g.id === 'finish').options[0].id);
  const [selectedBase, setSelectedBase] = useState(() => product.baseOptions[0].id);
  const [selectedAcc, setSelectedAcc] = useState([]);
  const [tempImage, setTempImage] = useState(null);

  const sizeGroup = product.variantGroups.find(g => g.id === 'size');
  const finishGroup = product.variantGroups.find(g => g.id === 'finish');

  const toggleAcc = (id) => {
    const accObj = product.accessories.find(a => a.id === id);
    if (!accObj) return;

    // Se l'accessorio richiede il bancone e l'utente ha selezionato 'senza_base', non far nulla.
    if (accObj.requiresBase && selectedBase === 'senza_base') {
      return;
    }

    setSelectedAcc(prev => {
      let next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      
      // Dynamic excludes logic
      if (next.includes(id) && accObj.excludes) {
        next = next.filter(x => !accObj.excludes.includes(x));
      }

      // Backward compatible hardcoded paratie logic for original Yellowstone
      if (id === 'paratie_sportello' && next.includes('paratie_sportello')) {
        next = next.filter(x => x !== 'paratie');
      } else if (id === 'paratie' && next.includes('paratie')) {
        next = next.filter(x => x !== 'paratie_sportello');
      }

      return next;
    });

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

  // Effect to automatically deselect accessories that require a base if the base is removed
  useEffect(() => {
    if (selectedBase === 'senza_base') {
      setSelectedAcc(prev => prev.filter(accId => {
        const a = product.accessories.find(x => x.id === accId);
        return a && !a.requiresBase;
      }));
    }
  }, [selectedBase, product.accessories]);

  const basePrice = product.pricingMatrix[selectedSize][selectedFinish];
  const baseOpt = product.baseOptions.find(o => o.id === selectedBase);
  const baseOptPrice = baseOpt?.pricingMatrix ? (baseOpt.pricingMatrix[selectedSize]?.[selectedFinish] || 0) : (baseOpt?.price || 0);

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
    onAddToCart(product.name, details, totalPrice);
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
                        {price > 0 && <p className="matrix-option-price">€ {price.toFixed(2)}</p>}
                      </div>
                      <CheckBadge active={active} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* MATERIAL DETAILS HUD */}
            <AnimatePresence mode="wait">
              {selectedFinish && (
                <MaterialPanel materialId={selectedFinish} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 3: BASE SELECTION */}
          <motion.div className="config-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="config-section-header">
              <span className="config-section-label">3 — Appoggio / Mobilità</span>
            </div>
            <div className="acc-grid">
              {product.baseOptions.map(opt => {
                const active = selectedBase === opt.id;
                const optPrice = opt.pricingMatrix ? (opt.pricingMatrix[selectedSize]?.[selectedFinish] || 0) : (opt.price || 0);
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
                      <p className="acc-card-price">{optPrice === 0 ? 'Incluso' : `+ € ${optPrice.toFixed(2)}`}</p>
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
                const disabled = acc.requiresBase && selectedBase === 'senza_base';
                const accPrice = acc.pricingMatrix[selectedSize][selectedFinish] || 0;
                const specText = acc.sizeVariants ? acc.sizeVariants[selectedSize]?.specs : null;

                return (
                  <motion.div
                    key={acc.id}
                    className={`acc-card ${active ? 'acc-card--selected' : ''}`}
                    onClick={() => { if (!disabled) toggleAcc(acc.id); }}
                    whileTap={{ scale: disabled ? 1 : 0.97 }}
                    style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
                  >
                    <div className="acc-card-img-wrap">
                      <img src={acc.image} alt={acc.name} className="acc-card-img" />
                    </div>
                    <div className="acc-card-body">
                      <p className="acc-card-name">{acc.name}</p>
                      {specText && <p className="acc-card-sub">{specText}</p>}
                      <p className="acc-card-price">{accPrice === 0 ? 'Su preventivo' : `+ € ${accPrice.toFixed(2)}`}</p>
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
   COMPOSITION CONFIGURATOR (Arredo Giardino)
   ============================================= */
function CompositionConfigurator({ product, onBack, onNavigate, onAddToCart }) {
  const [selections, setSelections] = useState(() => {
    const init = {};
    product.items.forEach(item => {
      init[item.id] = {
        size: item.sizes[0].id,
        material: item.materials[0].id,
        qty: 0
      };
    });
    return init;
  });

  const [activeTab, setActiveTab] = useState(product.items[0].id);

  const updateSelection = (itemId, key, value) => {
    setSelections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], [key]: value }
    }));
  };

  const totalPrice = product.items.reduce((sum, item) => {
    const sel = selections[item.id];
    const price = item.pricingMatrix[sel.size]?.[sel.material] || 0;
    return sum + (price * sel.qty);
  }, 0);

  const cartItems = product.items.filter(item => selections[item.id].qty > 0);

  const handleRequestQuote = () => {
    if (cartItems.length === 0) {
      alert('Seleziona almeno un elemento per aggiungere al preventivo.');
      return;
    }
    let details = `\n`;
    product.items.forEach(item => {
      const sel = selections[item.id];
      if (sel.qty > 0) {
        const sizeOpt = item.sizes.find(s => s.id === sel.size);
        const matOpt = item.materials.find(m => m.id === sel.material);
        const price = item.pricingMatrix[sel.size]?.[sel.material] || 0;
        const priceLabel = price === 0 ? 'Su preventivo' : `€ ${(price * sel.qty).toFixed(2)}`;
        details += `- ${sel.qty}x ${item.name} (${sizeOpt.label}, ${matOpt.label}) — ${priceLabel}\n`;
      }
    });
    onAddToCart(product.name, details, totalPrice);
  };

  const activeItem = product.items.find(i => i.id === activeTab) || product.items[0];
  const viewProduct = { ...product, video: activeItem.video, image: activeItem.image };

  return (
    <motion.div className="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavBar onBack={onBack} />
      <div className="config-layout">
        <ProductViewer product={viewProduct} activeAccessories={[]} />

        <div className="config-panel">
          <motion.div className="config-product-header" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="config-model-name">{product.name}</h2>
            <p className="config-model-sub">{product.tagline}</p>
          </motion.div>

          {/* CART SUMMARY (visible when something is in cart) */}
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.div
                className="comp-cart-summary"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(10,132,255,0.12), rgba(10,132,255,0.04))',
                  border: '1px solid rgba(10,132,255,0.3)',
                  borderRadius: 16,
                  padding: '16px 20px',
                  marginBottom: 16,
                  overflow: 'hidden'
                }}
              >
                <p style={{ margin: '0 0 12px', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0a84ff', fontWeight: 600 }}>
                  La tua composizione
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cartItems.map(item => {
                    const sel = selections[item.id];
                    const sizeOpt = item.sizes.find(s => s.id === sel.size);
                    const matOpt = item.materials.find(m => m.id === sel.material);
                    const price = item.pricingMatrix[sel.size][sel.material];
                    return (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Mini video thumbnail */}
                        <div style={{ width: 52, height: 38, borderRadius: 8, overflow: 'hidden', flexShrink: 0, backgroundColor: '#111' }}>
                          <video src={item.video} muted playsInline autoPlay loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 500, color: '#fff' }}>
                            <span style={{ color: '#0a84ff', marginRight: 6 }}>{sel.qty}×</span>{item.name}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {sizeOpt?.label} · {matOpt?.label}
                          </p>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 600, color: '#fff', flexShrink: 0 }}>
                          {price === 0 ? 'Su preventivo' : `€ ${(price * sel.qty).toFixed(2)}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ITEM CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {product.items.map((item, idx) => {
              const sel = selections[item.id];
              const isActive = activeTab === item.id;
              const unitPrice = item.pricingMatrix[sel.size][sel.material];
              const hasQty = sel.qty > 0;

              return (
                <motion.div
                  key={item.id}
                  className="comp-card"
                  style={{
                    backgroundColor: '#161616',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: isActive
                      ? '1px solid rgba(255,255,255,0.22)'
                      : hasQty
                      ? '1px solid rgba(10,132,255,0.35)'
                      : '1px solid rgba(255,255,255,0.06)'
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                >
                  {/* CARD HEADER */}
                  <div
                    onClick={() => setActiveTab(isActive ? null : item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', cursor: 'pointer' }}
                  >
                    {/* Video thumbnail */}
                    <div style={{ width: 68, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, backgroundColor: '#0a0a0a', position: 'relative' }}>
                      <video
                        src={item.video}
                        muted playsInline
                        autoPlay={isActive || hasQty}
                        loop
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {hasQty && (
                        <div style={{
                          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: 'rgba(10,132,255,0.55)', backdropFilter: 'blur(2px)'
                        }}>
                          <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>{sel.qty}</span>
                        </div>
                      )}
                    </div>

                    {/* Name & price */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.98rem', color: '#fff' }}>{item.name}</p>
                      <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: hasQty ? '#0a84ff' : 'rgba(255,255,255,0.4)' }}>
                        {hasQty
                          ? (unitPrice === 0 ? 'Su preventivo' : `${sel.qty} × € ${unitPrice.toFixed(2)} = € ${(unitPrice * sel.qty).toFixed(2)}`)
                          : (Object.values(item.pricingMatrix[item.sizes[0].id])[0] === 0 ? 'Su preventivo' : `Da € ${Object.values(item.pricingMatrix[item.sizes[0].id])[0].toFixed(2)}`)}
                      </p>
                    </div>

                    {/* QTY controls */}
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 2, backgroundColor: '#222', borderRadius: 22, padding: '3px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => updateSelection(item.id, 'qty', Math.max(0, sel.qty - 1))}
                        style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: 'transparent', color: sel.qty > 0 ? '#fff' : 'rgba(255,255,255,0.25)', fontSize: '1.3rem', lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >−</button>
                      <span style={{ width: 28, textAlign: 'center', fontSize: '1rem', fontWeight: 600, color: hasQty ? '#0a84ff' : '#fff' }}>{sel.qty}</span>
                      <button
                        onClick={() => { updateSelection(item.id, 'qty', sel.qty + 1); setActiveTab(item.id); }}
                        style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: hasQty ? '#0a84ff' : '#333', color: '#fff', fontSize: '1.3rem', lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >+</button>
                    </div>
                  </div>

                  {/* EXPANDED BODY */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 16px 18px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                          {/* SIZE */}
                          <p style={{ margin: '14px 0 8px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Misura</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))', gap: 8 }}>
                            {item.sizes.map(sz => (
                              <button
                                key={sz.id}
                                className={`size-tab ${sel.size === sz.id ? 'size-tab--active' : ''}`}
                                onClick={() => updateSelection(item.id, 'size', sz.id)}
                              >
                                <span className="size-tab-label">{sz.label}</span>
                                {sz.sub && <span className="size-tab-sub">{sz.sub}</span>}
                              </button>
                            ))}
                          </div>

                          {/* MATERIAL */}
                          <p style={{ margin: '16px 0 8px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Materiale</p>
                          <div style={{ display: 'grid', gap: 8 }}>
                            {item.materials.map(mat => (
                              <div
                                key={mat.id}
                                className={`matrix-option ${sel.material === mat.id ? 'matrix-option--active' : ''}`}
                                onClick={() => updateSelection(item.id, 'material', mat.id)}
                              >
                                <div className="matrix-option-top">
                                  <div className="matrix-option-info">
                                    <p className="matrix-option-label">{mat.label}</p>
                                    <p className="matrix-option-price">{item.pricingMatrix[sel.size][mat.id] === 0 ? 'Su preventivo' : `€ ${item.pricingMatrix[sel.size][mat.id].toFixed(2)} / pz`}</p>
                                  </div>
                                  <CheckBadge active={sel.material === mat.id} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {cartItems.some(i => i.id === 'tavolo_suma') && onNavigate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #1f1c18, #332115)',
                  border: '1px solid #ffaa44',
                  borderRadius: 16,
                  padding: 16,
                  marginTop: 16,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const sumaProd = PRODUCTS.find(p => p.id === 'suma');
                  if (sumaProd) {
                    if (cartItems.length > 0) {
                      let details = `\n`;
                      product.items.forEach(item => {
                        const sel = selections[item.id];
                        if (sel.qty > 0) {
                          const sizeOpt = item.sizes.find(s => s.id === sel.size);
                          const matOpt = item.materials.find(m => m.id === sel.material);
                          const price = item.pricingMatrix[sel.size]?.[sel.material] || 0;
                          const priceLabel = price === 0 ? 'Su preventivo' : `€ ${(price * sel.qty).toFixed(2)}`;
                          details += `- ${sel.qty}x ${item.name} (${sizeOpt.label}, ${matOpt.label}) — ${priceLabel}\n`;
                        }
                      });
                      onAddToCart(product.name, details, totalPrice, sumaProd);
                    } else {
                      onNavigate(sumaProd);
                    }
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ width: 80, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,170,68,0.5)' }}>
                  <video src="/arredogiardino/scoprisuma.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#ffaa44', fontWeight: 600 }}>Hai scelto il tavolo con incasso!</p>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#fff', lineHeight: 1.3 }}>Scopri e configura il Barbecue Suma perfetto per completare la tua postazione.</p>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#ffaa44', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  →
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FooterBar totalPrice={totalPrice} delay={0.5} onRequestQuote={handleRequestQuote} />
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
  composition: CompositionConfigurator,
};

export default function App() {
  const [view, setView] = useState('landing');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Global Cart State
  const [globalCart, setGlobalCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const goToSelect = () => setView('flame');
  const handleFlameComplete = () => setView('select');
  const goToConfigurator = (product) => { setSelectedProduct(product); setView('configurator'); };
  const goBack = () => {
    if (view === 'configurator') setView('select');
    else if (view === 'select') setView('landing');
  };

  const handleAddToCart = (productName, details, price, nextProduct = null) => {
    setGlobalCart(prev => [...prev, { productName, details, price }]);
    if (nextProduct) {
      goToConfigurator(nextProduct);
    } else {
      setIsCartOpen(true);
      setView('select'); // Ritorna alla selezione prodotti
    }
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
          <ConfigComponent key="configurator" product={selectedProduct} onBack={goBack} onNavigate={goToConfigurator} onAddToCart={handleAddToCart} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {view !== 'landing' && view !== 'flame' && (
          <CartFloatingButton key="cart-btn" count={globalCart.length} onClick={() => setIsCartOpen(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            cart={globalCart} 
            onClose={() => setIsCartOpen(false)} 
            onRemoveItem={(index) => setGlobalCart(prev => prev.filter((_, i) => i !== index))}
            onSendQuote={(total) => {
              sendQuoteEmailGlobal(globalCart, total);
              setGlobalCart([]);
              setIsCartOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {view !== 'flame' && (
          <motion.a 
            href="https://opusdesign.it" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="opus-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
          >
            <span>Made by</span>
            <img src="/opusdesign-logo-v2.svg" alt="OpusDesign" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
