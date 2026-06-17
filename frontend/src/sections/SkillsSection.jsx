import React, { useEffect, useRef, useState } from "react";
import { SKILLS } from "../data/portfolio";

function SegBar({ value }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setV(value);
      });
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const filled = Math.round((v / 100) * 20);
  return (
    <div ref={ref} className="seg-bar">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className={i < filled ? "on" : ""} />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="skills-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 03 // SYNCHRONIZATION REPORT</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">SKILLS MATRIX</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">SYNC RATIO TELEMETRY</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group} className="border-2 border-nerv-orange/40 p-4 bg-background/40">
            <div className="flex items-center justify-between border-b border-nerv-orange/40 pb-2 mb-3">
              <div className="text-xs tracking-widest text-nerv-orange text-glow-orange">// {group}</div>
              <div className="text-[10px] font-mono text-foreground/60">{items.length} RECORDS</div>
            </div>
            <div className="space-y-3">
              {items.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-foreground/90 tracking-widest">{s.name}</span>
                    <span className="text-nerv-orange">{s.value.toString().padStart(2, "0")}%</span>
                  </div>
                  <SegBar value={s.value} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
