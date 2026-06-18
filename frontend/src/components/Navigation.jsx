import React from "react";
import { NERV_MEDIA, PILOT } from "../data/portfolio";

const LINKS = [
  { id: "home", label: "00 // HOME" },
  { id: "personnel", label: "01 // PERSONNEL FILE" },
  { id: "operations", label: "02 // PROJECT ARCHIVES" },
  { id: "skills", label: "03 // SKILLS MATRIX" },
  { id: "economics", label: "04 // ECONOMIC ANALYSIS" },
  { id: "achievements", label: "05 // ACHIEVEMENTS" },
  { id: "gallery", label: "06 // ART GALLERY" },
  { id: "status", label: "07 // CURRENT STATUS" },
  { id: "contact", label: "08 // CONTACT TERMINAL" },
];

export default function Navigation({ sound, onToggleSound, onLogoClick, logoClicks, onTerminalOpen }) {
  const [open, setOpen] = React.useState(false);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b-2 border-nerv-orange/50 bg-background/85 backdrop-blur-sm"
      data-testid="main-nav"
    >
      <div className="flex items-center justify-between px-3 md:px-6 py-2 gap-3">
        <button
          onClick={onLogoClick}
          data-testid="nerv-logo-btn"
          data-cursor="hover"
          className="flex items-center gap-2 group"
          title={`NERV // ${logoClicks}/10`}
        >
          <img
            src={"nerv.png"}
            alt="NERV"
            className="h-8 w-auto drop-shadow-[0_0_6px_#FF6B00] transition-transform group-hover:rotate-[-3deg]"
          />
          <div className="leading-tight">
            <div className="text-[10px] tracking-widest text-nerv-orange text-glow-orange font-stamp">NERV ARCHIVE</div>
            <div className="text-[9px] text-foreground/70 tracking-[0.25em]">PILOT-01 // {PILOT.codename}</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-1 text-[10px] tracking-widest font-mono">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              data-cursor="hover"
              onClick={() => scrollTo(l.id)}
              className="px-2 py-1 border border-transparent hover:border-nerv-orange/60 hover:text-nerv-orange transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            data-testid="sound-toggle"
            data-cursor="hover"
            className="text-[10px] border border-nerv-orange/60 px-2 py-1 text-nerv-orange hover:bg-nerv-orange hover:text-background tracking-widest"
          >
            SND: {sound ? "ON" : "OFF"}
          </button>
          <button
            onClick={onTerminalOpen}
            data-testid="terminal-toggle"
            data-cursor="hover"
            className="border-2 border-nerv-green text-nerv-green px-3 py-1.5 text-[11px] tracking-widest font-bold hover:bg-nerv-green hover:text-black transition-colors"
          >
            ~ TERMINAL
          </button>
          <a
            href={PILOT.resumeUrl}
            download
            data-testid="resume-download"
            data-cursor="hover"
            className="hidden md:inline-block text-[10px] border border-nerv-red/70 text-nerv-red px-2 py-1 tracking-widest hover:bg-nerv-red hover:text-background"
          >
            ↓ PERSONNEL REPORT
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="menu-toggle"
            className="lg:hidden text-nerv-orange border border-nerv-orange/60 px-2 py-1 text-[10px]"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-nerv-orange/40 bg-background transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-b border-nerv-orange/20">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-testid={`nav-mobile-${l.id}`}
              className="block w-full text-left px-4 py-3 text-xs tracking-widest border-b border-nerv-orange/10 hover:bg-nerv-orange/10 touch-target"
            >
              {l.label}
            </button>
          ))}
        </div>
        <a
          href={PILOT.resumeUrl}
          download
          className="block w-full text-left px-4 py-3 text-xs tracking-widest text-nerv-red hover:bg-nerv-red/10 touch-target"
        >
          ↓ DOWNLOAD PERSONNEL REPORT
        </a>
        <button
          onClick={() => { setOpen(false); onTerminalOpen?.(); }}
          className="block w-full text-left px-4 py-3 text-xs tracking-widest text-nerv-green hover:bg-nerv-green/10 touch-target border-t border-nerv-orange/20"
        >
          ~ OPEN TERMINAL
        </button>
      </div>
    </header>
  );
}
