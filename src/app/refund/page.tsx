import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Refund & Cancellation Policy",
  description: "How Watchfront handles subscription cancellations, refunds and failed payments for plans billed via Dodo Payments.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & cancellation policy"
      path="/refund"
      updated="2026-10-29"
      intro="This policy explains how cancellations and refunds work for Watchfront subscriptions. Payments are processed in INR through Dodo Payments."
      sections={[
        {
          id: "service",
          title: "What you are buying",
          body: (
            <p>
              Watchfront is a <strong>digital software subscription</strong> (SaaS). You get access to website monitoring, alerts and reporting for the plan you choose.
              There is no physical product. See <Link href="/pricing">pricing</Link> for current plans and INR amounts.
            </p>
          ),
        },
        {
          id: "billing",
          title: "Billing cycle",
          body: (
            <ul>
              <li>Paid plans are billed <strong>in advance</strong> for each billing period (monthly by default; annual where offered).</li>
              <li>Charges are in <strong>Indian Rupees (INR)</strong> via {SITE.payments.provider}.</li>
              <li>Your invoice/receipt is issued for the registered business: <strong>{SITE.legalName}</strong>.</li>
            </ul>
          ),
        },
        {
          id: "cancel",
          title: "Cancellation",
          body: (
            <ul>
              <li>You can cancel a paid plan at any time from <strong>Settings → Plan &amp; usage</strong>, or by emailing <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a>.</li>
              <li>Cancellation stops the <strong>next</strong> renewal. You keep access until the end of the period already paid for.</li>
              <li>Downgrades take effect at the end of the current paid period unless we apply an immediate change at your request.</li>
            </ul>
          ),
        },
        {
          id: "refunds",
          title: "Refunds",
          body: (
            <ul>
              <li>
                <strong>Within 7 days of first paid purchase:</strong> if you have not substantially used the paid features (for example, you upgraded by mistake),
                email <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a> and we will issue a full refund to the original payment method.
              </li>
              <li>
                <strong>After 7 days, or after substantial use:</strong> subscription fees are generally <strong>non-refundable</strong> for the remainder of the billing period.
                We may offer a credit or prorated adjustment at our discretion for prolonged outages on our side.
              </li>
              <li>
                <strong>Duplicate / failed charges:</strong> contact us with the Dodo Payments order / payment ID. Verified duplicate successful charges are refunded in full.
              </li>
              <li>
                Refunds, once approved, are initiated via Dodo Payments and typically appear in 5–7 business days depending on your bank or UPI app.
              </li>
            </ul>
          ),
        },
        {
          id: "failed",
          title: "Failed or incomplete payments",
          body: (
            <p>
              If a checkout is abandoned or a payment fails, no plan upgrade is applied. You can retry from billing settings.
              Partial authorisations that do not complete are not charged as a successful subscription.
            </p>
          ),
        },
        {
          id: "howto",
          title: "How to request a refund",
          body: (
            <ol className="list-decimal space-y-2 pl-5">
              <li>Email <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a> from your account email.</li>
              <li>Include workspace name, plan, payment date, and Dodo Payments order ID (from your receipt or payment email).</li>
              <li>We respond within one business day and process eligible refunds promptly.</li>
            </ol>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Billing &amp; refunds: <a href={`mailto:${SITE.email.billing}`}>{SITE.email.billing}</a>
              {" · "}
              Phone: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              {" · "}
              <Link href="/contact">Contact us</Link>
              {" · "}
              <Link href="/terms">Terms of service</Link>
            </p>
          ),
        },
      ]}
    />
  );
}
