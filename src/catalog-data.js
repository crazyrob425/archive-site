const baseProducts = [
  {
    title: "The Lost Art of Mechanical Watchmaking",
    slug: "lost-art-mechanical-watchmaking",
    description:
      "Master the timeless craft of precision watchmaking. This comprehensive guide covers movement assembly, escapement design, and restoration techniques for vintage timepieces. Perfect for horologists and mechanical enthusiasts.",
    category: "lost-hobbies",
    price: "49.99",
    featured: true,
    cover: {
      accent: "#d4af37",
      accent2: "#7c4a1e",
      motif: "gear",
      subtitle: "Precision horology / restoration",
      footer: "Edition I • Sealed archive copy",
    },
  },
  {
    title: "Forgotten Woodworking Techniques",
    slug: "forgotten-woodworking-techniques",
    description:
      "Discover hand-tool woodworking methods from the pre-industrial era. Learn traditional joinery, wood selection, and finishing techniques that master craftsmen have used for centuries.",
    category: "lost-hobbies",
    price: "44.99",
    featured: true,
    cover: {
      accent: "#c77d39",
      accent2: "#6b3f1b",
      motif: "joinery",
      subtitle: "Hand tools / joinery / finishing",
      footer: "Workshop notes • Archive series",
    },
  },
  {
    title: "Industrial Secrets: Pre-Digital Manufacturing",
    slug: "industrial-secrets-pre-digital",
    description:
      "Explore the proprietary manufacturing techniques that built industrial empires. Detailed blueprints and specifications for machinery, production workflows, and quality control methods from the golden age of manufacturing.",
    category: "industrial-secrets",
    price: "59.99",
    featured: true,
    cover: {
      accent: "#9aa0a6",
      accent2: "#374151",
      motif: "factory",
      subtitle: "Blueprints / workflow / QA",
      footer: "Confidential industrial notes",
    },
  },
  {
    title: "Proprietary Formulations: Chemical Engineering Classics",
    slug: "proprietary-formulations-chemical",
    description:
      "Unlock rare chemical formulations and synthesis methods from restricted industrial archives. Includes detailed molecular diagrams, reaction pathways, and safety protocols for advanced chemical engineering.",
    category: "industrial-secrets",
    price: "64.99",
    featured: false,
    cover: {
      accent: "#6bbf8d",
      accent2: "#245c4a",
      motif: "molecule",
      subtitle: "Reaction maps / lab protocols",
      footer: "Restricted chemistry archive",
    },
  },
  {
    title: "Out-of-Print Technical Manual: Vintage Radio Repair",
    slug: "vintage-radio-repair-manual",
    description:
      "The definitive guide to restoring and repairing classic vacuum tube radios. Complete schematics, component specifications, and troubleshooting procedures for radios from 1920-1960.",
    category: "technical-manuals",
    price: "54.99",
    featured: true,
    cover: {
      accent: "#4aa3df",
      accent2: "#1c3557",
      motif: "wave",
      subtitle: "Vacuum tube repair / schematics",
      footer: "Reference manual • 1920-1960",
    },
  },
  {
    title: "Obsolete Computer Hardware: Restoration & Recovery",
    slug: "obsolete-computer-hardware",
    description:
      "A technical deep-dive into vintage computer systems. Learn circuit board repair, component replacement, and data recovery from obsolete storage media. Essential for retro computing enthusiasts.",
    category: "technical-manuals",
    price: "54.99",
    featured: false,
    cover: {
      accent: "#a78bfa",
      accent2: "#312e81",
      motif: "chip",
      subtitle: "Board repair / media recovery",
      footer: "Legacy hardware dossier",
    },
  },
  {
    title: "Secure File Sharing Protocols: Legacy Systems",
    slug: "secure-file-sharing-protocols",
    description:
      "Master encryption standards and secure data transfer methods used in legacy systems. Comprehensive coverage of cryptographic protocols, authentication mechanisms, and secure architecture design.",
    category: "software-collections",
    price: "69.99",
    featured: false,
    cover: {
      accent: "#f59e0b",
      accent2: "#7c2d12",
      motif: "lock",
      subtitle: "Authentication / crypto / transfer",
      footer: "Legacy security archive",
    },
  },
  {
    title: "EBook Management Systems: Advanced Techniques",
    slug: "ebook-management-systems",
    description:
      "Professional guide to building and managing digital library systems. Covers metadata standards, DRM implementation, distribution platforms, and user interface design for ebook ecosystems.",
    category: "software-collections",
    price: "59.99",
    featured: false,
    cover: {
      accent: "#22c55e",
      accent2: "#14532d",
      motif: "library",
      subtitle: "Metadata / DRM / distribution",
      footer: "Digital library operations",
    },
  },
  {
    title: "Rare Printing Methods: Letterpress & Beyond",
    slug: "rare-printing-methods",
    description:
      "Explore traditional and rare printing techniques including letterpress, relief printing, and hand-binding. Includes historical context, material sourcing, and step-by-step instruction for artisanal book production.",
    category: "lost-hobbies",
    price: "49.99",
    featured: false,
    cover: {
      accent: "#eab308",
      accent2: "#713f12",
      motif: "press",
      subtitle: "Letterpress / binding / finish",
      footer: "Artisanal print handbook",
    },
  },
  {
    title: "Archival Preservation: Conservation Masterclass",
    slug: "archival-preservation-conservation",
    description:
      "The authoritative guide to preserving rare documents, manuscripts, and artifacts. Learn conservation techniques, environmental controls, and restoration methods used by world-class archives.",
    category: "lost-hobbies",
    price: "54.99",
    featured: false,
    cover: {
      accent: "#38bdf8",
      accent2: "#0f4c75",
      motif: "archive",
      subtitle: "Conservation / humidity / handling",
      footer: "Archive stewardship manual",
    },
  },
  {
    title: "Tidewater Lantern Codes of the Outer Banks",
    slug: "tidewater-lantern-codes",
    description:
      "A reconstructed field guide to isolated 19th-century lantern signaling traditions used by coastal families in the Outer Banks. Includes tide tables, light pulse notation, and community memory practices preserved from handwritten ledgers.",
    category: "lost-hobbies",
    price: "88.00",
    featured: true,
    onSale: true,
    compareAtPrice: "128.00",
    saleLabel: "On Sale",
    review: {
      author: "Marina H.",
      role: "Collections cartographer",
      quote: "This feels like a genuine archival rescue—meticulous, strange, and beautiful.",
      rating: 5,
    },
    cover: {
      accent: "#f97316",
      accent2: "#1d4ed8",
      motif: "signal",
      subtitle: "Lantern pulses / tide tables",
      footer: "Recovered coastal ledger",
    },
  },
  {
    title: "Etched Bone Button Ledgers of the Upper Fox Valley",
    slug: "etched-bone-button-ledgers",
    description:
      "A locality-specific study of bone button makers, tally marks, and church fair exchange systems used in the Upper Fox Valley from 1847 to 1892. Includes family inventories, apron-seam patterns, and a glyph index compiled from civic records.",
    category: "lost-hobbies",
    price: "74.00",
    featured: false,
    onSale: true,
    compareAtPrice: "96.00",
    saleLabel: "Limited Offer",
    review: {
      author: "S. Imani",
      role: "Ethnography editor",
      quote: "Delightfully specific—this is the kind of book that only a true archive could surface.",
      rating: 5,
    },
    cover: {
      accent: "#fb7185",
      accent2: "#7c2d12",
      motif: "button",
      subtitle: "Family ledgers / civic records",
      footer: "Upper Fox Valley field notes",
    },
  },
  {
    title: "Springhouse Weathervane Dial Patterns",
    slug: "springhouse-weathervane-dial-patterns",
    description:
      "A technical and folkloric survey of handmade weathervane dials from hillside springhouses across three counties. The text catalogs metal fatigue, weatherproofing recipes, and seasonal marker diagrams used by farmstead watchkeepers.",
    category: "lost-hobbies",
    price: "540.00",
    featured: false,
    review: {
      author: "Devon P.",
      role: "Historic structures consultant",
      quote: "The diagrams alone are worth the price; the folklore notes are the hidden treasure.",
      rating: 5,
    },
    premium: {
      title: "Collector's dossier",
      chart: "Rarity index\nDial pattern variance ▓▓▓▓▓▓▓▓▓▓ 10/10\nRegional fidelity     ▓▓▓▓▓▓▓▓▓▓ 10/10\nRepair depth          ▓▓▓▓▓▓▓▓▓░ 9/10\nField plates           ▓▓▓▓▓▓▓▓▓▓ 10/10",
      diagram: "Seasonal reading model\n\n          [Sun]\n            ↓\n  [Dial vane] → [Season mark]\n            ↓\n   [Weather ledger] → [Farm log]",
      inclusions: [
        "Large-format map plates",
        "Annotated repair cross-sections",
        "Weathering pigment tables",
        "Replica dial stencil sheets",
      ],
      printUpsells: ["Softback atelier proof", "Hardback collector edition", "Real leather wrap", "Faux leather archive finish"],
    },
    cover: {
      accent: "#fde68a",
      accent2: "#92400e",
      motif: "compass",
      subtitle: "Dial patterns / seasonal markers",
      footer: "Collector dossier • Premium edition",
    },
  },
  {
    title: "Millwright Fasteners of the Northeastern Waterworks",
    slug: "millwright-fasteners-waterworks",
    description:
      "Catalogs obscure bolts, wedges, pegs, and retaining systems used in 1800s municipal waterworks. Includes manufacturing tolerances, corrosion notes, and a remarkable plate index for repair historians.",
    category: "industrial-secrets",
    price: "92.00",
    featured: false,
    cover: {
      accent: "#94a3b8",
      accent2: "#334155",
      motif: "bolt",
      subtitle: "Fasteners / tolerances / corrosion",
      footer: "Waterworks hardware archive",
    },
  },
  {
    title: "The Indigo Pressworks Ledger of Hidden Dyes",
    slug: "indigo-pressworks-ledger",
    description:
      "A recovered account book from a private press that cataloged dye bath ratios, cloth mordants, and late-Victorian pigment substitutions. The book blends chemistry, artisan printing, and trade secrets into a single archival monograph.",
    category: "industrial-secrets",
    price: "118.00",
    featured: true,
    onSale: true,
    compareAtPrice: "148.00",
    saleLabel: "Archive Sale",
    review: {
      author: "Helena V.",
      role: "Print historian",
      quote: "A gorgeous balance of chemistry and craft; every plate looks like it should be behind glass.",
      rating: 5,
    },
    cover: {
      accent: "#8b5cf6",
      accent2: "#312e81",
      motif: "ink",
      subtitle: "Dyes / mordants / print secrets",
      footer: "Private press ledgers",
    },
  },
  {
    title: "Vacuum Relay Plant Blueprints: Coastal Power Grid 1948",
    slug: "vacuum-relay-plant-blueprints",
    description:
      "Detailed plant plans from a mid-century relay facility, including switchyard diagrams, signal routing ladders, maintenance schedules, and safety annotations used by the original operators.",
    category: "industrial-secrets",
    price: "620.00",
    featured: true,
    review: {
      author: "Elias R.",
      role: "Power systems engineer",
      quote: "The routing diagrams are so precise they feel like a time capsule from the control room itself.",
      rating: 5,
    },
    premium: {
      title: "Engineering appendix",
      chart: "Signal load matrix\nBus saturation        ▓▓▓▓▓▓▓▓▓░ 9/10\nSwitchboard density    ▓▓▓▓▓▓▓▓▓▓ 10/10\nMaintenance complexity ▓▓▓▓▓▓▓▓▓▓ 10/10\nSafety annotation set  ▓▓▓▓▓▓▓▓▓░ 9/10",
      diagram: "System flow\n\n[Generator] → [Relay bay] → [Switchyard]\n      ↓               ↘\n [Spare core]      [Field operator log]",
      inclusions: [
        "Fold-out plant schematics",
        "Annotated maintenance logs",
        "Signal routing tables",
        "Material handling diagrams",
      ],
      printUpsells: ["Softback proof", "Hardback archive binding", "Real leather upgrade", "Faux leather upgrade"],
    },
    cover: {
      accent: "#38bdf8",
      accent2: "#0f172a",
      motif: "relay",
      subtitle: "Switchyard / routing / safety",
      footer: "Plant blueprint dossier",
    },
  },
  {
    title: "DATUM-17: Teleprinter Arrays and Batch Signal Repair",
    slug: "datum-17-teleprinter-arrays",
    description:
      "An exhaustive maintenance manual for 1950s teleprinter arrays, batch queues, and paper tape handling. Includes fault trees, ribbon calibration, and a rare appendix on operator shorthand marks.",
    category: "technical-manuals",
    price: "86.00",
    featured: true,
    onSale: true,
    compareAtPrice: "104.00",
    saleLabel: "Today Only",
    review: {
      author: "Nina L.",
      role: "Retro systems archivist",
      quote: "It reads like a field manual from a parallel timeline where teleprinters never died.",
      rating: 5,
    },
    cover: {
      accent: "#22d3ee",
      accent2: "#155e75",
      motif: "teleprinter",
      subtitle: "Batch queues / tape / fault trees",
      footer: "Operator maintenance series",
    },
  },
  {
    title: "Ferrite Core Memory Alignment Compendium",
    slug: "ferrite-core-memory-alignment",
    description:
      "Legacy memory alignment procedures for ferrite core arrays, including magnet orientation diagrams, test routines, and restoration notes for early computing labs.",
    category: "technical-manuals",
    price: "710.00",
    featured: false,
    premium: {
      title: "Restoration dossier",
      chart: "Alignment confidence\nCore spacing          ▓▓▓▓▓▓▓▓▓▓ 10/10\nPolarity stability     ▓▓▓▓▓▓▓▓▓░ 9/10\nRestoration fidelity   ▓▓▓▓▓▓▓▓▓▓ 10/10\nTest routine coverage  ▓▓▓▓▓▓▓▓▓▓ 10/10",
      diagram: "Alignment model\n\n [Read head] ⇄ [Core plane] ⇄ [Timing rail]\n      ↓               ↓              ↓\n  [Pulse test]    [Magnet check]   [Archive log]",
      inclusions: [
        "Calibration tables",
        "Measured field diagrams",
        "Error-state maps",
        "Laboratory bench checklists",
      ],
      printUpsells: ["Softback lab proof", "Hardback reference edition", "Real leather binding", "Faux leather binding"],
    },
    review: {
      author: "Carter W.",
      role: "Computing museum curator",
      quote: "This is the kind of monograph that makes hardware restoration feel like archaeology with a multimeter.",
      rating: 5,
    },
    cover: {
      accent: "#f472b6",
      accent2: "#581c87",
      motif: "memory",
      subtitle: "Core planes / calibration / polarity",
      footer: "High-value restoration archive",
    },
  },
  {
    title: "APL Workspace Rituals for Mainframe Operators",
    slug: "apl-workspace-rituals",
    description:
      "A surprisingly practical manual for arranging APL workspaces, operator notes, and debugging rituals used in pre-graphical mainframe environments. Includes command mnemonics, desk layout diagrams, and recovery heuristics.",
    category: "software-collections",
    price: "82.00",
    featured: false,
    onSale: true,
    compareAtPrice: "99.00",
    saleLabel: "On Sale",
    review: {
      author: "Quinn M.",
      role: "Mainframe engineer",
      quote: "The layout advice is weirdly modern, and the historical notes are worth the cover price alone.",
      rating: 5,
    },
    cover: {
      accent: "#facc15",
      accent2: "#78350f",
      motif: "matrix",
      subtitle: "Workspace rituals / debugging",
      footer: "Operator playbook",
    },
  },
  {
    title: "PL/I Error Map and Recovery Notes",
    slug: "pli-error-map-recovery",
    description:
      "A dead-language recovery guide for PL/I environments, mapping compiler errors to operator responses, patch rituals, and batch job survival strategies in long-retired systems.",
    category: "software-collections",
    price: "78.00",
    featured: false,
    review: {
      author: "Mika T.",
      role: "Software preservationist",
      quote: "Clean, practical, and gloriously specific; this is exactly the kind of archive-only book I look for.",
      rating: 5,
    },
    cover: {
      accent: "#fb923c",
      accent2: "#7c2d12",
      motif: "console",
      subtitle: "Error maps / batch recovery",
      footer: "Preservation series",
    },
  },
  {
    title: "Interlisp Microkernel Notebook",
    slug: "interlisp-microkernel-notebook",
    description:
      "A rare experimental notebook tracing Interlisp microkernel ideas, memory discipline patterns, and early user-space abstractions. Includes annotated diagrams of scheduler ideas and a glossary of period terminology.",
    category: "software-collections",
    price: "750.00",
    featured: true,
    review: {
      author: "Anika D.",
      role: "Language archaeologist",
      quote: "A vault-grade reference; the notebook-style notes and diagrams make it feel like you're reading a recovered lab journal.",
      rating: 5,
    },
    premium: {
      title: "Recovered lab notebook",
      chart: "Architecture emphasis\nMemory hygiene        ▓▓▓▓▓▓▓▓▓▓ 10/10\nScheduler clarity     ▓▓▓▓▓▓▓▓▓▓ 10/10\nExperimental fidelity ▓▓▓▓▓▓▓▓▓▓ 10/10\nArchive rarity        ▓▓▓▓▓▓▓▓▓▓ 10/10",
      diagram: "Microkernel sketch\n\n [UI notes] → [Microkernel loop] → [Symbol table]\n       ↓              ↓                 ↓\n   [Trace log]    [Memory guard]    [Repair map]",
      inclusions: [
        "Notebook facsimile plates",
        "Annotated runtime sketches",
        "Glossary of obsolete terms",
        "Research margin notes",
      ],
      printUpsells: ["Softback facsimile", "Hardback collector vault", "Real leather wrap", "Faux leather wrap"],
    },
    cover: {
      accent: "#c084fc",
      accent2: "#312e81",
      motif: "kernel",
      subtitle: "Experimental Lisp / memory discipline",
      footer: "Vault edition • 750",
    },
  },
  {
    title: "Tallow Candle Guild Oaths of the Red River Parish",
    slug: "tallow-candle-guild-oaths",
    description:
      "A parish-level record of candle makers, apprenticeship oaths, and household lighting customs maintained by the Red River Parish guild between 1821 and 1888. Includes oath phrases, mold diagrams, and inventory margins.",
    category: "lost-hobbies",
    price: "96.00",
    featured: false,
    cover: {
      accent: "#ef4444",
      accent2: "#450a0a",
      motif: "candle",
      subtitle: "Guild oaths / molds / lighting",
      footer: "Parish craft archive",
    },
  },
  {
    title: "Victorian Bead Cabinet Taxonomies",
    slug: "victorian-bead-cabinet-taxonomies",
    description:
      "An obsessive catalog of bead cabinets, sorting trays, and the Victorian hobby of micro-collection taxonomy. Ideal for researchers of decorative storage, domestic display, and private museum culture.",
    category: "lost-hobbies",
    price: "63.00",
    featured: false,
    cover: {
      accent: "#ec4899",
      accent2: "#831843",
      motif: "cabinet",
      subtitle: "Micro-collections / taxonomy",
      footer: "Domestic display studies",
    },
  },
  {
    title: "Cobol Batch JCL Survival Atlas",
    slug: "cobol-batch-jcl-survival-atlas",
    description:
      "A survival guide for legacy batch job control language, including job cards, spool diagnostics, rerun patterns, and the art of not waking the operator floor.",
    category: "software-collections",
    price: "94.00",
    featured: true,
    onSale: true,
    compareAtPrice: "120.00",
    saleLabel: "Archive Drop",
    review: {
      author: "Jordan K.",
      role: "Enterprise systems librarian",
      quote: "It is both a practical guide and a delightful memorial to how batch systems actually survived.",
      rating: 5,
    },
    cover: {
      accent: "#60a5fa",
      accent2: "#1e3a8a",
      motif: "batch",
      subtitle: "Job cards / spool / rerun patterns",
      footer: "Legacy operations atlas",
    },
  },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function coverMotif(motif, accent, accent2) {
  const motifs = {
    gear: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"><circle cx="400" cy="530" r="120"/><path d="M400 380v-40M400 720v-40M250 530h-40M590 530h-40M296 426l-28-28M532 662l-28-28M296 634l-28 28M532 398l-28 28"/></g><circle cx="400" cy="530" r="48" fill="${accent2}" opacity="0.95"/>`,
    joinery: `<g fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"><path d="M220 410h260v260H220z"/><path d="M220 410l260 260M480 410L220 670"/><path d="M300 470h120M300 530h120M300 590h120"/></g>`,
    factory: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M160 660h480"/><path d="M200 660V500l120 60v-80l120 70v-90l120 70v130"/><path d="M220 500h70M340 440h70M460 510h70"/></g>`,
    molecule: `<g fill="none" stroke="${accent}" stroke-width="7"><circle cx="280" cy="450" r="24"/><circle cx="420" cy="390" r="24"/><circle cx="540" cy="490" r="24"/><circle cx="360" cy="610" r="24"/><path d="M300 435l96-34M444 402l80 70M522 506l-140 84M338 590l-38-118"/></g>`,
    wave: `<g fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"><path d="M170 560c60-120 120-120 180 0s120 120 180 0 120-120 180 0"/><path d="M250 460v220M400 420v300M550 470v220"/></g>`,
    chip: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"><rect x="250" y="410" width="300" height="240" rx="16"/><path d="M300 360v50M360 360v50M420 360v50M480 360v50M540 360v50M300 650v50M360 650v50M420 650v50M480 650v50M540 650v50M200 470h50M200 530h50M200 590h50M550 470h50M550 530h50M550 590h50"/></g>`,
    lock: `<g fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"><rect x="250" y="470" width="300" height="220" rx="28"/><path d="M320 470v-70c0-66 44-110 80-110s80 44 80 110v70"/><circle cx="400" cy="580" r="28" fill="${accent2}"/></g>`,
    library: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"><path d="M220 690h360"/><path d="M250 690V380M320 690V420M390 690V360M460 690V430M530 690V390"/><path d="M220 420h360"/></g>`,
    press: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="240" y="420" width="320" height="220" rx="18"/><path d="M240 500h320M300 380h200M300 380v-40h200v40"/><path d="M280 460h240M320 560h160"/></g>`,
    archive: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="230" y="390" width="340" height="260" rx="20"/><path d="M270 450h260M270 510h260M270 570h180"/><path d="M280 350h240"/></g>`,
    signal: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"><path d="M400 340v80"/><path d="M340 450c40-40 120-40 160 0"/><path d="M290 520c65-78 255-78 320 0"/><path d="M250 610c90-116 310-116 400 0"/></g>`,
    button: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><circle cx="400" cy="530" r="130"/><circle cx="400" cy="470" r="16" fill="${accent2}"/><circle cx="400" cy="530" r="16" fill="${accent2}"/><circle cx="400" cy="590" r="16" fill="${accent2}"/><circle cx="340" cy="500" r="16" fill="${accent2}"/><circle cx="460" cy="500" r="16" fill="${accent2}"/><circle cx="340" cy="560" r="16" fill="${accent2}"/><circle cx="460" cy="560" r="16" fill="${accent2}"/></g>`,
    compass: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><circle cx="400" cy="530" r="140"/><path d="M400 410l60 120-60 120-60-120z" fill="${accent2}" opacity="0.9"/><path d="M400 360v-40M400 740v-40M230 530h-40M610 530h-40"/></g>`,
    bolt: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M280 420h240l-70 110h80L320 670l50-120h-90z"/></g>`,
    ink: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M260 610c40-140 100-220 140-220s100 80 140 220"/><path d="M300 470c30 30 70 30 100 0s70-30 100 0"/><path d="M320 650h160"/></g>`,
    relay: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M250 390h300v280H250z"/><path d="M290 450h220M290 520h220M290 590h140"/><path d="M400 390v-50M400 670v50"/></g>`,
    teleprinter: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="220" y="420" width="360" height="220" rx="20"/><path d="M260 470h280M260 530h280M260 590h180"/><path d="M310 360v60M400 340v80M490 360v60"/></g>`,
    memory: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="235" y="420" width="330" height="220" rx="18"/><path d="M270 450h260M270 510h260M270 570h260"/><circle cx="305" cy="450" r="12" fill="${accent2}"/><circle cx="305" cy="510" r="12" fill="${accent2}"/><circle cx="305" cy="570" r="12" fill="${accent2}"/></g>`,
    matrix: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M250 400h300v260H250z"/><path d="M250 485h300M350 400v260M450 400v260"/></g>`,
    console: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="220" y="420" width="360" height="220" rx="18"/><path d="M255 470h110M255 530h220M255 590h160"/></g>`,
    kernel: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><circle cx="400" cy="530" r="130"/><circle cx="400" cy="530" r="60" fill="${accent2}" opacity="0.95"/><path d="M400 400v-50M400 710v-50M270 530h-50M580 530h-50"/></g>`,
    candle: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M400 380c30 30 60 55 60 120 0 55-27 85-60 85s-60-30-60-85c0-65 30-90 60-120z" fill="${accent2}" opacity="0.9"/><path d="M340 650h120"/></g>`,
    cabinet: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="250" y="390" width="300" height="280" rx="18"/><path d="M250 500h300M350 390v280M450 390v280"/><circle cx="300" cy="460" r="12" fill="${accent2}"/><circle cx="400" cy="460" r="12" fill="${accent2}"/><circle cx="500" cy="460" r="12" fill="${accent2}"/></g>`,
    batch: `<g fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><rect x="250" y="400" width="300" height="260" rx="18"/><path d="M290 470h220M290 530h220M290 590h180"/><path d="M290 360v40M350 360v40M410 360v40M470 360v40M530 360v40"/></g>`,
  };

  return motifs[motif] || motifs.archive;
}

function makeCover({ title, subtitle, accent, accent2, motif, footer }) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" role="img" aria-label="${escapeXml(title)} cover">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#08111f"/>
        <stop offset="55%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#05070b"/>
      </linearGradient>
      <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${accent2}" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity="0.42"/>
      </filter>
    </defs>
    <rect width="800" height="1200" fill="url(#bg)"/>
    <rect x="34" y="34" width="732" height="1132" rx="28" fill="none" stroke="url(#glow)" stroke-width="4" opacity="0.9"/>
    <rect x="56" y="56" width="688" height="1088" rx="24" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.45"/>
    <circle cx="640" cy="180" r="110" fill="${accent}" opacity="0.09"/>
    <circle cx="160" cy="1020" r="140" fill="${accent2}" opacity="0.11"/>
    <path d="M120 240c120-80 360-80 560 0" fill="none" stroke="${accent}" stroke-width="2" opacity="0.25"/>
    <path d="M120 960c120 80 360 80 560 0" fill="none" stroke="${accent}" stroke-width="2" opacity="0.22"/>
    <g filter="url(#shadow)">
      ${coverMotif(motif, accent, accent2)}
    </g>
    <text x="80" y="150" fill="${accent}" font-family="Georgia, 'Times New Roman', serif" font-size="30" letter-spacing="5">THE ARCHIVE OF RARE KNOWLEDGE</text>
    <text x="80" y="810" fill="#f8fafc" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700">
      ${escapeXml(title)}
    </text>
    <foreignObject x="80" y="860" width="640" height="150">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color: rgba(226,232,240,.86); font-family: Inter, Arial, sans-serif; font-size: 28px; line-height: 1.35; letter-spacing: .02em;">
        ${escapeXml(subtitle)}
      </div>
    </foreignObject>
    <text x="80" y="1078" fill="${accent}" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="2">${escapeXml(footer)}</text>
    <line x1="80" y1="1120" x2="720" y2="1120" stroke="${accent}" stroke-width="2" opacity="0.35"/>
    <text x="80" y="1150" fill="rgba(226,232,240,.8)" font-family="Inter, Arial, sans-serif" font-size="18" letter-spacing="3">DIGITAL EDITION • LIFETIME ACCESS</text>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function enrichProduct(product) {
  const cover = product.cover || {
    accent: "#d4af37",
    accent2: "#6b4f1d",
    motif: "archive",
    subtitle: product.category,
    footer: "The Archive",
  };

  return {
    ...product,
    coverImageUrl: makeCover({
      title: product.title,
      subtitle: cover.subtitle,
      accent: cover.accent,
      accent2: cover.accent2,
      motif: cover.motif,
      footer: cover.footer,
    }),
  };
}

// Rating & Review System - Simulated data
const authenticReviews = {
  "lost-art-mechanical-watchmaking": [
    { author: "James H.", text: "Finally, a guide that explains escapement geometry without handwaving. The restoration chapter alone justified my purchase—my 1920s Waltham actually runs again.", rating: 5, isVerified: true },
    { author: "Marina K.", text: "Incredibly thorough on movement assembly. The tolerances and diagrams are precise enough to actually follow.", rating: 5, isVerified: true },
  ],
  "forgotten-woodworking-techniques": [
    { author: "Robert T.", text: "The hand-plane tuning section is genius. I haven't used a plane in 15 years and now I remember why I should have never stopped.", rating: 5, isVerified: true },
    { author: "Diane S.", text: "The joinery photos are exceptional—each one tells you exactly what you're looking at. Wish I had this thirty years ago.", rating: 5, isVerified: true },
  ],
  "industrial-secrets-pre-digital": [
    { author: "Derek M.", text: "The manufacturing workflow diagrams are like looking over a factory manager's shoulder from 1955. Invaluable for understanding pre-CNC production.", rating: 5, isVerified: true },
  ],
  "botanical-pressure-charts": [
    { author: "Sophie L.", text: "Beautiful technical writing. The molecular diagrams paired with historical context makes this feel like a conversation with a Victorian botanist.", rating: 5, isVerified: true },
    { author: "Vincent D.", text: "The pressure calibration notes are oddly practical for something so historical. Surprisingly useful.", rating: 4.5, isVerified: true },
  ],
  "kodachrome-film-processing": [
    { author: "Alexandra P.", text: "Reading this feels like sitting in a darkroom with someone who actually processed Kodachrome in 1975. The chemical balance sections are cookbook-precise.", rating: 5, isVerified: true },
  ],
  "tidewater-lantern-codes": [
    { author: "Thomas A.", text: "The folk etymology mixed with technical signal documentation is unusual and fascinating. Genuinely learned something about regional maritime history.", rating: 5, isVerified: true },
  ],
  "springhouse-weathervane-dial-patterns": [
    { author: "Eleanor C.", text: "The field notes are the real treasure here. Each location has personality, and the technical sketches are precise enough to build from.", rating: 5, isVerified: true },
  ],
  "millwright-fasteners-waterworks": [
    { author: "Paul F.", text: "If you restore old infrastructure, this is required reading. The corrosion notes and tolerance specifications are actual engineering, not approximation.", rating: 4.5, isVerified: true },
  ],
  "indigo-pressworks-ledger": [
    { author: "Helena V.", text: "A gorgeous balance of chemistry and craft; every plate looks like it should be behind glass.", rating: 5, isVerified: true },
    { author: "Marcus J.", text: "The dye bath ratios are surprisingly modern. Makes you realize color science didn't start with digital.", rating: 5, isVerified: true },
  ],
  "vacuum-relay-plant-blueprints": [
    { author: "Elias R.", text: "The routing diagrams are so precise they feel like a time capsule from the control room itself.", rating: 5, isVerified: true },
    { author: "Patricia W.", text: "The safety annotations are a window into how engineers thought about redundancy before computers. Still relevant.", rating: 5, isVerified: true },
  ],
  "datum-17-teleprinter-arrays": [
    { author: "Nina L.", text: "It reads like a field manual from a parallel timeline where teleprinters never died. The ribbon calibration section is detective work.", rating: 5, isVerified: true },
  ],
  "ferrite-core-memory-alignment": [
    { author: "Carter W.", text: "This is the kind of monograph that makes hardware restoration feel like archaeology with a multimeter.", rating: 5, isVerified: true },
    { author: "Iris M.", text: "The polarity stability diagrams are beautifully done. Each page teaches you something about early computer design philosophy.", rating: 5, isVerified: true },
  ],
  "apl-workspace-rituals": [
    { author: "Quinn M.", text: "The layout advice is weirdly modern, and the historical notes are worth the cover price alone.", rating: 5, isVerified: true },
  ],
  "interlisp-microkernel-notebook": [
    { author: "Dr. David L.", text: "The kernel architecture commentary is precise without being dry. Missing this perspective from modern engineering texts.", rating: 5, isVerified: true },
  ],
  "early-soviet-typographic-standards": [
    { author: "Yuri T.", text: "Absolutely meticulous. The grid systems and letter-spacing notes apply to everything we do now.", rating: 5, isVerified: true },
  ],
  "helvetica-weight-matrices": [
    { author: "Franco N.", text: "The weight proportions table is the kind of reference you come back to for thirty years. Digital type hasn't improved on this.", rating: 5, isVerified: true },
  ],
  "x-height-optical-compensation": [
    { author: "Anna S.", text: "Finally someone explains x-height compensation in a way that actually makes sense. The optical illusion diagrams are brilliant.", rating: 5, isVerified: true },
  ],
  "hidden-typeface-geometry": [
    { author: "Klaus B.", text: "The counter space analysis is obsessive in the best way. Each observation changes how you look at letterforms.", rating: 5, isVerified: true },
  ],
};

function generateRating(productSlug, productIndex, totalProducts) {
  // ~75% of products have simulated votes
  const hasRatings = Math.random() < 0.75;
  
  if (!hasRatings) {
    return null;
  }

  // Of those with ratings, 70% are 5-star, 30% are 4-4.5 star
  const isPerfectScore = Math.random() < 0.7;
  
  if (isPerfectScore) {
    const voteCount = 8 + Math.floor(Math.random() * 20); // 8-27 votes
    return {
      averageRating: 5,
      voteCount,
      userRating: null,
      writtenReviews: authenticReviews[productSlug] || [],
    };
  } else {
    const baseRating = 4;
    const decimal = Math.random() < 0.5 ? 0 : 0.5;
    const averageRating = baseRating + decimal;
    const voteCount = 6 + Math.floor(Math.random() * 16); // 6-21 votes
    return {
      averageRating,
      voteCount,
      userRating: null,
      writtenReviews: authenticReviews[productSlug] || [],
    };
  }
}

export const productCatalog = baseProducts.map(enrichProduct);
export const rareKnowledgeProducts = productCatalog.map(({ cover, onSale, compareAtPrice, saleLabel, review, premium, ...dbProduct }) => dbProduct);

export const productExtras = Object.fromEntries(
  productCatalog.map((product, index) => [
    product.slug,
    {
      onSale: Boolean(product.onSale),
      compareAtPrice: product.compareAtPrice || null,
      saleLabel: product.saleLabel || (product.onSale ? "On Sale" : null),
      review: product.review || null,
      premium: product.premium || null,
      rating: generateRating(product.slug, index, productCatalog.length),
    },
  ])
);

export const storeTestimonials = [
  {
    name: "Dr. Lila Voss",
    title: "Rare books buyer",
    quote: "Every title feels sourced from a cabinet the rest of the internet forgot existed.",
  },
  {
    name: "Evan R.",
    title: "Archivist and collector",
    quote: "The store somehow makes niche scholarship feel luxurious instead of dusty.",
  },
  {
    name: "Marin S.",
    title: "Independent researcher",
    quote: "I came for one manual and left with a cart full of impossible-to-find references.",
  },
];

export const serviceBureauContent = {
  standardRate: 180,
  foundersDiscountRate: 120,
  foundersDiscountNote: "Founder's Discount available for a limited launch window.",
  minimumHours: 2,
  timeline: "2-4 weeks for most commissions, with rush options available for scoped projects.",
  methodology: [
    "We begin with a scope interview and evidence map.",
    "Then we assemble primary sources, annotations, and a structured outline.",
    "Finally, we produce a polished deliverable with citations, diagrams, and production notes.",
  ],
  upsells: [
    { name: "Softback print proof", price: "$75" },
    { name: "Hardback collector binding", price: "$145" },
    { name: "Real leather upgrade", price: "$260" },
    { name: "Faux leather upgrade", price: "$120" },
    { name: "Custom charts and graphs pack", price: "$180" },
    { name: "Illustrated appendix bundle", price: "$240" },
  ],
  recentCommissions: [
    {
      title: "Outer Banks signal tradition atlas",
      summary: "Delivered a field guide with tide tables, lantern codes, and oral-history cross references.",
    },
    {
      title: "Legacy mainframe recovery workbook",
      summary: "Produced a batch-job recovery manual with flow diagrams and operator checklists.",
    },
    {
      title: "Victorian micro-collection catalog",
      summary: "Built a visual taxonomy of bead cabinets, tray systems, and family provenance notes.",
    },
  ],
  faq: [
    {
      question: "How long will my commission take?",
      answer: "Most projects ship in 2-4 weeks. Bigger reference books or heavily illustrated editions can take longer depending on research depth and review cycles.",
    },
    {
      question: "How do you protect privacy?",
      answer: "Requests are handled discreetly, and only the minimum necessary project details are retained for production and invoicing.",
    },
    {
      question: "What is your methodology?",
      answer: "We use a source-first workflow that prioritizes primary materials, archival validation, and repeatable note structures.",
    },
    {
      question: "Can I add print and binding upgrades?",
      answer: "Yes. Softback, hardback, leather, and illustration upgrades are available as line-item add-ons when you scope the commission.",
    },
  ],
};

export function getProductExtras(slug) {
  return productExtras[slug] || { onSale: false, compareAtPrice: null, saleLabel: null, review: null, premium: null };
}

export function getProductBySlugFromCatalog(slug) {
  return productCatalog.find((product) => product.slug === slug);
}
