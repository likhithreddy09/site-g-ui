"use client";

import { ArrowLeft, Copy, Link2Off, Printer, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReportView } from "@/components/ReportView";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Loading } from "@/components/ui";
import { patch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: r, reload } = useApi<any>(`/api/reports/${id}`);
  const { can } = useAuth();
  const toast = useToast();
  if (!r) return <Loading rows={5} />;
  const share = async (action: "revoke" | "renew") => {
    await patch(`/api/reports/${id}/share`, { action, days: 30 });
    toast(action === "revoke" ? "Share link revoked" : "New share link created (30 days)");
    reload();
  };
  return (
    <div>
      <Link href="/app/reports" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta print:hidden"><ArrowLeft className="h-4 w-4" /> Reports</Link>
      <Card className="mb-6 flex flex-wrap items-center gap-3 p-4 print:hidden">
        <Badge tone={r.share_active ? "active" : "ignored"}>{r.share_active ? "link active" : "link inactive"}</Badge>
        {r.share_active ? (
          <>
            <code className="flex-1 truncate rounded-lg bg-cream px-3 py-1.5 font-mono text-xs text-plum">{r.share_url}</code>
            <span className="text-xs text-plum/55">expires {fmtDate(r.share_expires_at, false)}</span>
            <Button size="sm" variant="secondary" onClick={() => { navigator.clipboard.writeText(r.share_url); toast("Link copied"); }}><Copy className="h-3.5 w-3.5" /> Copy</Button>
            {can("member") && <Button size="sm" variant="danger" onClick={() => share("revoke")}><Link2Off className="h-3.5 w-3.5" /> Revoke</Button>}
          </>
        ) : <span className="flex-1 text-sm text-plum/60">This report is private. Create a new read-only link to share it.</span>}
        {can("member") && !r.share_active && <Button size="sm" onClick={() => share("renew")}><RefreshCw className="h-3.5 w-3.5" /> Create share link</Button>}
        <Button size="sm" variant="ghost" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print / PDF</Button>
      </Card>
      <ReportView data={r.data} />
    </div>
  );
}
