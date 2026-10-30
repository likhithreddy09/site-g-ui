import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Showcase } from "@/components/landing/Showcase";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { HomeHero } from "@/components/landing/HomeHero";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { ScrollStage } from "@/components/landing/ScrollStage";
import { FaqList, JsonLd, SiteFooter, SiteHeader } from "@/components/marketing/Site";
import { HOME_FAQS, PLANS, USE_CASES, audience } from "@/lib/marketing";
import { faqLd, organizationIdLd, siteNavLd, websiteLd } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

const MODULES = [
  ["Portfolio & client management", "/use-cases/web-agencies", "Group every client website in one workspace with labels, notes, and per-client health."],
  ["Uptime & response time", "/features/uptime-monitoring", "Scheduled HTTP checks with retries, failure thresholds, and confirmed-outage incidents."],
  ["SEO audit", "/features/seo-audit", "Multi-page crawl of titles, meta, headings, canonicals and social tags — scored with a fix list."],
  ["SSL & domain expiry", "/features/ssl-domain-monitoring", "Certificate validity, HTTPS redirects, and registry expiry — unknown is shown as unknown."],
  ["Content & visual changes", "/features/visual-regression-testing", "Expected text, required elements, broken links, and screenshot baselines with ignored regions."],
  ["Browser error monitoring", "/features/javascript-error-monitoring", "A lightweight script groups JavaScript errors by fingerprint, page, browser, and release."],
  ["API monitoring", "/features/api-monitoring", "Scheduled endpoint checks with encrypted secrets and assertions, plus real-visitor API failures."],
  ["Form & journey testing", "/features/form-journey-testing", "Real-browser journeys that fill forms, click, and assert outcomes — with safety guards."],
  ["Incident management", "/features", "Grouping, severity, assignment, notes, reopen-on-recurrence, and false-positive review."],
  ["AI-assisted diagnosis", "/features", "Evidence-grounded summaries that separate observations from hypotheses."],
  ["Client reporting", "/features/client-reports", "Branded, shareable reports with uptime, incidents, actions taken, and explicit coverage."],
];

const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Website monitoring",
  operatingSystem: "Web",
  image: abs("/opengraph-image"),
  inLanguage: "en-IN",
  countriesSupported: "IN",
  featureList: MODULES.map(([t]) => t),
  offers: PLANS.filter((p) => p.priceInr > 0).map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.priceInr,
    priceCurrency: "INR",
    url: abs("/pricing"),
    availability: "https://schema.org/InStock",
  })),
};

export default function Home() {
  return (
    <div className="bg-white">
      <JsonLd data={[organizationIdLd, websiteLd, siteNavLd, appLd, faqLd(HOME_FAQS)]} />
      <ScrollProgress />
      <SiteHeader />
      <main id="main">

      <HomeHero />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollStage>
          <Showcase />
        </ScrollStage>
        <Reveal delay={0.1}>
          <p className="mt-8 px-2 text-center text-[14px] leading-relaxed text-plum-2 sm:mt-10 sm:text-base">
            Grounded in evidence — screenshots, logs, and timelines on every incident.{" "}
            <Link href="/register" className="link-underline text-plum">Try it on your portfolio</Link>
          </p>
        </Reveal>
      </section>

      <section id="platform" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal className="border-l-4 border-teal pl-6" variant="left">
          <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">Every check works from the same website record.</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Monitoring, testing, incidents, and reports connected in one place, so developers, marketers, and clients see the same facts.</p>
          <Link href="/features" className="link-underline mt-5 inline-block text-plum">Explore every feature <ArrowRight className="inline h-4 w-4" /></Link>
        </Reveal>
        <Stagger className="mt-14 grid gap-x-12 gap-y-1 md:grid-cols-2" stagger={0.05}>
          {MODULES.map(([t, href, d], i) => (
            <StaggerItem key={t}>
              <Link href={href} className="group flex gap-5 border-t border-plum/10 py-6 transition hover:bg-cream/60 md:px-3">
                <span className="font-mono text-sm text-mauve">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-medium text-ink transition group-hover:text-magenta">{t}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-plum-2">{d}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="how" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Caught before the client calls.</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Detection, evidence, and communication shape how fast an agency recovers.</p>
        </Reveal>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {[
            ["01", "See the whole portfolio every morning.", "Uptime, SSL, failing journeys, and new browser errors across every client — on one screen."],
            ["02", "Tests work the routine checks.", "Scheduled journeys submit test forms, click booking buttons, and verify success messages for you."],
            ["03", "Share the evidence.", "Incidents carry screenshots, logs, and timelines. Reports turn them into something a client understands."],
          ].map(([n, t, d]) => (
            <StaggerItem key={n} variant="scale">
              <div className="h-full rounded-3xl bg-cream p-8 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="font-mono text-sm text-magenta">{n}</div>
                <h3 className="mt-6 text-xl font-medium leading-tight text-ink">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-plum-2">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="ai" className="mt-28 overflow-hidden bg-plum py-24 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-4xl">Monitoring observes. AI explains. <span className="text-sky">Your team decides.</span></h2>
            <p className="mt-5 max-w-2xl text-base text-cream/75">Every diagnosis is grounded in captured evidence. Nothing changes on a production site without you.</p>
          </Reveal>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.16em] text-cream/50">Example: a contact form stops working</p>
          <Stagger className="mt-6 grid gap-5 md:grid-cols-3" stagger={0.12}>
            {[
              ["1", "Observed", "The journey test fails at “Assert text: Thank you”. Screenshot, console exception, and a 500 from the form endpoint are attached."],
              ["2", "Explained", "AI lists observations with evidence references, then hypotheses labelled by confidence — and the evidence it doesn't have."],
              ["3", "Resolved", "Your developer fixes it, monitoring confirms recovery, and the resolution note flows into the client report."],
            ].map(([n, t, d]) => (
              <StaggerItem key={n} variant="scale">
                <div className="h-full rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition hover:bg-white/10">
                  <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-semibold text-ink">{n}</span><span className="text-lg font-medium">{t}</span></div>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream/75">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="pricing" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Fair INR pricing for Indian teams.</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Starter ₹999 · Growth ₹2,499 · Agency ₹4,999. Enterprise is a booked call — no surprise fees.</p>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-4" stagger={0.07}>
          {PLANS.map((p) => (
            <StaggerItem key={p.name} variant="scale">
              <div className={`flex h-full flex-col rounded-3xl p-7 transition hover:-translate-y-1 ${p.featured ? "bg-ink text-cream shadow-2xl" : "bg-cream text-ink"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{p.name}</h3>
                  {p.featured && <span className="rounded-md bg-gold px-2 py-0.5 text-xs font-medium text-ink">Popular</span>}
                </div>
                <p className={`mt-1 text-sm ${p.featured ? "text-cream/60" : "text-plum-2"}`}>{p.note}</p>
                <div className="mt-6 text-3xl font-medium">
                  {p.priceLabel || `₹${p.priceInr.toLocaleString("en-IN")}`}
                  {!p.priceLabel && <span className="text-sm font-normal opacity-60">/mo</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-sky" : "text-magenta"}`} />{f}</li>)}
                </ul>
                <Link href={p.href || "/register"} className={`mt-8 rounded-full py-3 text-center text-sm font-medium transition ${p.featured ? "bg-cream text-ink hover:bg-sky" : "bg-plum text-cream hover:bg-ink"}`}>
                  {p.cta || `Start with ${p.name}`}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm text-plum-2">Need SSO or a large portfolio? <Link className="link-underline" href="/contact">Book an Enterprise call</Link>. <Link className="link-underline ml-1" href="/pricing">Compare all plans</Link></p>
      </section>

      <section id="use-cases" className="mx-auto mt-28 max-w-6xl px-6" aria-labelledby="use-cases-title">
        <Reveal>
          <h2 id="use-cases-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Built for the people who keep websites running.</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Whether you run 5 client sites or 500, Watchfront fits the way you already work.</p>
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {USE_CASES.map((u) => (
            <StaggerItem key={u.slug} variant="scale">
              <Link href={`/use-cases/${u.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-medium text-ink group-hover:text-magenta">For {audience(u)}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum-2">{u.intro.split(".")[0]}.</p>
                <span className="mt-6 text-sm text-plum"><span className="link-underline">Learn more</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal>
        <FaqList faqs={HOME_FAQS} />
      </Reveal>

      <section className="mx-auto mt-28 max-w-6xl px-6 pb-8">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-ink">Start with one website.</h2>
          <p className="mt-3 text-base text-plum-2">Then add the journey that matters most to your client.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {[
            ["Your portfolio", "Start monitoring free", "Add websites, group them by client, and get alerts that come with evidence.", "/register"],
            ["Agencies with 10–50 sites", "Start free trial", "24 hours on the full product — continue on a paid plan if it fits.", "/register"],
            ["Already have an account", "Open your dashboard", "Pick up where you left off.", "/login"],
          ].map(([k, t, d, h]) => (
            <StaggerItem key={t} variant="scale">
              <Link href={h} className="group block h-full rounded-3xl bg-cream p-8 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="text-sm text-plum-2">{k}</div>
                <div className="mt-3 text-xl font-medium text-ink group-hover:text-magenta">{t}</div>
                <p className="mt-3 text-[15px] text-plum-2">{d}</p>
                <div className="mt-6 text-plum"><span className="link-underline">Continue</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
