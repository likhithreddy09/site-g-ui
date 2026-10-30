import { Logo } from "./Logo";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-white px-6 py-8 md:px-16">
        <Logo />
        <div className="mx-auto w-full max-w-sm animate-fade-up">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm text-plum-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="text-xs text-plum/50">Protected by tenant isolation and encrypted secrets.</p>
      </div>
      <div className="relative hidden overflow-hidden bg-plum lg:block">
        <div className="grid-bg absolute inset-0 opacity-40 [filter:invert(1)]" />
        <div className="relative flex h-full flex-col justify-end p-16 text-cream">
          <div className="mb-10 space-y-3">
            {[["acme-dental.com", "up", "212ms"], ["brightlaw.co.uk", "down", "timeout"], ["greenleaf.in", "up", "301ms"]].map(([n, s, r], i) => (
              <div key={n} className="flex max-w-sm items-center justify-between rounded-2xl bg-white/8 px-5 py-4 ring-1 ring-white/10 animate-fade-up" style={{ animationDelay: `${300 + i * 120}ms` }}>
                <span className="flex items-center gap-3 font-mono text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${s === "up" ? "bg-[#4ade80]" : "animate-pulse bg-rose"}`} />{n}
                </span>
                <span className="font-mono text-xs text-cream/60">{r}</span>
              </div>
            ))}
          </div>
          <h2 className="max-w-md text-4xl font-semibold leading-tight">Every client website. <span className="text-sky">One dashboard.</span></h2>
          <p className="mt-4 max-w-md text-cream/70">Uptime, SSL, journeys, browser errors, and client reports - with the evidence to act.</p>
        </div>
      </div>
    </div>
  );
}
