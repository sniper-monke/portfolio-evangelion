import React, { useEffect, useState } from "react";
import { PILOT, NERV_MEDIA } from "../data/portfolio";

function useTyped(text, speed = 40) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function HeroSection({ onSound }) {
  const typed = useTyped(PILOT.tagline, 36);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-20 pb-24 px-3 md:px-6 grid-bg" data-testid="hero-section">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(255,107,0,0.25), transparent 60%)`,
        }}
      />

      {/* outer hex brackets */}
      <div className="absolute top-24 right-6 hidden md:flex flex-col items-end gap-1 text-[10px] font-mono text-nerv-orange tracking-widest">
        <span>SEQ // 0xA7-F3</span>
        <span className="text-foreground/60">SECTOR :: A-17 // CLASSIFIED</span>
        <span className="text-nerv-red text-glow-red">● LIVE TRANSMISSION</span>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 mt-10">
        <div className="lg:col-span-8 border-2 border-nerv-orange/60 p-5 md:p-10 bg-background/40">
          <div className="text-[10px] md:text-xs tracking-[0.4em] text-nerv-orange text-glow-orange mb-3">
            CLASSIFIED // PERSONNEL DOSSIER // ACCESS GRANTED
          </div>

          <h1 className="display-stretch text-nerv-orange text-glow-orange text-6xl md:text-8xl lg:text-9xl mb-4">
            {PILOT.codename}
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-6 text-[11px] md:text-xs font-mono tracking-widest border-t border-b border-nerv-orange/40 py-3 mb-6">
            <span className="text-foreground/70">DESIGNATION:</span>
            <span className="text-nerv-orange">{PILOT.designation}</span>
            <span className="text-foreground/70">STATUS:</span>
            <span className="text-nerv-green text-glow-green">● {PILOT.status}</span>
            <span className="text-foreground/70">CLASS:</span>
            <span className="text-nerv-text">{PILOT.classification}</span>
          </div>

          <p className="text-base md:text-2xl text-foreground/90 font-display tracking-tight max-w-2xl">
            {typed}
            <span className="caret"></span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#operations"
              data-testid="cta-explore"
              data-cursor="hover"
              onClick={onSound}
              className="border-2 border-nerv-orange text-nerv-orange px-4 py-2 text-xs tracking-widest hover:bg-nerv-orange hover:text-background transition-colors"
            >
              › ENTER ARCHIVE
            </a>
            <a
              href={PILOT.resumeUrl}
              download
              data-testid="cta-resume"
              data-cursor="hover"
              className="border-2 border-nerv-red text-nerv-red px-4 py-2 text-xs tracking-widest hover:bg-nerv-red hover:text-background transition-colors"
            >
              ↓ PERSONNEL REPORT
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="border-2 border-foreground/60 text-foreground px-4 py-2 text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              ◉ OPEN CHANNEL
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2">
          <div className="border-2 border-nerv-orange/60 p-4 bg-background/40 relative">
            <img src={NERV_MEDIA.nervLogo} alt="NERV crest" className="w-full max-h-44 object-contain mix-blend-screen" />
            <div className="absolute top-1 right-1 text-[9px] text-nerv-red font-stamp tracking-widest">CLASSIFIED</div>
          </div>
          <div className="border-2 border-nerv-green/50 p-3 font-mono text-[10px] md:text-xs text-nerv-green text-glow-green bg-background/40">
            <div className="border-b border-nerv-green/30 pb-1 mb-2 tracking-widest">MAGI :: DIAGNOSTIC</div>
            <div className="grid grid-cols-2 gap-y-1">
              <span>CASPAR-1</span><span>OK</span>
              <span>MELCHIOR-2</span><span>OK</span>
              <span>BALTHASAR-3</span><span>OK</span>
              <span>CORE TEMP</span><span>34.2°C</span>
              <span>LCL VISCOSITY</span><span>NOMINAL</span>
              <span>ANGEL THREAT</span><span className="text-nerv-red text-glow-red">0</span>
            </div>
          </div>
          <div className="border-2 border-foreground/40 p-3 font-mono text-[10px] md:text-xs bg-background/40 col-span-2 lg:col-span-1">
            <div className="tracking-widest border-b border-foreground/40 pb-1 mb-2 text-foreground/70">LOCATION</div>
            <div className="text-foreground">{PILOT.location}</div>
            <div className="text-foreground/60 mt-1">LAT 35.4° // LON 139.4°</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-nerv-orange/70 animate-blink">
        SCROLL ↓ TO ENTER ARCHIVE
      </div>
    </section>
  );
}
