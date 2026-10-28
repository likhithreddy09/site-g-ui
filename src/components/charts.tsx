"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "./ui";

const tick = { fontSize: 10, fill: "#9c5e7f", fontFamily: "var(--font-jbmono)" };

function fmtT(t: string, long: boolean) {
  const d = new Date(t);
  return long ? d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function TooltipBox({ active, payload, label, long }: any) {
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
