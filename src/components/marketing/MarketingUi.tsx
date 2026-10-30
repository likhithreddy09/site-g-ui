"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { JsonLd } from "@/components/marketing/SiteJsonLd";
import type { Faq } from "@/lib/marketing";
import { breadcrumbLd } from "@/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Breadcrumbs({ items }: { items: [string, string][] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-plum-2">
        {items.map(([name, path], i) => (
          <span key={path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-plum/30" />}
            {i < items.length - 1 ? (
              <Link href={path} className="hover:text-magenta">
                {name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

/** Shared subpage hero - same atmosphere / motion language as the homepage. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  crumbs?: [string, string][];
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-magenta/10 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
            animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-gold/15 blur-3xl"
            animate={{ opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {eyebrow && <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-magenta">{eyebrow}</p>}
          <h1 className="mt-3 max-w-4xl text-[2rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-plum-2 sm:mt-5 sm:text-base md:text-lg">{intro}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <Reveal as="section" className="mx-auto mt-24 max-w-3xl px-6" variant="up">
      <div className="rounded-[2rem] bg-cream px-6 py-10 sm:px-10">
        <h2 id="faq" className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
        <div className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink md:text-lg [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-plum/50 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-plum-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function CtaBand({
  title = "Start with one website.",
  body = "Free for 3 websites. No credit card, nothing to install.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Reveal as="section" className="mx-auto mt-24 max-w-6xl px-6 pb-4" variant="scale">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-cream md:px-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-magenta/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky/25 blur-3xl" />
        <div className="pointer-events-none absolute left-8 top-8 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-[15px] text-cream/70 md:text-base">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaPrimaryLink className="rounded-full bg-cream px-7 py-3.5 text-[15px] font-medium text-ink transition hover:-translate-y-0.5 hover:bg-sky" />
            <Link
              href="/contact#book"
              className="rounded-full px-7 py-3.5 text-[15px] font-medium text-cream ring-1 ring-cream/30 transition hover:bg-white/10"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Staggered grid of marketing tiles - use on feature / use-case hubs. */
export function MotionGrid({
  children,
  className,
  stagger = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <Stagger className={className} stagger={stagger}>
      {children}
    </Stagger>
  );
}

export function MotionTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <StaggerItem className={className} variant="scale">
      {children}
    </StaggerItem>
  );
}

export function MotionSection({
  children,
  className,
  variant = "up",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale" | "fade";
  delay?: number;
  id?: string;
}) {
  return (
    <Reveal id={id} className={className} variant={variant} delay={delay}>
      {children}
    </Reveal>
  );
}
