"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Subtle scale/lift as the product showcase enters the viewport. */
export function ScrollStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], reduce ? [1, 1, 1] : [0.45, 0.9, 1]);

  return (
    <motion.div ref={ref} style={{ scale, y, opacity }} className="will-change-transform">
      {children}
    </motion.div>
  );
}
