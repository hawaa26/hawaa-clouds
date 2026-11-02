import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const phases = [
  { n: "01", t: "Foundation", d: "Set up & sourcing. Sampling and supplier evaluation with Tosama and Cohitech.", now: true },
  { n: "02", t: "Pilot", d: "First round of product distribution in Amsterdam with Stichting Armoedefonds." },
  { n: "03", t: "Expand", d: "Grow collaborations and corporate partnerships." },
  { n: "04", t: "National", d: "National scaling and institutional funding, towards free, sustainable care across the Netherlands." },
];

export const Roadmap = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="bg-[var(--pink-soft)] px-5 py-28 sm:px-8 sm:py-36" data-testid="roadmap-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">The pilot</p>
            <h2 className="font-display text-4xl font-light leading-[1.02] sm:text-6xl">
              Amsterdam first. <span className="font-display-italic text-[var(--blue-deep)]">Then the country.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Reveal className="rounded-[2rem] bg-white p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-soft)]">Initial capital target</p>
              <p className="font-display mt-4 text-4xl sm:text-5xl" data-testid="pilot-target">€15–20k</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">First bulk inventory order from European manufacturers.</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[2rem] bg-[var(--ink)] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/75">Funding engine</p>
              <p className="font-display mt-4 text-3xl sm:text-4xl">Buy One, Gift One</p>
              <p className="mt-2 text-sm text-white/75">Corporate sponsorship framework.</p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-[var(--ink)]/15 md:block" />
          <motion.div style={{ width: w }} className="absolute left-0 top-[10px] hidden h-[3px] rounded-full bg-[var(--pink-deep)] md:block" />
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {phases.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1} className="relative border-l-2 border-[var(--ink)]/10 pl-6 md:border-l-0 md:pl-0">
                <div data-testid={`roadmap-phase-${p.n}`}>
                  <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full md:static md:block md:h-6 md:w-6 ${p.now ? "bg-[var(--pink-deep)] ring-8 ring-[var(--pink)]" : "bg-white ring-1 ring-[var(--ink)]/20"}`} />
                  <p className="mt-0 text-xs font-semibold uppercase tracking-widest text-[var(--ink-soft)] md:mt-8">Phase {p.n}{p.now && " · Now"}</p>
                  <h3 className="font-display mt-2 text-3xl">{p.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
