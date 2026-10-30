"use client";

import { FileJson, FileSpreadsheet, PenLine, Play, Plug, Plus, Radar, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddApiMonitors } from "@/components/AddApiMonitors";
import { DiscoveryPanel } from "@/components/DiscoveryPanel";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Empty, Loading, PageHeader, Pager, Select, StatusDot, Table, Td, cn } from "@/components/ui";
import { post } from "@/lib/api";
import { httpMeaning, intervalLabel, monitorStatus } from "@/lib/apiMonitors";
import { useAuth } from "@/lib/auth";
import { ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

type StatusFilter = "all" | "up" | "down" | "degraded" | "paused";
const PER_PAGE = 10;

export default function ApiMonitorsPage() {
  const { data, loading, reload } = useApi<any[]>("/api/api-monitors", { poll: 20000 });
  const { data: scans, reload: reloadScans } = useApi<any[]>("/api/discoveries");
  const [adding, setAdding] = useState(false);
  const [page, setPage] = useState(1);
  const [scanSite, setScanSite] = useState("");
  const [running, setRunning] = useState<Set<string>>(new Set());
  const [all, setAll] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [groupBySite, setGroupBySite] = useState(true);
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

  const counts = { up: 0, down: 0, degraded: 0, paused: 0 } as Record<string, number>;
  for (const m of data || []) {
    if (m.paused) counts.paused++;
    else if (m.status in counts) counts[m.status]++;
  }

  const foundScans = useMemo(
    () => (scans || []).filter((s) => s.status === "running" || (s.endpoints_found || 0) > 0),
    [scans],
  );
  useEffect(() => {
    if (scanSite && foundScans.some((s) => s.website_id === scanSite)) return;
    if (foundScans[0]) setScanSite(foundScans[0].website_id);
  }, [foundScans, scanSite]);

  const filtered = useMemo(() => {
    const list = data || [];
    const needle = q.trim().toLowerCase();
    return list.filter((m) => {
      if (statusFilter === "paused" && !m.paused) return false;
      if (statusFilter !== "all" && statusFilter !== "paused" && (m.paused || m.status !== statusFilter)) return false;
      if (!needle) return true;
      return `${m.name} ${m.method} ${m.url} ${m.website_name || ""}`.toLowerCase().includes(needle);
    });
  }, [data, q, statusFilter]);

  useEffect(() => { setPage(1); }, [q, statusFilter]);
  const listPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, listPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  useEffect(() => { if (page > listPages) setPage(listPages); }, [page, listPages]);

  const groups = useMemo(() => {
    if (!groupBySite) return [{ key: "_all", label: null as string | null, items: pageItems }];
    const map = new Map<string, { label: string; items: any[] }>();
    for (const m of pageItems) {
      const key = m.website_id || m.website_name || "_none";
      const label = m.website_name || "Not linked to a website";
      if (!map.has(key)) map.set(key, { label, items: [] });
      map.get(key)!.items.push(m);
    }
    return [...map.entries()]
      .sort((a, b) => a[1].label.localeCompare(b[1].label))
      .map(([key, v]) => ({ key, label: v.label, items: v.items }));
  }, [pageItems, groupBySite]);
  const refresh = () => { reload(); reloadScans(); };

  return (
    <div>
      <PageHeader eyebrow="Monitoring" title="API monitors"
        subtitle="We call your backend addresses on a schedule and alert you when one stops answering correctly."
        action={can("member") && <>
          {!!data?.length && <Button variant="secondary" onClick={runAll} loading={all}><RefreshCw className="h-4 w-4" /> Check all now</Button>}
          <Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add APIs</Button>
        </>} />

      {!!data?.length && (
        <div className="mb-5 space-y-3">
          <div className="flex flex-wrap gap-2 text-sm">
            {([
              ["all", "All", data.length],
              ["up", "Working", counts.up],
              ["down", "Failing", counts.down],
              ["degraded", "Slow / flaky", counts.degraded],
              ["paused", "Paused", counts.paused],
            ] as const).map(([k, label, n]) => (
              <button key={k} onClick={() => setStatusFilter(k)}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition",
                  statusFilter === k ? "bg-plum text-cream" :
                    k === "up" ? "bg-ok/10 text-ok hover:bg-ok/15" :
                    k === "down" ? "bg-bad/10 text-bad hover:bg-bad/15" :
                    k === "degraded" ? "bg-gold/20 text-[#8a5b00] hover:bg-gold/30" :
                    "bg-plum/5 text-plum/70 hover:bg-plum/10",
                )}>
                {label} <span className="opacity-70">{n}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plum/40" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, URL, website…"
                className="h-9 w-full rounded-xl bg-white/80 pl-9 pr-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-2 focus:ring-magenta/40" />
            </div>
            <button onClick={() => setGroupBySite((v) => !v)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition", groupBySite ? "bg-plum text-cream" : "bg-plum/5 text-plum/70 hover:bg-plum/10")}>
              Group by website
            </button>
            <span className="text-xs text-plum/50">{filtered.length} of {data.length}</span>
          </div>
        </div>
      )}

      {loading && !data ? <Loading /> : !data?.length && foundScans.length ? (
        <FoundFromScan scans={foundScans} siteId={scanSite || foundScans[0].website_id} onSite={setScanSite} onChange={refresh} />
      ) : !data?.length ? (
        <div className="space-y-5">
          <Empty icon={<Plug className="h-6 w-6" />} title="No APIs monitored yet"
            body="Watch booking APIs, form handlers, payment webhooks or CMS endpoints. Scan a site to find them, or import Postman / OpenAPI / CSV."
            action={can("member") && <Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add APIs</Button>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[[Radar, "Find automatically", "Scan site + OpenAPI"], [PenLine, "Add by hand", "Or paste cURL"], [FileJson, "Postman / OpenAPI", "Import a file"], [FileSpreadsheet, "Spreadsheet", "Upload a CSV"]].map(([Icon, t, s]: any) => (
              <button key={t} onClick={() => setAdding(true)} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-left ring-1 ring-plum/8 hover:ring-magenta/30">
                <Icon className="h-5 w-5 text-magenta" /><div><div className="text-sm font-medium text-ink">{t}</div><div className="text-xs text-plum/55">{s}</div></div>
              </button>
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <Empty icon={<Search className="h-5 w-5" />} title="No matches" body="Try another status filter or clear the search."
          action={<Button variant="secondary" onClick={() => { setQ(""); setStatusFilter("all"); }}>Clear filters</Button>} />
      ) : (
        <div className="space-y-5">
          {groups.map((g) => (
            <Card key={g.key}>
              {g.label && (
                <div className="flex items-center justify-between border-b border-plum/8 px-5 py-3">
                  <div className="text-sm font-semibold text-ink">{g.label}</div>
                  <span className="text-xs text-plum/50">{g.items.length} monitor{g.items.length === 1 ? "" : "s"}</span>
                </div>
              )}
              <Table head={["API", "Status", "Last answer", "Speed", "Checked", ""]}>
                {g.items.map((m) => {
                  const st = monitorStatus(m);
                  return (
                    <tr key={m.id} className="hover:bg-cream/50">
                      <Td>
                        <div className="flex items-center gap-3"><StatusDot status={st.tone} />
                          <div className="min-w-0">
                            <Link href={`/app/api-monitors/${m.id}`} className="font-medium text-ink hover:text-magenta">{m.name}</Link>
                            <div className="truncate font-mono text-[11px] text-plum/50"><span className="text-magenta">{m.method}</span> {m.url}</div>
                            <div className="text-[11px] text-plum/45">
                              {!groupBySite && m.website_name ? `${m.website_name} · ` : ""}
                              {intervalLabel(m.interval_sec)}
                              {m.assertions?.length ? ` · ${m.assertions.length} extra check${m.assertions.length > 1 ? "s" : ""}` : ""}
                              {m.discovered ? " · from discovery" : ""}
                            </div>
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
                        ) : "-"}
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
          ))}
          <Card><Pager page={safePage} pages={listPages} total={filtered.length} perPage={PER_PAGE} onPage={setPage} /></Card>
        </div>
      )}
      {adding && <AddApiMonitors onClose={() => { setAdding(false); refresh(); }} onDone={refresh} />}
    </div>
  );
}

function FoundFromScan({ scans, siteId, onSite, onChange }: { scans: any[]; siteId: string; onSite: (id: string) => void; onChange: () => void }) {
  const scan = scans.find((s) => s.website_id === siteId) || scans[0];
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="text-sm font-semibold text-ink">Endpoints found - nothing is being watched yet</div>
        <p className="mt-1 max-w-2xl text-sm text-plum/65">The scan listed backend addresses for this site. Pick the ones to watch below. They stay off the monitor list until you add them.</p>
        {scans.length > 1 && (
          <div className="mt-4 max-w-sm">
            <Select label="Website" value={scan.website_id} onChange={(e) => onSite(e.target.value)}>
              {scans.map((s) => <option key={s.website_id} value={s.website_id}>{s.website_name} · {s.endpoints_found || 0} endpoints</option>)}
            </Select>
          </div>
        )}
      </Card>
      <DiscoveryPanel key={scan.website_id} site={{ id: scan.website_id, name: scan.website_name, url: scan.website_url }} onMonitorsChange={onChange} />
    </div>
  );
}
