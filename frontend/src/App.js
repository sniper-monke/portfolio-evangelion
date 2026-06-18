import React, { useCallback, useEffect, useState } from "react";
import "@/App.css";
import Cursor from "./components/Cursor";
import Navigation from "./components/Navigation";
import HudOverlay from "./components/HudOverlay";
import BootSequence from "./components/BootSequence";
import SecretTerminal from "./components/SecretTerminal";
import HeroSection from "./sections/HeroSection";
import PersonnelSection from "./sections/PersonnelSection";
import OperationsSection from "./sections/OperationsSection";
import SkillsSection from "./sections/SkillsSection";
import { EconomicsSection, AchievementsSection, StatusSection } from "./sections/MidSections";
import { GallerySection, ContactSection } from "./sections/EndSections";
import usePersistedState from "./hooks/usePersistedState";
import useSound from "./hooks/useSound";
import {
  ThirdImpactOverlay,
  AngelDetected,
  FakeError,
  EndingScreen,
  SeeleOverlay,
  MagiLoginOverlay,
  CongratulationsOverlay,
} from "./components/Overlays";
import { InstrumentalityPage, DogPage } from "./components/HiddenPages";
import { PILOT, EPISODES, NERV_MEDIA } from "./data/portfolio";
import TitleCard from "./components/TitleCard";
import SilhouetteQuote from "./components/SilhouetteQuote";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function App() {
  const [bootDone, setBootDone] = usePersistedState("nerv_boot_done_v1", false);
  const [showBoot, setShowBoot] = useState(!bootDone);
  const [pro, setPro] = usePersistedState("nerv_pro_mode", false);
  const [sound, setSound] = usePersistedState("nerv_sound", false);
  const [unlocked, setUnlocked] = usePersistedState("nerv_unlocked", []);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [overlay, setOverlay] = useState(null); // 'third', 'seele', 'magi', 'angel', 'fake', 'ending', 'congrats'
  const [hiddenPage, setHiddenPage] = useState(null); // 'instrumentality', 'dog'
  const [konamiBuf, setKonamiBuf] = useState([]);

  const sfx = useSound(sound);

  // Apply mode class to html
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("pro-mode", pro);
    root.classList.toggle("scanlines", !pro);
  }, [pro]);

  const unlock = useCallback((key) => {
    setUnlocked((arr) => (arr.includes(key) ? arr : [...arr, key]));
  }, [setUnlocked]);

  // Dismiss keyboard when overlays open
  useEffect(() => {
    if (overlay || hiddenPage) document.activeElement?.blur();
  }, [overlay, hiddenPage]);

  // Keyboard listeners (terminal toggle, Konami, exit)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
        sfx.beep();
        return;
      }
      if (e.key === "Escape") {
        setOverlay(null);
        setHiddenPage(null);
        if (terminalOpen) setTerminalOpen(false);
      }
      setKonamiBuf((buf) => {
        const next = [...buf, e.key].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
          setOverlay("seele");
          unlock("KONAMI_UNLOCK");
          sfx.theme();
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sfx, terminalOpen, unlock]);

  // Random angel detections (every ~60s)
  useEffect(() => {
    if (pro) return;
    const i = setInterval(() => {
      if (Math.random() < 0.5) {
        setOverlay((o) => o ?? "angel");
        unlock("ANGEL_SIGHTED");
        sfx.warn(); sfx.alert();
      } else {
        setOverlay((o) => o ?? "fake");
      }
    }, 65000);
    return () => clearInterval(i);
  }, [pro, sfx, unlock]);

  const handleLogo = useCallback(() => {
    sfx.click();
    setLogoClicks((c) => {
      const n = c + 1;
      if (n >= 10) {
        setOverlay("third");
        unlock("THIRD_IMPACT");
        sfx.theme();
        return 0;
      }
      return n;
    });
  }, [sfx, unlock]);

  const handleAction = (action) => {
    if (action === "resume") {
      const a = document.createElement("a");
      a.href = PILOT.resumeUrl; a.download = "personnel_report.pdf"; a.click();
    } else if (action === "magi") setOverlay("magi");
    else if (action === "thirdimpact") setOverlay("third");
    else if (action === "seele") setOverlay("seele");
    else if (action === "instrumentality") setHiddenPage("instrumentality");
    else if (action === "congrats") setOverlay("congrats");
  };

  // Hidden Easter Eggs: keyboard "c" three times for congrats; "r" "e" "i" for rei msg
  useEffect(() => {
    const buf = { current: "" };
    const onKey = (e) => {
      if (!e.key || e.key.length !== 1) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-12);
      if (buf.current.endsWith("congratulations")) { setOverlay("congrats"); unlock("SECRET_EVA"); }
      if (buf.current.endsWith("rei")) { setOverlay("fake"); }
      if (buf.current.endsWith("asuka")) { setOverlay("angel"); }
      if (buf.current.endsWith("shinji")) { unlock("SECRET_EVA"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock, sfx]);

  if (showBoot) {
    return (
      <BootSequence
        onComplete={() => {
          setShowBoot(false);
          setBootDone(true);
        }}
        onSound={() => sound && sfx.beep()}
      />
    );
  }

  return (
    <div className="App relative min-h-screen text-foreground">
      <Cursor />
      <Navigation
        sound={sound}
        onToggleSound={() => { setSound(!sound); sfx.beep(); }}
        onLogoClick={handleLogo}
        logoClicks={logoClicks}
        onTerminalOpen={() => setTerminalOpen(true)}
      />
      <HudOverlay pro={pro} />

      <main className="pt-14 sm:pt-16 pb-14 sm:pb-16 overflow-x-hidden">
        <HeroSection onSound={sfx.click} />
        <TitleCard {...EPISODES.personnel} />
        <PersonnelSection />

        {/* Silhouette quote interlude — REI archetype */}
        <section className="px-3 md:px-4 py-6 grid grid-cols-12 gap-2" data-testid="quote-rei">
          <div className="col-span-12 lg:col-span-3">
            <div className="border border-nerv-orange/50 bg-background/60 h-full overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-nerv-orange/40 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-orange">
                <span>REF-UI/01</span><span className="opacity-60">EVA HUD</span>
              </div>
              <img src={NERV_MEDIA.fui1} alt="EVA hud reference" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-1 left-1 font-jp text-nerv-orange/60 text-xs tracking-widest">資料 ・ 01</div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <SilhouetteQuote
              fileId="VL-001 // SUBJ-00"
              codename="SUBJECT-00"
              designation="EVA-UNIT-00 // BLUE"
              variant="orange"
              figure="rei"
              quoteJp="あなたは、誰？"
              quoteEn="WHO ARE YOU?"
              footer="VOICE LOG RECOVERED FROM TEST CHAMBER // FRAGMENT 03 OF 12 // AUDIO DEGRADED"
            />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="border border-nerv-green/50 bg-background/60 h-full overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-nerv-green/40 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-green">
                <span>REF-UI/02</span><span className="opacity-60">EVA HUD</span>
              </div>
              <img src={NERV_MEDIA.fui2} alt="EVA hud reference 2" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-1 right-1 font-jp text-nerv-green/60 text-xs tracking-widest">資料 ・ 02</div>
            </div>
          </div>
        </section>

        <TitleCard {...EPISODES.operations} />
        <OperationsSection />
        <TitleCard {...EPISODES.skills} />
        <SkillsSection />

        {/* Silhouette quote interlude — ASUKA archetype */}
        <section className="px-3 md:px-4 py-6 grid grid-cols-12 gap-2" data-testid="quote-asuka">
          <div className="col-span-12 lg:col-span-7">
            <SilhouetteQuote
              fileId="VL-002 // SUBJ-02"
              codename="SUBJECT-02"
              designation="EVA-UNIT-02 // RED"
              variant="red"
              figure="asuka"
              quoteJp="あなたは誰？"
              quoteEn="WHO ARE YOU?"
              footer="VOICE LOG // FIELD CHATTER // OPERATION ROUGE // SECTOR 7"
            />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-nerv-red/50 bg-background/60 h-full overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-nerv-red/40 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-red">
                <span>REF-UI/03 :: HARMONICS</span><span className="opacity-60">ARCHIVED 2015.06</span>
              </div>
              <img src={NERV_MEDIA.harmonicsGraph} alt="harmonics graph archive" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-1 left-1 font-jp text-nerv-red/60 text-xs tracking-widest">同期 ・ テスト</div>
            </div>
          </div>
        </section>

        <TitleCard {...EPISODES.economics} />
        <EconomicsSection />
        <TitleCard {...EPISODES.achievements} />
        <AchievementsSection unlocked={unlocked} />
        <TitleCard {...EPISODES.gallery} />
        <GallerySection />

        {/* Silhouette quote interlude — SHINJI archetype */}
        <section className="px-3 md:px-4 py-6 grid grid-cols-12 gap-2" data-testid="quote-shinji">
          <div className="col-span-12 lg:col-span-5">
            <div className="border border-nerv-green/50 bg-background/60 h-full overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-nerv-green/40 px-2 py-1 text-[10px] tracking-widest font-mono text-nerv-green">
                <span>REF-UI/04 :: MAGI</span><span className="opacity-60">DELIBERATION</span>
              </div>
              <img src={NERV_MEDIA.magiDeliberation} alt="MAGI deliberation reference" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-1 left-1 font-jp text-nerv-green/60 text-xs tracking-widest">承認 ・ 否定</div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <SilhouetteQuote
              fileId="VL-003 // SUBJ-01"
              codename="SUBJECT-01"
              designation="EVA-UNIT-01 // VIOLET"
              variant="green"
              figure="shinji"
              quoteJp="僕は、ここにいる。"
              quoteEn="I AM HERE."
              footer="INTERNAL MONOLOGUE // ENTRY PLUG // FILTERED FROM PSYCHOGRAPHIC TELEMETRY"
            />
          </div>
        </section>

        <TitleCard {...EPISODES.status} />
        <StatusSection />
        <TitleCard {...EPISODES.contact} />
        <ContactSection />

        <section className="px-3 md:px-6 py-12" data-testid="session-end">
          <div className="border-2 border-nerv-orange/60 bg-background/60 relative">
            <div className="hazard-stripe h-2" />
            <div className="text-center py-8">
              <div className="text-[10px] mono-tag text-nerv-orange/80">END OF FILE // ARCHIVE COMPLETE</div>
              <div className="display-stretch text-2xl md:text-4xl text-foreground mt-1">THANK YOU FOR VISITING THE NERV ARCHIVES.</div>
              <div className="mt-2 text-[10px] font-mono tracking-widest text-foreground/60">SESSION ID :: 0xA7F3-91 // {new Date().toUTCString().slice(5, 25)} UTC</div>
              <button onClick={() => setOverlay("ending")} data-testid="terminate-session" data-cursor="hover" className="mt-4 label-box border-nerv-red text-nerv-red hover:bg-nerv-red hover:text-background px-3 py-1">▣ TERMINATE SESSION</button>
              <div className="mt-4 text-[10px] font-mono tracking-widest text-foreground/40">
                ＮＥＲＶ © {new Date().getFullYear()} :: PILOT-01 :: PRESS ~ FOR HIDDEN TERMINAL :: KONAMI CODE ACTIVE
              </div>
            </div>
            <div className="hazard-stripe h-2" />
          </div>
        </section>
      </main>

      <SecretTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} onUnlock={unlock} onAction={handleAction} />

      {overlay === "third" && <ThirdImpactOverlay onClose={() => setOverlay(null)} />}
      {overlay === "angel" && <AngelDetected onClose={() => setOverlay(null)} />}
      {overlay === "fake" && <FakeError onClose={() => setOverlay(null)} />}
      {overlay === "ending" && <EndingScreen onClose={() => setOverlay(null)} />}
      {overlay === "seele" && <SeeleOverlay onClose={() => setOverlay(null)} />}
      {overlay === "magi" && <MagiLoginOverlay onClose={() => setOverlay(null)} />}
      {overlay === "congrats" && <CongratulationsOverlay onClose={() => setOverlay(null)} />}

      {hiddenPage === "instrumentality" && <InstrumentalityPage onClose={() => setHiddenPage(null)} />}
      {hiddenPage === "dog" && <DogPage onClose={() => setHiddenPage(null)} />}

      {/* Hidden chair reference */}
      <div className="fixed bottom-14 right-2 text-[9px] text-foreground/15 font-mono pointer-events-none select-none hidden md:block">
        // [shinji's chair: still here]
      </div>
    </div>
  );
}
