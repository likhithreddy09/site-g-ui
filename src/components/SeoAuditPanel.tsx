"use client";

import {
  CheckCircle2, CircleAlert, ExternalLink, FileSearch, Globe2, Search, XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, SoftBusy, Stat, cn } from "@/components/ui";
import { timeAgo } from "@/lib/format";

export function seoTone(seo: any): "ok" | "warn" | "bad" | "unknown" | "info" {
  if (!seo || typeof seo.score !== "number") return "unknown";
  if ((seo.failed || 0) > 0 || seo.score < 50) return "bad";
  if ((seo.warned || 0) > 0 || seo.score < 80) return "warn";
  return "ok";
}

function scoreCls(score?: number) {
  if (typeof score !== "number") return "text-plum/40";
  if (score >= 80) return "text-ok";
  if (score >= 60) return "text-ink";
  return "text-bad";
}

function scoreSurface(score?: number) {
  if (typeof score !== "number") return "from-cream-2 to-white ring-plum/10";
  if (score >= 80) return "from-ok/15 to-ok/5 ring-ok/25";
  if (score >= 60) return "from-gold/25 to-gold/5 ring-gold/35";
  return "from-bad/15 to-bad/5 ring-bad/25";
}

function StatusIcon({ status, className }: { status: string; className?: string }) {
  if (status === "pass") return <CheckCircle2 className={cn("h-4 w-4 text-ok", className)} />;
  if (status === "warn") return <CircleAlert className={cn("h-4 w-4 text-[#c48a1a]", className)} />;
  return <XCircle className={cn("h-4 w-4 text-bad", className)} />;
}

function pageKey(p: any) {
  return p.path || p.url || "/";
}

function CheckCard({ c }: { c: any }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-4 ring-1 transition",
        c.status === "fail" && "ring-bad/25 bg-bad/[0.03]",
        c.status === "warn" && "ring-gold/40 bg-gold/[0.08]",
        c.status === "pass" && "ring-plum/8",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <StatusIcon status={c.status} />
          <span className="truncate text-sm font-semibold text-ink">{c.label}</span>
        </div>
        <Badge tone={c.status === "pass" ? "ok" : c.status === "warn" ? "warn" : "bad"}>
          {c.status === "pass" ? "good" : c.status === "warn" ? "improve" : "fix"}
        </Badge>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-plum/70">{c.message}</p>
      {c.value && (
        <p className="mt-2 line-clamp-2 break-all font-mono text-[11px] leading-relaxed text-plum/45">{c.value}</p>
      )}
      {c.tip && c.status !== "pass" && (
        <p className="mt-auto pt-3 text-[12px] leading-relaxed text-ink/80">
          <span className="font-medium text-magenta">Tip · </span>{c.tip}
        </p>
      )}
    </div>
  );
}

export function SeoAuditPanel({
  site,
  busy,
  canEdit,
  onRun,
}: {
  site: any;
  busy?: boolean;
  canEdit?: boolean;
  onRun?: () => void;
}) {
  const s = site.seo;
  const embedded = !!(canEdit && onRun);

  const pages = useMemo(() => {
    if (s?.pages?.length) return s.pages;
    if (s?.checks?.length) {
      return [{
        url: s.url,
        path: "/",
        title: null,
        score: s.score,
        grade: s.grade,
        passed: s.passed,
        warned: s.warned,
        failed: s.failed,
        checks: s.checks,
        improvements: s.improvements,
        summary: s.summary,
        is_home: true,
        error: s.error,
      }];
    }
    return [];
  }, [s]);

  const defaultKey = useMemo(() => {
    const bad = pages.find((p: any) => (p.failed || 0) > 0 || p.error);
    const first = bad || pages[0];
    return first ? pageKey(first) : "/";
  }, [pages]);

  const [picked, setPicked] = useState<string | null>(null);
  const [filter, setFilter] = useState<"issues" | "all">("issues");
  const activeKey = picked ?? defaultKey;
  const active = pages.find((p: any) => pageKey(p) === activeKey) || pages[0];

  const discovery = s?.discovery;
  const pagesChecked = s?.pages_checked ?? pages.length;
  const issues = useMemo(
    () => (s?.improvements || []).filter((i: any) => i.status === "fail" || i.status === "warn"),
    [s],
  );

  const orderedChecks = useMemo(() => {
    const rank = { fail: 0, warn: 1, pass: 2 } as Record<string, number>;
    return [...(active?.checks || [])].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));
  }, [active]);

  const flagCount = orderedChecks.filter((c) => c.status !== "pass").length;
  const passCount = orderedChecks.filter((c) => c.status === "pass").length;
  const visibleChecks = filter === "all" || !flagCount
    ? orderedChecks
    : orderedChecks.filter((c) => c.status !== "pass");

  if (!s) {
    return (
      <Card className="px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-2 text-magenta">
          <FileSearch className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-ink">No SEO audit yet</h3>
        <p className="mx-auto mt-1 max-w-md text-sm text-plum/60">
          We&apos;ll discover pages from your sitemap and links, then check titles, descriptions, mobile setup, and share previews on each.
        </p>
        {embedded && (
          <Button className="mt-5" loading={busy} onClick={onRun}>
            <Search className="h-4 w-4" /> Run first SEO audit
          </Button>
        )}
      </Card>
    );
  }

  const tone = seoTone(s);
  const multi = pages.length > 1;

  return (
    <SoftBusy busy={busy}>
      <div className="space-y-5">
        {/* Score + stats grid */}
        <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
          <Card className={cn("relative overflow-hidden bg-gradient-to-br p-5 ring-1", scoreSurface(s.score))}>
            <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-plum/50">Site score</div>
            <div className={cn("mt-2 font-mono text-5xl font-semibold tracking-tight", scoreCls(s.score))}>{s.score}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge tone={tone}>Grade {s.grade}</Badge>
              <span className="text-xs text-plum/55">/ 100 avg</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-plum/70">{s.summary}</p>
            {s.checked_at && (
              <div className="mt-4 font-mono text-[11px] text-plum/45">Checked {timeAgo(s.checked_at)}</div>
            )}
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Pages" value={pagesChecked} icon={<Globe2 className="h-4 w-4" />} sub={discovery?.sitemap_found ? "via sitemap" : "via links"} />
            <Stat label="Good" value={s.passed || 0} tone="ok" icon={<CheckCircle2 className="h-4 w-4" />} />
            <Stat label="Tips" value={s.warned || 0} tone={(s.warned || 0) > 0 ? "warn" : "default"} icon={<CircleAlert className="h-4 w-4" />} />
            <Stat label="To fix" value={s.failed || 0} tone={(s.failed || 0) > 0 ? "bad" : "ok"} icon={<XCircle className="h-4 w-4" />} />
          </div>
        </div>

        {/* Priority fixes */}
        {issues.length > 0 && (
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-plum/8 px-5 py-3.5">
              <div>
                <div className="text-sm font-semibold text-ink">Start here</div>
                <div className="text-xs text-plum/55">Highest-impact fixes across the site</div>
              </div>
              <Badge tone="warn">{issues.length}</Badge>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
              {issues.slice(0, 9).map((imp: any, idx: number) => (
                <button
                  key={`${imp.id}-${imp.path || ""}-${idx}`}
                  type="button"
                  onClick={() => {
                    if (imp.path) setPicked(imp.path);
                    setFilter("issues");
                  }}
                  className="flex gap-3 rounded-2xl bg-cream/60 p-3.5 text-left ring-1 ring-plum/6 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-magenta/20"
                >
                  <StatusIcon status={imp.status} className="mt-0.5" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      {imp.path && <span className="font-mono text-[11px] text-plum/45">{imp.path}</span>}
                      <span className="text-sm font-medium text-ink">{imp.label}</span>
                    </span>
                    <span className="mt-1 block text-[12px] leading-relaxed text-plum/65 line-clamp-3">
                      {imp.tip || imp.message}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Pages + checklist */}
        <div className={cn("grid gap-4", multi ? "lg:grid-cols-[260px_1fr]" : "")}>
          {multi && (
            <Card className="h-fit overflow-hidden lg:sticky lg:top-4">
              <div className="border-b border-plum/8 px-4 py-3">
                <div className="text-sm font-semibold text-ink">Pages</div>
                <div className="text-[11px] text-plum/50">{pages.length} audited</div>
              </div>
              <ul className="max-h-[min(70vh,560px)] overflow-y-auto scrollbar-thin">
                {pages.map((p: any) => {
                  const key = pageKey(p);
                  const selected = activeKey === key;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => { setPicked(key); setFilter("issues"); }}
                        className={cn(
                          "flex w-full items-center gap-3 border-l-2 px-3.5 py-3 text-left transition",
                          selected
                            ? "border-magenta bg-magenta/[0.06]"
                            : "border-transparent hover:bg-cream/60",
                        )}
                      >
                        <span className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-semibold ring-1",
                          typeof p.score === "number" && p.score >= 80 ? "bg-ok/10 ring-ok/20 text-ok"
                            : typeof p.score === "number" && p.score >= 60 ? "bg-gold/15 ring-gold/30 text-ink"
                              : "bg-bad/10 ring-bad/20 text-bad",
                        )}>
                          {typeof p.score === "number" ? p.score : "—"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate font-mono text-[12.5px] font-medium text-ink">{p.path || "/"}</span>
                            {p.is_home && <span className="rounded bg-plum/8 px-1 py-px text-[9px] uppercase tracking-wide text-plum/50">home</span>}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] text-plum/50">
                            {p.error || (p.failed ? `${p.failed} fix` : p.warned ? `${p.warned} tips` : "Looking good")}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          <Card className="overflow-hidden" id="seo-checklist">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-plum/8 px-5 py-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-ink">
                    {multi ? (active?.path || "/") : "Checklist"}
                  </h3>
                  {active?.is_home && <Badge tone="info">home</Badge>}
                  {active?.grade && <Badge tone={seoTone(active)}>Grade {active.grade}</Badge>}
                  {typeof active?.score === "number" && (
                    <span className={cn("font-mono text-sm font-semibold", scoreCls(active.score))}>{active.score}</span>
                  )}
                </div>
                {active?.url ? (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex max-w-full items-center gap-1 truncate font-mono text-[11px] text-plum/55 hover:text-magenta"
                  >
                    <span className="truncate">{String(active.url).replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  <div className="mt-1 text-xs text-plum/55">On-page SEO signals</div>
                )}
                {active?.title && (
                  <div className="mt-1 truncate text-xs text-plum/60">{active.title}</div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {flagCount > 0 && (
                  <div className="flex rounded-full bg-plum/5 p-0.5">
                    {([
                      ["issues", `Issues (${flagCount})`],
                      ["all", `All (${orderedChecks.length})`],
                    ] as const).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFilter(id)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition",
                          filter === id ? "bg-plum text-cream" : "text-plum/65 hover:text-plum",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
                {embedded && (
                  <Button size="sm" variant="secondary" loading={busy} onClick={onRun}>Run again</Button>
                )}
              </div>
            </div>

            {active?.error && !orderedChecks.length ? (
              <div className="m-5 rounded-2xl bg-bad/5 px-4 py-3 text-sm text-bad ring-1 ring-bad/15">{active.error}</div>
            ) : !visibleChecks.length ? (
              <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                <CheckCircle2 className="mb-3 h-8 w-8 text-ok" />
                <div className="text-sm font-semibold text-ink">Nothing to fix on this page</div>
                <div className="mt-1 text-xs text-plum/55">{passCount} checks passed</div>
                {passCount > 0 && filter === "issues" && (
                  <button type="button" onClick={() => setFilter("all")} className="mt-3 text-xs font-medium text-magenta hover:underline">
                    Show passed checks
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleChecks.map((c: any) => (
                  <CheckCard key={c.id} c={c} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </SoftBusy>
  );
}
