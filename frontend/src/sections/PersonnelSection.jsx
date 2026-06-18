import React from "react";
import { PERSONNEL_FILE, PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";
import { ToxicityBars } from "../components/MagiDisplays";

const DOSSIER_ASCII = `┌──────────────────────────────────────────────────────────────────────────┐
│  ▶ NERV PERSONNEL DOSSIER  ::  ${"P-01-AARAV-KRISHNA".padEnd(30)} │
│  CREATED 2024-03-14 04:22:18Z  │  REV 3.2  │  CLASS A-1 │ EYES ONLY     │
└──────────────────────────────────────────────────────────────────────────┘`;

export default function PersonnelSection() {
  return (
    <TerminalScreen
      id="personnel"
      testid="personnel-section"
      variant="nerv"
      prompt={{ user: "pilot-01", host: "nerv-os", path: "/nerv/dossier", cmd: "open --classified P-01-AARAV-KRISHNA.rec" }}
      bootLines={[
        "<span class='ok'>[OK]</span> requesting handle on /dossier/P-01 ▸ granted",
        "<span class='ok'>[OK]</span> redacting fields ▸ [BIRTH_REC] [HOME_ADDR] [GUARDIAN]",
        "<span class='ok'>[OK]</span> 4 entries / 2 attachments / 0 anomalies",
      ]}
      ascii={DOSSIER_ASCII}
      titleJp="人事档案"
      meta={[
        { k: "FILE", v: "P-01-AARAV-KRISHNA" },
        { k: "REV",  v: "3.2 (PATCHED)" },
        { k: "AUTH", v: "DR. K. SOREN" },
        { k: "AGE",  v: "17yr 03mo" },
        { k: "SYNC", v: `${PILOT.syncRatio}%`, c: "text-nerv-orange" },
        { k: "STATUS", v: "ACTIVE", c: "text-nerv-green" },
        { k: "MOD", v: "2026-06-17 11:04:55Z" },
        { k: "CHKSUM", v: "0x4F-2A-9D-71" },
      ]}
    >
      <div className="grid grid-cols-12 gap-3">

        {/* LEFT: ID stack + vitals */}
        <div className="col-span-12 md:col-span-3 space-y-2">
          <div className="text-[10px] text-nerv-orange tracking-widest">// ID CHIP ──────────────</div>
          <div className="border border-nerv-orange/50 bg-black p-2 relative overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <div className="relative">
              <div className="flex items-start justify-between text-[9px] tracking-widest text-nerv-orange">
                <span>NERV/ID/2025-07-468</span>
                <span className="hex-cell bg-nerv-orange/40 w-4 h-4" />
              </div>
              <div className="my-3 flex justify-center">
                <img src={NERV_MEDIA.nervLogo} alt="" className="opacity-30 max-h-24" />
              </div>
              <div className="text-[8px] text-foreground/50 tracking-widest">SUBJECT</div>
              <div className="font-stamp text-nerv-orange tracking-widest">{PILOT.codename}</div>
              <div className="text-[8px] text-foreground/60">{PILOT.designation} // SYNC {PILOT.syncRatio}%</div>
              <div className="hazard-stripe h-1 mt-2" />
              <div className="text-[8px] font-stamp text-nerv-red tracking-[0.3em] mt-1">★ EYES ONLY ★</div>
            </div>
          </div>

          <div className="text-[10px] text-nerv-red tracking-widest">// VITALS BUFFER ────────</div>
          <ToxicityBars items={[
            { v: 18, label: "FIRST C" },
            { v: 22, label: "THIRD C" },
            { v: 14, label: "SECOND C" },
          ]} />

          <div className="text-[10px] text-nerv-orange tracking-widest">// MISC ─────────────────</div>
          <div className="text-[10px] space-y-0.5">
            <div><span className="dim">FILE_SIZE</span>  4.71 MB</div>
            <div><span className="dim">PAGES</span>      14 / 14</div>
            <div><span className="dim">ATTACH</span>     2 (jpg, pdf)</div>
            <div><span className="dim">ENC</span>        AES-256-GCM</div>
            <div><span className="dim">SIGNATURE</span>  <span className="text-nerv-green">VERIFIED</span></div>
          </div>
        </div>

        {/* MIDDLE: biography, education, aspirations */}
        <div className="col-span-12 md:col-span-6 space-y-2">
          <CmdRunHeader cmd="cat ./entries/001-biography.txt" out={["<span class='ok'>[OK]</span> 1 paragraph / 412 chars"]} />
          <div className="border-l-2 border-nerv-orange/50 pl-3 text-foreground/90 leading-relaxed">
            <span className="text-nerv-orange">[ENTRY 001 // BIOGRAPHY]</span><br/>
            {PERSONNEL_FILE.biography}
          </div>

          <CmdRunHeader cmd="cat ./entries/002-education.tsv | column -t" out={["<span class='ok'>[OK]</span> 3 records"]} />
          <div className="table-scroll border border-nerv-orange/30">
            <div className="row-rec text-[10px] text-nerv-orange tracking-widest bg-nerv-orange/5 min-w-[640px]" style={{ gridTemplateColumns: "60px 1fr 220px 110px" }}>
              <span>IDX</span><span>INSTITUTION</span><span>PROGRAM</span><span>YEARS</span>
            </div>
            {PERSONNEL_FILE.education.map((e, i) => (
              <div key={i} className="row-rec min-w-[640px]" style={{ gridTemplateColumns: "60px 1fr 220px 110px" }}>
                <span className="text-nerv-orange">EDU-{String(i+1).padStart(3,"0")}</span>
                <span>
                  <span className="text-foreground">{e.institution}</span><br/>
                  <span className="dim text-[10px]">└─ {e.note}</span>
                </span>
                <span className="text-foreground/80">{e.role}</span>
                <span className="text-nerv-green">{e.years}</span>
              </div>
            ))}
          </div>

          <CmdRunHeader cmd="cat ./entries/003-aspirations.txt" />
          <div className="border-l-2 border-nerv-orange/50 pl-3 text-foreground/90">
            <span className="text-nerv-orange">[ENTRY 003 // ASPIRATIONS]</span><br/>
            {PERSONNEL_FILE.aspirations}
          </div>

          <CmdRunHeader cmd="tail -f ./entries/004-field-notes.log" out={["<span class='ok'>[OK]</span> following ▸ live"]} />
          <div className="prompt line-numbers">
            {PERSONNEL_FILE.funFacts.map((f, i) => (
              <React.Fragment key={i}>
                <span className="ln">{String(i+1).padStart(3, "0")}</span>
                <span><span className="text-nerv-orange">[FN]</span> {f}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT: tags & media */}
        <div className="col-span-12 md:col-span-3 space-y-2">
          <CmdRunHeader cmd="ls ./tags/" />
          <div className="text-[10px] text-nerv-green tracking-widest">// INTERESTS // {PERSONNEL_FILE.interests.length}</div>
          <div className="flex flex-wrap gap-1">
            {PERSONNEL_FILE.interests.map((t) => <span key={t} className="pill text-nerv-green">{t}</span>)}
          </div>
          <div className="text-[10px] text-foreground/80 tracking-widest mt-2">// HOBBIES // {PERSONNEL_FILE.hobbies.length}</div>
          <div className="flex flex-wrap gap-1">
            {PERSONNEL_FILE.hobbies.map((t) => <span key={t} className="pill text-foreground/80">{t}</span>)}
          </div>
          <div className="text-[10px] text-nerv-red tracking-widest mt-2">// PERSONALITY PROFILE</div>
          <div className="flex flex-wrap gap-1">
            {PERSONNEL_FILE.personality.map((t) => <span key={t} className="pill text-nerv-red">{t}</span>)}
          </div>

          <CmdRunHeader cmd="cat ./entries/005-favorite.media | head" />
          <div className="prompt line-numbers">
            {PERSONNEL_FILE.favoriteMedia.map((m, i) => (
              <React.Fragment key={i}>
                <span className="ln">{String(i+1).padStart(3, "0")}</span>
                <span>{m}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="text-[10px] text-nerv-orange tracking-widest mt-2">// REDACTED ─────────────</div>
          <div className="border border-nerv-red/40 bg-nerv-red/5 p-2 text-[10px] space-y-0.5">
            <div><span className="dim">GUARDIAN</span> ████████████</div>
            <div><span className="dim">HOME_ADDR</span> ████████████</div>
            <div><span className="dim">PHONE</span>    ████████████</div>
            <div><span className="dim">FAMILY</span>   <span className="text-nerv-red">CLASSIFIED</span></div>
          </div>
        </div>
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-orange tracking-widest">// EOF P-01-AARAV-KRISHNA.rec ── chksum 0x4F2A9D71 verified ✓</div>
    </TerminalScreen>
  );
}
