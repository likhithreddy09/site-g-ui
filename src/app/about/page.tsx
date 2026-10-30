import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
import { organizationLd, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Watchfront",
  description: "Watchfront is website monitoring for Indian agencies. We help you spot broken client sites before clients do - with clear evidence, not noise.",
  path: "/about",
  keywords: ["about Watchfront", "Watchfront India", "website monitoring company"],
  ogTitle: "About Watchfront",
  ogDescription: "We build website monitoring for Indian agencies who manage many client sites.",
});

const PRINCIPLES = [
  ["Evidence over alarms", "Every alert carries what we actually saw - a screenshot, a status code, a console error - so nobody has to guess."],
  ["Honest about uncertainty", "If we can't verify something, we say “unknown” instead of guessing. AI explanations keep observations and hypotheses apart."],
  ["Built for non-developers too", "Account managers and site owners should be able to set up a check and understand a result without reading code."],
  ["Safe on live websites", "Tests block payments by default, mark their traffic clearly and never change anything on a production site."],
];

const SERVICES = [
  "Uptime, SSL and domain expiry monitoring",
  "Content, visual and broken-link checks",
  "Form and user-journey browser tests",
  "API and JavaScript error monitoring",
  "Incident alerts by email (WhatsApp coming soon) and client-ready reports",
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: abs("/about"), mainEntity: organizationLd }} />
      <PageHero
        crumbs={[["Home", "/"], ["About", "/about"]]}
        eyebrow="About us"
        title="Clients shouldn't be your monitoring system."
        intro="Most agencies find out a site is broken when a client emails to ask why the leads stopped. We built Watchfront so your team is always the first to know - and knows why."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2" stagger={0.1}>
        <MotionTile>
          <div className="h-full space-y-4 rounded-[2rem] bg-ink p-8 text-cream md:p-10">
            <h2 className="text-2xl font-medium tracking-tight">Why Watchfront exists</h2>
            <p className="text-[15px] leading-relaxed text-cream/75">An uptime monitor tells you a server answered. It doesn&apos;t tell you the contact form stopped sending, a plugin update broke the checkout, or the hero image disappeared on mobile.</p>
            <p className="text-[15px] leading-relaxed text-cream/75">Agencies managing dozens of client websites end up checking them by hand - or not at all. Watchfront does that routine checking automatically, then packages what it found into incidents your developers can act on and reports your clients can read.</p>
          </div>
        </MotionTile>
        <MotionTile>
          <div className="h-full rounded-[2rem] bg-cream p-8 ring-1 ring-plum/8 md:p-10">
            <h2 className="text-2xl font-medium tracking-tight text-ink">What we believe</h2>
            <dl className="mt-6 space-y-5">
              {PRINCIPLES.map(([t, d]) => (
                <div key={t}><dt className="font-medium text-ink">{t}</dt><dd className="mt-1 text-[15px] leading-relaxed text-plum-2">{d}</dd></div>
              ))}
            </dl>
          </div>
        </MotionTile>
      </MotionGrid>

      <MotionSection className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-8 rounded-[2rem] bg-cream p-8 ring-1 ring-plum/8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl">Products &amp; services</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-plum-2">
              We sell digital SaaS subscriptions for website monitoring and automated QA. Pricing is published in INR on our{" "}
              <Link href="/pricing" className="link-underline text-plum">pricing page</Link>.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] text-plum-2">
              {SERVICES.map((s) => <li key={s} className="flex gap-2"><span className="text-magenta">•</span>{s}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl">Registered business</h2>
            <dl className="mt-4 space-y-3 text-[15px] text-plum-2">
              <div><dt className="font-medium text-ink">Legal name</dt><dd>{SITE.legalName}</dd></div>
              <div><dt className="font-medium text-ink">Brand</dt><dd>{SITE.tradingAs && SITE.tradingAs !== SITE.name ? `${SITE.name} / ${SITE.tradingAs}` : SITE.name}</dd></div>
              <div><dt className="font-medium text-ink">Website</dt><dd><a href={SITE.url} className="text-magenta hover:underline">{SITE.url}</a></dd></div>
              <div><dt className="font-medium text-ink">Email</dt><dd><a href={`mailto:${SITE.email.hello}`} className="text-magenta hover:underline">{SITE.email.hello}</a></dd></div>
              <div><dt className="font-medium text-ink">Phone</dt><dd><a href={`tel:${SITE.phoneHref}`} className="text-magenta hover:underline">{SITE.phone}</a></dd></div>
              {SITE.gstin ? <div><dt className="font-medium text-ink">GSTIN</dt><dd>{SITE.gstin}</dd></div> : null}
            </dl>
          </div>
        </div>
      </MotionSection>
      <CtaBand title="See it on your own portfolio." />
    </MarketingShell>
  );
}

