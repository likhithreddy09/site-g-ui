"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-magenta via-gold to-sky"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
