import { useCallback, useRef } from "react";

// Synthesizes simple CC0-style terminal SFX using WebAudio (no external assets needed)
export default function useSound(enabled) {
  const ctxRef = useRef(null);

  const ctx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  };

  const tone = useCallback(
    (freq = 880, dur = 0.06, type = "square", vol = 0.05) => {
      if (!enabled) return;
      const ac = ctx();
      if (!ac) return;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = vol;
      o.connect(g).connect(ac.destination);
      const now = ac.currentTime;
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.start(now);
      o.stop(now + dur + 0.02);
    },
    [enabled]
  );

  const beep = useCallback(() => tone(1200, 0.04, "square", 0.04), [tone]);
  const click = useCallback(() => tone(640, 0.03, "square", 0.05), [tone]);
  const warn = useCallback(() => {
    tone(220, 0.18, "sawtooth", 0.06);
    setTimeout(() => tone(180, 0.22, "sawtooth", 0.06), 180);
  }, [tone]);
  const boot = useCallback(() => {
    tone(440, 0.08, "square", 0.04);
    setTimeout(() => tone(880, 0.08, "square", 0.04), 90);
    setTimeout(() => tone(1320, 0.12, "square", 0.04), 180);
  }, [tone]);

  return { tone, beep, click, warn, boot };
}
