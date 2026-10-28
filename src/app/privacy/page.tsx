import Link from "next/link";
import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "What personal data SiteGuard collects, why we collect it, how long we keep it and the choices you have.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy"
      updated="2026-10-28"
      intro="This policy explains what information SiteGuard collects, how we use it and the choices you have. We collect only what we need to run the service."
      sections={[
        { id: "collect", title: "What we collect", body: <ul><li><strong>Account data:</strong> name, email address, workspace name and encrypted password.</li><li><strong>Monitoring data:</strong> the URLs you add, check results, screenshots, and the configuration of your checks.</li><li><strong>Browser error data:</strong> if you install the optional script, JavaScript error messages, stack traces, page URL, browser and device type from visitors to your sites.</li><li><strong>Usage data:</strong> basic logs of how the app is used, for security and reliability.</li></ul> },
        { id: "use", title: "How we use it", body: <p>To run the checks you configure, send the alerts and reports you ask for, keep the service secure, and improve the product. We do not sell personal data or use it for advertising.</p> },
        { id: "ai", title: "AI-assisted features", body: <p>When you request an AI explanation, the relevant evidence for that incident is sent to our AI provider to generate a summary. Secrets are masked first, and the provider may not use this data to train its models.</p> },
        { id: "sharing", title: "Who we share it with", body: <p>Only with service providers that help us run SiteGuard — hosting, database, email delivery and AI processing — under contracts that limit their use of the data. We may disclose data if required by law.</p> },
        { id: "retention", title: "How long we keep it", body: <p>Monitoring data is kept for your plan&apos;s history period and then deleted automatically. Account data is kept while your account is active and deleted within 30 days of closing it.</p> },
        { id: "rights", title: "Your choices and rights", body: <p>You can access, export, correct or delete your data at any time. Depending on where you live, you may have additional rights under laws such as the GDPR. Email <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a> to make a request.</p> },
        { id: "cookies", title: "Cookies", body: <p>We use only the cookies and local storage needed to keep you signed in. We don&apos;t use advertising or cross-site tracking cookies.</p> },
        { id: "contact", title: "Contact", body: <p>Questions about this policy? Email <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a> or see our <Link href="/security">security page</Link>.</p> },
      ]}
    />
  );
}
