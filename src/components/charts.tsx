"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "./ui";

const tick = { fontSize: 10, fill: "#9c5e7f", fontFamily: "var(--font-jbmono)" };

function fmtT(t: string, long: boolean) {
  const d = new Date(t);
  return long ? d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function TooltipBox({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-ink px-3 py-2 font-mono text-[11px] text-cream shadow-xl">
      <div className="mb-1 text-cream/60">{new Date(label).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <b>{Math.round(p.value)}{p.unit || ""}</b>
        </div>
      ))}
    </div>
  );
}

export function ResponseChart({ data, height = 220, long = false }: { data: { t: string; avg_ms: number; failures?: number }[]; height?: number; long?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="rt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9b1b67" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#9b1b67" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#4b244012" vertical={false} />
        <XAxis dataKey="t" tickFormatter={(t) => fmtT(t, long)} tick={tick} axisLine={false} tickLine={false} minTickGap={40} />
        <YAxis tick={tick} axisLine={false} tickLine={false} unit="ms" width={60} />
        <Tooltip content={<TooltipBox long={long} />} />
        <Area type="monotone" dataKey="avg_ms" name="avg" unit="ms" stroke="#9b1b67" strokeWidth={2} fill="url(#rt)" animationDuration={900} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

type HourPoint = { t: string; avg_ms?: number | null; failures?: number; checks?: number };

function hourMs(v?: number | null) {
  if (v == null || Number.isNaN(v)) return "—";
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 0 : 2).replace(/\.00$/, "")}s`;
  return `${Math.round(v)}ms`;
}

function fillHours(data: HourPoint[]): HourPoint[] {
  const by = new Map<string, HourPoint>();
  for (const d of [...data].sort((a, b) => +new Date(a.t) - +new Date(b.t))) {
    const prev = by.get(d.t);
    const checks = (prev?.checks || 0) + (d.checks || 0);
    const failures = (prev?.failures || 0) + (d.failures || 0);
    const prevAvg = prev?.avg_ms;
    const nextAvg = d.avg_ms;
    const avg = prevAvg != null && nextAvg != null && checks
      ? (prevAvg * (prev?.checks || 0) + nextAvg * (d.checks || 0)) / checks
      : nextAvg ?? prevAvg;
    by.set(d.t, { t: d.t, avg_ms: avg, checks, failures });
  }
  return [...by.values()];
}

function DayTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload as HourPoint;
  const when = new Date(label).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" });
  return (
    <div className="rounded-xl bg-ink px-3 py-2 font-mono text-[11px] text-cream shadow-xl">
      <div className="mb-1 text-cream/60">{when}</div>
      <div>Response <b>{hourMs(row?.avg_ms)}</b></div>
      <div className="text-rose">Failed <b>{row?.failures || 0}</b> of {row?.checks || 0}</div>
    </div>
  );
}

/** Overview chart: response time as a line, failed checks as bars, with the day's headline numbers. */
export function DayShape({ data }: { data: HourPoint[] }) {
  const rows = fillHours(data);
  const timed = rows.filter((r) => r.avg_ms != null) as (HourPoint & { avg_ms: number })[];
  if (!timed.length) return <div className="py-16 text-center text-sm text-plum/50">Checks will appear here shortly.</div>;
  const checks = rows.reduce((s, r) => s + (r.checks || 0), 0);
  const failed = rows.reduce((s, r) => s + (r.failures || 0), 0);
  const typical = timed.reduce((s, r) => s + r.avg_ms, 0) / timed.length;
  const peak = timed.reduce((a, b) => (b.avg_ms > a.avg_ms ? b : a));
  const peakWhen = new Date(peak.t).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const failPct = checks ? Math.round((failed / checks) * 100) : 0;
  const stats = [
    { k: "Typical hour", v: hourMs(typical), s: "Average response" },
    { k: "Slowest hour", v: hourMs(peak.avg_ms), s: peakWhen },
    { k: "Failed checks", v: failed.toLocaleString(), s: `${failPct}% of ${checks.toLocaleString()}` },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-plum/8 border-b border-plum/8">
        {stats.map((s) => (
          <div key={s.k} className="px-5 py-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-plum/45">{s.k}</div>
            <div className="mt-1 font-mono text-xl font-semibold tracking-tight text-ink">{s.v}</div>
            <div className="mt-0.5 truncate text-[11px] text-plum/55">{s.s}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 px-5 pt-3 text-[11px] text-plum/60">
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-magenta" /> Response time</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-bad" /> Failed checks</span>
      </div>
      <div className="px-1 pb-4 pt-1">
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={rows} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="day-rt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9b1b67" stopOpacity={0.34} />
                <stop offset="100%" stopColor="#9b1b67" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#4b244014" vertical={false} />
            <XAxis dataKey="t" tick={false} axisLine={false} tickLine={false} height={8} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={52} tickFormatter={(v) => hourMs(v)} />
            <Tooltip content={<DayTip />} cursor={{ stroke: "#9b1b6733", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="avg_ms" name="Response" stroke="#9b1b67" strokeWidth={2.5} fill="url(#day-rt)" animationDuration={800} activeDot={{ r: 4, fill: "#9b1b67", stroke: "#fff", strokeWidth: 2 }}
              dot={(p: any) => p?.payload?.t === peak.t ? <circle key={`peak-${p.index}`} cx={p.cx} cy={p.cy} r={4.5} fill="#9b1b67" stroke="#fff" strokeWidth={2} /> : <g key={`pt-${p.index}`} />} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="pl-[52px] pr-2">
          <div className="mb-1.5 flex items-baseline justify-between text-[11px] text-plum/50">
            <span>Failed checks each hour</span>
            <span className="font-mono text-[10px]">most {Math.max(...rows.map((r) => r.failures || 0))}</span>
          </div>
          <div className="flex h-16 items-end gap-[3px]">
            {rows.map((r, i) => {
              const n = r.failures || 0;
              const maxF = Math.max(1, ...rows.map((x) => x.failures || 0));
              const when = new Date(r.t).toLocaleString(undefined, { hour: "numeric", minute: "2-digit" });
              const px = n ? Math.max(8, Math.round((n / maxF) * 64)) : 2;
              return (
                <div key={`${i}-${r.t}`} title={`${when} · ${n} failed of ${r.checks || 0}`} className="flex h-full min-w-0 flex-1 items-end">
                  <div className="w-full rounded-t-[3px] bg-bad" style={{ height: px, opacity: n ? 0.35 + 0.65 * (n / maxF) : 0.2 }} />
                </div>
              );
            })}
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-mauve">
            {[0, Math.floor((rows.length - 1) / 2), rows.length - 1].filter((i, idx, all) => all.indexOf(i) === idx).map((i) => {
              const r = rows[i];
              const d = new Date(r.t);
              const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
              const crosses = new Date(rows[0].t).toDateString() !== new Date(rows[rows.length - 1].t).toDateString();
              return <span key={i}>{crosses ? `${d.toLocaleDateString(undefined, { weekday: "short" })} ${time}` : time}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FailureBars({ data, height = 80 }: { data: { t: string; failures: number; checks: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
        <XAxis dataKey="t" hide />
        <YAxis hide />
        <Tooltip content={<TooltipBox />} />
        <Bar dataKey="checks" name="checks" fill="#8fd3f4" radius={[3, 3, 0, 0]} stackId="a" animationDuration={700} />
        <Bar dataKey="failures" name="failures" fill="#c2264b" radius={[3, 3, 0, 0]} stackId="b" animationDuration={700} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Sparkline({ values, className, color = "#9b1b67" }: { values: (number | null)[]; className?: string; color?: string }) {
  const v = values.filter((x): x is number => x != null);
  if (v.length < 2) return <div className={cn("h-8 w-24", className)} />;
  const max = Math.max(...v), min = Math.min(...v);
  const pts = v.map((x, i) => `${(i / (v.length - 1)) * 96},${30 - ((x - min) / (max - min || 1)) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 96 32" className={cn("h-8 w-24", className)} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"
        style={{ strokeDasharray: 1200, animation: "var(--animate-draw)" }} />
    </svg>
  );
}

/** Uptime ribbon: one bar per bucket coloured by availability. */
export function UptimeBars({ data }: { data: { t: string; uptime: number; checks: number }[] }) {
  const items = data.slice(-60);
  return (
    <div className="flex h-9 items-end gap-[3px]">
      {items.length === 0 && <div className="text-xs text-plum/50">No checks yet</div>}
      {items.map((d, i) => (
        <div key={i} title={`${new Date(d.t).toLocaleString()} — ${d.uptime}% (${d.checks} checks)`}
          className={cn("flex-1 rounded-[3px] transition-all hover:opacity-70", d.uptime >= 99.9 ? "bg-ok/80" : d.uptime >= 90 ? "bg-gold" : "bg-bad")}
          style={{ height: `${40 + d.uptime * 0.6}%`, animation: `fade-up .5s ${i * 12}ms both` }} />
      ))}
    </div>
  );
}

/** Tiny bar sparkline for event counts; empty buckets render as a faint baseline. */
export function CountBars({ values, className, color = "#9b1b67" }: { values: number[]; className?: string; color?: string }) {
  const max = Math.max(1, ...values);
  const w = 96 / Math.max(values.length, 1);
  return (
    <svg viewBox="0 0 96 28" className={cn("h-7 w-24", className)} preserveAspectRatio="none" aria-hidden>
      {values.map((v, i) => {
        const h = v ? Math.max(3, (v / max) * 26) : 1;
        return <rect key={i} x={i * w + w * 0.15} y={28 - h} width={w * 0.7} height={h} rx={0.8} fill={v ? color : "#4b244020"} />;
      })}
    </svg>
  );
}

export function TrendBars({ data, height = 140 }: { data: { t: string; n: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="#4b244012" vertical={false} />
        <XAxis dataKey="t" tick={tick} axisLine={false} tickLine={false} minTickGap={24} />
        <YAxis tick={tick} axisLine={false} tickLine={false} allowDecimals={false} width={48} />
        <Tooltip cursor={{ fill: "#4b24400a" }} content={({ active, payload, label }: any) => active && payload?.length ? (
          <div className="rounded-xl bg-ink px-3 py-2 font-mono text-[11px] text-cream shadow-xl"><div className="text-cream/60">{label}</div><b>{payload[0].value}</b> times</div>
        ) : null} />
        <Bar dataKey="n" fill="#9b1b67" radius={[3, 3, 0, 0]} animationDuration={700} />
      </BarChart>
    </ResponsiveContainer>
  );
}
