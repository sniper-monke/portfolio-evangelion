import React, { useState } from "react";
import { ART_GALLERY, PILOT, NERV_MEDIA } from "../data/portfolio";
import TerminalScreen, { CmdRunHeader } from "../components/TerminalScreen";

export function GallerySection() {
  const [active, setActive] = useState(null);
  return (
    <TerminalScreen
      id="gallery"
      testid="gallery-section"
      variant="nerv"
      prompt={{ user: "pilot-01", host: "nerv-os", path: "/nerv/visual", cmd: "ls ./gallery/ | xargs -n1 file" }}
      bootLines={[
        `<span class='ok'>[OK]</span> indexing ${ART_GALLERY.length} assets`,
        "<span class='ok'>[OK]</span> exif scrub ▸ done",
      ]}
      titleJp="美術资料"
      meta={[
        { k: "ASSETS", v: ART_GALLERY.length.toString().padStart(2,"0") },
        { k: "FORMAT", v: "JPG/PNG" },
        { k: "MEDIA",  v: "35mm/DIGITAL" },
        { k: "INDEXED", v: "2025-Q4" },
      ]}
    >
      <CmdRunHeader cmd="tree ./gallery/" />
      <pre className="ascii-box text-foreground/70 leading-snug mb-2">{`./gallery/
├── art-001.jpg   "TYPO STUDY 01"
├── art-002.jpg   "GEOFRONT PRINT"
├── art-003.jpg   "STREET // 35MM"
├── art-004.jpg   "RED TERMINAL"
├── art-005.jpg   "TOKYO RAIN"
└── art-006.jpg   "GRID STUDY"`}</pre>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {ART_GALLERY.map((a, i) => (
          <button key={a.id} onClick={() => setActive(a)} data-cursor="hover" data-testid={`art-${a.id}`}
                  className="relative group border border-nerv-orange/50 hover:border-nerv-orange bg-background/60 overflow-hidden">
            <div className="flex items-center justify-between border-b border-nerv-orange/40 px-1.5 py-0.5 text-[9px] tracking-widest text-nerv-orange">
              <span>{a.id}</span><span className="text-nerv-green">● INDEXED</span>
            </div>
            <img src={a.url} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between border-t border-nerv-orange/40 px-1.5 py-0.5 text-[9px] tracking-widest">
              <span className="text-foreground/80">{a.title}</span>
              <span className="text-nerv-orange">{String(i+1).padStart(2,"0")}/{ART_GALLERY.length}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2 text-[10px] text-nerv-orange tracking-widest">// {ART_GALLERY.length} files ── chksum verified ── exif scrubbed</div>

      {active && (
        <div className="fixed inset-0 z-[200] bg-background/95 p-1 sm:p-3 grid place-items-center" onClick={() => setActive(null)}>
          <div className="max-w-4xl w-full border-2 border-nerv-orange p-1 sm:p-2 bg-background mx-1 sm:mx-0" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.title} className="w-full max-h-[75vh] sm:max-h-[80vh] object-contain border border-nerv-orange/40" />
            <div className="flex justify-between items-center mt-1 text-[9px] sm:text-[10px] tracking-widest text-nerv-orange px-1">
              <span className="truncate">FILE {active.id} :: {active.title}</span>
              <button onClick={() => setActive(null)} className="text-nerv-red shrink-0 px-2 py-1">[X] CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </TerminalScreen>
  );
}

export function ContactSection() {
  const [lines, setLines] = useState([
    "<span class='ok'>[OK]</span> connecting to nerv comms relay...",
    "<span class='ok'>[OK]</span> handshake ▸ AES-256-GCM ▸ pipe 0x42",
    "<span class='ok'>[OK]</span> channel open ▸ awaiting payload",
  ]);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    setLines((l) => [...l, `<span class='warn'>[TX]</span> transmitting packet ▸ from=${name.toUpperCase()}`]);
    try {
      const fd = new FormData();
      fd.append("access_key", "REPLACE_WITH_WEB3FORMS_KEY");
      fd.append("name", name); fd.append("email", email); fd.append("message", message);
      fd.append("subject", "NERV ARCHIVE — Transmission");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd }).catch(() => {});
    } catch {}
    setTimeout(() => {
      setLines((l) => [...l,
        "<span class='ok'>[RX]</span> packet received ▸ checksum OK",
        "<span class='ok'>[OK]</span> relaying to PILOT-01...",
        "<span class='ok'>[OK]</span> transmission complete ▸ stand by for response",
      ]);
      setName(""); setEmail(""); setMessage(""); setSending(false);
    }, 900);
  };

  return (
    <TerminalScreen
      id="contact"
      testid="contact-section"
      variant="comms"
      prompt={{ user: "operator", host: "magi-comms", path: "/var/comms", cmd: "open-channel --to=pilot-01 --encrypt" }}
      bootLines={[]}
      titleJp="通信端末"
      meta={[
        { k: "ENC",    v: "AES-256-GCM" },
        { k: "PIPE",   v: "0x42" },
        { k: "RELAY",  v: "WEB3FORMS" },
        { k: "STATE",  v: "OPEN", c: "text-nerv-green" },
      ]}
    >
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-6">
          <CmdRunHeader cmd="watch -n0.5 'tail ./comms.log'" />
          <div className="crt-screen border border-nerv-green/40 p-2 min-h-[260px] text-nerv-green text-glow-green">
            <div className="prompt line-numbers">
              {lines.map((l, i) => (
                <React.Fragment key={i}>
                  <span className="ln">{String(i+1).padStart(3, "0")}</span>
                  <span dangerouslySetInnerHTML={{ __html: l }} />
                </React.Fragment>
              ))}
            </div>
            <div className="caret"> </div>
          </div>
        </div>

          <form onSubmit={submit} className="col-span-12 md:col-span-6 space-y-2">
            <CmdRunHeader cmd="compose --interactive" />
            <label className="block">
              <span className="text-[10px] text-nerv-orange tracking-widest">[01] SENDER ID ▸</span>
              <input data-testid="contact-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="ENTER FULL DESIGNATION"
                className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2.5 sm:p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30" />
            </label>
            <label className="block">
              <span className="text-[10px] text-nerv-orange tracking-widest">[02] RETURN FREQUENCY ▸</span>
              <input data-testid="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@frequency.net"
                className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2.5 sm:p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30" />
            </label>
            <label className="block">
              <span className="text-[10px] text-nerv-orange tracking-widest">[03] MESSAGE PAYLOAD ▸</span>
              <textarea data-testid="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="> ENTER TRANSMISSION..."
                className="w-full bg-black border border-nerv-orange/40 focus:border-nerv-orange p-2.5 sm:p-2 font-mono text-sm outline-none text-nerv-orange placeholder:text-foreground/30 min-h-[140px]" />
            </label>
            <button type="submit" disabled={sending} data-testid="contact-submit"
                    className="w-full pill border-nerv-red text-nerv-red hover:bg-nerv-red hover:text-background disabled:opacity-50 py-3 sm:py-2 text-xs">
              {sending ? "▶ TRANSMITTING..." : "▲ TRANSMIT PACKET"}
            </button>
          </form>

        <div className="col-span-12">
          <CmdRunHeader cmd="ls ./wires/" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px] tracking-widest">
            <a href={PILOT.socials.github} target="_blank" rel="noreferrer" className="pill text-foreground hover:bg-foreground hover:text-background py-2 sm:py-0 text-center">▸ GITHUB</a>
            <a href={PILOT.socials.linkedin} target="_blank" rel="noreferrer" className="pill text-foreground hover:bg-foreground hover:text-background py-2 sm:py-0 text-center">▸ LINKEDIN</a>
            <a href={PILOT.socials.twitter} target="_blank" rel="noreferrer" className="pill text-foreground hover:bg-foreground hover:text-background py-2 sm:py-0 text-center">▸ TWITTER</a>
            <a href={`mailto:${PILOT.socials.email}`} className="pill text-nerv-orange border-nerv-orange hover:bg-nerv-orange hover:text-background py-2 sm:py-0 text-center truncate">▸ {PILOT.socials.email}</a>
          </div>
        </div>
      </div>

      <div className="mt-3 hazard-stripe h-2" />
      <div className="mt-2 text-[10px] text-nerv-green tracking-widest">// channel closed at <span className="opacity-60">XX:XX:XXZ</span> ── all packets ACK'd</div>
    </TerminalScreen>
  );
}
