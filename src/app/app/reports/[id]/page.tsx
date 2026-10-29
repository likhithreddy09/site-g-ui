"use client";

import { ArrowLeft, Copy, Link2Off, Mail, Printer, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ReportView } from "@/components/ReportView";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, ChipInput, ErrorBox, Loading, Modal, Textarea } from "@/components/ui";
import { patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { copyText } from "@/lib/clipboard";
import { fmtDate } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: r, reload } = useApi<any>(`/api/reports/${id}`);
  const { data: clients } = useApi<any[]>("/api/clients");
  const { can } = useAuth();
  const toast = useToast();
  const [mailOpen, setMailOpen] = useState(false);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [mailError, setMailError] = useState<string | null>(null);
  const [mailing, setMailing] = useState(false);
  const [copying, setCopying] = useState(false);

  const defaultContact = useMemo(() => {
    if (!r?.client_id || !clients) return "";
    const c = clients.find((x) => x.id === r.client_id);
    return (c?.contact_email || "").trim().toLowerCase();
  }, [r, clients]);

  if (!r) return <Loading rows={5} />;

  const share = async (action: "revoke" | "renew") => {
    await patch(`/api/reports/${id}/share`, { action, days: 30 });
    toast(action === "revoke" ? "Share link revoked" : "New share link created (30 days)");
    reload();
  };

  const copyLink = async () => {
    const url = r.share_url;
    if (!url) {
      toast("No share link to copy");
      return;
    }
    setCopying(true);
    try {
      const ok = await copyText(url);
      toast(ok ? "Link copied" : "Could not copy — select the link and copy manually");
    } finally {
      setCopying(false);
    }
  };

  const openMail = () => {
    setMailError(null);
    setNote("");
    setRecipients(defaultContact ? [defaultContact] : []);
    setMailOpen(true);
  };

  const sendMail = async () => {
    if (!recipients.length) {
      setMailError("Add at least one email address (press Enter after each)");
      return;
    }
    setMailing(true);
    setMailError(null);
    try {
      const res = await post<{ recipients: string[] }>(`/api/reports/${id}/email`, {
        recipients,
        note: note.trim() || undefined,
      });
      toast(`Report emailed to ${res.recipients.join(", ")}`);
      setMailOpen(false);
      reload();
    } catch (e: any) {
      setMailError(e.message || "Could not send email");
    } finally {
      setMailing(false);
    }
  };

  return (
    <div>
      <Link href="/app/reports" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta print:hidden">
        <ArrowLeft className="h-4 w-4" /> Reports
      </Link>
      <Card className="mb-6 flex flex-wrap items-center gap-3 p-4 print:hidden">
        <Badge tone={r.share_active ? "active" : "ignored"}>
          {r.share_active ? "link active" : "link inactive"}
        </Badge>
        {r.share_active ? (
          <>
            <code className="min-w-0 flex-1 truncate rounded-lg bg-cream px-3 py-1.5 font-mono text-xs text-plum select-all">
              {r.share_url}
            </code>
            <span className="text-xs text-plum/55">expires {fmtDate(r.share_expires_at, false)}</span>
            <Button size="sm" variant="secondary" loading={copying} onClick={copyLink}>
              <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
            {can("member") && (
              <Button size="sm" variant="danger" onClick={() => share("revoke")}>
                <Link2Off className="h-3.5 w-3.5" /> Revoke
              </Button>
            )}
          </>
        ) : (
          <span className="flex-1 text-sm text-plum/60">
            This report is private. Create a new read-only link to share it.
          </span>
        )}
        {can("member") && !r.share_active && (
          <Button size="sm" onClick={() => share("renew")}>
            <RefreshCw className="h-3.5 w-3.5" /> Create share link
          </Button>
        )}
        {can("member") && (
          <Button size="sm" variant="secondary" onClick={openMail}>
            <Mail className="h-3.5 w-3.5" /> Email report
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={() => window.print()}>
          <Printer className="h-3.5 w-3.5" /> Print / PDF
        </Button>
      </Card>
      <ReportView data={r.data} />

      <Modal
        open={mailOpen}
        onClose={() => setMailOpen(false)}
        title="Email this report"
        subtitle="Sends a summary plus the share link. Recipients don’t need a Watchfront login."
      >
        <div className="space-y-4">
          <ErrorBox error={mailError} />
          <ChipInput
            label="Recipients"
            values={recipients}
            onChange={setRecipients}
            placeholder="client@agency.com"
            hint="Type an email and press Enter. Client contact is prefilled when available."
          />
          <Textarea
            label="Optional note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Here’s your monthly health report for Bright Law…"
          />
          <p className="text-xs text-plum/55">
            {r.share_active
              ? "We’ll use the current share link."
              : "We’ll create a fresh 30-day share link automatically before sending."}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setMailOpen(false)} disabled={mailing}>
              Cancel
            </Button>
            <Button onClick={sendMail} loading={mailing}>
              <Mail className="h-4 w-4" /> Send email
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
