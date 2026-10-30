"use client";

import { ArrowLeft, ArrowRight, Bug, CheckCircle2, CircleAlert, Copy, Lock, MousePointerClick, Pause, Play, Plug, RefreshCw, ScanEye, ScanSearch, Search, ShieldCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { FailureBars, ResponseChart, UptimeBars } from "@/components/charts";
import { DiscoveryPanel } from "@/components/DiscoveryPanel";
import { useToast } from "@/components/toast";
import { WebsiteForm } from "@/components/WebsiteForm";
import { Badge, Button, Card, CardHeader, ChipInput, Input, KV, Loading, PageHeader, SoftBusy, Stat, StatusDot, Table, Tabs, Td, Toggle } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { certTone, expiryHeadline, expiryLabel, fmtDate, issuerShort, ms, pct, shortError, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";
import { RecheckPanel } from "@/components/RecheckPanel";
import { checkStatus } from "@/lib/pageChecks";

type Tab = "overview" | "history" | "ssl" | "seo" | "monitoring" | "discovery" | "script" | "settings";

function WebsiteDetailInner() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const sp = useSearchParams();
  const toast = useToast();
  const { can } = useAuth();
  const initial = (sp.get("tab") || "overview") as Tab;
  const [tab, setTabState] = useState<Tab>(["overview","history","ssl","seo","monitoring","discovery","script","settings"].includes(initial) ? initial : "overview");
  const setTab = (t: Tab) => {
    setTabState(t);
    const url = new URL(window.location.href);
    if (t === "overview") url.searchParams.delete("tab"); else url.searchParams.set("tab", t);
    window.history.replaceState({}, "", url.pathname + url.search);
  };
  const [hours, setHours] = useState(24);
  const [busy, setBusy] = useState<string | null>(null);
  const [scanKey, setScanKey] = useState(0);
  const { data: site, reload, setData } = useApi<any>(`/api/websites/${id}`, { poll: 20000 });
  const { data: stats } = useApi<any>(`/api/websites/${id}/stats?hours=${hours}`, { poll: 30000 });

  if (!site) return <Loading rows={4} />;

  const run = async (kind: string) => {
    setBusy(kind);
    try {
      const s = await post(`/api/websites/${id}/check?kind=${kind}`);
      setData(s);
      toast(
        kind === "http"
          ? `Check complete: ${s.status} (${ms(s.last_response_ms)})`
          : kind === "seo"
            ? `SEO audit complete — score ${s.seo?.score ?? "—"} (${s.seo?.grade || "—"})`
            : `${kind.toUpperCase()} check complete`,
      );
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(null);
    }
  };

  const togglePause = async () => {
    await patch(`/api/websites/${id}`, { paused: !site.paused });
    reload();
  };

  const fullRecheck = async () => {
    setBusy("full");
    try {
      const [s, scan]: any[] = await Promise.all([post(`/api/websites/${id}/check?kind=http`), post(`/api/websites/${id}/recheck`)]);
      setData(s);
      setScanKey((k) => k + 1);
      setTab("script");
      const problems = scan.found?.length || 0;
      toast(`${s.status === "up" ? "Website is up" : `Website is ${s.status}`} · ${scan.status === "failed" ? "error check failed" : problems ? `${problems} browser error${problems > 1 ? "s" : ""} found` : `no browser errors on ${scan.pages.length} pages`}`, s.status === "up" && !problems ? "ok" : "error");
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(null);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete ${site.name} and all of its monitoring history? This cannot be undone.`)) return;
    await del(`/api/websites/${id}`);
    toast(`${site.name} deleted`);
    router.push("/app/websites");
  };

  return (
    <div>
      <Link href="/app/websites" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> Websites</Link>
      <PageHeader
        eyebrow={site.client_name || "No client"}
        title={<span className="flex items-center gap-3"><StatusDot status={site.paused ? "paused" : site.status} />{site.name}</span>}
        subtitle={<a href={site.url} target="_blank" rel="noreferrer" className="link-underline font-mono text-xs">{site.url}</a>}
        action={can("member") && <>
          <Button variant="secondary" onClick={togglePause}>{site.paused ? <><Play className="h-4 w-4" /> Resume</> : <><Pause className="h-4 w-4" /> Pause</>}</Button>
          <Button variant="secondary" onClick={() => run("http")} loading={busy === "http"} disabled={busy === "full"}><RefreshCw className="h-4 w-4" /> Quick check</Button>
          <Button onClick={fullRecheck} loading={busy === "full"} title="Uptime + open the site in a real browser to find JavaScript errors and failing requests">
            <ScanSearch className="h-4 w-4" /> {busy === "full" ? "Re-checking… (~30s)" : "Full re-check"}
          </Button>
        </>} />

      {site.open_incidents?.length > 0 && (
        <div className="mb-6 space-y-2">
          {site.open_incidents.map((i: any) => (
            <Link key={i.id} href={`/app/incidents/${i.id}`} className="flex items-center gap-3 rounded-2xl bg-bad/8 px-5 py-3 text-sm ring-1 ring-bad/15 transition hover:bg-bad/12">
              <Badge>{i.severity}</Badge><span className="font-medium text-ink">{i.title}</span><span className="text-plum/55">· since {timeAgo(i.started_at)}</span>
              <span className="ml-auto text-magenta">Open incident →</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Stat label="Status" value={<span className="capitalize">{site.paused ? "paused" : site.status}</span>} tone={site.status === "up" ? "ok" : site.status === "down" ? "bad" : "warn"} sub={site.last_error ? shortError(site.last_error) : `HTTP ${site.last_status_code ?? "—"}`} />
        <Stat label="Response" value={ms(site.last_response_ms)} sub={`Checked ${timeAgo(site.last_check_at)}`} />
        <Stat label="Uptime 24h" value={pct(site.uptime?.["24h"])} />
        <Stat label="Uptime 7d" value={pct(site.uptime?.["7d"])} />
        <Stat label="Uptime 30d" value={pct(site.uptime?.["30d"])} />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <button type="button" onClick={() => setTab("ssl")} className="rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-plum/8 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-magenta/25">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">SSL certificate</span>
            <Badge tone={site.ssl ? certTone(site.ssl.status, site.ssl.days_left) : "unknown"}>{site.ssl ? (typeof site.ssl.days_left === "number" && site.ssl.days_left < 0 ? "expired" : site.ssl.status) : (site.ssl_enabled ? "pending" : "off")}</Badge>
          </div>
          {site.ssl ? (
            <>
              <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-ink">{expiryHeadline(site.ssl.days_left)}</div>
              <div className="mt-2 text-sm text-plum/70">{issuerShort(site.ssl.issuer) || "Issuer not listed"}{site.ssl.http_redirects_to_https ? " · HTTPS redirect OK" : site.ssl.http_redirects_to_https === false ? " · no HTTPS redirect" : ""}</div>
              <div className="mt-1 font-mono text-[11px] text-plum/45">{site.ssl.valid_to ? `Expires ${fmtDate(site.ssl.valid_to, false)}` : ""}</div>
            </>
          ) : (
            <div className="mt-2 text-sm text-plum/60">{site.ssl_enabled ? "Waiting for first SSL check." : "SSL monitoring is off for this site."}</div>
          )}
          <div className="mt-3 text-xs font-medium text-magenta">Open SSL & domain →</div>
        </button>
        <button type="button" onClick={() => setTab("ssl")} className="rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-plum/8 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-magenta/25">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">Domain expiry</span>
            <Badge tone={site.domain ? certTone(site.domain.status, site.domain.days_left) : "unknown"}>{site.domain ? (typeof site.domain.days_left === "number" && site.domain.days_left < 0 ? "expired" : site.domain.status) : (site.domain_enabled ? "pending" : "off")}</Badge>
          </div>
          {site.domain ? (
            <>
              <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-ink">{site.domain.days_left != null ? expiryHeadline(site.domain.days_left) : "No expiry date"}</div>
              <div className="mt-2 text-sm text-plum/70">{site.domain.registrar || "Registrar not published"} · <span className="font-mono">{site.domain.domain}</span></div>
              <div className="mt-1 font-mono text-[11px] text-plum/45">{site.domain.expires_at ? `Expires ${fmtDate(site.domain.expires_at, false)}` : ""}</div>
            </>
          ) : (
            <div className="mt-2 text-sm text-plum/60">{site.domain_enabled ? "Waiting for first domain check." : "Domain tracking is off for this site."}</div>
          )}
          <div className="mt-3 text-xs font-medium text-magenta">Open SSL & domain →</div>
        </button>
        <button type="button" onClick={() => setTab("seo")} className="rounded-3xl bg-white p-5 text-left shadow-sm ring-1 ring-plum/8 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-magenta/25">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">SEO audit</span>
            <Badge tone={seoTone(site.seo)}>{site.seo ? `Grade ${site.seo.grade}` : site.seo_enabled === false ? "off" : "pending"}</Badge>
          </div>
          {site.seo ? (
            <>
              <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-ink">{site.seo.score}<span className="text-base font-normal text-plum/45">/100</span></div>
              <div className="mt-2 text-sm text-plum/70">{site.seo.failed ? `${site.seo.failed} to fix` : site.seo.warned ? `${site.seo.warned} small tips` : "Looking good"}{site.seo.passed != null ? ` · ${site.seo.passed} passed` : ""}</div>
              <div className="mt-1 font-mono text-[11px] text-plum/45">{site.seo.checked_at ? `Checked ${timeAgo(site.seo.checked_at)}` : ""}</div>
            </>
          ) : (
            <div className="mt-2 text-sm text-plum/60">{site.seo_enabled === false ? "SEO audit is off for this site." : "Run an audit to see a friendly SEO score."}</div>
          )}
          <div className="mt-3 text-xs font-medium text-magenta">Open SEO audit →</div>
        </button>
      </div>

      <div className="mb-5"><Tabs<Tab> value={tab} onChange={setTab} tabs={[
        { id: "overview", label: "Overview" }, { id: "history", label: "Check history" }, { id: "ssl", label: "SSL & domain" }, { id: "seo", label: "SEO" },
        { id: "monitoring", label: "QA & APIs" }, { id: "discovery", label: "Discovery" }, { id: "script", label: "Browser errors" }, { id: "settings", label: "Settings" },
      ]} /></div>

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <SiteInsights site={site} onOpenTab={setTab} />
          <Card className="lg:col-span-2">
            <CardHeader title="Response time" subtitle={stats ? `Averaged per ${stats.bucket_min}-minute bucket` : ""}
              action={<div className="flex gap-1">{[6, 24, 168, 720].map((h) => <button key={h} onClick={() => setHours(h)} className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${hours === h ? "bg-plum text-cream" : "text-plum/60 hover:bg-plum/5"}`}>{h < 24 ? `${h}h` : `${h / 24}d`}</button>)}</div>} />
            <div className="px-3 pt-4">
              <ResponseChart data={stats?.series || []} long={hours > 48} />
              <div className="px-3 pb-4 pt-2">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-plum/50">Availability</div>
                <UptimeBars data={stats?.series || []} />
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader title="Monitoring policy" />
            <div className="divide-y divide-plum/6 px-5 py-2">
              <KV k="Interval" v={`every ${site.interval_sec >= 60 ? site.interval_sec / 60 + " min" : site.interval_sec + "s"}`} />
              <KV k="Timeout" v={`${site.timeout_sec}s`} />
              <KV k="Retries" v={`${site.retries} × ${site.retry_delay_sec}s`} />
              <KV k="Incident after" v={`${site.failure_threshold} failed checks`} />
              <KV k="Expected codes" v={site.expected_statuses?.join(", ")} mono />
              <KV k="Must contain" v={site.keyword_present?.join(", ") || "—"} />
              <KV k="Must not contain" v={site.keyword_absent?.join(", ") || "—"} />
              <KV k="Next check" v={timeAgo(site.next_check_at)} />
              {site.notes && <div className="py-2 text-xs text-plum/70">{site.notes}</div>}
            </div>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader title="Incident history" subtitle="Last 30 days" />
            <Table head={["Incident", "Severity", "Status", "Started", "Duration"]}>
              {(stats?.incidents || []).length === 0 && <tr><Td colSpan={5} className="py-8 text-center text-plum/50">No incidents recorded.</Td></tr>}
              {(stats?.incidents || []).map((i: any) => (
                <tr key={i.id} className="hover:bg-cream/50">
                  <Td><Link href={`/app/incidents/${i.id}`} className="font-medium text-ink hover:text-magenta">{i.title}</Link></Td>
                  <Td><Badge>{i.severity}</Badge></Td>
                  <Td><Badge>{i.status}</Badge></Td>
                  <Td className="text-xs text-plum/60">{fmtDate(i.started_at)}</Td>
                  <Td className="font-mono text-xs">{i.resolved_at ? `${Math.max(1, Math.round((+new Date(i.resolved_at) - +new Date(i.started_at)) / 60000))} min` : "ongoing"}</Td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      )}

      {tab === "history" && <History id={id} />}
      {tab === "ssl" && <SslTab site={site} run={run} busy={busy} />}
      {tab === "seo" && <SeoTab site={site} run={run} busy={busy} canEdit={can("member")} onToggle={async (v) => { await patch(`/api/websites/${id}`, { seo_enabled: v }); reload(); }} />}
      {tab === "monitoring" && <Related site={site} />}
      {tab === "discovery" && <DiscoveryPanel site={site} />}
      {tab === "script" && (
        <>
          <RecheckPanel key={scanKey} site={site} />
          <div className="mb-3 flex items-center justify-between text-sm"><span className="font-semibold text-ink">Hear about errors from real visitors</span><Link href={`/app/errors?website_id=${site.id}`} className="text-xs text-magenta">See all errors for this site →</Link></div>
          <ScriptTab site={site} onChange={reload} />
        </>
      )}
      {tab === "settings" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2"><WebsiteForm initial={site} onSaved={() => { toast("Settings saved"); reload(); }} /></Card>
          <Card className="h-fit p-6">
            <h3 className="font-semibold text-ink">Danger zone</h3>
            <p className="mt-1 text-sm text-plum/60">Deleting removes the website, its checks, journeys, and history.</p>
            {can("admin") ? <Button variant="danger" className="mt-4" onClick={remove}><Trash2 className="h-4 w-4" /> Delete website</Button> : <p className="mt-3 text-xs text-plum/50">Only admins can delete websites.</p>}
          </Card>
        </div>
      )}
    </div>
  );
}

function SiteInsights({ site, onOpenTab }: { site: any; onOpenTab: (t: Tab) => void }) {
  const i = site.insights || {};
  const items = useMemo(() => {
    const out: { tone: "bad" | "warn" | "ok" | "info"; title: string; meta: string; onClick: () => void }[] = [];
    if ((site.open_incidents || []).length) {
      out.push({
        tone: "bad",
        title: `${site.open_incidents.length} open incident${site.open_incidents.length === 1 ? "" : "s"}`,
        meta: site.open_incidents[0]?.title || "Needs investigation",
        onClick: () => { location.href = `/app/incidents?website_id=${site.id}`; },
      });
    }
    if (i.failures_24h > 0) {
      out.push({
        tone: "warn",
        title: `${i.failures_24h} failed check${i.failures_24h === 1 ? "" : "s"} in 24h`,
        meta: `${i.checks_24h || 0} total checks · avg ${ms(i.avg_response_ms_24h)}`,
        onClick: () => onOpenTab("history"),
      });
    }
    if (i.errors_active > 0 || i.errors_24h > 0) {
      out.push({
        tone: i.errors_active > 0 ? "bad" : "info",
        title: `${i.errors_active || 0} active browser error group${(i.errors_active || 0) === 1 ? "" : "s"}`,
        meta: `${i.errors_24h || 0} seen in last 24h`,
        onClick: () => onOpenTab("script"),
      });
    }
    if (i.journeys_failing > 0) {
      out.push({
        tone: "bad",
        title: `${i.journeys_failing} journey${i.journeys_failing === 1 ? "" : "s"} failing`,
        meta: `${i.journeys_total || 0} configured for this site`,
        onClick: () => onOpenTab("monitoring"),
      });
    }
    if (i.apis_failing > 0) {
      out.push({
        tone: "warn",
        title: `${i.apis_failing} API monitor${i.apis_failing === 1 ? "" : "s"} unhealthy`,
        meta: `${i.apis_total || 0} monitors linked`,
        onClick: () => onOpenTab("monitoring"),
      });
    }
    if (i.visual_pending > 0) {
      out.push({
        tone: "info",
        title: `${i.visual_pending} visual change${i.visual_pending === 1 ? "" : "s"} to review`,
        meta: "Content & visual checks",
        onClick: () => onOpenTab("monitoring"),
      });
    }
    if (typeof i.ssl_days_left === "number" && i.ssl_days_left <= 30) {
      out.push({
        tone: i.ssl_days_left < 0 ? "bad" : "warn",
        title: i.ssl_days_left < 0 ? "SSL certificate expired" : `SSL expires in ${i.ssl_days_left}d`,
        meta: "Open SSL & domain",
        onClick: () => onOpenTab("ssl"),
      });
    }
    if (typeof i.domain_days_left === "number" && i.domain_days_left <= 60) {
      out.push({
        tone: i.domain_days_left < 0 ? "bad" : "warn",
        title: i.domain_days_left < 0 ? "Domain expired" : `Domain expires in ${i.domain_days_left}d`,
        meta: "Open SSL & domain",
        onClick: () => onOpenTab("ssl"),
      });
    }
    if (typeof i.seo_score === "number" && (i.seo_score < 70 || (i.seo_failed || 0) > 0)) {
      out.push({
        tone: i.seo_score < 50 || (i.seo_failed || 0) > 0 ? "warn" : "info",
        title: `SEO score ${i.seo_score}${i.seo_grade ? ` (${i.seo_grade})` : ""}`,
        meta: i.seo_failed ? `${i.seo_failed} item${i.seo_failed === 1 ? "" : "s"} to improve` : "Open SEO audit",
        onClick: () => onOpenTab("seo"),
      });
    }
    return out;
  }, [site, i, onOpenTab]);

  const tiles = [
    { icon: Bug, label: "Browser errors", value: i.errors_active ?? site.counts?.error_groups ?? 0, bad: (i.errors_active || 0) > 0, tab: "script" as Tab },
    { icon: MousePointerClick, label: "Journeys", value: `${i.journeys_failing || 0}/${i.journeys_total || 0}`, bad: (i.journeys_failing || 0) > 0, tab: "monitoring" as Tab },
    { icon: Plug, label: "API monitors", value: `${i.apis_failing || 0}/${i.apis_total || 0}`, bad: (i.apis_failing || 0) > 0, tab: "monitoring" as Tab },
    { icon: Search, label: "SEO score", value: typeof i.seo_score === "number" ? i.seo_score : "—", bad: typeof i.seo_score === "number" && i.seo_score < 60, tab: "seo" as Tab },
  ];

  return (
    <Card className="lg:col-span-3">
      <CardHeader
        title="Site insights"
        subtitle="What matters on this website right now — tap through for detail"
        action={<Link href={`/app/errors?website_id=${site.id}`} className="text-xs text-magenta">All errors →</Link>}
      />
      <div className="grid gap-3 px-5 pb-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => onOpenTab(t.tab)}
            className="flex items-center gap-3 rounded-2xl bg-cream/70 px-4 py-3 text-left transition hover:bg-cream"
          >
            <t.icon className="h-4 w-4 shrink-0 text-plum/45" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] text-plum/55">{t.label}</span>
              <span className={`font-mono text-lg font-semibold ${t.bad ? "text-bad" : "text-ink"}`}>{t.value}</span>
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-plum/30" />
          </button>
        ))}
      </div>
      <div className="border-t border-plum/6">
        {items.length === 0 ? (
          <div className="flex items-center gap-3 px-5 py-8 text-sm text-plum/60">
            <ShieldCheck className="h-5 w-5 text-ok" />
            Nothing needs attention on this site right now.
          </div>
        ) : (
          <div className="divide-y divide-plum/6">
            {items.map((item) => (
              <button key={item.title} type="button" onClick={item.onClick} className="flex w-full gap-3 px-5 py-3.5 text-left transition hover:bg-cream/70">
                <span className={`mt-1 w-1 shrink-0 self-stretch rounded-full ${item.tone === "bad" ? "bg-bad" : item.tone === "warn" ? "bg-gold" : item.tone === "info" ? "bg-sky" : "bg-ok"}`} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-ink">{item.title}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-plum/55">{item.meta}</span>
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-plum/30" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function History({ id }: { id: string }) {
  const [failures, setFailures] = useState(false);
  const { data, loading, refreshing } = useApi<any[]>(`/api/websites/${id}/results?hours=168&limit=300${failures ? "&failures=1" : ""}`);
  if (loading && !data) return <Loading rows={4} />;
  return (
    <SoftBusy busy={refreshing}>
      <Card>
        <CardHeader title="Check results" subtitle="Last 7 days. Transient = failed at first, passed on retry." action={<Toggle checked={failures} onChange={setFailures} label="Failures only" />} />
        <Table head={["Time", "Result", "HTTP", "Response", "Attempts", "Details"]}>
          {(data || []).map((r) => (
            <tr key={r.id} className="hover:bg-cream/50">
              <Td className="whitespace-nowrap font-mono text-xs">{fmtDate(r.at)}</Td>
              <Td><Badge tone={r.classification === "ok" ? "ok" : r.classification}>{r.classification}</Badge></Td>
              <Td className="font-mono text-xs">{r.status_code ?? "—"}</Td>
              <Td className="font-mono text-xs">{ms(r.response_ms)}</Td>
              <Td className="font-mono text-xs">{r.attempts?.length || 1}</Td>
              <Td className="max-w-md text-xs text-plum/70">
                {r.error || (r.details?.redirects?.length ? `Redirected ${r.details.redirects.length}× → ${r.details.final_url}` : "OK")}
                {r.attempts?.length > 1 && <div className="mt-1 font-mono text-[10px] text-plum/45">{r.attempts.map((a: any) => `#${a.attempt}: ${a.ok ? "ok" : a.error || a.status_code}`).join(" · ")}</div>}
              </Td>
            </tr>
          ))}
          {data && !data.length && <tr><Td colSpan={6} className="py-10 text-center text-plum/50">No results in this period.</Td></tr>}
        </Table>
      </Card>
    </SoftBusy>
  );
}

function seoTone(seo: any): "ok" | "warn" | "bad" | "unknown" | "info" {
  if (!seo || typeof seo.score !== "number") return "unknown";
  if (seo.failed > 0 || seo.score < 50) return "bad";
  if (seo.warned > 0 || seo.score < 80) return "warn";
  return "ok";
}

function SeoTab({
  site,
  run,
  busy,
  canEdit,
  onToggle,
}: {
  site: any;
  run: (k: string) => void;
  busy: string | null;
  canEdit: boolean;
  onToggle: (v: boolean) => Promise<void>;
}) {
  const s = site.seo;
  const checks = s?.checks || [];
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title={<span className="flex items-center gap-2"><Search className="h-4 w-4" /> SEO audit</span>}
          subtitle={s ? `Checked ${timeAgo(s.checked_at)} · plain-language tips, not jargon` : "One quick page scan — title, description, headings, mobile & sharing tags"}
          action={canEdit && (
            <div className="flex flex-wrap items-center gap-3">
              <Toggle checked={site.seo_enabled !== false} onChange={(v) => void onToggle(v)} label="Enabled" />
              <Button size="sm" variant="secondary" loading={busy === "seo"} onClick={() => run("seo")} disabled={site.seo_enabled === false}>
                Run audit
              </Button>
            </div>
          )}
        />
        {site.seo_enabled === false ? (
          <p className="p-5 text-sm text-plum/60">SEO audit is turned off for this website (or not on your plan). Turn it on to get a daily score.</p>
        ) : !s ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-plum/60">No audit yet. We&apos;ll check the homepage for missing titles, descriptions, mobile setup, and share previews.</p>
            {canEdit && (
              <Button className="mt-4" loading={busy === "seo"} onClick={() => run("seo")}>Run first SEO audit</Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 p-5 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-cream/70 p-6 text-center">
              <div className={`font-mono text-5xl font-semibold tracking-tight ${s.score >= 80 ? "text-ok" : s.score >= 60 ? "text-ink" : "text-bad"}`}>{s.score}</div>
              <div className="mt-1 text-sm text-plum/60">out of 100</div>
              <Badge className="mt-3" tone={seoTone(s)}>Grade {s.grade}</Badge>
              <p className="mt-4 text-[13px] leading-relaxed text-plum-2">{s.summary}</p>
              <div className="mt-4 flex gap-3 font-mono text-[11px] text-plum/50">
                <span className="text-ok">{s.passed} ok</span>
                <span className="text-[#8a5b00]">{s.warned} tips</span>
                <span className="text-bad">{s.failed} fix</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">What we checked</h3>
              <p className="mt-1 text-xs text-plum/55">Homepage{s.url ? ` · ${s.url}` : ""}. Efficient single-page scan — no browser minutes used.</p>
              <ul className="mt-4 divide-y divide-plum/6 rounded-2xl ring-1 ring-plum/8">
                {checks.map((c: any) => (
                  <li key={c.id} className="flex gap-3 px-4 py-3">
                    <span className="mt-0.5 shrink-0">
                      {c.status === "pass" ? <CheckCircle2 className="h-4 w-4 text-ok" /> : c.status === "warn" ? <CircleAlert className="h-4 w-4 text-[#c48a1a]" /> : <CircleAlert className="h-4 w-4 text-bad" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-ink">{c.label}</span>
                        <Badge tone={c.status === "pass" ? "ok" : c.status === "warn" ? "warn" : "bad"}>{c.status === "pass" ? "good" : c.status === "warn" ? "improve" : "fix"}</Badge>
                      </span>
                      <span className="mt-0.5 block text-[13px] text-plum/75">{c.message}</span>
                      {c.value && <span className="mt-1 block truncate font-mono text-[11px] text-plum/45">{c.value}</span>}
                      {c.tip && c.status !== "pass" && <span className="mt-1.5 block text-[12px] leading-relaxed text-ink/80"><span className="font-medium text-magenta">Tip:</span> {c.tip}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              {s.error && <p className="mt-4 text-sm text-bad">{s.error}</p>}
            </div>
          </div>
        )}
      </Card>
      {s?.improvements?.length > 0 && (
        <Card>
          <CardHeader title="Start here" subtitle="Highest-impact improvements in plain English" />
          <ol className="list-decimal space-y-3 px-5 py-4 pl-10">
            {s.improvements.map((imp: any) => (
              <li key={imp.id} className="text-sm text-ink">
                <span className="font-medium">{imp.label}.</span> {imp.tip || imp.message}
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}

function SslTab({ site, run, busy }: { site: any; run: (k: string) => void; busy: string | null }) {
  const s = site.ssl, d = site.domain;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title={<span className="flex items-center gap-2"><Lock className="h-4 w-4" /> TLS certificate</span>} subtitle={s ? `Checked ${timeAgo(s.checked_at)}` : "Not checked yet"}
          action={<Button size="sm" variant="secondary" loading={busy === "ssl"} onClick={() => run("ssl")}>Check now</Button>} />
        {!site.ssl_enabled ? <p className="p-5 text-sm text-plum/60">SSL monitoring is disabled for this site (or not included in your plan).</p> : s ? (
          <div className="divide-y divide-plum/6 px-5 py-2">
            <KV k="Status" v={<Badge tone={certTone(s.status, s.days_left)}>{typeof s.days_left === "number" && s.days_left < 0 ? "expired" : s.status}</Badge>} />
            {s.error && <KV k="Error" v={<span className="text-bad">{s.error}</span>} />}
            <KV k={typeof s.days_left === "number" && s.days_left < 0 ? "Expired" : "Days left"} v={s.days_left == null ? "—" : expiryLabel(s.days_left, "full")} mono />
            <KV k="Valid until" v={fmtDate(s.valid_to, false)} />
            <KV k="Issued" v={fmtDate(s.valid_from, false)} />
            <KV k="Subject" v={s.subject} mono />
            <KV k="Issuer" v={s.issuer} />
            <KV k="Protocol" v={s.protocol} mono />
            <KV k="HTTP → HTTPS redirect" v={s.http_redirects_to_https == null ? "unknown" : s.http_redirects_to_https ? "yes" : <span className="text-warn">no</span>} />
            <KV k="SANs" v={<span className="text-xs">{s.sans?.slice(0, 6).join(", ")}</span>} />
            <KV k="Reminders" v={site.ssl_reminder_days?.map((x: number) => `${x}d`).join(", ")} />
          </div>
        ) : <p className="p-5 text-sm text-plum/60">The first certificate check runs within a minute of adding the site.</p>}
      </Card>
      <Card>
        <CardHeader title="Domain registration" subtitle={d ? `Checked ${timeAgo(d.checked_at)} via RDAP` : "Not checked yet"}
          action={<Button size="sm" variant="secondary" loading={busy === "domain"} onClick={() => run("domain")}>Check now</Button>} />
        {d ? (
          <div className="divide-y divide-plum/6 px-5 py-2">
            <KV k="Domain" v={d.domain} mono />
            <KV k="Status" v={<Badge tone={certTone(d.status, d.days_left)}>{typeof d.days_left === "number" && d.days_left < 0 ? "expired" : d.status}</Badge>} />
            <KV k="Expires" v={d.expires_at ? fmtDate(d.expires_at, false) : "Not published"} />
            <KV k={typeof d.days_left === "number" && d.days_left < 0 ? "Expired" : "Days left"} v={d.days_left == null ? "Not published" : expiryLabel(d.days_left, "full")} mono />
            <KV k="Registrar" v={d.registrar || "Not published"} />
            {d.note && <div className="py-2 text-xs text-plum/60">{d.note} Missing registration data is not treated as healthy.</div>}
          </div>
        ) : <p className="p-5 text-sm text-plum/60">{site.domain_enabled ? "Pending first check." : "Domain tracking is disabled."}</p>}
      </Card>
    </div>
  );
}

function Related({ site }: { site: any }) {
  const { data: tests, loading: loadingTests } = useApi<any>(`/api/browser-tests?website_id=${site.id}`);
  const { data: checks, loading: loadingChecks } = useApi<any[]>(`/api/page-checks?website_id=${site.id}`);
  const { data: apis, loading: loadingApis } = useApi<any[]>(`/api/api-monitors?website_id=${site.id}`);
  const { data: errs, loading: loadingErrs } = useApi<any[]>(`/api/errors?website_id=${site.id}`);
  const section = (
    title: string,
    href: string,
    rows: any[] | null | undefined,
    loading: boolean,
    render: (r: any) => React.ReactNode,
    cta: string,
  ) => (
    <Card>
      <CardHeader title={title} action={<Link href={href} className="text-xs text-magenta">{cta}</Link>} />
      <div className="divide-y divide-plum/6">
        {loading && rows == null ? (
          <div className="px-5 py-6"><Loading rows={2} /></div>
        ) : rows?.length ? (
          rows.map(render)
        ) : (
          <div className="px-5 py-6 text-sm text-plum/50">None configured.</div>
        )}
      </div>
    </Card>
  );
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {section("User journeys", `/app/tests?website_id=${site.id}`, tests?.tests, loadingTests, (t) => (
        <Link key={t.id} href={`/app/tests/${t.id}`} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-cream/50"><span>{t.name}</span><Badge>{t.status}</Badge></Link>
      ), "Add journey →")}
      {section("Content & visual checks", "/app/checks", checks, loadingChecks, (c) => (
        <Link key={c.id} href={`/app/checks/${c.id}`} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-cream/50"><span>{c.name}</span><Badge tone={{ ok: "passing", bad: "failing", warn: "changed", info: "pending" }[checkStatus(c).tone]}>{checkStatus(c).title}</Badge></Link>
      ), "Watch a page →")}
      {section("API monitors", "/app/api-monitors", apis, loadingApis, (m) => (
        <Link key={m.id} href={`/app/api-monitors/${m.id}`} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-cream/50"><span><span className="font-mono text-xs text-plum/50">{m.method}</span> {m.name}</span><Badge>{m.status}</Badge></Link>
      ), "Add monitor →")}
      {section("Browser errors · 7d", `/app/errors?website_id=${site.id}`, errs?.slice(0, 6), loadingErrs, (e) => (
        <Link key={e.id} href={`/app/errors/${e.id}`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-cream/50"><span className="truncate font-mono text-xs">{e.message}</span><span className="font-mono text-xs text-plum/60">{e.count}×</span></Link>
      ), "View all →")}
    </div>
  );
}

function ScriptTab({ site, onChange }: { site: any; onChange: () => void }) {
  const toast = useToast();
  const { can } = useAuth();
  const [rum, setRum] = useState(site.rum || {});
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    try {
      await patch(`/api/websites/${site.id}`, { rum });
      toast("Browser monitoring settings saved");
      onChange();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader title="Install the browser monitoring script" subtitle="Optional. Captures JavaScript crashes, failed requests, missing files and blocked content from real visitors — with the steps they took before it happened." />
        <div className="space-y-4 p-5">
          <ol className="list-decimal space-y-1 pl-5 text-sm text-plum/80">
            <li>Paste this snippet before <code className="font-mono text-xs">&lt;/head&gt;</code> on every page (or via your theme / tag manager).</li>
            <li>Optionally add <code className="font-mono text-xs">data-release=&quot;v1.2.3&quot;</code> so you can see which deployment introduced an error, and <code className="font-mono text-xs">data-environment=&quot;staging&quot;</code> for non-live sites.</li>
            <li>Errors appear in <Link href="/app/errors" className="text-magenta">Browser errors</Link> within seconds.</li>
          </ol>
          <div className="relative rounded-2xl bg-ink p-4 pr-12 font-mono text-[12px] leading-relaxed text-sky">
            {site.snippet}
            <button onClick={() => { navigator.clipboard.writeText(site.snippet); toast("Snippet copied"); }} className="absolute right-3 top-3 rounded-lg p-1.5 text-cream/60 hover:bg-white/10 hover:text-cream"><Copy className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[["~3 KB", "gzipped, loads async — no effect on page speed"], ["1 request", "errors are batched and sent together, even if 100 happen"], ["Zero noise", "browser extensions, bots and blank “Script error.” are filtered out"]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-cream/70 p-3"><div className="font-mono text-sm font-semibold text-ink">{k}</div><div className="mt-0.5 text-[11px] leading-snug text-plum/65">{v}</div></div>
            ))}
          </div>
          <div className="rounded-2xl bg-cream/70 p-4 text-xs leading-relaxed text-plum/75">
            <b className="text-ink">What the script collects:</b> error message and stack trace, page address without query string, browser/OS/device, release tag, an anonymous per-tab session ID (to count affected visitors), and the last steps before the error — pages opened, buttons clicked (by their label) and requests made (method, path, status).
            <br /><b className="text-ink">Never collected:</b> what visitors type, form values, cookies, request/response bodies, auth headers or query strings. Emails, tokens and card-like numbers are also redacted on our side.
          </div>
          {can("admin") && <Button size="sm" variant="ghost" onClick={async () => { if (confirm("Rotate the site key? The old snippet will stop reporting.")) { await post(`/api/websites/${site.id}/rotate-key`); onChange(); toast("Site key rotated"); } }}>Rotate site key</Button>}
        </div>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader title="Collection settings" />
        <div className="space-y-4 p-5">
          <Toggle checked={rum.enabled ?? true} onChange={(v) => setRum({ ...rum, enabled: v })} label="Accept browser events" />
          <Toggle checked={rum.capture_api ?? true} onChange={(v) => setRum({ ...rum, capture_api: v })} label="Capture failed API requests" hint="fetch / XHR responses ≥ 400 and network errors" />
          <Input label="Sample rate (0.01–1)" type="number" step="any" min={0.01} max={1} value={rum.sample_rate ?? 1} onChange={(e) => setRum({ ...rum, sample_rate: Number(e.target.value) })} />
          <Input label="Spike alert: N times in 10 minutes" type="number" min={1} value={rum.alert_threshold ?? 10} onChange={(e) => setRum({ ...rum, alert_threshold: Number(e.target.value) })} />
          <Toggle checked={rum.alert_new ?? true} onChange={(v) => setRum({ ...rum, alert_new: v })} label="Alert on new errors" hint="Open an incident the first time a new error appears in the website's own code" />
          <Toggle checked={rum.console_errors ?? false} onChange={(v) => setRum({ ...rum, console_errors: v })} label="Also report console.error messages" hint="Re-copy the snippet after turning this on" />
          <ChipInput label="Ignore messages containing" values={rum.ignore_patterns || []} onChange={(v) => setRum({ ...rum, ignore_patterns: v })} placeholder="e.g. a noisy widget's message" />
          {can("member") && <Button onClick={save} loading={saving}>Save</Button>}
        </div>
      </Card>
    </div>
  );
}

export default function WebsiteDetail() {
  return <Suspense fallback={<Loading rows={4} />}><WebsiteDetailInner /></Suspense>;
}
