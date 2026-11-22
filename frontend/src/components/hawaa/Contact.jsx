import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { http, errorText } from "../../lib/api";

const empty = { company: "", name: "", email: "", phone: "", employees: "", package: "", message: "" };
const field = "w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-5 py-4 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-[var(--pink-deep)] focus:shadow-[0_0_0_4px_rgba(246,202,219,0.6)]";

export const Contact = ({ pkg }) => {
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (pkg) setF((s) => ({ ...s, package: pkg }));
  }, [pkg]);

  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await http.post("/enquiries", f);
      setDone(true);
      setF(empty);
      toast.success("Thank you. We'll be in touch soon.");
    } catch (err) {
      toast.error(errorText(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="px-5 py-28 sm:px-8 sm:py-40" data-testid="contact-section">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">Sponsor Hawaa</p>
          <h2 className="font-display text-4xl font-light leading-[1.02] sm:text-6xl">
            Let's make it a <span className="font-display-italic text-[var(--pink-deep)]">given.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
            Tell us about your company and we'll prepare a sponsorship proposal for your team and the communities you'll support.
          </p>
          <div className="mt-10 space-y-2 text-[15px]">
            <p className="text-[var(--ink-soft)]">Email</p>
            <a href="mailto:hallo@hawaa.world" className="font-display inline-block text-2xl underline decoration-[var(--pink)] decoration-2 underline-offset-8 transition-colors hover:text-[var(--pink-deep)]" data-testid="contact-email-link">hallo@hawaa.world</a>
          </div>
        </div>
        <Reveal className="lg:col-span-7">
          {done ? (
            <div className="flex min-h-[28rem] flex-col items-start justify-center rounded-[2rem] bg-[var(--blue-soft)] p-10" data-testid="enquiry-success">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white"><Check className="h-6 w-6 text-[var(--pink-deep)]" /></span>
              <p className="font-display mt-8 text-4xl">Thank you.</p>
              <p className="mt-3 max-w-sm text-[var(--ink-soft)]">Your enquiry has landed softly. We'll reply within a few working days.</p>
              <button onClick={() => setDone(false)} className="mt-8 text-sm font-semibold underline underline-offset-4" data-testid="enquiry-another-btn">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3 rounded-[2rem] bg-[var(--pink-soft)] p-6 sm:grid-cols-2 sm:p-10" data-testid="enquiry-form">
              <input required className={field} placeholder="Company *" value={f.company} onChange={on("company")} data-testid="enquiry-company-input" />
              <input required className={field} placeholder="Your name *" value={f.name} onChange={on("name")} data-testid="enquiry-name-input" />
              <input required type="email" className={field} placeholder="Work email *" value={f.email} onChange={on("email")} data-testid="enquiry-email-input" />
              <input className={field} placeholder="Phone" value={f.phone} onChange={on("phone")} data-testid="enquiry-phone-input" />
              <select className={field} value={f.employees} onChange={on("employees")} data-testid="enquiry-employees-select">
                <option value="">Number of employees</option>
                <option>1–50</option><option>50–250</option><option>250–1000</option><option>1000+</option>
              </select>
              <select className={field} value={f.package} onChange={on("package")} data-testid="enquiry-package-select">
                <option value="">Package of interest</option>
                <option>Sunrise</option><option>Blush Sky</option><option>Open Heaven</option><option>Grant / other</option>
              </select>
              <textarea rows={5} className={`${field} sm:col-span-2`} placeholder="Tell us a little about your goals" value={f.message} onChange={on("message")} data-testid="enquiry-message-input" />
              <button type="submit" disabled={busy} data-testid="enquiry-submit-btn"
                className="flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-4 font-semibold text-white transition-[background-color,transform] duration-300 hover:scale-[1.01] hover:bg-[var(--pink-deep)] disabled:opacity-60 sm:col-span-2">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />} Send enquiry
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};
