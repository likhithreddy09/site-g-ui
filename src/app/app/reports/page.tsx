"use client";

import { CalendarClock, FileBarChart, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, ChipInput, Empty, ErrorBox, Input, Loading, Modal, PageHeader, Select, Table, Td, Toggle } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate, pct, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

function ReportsInner() {
  const sp = useSearchParams();
  const [clientFilter, setClientFilter] = useState(sp.get("client_id") || "");
  const { data, loading, reload } = useApi<any[]>(`/api/reports${clientFilter ? `?client_id=${clientFilter}` : ""}`);
  const { data: clients } = useApi<any[]>("/api/clients");
  const { can } = useAuth();
  const { data: schedules, reload: reloadSch } = useApi<any[]>(can("member") ? "/api/report-schedules" : null);
  const [gen, setGen] = useState(false);
  const [sched, setSched] = useState(false);
  const [f, setF] = useState({ client_id: clientFilter, days: 30, start: "", end: "", share_days: 30 });
  const [s, setS] = useState({ client_id: "", frequency: "weekly", recipients: [] as string[], send_now: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const generate = async () => {
    setBusy(true);
    setError(null);
    try {
      const body: any = { client_id: f.client_id || null, share_days: f.share_days };
      if (f.start && f.end) { body.start = new Date(f.start).toISOString(); body.end = new Date(f.end + "T23:59:59").toISOString(); } else body.days = f.days;
      const r = await post("/api/reports", body);
      router.push(`/app/reports/${r.id}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const createSchedule = async () => {
    setBusy(true);
    setError(null);
    try {
      await post("/api/report-schedules", { ...s, client_id: s.client_id || null });
      toast("Report schedule created");
      setSched(false);
      reloadSch();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Agency" title="Reports" subtitle="Generate health reports for one client or the whole portfolio, share a read-only link, or schedule them by email."
        action={can("member") && <>
          <Button variant="secondary" onClick={() => { setError(null); setSched(true); }}><CalendarClock className="h-4 w-4" /> Schedule</Button>
          <Button onClick={() => { setError(null); setGen(true); }}><Plus className="h-4 w-4" /> Generate report</Button>
        </>} />
      <div className="mb-4 w-56"><Select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}><option value="">All clients</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></div>
      {loading && !data ? <Loading /> : !data?.length ? (
        <Empty icon={<FileBarChart className="h-6 w-6" />} title="No reports yet" body="Reports summarize uptime, incidents, and actions taken — ready to send to a client." action={can("member") && <Button onClick={() => setGen(true)}>Generate a report</Button>} />
      ) : (
        <Card>
          <Table head={["Report", "Client", "Period", "Uptime", "Incidents", "Share link", "Created", ""]}>
            {data.map((r) => (
              <tr key={r.id} className="hover:bg-cream/50">
                <Td><Link href={`/app/reports/${r.id}`} className="font-medium text-ink hover:text-magenta">{r.title}</Link></Td>
                <Td className="text-xs">{r.client_name || "Portfolio"}</Td>
                <Td className="whitespace-nowrap text-xs text-plum/65">{fmtDate(r.period_start, false)} – {fmtDate(r.period_end, false)}</Td>
                <Td className="font-mono text-xs">{pct(r.summary.uptime_pct)}</Td>
                <Td className="font-mono text-xs">{r.summary.incidents_detected} / {r.summary.incidents_resolved} resolved</Td>
                <Td><Badge tone={r.share_active ? "active" : "ignored"}>{r.share_active ? "active" : r.revoked ? "revoked" : "expired"}</Badge></Td>
                <Td className="text-xs text-plum/60">{timeAgo(r.created_at)}</Td>
                <Td>{can("member") && <button onClick={async () => { if (confirm("Delete report?")) { await del(`/api/reports/${r.id}`); reload(); } }} className="text-plum/40 hover:text-bad"><Trash2 className="h-4 w-4" /></button>}</Td>
              </tr>
            ))}
          </Table>
        </Card>
      )}

      {schedules && schedules.length > 0 && (
        <Card className="mt-6">
          <CardHeader title="Scheduled reports" subtitle="Emailed automatically with a share link" />
          <div className="divide-y divide-plum/6">
            {schedules.map((x) => (
              <div key={x.id} className="flex flex-wrap items-center gap-4 px-5 py-3 text-sm">
                <span className="font-medium text-ink">{x.client_name || "Portfolio"}</span>
                <Badge tone="scheduled">{x.frequency}</Badge>
                <span className="flex-1 text-xs text-plum/60">→ {x.recipients.join(", ")}</span>
                <span className="text-xs text-plum/50">next {timeAgo(x.next_run_at)}{x.last_run_at ? ` · last ${timeAgo(x.last_run_at)}` : ""}</span>
                <Toggle checked={x.active} onChange={async (v) => { await patch(`/api/report-schedules/${x.id}`, { active: v }); reloadSch(); }} />
                <Button size="sm" variant="ghost" onClick={async () => { await patch(`/api/report-schedules/${x.id}`, { run_now: true }); toast("Will send within 5 minutes"); reloadSch(); }}>Send now</Button>
                <button onClick={async () => { await del(`/api/report-schedules/${x.id}`); reloadSch(); }} className="text-plum/40 hover:text-bad"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Modal open={gen} onClose={() => setGen(false)} title="Generate report">
        <div className="space-y-4">
          <ErrorBox error={error} />
          <Select label="Scope" value={f.client_id} onChange={(e) => setF({ ...f, client_id: e.target.value })}>
            <option value="">Entire portfolio</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select label="Period" value={f.days} onChange={(e) => setF({ ...f, days: Number(e.target.value), start: "", end: "" })}>
            <option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option>
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Or custom start" type="date" value={f.start} onChange={(e) => setF({ ...f, start: e.target.value })} />
            <Input label="Custom end" type="date" value={f.end} onChange={(e) => setF({ ...f, end: e.target.value })} />
          </div>
          <Input label="Share link expires after (days)" type="number" min={1} max={365} value={f.share_days} onChange={(e) => setF({ ...f, share_days: Number(e.target.value) })} />
          <div className="flex justify-end"><Button onClick={generate} loading={busy}>Generate</Button></div>
        </div>
      </Modal>
      <Modal open={sched} onClose={() => setSched(false)} title="Schedule a report" subtitle="Available on Agency plans and above.">
        <div className="space-y-4">
          <ErrorBox error={error} />
          <Select label="Scope" value={s.client_id} onChange={(e) => setS({ ...s, client_id: e.target.value })}>
            <option value="">Entire portfolio</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select label="Frequency" value={s.frequency} onChange={(e) => setS({ ...s, frequency: e.target.value })}><option value="weekly">Weekly (last 7 days)</option><option value="monthly">Monthly (last 30 days)</option></Select>
          <ChipInput label="Recipients" values={s.recipients} onChange={(v) => setS({ ...s, recipients: v })} placeholder="client@company.com" />
          <Toggle checked={s.send_now} onChange={(v) => setS({ ...s, send_now: v })} label="Send the first report now" />
          <div className="flex justify-end"><Button onClick={createSchedule} loading={busy}>Create schedule</Button></div>
        </div>
      </Modal>
    </div>
  );
}

export default function ReportsPage() {
  return <Suspense><ReportsInner /></Suspense>;
}
