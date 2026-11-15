import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Showcase } from "@/components/landing/Showcase";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/Reveal";
import { HomeHero } from "@/components/landing/HomeHero";
import { SignalMarquee } from "@/components/landing/SignalMarquee";
import { WowStrip } from "@/components/landing/WowStrip";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { ScrollStage } from "@/components/landing/ScrollStage";
import { FaqList, JsonLd, SiteFooter, SiteHeader } from "@/components/marketing/Site";
import { HOME_FAQS, USE_CASES, audience } from "@/lib/marketing";
import { PRODUCTS } from "@/lib/products";
import { faqLd, organizationIdLd, siteNavLd, websiteLd } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const MODULES = [
  ["Uptime & response", "/uptime-monitoring-tool", "1-minute checks with confirmed-outage alerts."],
  ["SSL & domain", "/ssl-certificate-monitoring", "Expiry warnings before browsers scare clients."],
  ["Form journeys", "/contact-form-monitoring", "Real-browser submits that prove leads still work."],
  ["SEO audit", "/features/seo-audit", "Multi-page scores and a fix list, not just the homepage."],
  ["JS errors", "/features/javascript-error-monitoring", "Visitor errors grouped with the path they took."],
  ["Client reports", "/features/client-reports", "Shareable proof that makes retainers feel earned."],
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
      <SignalMarquee />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollStage>
          <Showcase />
        </ScrollStage>
      </section>

      <WowStrip />

      <section id="platform" className="mx-auto mt-24 max-w-6xl px-6 sm:mt-28">
        <Reveal className="border-l-4 border-teal pl-6" variant="left">
          <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-tight text-ink md:text-4xl">One record. Every check.</h2>
          <p className="mt-4 max-w-xl text-base text-plum-2">Monitoring, tests, incidents, and reports share the same facts.</p>
          <Link href="/website-monitoring" className="link-underline mt-5 inline-block text-plum">Explore website monitoring <ArrowRight className="inline h-4 w-4" /></Link>
        </Reveal>
        <Stagger className="mt-12 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {MODULES.map(([t, href, d], i) => (
            <StaggerItem key={t}>
              <Link href={href} className="group flex gap-4 border-t border-plum/10 py-5 transition hover:bg-cream/60 md:px-2">
                <span className="font-mono text-sm text-mauve">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-medium text-ink transition group-hover:text-magenta">{t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-plum-2">{d}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="products" className="mx-auto mt-24 max-w-6xl px-6 sm:mt-28" aria-labelledby="products-title">
        <Reveal>
          <h2 id="products-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Pick a product</h2>
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-3" stagger={0.04}>
          {PRODUCTS.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2.5 text-[14px] font-medium text-ink transition hover:-translate-y-0.5 hover:bg-plum hover:text-cream"
              >
                {p.nav}
                <ArrowRight className="h-3.5 w-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="how" className="mx-auto mt-24 max-w-6xl px-6 sm:mt-28">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Caught before the client calls.</h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {[
            ["01", "See the portfolio", "Uptime, SSL, journeys, and JS errors — one morning screen."],
            ["02", "Let tests work", "Scheduled browsers submit forms and assert success for you."],
            ["03", "Share evidence", "Screenshots and timelines that clients actually understand."],
          ].map(([n, t, d]) => (
            <StaggerItem key={n} variant="scale">
              <div className="h-full rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="font-mono text-sm text-magenta">{n}</div>
                <h3 className="mt-5 text-xl font-medium leading-tight text-ink">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plum-2">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="ai" className="mt-24 overflow-hidden bg-plum py-20 text-cream sm:mt-28 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-4xl">Monitoring observes. AI explains. <span className="text-sky">You decide.</span></h2>
            <p className="mt-5 max-w-xl text-base text-cream/75">Diagnoses stay grounded in screenshots, logs, and HTTP — never guesswork alone.</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {[
              ["1", "Observed", "Journey fails at “Thank you”. Screenshot + 500 attached."],
              ["2", "Explained", "Evidence-backed hypotheses — and what’s still unknown."],
              ["3", "Resolved", "Fix lands, monitoring confirms, report updates."],
            ].map(([n, t, d]) => (
              <StaggerItem key={n} variant="scale">
                <div className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                  <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-semibold text-ink">{n}</span><span className="text-lg font-medium">{t}</span></div>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{d}</p>
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

      <section id="free-tools" className="mx-auto mt-24 max-w-6xl px-6 sm:mt-28" aria-labelledby="free-tools-title">
        <Reveal>
          <h2 id="free-tools-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Free checkers</h2>
          <p className="mt-3 max-w-xl text-base text-plum-2">One-off checks, no signup — same engines as 24/7 monitoring.</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {TOOLS.map((t) => (
            <StaggerItem key={t.slug} variant="scale">
              <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-medium text-ink group-hover:text-magenta">{t.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-plum-2">{t.short}</p>
                <span className="mt-5 text-sm text-plum"><span className="link-underline">Try free</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-5 text-sm text-plum-2">
          <Link href="/guides" className="link-underline">Guides</Link>
          {" · "}
          <Link href="/blog" className="link-underline">Blog</Link>
          {" · "}
          <Link href="/compare" className="link-underline">Compare</Link>
        </p>
      </section>

      <section id="use-cases" className="mx-auto mt-24 max-w-6xl px-6 sm:mt-28" aria-labelledby="use-cases-title">
        <Reveal>
          <h2 id="use-cases-title" className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Who it&apos;s for</h2>
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-3" stagger={0.05}>
          {USE_CASES.map((u) => (
            <StaggerItem key={u.slug}>
              <Link
                href={`/use-cases/${u.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-plum/15 bg-white px-4 py-2.5 text-[14px] font-medium text-ink transition hover:border-magenta/40 hover:text-magenta"
              >
                For {audience(u)}
                <ArrowRight className="h-3.5 w-3.5 opacity-40 transition group-hover:translate-x-0.5" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal>
        <FaqList faqs={HOME_FAQS} />
      </Reveal>

      <section className="mx-auto mt-24 max-w-6xl px-6 pb-12 sm:mt-28">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-cream via-white to-sky/20 px-8 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">Start with one website.</h2>
            <p className="mx-auto mt-3 max-w-md text-base text-plum-2">Then add the journey that matters most to your client.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition hover:bg-ink">
                Start monitoring free
              </Link>
              <Link href="/login" className="link-underline text-[15px] text-plum">
                Open dashboard
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
