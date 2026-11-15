"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { OrbitalSculpture } from "@/components/landing/OrbitalSculpture";
import { useLiteMotion } from "@/lib/motion";
import { SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const light = !!reduce || lite;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbitalY = useTransform(scrollYProgress, [0, 1], light ? [0, 0] : [0, 140]);
  const orbitalScale = useTransform(scrollYProgress, [0, 1], light ? [1, 1] : [1, 0.78]);
  const orbitalOpacity = useTransform(scrollYProgress, [0, 0.75], light ? [1, 1] : [1, 0.25]);
  const copyY = useTransform(scrollYProgress, [0, 1], light ? [0, 0] : [0, -60]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(155,27,103,0.32),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(143,211,244,0.1),transparent_40%),linear-gradient(180deg,#1c0f18_0%,#120a10_50%,#1c0f18_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-5 pt-6 sm:px-6 sm:pt-8">
        {/* copy block — top of composition */}
        <motion.div style={light ? undefined : { y: copyY }} className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={light ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: light ? 0.4 : 0.7, ease: EASE }}
            className="font-brand text-[clamp(1.45rem,3vw,1.85rem)] font-extrabold tracking-[-0.04em] text-cream"
          >
            {SITE.name}
            <span className="ml-1 align-super text-[0.45em] font-medium tracking-[0.12em] text-cream/45">®</span>
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 sm:text-[11px]"
          >
            Independent checks. Extraordinary clarity.
          </motion.p>

          <h1 className="mt-3 text-[clamp(2.1rem,5.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-cream">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
            >
              Make room for{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-magenta">certainty.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-cream/65 sm:text-[15px]"
          >
            Uptime, SSL, forms, and JS errors — with evidence to fix fast and reports clients understand.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
            className="mt-5 flex flex-wrap items-center justify-center gap-5"
          >
            <CtaPrimaryLink
              className="group inline-flex items-center gap-3 text-[15px] font-medium text-cream"
              signedInLabel={
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink transition duration-300 group-hover:bg-sky">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  Open dashboard
                </>
              }
              guestLabel={
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink transition duration-300 group-hover:bg-sky">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  Enter the platform
                </>
              }
            />
            <a href="#wow" className="text-[14px] text-cream/55 transition hover:text-cream">
              Watch the wow moment
            </a>
          </motion.div>
        </motion.div>

        {/* orbital — dominant lower plane */}
        <motion.div
          initial={light ? false : { opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: light ? 0.5 : 1.15, delay: light ? 0 : 0.2, ease: EASE }}
          style={light ? undefined : { y: orbitalY, scale: orbitalScale, opacity: orbitalOpacity }}
          className="relative mt-2 flex flex-1 items-center justify-center sm:mt-1"
        >
          <OrbitalSculpture className="max-w-[min(78vw,24rem)] sm:max-w-[min(52vw,26rem)]" />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-2 flex items-center justify-between gap-4 border-t border-cream/10 pt-4 sm:mt-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/45 sm:text-[11px]">
            Signal 001 / The orbital
          </p>
          <Link
            href="#platform"
            className="inline-flex text-cream/40 transition hover:text-cream/70"
            aria-label="Scroll to platform"
          >
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/35 sm:text-[11px]">
            First result in minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
