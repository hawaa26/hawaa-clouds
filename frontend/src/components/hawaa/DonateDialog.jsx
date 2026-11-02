import { createContext, useContext, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { http, errorText } from "../../lib/api";

const Ctx = createContext({ openDonate: () => {} });
export const useDonate = () => useContext(Ctx);
const TIERS = [1000, 2500, 5000, 10000];

export const DonateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ openDonate: () => setOpen(true) }}>
      {children}
      <DonateDialog open={open} onOpenChange={setOpen} />
    </Ctx.Provider>
  );
};

const DonateDialog = ({ open, onOpenChange }) => {
  const [tier, setTier] = useState(2500);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const amt = parseFloat(custom);
    const body = custom ? { custom_amount: amt } : { tier };
    if (custom && (isNaN(amt) || amt < 5)) return toast.error("Minimum donation is €5");
    setBusy(true);
    try {
      const { data } = await http.post("/payments/donate", { ...body, origin_url: window.location.origin });
      window.location.href = data.checkout_url;
    } catch (e) {
      toast.error(errorText(e.response?.data?.detail));
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-[2rem] border-0 bg-[var(--cream)] p-0 sm:max-w-lg" data-testid="donate-dialog">
        <div className="relative bg-gradient-to-br from-[var(--blue)] to-[var(--pink)] px-8 pb-8 pt-10">
          <Heart className="mb-4 h-8 w-8 fill-white text-white" />
          <DialogTitle className="font-display text-4xl font-medium">Give softly.</DialogTitle>
          <DialogDescription className="mt-2 text-[15px] text-[var(--ink)]/80">
            Every euro helps place organic cotton period care in community centers, asylum centers and Armoedefonds distribution points.
          </DialogDescription>
        </div>
        <div className="space-y-5 px-8 pb-8 pt-6">
          <div className="grid grid-cols-4 gap-2">
            {TIERS.map((t) => (
              <button key={t} onClick={() => { setTier(t); setCustom(""); }} data-testid={`donate-tier-${t / 100}`}
                className={`rounded-2xl py-3 text-sm font-semibold transition-[background-color,transform] duration-300 hover:scale-[1.04] ${
                  tier === t && !custom ? "bg-[var(--ink)] text-white" : "bg-white text-[var(--ink)]"}`}>
                €{t / 100}
              </button>
            ))}
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-soft)]">Or your own amount</span>
            <div className="mt-2 flex items-center rounded-2xl bg-white px-4">
              <span className="text-lg text-[var(--ink-soft)]">€</span>
              <input type="number" min="5" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="40"
                className="w-full bg-transparent px-2 py-3 text-lg outline-none" data-testid="donate-custom-input" />
            </div>
          </label>
          <button onClick={submit} disabled={busy} data-testid="donate-submit-btn"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--pink-deep)] py-4 font-semibold text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Donate {custom ? `€${custom}` : `€${tier / 100}`}
          </button>
          <p className="text-center text-xs text-[var(--ink-soft)]">Secure payment via Stripe.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
