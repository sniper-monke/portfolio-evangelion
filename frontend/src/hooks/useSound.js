import { useCallback, useEffect, useRef } from "react";

const SOUND_MAP = {
  beep: "sounds/power-disconnect.mp3",
  click: "sounds/laser.mp3",
  warn: "sounds/at-field.mp3",
  alert: "sounds/laser-explosion.mp3",
  boot: "sounds/decisive-battle.mp3",
  theme: "sounds/evangelion-theme.mp3",
  congrats: "sounds/komm-susser-tod.mp3",
};

let ctxRef = null;
const bufferCache = {};
let loadQueue = null;

function getCtx() {
  if (!ctxRef) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctxRef = new AC();
  }
  if (ctxRef.state === "suspended") ctxRef.resume();
  return ctxRef;
}

async function ensureLoaded() {
  if (loadQueue) return loadQueue;
  loadQueue = (async () => {
    const ac = getCtx();
    if (!ac) return;
    const entries = Object.entries(SOUND_MAP);
    const results = await Promise.allSettled(
      entries.map(async ([key, url]) => {
        try {
          const resp = await fetch(url);
          const arrayBuf = await resp.arrayBuffer();
          const audioBuf = await ac.decodeAudioData(arrayBuf);
          bufferCache[key] = audioBuf;
        } catch {}
      })
    );
  })();
  await loadQueue;
}

function playBuf(key, vol = 0.5, loop = false) {
  const ac = getCtx();
  if (!ac) return false;
  const buf = bufferCache[key];
  if (!buf) return false;
  try {
    const src = ac.createBufferSource();
    const gain = ac.createGain();
    src.buffer = buf;
    src.loop = loop;
    gain.gain.value = vol;
    src.connect(gain).connect(ac.destination);
    src.start(0);
    return { stop: () => { try { src.stop(); } catch {} } };
  } catch {
    return false;
  }
}

export default function useSound(enabled) {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (enabled) ensureLoaded();
  }, [enabled]);

  const beep = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("beep", 0.3);
  }, []);

  const click = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("click", 0.25);
  }, []);

  const warn = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("warn", 0.35);
  }, []);

  const alert = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("alert", 0.35);
  }, []);

  const boot = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("boot", 0.25);
  }, []);

  const theme = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("theme", 0.2);
  }, []);

  const congrats = useCallback(() => {
    if (!enabledRef.current) return;
    playBuf("congrats", 0.3);
  }, []);

  return { beep, click, warn, alert, boot, theme, congrats };
}
