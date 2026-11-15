import Link from "next/link";

/** Exact Watchfront signal: pulse polyline + green live beacon. */
const SIGNAL_POINTS = "14,28 32,72 50,44 68,72 80,43";
const BEACON = { cx: 86, cy: 28, r: 7 } as const;
const BEACON_COLOR = "#1D9E75";

export function LogoMark({ light = false, className = "h-7 w-7" }: { light?: boolean; className?: string }) {
  const stroke = light ? "#faf6ed" : "#4b2440";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none">
      <polyline
        points={SIGNAL_POINTS}
        stroke={stroke}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={BEACON.cx} cy={BEACON.cy} r={BEACON.r} fill={BEACON_COLOR} />
    </svg>
  );
}

/** App / favicon tile — plum square with cream signal. */
export function LogoTile({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="11" fill="#4b2440" />
      <g transform="translate(2.5 2.5) scale(0.43)">
        <polyline
          points={SIGNAL_POINTS}
          fill="none"
          stroke="#faf6ed"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={BEACON.cx} cy={BEACON.cy} r={BEACON.r} fill={BEACON_COLOR} />
      </g>
    </svg>
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
