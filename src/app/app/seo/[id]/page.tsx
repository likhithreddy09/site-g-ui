"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SeoAuditPanel } from "@/components/SeoAuditPanel";
import { useToast } from "@/components/toast";
import { Button, Loading, PageHeader, Toggle } from "@/components/ui";
import { patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/hooks";

export default function SeoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: site, reload, setData } = useApi<any>(`/api/websites/${id}`, { poll: 15000 });
  const [busy, setBusy] = useState(false);
  const { can } = useAuth();
  const toast = useToast();

  const run = async () => {
    setBusy(true);
    try {
      const s = await post<any>(`/api/websites/${id}/check?kind=seo`);
      setData(s);
      toast(`SEO audit complete — score ${s.seo?.score ?? "—"} (${s.seo?.grade || "—"})`);
    } catch (e: any) {
      toast(e.message || "Could not run SEO audit", "error");
    } finally {
      setBusy(false);
    }
  };

  if (!site) return <Loading rows={4} />;

  return (
    <div>
      <Link href="/app/seo" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta">
        <ArrowLeft className="h-4 w-4" /> SEO audits
      </Link>
      <PageHeader
        eyebrow="SEO audit"
        title={site.name}
        subtitle={
          <>
            <a href={site.url} target="_blank" rel="noreferrer" className="font-mono text-xs hover:text-magenta">
              {site.url?.replace(/^https?:\/\//, "")}
            </a>
            {site.client_name ? ` · ${site.client_name}` : ""}
            {" · "}
            <Link href={`/app/websites/${site.id}`} className="text-magenta hover:underline">Website</Link>
          </>
        }
        action={can("member") && (
          <>
            <Toggle
              checked={site.seo_enabled !== false}
              onChange={async (v) => {
                await patch(`/api/websites/${id}`, { seo_enabled: v });
                reload();
                toast(v ? "SEO audit enabled" : "SEO audit disabled");
              }}
              label="Enabled"
            />
            <Button loading={busy} onClick={run} disabled={site.seo_enabled === false}>
              <RefreshCw className="h-4 w-4" /> Run audit
            </Button>
          </>
        )}
      />
      <SeoAuditPanel
        site={site}
        busy={busy}
        canEdit={can("member")}
        onRun={run}
      />
    </div>
  );
}
