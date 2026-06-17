import React from "react";

export function InstrumentalityPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-[250] overflow-y-auto bg-background" data-testid="instrumentality-page">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button onClick={onClose} data-testid="instrumentality-close" className="border-2 border-nerv-orange text-nerv-orange px-3 py-1 text-xs tracking-widest mb-6 hover:bg-nerv-orange hover:text-background">
          ← BACK TO ARCHIVE
        </button>
        <div className="text-[10px] tracking-[0.4em] text-nerv-red text-glow-red">CLASSIFIED THESIS // SEELE EYES ONLY</div>
        <h1 className="display-stretch text-5xl md:text-7xl text-nerv-orange text-glow-orange mt-2">HUMAN INSTRUMENTALITY PROJECT</h1>
        <div className="font-mono text-[11px] tracking-widest text-foreground/60 mt-2">A working paper on coordination, mechanism design, and the limits of equilibria.</div>

        <div className="prose prose-invert max-w-none mt-8 space-y-5 font-mono text-[13px] leading-relaxed">
          <p><span className="text-nerv-orange">§1. PRELIMINARY.</span> Every collective is held together by a thin film of common knowledge. We coordinate on prices, queues, language, and laws — fictions stable enough to bear weight. The Instrumentality question is whether we could ever build a society where those fictions are explicit, computable, and contestable.</p>
          <p><span className="text-nerv-orange">§2. EQUILIBRIA AS UI.</span> A Nash equilibrium is not an outcome; it is an <em>interface</em> through which strategic agents look at each other. Markets are equilibria with prices as their visible affordance. Treat institutions as user interfaces and the question becomes design, not destiny.</p>
          <p><span className="text-nerv-orange">§3. MECHANISM DESIGN AS PUBLIC POLICY.</span> From Vickrey auctions to deferred-acceptance matching, the great policy ideas of the last fifty years were UX problems framed as proofs. The next frontier — climate, AI, redistribution — will be no different.</p>
          <p><span className="text-nerv-orange">§4. INFORMATION WANTS A PRICE.</span> Marginal cost of information is zero, but marginal cost of <em>attention</em> is not. The economics of the 21st century is the economics of curated bounded rationality.</p>
          <p><span className="text-nerv-orange">§5. SYSTEMS THINKING.</span> Donella Meadows's leverage points stack the same way Bellman equations stack: small, well-placed perturbations at the boundary propagate through the entire state space. Look for hinges, not hammers.</p>
          <p><span className="text-nerv-orange">§6. GAME-THEORETIC LIMIT.</span> Instrumentality fails the same place game theory fails: in the presence of empathy, sacrifice, and refusal. The math cannot price what it cannot model.</p>
          <p><span className="text-nerv-orange">§7. CONCLUSION.</span> A pilot reaching for the world is no different from a market reaching for equilibrium. Both are best when partial, plural, and personal.</p>
        </div>

        <div className="mt-10 border-2 border-dashed border-nerv-red/60 p-4 text-[11px] font-mono text-foreground/70">
          DRAFT v0.3 — Submitted to the imagined Ad-Hoc Committee. Critique welcomed via the CONTACT TERMINAL.
        </div>
      </div>
    </div>
  );
}

export function DogPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-[250] bg-background grid place-items-center text-center px-6" data-testid="dog-page">
      <div>
        <pre className="text-nerv-orange leading-tight text-xs md:text-sm">{`
            __
   (___()'\`;   PEN-PEN VARIANT // CLASSIFIED
   /,    /\`   "If found, return to Misato."
   \\\\"--\\\\
        `}</pre>
        <div className="font-display text-3xl md:text-4xl text-foreground mt-4">SECRET TERMINAL DOG</div>
        <div className="text-[11px] font-mono text-foreground/70 mt-2">There is always a dog. Always.</div>
        <button onClick={onClose} className="mt-6 border-2 border-nerv-orange text-nerv-orange px-3 py-1 text-xs tracking-widest hover:bg-nerv-orange hover:text-background">RELEASE</button>
      </div>
    </div>
  );
}
