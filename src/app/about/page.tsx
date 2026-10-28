import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { organizationLd, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "About SiteGuard — Why We Build Website Monitoring for Agencies",
  description: "SiteGuard helps agencies find out about broken client websites before their clients do — with honest checks, real evidence and reports anyone can read.",
  path: "/about",
});

const PRINCIPLES = [
  ["Evidence over alarms", "Every alert carries what we actually saw — a screenshot, a status code, a console error — so nobody has to guess."],
  ["Honest about uncertainty", "If we can't verify something, we say “unknown” instead of guessing. AI explanations keep observations and hypotheses apart."],
  ["Built for non-developers too", "Account managers and site owners should be able to set up a check and understand a result without reading code."],
  ["Safe on live websites", "Tests block payments by default, mark their traffic clearly and never change anything on a production site."],
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: abs("/about"), mainEntity: organizationLd }} />
      <PageHero
        crumbs={[["Home", "/"], ["About", "/about"]]}
        eyebrow="About us"
        title="Clients shouldn't be your monitoring system."
        intro="Most agencies find out a site is broken when a client emails to ask why the leads stopped. We built SiteGuard so your team is always the first to know — and knows why."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed text-plum-2">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Why SiteGuard exists</h2>
          <p>An uptime monitor tells you a server answered. It doesn&apos;t tell you the contact form stopped sending, a plugin update broke the checkout, or the hero image disappeared on mobile.</p>
          <p>Agencies managing dozens of client websites end up checking them by hand — or not at all. SiteGuard does that routine checking automatically, then packages what it found into incidents your developers can act on and reports your clients can read.</p>
        </div>
        <div className="rounded-[2rem] bg-cream p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">What we believe</h2>
          <dl className="mt-6 space-y-5">
            {PRINCIPLES.map(([t, d]) => (
              <div key={t}><dt className="font-semibold text-ink">{t}</dt><dd className="mt-1 text-[15px] leading-relaxed text-plum-2">{d}</dd></div>
            ))}
          </dl>
        </div>
      </section>
      <CtaBand title="See it on your own portfolio." />
    </MarketingShell>
  );
}
