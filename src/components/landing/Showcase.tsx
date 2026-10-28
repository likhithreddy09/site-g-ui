"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../ui";

const SLIDES = ["Portfolio", "Incident", "Journey", "Report"] as const;

function Chip({ children, tone = "live" }: { children: React.ReactNode; tone?: "live" | "bad" | "warn" }) {
  return (
    <span className={cn("rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide",
      tone === "live" ? "bg-ok/10 text-ok" : tone === "bad" ? "bg-bad/10 text-bad" : "bg-gold/25 text-[#8a5b00]")}>● {children}</span>
  );
}

function Panel({ title, chip, children, className }: { title: string; chip?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg bg-white p-3 ring-1 ring-plum/8", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-plum/50">{title}</span>
        {chip}
      </div>
      {children}
    </div>
  );
}

function Portfolio() {
  const sites = [
    ["acme-dental.com", "up", "212ms", "100%"], ["brightlaw.co.uk", "up", "388ms", "99.98%"], ["northbakery.com.au", "down", "timeout", "97.2%"],
    ["greenleaf.in/book", "degraded", "1.9s", "99.4%"], ["pixelforge.io", "up", "164ms", "100%"],
  ];
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {[["UPTIME · 24H", "99.86%", "128 sites · 36.8k checks"], ["OPEN INCIDENTS", "3", "1 critical · 2 major"], ["AVG RESPONSE", "284ms", "−12% vs last week"], ["JOURNEYS", "41/42", "1 failing: Booking"]].map(([k, v, s], i) => (
        <Panel key={k} title={k} chip={<Chip tone={i === 1 ? "bad" : "live"}>{i === 1 ? "needs you" : "live"}</Chip>}>
          <div className={cn("font-mono text-xl font-semibold", i === 1 ? "text-bad" : "text-ink")}>{v}</div>
          <div className="mt-1 font-mono text-[8px] text-plum/50">{s}</div>
        </Panel>
      ))}
      <Panel title="Response time · all sites" chip={<Chip>live</Chip>} className="col-span-3">
        <svg viewBox="0 0 500 110" className="h-28 w-full">
          {[20, 50, 80].map((y) => <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="#4b244010" />)}
          <path d="M0 80 C40 78 60 70 90 72 S150 60 180 66 S240 40 270 52 S330 30 360 44 S420 20 460 34 L500 30" fill="none" stroke="#9b1b67" strokeWidth="2" strokeDasharray="1200" style={{ animation: "var(--animate-draw)" }} />
          <path d="M0 90 C60 88 120 86 180 84 S300 80 360 76 S460 72 500 70" fill="none" stroke="#4b2440" strokeWidth="1" strokeDasharray="3 3" opacity=".4" />
          <line x1="360" x2="360" y1="10" y2="100" stroke="#1f8a5b" strokeWidth="1.5" />
          <circle cx="360" cy="44" r="3.5" fill="#1f8a5b" />
        </svg>
      </Panel>
      <Panel title="Needs attention" chip={<Chip tone="warn">3</Chip>}>
        {["Booking form fails", "SSL expires · 6d", "JS error spike"].map((t, i) => (
          <div key={t} className="mb-1.5 border-l-2 pl-2 text-[9px] font-medium text-ink" style={{ borderColor: ["#c2264b", "#fdb913", "#9b1b67"][i] }}>{t}</div>
        ))}
      </Panel>
      <Panel title="Portfolio" className="col-span-4">
        <div className="grid grid-cols-1 divide-y divide-plum/6">
          {sites.map(([n, s, r, u]) => (
            <div key={n} className="flex items-center justify-between py-1 font-mono text-[9px]">
              <span className="flex items-center gap-2 text-ink"><span className={cn("h-1.5 w-1.5 rounded-full", s === "up" ? "bg-ok" : s === "down" ? "bg-bad animate-pulse" : "bg-gold")} />{n}</span>
              <span className="text-plum/60">{r}</span><span className="text-plum/60">{u}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Incident() {
  return (
    <div className="grid grid-cols-5 gap-2.5">
      <Panel title="Incident · INC-0142" chip={<Chip tone="bad">open · major</Chip>} className="col-span-3">
        <div className="text-sm font-semibold text-ink">User journey failing: Contact form</div>
        <div className="mt-1 text-[10px] text-plum/60">brightlaw.co.uk · first detected 09:42 · 3 occurrences</div>
        <div className="mt-3 space-y-1.5">
          {[["✓", "Open /contact", "412ms"], ["✓", "Fill #name, #email", "88ms"], ["✓", "Click button[type=submit]", "61ms"], ["✗", "Assert text “Thank you”", "15.0s"]].map(([s, t, d]) => (
            <div key={t} className={cn("flex items-center justify-between rounded px-2 py-1 font-mono text-[9px]", s === "✗" ? "bg-bad/8 text-bad" : "bg-cream text-ink")}>
              <span>{s} {t}</span><span className="text-plum/50">{d}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Failure screenshot" className="col-span-2">
        <div className="relative h-[126px] overflow-hidden rounded-md bg-cream-2">
          <div className="absolute inset-3 rounded bg-white p-2">
            <div className="h-2 w-16 rounded bg-plum/20" />
            <div className="mt-2 h-4 rounded bg-plum/8" /><div className="mt-1.5 h-4 rounded bg-plum/8" />
            <div className="mt-2 h-4 w-14 rounded bg-plum" />
            <div className="mt-2 rounded bg-bad/10 px-1.5 py-1 font-mono text-[7px] text-bad">Error 500 · /wp-json/contact-form-7/…</div>
          </div>
        </div>
      </Panel>
      <Panel title="Console & network evidence" className="col-span-3">
        <div className="space-y-1 font-mono text-[8.5px]">
          <div className="text-bad">TypeError: Cannot read properties of undefined (reading &apos;nonce&apos;)</div>
          <div className="text-plum/60">POST /wp-json/contact-form-7/v1/feedback → 500</div>
          <div className="text-plum/60">release: theme-v2.4.1 · first seen 09:38</div>
        </div>
      </Panel>
      <Panel title="AI-assisted summary" chip={<Chip tone="warn">suggestion</Chip>} className="col-span-2">
        <div className="text-[9px] leading-relaxed text-ink">Observed: submit handler throws after theme release 2.4.1 (E2, E4). <span className="text-magenta">Hypothesis (medium):</span> missing nonce in updated form template.</div>
      </Panel>
    </div>
  );
}

function Journey() {
  const runs = Array.from({ length: 28 }, (_, i) => (i === 19 || i === 20 ? 0 : i === 9 ? 2 : 1));
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {[["Contact form", "passing", "every 30 min"], ["Booking flow", "failing", "every 1 h"], ["Login → Dashboard", "passing", "every 15 min"]].map(([n, s, f]) => (
        <Panel key={n} title={f} chip={<Chip tone={s === "failing" ? "bad" : "live"}>{s}</Chip>}>
          <div className="text-xs font-semibold text-ink">{n}</div>
          <div className="mt-2 flex gap-[2px]">
            {runs.map((r, i) => <span key={i} className={cn("h-5 flex-1 rounded-[2px]", s === "failing" && i > 24 ? "bg-bad" : r === 1 ? "bg-ok/70" : r === 2 ? "bg-gold" : s === "failing" ? "bg-bad" : "bg-ok/70")} />)}
          </div>
        </Panel>
      ))}
      <Panel title="Journey builder" className="col-span-2">
        {[["goto", "/book-appointment"], ["fill", "#date → {{tomorrow}}"], ["select", "#service → Cleaning"], ["fill", "#email → {{email}}"], ["click", "text=Confirm booking"], ["assert_text", "Booking received"]].map(([a, v], i) => (
          <div key={i} className="mb-1 flex items-center gap-2 font-mono text-[9px]">
            <span className="w-4 text-plum/40">{i + 1}</span><span className="w-20 rounded bg-plum/8 px-1.5 py-0.5 text-plum">{a}</span><span className="text-ink">{v}</span>
          </div>
        ))}
      </Panel>
      <Panel title="Safety policy" chip={<Chip>enforced</Chip>}>
        <div className="space-y-1.5 text-[9px] text-ink">
          <div>✓ Test inbox confirmed</div><div>✓ Payment endpoints blocked</div><div>✓ Private network blocked</div><div>✓ x-siteguard-test header sent</div>
        </div>
      </Panel>
    </div>
  );
}

function Report() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      <Panel title="Monthly report · Bright Law" chip={<Chip>shared</Chip>} className="col-span-3">
        <div className="grid grid-cols-4 gap-3">
          {[["Uptime", "99.97%"], ["Incidents", "4 · 4 resolved"], ["MTTR", "18 min"], ["Journeys run", "1,440"]].map(([k, v]) => (
            <div key={k}><div className="font-mono text-[8px] uppercase text-plum/50">{k}</div><div className="font-mono text-base font-semibold text-ink">{v}</div></div>
          ))}
        </div>
      </Panel>
      <Panel title="Actions taken" className="col-span-2">
        {["Rolled back theme 2.4.1 — contact form restored", "Renewed SSL via AutoSSL", "Fixed broken link on /services"].map((t) => (
          <div key={t} className="mb-1.5 flex gap-2 text-[9px] text-ink"><span className="text-ok">●</span>{t}</div>
        ))}
      </Panel>
      <Panel title="Coverage">
        <div className="text-[9px] leading-relaxed text-plum/70">Period: 1–30 Sep · 12 sites · 103,680 checks · gaps from paused sites excluded.</div>
      </Panel>
    </div>
  );
}

const VIEWS = { Portfolio, Incident, Journey, Report };

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
    <div className="rounded-3xl bg-cream-2/70 p-4 ring-1 ring-plum/5 md:p-8">
      <div className="mx-auto overflow-hidden rounded-2xl bg-[#e9e7f1] p-3 shadow-[0_30px_80px_-30px_rgba(75,36,64,0.45)] md:p-4">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
          <span className="text-xs font-semibold text-ink">{SLIDES[i] === "Portfolio" ? "Today" : SLIDES[i]}</span>
          <span className="font-mono text-[9px] text-plum/50">Tuesday, 27-Oct-2026 · 09:46 IST</span>
          <span className="ml-auto font-mono text-[9px] text-ok">● live · refreshed 4s ago</span>
        </div>
        <div className="relative min-h-[330px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <View />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-5 flex flex-col items-center gap-4">
        <motion.span key={i} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-lg bg-gold px-3 py-1 text-sm font-medium text-ink">
          {SLIDES[i]}
        </motion.span>
        <div className="flex items-center gap-5 text-plum">
          <button aria-label="Previous" onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}><ArrowLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            {SLIDES.map((s, j) => (
              <button key={s} aria-label={s} onClick={() => setI(j)} className={cn("h-1 rounded-full transition-all duration-500", j === i ? "w-8 bg-plum" : "w-3 bg-mauve/50")} />
            ))}
          </div>
          <button aria-label="Next" onClick={() => setI((i + 1) % SLIDES.length)}><ArrowRight className="h-5 w-5" /></button>
          <button aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused(!paused)}>{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
        </div>
      </div>
    </div>
  );
}
