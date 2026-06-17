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

export default function Navigation({ pro, onTogglePro, sound, onToggleSound, onLogoClick, logoClicks }) {
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
            src={NERV_MEDIA.nervLogo}
            alt="NERV"
            className={`h-8 w-auto ${pro ? "" : "drop-shadow-[0_0_6px_#FF6B00]"} transition-transform group-hover:rotate-[-3deg]`}
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
            onClick={onTogglePro}
            data-testid="mode-toggle"
            data-cursor="hover"
            className={`text-[10px] border px-2 py-1 tracking-widest transition-colors ${
              pro
                ? "border-foreground text-foreground hover:bg-foreground hover:text-background"
                : "border-nerv-green/70 text-nerv-green hover:bg-nerv-green hover:text-background"
            }`}
          >
            MODE: {pro ? "PROFESSIONAL" : "NERV"}
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

      {open && (
        <div className="lg:hidden border-t border-nerv-orange/40 bg-background">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-testid={`nav-mobile-${l.id}`}
              className="block w-full text-left px-4 py-2 text-xs tracking-widest border-b border-nerv-orange/20 hover:bg-nerv-orange/10"
            >
              {l.label}
            </button>
          ))}
          <a
            href={PILOT.resumeUrl}
            download
            className="block px-4 py-2 text-xs tracking-widest border-b border-nerv-orange/20 text-nerv-red"
          >
            ↓ DOWNLOAD PERSONNEL REPORT
          </a>
        </div>
      )}
    </header>
  );
}
