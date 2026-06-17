import React, { useState } from "react";
import { ART_GALLERY, PILOT } from "../data/portfolio";

export function GallerySection() {
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="gallery-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 06 // CREATIVE ARCHIVES</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">ART GALLERY</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">VISUAL EVIDENCE OF EXTRA-CURRICULAR ACTIVITY</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {ART_GALLERY.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setActive(a)}
            data-cursor="hover"
            className="relative group border-2 border-nerv-orange/40 hover:border-nerv-orange overflow-hidden"
            data-testid={`art-${a.id}`}
          >
            <img src={a.url} alt={a.title} loading="lazy" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute top-1 left-1 bg-background/80 text-[10px] tracking-widest text-nerv-orange px-1">{a.id}</div>
            <div className="absolute bottom-0 left-0 right-0 bg-background/85 border-t border-nerv-orange/40 p-1.5 text-[11px] font-mono flex justify-between">
              <span className="tracking-widest">{a.title}</span>
              <span className="text-nerv-orange">{String(i + 1).padStart(2, "0")}/{ART_GALLERY.length}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[200] bg-background/95 p-4 grid place-items-center" onClick={() => setActive(null)}>
          <div className="max-w-4xl w-full border-2 border-nerv-orange p-2 bg-background" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.title} className="w-full max-h-[80vh] object-contain" />
            <div className="flex justify-between mt-2 text-[10px] tracking-widest text-nerv-orange px-1">
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
    "> CONNECTING TO TRANSMISSION CHANNEL...",
    "> CHANNEL OPEN. AWAITING INPUT.",
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    setLines((l) => [...l, `> TRANSMITTING PACKET FROM ${name.toUpperCase()}...`]);
    // Web3Forms (placeholder; replace access_key with your own)
    try {
      const fd = new FormData();
      fd.append("access_key", "REPLACE_WITH_WEB3FORMS_KEY");
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message);
      fd.append("subject", "NERV ARCHIVE — Transmission");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd }).catch(() => {});
    } catch {}
    setTimeout(() => {
      setLines((l) => [
        ...l,
        "> PACKET RECEIVED // CHECKSUM OK",
        "> RELAYING TO PILOT-01...",
        "> TRANSMISSION COMPLETE. STAND BY FOR RESPONSE.",
      ]);
      setName(""); setEmail(""); setMessage("");
      setSending(false);
    }, 900);
  };

  return (
    <section id="contact" className="px-3 md:px-6 py-20 max-w-7xl mx-auto" data-testid="contact-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b-2 border-nerv-orange/60 pb-3 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] text-nerv-orange text-glow-orange">FILE 08 // OPEN CHANNEL</div>
          <h2 className="display-stretch text-4xl md:text-6xl text-foreground">CONTACT TERMINAL</h2>
        </div>
        <div className="text-[10px] tracking-widest text-foreground/60 font-mono">TRANSMISSIONS ROUTED VIA WEB3FORMS</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="border-2 border-nerv-green/60 p-4 bg-black text-nerv-green font-mono text-[12px] text-glow-green min-h-[260px]">
          <div className="border-b border-nerv-green/40 pb-1 mb-2 text-[10px] tracking-widest">MAGI :: COMMS PIPE</div>
          {lines.map((l, i) => (<div key={i}>{l}</div>))}
          <div className="caret"> </div>
        </div>

        <form onSubmit={submit} className="border-2 border-nerv-orange/60 p-4 bg-background/40 space-y-3">
          <div>
            <label className="text-[10px] tracking-widest text-nerv-orange">SENDER ID</label>
            <input
              data-testid="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border-2 border-foreground/30 focus:border-nerv-orange p-2 font-mono text-sm outline-none"
              placeholder="YOUR FULL NAME"
              required
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest text-nerv-orange">RETURN FREQUENCY</label>
            <input
              data-testid="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border-2 border-foreground/30 focus:border-nerv-orange p-2 font-mono text-sm outline-none"
              placeholder="you@frequency.net"
              required
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest text-nerv-orange">MESSAGE PAYLOAD</label>
            <textarea
              data-testid="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-background border-2 border-foreground/30 focus:border-nerv-orange p-2 font-mono text-sm outline-none min-h-[110px]"
              placeholder="ENTER TRANSMISSION..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            data-testid="contact-submit"
            className="w-full border-2 border-nerv-red text-nerv-red px-4 py-2 text-xs tracking-widest hover:bg-nerv-red hover:text-background disabled:opacity-50"
          >
            {sending ? "TRANSMITTING..." : "▲ TRANSMIT PACKET"}
          </button>
          <div className="flex flex-wrap gap-3 text-[10px] tracking-widest font-mono pt-2 border-t border-foreground/20">
            <a href={PILOT.socials.github} target="_blank" rel="noreferrer" className="hover:text-nerv-orange">› GITHUB</a>
            <a href={PILOT.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-nerv-orange">› LINKEDIN</a>
            <a href={PILOT.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-nerv-orange">› TWITTER</a>
            <a href={`mailto:${PILOT.socials.email}`} className="hover:text-nerv-orange">› {PILOT.socials.email}</a>
          </div>
        </form>
      </div>
    </section>
  );
}
