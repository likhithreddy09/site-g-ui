"use client";

import { motion } from "framer-motion";
import { AlertOctagon, ArrowRight, Bug, CheckCircle2, Circle, Clock, Gauge, Globe, MousePointerClick, ScanEye, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayShape } from "@/components/charts";
import { WebsiteForm } from "@/components/WebsiteForm";
import { Badge, Button, Card, CardHeader, Empty, Loading, Modal, PageHeader, Stat, StatusDot, Table, Td } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { certTone, expiryLabel, fmtDate, issuerShort, ms, pct, timeAgo } from "@/lib/format";
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
              <CardHeader title="The day's shape" subtitle="Average response time and failed checks for every site, one column per hour" action={<Badge tone="ok">● live</Badge>} />
              <DayShape data={data.hourly || []} />
            </Card>
            <Card>
              <CardHeader title="Needs attention" subtitle="Incidents, outages, expiries, failing journeys, and reviews" action={<Link href="/app/incidents" className="text-xs text-magenta">Incidents</Link>} />
              <div className="divide-y divide-plum/6">
                {(data.needs_attention || []).length === 0 && <div className="flex flex-col items-center px-5 py-10 text-center text-sm text-plum/60"><ShieldCheck className="mb-2 h-8 w-8 text-ok" />Nothing needs attention. Portfolio looks healthy.</div>}
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
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader title="SSL & domains" subtitle="Every certificate and domain. Highlighted when already expired, or due within 30 days (SSL) and 60 days (domains)." />
              <div className="max-h-[22rem] divide-y divide-plum/6 overflow-y-auto">
                {data.expiring.length === 0 && <div className="px-5 py-8 text-center text-sm text-plum/55">No certificate or domain dates yet.</div>}
                {data.expiring.map((e: any, i: number) => (
                  <Link key={i} href={`/app/websites/${e.website_id}?tab=ssl`} className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-cream/70">
                    <span className="min-w-0">
                      <span className="block truncate"><span className="font-medium text-ink">{e.name}</span> <span className="text-plum/50">· {e.kind}</span></span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] text-plum/45">{e.expires_at ? `Expires ${fmtDate(e.expires_at, false)}` : "No expiry date"}{issuerShort(e.detail) ? ` · ${issuerShort(e.detail)}` : ""}</span>
                    </span>
                    <span className={`shrink-0 font-mono text-xs ${e.days_left < 0 ? "text-bad" : e.soon ? "text-warn" : "text-plum/70"}`}>{e.days_left < 0 ? "expired" : `${e.days_left}d`}</span>
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

          <PortfolioHealth rows={data.portfolio || []} />
        </>
      )}

      <Modal open={adding} onClose={() => setAdding(false)} title="Add a website" subtitle="We'll validate the URL and run the first check immediately.">
        <WebsiteForm onCancel={() => setAdding(false)} onSaved={(s) => { setAdding(false); reload(); router.push(`/app/websites/${s.id}`); }} />
      </Modal>
    </div>
  );
}

function sslTone(s?: any) {
  if (!s || s.enabled === false) return "ignored";
  return certTone(s.status, s.days_left);
}

function PortfolioHealth({ rows }: { rows: any[] }) {
  if (!rows.length) return null;
  return (
    <Card className="mt-6">
      <CardHeader title="Portfolio health" subtitle="Uptime, SSL and domain for every website — click a row for full detail"
        action={<Link href="/app/websites" className="text-xs text-magenta">Manage websites</Link>} />
      <div className="overflow-x-auto">
        <Table head={["Website", "Status", "Uptime 24h", "Response", "SSL", "Domain"]}>
          {rows.map((s) => (
            <tr key={s.id} className="hover:bg-cream/50">
              <Td>
                <Link href={`/app/websites/${s.id}`} className="block min-w-[180px]">
                  <div className="font-medium text-ink hover:text-magenta">{s.name}</div>
                  <div className="truncate text-[11px] text-plum/50">{s.client_name || "No client"} · {(s.url || "").replace(/^https?:\/\//, "")}</div>
                </Link>
              </Td>
              <Td>
                <span className="inline-flex items-center gap-2">
                  <StatusDot status={s.paused ? "paused" : s.status} />
                  <span className="capitalize text-sm">{s.paused ? "paused" : s.status || "—"}</span>
                </span>
              </Td>
              <Td className="font-mono text-sm">{s.uptime_24h != null ? pct(s.uptime_24h) : "—"}</Td>
              <Td className="font-mono text-sm">{ms(s.last_response_ms)}</Td>
              <Td>
                {s.ssl?.status ? (
                  <Link href={`/app/websites/${s.id}?tab=ssl`} className="inline-flex flex-col gap-0.5">
                    <Badge tone={sslTone(s.ssl)}>{typeof s.ssl.days_left === "number" && s.ssl.days_left < 0 ? "expired" : s.ssl.status}</Badge>
                    <span className="max-w-[200px] truncate font-mono text-[11px] text-plum/60">{expiryLabel(s.ssl.days_left) || "No expiry date"}{issuerShort(s.ssl.issuer) ? ` · ${issuerShort(s.ssl.issuer)}` : ""}</span>
                  </Link>
                ) : <span className="text-xs text-plum/40">{s.ssl?.enabled === false ? "Off" : "Pending"}</span>}
              </Td>
              <Td>
                {s.domain?.status ? (
                  <Link href={`/app/websites/${s.id}?tab=ssl`} className="inline-flex flex-col gap-0.5">
                    <Badge tone={sslTone(s.domain)}>{typeof s.domain.days_left === "number" && s.domain.days_left < 0 ? "expired" : s.domain.status}</Badge>
                    <span className="max-w-[220px] truncate font-mono text-[11px] text-plum/60">{s.domain.days_left != null ? expiryLabel(s.domain.days_left) : "No expiry date"}{s.domain.registrar ? ` · ${s.domain.registrar}` : ""}</span>
                  </Link>
                ) : <span className="text-xs text-plum/40">{s.domain?.enabled === false ? "Off" : "Pending"}</span>}
              </Td>
            </tr>
          ))}
        </Table>
      </div>
    </Card>
  );
}
