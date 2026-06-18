import React from "react";
import { ECONOMICS_ESSAYS, ACHIEVEMENTS, CURRENT_STATUS, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";

const SEELE_ASCII = `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓  ▶ SEELE ANALYSIS TERMINAL  ::  COMMITTEE CONVENED  ::  SOUND ONLY      ▓
▓  ▒ 01 ▒ 02 ▒ 03 ▒ 04 ▒ 05 ▒ 06 ▒ 07 ▒ 08 ▒ 09 ▒ 10 ▒ 11 ▒ 12 ▒          ▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`;

export function EconomicsSection() {
  return (
    <TerminalScreen
      id="economics"
      testid="economics-section"
      variant="seele"
      prompt={{ user: "committee-12", host: "seele-root", path: "/division/E/papers", cmd: "review --author=P-01 --field=econ --depth=full" }}
      bootLines={[
        "<span class='err'>[?]</span> COMMITTEE OF 12 ▸ CONVENED",
        "<span class='ok'>[OK]</span> 04 papers / 02 essays / 01 competition",
        "<span class='warn'>[!!]</span> motion pending ▸ ratify thesis on instrumentality",
      ]}
      ascii={SEELE_ASCII}
      titleJp="経済分析部"
      meta={[
        { k: "DIV",  v: "E (ECON)" },
        { k: "PAPERS", v: ECONOMICS_ESSAYS.length.toString().padStart(2,"0"), c: "text-nerv-red" },
        { k: "AUTHOR", v: "P-01" },
        { k: "CLEAR", v: "B-2" },
        { k: "REV", v: "ROLLING" },
        { k: "VERDICT", v: "DELIBERATING", c: "text-nerv-yellow" },
        { k: "REJECTED", v: "0" },
        { k: "ACCEPT-RATE", v: "100%", c: "text-nerv-green" },
      ]}
    >
      <CmdRunHeader cmd="ls -lh ./papers/ | sort -k 4" out={["<span class='ok'>[OK]</span> sorted by date desc"]} />

      <div className="table-scroll border border-nerv-red/40">
        <div className="row-rec text-[10px] text-nerv-red tracking-widest bg-nerv-red/5 min-w-[670px]"
             style={{ gridTemplateColumns: "80px 1fr 1fr 130px 90px 80px" }}>
          <span>REF</span><span>TITLE</span><span>BRIEF</span><span>TAGS</span><span>CITES</span><span>STATE</span>
        </div>
        {ECONOMICS_ESSAYS.map((e, i) => (
          <div key={e.title} className="row-rec min-w-[670px]"
               style={{ gridTemplateColumns: "80px 1fr 1fr 130px 90px 80px" }}>
            <span className="text-nerv-red">0x{(0x4A+i).toString(16).toUpperCase()}</span>
            <span>
              <span className="text-foreground tracking-widest font-stamp">{e.title}</span><br/>
              <span className="dim text-[10px]">└─ {e.period}</span>
            </span>
            <span className="text-foreground/85">{e.summary}</span>
            <span>{e.tags.map((t) => <span key={t} className="pill text-nerv-red mr-1 mb-0.5">{t}</span>)}</span>
            <span className="text-nerv-orange">{12 + i*3}</span>
            <span className="text-nerv-green">● PUB</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-2 mt-3">
        <div className="col-span-12 md:col-span-7">
          <CmdRunHeader cmd="cat ./thesis/instrumentality.tex | head -30" />
          <pre className="ascii-box text-foreground/80 leading-snug">{`%% HUMAN INSTRUMENTALITY PROJECT — WORKING PAPER
%% AUTHOR  : P-01 (Aarav Krishna)
%% REVIEWED: 02 / 12 monoliths
%% STATUS  : DELIBERATING

§1 PRELIMINARY ........................ DRAFT
§2 EQUILIBRIA AS UI ................... DRAFT
§3 MECHANISM DESIGN ................... REV.2
§4 ATTENTION ECONOMY .................. DRAFT
§5 SYSTEMS THINKING ................... REV.1
§6 GAME-THEORETIC LIMITS .............. DRAFT
§7 CONCLUSION ......................... PENDING

>> 'A pilot reaching for the world is no
   different from a market reaching for
   equilibrium. Both are best when partial,
   plural, and personal.'                — P-01`}</pre>
          <div className="mt-2 text-[10px] text-nerv-yellow tracking-widest">// ACCESS FULL THESIS ▸ press <span className="kbd-key">~</span> then type <span className="kbd-key">instrumentality</span></div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <CmdRunHeader cmd="render seele/monoliths.ascii" />
          <pre className="ascii-box text-nerv-red leading-snug">{`     ▌   ▌   ▌   ▌   ▌
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
    01   02   03   04   05
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
   ▐██▌ ▐██▌ ▐██▌ ▐██▌ ▐██▌
    06   07   08   09   10

           ▐██▌ ▐██▌
           ▐██▌ ▐██▌
           ▐██▌ ▐██▌
            11   12
   ───── SOUND ONLY ─────`}</pre>
          <div className="mt-2 border border-nerv-red/40 p-2 text-[10px]">
            <div className="text-nerv-red tracking-widest">// VOTE TALLY</div>
            <div className="grid grid-cols-3 gap-1 mt-1">
              <div><span className="dim">AYE</span>  <span className="text-nerv-green">08</span></div>
              <div><span className="dim">NAY</span>  <span className="text-nerv-red">02</span></div>
              <div><span className="dim">ABS</span>  <span className="text-foreground/70">02</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-red tracking-widest">// committee adjourned ── motion tabled ── reconvene 2026-Q3</div>
    </TerminalScreen>
  );
}

export function AchievementsSection({ unlocked }) {
  return (
    <TerminalScreen
      id="achievements"
      testid="achievements-section"
      variant="nerv"
      prompt={{ user: "pilot-01", host: "nerv-os", path: "/var/log/audit", cmd: "tail -f records.log | grep -E 'AWARD|UNLOCK'" }}
      bootLines={[
        "<span class='ok'>[OK]</span> attached to audit stream ▸ live",
        "<span class='ok'>[OK]</span> verifying signatures against MAGI/CASPER ▸ ok",
      ]}
      titleJp="勲章記録"
      meta={[
        { k: "PUBLIC",  v: ACHIEVEMENTS.length.toString().padStart(2,"0"), c: "text-nerv-orange" },
        { k: "HIDDEN",  v: `${unlocked.length}/8`, c: "text-nerv-green" },
        { k: "SIGNER",  v: "MAGI/CASPER" },
        { k: "VERIFY",  v: "✓ ALL", c: "text-nerv-green" },
      ]}
    >
      <CmdRunHeader cmd="cat ./records/public.log" out={[`<span class='ok'>[OK]</span> ${ACHIEVEMENTS.length} entries`]} />

      <div className="table-scroll border border-nerv-orange/30">
        <div className="row-rec text-[10px] text-nerv-orange tracking-widest bg-nerv-orange/5 min-w-[440px]"
             style={{ gridTemplateColumns: "60px 110px 1fr 110px" }}>
          <span>IDX</span><span>REF</span><span>RECORD</span><span>SIGNATURE</span>
        </div>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={a.code} className="row-rec min-w-[440px]"
               style={{ gridTemplateColumns: "60px 110px 1fr 110px" }}>
            <span className="text-nerv-orange">{String(i+1).padStart(3, "0")}</span>
            <span className="text-foreground/80">{a.code} / {a.year}</span>
            <span><span className="text-foreground tracking-widest font-stamp">{a.title}</span></span>
            <span className="text-nerv-green">● VERIFIED</span>
          </div>
        ))}
      </div>

      <CmdRunHeader cmd="cat ./records/hidden.log" out={["<span class='warn'>[!!]</span> 8 slots / localStorage signature"]} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {["KONAMI_UNLOCK","THIRD_IMPACT","TERMINAL_OPENED","MAGI_LOGIN","INSTRUMENTALITY","DOG_PAGE","ANGEL_SIGHTED","SECRET_EVA"].map((id, i) => {
          const on = unlocked.includes(id);
          return (
            <div key={id} className={`border px-2 py-1.5 sm:py-1 text-[9px] sm:text-[10px] tracking-widest ${on ? "border-nerv-green/60 text-nerv-green bg-nerv-green/5" : "border-foreground/20 text-foreground/40"}`}>
              <span className="led on align-middle" style={!on ? { background: "#222", color: "#222", boxShadow: "none" } : {}} />
              <span className="align-middle">SEC-{String(i+1).padStart(2, "0")} :: {id}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-orange tracking-widest">// audit signed by MAGI/CASPER ── chksum 0xA1-2F-91-BC ── ok</div>
    </TerminalScreen>
  );
}

export function StatusSection() {
  return (
    <TerminalScreen
      id="status"
      testid="status-section"
      variant="sync"
      prompt={{ user: "pilot-01", host: "magi", path: "/var/telemetry", cmd: "tail -f pilot.live --rate=1Hz" }}
      bootLines={[
        "<span class='ok'>[OK]</span> attached to pilot telemetry channel",
        "<span class='ok'>[OK]</span> 5 streams ▸ subscribed",
      ]}
      titleJp="現状報告"
      meta={[
        { k: "RATE",   v: "1 Hz" },
        { k: "STREAMS", v: "5" },
        { k: "STALE",   v: "0", c: "text-nerv-green" },
        { k: "JITTER",  v: "1.4ms", c: "text-nerv-green" },
      ]}
    >
      <div className="table-scroll border border-nerv-green/30">
        <div className="row-rec text-[10px] text-nerv-green tracking-widest bg-nerv-green/5 min-w-[480px]"
             style={{ gridTemplateColumns: "110px 1fr 180px 80px" }}>
          <span>CHANNEL</span><span>VALUE</span><span>WAVEFORM</span><span>STATE</span>
        </div>
        {CURRENT_STATUS.map((s, i) => (
          <div key={s.label} className="row-rec min-w-[480px]"
               style={{ gridTemplateColumns: "110px 1fr 180px 80px" }}>
            <span className="text-nerv-orange tracking-widest">{s.label}</span>
            <span className="text-foreground/95">&gt; {s.value}</span>
            <span className="self-center flex gap-px min-w-[160px]">
              {Array.from({ length: 24 }).map((_, k) => (
                <span key={k} className={`h-2 flex-1 ${k < (8 + i*3) ? "bg-nerv-green" : "bg-nerv-green/10"}`} />
              ))}
            </span>
            <span className="text-nerv-green">● LIVE</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-nerv-green tracking-widest">// stream lag &lt; 2ms ── packets received 12,402 ── dropped 0</div>
    </TerminalScreen>
  );
}
