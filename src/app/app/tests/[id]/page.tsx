"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Pause, Play, Settings2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { JourneyBuilder } from "@/components/JourneyBuilder";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, Loading, Modal, PageHeader, Stat } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate, ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";
import { describeStep } from "@/lib/steps";

export default function TestDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: t, reload } = useApi<any>(`/api/browser-tests/${id}`, { poll: 15000 });
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { can } = useAuth();
  const toast = useToast();
  const router = useRouter();

  if (!t) return <Loading rows={4} />;
  const run = t.runs.find((r: any) => r.id === sel) || t.runs[0];
  const passRate = t.runs.length ? Math.round((t.runs.filter((r: any) => r.ok).length / t.runs.length) * 100) : null;
  const blocked = t.requires_safety_confirmation && !t.safety?.test_mode_confirmed;

  const runNow = async () => {
    setRunning(true);
    try {
      const r = await post(`/api/browser-tests/${id}/run`);
      toast(r.ok ? `Passed in ${ms(r.duration_ms)}` : `Failed: ${r.error}`, r.ok ? "ok" : "error");
      setSel(r.id);
      reload();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setRunning(false);
    }
  };
  const toggle = async () => {
    try {
      await patch(`/api/browser-tests/${id}`, { paused: !t.paused });
      toast(t.paused ? "Schedule enabled" : "Schedule paused");
      reload();
    } catch (e: any) {
      toast(e.message, "error");
    }
  };

  return (
    <div>
      <Link href="/app/tests" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> User journeys</Link>
      <PageHeader eyebrow={<span className="flex items-center gap-2">Journey <Badge>{t.status}</Badge></span>} title={t.name}
        subtitle={<span className="font-mono text-xs">{t.start_url}</span>}
        action={can("member") && <>
          <Button variant="ghost" onClick={() => setEditing(true)}><Settings2 className="h-4 w-4" /> Edit</Button>
          <Button variant="secondary" onClick={toggle}>{t.paused ? <><Play className="h-4 w-4" /> Enable schedule</> : <><Pause className="h-4 w-4" /> Pause schedule</>}</Button>
          <Button onClick={runNow} loading={running} disabled={blocked}><Play className="h-4 w-4" /> Run now</Button>
        </>} />
      {blocked && <div className="mb-5 rounded-2xl bg-gold/15 px-5 py-3 text-sm text-[#6b4700] ring-1 ring-gold/40">This journey submits a form. Edit the journey and confirm the safety policy before it can run.</div>}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Pass rate (last 30)" value={passRate != null ? `${passRate}%` : "-"} tone={passRate == null ? "default" : passRate >= 95 ? "ok" : passRate >= 80 ? "warn" : "bad"} />
        <Stat label="Last run" value={timeAgo(t.last_run_at)} sub={t.runs[0]?.trigger} />
        <Stat label="Last duration" value={ms(t.last_duration_ms)} />
        <Stat label="Schedule" value={t.paused ? "Paused" : `${t.interval_sec >= 3600 ? t.interval_sec / 3600 + "h" : t.interval_sec / 60 + "m"}`} sub={`${t.retries} retries · incident after ${t.failure_threshold}`} />
      </div>

      <Card className="mb-6">
        <CardHeader title="What this journey checks" subtitle={`Opens ${t.start_url}, then:`} />
        <ol className="grid gap-2 p-5 md:grid-cols-2">
          {t.steps.map((s: any, i: number) => (
            <li key={i} className={`flex items-start gap-2.5 rounded-xl px-3 py-2 text-sm ${s.action.startsWith("assert") ? "bg-ok/5 text-ink ring-1 ring-ok/15" : "bg-cream/60 text-ink"}`}>
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${s.action.startsWith("assert") ? "bg-ok" : "bg-plum"}`}>{i + 1}</span>
              {describeStep(s)}
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardHeader title="Runs" />
          <div className="max-h-[620px] divide-y divide-plum/6 overflow-y-auto scrollbar-thin">
            {t.runs.length === 0 && <div className="px-5 py-8 text-center text-sm text-plum/50">No runs yet. Click “Run now”.</div>}
            {t.runs.map((r: any) => (
              <button key={r.id} onClick={() => setSel(r.id)} className={`flex w-full items-center gap-3 px-5 py-3 text-left transition ${run?.id === r.id ? "bg-cream" : "hover:bg-cream/50"}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${r.ok ? (r.classification === "transient" ? "bg-gold" : "bg-ok") : r.classification === "skipped" ? "bg-plum/30" : "bg-bad"}`} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-ink">{fmtDate(r.at)}</div>
                  <div className="truncate text-[11px] text-plum/50">{r.classification} · {ms(r.duration_ms)} · {r.trigger?.startsWith("manual") ? "manual" : "scheduled"}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <AnimatePresence mode="wait">
          {run ? (
            <motion.div key={run.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <Card>
                <CardHeader title={run.ok ? "Run passed" : "Run failed"} subtitle={`${fmtDate(run.at)} · ${run.attempts} attempt(s) · ${run.trigger}`} action={<Badge>{run.classification}</Badge>} />
                {run.error && <div className="mx-5 mt-4 rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad">{run.error}</div>}
                {run.previous_attempt_errors?.length > 0 && <div className="mx-5 mt-2 text-[11px] text-plum/55">Earlier attempts: {run.previous_attempt_errors.join(" · ")}</div>}
                <div className="grid gap-5 p-5 md:grid-cols-[1fr_300px]">
                  <ol className="space-y-1.5">
                    {run.steps?.map((s: any) => (
                      <motion.li key={s.index} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: s.index * 0.04 }}
                        className={`rounded-xl px-3 py-2 text-sm ${s.ok === false ? "bg-bad/8 ring-1 ring-bad/20" : s.skipped ? "opacity-40" : "bg-cream/70"}`}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${s.ok === false ? "bg-bad text-white" : s.skipped ? "bg-plum/15" : "bg-ok text-white"}`}>{s.ok === false ? "✗" : s.skipped ? "-" : "✓"}</span>
                            <span className="text-ink" title={s.selector || undefined}>{s.index === 0 && !s.description ? "Open the start page" : describeStep(s)}</span>
                          </span>
                          <span className="font-mono text-[11px] text-plum/50">{s.duration_ms != null ? ms(s.duration_ms) : ""}</span>
                        </div>
                        {s.error && (
                          <div className="mt-1.5 pl-7">
                            <div className="text-[13px] text-bad">{s.friendly || s.error}</div>
                            {s.friendly && s.friendly !== s.error && (
                              <details className="mt-1 text-[11px] text-plum/50"><summary className="cursor-pointer">Technical details</summary><div className="mt-1 font-mono">{s.selector && <div>target: {s.selector}</div>}{s.error}</div></details>
                            )}
                          </div>
                        )}
                        {s.screenshot_url && <button onClick={() => setPreview(s.screenshot_url)} className="mt-1 pl-7 text-[11px] text-magenta">View screenshot</button>}
                      </motion.li>
                    ))}
                  </ol>
                  {run.screenshot_url ? (
                    <button onClick={() => setPreview(run.screenshot_url)} className="group h-fit overflow-hidden rounded-2xl ring-1 ring-plum/10">
                      <img src={run.screenshot_url} alt="Run screenshot" className="w-full transition group-hover:scale-[1.02]" />
                      <div className="bg-cream px-3 py-1.5 text-left text-[11px] text-plum/60">{run.ok ? "Final state" : "At failure"} · click to enlarge</div>
                    </button>
                  ) : <div className="rounded-2xl bg-cream/60 p-6 text-center text-xs text-plum/50">No screenshot</div>}
                </div>
              </Card>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader title="Console" subtitle={`${run.console?.length || 0} errors & warnings`} />
                  <div className="max-h-64 overflow-auto bg-ink p-4 font-mono text-[11px] leading-relaxed scrollbar-thin">
                    {run.console?.length ? run.console.map((c: any, i: number) => <div key={i} className={c.type === "warning" ? "text-gold" : "text-rose"}>[{c.type}] {c.text}</div>) : <span className="text-cream/40">No console errors.</span>}
                  </div>
                </Card>
                <Card>
                  <CardHeader title="Network" subtitle="Failed requests & blocked by safety policy" />
                  <div className="max-h-64 space-y-1 overflow-auto p-4 font-mono text-[11px] scrollbar-thin">
                    {!run.network_failures?.length && !run.blocked_requests?.length && <span className="text-plum/40">No failed requests.</span>}
                    {run.network_failures?.map((n: any, i: number) => <div key={i} className="text-ink"><span className="text-bad">{n.status || "ERR"}</span> {n.method} {n.url}</div>)}
                    {run.blocked_requests?.map((n: any, i: number) => <div key={`b${i}`} className="text-teal">BLOCKED {n.method} {n.url} - {n.reason}</div>)}
                  </div>
                </Card>
              </div>
            </motion.div>
          ) : <Card className="p-10 text-center text-sm text-plum/50">Run the journey to see step-by-step results.</Card>}
        </AnimatePresence>
      </div>

      {can("member") && (
        <div className="mt-8"><Button variant="danger" size="sm" onClick={async () => { if (confirm("Delete this journey and its run history?")) { await del(`/api/browser-tests/${id}`); router.push("/app/tests"); } }}><Trash2 className="h-4 w-4" /> Delete journey</Button></div>
      )}
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit journey" wide>
        <JourneyBuilder initial={t} onSaved={() => { setEditing(false); toast("Journey saved"); reload(); }} />
      </Modal>
      <Modal open={!!preview} onClose={() => setPreview(null)} title="Screenshot" wide>
        {preview && <img src={preview} alt="Screenshot" className="w-full rounded-xl" />}
      </Modal>
    </div>
  );
}
