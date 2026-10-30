import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { FooterAuthLinks, HeaderAuthCtas, MobileAuthLinks } from "@/components/marketing/AuthCtas";
import { FEATURES, USE_CASES, audience } from "@/lib/marketing";
import { SITE } from "@/lib/site";

export { JsonLd } from "@/components/marketing/SiteJsonLd";
export {
  Breadcrumbs,
  PageHero,
  FaqList,
  CtaBand,
  MotionGrid,
  MotionTile,
  MotionSection,
} from "@/components/marketing/MarketingUi";

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
          1-day free trial - try Watchfront, keep going on a paid plan if you like it.{" "}
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
        <span>We don&apos;t promise zero downtime - we promise you&apos;ll know first.</span>
      </div>
    </footer>
  );
}


export function MarketingShell({ children, banner = false }: { children: React.ReactNode; banner?: boolean }) {
  return (
    <div className="relative min-h-screen bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(155,27,103,0.09),transparent_55%),radial-gradient(ellipse_at_90%_20%,rgba(143,211,244,0.14),transparent_45%)]"
      />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-plum focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
      <ScrollProgress />
      <SiteHeader banner={banner} />
      <main id="main" className="pb-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
