"use client";

import { useEffect, useState } from "react";

/**
 * Mobile / low-power motion budget.
 * Touch devices pay heavily for Lenis + filter:blur + 3D scroll + WebGL.
 */
export function useLiteMotion() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse), (hover: none)");
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return lite;
}
