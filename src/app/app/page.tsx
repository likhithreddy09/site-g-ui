"use client";

import { motion } from "framer-motion";
import { AlertOctagon, CheckCircle2, Circle, Clock, Gauge, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DayShape } from "@/components/charts";
import { WebsiteForm } from "@/components/WebsiteForm";
import { Badge, Button, Card, CardHeader, Loading, Modal, PageHeader, SoftBusy, Stat, StatusDot } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { fmtDate, issuerShort, ms, pct, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

const HEALTHY_CAP = 8;
const EXPIRY_CAP = 6;

function useLocalClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function greetingFor(now: Date): string {
  const h = now.getHours();
  if (h < 5) return "Working late";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

export default function Dashboard() {
  const { user, can } = useAuth();
  const router = useRouter();
  const { data, loading, refreshing, reload } = useApi<any>("/api/dashboard", { poll: 20000 });
  const { data: ws } = useApi<any>("/api/workspace");
  const [adding, setAdding] = useState(false);
  const now = useLocalClock();

  if (loading && !data) return <Loading rows={4} />;
  if (!data) return null;
  const by = data.websites.by_status || {};
  const total = data.websites.total;
  const greet = greetingFor(now);
  const firstName = user?.name?.split(" ")[0] || "there";
  const attentionN = (data.needs_attention || []).length;
  const downN = by.down || 0;
  const subtitle = !total
    ? "Let's get your portfolio monitored."
    : downN
      ? `${downN} site${downN === 1 ? "" : "s"} down · ${attentionN} item${attentionN === 1 ? "" : "s"} need attention · ${data.checks_24h.toLocaleString()} checks today`
      : attentionN
        ? `${attentionN} item${attentionN === 1 ? "" : "s"} need attention · ${total} sites · ${data.checks_24h.toLocaleString()} checks today`
        : `All clear · ${total} site${total === 1 ? "" : "s"} · ${data.checks_24h.toLocaleString()} checks in the last 24 hours`;
  const onboarding = [
    { done: total > 0, label: "Add your first website", action: () => setAdding(true) },
    { done: (ws?.notifications?.emails?.length || 0) > 0, label: "Configure alert recipients", href: "/app/settings?tab=notifications" },
    { done: false, label: "Create a form or journey test", href: "/app/tests" },
    { done: false, label: "Install the browser error script", href: "/app/websites" },
    { done: false, label: "Generate your first client report", href: "/app/reports" },
  ];

  const planCap = data.plan?.websites;
  const planName = data.plan?.name || "Free";

  return (
    <SoftBusy busy={refreshing} label="Refreshing…">
    <div>
      <PageHeader
        eyebrow={now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
        title={<>{greet}, {firstName}.</>}
        subtitle={subtitle}
        action={can("member") && <Button onClick={() => setAdding(true)}><Globe className="h-4 w-4" /> Add website</Button>}
      />

      {total === 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-8 lg:col-span-2">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-magenta">Getting started</div>
            <h2 className="mt-3 text-2xl font-semibold text-ink">Add a website and get your first result within a minute.</h2>
            <p className="mt-2 max-w-lg text-sm text-plum-2">No code required for uptime, SSL, and content checks. Browser error monitoring and journey tests are optional.</p>
            <div className="mt-6 max-w-xl"><WebsiteForm onSaved={(s) => router.push(`/app/websites/${s.id}`)} /></div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-ink">Setup checklist</h3>
            <ul className="mt-4 space-y-3">
              {onboarding.map((o) => (
                <li key={o.label} className="flex items-center gap-3 text-sm">
                  {o.done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-ok" /> : <Circle className="h-5 w-5 shrink-0 text-plum/25" />}
                  {o.href ? <Link href={o.href} className="hover:text-magenta">{o.label}</Link> : <button onClick={o.action} className="text-left hover:text-magenta">{o.label}</button>}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : (
        <>
          <p className="mb-4 text-xs text-plum/55">
            Plan · {planName} · {total}/{planCap ?? "-"} sites
            {" · "}
            <Link href="/app/billing" className="text-magenta hover:underline">Manage →</Link>
          </p>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              <Stat key="u" label="Uptime · 24h" value={pct(data.uptime_24h)} tone={data.uptime_24h == null ? "default" : data.uptime_24h >= 99.5 ? "ok" : data.uptime_24h >= 97 ? "warn" : "bad"}
                sub={`${data.transient_24h} transient failures filtered`} icon={<Gauge className="h-4 w-4" />} />,
              <Stat key="i" label="Open incidents" value={(data.incident_counts.open || 0) + (data.incident_counts.investigating || 0)}
                tone={data.incident_counts.open ? "bad" : "ok"} sub={`${data.incident_counts.investigating || 0} investigating · MTTR 7d ${data.mttr_7d_min != null ? data.mttr_7d_min + " min" : "-"}`} icon={<AlertOctagon className="h-4 w-4" />} />,
              <Stat key="r" label="Avg response" value={ms(data.avg_response_ms)} sub="Across all monitored sites" icon={<Clock className="h-4 w-4" />} />,
              <Stat key="s" label="Sites" value={<span>{by.up || 0}<span className="text-base text-plum/40">/{total}</span></span>}
                sub={<span className="flex flex-wrap gap-2">{by.down ? <span className="text-bad">{by.down} down</span> : null}{by.degraded ? <span className="text-warn">{by.degraded} degraded</span> : null}{by.paused ? <span>{by.paused} paused</span> : null}{!by.down && !by.degraded && "All responding"}</span>}
                icon={<Globe className="h-4 w-4" />} />,
            ].map((el, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>{el}</motion.div>)}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader
                title="Needs attention"
                subtitle="Incidents, outages, expiries, journeys, and reviews"
                action={<Link href="/app/incidents" className="text-xs text-magenta">Incidents</Link>}
              />
              <div className="divide-y divide-plum/6">
                {(data.needs_attention || []).length === 0 && (
                  <div className="flex flex-col items-center px-5 py-12 text-center text-sm text-plum/60">
                    <ShieldCheck className="mb-2 h-8 w-8 text-ok" />
                    Nothing needs attention. Portfolio looks healthy.
                  </div>
                )}
                {(data.needs_attention || []).map((i: any, idx: number) => (
                  <Link key={`${i.kind}-${i.href}-${idx}`} href={i.href} className="flex gap-3 px-5 py-3.5 transition hover:bg-cream/70">
                    <span className={`mt-1 w-1 shrink-0 self-stretch rounded-full ${i.severity === "critical" ? "bg-bad" : i.severity === "major" ? "bg-magenta" : i.severity === "info" ? "bg-plum/25" : "bg-sky"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-sm font-medium leading-snug text-ink">{i.title}</div>
                      <div className="mt-1 truncate text-[11px] text-plum/55">
                        <Badge>{i.kind}</Badge>
                        <span className="ml-1.5">{i.meta}{i.at ? ` · ${timeAgo(i.at)}` : ""}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader title="The day's shape" subtitle="Portfolio response · last 24h" action={<Badge tone="ok">● live</Badge>} />
              <DayShape data={data.hourly || []} />
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <ExpiryRisk rows={data.expiring || []} />
            <PortfolioHealth rows={data.portfolio || []} />
          </div>
        </>
      )}

      <Modal open={adding} onClose={() => setAdding(false)} title="Add a website" subtitle="We'll validate the URL and run the first check immediately.">
        <WebsiteForm onCancel={() => setAdding(false)} onSaved={(s) => { setAdding(false); reload(); router.push(`/app/websites/${s.id}`); }} />
      </Modal>
    </div>
    </SoftBusy>
  );
}

function ExpiryRisk({ rows }: { rows: any[] }) {
  const risk = useMemo(
    () => rows.filter((e) => e.days_left < 0 || e.soon).sort((a, b) => a.days_left - b.days_left),
    [rows],
  );
  const shown = risk.slice(0, EXPIRY_CAP);
  const hidden = risk.length - shown.length;

  return (
    <Card className="lg:col-span-2">
      <CardHeader
        title="SSL & domain risk"
        subtitle="Expired or due within 30 days (SSL) / 60 days (domains)"
        action={<Link href="/app/websites" className="text-xs text-magenta">Websites</Link>}
      />
      {risk.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-plum/60">
          <ShieldCheck className="mx-auto mb-2 h-7 w-7 text-ok" />
          No SSL or domain risk in the next window.
        </div>
      ) : (
        <div className="divide-y divide-plum/6">
          {shown.map((e: any, i: number) => (
            <Link key={`${e.website_id}-${e.kind}-${i}`} href={`/app/websites/${e.website_id}?tab=ssl`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-cream/70">
              <span className="min-w-0">
                <span className="block truncate"><span className="font-medium text-ink">{e.name}</span> <span className="text-plum/50">· {e.kind}</span></span>
                <span className="mt-0.5 block truncate font-mono text-[11px] text-plum/45">
                  {e.expires_at ? `Expires ${fmtDate(e.expires_at, false)}` : "No expiry date"}
                  {issuerShort(e.detail) ? ` · ${issuerShort(e.detail)}` : ""}
                </span>
              </span>
              <span className={`shrink-0 font-mono text-xs ${e.days_left < 0 ? "text-bad" : "text-warn"}`}>
                {e.days_left < 0 ? "expired" : `${e.days_left}d`}
              </span>
            </Link>
          ))}
          {hidden > 0 && (
            <Link href="/app/websites" className="block px-5 py-3 text-xs font-medium text-magenta hover:bg-cream/70">
              View all {risk.length} at risk →
            </Link>
          )}
        </div>
      )}
    </Card>
  );
}

function isProblemSite(s: any) {
  if (s.paused) return true;
  const st = s.status || "";
  return st === "down" || st === "degraded" || st === "unknown";
}

function PortfolioHealth({ rows }: { rows: any[] }) {
  const { problems, healthy, healthyHidden } = useMemo(() => {
    const problems = rows.filter(isProblemSite);
    const healthyAll = rows.filter((s) => !isProblemSite(s));
    return {
      problems,
      healthy: healthyAll.slice(0, HEALTHY_CAP),
      healthyHidden: Math.max(0, healthyAll.length - HEALTHY_CAP),
    };
  }, [rows]);

  if (!rows.length) return null;

  const list = [...problems, ...healthy];

  return (
    <Card className="lg:col-span-3">
      <CardHeader
        title="Portfolio"
        subtitle={problems.length ? `${problems.length} need a look · ${rows.length - problems.length} healthy` : `${rows.length} sites · all healthy`}
        action={<Link href="/app/websites" className="text-xs text-magenta">Manage websites</Link>}
      />
      <div className="divide-y divide-plum/6">
        {list.map((s) => (
          <Link key={s.id} href={`/app/websites/${s.id}`} className="group flex items-center gap-3 px-5 py-3 transition hover:bg-cream/70">
            <StatusDot status={s.paused ? "paused" : s.status} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink group-hover:text-magenta">{s.name}</div>
              <div className="truncate text-[11px] text-plum/50">
                {s.client_name || "No client"}
                {s.url ? ` · ${String(s.url).replace(/^https?:\/\//, "")}` : ""}
              </div>
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <div className="font-mono text-xs text-ink">{s.uptime_24h != null ? pct(s.uptime_24h) : "-"}</div>
              <div className="font-mono text-[11px] text-plum/50">{ms(s.last_response_ms)}</div>
            </div>
            <span className="hidden shrink-0 text-[11px] font-medium text-magenta opacity-0 transition group-hover:opacity-100 sm:inline">
              Insights →
            </span>
            <span className="shrink-0 capitalize text-[11px] text-plum/55 sm:w-16 sm:text-right">
              {s.paused ? "paused" : s.status || "-"}
            </span>
          </Link>
        ))}
        {healthyHidden > 0 && (
          <Link href="/app/websites" className="block px-5 py-3 text-xs font-medium text-magenta hover:bg-cream/70">
            +{healthyHidden} healthy sites → Websites
          </Link>
        )}
      </div>
    </Card>
  );
}
