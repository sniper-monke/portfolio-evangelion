import React from "react";
import { PERSONNEL_FILE, PILOT } from "../data/portfolio";

const SectionHeader = ({ id, code, title, sub }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
    <div>
      <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">{code}</div>
      <h2 className="display-stretch text-4xl md:text-6xl text-foreground">{title}</h2>
    </div>
    <div className="text-[10px] tracking-widest text-foreground/60 font-mono">{sub}</div>
  </div>
);

export default function PersonnelSection() {
  return (
    <section id="personnel" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="personnel-section">
      <SectionHeader code="FILE 01 // ACCESS LEVEL: A-1" title="PERSONNEL FILE" sub="CLASSIFIED DOSSIER // OPENED BY OVERRIDE" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <div className="lg:col-span-4 border-2 border-nerv-orange/50 p-4 bg-background/40 relative">
          <div className="hazard-stripe absolute top-0 left-0 right-0 h-2" />
          <div className="text-[10px] tracking-widest text-nerv-orange mt-3">DESIGNATION</div>
          <div className="text-2xl text-foreground font-display tracking-tight">{PILOT.designation}</div>
          <div className="mt-3 text-[10px] tracking-widest text-nerv-orange">CODENAME</div>
          <div className="text-xl font-display">{PILOT.codename}</div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono">
            <div className="text-foreground/60">BLOOD TYPE</div><div>{PILOT.bloodType}</div>
            <div className="text-foreground/60">BIRTH RECORD</div><div className="text-nerv-red">{PILOT.birthRecord}</div>
            <div className="text-foreground/60">SYNC RATIO</div><div className="text-nerv-orange">{PILOT.syncRatio}%</div>
            <div className="text-foreground/60">LOCATION</div><div>{PILOT.location}</div>
          </div>
          <div className="mt-4 border-t border-nerv-orange/30 pt-3 text-[10px] tracking-widest text-foreground/60">
            FILE STAMP // <span className="text-nerv-red font-stamp">EYES ONLY</span>
          </div>
        </div>

        <div className="lg:col-span-8 border-2 border-foreground/30 p-4 md:p-6 bg-background/40">
          <div className="text-[10px] tracking-widest text-nerv-orange mb-2">BIOGRAPHY</div>
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{PERSONNEL_FILE.biography}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-2">EDUCATION RECORD</div>
              <div className="space-y-2">
                {PERSONNEL_FILE.education.map((e, i) => (
                  <div key={i} className="border border-foreground/20 p-2">
                    <div className="text-xs text-foreground font-mono">{e.institution}</div>
                    <div className="text-[10px] text-nerv-orange tracking-widest">{e.role} // {e.years}</div>
                    <div className="text-[11px] text-foreground/70 mt-1">{e.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-2">INTERESTS</div>
              <div className="flex flex-wrap gap-1 mb-4">
                {PERSONNEL_FILE.interests.map((t) => (
                  <span key={t} className="border border-nerv-orange/50 text-nerv-orange px-2 py-0.5 text-[10px] tracking-widest">{t}</span>
                ))}
              </div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-2">HOBBIES</div>
              <div className="flex flex-wrap gap-1 mb-4">
                {PERSONNEL_FILE.hobbies.map((t) => (
                  <span key={t} className="border border-foreground/30 text-foreground/80 px-2 py-0.5 text-[10px] tracking-widest">{t}</span>
                ))}
              </div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-2">PERSONALITY</div>
              <div className="flex flex-wrap gap-1">
                {PERSONNEL_FILE.personality.map((t) => (
                  <span key={t} className="border border-nerv-green/50 text-nerv-green px-2 py-0.5 text-[10px] tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-foreground/20 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-1">ASPIRATIONS</div>
              <p className="text-sm text-foreground/90">{PERSONNEL_FILE.aspirations}</p>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-nerv-orange mb-1">FAVORITE MEDIA</div>
              <ul className="text-sm font-mono text-foreground/80 space-y-0.5">
                {PERSONNEL_FILE.favoriteMedia.map((m) => <li key={m}>› {m}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[10px] tracking-widest text-nerv-orange mb-1">FUN FACTS // FIELD NOTES</div>
            <ul className="text-sm font-mono text-foreground/80 space-y-0.5">
              {PERSONNEL_FILE.funFacts.map((m) => <li key={m}>// {m}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
