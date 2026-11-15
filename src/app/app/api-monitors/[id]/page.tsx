"use client";

import { ArrowLeft, Pause, Play, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
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

  const results: any[] = m?.results || [];
  const ok = results.filter((r) => r.ok).length;
  const times = results.map((r) => r.response_ms).filter((n: any) => typeof n === "number") as number[];
  const perf = useMemo(() => {
    if (!times.length) return { avg: null as number | null, min: null as number | null, max: null as number | null };
    const sum = times.reduce((a, b) => a + b, 0);
    return { avg: Math.round(sum / times.length), min: Math.min(...times), max: Math.max(...times) };
  }, [m?.results]);

  if (!m) return <Loading rows={4} />;

  const chart = [...results].reverse().map((r) => ({ t: r.at, avg_ms: r.response_ms || 0 }));
  const lastOk = results.find((r) => r.ok);
  const lastFail = results.find((r) => !r.ok);

  return (
    <div>
      <Link href="/app/api-monitors" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta">
        <ArrowLeft className="h-4 w-4" /> API monitors
      </Link>
      <PageHeader
        eyebrow={
          <span className="flex items-center gap-2">
            API monitor <Badge tone={monitorStatus(m).tone}>{monitorStatus(m).label}</Badge>
          </span>
        }
        title={m.name}
        subtitle={
          <span className="font-mono text-xs">
            <span className="text-magenta">{m.method}</span> {m.url}
          </span>
        }
        action={
          can("member") && (
            <>
              <Button variant="ghost" onClick={() => setEditing(true)}>
                <Settings2 className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  await patch(`/api/api-monitors/${id}`, { paused: !m.paused });
                  reload();
                }}
              >
                {m.paused ? (
                  <>
                    <Play className="h-4 w-4" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                )}
              </Button>
              <Button
                loading={running}
                onClick={async () => {
                  setRunning(true);
                  try {
                    const r = await post(`/api/api-monitors/${id}/run`);
                    toast(r.ok ? "Working" : `Failing: ${r.error}`, r.ok ? "ok" : "error");
                    reload();
                  } finally {
                    setRunning(false);
                  }
                }}
              >
                <Play className="h-4 w-4" /> Check now
              </Button>
            </>
          )
        }
      />

      <section className="mb-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-plum/50">Overview</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <Stat label="Current status" value={monitorStatus(m).label} tone={monitorStatus(m).tone === "up" ? "ok" : monitorStatus(m).tone === "down" ? "bad" : "warn"} />
          <Stat label="Latest response" value={ms(m.last_response_ms)} sub={m.last_status_code ? `HTTP ${m.last_status_code}` : undefined} />
          <Stat label="Uptime (last 100)" value={results.length ? `${Math.round((ok / results.length) * 100)}%` : "—"} tone={ok === results.length ? "ok" : "warn"} />
          <Stat label="Last success" value={lastOk ? timeAgo(lastOk.at) : "—"} />
          <Stat label="Last failure" value={lastFail ? timeAgo(lastFail.at) : "—"} sub={lastFail?.error || undefined} />
        </div>
      </section>

      <section className="mb-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Performance history" subtitle="Response time across recent executions" />
          <div className="grid grid-cols-3 gap-3 px-5 pb-2">
            <div className="rounded-xl bg-cream/60 px-3 py-2">
              <div className="text-[11px] text-plum/55">Average</div>
              <div className="font-mono text-sm text-ink">{perf.avg != null ? ms(perf.avg) : "—"}</div>
            </div>
            <div className="rounded-xl bg-cream/60 px-3 py-2">
              <div className="text-[11px] text-plum/55">Minimum</div>
              <div className="font-mono text-sm text-ink">{perf.min != null ? ms(perf.min) : "—"}</div>
            </div>
            <div className="rounded-xl bg-cream/60 px-3 py-2">
              <div className="text-[11px] text-plum/55">Maximum</div>
              <div className="font-mono text-sm text-ink">{perf.max != null ? ms(perf.max) : "—"}</div>
            </div>
          </div>
          <div className="px-3 pb-4 pt-2">
            <ResponseChart data={chart} />
          </div>
        </Card>
        <Card>
          <CardHeader title="What we validate" />
          <ul className="space-y-2 px-5 py-4 text-sm text-ink">
            <li>✓ Status {m.expected_statuses.join(" or ")}</li>
            {m.max_response_ms > 0 && <li>✓ Under {m.max_response_ms} ms</li>}
            {(m.assertions || []).map((a: any, i: number) => (
              <li key={i}>✓ {describeAssertion(a)}</li>
            ))}
            {!(m.assertions || []).length && !m.max_response_ms && <li className="text-plum/50">No extra response checks</li>}
          </ul>
          <div className="divide-y divide-plum/6 border-t border-plum/8 px-5 py-2">
            <KV k="Frequency" v={intervalLabel(m.interval_sec)} />
            <KV k="Timeout" v={`${m.timeout_sec}s`} />
            <KV k="Incident after" v={`${m.failure_threshold} consecutive failure${m.failure_threshold > 1 ? "s" : ""}`} />
            <KV
              k="Auth headers"
              v={Object.keys(m.secret_headers || {})
                .map((k) => `${k}: ••••••`)
                .join(", ") || "None"}
              mono
            />
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader title="Execution history" subtitle="Click a row for assertion details and response sample." />
          <Table head={["Timestamp", "Result", "Status", "Response time", "Details"]}>
            {results.map((r: any) => (
              <Fragment key={r.id}>
                <tr className="cursor-pointer hover:bg-cream/50" onClick={() => setOpen(open === r.id ? null : r.id)}>
                  <Td className="font-mono text-xs">{fmtDate(r.at)}</Td>
                  <Td>
                    <Badge tone={r.ok ? "ok" : r.classification}>
                      {r.ok ? "Success" : r.classification === "transient" ? "Hiccup" : "Failure"}
                    </Badge>
                  </Td>
                  <Td className="font-mono text-xs">{r.status_code ?? "—"}</Td>
                  <Td className="font-mono text-xs">{ms(r.response_ms)}</Td>
                  <Td className="text-xs text-plum/70">
                    {r.error || (r.status_code ? `${httpMeaning(r.status_code)} — checks passed` : "Checks passed")}
                  </Td>
                </tr>
                {open === r.id && (
                  <tr>
                    <Td colSpan={5} className="bg-cream/40">
                      {(r.details?.assertions || []).map((a: any, i: number) => (
                        <div key={i} className={`font-mono text-[11px] ${a.ok ? "text-ok" : "text-bad"}`}>
                          {a.ok ? "✓" : "✗"} {describeAssertion(a)} — got: {String(a.actual ?? a.error)}
                        </div>
                      ))}
                      {r.details?.body_sample && (
                        <pre className="mt-2 max-h-40 overflow-auto rounded-lg bg-ink p-3 text-[11px] text-sky">{r.details.body_sample}</pre>
                      )}
                    </Td>
                  </tr>
                )}
              </Fragment>
            ))}
          </Table>
        </Card>
      </section>

      {can("member") && (
        <div className="mt-8">
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              if (confirm("Delete this monitor?")) {
                await del(`/api/api-monitors/${id}`);
                router.push("/app/api-monitors");
              }
            }}
          >
            <Trash2 className="h-4 w-4" /> Delete monitor
          </Button>
        </div>
      )}

      <Modal open={editing} onClose={() => setEditing(false)} title="Edit API monitor" wide>
        <ApiMonitorForm
          initial={m}
          onSaved={() => {
            setEditing(false);
            reload();
            toast("Saved");
          }}
        />
      </Modal>
    </div>
  );
}
