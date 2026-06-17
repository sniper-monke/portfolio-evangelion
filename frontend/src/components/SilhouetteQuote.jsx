import React from "react";
import { CHARACTER_MEDIA } from "../data/portfolio";

// Character voice-log panel — animated archive feed + iconic quote block.
export default function SilhouetteQuote({
  codename,
  designation,
  fileId,
  quoteJp,
  quoteEn,
  footer,
  variant = "orange",
  figure,
  imageSrc,
  imageAlt,
}) {
  const tone =
    variant === "red" ? "border-nerv-red text-nerv-red"
    : variant === "green" ? "border-nerv-green text-nerv-green"
    : "border-nerv-orange text-nerv-orange";

  const media = imageSrc
    ? { src: imageSrc, alt: imageAlt || codename }
    : CHARACTER_MEDIA[figure] || CHARACTER_MEDIA.shinji;

  const tint =
    variant === "red" ? "from-nerv-red/50"
    : variant === "green" ? "from-nerv-green/45"
    : "from-nerv-orange/45";

  return (
    <div className={`relative border ${tone} bg-background/60`}>
      <div className={`flex items-center justify-between border-b ${tone} px-2 py-1 text-[10px] tracking-widest font-mono`}>
        <div className="flex items-center gap-2">
          <span className="hazard-stripe w-3 h-3 inline-block" />
          <span>{fileId}</span>
          <span className="opacity-50">::</span>
          <span>CHARACTER / VOICE LOG</span>
        </div>
        <span className="opacity-60">LIVE FEED</span>
      </div>

      <div className="grid grid-cols-12 gap-2 p-3 md:p-4">
        <div className="col-span-4 md:col-span-3 relative">
          <div className="aspect-[3/5] border border-current/40 bg-black relative overflow-hidden">
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${tint} via-transparent to-black/20 pointer-events-none`} />
            <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-2 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-current" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-current" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-current" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-current" />
            </div>
            <div className="absolute top-1 left-1 text-[8px] font-mono tracking-widest opacity-90 bg-black/50 px-1">
              SUBJ {codename}
            </div>
            <div className="absolute bottom-1 right-1 text-[8px] font-mono tracking-widest opacity-90 bg-black/50 px-1">
              {designation}
            </div>
            <div className="absolute top-1 right-1 flex items-center gap-1 text-[8px] font-mono tracking-widest opacity-90 bg-black/50 px-1">
              <span className="inline-block w-1.5 h-1.5 bg-nerv-red animate-pulse" />
              REC
            </div>
          </div>
        </div>

        <div className="col-span-8 md:col-span-9 flex flex-col justify-between">
          <div>
            <div className="text-[9px] font-mono tracking-[0.4em] opacity-70 mb-1">VOICE LOG // FRAGMENT</div>
            <div className="font-jp text-2xl md:text-4xl tracking-widest text-foreground/95 leading-tight">「{quoteJp}」</div>
            <div className="display-stretch text-2xl md:text-4xl mt-2">{quoteEn}</div>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-0.5 text-[9px] font-mono tracking-widest opacity-80 border-t border-current/30 pt-2">
            <div><span className="opacity-50">CODENAME:</span> <span>{codename}</span></div>
            <div><span className="opacity-50">DESIG:</span> <span>{designation}</span></div>
            <div><span className="opacity-50">SOURCE:</span> NERV/AUDIO/RAW</div>
            <div className="col-span-2 md:col-span-3 opacity-70">{footer}</div>
          </div>
        </div>
      </div>
      <span className={`absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-current`} />
      <span className={`absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-current`} />
    </div>
  );
}
