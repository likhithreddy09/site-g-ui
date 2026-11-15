"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useLiteMotion } from "@/lib/motion";

const OrbitalScene = dynamic(
  () => import("@/components/landing/OrbitalScene").then((m) => m.OrbitalScene),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full animate-pulse rounded-full bg-cream/5 ring-1 ring-cream/10" />
    ),
  },
);

function OrbitalFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[min(92vw,26rem)] ${className}`} aria-hidden>
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-magenta/50 via-plum to-ink ring-1 ring-cream/20" />
      <div className="absolute inset-[8%] rounded-full border border-gold/40" />
      <div className="absolute inset-[14%] rounded-full border border-sky/30" />
      <div className="absolute inset-[28%] rounded-full border border-cream/15" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream" />
      <div className="absolute bottom-2 left-1/2 h-2 w-[38%] -translate-x-1/2 rounded-full bg-ink/70 ring-1 ring-cream/10" />
    </div>
  );
}

/** Hero orbital — Three.js on desktop; CSS fallback on mobile to avoid lag. */
export function OrbitalSculpture({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();

  if (reduce || lite) {
    return <OrbitalFallback className={className} />;
  }

  return (
    <div className={`relative mx-auto w-full max-w-[min(92vw,28rem)] ${className}`} aria-hidden>
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(253,185,19,0.2),transparent_55%),radial-gradient(circle_at_60%_70%,rgba(155,27,103,0.28),transparent_60%)] blur-2xl" />
      <OrbitalScene className="relative z-10" />
      <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-2.5 w-[40%] -translate-x-1/2 rounded-full bg-gradient-to-b from-cream/20 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-2 w-[34%] -translate-x-1/2 rounded-[100%] bg-ink/80 ring-1 ring-cream/10" />
    </div>
  );
}
