import React, { useEffect, useState } from "react";

// A full NERV-OS terminal frame for an entire section.
// Variants: 'nerv' (orange), 'magi' (cyan), 'seele' (red), 'sync' (green), 'comms' (green)
export default function TerminalScreen({
  variant = "nerv",
  prompt,           // { user, host, path, cmd }
  bootLines = [],   // lines to "stream" at top
  ascii,            // ASCII banner string (optional)
  meta = [],        // [{ k, v, c }]
  titleJp,          // Japanese title
  children,
  id,
  testid,
  className = "",
}) {
  const [now, setNow] = useState(new Date());
  const [streamed, setStreamed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!bootLines.length) return;
    setStreamed(0);
    const id = setInterval(() => setStreamed((s) => (s >= bootLines.length ? (clearInterval(id), s) : s + 1)), 120);
    return () => clearInterval(id);
  }, [bootLines]);

  const ts = now.toISOString().replace("T", " ").slice(0, 19);
  const accentColor =
    variant === "seele" ? "text-nerv-red"
    : variant === "magi" ? "text-nerv-cyan"
    : variant === "sync" ? "text-nerv-green"
    : variant === "comms" ? "text-nerv-green"
    : "text-nerv-orange";

  return (
    <section id={id} data-testid={testid} className={`term-section ${variant} ${className}`}>
      {/* Top OS chrome */}
      <div className="term-header">
        <span className={accentColor}>● NERV-OS v2.27</span>
        <span className="opacity-50">::</span>
        <span className={accentColor}>{variant.toUpperCase()}/SHELL</span>
        <span className="opacity-50">|</span>
        <span className="opacity-80">{ts}Z</span>
        <span className="opacity-50">|</span>
        <span className="text-nerv-green">● UPLINK</span>
        <span className="opacity-50">|</span>
        <span className="opacity-80">PID {String(Math.floor(Math.random()*9000)+1000)}</span>
        <span className="ml-auto opacity-60">[ACCESS A-1 // EYES ONLY]</span>
      </div>

      {/* Command prompt */}
      {prompt && (
        <div className="prompt px-3 pt-2">
          <span className="user">{prompt.user}</span>
          <span className="dim">@</span>
          <span className="host">{prompt.host}</span>
          <span className="dim">:</span>
          <span className="path">{prompt.path}</span>
          <span className="dim">$ </span>
          <span className="cmd">{prompt.cmd}</span>
        </div>
      )}

      {/* Boot stream */}
      {bootLines.length > 0 && (
        <div className="prompt px-3 pb-1 line-numbers">
          {bootLines.slice(0, streamed).map((l, i) => (
            <React.Fragment key={i}>
              <span className="ln">{String(i + 1).padStart(3, "0")}</span>
              <span dangerouslySetInnerHTML={{ __html: l }} />
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ASCII banner + JP marker */}
      {(ascii || titleJp) && (
        <div className="px-3 py-2 grid grid-cols-12 items-end gap-2 border-y border-current/20">
          {ascii && <pre className="ascii-box col-span-12 lg:col-span-8">{ascii}</pre>}
          {titleJp && (
            <div className="col-span-12 lg:col-span-4 text-right">
              <div className="font-jp text-2xl md:text-4xl text-foreground/30 tracking-[0.2em]">{titleJp}</div>
            </div>
          )}
        </div>
      )}

      {/* meta row */}
      {meta.length > 0 && (
        <div className="px-3 py-1 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-0.5 border-b border-current/20 text-[10px] tracking-widest">
          {meta.map((m, i) => (
            <div key={i} className="flex gap-1">
              <span className="opacity-50">{m.k}:</span>
              <span className={m.c || ""}>{m.v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="px-3 py-3 prompt">
        {children}
      </div>

      {/* Footer status bar */}
      <div className="term-header" style={{ borderBottom: "none", borderTop: "1px solid rgba(255,107,0,0.4)" }}>
        <span className="opacity-70">EOF</span>
        <span className="opacity-50">|</span>
        <span className={accentColor}>{prompt?.cmd ?? "READY"}</span>
        <span className="ml-auto opacity-60">RX {(Math.random()*200+200).toFixed(0)}KB / TX {(Math.random()*40+10).toFixed(0)}KB</span>
      </div>
    </section>
  );
}

// Re-usable terminal sub-sections
export function LogBlock({ lines, prefix = "[LOG]", color = "text-foreground/80" }) {
  return (
    <div className="prompt line-numbers">
      {lines.map((l, i) => (
        <React.Fragment key={i}>
          <span className="ln">{String(i + 1).padStart(3, "0")}</span>
          <span className={color}>
            <span className="text-nerv-orange opacity-70">{prefix}</span> {l}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export function CmdRunHeader({ cmd, user = "pilot-01", host = "magi", path = "~", out = [] }) {
  return (
    <div className="prompt mb-2">
      <div>
        <span className="user">{user}</span>
        <span className="dim">@</span>
        <span className="host">{host}</span>
        <span className="dim">:</span>
        <span className="path">{path}</span>
        <span className="dim">$ </span>
        <span className="cmd">{cmd}</span>
      </div>
      {out.map((l, i) => <div key={i} className="dim" dangerouslySetInnerHTML={{ __html: l }} />)}
    </div>
  );
}
