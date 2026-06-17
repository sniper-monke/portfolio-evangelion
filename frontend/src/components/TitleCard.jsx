import React from "react";

// Episode-style title card divider between sections
export default function TitleCard({ episode = "01", titleJp = "使徒、襲来", titleEn = "ANGEL ATTACK", subtitle = "" }) {
  return (
    <div className="relative my-6 mx-3 md:mx-6 border-2 border-foreground/80 bg-black overflow-hidden" data-testid="episode-card">
      <div className="absolute top-0 left-0 right-0 hazard-stripe h-2" />
      <div className="absolute bottom-0 left-0 right-0 hazard-stripe h-2" />
      <div className="grid grid-cols-12 gap-2 p-4 md:p-8 min-h-[160px] md:min-h-[220px]">
        {/* left: episode number JP */}
        <div className="col-span-3 md:col-span-3 flex flex-col items-start justify-center text-foreground">
          <div className="text-[10px] tracking-widest font-mono opacity-70">第 {episode} 話</div>
          <div className="font-stamp text-2xl md:text-5xl leading-none mt-1 break-all">{titleJp}</div>
        </div>
        {/* right: EVA title style */}
        <div className="col-span-9 md:col-span-9 flex flex-col justify-center pl-2 md:pl-6 border-l border-foreground/50">
          <div className="font-stamp text-foreground text-3xl md:text-6xl leading-none">NEON GENESIS</div>
          <div className="font-stamp text-foreground text-4xl md:text-7xl leading-none">EVANGELION</div>
          <div className="mt-2 md:mt-3 flex items-center justify-between text-[10px] md:text-xs tracking-widest font-mono text-foreground/80">
            <span>EPISODE : {episode}</span>
            <span className="font-stamp text-base md:text-2xl tracking-[0.2em]">{titleEn}</span>
          </div>
          {subtitle && <div className="mt-1 text-[10px] tracking-widest font-mono text-nerv-orange">{subtitle}</div>}
        </div>
      </div>
      {/* scan line ribbon */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.04) 4px, rgba(255,255,255,0.04) 4px)",
      }} />
    </div>
  );
}
