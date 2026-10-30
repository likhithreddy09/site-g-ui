import { Calendar, Handshake, LifeBuoy, Lock, Mail, MapPin, Phone, Receipt } from "lucide-react";
import Link from "next/link";
import { BookCallForm } from "@/components/BookCallForm";
import { ContactAuthPrompt } from "@/components/marketing/AuthCtas";
import { JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Watchfront — Website Monitoring Sales & Support India",
  description: "Contact Watchfront for website monitoring sales, support, billing or a demo. Book a call — confirmation emailed instantly. India phone & email support.",
  path: "/contact",
  keywords: ["contact Watchfront", "website monitoring demo India", "agency monitoring sales"],
});

const TOPICS = [
  { icon: Handshake, title: "Sales & agency plans", body: "Plans for 50+ websites, Enterprise, or volume pricing for agencies." },
  { icon: LifeBuoy, title: "Help & support", body: "Questions about setting up checks, alerts or reports." },
  { icon: Receipt, title: "Billing & refunds", body: "Invoices, plan changes, Dodo Payments payments and refund requests." },
  { icon: Lock, title: "Security & privacy", body: "Vulnerabilities, data requests and privacy questions." },
];

export default function ContactPage() {
  const addressBits = [SITE.address.line1, SITE.address.city, SITE.address.country].filter(Boolean);
  // Dedupe accidental "India, India"
  const address = [...new Set(addressBits)].join(", ");

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
          contactPoint: [{
            "@type": "ContactPoint",
            contactType: "customer support",
            email: SITE.email.hello,
            telephone: SITE.phone,
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          }],
        },
      }} />
      <PageHero
        crumbs={[["Home", "/"], ["Contact", "/contact"]]}
        eyebrow="Contact"
        title="Talk to a human."
        intro="Pick the topic closest to your question. Every message is read by the team, and we reply within one business day."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 rounded-3xl bg-cream p-5 sm:grid-cols-3 sm:gap-6 sm:p-7">
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink">Phone</div>
              <a href={`tel:${SITE.phoneHref}`} className="mt-1 block text-[15px] text-plum hover:text-magenta">{SITE.phone}</a>
              <p className="mt-1 text-xs text-plum-2">Mon–Sat, 10:00–19:00 IST</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink">Email</div>
              <a href={`mailto:${SITE.email.hello}`} className="mt-1 break-all text-[15px] text-plum hover:text-magenta">{SITE.email.hello}</a>
              <p className="mt-1 text-xs text-plum-2">We reply within one business day</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink">Business</div>
              <p className="mt-1 text-[15px] text-plum-2">
                <strong className="text-ink">{SITE.legalName}</strong>
                {address ? <><br />{address}</> : null}
                {SITE.gstin ? <><br />GSTIN: {SITE.gstin}</> : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-xl font-semibold text-ink md:text-2xl">What can we help with?</h2>
          <p className="mt-1 text-sm text-plum-2">
            Write to us once at the address above and mention the topic — or book a call below.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((c) => (
              <div key={c.title} className="rounded-2xl bg-cream p-4 sm:p-5">
                <c.icon className="h-5 w-5 text-magenta" />
                <h3 className="mt-3 text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm text-plum-2">{c.body}</p>
              </div>
            ))}
          </div>
          <a
            href="#book"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition hover:bg-ink sm:w-auto"
          >
            <Calendar className="h-4 w-4" /> Book a call
          </a>
        </div>
        <div id="book" className="scroll-mt-24 sm:scroll-mt-28">
          <BookCallForm />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-3xl border border-plum/10 p-5 text-sm text-plum-2 sm:p-8">
          Policies: <Link href="/privacy" className="link-underline font-medium text-plum">Privacy</Link>
          {" · "}
          <Link href="/terms" className="link-underline font-medium text-plum">Terms</Link>
          {" · "}
          <Link href="/refund" className="link-underline font-medium text-plum">Refunds</Link>
          {" · "}
          <Link href="/shipping" className="link-underline font-medium text-plum">Delivery</Link>
          {" · "}
          <Link href="/pricing" className="link-underline font-medium text-plum">Pricing</Link>
          <ContactAuthPrompt />
        </div>
      </section>
    </MarketingShell>
  );
}
