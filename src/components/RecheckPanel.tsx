"use client";

import { CheckCircle2, ChevronDown, Loader2, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "./toast";
import { Button, Card, cn } from "./ui";
import { post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { explainError } from "@/lib/errorExplain";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export function RecheckPanel({ site, onDone }: { site: any; onDone?: () => void }) {
  const { data: scan, setData } = useApi<any>(`/api/websites/${site.id}/recheck`);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { can } = useAuth();
  const toast = useToast();

  const run = async () => {
    setBusy(true);
    try {
      const r = await post(`/api/websites/${site.id}/recheck`);
      setData(r);
      setOpen(true);
      onDone?.();
      toast(r.status === "failed" ? `Re-check failed: ${r.error}` : r.found.length ? `${r.found.length} problem${r.found.length > 1 ? "s" : ""} found` : "No errors found", r.status === "failed" || r.found.length ? "error" : "ok");
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(false);
    }
  };

  const found: any[] = scan?.found || [];
  const clean = scan && scan.status === "done" && !found.length;
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="flex flex-wrap items-center gap-4 px-5 py-4">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl", busy ? "bg-sky/20 text-teal" : !scan ? "bg-cream-2 text-magenta" : clean ? "bg-ok/10 text-ok" : "bg-bad/10 text-bad")}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : !scan || clean ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-ink">
            {busy ? `Checking ${site.name} in a real browser…` : !scan ? `Check ${site.name} for errors now` : scan.status === "failed" ? "The last re-check couldn't finish"
              : clean ? `No errors on ${scan.pages.length} page${scan.pages.length > 1 ? "s" : ""}` : `${found.length} problem${found.length > 1 ? "s" : ""} on ${new Set(found.map((f) => f.page)).size} page${new Set(found.map((f) => f.page)).size > 1 ? "s" : ""}`}
          </div>
          <div className="text-xs text-plum/60">
            {busy ? "Opening the homepage and up to 4 important pages - about 20-40 seconds." : !scan
              ? "We open the site like a visitor and record JavaScript errors, missing files and failing API calls. Works even without the script installed."
              : <>Last re-check {timeAgo(scan.at)}{scan.by ? ` by ${scan.by}` : ""} · {scan.duration_sec}s{scan.fixed?.length ? <span className="text-ok"> · {scan.fixed.length} fixed since last time</span> : null}{scan.error ? <span className="text-bad"> · {scan.error}</span> : null}</>}
          </div>
        </div>
        {scan && !busy && <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1 text-xs text-plum/60 hover:text-magenta">Details <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} /></button>}
        {can("member") && <Button onClick={run} loading={busy}><RefreshCw className="h-4 w-4" /> {scan ? "Re-check now" : "Check now"}</Button>}
      </div>
      {open && scan && !busy && (
        <div className="grid gap-5 border-t border-plum/8 px-5 py-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold text-ink">Pages visited</div>
            <ul className="space-y-1.5 text-xs">
              {scan.pages.map((p: any) => (
                <li key={p.url} className="flex items-center gap-2">
                  {p.error ? <XCircle className="h-3.5 w-3.5 shrink-0 text-bad" /> : p.problems ? <XCircle className="h-3.5 w-3.5 shrink-0 text-[#8a5b00]" /> : <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-ok" />}
                  <a href={p.url} target="_blank" rel="noreferrer" className="truncate text-plum/80 hover:text-magenta">{p.url.replace(/^https?:\/\//, "")}</a>
                  <span className="ml-auto whitespace-nowrap text-plum/50">{p.error ? p.error : p.problems ? `${p.problems} problem${p.problems > 1 ? "s" : ""}` : "clean"}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {found.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-semibold text-ink">Found</div>
                <ul className="space-y-1.5 text-xs">
                  {found.map((f, i) => (
                    <li key={i}><Link href={`/app/errors/${f.group_id}`} className="text-ink hover:text-magenta">{explainError(f).title}</Link>{f.new && <span className="ml-1.5 rounded bg-magenta/10 px-1 text-[10px] text-magenta">new</span>}</li>
                  ))}
                </ul>
              </div>
            )}
            {scan.fixed?.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-semibold text-ok">Fixed - no longer happening (marked resolved)</div>
                <ul className="space-y-1 text-xs text-plum/70">{scan.fixed.map((f: any) => <li key={f.group_id}>✓ {explainError(f).title}</li>)}</ul>
              </div>
            )}
            {scan.not_reproduced?.length > 0 && (
              <div>
                <div className="mb-2 text-xs font-semibold text-ink">Didn&apos;t happen this time</div>
                <p className="mb-1 text-[11px] text-plum/55">Real visitors reported these, so we leave them open - they may depend on the browser, device or login.</p>
                <ul className="space-y-1 text-xs text-plum/70">{scan.not_reproduced.map((f: any) => <li key={f.group_id}><Link href={`/app/errors/${f.group_id}`} className="hover:text-magenta">• {explainError(f).title}</Link></li>)}</ul>
              </div>
            )}
            {!found.length && !scan.fixed?.length && !scan.not_reproduced?.length && scan.status === "done" && <p className="text-xs text-plum/60">Nothing to report - every page loaded without errors.</p>}
          </div>
        </div>
      )}
    </Card>
  );
}
