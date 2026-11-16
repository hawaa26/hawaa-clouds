import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";
import { useDonate } from "./DonateDialog";

export const Footer = () => {
  const { openDonate } = useDonate();
  return (
    <footer className="relative overflow-hidden bg-[var(--ink)] px-5 pb-10 pt-24 text-white sm:px-8" data-testid="site-footer">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <LogoMark className="h-12 w-12" />
            <p className="mt-6 max-w-xs text-[15px] text-white/75">Period care is a basic need. Hawaa makes it a given, wherever women are.</p>
          </div>
          <div className="space-y-3 text-[15px]">
            <Link to="/shop" className="block hover:text-[var(--pink)]" data-testid="footer-shop-link">Shop: buy one, gift one</Link>
            <button onClick={openDonate} className="block hover:text-[var(--pink)]" data-testid="footer-donate-btn">Make a donation</button>
            <Link to="/admin" className="block text-white/70 hover:text-white" data-testid="footer-admin-link">Team login</Link>
          </div>
          <p className="text-sm text-white/70">Statistics: Opinium &amp; Neighborhood Feminists, 2024. Funded by independent corporate sponsorships and grants.</p>
        </div>
        <p className="font-display mt-20 select-none text-[24vw] font-light leading-[0.8] text-white/90" aria-hidden="true">hawaa</p>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/70 sm:flex-row">
          <span>© 2026 Hawaa. Amsterdam, the Netherlands.</span>
          <span>Hawaa is life.</span>
        </div>
      </div>
    </footer>
  );
};
