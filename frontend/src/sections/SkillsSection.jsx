import React, { useEffect, useRef, useState } from "react";
import { SKILLS, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";
import { HarmonicsGraph } from "../components/MagiDisplays";

function SegBar({ value }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver((e) => e.forEach((x) => x.isIntersecting && setV(value)), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const filled = Math.round((v / 100) * 24);
  return (
    <div ref={ref} className="flex gap-px">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className={`h-3 flex-1 ${i < filled ? (value > 80 ? "bg-nerv-green" : value > 60 ? "bg-nerv-orange" : "bg-nerv-yellow") : "bg-foreground/10"}`} />
      ))}
    </div>
  );
}

function threshold(v) {
  if (v >= 80) return { l: "NOMINAL", c: "text-nerv-green" };
  if (v >= 60) return { l: "CAUTION", c: "text-nerv-yellow" };
  return { l: "CRITICAL", c: "text-nerv-red" };
}

const SYNC_ASCII = `┌──────────────────────────────────────────────────────────────────────────┐
│  ▶ SYNCHRONIZATION DIAGNOSTICS  ::  EVANGELION HARMONICS / CHANNEL A      │
│   TEST PLUG 01  |  TEST NO. 132  |  L.C.L PURITY 99.0999%                  │
│   PATTERN: GREEN  |  PILOT: P-01  |  STATUS: WITHIN PARAMETERS             │
└──────────────────────────────────────────────────────────────────────────┘`;

export default function SkillsSection() {
  const allItems = Object.entries(SKILLS);
  return (
    <TerminalScreen
      id="skills"
      testid="skills-section"
      variant="sync"
      prompt={{ user: "pilot-01", host: "magi-diagnostic", path: "/eva/harmonics", cmd: "diag --pilot=P-01 --plug=01 --verbose" }}
      bootLines={[
        "<span class='ok'>[OK]</span> entry plug seal ▸ locked",
        "<span class='ok'>[OK]</span> L.C.L charging ▸ 99.09% / 100%",
        "<span class='ok'>[OK]</span> A10 nerve link ▸ established",
        "<span class='warn'>[!!]</span> butterfly effect detected at +0.4σ ▸ corrected",
      ]}
      ascii={SYNC_ASCII}
      titleJp="同期率測定"
      meta={[
        { k: "TEST",   v: "NO. 132" },
        { k: "PLUG",   v: "01" },
        { k: "L.C.L",  v: "99.09%", c: "text-nerv-cyan" },
        { k: "SYNC",   v: "87.2%", c: "text-nerv-orange" },
        { k: "PATTERN",v: "GREEN", c: "text-nerv-green" },
        { k: "BPS",    v: "8.4M/s" },
        { k: "DEV",    v: "±0.2σ" },
        { k: "RESULT", v: "PASS", c: "text-nerv-green" },
      ]}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <CmdRunHeader cmd="render harmonics --window=64" />
          <HarmonicsGraph value={87} subject="PILOT-01" />
          <div className="mt-2 border border-nerv-green/40">
            <div className="term-header" style={{ borderBottomColor: "rgba(80,255,80,0.5)" }}>
              <span className="text-nerv-green">REF/HARMONICS :: orig.frame</span>
            </div>
            <img src={NERV_MEDIA.harmonicsGraph} alt="" loading="lazy" className="w-full" />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-3">
          {allItems.map(([group, items], gi) => (
            <div key={group}>
              <CmdRunHeader cmd={`diag --channel=${String.fromCharCode(65+gi)} --group=${group.toLowerCase()}`} out={[`<span class='ok'>[OK]</span> ${items.length} probes attached`]} />
              <div className="table-scroll border border-nerv-green/30">
                <div className="row-rec text-[10px] text-nerv-green tracking-widest bg-nerv-green/5 min-w-[590px]"
                     style={{ gridTemplateColumns: "70px 1fr 1fr 80px 110px" }}>
                  <span>PROBE</span><span>NAME</span><span>WAVEFORM</span><span>SYNC%</span><span>STATE</span>
                </div>
                {items.map((s, i) => {
                  const th = threshold(s.value);
                  return (
                    <div key={s.name} className="row-rec min-w-[590px]"
                         style={{ gridTemplateColumns: "70px 1fr 1fr 80px 110px" }}>
                      <span className="text-nerv-orange">SK-{String(i+1).padStart(2, "0")}</span>
                      <span className="text-foreground tracking-widest">{s.name}</span>
                      <span className="self-center min-w-[180px]"><SegBar value={s.value} /></span>
                      <span className="text-nerv-orange tracking-widest">{s.value.toFixed(1)}%</span>
                      <span className={th.c + " tracking-widest"}>● {th.l}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-green tracking-widest">// diagnostic ended ── elapsed 00:00:12.408 ── pattern: GREEN ── result: PASS</div>
    </TerminalScreen>
  );
}
