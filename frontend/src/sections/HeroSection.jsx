import React, { useEffect, useState } from "react";
import { PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { HazardBar, MetaRow } from "../components/TerminalPanel";
import { MagiHexDisplay, HarmonicsGraph, ActiveTimeDisplay, PatternBadge } from "../components/MagiDisplays";

function useTyped(text, speed = 36) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut(""); let i = 0;
    const id = setInterval(() => { i++; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(id); }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function HeroSection({ onSound }) {
  const typed = useTyped(PILOT.tagline, 32);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const onMove = (e) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    const tick = setInterval(() => setNow(new Date()), 1000);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); clearInterval(tick); };
  }, []);

  const ts = now.toISOString().replace("T", " ").slice(0, 19);

  return (
    <section id="home" className="relative min-h-screen pt-16 pb-20 px-3 md:px-4 dot-grid" data-testid="hero-section">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(255,107,0,0.25), transparent 60%)` }} />

      {/* Top hazard ribbon */}
      <div className="relative pt-2 pb-1">
        <HazardBar label="CLASSIFIED // NERV CENTRAL DOGMA // PERSONNEL FILE PILOT-01" />
      </div>

      {/* 12 column dense grid */}
      <div className="relative grid grid-cols-12 gap-1.5 mt-1.5">
        {/* LEFT SIDEBAR: defense line strip (like ref image) */}
        <aside className="hidden md:flex flex-col col-span-1 border border-nerv-orange/40 bg-background/60">
          {Array.from({ length: 14 }).map((_, i) => {
            const code = (i + 1).toString().padStart(2, "0");
            const ok = i < 9;
            return (
              <div key={i} className="flex items-center gap-1 px-1 py-1 border-b border-nerv-orange/20 last:border-0 text-[8px] font-mono tracking-widest">
                <span className={`w-2 h-3 ${ok ? "bg-nerv-green" : "bg-nerv-red/70"}`} />
                <div className="flex-1">
                  <div className={`${ok ? "text-nerv-green" : "text-nerv-red"} leading-none`}>{code}</div>
                  <div className="text-[7px] text-foreground/50 leading-none">CODE:1.32</div>
                  <div className="text-[7px] text-foreground/50 leading-none">DEFENCE LINE</div>
                </div>
              </div>
            );
          })}
        </aside>

        {/* MAIN HERO TERMINAL */}
        <div className="col-span-12 md:col-span-7 space-y-1.5">
          <TerminalPanel
            file="FILE/00/HOME"
            title="PERSONNEL DOSSIER — ACCESS GRANTED VIA OVERRIDE"
            classification="A-1 // EYES ONLY"
            status="LIVE"
            statusColor="text-nerv-red"
            meta={[
              { k: "TS", v: ts + "Z" },
              { k: "NODE", v: "TOKYO-3/GF-S7" },
              { k: "SEQ", v: "0xA7-F3-91" },
              { k: "REC", v: "01/01" },
            ]}
          >
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="col-span-2">
                <div className="text-[10px] mono-tag text-foreground/60">CODENAME</div>
                <div className="display-stretch text-4xl md:text-6xl text-nerv-orange text-glow-orange">{PILOT.codename}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-widest">
                  <span className="label-box text-nerv-orange">DESIG ▸ {PILOT.designation}</span>
                  <span className="label-box text-nerv-green">STATUS ▸ {PILOT.status}</span>
                  <span className="label-box text-foreground/80">CLS ▸ STUDENT DEV / ECON</span>
                </div>
                <div className="mt-3 border-t border-nerv-orange/30 pt-2 text-sm font-mono text-foreground/90">
                  &gt; {typed}<span className="caret"></span>
                </div>
              </div>
              <div className="col-span-1 border border-nerv-orange/50 bg-black p-1 flex items-center justify-center min-h-[140px]">
                <img src={NERV_MEDIA.nervLogo} alt="NERV crest" className="max-h-32 w-auto" />
              </div>
            </div>

            {/* dense readout grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-3 text-[10px] font-mono tracking-widest">
              {[
                { k: "BLOOD", v: PILOT.bloodType, c: "text-foreground" },
                { k: "SYNC", v: `${PILOT.syncRatio}%`, c: "text-nerv-orange" },
                { k: "AT-FIELD", v: "99.4%", c: "text-nerv-green" },
                { k: "PULSE", v: "62 BPM", c: "text-nerv-green" },
                { k: "BIRTH REC", v: "REDACTED", c: "text-nerv-red" },
                { k: "L.C.L", v: "NOMINAL", c: "text-nerv-cyan" },
                { k: "AUTH-KEY", v: "████████", c: "text-foreground/60" },
                { k: "RING-COUNT", v: "07", c: "text-foreground" },
              ].map((d) => (
                <div key={d.k} className="border border-nerv-orange/30 px-1.5 py-0.5">
                  <span className="text-foreground/50">{d.k}</span>
                  <span className={`block ${d.c}`}>{d.v}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              <a href="#operations" onClick={onSound} data-testid="cta-explore" data-cursor="hover" className="label-box hover:bg-nerv-orange hover:text-background text-nerv-orange transition-colors">› ENTER ARCHIVE</a>
              <a href={PILOT.resumeUrl} download data-testid="cta-resume" data-cursor="hover" className="label-box border-nerv-red text-nerv-red hover:bg-nerv-red hover:text-background transition-colors">↓ PERSONNEL REPORT</a>
              <a href="#contact" data-cursor="hover" className="label-box border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">◉ OPEN CHANNEL</a>
              <span className="label-box border-nerv-green/70 text-nerv-green">PRESS ~ ▸ TERMINAL</span>
            </div>
          </TerminalPanel>

          {/* MAGI deliberation + Harmonics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            <TerminalPanel file="MAGI/02" title="DELIBERATION" classification="ROOT" status="UNANIMOUS" meta={[{ k: "EXT", v: "4036" }, { k: "IX", v: "OFF" }, { k: "PRIORITY", v: "AAA" }]}>
              <MagiHexDisplay verdict="APPROVED — ACCESS GRANTED" />
            </TerminalPanel>
            <TerminalPanel file="EVA/HARMONICS" title="SYNCHRONIZATION TEST" classification="A" status="GREEN" statusColor="text-nerv-green" meta={[{ k: "PLUG", v: "01" }, { k: "L.C.L", v: "0.99" }, { k: "EVA-UNIT", v: "01" }]}>
              <HarmonicsGraph subject={PILOT.codename} value={PILOT.syncRatio} />
            </TerminalPanel>
          </div>
        </div>

        {/* RIGHT SIDEBAR: stacked HUD panels */}
        <aside className="col-span-12 md:col-span-4 space-y-1.5">
          <ActiveTimeDisplay />
          <TerminalPanel file="MAGI" title="3-CORE STATUS" variant="green" classification="ROOT" status="ONLINE" meta={[{ k: "EXT", v: "2010" }, { k: "EX_MODE", v: "ON" }]}>
              <div className="grid grid-cols-3 gap-1 text-center text-[9px] font-mono">
                {["CASPER-3","BALTHASAR-2","MELCHIOR-1"].map((n) => (
                  <div key={n} className="border border-nerv-green/60 bg-nerv-green/10 p-1">
                    <div className="text-nerv-green text-glow-green tracking-widest">{n}</div>
                    <div className="text-[8px] text-nerv-green/70 mt-1">● ONLINE</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 space-y-0.5 terminal-line text-nerv-green text-glow-green">
                <div>&gt; CONNECTED:OK MAGI2/MAGI3/MAGI5/MAGI6</div>
                <div>&gt; CONNECTED:ERROR MAGI4 (Massachusetts)</div>
                <div className="text-nerv-red">&gt; FINAL DEFENCE ZONE :: STANDBY</div>
              </div>
          </TerminalPanel>
          <TerminalPanel file="A-17" title="LOCATION TELEMETRY" variant="white" classification="GEO" status="LOCKED">
            <div className="grid grid-cols-2 gap-0.5 text-[10px] font-mono">
              <div className="text-foreground/60">SITE</div><div>{PILOT.location}</div>
              <div className="text-foreground/60">LAT/LON</div><div>35.4°N // 139.4°E</div>
              <div className="text-foreground/60">DEPTH</div><div>-1,470 M</div>
              <div className="text-foreground/60">BARRIER</div><div className="text-nerv-orange">MAIN ARMOR</div>
              <div className="text-foreground/60">ANGEL THREAT</div><div className="text-nerv-red">0 (CLEAR)</div>
            </div>
            <div className="mt-2 hazard-stripe h-2" />
          </TerminalPanel>
          <TerminalPanel file="SYS" title="WARNING BUFFER" variant="red" classification="WARN" status="2 ACTIVE" statusColor="text-nerv-yellow">
            <div className="terminal-line text-nerv-red space-y-0.5">
              <div>! SYS-014 LCL VISCOSITY DRIFT (NOMINAL)</div>
              <div>! SYS-027 MAGI/MELCHIOR LATENCY +12MS</div>
              <div className="text-nerv-yellow">CAUTION: PILOT BIORHYTHM ELEVATED</div>
            </div>
          </TerminalPanel>
        </aside>
      </div>

      {/* bottom strip: pattern badges */}
      <div className="relative mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono tracking-widest">
        <PatternBadge label="BLUE" color="text-nerv-cyan" bgClass="border-nerv-cyan bg-nerv-cyan/10" />
        <PatternBadge label="GREEN" color="text-nerv-green" bgClass="border-nerv-green bg-nerv-green/10" />
        <PatternBadge label="ORANGE" color="text-nerv-orange" bgClass="border-nerv-orange bg-nerv-orange/10" />
        <span className="label-box text-foreground/70">SCROLL ↓ FOR FILE-01</span>
        <span className="label-box text-foreground/50 ml-auto">特務機関ネルフ ・ 人類補完計画</span>
      </div>
    </section>
  );
}
