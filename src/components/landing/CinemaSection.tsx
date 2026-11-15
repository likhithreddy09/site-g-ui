"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLiteMotion } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** 0–1.5 how strong the 3D settle feels (desktop only) */
  intensity?: number;
  as?: "section" | "div";
};

/**
 * Scroll-driven cinema stage.
 * Mobile: light opacity/y only — no blur, rotateX, or heavy will-change.
 */
export function CinemaSection({ children, className, id, intensity = 1, as = "section" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const light = !!reduce || lite;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const i = light ? Math.min(intensity, 0.45) : intensity;
  const y = useTransform(
    scrollYProgress,
    [0, 0.32, 0.7, 1],
    light ? [24 * i, 0, 0, -12 * i] : [72 * i, 0, 0, -36 * i],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    light ? [0.55, 1, 1, 0.95] : [0.15, 1, 1, 0.75],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.32, 0.85, 1],
    light ? [1, 1, 1, 1] : [0.9, 1, 1, 0.97],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    light ? [0, 0, 0] : [9 * i, 0, -2.5 * i],
  );

  const Tag = as === "div" ? motion.div : motion.section;

  if (reduce) {
    const Static = as === "div" ? "div" : "section";
    return (
      <Static id={id} className={className}>
        {children}
      </Static>
    );
  }

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={className}
      style={{ perspective: light ? undefined : 1400 }}
    >
      <motion.div
        style={
          light
            ? { y, opacity }
            : {
                y,
                opacity,
                scale,
                rotateX,
                transformPerspective: 1400,
                transformOrigin: "center top",
              }
        }
        className={light ? undefined : "will-change-transform"}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
