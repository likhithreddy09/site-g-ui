"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Bot, CheckCircle2, Copy, Eye, FlagOff, Image as ImageIcon, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, KV, Loading, Modal, PageHeader, Select, Textarea } from "@/components/ui";
import { patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { duration, fmtDate, ms, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: inc, setData, reload } = useApi<any>(`/api/incidents/${id}`, { poll: 20000 });
  const { data: members } = useApi<any[]>("/api/workspace/members");
  const { can } = useAuth();
  const toast = useToast();
  const [note, setNote] = useState("");
  const [resolving, setResolving] = useState(false);
  const [resolution, setResolution] = useState("");
  const [fp, setFp] = useState(false);
  const [fpReason, setFpReason] = useState("");
  const [diagnosing, setDiagnosing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  if (!inc) return <Loading rows={4} />;

  const update = async (body: any, msg?: string) => {
    try {
      setData(await patch(`/api/incidents/${id}`, body));
      if (msg) toast(msg);
    } catch (e: any) {
      toast(e.message, "error");
    }
  };
  const addNote = async () => {
    if (!note.trim()) return;
    setData(await post(`/api/incidents/${id}/notes`, { text: note }));
    setNote("");
  };
  const diagnose = async () => {
    setDiagnosing(true);
    try {
      await post(`/api/incidents/${id}/diagnose`);
      await reload();
      toast("Diagnosis generated from captured evidence");
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setDiagnosing(false);
    }
  };

  const active = inc.status === "open" || inc.status === "investigating";
  const dur = ((inc.resolved_at ? +new Date(inc.resolved_at) : Date.now()) - +new Date(inc.started_at)) / 1000;

  return (
    <div>
      <Link href="/app/incidents" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> Incidents</Link>
      <PageHeader
        eyebrow={<span className="flex items-center gap-2">INC-{inc.id.slice(-5).toUpperCase()} <Badge>{inc.severity}</Badge> <Badge>{inc.status}</Badge>{inc.false_positive && <Badge tone="ignored">false positive</Badge>}</span>}
        title={inc.title}
        subtitle={inc.summary}
        action={can("member") && <>
          {inc.status === "open" && <Button variant="secondary" onClick={() => update({ status: "investigating" }, "Marked as investigating")}><Eye className="h-4 w-4" /> Investigate</Button>}
          {active && <Button onClick={() => { setResolution(inc.resolution || inc.ai?.resolution_note_draft || ""); setResolving(true); }}><CheckCircle2 className="h-4 w-4" /> Resolve</Button>}
          {!active && <Button variant="secondary" onClick={() => update({ status: "open" }, "Incident reopened")}>Reopen</Button>}
        </>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title={<span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-magenta" /> AI-assisted diagnosis</span>}
              subtitle="Grounded in captured evidence. Hypotheses are suggestions, not confirmed root causes."
              action={can("member") && <Button size="sm" variant={inc.ai ? "secondary" : "magenta"} loading={diagnosing} onClick={diagnose}><Bot className="h-4 w-4" />{inc.ai ? "Regenerate" : "Analyse evidence"}</Button>} />
            {inc.ai ? <Diagnosis ai={inc.ai} /> : (
              <div className="px-5 py-8 text-center text-sm text-plum/60">Run an analysis to get a plain-language summary, likely causes, and next steps based on this incident&apos;s evidence.</div>
            )}
          </Card>

          <Card>
            <CardHeader title="Evidence" subtitle={`${inc.evidence.length} captured items, newest first`} />
            <div className="divide-y divide-plum/6">
              {inc.evidence.map((e: any, i: number) => (
                <div key={i} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm"><Badge tone="info">{e.type.replace("_", " ")}</Badge><span className="text-ink">{e.summary}</span></div>
                    <span className="whitespace-nowrap font-mono text-[11px] text-plum/50">{fmtDate(e.at)}</span>
                  </div>
                  {e.result && (
                    <div className="mt-2 flex flex-wrap gap-4 font-mono text-[11px] text-plum/65">
                      {e.result.status_code != null && <span>HTTP {e.result.status_code}</span>}
                      {e.result.response_ms != null && <span>{ms(e.result.response_ms)}</span>}
                      {e.result.attempts && <span>{e.result.attempts.length} attempt{e.result.attempts.length === 1 ? "" : "s"}: {e.result.attempts.map((a: any) => a.ok ? "ok" : a.status_code ? `HTTP ${a.status_code}` : "error").join(" → ")}</span>}
                    </div>
                  )}
                  {e.run && (
                    <div className="mt-3 grid gap-3 md:grid-cols-[1fr_200px]">
                      <div className="space-y-1">
                        {e.run.steps?.map((s: any) => (
                          <div key={s.index} className={`flex justify-between rounded-lg px-2.5 py-1 font-mono text-[11px] ${s.ok === false ? "bg-bad/8 text-bad" : s.skipped ? "text-plum/35" : "bg-cream/70 text-ink"}`}>
                            <span>{s.ok === false ? "✗" : s.skipped ? "·" : "✓"} {s.action} {s.selector || s.description}</span><span>{s.duration_ms != null ? ms(s.duration_ms) : ""}</span>
                          </div>
                        ))}
                        {e.run.console?.length > 0 && <div className="mt-2 rounded-lg bg-ink p-2.5 font-mono text-[10.5px] text-rose">{e.run.console.map((c: any, j: number) => <div key={j}>[{c.type}] {c.text}</div>)}</div>}
                        {e.run.network_failures?.length > 0 && <div className="mt-1 font-mono text-[10.5px] text-plum/60">{e.run.network_failures.map((n: any, j: number) => <div key={j}>{n.method} {n.url} → {n.status || n.error}</div>)}</div>}
                      </div>
                      {e.run.screenshot_url && <button onClick={() => setPreview(e.run.screenshot_url)} className="overflow-hidden rounded-xl ring-1 ring-plum/10 hover:ring-magenta"><img src={e.run.screenshot_url} alt="Failure screenshot" className="w-full" /></button>}
                    </div>
                  )}
                  {e.artifact_url && !e.run && (
                    <button onClick={() => setPreview(e.artifact_url)} className="mt-3 flex items-center gap-2 text-xs text-magenta"><ImageIcon className="h-4 w-4" /> View screenshot</button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Timeline & notes" />
            <div className="px-5 py-4">
              <ol className="relative space-y-4 border-l border-plum/15 pl-5">
                {[...inc.timeline].reverse().map((t: any, i: number) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="relative">
                    <span className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${t.type === "opened" || t.type === "reopened" ? "bg-bad" : t.type === "resolved" ? "bg-ok" : t.type === "ai" ? "bg-magenta" : "bg-plum/30"}`} />
                    <div className="text-sm text-ink">{t.text}</div>
                    <div className="text-[11px] text-plum/50">{t.by} · {fmtDate(t.at)}</div>
                  </motion.li>
                ))}
              </ol>
              {inc.notes?.length > 0 && (
                <div className="mt-6 space-y-3">
                  {inc.notes.map((n: any, i: number) => (
                    <div key={i} className="rounded-2xl bg-cream/70 p-3.5">
                      <div className="text-[11px] text-plum/55">{n.by} · {fmtDate(n.at)}</div>
                      <div className="mt-1 whitespace-pre-wrap text-sm text-ink">{n.text}</div>
                    </div>
                  ))}
                </div>
              )}
              {can("member") && (
                <div className="mt-5 flex gap-2">
                  <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an investigation note…" className="flex-1" />
                  <Button onClick={addNote} disabled={!note.trim()} className="self-end"><MessageSquare className="h-4 w-4" /> Add</Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Details" />
            <div className="divide-y divide-plum/6 px-5 py-2">
              <KV k="Website" v={inc.website ? <Link href={`/app/websites/${inc.website.id}`} className="text-magenta">{inc.website.name}</Link> : "—"} />
              <KV k="Client" v={inc.client?.name || "—"} />
              <KV k="Source" v={inc.source_type.replace("_", " ")} />
              <KV k="First detected" v={fmtDate(inc.started_at)} />
              <KV k="Last detected" v={timeAgo(inc.last_detected_at)} />
              <KV k={inc.resolved_at ? "Duration" : "Open for"} v={duration(dur)} mono />
              <KV k="Occurrences" v={inc.occurrences} mono />
              <KV k="Acknowledged" v={inc.acknowledged_at ? fmtDate(inc.acknowledged_at) : "not yet"} />
              {inc.escalated_at && <KV k="Escalated" v={fmtDate(inc.escalated_at)} />}
            </div>
          </Card>
          {can("member") && (
            <Card className="space-y-4 p-5">
              <Select label="Assignee" value={inc.assignee_id || ""} onChange={(e) => update({ assignee_id: e.target.value || null }, "Assignment updated")}>
                <option value="">Unassigned</option>
                {members?.filter((m) => m.user_id && m.role !== "client").map((m) => <option key={m.id} value={m.user_id}>{m.name || m.email}</option>)}
              </Select>
              <Select label="Severity" value={inc.severity} onChange={(e) => update({ severity: e.target.value }, "Severity updated")}>
                {["critical", "major", "minor", "info"].map((s) => <option key={s}>{s}</option>)}
              </Select>
              <Select label="Status" value={inc.status} onChange={(e) => update({ status: e.target.value }, "Status updated")}>
                {["open", "investigating", "resolved", "ignored"].map((s) => <option key={s}>{s}</option>)}
              </Select>
              <Button variant="ghost" size="sm" onClick={() => inc.false_positive ? update({ false_positive: false }, "False-positive flag removed") : setFp(true)}>
                <FlagOff className="h-4 w-4" /> {inc.false_positive ? "Remove false-positive flag" : "Mark as false positive"}
              </Button>
            </Card>
          )}
          {inc.resolution && (
            <Card className="p-5">
              <h3 className="text-sm font-semibold text-ink">Resolution summary</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-plum/80">{inc.resolution}</p>
            </Card>
          )}
          {inc.related?.length > 0 && (
            <Card>
              <CardHeader title="Related incidents" subtitle="Same website, ±24h" />
              <div className="divide-y divide-plum/6">
                {inc.related.map((r: any) => (
                  <Link key={r.id} href={`/app/incidents/${r.id}`} className="block px-5 py-3 text-sm hover:bg-cream/50">
                    <div className="text-ink">{r.title}</div>
                    <div className="mt-1 flex gap-2"><Badge>{r.severity}</Badge><Badge>{r.status}</Badge></div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      <Modal open={resolving} onClose={() => setResolving(false)} title="Resolve incident" subtitle="The resolution summary appears in client reports.">
        <Textarea rows={6} value={resolution} onChange={(e) => setResolution(e.target.value)} placeholder="What was the cause and what fixed it?" />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setResolving(false)}>Cancel</Button>
          <Button onClick={async () => { await update({ status: "resolved", resolution }, "Incident resolved"); setResolving(false); }}>Resolve</Button>
        </div>
      </Modal>
      <Modal open={fp} onClose={() => setFp(false)} title="Mark as false positive" subtitle="False positives are excluded from client reports and reviewed to tune thresholds.">
        <Textarea rows={3} value={fpReason} onChange={(e) => setFpReason(e.target.value)} placeholder="Why was this not a real issue? (e.g. planned maintenance)" />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setFp(false)}>Cancel</Button>
          <Button onClick={async () => { await update({ false_positive: true, reason: fpReason }, "Marked as false positive"); setFp(false); }}>Confirm</Button>
        </div>
      </Modal>
      <Modal open={!!preview} onClose={() => setPreview(null)} title="Screenshot" wide>
        {preview && <img src={preview} alt="Evidence" className="w-full rounded-xl ring-1 ring-plum/10" />}
      </Modal>
    </div>
  );
}

function Diagnosis({ ai }: { ai: any }) {
  const toast = useToast();
  const conf: Record<string, string> = { high: "bg-magenta text-white", medium: "bg-rose/25 text-magenta", low: "bg-plum/8 text-plum/70" };
  return (
    <div className="space-y-5 p-5">
      <div className="rounded-2xl bg-plum p-4 text-cream">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky">Summary · {ai.engine} · {timeAgo(ai.generated_at)}</div>
        <div className="mt-1.5 text-[15px] font-medium">{ai.headline}</div>
      </div>
      <section>
        <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ok">Observed (from evidence)</h4>
        <ul className="space-y-1.5">
          {ai.observations?.map((o: any, i: number) => (
            <li key={i} className="flex gap-2 text-sm text-ink"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ok" /><span>{o.text} {o.evidence?.map((e: string) => <span key={e} className="ml-1 rounded bg-plum/6 px-1 font-mono text-[10px] text-plum/60">{e}</span>)}</span></li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-magenta">Hypotheses (unconfirmed)</h4>
        <ul className="space-y-2">
          {ai.hypotheses?.map((h: any, i: number) => (
            <li key={i} className="rounded-xl bg-cream/70 p-3 text-sm text-ink">
              <span className={`mr-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${conf[h.confidence] || conf.low}`}>{h.confidence} confidence</span>{h.text}
              {h.evidence?.length > 0 && <span className="ml-1">{h.evidence.map((e: string) => <span key={e} className="ml-1 rounded bg-plum/6 px-1 font-mono text-[10px] text-plum/60">{e}</span>)}</span>}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-teal">Suggested next steps</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-ink">{ai.next_steps?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ol>
      </section>
      {ai.missing_evidence?.length > 0 && (
        <section>
          <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-warn">Missing evidence</h4>
          <ul className="space-y-1 text-sm text-plum/75">{ai.missing_evidence.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
        </section>
      )}
      <section className="grid gap-3 md:grid-cols-2">
        {[["For your client", ai.stakeholder_summary], ["Resolution note draft", ai.resolution_note_draft]].map(([k, v]) => (
          <div key={k} className="rounded-2xl ring-1 ring-plum/10 p-4">
            <div className="flex items-center justify-between"><span className="text-xs font-medium text-plum">{k}</span>
              <button onClick={() => { navigator.clipboard.writeText(v); toast("Copied"); }} className="text-plum/50 hover:text-magenta"><Copy className="h-3.5 w-3.5" /></button></div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{v}</p>
          </div>
        ))}
      </section>
      <p className="text-[11px] text-plum/50">{ai.disclaimer} {ai.engine_note}</p>
    </div>
  );
}
