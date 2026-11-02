import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { LogoMark } from "../components/hawaa/Logo";
import { useAuth } from "../components/hawaa/AuthContext";
import { http, errorText } from "../lib/api";

const STATUSES = ["new", "contacted", "in_progress", "closed"];
const fmt = (d) => (d ? new Date(d).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" }) : "");

const Enquiries = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    http.get("/admin/enquiries").then((r) => setRows(Array.isArray(r.data) ? r.data : [])).catch(() => setRows([]));
  }, []);
  const update = async (id, status) => {
    try {
      await http.patch(`/admin/enquiries/${id}`, { status });
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success("Status updated");
    } catch (e) {
      toast.error(errorText(e.response?.data?.detail));
    }
  };
  if (!rows.length) return <p className="p-8 text-[var(--ink-soft)]" data-testid="enquiries-empty">No enquiries yet.</p>;
  return (
    <Table data-testid="enquiries-table">
      <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Company</TableHead><TableHead>Contact</TableHead><TableHead>Size / package</TableHead><TableHead>Message</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} data-testid={`enquiry-row-${r.id}`}>
            <TableCell className="whitespace-nowrap text-xs">{fmt(r.created_at)}</TableCell>
            <TableCell className="font-semibold">{r.company}</TableCell>
            <TableCell><div>{r.name}</div><a href={`mailto:${r.email}`} className="text-xs text-[var(--blue-deep)] underline">{r.email}</a><div className="text-xs">{r.phone}</div></TableCell>
            <TableCell className="text-sm">{r.employees || "—"}<div className="text-xs text-[var(--ink-soft)]">{r.package}</div></TableCell>
            <TableCell className="max-w-xs text-sm">{r.message}</TableCell>
            <TableCell>
              <select value={r.status} onChange={(e) => update(r.id, e.target.value)} className="rounded-full border bg-white px-3 py-1.5 text-sm" data-testid={`enquiry-status-${r.id}`}>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Payments = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    http.get("/admin/payments").then((r) => setRows(Array.isArray(r.data) ? r.data : [])).catch(() => setRows([]));
  }, []);
  if (!rows.length) return <p className="p-8 text-[var(--ink-soft)]" data-testid="payments-empty">No payments yet.</p>;
  return (
    <Table data-testid="payments-table">
      <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Details</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.session_id}>
            <TableCell className="whitespace-nowrap text-xs">{fmt(r.created_at)}</TableCell>
            <TableCell className="capitalize">{r.kind}</TableCell>
            <TableCell className="text-xs">{r.meta?.items || "—"}</TableCell>
            <TableCell>€{Number(r.amount ?? 0).toFixed(2)}</TableCell>
            <TableCell><span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.payment_status === "paid" ? "bg-[var(--blue)]" : "bg-[var(--pink-soft)]"}`}>{r.payment_status}</span></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function Admin() {
  const { user, setUser } = useAuth();
  const logout = async () => {
    await http.post("/auth/logout").catch(() => {});
    setUser(false);
  };
  return (
    <main className="min-h-screen bg-[var(--cream)] px-4 py-8 sm:px-8" data-testid="admin-dashboard">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3"><LogoMark /><span className="font-display text-2xl">Hawaa admin</span></Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-[var(--ink-soft)] sm:inline">{user?.email}</span>
            <button onClick={logout} className="flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 font-semibold text-white" data-testid="admin-logout-btn"><LogOut className="h-4 w-4" /> Log out</button>
          </div>
        </div>
        <Tabs defaultValue="enquiries" className="mt-10">
          <TabsList className="rounded-full bg-[var(--pink-soft)] p-1">
            <TabsTrigger value="enquiries" className="rounded-full" data-testid="admin-tab-enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="payments" className="rounded-full" data-testid="admin-tab-payments">Orders &amp; donations</TabsTrigger>
          </TabsList>
          <TabsContent value="enquiries" className="mt-6 overflow-x-auto rounded-[1.5rem] bg-white"><Enquiries /></TabsContent>
          <TabsContent value="payments" className="mt-6 overflow-x-auto rounded-[1.5rem] bg-white"><Payments /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
