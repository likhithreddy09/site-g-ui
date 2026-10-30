import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Shipping & Delivery Policy",
  description: "Watchfront is a digital SaaS product. This page explains how access is delivered after purchase — there is no physical shipping.",
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & delivery policy"
      path="/shipping"
      updated="2026-10-29"
      intro="Watchfront is a cloud software service. We do not ship physical goods. This page describes how digital access is delivered after you subscribe."
      sections={[
        {
          id: "nature",
          title: "Nature of the product",
          body: (
            <ul>
              <li>Watchfront provides <strong>online website monitoring and automated QA</strong> accessed via our website.</li>
              <li>There is <strong>no physical product</strong>, packaging, or courier delivery.</li>
              <li>No shipping charges apply.</li>
            </ul>
          ),
        },
        {
          id: "delivery",
          title: "How access is delivered",
          body: (
            <ul>
              <li>After a successful payment through {SITE.payments.provider}, your workspace plan is upgraded <strong>immediately</strong> (typically within a few minutes of confirmation).</li>
              <li>You access the service by signing in at <Link href="/login">{SITE.url}/login</Link>.</li>
              <li>A payment confirmation / receipt is sent to the email on your account (and via Dodo Payments where applicable).</li>
            </ul>
          ),
        },
        {
          id: "timing",
          title: "Delivery timeline",
          body: (
            <p>
              Digital access is delivered <strong>instantly</strong> upon successful payment confirmation.
              If your plan does not update within 30 minutes of a successful charge, contact{" "}
              <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a> with your Dodo Payments order ID.
            </p>
          ),
        },
        {
          id: "geography",
          title: "Service availability",
          body: (
            <p>
              The service is delivered online and can be used from anywhere with an internet connection, subject to our{" "}
              <Link href="/terms">terms of service</Link>. Checkout and settlements for Indian merchants are processed in INR via Dodo Payments.
            </p>
          ),
        },
        {
          id: "issues",
          title: "Delivery issues",
          body: (
            <p>
              If you paid but cannot access paid features, email <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a> or call{" "}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>. See also our <Link href="/refund">refund &amp; cancellation policy</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
