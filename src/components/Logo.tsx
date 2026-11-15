import Image from "next/image";
import Link from "next/link";

/** Radar mark — one desk watching many sites. */
export function LogoMark({ light = false, className = "h-7 w-7" }: { light?: boolean; className?: string }) {
  const ink = light ? "#faf6ed" : "#4b2440";
  const accent = light ? "#f8e8f1" : "#9b1b67";
  const sky = light ? "#8fd3f4" : "#8fd3f4";
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <path
        d="M18 3a15 15 0 0 1 15 15"
        fill="none"
        stroke={ink}
        strokeWidth="2.35"
        strokeLinecap="round"
      />
      <path
        d="M18 7.6a10.4 10.4 0 0 1 10.4 10.4"
        fill="none"
        stroke={ink}
        strokeWidth="2.35"
        strokeLinecap="round"
      />
      <path
        d="M18 12.4a5.6 5.6 0 0 1 5.6 5.6"
        fill="none"
        stroke={ink}
        strokeWidth="2.35"
        strokeLinecap="round"
      />
      <path
        d="M25.4 29.6a15 15 0 0 1-11.7 3.3"
        fill="none"
        stroke={ink}
        strokeWidth="2.35"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="18" cy="3" r="2.1" fill={accent} />
      <circle cx="33" cy="18" r="2.1" fill={accent} />
      <circle cx="27.2" cy="30.2" r="2.1" fill={sky} />
      <circle cx="18" cy="18" r="3.25" fill={ink} />
    </svg>
  );
}

/** Raster mark (transparent PNG) — emails / places that need a bitmap. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/brand/watchfront-logo-mark.png"
      alt=""
      width={72}
      height={72}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function Logo({
  href = "/",
  light = false,
  size = "md",
}: {
  href?: string;
  light?: boolean;
  size?: "md" | "lg";
}) {
  const markClass = size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : "h-7 w-7 sm:h-8 sm:w-8";
  const textClass =
    size === "lg"
      ? "font-brand text-[22px] font-extrabold leading-none tracking-[-0.04em] sm:text-[24px]"
      : "font-brand text-[19px] font-extrabold leading-none tracking-[-0.03em] sm:text-[21px]";

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 sm:gap-3 ${light ? "text-cream" : "text-plum"}`}
    >
      <LogoMark light={light} className={markClass} />
      <span className={textClass}>Watchfront</span>
    </Link>
  );
}
