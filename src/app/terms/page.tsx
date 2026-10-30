import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Service — Watchfront Website Monitoring",
  description: "Terms for using Watchfront website monitoring and automated QA for agencies, including INR billing via Cashfree.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      path="/terms"
      updated="2026-10-29"
      intro={`These terms apply when you create a ${SITE.name} account or use the service operated by ${SITE.legalName}. If anything is unclear, ask us.`}
      sections={[
        {
          id: "agreement",
          title: "Agreement",
          body: (
            <p>
              By creating an account or paying for a plan you agree to these terms, our{" "}
              <Link href="/privacy">privacy policy</Link>, and our{" "}
              <Link href="/refund">refund &amp; cancellation policy</Link>.
            </p>
          ),
        },
        {
          id: "account",
          title: "Your account",
          body: (
            <p>
              You must provide accurate information and keep your login details safe.
              You&apos;re responsible for activity in your workspace, including members you invite.
            </p>
          ),
        },
        {
          id: "authorised",
          title: "Only monitor sites you're allowed to",
          body: (
            <p>
              You may only add websites, APIs and forms that you own or have permission to test.
              Journey and form tests interact with live websites, so you&apos;re responsible for confirming a test is safe to run.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: (
            <ul>
              <li>Don&apos;t use {SITE.name} to load-test, attack or overwhelm any website.</li>
              <li>Don&apos;t attempt to bypass plan limits, access other workspaces or probe our infrastructure.</li>
              <li>Don&apos;t use the service for anything unlawful or for goods/services prohibited by payment partners.</li>
            </ul>
          ),
        },
        {
          id: "billing",
          title: "Plans and billing",
          body: (
            <ul>
              <li>Paid plans are billed in advance in <strong>INR</strong> through <strong>{SITE.payments.provider}</strong>. See <Link href="/pricing">pricing</Link>.</li>
              <li>You can upgrade, downgrade or cancel as described in the <Link href="/refund">refund &amp; cancellation policy</Link>.</li>
              <li>Taxes (including GST where applicable) may be added as required by law.</li>
              <li>Invoices are issued under <strong>{SITE.legalName}</strong>.</li>
            </ul>
          ),
        },
        {
          id: "delivery",
          title: "Delivery of service",
          body: (
            <p>
              Access is delivered digitally upon successful payment. There is no physical shipping.
              Details are in our <Link href="/shipping">shipping &amp; delivery policy</Link>.
            </p>
          ),
        },
        {
          id: "availability",
          title: "Availability",
          body: (
            <p>
              We work hard to keep {SITE.name} reliable, but monitoring can&apos;t guarantee that every issue on every website will be detected.
              {SITE.name} is a tool to help you find problems sooner — not a guarantee against downtime or loss.
            </p>
          ),
        },
        {
          id: "data",
          title: "Your data",
          body: (
            <p>
              You own the data you put into {SITE.name}. We process it only to provide the service, as described in our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, our total liability is limited to the amount you paid us in the 12 months before the claim.
              We aren&apos;t liable for indirect or consequential losses.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Courts in India shall have exclusive jurisdiction, subject to mandatory consumer protections that may apply where you live.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes and contact",
          body: (
            <p>
              We&apos;ll notify you of material changes to these terms by email before they take effect.
              Questions? Email <a href={`mailto:${SITE.email.hello}`}>{SITE.email.hello}</a> or call{" "}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
