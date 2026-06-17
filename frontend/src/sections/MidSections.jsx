import React from "react";
import { ECONOMICS_ESSAYS, ACHIEVEMENTS, CURRENT_STATUS, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { SectionHeader, HazardBar } from "../components/TerminalPanel";

export function EconomicsSection() {
  return (
    <section id="economics" className="px-3 md:px-4 py-8" data-testid="economics-section">
      <SectionHeader file="FILE-04/DIV-E" title="ECONOMIC ANALYSIS DIVISION" sub="ESSAYS · RESEARCH · COMPETITIONS // CLEARANCE B-2" code="ENTRY" status="OPEN" />

      <div className="grid grid-cols-12 gap-1.5">
        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {ECONOMICS_ESSAYS.map((e, i) => (
            <TerminalPanel key={e.title} file={`ECO-${String(i+1).padStart(3,"0")}`} title={e.period} status="PUBLISHED" statusColor="text-nerv-green" meta={[{ k: "AUTH", v: "PILOT-01" }, { k: "REF", v: `0x${(0x4a+i).toString(16).toUpperCase()}` }]}>
              <div className="font-stamp text-foreground text-lg md:text-xl tracking-widest mb-1">{e.title}</div>
              <div className="terminal-line text-foreground/85">{e.summary}</div>
              <div className="flex flex-wrap gap-1 mt-2">{e.tags.map((t) => <span key={t} className="label-box text-nerv-orange">{t}</span>)}</div>
              <div className="mt-2 border-t border-nerv-orange/20 pt-1 text-[9px] font-mono tracking-widest text-foreground/50 flex justify-between">
                <span>WORDS: {(800+i*340)}</span><span>CITATIONS: {12+i*3}</span><span>STATUS: ARCHIVED</span>
              </div>
            </TerminalPanel>
          ))}
        </div>

        <aside className="col-span-12 lg:col-span-3 space-y-1.5">
          <TerminalPanel file="DIV-E/INDEX" title="THESIS INDEX" variant="white" status="INDEXED">
            <ul className="terminal-line text-foreground/85">
              <li><span className="text-nerv-orange">§1</span> PRELIMINARY</li>
              <li><span className="text-nerv-orange">§2</span> EQUILIBRIA AS UI</li>
              <li><span className="text-nerv-orange">§3</span> MECHANISM DESIGN</li>
              <li><span className="text-nerv-orange">§4</span> ATTENTION ECON</li>
              <li><span className="text-nerv-orange">§5</span> SYSTEMS THINKING</li>
              <li><span className="text-nerv-orange">§6</span> GAME-THEORETIC LIMIT</li>
              <li><span className="text-nerv-orange">§7</span> CONCLUSION</li>
            </ul>
          </TerminalPanel>
          <TerminalPanel file="LINK-X" title="HIDDEN ROUTE" variant="red" status="RESTRICTED" statusColor="text-nerv-red">
            <div className="terminal-line text-nerv-red">
              &gt; HUMAN INSTRUMENTALITY PROJECT<br/>
              &gt; LONG-FORM THESIS<br/>
              &gt; OPEN VIA TERMINAL (~):<br/>
              <span className="text-nerv-green">$ thirdimpact</span><br/>
              <span className="text-nerv-green">$ instrumentality</span>
            </div>
          </TerminalPanel>
          <TerminalPanel file="REF-UI" title="EVA HUD QUAD" variant="white" status="ARCHIVED">
            <img src={NERV_MEDIA.fourPanelHud} alt="EVA hud reference" loading="lazy" className="w-full border border-foreground/30" />
          </TerminalPanel>
        </aside>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-04 // PROCEED TO FILE-05 // NERV RECORDS" /></div>
    </section>
  );
}

export function AchievementsSection({ unlocked }) {
  return (
    <section id="achievements" className="px-3 md:px-4 py-8" data-testid="achievements-section">
      <SectionHeader file="FILE-05/RECORDS" title="NERV RECORDS" sub={`PUBLIC: ${ACHIEVEMENTS.length} // HIDDEN: ${unlocked.length}/8`} code="ARC" status="VERIFIED" />

      <div className="grid grid-cols-12 gap-1.5">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.code} className="border border-nerv-orange/50 bg-background/40 flex items-stretch">
              <div className="hazard-stripe w-3" />
              <div className="flex-1 p-2 grid grid-cols-12 gap-1 items-center">
                <div className="col-span-2 text-center">
                  <div className="font-stamp text-nerv-orange text-glow-orange text-2xl tracking-widest">{String(i+1).padStart(2,"0")}</div>
                  <div className="text-[8px] font-mono text-foreground/50 tracking-widest">{a.code}</div>
                </div>
                <div className="col-span-7">
                  <div className="text-xs font-mono tracking-widest text-foreground">{a.title}</div>
                  <div className="text-[9px] font-mono tracking-widest text-nerv-orange mt-0.5">▸ VERIFIED BY MAGI/CASPER</div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-[9px] font-mono text-foreground/50 tracking-widest">{a.year}</div>
                  <div className="text-[9px] font-mono text-nerv-green tracking-widest">● UNLOCKED</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-4">
          <TerminalPanel file="HIDDEN" title="SECRET PROGRESS" variant="green" status={`${unlocked.length}/8`} statusColor="text-nerv-green" meta={[{ k: "STORE", v: "LOCAL" }, { k: "SIGNATURE", v: "MAGI-3" }]}>
            <div className="grid grid-cols-1 gap-1 text-[10px] font-mono">
              {["KONAMI_UNLOCK","THIRD_IMPACT","TERMINAL_OPENED","MAGI_LOGIN","INSTRUMENTALITY","DOG_PAGE","ANGEL_SIGHTED","SECRET_EVA"].map((id, i) => {
                const on = unlocked.includes(id);
                return (
                  <div key={id} className={`grid grid-cols-12 gap-1 items-center border ${on ? "border-nerv-green/60 bg-nerv-green/10" : "border-foreground/20"} px-2 py-1`}>
                    <span className={`col-span-1 ${on ? "text-nerv-green" : "text-foreground/30"}`}>{on ? "✔" : "○"}</span>
                    <span className="col-span-2 text-[9px] text-foreground/50">SEC-{String(i+1).padStart(2,"0")}</span>
                    <span className={`col-span-9 tracking-widest ${on ? "text-nerv-green" : "text-foreground/40"}`}>{id}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 hazard-stripe h-1.5" />
          </TerminalPanel>
        </div>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-05 // PROCEED TO FILE-06 // ART ARCHIVE" /></div>
    </section>
  );
}

export function StatusSection() {
  return (
    <section id="status" className="px-3 md:px-4 py-8" data-testid="status-section">
      <SectionHeader file="FILE-07/STATUS" title="CURRENT OPS" sub="REAL-TIME PILOT TELEMETRY // TICK 1Hz" code="LIVE" status="STREAMING" statusColor="text-nerv-red" />
      <div className="grid grid-cols-12 gap-1.5">
        {CURRENT_STATUS.map((s, i) => (
          <TerminalPanel
            key={s.label}
            file={`OPS-${String(i+1).padStart(3,"0")}`}
            title={s.label}
            variant={i % 3 === 0 ? "green" : i % 3 === 1 ? "orange" : "red"}
            status="LIVE"
            statusColor="text-nerv-green"
            className="col-span-12 md:col-span-6 lg:col-span-4"
            meta={[{ k: "PROGRESS", v: `${50 + i*8}%` }, { k: "ETA", v: "Q1-26" }]}
          >
            <div className="font-mono text-sm md:text-base text-foreground/95 tracking-widest">&gt; {s.value}</div>
            <div className="mt-2 grid grid-cols-12 gap-0.5">
              {Array.from({ length: 24 }).map((_, k) => (
                <span key={k} className={`h-1.5 ${k < (8+i*3) ? "bg-nerv-orange" : "bg-nerv-orange/10"}`} />
              ))}
            </div>
          </TerminalPanel>
        ))}
      </div>
      <div className="mt-2"><HazardBar label="END OF FILE-07 // PROCEED TO FILE-08 // CONTACT TERMINAL" /></div>
    </section>
  );
}
