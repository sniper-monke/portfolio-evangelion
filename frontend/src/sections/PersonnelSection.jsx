import React from "react";
import { PERSONNEL_FILE, PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { SectionHeader, HazardBar } from "../components/TerminalPanel";
import { ToxicityBars } from "../components/MagiDisplays";

export default function PersonnelSection() {
  return (
    <section id="personnel" className="px-3 md:px-4 py-8" data-testid="personnel-section">
      <SectionHeader file="FILE-01/PERSONNEL" title="PERSONNEL FILE" sub="DOSSIER OPENED VIA OVERRIDE // EYES ONLY" code="OPEN" status="CLASSIFIED" />

      <div className="grid grid-cols-12 gap-1.5">
        {/* ID card */}
        <div className="col-span-12 lg:col-span-3 space-y-1.5">
          <TerminalPanel file="ID-CARD" title="SUBJECT IDENTIFIER" status="LOCKED" statusColor="text-nerv-red" meta={[{ k: "ID", v: "P-01" }, { k: "REG", v: "TYO-3" }]}>
            <div className="border border-nerv-orange/40 bg-black aspect-[3/4] p-2 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
              <div className="relative flex items-start justify-between text-[9px] font-mono tracking-widest text-nerv-orange">
                <div>NERV/ID/2025-07-{Math.floor(Math.random()*900+100)}</div>
                <div className="hex-cell bg-nerv-orange/30 w-5 h-5" />
              </div>
              <div className="relative flex-1 flex items-center justify-center my-2">
                <img src={NERV_MEDIA.nervLogo} alt="" className="opacity-30 max-h-32" />
              </div>
              <div className="relative">
                <div className="text-[8px] font-mono text-foreground/60 tracking-widest">SUBJECT NAME</div>
                <div className="font-stamp text-nerv-orange text-lg tracking-widest">{PILOT.codename}</div>
                <div className="text-[8px] font-mono text-foreground/70">DESIG ▸ {PILOT.designation} // SYNC ▸ {PILOT.syncRatio}%</div>
                <div className="hazard-stripe h-1.5 mt-2" />
                <div className="text-[8px] font-stamp text-nerv-red mt-1 tracking-[0.3em]">★ EYES ONLY ★</div>
              </div>
            </div>
          </TerminalPanel>

          <TerminalPanel file="BIOMETRIC" title="VITAL SIGNS" variant="red" status="MONITORING" statusColor="text-nerv-red">
            <ToxicityBars items={[
              { v: 18, label: "FIRST C" },
              { v: 22, label: "THIRD C" },
              { v: 14, label: "SECOND C" },
            ]} />
          </TerminalPanel>
        </div>

        {/* Biographical record */}
        <div className="col-span-12 lg:col-span-6 space-y-1.5">
          <TerminalPanel file="BIO-001" title="BIOGRAPHICAL RECORD" status="VERIFIED" meta={[{ k: "AUTHOR", v: "DR. K. SOREN" }, { k: "REV", v: "v3.2" }]}>
            <div className="terminal-line text-foreground/90 whitespace-pre-wrap">
              <span className="text-nerv-orange">[ENTRY 001]</span> {PERSONNEL_FILE.biography}
            </div>
          </TerminalPanel>

          <TerminalPanel file="EDU-002" title="EDUCATION RECORD" status="ACTIVE" meta={[{ k: "ENTRIES", v: PERSONNEL_FILE.education.length.toString() }]}>
            <div className="space-y-1">
              {PERSONNEL_FILE.education.map((e, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 border border-nerv-orange/20 px-2 py-1">
                  <div className="col-span-1 text-[10px] font-mono text-nerv-orange tracking-widest">EDU-{(i+1).toString().padStart(3,"0")}</div>
                  <div className="col-span-7">
                    <div className="text-xs font-mono text-foreground tracking-widest">{e.institution}</div>
                    <div className="text-[10px] font-mono text-foreground/70 mt-0.5">{e.note}</div>
                  </div>
                  <div className="col-span-4 text-right">
                    <div className="text-[10px] font-mono text-nerv-orange tracking-widest">{e.role}</div>
                    <div className="text-[10px] font-mono text-foreground/50">{e.years}</div>
                  </div>
                </div>
              ))}
            </div>
          </TerminalPanel>

          <div className="grid grid-cols-2 gap-1.5">
            <TerminalPanel file="ASP-003" title="ASPIRATIONS" status="LOGGED">
              <div className="terminal-line text-foreground/85">{PERSONNEL_FILE.aspirations}</div>
            </TerminalPanel>
            <TerminalPanel file="FUN-004" title="FIELD NOTES" status="UNVERIFIED" statusColor="text-nerv-yellow">
              <ul className="terminal-line text-foreground/80 space-y-0.5">
                {PERSONNEL_FILE.funFacts.map((f, i) => <li key={i}><span className="text-nerv-orange">[FN-{String(i+1).padStart(2,"0")}]</span> {f}</li>)}
              </ul>
            </TerminalPanel>
          </div>
        </div>

        {/* Tags & traits */}
        <div className="col-span-12 lg:col-span-3 space-y-1.5">
          <TerminalPanel file="TAG-001" title="INTERESTS" variant="green" status="ANALYZED" statusColor="text-nerv-green">
            <div className="flex flex-wrap gap-1">
              {PERSONNEL_FILE.interests.map((t) => <span key={t} className="label-box text-nerv-green">{t}</span>)}
            </div>
          </TerminalPanel>
          <TerminalPanel file="TAG-002" title="HOBBIES" status="LOGGED">
            <div className="flex flex-wrap gap-1">
              {PERSONNEL_FILE.hobbies.map((t) => <span key={t} className="label-box text-foreground/80">{t}</span>)}
            </div>
          </TerminalPanel>
          <TerminalPanel file="TAG-003" title="PERSONALITY" variant="red" status="PROFILED" statusColor="text-nerv-red">
            <div className="flex flex-wrap gap-1">
              {PERSONNEL_FILE.personality.map((t) => <span key={t} className="label-box text-nerv-red">{t}</span>)}
            </div>
          </TerminalPanel>
          <TerminalPanel file="MEDIA-005" title="FAVORITE MEDIA" status="ARCHIVED">
            <ul className="terminal-line text-foreground/85">
              {PERSONNEL_FILE.favoriteMedia.map((m, i) => <li key={i}><span className="text-nerv-orange">{String(i+1).padStart(2,"0")}.</span> {m}</li>)}
            </ul>
          </TerminalPanel>
        </div>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-01 // PROCEED TO FILE-02 // OPERATIONS LOG" /></div>
    </section>
  );
}
