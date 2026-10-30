"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../ui";

const SLIDES = ["Portfolio", "Incident", "Journey", "Report"] as const;

function Chip({ children, tone = "live" }: { children: React.ReactNode; tone?: "live" | "bad" | "warn" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide sm:text-[10px]",
        tone === "live" ? "bg-ok/10 text-ok" : tone === "bad" ? "bg-bad/10 text-bad" : "bg-gold/25 text-[#8a5b00]",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function Panel({
  title,
  chip,
  children,
  className,
}: {
  title: string;
  chip?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-white p-3.5 ring-1 ring-plum/8 sm:p-4", className)}>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-plum/45 sm:text-[10px]">{title}</span>
        {chip}
      </div>
      {children}
    </div>
  );
}

function Portfolio() {
  const sites = [
    ["acme-dental.com", "up", "212ms", "100%"],
    ["brightlaw.co.uk", "up", "388ms", "99.98%"],
    ["northbakery.com.au", "down", "timeout", "97.2%"],
    ["greenleaf.in/book", "degraded", "1.9s", "99.4%"],
    ["pixelforge.io", "up", "164ms", "100%"],
  ] as const;
  const stats = [
    ["UPTIME · 24H", "99.86%", "128 sites · 36.8k checks", "live"],
    ["OPEN INCIDENTS", "3", "1 critical · 2 major", "bad"],
    ["AVG RESPONSE", "284ms", "−12% vs last week", "live"],
    ["JOURNEYS", "41/42", "1 failing: Booking", "live"],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {stats.map(([k, v, s, tone], i) => (
        <Panel key={k} title={k} chip={<Chip tone={tone === "bad" ? "bad" : "live"}>{tone === "bad" ? "needs you" : "live"}</Chip>} className={i > 1 ? "hidden sm:block" : undefined}>
          <div className={cn("font-mono text-2xl font-semibold tracking-tight sm:text-[1.65rem]", tone === "bad" ? "text-bad" : "text-ink")}>{v}</div>
          <div className="mt-1.5 font-mono text-[10px] leading-snug text-plum/50">{s}</div>
        </Panel>
      ))}

      <Panel title="Response time · all sites" chip={<Chip>live</Chip>} className="col-span-2 lg:col-span-3">
        <svg viewBox="0 0 500 110" className="h-24 w-full sm:h-28" preserveAspectRatio="none">
          {[20, 50, 80].map((y) => (
            <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="#4b244012" />
          ))}
          <path
            d="M0 80 C40 78 60 70 90 72 S150 60 180 66 S240 40 270 52 S330 30 360 44 S420 20 460 34 L500 30"
            fill="none"
            stroke="#9b1b67"
            strokeWidth="2.25"
            strokeDasharray="1200"
            style={{ animation: "var(--animate-draw)" }}
          />
          <path d="M0 90 C60 88 120 86 180 84 S300 80 360 76 S460 72 500 70" fill="none" stroke="#4b2440" strokeWidth="1.25" strokeDasharray="3 3" opacity=".35" />
          <line x1="360" x2="360" y1="10" y2="100" stroke="#1f8a5b" strokeWidth="1.5" />
          <circle cx="360" cy="44" r="4" fill="#1f8a5b" />
        </svg>
      </Panel>

      <Panel title="Needs attention" chip={<Chip tone="warn">3</Chip>} className="col-span-2 lg:col-span-1">
        <div className="space-y-2.5">
          {[
            ["Booking form fails", "#c2264b"],
            ["SSL expires · 6d", "#fdb913"],
            ["JS error spike", "#9b1b67"],
          ].map(([t, c]) => (
            <div key={t} className="border-l-[3px] pl-2.5 text-[12px] font-medium leading-snug text-ink" style={{ borderColor: c }}>
              {t}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Portfolio" className="col-span-2 lg:col-span-4">
        <div className="divide-y divide-plum/6">
          {sites.map(([n, s, r, u]) => (
            <div key={n} className="flex items-center gap-3 py-2.5 font-mono text-[11px] sm:text-[12px]">
              <span className="flex min-w-0 flex-1 items-center gap-2.5 text-ink">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", s === "up" ? "bg-ok" : s === "down" ? "bg-bad animate-pulse" : "bg-gold")} />
                <span className="truncate">{n}</span>
              </span>
              <span className={cn("shrink-0 tabular-nums text-plum/55", s === "down" && "text-bad")}>{r}</span>
              <span className="w-12 shrink-0 text-right tabular-nums text-plum/55 sm:w-14">{u}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Incident() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:gap-3 lg:grid-cols-5">
      <Panel title="Incident · INC-0142" chip={<Chip tone="bad">open · major</Chip>} className="lg:col-span-3">
        <div className="text-[15px] font-semibold tracking-tight text-ink sm:text-base">User journey failing: Contact form</div>
        <div className="mt-1 text-[11px] text-plum/60 sm:text-xs">brightlaw.co.uk · first detected 09:42 · 3 occurrences</div>
        <div className="mt-3 space-y-1.5">
          {[
            ["✓", "Open /contact", "412ms"],
            ["✓", "Fill #name, #email", "88ms"],
            ["✓", "Click button[type=submit]", "61ms"],
            ["✗", "Assert text “Thank you”", "15.0s"],
          ].map(([s, t, d]) => (
            <div
              key={t}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 font-mono text-[10px] sm:text-[11px]",
                s === "✗" ? "bg-bad/8 text-bad" : "bg-cream text-ink",
              )}
            >
              <span className="min-w-0 truncate">
                {s} {t}
              </span>
              <span className="shrink-0 text-plum/50">{d}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Failure screenshot" className="lg:col-span-2">
        <div className="relative h-[140px] overflow-hidden rounded-lg bg-cream-2 sm:h-[150px]">
          <div className="absolute inset-3 rounded-md bg-white p-3 shadow-sm">
            <div className="h-2.5 w-20 rounded bg-plum/15" />
            <div className="mt-3 h-4 rounded bg-plum/8" />
            <div className="mt-2 h-4 rounded bg-plum/8" />
            <div className="mt-3 h-5 w-16 rounded bg-plum" />
            <div className="mt-3 rounded-md bg-bad/10 px-2 py-1.5 font-mono text-[9px] text-bad">Error 500 · /wp-json/contact-form-7/…</div>
          </div>
        </div>
      </Panel>

      <Panel title="Console & network evidence" className="lg:col-span-3">
        <div className="space-y-1.5 font-mono text-[10px] leading-relaxed sm:text-[11px]">
          <div className="text-bad">TypeError: Cannot read properties of undefined (reading &apos;nonce&apos;)</div>
          <div className="text-plum/60">POST /wp-json/contact-form-7/v1/feedback → 500</div>
          <div className="text-plum/60">release: theme-v2.4.1 · first seen 09:38</div>
        </div>
      </Panel>

      <Panel title="AI-assisted summary" chip={<Chip tone="warn">suggestion</Chip>} className="lg:col-span-2">
        <div className="text-[12px] leading-relaxed text-ink sm:text-[13px]">
          Observed: submit handler throws after theme release 2.4.1.{" "}
          <span className="text-magenta">Hypothesis (medium):</span> missing nonce in updated form template.
        </div>
      </Panel>
    </div>
  );
}

function Journey() {
  const runs = Array.from({ length: 28 }, (_, i) => (i === 19 || i === 20 ? 0 : i === 9 ? 2 : 1));
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
      {[
        ["Contact form", "passing", "every 30 min"],
        ["Booking flow", "failing", "every 1 h"],
        ["Login → Dashboard", "passing", "every 15 min"],
      ].map(([n, s, f]) => (
        <Panel key={n} title={f} chip={<Chip tone={s === "failing" ? "bad" : "live"}>{s}</Chip>}>
          <div className="text-[13px] font-semibold text-ink sm:text-sm">{n}</div>
          <div className="mt-2.5 flex gap-[2px]">
            {runs.map((r, i) => (
              <span
                key={i}
                className={cn(
                  "h-5 flex-1 rounded-[2px]",
                  s === "failing" && i > 24 ? "bg-bad" : r === 1 ? "bg-ok/70" : r === 2 ? "bg-gold" : s === "failing" ? "bg-bad" : "bg-ok/70",
                )}
              />
            ))}
          </div>
        </Panel>
      ))}

      <Panel title="Journey builder" className="sm:col-span-2">
        {[
          ["goto", "/book-appointment"],
          ["fill", "#date → {{tomorrow}}"],
          ["select", "#service → Cleaning"],
          ["fill", "#email → {{email}}"],
          ["click", "text=Confirm booking"],
          ["assert_text", "Booking received"],
        ].map(([a, v], i) => (
          <div key={i} className="mb-1.5 flex items-center gap-2 font-mono text-[10px] sm:text-[11px]">
            <span className="w-4 shrink-0 text-plum/35">{i + 1}</span>
            <span className="w-[5.5rem] shrink-0 rounded-md bg-plum/8 px-1.5 py-0.5 text-plum">{a}</span>
            <span className="min-w-0 truncate text-ink">{v}</span>
          </div>
        ))}
      </Panel>

      <Panel title="Safety policy" chip={<Chip>enforced</Chip>}>
        <div className="space-y-2 text-[12px] text-ink sm:text-[13px]">
          <div>✓ Test inbox confirmed</div>
          <div>✓ Payment endpoints blocked</div>
          <div>✓ Private network blocked</div>
          <div>✓ x-watchfront-test header sent</div>
        </div>
      </Panel>
    </div>
  );
}

function Report() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
      <Panel title="Monthly report · Bright Law" chip={<Chip>shared</Chip>} className="sm:col-span-3">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Uptime", "99.97%"],
            ["Incidents", "4 · 4 resolved"],
            ["MTTR", "18 min"],
            ["Journeys run", "1,440"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-mono text-[9px] uppercase tracking-wide text-plum/45 sm:text-[10px]">{k}</div>
              <div className="mt-1 font-mono text-lg font-semibold tracking-tight text-ink sm:text-xl">{v}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Actions taken" className="sm:col-span-2">
        {["Rolled back theme 2.4.1 — contact form restored", "Renewed SSL via AutoSSL", "Fixed broken link on /services"].map((t) => (
          <div key={t} className="mb-2 flex gap-2 text-[12px] leading-snug text-ink sm:text-[13px]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ok" />
            {t}
          </div>
        ))}
      </Panel>

      <Panel title="Coverage">
        <div className="text-[12px] leading-relaxed text-plum/70 sm:text-[13px]">
          Period: 1–30 Sep · 12 sites · 103,680 checks · gaps from paused sites excluded.
        </div>
      </Panel>
    </div>
  );
}

const VIEWS = { Portfolio, Incident, Journey, Report };

const CAPTIONS: Record<(typeof SLIDES)[number], string> = {
  Portfolio: "Every client site, one live desk",
  Incident: "Evidence attached to every alert",
  Journey: "Forms and bookings checked on a schedule",
  Report: "Client-ready proof of the month’s work",
};

export function Showcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5200);
    return () => clearInterval(t);
  }, [paused]);

  const View = VIEWS[SLIDES[i]];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-x-6 -top-8 -bottom-4 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(155,27,103,0.08),_transparent_55%)] sm:-inset-x-10" />

      <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#efeaf3] to-[#e4e0ec] p-2 shadow-[0_40px_90px_-40px_rgba(75,36,64,0.55)] ring-1 ring-plum/10 sm:rounded-[1.75rem] sm:p-3 md:p-4">
        {/* Browser chrome */}
        <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2.5 backdrop-blur sm:mb-3 sm:px-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#e8b4b8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e8d4a8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#b8d4c0]" />
          </div>
          <div className="ml-1 min-w-0 flex-1 truncate rounded-lg bg-cream px-2.5 py-1 font-mono text-[10px] text-plum/55 sm:text-[11px]">
            app.watchfront.in / overview
          </div>
          <span className="hidden shrink-0 font-mono text-[10px] text-ok sm:inline">● live · 4s ago</span>
        </div>

        <div className="rounded-xl bg-[#f3f1f7] p-2.5 sm:p-3.5">
          <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 px-0.5 sm:mb-3">
            <span className="text-sm font-semibold text-ink">{SLIDES[i] === "Portfolio" ? "Today" : SLIDES[i]}</span>
            <span className="font-mono text-[10px] text-plum/45 sm:text-[11px]">Tue 27 Oct · 09:46 IST</span>
            <span className="font-mono text-[10px] text-ok sm:hidden">● live</span>
          </div>

          <div className="relative min-h-[340px] sm:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <View />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:gap-4">
        <motion.p
          key={i}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center text-sm font-medium text-ink sm:text-base"
        >
          {CAPTIONS[SLIDES[i]]}
        </motion.p>

        <div className="flex items-center gap-4 text-plum sm:gap-5">
          <button type="button" aria-label="Previous" className="rounded-full p-1.5 transition hover:bg-plum/5" onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {SLIDES.map((s, j) => (
              <button
                key={s}
                type="button"
                aria-label={s}
                onClick={() => setI(j)}
                className={cn("h-1.5 rounded-full transition-all duration-500", j === i ? "w-8 bg-plum" : "w-2.5 bg-mauve/45")}
              />
            ))}
          </div>
          <button type="button" aria-label="Next" className="rounded-full p-1.5 transition hover:bg-plum/5" onClick={() => setI((i + 1) % SLIDES.length)}>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button type="button" aria-label={paused ? "Play" : "Pause"} className="rounded-full p-1.5 transition hover:bg-plum/5" onClick={() => setPaused(!paused)}>
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
