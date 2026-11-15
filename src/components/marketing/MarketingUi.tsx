"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { MediaFrame } from "@/components/marketing/MediaFrame";
import { JsonLd } from "@/components/marketing/SiteJsonLd";
import type { Faq } from "@/lib/marketing";
import { breadcrumbLd } from "@/lib/seo";

export type HeroImage = { src: string; alt: string };

const EASE = [0.16, 1, 0.3, 1] as const;

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

/**
 * Shared section title block — titles ≤2 lines, descriptions 2–3 lines.
 * Use on every marketing content section for consistent structure.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`text-[13px] font-medium uppercase tracking-[0.14em] ${dark ? "text-sky" : "text-magenta"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`max-w-xl text-balance text-2xl font-medium leading-[1.15] tracking-tight sm:text-3xl ${
          eyebrow ? "mt-3" : ""
        } ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-xl text-pretty text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-cream/70" : "text-plum-2"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Shared subpage hero — clean, responsive, no overflow. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  crumbs?: [string, string][];
  image?: HeroImage;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip">
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-magenta/8 blur-3xl"
            animate={{ x: [0, 14, 0], y: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-sky/15 blur-3xl"
            animate={{ x: [0, -12, 0], y: [0, 14, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div
          className={
            image
              ? "grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12"
              : undefined
          }
        >
          <motion.div
            className="min-w-0"
            initial={reduce ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            {eyebrow && (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-magenta sm:text-[12px]">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 max-w-2xl text-balance text-[1.75rem] font-medium leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-plum-2 sm:text-base">
              {intro}
            </p>
            {children}
          </motion.div>

          {image && (
            <div className="relative min-w-0 lg:justify-self-end lg:w-full">
              <MediaFrame
                src={image.src}
                alt={image.alt}
                priority
                fit="contain"
                aspect="aspect-[16/11] sm:aspect-[5/4]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Mid-page visual — 16:9 contain so illustrations stay sharp and whole. */
export function VisualBand({
  src,
  alt,
  caption,
  dark = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  dark?: boolean;
}) {
  return (
    <Reveal as="section" className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-6" variant="scale">
      <figure className="min-w-0">
        <MediaFrame
          src={src}
          alt={alt}
          fit="contain"
          parallax
          aspect="aspect-[16/9] min-h-[11rem] sm:min-h-[14rem]"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
        {caption && (
          <figcaption
            className={`mt-3 px-1 text-[14px] leading-relaxed ${dark ? "text-cream/65" : "text-plum-2"}`}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <Reveal as="section" className="mx-auto mt-16 max-w-3xl px-5 sm:mt-20 sm:px-6" variant="up">
      <SectionHeader id="faq" title={title} description="Straight answers — no sales fog." />
      <div className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-ink sm:text-lg [&::-webkit-details-marker]:hidden">
              <h3 className="min-w-0 text-left leading-snug">{f.q}</h3>
              <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-plum/50 transition duration-300 group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-plum-2">{f.a}</p>
          </details>
        ))}
      </div>
    </Reveal>
  );
}

export function CtaBand({
  title = "Start with one website.",
  body = "Free for 3 days. No credit card, nothing to install.",
}: {
  title?: string;
  body?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal as="section" className="mx-auto mt-16 max-w-6xl px-5 pb-4 sm:mt-20 sm:px-6" variant="scale">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-ink px-6 py-10 text-cream sm:rounded-[2rem] sm:px-10 sm:py-14 md:px-14">
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-magenta/45 blur-3xl"
              animate={{ x: [0, -12, 0], y: [0, 16, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky/25 blur-3xl"
              animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        <div className="pointer-events-none absolute left-8 top-8 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-[15px] text-cream/70 md:text-base">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaPrimaryLink className="rounded-full bg-cream px-7 py-3.5 text-[15px] font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-sky hover:shadow-[0_12px_40px_-12px_rgba(143,211,244,0.55)]" />
            <Link
              href="/contact#book"
              className="rounded-full px-7 py-3.5 text-[15px] font-medium text-cream ring-1 ring-cream/30 transition duration-300 hover:bg-white/10"
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
