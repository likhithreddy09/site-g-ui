import { ArrowRight, ChevronDown, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CtaPrimaryLink, FooterAuthLinks, HeaderAuthCtas, MobileAuthLinks } from "@/components/marketing/AuthCtas";
import { FEATURES, USE_CASES, audience, type Faq } from "@/lib/marketing";
import { breadcrumbLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function NavMenu({ label, items, all }: { label: string; items: { href: string; name: string; short?: string }[]; all?: [string, string] }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 py-5 hover:text-magenta" aria-haspopup="true">{label} <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" /></button>
      <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 translate-y-1 rounded-2xl bg-white p-3 opacity-0 shadow-2xl ring-1 ring-plum/10 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="grid grid-cols-2 gap-1">
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="rounded-xl p-3 hover:bg-cream">
              <div className="text-sm font-medium text-ink">{i.name}</div>
              {i.short && <div className="mt-0.5 text-xs leading-snug text-plum-2">{i.short}</div>}
            </Link>
          ))}
        </div>
        {all && <Link href={all[1]} className="mt-1 flex items-center gap-1 rounded-xl px-3 py-2 text-sm text-magenta hover:bg-cream">{all[0]} <ArrowRight className="h-3.5 w-3.5" /></Link>}
      </div>
    </div>
  );
}

export function SiteHeader({ banner = true }: { banner?: boolean }) {
  const features = FEATURES.map((f) => ({ href: `/features/${f.slug}`, name: f.name, short: f.short }));
  const cases = USE_CASES.map((u) => ({ href: `/use-cases/${u.slug}`, name: u.name, short: u.intro.split(".")[0] + "." }));
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] text-plum md:flex">
          <NavMenu label="Features" items={features} all={["See all features", "/features"]} />
          <NavMenu label="Use cases" items={cases} all={["All use cases", "/use-cases"]} />
          <Link href="/pricing" className="hover:text-magenta">Pricing</Link>
          <Link href="/security" className="hover:text-magenta">Security</Link>
          <Link href="/about" className="hover:text-magenta">About</Link>
          <Link href="/contact" className="hover:text-magenta">Contact</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderAuthCtas />
          <details className="relative md:hidden">
            <summary className="list-none rounded-lg p-2 text-plum [&::-webkit-details-marker]:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></summary>
            <nav aria-label="Mobile" className="absolute right-0 top-full z-50 mt-2 max-h-[70vh] w-[min(18rem,calc(100vw-2rem))] space-y-1 overflow-y-auto rounded-2xl bg-white p-3 text-sm shadow-2xl ring-1 ring-plum/10">
              {[["Features", "/features"], ["Pricing", "/pricing"], ...USE_CASES.map((u) => [`For ${audience(u)}`, `/use-cases/${u.slug}`]), ["Security", "/security"], ["About", "/about"], ["Contact", "/contact"], ["Book a call", "/contact#book"]].map(([l, h]) => (
                <Link key={h} href={h} className="block rounded-lg px-3 py-2.5 text-plum hover:bg-cream">{l}</Link>
              ))}
              <div className="my-1 border-t border-plum/10" />
              <MobileAuthLinks />
            </nav>
          </details>
        </div>
      </div>
      {banner && (
        <div className="bg-magenta px-3 py-2 text-center text-xs text-cream sm:py-2.5 sm:text-sm">
          1-day free trial — try Watchfront, keep going on a paid plan if you like it.{" "}
          <Link href="/register" className="link-underline ml-1 font-medium">Start free →</Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, [string, string][]][] = [
    ["Product", [["All features", "/features"], ...FEATURES.filter((f) => f.slug !== "client-reports").map((f) => [f.name, `/features/${f.slug}`] as [string, string]), ["Pricing", "/pricing"]]],
    ["Use cases", [["All use cases", "/use-cases"], ...USE_CASES.map((u) => [u.name, `/use-cases/${u.slug}`] as [string, string])]],
    ["Company", [["About", "/about"], ["Contact", "/contact"], ["Security", "/security"]]],
    ["Legal", [
      ["Privacy policy", "/privacy"],
      ["Terms of service", "/terms"],
      ["Refund & cancellation", "/refund"],
      ["Shipping & delivery", "/shipping"],
    ]],
  ];
  return (
    <footer className="mt-28 bg-ink py-14 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-cream/60">{SITE.tagline}. Monitor every client website, catch broken forms and errors, and share reports clients understand.</p>
          <a href={`mailto:${SITE.email.hello}`} className="mt-4 block text-sm text-sky hover:underline">{SITE.email.hello}</a>
          <a href={`tel:${SITE.phoneHref}`} className="mt-1 block text-sm text-sky hover:underline">{SITE.phone}</a>
        </div>
        {cols.map(([title, links]) => (
          <nav key={title} aria-label={title} className="space-y-2 text-sm text-cream/70">
            <div className="font-medium text-cream">{title}</div>
            {links.map(([l, h]) => <Link key={h} href={h} className="block hover:text-sky">{l}</Link>)}
            {title === "Company" && <FooterAuthLinks />}
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-2 px-6 text-xs text-cream/40">
        <span>
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          {SITE.gstin ? ` · GSTIN ${SITE.gstin}` : ""}
        </span>
        <span>We don&apos;t promise zero downtime — we promise you&apos;ll know first.</span>
      </div>
    </footer>
  );
}


export function MarketingShell({ children, banner = false }: { children: React.ReactNode; banner?: boolean }) {
  return (
    <div className="bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-plum focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
      <SiteHeader banner={banner} />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: [string, string][] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-plum-2">
        {items.map(([name, path], i) => (
          <span key={path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-plum/30" />}
            {i < items.length - 1 ? <Link href={path} className="hover:text-magenta">{name}</Link> : <span aria-current="page" className="text-ink">{name}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}

export function PageHero({ eyebrow, title, intro, crumbs, children }: { eyebrow?: string; title: string; intro: string; crumbs?: [string, string][]; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
      {crumbs && <Breadcrumbs items={crumbs} />}
      {eyebrow && <p className="text-[15px] font-medium text-magenta">{eyebrow}</p>}
      <h1 className="mt-3 max-w-4xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-plum-2 sm:mt-6 sm:text-lg md:text-xl">{intro}</p>
      {children}
    </section>
  );
}

export function FaqList({ faqs, title = "Frequently asked questions" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-6" aria-labelledby="faq">
      <h2 id="faq" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      <div className="mt-8 divide-y divide-plum/10 border-y border-plum/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
              <h3>{f.q}</h3><ChevronDown className="h-5 w-5 shrink-0 text-plum/50 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-plum-2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Start with one website.", body = "Free for 3 websites. No credit card, nothing to install." }: { title?: string; body?: string }) {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-plum px-8 py-14 text-cream md:px-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-magenta/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-cream/75">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaPrimaryLink className="rounded-full bg-cream px-7 py-3.5 font-medium text-ink transition hover:-translate-y-0.5 hover:bg-sky" />
            <Link href="/contact#book" className="rounded-full px-7 py-3.5 font-medium text-cream ring-1 ring-cream/30 transition hover:bg-white/10">Book a call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
