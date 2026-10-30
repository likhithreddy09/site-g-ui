"use client";

import { AlertTriangle, BellRing, CheckCircle2, Clock, MousePointerClick, Plus, ScanEye, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageCheckWizard, freqLabel } from "@/components/PageCheckWizard";
import { useToast } from "@/components/toast";
import { Button, Card, Empty, Loading, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";
import { checkStatus } from "@/lib/pageChecks";

const TONE = {
  ok: { icon: CheckCircle2, cls: "bg-ok text-white" },
  bad: { icon: XCircle, cls: "bg-bad text-white" },
  warn: { icon: AlertTriangle, cls: "bg-gold text-ink" },
  info: { icon: Clock, cls: "bg-plum/80 text-cream" },
} as const;

export default function ChecksPage() {
  const { data, loading, reload } = useApi<any[]>("/api/page-checks", { poll: 30000 });
  const [creating, setCreating] = useState(false);
  const { can } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const review = data?.filter((c) => c.pending_changes > 0).length || 0;
  const failing = data?.filter((c) => c.status === "failing").length || 0;

  return (
    <div>
      <PageHeader eyebrow="Automated QA" title="Content & visual checks"
        subtitle="Make sure important pages keep their key words, still look right, and have no broken links."
        action={can("member") && <Button onClick={() => setCreating(true)}><Plus className="h-4 w-4" /> Watch a page</Button>} />

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {[
          [MousePointerClick, "1. Pick what matters", "Open a page and tick the words, buttons and parts that must always be there."],
          [ScanEye, "2. We check it for you", "On a schedule we look for missing content, broken links and changes in how it looks."],
          [BellRing, "3. You decide", "Missing content alerts the team. Look changes wait for you: on purpose, or a problem?"],
        ].map(([Icon, title, body]: any) => (
          <div key={title} className="flex gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-plum/8">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cream-2 text-magenta"><Icon className="h-4 w-4" /></span>
            <div><div className="text-sm font-semibold text-ink">{title}</div><div className="text-xs text-plum/65">{body}</div></div>
          </div>
        ))}
      </div>

      {(review > 0 || failing > 0) && (
        <div className="mb-5 flex flex-wrap gap-2 text-sm">
          {failing > 0 && <span className="rounded-full bg-bad/10 px-3 py-1 font-medium text-bad">{failing} page{failing > 1 ? "s have" : " has"} a problem</span>}
          {review > 0 && <span className="rounded-full bg-gold/20 px-3 py-1 font-medium text-[#8a5b00]">{review} page{review > 1 ? "s need" : " needs"} your review</span>}
        </div>
      )}

      {loading && !data ? <Loading rows={3} /> : !data?.length ? (
        <Empty icon={<ScanEye className="h-6 w-6" />} title="No pages watched yet"
          body="Pick a client's homepage or landing page. We'll suggest what to watch - it takes about a minute."
          action={can("member") && <Button onClick={() => setCreating(true)}><Plus className="h-4 w-4" /> Watch your first page</Button>} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((c, i) => {
            const st = checkStatus(c);
            const T = TONE[st.tone];
            const watching = [
              c.expected_texts?.length && `${c.expected_texts.length} text${c.expected_texts.length > 1 ? "s" : ""}`,
              c.required_selectors?.length && `${c.required_selectors.length} part${c.required_selectors.length > 1 ? "s" : ""}`,
              c.visual_enabled && "looks",
              c.check_links && "links",
            ].filter(Boolean).join(" · ");
            return (
              <Link key={c.id} href={`/app/checks/${c.id}`} className="group animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <Card className="overflow-hidden transition group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream-2">
                    {c.last_screenshot_url || c.baseline_url ? <img src={c.last_screenshot_url || c.baseline_url} alt="" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" /> :
                      <div className="flex h-full items-center justify-center text-xs text-plum/40">Taking the first picture…</div>}
                    <span className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow ${T.cls}`}><T.icon className="h-3.5 w-3.5" /> {st.title}</span>
                  </div>
                  <div className="p-4">
                    <div className="font-medium text-ink group-hover:text-magenta">{c.name}</div>
                    <div className="truncate text-[11px] text-plum/50">{c.website_name ? `${c.website_name} · ` : ""}{c.url}</div>
                    <div className="mt-2 text-xs text-plum/70">{st.text}</div>
                    <div className="mt-3 flex justify-between border-t border-plum/6 pt-2 text-[11px] text-plum/50">
                      <span>Watching {watching || "nothing yet"}</span>
                      <span>{freqLabel(c.interval_sec)} · {timeAgo(c.last_check_at) || "not run yet"}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      {creating && (
        <PageCheckWizard onClose={() => setCreating(false)}
          onSaved={(c) => { setCreating(false); reload(); toast("Now watching this page - first check within a minute"); router.push(`/app/checks/${c.id}`); }} />
      )}
    </div>
  );
}
