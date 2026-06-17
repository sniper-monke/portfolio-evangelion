import React from "react";

// Decorative Japanese vertical text strip — runs down the side of a section as accent.
export function JpVerticalStrip({ children, className = "", color = "text-nerv-orange/60" }) {
  return (
    <div className={`hidden md:flex flex-col items-center justify-start gap-2 font-jp tracking-[0.4em] text-[11px] ${color} ${className}`} style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
      {children}
    </div>
  );
}

// Bilingual section caption — JP large, EN small underneath
export function BilingualCaption({ jp, en, color = "text-nerv-orange" }) {
  return (
    <div className="flex flex-col">
      <div className={`font-jp ${color} text-glow-orange tracking-[0.18em] text-base md:text-xl`}>{jp}</div>
      <div className="text-[10px] mono-tag text-foreground/60 mt-0.5">{en}</div>
    </div>
  );
}

// Decorative Japanese watermark for a panel corner
export function JpWatermark({ children, position = "top-right" }) {
  const pos = {
    "top-right": "top-1 right-1",
    "top-left": "top-1 left-1",
    "bottom-right": "bottom-1 right-1",
    "bottom-left": "bottom-1 left-1",
  }[position];
  return (
    <div className={`absolute ${pos} font-jp text-nerv-orange/15 text-3xl md:text-5xl leading-none pointer-events-none select-none tracking-widest`}>
      {children}
    </div>
  );
}
