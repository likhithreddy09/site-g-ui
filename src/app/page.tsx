import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Showcase } from "@/components/landing/Showcase";
import { Reveal } from "@/components/landing/Reveal";
import { CtaPrimaryLink } from "@/components/marketing/AuthCtas";
import { FaqList, JsonLd, SiteFooter, SiteHeader } from "@/components/marketing/Site";
import { HOME_FAQS, PLANS, USE_CASES, audience } from "@/lib/marketing";
import { faqLd, organizationLd, websiteLd } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

const MODULES = [
  ["Portfolio & client management", "/use-cases/web-agencies", "Group every client website in one workspace with labels, notes, and per-client health."],
  ["Uptime & response time", "/features/uptime-monitoring", "Scheduled HTTP checks with retries, failure thresholds, and confirmed-outage incidents."],
  ["SSL & domain expiry", "/features/ssl-domain-monitoring", "Certificate validity, HTTPS redirects, and registry expiry — unknown is shown as unknown."],
  ["Content & visual changes", "/features/visual-regression-testing", "Expected text, required elements, broken links, and screenshot baselines with ignored regions."],
  ["Browser error monitoring", "/features/javascript-error-monitoring", "A lightweight script groups JavaScript errors by fingerprint, page, browser, and release."],
  ["API monitoring", "/features/api-monitoring", "Scheduled endpoint checks with encrypted secrets and assertions, plus real-visitor API failures."],
  ["Form & journey testing", "/features/form-journey-testing", "Playwright journeys that fill forms, click, and assert outcomes — with safety guards."],
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
      <JsonLd data={[organizationLd, websiteLd, appLd, faqLd(HOME_FAQS)]} />
      <SiteHeader />
      <main id="main">

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <p className="animate-fade-up text-[15px] text-plum">Website monitoring & automated QA for agencies in India</p>
        <h1 className="mt-4 animate-fade-up text-5xl font-semibold leading-[1.05] tracking-tight text-ink [animation-delay:80ms] md:text-[76px]">
          Know when client sites break<br />
          <span className="hl-underline text-magenta">and why they broke</span>
        </h1>
        <p className="mt-8 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink [animation-delay:160ms] md:text-xl">
          Watchfront monitors uptime, SSL, content, browser errors, APIs, and the forms and journeys that bring in leads — then gives your team the evidence to fix it.
        </p>
        <p className="mt-3 animate-fade-up text-[15px] text-plum-2 [animation-delay:200ms]">For web agencies, marketing agencies, and WordPress maintenance providers.</p>
        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-6 [animation-delay:260ms]">
          <CtaPrimaryLink
            className="rounded-full bg-plum px-7 py-3.5 text-[17px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-lg"
            guestLabel="Start monitoring free"
          />
          <a href="#how" className="link-underline text-[17px] text-plum">See an incident workflow <ArrowRight className="inline h-4 w-4" /></a>
        </div>
        <p className="mt-6 max-w-sm animate-fade-up text-sm leading-relaxed text-plum-2 [animation-delay:320ms]">Add a website and get your first useful result within minutes — no code required.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Reveal><Showcase /></Reveal>
        <p className="mt-12 text-center text-lg text-plum-2">Built on <span className="font-medium text-ink">Playwright</span>, grounded in evidence. <Link href="/register" className="link-underline text-plum">Try it on your portfolio</Link></p>
      </section>

      <section id="platform" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal className="border-l-4 border-teal pl-6">
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">Every check works from the same website record.</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum-2">Monitoring, testing, incidents, and reports connected in one place, so developers, marketers, and clients see the same facts.</p>
          <Link href="/features" className="link-underline mt-5 inline-block text-plum">Explore every feature <ArrowRight className="inline h-4 w-4" /></Link>
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-1 md:grid-cols-2">
          {MODULES.map(([t, href, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.06}>
              <Link href={href} className="group flex gap-5 border-t border-plum/10 py-6 transition hover:bg-cream/60 md:px-3">
                <span className="font-mono text-sm text-mauve">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold text-ink transition group-hover:text-magenta">{t}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-plum-2">{d}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">Caught before the client calls.</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum-2">Detection, evidence, and communication shape how fast an agency recovers.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["01", "See the whole portfolio every morning.", "Uptime, SSL, failing journeys, and new browser errors across every client — on one screen."],
            ["02", "Tests work the routine checks.", "Scheduled journeys submit test forms, click booking buttons, and verify success messages for you."],
            ["03", "Share the evidence.", "Incidents carry screenshots, logs, and timelines. Reports turn them into something a client understands."],
          ].map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-cream p-8 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="font-mono text-sm text-magenta">{n}</div>
                <h3 className="mt-6 text-2xl font-semibold leading-tight text-ink">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-plum-2">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="ai" className="mt-28 bg-plum py-24 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Monitoring observes. AI explains. <span className="text-sky">Your team decides.</span></h2>
            <p className="mt-5 max-w-2xl text-lg text-cream/75">Every diagnosis is grounded in captured evidence. Nothing changes on a production site without you.</p>
          </Reveal>
          <p className="mt-12 font-mono text-xs uppercase tracking-[0.16em] text-cream/50">Example: a contact form stops working</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              ["1", "Observed", "The journey test fails at “Assert text: Thank you”. Screenshot, console exception, and a 500 from the form endpoint are attached."],
              ["2", "Explained", "AI lists observations with evidence references, then hypotheses labelled by confidence — and the evidence it doesn't have."],
              ["3", "Resolved", "Your developer fixes it, monitoring confirms recovery, and the resolution note flows into the client report."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                  <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-semibold text-ink">{n}</span><span className="text-xl font-semibold">{t}</span></div>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream/75">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">Fair INR pricing for Indian teams.</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum-2">Starter ₹999 · Growth ₹2,499 · Agency ₹4,999. Enterprise is a booked call — no surprise fees.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className={`flex h-full flex-col rounded-3xl p-7 ${p.featured ? "bg-ink text-cream shadow-2xl" : "bg-cream text-ink"}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  {p.featured && <span className="rounded-md bg-gold px-2 py-0.5 text-xs font-medium text-ink">Popular</span>}
                </div>
                <p className={`mt-1 text-sm ${p.featured ? "text-cream/60" : "text-plum-2"}`}>{p.note}</p>
                <div className="mt-6 text-4xl font-semibold">
                  {p.priceLabel || `₹${p.priceInr.toLocaleString("en-IN")}`}
                  {!p.priceLabel && <span className="text-base font-normal opacity-60">/mo</span>}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-sky" : "text-magenta"}`} />{f}</li>)}
                </ul>
                <Link href={p.href || "/register"} className={`mt-8 rounded-full py-3 text-center text-sm font-medium transition ${p.featured ? "bg-cream text-ink hover:bg-sky" : "bg-plum text-cream hover:bg-ink"}`}>
                  {p.cta || `Start with ${p.name}`}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-plum-2">Need SSO or a large portfolio? <Link className="link-underline" href="/contact">Book an Enterprise call</Link>. <Link className="link-underline ml-1" href="/pricing">Compare all plans</Link></p>
      </section>

      <section id="use-cases" className="mx-auto mt-28 max-w-6xl px-6" aria-labelledby="use-cases-title">
        <Reveal>
          <h2 id="use-cases-title" className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">Built for the people who keep websites running.</h2>
          <p className="mt-4 max-w-2xl text-lg text-plum-2">Whether you run 5 client sites or 500, Watchfront fits the way you already work.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.slug} delay={i * 0.06}>
              <Link href={`/use-cases/${u.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-ink group-hover:text-magenta">For {audience(u)}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum-2">{u.intro.split(".")[0]}.</p>
                <span className="mt-6 text-sm text-plum"><span className="link-underline">Learn more</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FaqList faqs={HOME_FAQS} />

      <section className="mx-auto mt-28 max-w-6xl px-6">
        <h2 className="text-4xl font-semibold tracking-tight text-ink">Start with one website.</h2>
        <p className="mt-3 text-lg text-plum-2">Then add the journey that matters most to your client.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Your portfolio", "Start monitoring free", "Add websites, group them by client, and get alerts that come with evidence.", "/register"],
            ["Agencies with 10–50 sites", "Start free trial", "24 hours on the full product — continue on a paid plan if it fits.", "/register"],
            ["Already have an account", "Open your dashboard", "Pick up where you left off.", "/login"],
          ].map(([k, t, d, h]) => (
            <Link key={t} href={h} className="group rounded-3xl bg-cream p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="text-sm text-plum-2">{k}</div>
              <div className="mt-3 text-2xl font-semibold text-ink group-hover:text-magenta">{t}</div>
              <p className="mt-3 text-[15px] text-plum-2">{d}</p>
              <div className="mt-6 text-plum"><span className="link-underline">Continue</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
