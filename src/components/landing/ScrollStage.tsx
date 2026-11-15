"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** 3D settle as product showcase enters — perspective + depth. */
export function ScrollStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], reduce ? [1, 1, 1] : [0.2, 0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [12, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [-4, 0, 0]);

  return (
    <div ref={ref} style={{ perspective: reduce ? undefined : 1600 }}>
      <motion.div
        style={
          reduce
            ? undefined
            : {
                scale,
                y,
                opacity,
                rotateX,
                rotateY,
                transformPerspective: 1600,
                transformOrigin: "center bottom",
              }
        }
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
