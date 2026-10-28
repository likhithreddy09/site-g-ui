import Link from "next/link";

export function Logo({ href = "/", light = false }: { href?: string; light?: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-2 text-[26px] font-semibold tracking-tight ${light ? "text-cream" : "text-plum"}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <path d="M16 2.5 4.5 7v8.2c0 7 4.9 12.6 11.5 14.3 6.6-1.7 11.5-7.3 11.5-14.3V7L16 2.5Z" fill={light ? "#faf6ed" : "#4b2440"} />
        <path d="M9.5 16.5h3.2l2-4.5 3 8 2-3.5h2.8" fill="none" stroke="#8fd3f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      siteguard
    </Link>
  );
}
