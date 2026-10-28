import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Service",
  description: "The terms that apply when you use SiteGuard website monitoring and automated QA.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      path="/terms"
      updated="2026-10-28"
      intro="These terms apply when you create a SiteGuard account or use the service. They're written to be readable — if anything is unclear, ask us."
      sections={[
        { id: "account", title: "Your account", body: <p>You must provide accurate information and keep your login details safe. You&apos;re responsible for activity in your workspace, including members you invite.</p> },
        { id: "authorised", title: "Only monitor sites you're allowed to", body: <p>You may only add websites, APIs and forms that you own or have permission to test. Journey and form tests interact with live websites, so you&apos;re responsible for confirming a test is safe to run.</p> },
        { id: "acceptable-use", title: "Acceptable use", body: <ul><li>Don&apos;t use SiteGuard to load-test, attack or overwhelm any website.</li><li>Don&apos;t attempt to bypass plan limits, access other workspaces or probe our infrastructure.</li><li>Don&apos;t use the service for anything unlawful.</li></ul> },
        { id: "billing", title: "Plans and billing", body: <p>Paid plans are billed in advance, monthly or annually. You can upgrade, downgrade or cancel at any time; changes are prorated. See <Link href="/pricing">pricing</Link> for current plans.</p> },
        { id: "availability", title: "Availability", body: <p>We work hard to keep SiteGuard reliable, but monitoring can&apos;t guarantee that every issue on every website will be detected. SiteGuard is a tool to help you find problems sooner — not a guarantee against downtime or loss.</p> },
        { id: "data", title: "Your data", body: <p>You own the data you put into SiteGuard. We process it only to provide the service, as described in our <Link href="/privacy">privacy policy</Link>.</p> },
        { id: "liability", title: "Limitation of liability", body: <p>To the extent permitted by law, our total liability is limited to the amount you paid us in the 12 months before the claim. We aren&apos;t liable for indirect or consequential losses.</p> },
        { id: "changes", title: "Changes and contact", body: <p>We&apos;ll notify you of material changes to these terms by email before they take effect. Questions? Email <a href={`mailto:${SITE.email.hello}`}>{SITE.email.hello}</a>.</p> },
      ]}
    />
  );
}
