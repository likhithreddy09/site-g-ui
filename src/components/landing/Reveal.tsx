"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

/** Expo-out — Linear / Vercel style settle */
const EASE = [0.16, 1, 0.3, 1] as const;
const INSTANT = { duration: 0 };

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 22, transition: INSTANT },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -18, transition: INSTANT },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 18, transition: INSTANT },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97, y: 16, transition: INSTANT },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0, transition: INSTANT },
    show: { opacity: 1 },
  },
};

/**
 * Server HTML always renders content visible (crawlers, no-JS, fast LCP).
 * After hydration, only elements below the fold are hidden - before paint - and revealed on scroll.
 */
function useScrollReveal(once: boolean, margin: string, amount: number) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: margin as never, amount });
  const [belowFold, setBelowFold] = useState(false);
  useLayoutEffect(() => {
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    if (top > window.innerHeight) setBelowFold(true);
  }, []);
  return { ref, state: !belowFold || inView ? "show" : "hidden" };
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  variant = "up",
  once = true,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  variant?: keyof typeof variants;
  once?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, state } = useScrollReveal(once, "-12% 0px -8% 0px", 0.18);
  const MotionTag = motion[Tag];

  if (reduce) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref as never}
      id={id}
      className={className}
      variants={variants[variant]}
      initial={false}
      animate={state}
      transition={{ duration: 0.55, delay: delay * 0.7, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, state } = useScrollReveal(true, "-10% 0px -6% 0px", 0.12);
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref as never}
      className={className}
      initial={false}
      animate={state}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={variants[variant]} transition={{ duration: 0.5, ease: EASE }}>
      {children}
    </motion.div>
  );
}
