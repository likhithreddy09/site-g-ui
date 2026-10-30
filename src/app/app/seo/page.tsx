"use client";

import { AlertTriangle, CheckCircle2, Clock, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { seoTone } from "@/components/SeoAuditPanel";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Empty, Loading, PageHeader, SoftBusy, Stat, cn } from "@/components/ui";
import { post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

type Filter = "all" | "needs" | "ok" | "pending" | "off";

function siteBucket(s: any): Filter {
  if (s.seo_enabled === false) return "off";
  const score = s.seo?.score;
  if (typeof score !== "number") return "pending";
  if (score < 70 || (s.seo?.failed || 0) > 0) return "needs";
  return "ok";
}

export default function SeoPage() {
  const { data: sites, loading, refreshing, reload } = useApi<any[]>("/api/websites", { poll: 30000 });
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [auditingAll, setAuditingAll] = useState(false);
  const { can } = useAuth();
  const toast = useToast();

  const counts = useMemo(() => {
    const c = { all: 0, needs: 0, ok: 0, pending: 0, off: 0 };
    for (const s of sites || []) {
      c.all++;
      c[siteBucket(s)]++;
    }
    return c;
  }, [sites]);

  const scored = useMemo(
    () => (sites || []).filter((s) => typeof s.seo?.score === "number"),
    [sites],
  );
  const avgScore = scored.length
    ? Math.round(scored.reduce((a, s) => a + s.seo.score, 0) / scored.length)
    : null;

  const rows = useMemo(() => {
    const list = sites || [];
    const needle = q.trim().toLowerCase();
    return list.filter((s) => {
      if (filter !== "all" && siteBucket(s) !== filter) return false;
      if (!needle) return true;
      return `${s.name} ${s.url} ${s.client_name || ""}`.toLowerCase().includes(needle);
    });
  }, [sites, q, filter]);

  const run = async (id: string, name: string) => {
    setBusyId(id);
    try {
      const s = await post<any>(`/api/websites/${id}/check?kind=seo`);
      toast(`SEO audit complete for ${name} — score ${s.seo?.score ?? "—"} (${s.seo?.grade || "—"})`);
      reload();
    } catch (e: any) {
      toast(e.message || "Could not run SEO audit", "error");
    } finally {
      setBusyId(null);
    }
  };

  const runPending = async () => {
    const targets = (sites || []).filter((s) => s.seo_enabled !== false && siteBucket(s) === "pending");
    if (!targets.length) {
      toast("Every enabled site already has an audit");
      return;
    }
    setAuditingAll(true);
    let ok = 0;
    let bad = 0;
    for (const s of targets) {
      try {
        await post(`/api/websites/${s.id}/check?kind=seo`);
        ok++;
      } catch {
        bad++;
      }
    }
    setAuditingAll(false);
    reload();
    toast(
      bad ? `Audited ${ok} · ${bad} failed` : `Audited ${ok} site${ok === 1 ? "" : "s"}`,
      bad ? "error" : "ok",
    );
  };

  return (
    <div>
      <PageHeader
        eyebrow="Testing & QA"
        title="SEO audits"
        subtitle="Site-wide SEO scores from sitemap and internal pages — titles, descriptions, mobile & share previews."
        action={can("member") && counts.pending > 0 && (
          <Button variant="secondary" loading={auditingAll} onClick={runPending}>
            <RefreshCw className="h-4 w-4" /> Audit {counts.pending} pending
          </Button>
        )}
      />

      {!!sites?.length && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Sites" value={counts.all} icon={<Search className="h-4 w-4" />} />
          <Stat
            label="Average score"
            value={avgScore ?? "—"}
            sub={scored.length ? `across ${scored.length} audited` : "no audits yet"}
            tone={avgScore == null ? "default" : avgScore >= 80 ? "ok" : avgScore >= 60 ? "warn" : "bad"}
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <Stat
            label="Needs work"
            value={counts.needs}
            tone={counts.needs ? "warn" : "ok"}
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <Stat
            label="Not audited"
            value={counts.pending}
            tone={counts.pending ? "default" : "ok"}
            icon={<Clock className="h-4 w-4" />}
          />
        </div>
      )}

      {!!sites?.length && (
        <div className="mb-5 space-y-3">
          <div className="flex flex-wrap gap-2 text-sm">
            {([
              ["all", "All", counts.all],
              ["needs", "Needs work", counts.needs],
              ["ok", "Looking good", counts.ok],
              ["pending", "Not audited", counts.pending],
              ["off", "Off", counts.off],
            ] as const).map(([k, label, n]) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition",
                  filter === k ? "bg-plum text-cream" :
                    k === "needs" ? "bg-bad/10 text-bad hover:bg-bad/15" :
                    k === "ok" ? "bg-ok/10 text-ok hover:bg-ok/15" :
                    k === "pending" ? "bg-gold/20 text-[#8a5b00] hover:bg-gold/30" :
                    "bg-plum/5 text-plum/70 hover:bg-plum/10",
                )}
              >
                {label} <span className="opacity-70">{n}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plum/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search websites…"
                className="h-9 w-full rounded-xl bg-white/80 pl-9 pr-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-2 focus:ring-magenta/40"
              />
            </div>
            <span className="text-xs text-plum/50">{rows.length} of {sites.length}</span>
          </div>
        </div>
      )}

      {loading && !sites ? (
        <Loading rows={4} />
      ) : !sites?.length ? (
        <Empty
          icon={<Search className="h-6 w-6" />}
          title="No websites yet"
          body="Add a website first, then run an SEO audit from here."
          action={can("member") ? <Link href="/app/websites"><Button>Add a website</Button></Link> : undefined}
        />
      ) : !rows.length ? (
        <Empty
          icon={<Search className="h-5 w-5" />}
          title="No matches"
          body="Try another filter or clear the search."
          action={<Button variant="secondary" onClick={() => { setQ(""); setFilter("all"); }}>Clear filters</Button>}
        />
      ) : (
        <SoftBusy busy={refreshing}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rows.map((s, i) => {
              const seo = s.seo;
              const score = seo?.score;
              const bucket = siteBucket(s);
              return (
                <Card
                  key={s.id}
                  className="group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl animate-fade-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                >
                  <Link href={`/app/seo/${s.id}`} className="flex flex-1 items-start gap-4 p-5">
                    <div
                      className={cn(
                        "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ring-1",
                        typeof score === "number"
                          ? score >= 80
                            ? "bg-ok/10 ring-ok/20 text-ok"
                            : score >= 60
                              ? "bg-gold/15 ring-gold/30 text-ink"
                              : "bg-bad/10 ring-bad/20 text-bad"
                          : "bg-cream-2 ring-plum/10 text-plum/40",
                      )}
                    >
                      {typeof score === "number" ? (
                        <>
                          <span className="font-mono text-xl font-semibold leading-none">{score}</span>
                          <span className="mt-0.5 text-[9px] uppercase tracking-wider opacity-60">/100</span>
                        </>
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-ink group-hover:text-magenta">{s.name}</div>
                          <div className="mt-0.5 truncate text-xs text-plum/55">{s.url?.replace(/^https?:\/\//, "")}</div>
                        </div>
                        <Badge tone={seoTone(seo)}>
                          {bucket === "off" ? "off" : seo ? `Grade ${seo.grade}` : "pending"}
                        </Badge>
                      </div>
                      {s.client_name && <div className="mt-1 text-[11px] text-plum/45">{s.client_name}</div>}
                      <div className="mt-3 text-sm text-plum/70">
                        {bucket === "off"
                          ? "SEO audit is off for this site."
                          : typeof score === "number"
                            ? <>
                                {seo.pages_checked ? `${seo.pages_checked} page${seo.pages_checked === 1 ? "" : "s"} · ` : ""}
                                {seo.failed ? `${seo.failed} to fix` : seo.warned ? `${seo.warned} tips` : "Looking good"}
                              </>
                            : "No audit yet — open to run one."}
                      </div>
                    </div>
                  </Link>
                  <div className="mt-auto flex items-center justify-between border-t border-plum/6 px-5 py-3">
                    <span className="font-mono text-[11px] text-plum/45">
                      {seo?.checked_at ? `Checked ${timeAgo(seo.checked_at)}` : "Never audited"}
                    </span>
                    {can("member") && bucket !== "off" && (
                      <Button size="sm" variant="ghost" loading={busyId === s.id} onClick={() => void run(s.id, s.name)}>
                        <RefreshCw className="h-3.5 w-3.5" /> Run
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </SoftBusy>
      )}
    </div>
  );
}
