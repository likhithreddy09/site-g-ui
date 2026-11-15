"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { HeroDesk } from "@/components/landing/HeroDesk";

/** Expo-out — modern AI product settle */
const EASE = [0.16, 1, 0.3, 1] as const;

/** H1 stays transform-only so LCP isn’t opacity-gated */
const line = {
  hidden: { y: 22 },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.06 + i * 0.08, ease: EASE },
  }),
};
const soft = {
  hidden: { y: 18, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, delay: 0.1 + i * 0.08, ease: EASE },
  }),
};

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-magenta/10 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-20 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 28, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-20">
        <motion.div initial={reduce ? false : "hidden"} animate="show" className="max-w-xl">
          <motion.p custom={0} variants={soft} className="text-[13px] text-plum">
            Website monitoring for agencies in India
          </motion.p>
          <motion.h1
            custom={0}
            variants={line}
            className="mt-4 text-[2rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-[52px]"
          >
            Know when client sites break
            <br />
            <span className="hl-underline text-magenta">and why they broke</span>
          </motion.h1>
          <motion.p
            custom={1}
            variants={soft}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink sm:text-base"
          >
            Uptime, SSL, forms, APIs and JS errors — with evidence to fix fast and reports clients understand.
          </motion.p>
          <motion.div custom={2} variants={soft} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <CtaPrimaryLink
              className="rounded-full bg-plum px-5 py-2.5 text-[14px] font-normal text-cream shadow-[0_10px_30px_-12px_rgba(75,36,64,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_16px_40px_-12px_rgba(28,15,24,0.55)] sm:px-6 sm:py-3 sm:text-[15px]"
              guestLabel="Start monitoring free"
            />
            <a href="#wow" className="group link-underline text-[14px] text-plum sm:text-[15px]">
              Watch the wow moment{" "}
              <ArrowRight className="inline h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.p custom={3} variants={soft} className="mt-5 text-[13px] text-plum-2">
            First useful result in minutes · no code · free for 3 days
          </motion.p>
        </motion.div>

        <div className="lg:justify-self-end lg:w-full lg:max-w-[440px]">
          <HeroDesk />
        </div>
      </div>
    </section>
  );
}
