"use client";

import { WaitlistButton } from "@/components/TrialLock";
import { Card, PageHeader } from "@/components/ui";

export default function BillingPage() {
  return (
    <div>
      <PageHeader eyebrow="Access" title="Join the waitlist" subtitle="Paid plans aren't open yet. Tell us you want Watchfront and we'll reach out personally." />
      <Card className="max-w-md p-6">
        <p className="text-sm leading-relaxed text-plum-2">
          Every workspace gets a 3-day free trial with every feature. If it earns its place, join the waitlist - early members get first access when we open up.
        </p>
        <WaitlistButton className="mt-5" />
      </Card>
    </div>
  );
}
