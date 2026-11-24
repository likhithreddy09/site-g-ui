import Link from "next/link";
import type { ReactNode } from "react";

/** Inline **bold** segments. */
function withBold(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*([^*]+)\*\*$/.exec(part);
    if (m) return <strong key={`${keyPrefix}-b${i}`} className="font-medium text-ink">{m[1]}</strong>;
    return <span key={`${keyPrefix}-t${i}`}>{part}</span>;
  });
}

/** Renders text with markdown-style [label](/path) links and **bold**. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!m) return <span key={i}>{withBold(part, String(i))}</span>;
        const [, label, href] = m;
        if (href.startsWith("/")) {
          return (
            <Link key={i} href={href} className="link-underline text-plum">
              {label}
            </Link>
          );
        }
        return (
          <a key={i} href={href} className="link-underline text-plum" rel="noopener noreferrer" target="_blank">
            {label}
          </a>
        );
      })}
    </span>
  );
}
