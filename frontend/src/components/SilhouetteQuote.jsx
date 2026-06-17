import React from "react";

// Abstract geometric silhouettes (originally drawn — not derived from copyrighted artwork)
// Each is a stylised stand-in tagged with codename + iconic short reference quote.

export function FigureRei() {
  return (
    <svg viewBox="0 0 120 220" className="w-full h-full">
      <defs>
        <linearGradient id="reiGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* head + bob */}
      <path d="M44,16 Q60,4 76,16 L80,42 Q80,52 70,54 L50,54 Q40,52 40,42 Z" fill="url(#reiGlow)" />
      {/* neck */}
      <rect x="55" y="54" width="10" height="10" fill="url(#reiGlow)" />
      {/* shoulders + torso (plug suit silhouette) */}
      <path d="M30,68 Q60,58 90,68 L84,140 Q60,150 36,140 Z" fill="url(#reiGlow)" />
      {/* arms */}
      <path d="M28,72 L18,118 L26,120 L36,76 Z" fill="url(#reiGlow)" />
      <path d="M92,72 L102,118 L94,120 L84,76 Z" fill="url(#reiGlow)" />
      {/* legs */}
      <path d="M40,140 L36,210 L50,210 L54,142 Z" fill="url(#reiGlow)" />
      <path d="M80,140 L84,210 L70,210 L66,142 Z" fill="url(#reiGlow)" />
      {/* eye glow line */}
      <line x1="42" y1="34" x2="78" y2="34" stroke="#FFD700" strokeWidth="2" opacity="0.85" />
    </svg>
  );
}

export function FigureAsuka() {
  return (
    <svg viewBox="0 0 120 220" className="w-full h-full">
      <defs>
        <linearGradient id="asukaGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF3030" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FF3030" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* long flowing hair behind head */}
      <path d="M30,18 L18,120 L34,118 L40,40 Z" fill="url(#asukaGlow)" />
      <path d="M90,18 L102,120 L86,118 L80,40 Z" fill="url(#asukaGlow)" />
      {/* head */}
      <path d="M44,14 Q60,2 76,14 L80,40 Q80,52 70,54 L50,54 Q40,52 40,40 Z" fill="url(#asukaGlow)" />
      {/* neck */}
      <rect x="55" y="54" width="10" height="10" fill="url(#asukaGlow)" />
      {/* torso */}
      <path d="M28,68 Q60,56 92,68 L82,142 Q60,152 38,142 Z" fill="url(#asukaGlow)" />
      {/* hand on hip pose - arms */}
      <path d="M30,72 L14,108 L24,116 L40,80 Z" fill="url(#asukaGlow)" />
      <path d="M90,72 L100,116 L92,124 L80,82 Z" fill="url(#asukaGlow)" />
      {/* legs */}
      <path d="M40,142 L34,212 L52,212 L54,144 Z" fill="url(#asukaGlow)" />
      <path d="M80,142 L86,212 L68,212 L66,144 Z" fill="url(#asukaGlow)" />
      <line x1="42" y1="32" x2="78" y2="32" stroke="#FFD700" strokeWidth="2" opacity="0.85" />
    </svg>
  );
}


export function FigureShinji() {
  return (
    <svg viewBox="0 0 120 220" className="w-full h-full">
      <defs>
        <linearGradient id="shinjiGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#50FF50" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#50FF50" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* slumped head tilted down */}
      <path d="M46,22 Q60,12 76,22 L82,50 Q80,60 70,62 L52,62 Q42,60 42,50 Z" fill="url(#shinjiGlow)" />
      {/* hunched neck/shoulders */}
      <rect x="55" y="62" width="10" height="8" fill="url(#shinjiGlow)" />
      <path d="M30,78 Q60,72 90,78 L84,148 Q60,158 36,148 Z" fill="url(#shinjiGlow)" />
      {/* arms wrapped around self */}
      <path d="M32,82 L42,128 L54,116 L46,84 Z" fill="url(#shinjiGlow)" />
      <path d="M88,82 L78,128 L66,116 L74,84 Z" fill="url(#shinjiGlow)" />
      {/* legs */}
      <path d="M42,148 L36,212 L52,212 L54,150 Z" fill="url(#shinjiGlow)" />
      <path d="M78,148 L84,212 L68,212 L66,150 Z" fill="url(#shinjiGlow)" />
      <line x1="46" y1="44" x2="76" y2="44" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

// Render a silhouette + quote in a NERV terminal panel
export default function SilhouetteQuote({ codename, designation, fileId, quoteJp, quoteEn, footer, variant = "orange", figure }) {
  const tone =
    variant === "red" ? "border-nerv-red text-nerv-red"
    : variant === "green" ? "border-nerv-green text-nerv-green"
    : "border-nerv-orange text-nerv-orange";
  const FigureComp = figure === "rei" ? FigureRei : figure === "asuka" ? FigureAsuka : FigureShinji;

  return (
    <div className={`relative border ${tone} bg-background/60`}>
      <div className={`flex items-center justify-between border-b ${tone} px-2 py-1 text-[10px] tracking-widest font-mono`}>
        <div className="flex items-center gap-2">
          <span className="hazard-stripe w-3 h-3 inline-block" />
          <span>{fileId}</span>
          <span className="opacity-50">::</span>
          <span>SILHOUETTE / VOICE LOG</span>
        </div>
        <span className="opacity-60">REDACTED IDENTITY</span>
      </div>

      <div className="grid grid-cols-12 gap-2 p-3 md:p-4">
        {/* figure block */}
        <div className="col-span-4 md:col-span-3 relative">
          <div className="aspect-[3/5] border border-current/40 bg-black relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
            <FigureComp />
            {/* targeting reticle */}
            <div className="absolute inset-2 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-current" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-current" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-current" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-current" />
            </div>
            <div className="absolute top-1 left-1 text-[8px] font-mono tracking-widest opacity-70">SUBJ {codename}</div>
            <div className="absolute bottom-1 right-1 text-[8px] font-mono tracking-widest opacity-70">{designation}</div>
          </div>
        </div>

        {/* quote block */}
        <div className="col-span-8 md:col-span-9 flex flex-col justify-between">
          <div>
            <div className="text-[9px] font-mono tracking-[0.4em] opacity-70 mb-1">VOICE LOG // FRAGMENT</div>
            <div className="font-jp text-2xl md:text-4xl tracking-widest text-foreground/95 leading-tight">「{quoteJp}」</div>
            <div className="display-stretch text-2xl md:text-4xl mt-2">{quoteEn}</div>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-0.5 text-[9px] font-mono tracking-widest opacity-80 border-t border-current/30 pt-2">
            <div><span className="opacity-50">CODENAME:</span> <span>{codename}</span></div>
            <div><span className="opacity-50">DESIG:</span> <span>{designation}</span></div>
            <div><span className="opacity-50">SOURCE:</span> NERV/AUDIO/RAW</div>
            <div className="col-span-2 md:col-span-3 opacity-70">{footer}</div>
          </div>
        </div>
      </div>
      <span className={`absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-current`} />
    </div>
  );
}
