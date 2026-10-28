"use client";

import { BellRing, MousePointerClick, Play, Repeat, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JourneyBuilder } from "@/components/JourneyBuilder";
import { JourneyRecorder } from "@/components/JourneyRecorder";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, Empty, Loading, Modal, PageHeader, Table, Td } from "@/components/ui";
import { post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function TestsPage() {
  const { data, loading, reload } = useApi<any>("/api/browser-tests", { poll: 20000 });
  const [creating, setCreating] = useState(false);
  const [recording, setRecording] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  const { can } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const runNow = async (t: any) => {
    setRunning(t.id);
    try {
      const r = await post(`/api/browser-tests/${t.id}/run`);
      toast(r.ok ? `${t.name} passed in ${ms(r.duration_ms)}` : `${t.name} failed: ${r.error}`, r.ok ? "ok" : "error");
      reload();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setRunning(null);
    }
  };

  const q = data?.quota;
  return (
    <div>
      <PageHeader eyebrow="Automated QA" title="User journeys"
        subtitle="Scheduled browser tests that fill forms, click buttons, and verify the outcome — with screenshots and logs when they fail."
        action={can("member") && <>
          <Button variant="ghost" onClick={() => setCreating(true)}><Wrench className="h-4 w-4" /> Advanced builder</Button>
          <Button onClick={() => setRecording(true)}><MousePointerClick className="h-4 w-4" /> Record a journey</Button>
        </>} />
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        {[
          [MousePointerClick, "1. Record it once", "Open the client's site inside SiteGuard and click through it like a visitor — no code."],
          [Repeat, "2. We repeat it for you", "A real browser replays your steps on a schedule and checks the result, with screenshots."],
          [BellRing, "3. Get told when it breaks", "If a step stops working twice in a row, you get an alert explaining which step failed."],
        ].map(([Icon, title, body]: any) => (
          <div key={title} className="flex gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-plum/8">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cream-2 text-magenta"><Icon className="h-4 w-4" /></span>
            <div><div className="text-sm font-semibold text-ink">{title}</div><div className="text-xs text-plum/65">{body}</div></div>
          </div>
        ))}
      </div>
      {q && (
        <Card className="mb-5 flex items-center gap-5 px-5 py-4">
          <div className="text-sm text-plum/70">Browser-test minutes this month</div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-plum/8"><div className="h-full rounded-full bg-magenta transition-all" style={{ width: `${q.minutes ? Math.min(100, (q.used_minutes / q.minutes) * 100) : 100}%` }} /></div>
          <div className="font-mono text-sm text-ink">{q.used_minutes.toFixed(1)} / {q.minutes} min</div>
        </Card>
      )}
      {loading && !data ? <Loading rows={4} /> : !data?.tests.length ? (
        <Empty icon={<MousePointerClick className="h-6 w-6" />} title="No journeys yet" body="Start with your client's most important flow — usually the contact form or booking button."
          action={can("member") && <Button onClick={() => setRecording(true)}><MousePointerClick className="h-4 w-4" /> Record your first journey</Button>} />
      ) : (
        <Card>
          <Table head={["Journey", "Website", "Status", "Recent runs", "Last run", "Duration", "Schedule", ""]}>
            {data.tests.map((t: any) => (
              <tr key={t.id} className="hover:bg-cream/50">
                <Td><Link href={`/app/tests/${t.id}`} className="font-medium text-ink hover:text-magenta">{t.name}</Link><div className="text-[11px] text-plum/50">{t.steps.length} steps</div></Td>
                <Td className="text-xs">{t.website_name || "—"}</Td>
                <Td><Badge>{t.status}</Badge></Td>
                <Td>
                  <div className="flex gap-[2px]">
                    {t.recent.length === 0 && <span className="text-xs text-plum/40">no runs</span>}
                    {t.recent.map((r: any, i: number) => <span key={i} title={`${r.classification} · ${new Date(r.at).toLocaleString()}`} className={`h-5 w-1.5 rounded-sm ${r.ok ? (r.classification === "transient" ? "bg-gold" : "bg-ok/70") : r.classification === "skipped" ? "bg-plum/20" : "bg-bad"}`} />)}
                  </div>
                </Td>
                <Td className="text-xs text-plum/60">{timeAgo(t.last_run_at)}</Td>
                <Td className="font-mono text-xs">{ms(t.last_duration_ms)}</Td>
                <Td className="text-xs">{t.paused ? <span className="text-plum/50">paused</span> : `every ${t.interval_sec >= 3600 ? t.interval_sec / 3600 + "h" : t.interval_sec / 60 + "m"}`}</Td>
                <Td>{can("member") && <Button size="sm" variant="secondary" loading={running === t.id} onClick={() => runNow(t)}><Play className="h-3.5 w-3.5" /> Run</Button>}</Td>
              </tr>
            ))}
          </Table>
        </Card>
      )}
      {recording && <JourneyRecorder onClose={() => setRecording(false)} onSaved={(t) => { setRecording(false); router.push(`/app/tests/${t.id}`); }} />}
      <Modal open={creating} onClose={() => setCreating(false)} title="Advanced journey builder" subtitle="For developers: write steps with CSS selectors. Saved as a draft." wide>
        <JourneyBuilder onSaved={(t) => { setCreating(false); toast("Journey created"); router.push(`/app/tests/${t.id}`); }} />
      </Modal>
    </div>
  );
}
