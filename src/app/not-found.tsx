import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/Site";
import { FEATURES } from "@/lib/marketing";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-mono text-sm text-magenta">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">This page is down. Ironic, we know.</h1>
        <p className="mt-4 text-lg text-plum-2">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-plum px-6 py-3 font-medium text-cream hover:bg-ink">Go to the homepage</Link>
          <Link href="/features" className="rounded-full px-6 py-3 font-medium text-plum ring-1 ring-plum/20 hover:bg-cream">Browse features</Link>
        </div>
        <div className="mt-14 grid gap-2 text-left sm:grid-cols-2">
          {FEATURES.slice(0, 4).map((f) => (
            <Link key={f.slug} href={`/features/${f.slug}`} className="rounded-2xl bg-cream p-4 hover:ring-1 hover:ring-magenta/30">
              <div className="font-medium text-ink">{f.name}</div><div className="text-sm text-plum-2">{f.short}</div>
            </Link>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
