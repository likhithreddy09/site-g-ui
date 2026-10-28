"use client";

import { ArrowLeft, Pause, Play, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { ApiMonitorForm } from "@/components/ApiMonitorForm";
import { ResponseChart } from "@/components/charts";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, KV, Loading, Modal, PageHeader, Stat, Table, Td } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate, ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";
import { describeAssertion, httpMeaning, intervalLabel, monitorStatus } from "@/lib/apiMonitors";

export default function ApiMonitorDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: m, reload } = useApi<any>(`/api/api-monitors/${id}`, { poll: 20000 });
  const [editing, setEditing] = useState(false);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const { can } = useAuth();
  const toast = useToast();
  const router = useRouter();
  if (!m) return <Loading rows={4} />;
  const ok = m.results.filter((r: any) => r.ok).length;
  const chart = [...m.results].reverse().map((r: any) => ({ t: r.at, avg_ms: r.response_ms || 0 }));

  return (
    <div>
      <Link href="/app/api-monitors" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> API monitors</Link>
      <PageHeader eyebrow={<span className="flex items-center gap-2">API monitor <Badge tone={monitorStatus(m).tone}>{monitorStatus(m).label}</Badge></span>} title={m.name}
        subtitle={<span className="font-mono text-xs"><span className="text-magenta">{m.method}</span> {m.url}</span>}
        action={can("member") && <>
          <Button variant="ghost" onClick={() => setEditing(true)}><Settings2 className="h-4 w-4" /> Edit</Button>
          <Button variant="secondary" onClick={async () => { await patch(`/api/api-monitors/${id}`, { paused: !m.paused }); reload(); }}>{m.paused ? <><Play className="h-4 w-4" /> Resume</> : <><Pause className="h-4 w-4" /> Pause</>}</Button>
          <Button loading={running} onClick={async () => { setRunning(true); try { const r = await post(`/api/api-monitors/${id}/run`); toast(r.ok ? "Working" : `Failing: ${r.error}`, r.ok ? "ok" : "error"); reload(); } finally { setRunning(false); } }}><Play className="h-4 w-4" /> Check now</Button>
        </>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Worked (last 100 checks)" value={m.results.length ? `${Math.round((ok / m.results.length) * 100)}%` : "—"} tone={ok === m.results.length ? "ok" : "warn"} />
        <Stat label="Last answer" value={m.last_status_code ?? "—"} sub={httpMeaning(m.last_status_code)} />
        <Stat label="Speed" value={ms(m.last_response_ms)} sub={m.max_response_ms ? `slow above ${m.max_response_ms} ms` : undefined} />
        <Stat label="Last check" value={timeAgo(m.last_check_at)} sub={m.last_error || undefined} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Response time" subtitle="Last 100 scheduled & manual checks" />
          <div className="px-3 pt-4"><ResponseChart data={chart} /></div>
        </Card>
        <Card>
          <CardHeader title="What we check" />
          <ul className="space-y-2 px-5 py-4 text-sm text-ink">
            <li>✓ Answers with {m.expected_statuses.join(" or ")}</li>
            {m.max_response_ms > 0 && <li>✓ Responds in under {m.max_response_ms} ms</li>}
            {m.assertions.map((a: any, i: number) => <li key={i}>✓ {describeAssertion(a)}</li>)}
          </ul>
          <div className="divide-y divide-plum/6 border-t border-plum/8 px-5 py-2">
            <KV k="How often" v={intervalLabel(m.interval_sec)} />
            <KV k="Alerts" v={m.failure_threshold === 1 ? "On the first failure" : `After ${m.failure_threshold} failures in a row`} />
            <KV k="Retries" v={m.retries ? `${m.retries} automatic retry before counting a failure` : "None"} />
            <KV k="Login / key headers" v={Object.keys(m.secret_headers || {}).map((k) => `${k}: ••••••`).join(", ") || "—"} mono />
            {Object.keys(m.headers || {}).length > 0 && <KV k="Other headers" v={Object.keys(m.headers).join(", ")} />}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="History" subtitle="Click a row to see each check's details." />
        <Table head={["Time", "Result", "Answer", "Speed", "What happened"]}>
          {m.results.map((r: any) => (
            <Fragment key={r.id}>
              <tr className="cursor-pointer hover:bg-cream/50" onClick={() => setOpen(open === r.id ? null : r.id)}>
                <Td className="font-mono text-xs">{fmtDate(r.at)}</Td>
                <Td><Badge tone={r.ok ? "ok" : r.classification}>{r.ok ? "Working" : r.classification === "transient" ? "Hiccup (retried OK)" : "Failed"}</Badge></Td>
                <Td className="font-mono text-xs">{r.status_code ?? "—"}</Td>
                <Td className="font-mono text-xs">{ms(r.response_ms)}</Td>
                <Td className="text-xs text-plum/70">{r.error || (r.status_code ? `${httpMeaning(r.status_code)} — all checks passed` : "All checks passed")}</Td>
              </tr>
              {open === r.id && (
                <tr><Td colSpan={5} className="bg-cream/40">
                  {r.details?.assertions?.map((a: any, i: number) => <div key={i} className={`font-mono text-[11px] ${a.ok ? "text-ok" : "text-bad"}`}>{a.ok ? "✓" : "✗"} {describeAssertion(a)} — got: {String(a.actual ?? a.error)}</div>)}
                  {r.details?.body_sample && <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-ink p-3 text-[11px] text-sky">{r.details.body_sample}</pre>}
                </Td></tr>
              )}
            </Fragment>
          ))}
        </Table>
      </Card>
      {can("member") && <div className="mt-8"><Button variant="danger" size="sm" onClick={async () => { if (confirm("Delete this monitor?")) { await del(`/api/api-monitors/${id}`); router.push("/app/api-monitors"); } }}><Trash2 className="h-4 w-4" /> Delete monitor</Button></div>}
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit API monitor" wide><ApiMonitorForm initial={m} onSaved={() => { setEditing(false); reload(); toast("Saved"); }} /></Modal>
    </div>
  );
}
