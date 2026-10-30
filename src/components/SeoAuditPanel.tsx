"use client";

import {
  CheckCircle2, ChevronDown, CircleAlert, ExternalLink, FileSearch, Search, XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, CardHeader, Toggle, cn } from "@/components/ui";
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

function scoreRing(score?: number) {
  if (typeof score !== "number") return "bg-cream-2 ring-plum/10";
  if (score >= 80) return "bg-ok/10 ring-ok/25";
  if (score >= 60) return "bg-gold/15 ring-gold/35";
  return "bg-bad/10 ring-bad/25";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 text-ok" />;
  if (status === "warn") return <CircleAlert className="h-4 w-4 text-[#c48a1a]" />;
  return <XCircle className="h-4 w-4 text-bad" />;
}

function CheckList({ checks, compact }: { checks: any[]; compact?: boolean }) {
  const ordered = useMemo(() => {
    const rank = { fail: 0, warn: 1, pass: 2 } as Record<string, number>;
    return [...(checks || [])].sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9));
  }, [checks]);

  if (!ordered.length) {
    return <p className="px-5 py-8 text-center text-sm text-plum/55">No checklist for this page.</p>;
  }

  return (
    <ul className={cn("divide-y divide-plum/6", compact && "text-[13px]")}>
      {ordered.map((c: any) => (
        <li
          key={c.id}
          className={cn(
            "flex gap-3 px-5 py-3",
            c.status === "fail" && "bg-bad/[0.04]",
            c.status === "warn" && "bg-gold/[0.08]",
          )}
        >
          <span className="mt-0.5 shrink-0"><StatusIcon status={c.status} /></span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-ink">{c.label}</span>
              <Badge tone={c.status === "pass" ? "ok" : c.status === "warn" ? "warn" : "bad"}>
                {c.status === "pass" ? "good" : c.status === "warn" ? "improve" : "fix"}
              </Badge>
            </span>
            <span className="mt-0.5 block text-sm text-plum/70">{c.message}</span>
            {c.value && (
              <span className="mt-1 block break-all font-mono text-[11px] leading-relaxed text-plum/50">{c.value}</span>
            )}
            {c.tip && c.status !== "pass" && (
              <span className="mt-2 block rounded-xl bg-white/80 px-3 py-2 text-[12px] leading-relaxed text-ink/85 ring-1 ring-plum/8">
                <span className="font-medium text-magenta">Tip · </span>{c.tip}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PagePicker({
  pages,
  active,
  onPick,
}: {
  pages: any[];
  active: string;
  onPick: (key: string) => void;
}) {
  if (pages.length <= 1) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {pages.map((p: any) => {
        const key = p.path || p.url || "/";
        const selected = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onPick(key)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm transition ring-1",
              selected ? "bg-plum text-cream ring-plum" : "bg-white text-plum/75 ring-plum/10 hover:ring-plum/25",
            )}
          >
            <span className={cn("font-mono text-xs font-semibold", selected ? "text-cream" : scoreCls(p.score))}>
              {typeof p.score === "number" ? p.score : "—"}
            </span>
            <span className="max-w-[140px] truncate font-mono text-xs">{p.path || "/"}</span>
            {p.is_home && <span className={cn("text-[10px] uppercase tracking-wide", selected ? "text-cream/70" : "text-plum/45")}>home</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SeoAuditPanel({
  site,
  busy,
  canEdit,
  onRun,
  onToggle,
}: {
  site: any;
  busy?: boolean;
  canEdit?: boolean;
  onRun?: () => void;
  onToggle?: (v: boolean) => void | Promise<void>;
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
    return first ? (first.path || first.url || "/") : "/";
  }, [pages]);

  const [picked, setPicked] = useState<string | null>(null);
  const activeKey = picked ?? defaultKey;
  const active = pages.find((p: any) => (p.path || p.url || "/") === activeKey) || pages[0];
  const [showPasses, setShowPasses] = useState(false);

  const discovery = s?.discovery;
  const pagesChecked = s?.pages_checked ?? pages.length;
  const issues = useMemo(
    () => (s?.improvements || []).filter((i: any) => i.status === "fail" || i.status === "warn"),
    [s],
  );

  const activeChecks = useMemo(() => {
    const all = active?.checks || [];
    if (showPasses) return all;
    const flagged = all.filter((c: any) => c.status !== "pass");
    return flagged.length ? flagged : all;
  }, [active, showPasses]);

  const passCount = (active?.checks || []).filter((c: any) => c.status === "pass").length;
  const flagCount = (active?.checks || []).filter((c: any) => c.status !== "pass").length;

  if (site.seo_enabled === false) {
    return (
      <Card className="p-6">
        <p className="text-sm text-plum/60">SEO audit is turned off for this website (or not on your plan). Turn it on to get a daily score.</p>
        {embedded && onToggle && (
          <div className="mt-4"><Toggle checked={false} onChange={(v) => void onToggle(v)} label="Enable SEO audit" /></div>
        )}
      </Card>
    );
  }

  if (!s) {
    return (
      <Card>
        {embedded && (
          <CardHeader
            title={<span className="flex items-center gap-2"><Search className="h-4 w-4" /> SEO audit</span>}
            subtitle="We scan the homepage, sitemap, and important internal pages"
            action={<Button size="sm" loading={busy} onClick={onRun}>Run first audit</Button>}
          />
        )}
        <div className="px-5 py-14 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-2 text-magenta">
            <FileSearch className="h-6 w-6" />
          </div>
          <p className="mx-auto max-w-md text-sm text-plum/60">
            No audit yet. We&apos;ll discover pages from your sitemap and links, then check titles, descriptions, mobile setup, and share previews on each.
          </p>
          {embedded && (
            <Button className="mt-5" loading={busy} onClick={onRun}>Run first SEO audit</Button>
          )}
        </div>
      </Card>
    );
  }

  const tone = seoTone(s);

  return (
    <div className="space-y-5">
      {/* Hero */}
      <Card className="overflow-hidden">
        <div
          className={cn(
            "flex flex-wrap items-stretch gap-5 border-b border-plum/8 px-5 py-5 sm:px-6",
            tone === "ok" && "bg-ok/[0.06]",
            tone === "warn" && "bg-gold/15",
            tone === "bad" && "bg-bad/[0.06]",
            (tone === "unknown" || tone === "info") && "bg-cream/60",
          )}
        >
          <div className={cn("flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center rounded-3xl ring-1", scoreRing(s.score))}>
            <span className={cn("font-mono text-4xl font-semibold leading-none tracking-tight", scoreCls(s.score))}>{s.score}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-plum/45">/ 100</span>
          </div>
          <div className="min-w-0 flex-1 self-center">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-ink">Grade {s.grade}</h2>
              <Badge tone={tone}>{tone === "ok" ? "Looking good" : tone === "warn" ? "Needs polish" : tone === "bad" ? "Needs work" : "Pending"}</Badge>
            </div>
            <p className="mt-1 max-w-xl text-sm text-plum/70">{s.summary}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-plum/50">
              <span>{pagesChecked} page{pagesChecked === 1 ? "" : "s"} audited</span>
              <span className="text-ok">{s.passed || 0} good</span>
              <span className="text-[#8a5b00]">{s.warned || 0} tips</span>
              <span className="text-bad">{s.failed || 0} to fix</span>
              {s.checked_at && <span>Checked {timeAgo(s.checked_at)}</span>}
            </div>
            {discovery && (
              <div className="mt-1.5 text-[11px] text-plum/45">
                {discovery.sitemap_found ? "Discovered via sitemap" : "No sitemap found"}
                {discovery.from_links ? ` · ${discovery.from_links} from links` : ""}
                {discovery.limit ? ` · plan cap ${discovery.limit}` : ""}
              </div>
            )}
          </div>
          {embedded && (
            <div className="flex flex-wrap items-center gap-3 self-center">
              {onToggle && <Toggle checked={site.seo_enabled !== false} onChange={(v) => void onToggle(v)} label="Enabled" />}
              <Button size="sm" variant="secondary" loading={busy} onClick={onRun}>Run again</Button>
            </div>
          )}
        </div>

        {issues.length > 0 && (
          <div className="px-5 py-4 sm:px-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-plum/50">Start here</div>
            <ol className="space-y-2.5">
              {issues.slice(0, 8).map((imp: any, idx: number) => (
                <li key={`${imp.id}-${imp.path || ""}-${idx}`} className="flex gap-3 rounded-2xl bg-cream/70 px-4 py-3 ring-1 ring-plum/6">
                  <span className="mt-0.5 shrink-0"><StatusIcon status={imp.status} /></span>
                  <span className="min-w-0 flex-1 text-sm text-ink">
                    <span className="flex flex-wrap items-center gap-2">
                      {imp.path && <span className="font-mono text-[11px] text-plum/45">{imp.path}</span>}
                      <span className="font-medium">{imp.label}</span>
                    </span>
                    <span className="mt-0.5 block text-plum/70">{imp.tip || imp.message}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Card>

      {/* Per-page checklist */}
      <Card>
        <CardHeader
          title={pages.length > 1 ? "Page checklist" : "Checklist"}
          subtitle={
            active?.url ? (
              <a href={active.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-magenta">
                {String(active.url).replace(/^https?:\/\//, "")}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : "On-page SEO signals"
          }
          action={
            flagCount > 0 && passCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowPasses((v) => !v)}
                className="rounded-full bg-plum/5 px-3 py-1 text-xs font-medium text-plum/70 hover:bg-plum/10"
              >
                {showPasses ? "Hide passed" : `Show ${passCount} passed`}
              </button>
            ) : undefined
          }
        />
        <div className="space-y-4 px-5 pb-5">
          <PagePicker pages={pages} active={activeKey} onPick={setPicked} />

          {pages.length > 1 && active && (
            <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-cream/60 px-4 py-3">
              <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl font-mono text-sm font-semibold ring-1", scoreRing(active.score), scoreCls(active.score))}>
                {active.score ?? "—"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-medium text-ink">{active.path || "/"}</span>
                  {active.is_home && <Badge tone="info">home</Badge>}
                  {active.grade && <Badge tone={seoTone(active)}>Grade {active.grade}</Badge>}
                </div>
                <div className="mt-0.5 truncate text-xs text-plum/55">
                  {active.error || active.title || active.summary}
                </div>
              </div>
            </div>
          )}

          {active?.error && !(active?.checks?.length) ? (
            <p className="rounded-2xl bg-bad/5 px-4 py-3 text-sm text-bad ring-1 ring-bad/15">{active.error}</p>
          ) : (
            <div className="overflow-hidden rounded-2xl ring-1 ring-plum/8">
              <CheckList checks={activeChecks} />
            </div>
          )}
        </div>
      </Card>

      {pages.length > 1 && (
        <Card>
          <CardHeader title="All pages" subtitle={`${pages.length} audited · tap one to inspect`} />
          <ul className="divide-y divide-plum/6">
            {pages.map((p: any) => {
              const key = p.path || p.url || "/";
              const selected = activeKey === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setPicked(key);
                      setShowPasses(false);
                      document.getElementById("seo-checklist")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-cream/50",
                      selected && "bg-cream/70",
                    )}
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-semibold ring-1", scoreRing(p.score), scoreCls(p.score))}>
                      {typeof p.score === "number" ? p.score : "—"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate font-mono text-sm font-medium text-ink">{p.path || "/"}</span>
                        {p.is_home && <Badge tone="info">home</Badge>}
                        {p.error && <Badge tone="bad">error</Badge>}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-plum/55">
                        {p.error || p.title || (p.failed ? `${p.failed} to fix` : p.warned ? `${p.warned} tips` : "Looking good")}
                      </span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 -rotate-90 text-plum/30", selected && "text-magenta")} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
      <div id="seo-checklist" className="sr-only" />
    </div>
  );
}
