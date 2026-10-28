"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReportView } from "@/components/ReportView";
import { Spinner } from "@/components/ui";
import { api } from "@/lib/api";

export default function PublicReport() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api(`/api/public/reports/${token}`, { auth: false }).then(setData).catch((e) => setError(e.message));
  }, [token]);
  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {error ? (
          <div className="mx-auto mt-24 max-w-md rounded-3xl bg-white p-10 text-center ring-1 ring-plum/10">
            <h1 className="text-xl font-semibold text-ink">Report unavailable</h1>
            <p className="mt-2 text-sm text-plum/65">{error}</p>
          </div>
        ) : data ? <ReportView data={data.data} /> : <div className="flex justify-center pt-32"><Spinner className="h-8 w-8" /></div>}
      </div>
    </div>
  );
}
