import React, { useState } from "react";
import { PROJECTS } from "../data/portfolio";

export default function OperationsSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="operations" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="operations-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 02 // OPERATIONS LOG</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">PROJECT ARCHIVES</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">{PROJECTS.length} OPERATIONS REGISTERED</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            data-testid={`operation-${p.id}`}
            data-cursor="hover"
            className="text-left border-2 border-nerv-orange/40 hover:border-nerv-orange bg-background/40 group transition-colors relative overflow-hidden"
          >
            <div className="aspect-[16/9] overflow-hidden border-b-2 border-nerv-orange/40 relative">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 grid-bg pointer-events-none mix-blend-overlay" />
              <div className="absolute top-1 left-1 text-[10px] tracking-widest text-nerv-orange bg-background/80 px-1">{p.id}</div>
              <div className="absolute top-1 right-1 text-[10px] tracking-widest text-nerv-red font-stamp">{p.classification}</div>
            </div>
            <div className="p-3">
              <div className="font-display text-xl tracking-tight text-foreground group-hover:text-nerv-orange transition-colors">{p.name}</div>
              <div className="text-[11px] text-foreground/70 mt-1 line-clamp-2">{p.summary}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="border border-foreground/30 text-foreground/70 px-1.5 py-0.5 text-[9px] tracking-widest">{t}</span>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 text-[10px] text-nerv-orange/60 p-2 tracking-widest">
              [{String(idx + 1).padStart(2, "0")}] › OPEN
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm p-4 md:p-10 overflow-y-auto"
          onClick={() => setActive(null)}
          data-testid="operation-modal"
        >
          <div className="max-w-4xl mx-auto border-2 border-nerv-orange p-5 md:p-8 bg-background relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              data-testid="close-modal"
              className="absolute top-2 right-2 text-nerv-orange border border-nerv-orange/60 px-2 py-0.5 text-xs tracking-widest hover:bg-nerv-orange hover:text-background"
            >
              CLOSE [X]
            </button>
            <div className="text-[10px] tracking-widest text-nerv-orange">OPERATION FILE // {active.id} // {active.classification}</div>
            <h3 className="display-stretch text-4xl md:text-5xl mt-2 text-nerv-orange text-glow-orange">{active.name}</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <img src={active.image} alt={active.name} className="w-full border-2 border-nerv-orange/40" />
              <div>
                <div className="text-[10px] tracking-widest text-nerv-orange mb-1">MISSION SUMMARY</div>
                <p className="text-sm">{active.detail}</p>
                <div className="text-[10px] tracking-widest text-nerv-orange mt-3 mb-1">TECH STACK</div>
                <div className="flex flex-wrap gap-1">
                  {active.tech.map((t) => (
                    <span key={t} className="border border-nerv-orange/60 text-nerv-orange px-2 py-0.5 text-[10px] tracking-widest">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <a href={active.github} target="_blank" rel="noreferrer" className="border-2 border-foreground px-3 py-1 text-xs tracking-widest hover:bg-foreground hover:text-background">
                    GITHUB ↗
                  </a>
                  <a href={active.demo} target="_blank" rel="noreferrer" className="border-2 border-nerv-orange text-nerv-orange px-3 py-1 text-xs tracking-widest hover:bg-nerv-orange hover:text-background">
                    LIVE ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
