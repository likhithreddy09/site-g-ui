import { Handshake, LifeBuoy, Lock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Watchfront — Sales, Support & Billing",
  description: "Get in touch with Watchfront about sales, support, billing, security or privacy. Email and phone listed for Cashfree / customer support.",
  path: "/contact",
});

const CHANNELS = [
  { icon: Handshake, title: "Sales & agency pilot", body: "Plans for 50+ websites, Enterprise, or joining the 60-day agency pilot.", email: SITE.email.sales },
  { icon: LifeBuoy, title: "Help & support", body: "Questions about setting up checks, alerts or reports.", email: SITE.email.hello },
  { icon: Mail, title: "Billing & refunds", body: "Invoices, plan changes, Cashfree payments and refund requests.", email: SITE.email.billing },
  { icon: Lock, title: "Security & privacy", body: "Vulnerabilities, data requests and privacy questions.", email: SITE.email.privacy },
];

export default function ContactPage() {
  const addressBits = [SITE.address.line1, SITE.address.city, SITE.address.country].filter(Boolean).join(", ");

  return (
    <MarketingShell>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ContactPage", url: abs("/contact"),
        mainEntity: {
          "@type": "Organization",
          name: SITE.legalName,
          alternateName: SITE.name,
          email: SITE.email.hello,
          telephone: SITE.phone,
          url: SITE.url,
          contactPoint: [
            { "@type": "ContactPoint", contactType: "customer support", email: SITE.email.hello, telephone: SITE.phone, areaServed: "IN", availableLanguage: ["English", "Hindi"] },
            { "@type": "ContactPoint", contactType: "sales", email: SITE.email.sales, telephone: SITE.phone },
            { "@type": "ContactPoint", contactType: "billing support", email: SITE.email.billing, telephone: SITE.phone },
          ],
        },
      }} />
      <PageHero
        crumbs={[["Home", "/"], ["Contact", "/contact"]]}
        eyebrow="Contact"
        title="Talk to a human."
        intro="Pick the topic closest to your question. Every message is read by the team, and we reply within one business day."
      />

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 rounded-3xl bg-cream p-7 sm:grid-cols-3">
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div>
              <div className="text-sm font-medium text-ink">Phone</div>
              <a href={`tel:${SITE.phoneHref}`} className="mt-1 block text-[15px] text-plum hover:text-magenta">{SITE.phone}</a>
              <p className="mt-1 text-xs text-plum-2">Mon–Sat, 10:00–19:00 IST</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div>
              <div className="text-sm font-medium text-ink">Email</div>
              <a href={`mailto:${SITE.email.hello}`} className="mt-1 block text-[15px] text-plum hover:text-magenta">{SITE.email.hello}</a>
              <p className="mt-1 text-xs text-plum-2">We reply within one business day</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div>
              <div className="text-sm font-medium text-ink">Business</div>
              <p className="mt-1 text-[15px] text-plum-2">
                <strong className="text-ink">{SITE.legalName}</strong>
                {addressBits ? <><br />{addressBits}</> : null}
                {SITE.gstin ? <><br />GSTIN: {SITE.gstin}</> : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <a key={c.title} href={`mailto:${c.email}`} className="group rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
            <c.icon className="h-6 w-6 text-magenta" />
            <h2 className="mt-5 text-xl font-semibold text-ink">{c.title}</h2>
            <p className="mt-2 text-[15px] text-plum-2">{c.body}</p>
            <span className="mt-5 inline-block font-medium text-plum group-hover:text-magenta">{c.email}</span>
          </a>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="rounded-3xl border border-plum/10 p-8 text-[15px] text-plum-2">
          Policies: <Link href="/privacy" className="link-underline font-medium text-plum">Privacy</Link>
          {" · "}
          <Link href="/terms" className="link-underline font-medium text-plum">Terms</Link>
          {" · "}
          <Link href="/refund" className="link-underline font-medium text-plum">Refunds</Link>
          {" · "}
          <Link href="/shipping" className="link-underline font-medium text-plum">Delivery</Link>
          {" · "}
          <Link href="/pricing" className="link-underline font-medium text-plum">Pricing (INR)</Link>
          <br />
          <span className="mt-3 inline-block">
            Rather try it first? <Link href="/register" className="link-underline font-medium text-plum">Create a free account</Link> — 3 websites, no credit card.
            Already a customer? <Link href="/login" className="link-underline font-medium text-plum">Sign in</Link>.
          </span>
        </div>
      </section>
    </MarketingShell>
  );
}
