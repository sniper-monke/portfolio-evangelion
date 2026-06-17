import React, { useEffect, useRef, useState } from "react";

const HELP = [
  "AVAILABLE COMMANDS:",
  "  help          - show this list",
  "  whoami        - identify pilot",
  "  projects      - list operations",
  "  skills        - synchronization ratios",
  "  contact       - open channel info",
  "  resume        - download personnel report",
  "  magi          - MAGI login screen",
  "  eva           - reveal EVA unit",
  "  thirdimpact   - INITIATE",
  "  instrumentality - hidden essay",
  "  seele         - SEELE override",
  "  dog           - ???",
  "  clear         - clear terminal",
  "  exit          - close terminal",
];

export default function SecretTerminal({ open, onClose, onUnlock, onAction }) {
  const [history, setHistory] = useState([
    "NERV TERMINAL v0.42 — TYPE 'help' FOR COMMANDS",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      onUnlock?.("TERMINAL_OPENED");
    }
  }, [open, onUnlock]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const exec = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const append = (...lines) => setHistory((h) => [...h, `> ${raw}`, ...lines]);
    switch (cmd) {
      case "help": append(...HELP); break;
      case "whoami": append("PILOT-01 // AARAV KRISHNA", "STUDENT DEVELOPER & ASPIRING ECONOMIST"); break;
      case "projects":
      case "ls projects":
        append("OP-001 MAGI: ECON SIMULATOR", "OP-002 AT-FIELD", "OP-003 DOSSIER", "OP-004 GEOFRONT", "OP-005 EVA-UNIT-LATEX", "OP-006 SHINJI"); break;
      case "skills": append("SYNC RATIO 87.2% // SEE FILE 03 FOR FULL TELEMETRY"); break;
      case "contact": append("EMAIL: aarav@nerv.archive", "GITHUB: github.com/aaravkrishna"); break;
      case "resume":
      case "open resume":
        append("DOWNLOADING PERSONNEL REPORT..."); onAction?.("resume"); break;
      case "magi":
        append("ACCESSING MAGI ROOT..."); onAction?.("magi"); onUnlock?.("MAGI_LOGIN"); break;
      case "eva":
        append("LAUNCH KEY ACCEPTED", "EVA-UNIT-01 SYNCHRONIZED"); onUnlock?.("SECRET_EVA"); break;
      case "thirdimpact":
        append("WARNING: HUMAN INSTRUMENTALITY ENABLED");
        onUnlock?.("THIRD_IMPACT"); onAction?.("thirdimpact"); break;
      case "instrumentality":
        append("OPENING /instrumentality"); onAction?.("instrumentality"); onUnlock?.("INSTRUMENTALITY"); break;
      case "seele":
        append("SOUND ONLY."); onAction?.("seele"); onUnlock?.("KONAMI_UNLOCK"); break;
      case "dog":
        append("...woof?"); onUnlock?.("DOG_PAGE"); break;
      case "open github":
        append("REDIRECTING..."); window.open("https://github.com/aaravkrishna", "_blank"); break;
      case "clear": setHistory([]); return;
      case "exit": onClose(); return;
      case "":
        break;
      default: append(`COMMAND NOT FOUND: ${raw}`, "TRY 'help'");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-x-2 bottom-12 md:inset-x-10 md:bottom-16 z-[150] border-2 border-nerv-green bg-black text-nerv-green font-mono text-xs md:text-sm text-glow-green max-h-[55vh] flex flex-col" data-testid="secret-terminal">
      <div className="flex items-center justify-between border-b border-nerv-green/40 px-2 py-1 text-[10px] tracking-widest">
        <span>NERV // HIDDEN TERMINAL // PRESS ~ TO TOGGLE</span>
        <button onClick={onClose} className="text-nerv-orange hover:text-nerv-red">CLOSE</button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {history.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">{l}</div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); exec(input); setInput(""); }}
        className="border-t border-nerv-green/40 flex items-center px-2 py-1 gap-1"
      >
        <span className="text-nerv-orange">PILOT-01:~$</span>
        <input
          ref={inputRef}
          data-testid="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-nerv-green"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
