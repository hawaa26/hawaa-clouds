import { Reveal } from "./Reveal";

export const Founder = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-[var(--blue)] via-[var(--blue-soft)] to-[var(--pink)] px-5 py-20 sm:px-8 sm:py-24" data-testid="founder-section">
    <div className="relative mx-auto max-w-5xl">
      <span className="font-display-italic block text-[10rem] leading-[0.5] text-white sm:text-[14rem]" aria-hidden="true">“</span>
      <Reveal>
        <blockquote className="font-display text-3xl font-light leading-[1.2] sm:text-5xl" data-testid="founder-quote">
          I want her to grow up in a world where she can live her life to the fullest, <span className="font-display-italic text-[var(--pink-deep)]">as a girl and as a woman.</span>
        </blockquote>
      </Reveal>
      <Reveal delay={0.15} className="mt-12 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white font-display text-xl">AR</span>
        <div>
          <p className="font-semibold">Amena Rahjo</p>
          <p className="text-sm text-[var(--ink-soft)]">Founder, Hawaa</p>
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mt-10">
        <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-soft)]">
          Hawaa is named after my niece — a new generation, and a chance to do things better.
        </p>
      </Reveal>
    </div>
  </section>
);
