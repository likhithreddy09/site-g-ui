import { Logo } from "./Logo";

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

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-white px-6 py-8 md:px-16">
        <Logo />
        <div className="mx-auto w-full max-w-sm animate-fade-up">
          <h1 className="text-3xl font-medium tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm text-plum-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="text-xs text-plum/50">Protected by tenant isolation and encrypted secrets.</p>
      </div>
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-magenta/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-24 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-cream xl:p-16">
          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-sm animate-fade-up">
              <AuthRadar />
              <p className="mt-4 text-center text-[13px] text-cream/50">
                <span className="text-bad">●</span> 1 site needs you · 5 quiet
              </p>
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h2 className="max-w-md text-3xl font-medium leading-tight xl:text-4xl">
              Every client website. <span className="text-sky">One desk.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/65">
              Uptime, SSL, journeys, browser errors, and client reports - with the evidence to act.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
