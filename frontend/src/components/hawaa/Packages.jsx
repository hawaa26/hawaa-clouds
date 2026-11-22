import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { scrollToId } from "../../lib/lenis";

const tiers = [
  { id: "sunrise", name: "Sunrise", size: "Up to 50 employees", tone: "bg-white", feats: ["Organic pads & tampons stocked in your office", "40% of every order gifted to communities", "Quarterly impact note"] },
  { id: "blush-sky", name: "Blush Sky", size: "50 – 250 employees", tone: "bg-[var(--pink-soft)]", featured: true, feats: ["Everything in Sunrise", "Multiple office locations", "Co-branded impact story for your team", "Named partner of a distribution point"] },
  { id: "open-heaven", name: "Open Heaven", size: "250+ employees or grants", tone: "bg-[var(--blue-soft)]", feats: ["Everything in Blush Sky", "Fund a whole neighbourhood or asylum center", "Founding partner of the Amsterdam pilot"] },
];

export const Packages = ({ onPick }) => (
  <section id="packages" className="px-5 py-20 sm:px-8 sm:py-24" data-testid="packages-section">
    <div className="mx-auto max-w-7xl">
      <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="eyebrow mb-5">For companies</p>
          <h2 className="font-display text-4xl font-light leading-[1.02] sm:text-6xl">
            Soft on your team, <span className="font-display-italic text-[var(--pink-deep)]">generous to her.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg" data-testid="community-impact">
            40% of every sale is donated as products to women in vulnerable communities — the same softness, free of charge.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-testid="stats-inline">
            <span className="rounded-full bg-[var(--blue-soft)] px-4 py-2 text-sm font-semibold text-[var(--blue-deep)]">25% could not afford period products in NL</span>
            <span className="rounded-full bg-[var(--pink-soft)] px-4 py-2 text-sm font-semibold text-[var(--pink-deep)]">21% used unsafe alternatives</span>
            <span className="rounded-full bg-[var(--pink)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">40% given back</span>
          </div>
        </div>
        <p className="max-w-md text-base leading-relaxed text-[var(--ink-soft)] md:justify-self-end md:text-lg">
          Your sponsorship stocks premium organic period care for your own team, and 40% of every package flows to women and girls in vulnerable communities and neighbourhoods.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08} className={`group relative flex flex-col rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-2 sm:p-10 ${t.tone} ${t.featured ? "ring-2 ring-[var(--pink-deep)]/40" : "border border-[var(--ink)]/10"}`}>
            <div data-testid={`package-${t.id}`} className="flex h-full flex-col">
              {t.featured && <span className="absolute right-6 top-6 rounded-full bg-[var(--ink)] px-3 py-1 text-xs font-semibold text-white">Most chosen</span>}
              <h3 className="font-display text-4xl">{t.name}</h3>
              <p className="mt-2 text-sm font-medium text-[var(--ink-soft)]">{t.size}</p>
              <p className="font-display-italic mt-8 text-2xl">Price on request</p>
              <ul className="mt-8 flex-1 space-y-3">
                {t.feats.map((f) => (
                  <li key={f} className="flex gap-3 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--pink-deep)]" />{f}</li>
                ))}
              </ul>
              <button onClick={() => { onPick?.(t.name); scrollToId("contact"); }} data-testid={`package-${t.id}-cta`}
                className="mt-10 flex items-center justify-between rounded-full bg-[var(--ink)] px-6 py-4 text-sm font-semibold text-white transition-[background-color] duration-300 hover:bg-[var(--pink-deep)]">
                Request a proposal <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
