"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";

const EASE = [0.22, 1, 0.36, 1] as const;

const line = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.08 + i * 0.09, ease: EASE },
  }),
};

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Soft atmospheric motion — brand colours, not purple-AI default */}
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
            className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-sky/25 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
            animate={{ y: [0, -16, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-20">
        <motion.div initial="hidden" animate="show" className="max-w-4xl">
          <motion.p custom={0} variants={line} className="text-[15px] text-plum">
            Website monitoring for agencies in India · Uptime, SSL, forms & reports
          </motion.p>
          <motion.h1
            custom={1}
            variants={line}
            className="mt-4 text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-[76px]"
          >
            Know when client sites break
            <br />
            <span className="hl-underline text-magenta">and why they broke</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={line}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink sm:mt-8 sm:text-lg md:text-xl"
          >
            Watchfront is website monitoring software for Indian agencies — uptime monitoring, SSL & domain expiry, contact form checks, APIs and JavaScript errors across every client website, with evidence to fix fast and INR-priced client reports.
          </motion.p>
          <motion.p custom={3} variants={line} className="mt-3 text-[15px] text-plum-2">
            Built for web agencies, marketing agencies, WordPress maintenance providers, and freelancers.
          </motion.p>
          <motion.div custom={4} variants={line} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
            <CtaPrimaryLink
              className="rounded-full bg-plum px-6 py-3 text-[16px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg sm:px-7 sm:py-3.5 sm:text-[17px]"
              guestLabel="Start monitoring free"
            />
            <a href="#how" className="group link-underline text-[15px] text-plum sm:text-[17px]">
              See an incident workflow{" "}
              <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.p custom={5} variants={line} className="mt-5 max-w-sm text-sm leading-relaxed text-plum-2">
            Add a website and get your first useful result within minutes — no code required.
          </motion.p>
        </motion.div>

        {!reduce && (
          <motion.div
            aria-hidden
            className="mt-10 flex justify-center sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <a
              href="#platform"
              className="group flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-plum/45 transition hover:text-magenta"
            >
              Scroll
              <span className="relative h-8 w-5 rounded-full ring-1 ring-plum/20">
                <motion.span
                  className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-magenta"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
