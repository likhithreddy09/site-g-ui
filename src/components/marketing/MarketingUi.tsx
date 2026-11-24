"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { useLiteMotion } from "@/lib/motion";
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
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 text-[13px] text-plum-2">
        {items.map(([name, path], i) => (
          <span key={path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-plum/30" />}
            {i < items.length - 1 ? (
              <Link href={path} className="transition hover:text-magenta">
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

/** Shared section title — mono eyebrow, tight title, short support line. */
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
      {eyebrow ? (
        <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${dark ? "text-cream/45" : "text-mauve"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`max-w-xl text-balance text-2xl font-medium leading-[1.12] tracking-tight sm:text-3xl ${
          eyebrow ? "mt-3" : ""
        } ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 max-w-xl text-pretty text-[15px] leading-relaxed sm:text-base ${dark ? "text-cream/70" : "text-plum-2"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Consistent page section shell. */
export function PageSection({
  children,
  className = "",
  narrow = false,
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  id?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={`mx-auto mt-16 px-5 sm:mt-20 sm:px-6 ${narrow ? "max-w-3xl" : "max-w-6xl"} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Shared subpage hero — one composition, strong type, soft motion. */
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
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const light = !!reduce || lite;

  return (
    <section className="relative overflow-x-clip border-b border-plum/8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(155,27,103,0.1),transparent_42%),radial-gradient(ellipse_at_88%_10%,rgba(143,211,244,0.14),transparent_40%),linear-gradient(180deg,#faf6ed_0%,#f3ecdc_100%)]"
      />
      {!light ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-8 h-52 w-52 rounded-full bg-magenta/10 blur-3xl"
            animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-10 top-24 h-60 w-60 rounded-full bg-sky/20 blur-3xl"
            animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div
          className={
            image
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14"
              : undefined
          }
        >
          <motion.div
            className="min-w-0"
            initial={light ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: light ? 0.35 : 0.8, ease: EASE }}
          >
            {eyebrow ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-magenta sm:text-[12px]">{eyebrow}</p>
            ) : null}
            <h1 className="mt-3 max-w-3xl text-balance text-[clamp(1.85rem,4.6vw,3.15rem)] font-medium leading-[1.08] tracking-[-0.035em] text-ink">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-plum-2 sm:text-base">{intro}</p>
            {children ? <div className="mt-7 flex flex-col gap-5">{children}</div> : null}
          </motion.div>

          {image ? (
            <motion.div
              className="relative min-w-0 lg:justify-self-end lg:w-full"
              initial={light ? false : { y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: light ? 0.35 : 0.9, delay: light ? 0 : 0.08, ease: EASE }}
            >
              <MediaFrame
                src={image.src}
                alt={image.alt}
                priority
                fit="contain"
                aspect="aspect-[16/11] sm:aspect-[5/4]"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </motion.div>
          ) : null}
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
    <Reveal as="section" className="mx-auto mt-14 max-w-6xl px-5 sm:mt-16 sm:px-6" variant="scale">
      <figure className="min-w-0">
        <MediaFrame
          src={src}
          alt={alt}
          fit="contain"
          parallax
          aspect="aspect-[16/9] min-h-[11rem] sm:min-h-[14rem]"
          sizes="(max-width: 1152px) 100vw, 1152px"
        />
        {caption ? (
          <figcaption className={`mt-3 px-1 text-[14px] leading-relaxed ${dark ? "text-cream/65" : "text-plum-2"}`}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Reveal>
  );
}

/** Editorial list row for hubs and related links. */
export function LinkRow({
  href,
  index,
  kicker,
  title,
  body,
  meta = "Learn more",
  icon,
}: {
  href: string;
  index?: string;
  kicker?: string;
  title: string;
  body?: string;
  meta?: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-3 py-6 transition sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:py-7"
    >
      {icon ? (
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sky transition duration-300 group-hover:bg-plum">
          {icon}
        </span>
      ) : index ? (
        <span className="font-mono text-sm text-mauve sm:pt-1">{index}</span>
      ) : (
        <span className="hidden sm:block" />
      )}
      <div className="min-w-0">
        {kicker ? <p className="text-[13px] font-medium text-magenta">{kicker}</p> : null}
        <h2 className={`text-lg font-medium tracking-tight text-ink transition group-hover:text-magenta sm:text-xl ${kicker ? "mt-1" : ""}`}>
          {title}
        </h2>
        {body ? <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-plum-2 sm:text-[15px]">{body}</p> : null}
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm text-plum sm:pt-1">
        <span className="link-underline">{meta}</span>
        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <Reveal as="section" className="mx-auto mt-16 max-w-3xl px-5 sm:mt-20 sm:px-6" variant="up">
      <SectionHeader eyebrow="FAQ" id="faq" title={title} description="Straight answers — no sales fog." />
      <div className="mt-8 divide-y divide-plum/10 border-y border-plum/10">
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
  const lite = useLiteMotion();
  const light = !!reduce || lite;
  return (
    <Reveal as="section" className="mx-auto mt-16 max-w-6xl px-5 pb-4 sm:mt-24 sm:px-6" variant="scale">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-11 text-cream sm:rounded-[2rem] sm:px-10 sm:py-14 md:px-14">
        {!light ? (
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
        ) : null}
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">Start here</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-[15px] text-cream/70 md:text-base">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaPrimaryLink className="rounded-full bg-cream px-7 py-3.5 text-[15px] font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-sky" />
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
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <Stagger className={className} stagger={stagger}>
      {children}
    </Stagger>
  );
}

export function MotionTile({ children, className }: { children: ReactNode; className?: string }) {
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
  children: ReactNode;
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
