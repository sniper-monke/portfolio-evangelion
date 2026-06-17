import React, { useEffect, useState } from "react";

// MAGI three-hexagon deliberation panel (inline SVG)
export function MagiHexDisplay({ verdict = "APPROVED" }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(i);
  }, []);
  const states = ["APPROVED", "APPROVED", "DENIED"]; // for visual variety
  return (
    <svg viewBox="0 0 320 260" className="w-full h-auto">
      <defs>
        <pattern id="hexgrid" width="20" height="17.32" patternUnits="userSpaceOnUse">
          <polygon points="10,0 20,5.77 20,11.55 10,17.32 0,11.55 0,5.77" fill="none" stroke="#FF6B00" strokeOpacity="0.15" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="320" height="260" fill="url(#hexgrid)" />
      {/* BALTHASAR (top) */}
      <g>
        <polygon points="160,20 200,40 200,80 160,100 120,80 120,40" fill="#0a0a0a" stroke="#FF6B00" strokeWidth="1.5" />
        <text x="160" y="58" textAnchor="middle" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">BALTHASAR-2</text>
        <text x="160" y="74" textAnchor="middle" fill="#50FF50" fontFamily="JetBrains Mono" fontSize="9">{states[0]}</text>
      </g>
      {/* CASPAR (bottom-left) */}
      <g>
        <polygon points="80,140 120,160 120,200 80,220 40,200 40,160" fill="#0a0a0a" stroke="#FF6B00" strokeWidth="1.5" />
        <text x="80" y="178" textAnchor="middle" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">CASPER-3</text>
        <text x="80" y="194" textAnchor="middle" fill="#50FF50" fontFamily="JetBrains Mono" fontSize="9">{states[1]}</text>
      </g>
      {/* MELCHIOR (bottom-right) */}
      <g>
        <polygon points="240,140 280,160 280,200 240,220 200,200 200,160" fill="#0a0a0a" stroke="#FF6B00" strokeWidth="1.5" />
        <text x="240" y="178" textAnchor="middle" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">MELCHIOR-1</text>
        <text x="240" y="194" textAnchor="middle" fill="#FF3030" fontFamily="JetBrains Mono" fontSize="9">{states[2]}</text>
      </g>
      {/* connecting lines */}
      <line x1="160" y1="100" x2="80" y2="140" stroke="#FF6B00" strokeOpacity="0.7" />
      <line x1="160" y1="100" x2="240" y2="140" stroke="#FF6B00" strokeOpacity="0.7" />
      <line x1="120" y1="200" x2="200" y2="200" stroke="#FF6B00" strokeOpacity="0.4" strokeDasharray="3 3" />
      {/* labels */}
      <text x="160" y="135" textAnchor="middle" fill="#FF6B00" fontFamily="Anton" fontSize="14" letterSpacing="3">M A G I</text>
      <text x="160" y="244" textAnchor="middle" fill="#D8D8D0" fontFamily="JetBrains Mono" fontSize="9" opacity="0.7">VERDICT: {verdict}</text>
      <text x="160" y="254" textAnchor="middle" fill="#D8D8D0" fontFamily="JetBrains Mono" fontSize="8" opacity="0.45">CYCLE {tick.toString().padStart(4, "0")} // PRIORITY AAA</text>
      {/* corner ticks */}
      <g stroke="#FF6B00" strokeWidth="1.2">
        <path d="M4 4 L14 4 M4 4 L4 14" /><path d="M316 4 L306 4 M316 4 L316 14" />
        <path d="M4 256 L14 256 M4 256 L4 246" /><path d="M316 256 L306 256 M316 256 L316 246" />
      </g>
    </svg>
  );
}

// Harmonics simulation graph (synchronization)
export function HarmonicsGraph({ subject = "PILOT-01", value = 87 }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const loop = () => { setT((x) => x + 0.04); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const W = 320, H = 160;
  const pts = Array.from({ length: 64 }, (_, i) => {
    const x = (i / 63) * (W - 40) + 30;
    const baseY = H / 2;
    const y = baseY - Math.sin(t + i * 0.45) * (12 + (value - 50) / 4) - Math.sin(t * 0.7 + i * 0.2) * 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <rect x="0" y="0" width={W} height={H} fill="#020a02" />
      {/* grid */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`gx${i}`} x1={20 + i * 18} y1="10" x2={20 + i * 18} y2={H - 10} stroke="#50FF50" strokeOpacity="0.12" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`gy${i}`} x1="10" y1={15 + i * 18} x2={W - 10} y2={15 + i * 18} stroke="#50FF50" strokeOpacity="0.12" />
      ))}
      <line x1="20" y1={H / 2} x2={W - 10} y2={H / 2} stroke="#50FF50" strokeOpacity="0.4" />
      <line x1={W / 2} y1="10" x2={W / 2} y2={H - 10} stroke="#50FF50" strokeOpacity="0.4" />
      {/* trace */}
      <polyline points={pts} fill="none" stroke="#FF6B00" strokeWidth="1.6" />
      {/* labels */}
      <text x="10" y="18" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="9">EVANGELION HARMONICS</text>
      <text x="10" y="30" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="9">SYNC TEST NO. {(132 + Math.floor(t)).toString().slice(-4)}</text>
      <text x="10" y="42" fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="9">SUBJECT: {subject}</text>
      <text x={W - 70} y={H - 10} fill="#FF6B00" fontFamily="JetBrains Mono" fontSize="9">PATTERN: GREEN</text>
      {/* y scale */}
      {[-3,-2,-1,0,1,2,3].map((n, i) => (
        <text key={i} x={W - 16} y={H / 2 - n * 18 + 3} fill="#50FF50" fontFamily="JetBrains Mono" fontSize="8" opacity="0.7">{n >= 0 ? `+${n}` : n}</text>
      ))}
    </svg>
  );
}

// Active time display (digital clock block)
export function ActiveTimeDisplay() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  const hh = now.toLocaleTimeString("en-GB", { hour12: false });
  const ms = now.getMilliseconds().toString().padStart(3, "0").slice(0, 2);
  return (
    <div className="border border-nerv-orange/60 bg-black p-2 font-mono">
      <div className="flex items-center justify-between text-[9px] tracking-widest text-nerv-orange">
        <span>現在時刻表示</span>
        <span>ACTIVE TIME DISPLAY:</span>
        <span className="text-nerv-yellow">EXT</span>
      </div>
      <div className="text-nerv-yellow text-glow-orange font-stamp text-2xl md:text-4xl tracking-[0.15em] mt-1">
        {hh}<span className="text-nerv-red">:{ms}</span>
      </div>
      <div className="flex items-center gap-1 mt-1 text-[9px] tracking-widest">
        <span className="border border-nerv-text/30 px-1.5 text-nerv-text/60">STOP</span>
        <span className="border border-nerv-text/30 px-1.5 text-nerv-text/60">SLOW</span>
        <span className="border border-nerv-red px-1.5 bg-nerv-red/20 text-nerv-red">NORMAL</span>
        <span className="border border-nerv-text/30 px-1.5 text-nerv-text/60">RACING</span>
      </div>
    </div>
  );
}

// Mental Toxicity Level bar group
export function ToxicityBars({ items }) {
  return (
    <div className="border border-nerv-red/60 bg-black p-2">
      <div className="flex items-center justify-between text-[10px] tracking-widest font-mono text-nerv-red mb-2">
        <span>MENTAL TOXICITY LEVEL</span>
        <span className="opacity-70">L.C.L. PURITY : 99.0999%</span>
      </div>
      {items.map((it, idx) => (
        <div key={idx} className="grid grid-cols-[40px_1fr_60px] items-center gap-2 mb-1.5">
          <div className="font-stamp text-nerv-red text-lg leading-none">{String(idx).padStart(2, "0")}</div>
          <div className="flex gap-[2px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className={`h-3 flex-1 ${i < it.v ? "bg-nerv-cyan" : "bg-nerv-cyan/15"}`} />
            ))}
          </div>
          <div className="text-[9px] font-mono text-nerv-red tracking-widest text-right">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

// Pattern badge (BLUE / RED / GREEN / ANGEL)
export function PatternBadge({ label = "BLUE", color = "text-nerv-cyan", bgClass = "bg-nerv-cyan/10 border-nerv-cyan" }) {
  return (
    <div className={`border ${bgClass} px-2 py-1 font-stamp tracking-[0.3em] ${color} text-xs`}>
      PATTERN ▸ {label}
    </div>
  );
}
