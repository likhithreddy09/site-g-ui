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
    <div className="relative overflow-hidden border-y border-plum/8 bg-gradient-to-r from-cream/40 via-cream/80 to-cream/40 py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-36" />
      <div className={`flex w-max gap-12 ${reduce ? "" : "animate-marquee"}`}>
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap text-[13px] font-medium tracking-[0.04em] text-plum/65"
          >
            <span className="relative flex h-1.5 w-1.5">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta/50 opacity-60" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-magenta" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
