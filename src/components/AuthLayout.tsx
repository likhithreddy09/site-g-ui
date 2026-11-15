"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Logo } from "./Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

const DOTS = [
  { angle: -18, r: 0.42, ok: true },
  { angle: 48, r: 0.68, ok: false },
  { angle: 112, r: 0.52, ok: true },
  { angle: 168, r: 0.74, ok: true },
  { angle: 228, r: 0.46, ok: true },
  { angle: 292, r: 0.62, ok: true },
] as const;

function AuthRadar() {
  const cx = 160;
  const cy = 160;
  const maxR = 118;
  const fail = DOTS.find((d) => !d.ok)!;
  const failPt = polar(cx, cy, fail.r * maxR, fail.angle);

  return (
    <svg viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-[280px]" aria-hidden>
      <defs>
        <radialGradient id="auth-radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9b1b67" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#8fd3f4" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#4b2440" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="auth-sweep" gradientUnits="userSpaceOnUse" x1={cx} y1={cy - maxR} x2={cx + maxR * 0.72} y2={cy - maxR * 0.28}>
          <stop offset="0%" stopColor="#8fd3f4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8fd3f4" stopOpacity="0" />
        </linearGradient>
        <clipPath id="auth-radar-clip">
          <circle cx={cx} cy={cy} r={maxR} />
        </clipPath>
      </defs>

      <circle cx={cx} cy={cy} r={maxR + 14} fill="url(#auth-radar-glow)" />
      {[0.35, 0.62, 1].map((f) => (
        <circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="rgba(250,246,237,0.16)" strokeWidth="1" />
      ))}
      {[0, 45, 90, 135].map((d) => {
        const a = polar(cx, cy, maxR + 4, d);
        const b = polar(cx, cy, maxR + 4, d + 180);
        return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(250,246,237,0.08)" strokeWidth="1" />;
      })}

      <g clipPath="url(#auth-radar-clip)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="6s" repeatCount="indefinite" />
          <path
            d={`M ${cx} ${cy} L ${cx} ${cy - maxR} A ${maxR} ${maxR} 0 0 1 ${cx + maxR * 0.94} ${cy - maxR * 0.342} Z`}
            fill="url(#auth-sweep)"
          />
          <line x1={cx} y1={cy} x2={cx} y2={cy - maxR} stroke="#8fd3f4" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
        </g>
      </g>

      <line x1={cx} y1={cy} x2={failPt.x} y2={failPt.y} stroke="#f47c9b" strokeWidth="1.25" strokeDasharray="4 5" opacity="0.85" />

      {DOTS.map((s, i) => {
        const p = polar(cx, cy, s.r * maxR, s.angle);
        return (
          <g key={i}>
            {!s.ok && (
              <circle cx={p.x} cy={p.y} r={14} fill="none" stroke="#c2264b" strokeWidth="1.5">
                <animate attributeName="r" values="7;20" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={s.ok ? 5 : 6.5} fill={s.ok ? "#1f8a5b" : "#c2264b"} />
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r={6.5} fill="#faf6ed" />
      <circle cx={cx} cy={cy} r={3} fill="#9b1b67" />
    </svg>
  );
}

export function AuthLayout({
  title,
  subtitle,
  eyebrow,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative grid min-h-screen overflow-hidden bg-cream lg:grid-cols-2">
      {/* Form column atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(ellipse_at_15%_0%,rgba(155,27,103,0.12),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(143,211,244,0.16),transparent_45%),radial-gradient(ellipse_at_40%_100%,rgba(253,185,19,0.08),transparent_40%)] lg:w-1/2"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-plum/10 lg:block lg:left-1/2"
      />

      {/* Form column */}
      <div className="relative z-10 flex flex-col justify-between px-5 py-7 sm:px-10 sm:py-10 md:px-14 lg:px-16 lg:py-12">
        <div className="mx-auto w-full max-w-[24rem] flex-1 py-6 sm:py-10 lg:flex lg:flex-col lg:justify-center lg:py-0">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            <Logo size="lg" />

            {eyebrow && (
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-magenta">{eyebrow}</p>
            )}
            <h1 className={`${eyebrow ? "mt-2.5" : "mt-8"} text-[1.75rem] font-medium leading-[1.12] tracking-tight text-ink sm:text-[2rem]`}>
              {title}
            </h1>
            <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-plum-2 sm:text-[15px]">{subtitle}</p>

            <div className="mt-8 sm:mt-9">{children}</div>

            {footer && <div className="mt-6">{footer}</div>}
          </motion.div>
        </div>

        <motion.p
          className="text-center text-[12px] text-plum/45 lg:text-left"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          By continuing you agree to our{" "}
          <Link href="/terms" className="text-plum/70 underline-offset-2 hover:text-magenta hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-plum/70 underline-offset-2 hover:text-magenta hover:underline">
            Privacy
          </Link>
          .
        </motion.p>
      </div>

      {/* Cinema panel */}
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(155,27,103,0.35),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(143,211,244,0.16),transparent_45%),linear-gradient(165deg,#1c0f18_0%,#120a10_55%,#1c0f18_100%)]"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-magenta/30 blur-3xl"
          animate={reduce ? undefined : { x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-sky/20 blur-3xl"
          animate={reduce ? undefined : { x: [0, -14, 0], y: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            Independent checks · Extraordinary clarity
          </motion.p>

          <div className="flex flex-1 items-center justify-center py-10">
            <motion.div
              className="w-full max-w-sm"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <AuthRadar />
              <motion.p
                className="mt-5 text-center text-[13px] text-cream/50"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <span className="text-bad">●</span> 1 site needs you · <span className="text-ok">5 quiet</span>
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <h2 className="max-w-md text-3xl font-medium leading-[1.15] tracking-tight text-cream xl:text-[2.15rem]">
              Every client website. <span className="font-serif italic text-sky">One desk.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/60">
              Uptime, SSL, journeys, browser errors, and client reports — with the evidence to act before Slack blows up.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-cream/45">
              {["3-day free trial", "No card required", "Agency-ready reports"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-magenta" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Stagger children for form fields */
export function AuthFormMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="space-y-3.5 sm:space-y-4"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AuthFieldMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
            }
      }
    >
      {children}
    </motion.div>
  );
}

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  icon?: LucideIcon;
};

/** Auth field — sand fill, magenta focus bar, no white box. */
export function AuthInput({ label, hint, icon: Icon, className, type, id, ...rest }: AuthInputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const resolvedType = isPassword ? (show ? "text" : "password") : type;

  return (
    <label htmlFor={inputId} className="block min-w-0">
      <span className="mb-2 block text-[12px] font-medium tracking-wide text-plum-2 sm:text-[13px]">{label}</span>
      <span className="group relative block min-w-0">
        {Icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-mauve transition duration-200 group-focus-within:text-magenta sm:left-4">
            <Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={1.75} />
          </span>
        )}
        <input
          id={inputId}
          type={resolvedType}
          className={[
            "h-[3.15rem] w-full min-w-0 rounded-xl border-0 bg-sand/70 text-[15px] text-ink outline-none sm:h-14 sm:rounded-[0.9rem] sm:text-[16px]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
            "ring-1 ring-plum/12 placeholder:text-plum/35",
            "transition duration-200",
            "hover:bg-sand hover:ring-plum/20",
            "focus:bg-cream-2 focus:ring-2 focus:ring-magenta/40",
            Icon ? "pl-11 sm:pl-12" : "pl-4",
            isPassword ? "pr-12" : "pr-4",
            className || "",
          ].join(" ")}
          {...rest}
        />
        {/* Focus accent bar */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-magenta transition duration-300 group-focus-within:scale-x-100 sm:inset-x-4"
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((v) => !v)}
            className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-mauve transition hover:bg-plum/8 hover:text-plum sm:right-3"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
      {hint && <span className="mt-1.5 block text-[11px] leading-snug text-plum/50 sm:text-[12px]">{hint}</span>}
    </label>
  );
}

export function AuthSubmit({
  loading,
  children,
}: {
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative mt-2 flex h-[3.15rem] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ink text-[15px] font-medium text-cream shadow-[0_10px_28px_-12px_rgba(28,15,24,0.55)] transition duration-200 hover:bg-plum active:scale-[0.985] disabled:pointer-events-none disabled:opacity-55 sm:h-14 sm:rounded-[0.9rem] sm:text-base"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(143,211,244,0.22),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100"
      />
      {loading && (
        <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

export function AuthError({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="rounded-xl bg-bad/[0.08] px-4 py-3 text-[13px] leading-snug text-bad ring-1 ring-bad/25 sm:text-sm"
    >
      {error}
    </div>
  );
}
