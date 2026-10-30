"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";

const SITES = [
  { angle: -18, r: 0.42, ok: true },
  { angle: 48, r: 0.68, ok: false },
  { angle: 112, r: 0.52, ok: true },
  { angle: 168, r: 0.74, ok: true },
  { angle: 228, r: 0.46, ok: true },
  { angle: 292, r: 0.62, ok: true },
] as const;

const BEATS = [
  { t: "09:42", label: "Detected", body: "Contact form journey fails at “Thank you” — before anyone emails you." },
  { t: "09:43", label: "Evidence", body: "Screenshot, console TypeError, and a 500 from the form endpoint — attached." },
  { t: "10:11", label: "Closed", body: "Theme rolled back. Check passes. The client never had to call." },
] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export function Showcase() {
  const reduce = useReducedMotion();
  const cx = 200;
  const cy = 200;
  const maxR = 148;
  const fail = SITES.find((s) => !s.ok)!;
  const failPt = polar(cx, cy, fail.r * maxR, fail.angle);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_50%_0%,rgba(155,27,103,0.12),transparent_58%)]"
      />

      <div className="overflow-hidden rounded-[2rem] bg-ink text-cream">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          {/* Radar — product metaphor, not a fake dashboard */}
          <div className="relative border-b border-white/10 px-6 py-10 sm:px-10 sm:py-12 lg:border-b-0 lg:border-r">
            <p className="text-[12px] uppercase tracking-[0.2em] text-cream/45">Portfolio signal</p>
            <h2 className="mt-3 max-w-md text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              One desk watching every client site.
            </h2>

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-[420px]">
              <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden>
                <defs>
                  <radialGradient id="desk-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9b1b67" stopOpacity="0.35" />
                    <stop offset="55%" stopColor="#4b2440" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#1c0f18" stopOpacity="0" />
                  </radialGradient>
                  {/* Fade from bright leading edge → soft trail */}
                  <linearGradient id="sweep-fade" gradientUnits="userSpaceOnUse" x1={cx} y1={cy - maxR} x2={cx + maxR * 0.72} y2={cy - maxR * 0.28}>
                    <stop offset="0%" stopColor="#8fd3f4" stopOpacity="0.55" />
                    <stop offset="55%" stopColor="#8fd3f4" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#8fd3f4" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="radar-clip">
                    <circle cx={cx} cy={cy} r={maxR} />
                  </clipPath>
                </defs>

                <circle cx={cx} cy={cy} r={maxR + 18} fill="url(#desk-glow)" />
                {[0.35, 0.62, 1].map((f) => (
                  <circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="rgba(250,246,237,0.14)" strokeWidth="1" />
                ))}
                {[0, 45, 90, 135].map((d) => {
                  const a = polar(cx, cy, maxR + 6, d);
                  const b = polar(cx, cy, maxR + 6, d + 180);
                  return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(250,246,237,0.08)" strokeWidth="1" />;
                })}

                {/* SVG rotate around center — reliable (CSS transform-origin breaks when SVG scales) */}
                {!reduce && (
                  <g clipPath="url(#radar-clip)">
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${cx} ${cy}`}
                        to={`360 ${cx} ${cy}`}
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      {/* ~70° trail wedge */}
                      <path
                        d={`M ${cx} ${cy} L ${cx} ${cy - maxR} A ${maxR} ${maxR} 0 0 1 ${cx + maxR * 0.94} ${cy - maxR * 0.342} Z`}
                        fill="url(#sweep-fade)"
                      />
                      {/* Bright leading ray */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={cy - maxR}
                        stroke="#8fd3f4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.95"
                      />
                      <circle cx={cx} cy={cy - maxR} r="3" fill="#8fd3f4" />
                    </g>
                  </g>
                )}

                {/* Lock beam on the failing site */}
                <line x1={cx} y1={cy} x2={failPt.x} y2={failPt.y} stroke="#f47c9b" strokeWidth="1.25" strokeDasharray="4 5" opacity="0.85" />

                {SITES.map((s, i) => {
                  const p = polar(cx, cy, s.r * maxR, s.angle);
                  return (
                    <g key={i}>
                      {!s.ok && !reduce && (
                        <>
                          <circle cx={p.x} cy={p.y} r={16} fill="none" stroke="#c2264b" strokeWidth="1.5" opacity="0.9">
                            <animate attributeName="r" values="8;22" dur="1.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.75;0" dur="1.6s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={p.x} cy={p.y} r={16} fill="none" stroke="#c2264b" strokeWidth="1.25" opacity="0.9">
                            <animate attributeName="r" values="8;22" dur="1.6s" begin="0.55s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.75;0" dur="1.6s" begin="0.55s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      <circle cx={p.x} cy={p.y} r={s.ok ? 5 : 7} fill={s.ok ? "#1f8a5b" : "#c2264b"} />
                    </g>
                  );
                })}

                <circle cx={cx} cy={cy} r={7} fill="#faf6ed" />
                <circle cx={cx} cy={cy} r={3.2} fill="#9b1b67" />
              </svg>
            </div>

            <p className="mt-2 text-center text-[13px] text-cream/50">
              <span className="text-bad">●</span> 1 site needs you · 5 quiet
            </p>
          </div>

          {/* Morning story — one column, no card grid */}
          <div className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-12">
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-cream/45">This morning</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/75">
                Uptime stayed green. The form did not. Watchfront caught the journey, kept the evidence, and closed the loop.
              </p>

              <ol className="mt-10 space-y-0">
                {BEATS.map((b, i) => (
                  <li key={b.t} className="relative grid grid-cols-[3.25rem_1fr] gap-4 pb-9 last:pb-0">
                    {i < BEATS.length - 1 && (
                      <span aria-hidden className="absolute left-[1.35rem] top-7 bottom-0 w-px bg-white/15" />
                    )}
                    <span className="pt-0.5 font-mono text-[11px] tabular-nums text-sky">{b.t}</span>
                    <div>
                      <div className="text-[15px] font-medium text-cream">{b.label}</div>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-cream/65">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link href="/register" className="group inline-flex items-center gap-2 text-[15px] text-sky transition hover:text-cream">
                Try it on your portfolio
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
