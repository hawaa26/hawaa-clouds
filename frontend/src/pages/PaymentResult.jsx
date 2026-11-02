import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Heart } from "lucide-react";
import { Cloud } from "../components/hawaa/Clouds";
import { useCart } from "../components/hawaa/CartContext";
import { http } from "../lib/api";

const Shell = ({ children }) => (
  <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-gradient-to-b from-[var(--blue)] to-[var(--pink-soft)] px-5">
    <Cloud tone="pink" className="drift pointer-events-none absolute left-[-4rem] top-24 h-40 w-80" />
    <Cloud tone="blue" className="drift pointer-events-none absolute bottom-16 right-[-3rem] h-32 w-72" />
    <div className="relative max-w-lg rounded-[2rem] bg-white/80 p-10 text-center backdrop-blur-xl">{children}</div>
  </main>
);

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const id = params.get("session_id");
  const [state, setState] = useState({ status: "checking", kind: null });
  const { clear } = useCart();

  useEffect(() => {
    if (!id) {
      setState({ status: "error" });
      return undefined;
    }
    let tries = 0;
    let timer;
    const poll = async () => {
      try {
        const { data } = await http.get(`/payments/status/${id}`);
        if (data?.payment_status === "paid") {
          setState({ status: "paid", kind: data.kind });
          if (data.kind === "shop") clear();
          return;
        }
        if (data?.status === "expired") return setState({ status: "error" });
      } catch {
        return setState({ status: "error" });
      }
      if (++tries < 15) timer = setTimeout(poll, 2000);
      else setState({ status: "pending" });
    };
    poll();
    return () => clearTimeout(timer);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Shell>
      <div data-testid="payment-result" data-status={state.status}>
        {state.status === "checking" && <><Loader2 className="mx-auto h-8 w-8 animate-spin" /><p className="mt-4">Confirming your payment…</p></>}
        {state.status === "paid" && (
          <>
            <Heart className="mx-auto h-10 w-10 fill-[var(--pink)] text-[var(--pink-deep)]" />
            <h1 className="font-display mt-6 text-5xl">Thank you.</h1>
            <p className="mt-4 text-[var(--ink-soft)]">
              {state.kind === "donation" ? "Your donation helps put organic cotton care where it's needed most." : "Your order is confirmed, and its twin is on its way to a woman who needs it."}
            </p>
          </>
        )}
        {state.status === "pending" && <p>Your payment is still processing. You'll receive a confirmation email from Stripe.</p>}
        {state.status === "error" && <p>We couldn't confirm this payment. If you were charged, please contact us.</p>}
        <Link to="/" className="mt-8 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white" data-testid="payment-home-link">Back to Hawaa</Link>
      </div>
    </Shell>
  );
}

export function PaymentCancel() {
  return (
    <Shell>
      <h1 className="font-display text-4xl" data-testid="payment-cancel">No worries.</h1>
      <p className="mt-4 text-[var(--ink-soft)]">Your payment was cancelled. Nothing was charged.</p>
      <Link to="/shop" className="mt-8 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-white" data-testid="payment-cancel-shop-link">Back to shop</Link>
    </Shell>
  );
}
