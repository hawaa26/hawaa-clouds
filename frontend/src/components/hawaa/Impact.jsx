import { MapPin, Home, Users } from "lucide-react";
import { Reveal, MaskLines } from "./Reveal";
import { Cloud } from "./Clouds";

const places = [
  { icon: Users, t: "Community centers", d: "Trusted local spaces women already visit." },
  { icon: Home, t: "Asylum centers", d: "Where need is highest and choice is lowest." },
          { icon: MapPin, t: "Local distribution points", d: "Established networks women already trust." },
];

export const Impact = () => (
  <section id="impact" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40" data-testid="impact-section">
    <Cloud tone="pink" className="drift pointer-events-none absolute -left-24 bottom-10 h-44 w-96 opacity-70" />
    <div className="relative mx-auto max-w-7xl">
      <p className="eyebrow mb-5">Community impact</p>
      <h2 className="font-display max-w-5xl text-4xl font-light leading-[1.02] sm:text-6xl">
        <MaskLines inView lines={["Where the products go,", <span key="d" className="font-display-italic text-[var(--pink-deep)]">dignity follows.</span>]} />
      </h2>
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {places.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08} className="group rounded-[2rem] border border-[var(--ink)]/10 bg-white p-8 transition-[box-shadow] duration-500 hover:shadow-[0_30px_60px_-30px_rgba(184,58,111,0.35)]">
            <p.icon className="h-6 w-6 text-[var(--blue-deep)] transition-transform duration-500 group-hover:-translate-y-1" />
            <h3 className="font-display mt-8 text-2xl">{p.t}</h3>
            <p className="mt-2 text-[15px] text-[var(--ink-soft)]">{p.d}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 grid overflow-hidden rounded-[2rem] bg-[var(--blue-soft)] md:grid-cols-2">
        <div className="p-8 sm:p-12" data-testid="funding-block">
          <p className="eyebrow !text-[var(--blue-deep)]">How it's funded</p>
          <p className="font-display mt-6 text-3xl leading-tight sm:text-4xl">Independent sponsorships and grants.</p>
          <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)]">
            Hawaa raises independent corporate sponsorships and grants to absorb the cost of eco-friendly materials, and gives 40% of every sale to vulnerable communities and neighbourhoods, so premium products reach the women and girls who need them through channels they already trust.
          </p>
        </div>
        <div className="relative min-h-[18rem]">
          <img src="/images/bundle.jpg" alt="Organic cotton period products in recycled boxes" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </Reveal>
    </div>
  </section>
);
