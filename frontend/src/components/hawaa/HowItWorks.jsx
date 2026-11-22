import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";
import { Cloud } from "./Clouds";

const Path = ({ n, icon: Icon, title, text, tone, delay }) => (
  <Reveal delay={delay} className={`relative rounded-[2rem] p-8 sm:p-10 ${tone}`}>
    <div className="flex items-start justify-between">
      <span className="font-display text-6xl font-light text-[var(--ink)]/25">0{n}</span>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-white"><Icon className="h-5 w-5" /></span>
    </div>
    <h3 className="font-display mt-10 text-3xl sm:text-4xl">{title}</h3>
    <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">{text}</p>
  </Reveal>
);

export const HowItWorks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const clip = useTransform(scrollYProgress, [0.1, 0.45], ["inset(18% 18% 18% 18% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);

  return (
    <section id="how" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[var(--cream)] via-[var(--blue-soft)] to-[var(--cream)] px-5 py-28 sm:px-8 sm:py-40" data-testid="how-section">
      <Cloud tone="blue" className="drift pointer-events-none absolute -right-20 top-20 h-40 w-80 opacity-80" />
      <div className="relative mx-auto max-w-7xl">
        <p className="eyebrow mb-5">The Hawaa solution</p>
        <h2 className="font-display max-w-4xl text-4xl font-light leading-[1.02] sm:text-6xl">
          Period care is a basic need. Hawaa makes it a <span className="font-display-italic text-[var(--blue-deep)]">given</span>, wherever women are.
        </h2>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <div className="grid gap-5 lg:col-span-7">
            <Path n={1} icon={HeartHandshake} delay={0} tone="bg-white/80 backdrop-blur" title="In communities"
              text="40% of every sale and sponsorship funds products that Hawaa places in community centers, asylum centers and local distribution points, free for every woman and girl who needs them." />
            <Path n={2} icon={Building2} delay={0.1} tone="bg-[var(--pink-soft)]" title="In workplaces"
              text="Companies stock the same organic products in their own offices, while 40% of each order flows straight into communities that need it." />
          </div>
          <div className="relative min-h-[26rem] lg:col-span-5">
            <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <motion.img style={{ y, scale: 1.25 }} src="/images/community.jpg" alt="Women gathering in an Amsterdam community center" className="h-full w-full object-cover" />
            </motion.div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/85 p-5 backdrop-blur-xl">
              <p className="font-display text-xl leading-snug" data-testid="how-tagline">One sponsorship, one standard of care, in every place a woman's day takes her.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
