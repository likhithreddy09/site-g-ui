import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "What personal data Watchfront collects, why we collect it, how long we keep it and the choices you have — including payment data processed by Cashfree.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy"
      updated="2026-10-29"
      intro={`This policy explains what information ${SITE.name} collects, how we use it and the choices you have. We collect only what we need to run the service. The service is operated by ${SITE.legalName}.`}
      sections={[
        {
          id: "controller",
          title: "Who we are",
          body: (
            <p>
              The data controller is <strong>{SITE.legalName}</strong>
              {SITE.tradingAs !== SITE.legalName ? <> (trading as {SITE.tradingAs})</> : null}.
              Website: <a href={SITE.url}>{SITE.url}</a>. Contact:{" "}
              <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a>, phone{" "}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>.
              {SITE.gstin ? <> GSTIN: {SITE.gstin}.</> : null}
            </p>
          ),
        },
        {
          id: "collect",
          title: "What we collect",
          body: (
            <ul>
              <li><strong>Account data:</strong> name, email address, workspace name and encrypted password.</li>
              <li><strong>Billing data:</strong> plan selection, invoices, and payment status. Card/UPI details are entered on {SITE.payments.provider}&apos;s checkout and are not stored on our servers.</li>
              <li><strong>Monitoring data:</strong> the URLs you add, check results, screenshots, and the configuration of your checks.</li>
              <li><strong>Browser error data:</strong> if you install the optional script, JavaScript error messages, stack traces, page URL, browser and device type from visitors to your sites.</li>
              <li><strong>Usage data:</strong> basic logs of how the app is used, for security and reliability.</li>
              <li><strong>Support communications:</strong> emails or calls you send us.</li>
            </ul>
          ),
        },
        {
          id: "payments",
          title: "Payments",
          body: (
            <p>
              Paid subscriptions are processed by <strong>{SITE.payments.provider}</strong> in {SITE.payments.currency}.
              Cashfree may collect and process payment instrument details under its own privacy policy.
              We receive confirmation of payment (order ID, amount, status) to activate your plan. We do not store full card numbers or UPI PINs.
            </p>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          body: (
            <p>
              To run the checks you configure, send the alerts and reports you ask for, process billing, keep the service secure, and improve the product.
              We do not sell personal data or use it for advertising.
            </p>
          ),
        },
        {
          id: "ai",
          title: "AI-assisted features",
          body: (
            <p>
              When you request an AI explanation, the relevant evidence for that incident is sent to our AI provider to generate a summary.
              Secrets are masked first, and the provider may not use this data to train its models.
            </p>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          body: (
            <ul>
              <li>Hosting, database and email delivery providers that help us run the service.</li>
              <li><strong>{SITE.payments.provider}</strong> for payment processing and refunds.</li>
              <li>AI processing providers when you use AI explanations.</li>
              <li>Authorities if required by law.</li>
            </ul>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <p>
              Monitoring data is kept for your plan&apos;s history period and then deleted automatically.
              Account data is kept while your account is active and deleted within 30 days of closing it.
              Billing records may be retained longer as required for tax and dispute resolution (typically up to 8 years in India where applicable).
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your choices and rights",
          body: (
            <p>
              You can access, export, correct or delete your data at any time.
              Depending on where you live, you may have additional rights under laws such as the GDPR or applicable Indian data-protection rules.
              Email <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a> to make a request.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: (
            <p>
              We use only the cookies and local storage needed to keep you signed in and operate checkout.
              We don&apos;t use advertising or cross-site tracking cookies.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about this policy? Email <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a>,
              call <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>, or see our <Link href="/security">security page</Link> and{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
