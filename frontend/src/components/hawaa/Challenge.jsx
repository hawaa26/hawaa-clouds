import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-5">The challenge</p>
          <h2 className="font-display max-w-3xl text-4xl font-light leading-[1.02] sm:text-6xl">
            Period poverty is a <span className="font-display-italic text-[var(--pink-deep)]">local</span> crisis.
          </h2>
        </div>
        <p className="max-w-sm text-base text-[var(--ink-soft)]">Sources: Opinium &amp; Neighborhood Feminists, 2024.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[var(--blue-deep)] text-white" testid="stat-afford">
          <p className="eyebrow !text-[var(--pink)]">Netherlands</p>
          <div>
            <p className="font-display text-7xl font-light leading-none sm:text-8xl"><Count to={25} /></p>
            <p className="mt-4 text-lg text-white/85">could not afford period products, or struggled to.</p>
          </div>
        </Card>
        <Card className="bg-[var(--blue-soft)]" delay={0.05} testid="stat-unsafe">
          <p className="eyebrow !text-[var(--blue-deep)]">Unsafe alternatives</p>
          <div>
            <p className="font-display text-7xl font-light sm:text-8xl"><Count to={21} /></p>
            <p className="mt-4 text-lg text-[var(--ink-soft)]">used unsafe alternatives instead.</p>
          </div>
        </Card>
        <Card className="bg-[var(--pink)]" delay={0.1} testid="stat-40">
          <p className="eyebrow !text-[var(--ink)]">The give-back</p>
          <div>
            <p className="font-display text-7xl font-light sm:text-8xl"><Count to={40} /></p>
            <p className="mt-4 text-lg text-[var(--ink)]/80">of every sale is donated, as products, to women in vulnerable communities.</p>
          </div>
        </Card>
      </div>
    </div>
  </section>
);
