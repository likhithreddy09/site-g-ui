import { Calendar, Handshake, LifeBuoy, Lock, Mail, MapPin, Phone, Receipt } from "lucide-react";
import Link from "next/link";
import { BookCallForm } from "@/components/BookCallForm";
import { ContactAuthPrompt } from "@/components/marketing/AuthCtas";
import { JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
import { pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Watchfront",
  description: "Talk to us about plans, setup, billing or a short demo. Email, phone, or book a call - we reply from India.",
  path: "/contact",
  keywords: ["contact Watchfront", "Watchfront support", "book a demo"],
  ogTitle: "Contact Watchfront",
  ogDescription: "Sales, support and billing for Watchfront website monitoring.",
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

      <MotionSection className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 rounded-[1.75rem] bg-ink p-5 text-cream sm:grid-cols-3 sm:gap-6 sm:p-7">
          <div className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
            <div className="min-w-0">
              <div className="text-sm font-medium">Phone</div>
              <a href={`tel:${SITE.phoneHref}`} className="mt-1 block text-[15px] text-cream/85 hover:text-sky">{SITE.phone}</a>
              <p className="mt-1 text-xs text-cream/50">Mon-Sat, 10:00-19:00 IST</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
            <div className="min-w-0">
              <div className="text-sm font-medium">Email</div>
              <a href={`mailto:${SITE.email.hello}`} className="mt-1 break-all text-[15px] text-cream/85 hover:text-sky">{SITE.email.hello}</a>
              <p className="mt-1 text-xs text-cream/50">We reply within one business day</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
            <div className="min-w-0">
              <div className="text-sm font-medium">Business</div>
              <p className="mt-1 text-[15px] text-cream/70">
                <strong className="text-cream">{SITE.legalName}</strong>
                {address ? <><br />{address}</> : null}
                {SITE.gstin ? <><br />GSTIN: {SITE.gstin}</> : null}
              </p>
            </div>
          </div>
        </div>
      </MotionSection>

      <section className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <MotionSection className="min-w-0">
          <h2 className="text-xl font-medium text-ink md:text-2xl">What can we help with?</h2>
          <p className="mt-1 text-sm text-plum-2">
            Write to us once at the address above and mention the topic - or book a call below.
          </p>
          <MotionGrid className="mt-5 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((c) => (
              <MotionTile key={c.title}>
                <div className="h-full rounded-2xl bg-cream p-4 ring-1 ring-plum/8 sm:p-5">
                  <c.icon className="h-5 w-5 text-magenta" />
                  <h3 className="mt-3 text-base font-medium text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm text-plum-2">{c.body}</p>
                </div>
              </MotionTile>
            ))}
          </MotionGrid>
          <a
            href="#book"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition hover:bg-ink sm:w-auto"
          >
            <Calendar className="h-4 w-4" /> Book a call
          </a>
        </MotionSection>
        <MotionSection id="book" className="min-w-0 scroll-mt-24 sm:scroll-mt-28" delay={0.08}>
          <BookCallForm />
        </MotionSection>
      </section>

      <MotionSection className="mx-auto mt-14 max-w-6xl px-4 pb-4 sm:px-6">
        <div className="rounded-[1.75rem] bg-cream p-5 text-sm text-plum-2 ring-1 ring-plum/8 sm:p-8">
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
      </MotionSection>
    </MarketingShell>
  );
}
