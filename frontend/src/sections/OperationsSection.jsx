import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PROJECTS, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";

const OPS_ASCII = `╔══════════════════════════════════════════════════════════════════════════╗
║  ▶ MAGI OPERATIONS DATABASE  ::  QUERY MODE                              ║
║   magi> SELECT * FROM ops WHERE pilot='P-01' ORDER BY ts DESC;            ║
║   ${"06 rows".padEnd(12)} ${"index OK".padEnd(12)} ${"latency 12ms".padEnd(16)} ${"engine: balthasar"}     ║
╚══════════════════════════════════════════════════════════════════════════╝`;

export default function OperationsSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <TerminalScreen
      id="operations"
      testid="operations-section"
      variant="magi"
      prompt={{ user: "pilot-01", host: "magi-balthasar", path: "/var/ops", cmd: "magi-query --pilot=P-01 --status=all" }}
      bootLines={[
        "<span class='ok'>[OK]</span> attached: BALTHASAR-2 (primary)",
        "<span class='ok'>[OK]</span> rows fetched: " + PROJECTS.length + " / cached: " + PROJECTS.length,
        "<span class='ok'>[OK]</span> sort ▸ ts DESC",
      ]}
      ascii={OPS_ASCII}
      titleJp="作戦記録"
      meta={[
        { k: "ROWS", v: PROJECTS.length.toString().padStart(2,"0"), c: "text-nerv-cyan" },
        { k: "ACTIVE", v: "06", c: "text-nerv-green" },
        { k: "SHIPPED", v: "14" },
        { k: "STARS",  v: "347", c: "text-nerv-orange" },
        { k: "INDEX",  v: "ts,classification,id" },
        { k: "ENGINE", v: "BALTHASAR/SQL" },
        { k: "CACHE",  v: "WARM" },
        { k: "TTL",    v: "00:14:22" },
      ]}
    >
      <CmdRunHeader cmd="ls -l ./operations/ | grep -v ARCHIVED" />

      {/* Table header */}
      <div className="border border-nerv-cyan/40">
        <div className="row-rec text-[10px] text-nerv-cyan tracking-widest bg-nerv-cyan/5"
             style={{ gridTemplateColumns: "70px 80px 1fr 170px 110px 90px 70px" }}>
          <span>OP-ID</span>
          <span>VIS</span>
          <span>DESIGNATION / BRIEF</span>
          <span>STACK</span>
          <span>CLASS</span>
          <span>REG</span>
          <span>STATE</span>
        </div>

        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            data-testid={`operation-${p.id}`}
            data-cursor="hover"
            className="row-rec w-full text-left group hover:bg-nerv-cyan/10"
            style={{ gridTemplateColumns: "70px 80px 1fr 170px 110px 90px 70px" }}
          >
            <span className="text-nerv-cyan">{p.id}</span>
            <span className="self-center">
              <img src={p.image} alt="" loading="lazy" className="w-16 h-10 object-cover border border-nerv-cyan/30" />
            </span>
            <span>
              <span className="text-foreground tracking-widest font-stamp">{p.name}</span>
              <br/>
              <span className="dim">└─ {p.summary}</span>
            </span>
            <span className="text-foreground/80 text-[10px]">{p.tech.join(" · ")}</span>
            <span className="text-nerv-red text-[10px] tracking-widest">{p.classification}</span>
            <span className="text-foreground/70 text-[10px]">2024-Q{(i%4)+1}</span>
            <span className="text-nerv-green text-[10px]">● LIVE</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-2 mt-3">
        <div className="col-span-12 md:col-span-6">
          <CmdRunHeader cmd="magi-stats --by=year" />
          <pre className="ascii-box text-foreground/80 leading-snug">{`YEAR    OPS    SHIPPED   STARS    LOC
────    ───    ───────   ─────    ──────
2022    01     01        04       1,240
2023    02     02        38       3,802
2024    04     03        97       7,540
2025    03     02        198      4,103
2026    02     00        10       1,580
────    ───    ───────   ─────    ──────
TOTAL   12     08        347      18,265`}</pre>
        </div>
        <div className="col-span-12 md:col-span-6 space-y-2">
          <CmdRunHeader cmd="tail -f ./logs/ci.log" out={["<span class='ok'>[OK]</span> following 4 streams"]} />
          <div className="prompt line-numbers">
            {[
              "<span class='ok'>BUILD</span> magi-econ ▸ pass (1m04s) tests 412/412",
              "<span class='ok'>BUILD</span> at-field   ▸ pass (38s) tests 91/91",
              "<span class='warn'>BUILD</span> dossier   ▸ flaky (2 retries) ▸ pass",
              "<span class='ok'>BUILD</span> geofront  ▸ pass (2m12s)",
              "<span class='err'>DEPLOY</span> shinji   ▸ rollback (oom kill) ▸ recovered",
              "<span class='ok'>DEPLOY</span> eva-latex ▸ live ▸ 80 active installs",
            ].map((l, i) => (
              <React.Fragment key={i}>
                <span className="ln">{String(i+1).padStart(3, "0")}</span>
                <span dangerouslySetInnerHTML={{ __html: l }} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Reference frame */}
      <div className="grid grid-cols-12 gap-2 mt-3">
        <div className="col-span-12 md:col-span-6 border border-nerv-cyan/40">
          <div className="term-header" style={{ borderBottomColor: "rgba(32,240,255,0.4)"}}>
            <span className="text-nerv-cyan">REF-UI/A :: FUI-RECOVERED</span>
            <span className="ml-auto opacity-60">archived 2015.06</span>
          </div>
          <img src={NERV_MEDIA.fui1} alt="EVA FUI 1" loading="lazy" className="w-full" />
        </div>
        <div className="col-span-12 md:col-span-6 border border-nerv-cyan/40">
          <div className="term-header" style={{ borderBottomColor: "rgba(32,240,255,0.4)"}}>
            <span className="text-nerv-cyan">REF-UI/B :: FUI-RECOVERED</span>
            <span className="ml-auto opacity-60">archived 2015.06</span>
          </div>
          <img src={NERV_MEDIA.fui2} alt="EVA FUI 2" loading="lazy" className="w-full" />
        </div>
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-cyan tracking-widest">// magi&gt; QUERY OK ── 6 ROWS IN SET (0.012s) ── cached at 11:04:55Z</div>

      {active && createPortal(
        <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm p-3 overflow-y-auto" style={{ isolation: "isolate" }} onClick={() => setActive(null)} data-testid="operation-modal" role="dialog" aria-modal="true">
          <div className="max-w-4xl mx-auto term-section nerv mt-8" onClick={(e) => e.stopPropagation()}>
            <div className="term-header">
              <span className="text-nerv-orange">● MISSION FILE :: {active.id} :: {active.classification}</span>
              <button onClick={() => setActive(null)} data-testid="close-modal" autoFocus className="ml-auto text-nerv-red hover:bg-nerv-red hover:text-background px-2">[X] CLOSE</button>
            </div>
            <div className="p-3 prompt">
              <CmdRunHeader cmd={`magi-query --get ${active.id}`} />
              <div className="display-stretch text-3xl md:text-4xl text-nerv-orange text-glow-orange">{active.name}</div>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <img src={active.image} alt="" className="w-full border border-nerv-orange/40" />
                <div>
                  <div className="text-[10px] text-nerv-orange tracking-widest">// BRIEF</div>
                  <p className="text-foreground/90">{active.detail}</p>
                  <div className="text-[10px] text-nerv-orange tracking-widest mt-2">// STACK</div>
                  <div className="flex flex-wrap gap-1 mt-1">{active.tech.map((t) => <span key={t} className="pill text-nerv-orange">{t}</span>)}</div>
                  <div className="flex gap-2 mt-3">
                    <a href={active.github} target="_blank" rel="noreferrer" className="pill text-foreground hover:bg-foreground hover:text-background">[G] GITHUB ↗</a>
                    <a href={active.demo} target="_blank" rel="noreferrer" className="pill text-nerv-orange hover:bg-nerv-orange hover:text-background">[L] LIVE DEMO ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </TerminalScreen>
  );
}
