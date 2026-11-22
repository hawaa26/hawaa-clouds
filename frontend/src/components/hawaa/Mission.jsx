import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const manifesto = "Hawaa is life — the Arabic and Persian name for Eve, the first woman. It also means heaven, sky and air: a weightless comfort, so soft she forgets it's there.";

const Word = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>;
};

export const Mission = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = manifesto.split(" ");

  return (
    <section id="mission" className="relative px-5 py-28 sm:px-8 sm:py-40" data-testid="mission-section">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-10">The name &amp; the meaning</p>
        <p ref={ref} className="font-display max-w-6xl text-3xl font-light leading-[1.15] sm:text-5xl lg:text-[4.2rem]" data-testid="mission-manifesto">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>

        <div className="mt-24 grid gap-6 md:grid-cols-12">
          <Reveal className="rounded-[2rem] bg-[var(--blue-soft)] p-8 sm:p-12 md:col-span-5">
            <p className="eyebrow !text-[var(--blue-deep)]">Vision</p>
            <p className="font-display mt-6 text-2xl leading-snug sm:text-3xl" data-testid="vision-text">
              A future where menstrual equity and environmental sustainability go hand in hand, so a low income never forces a woman to choose between her budget, her body, and the planet.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-[var(--pink-soft)] p-8 sm:p-12 md:col-span-7">
            <p className="eyebrow">Mission</p>
            <p className="mt-6 text-base leading-relaxed text-[var(--ink)] md:text-lg" data-testid="mission-text">
              Hawaa embeds premium organic cotton menstrual care directly into the trusted community networks already serving vulnerable women and girls in the Netherlands. By securing independent corporate funding to absorb the cost of eco-friendly materials, we close the quality gap in aid supply, eliminate barriers to physical dignity, and ensure that a healthy body and a healthy planet are never treated as a luxury.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
