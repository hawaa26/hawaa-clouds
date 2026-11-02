import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Droplets, Recycle, BadgeCheck } from "lucide-react";
import { Reveal, MaskLines } from "./Reveal";

const feats = [
  { icon: Leaf, t: "100% organic cotton", d: "Tampons and pads, nothing synthetic." },
  { icon: BadgeCheck, t: "GOTS-certified", d: "Certified supply chains, start to finish." },
  { icon: Droplets, t: "Chlorine-free", d: "Gentle on the most sensitive skin." },
  { icon: Recycle, t: "Biodegradable", d: "Plastic-free materials, kinder to the planet." },
];

export const Product = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [140, -140]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--ink)] px-5 py-28 text-white sm:px-8 sm:py-40" data-testid="product-section">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[var(--pink)]/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto h-[30rem] w-full max-w-md sm:h-[36rem]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[78%] w-[68%] overflow-hidden rounded-t-full shadow-2xl">
            <img src="/images/pads.jpg" alt="Organic cotton pads on a cotton cloud" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-[56%] w-[52%] overflow-hidden rounded-b-full border-4 border-[var(--ink)] shadow-2xl">
            <img src="/images/tampons.jpg" alt="Organic cotton tampons on raw cotton" className="h-full w-full object-cover" />
          </motion.div>
        </div>
        <div>
          <p className="eyebrow !text-[var(--pink)]">The product</p>
          <h2 className="font-display mt-5 text-4xl font-light leading-[1.02] sm:text-6xl">
            <MaskLines inView lines={["Softer for her.", <span key="k" className="font-display-italic text-[var(--blue)]">Kinder to earth.</span>]} />
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            Sourced from established, GOTS-certified organic cotton manufacturers in Europe, including Tosama (Slovenia) and Cohitech (Spain), ensuring quality, safety, and sustainability standards.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {feats.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-500 hover:bg-white/10">
                <f.icon className="h-5 w-5 text-[var(--pink)] transition-transform duration-500 group-hover:rotate-12" />
                <p className="mt-4 font-semibold">{f.t}</p>
                <p className="mt-1 text-sm text-white/70">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
