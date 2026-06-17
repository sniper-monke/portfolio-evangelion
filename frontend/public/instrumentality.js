/* INSTRUMENTALITY LAYER v2 — vanilla drop-in (psychedelic + digital surrealism)
 * Pairs with instrumentality.css. In frontend/public/index.html <head>:
 *   <link rel="stylesheet" href="%PUBLIC_URL%/instrumentality.css" />
 *   <script defer src="%PUBLIC_URL%/instrumentality.js"></script>
 * Auto-mounts: floating ink fragments, warp/aura layers, click glitch bursts,
 * dissonance pulses, RGB-split bleed, and a Lilith footer at the bottom.
 */
(function () {
  "use strict";
  if (window.__INSTRUMENTALITY__) return;
  window.__INSTRUMENTALITY__ = true;

  // ---------- CONFIG ----------
  // CDN URL for the Lilith footer image. If a local /lilith-footer.png exists
  // in /public it will be preferred automatically (fallback to CDN).
  const LILITH_CDN = "https://id-preview--70e164d7-4527-4b09-8003-23f843207288.lovable.app/__l5e/assets-v1/ef683551-9cf5-48a3-8e29-bec3bfd668aa/lilith-footer.png";

  // ---------- Asset library (inline SVG) — all Evangelion-themed ----------
  const A = {
    // AT Field — hex shield (Pattern Blue)
    hex: `<svg viewBox="-50 -50 100 100"><polygon stroke-width="1.2" points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23"/><polygon stroke-width="0.6" points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17"/><polygon stroke-width="0.4" points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"/><text x="0" y="3" font-family="monospace" font-size="6" fill="currentColor" stroke="none" text-anchor="middle">A.T.</text></svg>`,
    // EVA Unit-01 horned helm
    eva: `<svg viewBox="-50 -50 100 100"><path stroke-width="1.4" d="M -28 -42 L 0 -48 L 28 -42 L 34 -10 L 28 22 L 18 42 L 0 46 L -18 42 L -28 22 L -34 -10 Z"/><path stroke-width="1" d="M -14 -8 L -4 -2 L -14 4 Z M 14 -8 L 4 -2 L 14 4 Z"/><path stroke-width="0.8" d="M -8 18 L 0 30 L 8 18"/><line stroke-width="0.6" x1="-22" y1="-22" x2="-14" y2="-22"/><line stroke-width="0.6" x1="14" y1="-22" x2="22" y2="-22"/></svg>`,
    // Sachiel's eye / Rei eye
    eye: `<svg viewBox="-50 -50 100 100"><path stroke-width="1.2" d="M -44 0 Q 0 -32 44 0 Q 0 32 -44 0 Z"/><circle stroke-width="1.2" cx="0" cy="0" r="16"/><circle class="fill" cx="0" cy="0" r="7" stroke-width="0.6"/><circle cx="-3" cy="-3" r="2" stroke-width="0.4"/><line stroke-width="0.4" x1="-44" y1="0" x2="-52" y2="0"/><line stroke-width="0.4" x1="44" y1="0" x2="52" y2="0"/></svg>`,
    // Lance of Longinus
    lance: `<svg viewBox="-50 -50 100 100"><line stroke-width="1.4" x1="0" y1="-46" x2="0" y2="46"/><path stroke-width="1.2" d="M -6 -34 L 0 -46 L 6 -34 Z"/><path stroke-width="1" d="M 0 -10 L -10 -2 M 0 -10 L 10 -2 M 0 14 L -10 22 M 0 14 L 10 22"/><circle cx="0" cy="2" r="3" stroke-width="0.6"/></svg>`,
    // Sephirot — Tree of Life (Instrumentality)
    sephirot: `<svg viewBox="-50 -50 100 100"><circle cx="0" cy="-40" r="6" stroke-width="0.8"/><circle cx="-22" cy="-22" r="6" stroke-width="0.8"/><circle cx="22" cy="-22" r="6" stroke-width="0.8"/><circle cx="-22" cy="0" r="6" stroke-width="0.8"/><circle cx="22" cy="0" r="6" stroke-width="0.8"/><circle cx="0" cy="0" r="6" stroke-width="0.8"/><circle cx="-22" cy="22" r="6" stroke-width="0.8"/><circle cx="22" cy="22" r="6" stroke-width="0.8"/><circle cx="0" cy="22" r="6" stroke-width="0.8"/><circle cx="0" cy="40" r="6" stroke-width="0.8"/><path stroke-width="0.4" d="M 0 -34 L -16 -22 M 0 -34 L 16 -22 M -22 -16 L -22 -6 M 22 -16 L 22 -6 M -16 -22 L 16 -22 M -22 0 L -6 0 M 22 0 L 6 0 M -16 4 L 0 16 M 16 4 L 0 16 M 0 28 L 0 34 M -22 6 L -22 16 M 22 6 L 22 16 M -16 22 L 16 22"/></svg>`,
    // Geofront cavity diagram
    geofront: `<svg viewBox="-50 -50 100 100"><circle cx="0" cy="0" r="46" stroke-width="0.8"/><circle cx="0" cy="0" r="34" stroke-width="0.6"/><circle cx="0" cy="0" r="22" stroke-width="0.6"/><circle cx="0" cy="0" r="10" stroke-width="1"/><line stroke-width="0.6" x1="-46" y1="0" x2="46" y2="0"/><line stroke-width="0.6" x1="0" y1="-46" x2="0" y2="46"/><line stroke-width="0.3" x1="-32" y1="-32" x2="32" y2="32"/><line stroke-width="0.3" x1="-32" y1="32" x2="32" y2="-32"/></svg>`,
    // MAGI supercomputer trio
    magi: `<svg viewBox="-50 -50 100 100"><polygon stroke-width="1" points="0,-42 36,22 -36,22"/><rect x="-12" y="-14" width="24" height="14" stroke-width="0.6"/><rect x="-32" y="6" width="24" height="14" stroke-width="0.6"/><rect x="8" y="6" width="24" height="14" stroke-width="0.6"/><text x="0" y="-3" font-family="monospace" font-size="6" fill="currentColor" stroke="none" text-anchor="middle">MELCHIOR</text><text x="-20" y="17" font-family="monospace" font-size="5" fill="currentColor" stroke="none" text-anchor="middle">BALTHASAR</text><text x="20" y="17" font-family="monospace" font-size="5" fill="currentColor" stroke="none" text-anchor="middle">CASPER</text></svg>`,
    // Lilith — crucified silhouette
    lilith: `<svg viewBox="-50 -50 100 100"><path stroke-width="1.2" d="M 0 -46 L -8 -32 L -10 -20 L -16 -8 L -16 14 L -22 28 L -16 44 M 0 -46 L 8 -32 L 10 -20 L 16 -8 L 16 14 L 22 28 L 16 44"/><path stroke-width="0.8" d="M 0 -32 L 0 36"/><line stroke-width="1" x1="-26" y1="-2" x2="26" y2="-2"/><circle cx="0" cy="-38" r="5" stroke-width="0.6"/></svg>`,
    // Cross of Light — angel death explosion
    cross: `<svg viewBox="-50 -50 100 100"><path stroke-width="1.8" d="M -8 -46 L 8 -46 L 8 -8 L 46 -8 L 46 8 L 8 8 L 8 46 L -8 46 L -8 8 L -46 8 L -46 -8 L -8 -8 Z"/></svg>`,
    // Sync ratio readout / heartbeat
    sync: `<svg viewBox="-50 -50 100 100"><polyline stroke-width="0.8" points="-46,0 -38,0 -34,-18 -28,12 -22,-4 -16,-4 -10,-26 -4,18 2,-10 8,-10 14,-2 20,-2 26,-22 32,14 38,0 46,0"/><line stroke-width="0.3" x1="-46" y1="-26" x2="46" y2="-26"/><line stroke-width="0.3" x1="-46" y1="26" x2="46" y2="26"/><text x="-44" y="-30" font-family="monospace" font-size="5" fill="currentColor" stroke="none">SYNC RATIO</text></svg>`,
    // AT Field grid — Pattern Blue
    grid: `<svg viewBox="-50 -50 100 100"><rect x="-44" y="-30" width="88" height="60" stroke-width="0.8"/><line stroke-width="0.3" x1="-44" y1="-15" x2="44" y2="-15"/><line stroke-width="0.3" x1="-44" y1="0" x2="44" y2="0"/><line stroke-width="0.3" x1="-44" y1="15" x2="44" y2="15"/><line stroke-width="0.3" x1="-22" y1="-30" x2="-22" y2="30"/><line stroke-width="0.3" x1="0" y1="-30" x2="0" y2="30"/><line stroke-width="0.3" x1="22" y1="-30" x2="22" y2="30"/><text x="-40" y="-34" font-family="monospace" font-size="5" fill="currentColor" stroke="none">PATTERN-BLUE</text><text x="20" y="36" font-family="monospace" font-size="5" fill="currentColor" stroke="none">AT-FIELD</text></svg>`,
    // NERV fig-leaf logo
    nerv: `<svg viewBox="-50 -50 100 100"><path stroke-width="1.2" d="M -44 0 Q -44 -36 0 -36 Q 44 -36 44 0 Q 44 36 0 36 Q -44 36 -44 0 Z"/><path class="fill" stroke-width="0" d="M -28 -6 L 28 -6 L 22 6 L -22 6 Z"/><path stroke-width="0.8" d="M -36 -12 Q -20 -28 0 -28 Q 20 -28 36 -12"/><path stroke-width="0.8" d="M -36 12 Q -20 28 0 28 Q 20 28 36 12"/><line stroke-width="0.6" x1="-44" y1="0" x2="44" y2="0"/><text x="0" y="20" font-family="monospace" font-size="9" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">NERV</text></svg>`,
    // SEELE seven-eyed seal
    seele: `<svg viewBox="-50 -50 100 100"><polygon stroke-width="1.2" points="0,-44 38,22 -38,22"/><circle cx="0" cy="-22" r="4" stroke-width="0.6"/><circle cx="-14" cy="-2" r="4" stroke-width="0.6"/><circle cx="14" cy="-2" r="4" stroke-width="0.6"/><circle cx="-20" cy="14" r="4" stroke-width="0.6"/><circle cx="0" cy="14" r="4" stroke-width="0.6"/><circle cx="20" cy="14" r="4" stroke-width="0.6"/><circle cx="0" cy="-6" r="4" stroke-width="0.6"/><text x="0" y="34" font-family="monospace" font-size="6" fill="currentColor" stroke="none" text-anchor="middle">SEELE 01</text></svg>`,
    // Terminal Dogma warning placard
    dogma: `<svg viewBox="-60 -25 120 50"><rect x="-58" y="-22" width="116" height="44" stroke-width="1"/><line stroke-width="0.4" x1="-58" y1="-12" x2="58" y2="-12"/><text x="0" y="-3" font-family="monospace" font-size="7" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">TERMINAL DOGMA</text><text x="0" y="8" font-family="monospace" font-size="5" fill="currentColor" stroke="none" text-anchor="middle">CENTRAL DOGMA — LEVEL -57</text><text x="0" y="18" font-family="monospace" font-size="5" fill="currentColor" stroke="none" text-anchor="middle">CLEARANCE A REQUIRED</text></svg>`,
    // Adam embryo — crucified seed
    adam: `<svg viewBox="-50 -50 100 100"><circle cx="0" cy="0" r="20" stroke-width="1"/><circle class="fill" cx="0" cy="0" r="8" stroke-width="0.4"/><line stroke-width="1.2" x1="0" y1="-44" x2="0" y2="44"/><line stroke-width="1.2" x1="-30" y1="0" x2="30" y2="0"/><path stroke-width="0.5" d="M -20 -20 L -8 -8 M 20 -20 L 8 -8 M -20 20 L -8 8 M 20 20 L 8 8"/></svg>`,
    // Angel pattern readout — Blood Pattern Orange
    pattern: `<svg viewBox="-60 -30 120 60"><rect x="-58" y="-28" width="116" height="56" stroke-width="0.6"/><polyline stroke-width="0.9" points="-56,10 -48,10 -44,-8 -36,18 -28,-14 -20,20 -12,-22 -4,22 4,-18 12,16 20,-10 28,12 36,-6 44,8 52,0 56,0"/><line stroke-width="0.3" x1="-58" y1="0" x2="58" y2="0" opacity="0.4"/><text x="-54" y="-18" font-family="monospace" font-size="5" fill="currentColor" stroke="none">BLOOD PATTERN ORANGE</text><text x="20" y="26" font-family="monospace" font-size="5" fill="currentColor" stroke="none">UNKNOWN ANGEL</text></svg>`,
    // Umbilical / entry plug cable
    plug: `<svg viewBox="-50 -50 100 100"><rect x="-10" y="-44" width="20" height="40" stroke-width="0.8"/><circle cx="0" cy="-24" r="4" stroke-width="0.6"/><path stroke-width="1" d="M 0 -4 Q -30 6 -20 26 Q -10 46 14 38 Q 38 30 30 8 Q 22 -14 0 -4"/><line stroke-width="0.4" x1="-10" y1="-34" x2="10" y2="-34"/><text x="0" y="-12" font-family="monospace" font-size="5" fill="currentColor" stroke="none" text-anchor="middle">ENTRY PLUG</text></svg>`,
  };

  const BG_KEYS     = ["grid", "geofront", "sephirot", "sync", "dogma", "pattern"];
  const MID_KEYS    = ["hex", "lance", "magi", "cross", "nerv", "seele", "plug", "adam"];
  const ENTITY_KEYS = ["eva", "eye", "lilith"];

  const COLORS = [
    "hsl(22 100% 50%)", "hsl(0 100% 55%)", "hsl(60 8% 80%)",
    "hsl(22 100% 50%)", "hsl(280 100% 60%)", "hsl(160 100% 45%)",
    "hsl(140 80% 40%)",
  ];

  // ---------- SVG filter defs (turbulence melt + displace) ----------
  function injectFilters() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none";
    svg.innerHTML = `
      <defs>
        <filter id="inst-melt" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="3">
            <animate attributeName="baseFrequency" dur="22s" values="0.010 0.014;0.020 0.030;0.010 0.014" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="22"/>
        </filter>
        <filter id="inst-displace" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" seed="7"/>
          <feDisplacementMap in="SourceGraphic" scale="14"/>
        </filter>
      </defs>`;
    document.body.appendChild(svg);
  }

  // ---------- Mount ----------
  function init() {
    injectFilters();

    const root = document.createElement("div");
    root.id = "instrumentality-root";
    root.setAttribute("aria-hidden", "true");

    const warp = document.createElement("div"); warp.className = "inst-warp";
    const aura = document.createElement("div"); aura.className = "inst-aura";
    const bg  = layer("inst-bg");
    const mid = layer("inst-mid");
    const fx  = layer("inst-fx");
    root.append(warp, aura, bg, mid, fx);

    fx.innerHTML = `<svg style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none"><defs><pattern id="inst-noise" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="hsl(22 100% 50% / 0.10)"/><rect width="1" height="1" x="1" y="1" fill="hsl(0 100% 55% / 0.22)"/></pattern></defs><rect width="100%" height="100%" fill="url(#inst-noise)"/></svg>`;

    document.body.appendChild(root);
    mountLilithFooter();

    const state = { t0: performance.now(), scroll: 0, chaos: false, intensityBoost: 0 };

    // scroll tracking
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        state.scroll = Math.min(1, Math.max(0, scrollY / max));
        const chaos = state.scroll > 0.78;
        if (chaos !== state.chaos) {
          state.chaos = chaos;
          root.classList.toggle("chaos", chaos);
          document.documentElement.classList.toggle("inst-chaos", chaos);
        }
        ticking = false;
      });
    }, { passive: true });

    // click → glitch burst
    addEventListener("click", (e) => {
      const tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      glitch(root, mid);
    }, { capture: true });

    // hover → nudge nearby fragments
    addEventListener("mousemove", throttle((e) => {
      state.intensityBoost = Math.min(1, state.intensityBoost + 0.04);
      nudge(mid, e.clientX, e.clientY);
    }, 80), { passive: true });

    setInterval(() => { state.intensityBoost = Math.max(0, state.intensityBoost - 0.06); }, 500);

    // spawn loop
    setInterval(() => spawn(bg, mid, state), 750);
    spawn(bg, mid, state, true);

    // periodic dissonance pulse (cognitive)
    setInterval(() => {
      const chance = 0.05 + state.scroll * 0.25 + (state.chaos ? 0.4 : 0);
      if (Math.random() < chance) {
        root.classList.add("dissonance");
        setTimeout(() => root.classList.remove("dissonance"), 1400);
      }
    }, 7000);

    // periodic auto-glitch in chaos mode
    setInterval(() => {
      if (state.chaos && Math.random() < 0.45) glitch(root, mid);
    }, 4000);
  }

  function layer(cls) { const el = document.createElement("div"); el.className = "inst-layer " + cls; return el; }
  function throttle(fn, ms) { let last = 0; return (...args) => { const n = performance.now(); if (n - last >= ms) { last = n; fn(...args); } }; }

  // ---------- Spawn ----------
  function spawn(bg, mid, state, force) {
    const elapsed = (performance.now() - state.t0) / 1000;
    const timeRamp = Math.min(1, Math.max(0, (elapsed - 6) / 16));
    let density = 0.16 + timeRamp * 0.45 + state.scroll * 0.55 + state.intensityBoost * 0.25;
    if (state.chaos) density *= 2.1;
    if (!force && Math.random() > density) return;

    const toBg = !force && Math.random() < 0.3;
    const target = toBg ? bg : mid;
    const pool = toBg ? BG_KEYS : (Math.random() < 0.09 ? ENTITY_KEYS : MID_KEYS);
    const key = pool[(Math.random() * pool.length) | 0];

    const frag = makeFragment(key, toBg, state);
    target.appendChild(frag);
    const dur = parseFloat(frag.style.getPropertyValue("--dur")) * 1000;
    setTimeout(() => frag.remove(), dur + 200);
  }

  function makeFragment(key, isBg, state) {
    const f = document.createElement("div");
    f.className = "inst-frag";
    if (ENTITY_KEYS.includes(key)) f.classList.add("inst-entity");

    let size;
    if (ENTITY_KEYS.includes(key)) size = 280 + Math.random() * 240;
    else if (isBg)                 size = 220 + Math.random() * 320;
    else                           size = 90  + Math.random() * 140;
    f.style.width = size + "px"; f.style.height = size + "px";

    const vw = innerWidth, vh = innerHeight;
    const x0 = Math.random() * vw, y0 = Math.random() * vh;
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 220;
    const x1 = x0 + Math.cos(ang) * dist;
    const y1 = y0 + Math.sin(ang) * dist;

    f.style.left = "0"; f.style.top = "0";
    f.style.setProperty("--x0", `${x0 - size / 2}px`);
    f.style.setProperty("--y0", `${y0 - size / 2}px`);
    f.style.setProperty("--x1", `${x1 - size / 2}px`);
    f.style.setProperty("--y1", `${y1 - size / 2}px`);
    f.style.setProperty("--r0", `${(Math.random() - 0.5) * 8}deg`);
    f.style.setProperty("--r1", `${(Math.random() - 0.5) * 24}deg`);

    const dur = isBg ? 22 + Math.random() * 16 : 12 + Math.random() * 10;
    f.style.setProperty("--dur", `${dur}s`);

    let peak = isBg ? 0.35 : 0.7;
    if (ENTITY_KEYS.includes(key)) peak = 0.85;
    if (state.chaos) peak = Math.min(1, peak + 0.2);
    f.style.setProperty("--peak", peak.toFixed(2));

    f.style.color = COLORS[(Math.random() * COLORS.length) | 0];

    // dissonance modifiers (more varied)
    const r = Math.random();
    if (state.chaos && r < 0.55) f.classList.add("inst-jitter", "inst-echo");
    else if (r < 0.06) f.classList.add("inst-flicker");
    else if (r < 0.14) f.classList.add("inst-echo");
    else if (state.scroll > 0.35 && r < 0.30) f.classList.add("inst-jitter");

    // psychedelic + melt — more frequent as we descend
    const psyChance = 0.05 + state.scroll * 0.45;
    if (Math.random() < psyChance) f.classList.add("inst-psy");
    if (Math.random() < (0.04 + state.scroll * 0.30)) f.classList.add("inst-melt");
    if (state.chaos && Math.random() < 0.15) f.classList.add("inst-mirror");

    f.innerHTML = A[key];
    return f;
  }

  // ---------- Click glitch burst ----------
  let glitchLock = false;
  function glitch(root, mid) {
    if (glitchLock) return;
    glitchLock = true;
    root.classList.add("glitch-burst");
    const frags = mid.querySelectorAll(".inst-frag");
    frags.forEach((f) => {
      const dx = (Math.random() - 0.5) * 50;
      const dy = (Math.random() - 0.5) * 50;
      f.style.transition = "translate 0.18s steps(3)";
      f.style.translate = `${dx}px ${dy}px`;
    });
    setTimeout(() => { frags.forEach((f) => { f.style.translate = "0 0"; }); }, 220);
    setTimeout(() => {
      root.classList.remove("glitch-burst");
      frags.forEach((f) => { f.style.transition = ""; f.style.translate = ""; });
      glitchLock = false;
    }, 550);
  }

  // ---------- Hover nudge ----------
  function nudge(mid, mx, my) {
    const frags = mid.querySelectorAll(".inst-frag");
    frags.forEach((f) => {
      const r = f.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = cx - mx, dy = cy - my;
      const d2 = dx * dx + dy * dy;
      if (d2 > 60000) return;
      const force = (1 - d2 / 60000) * 12;
      const u = Math.sqrt(d2 || 1);
      f.style.translate = `${(dx / u) * force}px ${(dy / u) * force}px`;
    });
  }

  // ---------- Lilith Footer ----------
  function mountLilithFooter() {
    if (document.getElementById("lilith-footer")) return;
    const f = document.createElement("footer");
    f.id = "lilith-footer";
    f.innerHTML = `
      <div class="lf-skybleed"></div>
      <div class="lf-stars"></div>
      <div class="lf-img-wrap">
        <img class="lf-lilith" alt="" decoding="async" loading="lazy"/>
      </div>
      <div class="lf-caption">
        Neither angel nor man . the rejected one rests at the threshold
        <span class="jp">人類補完計画 ・ 完</span>
      </div>
      <div class="lf-sig">
        <span>NERV // ARCHIVE END</span>
        <span>SYNC RATIO ∞ . 00%</span>
        <span>LCL FIELD STABLE</span>
      </div>`;
    document.body.appendChild(f);

    const img = f.querySelector("img.lf-lilith");
    // prefer local /lilith-footer.png if present (CRA serves /public at root)
    const local = "/lilith-footer.png";
    const probe = new Image();
    probe.onload = () => { img.src = local; };
    probe.onerror = () => { img.src = LILITH_CDN; };
    probe.src = local;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

/* ============================================================
   NERV HUD — top-left sync ratio bar (scroll progress)
   ============================================================ */
(function () {
  if (window.__INST_HUD__) return;
  window.__INST_HUD__ = true;

  const isMobile = matchMedia("(max-width: 768px)").matches;

  function boot() {
    const hud = document.createElement("div");
    hud.id = "inst-hud";
    hud.innerHTML =
      '<span>NERV</span>' +
      '<span class="ih-bar"><i></i></span>' +
      '<span class="ih-syn">SYNC 00.0%</span>';
    document.body.appendChild(hud);
    const bar = hud.querySelector(".ih-bar i");
    const syn = hud.querySelector(".ih-syn");
    requestAnimationFrame(() => hud.classList.add("on"));

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const s = Math.min(1, Math.max(0, scrollY / max));
      bar.style.setProperty("--syn", (s * 100) + "%");
      syn.textContent = "SYNC " + (s * 100).toFixed(1) + "%";
    };
    addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    setTimeout(boot, 50);
  }

  if (isMobile) {
    setInterval(() => {
      const mid = document.querySelector("#instrumentality-root .inst-mid");
      const bg = document.querySelector("#instrumentality-root .inst-bg");
      if (mid && mid.children.length > 8) mid.firstElementChild && mid.firstElementChild.remove();
      if (bg && bg.children.length > 4) bg.firstElementChild && bg.firstElementChild.remove();
    }, 800);
  }
})();
