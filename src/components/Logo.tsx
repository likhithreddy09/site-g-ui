import Link from "next/link";

/** Radar mark - one desk watching many sites. */
export function LogoMark({ light = false, className = "h-7 w-7" }: { light?: boolean; className?: string }) {
  const ink = light ? "#faf6ed" : "#4b2440";
  const accent = light ? "#f8e8f1" : "#9b1b67";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M16 5.5a10.5 10.5 0 0 1 10.5 10.5"
        fill="none"
        stroke={ink}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 8.75a7.25 7.25 0 0 1 7.25 7.25"
        fill="none"
        stroke={ink}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 12a4 4 0 0 1 4 4"
        fill="none"
        stroke={ink}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M20.5 23.2a10.5 10.5 0 0 1-8.2 2.3"
        fill="none"
        stroke={ink}
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="16" cy="5.5" r="1.55" fill={accent} />
      <circle cx="26.5" cy="16" r="1.55" fill={accent} />
      <circle cx="22.4" cy="24.1" r="1.55" fill={accent} />
      <circle cx="16" cy="16" r="2.35" fill={ink} />
    </svg>
  );
}

export function Logo({ href = "/", light = false }: { href?: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 ${light ? "text-cream" : "text-plum"}`}
    >
      <LogoMark light={light} />
      <span className="text-[21px] font-medium leading-none tracking-[-0.02em]">
        Watchfront
      </span>
    </Link>
  );
}
