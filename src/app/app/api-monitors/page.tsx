"use client";

import { Pause, Play, Plug, Plus, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddApiMonitors } from "@/components/AddApiMonitors";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Empty, Loading, PageHeader, Pager, Stat, StatusDot, Table, Td, cn } from "@/components/ui";
import { patch, post } from "@/lib/api";
import { httpMeaning, intervalLabel, monitorStatus } from "@/lib/apiMonitors";
import { useAuth } from "@/lib/auth";
import { ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

type StatusFilter = "all" | "up" | "down" | "degraded" | "paused";
const PER_PAGE = 10;

export default function ApiMonitorsPage() {
  const { data, loading, reload } = useApi<any[]>("/api/api-monitors", { poll: 20000 });
  const { data: incidents } = useApi<any[]>("/api/incidents?status=open&source_type=api", { poll: 30000 });
  const [adding, setAdding] = useState(false);
  const [page, setPage] = useState(1);
  const [running, setRunning] = useState<Set<string>>(new Set());
  const [all, setAll] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const { can } = useAuth();
  const toast = useToast();

  const runOne = async (id: string) => {
    setRunning((s) => new Set(s).add(id));
    try {
      return await post(`/api/api-monitors/${id}/run`);
    } finally {
      setRunning((s) => {
        const n = new Set(s);
        n.delete(id);
        return n;
      });
    }
  };

  const runAll = async () => {
    if (!data?.length) return;
    setAll(true);
    const queue = data.filter((m) => !m.paused).map((m) => m.id);
    let ok = 0,
      bad = 0;
    const worker = async () => {
      while (queue.length) {
        const id = queue.shift()!;
        try {
          const r: any = await runOne(id);
          if (r.ok) ok++;
          else bad++;
        } catch {
          bad++;
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    setAll(false);
    reload();
    toast(bad ? `${ok} working · ${bad} failing` : `All ${ok} APIs are working`, bad ? "error" : "ok");
  };

  const stats = useMemo(() => {
    const list = data || [];
    const active = list.filter((m) => !m.paused);
    const healthy = active.filter((m) => m.status === "up").length;
    const failed = active.filter((m) => m.status === "down" || m.status === "degraded").length;
    const withMs = active.filter((m) => typeof m.last_response_ms === "number");
    const avgMs = withMs.length ? Math.round(withMs.reduce((s, m) => s + m.last_response_ms, 0) / withMs.length) : null;
    return {
      total: list.length,
      healthy,
      failed,
      paused: list.filter((m) => m.paused).length,
      avgMs,
      uptimePct: active.length ? Math.round((healthy / active.length) * 100) : null,
      openIncidents: (incidents || []).length,
    };
  }, [data, incidents]);

  const filtered = useMemo(() => {
    const list = data || [];
    const needle = q.trim().toLowerCase();
    return list.filter((m) => {
      if (statusFilter === "paused" && !m.paused) return false;
      if (statusFilter !== "all" && statusFilter !== "paused" && (m.paused || m.status !== statusFilter)) return false;
      if (!needle) return true;
      return `${m.name} ${m.method} ${m.url}`.toLowerCase().includes(needle);
    });
  }, [data, q, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [q, statusFilter]);
  const listPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, listPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div>
      <PageHeader
        eyebrow="Monitoring"
        title="API monitors"
        subtitle="Automated checks for backend endpoints — status, latency, and response validation."
        action={
          can("member") && (
            <>
              {!!data?.length && (
                <Button variant="secondary" onClick={runAll} loading={all}>
                  <RefreshCw className="h-4 w-4" /> Check all
                </Button>
              )}
              <Button onClick={() => setAdding(true)}>
                <Plus className="h-4 w-4" /> Add API monitor
              </Button>
            </>
          )
        }
      />

      {!!data?.length && (
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
          <Stat label="APIs monitored" value={stats.total} />
          <Stat label="Healthy" value={stats.healthy} tone="ok" />
          <Stat label="Failed / flaky" value={stats.failed} tone={stats.failed ? "bad" : undefined} />
          <Stat label="Avg response" value={stats.avgMs != null ? ms(stats.avgMs) : "—"} />
          <Stat label="Uptime" value={stats.uptimePct != null ? `${stats.uptimePct}%` : "—"} tone={stats.uptimePct != null && stats.uptimePct < 95 ? "warn" : "ok"} />
          <Stat label="Open incidents" value={stats.openIncidents} tone={stats.openIncidents ? "bad" : "ok"} />
        </div>
      )}

      {!!data?.length && (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 text-sm">
            {(
              [
                ["all", "All", data.length],
                ["up", "Healthy", stats.healthy],
                ["down", "Failed", data.filter((m) => !m.paused && m.status === "down").length],
                ["degraded", "Flaky", data.filter((m) => !m.paused && m.status === "degraded").length],
                ["paused", "Paused", stats.paused],
              ] as const
            ).map(([k, label, n]) => (
              <button
                key={k}
                onClick={() => setStatusFilter(k)}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition",
                  statusFilter === k ? "bg-plum text-cream" : "bg-plum/5 text-plum/70 hover:bg-plum/10",
                )}
              >
                {label} <span className="opacity-70">{n}</span>
              </button>
            ))}
          </div>
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plum/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or URL…"
              className="h-9 w-full rounded-xl bg-white/80 pl-9 pr-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-2 focus:ring-magenta/40"
            />
          </div>
        </div>
      )}

      {loading && !data ? (
        <Loading />
      ) : !data?.length ? (
        <Empty
          icon={<Plug className="h-6 w-6" />}
          title="No API monitors yet"
          body="Add an endpoint, import from cURL, or load an OpenAPI spec. Watchfront will check it on your schedule and alert on failures."
          action={
            can("member") && (
              <Button onClick={() => setAdding(true)}>
                <Plus className="h-4 w-4" /> Add API monitor
              </Button>
            )
          }
        />
      ) : filtered.length === 0 ? (
        <Empty
          icon={<Search className="h-5 w-5" />}
          title="No matches"
          body="Try another filter or clear the search."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQ("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="space-y-5">
          <Card>
            <Table head={["API", "Status", "Last result", "Response", "Frequency", "Checked", ""]}>
              {pageItems.map((m) => {
                const st = monitorStatus(m);
                return (
                  <tr key={m.id} className="hover:bg-cream/50">
                    <Td>
                      <div className="flex items-center gap-3">
                        <StatusDot status={st.tone} />
                        <div className="min-w-0">
                          <Link href={`/app/api-monitors/${m.id}`} className="font-medium text-ink hover:text-magenta">
                            {m.name}
                          </Link>
                          <div className="truncate font-mono text-[11px] text-plum/50">
                            <span className="text-magenta">{m.method}</span> {m.url}
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <Badge tone={st.tone}>{st.label}</Badge>
                    </Td>
                    <Td className="max-w-[220px] text-xs">
                      {m.last_status_code != null || m.last_error ? (
                        <span className={m.status === "down" ? "text-bad" : "text-plum/75"}>
                          {m.last_status_code ? <span className="font-mono">{m.last_status_code} </span> : null}
                          {m.status === "down" && m.last_error ? m.last_error : httpMeaning(m.last_status_code)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </Td>
                    <Td className="font-mono text-xs">{ms(m.last_response_ms)}</Td>
                    <Td className="text-xs text-plum/60">{intervalLabel(m.interval_sec)}</Td>
                    <Td className="whitespace-nowrap text-xs text-plum/60">{timeAgo(m.last_check_at) || "not yet"}</Td>
                    <Td>
                      {can("member") && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            loading={running.has(m.id)}
                            onClick={async () => {
                              try {
                                const r: any = await runOne(m.id);
                                toast(r.ok ? `${m.name}: working` : `${m.name}: ${r.error}`, r.ok ? "ok" : "error");
                                reload();
                              } catch (e: any) {
                                toast(e.message, "error");
                              }
                            }}
                          >
                            <Play className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={async () => {
                              await patch(`/api/api-monitors/${m.id}`, { paused: !m.paused });
                              reload();
                            }}
                            title={m.paused ? "Resume" : "Pause"}
                          >
                            {m.paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                          </Button>
                        </div>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </Table>
          </Card>
          <Card>
            <Pager page={safePage} pages={listPages} total={filtered.length} perPage={PER_PAGE} onPage={setPage} />
          </Card>
        </div>
      )}

      {adding && (
        <AddApiMonitors
          onClose={() => {
            setAdding(false);
            reload();
          }}
          onDone={reload}
        />
      )}
    </div>
  );
}
