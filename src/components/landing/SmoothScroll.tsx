"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useLiteMotion } from "@/lib/motion";

/** Desktop-only smooth wheel — skip on touch to avoid mobile scroll lag. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();

  useEffect(() => {
    if (reduce || lite) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Never smooth touch — native scroll is faster on phones
      syncTouch: false,
      touchMultiplier: 1,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce, lite]);

  return <>{children}</>;
}
