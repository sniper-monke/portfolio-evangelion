import React from "react";

// Generic dense terminal panel with file header
export default function TerminalPanel({
  file,
  title,
  classification = "INTERNAL",
  status = "NOMINAL",
  statusColor = "text-nerv-green",
  meta = [],
  children,
  className = "",
  variant = "orange", // orange | green | red | white
}) {
  const tone =
    variant === "green"
      ? "border-nerv-green/60 text-nerv-green"
      : variant === "red"
      ? "border-nerv-red/60 text-nerv-red"
      : variant === "white"
      ? "border-foreground/40 text-foreground"
      : "border-nerv-orange/60 text-nerv-orange";

  return (
    <div className={`relative border ${tone} bg-background/60 ${className}`}>
      <div className={`flex items-center justify-between border-b ${tone} px-2 py-1 text-[10px] tracking-widest font-mono`}>
        <div className="flex items-center gap-2 truncate">
          <span className="text-nerv-orange">●</span>
          <span className="opacity-90">{file}</span>
          <span className="opacity-50">::</span>
          <span className="opacity-90 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="opacity-60">CLS: {classification}</span>
          <span className={statusColor}>● {status}</span>
        </div>
      </div>
      {meta?.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 border-b border-current/30 px-2 py-1 text-[9px] tracking-widest font-mono opacity-80">
          {meta.map((m, i) => (
            <span key={i}><span className="opacity-60">{m.k}:</span> <span>{m.v}</span></span>
          ))}
        </div>
      )}
      <div className="p-2 md:p-3">{children}</div>
      {/* corner dots */}
      <span className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-current" />
      <span className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-current" />
      <span className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-current" />
      <span className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-current" />
    </div>
  );
}

export function SectionHeader({ file, title, sub, code = "REC", status = "ACTIVE", titleJp = "" }) {
  const now = new Date();
  const ts = now.toISOString().replace("T", " ").slice(0, 19);
  return (
    <div className="border border-nerv-orange/60 bg-background/70 mb-3">
      <div className="flex items-center gap-3 border-b border-nerv-orange/40 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-orange">
        <span className="hazard-stripe w-3 h-3 inline-block" />
        <span>NERV/ARCHIVE/{file}</span>
        <span className="opacity-50">|</span>
        <span className="opacity-80">{code} {ts}Z</span>
        <span className="opacity-50">|</span>
        <span className="text-nerv-green">● {status}</span>
        <span className="ml-auto opacity-60">[ACCESS: A-1]</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 px-3 pt-3 pb-3 relative">
        <div className="absolute right-3 top-2 font-jp text-nerv-orange/10 text-5xl md:text-7xl leading-none pointer-events-none select-none">{titleJp}</div>
        <div className="relative">
          {titleJp && <div className="font-jp text-nerv-orange/80 tracking-[0.3em] text-sm md:text-base mb-1">{titleJp}</div>}
          <div className="text-[10px] tracking-[0.35em] text-nerv-orange/80 mono-tag">{`>> ${file}`}</div>
          <div className="display-stretch text-3xl md:text-5xl text-nerv-orange text-glow-orange">{title}</div>
        </div>
        <div className="relative text-[10px] tracking-widest font-mono text-foreground/60">{sub}</div>
      </div>
    </div>
  );
}

export function HazardBar({ label = "AUTHORIZED PERSONNEL ONLY" }) {
  return (
    <div className="flex items-stretch border border-nerv-yellow/80">
      <div className="hazard-stripe w-6" />
      <div className="px-3 py-0.5 text-[10px] tracking-[0.3em] font-stamp text-nerv-yellow flex items-center">{label}</div>
      <div className="hazard-stripe w-6 ml-auto" />
    </div>
  );
}

export function MetaRow({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-0.5 text-[10px] tracking-widest font-mono">
      {items.map((m, i) => (
        <div key={i} className="flex items-baseline gap-1">
          <span className="text-foreground/50">{m.k}:</span>
          <span className={m.color || "text-foreground"}>{m.v}</span>
        </div>
      ))}
    </div>
  );
}
