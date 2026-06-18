import React, { useEffect, useRef, useState } from "react";

const HELP = [
  "AVAILABLE COMMANDS:",
  "  help          - show this list",
  "  whoami        - identify pilot",
  "  whoareyou     - ???",
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
  "  congrats      - congratulations",
  "  clear         - clear terminal",
  "  exit          - close terminal",
];

const REI_ARTS = [
  [
    "⠡⢐⠄⠀⠀⠐⠀⠀⠀⠀⡀⠄⠀⠒⠀⠀⠉⠉⠀⠂⠂⠀⠀⠀⠀⠀⠀⠀⠁⠀",
    "⠀⠲⠄⠀⠀⠀⢀⠖⠈⠁⠀⢀⠀⢀⠆⢄⠀⠀⠀⠀⠀⠉⠉⠂⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⣇⠀⡌⠀⡀⠐⡀⠀⠱⣼⡣⠰⠷⠑⠀⠀⠐⢄⠀⠄⠈⡄⠀⠀⠀⠀",
    "⠀⠀⠀⠀⢠⡎⠇⠀⡇⣰⡈⢲⢄⠀⠑⢳⣀⣧⡀⠀⠀⠈⣆⠘⡀⠐⣀⠃⠀⠀",
    "⠀⠀⠀⠀⣘⠆⠀⠀⣇⣧⡿⣆⠱⡥⣢⡀⠙⣦⡑⡀⠀⠐⠸⡄⡷⠀⡇⠀⠀⠀",
    "⠀⠀⠀⢠⢿⠀⢶⠀⢻⡕⣳⣭⡦⣡⡹⢟⢆⠘⡻⣞⡄⠀⡆⢁⠇⠇⡇⠀⠀⠀",
    "⠀⠀⠀⠀⠿⣧⢻⣧⡀⢹⠁⠘⠁⡜⡣⠂⠅⣑⢅⢠⠷⡀⠗⢸⠀⢰⠁⠀⠀⠀",
    "⠀⠀⠀⠀⠘⡜⠝⢿⢻⠢⢦⠀⢨⠻⠁⣀⠞⢁⢴⠟⢰⢱⠈⠀⢠⠇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠘⠂⣾⠢⡀⢀⡀⢡⠡⣺⠋⣢⢕⡵⢠⠃⡎⡔⣠⠝⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⡇⠹⡹⡦⡐⠁⠠⢓⡡⠺⢣⣡⢷⣡⣟⠼⠏⠀⡀⠄⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠑⡀⢈⠻⠮⢒⣫⣭⣶⣶⣷⣾⣷⣶⣮⣤⣴⣾⣶⡄⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⢀⠊⠀⠀⠀⠀⠀⠉⢿⠁⠀⠀⠀⠀⢸⡛⠁⢈⣿⡿⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀⢀⣾⣲⠀⠀⠀⠱⠢⠀⠐⠂⠈⢽⡄⠈⠋⠰⣾⣆⠀",
    "⠀⠀⠀⠀⠀⠀⡜⠁⠀⠀⠡⠑⠛⠀⢰⠉⠁⡄⠃⠀⠀⠀⠀⣢⢀⣠⣶⠿⣿⣦",
    "⠀⠀⠀⠀⠀⠀⢁⠀⠀⠀⠀⠀⠀⠀⣸⠀⠀⡇⠀⠀⠀⠀⠀⢃⣟⠋⠁⠀⠘⠁",
  ],

  [
    "⠀⠀⠀⠀⠀⡟⠀⠀⠀⠙⠉⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⢀⡇⠀⠀⠈⠛⠒⠋⠀⠀⢸",
    "⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀⢠⠄⠀⠀⠀⠀⢠⢷⠀⠀⠀⠀⡄⠀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⢨",
    "⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⡆⠀⠀⢀⠀⠀⢸⠈⢇⠀⢰⠀⡇⢠⠃⢻⠀⢀⡔⠀⠀⠀⠀⠀⡇",
    "⠀⠀⠀⠀⠈⡆⠀⠀⠀⠀⡇⠀⠀⠈⡵⠦⡼⠶⢾⣷⣸⣧⣸⣧⣯⡶⣾⡴⡏⢀⣄⠀⠀⡇",
    "⠀⠀⠀⠀⠀⢧⠀⠀⠀⠀⡇⠀⠀⡼⠁⠀⣀⣀⡀⠉⠉⢦⢠⠋⠉⠁⠉⣸⣗⣉⡈⠳⣄⠀⡇",
    "⠀⠀⠀⠀⠀⠘⣴⡀⠀⠀⢃⣠⠞⣿⡷⡿⠛⣿⣿⣿⢶⡄⠳⠋⠀⣰⢾⠛⢻⣿⣿⡿⣿⡈⡟",
    "⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠈⠁⠀⠸⡇⢿⣽⣿⣿⣿⡇⠁⠀⠀⠀⢿⡵⣿⣿⣯⡇⠏⡹⢀⡇",
    "⠀⠀⠀⠀⠀⠀⠀⠘⡆⠀⠀⠀⠀⠀⠹⣌⠻⠿⠿⠋⠀⠀⠀⠀⠀⠈⠻⠿⠿⠛⣰⠃⣠⠃",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠘⢆⢀⡀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡃⢀⡜⠁",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠑⢆⡀⠀⠈⠻⡍⠀⠀⠒⠒⠂⠀⠀⣀⣤⣟⠁⣠⠔⠃",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠢⣄⣿⠛⣻⣶⣤⣤⣤⣀⣠⣤⢤⣤⣴⡶⠫⠿⣿⡚",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⢻⣶⡄⢰⢳⠃⢀⣷⣿⠦⢯⣿⡗⢧⠹⡄⣤⣽⢦⡀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣷⣶⣶⣿⣄⣾⠏⠀⠈⠑⢦⡀⣤⠞⠉⠈⠱⣧⢠⣼⣿⣦",
    "⠀⠀⠀⠀⠀⠀⠀⢀⣠⠔⣻⣿⣿⣿⡿⠟⢹⣿⡄⠀⠀⣾⣿⣿⡀⠀⠀⣸⣿⣿⢿⣿⣿⣿",
    "⠀⠀⠀⠀⠀⠀⣰⣯⡟⠓⢍⠻⡿⠏⠁⢸⢿⡟⠲⠶⠚⢱⠋⢲⠑⠒⠊⣟⡩⢾⡇⠙⢿⣿",
  ],
];

const REI_DIALOGUE = [
  { speaker: "???", lines: ['"Who am I?"'], reply: "You are Rei Ayanami." },
  { speaker: "REI", lines: ['"But, who are you?"'], reply: "Are you Rei Ayanami as well?" },
  {
    speaker: "REI",
    lines: [
      "\"Correct, I'm the thing that is recognized as Rei Ayanami.\"",
      "\"We are all things that are recognized as Rei Ayanami.\"",
    ],
    reply: "How could all of those possibly be me?",
  },
  {
    speaker: "REI",
    lines: [
      "\"It is simply because the others call us Rei Ayanami, that is the only reason.\"",
      "\"You possess a false body and a fake soul, do you know why?\"",
    ],
    reply: "I am neither false nor fake, I am simply me.",
  },
  {
    speaker: "REI",
    lines: [
      "\"No, you are an empty shell with a false soul created by a man named Gendou Ikari.\"",
      "\"You are just an object that is pretending to be human.\"",
      "\"Look deep within yourself. Do you perceive the almost intangible and physical presence that lurks below your waking self? Inside your darkest dreams? It is there that your true identity lies.\"",
    ],
    reply: "No, I am me. I became myself by the instrumentality of the links and relationships between myself and others. I am formed by interaction of others. They create me as I create them. These relationships and interactions serve to shape the patterns of my heart and mind.",
  },
  { speaker: "REI", lines: ['"Those are bonds?"'], reply: "Yes. That is the name for what I share with those who have created the thing known as rei. That is what will continue to shape me." },
  {
    speaker: "REI",
    lines: [
      "\"Those are bonds.\"",
      "\"But there is someone else who is your true self. You don't know her, but she exists. You've denied that fact, in an attempt to suppress that facet of your reality.\"",
    ],
    reply: "Because of fear.",
  },
  {
    speaker: "REI",
    lines: [
      "\"Because she might not have human form. Because then the present self might cease to be.\"",
      "\"This is fear.\"",
      "\"This is what you fear. That you will become nothing. Or frightened that you will disappear from the minds of others if another exists.\"",
    ],
    reply: "I'm afraid, why is that?",
  },
  {
    speaker: "REI",
    lines: [
      "\"Because your current self has never existed.\"",
      "\"You are scared, aren't you?\"",
    ],
    reply: "Because you will cease to be.",
  },
  {
    speaker: "REI",
    lines: ['"You are scared, aren\'t you?"'],
    reply: "No, I'm not. I am happy because I want to die. I want despair. I want to return to nothing, but I can't. He won't let me return to nothingness. Not yet. I still exist because he needs me. But when everything is over, when I am of no use anymore, he will abandon me. I've prayed for the day he would abandon me. But now, now I fear it.",
  },
  {
    speaker: "REI",
    lines: ['"..."', '"The conversation ends. You have touched the soul of Rei Ayanami."'],
    final: true,
  },
];

const isMobile = window.innerWidth < 640;

function getReiArt(step) {
  const idx = Math.floor(step / 3) % REI_ARTS.length;
  return REI_ARTS[idx].join("\n");
}

function getReiArtLarge() {
  return REI_ARTS[0].join("\n");
}

export default function SecretTerminal({ open, onClose, onUnlock, onAction }) {
  const [history, setHistory] = useState([
    "NERV TERMINAL v0.42 — TYPE 'help' FOR COMMANDS",
  ]);
  const [input, setInput] = useState("");
  const [dialogueStep, setDialogueStep] = useState(-1);
  const [dialogueDone, setDialogueDone] = useState(false);
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

  const append = (...lines) => setHistory((h) => [...h, ...lines]);

  const showStep = (idx) => {
    const step = REI_DIALOGUE[idx];
    if (!step) { setDialogueStep(-1); setDialogueDone(true); return; }
    const prefix = step.speaker === "???" ? "---" : "--";
    const entries = [`${prefix} ${step.speaker} ${prefix}`];
    step.lines.forEach((l) => entries.push(`  ${l}`));
    if (step.final) {
      entries.push("", "SYSTEM: DIALOGUE ENDED.", "WHO_ARE_YOU — ACKNOWLEDGED");
      onUnlock?.("WHO_ARE_YOU");
      append(...entries);
      setDialogueStep(-1);
      setDialogueDone(true);
    } else {
      const short = step.reply.length > 55 ? step.reply.slice(0, 52) + "..." : step.reply;
      entries.push("", `Say: "${short}"? (Y/N)`);
      append(...entries);
      setDialogueStep(idx);
    }
  };

  const handleDialogueInput = (raw) => {
    const c = raw.trim().toLowerCase();
    if (c === "y" || c === "yes") {
      const step = REI_DIALOGUE[dialogueStep];
      append(`  > "${step.reply}"`, "");
      showStep(dialogueStep + 1);
    } else if (c === "n" || c === "no") {
      append("  > ...", "SYSTEM: DIALOGUE ABORTED.");
      setDialogueStep(-1);
    } else {
      append(`  > ${raw}`, "  (Y/N)");
    }
  };

  const exec = (raw) => {
    const cmd = raw.trim().toLowerCase();
    switch (cmd) {
      case "help": append(`> ${raw}`, ...HELP); break;
      case "whoami": append(`> ${raw}`, "PILOT-01 // AARAV KRISHNA", "STUDENT DEVELOPER & ASPIRING ECONOMIST"); break;
      case "whoareyou":
        append(`> ${raw}`, "");
        setDialogueDone(false);
        showStep(0);
        break;
      case "projects":
      case "ls projects":
        append(`> ${raw}`, "OP-001 MAGI: ECON SIMULATOR", "OP-002 AT-FIELD", "OP-003 DOSSIER", "OP-004 GEOFRONT", "OP-005 EVA-UNIT-LATEX", "OP-006 SHINJI"); break;
      case "skills": append(`> ${raw}`, "SYNC RATIO 87.2% // SEE FILE 03 FOR FULL TELEMETRY"); break;
      case "contact": append(`> ${raw}`, "EMAIL: aarav@nerv.archive", "GITHUB: github.com/aaravkrishna"); break;
      case "resume":
      case "open resume":
        append(`> ${raw}`, "DOWNLOADING PERSONNEL REPORT..."); onAction?.("resume"); break;
      case "magi":
        append(`> ${raw}`, "ACCESSING MAGI ROOT..."); onAction?.("magi"); onUnlock?.("MAGI_LOGIN"); break;
      case "eva":
        append(`> ${raw}`, "LAUNCH KEY ACCEPTED", "EVA-UNIT-01 SYNCHRONIZED"); onUnlock?.("SECRET_EVA"); break;
      case "thirdimpact":
        append(`> ${raw}`, "WARNING: HUMAN INSTRUMENTALITY ENABLED");
        onUnlock?.("THIRD_IMPACT"); onAction?.("thirdimpact"); break;
      case "instrumentality":
        append(`> ${raw}`, "OPENING /instrumentality"); onAction?.("instrumentality"); onUnlock?.("INSTRUMENTALITY"); break;
      case "seele":
        append(`> ${raw}`, "SOUND ONLY."); onAction?.("seele"); onUnlock?.("KONAMI_UNLOCK"); break;
      case "dog":
        append(`> ${raw}`, "...woof?"); onUnlock?.("DOG_PAGE"); break;
      case "congrats":
      case "congratulations":
        append(`> ${raw}`, "おめでとう。"); onAction?.("congrats"); break;
      case "open github":
        append(`> ${raw}`, "REDIRECTING..."); window.open("https://github.com/aaravkrishna", "_blank"); break;
      case "clear": setHistory([]); return;
      case "exit": onClose(); return;
      case "":
        break;
      default: append(`> ${raw}`, `COMMAND NOT FOUND: ${raw}`, "TRY 'help'");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 sm:inset-x-2 sm:bottom-12 md:inset-x-10 md:bottom-16 z-[150] border-2 border-nerv-green bg-black text-nerv-green font-mono text-xs md:text-sm text-glow-green h-full sm:h-auto sm:max-h-[70vh] flex flex-col" data-testid="secret-terminal">
      <div className="flex items-center justify-between border-b border-nerv-green/40 px-3 py-2 sm:px-2 sm:py-1 text-[10px] tracking-widest">
        <span className="truncate">NERV // HIDDEN TERMINAL</span>
        <button onClick={onClose} className="text-nerv-orange hover:text-nerv-red px-3 py-1.5 sm:px-2 sm:py-0">CLOSE</button>
      </div>
      <div className="flex-1 overflow-hidden flex min-h-0">
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {history.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">{l}</div>
          ))}
          {dialogueDone && (
            <pre className="pt-4 text-nerv-blue/40 text-[10px] leading-tight overflow-x-auto">{getReiArtLarge()}</pre>
          )}
          <div ref={endRef} />
        </div>
        {dialogueStep >= 0 && !dialogueDone && (
          <pre className="shrink-0 self-start p-2 text-nerv-blue/30 leading-tight hidden sm:block">{getReiArt(dialogueStep)}</pre>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (dialogueStep >= 0 && dialogueStep < REI_DIALOGUE.length) {
            handleDialogueInput(input);
          } else {
            exec(input);
          }
          setInput("");
        }}
        className="border-t border-nerv-green/40 flex items-center px-3 py-2 sm:px-2 sm:py-1 gap-1"
      >
        <span className="text-nerv-orange shrink-0">{dialogueStep >= 0 ? ">" : "PILOT-01:~$"}</span>
        <input
          ref={inputRef}
          data-testid="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-nerv-green min-w-0"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
