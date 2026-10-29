"use client";

import { Bug, ChevronLeft, ChevronRight, Code2, FileWarning, Globe, Plug, RefreshCw, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CountBars } from "@/components/charts";
import { RecheckPanel } from "@/components/RecheckPanel";
import { Badge, Card, Empty, Loading, PageHeader, Select, SoftBusy, Stat, Tabs } from "@/components/ui";
import { explainError } from "@/lib/errorExplain";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

const icon = (e: any) => (e.kind === "api" ? Plug : e.message?.startsWith("Failed to load resource") ? FileWarning : Bug);
const isNew = (e: any) => Date.now() - new Date(e.first_seen).getTime() < 24 * 3600 * 1000;
const fileName = (u?: string) => (u || "").split("?")[0].split("/").filter(Boolean).pop() || "";
const PER_PAGE = 10;

function pageWindow(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(pages - 1, page + 1);
  if (left > 2) out.push("…");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < pages - 1) out.push("…");
  out.push(pages);
  return out;
}

function ErrorsInner() {
  const sp = useSearchParams();
  const [kind, setKind] = useState<"all" | "js" | "api">("all");
  const [status, setStatus] = useState("active");
  const [site, setSite] = useState(sp.get("website_id") || "");
  const [hours, setHours] = useState(168);
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const { data: sites } = useApi<any[]>("/api/websites");
  const params = new URLSearchParams({ status, hours: String(hours), sort, page: String(page), per_page: String(PER_PAGE), ...(kind !== "all" && { kind }), ...(site && { website_id: site }) });
  const { data, loading, refreshing, reload } = useApi<{ items: any[]; total: number; page: number; per_page: number; pages: number }>(`/api/errors?${params}`, { poll: 15000 });
  useEffect(() => {
    if (data && page > data.pages) setPage(data.pages || 1);
  }, [data, page]);
  const { data: sum } = useApi<any>(`/api/errors/summary${site ? `?website_id=${site}` : ""}`, { poll: 30000 });
  const current = sites?.find((s) => s.id === site);

  return (
    <div>
      <PageHeader eyebrow="Monitoring" title="Browser errors"
        subtitle="Things that break in visitors' browsers: JavaScript crashes, missing files, and requests to your backend that fail." />

      {sum && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Open errors" value={sum.open} icon={<Bug className="h-4 w-4" />} tone={sum.open ? "warn" : "ok"} />
          <Stat label="New today" value={sum.new_24h} icon={<Sparkles className="h-4 w-4" />} sub="first seen in the last 24 h" tone={sum.new_24h ? "bad" : "default"} />
          <Stat label="Visitors affected" value={sum.visitors_24h} icon={<Users className="h-4 w-4" />} sub="hit at least one error in 24 h" />
          <Card className="flex flex-col justify-between p-5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">Errors · 24 h</span>
              <span className="font-mono text-lg font-semibold text-ink">{sum.events_24h}</span>
            </div>
            <CountBars values={sum.series} className="mt-2 h-10 w-full" />
          </Card>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="w-52"><Select value={site} onChange={(e) => { setSite(e.target.value); setPage(1); }}><option value="">All websites</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></div>
        <Tabs<"all" | "js" | "api"> value={kind} onChange={(v) => { setKind(v); setPage(1); }} tabs={[{ id: "all", label: "Everything" }, { id: "js", label: "Page errors" }, { id: "api", label: "Failed requests" }]} />
        <div className="w-36"><Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          {[["active", "Open"], ["resolved", "Fixed"], ["ignored", "Ignored"], ["all", "All"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </Select></div>
        <div className="w-36"><Select value={hours} onChange={(e) => { setHours(Number(e.target.value)); setPage(1); }}><option value={24}>Last 24 hours</option><option value={168}>Last 7 days</option><option value={720}>Last 30 days</option></Select></div>
        <div className="w-44"><Select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} aria-label="Sort by">
          <option value="recent">Most recent</option><option value="users">Most visitors affected</option><option value="count">Most frequent</option>
        </Select></div>
      </div>

      
      {current && (
        <Card className="mb-4 flex flex-wrap items-center gap-3 px-5 py-3.5">
          <Code2 className="h-4 w-4 text-magenta" />
          <div className="flex-1 text-sm text-plum/70">Want errors from real visitors, not only re-checks? <Link href={`/app/websites/${current.id}?tab=script`} className="font-medium text-magenta hover:underline">Install the ~3 KB script on {current.name}</Link>.</div>
        </Card>
      )}

      {current ? <RecheckPanel key={current.id} site={current} onDone={reload} /> : !!sites?.length && (
        <Card className="mb-6 flex flex-wrap items-center gap-3 px-5 py-4">
          <RefreshCw className="h-5 w-5 text-magenta" />
          <div className="flex-1 text-sm"><span className="font-semibold text-ink">Re-check a website now.</span> <span className="text-plum/65">We open it in a real browser and list any errors — no script needed.</span></div>
          <div className="flex flex-wrap gap-2">
            {sites.slice(0, 6).map((s) => <button key={s.id} onClick={() => { setSite(s.id); setPage(1); }} className="flex items-center gap-1.5 rounded-full bg-cream-2 px-3 py-1.5 text-xs text-plum hover:bg-magenta hover:text-white"><Globe className="h-3.5 w-3.5" /> {s.name}</button>)}
          </div>
        </Card>
      )}

      {loading && !data ? <Loading rows={4} /> : !data?.items.length ? (
        <Empty icon={<Bug className="h-6 w-6" />} title={status === "active" ? "No open errors" : "Nothing here"}
          body={<>Click <b>Re-check now</b> above to test a website right away{current ? <> — or <Link href={`/app/websites/${current.id}?tab=script`} className="text-magenta hover:underline">install the visitor script</Link> to hear about errors real people hit</> : <>, and install the visitor script from a website → <b>Browser errors</b> tab</>}.</>} />
      ) : (
        <SoftBusy busy={refreshing}>
        <Card>
          <ul className="divide-y divide-plum/6">
            {data.items.map((e) => {
              const ex = explainError(e);
              const Icon = icon(e);
              const pages = Object.keys(e.pages || {}).length;
              const visitors = (e.origins?.visitors || 0) > 0 || !e.origins;
              return (
                <li key={e.id}>
                  <Link href={`/app/errors/${e.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-cream/50">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${e.kind === "api" ? "bg-rose/20 text-magenta" : "bg-sky/25 text-teal"}`}><Icon className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-ink">{ex.title}</span>
                        {isNew(e) && e.status === "active" && <Badge tone="critical">new</Badge>}
                        {e.regressed_at && e.status === "active" && <Badge tone="major">came back</Badge>}
                        {e.third_party && <Badge tone="ignored">third-party</Badge>}
                        {e.status !== "active" && <Badge tone={e.status === "resolved" ? "ok" : "ignored"}>{e.status === "resolved" ? "fixed" : e.status}</Badge>}
                      </div>
                      <div className="mt-0.5 truncate font-mono text-[11px] text-plum/50">{e.message}</div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-plum/60">
                        <span>{e.website_name}</span>
                        {e.culprit?.fn && <span className="flex items-center gap-1 font-mono"><Code2 className="h-3 w-3" />{e.culprit.fn} · {fileName(e.culprit.file)}{e.culprit.line ? `:${e.culprit.line}` : ""}</span>}
                        <span>{pages} page{pages === 1 ? "" : "s"}</span>
                        {!visitors && <span>Found by re-check</span>}
                        {e.last_release && <span className="font-mono">{e.last_release}</span>}
                      </div>
                    </div>
                    <div className="hidden shrink-0 md:block" title="Last 24 hours"><CountBars values={e.trend || []} /></div>
                    <div className="w-20 shrink-0 text-right">
                      <div className="font-mono text-lg font-semibold text-ink">{e.count}×</div>
                      <div className="text-[11px] text-plum/60">{e.users ? <span className="font-medium text-magenta">{e.users} visitor{e.users === 1 ? "" : "s"}</span> : `last ${timeAgo(e.last_seen)}`}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ErrorPager page={data.page} pages={data.pages} total={data.total} perPage={data.per_page} onPage={setPage} />
        </Card>
        </SoftBusy>
      )}
    </div>
  );
}

function ErrorPager({ page, pages, total, perPage, onPage }: { page: number; pages: number; total: number; perPage: number; onPage: (p: number) => void }) {
  if (!total) return null;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);
  const btn = "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 text-xs font-medium text-plum/70 transition hover:bg-plum/5 disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-plum/8 px-5 py-3">
      <p className="text-xs text-plum/60">Showing {start}–{end} of {total}</p>
      <div className="flex items-center gap-1">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /> Previous</button>
        {pageWindow(page, pages).map((n, i) => n === "…"
          ? <span key={`gap-${i}`} className="px-1 text-xs text-plum/40">…</span>
          : <button key={n} type="button" aria-current={n === page ? "page" : undefined} onClick={() => onPage(n)} className={n === page ? "inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-plum px-2.5 text-xs font-medium text-cream" : btn}>{n}</button>)}
        <button type="button" className={btn} disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">Next <ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export default function ErrorsPage() {
  return <Suspense><ErrorsInner /></Suspense>;
}
