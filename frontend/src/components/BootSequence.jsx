import React, { useEffect, useState } from "react";

const LINES = [
  { t: 100, text: "NERV CENTRAL DOGMA :: BIOS v2.27" },
  { t: 250, text: "POST :: MEMORY OK :: 17.179 GB" },
  { t: 450, text: "BOOTING CENTRAL COMPUTER SYSTEM..." },
  { t: 900, text: "> MAGI/CASPAR  ............... [ ONLINE ]" },
  { t: 1300, text: "> MAGI/MELCHIOR ............... [ ONLINE ]" },
  { t: 1700, text: "> MAGI/BALTHASAR .............. [ ONLINE ]" },
  { t: 2100, text: "RUNNING SYSTEM DIAGNOSTICS..." },
  { t: 2500, text: "> AT-FIELD INTEGRITY ........... 99.4%" },
  { t: 2900, text: "> CORE TEMPERATURE ............. NOMINAL" },
  { t: 3300, text: "> SYNC RATIO ................... 87.2%" },
  { t: 3700, text: "ACCESSING CLASSIFIED ARCHIVES..." },
  { t: 4500, text: "> SECTOR 7 .......... [LOCKED]" },
  { t: 4900, text: "> SECTOR 9 .......... [LOCKED]" },
  { t: 5300, text: "PERSONNEL FILE DETECTED :: PILOT-01" },
  { t: 6000, text: "AUTHORIZATION REQUIRED" },
  { t: 6800, text: "> AUTH KEY: ████████████████" },
  { t: 7700, text: "OVERRIDE ACCEPTED" },
  { t: 8500, text: "DECRYPTING DOSSIER ......" },
  { t: 9600, text: "WELCOME, USER." },
  { t: 10600, text: "TRANSFERRING CONTROL..." },
];

export default function BootSequence({ onComplete, onSound }) {
  const [shown, setShown] = useState([]);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timers = LINES.map((l, idx) =>
      setTimeout(() => {
        setShown((s) => [...s, l.text]);
        setPct(Math.min(100, Math.round(((idx + 1) / LINES.length) * 100)));
        onSound?.();
      }, l.t)
    );
    const finish = setTimeout(() => onComplete(), 11800);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [onComplete, onSound]);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black text-nerv-green font-mono p-6 md:p-12 overflow-hidden crt"
      data-testid="boot-sequence"
    >
      <div className="flex items-start justify-between mb-8 border-b border-nerv-green/40 pb-3">
        <div className="text-nerv-green text-glow-green text-xs md:text-sm tracking-widest">
          NERV // MAGI // CENTRAL DOGMA TERMINAL
        </div>
        <button
          onClick={onComplete}
          className="text-nerv-orange text-glow-orange border border-nerv-orange/60 px-3 py-1 text-[10px] md:text-xs tracking-widest hover:bg-nerv-orange hover:text-black transition-colors"
          data-testid="skip-intro-btn"
        >
          SKIP // [ESC]
        </button>
      </div>

      <pre className="text-nerv-orange text-glow-orange text-[10px] md:text-xs leading-tight mb-4 hidden md:block whitespace-pre">
{`  ███╗   ██╗███████╗██████╗ ██╗   ██╗
  ████╗  ██║██╔════╝██╔══██╗██║   ██║
  ██╔██╗ ██║█████╗  ██████╔╝██║   ██║
  ██║╚██╗██║██╔══╝  ██╔══██╗╚██╗ ██╔╝
  ██║ ╚████║███████╗██║  ██║ ╚████╔╝
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝  ╚═══╝   GOD'S IN HIS HEAVEN`}
      </pre>

      <div className="space-y-1 text-xs md:text-sm">
        {shown.map((l, i) => (
          <div key={i} className="text-glow-green">
            <span className="text-nerv-orange mr-2">{String(i).padStart(2, "0")}</span>
            {l}
          </div>
        ))}
        {shown.length < LINES.length && (
          <div className="text-nerv-orange text-glow-orange caret"> </div>
        )}
      </div>

      <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12">
        <div className="flex justify-between text-[10px] md:text-xs text-nerv-orange tracking-widest mb-2">
          <span>DECRYPTION PROGRESS</span>
          <span data-testid="boot-progress">{pct}%</span>
        </div>
        <div className="h-2 bg-nerv-orange/10 border border-nerv-orange/40">
          <div className="h-full bg-nerv-orange" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-[10px] md:text-xs text-nerv-green/60 tracking-widest font-jp">
          特務機関ネルフ ・ 人類補完計画 ・ 第参拾 弐号機
        </div>
      </div>

      <div className="absolute top-1/4 right-6 md:right-12 border border-nerv-orange/40 px-3 py-2 text-[10px] md:text-xs text-nerv-orange tracking-widest hidden md:block">
        <div>WARNING</div>
        <div className="text-nerv-red mt-1">CLASSIFIED MATERIAL</div>
        <div className="text-nerv-text/60">UN OVERSIGHT — A-17</div>
      </div>
    </div>
  );
}
