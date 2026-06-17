// Placeholder dossier for AARAV KRISHNA / PILOT-01
export const PILOT = {
  codename: "AARAV KRISHNA",
  designation: "PILOT-01",
  classification: "STUDENT DEVELOPER & ASPIRING ECONOMIST",
  status: "ACTIVE",
  syncRatio: 87.2,
  location: "TOKYO-3 // GEOFRONT SECTOR 7",
  birthRecord: "REDACTED",
  bloodType: "O+",
  tagline: "In the space between logic and imagination, I build.",
  socials: {
    github: "https://github.com/aaravkrishna",
    linkedin: "https://linkedin.com/in/aaravkrishna",
    email: "aarav@nerv.archive",
    twitter: "https://twitter.com/aaravkrishna",
  },
  resumeUrl: "/resume.pdf",
};

export const PERSONNEL_FILE = {
  biography:
    "Subject is a senior-year student operating at the intersection of software systems and economic theory. Field reports indicate an obsession with first-principles thinking, modular architecture, and the strange beauty of equilibrium states. Subject treats every problem as a system to be reverse-engineered.",
  education: [
    { institution: "DELHI PUBLIC SCHOOL — R.K. PURAM", role: "AISSCE // SCIENCE + ECONOMICS", years: "2021–2024", note: "98.4% aggregate. Top 0.3% national rank." },
    { institution: "PROJECTED // UNIVERSITY OF CHICAGO", role: "BS ECONOMICS & COMPUTER SCIENCE (TARGET)", years: "2026–2030", note: "Application in transit." },
    { institution: "MIT OPENCOURSEWARE // 14.01 + 6.006", role: "INDEPENDENT STUDY", years: "ONGOING", note: "Microeconomics + Algorithms." },
  ],
  interests: ["MECHANISM DESIGN", "OPEN-SOURCE SYSTEMS", "BEHAVIORAL ECONOMICS", "BAUHAUS TYPOGRAPHY", "URBAN CARTOGRAPHY", "EVANGELION", "JAZZ FUSION"],
  hobbies: ["LONG-FORM ESSAY WRITING", "TYPOGRAPHY POSTERS", "CHESS (1820 ELO)", "FILM PHOTOGRAPHY", "TRAIL RUNNING"],
  aspirations:
    "To build systems — code and policy alike — that compound human agency. Long-term: research economist with a tool-builder's hands; short-term: ship software that other students actually use.",
  personality: ["CURIOUS", "DELIBERATE", "PATIENT", "STUBBORN ABOUT QUALITY", "OCCASIONALLY DRAMATIC"],
  favoriteMedia: [
    "NEON GENESIS EVANGELION",
    "DUNE — F. HERBERT",
    "THE BIG SHORT — M. LEWIS",
    "BLADE RUNNER 2049",
    "GHOST IN THE SHELL (1995)",
    "THE WORLDLY PHILOSOPHERS — R. HEILBRONER",
  ],
  funFacts: [
    "Can recite the Yebisu beer jingle from memory.",
    "Once debugged a deployment from a moving train.",
    "Owns 14 mechanical keyboards. Refuses to admit it.",
    "Eats curry on Thursdays, no exceptions.",
    "Has watched End of Evangelion 9 times.",
  ],
};

export const PROJECTS = [
  {
    id: "OP-001",
    name: "MAGI: ECON SIMULATOR",
    classification: "STRATEGIC",
    summary: "Agent-based economic simulator modeling 10k consumers and 200 firms reaching market equilibrium under varying tax regimes.",
    tech: ["Python", "NumPy", "Mesa", "FastAPI", "React"],
    github: "https://github.com/aaravkrishna/magi-econ",
    demo: "#",
    image: "https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=800&q=80",
    detail: "Implements heterogeneous-agent general equilibrium with Q-learning firms. Used by 3 university econ classes for policy what-ifs.",
  },
  {
    id: "OP-002",
    name: "AT-FIELD",
    classification: "INFRASTRUCTURE",
    summary: "Self-hosted personal firewall + DNS sinkhole running on a Raspberry Pi 5, blocking 2.1M tracker domains across a household network.",
    tech: ["Go", "Pi-hole", "WireGuard", "Docker"],
    github: "https://github.com/aaravkrishna/at-field",
    demo: "#",
    image: "https://images.unsplash.com/photo-1544631008-534b4b6c1215?w=800&q=80",
    detail: "Custom DNS-over-HTTPS resolver with rule scripting. Drops latency 22% vs ISP defaults.",
  },
  {
    id: "OP-003",
    name: "DOSSIER",
    classification: "TOOLING",
    summary: "Markdown-first second-brain CLI with bi-directional links, full-text search, and a graph viewer in the terminal.",
    tech: ["Rust", "ratatui", "sqlite"],
    github: "https://github.com/aaravkrishna/dossier",
    demo: "#",
    image: "https://images.unsplash.com/photo-1610219542098-df1753da93bc?w=800&q=80",
    detail: "300+ GitHub stars. Fully offline. Featured in a Rust newsletter.",
  },
  {
    id: "OP-004",
    name: "GEOFRONT",
    classification: "VISUALIZATION",
    summary: "WebGL map of the Delhi Metro that animates passenger flow against real GTFS schedules. Used for a class project on transit equity.",
    tech: ["TypeScript", "deck.gl", "GTFS"],
    github: "https://github.com/aaravkrishna/geofront",
    demo: "#",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    detail: "Animates 14M weekly trips on a single page. Won school innovation prize.",
  },
  {
    id: "OP-005",
    name: "EVA-UNIT-LATEX",
    classification: "CREATIVE",
    summary: "Opinionated LaTeX template engine that turns plain markdown into IB-quality economics IAs with auto-citation and a houseplant of charts.",
    tech: ["TypeScript", "LaTeX", "Pandoc"],
    github: "https://github.com/aaravkrishna/eva-latex",
    demo: "#",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
    detail: "Used by ~80 students across my school. Reduces formatting time by ~6 hours per essay.",
  },
  {
    id: "OP-006",
    name: "SHINJI",
    classification: "EXPERIMENTAL",
    summary: "Tiny chess engine written for the love of pain. Negamax + alpha-beta + transposition tables. Reaches ~2100 elo on lichess bots.",
    tech: ["C++", "SIMD", "CMake"],
    github: "https://github.com/aaravkrishna/shinji",
    demo: "#",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    detail: "Sub-millisecond evaluation per node. Built without copying any modern engine source.",
  },
];

export const SKILLS = {
  LANGUAGES: [
    { name: "PYTHON", value: 92 },
    { name: "TYPESCRIPT", value: 88 },
    { name: "RUST", value: 71 },
    { name: "C++", value: 65 },
    { name: "GO", value: 60 },
    { name: "LATEX", value: 80 },
  ],
  FRAMEWORKS: [
    { name: "REACT / NEXT", value: 90 },
    { name: "FASTAPI", value: 85 },
    { name: "TAILWIND", value: 90 },
    { name: "PYTORCH", value: 60 },
    { name: "MESA (AGENT-BASED)", value: 75 },
  ],
  TOOLS: [
    { name: "GIT / CI", value: 88 },
    { name: "DOCKER", value: 80 },
    { name: "LINUX SYSADMIN", value: 78 },
    { name: "FIGMA", value: 70 },
  ],
  CREATIVE: [
    { name: "TYPOGRAPHY", value: 82 },
    { name: "FILM PHOTOGRAPHY", value: 70 },
    { name: "POSTER DESIGN", value: 75 },
  ],
  RESEARCH: [
    { name: "MICROECONOMICS", value: 88 },
    { name: "GAME THEORY", value: 80 },
    { name: "ECONOMETRICS", value: 65 },
    { name: "LIT REVIEW", value: 78 },
  ],
};

export const ECONOMICS_ESSAYS = [
  {
    title: "ON THE PRICE OF AN IDEA",
    period: "ESSAY // 2024",
    summary: "An attempt to map information-goods to Bertrand competition when zero marginal cost meets nonzero attention cost.",
    tags: ["MICRO", "INFORMATION GOODS"],
  },
  {
    title: "SCHELLING'S TRAFFIC",
    period: "RESEARCH NOTE // 2024",
    summary: "Reproduces Schelling segregation on a Delhi commuter dataset. Finds emergent corridors that no planner drew.",
    tags: ["GAME THEORY", "URBAN"],
  },
  {
    title: "THE RUPEE & THE GRAPH",
    period: "COMPETITION // 2023",
    summary: "Won regional ASE Olympiad. Argues that India's UPI ecosystem is a public good with a private graph topology.",
    tags: ["MONETARY", "NETWORKS"],
  },
  {
    title: "RATIONAL ANGELS",
    period: "ESSAY // 2025",
    summary: "What if Akerlof's lemons could lie strategically? A toy model of bounded-rational adverse selection.",
    tags: ["BEHAVIORAL", "INFO-ASYMMETRY"],
  },
];

export const ACHIEVEMENTS = [
  { code: "REC-014", title: "ASE ECON OLYMPIAD — REGIONAL WINNER", year: "2023" },
  { code: "REC-021", title: "INTERNATIONAL MATH OLYMPIAD — HM", year: "2023" },
  { code: "REC-028", title: "300+ STARS // DOSSIER (OPEN SOURCE)", year: "2024" },
  { code: "REC-033", title: "SCHOOL INNOVATION PRIZE — GEOFRONT", year: "2024" },
  { code: "REC-039", title: "GUEST LECTURE // BEHAVIORAL ECON TO YR 11", year: "2024" },
  { code: "REC-045", title: "PUBLISHED // STUDENT ECON REVIEW VOL.4", year: "2025" },
];

export const ART_GALLERY = [
  { id: "ART-001", title: "TYPO STUDY 01", url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80" },
  { id: "ART-002", title: "GEOFRONT PRINT", url: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&q=80" },
  { id: "ART-003", title: "STREET // 35MM", url: "https://images.unsplash.com/photo-1505739679850-7adabc2cf6ba?w=600&q=80" },
  { id: "ART-004", title: "RED TERMINAL", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" },
  { id: "ART-005", title: "TOKYO RAIN", url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80" },
  { id: "ART-006", title: "GRID STUDY", url: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80" },
];

export const CURRENT_STATUS = [
  { label: "BUILDING", value: "an open-source budgeting tool for Indian students." },
  { label: "STUDYING", value: "Mas-Colell, Whinston & Green (Chapters 1–6)." },
  { label: "READING", value: "'The Worldly Philosophers' — R. Heilbroner." },
  { label: "LEARNING", value: "Rust async runtimes and tokio internals." },
  { label: "CREATING", value: "a poster series on Indian monsoon patterns." },
];

export const NERV_MEDIA = {
  nervLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/NERV_logo.svg/800px-NERV_logo.svg.png",
  seeleLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Seele_logo.svg/1024px-Seele_logo.svg.png",
  // Authentic Evangelion UI/title cards (user-provided + imgur album mvW7g)
  magiDeliberation: "https://customer-assets.emergentagent.com/job_nerv-archives-aarav/artifacts/h91tlhtk_image.png",
  harmonicsGraph: "https://customer-assets.emergentagent.com/job_nerv-archives-aarav/artifacts/umbz8vym_image.png",
  fourPanelHud: "https://customer-assets.emergentagent.com/job_nerv-archives-aarav/artifacts/g59l9ygp_image.png",
  episodeOneCard: "https://customer-assets.emergentagent.com/job_nerv-archives-aarav/artifacts/a1cp97p8_image.png",
  fui1: "https://i.imgur.com/TkOO9fF.jpg",
  fui2: "https://i.imgur.com/6mDPV0L.jpg",
  fui3: "https://i.imgur.com/ebxjA8x.jpg",
};

// Episode title cards interspersed between sections
export const EPISODES = {
  personnel:    { episode: "貳",   titleJp: "見知らぬ、天井", titleEn: "THE BEAST", subtitle: "PERSONNEL FILE // PILOT-01 DOSSIER" },
  operations:   { episode: "参",   titleJp: "鳴らない、電話", titleEn: "OPERATIONS LOG", subtitle: "PROJECT ARCHIVE // CONFIRMED HITS" },
  skills:       { episode: "肆",   titleJp: "雨、逃げ出した後", titleEn: "SYNC RATIO TEST", subtitle: "EVANGELION HARMONICS // CHANNEL A" },
  economics:    { episode: "伍",   titleJp: "レイ、心のむこうに", titleEn: "DIVISION-E", subtitle: "ECONOMIC ANALYSIS // SECTOR 7" },
  achievements: { episode: "陸",   titleJp: "決戦、第3新東京市", titleEn: "NERV RECORDS", subtitle: "DECISIVE BATTLE // TOKYO-3" },
  gallery:      { episode: "漆",   titleJp: "人の造りしもの", titleEn: "WORKS OF MAN", subtitle: "ART ARCHIVE // VISUAL EVIDENCE" },
  status:       { episode: "捌",   titleJp: "アスカ、来日",   titleEn: "CURRENT OPS", subtitle: "REAL-TIME PILOT TELEMETRY" },
  contact:      { episode: "玖",   titleJp: "瞬間、心、重ねて", titleEn: "OPEN CHANNEL", subtitle: "COMMS PIPE // ENCRYPTED" },
};

