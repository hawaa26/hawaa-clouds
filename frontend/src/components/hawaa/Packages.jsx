import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { scrollToId } from "../../lib/lenis";

const tiers = [
  { id: "seedling", name: "Seedling", size: "Up to 50 employees", tone: "bg-white", feats: ["Organic pads & tampons stocked in your office", "Every pack matched 1:1 in a community", "Quarterly impact note"] },
  { id: "cumulus", name: "Cumulus", size: "50 – 250 employees", tone: "bg-[var(--pink-soft)]", featured: true, feats: ["Everything in Seedling", "Multiple office locations", "Co-branded impact story for your team", "Named partner of a distribution point"] },
  { id: "open-sky", name: "Open Sky", size: "250+ employees or grants", tone: "bg-[var(--blue-soft)]", feats: ["Everything in Cumulus", "Fund a whole neighbourhood or asylum center", "Founding partner of the Amsterdam pilot"] },
];

export const Packages = ({ onPick }) => (
  <section id="packages" className="px-5 py-28 sm:px-8 sm:py-40" data-testid="packages-section">
    <div className="mx-auto max-w-7xl">
      <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="eyebrow mb-5">For companies</p>
          <h2 className="font-display text-4xl font-light leading-[1.02] sm:text-6xl">
            Buy one, gift one, <span className="font-display-italic text-[var(--pink-deep)]">at work.</span>
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-[var(--ink-soft)] md:justify-self-end md:text-lg">
          Your sponsorship stocks premium organic period care for your own team and funds the same standard of care for women and girls who cannot afford it.
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
