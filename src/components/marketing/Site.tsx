import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { BannerAuthCta, FooterAuthLinks, HeaderAuthCtas, MobileAuthLinks } from "@/components/marketing/AuthCtas";
import { BLOG_POSTS } from "@/lib/blog";
import { GLOSSARY } from "@/lib/glossary";
import { GUIDES } from "@/lib/guides";
import { FEATURES, USE_CASES } from "@/lib/marketing";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export { JsonLd } from "@/components/marketing/SiteJsonLd";
export {
  Breadcrumbs,
  PageHero,
  SectionHeader,
  VisualBand,
  FaqList,
  CtaBand,
  MotionGrid,
  MotionTile,
  MotionSection,
} from "@/components/marketing/MarketingUi";

function NavMenu({
  label,
  items,
  all,
  wide = true,
}: {
  label: string;
  items: { href: string; name: string; short?: string }[];
  all?: [string, string];
  wide?: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap text-[14px] hover:text-magenta"
        aria-haspopup="true"
      >
        {label} <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
      </button>
      <div
        className={`invisible absolute top-full z-50 mt-3 translate-y-1 rounded-2xl bg-white p-2 opacity-0 shadow-2xl ring-1 ring-plum/10 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          wide ? "left-1/2 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2" : "left-0 w-56"
        }`}
      >
        <div className={wide ? "grid grid-cols-2 gap-0.5" : "grid gap-0.5"}>
          {items.map((i) => (
            <Link key={i.href} href={i.href} className="rounded-xl px-3 py-2.5 hover:bg-cream">
              <div className="text-sm font-medium text-ink">{i.name}</div>
              {i.short && <div className="mt-0.5 text-xs leading-snug text-plum-2">{i.short}</div>}
            </Link>
          ))}
        </div>
        {all && (
          <Link href={all[1]} className="mt-0.5 flex items-center gap-1 rounded-xl px-3 py-2 text-sm text-magenta hover:bg-cream">
            {all[0]} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function SiteHeader({ banner = true, tone = "light" }: { banner?: boolean; tone?: "light" | "ink" }) {
  const ink = tone === "ink";
  const features = FEATURES.map((f) => ({ href: `/features/${f.slug}`, name: f.name, short: f.short }));
  const cases = USE_CASES.map((u) => ({ href: `/use-cases/${u.slug}`, name: u.name, short: u.intro.split(".")[0] + "." }));
  const resources = [
    { href: "/tools", name: "Free tools", short: "One-off uptime, SSL and SEO checks." },
    { href: "/blog", name: "Blog", short: "Agency monitoring notes and playbooks." },
    { href: "/guides", name: "Guides", short: "How uptime, SSL and incidents work." },
    { href: "/compare", name: "Compare", short: "Watchfront vs UptimeRobot, Pingdom and more." },
    { href: "/security", name: "Security", short: "How we handle checks and data." },
    { href: "/about", name: "About", short: "Why we built Watchfront." },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur ${
        ink ? "border-cream/10 bg-ink/80" : "border-plum/5 bg-white/90"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:h-16 sm:px-6">
        <div className="shrink-0">
          <Logo light={ink} />
        </div>

        <nav
          aria-label="Main"
          className={`ml-2 hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7 ${
            ink ? "text-cream/70" : "text-plum"
          }`}
        >
          <NavMenu
            label="Product"
            items={PRODUCTS.map((p) => ({ href: `/${p.slug}`, name: p.nav }))}
            all={["Website monitoring overview", "/website-monitoring"]}
          />
          <NavMenu label="Features" items={features} all={["All features", "/features"]} />
          <NavMenu label="Use cases" items={cases} all={["All use cases", "/use-cases"]} wide={false} />
          <NavMenu label="Resources" items={resources} wide />
          <Link href="/contact" className={`whitespace-nowrap text-[14px] ${ink ? "hover:text-cream" : "hover:text-magenta"}`}>
            Contact
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2.5 sm:gap-3">
          <HeaderAuthCtas tone={tone} />
          <details className="relative lg:hidden">
            <summary
              className={`list-none rounded-lg p-2 [&::-webkit-details-marker]:hidden ${ink ? "text-cream" : "text-plum"}`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-full z-50 mt-2 max-h-[min(70vh,28rem)] w-[min(18rem,calc(100vw-2rem))] space-y-0.5 overflow-y-auto rounded-2xl bg-white p-2 text-sm shadow-2xl ring-1 ring-plum/10"
            >
              {[
                ["Website monitoring", "/website-monitoring"],
                ["Features", "/features"],
                ["Use cases", "/use-cases"],
                ["Free tools", "/tools"],
                ["Blog", "/blog"],
                ["Guides", "/guides"],
                ["Compare", "/compare"],
                ["Security", "/security"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([l, h]) => (
                <Link key={h} href={h} className="block rounded-lg px-3 py-2.5 text-plum hover:bg-cream">
                  {l}
                </Link>
              ))}
              <div className="my-1 border-t border-plum/10" />
              <MobileAuthLinks />
            </nav>
          </details>
        </div>
      </div>
      {banner && (
        <div className="bg-magenta px-3 py-2 text-center text-xs text-cream sm:py-2.5 sm:text-sm">
          3-day free trial - every feature, no card required.{" "}
          <BannerAuthCta />
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, [string, string][]][] = [
    ["Product", [
      ...PRODUCTS.map((p) => [p.nav, `/${p.slug}`] as [string, string]),
      ["All features", "/features"],
    ]],
    ["Use cases", [["All use cases", "/use-cases"], ...USE_CASES.map((u) => [u.name, `/use-cases/${u.slug}`] as [string, string])]],
    ["Free tools", [["All free tools", "/tools"], ...TOOLS.map((t) => [t.name, `/tools/${t.slug}`] as [string, string])]],
    ["Resources", [
      ["Blog", "/blog"],
      ...BLOG_POSTS.slice(0, 3).map((p) => [p.nav, `/blog/${p.slug}`] as [string, string]),
      ["Guides", "/guides"],
      ...GUIDES.slice(0, 4).map((g) => [g.nav, `/guides/${g.slug}`] as [string, string]),
      ["Glossary", "/glossary"],
      ...GLOSSARY.slice(0, 4).map((t) => [t.term, `/glossary/${t.slug}`] as [string, string]),
      ["Compare tools", "/compare"],
      ["RSS feed", "/feed.xml"],
    ]],
    ["Company", [["About", "/about"], ["Contact", "/contact"], ["Security", "/security"]]],
    ["Legal", [
      ["Privacy policy", "/privacy"],
      ["Terms of service", "/terms"],
      ["Refund & cancellation", "/refund"],
      ["Shipping & delivery", "/shipping"],
    ]],
  ];
  return (
    <footer className="mt-28 overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-10 border-b border-cream/10 pb-12 lg:grid-cols-[minmax(14rem,17rem)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {SITE.tagline}. Monitor every client website, catch broken forms and errors, and share reports clients understand.
            </p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={`mailto:${SITE.email.hello}`} className="block text-sky hover:underline">{SITE.email.hello}</a>
              <a href={`tel:${SITE.phoneHref}`} className="block text-sky hover:underline">{SITE.phone}</a>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {[cols.slice(0, 3), cols.slice(3)].map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
                {row.map(([title, links]) => (
                  <nav key={title} aria-label={title} className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/45">{title}</div>
                    <ul className="mt-3 space-y-2.5 text-sm leading-snug text-cream/70">
                      {links.map(([l, h]) => (
                        <li key={h}>
                          <Link href={h} className="transition hover:text-sky">{l}</Link>
                        </li>
                      ))}
                    </ul>
                    {title === "Company" && (
                      <div className="mt-2.5 space-y-2.5 text-sm leading-snug text-cream/70">
                        <FooterAuthLinks />
                      </div>
                    )}
                  </nav>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-7 text-xs leading-relaxed text-cream/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
            {SITE.gstin ? ` · GSTIN ${SITE.gstin}` : ""}
          </p>
          <p className="sm:max-w-sm sm:text-right">We don&apos;t promise zero downtime - we promise you&apos;ll know first.</p>
        </div>
      </div>

      <div className="relative border-t border-cream/10" aria-hidden>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_70%_120%,rgba(155,27,103,0.4),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl overflow-hidden px-5 sm:px-6">
          <p className="font-brand select-none whitespace-nowrap pb-0 pt-6 text-[clamp(4.5rem,22vw,12rem)] font-extrabold leading-[0.78] tracking-[-0.08em] text-cream/30 sm:pb-1 sm:pt-8 sm:tracking-[-0.09em]">
            Watchfront
          </p>
        </div>
      </div>
    </footer>
  );
}


export function MarketingShell({ children, banner = false }: { children: React.ReactNode; banner?: boolean }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_50%_-10%,rgba(155,27,103,0.08),transparent_55%),radial-gradient(ellipse_at_90%_20%,rgba(143,211,244,0.12),transparent_45%)]"
      />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-plum focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
      <ScrollProgress />
      <SiteHeader banner={banner} />
      <main id="main" className="pb-16 sm:pb-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
