"use client";

import { KeyRound, Lock, Plus, Radar, ShieldAlert, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ApiMonitorForm } from "./ApiMonitorForm";
import { JourneyBuilder } from "./JourneyBuilder";
import { useToast } from "./toast";
import { Badge, Button, Card, CardHeader, Empty, Modal, Pager, Spinner, Table, Td, cn } from "./ui";
import { post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

const CATEGORIES: Record<string, { label: string; tone: string; hint: string }> = {
  health: { label: "Health", tone: "active", hint: "Health / readiness / ping endpoints — best first monitors" },
  auth: { label: "Auth", tone: "major", hint: "Login, signup, token or session endpoints" },
  graphql: { label: "GraphQL", tone: "info", hint: "GraphQL or GQL endpoints" },
  api: { label: "Read API", tone: "active", hint: "GET requests the site makes to load data" },
  form: { label: "Form", tone: "changed", hint: "Form submissions" },
  write: { label: "Write / POST", tone: "degraded", hint: "Non-GET requests — monitoring them sends that request on every check" },
};

const SOURCE_LABEL: Record<string, string> = {
  openapi: "OpenAPI",
  traffic: "Live traffic",
};
const PER_PAGE = 10;

function loginJourney(site: any, lg: any) {
  const host = new URL(lg.page_url).host;
  const steps: any[] = [];
  if (lg.trigger) steps.push({ action: "click", selector: `button:has-text("${lg.trigger}")`, description: `Open “${lg.trigger}”` });
  if (lg.kind === "otp") {
    steps.push({ action: "assert_visible", selector: lg.username_selector, description: "Phone / OTP field is shown" });
    if (lg.submit_selector) steps.push({ action: "assert_visible", selector: lg.submit_selector, description: "Continue button is shown" });
  } else {
    if (lg.username_selector) steps.push({ action: "fill", selector: lg.username_selector, value: "", description: "Test account username / email" });
    steps.push({ action: "fill", selector: lg.password_selector, value: "", secret: true, description: "Test account password" });
    if (lg.submit_selector) steps.push({ action: "click", selector: lg.submit_selector, description: lg.submit_text ? `Click “${lg.submit_text}”` : "Submit" });
    steps.push({ action: "assert_not_visible", selector: lg.password_selector, description: "Login form is gone after signing in" });
  }
  return { name: `Login — ${host}`, start_url: lg.page_url, website_id: site.id, steps, interval_sec: 3600 };
}

export function DiscoveryPanel({ site, onMonitorsChange }: { site: any; onMonitorsChange?: () => void }) {
  const toast = useToast();
  const { can } = useAuth();
  const { data: disc, reload, setData } = useApi<any>(`/api/websites/${site.id}/discovery`);
  const [filter, setFilter] = useState("recommended");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [configure, setConfigure] = useState<any>(null);
  const [journey, setJourney] = useState<any>(null);
  const [showPages, setShowPages] = useState(false);
  const running = disc?.status === "running";

  useEffect(() => {
    if (!running) return;
    const t = setInterval(reload, 2000);
    return () => clearInterval(t);
  }, [running, reload]);

  // When a scan finishes, pre-select recommended GETs that aren't already monitored
  useEffect(() => {
    if (!disc || disc.status !== "done" || picked.size) return;
    const keys = (disc.endpoints || [])
      .filter((e: any) => e.recommend && e.method === "GET" && !e.added)
      .map((e: any) => e.key);
    if (keys.length) setPicked(new Set(keys));
    // only seed once per discovery id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disc?.id, disc?.status]);

  const endpoints: any[] = useMemo(() => disc?.endpoints || [], [disc]);
  const recommended = endpoints.filter((e) => e.recommend);
  const counts: Record<string, number> = { recommended: recommended.length };
  for (const e of endpoints) counts[e.category] = (counts[e.category] || 0) + 1;

  const shown = endpoints.filter((e) => {
    if (filter === "recommended" && !e.recommend) return false;
    if (filter !== "all" && filter !== "recommended" && e.category !== filter) return false;
    if (q.trim()) {
      const hay = `${e.method} ${e.host} ${e.path} ${e.name_hint || ""} ${e.source || ""}`.toLowerCase();
      if (!hay.includes(q.trim().toLowerCase())) return false;
    }
    return true;
  });
  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageRows = shown.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const pageSelectable = pageRows.filter((e) => !e.added);

  useEffect(() => { setPage(1); }, [filter, q, disc?.id]);
  useEffect(() => { if (page > pages) setPage(pages); }, [page, pages]);

  const scan = async () => {
    setBusy(true);
    setPicked(new Set());
    setFilter("recommended");
    try {
      setData(await post(`/api/websites/${site.id}/discover`));
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const addSelected = async () => {
    const items = endpoints.filter((e) => picked.has(e.key));
    if (items.some((e) => e.method !== "GET") && !confirm("Some selected endpoints are not GET requests. Monitoring them sends that request on every check. Continue?")) return;
    setBusy(true);
    try {
      const r: any = await post(`/api/websites/${site.id}/discovery/${disc.id}/monitors`, { items: items.map((e) => ({ key: e.key })) });
      toast(`${r.created.length} monitor${r.created.length === 1 ? "" : "s"} added${r.skipped.length ? ` · ${r.skipped.length} skipped (already monitored)` : ""}`);
      setPicked(new Set());
      reload();
      if (r.created.length) onMonitorsChange?.();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const watchRecommended = async () => {
    const items = recommended.filter((e) => !e.added && e.method === "GET");
    if (!items.length) {
      toast("Nothing recommended left to add — try selecting endpoints manually");
      return;
    }
    setPicked(new Set(items.map((e) => e.key)));
    setBusy(true);
    try {
      const r: any = await post(`/api/websites/${site.id}/discovery/${disc.id}/monitors`, { items: items.map((e) => ({ key: e.key })) });
      toast(`Watching ${r.created.length} recommended API${r.created.length === 1 ? "" : "s"}${r.skipped.length ? ` · ${r.skipped.length} already monitored` : ""}`);
      setPicked(new Set());
      reload();
      if (r.created.length) onMonitorsChange?.();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const toggle = (k: string) => setPicked((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });

  const phaseLabel = disc?.message || (disc?.phase === "openapi" ? "Looking for OpenAPI specs…" : "Crawling pages…");
  const openapiCount = endpoints.filter((e) => e.source === "openapi").length;

  return (
    <div className="space-y-5">
      <Card className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky/20 blur-2xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-magenta"><Radar className="h-3.5 w-3.5" /> Endpoint discovery</div>
            <h3 className="text-lg font-semibold text-ink">Find this site&apos;s login pages and backend APIs automatically</h3>
            <p className="mt-1 text-sm text-plum/70">
              SiteGuard opens pages in a real browser, captures XHR/fetch traffic, clicks sign-in buttons (nothing is submitted), and looks for OpenAPI / Swagger specs.
              Trackers are filtered out; path IDs are templated; recommended endpoints are pre-selected for one-click watching.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {can("member") && <Button variant="secondary" onClick={() => setConfigure({ website_id: site.id, url: "", method: "GET" })}><Plus className="h-4 w-4" /> Add endpoint manually</Button>}
            {can("member") && <Button onClick={scan} loading={busy || running}><Radar className="h-4 w-4" /> {running ? "Scanning…" : disc ? "Scan again" : "Scan site"}</Button>}
          </div>
        </div>
        {disc && (
          <div className="relative mt-4 space-y-3 border-t border-plum/8 pt-4">
            {running ? (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3 text-sm text-teal">
                  <Spinner /> <span className="font-medium">{phaseLabel}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-plum/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal to-magenta transition-all duration-500"
                    style={{ width: `${Math.min(92, 12 + (disc.pages_done || 0) * 7 + (disc.phase === "openapi" ? 15 : 0))}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-plum/60">
                  <span>{disc.pages_done || 0} pages</span>
                  <span>{disc.endpoints_found || 0} endpoints found</span>
                  <span className="text-plum/45">Usually 30–90 seconds</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-plum/60">
                <span>Last scan {timeAgo(disc.finished_at || disc.started_at)}{disc.duration_sec ? ` · ${disc.duration_sec}s` : ""}</span>
                <button className="link-underline" onClick={() => setShowPages((v) => !v)}>{disc.pages?.length || 0} pages crawled</button>
                <span>{endpoints.length} endpoints{openapiCount ? ` · ${openapiCount} from OpenAPI` : ""}</span>
                <span>{disc.login_pages?.length || 0} login forms</span>
                {recommended.length > 0 && <span className="text-teal">{recommended.length} recommended</span>}
                {disc.status === "failed" && <span className="text-bad">Scan failed: {disc.error}</span>}
              </div>
            )}
          </div>
        )}
        {showPages && !running && (
          <ul className="relative mt-3 space-y-1 font-mono text-[11px] text-plum/70">
            {(disc.pages || []).map((p: any) => (
              <li key={p.url} className="flex gap-3"><span className={cn("w-8", p.status && p.status < 400 ? "text-ok" : "text-bad")}>{p.status || "ERR"}</span><span className="truncate">{p.url}</span>{p.error && <span className="text-bad">{p.error}</span>}</li>
            ))}
          </ul>
        )}
      </Card>

      {!disc && !running && (
        <Empty icon={<Radar className="h-5 w-5" />} title="No scan yet" body="Run a scan to list the login pages and backend endpoints this website uses, then pick which ones to monitor." />
      )}

      {disc && !running && (
        <>
          <Card>
            <CardHeader title="Login pages" subtitle="Turn a login into a scheduled journey test. Use a dedicated test account." />
            {(disc.login_pages || []).length === 0 ? (
              <p className="px-5 py-6 text-sm text-plum/60">No login form found on the crawled pages. If login lives on another subdomain (e.g. app.client.com), add that URL as its own website and scan it.</p>
            ) : (
              <ul className="divide-y divide-plum/8">
                {disc.login_pages.map((lg: any, i: number) => (
                  <li key={i} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-magenta" />
                        <span className="truncate font-medium text-ink">{lg.page_url}</span>
                        <Badge tone={lg.kind === "otp" ? "changed" : "active"}>{lg.kind === "otp" ? "Phone / OTP" : "Password"}</Badge>
                        {lg.trigger && <Badge tone="info">opens via “{lg.trigger}”</Badge>}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 font-mono text-[11px] text-plum/60">
                        {lg.username_selector && <span>{lg.kind === "otp" ? "phone" : "user"}: {lg.username_selector}</span>}
                        {lg.password_selector && <span>password: {lg.password_selector}</span>}
                        {lg.submit_selector && <span>submit: {lg.submit_selector}</span>}
                      </div>
                      {lg.kind === "otp" && <p className="mt-1 text-xs text-plum/55">The journey checks the login opens and accepts input, but never requests a code, so no real SMS or email is sent.</p>}
                    </div>
                    {can("member") && <Button size="sm" variant="secondary" onClick={() => setJourney(loginJourney(site, lg))}>Create login journey</Button>}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardHeader
              title="Discovered endpoints"
              subtitle="Traffic captured while browsing, plus OpenAPI paths when found. Recommended ones are safe GET monitors to start with."
              action={can("member") && (
                <div className="flex flex-wrap gap-2">
                  {recommended.some((e) => !e.added && e.method === "GET") && (
                    <Button size="sm" variant="secondary" onClick={watchRecommended} loading={busy}>
                      <Sparkles className="h-3.5 w-3.5" /> Watch recommended ({recommended.filter((e) => !e.added && e.method === "GET").length})
                    </Button>
                  )}
                  {picked.size > 0 && <Button size="sm" onClick={addSelected} loading={busy}>Add {picked.size} as monitor{picked.size === 1 ? "" : "s"}</Button>}
                </div>
              )}
            />
            <div className="flex flex-wrap items-center gap-2 border-b border-plum/8 px-5 py-3">
              <button onClick={() => { setFilter("recommended"); setPage(1); }} title="Endpoints SiteGuard suggests watching first"
                className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs transition", filter === "recommended" ? "bg-plum text-cream" : "bg-teal/10 text-teal hover:bg-teal/15")}>
                <Star className="h-3 w-3" /> Recommended <span className="opacity-60">{counts.recommended || 0}</span>
              </button>
              {[["all", "All", endpoints.length], ...Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, counts[k] || 0] as const)].map(([k, label, n]) => (
                <button key={k as string} onClick={() => { setFilter(k as string); setPage(1); }} title={CATEGORIES[k as string]?.hint}
                  className={cn("rounded-full px-3 py-1 text-xs transition", filter === k ? "bg-plum text-cream" : "bg-plum/5 text-plum/70 hover:bg-plum/10")}>
                  {label} <span className="opacity-60">{n as number}</span>
                </button>
              ))}
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Filter path, host…"
                className="ml-auto h-8 w-44 rounded-lg bg-cream/60 px-2.5 text-xs outline-none ring-1 ring-plum/12 focus:ring-magenta/40"
              />
            </div>
            {shown.length === 0 ? (
              <p className="px-5 py-6 text-sm text-plum/60">
                {filter === "recommended"
                  ? "No strong recommendations yet — try All, or scan again after browsing more of the site."
                  : "No endpoints in this category. Sites that render everything on the server make few API calls — monitor their key pages with content checks instead."}
              </p>
            ) : (
              <Table head={[
                <input key="all" type="checkbox" aria-label="Select all on this page" className="accent-magenta" checked={pageSelectable.length > 0 && pageSelectable.every((e) => picked.has(e.key))}
                  onChange={(ev) => setPicked((prev) => {
                    const n = new Set(prev);
                    for (const row of pageSelectable) { if (ev.target.checked) n.add(row.key); else n.delete(row.key); }
                    return n;
                  })} />,
                "Endpoint", "Type", "Seen", "Status", "Suggested checks", "",
              ]}>
                {pageRows.map((e) => (
                  <tr key={e.key} className={cn("border-t border-plum/8 hover:bg-cream/40", e.recommend && !e.added && "bg-teal/[0.03]")}>
                    <Td className="w-8">{!e.added && <input type="checkbox" aria-label={`Select ${e.key}`} className="accent-magenta" checked={picked.has(e.key)} onChange={() => toggle(e.key)} />}</Td>
                    <Td>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold", e.method === "GET" ? "bg-teal/10 text-teal" : "bg-gold/20 text-[#8a5b00]")}>{e.method}</span>
                        <span className="font-mono text-xs text-plum/55">{e.host}</span>
                        {e.auth_required && <span title="Sent with an Authorization header — add it as a secret header"><Lock className="h-3.5 w-3.5 text-magenta" /></span>}
                        {e.recommend && <Badge tone="active" className="normal-case"><Star className="h-2.5 w-2.5" /> Suggested</Badge>}
                        {e.source === "openapi" && <Badge tone="info" className="normal-case">{SOURCE_LABEL.openapi}</Badge>}
                      </div>
                      {e.name_hint && <div className="mt-0.5 text-xs font-medium text-ink/80">{e.name_hint}</div>}
                      <div className="mt-0.5 font-mono text-[13px] text-ink">{e.path}{e.query_params?.length ? <span className="text-plum/45">?{e.query_params.join("&")}</span> : null}</div>
                    </Td>
                    <Td><Badge tone={CATEGORIES[e.category]?.tone}>{CATEGORIES[e.category]?.label || e.category}</Badge></Td>
                    <Td className="font-mono text-xs text-plum/70">
                      {e.source === "openapi" && !e.pages?.length ? "spec" : <>{e.count}× · {e.pages?.length || 0} page{(e.pages?.length || 0) === 1 ? "" : "s"}</>}
                    </Td>
                    <Td className="font-mono text-xs">{(e.statuses || []).map((s: number) => <span key={s} className={cn("mr-1", s < 400 ? "text-ok" : "text-bad")}>{s}</span>)}</Td>
                    <Td className="text-xs text-plum/70">
                      {(e.suggested?.assertions || []).map((a: any, i: number) => (
                        <div key={i} className="font-mono text-[11px]">{a.type === "response_time" ? `responds < ${a.value}ms` : `${a.path} ${a.op}`}</div>
                      ))}
                    </Td>
                    <Td className="text-right">
                      {e.added ? <Badge tone="active">Monitored</Badge> : can("member") && (
                        <Button size="sm" variant="ghost" onClick={() => setConfigure({
                          name: (e.name_hint || `${e.method} ${e.path}`).slice(0, 100), method: e.method, url: e.url, query: e.query, website_id: site.id,
                          expected_statuses: e.suggested?.expected_statuses, assertions: e.suggested?.assertions,
                        })}>Configure</Button>
                      )}
                    </Td>
                  </tr>
                ))}
              </Table>
            )}
            <Pager page={safePage} pages={pages} total={shown.length} perPage={PER_PAGE} onPage={setPage} />
            {endpoints.some((e) => e.auth_required) && (
              <div className="flex items-start gap-2 border-t border-plum/8 px-5 py-3 text-xs text-plum/60">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 text-magenta" />
                Endpoints with a lock were called with credentials. Header values are never recorded — add a test token as a secret header when you configure the monitor.
              </div>
            )}
          </Card>
        </>
      )}

      <Modal open={!!configure} onClose={() => setConfigure(null)} title="Configure API monitor" subtitle="Prefilled from discovery — adjust checks, headers, and schedule before saving." wide>
        {configure && <ApiMonitorForm initial={configure} onSaved={() => { setConfigure(null); toast("API monitor created"); reload(); onMonitorsChange?.(); }} />}
      </Modal>
      <Modal open={!!journey} onClose={() => setJourney(null)} title="Create login journey" subtitle="Prefilled from the detected login form. Enter test-account credentials before saving." wide>
        {journey && <JourneyBuilder initial={journey} onSaved={() => { setJourney(null); toast("Login journey saved as a draft — run it from User journeys"); }} />}
      </Modal>
    </div>
  );
}
