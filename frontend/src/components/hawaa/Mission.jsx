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
        <Reveal delay={0.15} className="mt-14 flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--pink)] font-display text-xl text-white">AR</span>
          <div>
            <p className="font-semibold">Amena Rahjo</p>
            <p className="text-sm text-[var(--ink-soft)]">Founder, Hawaa</p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <blockquote className="font-display max-w-3xl text-2xl font-light leading-[1.3] sm:text-3xl" data-testid="founder-quote">
            "Hawaa is also the name of my niece. Her birth marked a new generation in our family and a chance to do things better. I want her to grow up in a world where she can live her life to the fullest, <span className="font-display-italic text-[var(--pink-deep)]">as a girl and as a woman.</span>"
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};
