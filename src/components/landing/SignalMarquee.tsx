"use client";

import { useReducedMotion } from "framer-motion";

const SIGNALS = [
  "Uptime · 1 min",
  "SSL expiry",
  "Form journeys",
  "SEO audit",
  "JS errors",
  "API checks",
  "Client reports",
  "Domain expiry",
  "Broken links",
  "Incident evidence",
];

export function SignalMarquee() {
  const reduce = useReducedMotion();
  const row = [...SIGNALS, ...SIGNALS];

  return (
    <div className="relative overflow-hidden border-y border-plum/10 bg-cream/60 py-3.5" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      <div
        className={`flex w-max gap-10 ${reduce ? "" : "animate-marquee"}`}
      >
        {row.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-3 whitespace-nowrap text-[13px] font-medium tracking-wide text-plum/70">
            <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
