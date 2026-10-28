"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fmtDate, ms, pct } from "@/lib/format";
import { Badge } from "./ui";

export function ReportView({ data }: { data: any }) {
  const b = data.branding || {};
  const s = data.summary;
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-40px_rgba(75,36,64,0.35)] ring-1 ring-plum/10 print:shadow-none print:ring-0">
      <div className="relative overflow-hidden px-10 py-10 text-white" style={{ background: b.color || "#9b1b67" }}>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {b.logo_url ? <img src={b.logo_url} alt="" className="h-10 max-w-[160px] rounded bg-white/90 object-contain p-1" /> : <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-semibold">{b.name?.[0]}</span>}
            <span className="text-lg font-semibold">{b.name}</span>
          </div>
          <span className="font-mono text-xs opacity-80">Generated {fmtDate(data.generated_at)}</span>
        </div>
        <h1 className="relative mt-10 text-3xl font-semibold leading-tight md:text-4xl">{data.title}</h1>
        <p className="relative mt-2 text-sm opacity-85">{fmtDate(data.period.start, false)} – {fmtDate(data.period.end, false)}</p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-plum/8 md:grid-cols-4">
        {[["Uptime", pct(s.uptime_pct, 3)], ["Incidents detected", s.incidents_detected], ["Resolved", s.incidents_resolved], ["Avg time to resolve", s.mttr_min != null ? `${s.mttr_min} min` : "—"]].map(([k, v], i) => (
          <motion.div key={k as string} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }} className="bg-white px-8 py-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-plum/50">{k}</div>
            <div className="mt-1 font-mono text-3xl font-semibold text-ink">{v}</div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-10 px-10 py-10">
        <section className="rounded-2xl bg-cream/70 p-5 text-sm text-plum/80">
          <b className="text-ink">Monitoring coverage.</b> {data.coverage.websites} websites · {data.coverage.checks_run.toLocaleString()} scheduled checks · {data.coverage.journey_runs} user-journey runs ({s.journey_failures} failed). {data.coverage.note}
          {s.incidents_open > 0 && <> <b className="text-bad">{s.incidents_open} incident(s) still open</b> at report time.</>}
          {s.false_positives > 0 && <> {s.false_positives} false positive(s) excluded.</>}
        </section>

        {data.trend?.length > 1 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-ink">Response-time trend</h2>
            <div className="h-48">
              <ResponsiveContainer>
                <AreaChart data={data.trend} margin={{ left: -10, right: 10 }}>
                  <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={b.color || "#9b1b67"} stopOpacity={0.3} /><stop offset="100%" stopColor={b.color || "#9b1b67"} stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9c5e7f" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#9c5e7f" }} axisLine={false} tickLine={false} unit="ms" />
                  <Tooltip />
                  <Area dataKey="avg_response_ms" name="Avg response (ms)" stroke={b.color || "#9b1b67"} fill="url(#rg)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Websites</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-plum/10 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-plum/50">
                {["Website", "Uptime", "Checks", "Failed", "Avg", "P95", "Incidents", "SSL", "Domain"].map((h) => <th key={h} className="py-2 pr-4">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-plum/6">
                {data.websites.map((w: any) => (
                  <tr key={w.website_id}>
                    <td className="py-3 pr-4"><div className="font-medium text-ink">{w.name}</div><div className="font-mono text-[11px] text-plum/50">{w.url}</div></td>
                    <td className={`pr-4 font-mono ${w.uptime_pct != null && w.uptime_pct < 99 ? "text-bad" : "text-ok"}`}>{pct(w.uptime_pct, 2)}</td>
                    <td className="pr-4 font-mono text-xs">{w.checks}</td>
                    <td className="pr-4 font-mono text-xs">{w.failed_checks}</td>
                    <td className="pr-4 font-mono text-xs">{ms(w.avg_response_ms)}</td>
                    <td className="pr-4 font-mono text-xs">{ms(w.p95_response_ms)}</td>
                    <td className="pr-4 font-mono text-xs">{w.incidents}</td>
                    <td className="pr-4 text-xs">{w.ssl_days_left != null ? `${w.ssl_days_left}d` : "—"}</td>
                    <td className="text-xs">{w.domain_days_left != null ? `${w.domain_days_left}d` : "unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Incidents in this period</h2>
          {data.incidents.length === 0 ? <p className="text-sm text-plum/60">No incidents were detected. 🎉</p> : (
            <div className="space-y-2">
              {data.incidents.filter((i: any) => !i.false_positive).map((i: any) => (
                <div key={i.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-cream/50 px-4 py-3 text-sm">
                  <Badge>{i.severity}</Badge>
                  <span className="flex-1 font-medium text-ink">{i.title}</span>
                  <span className="text-xs text-plum/60">{fmtDate(i.started_at)}</span>
                  <Badge>{i.status === "resolved" ? "resolved" : "open"}</Badge>
                  <span className="w-20 text-right font-mono text-xs text-plum/60">{i.duration_min != null ? `${i.duration_min} min` : "ongoing"}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {data.actions?.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-ink">Actions taken</h2>
            <ul className="space-y-3">
              {data.actions.map((a: any, i: number) => (
                <li key={i} className="border-l-2 pl-4" style={{ borderColor: b.color || "#9b1b67" }}>
                  <div className="text-sm font-medium text-ink">{a.title}</div>
                  <div className="whitespace-pre-wrap text-sm text-plum/75">{a.resolution}</div>
                  <div className="text-[11px] text-plum/45">{fmtDate(a.resolved_at)}</div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {!b.white_label && <div className="border-t border-plum/8 px-10 py-4 text-center text-[11px] text-plum/45">Monitoring by SiteGuard</div>}
    </div>
  );
}
