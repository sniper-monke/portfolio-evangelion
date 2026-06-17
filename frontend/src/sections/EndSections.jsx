import React, { useState } from "react";
import { ART_GALLERY, PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalPanel, { SectionHeader, HazardBar } from "../components/TerminalPanel";

export function GallerySection() {
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="px-3 md:px-4 py-8" data-testid="gallery-section">
      <SectionHeader file="FILE-06/ART" title="ART ARCHIVE" sub={`${ART_GALLERY.length} ASSETS // INDEXED // SECTOR 9`} code="VIS" status="OPEN" />
      <div className="grid grid-cols-12 gap-1.5">
        <div className="col-span-12 lg:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-1.5">
          {ART_GALLERY.map((a, i) => (
            <button key={a.id} onClick={() => setActive(a)} data-testid={`art-${a.id}`} data-cursor="hover" className="relative group border border-nerv-orange/50 hover:border-nerv-orange overflow-hidden bg-background/60">
              <div className="flex items-center justify-between border-b border-nerv-orange/40 px-1.5 py-0.5 text-[9px] tracking-widest font-mono text-nerv-orange">
                <span>{a.id}</span><span className="text-nerv-green">● INDEXED</span>
              </div>
              <img src={a.url} alt={a.title} loading="lazy" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="flex items-center justify-between border-t border-nerv-orange/40 px-1.5 py-0.5 text-[9px] tracking-widest font-mono">
                <span className="text-foreground/80">{a.title}</span>
                <span className="text-nerv-orange">{String(i+1).padStart(2,"0")}/{ART_GALLERY.length}</span>
              </div>
            </button>
          ))}
        </div>
        <aside className="col-span-12 lg:col-span-3 space-y-1.5">
          <TerminalPanel file="ART-IDX" title="ARCHIVE STATS" status="OK">
            <div className="terminal-line space-y-0.5">
              <div>TOTAL ASSETS .......... {ART_GALLERY.length.toString().padStart(2,"0")}</div>
              <div>FORMATS ............... JPG/PNG</div>
              <div>MEDIA ................. 35mm/DIGITAL</div>
              <div>LAST INDEXED .......... 2025-Q4</div>
              <div className="text-nerv-green">● CHECKSUM VERIFIED</div>
            </div>
          </TerminalPanel>
          <TerminalPanel file="REF-UI/02" title="EVA UI FRAME 02" variant="white" status="ARCHIVED">
            <img src={NERV_MEDIA.fui2} alt="EVA UI archive 2" loading="lazy" className="w-full border border-foreground/30" />
          </TerminalPanel>
          <TerminalPanel file="REF-UI/03" title="EVA UI FRAME 03" variant="white" status="ARCHIVED">
            <img src={NERV_MEDIA.fui3} alt="EVA UI archive 3" loading="lazy" className="w-full border border-foreground/30" />
          </TerminalPanel>
        </aside>
      </div>

      <div className="mt-2"><HazardBar label="END OF FILE-06 // PROCEED TO FILE-07 // CURRENT OPS" /></div>

      {active && (
        <div className="fixed inset-0 z-[200] bg-background/95 p-3 grid place-items-center" onClick={() => setActive(null)}>
          <div className="max-w-4xl w-full border-2 border-nerv-orange p-2 bg-background" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.title} className="w-full max-h-[80vh] object-contain border border-nerv-orange/40" />
            <div className="flex justify-between mt-1 text-[10px] tracking-widest font-mono text-nerv-orange px-1">
              <span>FILE {active.id} // {active.title}</span>
              <button onClick={() => setActive(null)} className="text-nerv-red">CLOSE [X]</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function ContactSection() {
  const [lines, setLines] = useState([
    "&gt; CONNECTING TO TRANSMISSION CHANNEL...",
    "&gt; HANDSHAKE ▸ MAGI/COMMS PIPE ▸ OK",
    "&gt; CHANNEL OPEN. AWAITING INPUT.",
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    setLines((l) => [...l, `&gt; TRANSMITTING PACKET FROM ${name.toUpperCase()}...`]);
    try {
      const fd = new FormData();
      fd.append("access_key", "REPLACE_WITH_WEB3FORMS_KEY");
      fd.append("name", name); fd.append("email", email); fd.append("message", message);
      fd.append("subject", "NERV ARCHIVE — Transmission");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd }).catch(() => {});
    } catch {}
    setTimeout(() => {
      setLines((l) => [...l, "&gt; PACKET RECEIVED // CHECKSUM OK", "&gt; RELAYING TO PILOT-01...", "&gt; TRANSMISSION COMPLETE. STAND BY FOR RESPONSE."]);
      setName(""); setEmail(""); setMessage("");
      setSending(false);
    }, 900);
  };

  return (
    <section id="contact" className="px-3 md:px-4 py-8" data-testid="contact-section">
      <SectionHeader file="FILE-08/COMMS" title="CONTACT TERMINAL" sub="ENCRYPTED VIA WEB3FORMS // 256-BIT" code="TX" status="OPEN" />

      <div className="grid grid-cols-12 gap-1.5">
        <TerminalPanel file="MAGI/COMMS" title="LIVE TRANSMISSION LOG" variant="green" status="OPEN CHANNEL" statusColor="text-nerv-green" className="col-span-12 lg:col-span-6" meta={[{ k: "ENC", v: "AES-256" }, { k: "PIPE", v: "0x42" }]}>
          <div className="crt-screen p-2 min-h-[260px] font-mono text-[12px] text-nerv-green text-glow-green">
            {lines.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
            <div className="caret"> </div>
          </div>
        </TerminalPanel>

        <TerminalPanel file="OUTBOUND" title="COMPOSE TRANSMISSION" status="STANDBY" statusColor="text-nerv-yellow" className="col-span-12 lg:col-span-6" meta={[{ k: "FROM", v: "EXTERNAL" }, { k: "TO", v: "PILOT-01" }]}>
          <form onSubmit={submit} className="space-y-2">
            <label className="block">
              <span className="mono-tag text-nerv-orange">[01] SENDER ID</span>
              <input data-testid="contact-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="ENTER FULL DESIGNATION" className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30" />
            </label>
            <label className="block">
              <span className="mono-tag text-nerv-orange">[02] RETURN FREQUENCY</span>
              <input data-testid="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@frequency.net" className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30" />
            </label>
            <label className="block">
              <span className="mono-tag text-nerv-orange">[03] MESSAGE PAYLOAD</span>
              <textarea data-testid="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="&gt; ENTER TRANSMISSION..." className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30 min-h-[110px]" />
            </label>
            <button type="submit" disabled={sending} data-testid="contact-submit" className="w-full label-box border-nerv-red text-nerv-red hover:bg-nerv-red hover:text-background disabled:opacity-50 py-2 text-xs">
              {sending ? "▶ TRANSMITTING..." : "▲ TRANSMIT PACKET"}
            </button>
          </form>
        </TerminalPanel>

        <TerminalPanel file="WIRE" title="DIRECT WIRES" variant="white" status="LIVE" className="col-span-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-[10px] font-mono tracking-widest">
            <a href={PILOT.socials.github} target="_blank" rel="noreferrer" className="label-box border-foreground text-foreground hover:bg-foreground hover:text-background">▸ GITHUB</a>
            <a href={PILOT.socials.linkedin} target="_blank" rel="noreferrer" className="label-box border-foreground text-foreground hover:bg-foreground hover:text-background">▸ LINKEDIN</a>
            <a href={PILOT.socials.twitter} target="_blank" rel="noreferrer" className="label-box border-foreground text-foreground hover:bg-foreground hover:text-background">▸ TWITTER</a>
            <a href={`mailto:${PILOT.socials.email}`} className="label-box border-nerv-orange text-nerv-orange hover:bg-nerv-orange hover:text-background">▸ {PILOT.socials.email}</a>
          </div>
        </TerminalPanel>
      </div>
    </section>
  );
}
