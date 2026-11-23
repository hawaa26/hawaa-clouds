import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";
import { useDonate } from "./DonateDialog";

export const Footer = () => {
  const { openDonate } = useDonate();
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[var(--blue-soft)] via-[var(--pink-soft)] to-[var(--pink)] px-5 pb-10 pt-24 text-[var(--ink)] sm:px-8" data-testid="site-footer">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <LogoMark className="h-12 w-12 rounded-2xl" />
            <p className="mt-6 max-w-xs text-[15px] text-[var(--ink-soft)]">Period care is a basic need. Hawaa makes it a given, wherever women are.</p>
          </div>
          <div className="space-y-3 text-[15px]">
            <Link to="/shop" className="block hover:text-[var(--pink-deep)]" data-testid="footer-shop-link">Shop: 30% goes to communities</Link>
            <button onClick={openDonate} className="block hover:text-[var(--pink-deep)]" data-testid="footer-donate-btn">Make a donation</button>
            <Link to="/admin" className="block text-[var(--ink-soft)] hover:text-[var(--ink)]" data-testid="footer-admin-link">Team login</Link>
          </div>
          <p className="text-sm text-[var(--ink-soft)]">Funded by independent corporate sponsorships and grants. KVK 42226651.</p>
        </div>
        <p className="font-display mt-20 select-none text-[24vw] font-light leading-[0.8] text-[var(--pink-deep)]/70" aria-hidden="true">hawaa</p>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-[var(--pink-deep)]/15 pt-6 text-xs text-[var(--ink-soft)] sm:flex-row">
          <span>© 2026 Hawaa. Amsterdam, the Netherlands. KVK 42226651.</span>
          <span>Hawaa is life.</span>
        </div>
      </div>
    </footer>
  );
};
