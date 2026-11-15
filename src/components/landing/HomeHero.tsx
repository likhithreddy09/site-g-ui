"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { HeroDesk } from "@/components/landing/HeroDesk";

const EASE = [0.22, 1, 0.36, 1] as const;

const line = {
  hidden: { y: 18 },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 0.8, delay: 0.08 + i * 0.09, ease: EASE },
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
        </>
      )}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-20">
        <motion.div initial="hidden" animate="show" className="max-w-xl">
          <motion.p custom={0} variants={line} className="text-[13px] text-plum">
            Website monitoring for agencies in India
          </motion.p>
          <motion.h1
            custom={1}
            variants={line}
            className="mt-4 text-[2rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-[52px]"
          >
            Know when client sites break
            <br />
            <span className="hl-underline text-magenta">and why they broke</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={line}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink sm:text-base"
          >
            Uptime, SSL, forms, APIs and JS errors — with evidence to fix fast and reports clients understand.
          </motion.p>
          <motion.div custom={3} variants={line} className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            <CtaPrimaryLink
              className="rounded-full bg-plum px-5 py-2.5 text-[14px] font-normal text-cream transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg sm:px-6 sm:py-3 sm:text-[15px]"
              guestLabel="Start monitoring free"
            />
            <a href="#wow" className="group link-underline text-[14px] text-plum sm:text-[15px]">
              Watch the wow moment{" "}
              <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.p custom={4} variants={line} className="mt-5 text-[13px] text-plum-2">
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
