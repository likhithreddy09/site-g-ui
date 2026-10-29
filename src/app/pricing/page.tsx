import { Check } from "lucide-react";
import Link from "next/link";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { COMPARISON, PLANS, PRICING_FAQS } from "@/lib/marketing";
import { faqLd, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Pricing — Website Monitoring Plans for Freelancers & Agencies",
  description: "Simple per-website pricing in INR. Free for 3 websites; Starter ₹1,499, Agency ₹6,499 and Agency Pro ₹16,499 per month. Paid via Cashfree.",
  path: "/pricing",
});

const inr = (n: number) =>
  n === 0 ? "₹0" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export default function PricingPage() {
  return (
    <MarketingShell>
      <JsonLd data={[
        faqLd(PRICING_FAQS),
        {
          "@context": "https://schema.org", "@type": "Product", name: SITE.name, description: SITE.description, brand: { "@type": "Brand", name: SITE.name },
          offers: {
            "@type": "AggregateOffer", priceCurrency: "INR",
            lowPrice: Math.min(...PLANS.map((p) => p.priceInr)), highPrice: Math.max(...PLANS.map((p) => p.priceInr)),
            offerCount: PLANS.length, url: abs("/pricing"),
          },
        },
      ]} />
      <PageHero
        crumbs={[["Home", "/"], ["Pricing", "/pricing"]]}
        eyebrow="Pricing"
        title="Priced for portfolios, not pageviews."
        intro="Pay for the websites you manage. Every plan includes uptime monitoring and email alerts. Browser-test minutes are measured separately and shown before anything runs. Checkout is in INR via Cashfree."
      />

      <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-4" aria-label="Plans">
        {PLANS.map((p) => (
          <div key={p.name} className={`flex flex-col rounded-3xl p-7 ${p.featured ? "bg-ink text-cream shadow-2xl" : "bg-cream text-ink"}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              {p.featured && <span className="rounded-md bg-gold px-2 py-0.5 text-xs font-medium text-ink">Most popular</span>}
            </div>
            <p className={`mt-1 text-sm ${p.featured ? "text-cream/60" : "text-plum-2"}`}>{p.note}</p>
            <div className="mt-6 text-4xl font-semibold">{inr(p.priceInr)}<span className="text-base font-normal opacity-60">/mo</span></div>
            {p.priceInr > 0 && (
              <p className={`mt-1 text-xs ${p.featured ? "text-cream/50" : "text-plum/50"}`}>≈ ${p.price} USD reference</p>
            )}
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {p.features.map((f) => <li key={f} className="flex gap-2"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-sky" : "text-magenta"}`} />{f}</li>)}
            </ul>
            <Link href="/register" className={`mt-8 rounded-full py-3 text-center text-sm font-medium transition ${p.featured ? "bg-cream text-ink hover:bg-sky" : "bg-plum text-cream hover:bg-ink"}`}>
              {p.priceInr === 0 ? "Start free" : `Start with ${p.name}`}
            </Link>
          </div>
        ))}
      </section>
      <p className="mx-auto mt-6 max-w-6xl px-6 text-sm text-plum-2">
        Prices in <strong className="text-ink">INR</strong>, billed monthly via Cashfree. Annual billing saves two months.
        See <Link href="/refund" className="link-underline text-plum">refunds</Link> and <Link href="/shipping" className="link-underline text-plum">delivery</Link>.
        Need more than 200 websites, SSO or custom retention? <Link href="/contact" className="link-underline text-plum">Talk to us about Enterprise</Link>.
      </p>

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="compare">
        <h2 id="compare" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Compare plans</h2>
        <div className="mt-8 overflow-x-auto rounded-3xl ring-1 ring-plum/10">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <caption className="sr-only">Feature comparison across Watchfront plans</caption>
            <thead className="bg-cream text-ink">
              <tr>
                <th scope="col" className="p-4 font-medium">Feature</th>
                {PLANS.map((p) => <th key={p.name} scope="col" className={`p-4 font-semibold ${p.featured ? "text-magenta" : ""}`}>{p.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-plum/8">
              {COMPARISON.map(([label, ...vals]) => (
                <tr key={label}>
                  <th scope="row" className="p-4 font-normal text-plum-2">{label}</th>
                  {vals.map((v, i) => <td key={i} className={`p-4 ${v === "—" ? "text-plum/30" : "text-ink"}`}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FaqList faqs={PRICING_FAQS} />
      <CtaBand title="Start free. Upgrade when it's earned its place." />
    </MarketingShell>
  );
}
