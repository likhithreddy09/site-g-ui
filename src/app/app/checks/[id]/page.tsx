"use client";

import { AlertTriangle, ArrowLeft, Check, CheckCircle2, Crop, ExternalLink, Info, Play, Settings2, Trash2, Wrench, X, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PageCheckForm } from "@/components/PageCheckForm";
import { PageCheckWizard, SENSITIVITY, freqLabel } from "@/components/PageCheckWizard";
import { useToast } from "@/components/toast";
import { Button, Card, CardHeader, Loading, Modal, PageHeader, Tabs } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";
import { checkStatus, findings, friendlyPageError, linkProblem, runSummary } from "@/lib/pageChecks";

type View = "side" | "diff" | "slider";

const TONE = {
  ok: { icon: CheckCircle2, cls: "text-ok", bg: "bg-ok/8 ring-ok/20" },
  bad: { icon: XCircle, cls: "text-bad", bg: "bg-bad/8 ring-bad/20" },
  warn: { icon: AlertTriangle, cls: "text-[#8a5b00]", bg: "bg-gold/15 ring-gold/40" },
  info: { icon: Info, cls: "text-teal", bg: "bg-sky/15 ring-sky/40" },
} as const;

export default function CheckDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: c, reload, setData } = useApi<any>(`/api/page-checks/${id}`, { poll: 30000 });
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tech, setTech] = useState(false);
  const [regions, setRegions] = useState(false);
  const [view, setView] = useState<View>("side");
  const { can } = useAuth();
  const toast = useToast();
  const router = useRouter();
  if (!c) return <Loading rows={4} />;
  const latest = c.results?.[0];
  const vis = latest?.details?.visual;
  const status = checkStatus(c);
  const St = TONE[status.tone];
  const list = findings(c, latest);
  const pending = c.changes?.find((ch: any) => ch.status === "pending_review");

  const run = async () => {
    setRunning(true);
    try {
      setData(await post(`/api/page-checks/${id}/run`));
      toast("Check finished");
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setRunning(false);
    }
  };
  const approve = async (change_id?: string) => {
    try {
      setData(await post(`/api/page-checks/${id}/baseline`, change_id ? { change_id } : {}));
      toast("Saved as the new approved look");
    } catch (e: any) {
      toast(e.message, "error");
    }
  };
  const review = async (chid: string, decision: "issue" | "dismiss") => {
    await post(`/api/visual-changes/${chid}/review`, { decision });
    toast(decision === "issue" ? "Reported as a problem — an incident was opened" : "Ignored this time");
    reload();
  };

  return (
    <div>
      <Link href="/app/checks" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> Content & visual checks</Link>
      <PageHeader eyebrow="Page check" title={c.name}
        subtitle={<a href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-magenta">{c.url} <ExternalLink className="h-3 w-3" /></a>}
        action={can("member") && <>
          <Button variant="ghost" onClick={() => setEditing(true)}><Settings2 className="h-4 w-4" /> Change what we watch</Button>
          <Button onClick={run} loading={running}><Play className="h-4 w-4" /> Check now</Button>
        </>} />

      <Card className="mb-6 overflow-hidden">
        <div className={`flex flex-wrap items-center gap-4 px-6 py-5 ring-1 ring-inset ${St.bg}`}>
          <St.icon className={`h-9 w-9 shrink-0 ${St.cls}`} />
          <div className="flex-1">
            <div className={`text-xl font-semibold ${St.cls}`}>{status.title}</div>
            <div className="text-sm text-plum/75">{latest?.error ? friendlyPageError(latest.error) : status.text}</div>
          </div>
          <div className="text-right text-xs text-plum/60">
            <div>Last checked {timeAgo(c.last_check_at) || "—"}</div>
            <div>{freqLabel(c.interval_sec)}</div>
          </div>
        </div>
        {list.length > 0 && (
          <ul className="grid gap-x-6 gap-y-2.5 p-6 md:grid-cols-2">
            {list.map((f, i) => {
              const T = TONE[f.tone];
              return (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink" title={f.detail}>
                  <T.icon className={`mt-0.5 h-4 w-4 shrink-0 ${T.cls}`} /> {f.text}
                </li>
              );
            })}
          </ul>
        )}
        {latest?.details?.broken_links?.length > 0 && (
          <div className="border-t border-plum/8 px-6 py-4">
            <div className="mb-2 text-xs font-semibold text-ink">Broken links</div>
            <ul className="space-y-1.5">
              {latest.details.broken_links.map((b: any) => (
                <li key={b.url} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-bad/10 px-2 py-0.5 text-[11px] font-medium text-bad">{linkProblem(b)}</span>
                  <a href={b.url} target="_blank" rel="noreferrer" className="truncate text-plum/75 hover:text-magenta">{b.url}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!latest && <div className="p-6 text-sm text-plum/60">The first check runs within a minute of creating it. Click “Check now” to run it immediately.</div>}
      </Card>

      {pending && can("member") && (
        <Card className="mb-6 ring-2 ring-gold/50">
          <div className="flex flex-wrap items-center gap-4 border-b border-plum/8 px-5 py-4">
            <AlertTriangle className="h-6 w-6 text-[#8a5b00]" />
            <div className="flex-1">
              <h3 className="font-semibold text-ink">The page looks different. Was this on purpose?</h3>
              <p className="text-xs text-plum/65">{pending.diff_pct}% of the screen changed on {fmtDate(pending.at)}. Compare the two pictures below, then choose.</p>
            </div>
          </div>
          <div className="grid gap-2 p-4 sm:grid-cols-3">
            <DecisionBtn tone="ok" title="Yes, it's the new look" body="Make this the approved version. We'll compare against it from now on." onClick={() => approve(pending.id)} />
            <DecisionBtn tone="bad" title="No, something's wrong" body="Open an incident and alert the team so it gets fixed." onClick={() => review(pending.id, "issue")} />
            <DecisionBtn tone="info" title="Ignore this time" body="Keep the current approved version and dismiss this change." onClick={() => review(pending.id, "dismiss")} />
          </div>
        </Card>
      )}

      {c.visual_enabled && (
        <Card className="mb-6">
          <CardHeader title="How the page looks"
            subtitle={c.baseline ? `Approved version from ${fmtDate(c.baseline.at)}${c.baseline.approved_by ? " by " + c.baseline.approved_by : ""}. We compare the first screen visitors see.` : "We'll take the first picture on the first check."}
            action={vis && !vis.new_baseline && <Tabs<View> value={view} onChange={setView} tabs={[{ id: "side", label: "Side by side" }, { id: "slider", label: "Before / after slider" }, { id: "diff", label: "Show what changed" }]} />} />
          <div className="p-5">
            {!vis ? <div className="py-10 text-center text-sm text-plum/50">Run the check to take the first picture.</div> : vis.new_baseline ? (
              <div className="mx-auto max-w-3xl"><img src={vis.screenshot_url} alt="Approved version" className="w-full rounded-xl ring-1 ring-plum/10" /><p className="mt-3 text-center text-xs text-plum/55">This first picture is now the approved look. Future checks are compared against it.</p></div>
            ) : view === "side" ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[["Approved version", vis.baseline_url], ["Latest check", vis.screenshot_url]].map(([k, u]) => (
                  <div key={k as string}><div className="mb-2 text-xs font-medium text-plum/70">{k}</div>{u ? <img src={u as string} alt={k as string} className="w-full rounded-xl ring-1 ring-plum/10" /> : null}</div>
                ))}
              </div>
            ) : view === "diff" ? (
              vis.diff_url ? <img src={vis.diff_url} alt="Changes highlighted" className="mx-auto max-w-3xl rounded-xl ring-1 ring-plum/10" /> : null
            ) : <Slider a={vis.baseline_url} b={vis.screenshot_url} />}
            {vis && !vis.new_baseline && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-cream/60 px-4 py-3 text-xs text-plum/70">
                <span>{view === "diff" ? "Changed areas are shown in pink." : `Sensitivity: ${SENSITIVITY.find((s) => s.value === c.threshold_pct)?.label || `${c.threshold_pct}% of the screen`}.`} Something keeps changing by itself (a date, an offer)? Hide that area.</span>
                {can("member") && (
                  <span className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setRegions(true)} disabled={!c.baseline_url}><Crop className="h-3.5 w-3.5" /> Hide an area</Button>
                    {!pending && vis.changed === false && vis.diff_pct > 0 && <Button size="sm" variant="ghost" onClick={() => approve()}><Check className="h-3.5 w-3.5" /> Use latest as approved</Button>}
                  </span>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader title="History" subtitle="Every check, newest first." />
        <div className="divide-y divide-plum/6">
          {!c.results?.length && <div className="px-5 py-8 text-center text-sm text-plum/50">No checks yet.</div>}
          {c.results?.map((r: any) => {
            const bad = r.classification === "failure" || r.error;
            const warn = !bad && (r.details?.visual?.changed || r.details?.broken_links?.length);
            return (
              <div key={r.id} className="flex items-center gap-4 px-5 py-2.5 text-sm">
                <span className={`h-2 w-2 shrink-0 rounded-full ${bad ? "bg-bad" : warn ? "bg-gold" : "bg-ok"}`} />
                <span className="w-40 shrink-0 text-xs text-plum/60">{fmtDate(r.at)}</span>
                <span className="flex-1 text-xs text-plum/80">{runSummary(c, r)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {c.changes?.some((ch: any) => ch.status !== "pending_review") && (
        <Card className="mb-6">
          <CardHeader title="Past look changes" subtitle="What was decided about each change." />
          <div className="divide-y divide-plum/6">
            {c.changes.filter((ch: any) => ch.status !== "pending_review").map((ch: any) => (
              <div key={ch.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
                {ch.diff_url && <img src={ch.diff_url} alt="" className="h-14 w-24 rounded-lg object-cover object-top ring-1 ring-plum/10" />}
                <div className="flex-1">
                  <div className="text-sm text-ink">{ch.diff_pct}% of the screen changed</div>
                  <div className="text-[11px] text-plum/50">{fmtDate(ch.at)}{ch.reviewed_by ? ` · ${ch.reviewed_by}` : ""}</div>
                </div>
                <span className="text-xs text-plum/70">{{ approved: "Accepted as the new look", issue: "Reported as a problem", dismissed: "Ignored", superseded: "Replaced by a newer approval" }[ch.status as string] || ch.status}</span>
                {ch.incident_id && <Link href={`/app/incidents/${ch.incident_id}`} className="text-xs text-magenta">Incident →</Link>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {can("member") && (
        <div className="mt-8 flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={() => setTech(true)}><Wrench className="h-4 w-4" /> Technical settings</Button>
          <Button variant="danger" size="sm" onClick={async () => { if (confirm("Stop watching this page and delete its history?")) { await del(`/api/page-checks/${id}`); router.push("/app/checks"); } }}><Trash2 className="h-4 w-4" /> Delete check</Button>
        </div>
      )}

      {editing && <PageCheckWizard initial={c} onClose={() => setEditing(false)} onSaved={() => { setEditing(false); reload(); toast("Saved"); }} />}
      <Modal open={tech} onClose={() => setTech(false)} title="Technical settings" subtitle="For developers: raw selectors and thresholds." wide><PageCheckForm initial={c} onSaved={() => { setTech(false); reload(); toast("Saved"); }} /></Modal>
      <Modal open={regions} onClose={() => setRegions(false)} title="Hide areas that change by themselves" subtitle="Drag a box over anything that changes on its own (dates, offers, live prices). Those areas are skipped when comparing." wide>
        <RegionEditor src={c.baseline_url} initial={c.ignore_regions || []} onSave={async (r) => { await patch(`/api/page-checks/${id}`, { ignore_regions: r }); setRegions(false); reload(); toast("Hidden areas saved"); }} />
      </Modal>
    </div>
  );
}

function DecisionBtn({ tone, title, body, onClick }: { tone: "ok" | "bad" | "info"; title: string; body: string; onClick: () => void }) {
  const T = TONE[tone];
  return (
    <button onClick={onClick} className={`rounded-2xl p-4 text-left ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${T.bg}`}>
      <div className={`flex items-center gap-2 text-sm font-semibold ${T.cls}`}><T.icon className="h-4 w-4" /> {title}</div>
      <div className="mt-1 text-xs text-plum/70">{body}</div>
    </button>
  );
}

function Slider({ a, b }: { a: string; b: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-xl ring-1 ring-plum/10">
        <img src={b} alt="Latest check" className="block w-full" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><img src={a} alt="Approved version" className="block w-full" /></div>
        <div className="absolute inset-y-0 w-0.5 bg-magenta" style={{ left: `${pos}%` }}><span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta px-2 py-1 text-[10px] text-white">⇆</span></div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="mt-3 w-full accent-[#9b1b67]" />
      <div className="flex justify-between text-[11px] text-plum/50"><span>← Approved version</span><span>Latest check →</span></div>
    </div>
  );
}

function RegionEditor({ src, initial, onSave }: { src: string; initial: any[]; onSave: (r: any[]) => void }) {
  const ref = useRef<HTMLImageElement>(null);
  const [regions, setRegions] = useState<any[]>(initial);
  const [drag, setDrag] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const scale = () => (ref.current ? ref.current.naturalWidth / ref.current.clientWidth : 1);
  const pt = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  return (
    <div>
      <div className="relative select-none" onMouseDown={(e) => { const p = pt(e); setDrag({ x: p.x, y: p.y, w: 0, h: 0 }); }}
        onMouseMove={(e) => { if (!drag) return; const p = pt(e); setDrag({ ...drag, w: p.x - drag.x, h: p.y - drag.y }); }}
        onMouseUp={() => {
          if (drag && Math.abs(drag.w) > 5 && Math.abs(drag.h) > 5) {
            const s = scale();
            setRegions([...regions, { x: Math.round(Math.min(drag.x, drag.x + drag.w) * s), y: Math.round(Math.min(drag.y, drag.y + drag.h) * s), w: Math.round(Math.abs(drag.w) * s), h: Math.round(Math.abs(drag.h) * s) }]);
          }
          setDrag(null);
        }}>
        <img ref={ref} src={src} alt="Baseline" className="w-full cursor-crosshair rounded-xl ring-1 ring-plum/10" draggable={false} />
        {regions.map((r, i) => {
          const s = scale();
          return <div key={i} className="absolute border-2 border-magenta bg-magenta/25" style={{ left: r.x / s, top: r.y / s, width: r.w / s, height: r.h / s }}>
            <button onMouseDown={(e) => e.stopPropagation()} onClick={() => setRegions(regions.filter((_, j) => j !== i))} className="absolute -right-2 -top-2 rounded-full bg-magenta p-0.5 text-white"><X className="h-3 w-3" /></button>
          </div>;
        })}
        {drag && <div className="pointer-events-none absolute border-2 border-dashed border-magenta bg-magenta/15" style={{ left: Math.min(drag.x, drag.x + drag.w), top: Math.min(drag.y, drag.y + drag.h), width: Math.abs(drag.w), height: Math.abs(drag.h) }} />}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-plum/60">{regions.length} hidden area{regions.length === 1 ? "" : "s"}</span>
        <div className="flex gap-2"><Button variant="ghost" onClick={() => setRegions([])}>Clear</Button><Button onClick={() => onSave(regions)}>Save hidden areas</Button></div>
      </div>
    </div>
  );
}
