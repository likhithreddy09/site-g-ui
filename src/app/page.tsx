import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Showcase } from "@/components/landing/Showcase";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { HomeHero } from "@/components/landing/HomeHero";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { ScrollStage } from "@/components/landing/ScrollStage";
import { FaqList, JsonLd, SiteFooter, SiteHeader } from "@/components/marketing/Site";
import { HOME_FAQS, USE_CASES, audience } from "@/lib/marketing";
import { PRODUCTS } from "@/lib/products";
import { faqLd, organizationIdLd, siteNavLd, websiteLd } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const MODULES = [
  ["Portfolio & client management", "/use-cases/web-agencies", "Group every client website in one workspace with labels, notes, and per-client health."],
  ["Uptime & response time", "/uptime-monitoring-tool", "Scheduled HTTP checks with retries, failure thresholds, and confirmed-outage incidents."],
  ["SEO audit", "/features/seo-audit", "Multi-page crawl of titles, meta, headings, canonicals and social tags - scored with a fix list."],
  ["SSL & domain expiry", "/ssl-certificate-monitoring", "Certificate validity, HTTPS redirects, and registry expiry - unknown is shown as unknown."],
  ["Content & visual changes", "/features/visual-regression-testing", "Expected text, required elements, broken links, and screenshot baselines with ignored regions."],
  ["Browser error monitoring", "/features/javascript-error-monitoring", "A lightweight script groups JavaScript errors by fingerprint, page, browser, and release."],
  ["API monitoring", "/features/api-monitoring", "Scheduled endpoint checks with encrypted secrets and assertions, plus real-visitor API failures."],
  ["Form & journey testing", "/contact-form-monitoring", "Real-browser journeys that fill forms, click, and assert outcomes - with safety guards."],
  ["Incident management", "/website-downtime-monitoring", "Grouping, severity, assignment, notes, reopen-on-recurrence, and false-positive review."],
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
      </section>

      <section id="platform" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal className="border-l-4 border-teal pl-6" variant="left">
          <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">Every check works from the same website record.</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Monitoring, testing, incidents, and reports connected in one place, so developers, marketers, and clients see the same facts.</p>
          <Link href="/website-monitoring" className="link-underline mt-5 inline-block text-plum">Explore website monitoring <ArrowRight className="inline h-4 w-4" /></Link>
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

      <section id="products" className="mx-auto mt-28 max-w-6xl px-6" aria-labelledby="products-title">
        <Reveal>
          <h2 id="products-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Searching for a monitoring product?</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">
            Jump straight to the product page that matches what you need - website monitoring, uptime, SSL, downtime alerts or contact form checks.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {PRODUCTS.map((p) => (
            <StaggerItem key={p.slug} variant="scale">
              <Link href={`/${p.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-medium text-ink group-hover:text-magenta">{p.nav}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum-2">{p.description}</p>
                <span className="mt-6 text-sm text-plum"><span className="link-underline">Open product page</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
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
            ["01", "See the whole portfolio every morning.", "Uptime, SSL, failing journeys, and new browser errors across every client - on one screen."],
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
              ["2", "Explained", "AI lists observations with evidence references, then hypotheses labelled by confidence - and the evidence it doesn't have."],
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

      <section id="trial" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-8 rounded-3xl bg-ink p-8 text-cream md:flex-row md:items-center md:p-12">
            <div className="flex-1">
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Try everything free for 3 days.</h2>
              <p className="mt-4 max-w-xl text-base text-cream/70">Every feature, no card required. If Watchfront earns its place, join the waitlist from your dashboard and we&apos;ll keep you going.</p>
              <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
                {["Uptime, SSL & domain checks", "User journeys & form tests", "Browser error monitoring", "Client-ready reports"].map((f) => (
                  <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" />{f}</li>
                ))}
              </ul>
            </div>
            <Link href="/register" className="shrink-0 rounded-full bg-cream px-8 py-3.5 text-center text-sm font-medium text-ink transition hover:bg-sky">
              Start your free trial
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="free-tools" className="mx-auto mt-28 max-w-6xl px-6" aria-labelledby="free-tools-title">
        <Reveal>
          <h2 id="free-tools-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Free website checkers</h2>
          <p className="mt-4 max-w-2xl text-base text-plum-2">Run a one-off check right now - no signup. The same engines power Watchfront&apos;s 24/7 monitoring.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.08}>
          {TOOLS.map((t) => (
            <StaggerItem key={t.slug} variant="scale">
              <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-medium text-ink group-hover:text-magenta">{t.name}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum-2">{t.short}</p>
                <span className="mt-6 text-sm text-plum"><span className="link-underline">Try it free</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm text-plum-2">New to monitoring? Start with <Link href="/guides/what-is-uptime-monitoring" className="link-underline">what uptime monitoring is</Link>, <Link href="/guides" className="link-underline">browse all guides</Link>, or see <Link href="/compare" className="link-underline">how Watchfront compares</Link> with UptimeRobot, Pingdom and others.</p>
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
        <p className="mt-6 text-sm text-plum-2"><Link href="/use-cases" className="link-underline">See every use case</Link> or <Link href="/features" className="link-underline">compare all monitoring features</Link>.</p>
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
            ["Agencies with 10-50 sites", "Start free trial", "3 days on the full product - join the waitlist if it fits.", "/register"],
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
