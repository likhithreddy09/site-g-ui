"use client";

import { Globe, Pause, Play, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Sparkline } from "@/components/charts";
import { useToast } from "@/components/toast";
import { WebsiteForm } from "@/components/WebsiteForm";
import { Badge, Button, Card, Empty, Loading, Modal, PageHeader, Select, StatusDot, Table, Td } from "@/components/ui";
import { patch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { certTone, expiryLabel, intervalLabel, ms, pct, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

function WebsitesInner() {
  const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [client, setClient] = useState(sp.get("client_id") || "");
  const [status, setStatus] = useState("");
  const params = new URLSearchParams({ ...(q && { q }), ...(client && { client_id: client }), ...(status && { status }) });
  const { data, loading, reload } = useApi<any[]>(`/api/websites?${params}`, { poll: 20000 });
  const { data: clients } = useApi<any[]>("/api/clients");
  const [adding, setAdding] = useState(false);
  const { can } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const togglePause = async (s: any) => {
    await patch(`/api/websites/${s.id}`, { paused: !s.paused });
    toast(s.paused ? `Resumed monitoring ${s.name}` : `Paused ${s.name}`);
    reload();
  };

  return (
    <div>
      <PageHeader eyebrow="Portfolio" title="Websites" subtitle="Every monitored site, its latest result, and 24-hour availability."
        action={can("member") && <Button onClick={() => setAdding(true)}><Globe className="h-4 w-4" /> Add website</Button>} />
      <Card className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, URL, or label…" className="h-10 w-full rounded-xl bg-cream/60 pl-9 pr-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-2 focus:ring-magenta/40" />
        </div>
        <div className="w-44"><Select value={client} onChange={(e) => setClient(e.target.value)}><option value="">All clients</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></div>
        <div className="w-40"><Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Any status</option>{["up", "down", "degraded", "paused", "unknown"].map((s) => <option key={s} value={s}>{s}</option>)}
        </Select></div>
      </Card>
      {loading && !data ? <Loading rows={5} /> : !data?.length ? (
        <Empty icon={<Globe className="h-6 w-6" />} title={q || client || status ? "No websites match these filters" : "No websites yet"}
          body="Add a client website to start uptime, SSL, and content monitoring." action={can("member") && <Button onClick={() => setAdding(true)}>Add website</Button>} />
      ) : (
        <Card>
          <Table dense head={["Website", "Status", "Response", "Uptime", "SSL · domain", ""]}>
            {data.map((s) => (
              <tr key={s.id} className="cursor-pointer transition hover:bg-cream/50" onClick={() => router.push(`/app/websites/${s.id}`)}>
                <Td dense>
                  <div className="flex items-center gap-3">
                    <StatusDot status={s.paused ? "paused" : s.status} />
                    <div className="min-w-0">
                      <div className="font-medium text-ink">{s.name}</div>
                      <div className="max-w-[220px] truncate font-mono text-[11px] text-plum/50">{s.url}</div>
                      <div className="mt-0.5 text-[11px] text-plum/45">{s.client_name || "No client"} · checked {timeAgo(s.last_check_at)} · every {intervalLabel(s.interval_sec)}</div>
                      {s.labels?.length > 0 && <div className="mt-1 flex gap-1">{s.labels.slice(0, 3).map((l: string) => <span key={l} className="rounded bg-plum/5 px-1.5 text-[10px] text-plum/60">{l}</span>)}</div>}
                    </div>
                  </div>
                </Td>
                <Td dense><Badge>{s.paused ? "paused" : s.status || "unknown"}</Badge>{s.status === "degraded" && s.consecutive_failures > 0 && <div className="mt-1 text-[10px] text-plum/50">{s.consecutive_failures}/{s.failure_threshold} failures</div>}</Td>
                <Td dense>
                  <div className="flex items-center gap-2">
                    <span className="w-14 shrink-0 font-mono text-xs">{ms(s.last_response_ms)}</span>
                    <Sparkline values={s.spark || []} className="hidden 2xl:block" />
                  </div>
                </Td>
                <Td dense className="whitespace-nowrap font-mono text-xs">{pct(s.uptime_24h)}</Td>
                <Td dense className="whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5"><span className="w-11 text-[10px] uppercase tracking-wide text-plum/40">SSL</span>{s.ssl ? <Badge tone={certTone(s.ssl.status, s.ssl.days_left)}>{s.ssl.days_left != null ? expiryLabel(s.ssl.days_left, "badge") : s.ssl.status}</Badge> : <span className="text-plum/40">—</span>}</div>
                    <div className="flex items-center gap-1.5"><span className="w-11 text-[10px] uppercase tracking-wide text-plum/40">Domain</span>{s.domain ? <Badge tone={certTone(s.domain.status, s.domain.days_left)}>{s.domain.days_left != null ? expiryLabel(s.domain.days_left, "badge") : s.domain.status}</Badge> : <span className="text-plum/40">—</span>}</div>
                  </div>
                </Td>
                <Td dense onClick={(e) => e.stopPropagation()}>
                  {can("member") && <button onClick={() => togglePause(s)} title={s.paused ? "Resume" : "Pause"} className="rounded-lg p-1.5 text-plum/50 hover:bg-plum/5 hover:text-plum">{s.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>}
                </Td>
              </tr>
            ))}
          </Table>
        </Card>
      )}
      <Modal open={adding} onClose={() => setAdding(false)} title="Add a website" subtitle="We'll validate the URL and run the first check immediately.">
        <WebsiteForm onCancel={() => setAdding(false)} onSaved={(s) => { setAdding(false); toast(`Added ${s.name} — first check: ${s.status}`); router.push(`/app/websites/${s.id}`); }} />
      </Modal>
    </div>
  );
}

export default function WebsitesPage() {
  return <Suspense><WebsitesInner /></Suspense>;
}
