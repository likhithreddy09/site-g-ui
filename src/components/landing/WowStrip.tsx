"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function WowStrip() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-120, 80]);
  const xRight = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -80]);
  const scale = useTransform(scrollYProgress, [0.15, 0.5], reduce ? [1, 1] : [0.86, 1]);
  const rotateY = useTransform(scrollYProgress, [0.1, 0.55], reduce ? [0, 0] : [14, 0]);
  const cardLeft = useTransform(scrollYProgress, [0.2, 0.55], reduce ? [0, 0] : [-40, 0]);
  const cardRight = useTransform(scrollYProgress, [0.2, 0.55], reduce ? [0, 0] : [40, 0]);

  return (
    <section id="wow" ref={ref} className="relative mt-24 overflow-hidden bg-ink py-20 text-cream sm:mt-28 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(155,27,103,0.35),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(143,211,244,0.2),transparent_45%)]" />
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/20 blur-3xl"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6" style={{ perspective: 1400 }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">Chapter 01 / The break</p>
        <motion.p
          style={{ x: xLeft }}
          className="mt-4 font-brand text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-cream/15"
        >
          Uptime was green.
        </motion.p>
        <motion.p
          style={{ x: xRight }}
          className="mt-2 font-brand text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-sky/80"
        >
          The form was not.
        </motion.p>

        <motion.div
          style={reduce ? undefined : { scale, rotateY, transformPerspective: 1400 }}
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:mt-16 sm:grid-cols-2"
        >
          <motion.div
            style={reduce ? undefined : { x: cardLeft, rotateY: -6, transformPerspective: 1000 }}
            className="overflow-hidden rounded-2xl bg-cream/5 p-4 ring-1 ring-white/10 backdrop-blur-sm transition duration-500 hover:bg-cream/10 sm:p-5"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-cream/45">
              <span className="h-2 w-2 rounded-full bg-ok" /> Homepage
            </div>
            <div className="mt-4 grid aspect-[16/10] rounded-xl bg-gradient-to-br from-cream/20 to-transparent grid-bg">
              <div className="flex h-full flex-col justify-end p-4">
                <div className="h-3 w-2/3 rounded bg-cream/25" />
                <div className="mt-2 h-3 w-1/2 rounded bg-cream/15" />
                <div className="mt-6 inline-flex w-fit rounded-full bg-ok/30 px-3 py-1 font-mono text-[11px] text-sky">200 OK</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { x: cardRight, rotateY: 6, transformPerspective: 1000 }}
            className="overflow-hidden rounded-2xl bg-cream/5 p-4 ring-1 ring-bad/35 backdrop-blur-sm transition duration-500 hover:bg-bad/10 sm:p-5"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-cream/45">
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bad opacity-60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bad" />
              </span>
              Contact journey
            </div>
            <div className="mt-4 aspect-[16/10] rounded-xl bg-gradient-to-br from-bad/25 to-transparent">
              <div className="flex h-full flex-col justify-end p-4">
                <div className="h-3 w-3/5 rounded bg-cream/20" />
                <div className="mt-2 h-8 w-full rounded-lg bg-cream/10 ring-1 ring-cream/15" />
                <div className="mt-6 inline-flex w-fit rounded-full bg-bad px-3 py-1 font-mono text-[11px] text-cream">
                  Assert failed · evidence kept
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-xl text-center text-[15px] leading-relaxed text-cream/65">
          Watchfront is built for the failures clients notice — not just whether the homepage answered.{" "}
          <Link href="/register" className="link-underline text-sky">
            See it on your portfolio
          </Link>
        </p>
      </div>
    </section>
  );
}
