import { Calendar, Handshake, LifeBuoy, Lock, Mail, MapPin, Phone, Receipt } from "lucide-react";
import Link from "next/link";
import { BookCallForm } from "@/components/BookCallForm";
import { ContactAuthPrompt } from "@/components/marketing/AuthCtas";
import {
  JsonLd,
  MarketingShell,
  MotionGrid,
  MotionSection,
  MotionTile,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing/Site";
import { pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Watchfront - Sales, Support & Demo Calls",
  description:
    "Contact Watchfront for website monitoring sales, agency portfolio setup, support or a demo. Email, phone, or book a call - we reply from India.",
  path: "/contact",
  keywords: [
    "contact Watchfront",
    "Watchfront support",
    "website monitoring demo",
    "agency monitoring sales India",
    "book a demo",
  ],
  ogTitle: "Contact Watchfront - Sales, Support & Demo Calls",
  ogDescription: "Sales, support and billing for Watchfront website monitoring in India.",
  image: "/contact/opengraph-image",
});

const TOPICS = [
  { icon: Handshake, title: "Sales & agency plans", body: "Plans for 50+ websites, Enterprise, or volume pricing for agencies." },
  { icon: LifeBuoy, title: "Help & support", body: "Questions about setting up checks, alerts or reports." },
  { icon: Receipt, title: "Billing & refunds", body: "Invoices, plan changes, Dodo Payments payments and refund requests." },
  { icon: Lock, title: "Security & privacy", body: "Vulnerabilities, data requests and privacy questions." },
];

export default function ContactPage() {
  const addressBits = [SITE.address.line1, SITE.address.city, SITE.address.country].filter(Boolean);
  const address = [...new Set(addressBits)].join(", ");

  return (
    <MarketingShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: abs("/contact"),
          mainEntity: {
            "@type": "Organization",
            name: SITE.legalName,
            alternateName: SITE.name,
            email: SITE.email.hello,
            telephone: SITE.phone,
            url: SITE.url,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: SITE.email.hello,
                telephone: SITE.phone,
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
            ],
          },
        }}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Contact", "/contact"]]}
        eyebrow="Contact"
        title="Talk to a human."
        intro="Pick the topic closest to your question. Every message is read by the team, and we reply within one business day."
      />

      <PageSection className="!mt-10 sm:!mt-12">
        <MotionSection>
          <div className="grid gap-6 overflow-hidden rounded-[1.75rem] bg-ink p-6 text-cream sm:grid-cols-3 sm:gap-8 sm:p-8">
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">Phone</div>
                <a href={`tel:${SITE.phoneHref}`} className="mt-2 block text-[15px] text-cream/90 transition hover:text-sky">
                  {SITE.phone}
                </a>
                <p className="mt-1 text-xs text-cream/50">Mon-Sat, 10:00-19:00 IST</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">Email</div>
                <a href={`mailto:${SITE.email.hello}`} className="mt-2 block break-all text-[15px] text-cream/90 transition hover:text-sky">
                  {SITE.email.hello}
                </a>
                <p className="mt-1 text-xs text-cream/50">We reply within one business day</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">Business</div>
                <p className="mt-2 text-[15px] text-cream/75">
                  <strong className="font-medium text-cream">{SITE.legalName}</strong>
                  {address ? (
                    <>
                      <br />
                      {address}
                    </>
                  ) : null}
                  {SITE.gstin ? (
                    <>
                      <br />
                      GSTIN: {SITE.gstin}
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </MotionSection>
      </PageSection>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
          <MotionSection className="min-w-0">
            <SectionHeader
              eyebrow="Topics"
              title="What can we help with?"
              description="Write once and mention the topic — or book a call."
            />
            <MotionGrid className="mt-8 divide-y divide-plum/10 border-y border-plum/10" stagger={0.06}>
              {TOPICS.map((c) => (
                <MotionTile key={c.title}>
                  <div className="flex gap-4 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink text-sky">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-medium text-ink">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-plum-2">{c.body}</p>
                    </div>
                  </div>
                </MotionTile>
              ))}
            </MotionGrid>
            <a
              href="#book"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-medium text-cream transition hover:bg-ink"
            >
              <Calendar className="h-4 w-4" /> Book a call
            </a>
          </MotionSection>
          <MotionSection id="book" className="min-w-0 scroll-mt-24 sm:scroll-mt-28" delay={0.08}>
            <BookCallForm />
          </MotionSection>
        </div>
      </PageSection>

      <PageSection>
        <MotionSection>
          <div className="border-t border-plum/10 pt-8 text-sm text-plum-2">
            Policies:{" "}
            <Link href="/privacy" className="link-underline font-medium text-plum">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="link-underline font-medium text-plum">
              Terms
            </Link>
            {" · "}
            <Link href="/refund" className="link-underline font-medium text-plum">
              Refunds
            </Link>
            {" · "}
            <Link href="/shipping" className="link-underline font-medium text-plum">
              Delivery
            </Link>
            <ContactAuthPrompt />
          </div>
        </MotionSection>
      </PageSection>
    </MarketingShell>
  );
}
