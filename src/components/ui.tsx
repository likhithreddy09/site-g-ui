"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import Link from "next/link";
import { forwardRef, useEffect } from "react";

export const cn = clsx;

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "magenta";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  href?: string;
};

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap";
const btnVariants = {
  primary: "bg-plum text-cream hover:bg-ink shadow-[0_1px_0_rgba(0,0,0,0.1)]",
  magenta: "bg-magenta text-white hover:bg-plum",
  secondary: "bg-white text-plum ring-1 ring-plum/15 hover:ring-plum/40 hover:bg-cream",
  ghost: "text-plum hover:bg-plum/5",
  danger: "bg-bad/10 text-bad hover:bg-bad hover:text-white",
};
const btnSizes = { sm: "h-8 px-3.5 text-xs", md: "h-10 px-5 text-sm", lg: "h-12 px-7 text-base" };

export function Button({ variant = "primary", size = "md", loading, className, children, href, ...rest }: BtnProps) {
  const cls = cn(btnBase, btnVariants[variant], btnSizes[size], className);
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, children, ...rest }, ref) {
    return <div ref={ref} className={cn("rounded-2xl bg-white ring-1 ring-plum/10 shadow-[0_1px_2px_rgba(28,15,24,0.04)]", className)} {...rest}>{children}</div>;
  },
);

export function CardHeader({ title, subtitle, action, className }: { title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 border-b border-plum/8 px-5 py-4", className)}>
      <div>
        <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-plum/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const badgeTones: Record<string, string> = {
  up: "bg-ok/10 text-ok", passing: "bg-ok/10 text-ok", valid: "bg-ok/10 text-ok", resolved: "bg-ok/10 text-ok", ok: "bg-ok/10 text-ok", sent: "bg-ok/10 text-ok", approved: "bg-ok/10 text-ok", active: "bg-teal/10 text-teal",
  down: "bg-bad/10 text-bad", failing: "bg-bad/10 text-bad", invalid: "bg-bad/10 text-bad", expired: "bg-bad/10 text-bad", bad: "bg-bad/10 text-bad", critical: "bg-bad text-white", failure: "bg-bad/10 text-bad", failed: "bg-bad/10 text-bad", open: "bg-bad/10 text-bad", issue: "bg-bad/10 text-bad",
  degraded: "bg-gold/20 text-[#8a5b00]", flaky: "bg-gold/20 text-[#8a5b00]", expiring: "bg-gold/20 text-[#8a5b00]", warn: "bg-gold/20 text-[#8a5b00]", major: "bg-rose/20 text-magenta", transient: "bg-gold/20 text-[#8a5b00]", investigating: "bg-gold/20 text-[#8a5b00]", changed: "bg-sky/30 text-teal", pending_review: "bg-sky/30 text-teal", logged: "bg-sky/30 text-teal",
  minor: "bg-sky/30 text-teal", info: "bg-plum/5 text-plum/70", unknown: "bg-plum/5 text-plum/60", paused: "bg-plum/5 text-plum/60", ignored: "bg-plum/5 text-plum/60", draft: "bg-plum/5 text-plum/60", pending: "bg-plum/5 text-plum/60", scheduled: "bg-teal/10 text-teal", skipped: "bg-plum/5 text-plum/60", dismissed: "bg-plum/5 text-plum/60", superseded: "bg-plum/5 text-plum/60", quota_exceeded: "bg-gold/20 text-[#8a5b00]", invited: "bg-gold/20 text-[#8a5b00]",
};

export function Badge({ tone, children, className }: { tone?: string; children: React.ReactNode; className?: string }) {
  const key = tone ?? String(children).toLowerCase();
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize", badgeTones[key] || "bg-plum/5 text-plum/70", className)}>
      {typeof children === "string" ? children.replace(/_/g, " ") : children}
    </span>
  );
}

const dotTones: Record<string, string> = {
  up: "bg-ok text-ok/40", passing: "bg-ok text-ok/40", down: "bg-bad text-bad/40", failing: "bg-bad text-bad/40",
  degraded: "bg-gold text-gold/40", flaky: "bg-gold text-gold/40", changed: "bg-sky text-sky/40", unknown: "bg-plum/30 text-plum/20", paused: "bg-plum/20 text-plum/10",
};

export function StatusDot({ status, pulse = true }: { status?: string; pulse?: boolean }) {
  const s = status || "unknown";
  return <span className={cn("inline-block h-2.5 w-2.5 shrink-0 rounded-full", dotTones[s] || dotTones.unknown, pulse && (s === "down" || s === "up" || s === "failing") && "animate-pulse-ring")} />;
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }>(
  function Input({ label, hint, className, ...rest }, ref) {
    return (
      <label className="block">
        {label && <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>}
        <input ref={ref} className={cn("h-10 w-full rounded-xl border-0 bg-cream/60 px-3.5 text-sm text-ink ring-1 ring-plum/15 placeholder:text-plum/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-magenta/50 transition", className)} {...rest} />
        {hint && <span className="mt-1 block text-[11px] text-plum/50">{hint}</span>}
      </label>
    );
  });

export function Textarea({ label, hint, className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>}
      <textarea className={cn("w-full rounded-xl border-0 bg-cream/60 px-3.5 py-2.5 text-sm text-ink ring-1 ring-plum/15 placeholder:text-plum/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-magenta/50 transition", className)} {...rest} />
      {hint && <span className="mt-1 block text-[11px] text-plum/50">{hint}</span>}
    </label>
  );
}

export function Select({ label, hint, className, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; hint?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>}
      <select className={cn("h-10 w-full rounded-xl border-0 bg-cream/60 px-3 text-sm text-ink ring-1 ring-plum/15 focus:bg-white focus:outline-none focus:ring-2 focus:ring-magenta/50", className)} {...rest}>{children}</select>
      {hint && <span className="mt-1 block text-[11px] text-plum/50">{hint}</span>}
    </label>
  );
}

export function Toggle({ checked, onChange, label, hint, disabled }: { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode; hint?: string; disabled?: boolean }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", disabled && "cursor-not-allowed opacity-50")}>
      <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)}
        className={cn("relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors", checked ? "bg-magenta" : "bg-plum/20")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", checked ? "translate-x-4" : "translate-x-0.5")} />
      </button>
      {label && (
        <span>
          <span className="block text-sm text-ink">{label}</span>
          {hint && <span className="block text-[11px] text-plum/55">{hint}</span>}
        </span>
      )}
    </label>
  );
}

export function Modal({ open, onClose, title, subtitle, children, wide }: { open: boolean; onClose: () => void; title: string; subtitle?: string; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 pt-[8vh] backdrop-blur-[2px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={cn("w-full rounded-3xl bg-white shadow-2xl ring-1 ring-plum/10", wide ? "max-w-3xl" : "max-w-lg")}>
            <div className="flex items-start justify-between border-b border-plum/8 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-ink">{title}</h2>
                {subtitle && <p className="mt-0.5 text-sm text-plum/60">{subtitle}</p>}
              </div>
              <button onClick={onClose} className="rounded-full p-1.5 text-plum/50 hover:bg-plum/5 hover:text-plum" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange, disabled }: { tabs: { id: T; label: React.ReactNode }[]; value: T; onChange: (v: T) => void; disabled?: boolean }) {
  return (
    <div className={cn("flex gap-1 overflow-x-auto rounded-full bg-plum/5 p-1 scrollbar-thin", disabled && "pointer-events-none opacity-60")}>
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={disabled}
          onClick={() => onChange(t.id)}
          className={cn("relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap", value === t.id ? "text-cream" : "text-plum/70 hover:text-plum")}
        >
          {value === t.id && <motion.span layoutId={`tab-${tabs.map((x) => x.id).join("")}`} className="absolute inset-0 rounded-full bg-plum" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
          <span className="relative">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

export function PageHeader({ title, subtitle, action, eyebrow }: { title: React.ReactNode; subtitle?: React.ReactNode; action?: React.ReactNode; eyebrow?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between animate-fade-up">
      <div>
        {eyebrow && <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-magenta">{eyebrow}</div>}
        <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-plum/65">{subtitle}</p>}
      </div>
      {action && <div className="flex flex-wrap items-center gap-2">{action}</div>}
    </div>
  );
}

export function Stat({ label, value, sub, tone, icon }: { label: string; value: React.ReactNode; sub?: React.ReactNode; tone?: "ok" | "bad" | "warn" | "default"; icon?: React.ReactNode }) {
  return (
    <Card className="group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/55">{label}</span>
        {icon && <span className="text-plum/30 transition group-hover:text-magenta">{icon}</span>}
      </div>
      <div className={cn("mt-2 truncate font-mono text-[clamp(1.25rem,2.1vw,1.75rem)] font-semibold leading-tight tracking-tight", tone === "ok" ? "text-ok" : tone === "bad" ? "text-bad" : tone === "warn" ? "text-warn" : "text-ink")}>{value}</div>
      {sub && <div className="mt-2 text-xs text-plum/55">{sub}</div>}
    </Card>
  );
}

export function Empty({ icon, title, body, action }: { icon?: React.ReactNode; title: string; body?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-plum/20 bg-white/50 px-6 py-14 text-center">
      {icon && <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-2 text-magenta animate-float">{icon}</div>}
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {body && <p className="mt-1 max-w-md text-sm text-plum/60">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("h-5 w-5 animate-spin text-magenta", className)} />;
}

export function Loading({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}
    </div>
  );
}

/** Dim content and show a small pill while a soft refetch is in flight (filters, reload). */
export function SoftBusy({ busy, children, label = "Updating…" }: { busy?: boolean; children: React.ReactNode; label?: string }) {
  return (
    <div className={cn("relative transition-opacity duration-200", busy && "pointer-events-none opacity-55")}>
      {children}
      {busy ? (
        <div className="pointer-events-none absolute inset-x-0 top-2 z-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-plum shadow-md ring-1 ring-plum/10">
            <Spinner className="h-3.5 w-3.5" />
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/** Full-page / section busy overlay for saves that cover a whole card. */
export function BusyOverlay({ busy, label = "Saving…" }: { busy?: boolean; label?: string }) {
  if (!busy) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-white/70 backdrop-blur-[1px]" role="status" aria-live="polite">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-plum shadow-md ring-1 ring-plum/10">
        <Spinner className="h-4 w-4" />
        {label}
      </span>
    </div>
  );
}

export function ErrorBox({ error, code }: { error: string | null; code?: string | null }) {
  if (!error) return null;
  return (
    <div className="rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad ring-1 ring-bad/20">
      <div>{error}</div>
      {code ? <div className="mt-1 font-mono text-[11px] opacity-80">Error code: {code}</div> : null}
    </div>
  );
}


export function KV({ k, v, mono }: { k: string; v: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-plum/55">{k}</span>
      <span className={cn("text-right text-ink", mono && "font-mono text-[13px]")}>{v ?? "—"}</span>
    </div>
  );
}

export function ChipInput({ label, values, onChange, placeholder, hint }: { label?: string; values: string[]; onChange: (v: string[]) => void; placeholder?: string; hint?: string }) {
  return (
    <div>
      {label && <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>}
      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-xl bg-cream/60 px-2 py-1.5 ring-1 ring-plum/15 focus-within:bg-white focus-within:ring-2 focus-within:ring-magenta/50">
        {values.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-full bg-plum/8 px-2.5 py-0.5 text-xs text-plum">
            {v}
            <button type="button" onClick={() => onChange(values.filter((_, j) => j !== i))}><X className="h-3 w-3" /></button>
          </span>
        ))}
        <input className="min-w-[120px] flex-1 bg-transparent px-1.5 text-sm outline-none placeholder:text-plum/35" placeholder={placeholder}
          onKeyDown={(e) => {
            const t = e.currentTarget;
            if ((e.key === "Enter" || e.key === ",") && t.value.trim()) {
              e.preventDefault();
              onChange([...values, t.value.trim()]);
              t.value = "";
            } else if (e.key === "Backspace" && !t.value && values.length) onChange(values.slice(0, -1));
          }}
          onBlur={(e) => { if (e.currentTarget.value.trim()) { onChange([...values, e.currentTarget.value.trim()]); e.currentTarget.value = ""; } }} />
      </div>
      {hint && <span className="mt-1 block text-[11px] text-plum/50">{hint}</span>}
    </div>
  );
}

export function Table({ head, children, className, dense }: { head: React.ReactNode[]; children: React.ReactNode; className?: string; dense?: boolean }) {
  return (
    <div className={cn("overflow-x-auto scrollbar-thin", className)}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-plum/8">
            {head.map((h, i) => <th key={i} className={cn("whitespace-nowrap py-3 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-plum/50", dense ? "px-3" : "px-5")}>{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-plum/6">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className, dense, ...rest }: React.TdHTMLAttributes<HTMLTableCellElement> & { dense?: boolean }) {
  return <td className={cn("align-middle", dense ? "px-3 py-3" : "px-5 py-3.5", className)} {...rest}>{children}</td>;
}

function pageWindow(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(pages - 1, page + 1);
  if (left > 2) out.push("…");
  for (let i = left; i <= right; i++) out.push(i);
  if (right < pages - 1) out.push("…");
  out.push(pages);
  return out;
}

export function Pager({ page, pages, total, perPage, onPage }: { page: number; pages: number; total: number; perPage: number; onPage: (p: number) => void }) {
  if (!total) return null;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);
  const btn = "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 text-xs font-medium text-plum/70 transition hover:bg-plum/5 disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-plum/8 px-5 py-3">
      <p className="text-xs text-plum/60">Showing {start}–{end} of {total}</p>
      <div className="flex items-center gap-1">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /> Previous</button>
        {pageWindow(page, pages).map((n, i) => n === "…"
          ? <span key={`gap-${i}`} className="px-1 text-xs text-plum/40">…</span>
          : <button key={n} type="button" aria-current={n === page ? "page" : undefined} onClick={() => onPage(n)} className={n === page ? "inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-plum px-2.5 text-xs font-medium text-cream" : btn}>{n}</button>)}
        <button type="button" className={btn} disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">Next <ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
