import React, { useState } from "react";
import { PROJECTS, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { SectionHeader, HazardBar } from "../components/TerminalPanel";

function OpRow({ p, idx, onOpen }) {
  return (
    <button onClick={() => onOpen(p)} data-testid={`operation-${p.id}`} data-cursor="hover" className="text-left grid grid-cols-12 gap-2 border border-nerv-orange/40 hover:border-nerv-orange bg-background/40 p-1.5 group transition-colors w-full">
      <div className="col-span-1 hidden md:flex items-center justify-center border-r border-nerv-orange/30">
        <span className="font-stamp text-nerv-orange text-glow-orange text-xl tracking-widest">{String(idx+1).padStart(2,"0")}</span>
      </div>
      <div className="col-span-3 md:col-span-2 aspect-[16/10] overflow-hidden border border-nerv-orange/30 relative">
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
        <span className="absolute top-0 left-0 bg-black/85 text-[8px] tracking-widest text-nerv-orange px-1">{p.id}</span>
      </div>
      <div className="col-span-9 md:col-span-6">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-stamp text-foreground text-lg md:text-xl tracking-widest group-hover:text-nerv-orange transition-colors">{p.name}</span>
          <span className="label-box text-nerv-red border-nerv-red text-[9px]">{p.classification}</span>
        </div>
        <div className="text-[11px] font-mono text-foreground/80 leading-tight">{p.summary}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {p.tech.slice(0,5).map((t) => <span key={t} className="label-box text-foreground/70 border-foreground/30 text-[9px]">{t}</span>)}
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 border-l-0 md:border-l border-nerv-orange/20 md:pl-2 text-[10px] font-mono tracking-widest">
        <div className="text-foreground/50">STATUS</div>
        <div className="text-nerv-green">● OPERATIONAL</div>
        <div className="text-foreground/50 mt-1">REGISTERED</div>
        <div className="text-foreground">2024-Q{(idx%4)+1}</div>
        <div className="text-foreground/50 mt-1">▸ OPEN MISSION FILE</div>
      </div>
    </button>
  );
}

export default function OperationsSection() {
  const [active, setActive] = useState(null);
  return (
    <section id="operations" className="px-3 md:px-4 py-8" data-testid="operations-section">
      <SectionHeader file="FILE-02/OPERATIONS" title="OPERATIONS LOG" titleJp="作戦記録" sub={`${PROJECTS.length} OPERATIONS REGISTERED // SORT: CHRONO`} code="LOG" status="OPERATIONAL" />

      <div className="grid grid-cols-12 gap-1.5">
        <div className="col-span-12 lg:col-span-9 space-y-1">
          <div className="grid grid-cols-12 gap-2 text-[9px] font-mono tracking-widest text-nerv-orange/80 border border-nerv-orange/40 bg-nerv-orange/5 px-2 py-1">
            <div className="col-span-1 hidden md:block">IDX</div>
            <div className="col-span-3 md:col-span-2">VISUAL</div>
            <div className="col-span-9 md:col-span-6">DESIGNATION // BRIEF</div>
            <div className="col-span-12 md:col-span-3">META</div>
          </div>
          {PROJECTS.map((p, i) => <OpRow key={p.id} p={p} idx={i} onOpen={setActive} />)}
        </div>

        <aside className="col-span-12 lg:col-span-3 space-y-1.5">
          <TerminalPanel file="STATS" title="MISSION TELEMETRY" variant="green" status="LIVE" statusColor="text-nerv-green">
            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono tracking-widest">
              <div className="border border-nerv-green/40 p-1"><div className="text-foreground/50">TOTAL</div><div className="text-nerv-green text-lg font-stamp">{PROJECTS.length.toString().padStart(2,"0")}</div></div>
              <div className="border border-nerv-green/40 p-1"><div className="text-foreground/50">ACTIVE</div><div className="text-nerv-green text-lg font-stamp">06</div></div>
              <div className="border border-nerv-green/40 p-1"><div className="text-foreground/50">SHIPPED</div><div className="text-nerv-orange text-lg font-stamp">14</div></div>
              <div className="border border-nerv-green/40 p-1"><div className="text-foreground/50">STARS</div><div className="text-nerv-orange text-lg font-stamp">347</div></div>
            </div>
          </TerminalPanel>

          <TerminalPanel file="CONNECT" title="MAGI/MIRROR" classification="WIRE" status="OK" meta={[{ k: "EXT", v: "6008" }]}>
            <div className="terminal-line space-y-0.5">
              <div><span className="text-nerv-green">●</span> github.com/aaravkrishna ............ OK</div>
              <div><span className="text-nerv-green">●</span> linkedin.com/in/aaravkrishna ....... OK</div>
              <div><span className="text-nerv-red">●</span> drive.tokyo-3/file-store ........... LOCKED</div>
              <div><span className="text-nerv-yellow">●</span> npmjs.com/~aaravkrishna ............ STALE</div>
            </div>
          </TerminalPanel>

          <TerminalPanel file="VISUAL/00" title="EVA-UI REFERENCE" variant="white" status="ARCHIVED">
            <img src={NERV_MEDIA.fui1} alt="EVA FUI archive frame" loading="lazy" className="w-full border border-foreground/30" />
            <div className="text-[9px] font-mono tracking-widest text-foreground/60 mt-1">FRM-001 // RECOVERED FROM NERV/ARC/UI</div>
          </TerminalPanel>
        </aside>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-02 // PROCEED TO FILE-03 // SYNC RATIO TEST" /></div>

      {active && (
        <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm p-3 md:p-6 overflow-y-auto" onClick={() => setActive(null)} data-testid="operation-modal">
          <div className="max-w-4xl mx-auto border-2 border-nerv-orange bg-background relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-nerv-orange/60 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-orange">
              <span>OPERATION FILE :: {active.id} :: {active.classification}</span>
              <button onClick={() => setActive(null)} data-testid="close-modal" className="text-nerv-red hover:bg-nerv-red hover:text-background px-2">CLOSE [X]</button>
            </div>
            <div className="p-3 md:p-5">
              <div className="display-stretch text-3xl md:text-5xl text-nerv-orange text-glow-orange">{active.name}</div>
              <div className="grid md:grid-cols-2 gap-2 mt-3">
                <img src={active.image} alt={active.name} className="w-full border-2 border-nerv-orange/40" />
                <div>
                  <div className="text-[10px] mono-tag text-foreground/60">MISSION BRIEF</div>
                  <p className="terminal-line text-foreground/90 mt-1">{active.detail}</p>
                  <div className="text-[10px] mono-tag text-foreground/60 mt-3">TECH STACK</div>
                  <div className="flex flex-wrap gap-1 mt-1">{active.tech.map((t) => <span key={t} className="label-box text-nerv-orange">{t}</span>)}</div>
                  <div className="flex gap-2 mt-4">
                    <a href={active.github} target="_blank" rel="noreferrer" className="label-box text-foreground hover:bg-foreground hover:text-background">GITHUB ↗</a>
                    <a href={active.demo} target="_blank" rel="noreferrer" className="label-box text-nerv-orange hover:bg-nerv-orange hover:text-background">LIVE DEMO ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
