import Link from "next/link";

/** Renders text with markdown-style [label](/path) links (internal or http). */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!m) return <span key={i}>{part}</span>;
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
