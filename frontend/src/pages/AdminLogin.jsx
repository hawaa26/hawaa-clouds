import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { LogoMark } from "../components/hawaa/Logo";
import { useAuth } from "../components/hawaa/AuthContext";
import { http, errorText } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const { data } = await http.post("/auth/login", { email, password });
      setUser(data);
      nav("/admin");
    } catch (e2) {
      setErr(errorText(e2.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full rounded-2xl border border-[var(--ink)]/10 bg-white px-5 py-4 outline-none focus:border-[var(--pink-deep)]";
  return (
    <main className="grid min-h-[100svh] place-items-center bg-gradient-to-br from-[var(--blue)] to-[var(--pink)] px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[2rem] bg-[var(--cream)] p-8" data-testid="admin-login-form">
        <LogoMark className="h-12 w-12" />
        <h1 className="font-display mt-6 text-4xl">Team login</h1>
        <div className="mt-8 space-y-3">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} data-testid="admin-email-input" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} data-testid="admin-password-input" />
        </div>
        {err && <p className="mt-3 text-sm text-red-700" data-testid="admin-login-error">{err}</p>}
        <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-4 font-semibold text-white disabled:opacity-60" data-testid="admin-login-submit">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </main>
  );
}
