import React, { useEffect, useState } from "react";

// Top + bottom hud bars with live diagnostics
export default function HudOverlay({ pro }) {
  const [time, setTime] = useState(new Date());
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setTime(new Date());
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const pulse = 60 + Math.round(Math.sin(tick / 4) * 6);
  const synch = (87.2 + Math.sin(tick / 7) * 0.4).toFixed(2);
  const at = (99.4 + Math.cos(tick / 5) * 0.2).toFixed(2);

  return (
    <>
      {/* bottom diagnostic strip */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-nerv-orange/60 bg-background/90 backdrop-blur-sm text-[9px] sm:text-[10px] tracking-widest font-mono">
        <div className="flex items-center justify-between px-2 sm:px-3 md:px-6 py-0.5 sm:py-1">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 overflow-hidden min-w-0">
            <span className="text-nerv-orange shrink-0">● REC</span>
            <span className="hidden sm:inline text-foreground/70 truncate">SYNC {synch}%</span>
            <span className="hidden md:inline text-foreground/70">AT-FIELD {at}%</span>
            <span className="hidden md:inline text-foreground/70 truncate">PULSE {pulse}</span>
            <span className="hidden lg:inline text-foreground/70 truncate">GEOFRONT // TOKYO-3</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-foreground/80 shrink-0">
            <span className="hidden md:inline truncate">{time.toUTCString().slice(5, 25)} UTC</span>
            <span className="text-nerv-green">{time.toLocaleTimeString("en-GB")}</span>
          </div>
        </div>
        {!pro && (
          <div className="overflow-hidden border-t border-nerv-orange/40 h-4 sm:h-5">
            <div className="animate-marquee whitespace-nowrap text-nerv-orange/80 leading-4 sm:leading-5 px-2 sm:px-3 text-[8px] sm:text-[10px]">
              NERV INTERNAL // PILOT-01 OPERATIONAL // ALL ANGEL THREATS CONTAINED // MAGI SYSTEM ONLINE // 第13使徒 接近中 // PRESS ~ FOR HIDDEN TERMINAL // KONAMI CODE ENABLED ON THIS SESSION // SOUND ONLY //
            </div>
          </div>
        )}
      </div>

      {/* corner brackets */}
      {!pro && (
        <>
          <div className="pointer-events-none fixed top-12 left-2 z-30 w-6 h-6 border-l-2 border-t-2 border-nerv-orange" />
          <div className="pointer-events-none fixed top-12 right-2 z-30 w-6 h-6 border-r-2 border-t-2 border-nerv-orange" />
          <div className="pointer-events-none fixed bottom-12 left-2 z-30 w-6 h-6 border-l-2 border-b-2 border-nerv-orange" />
          <div className="pointer-events-none fixed bottom-12 right-2 z-30 w-6 h-6 border-r-2 border-b-2 border-nerv-orange" />
        </>
      )}
    </>
  );
}
