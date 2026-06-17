import React, { useEffect, useRef, useState } from "react";
import { SKILLS, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { SectionHeader, HazardBar } from "../components/TerminalPanel";
import { HarmonicsGraph } from "../components/MagiDisplays";

function SegBar({ value }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setV(value)), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const filled = Math.round((v / 100) * 20);
  return (
    <div ref={ref} className="seg-bar">
      {Array.from({ length: 20 }).map((_, i) => <span key={i} className={i < filled ? "on" : ""} />)}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="px-3 md:px-4 py-8" data-testid="skills-section">
      <SectionHeader file="FILE-03/SYNC" title="SYNCHRONIZATION RATIOS" sub="EVANGELION HARMONICS // CHANNEL A // TEST 132" code="REC" status="GREEN" />

      <div className="grid grid-cols-12 gap-1.5">
        <div className="col-span-12 lg:col-span-4 space-y-1.5">
          <TerminalPanel file="HARM-A" title="HARMONICS WAVEFORM" variant="green" status="PATTERN GREEN" statusColor="text-nerv-green" meta={[{ k: "PLUG", v: "01" }, { k: "DEV", v: "±0.2" }]}>
            <HarmonicsGraph value={87} subject="PILOT-01" />
          </TerminalPanel>
          <TerminalPanel file="REF-UI" title="ORIGINAL UI" variant="white" status="REFERENCE">
            <img src={NERV_MEDIA.harmonicsGraph} alt="EVA harmonics original" loading="lazy" className="w-full border border-foreground/30" />
            <div className="text-[9px] font-mono tracking-widest text-foreground/60 mt-1">FRM-014 // ARCHIVED 2015.06</div>
          </TerminalPanel>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {Object.entries(SKILLS).map(([group, items], gi) => (
            <TerminalPanel
              key={group}
              file={`SKL-${String(gi+1).padStart(2,"0")}`}
              title={group}
              status="MEASURED"
              statusColor={gi % 2 ? "text-nerv-green" : "text-nerv-orange"}
              meta={[{ k: "N", v: items.length.toString() }, { k: "CH", v: String.fromCharCode(65+gi) }]}
            >
              <div className="space-y-1.5">
                {items.map((s, i) => (
                  <div key={s.name} className="grid grid-cols-12 gap-1 items-center">
                    <span className="col-span-2 text-[9px] font-mono text-nerv-orange/80 tracking-widest">SK-{String(i+1).padStart(2,"0")}</span>
                    <span className="col-span-5 text-[10px] font-mono tracking-widest text-foreground/90">{s.name}</span>
                    <div className="col-span-4"><SegBar value={s.value} /></div>
                    <span className="col-span-1 text-right text-[10px] font-mono text-nerv-orange">{s.value}</span>
                  </div>
                ))}
              </div>
            </TerminalPanel>
          ))}
        </div>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-03 // PROCEED TO FILE-04 // DIVISION-E" /></div>
    </section>
  );
}
