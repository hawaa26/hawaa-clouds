import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { scrollToId } from "../../lib/lenis";
import { useDonate } from "./DonateDialog";
import { useCart } from "./CartContext";

const links = [
  { id: "mission", label: "Mission" },
  { id: "how", label: "How it works" },
  { id: "packages", label: "For companies" },
  { id: "impact", label: "Impact" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openDonate } = useDonate();
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 450);
    } else scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-[background-color,box-shadow] duration-500 sm:px-6 ${
          scrolled || open ? "bg-white/70 shadow-[0_8px_40px_-12px_rgba(36,30,58,0.18)] backdrop-blur-xl" : "bg-white/30 backdrop-blur-md"
        }`}
        data-testid="main-nav"
      >
        <Link to="/" data-testid="nav-logo-link" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} data-testid={`nav-link-${l.id}`}
              className="text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--pink-deep)]">
              {l.label}
            </button>
          ))}
          <Link to="/shop" data-testid="nav-link-shop" className="text-sm font-medium transition-colors hover:text-[var(--pink-deep)]">Shop</Link>
        </div>
        <div className="flex items-center gap-2">
          {pathname === "/shop" && (
            <button onClick={() => openCart(true)} data-testid="nav-cart-btn"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-white/80 transition-transform hover:scale-105">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && <span data-testid="nav-cart-count" className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--pink-deep)] text-[10px] font-bold text-white">{count}</span>}
            </button>
          )}
          <button onClick={() => openDonate()} data-testid="nav-donate-btn"
            className="group flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]">
            <Heart className="h-4 w-4 fill-[var(--pink)] text-[var(--pink)] transition-transform group-hover:scale-125" />
            Donate
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white/80 lg:hidden" onClick={() => setOpen(!open)} data-testid="nav-mobile-toggle" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-xl lg:hidden" data-testid="nav-mobile-menu">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="font-display block w-full py-2 text-left text-3xl" data-testid={`nav-mobile-link-${l.id}`}>{l.label}</button>
          ))}
          <Link to="/shop" onClick={() => setOpen(false)} className="font-display block py-2 text-3xl text-[var(--pink-deep)]" data-testid="nav-mobile-link-shop">Shop</Link>
        </div>
      )}
    </header>
  );
};
