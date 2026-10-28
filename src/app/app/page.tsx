"use client";

import { motion } from "framer-motion";
import { AlertOctagon, ArrowRight, Bug, CheckCircle2, Circle, Clock, Gauge, Globe, MousePointerClick, ScanEye, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FailureBars, ResponseChart } from "@/components/charts";
import { WebsiteForm } from "@/components/WebsiteForm";
import { Badge, Button, Card, CardHeader, Empty, Loading, Modal, PageHeader, Stat, StatusDot } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { timeAgo, pct, ms } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function Dashboard() {
  const { user, can } = useAuth();
  const router = useRouter();
  const { data, loading, reload } = useApi<any>("/api/dashboard", { poll: 20000 });
  const { data: ws } = useApi<any>("/api/workspace");
  const [adding, setAdding] = useState(false);

  if (loading && !data) return <Loading rows={4} />;
  if (!data) return null;
  const by = data.websites.by_status || {};
  const total = data.websites.total;
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const onboarding = [
    { done: total > 0, label: "Add your first website", action: () => setAdding(true) },
    { done: (ws?.notifications?.emails?.length || 0) > 0, label: "Configure alert recipients", href: "/app/settings?tab=notifications" },
    { done: false, label: "Create a form or journey test", href: "/app/tests" },
    { done: false, label: "Install the browser error script", href: "/app/websites" },
    { done: false, label: "Generate your first client report", href: "/app/reports" },
  ];

  return (
    <div>
      <PageHeader eyebrow={new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
        title={<>{greet}, {user?.name?.split(" ")[0]}.</>}
        subtitle={total ? `${total} websites monitored · ${data.checks_24h.toLocaleString()} checks in the last 24 hours.` : "Let's get your portfolio monitored."}
        action={can("member") && <Button onClick={() => setAdding(true)}><Globe className="h-4 w-4" /> Add website</Button>} />

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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              <Stat key="u" label="Uptime · 24h" value={pct(data.uptime_24h)} tone={data.uptime_24h == null ? "default" : data.uptime_24h >= 99.5 ? "ok" : data.uptime_24h >= 97 ? "warn" : "bad"}
                sub={`${data.transient_24h} transient failures filtered by retries`} icon={<Gauge className="h-4 w-4" />} />,
              <Stat key="i" label="Open incidents" value={(data.incident_counts.open || 0) + (data.incident_counts.investigating || 0)}
                tone={data.incident_counts.open ? "bad" : "ok"} sub={`${data.incident_counts.investigating || 0} investigating · MTTR 7d ${data.mttr_7d_min != null ? data.mttr_7d_min + " min" : "—"}`} icon={<AlertOctagon className="h-4 w-4" />} />,
              <Stat key="r" label="Avg response" value={ms(data.avg_response_ms)} sub="Across all monitored sites" icon={<Clock className="h-4 w-4" />} />,
              <Stat key="s" label="Sites" value={<span>{by.up || 0}<span className="text-base text-plum/40">/{total}</span></span>}
                sub={<span className="flex flex-wrap gap-2">{by.down ? <span className="text-bad">{by.down} down</span> : null}{by.degraded ? <span className="text-warn">{by.degraded} degraded</span> : null}{by.paused ? <span>{by.paused} paused</span> : null}{!by.down && !by.degraded && "All responding"}</span>}
                icon={<Globe className="h-4 w-4" />} />,
            ].map((el, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>{el}</motion.div>)}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader title="The day's shape" subtitle="Average response time and failed checks per hour, all sites" action={<Badge tone="ok">● live</Badge>} />
              <div className="px-3 pt-4">
                {data.hourly.length ? <><ResponseChart data={data.hourly} height={200} /><FailureBars data={data.hourly} height={56} /></> : <div className="py-16 text-center text-sm text-plum/50">Checks will appear here shortly.</div>}
              </div>
            </Card>
            <Card>
              <CardHeader title="Needs attention" subtitle="Open incidents, newest first" action={<Link href="/app/incidents" className="text-xs text-magenta">All</Link>} />
              <div className="divide-y divide-plum/6">
                {data.open_incidents.length === 0 && <div className="flex flex-col items-center px-5 py-10 text-center text-sm text-plum/60"><ShieldCheck className="mb-2 h-8 w-8 text-ok" />No open incidents. Everything we monitor is healthy.</div>}
                {data.open_incidents.map((i: any) => (
                  <Link key={i.id} href={`/app/incidents/${i.id}`} className="flex gap-3 px-5 py-3.5 transition hover:bg-cream/70">
                    <span className={`mt-1 w-1 shrink-0 self-stretch rounded-full ${i.severity === "critical" ? "bg-bad" : i.severity === "major" ? "bg-magenta" : "bg-sky"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-ink">{i.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-plum/55"><Badge>{i.severity}</Badge>{i.website_name} · {timeAgo(i.started_at)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader title="Expiring soon" subtitle="SSL certificates ≤ 30 days, domains ≤ 60 days" />
              <div className="divide-y divide-plum/6">
                {data.expiring.length === 0 && <div className="px-5 py-8 text-center text-sm text-plum/55">Nothing expiring soon.</div>}
                {data.expiring.slice(0, 6).map((e: any, i: number) => (
                  <Link key={i} href={`/app/websites/${e.website_id}`} className="flex items-center justify-between px-5 py-3 text-sm hover:bg-cream/70">
                    <span><span className="font-medium text-ink">{e.name}</span> <span className="text-plum/50">· {e.kind}</span></span>
                    <span className={`font-mono text-xs ${e.days_left <= 7 ? "text-bad" : "text-warn"}`}>{e.days_left}d</span>
                  </Link>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-[15px] font-semibold text-ink">QA signals</h3>
              <div className="mt-4 space-y-3">
                {[
                  { icon: MousePointerClick, label: "Failing user journeys", v: data.tests_failing, href: "/app/tests", bad: data.tests_failing > 0 },
                  { icon: Bug, label: "Active browser error groups · 24h", v: data.error_groups_24h, href: "/app/errors", bad: data.error_groups_24h > 0 },
                  { icon: ScanEye, label: "Visual changes awaiting review", v: data.pending_visual_changes, href: "/app/checks", bad: false },
                ].map((r) => (
                  <Link key={r.label} href={r.href} className="group flex items-center gap-3 rounded-xl bg-cream/60 px-4 py-3 transition hover:bg-cream">
                    <r.icon className="h-4 w-4 text-plum/50" />
                    <span className="flex-1 text-sm text-ink">{r.label}</span>
                    <span className={`font-mono text-lg font-semibold ${r.bad ? "text-bad" : "text-ink"}`}>{r.v}</span>
                    <ArrowRight className="h-4 w-4 text-plum/30 transition group-hover:translate-x-0.5 group-hover:text-magenta" />
                  </Link>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="text-[15px] font-semibold text-ink">Plan usage · {data.plan.name}</h3>
              <div className="mt-4 space-y-4">
                {[
                  ["Websites", total, data.plan.websites],
                  ["Browser-test minutes", Math.round((data.usage.browser_seconds || 0) / 60), data.plan.browser_minutes],
                  ["AI analyses", data.usage.ai_calls || 0, data.plan.ai_calls],
                ].map(([k, v, cap]: any) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs"><span className="text-plum/65">{k}</span><span className="font-mono text-ink">{v} / {cap}</span></div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-plum/8">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${cap ? Math.min(100, (v / cap) * 100) : 0}%` }} transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${cap && v / cap > 0.9 ? "bg-bad" : "bg-magenta"}`} />
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/app/settings?tab=billing" className="mt-5 inline-block text-xs text-magenta">Manage plan →</Link>
            </Card>
          </div>

          <SitesStrip />
        </>
      )}

      <Modal open={adding} onClose={() => setAdding(false)} title="Add a website" subtitle="We'll validate the URL and run the first check immediately.">
        <WebsiteForm onCancel={() => setAdding(false)} onSaved={(s) => { setAdding(false); reload(); router.push(`/app/websites/${s.id}`); }} />
      </Modal>
    </div>
  );
}

function SitesStrip() {
  const { data } = useApi<any[]>("/api/websites", { poll: 30000 });
  if (!data?.length) return null;
  return (
    <Card className="mt-6">
      <CardHeader title="Portfolio" subtitle="Latest result per website" action={<Link href="/app/websites" className="text-xs text-magenta">Manage</Link>} />
      <div className="grid gap-px bg-plum/6 sm:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 12).map((s) => (
          <Link key={s.id} href={`/app/websites/${s.id}`} className="flex items-center gap-3 bg-white px-5 py-3.5 transition hover:bg-cream/60">
            <StatusDot status={s.paused ? "paused" : s.status} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink">{s.name}</div>
              <div className="truncate text-[11px] text-plum/50">{s.client_name || "No client"} · {timeAgo(s.last_check_at)}</div>
            </div>
            <span className="font-mono text-xs text-plum/60">{ms(s.last_response_ms)}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
