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
  drift?: boolean;
  parallax?: boolean;
  /** Illustrations with cream margins should contain, not crop */
  fit?: "cover" | "contain";
  flush?: boolean;
};

/** Sharp marketing media — contain by default so illustrations aren’t crushed. */
export function MediaFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 560px",
  aspect = "aspect-[4/3] sm:aspect-[5/4]",
  className = "",
  drift = false,
  parallax = false,
  fit = "contain",
  flush = false,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce || !parallax ? [0, 0] : [-12, 12]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce || !parallax ? [1, 1, 1] : [1.04, 1, 1.03]);

  return (
    <motion.div
      ref={ref}
      className={`group relative min-w-0 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {!flush && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(143,211,244,0.2),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(155,27,103,0.1),transparent_50%)] blur-xl"
        />
      )}

      <div
        className={`relative overflow-hidden ${aspect} ${
          flush
            ? "rounded-none bg-cream-2"
            : "rounded-2xl bg-cream-2 ring-1 ring-plum/10 sm:rounded-[1.35rem]"
        }`}
      >
        <motion.div style={{ y: parallax ? y : undefined }} className="absolute inset-0">
          <motion.div
            className={`absolute inset-0 ${fit === "contain" ? "p-3 sm:p-5" : ""}`}
            style={parallax ? { scale: imgScale } : undefined}
            animate={!reduce && drift && !parallax ? { scale: [1, 1.02, 1] } : undefined}
            transition={!reduce && drift && !parallax ? { duration: 20, repeat: Infinity, ease: "easeInOut" } : undefined}
          >
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                quality={90}
                sizes={sizes}
                className={fit === "contain" ? "object-contain object-center" : "object-cover object-center"}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
