import React, { useEffect, useRef, useState } from "react";

export function ThirdImpactOverlay({ onClose }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(() => onClose(), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[300] grid place-items-center bg-nerv-red text-background animate-flicker overflow-hidden" data-testid="third-impact">
      <div className="text-center font-stamp px-4">
        <div className="text-xs md:text-sm tracking-[0.6em] mb-3">EMERGENCY OVERRIDE</div>
        <div className="display-stretch text-6xl md:text-9xl">THIRD IMPACT</div>
        <div className="text-xs md:text-sm tracking-[0.6em] mt-3">{phase >= 1 ? "INITIATED" : "PENDING"}</div>
        {phase >= 2 && (
          <div className="font-mono text-xs md:text-sm mt-6 max-w-md mx-auto">
            「全ては始まりの場所へ」<br />
            ALL SOULS TO THE PLACE OF BEGINNING
          </div>
        )}
      </div>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    </div>
  );
}

export function AngelDetected({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed top-20 right-3 z-[180] border-2 border-nerv-red bg-background/95 p-3 max-w-xs animate-flicker shadow-[0_0_18px_#FF3030]" data-testid="angel-popup">
      <div className="text-[10px] tracking-widest text-nerv-red text-glow-red font-stamp">⚠ WARNING</div>
      <div className="font-display text-xl text-foreground">ANGEL DETECTED</div>
      <div className="text-[11px] text-foreground/80 mt-1">PATTERN BLUE // SECTOR A-17 // ALL PILOTS TO STATIONS</div>
      <div className="h-1 bg-nerv-red/30 mt-2"><div className="h-full bg-nerv-red animate-pulse w-full" /></div>
    </div>
  );
}

export function FakeError({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-20 left-3 z-[180] border-2 border-nerv-yellow bg-background/95 p-3 max-w-sm font-mono text-xs" data-testid="fake-error">
      <div className="text-nerv-yellow tracking-widest">[SYS-WARN]</div>
      <div className="text-foreground">MAGI/MELCHIOR returned anomaly: 0x7F-INSTRUMENTAL_DRIFT</div>
      <div className="text-foreground/60 mt-1">Auto-recovery in progress... (this is fine.)</div>
    </div>
  );
}

export function EndingScreen({ onClose }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1600);
    const t2 = setTimeout(() => setStage(2), 3400);
    const t3 = setTimeout(() => setStage(3), 5400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div className="fixed inset-0 z-[400] bg-black flex items-center justify-center text-center text-nerv-text px-4" data-testid="ending-screen">
      <div>
        {stage >= 0 && (
          <div className="font-display text-xl sm:text-2xl md:text-4xl tracking-tight">Thank you for visiting the NERV archives.</div>
        )}
        {stage >= 1 && (
          <div className="mt-6 sm:mt-8 display-stretch text-3xl sm:text-4xl md:text-6xl text-nerv-orange text-glow-orange">SESSION TERMINATED.</div>
        )}
        {stage >= 2 && (
          <div className="mt-3 font-stamp tracking-[0.6em] text-nerv-red text-glow-red">SEE YOU AGAIN.</div>
        )}
        {stage >= 3 && (
          <button onClick={onClose} className="mt-8 sm:mt-10 border-2 border-nerv-orange text-nerv-orange px-6 py-3 sm:px-4 sm:py-1.5 text-xs tracking-widest hover:bg-nerv-orange hover:text-background" data-testid="ending-close">
            REOPEN ARCHIVE
          </button>
        )}
      </div>
    </div>
  );
}

export function SeeleOverlay({ onClose }) {
  const audioRef = useRef(null);
  const [heights] = useState(() =>
    Array.from({ length: 12 }, () => 100 + Math.random() * 60)
  );
  useEffect(() => {
    const audio = new Audio("sounds/decisive-battle.mp3");
    audio.volume = 0.2;
    audio.loop = true;
    audio.play().catch(() => {});
    audioRef.current = audio;
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);
  return (
    <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center px-2" data-testid="seele-overlay">
      <button onClick={() => { onClose(); }} className="absolute top-3 right-3 text-nerv-orange border border-nerv-orange/60 px-3 py-2 sm:px-2 sm:py-1 text-xs tracking-widest z-10">CLOSE</button>
      <div className="text-center w-full max-w-lg">
        <div className="text-[10px] tracking-[0.8em] text-foreground/60 mb-3 sm:mb-6">SOUND ONLY</div>
        <div className="flex items-end justify-center gap-1 sm:gap-2 mb-4 sm:mb-8 overflow-x-auto px-1">
          {heights.map((h, i) => (
            <div key={i} className="w-6 sm:w-12 bg-nerv-red text-background font-stamp text-center grid place-items-center border-2 border-nerv-red shrink-0" style={{ height: h }}>
              <span className="text-[8px] sm:text-sm">{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
        <div className="display-stretch text-3xl sm:text-4xl md:text-6xl text-nerv-red text-glow-red">SEELE OVERRIDE</div>
        <div className="font-mono text-[10px] sm:text-xs tracking-widest text-foreground/60 mt-2 sm:mt-3">COMMITTEE OF 12 // CONVENED</div>
      </div>
    </div>
  );
}

export function MagiLoginOverlay({ onClose }) {
  const [stage, setStage] = useState(0);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center px-2" data-testid="magi-overlay">
      <button onClick={onClose} className="absolute top-3 right-3 text-nerv-green border border-nerv-green/60 px-3 py-2 sm:px-2 sm:py-1 text-xs tracking-widest z-10">CLOSE</button>
      <div className="border-2 border-nerv-green text-nerv-green text-glow-green p-4 sm:p-6 font-mono w-full max-w-md mx-2">
        <div className="text-xs tracking-[0.4em] border-b border-nerv-green/40 pb-2 mb-4">MAGI :: ROOT LOGIN</div>
        {stage === 0 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStage(1); setTimeout(onClose, 2400); }} className="space-y-4 text-sm">
            <div>
              <div className="text-[10px] tracking-widest mb-1">OPERATOR</div>
              <input value={user} onChange={(e) => setUser(e.target.value)} className="w-full bg-transparent border border-nerv-green/40 p-2.5 sm:p-1 outline-none focus:border-nerv-green" placeholder="dr.ikari" />
            </div>
            <div>
              <div className="text-[10px] tracking-widest mb-1">KEY</div>
              <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" className="w-full bg-transparent border border-nerv-green/40 p-2.5 sm:p-1 outline-none focus:border-nerv-green" placeholder="●●●●●●●●" />
            </div>
            <button className="w-full border border-nerv-green hover:bg-nerv-green hover:text-background text-xs sm:text-[11px] tracking-widest py-3 sm:py-1">AUTHENTICATE</button>
          </form>
        ) : (
          <div className="text-xs space-y-1">
            <div>VERIFYING IDENTITY...</div>
            <div>CHECKING CASPAR / MELCHIOR / BALTHASAR...</div>
            <div className="text-nerv-orange">ACCESS DENIED.</div>
            <div className="text-foreground/60">- WHAT WERE YOU EXPECTING, PILOT?</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CongratulationsOverlay({ onClose }) {
  const playerRef = useRef(null);
  const fadeRef = useRef(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    let player = null;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    let first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(tag, first);

    const onReady = () => {
      player = new YT.Player("yt-player-congrats", {
        height: "0",
        width: "0",
        videoId: "oyFQVZ2h0V8",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            try { e.target.setVolume(0); } catch {}
            try { e.target.playVideo(); } catch {}
            const steps = 50;
            let i = 0;
            const fade = setInterval(() => {
              if (!aliveRef.current) { clearInterval(fade); return; }
              i++;
              try { e.target.setVolume(Math.min(100, Math.round((i / steps) * 100))); } catch {}
              if (i >= steps) clearInterval(fade);
            }, 100);
            fadeRef.current = fade;
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) {
              try { e.target.stopVideo(); } catch {}
            }
          },
        },
      });
      playerRef.current = player;
    };

    let prevOnReady = window.onYouTubeIframeAPIReady;
    window.YT ? onReady() : (window.onYouTubeIframeAPIReady = onReady);

    return () => {
      aliveRef.current = false;
      if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; }
      if (player && player.destroy) player.destroy();
      playerRef.current = null;
      if (prevOnReady) window.onYouTubeIframeAPIReady = prevOnReady;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center overflow-hidden" data-testid="congrats-overlay">
      <button onClick={onClose} className="absolute top-3 right-3 text-nerv-orange border border-nerv-orange/60 px-3 py-2 sm:px-2 sm:py-1 text-xs tracking-widest z-10">CLOSE</button>
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <img
          src="ayanami.png"
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />
      <div id="yt-player-congrats" className="absolute w-0 h-0 overflow-hidden" />
      <div className="relative text-center px-4 sm:px-6 z-10">
        <div className="display-stretch text-2xl sm:text-3xl md:text-5xl text-nerv-orange text-glow-orange">おめでとう。</div>
        <div className="font-stamp tracking-[0.3em] sm:tracking-[0.5em] text-foreground/80 mt-2 sm:mt-3">CONGRATULATIONS.</div>
        <div className="font-mono text-[10px] sm:text-[11px] text-foreground/50 mt-3 sm:mt-4">- to all the children -</div>
      </div>
    </div>
  );
}
