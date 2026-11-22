import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    <section id="mission" className="relative px-5 py-20 sm:px-8 sm:py-24" data-testid="mission-section">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-8">The name &amp; the meaning</p>
        <p ref={ref} className="font-display max-w-4xl text-3xl font-light leading-[1.15] sm:text-4xl lg:text-[3.2rem]" data-testid="mission-manifesto">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg" data-testid="mission-text">
          Hawaa embeds premium organic cotton menstrual care into the trusted networks already serving vulnerable women and girls in the Netherlands, so a low income never forces a choice between her budget, her body and the planet.
        </p>
      </div>
    </section>
  );
};
