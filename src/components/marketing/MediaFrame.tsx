"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  className?: string;
  /** Soft ken-burns drift while in view */
  drift?: boolean;
  /** Parallax scale on scroll */
  parallax?: boolean;
};

/**
 * Premium media treatment used on modern AI/SaaS marketing pages:
 * soft glow, clip reveal, optional slow drift — never a naked img in a box.
 */
export function MediaFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 520px",
  aspect = "aspect-[4/3] sm:aspect-[16/11]",
  className = "",
  drift = true,
  parallax = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce || !parallax ? [0, 0] : [-18, 18]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce || !parallax ? [1, 1, 1] : [1.08, 1, 1.06]);

  return (
    <motion.div
      ref={ref}
      className={`group relative ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.95, ease: EASE }}
    >
      {/* Soft brand glow behind the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(143,211,244,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(155,27,103,0.18),transparent_50%)] blur-2xl transition-opacity duration-700 group-hover:opacity-100"
      />

      <div
        className={`relative overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_32px_80px_-36px_rgba(28,15,24,0.5)] ring-1 ring-plum/10 ${aspect}`}
      >
        <motion.div style={{ y: parallax ? y : undefined }} className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={parallax ? { scale: imgScale } : undefined}
            animate={
              !reduce && drift && !parallax
                ? { scale: [1, 1.04, 1], x: [0, -6, 0], y: [0, 4, 0] }
                : undefined
            }
            transition={
              !reduce && drift && !parallax
                ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </motion.div>

        {/* Edge vignette + top sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,15,24,0.08)_0%,transparent_28%,transparent_72%,rgba(28,15,24,0.18)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/25 to-transparent"
        />
      </div>
    </motion.div>
  );
}
