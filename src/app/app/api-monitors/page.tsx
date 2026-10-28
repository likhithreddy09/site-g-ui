"use client";

import { FileJson, FileSpreadsheet, PenLine, Play, Plug, Plus, Radar, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddApiMonitors } from "@/components/AddApiMonitors";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Empty, Loading, PageHeader, StatusDot, Table, Td } from "@/components/ui";
import { post } from "@/lib/api";
import { httpMeaning, intervalLabel, monitorStatus } from "@/lib/apiMonitors";
import { useAuth } from "@/lib/auth";
import { ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function ApiMonitorsPage() {
  const { data, loading, reload } = useApi<any[]>("/api/api-monitors", { poll: 20000 });
  const [adding, setAdding] = useState(false);
  const [running, setRunning] = useState<Set<string>>(new Set());
  const [all, setAll] = useState(false);
  const { can } = useAuth();
  const toast = useToast();

  const runOne = async (id: string) => {
    setRunning((s) => new Set(s).add(id));
    try {
      return await post(`/api/api-monitors/${id}/run`);
    } finally {
      setRunning((s) => { const n = new Set(s); n.delete(id); return n; });
    }
  };
  const runAll = async () => {
    if (!data?.length) return;
    setAll(true);
    const queue = data.filter((m) => !m.paused).map((m) => m.id);
    let ok = 0, bad = 0;
    const worker = async () => {
      while (queue.length) {
        const id = queue.shift()!;
        try { const r: any = await runOne(id); if (r.ok) ok++; else bad++; } catch { bad++; }
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
    setAll(false);
    reload();
    toast(bad ? `${ok} working · ${bad} failing` : `All ${ok} APIs are working`, bad ? "error" : "ok");
  };

  const counts = { up: 0, down: 0, degraded: 0 } as Record<string, number>;
  for (const m of data || []) if (!m.paused && m.status in counts) counts[m.status]++;

  return (
    <div>
      <PageHeader eyebrow="Monitoring" title="API monitors"
        subtitle="We call your backend addresses on a schedule and alert you when one stops answering correctly."
        action={can("member") && <>
          {!!data?.length && <Button variant="secondary" onClick={runAll} loading={all}><RefreshCw className="h-4 w-4" /> Check all now</Button>}
          <Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add APIs</Button>
        </>} />

      {!!data?.length && (
        <div className="mb-5 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-ok/10 px-3 py-1 font-medium text-ok">{counts.up} working</span>
          {counts.down > 0 && <span className="rounded-full bg-bad/10 px-3 py-1 font-medium text-bad">{counts.down} failing</span>}
          {counts.degraded > 0 && <span className="rounded-full bg-gold/20 px-3 py-1 font-medium text-[#8a5b00]">{counts.degraded} slow or flaky</span>}
        </div>
      )}

      {loading && !data ? <Loading /> : !data?.length ? (
        <div className="space-y-5">
          <Empty icon={<Plug className="h-6 w-6" />} title="No APIs monitored yet"
            body="Watch booking APIs, form handlers, payment webhooks or CMS endpoints. Add them automatically, by hand, or import a file."
            action={can("member") && <Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add APIs</Button>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[[Radar, "Find automatically", "Scan a website"], [PenLine, "Add by hand", "Or paste cURL"], [FileJson, "Postman / OpenAPI", "Import a file"], [FileSpreadsheet, "Spreadsheet", "Upload a CSV"]].map(([Icon, t, s]: any) => (
              <button key={t} onClick={() => setAdding(true)} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-left ring-1 ring-plum/8 hover:ring-magenta/30">
                <Icon className="h-5 w-5 text-magenta" /><div><div className="text-sm font-medium text-ink">{t}</div><div className="text-xs text-plum/55">{s}</div></div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <Table head={["API", "Status", "Last answer", "Speed", "Checked", ""]}>
            {data.map((m) => {
              const st = monitorStatus(m);
              return (
                <tr key={m.id} className="hover:bg-cream/50">
                  <Td>
                    <div className="flex items-center gap-3"><StatusDot status={st.tone} />
                      <div className="min-w-0">
                        <Link href={`/app/api-monitors/${m.id}`} className="font-medium text-ink hover:text-magenta">{m.name}</Link>
                        <div className="truncate font-mono text-[11px] text-plum/50"><span className="text-magenta">{m.method}</span> {m.url}</div>
                        <div className="text-[11px] text-plum/45">{m.website_name ? `${m.website_name} · ` : ""}{intervalLabel(m.interval_sec)}{m.assertions?.length ? ` · ${m.assertions.length} extra check${m.assertions.length > 1 ? "s" : ""}` : ""}</div>
                      </div>
                    </div>
                  </Td>
                  <Td><Badge tone={st.tone}>{st.label}</Badge></Td>
                  <Td className="max-w-[260px] text-xs">
                    {m.last_status_code != null || m.last_error ? (
                      <span className={m.status === "down" ? "text-bad" : "text-plum/75"}>
                        {m.last_status_code ? <span className="font-mono">{m.last_status_code} </span> : null}
                        {m.status === "down" && m.last_error ? m.last_error : httpMeaning(m.last_status_code)}
                      </span>
                    ) : "—"}
                  </Td>
                  <Td className="font-mono text-xs">{ms(m.last_response_ms)}</Td>
                  <Td className="whitespace-nowrap text-xs text-plum/60">{timeAgo(m.last_check_at) || "not yet"}</Td>
                  <Td>{can("member") && <Button size="sm" variant="secondary" loading={running.has(m.id)} onClick={async () => {
                    try { const r: any = await runOne(m.id); toast(r.ok ? `${m.name}: working` : `${m.name}: ${r.error}`, r.ok ? "ok" : "error"); reload(); } catch (e: any) { toast(e.message, "error"); }
                  }}><Play className="h-3.5 w-3.5" /> Check</Button>}</Td>
                </tr>
              );
            })}
          </Table>
        </Card>
      )}
      {adding && <AddApiMonitors onClose={() => { setAdding(false); reload(); }} onDone={reload} />}
    </div>
  );
}
