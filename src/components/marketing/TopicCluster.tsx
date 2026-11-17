import Link from "next/link";
import type { TopicCluster as Cluster } from "@/lib/seoClusters";

/** On-page cluster navigation — pushes equity to the primary URL and clarifies intent. */
export function TopicClusterNav({
  cluster,
  currentPath,
}: {
  cluster: Cluster;
  currentPath: string;
}) {
  const primary = cluster.links.find((l) => l.role === "primary") ?? cluster.links[0];
  const others = cluster.links.filter((l) => l.href !== currentPath);

  return (
    <aside className="mx-auto mt-14 max-w-6xl px-6" aria-labelledby={`cluster-${cluster.id}`}>
      <div className="rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-plum/50">Topic cluster</p>
        <h2 id={`cluster-${cluster.id}`} className="mt-2 text-xl font-medium tracking-tight text-ink">
          {cluster.name}
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-plum-2">
          Primary page for this intent:{" "}
          {primary.href === currentPath ? (
            <span className="font-medium text-ink">{primary.label}</span>
          ) : (
            <Link href={primary.href} className="link-underline font-medium text-plum">
              {primary.label}
            </Link>
          )}
          . Supporting pages cover a narrower angle so they do not compete for the same query.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`inline-flex rounded-full px-3.5 py-1.5 text-[13px] ring-1 transition hover:bg-ink hover:text-cream hover:ring-ink ${
                  l.role === "primary"
                    ? "bg-ink text-cream ring-ink"
                    : l.role === "asset"
                      ? "bg-white text-plum ring-plum/15"
                      : "bg-cream text-plum ring-plum/20"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
