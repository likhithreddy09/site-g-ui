"use client";

import { motion, useReducedMotion } from "framer-motion";

const SITES = [
  { name: "northline.agency", status: "ok", ms: "182ms" },
  { name: "client-shop.in", status: "ok", ms: "241ms" },
  { name: "leadform.studio", status: "bad", ms: "—" },
  { name: "care.wp-plan.com", status: "ok", ms: "156ms" },
] as const;

export function HeroDesk() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      initial={reduce ? false : { opacity: 0, y: 28, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_70%_20%,rgba(143,211,244,0.4),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(155,27,103,0.22),transparent_50%)]"
          animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.03, 1] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink text-cream shadow-[0_36px_90px_-28px_rgba(28,15,24,0.6)] ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-bad" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="h-2.5 w-2.5 rounded-full bg-ok" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">Portfolio · live</span>
        </div>

        <div className="space-y-2.5 p-4 sm:p-5">
          {SITES.map((s, i) => (
            <motion.div
              key={s.name}
              className={`flex items-center justify-between rounded-xl px-3.5 py-3 ring-1 ${
                s.status === "bad" ? "bg-bad/15 ring-bad/40" : "bg-white/5 ring-white/10"
              }`}
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.08, duration: 0.5 }}
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium">{s.name}</div>
                <div className={`mt-0.5 text-[11px] ${s.status === "bad" ? "text-rose" : "text-cream/45"}`}>
                  {s.status === "bad" ? "Form journey failed" : "Quiet"}
                </div>
              </div>
              <div className="flex items-center gap-2 pl-3">
                {s.status === "bad" && !reduce ? (
                  <motion.span
                    className="h-2 w-2 rounded-full bg-bad"
                    animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-ok" />
                )}
                <span className="font-mono text-[11px] tabular-nums text-cream/55">{s.ms}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating evidence card */}
        <motion.div
          className="relative mx-4 mb-4 overflow-hidden rounded-xl bg-cream p-3 text-ink shadow-lg sm:mx-5 sm:mb-5 sm:p-4"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.55 }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-bad/15 px-2.5 py-0.5 text-[11px] font-medium text-bad">Evidence</span>
            <span className="font-mono text-[11px] text-plum/50">09:43</span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_0.85fr] gap-3">
            <div className="space-y-2">
              <div className="h-2 w-[80%] rounded bg-sand" />
              <div className="h-2 w-[60%] rounded bg-sand" />
              <p className="pt-1 text-[12px] leading-snug text-plum-2">Assert “Thank you” failed · POST /contact → 500</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink">
              <div className="absolute inset-0 grid-bg opacity-40" />
              {!reduce && (
                <motion.div
                  className="absolute inset-x-3 top-3 h-8 rounded bg-white/10"
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
              )}
              <div className="absolute bottom-2 left-2 right-2 rounded bg-bad/90 px-2 py-1 text-center font-mono text-[10px] text-cream">
                screenshot attached
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute -right-3 top-16 hidden rounded-full bg-sky px-3 py-1.5 text-[11px] font-medium text-ink shadow-lg sm:block"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          Alert sent
        </motion.div>
      )}
    </motion.div>
  );
}
