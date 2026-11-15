"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** 0–1.5 how strong the 3D settle feels */
  intensity?: number;
  as?: "section" | "div";
};

/**
 * Scroll-driven cinema stage: perspective settle, parallax, soft fade —
 * the “Three.js landing” feel without a canvas on every block.
 */
export function CinemaSection({ children, className, id, intensity = 1, as = "section" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const i = intensity;
  const y = useTransform(scrollYProgress, [0, 0.32, 0.7, 1], reduce ? [0, 0, 0, 0] : [72 * i, 0, 0, -36 * i]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], reduce ? [1, 1, 1, 1] : [0.15, 1, 1, 0.75]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.85, 1], reduce ? [1, 1, 1, 1] : [0.9, 1, 1, 0.97]);
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 1], reduce ? [0, 0, 0] : [9 * i, 0, -2.5 * i]);
  const blur = useTransform(scrollYProgress, [0, 0.28, 0.75, 1], reduce ? [0, 0, 0, 0] : [6 * i, 0, 0, 2 * i]);
  const filter = useTransform(blur, (b) => (b < 0.15 ? "none" : `blur(${b}px)`));

  const Tag = as === "div" ? motion.div : motion.section;

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={className}
      style={{ perspective: reduce ? undefined : 1400 }}
    >
      <motion.div
        style={
          reduce
            ? undefined
            : {
                y,
                opacity,
                scale,
                rotateX,
                filter,
                transformPerspective: 1400,
                transformOrigin: "center top",
              }
        }
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </Tag>
  );
}
