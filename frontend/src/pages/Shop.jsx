import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Loader2, Gift } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "../components/ui/sheet";
import { MaskLines, Reveal } from "../components/hawaa/Reveal";
import { Cloud } from "../components/hawaa/Clouds";
import { useCart } from "../components/hawaa/CartContext";
import { http, euro, errorText } from "../lib/api";

const tints = { pink: "bg-[var(--pink-soft)]", blue: "bg-[var(--blue-soft)]", mix: "bg-gradient-to-br from-[var(--blue-soft)] to-[var(--pink-soft)]" };

const ProductCard = ({ p, i, onAdd }) => (
  <Reveal delay={i * 0.08} className={`group flex flex-col overflow-hidden rounded-[2rem] ${tints[p.tint] || tints.mix}`}>
    <div data-testid={`shop-product-${p.lookup_key}`} className="flex h-full flex-col">
      <div className="relative m-3 aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        <motion.img src={p.image} alt={p.name} className="h-full w-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 1 }} />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold backdrop-blur"><Gift className="h-3.5 w-3.5 text-[var(--pink-deep)]" /> 1 bought = 1 gifted</span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-3">
        <h3 className="font-display text-2xl">{p.name}</h3>
        <p className="mt-2 flex-1 text-[15px] text-[var(--ink-soft)]">{p.description}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-display text-3xl" data-testid={`shop-price-${p.lookup_key}`}>{euro(p.amount)}</span>
          <button onClick={() => onAdd(p)} data-testid={`shop-add-${p.lookup_key}`}
            className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-[var(--pink-deep)]">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  </Reveal>
);

const CartSheet = ({ products }) => {
  const { items, set, open, setOpen } = useCart();
  const [busy, setBusy] = useState(false);
  const lines = products.filter((p) => items[p.lookup_key]);
  const total = lines.reduce((a, p) => a + p.amount * items[p.lookup_key], 0);
  const gifted = lines.reduce((a, p) => a + items[p.lookup_key], 0);

  const checkout = async () => {
    setBusy(true);
    try {
      const { data } = await http.post("/payments/checkout", {
        items: lines.map((p) => ({ lookup_key: p.lookup_key, quantity: items[p.lookup_key] })),
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch (e) {
      toast.error(errorText(e.response?.data?.detail));
      setBusy(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col bg-[var(--cream)] sm:max-w-md" data-testid="cart-sheet" data-lenis-prevent>
        <SheetTitle className="font-display text-3xl font-normal">Your basket</SheetTitle>
        <SheetDescription>Each item you buy places an identical pack in a community.</SheetDescription>
        <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
          {lines.length === 0 && <p className="text-[var(--ink-soft)]" data-testid="cart-empty">Your basket is light as air.</p>}
          {lines.map((p) => (
            <div key={p.lookup_key} className="flex items-center gap-4 rounded-2xl bg-white p-3" data-testid={`cart-line-${p.lookup_key}`}>
              <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight">{p.name}</p>
                <p className="text-sm text-[var(--ink-soft)]">{euro(p.amount)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => set(p.lookup_key, items[p.lookup_key] - 1)} className="grid h-8 w-8 place-items-center rounded-full bg-[var(--pink-soft)]" data-testid={`cart-dec-${p.lookup_key}`}><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-5 text-center text-sm font-semibold">{items[p.lookup_key]}</span>
                <button onClick={() => set(p.lookup_key, items[p.lookup_key] + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-[var(--blue-soft)]" data-testid={`cart-inc-${p.lookup_key}`}><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="space-y-4 border-t border-[var(--ink)]/10 pt-5">
            <p className="rounded-2xl bg-[var(--pink-soft)] p-4 text-sm" data-testid="cart-gift-count"><Gift className="mr-2 inline h-4 w-4 text-[var(--pink-deep)]" />You're gifting <strong>{gifted}</strong> {gifted === 1 ? "pack" : "packs"} to women in need.</p>
            <div className="flex justify-between font-semibold"><span>Total</span><span data-testid="cart-total">{euro(total)}</span></div>
            <button onClick={checkout} disabled={busy} data-testid="cart-checkout-btn"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-4 font-semibold text-white transition-[background-color] hover:bg-[var(--pink-deep)] disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Checkout securely
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default function Shop() {
  const [products, setProducts] = useState([]);
  const { add, setOpen } = useCart();

  useEffect(() => {
    http.get("/shop/products")
      .then((r) => setProducts(Array.isArray(r.data) ? r.data : []))
      .catch(() => setProducts([]));
  }, []);

  const onAdd = (p) => {
    add(p.lookup_key);
    toast.success(`${p.name.split(" —")[0]} added`, { action: { label: "View basket", onClick: () => setOpen(true) } });
  };

  return (
    <main className="relative overflow-hidden pt-32" data-testid="shop-page">
      <Cloud tone="blue" className="drift pointer-events-none absolute -right-16 top-24 h-36 w-72 opacity-80 sm:h-48 sm:w-96" />
      <Cloud tone="pink" className="drift pointer-events-none absolute -left-20 top-72 h-28 w-60 opacity-70" />
      <section className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <p className="eyebrow mb-6">The shop</p>
        <h1 className="font-display text-[14vw] font-light leading-[0.9] sm:text-7xl lg:text-8xl" data-testid="shop-title">
          <MaskLines delay={0.1} lines={["Buy one.", <span key="g" className="font-display-italic text-[var(--pink-deep)]">Gift one.</span>]} />
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
          Every pack you buy is matched by a pack placed in a community center, asylum center or local distribution point, free for a woman or girl who needs it.
        </p>
      </section>
      <section className="relative mx-auto grid max-w-7xl gap-5 px-5 pb-32 sm:px-8 md:grid-cols-3" data-testid="shop-grid">
        {products.length === 0 && <p className="text-[var(--ink-soft)]">Products are loading…</p>}
        {products.map((p, i) => <ProductCard key={p.lookup_key} p={p} i={i} onAdd={onAdd} />)}
      </section>
      <CartSheet products={products} />
    </main>
  );
}
