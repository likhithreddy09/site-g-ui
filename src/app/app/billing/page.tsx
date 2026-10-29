"use client";

import { Suspense } from "react";
import { BillingPanel } from "@/components/BillingPanel";
import { Loading, PageHeader } from "@/components/ui";
import { useApi } from "@/lib/hooks";

function BillingInner() {
  const { data: ws, setData } = useApi<any>("/api/workspace");
  if (!ws) return <Loading rows={4} />;
  return (
    <div>
      <PageHeader
        eyebrow="Billing"
        title="Plan & billing"
        subtitle={`${ws.name} · ${ws.limits?.name || ws.plan} plan`}
      />
      <BillingPanel ws={ws} onSaved={setData} />
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<Loading rows={4} />}>
      <BillingInner />
    </Suspense>
  );
}
