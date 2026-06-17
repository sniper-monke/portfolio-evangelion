import React, { useEffect, useState } from "react";
import { PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";
import { MagiHexDisplay, HarmonicsGraph, ActiveTimeDisplay } from "../components/MagiDisplays";

function useTyped(text, speed = 32) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { out, done };
}

const HERO_ASCII = `┌─[ NERV CENTRAL DOGMA :: ARCHIVE ACCESS GRANTED ]──────────────────────────┐
│                                                                            │
│   ███╗   ██╗███████╗██████╗ ██╗   ██╗                                       │
│   ████╗  ██║██╔════╝██╔══██╗██║   ██║   ARCHIVE :: PILOT-01                 │
│   ██╔██╗ ██║█████╗  ██████╔╝██║   ██║   FILE     :: P-01-DOSSIER            │
│   ██║╚██╗██║██╔══╝  ██╔══██╗╚██╗ ██╔╝   STATUS   :: ACTIVE / DECRYPTED      │
│   ██║ ╚████║███████╗██║  ██║ ╚████╔╝    CLEARANCE:: A-1 // EYES ONLY        │
│   ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝  ╚═══╝     SECTOR   :: TOKYO-3 / GF-S7         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘`;

export default function HeroSection({ onSound }) {
  const { out: typed, done: typedDone } = useTyped(PILOT.tagline, 28);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const m = (e) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("mousemove", m); clearInterval(t); };
  }, []);

  const sync = (87.2 + Math.sin(tick / 6) * 0.4).toFixed(2);
  const at = (99.4 + Math.cos(tick / 4) * 0.2).toFixed(2);

  return (
    <div id="home" data-testid="hero-section" className="px-2 md:px-3 pt-16 relative dot-grid">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(255,107,0,0.3), transparent 60%)` }} />

      <TerminalScreen
        variant="nerv"
        prompt={{ user: "pilot-01", host: "magi", path: "/nerv/archive/personnel", cmd: "cat ./PILOT-01.dossier && uptime" }}
        ascii={HERO_ASCII}
        titleJp="人事档案"
        meta={[
          { k: "TIME",   v: new Date().toUTCString().slice(17, 25) + "Z", c: "text-nerv-green" },
          { k: "NODE",   v: "TOKYO-3/GF-S7" },
          { k: "SEQ",    v: "0xA7F3-91-2C" },
          { k: "SYNC",   v: `${sync}%`, c: "text-nerv-orange" },
          { k: "AT-FLD", v: `${at}%`,  c: "text-nerv-green" },
          { k: "ANGEL",  v: "0 (CLEAR)", c: "text-nerv-green" },
          { k: "L.C.L",  v: "NOMINAL",   c: "text-nerv-cyan" },
          { k: "UPTIME", v: "14d 03:22:17" },
        ]}
        bootLines={[
          "<span class='ok'>[OK]</span> opened: /nerv/archive/personnel/PILOT-01.dossier (4.7MB)",
          "<span class='ok'>[OK]</span> SHA-256 ✓  decryption complete",
          "<span class='ok'>[OK]</span> permission ▸ A-1 EYES_ONLY ▸ user verified",
          "<span class='warn'>[!!]</span> watchdog: heartbeat from MAGI/MELCHIOR delayed +12ms",
        ]}
      >
        {/* DOSSIER body — dense, like cat'd file output */}
        <div className="grid grid-cols-12 gap-2 mb-2">
          {/* main column */}
          <div className="col-span-12 lg:col-span-8 space-y-1">
            <div className="text-[10px] text-nerv-orange tracking-widest">// SUBJECT IDENTIFICATION ──────────────────────────────────────────────</div>
            <div className="grid grid-cols-12 gap-x-2 gap-y-0">
              <div className="col-span-3 dim">DESIGNATION ▸</div><div className="col-span-9 text-nerv-orange">{PILOT.designation}</div>
              <div className="col-span-3 dim">CODENAME ▸</div>
              <div className="col-span-9"><span className="display-stretch text-3xl md:text-5xl text-nerv-orange text-glow-orange">{PILOT.codename}</span></div>
              <div className="col-span-3 dim">CLASSIFICATION ▸</div><div className="col-span-9">{PILOT.classification}</div>
              <div className="col-span-3 dim">STATUS ▸</div><div className="col-span-9 text-nerv-green">● {PILOT.status} ─ ON STATION</div>
              <div className="col-span-3 dim">BLOOD TYPE ▸</div><div className="col-span-9">{PILOT.bloodType}</div>
              <div className="col-span-3 dim">BIRTH REC ▸</div><div className="col-span-9 text-nerv-red">{PILOT.birthRecord}</div>
              <div className="col-span-3 dim">LOCATION ▸</div><div className="col-span-9">{PILOT.location} (35.4°N / 139.4°E / -1470M)</div>
              <div className="col-span-3 dim">AUTH-KEY ▸</div><div className="col-span-9 dim">████████████████ ··· (16 bytes)</div>
            </div>

            <div className="mt-2 text-[10px] text-nerv-orange tracking-widest">// MOTTO / RECOVERED TRANSCRIPT ─────────────────────────────────────────</div>
            <div className="border-l-2 border-nerv-orange/60 pl-3 text-foreground/95">
              &gt; "{typed}{!typedDone && <span className="caret"></span>}"
            </div>

            <div className="mt-2 text-[10px] text-nerv-orange tracking-widest">// CONSOLE ACTIONS ─────────────────────────────────────────────────────</div>
            <div className="flex flex-wrap gap-1 text-[10px]">
              <a href="#operations" onClick={onSound} data-testid="cta-explore" data-cursor="hover" className="pill text-nerv-orange hover:bg-nerv-orange hover:text-background">[ENTER] ▸ OPS LOG</a>
              <a href={PILOT.resumeUrl} download data-testid="cta-resume" data-cursor="hover" className="pill text-nerv-red border-nerv-red hover:bg-nerv-red hover:text-background">[D] ▸ PERSONNEL REPORT</a>
              <a href="#contact" data-cursor="hover" className="pill text-foreground hover:bg-foreground hover:text-background">[O] ▸ COMMS CHANNEL</a>
              <span className="pill text-nerv-green border-nerv-green/70">~ ▸ HIDDEN TERMINAL</span>
              <span className="pill text-foreground/70 border-foreground/40">ESC ▸ ABORT</span>
            </div>
          </div>

          {/* side column: MAGI hex + live readouts */}
          <div className="col-span-12 lg:col-span-4 space-y-1">
            <div className="text-[10px] text-nerv-orange tracking-widest">// MAGI VERDICT ─────────────────────</div>
            <MagiHexDisplay verdict="APPROVED" />
            <div className="text-[10px] text-nerv-orange tracking-widest">// LIVE TELEMETRY ───────────────────</div>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              {[
                ["PULSE",   `${60 + Math.round(Math.sin(tick/4)*5)} BPM`,  "text-nerv-green"],
                ["RING",    "07 / 12",          "text-nerv-orange"],
                ["L.C.L",   "NOMINAL",          "text-nerv-cyan"],
                ["DEPTH",   "-1,470 M",         "text-foreground"],
                ["TEMP",    "34.2 °C",          "text-nerv-green"],
                ["BARRIER", "MAIN ARMOR",       "text-nerv-orange"],
                ["PATTERN", "BLUE",             "text-nerv-cyan"],
                ["MENTAL",  "STABLE",           "text-nerv-green"],
              ].map(([k, v, c]) => (
                <div key={k} className="border border-current/20 px-1 py-0.5">
                  <span className="dim">{k}</span><span className="block"><span className={c}>{v}</span></span>
                </div>
              ))}
            </div>
            <ActiveTimeDisplay />
          </div>
        </div>

        {/* lower belt: harmonics + warning log */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[10px] text-nerv-green tracking-widest mb-1">// EVA HARMONICS WAVEFORM ──────────────────────────────────────────────</div>
            <HarmonicsGraph value={PILOT.syncRatio} subject="PILOT-01" />
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] text-nerv-red tracking-widest mb-1">// WARNING BUFFER ──────────────────────────────────────────────────────</div>
            <div className="prompt line-numbers">
              {[
                "<span class='warn'>WARN</span> SYS-014 :: LCL viscosity drift (within tolerance)",
                "<span class='warn'>WARN</span> SYS-027 :: MAGI/MELCHIOR latency +12ms",
                "<span class='ok'>NOTE</span> SYS-031 :: angel pattern detector ▸ CLEAR",
                "<span class='ok'>NOTE</span> SYS-038 :: pilot biorhythm ▸ STABLE",
                "<span class='err'>HALT</span> SYS-042 :: 3 unauthorized accesses to /seele blocked",
              ].map((l, i) => (
                <React.Fragment key={i}>
                  <span className="ln">{String(i+1).padStart(3,"0")}</span>
                  <span dangerouslySetInnerHTML={{ __html: l }} />
                </React.Fragment>
              ))}
            </div>
            <div className="mt-2 hazard-stripe h-2" />
            <div className="text-[10px] text-foreground/60 mt-1 tracking-widest">特務機関ネルフ / 人類補完計画委員会 / 第参拾弐号機</div>
          </div>
        </div>
      </TerminalScreen>
    </div>
  );
}
