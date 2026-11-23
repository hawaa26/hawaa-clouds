import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { MaskLines } from "./Reveal";
import { scrollToId } from "../../lib/lenis";



export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden" data-testid="hero-section">
      <motion.img src="/images/sky.jpg" alt="Soft pink and blue sky with marshmallow clouds"
        className="absolute inset-0 h-full w-full object-cover" style={{ scale: bgScale }}
        initial={{ opacity: 0, filter: "blur(18px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.6 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#cfe6f7]/60 via-transparent to-[var(--cream)]" />

      <motion.div style={{ y: textY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
        <motion.p className="eyebrow mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          Ending period poverty · The Netherlands
        </motion.p>
        <h1 className="font-display text-[15vw] font-light leading-[0.88] text-[var(--ink)] sm:text-[11vw] lg:text-[8.6rem]" data-testid="hero-title">
          <MaskLines delay={0.35} lines={[
            "Period care,",
            "soft as a cloud.",
            <span key="c" className="text-[var(--blue-deep)]">For every woman.</span>,
          ]} />
        </h1>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p className="max-w-md text-base leading-relaxed text-[var(--ink)] md:text-lg"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}>
            Corporates sponsor organic, GOTS-certified cotton tampons and pads for their teams, and 30% of every order is donated as products to women and girls in vulnerable communities and neighbourhoods.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9 }}>
            <button onClick={() => scrollToId("contact")} data-testid="hero-sponsor-btn"
              className="group flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]">
              Become a sponsor <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" />
            </button>
            <Link to="/shop" data-testid="hero-shop-btn"
              className="group flex items-center gap-2 rounded-full bg-white/80 px-6 py-4 text-sm font-semibold backdrop-blur transition-transform duration-300 hover:scale-[1.04]">
              30% goes to her <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute right-6 top-28 z-10 hidden h-28 w-28 sm:block">
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
          <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
          <text className="fill-[var(--ink)] text-[9.5px] font-semibold uppercase tracking-[0.3em]"><textPath href="#circ">organic cotton · GOTS · </textPath></text>
        </svg>
      </div>
    </section>
  );
};
