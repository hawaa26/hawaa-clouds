import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const Count = ({ to, suffix = "%" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const Card = ({ className = "", children, delay = 0, testid }) => (
  <Reveal delay={delay} className={`flex flex-col justify-between rounded-[2rem] p-7 sm:p-9 ${className}`}>
    <div data-testid={testid} className="flex h-full flex-col justify-between gap-8">{children}</div>
  </Reveal>
);

export const Challenge = () => (
  <section className="px-5 pb-28 sm:px-8 sm:pb-40" data-testid="challenge-section">
    <div className="mx-auto max-w-7xl">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-5">The challenge &amp; opportunity</p>
          <h2 className="font-display max-w-3xl text-4xl font-light leading-[1.02] sm:text-6xl">
            Period poverty is a <span className="font-display-italic text-[var(--pink-deep)]">local</span> crisis.
          </h2>
        </div>
        <p className="max-w-sm text-base text-[var(--ink-soft)]">Sources: Opinium &amp; Neighborhood Feminists, 2024.</p>
      </div>

      <div className="grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="bg-[var(--ink)] text-white md:col-span-2 md:row-span-2" testid="stat-afford">
          <p className="eyebrow !text-[var(--pink)]">Netherlands</p>
          <div>
            <p className="font-display text-[7rem] font-light leading-none sm:text-[10rem]"><Count to={25} /></p>
            <p className="mt-4 max-w-sm text-lg text-white/85">of people who menstruate in the Netherlands could not afford period products, or struggled to.</p>
          </div>
        </Card>
        <Card className="bg-[var(--pink-soft)]" delay={0.05} testid="stat-unsafe">
          <p className="eyebrow">Unsafe alternatives</p>
          <div>
            <p className="font-display text-7xl font-light"><Count to={21} /></p>
            <p className="mt-2 text-[15px] text-[var(--ink-soft)]">used unsafe alternatives instead.</p>
          </div>
        </Card>
        <Card className="bg-[var(--blue-soft)]" delay={0.1} testid="stat-amsterdam">
          <p className="eyebrow !text-[var(--blue-deep)]">Amsterdam</p>
          <div>
            <p className="font-display text-7xl font-light"><Count to={14} /></p>
            <p className="mt-2 text-[15px] text-[var(--ink-soft)]">in 2024, down from <strong className="text-[var(--ink)]">27%</strong> in 2022, after the city funded free products.</p>
          </div>
        </Card>
        <Reveal delay={0.15} className="relative min-h-[15rem] overflow-hidden rounded-[2rem] md:col-span-1">
          <motion.img src="/images/cotton.jpg" alt="Raw organic cotton boll" whileHover={{ scale: 1.08 }} transition={{ duration: 1.2 }}
            className="absolute inset-0 h-full w-full object-cover" />
        </Reveal>
        <Card className="bg-[var(--pink)] md:col-span-2" delay={0.12} testid="stat-40">
          <p className="eyebrow !text-[var(--ink)]">The give-back</p>
          <div>
            <p className="font-display text-7xl font-light"><Count to={40} /></p>
            <p className="mt-2 max-w-sm text-[15px] text-[var(--ink)]/80">of every sale is donated to women and girls in vulnerable communities and neighbourhoods.</p>
          </div>
        </Card>
        <Card className="border border-[var(--ink)]/10 bg-white" delay={0.2} testid="stat-disparity">
          <p className="eyebrow">The organic disparity</p>
          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Free offerings are typically conventional. Organic cotton carries a premium. Women who rely on free supply have little say in what they use.
          </p>
        </Card>
      </div>
    </div>
  </section>
);
