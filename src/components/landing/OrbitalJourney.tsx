"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { OrbitalSculpture } from "@/components/landing/OrbitalSculpture";
import { useLiteMotion } from "@/lib/motion";

const COUNT = 7;

type Line = { text: string; italic?: boolean };

const CHAPTERS: {
  id: string;
  kicker: string;
  aside?: string;
  lines: Line[];
  note?: string;
  href?: string;
  hrefLabel?: string;
  fig?: string;
}[] = [
  {
    id: "open",
    kicker: "Website monitoring for agencies in India",
    lines: [
      { text: "Make room" },
      { text: "for" },
      { text: "certainty.", italic: true },
    ],
    note: "Uptime, SSL, forms, and visitor errors — with evidence you can send before the client asks.",
  },
  {
    id: "signal",
    kicker: "01  /  The signal",
    aside: "From a quiet failure, into a confirmed one.",
    lines: [
      { text: "Every missed" },
      { text: "lead" },
      { text: "starts quiet.", italic: true },
    ],
    note: "A form that never thanks the visitor. A certificate that expires on Friday.",
  },
  {
    id: "picture",
    kicker: "02  /  A clearer picture",
    aside: "Beyond the status page.",
    lines: [
      { text: "Confirmed." },
      { text: "Evidenced.", italic: true },
      { text: "Already known." },
    ],
    note: "Outage, screenshot, and the note your client reads before they write in.",
  },
  {
    id: "uptime",
    kicker: "03  /  What we watch",
    aside: "01  —  03",
    lines: [
      { text: "Uptime," },
      { text: "confirmed", italic: true },
      { text: "twice." },
    ],
    note: "Website uptime monitoring with one-minute checks. A second pass before the alert leaves the building.",
    href: "/uptime-monitoring-tool",
    hrefLabel: "See uptime monitoring",
    fig: "Fig. 01  —  Response  /  one minute",
  },
  {
    id: "forms",
    kicker: "03  /  What we watch",
    aside: "02  —  03",
    lines: [
      { text: "Forms," },
      { text: "proved", italic: true },
      { text: "in a browser." },
    ],
    note: "Contact form monitoring with a real browser submit — the thank-you page, or the exact step that failed.",
    href: "/contact-form-monitoring",
    hrefLabel: "See form monitoring",
    fig: "Fig. 02  —  Journey  /  contact form",
  },
  {
    id: "method",
    kicker: "04  /  The method",
    aside: "A morning screen. A quieter night.",
    lines: [
      { text: "See it." },
      { text: "Test it.", italic: true },
      { text: "Show it." },
    ],
    note: "Portfolio monitoring, scheduled journeys, and a client uptime report they can actually read.",
    href: "/website-monitoring",
    hrefLabel: "Explore website monitoring",
  },
  {
    id: "start",
    kicker: "05  /  Start here",
    aside: "One site is enough.",
    lines: [
      { text: "Watch it" },
      { text: "before" },
      { text: "they call.", italic: true },
    ],
    note: "Start website monitoring free — uptime, SSL, forms, and proof in one place.",
  },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

function smoothstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function fade(progress: number, index: number) {
  const span = 1 / COUNT;
  const start = index * span;
  const end = start + span;
  const feather = span * 0.5;
  const fadeIn = index === 0 ? 1 : smoothstep((progress - (start - feather)) / feather);
  const fadeOut = index === COUNT - 1 ? 1 : smoothstep((end + feather * 0.08 - progress) / feather);
  return Math.min(fadeIn, fadeOut);
}

function Word({
  progress,
  chapter,
  index,
  total,
  italic,
  children,
  live,
}: {
  progress: MotionValue<number>;
  chapter: number;
  index: number;
  total: number;
  italic?: boolean;
  children: string;
  live: boolean;
}) {
  const revealed = (v: number) => {
    if (!live) return 1;
    const span = 1 / COUNT;
    const origin = chapter === 0 ? -span * 0.55 : chapter * span;
    const local = clamp((v - origin) / (span * 0.42), 0, 1);
    const start = (index / Math.max(total, 1)) * 0.34;
    const u = clamp((local - start) / 0.22, 0, 1);
    return 1 - (1 - u) ** 3;
  };
  const opacity = useTransform(progress, (v) => revealed(v));
  const y = useTransform(progress, (v) => (live ? (1 - revealed(v)) * 14 : 0));

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ${italic ? "font-serif font-normal italic tracking-[-0.03em] text-[#e4d4f2]" : ""}`}
    >
      {children}
    </motion.span>
  );
}

function ChapterPane({
  index,
  progress,
  active,
  live,
}: {
  index: number;
  progress: MotionValue<number>;
  active: number;
  live: boolean;
}) {
  const chapter = CHAPTERS[index];
  const opacity = useTransform(progress, (v) => (live ? fade(v, index) : 1));
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute inset-0 z-10 ${active === index ? "" : "pointer-events-none"}`}
      aria-hidden={active !== index}
      inert={active === index ? undefined : true}
    >
      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 px-5 pt-[4.5rem] min-[400px]:pt-20 sm:px-8 sm:pt-24 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-6 md:pt-16 lg:gap-10 lg:pt-20">
        <div className="flex flex-col justify-center gap-4 pb-[calc(28vh+4.25rem)] md:pb-20 lg:pb-24">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55 sm:text-[11px] sm:tracking-[0.22em]">{chapter.kicker}</p>
              {chapter.aside ? (
                <p className="hidden max-w-[12rem] text-right font-mono text-[10px] uppercase tracking-[0.16em] text-cream/40 md:block">
                  {chapter.aside}
                </p>
              ) : null}
            </div>
            <Heading className="mt-3 max-w-[14ch] text-[clamp(2rem,7.5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.045em] text-cream sm:mt-5 sm:text-[clamp(2.8rem,4.8vw,4.85rem)] sm:leading-[0.92]">
              {chapter.lines.map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-[0.08em]">
                  <Word progress={progress} chapter={index} index={i} total={chapter.lines.length} italic={line.italic} live={live}>
                    {line.text}
                  </Word>
                </span>
              ))}
            </Heading>
            {index === 0 ? (
              <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-7 sm:gap-6">
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
                <Link href="#platform" className="text-[14px] text-cream/55 transition hover:text-cream">
                  See the checks
                </Link>
              </div>
            ) : null}
            {chapter.href ? (
              <Link href={chapter.href} className="mt-5 inline-flex items-center gap-2 text-[15px] text-cream/80 transition hover:text-cream sm:mt-7">
                <span className="link-underline">{chapter.hrefLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
            {index === COUNT - 1 ? (
              <div className="mt-5 sm:mt-7">
                <CtaPrimaryLink
                  className="inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3 text-[15px] font-medium text-ink transition hover:bg-sky"
                  guestLabel="Start monitoring free"
                  signedInLabel="Open dashboard"
                />
              </div>
            ) : null}
          </div>
          <div className="hidden max-w-md md:block [@media(max-height:640px)]:hidden">
            {chapter.note ? <p className="text-sm leading-relaxed text-cream/70 sm:text-[15px]">{chapter.note}</p> : null}
            {chapter.fig ? (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/40 sm:mt-5">{chapter.fig}</p>
            ) : null}
          </div>
        </div>
        {/* right column reserved for sculpture on md+; empty spacer keeps grid balance */}
        <div className="hidden md:block" aria-hidden />
      </div>
    </motion.div>
  );
}

export function OrbitalJourney() {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const light = !!reduce || lite;
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = clamp(Math.min(COUNT - 1, Math.floor(v * COUNT)), 0, COUNT - 1);
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = (
    <div
      className="relative h-[100svh] overflow-hidden bg-ink text-cream"
      onPointerMove={(e) => {
        if (light) return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_55%,rgba(155,27,103,0.28),transparent_52%),radial-gradient(ellipse_at_20%_0%,rgba(143,211,244,0.08),transparent_42%),linear-gradient(180deg,#140910_0%,#1c0f18_55%,#120a10_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-1 px-5 sm:px-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-6 lg:gap-10">
          <div className="hidden md:block" />
          <div className="flex items-end justify-center pb-[3.1rem] md:items-center md:pb-8 md:pt-10">
            <div className="relative aspect-square w-[min(70vw,16.5rem)] md:w-full md:max-w-[min(100%,30rem)]">
              <OrbitalSculpture stage pointerRef={pointer} />
            </div>
          </div>
        </div>
      </div>

      {CHAPTERS.map((chapter, index) => (
        <ChapterPane key={chapter.id} index={index} progress={scrollYProgress} active={active} live />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-4">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45 sm:tracking-[0.2em]">Signal 001</p>
        <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/40 sm:inline-flex">
          Scroll to discover
          <ChevronDown className="h-3.5 w-3.5 motion-safe:animate-bounce" />
        </p>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45 sm:tracking-[0.18em]">
          {String(active + 1).padStart(2, "0")}
          <span className="text-cream/30">  —  {String(COUNT).padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );

  if (reduce) {
    return (
      <section className="bg-ink text-cream">
        {CHAPTERS.map((chapter, index) => (
          <div key={chapter.id} className="relative min-h-[70svh] border-t border-cream/10 first:border-t-0">
            {index === 0 ? <OrbitalSculpture stage /> : null}
            <ChapterPane index={index} progress={scrollYProgress} active={index} live={false} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative -mt-14 h-[460svh] bg-ink sm:-mt-16 sm:h-[520svh] lg:h-[600svh]" aria-label="Watchfront, section by section">
      <div className="sticky top-0 h-[100svh]">{stage}</div>
    </section>
  );
}
