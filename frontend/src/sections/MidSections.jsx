import React from "react";
import { ECONOMICS_ESSAYS, ACHIEVEMENTS, CURRENT_STATUS } from "../data/portfolio";

export function EconomicsSection() {
  return (
    <section id="economics" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="economics-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 04 // DIVISION-E</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">ECONOMIC ANALYSIS DIVISION</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">ESSAYS · RESEARCH · COMPETITIONS</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {ECONOMICS_ESSAYS.map((e, i) => (
          <article
            key={e.title}
            className="border-2 border-foreground/30 hover:border-nerv-orange p-4 bg-background/40 transition-colors relative"
          >
            <div className="absolute top-2 right-2 text-[10px] tracking-widest text-foreground/50">#{String(i + 1).padStart(2, "0")}</div>
            <div className="text-[10px] tracking-widest text-nerv-orange mb-1">{e.period}</div>
            <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-2">{e.title}</h3>
            <p className="text-sm text-foreground/80">{e.summary}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {e.tags.map((t) => (
                <span key={t} className="border border-nerv-orange/60 text-nerv-orange px-2 py-0.5 text-[10px] tracking-widest">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 border border-nerv-orange/50 p-3 text-[11px] font-mono text-foreground/80">
        › NOTE: Subject is also pursuing the <span className="text-nerv-orange">HUMAN INSTRUMENTALITY PROJECT</span> — a long-form thesis on
        societal coordination, mechanism design and the limits of game-theoretic equilibria. (Type <span className="text-nerv-green">thirdimpact</span> in terminal to access.)
      </div>
    </section>
  );
}

export function AchievementsSection({ unlocked }) {
  return (
    <section id="achievements" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="achievements-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 05 // NERV RECORDS</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">ACHIEVEMENTS</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">
          HIDDEN PROGRESS: {unlocked.length}/8 SECRETS DISCOVERED
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.code} className="border-2 border-nerv-orange/40 p-3 bg-background/40 relative">
            <div className="hazard-stripe absolute left-0 top-0 bottom-0 w-2" />
            <div className="pl-4">
              <div className="text-[10px] tracking-widest text-nerv-orange">{a.code} // {a.year}</div>
              <div className="font-display text-lg tracking-tight">{a.title}</div>
              <div className="text-[10px] text-nerv-green mt-1">✔ VERIFIED BY MAGI</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-2 border-dashed border-nerv-orange/40 p-4">
        <div className="text-[10px] tracking-widest text-nerv-orange mb-2">HIDDEN RECORDS // LOCALSTORAGE-PERSISTED</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
          {["KONAMI_UNLOCK", "THIRD_IMPACT", "TERMINAL_OPENED", "MAGI_LOGIN", "INSTRUMENTALITY", "DOG_PAGE", "ANGEL_SIGHTED", "SECRET_EVA"].map((id) => (
            <div
              key={id}
              className={`border p-2 tracking-widest ${unlocked.includes(id) ? "border-nerv-green text-nerv-green text-glow-green" : "border-foreground/30 text-foreground/40"}`}
            >
              {unlocked.includes(id) ? "✔" : "○"} {id}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatusSection() {
  return (
    <section id="status" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="status-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 07 // OPERATIONAL STATUS</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">CURRENT STATUS</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">REAL-TIME PILOT TELEMETRY</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {CURRENT_STATUS.map((s) => (
          <div key={s.label} className="border-2 border-nerv-orange/40 p-4 bg-background/40">
            <div className="text-[10px] tracking-widest text-nerv-orange">{s.label}</div>
            <div className="font-display text-base md:text-lg tracking-tight mt-2">{s.value}</div>
            <div className="mt-3 h-1 bg-nerv-orange/20"><div className="h-full bg-nerv-orange w-2/3" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
