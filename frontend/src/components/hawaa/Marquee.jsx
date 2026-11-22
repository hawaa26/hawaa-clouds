const words = [
  "organic cotton", "GOTS-certified", "Chlorine-free", "Biodegradable",
  "Community powered", "Made in Europe", "40% to communities", "Dignity, not luxury",
];

export const Marquee = () => (
  <section className="relative overflow-hidden border-y border-[var(--ink)]/10 bg-[var(--cream)] py-6" data-testid="editorial-marquee">
    <div className="marquee-track flex w-max">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {words.map((w, i) => (
            <span key={i} className="flex items-center">
              <span className={`font-display px-8 text-4xl font-light sm:text-6xl ${i % 2 ? "font-display-italic text-[var(--pink-deep)]" : "text-[var(--ink)]"}`}>{w}</span>
              <span className="h-3 w-3 rounded-full bg-[var(--blue)]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);
