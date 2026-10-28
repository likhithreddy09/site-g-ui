import { Handshake, LifeBuoy, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact SiteGuard — Sales, Support & Agency Pilot",
  description: "Get in touch with the SiteGuard team about sales, the agency pilot programme, support, security or privacy. We reply within one business day.",
  path: "/contact",
});

const CHANNELS = [
  { icon: Handshake, title: "Sales & agency pilot", body: "Plans for 50+ websites, Enterprise, or joining the 60-day agency pilot.", email: SITE.email.sales },
  { icon: LifeBuoy, title: "Help & support", body: "Questions about setting up checks, alerts or reports.", email: SITE.email.hello },
  { icon: Lock, title: "Security", body: "Report a vulnerability or ask about how we protect your data.", email: SITE.email.security },
  { icon: Mail, title: "Privacy", body: "Data requests, deletion and anything covered by our privacy policy.", email: SITE.email.privacy },
];

export default function ContactPage() {
  return (
    <MarketingShell>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ContactPage", url: abs("/contact"),
        mainEntity: { "@type": "Organization", name: SITE.name, contactPoint: CHANNELS.map((c) => ({ "@type": "ContactPoint", contactType: c.title, email: c.email })) },
      }} />
      <PageHero
        crumbs={[["Home", "/"], ["Contact", "/contact"]]}
        eyebrow="Contact"
        title="Talk to a human."
        intro="Pick the topic closest to your question. Every message is read by the team, and we reply within one business day."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
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
          Rather try it first? <Link href="/register" className="link-underline font-medium text-plum">Create a free account</Link> — 3 websites, no credit card. Already a customer? <Link href="/login" className="link-underline font-medium text-plum">Sign in</Link>.
        </div>
      </section>
    </MarketingShell>
  );
}
