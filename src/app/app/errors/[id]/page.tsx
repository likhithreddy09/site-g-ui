"use client";

import { ArrowLeft, Bug, ChevronDown, Code2, Compass, Lightbulb, MousePointerClick, Plug, RefreshCw, Terminal, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TrendBars } from "@/components/charts";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, KV, Loading, PageHeader, Stat, Tabs, cn } from "@/components/ui";
import { patch, post } from "@/lib/api";
import { explainError } from "@/lib/errorExplain";
import { useAuth } from "@/lib/auth";
import { fmtDate, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

function Dist({ title, data }: { title: string; data: Record<string, number> }) {
  const total = Object.values(data || {}).reduce((a, b) => a + b, 0) || 1;
  const rows = Object.entries(data || {}).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!rows.length) return null;
  return (
    <Card className="p-5">
      <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>
      <div className="space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k}>
            <div className="flex justify-between gap-3 text-xs"><span className="truncate text-ink">{k}</span><span className="font-mono text-plum/60">{Math.round((v / total) * 100)}% · {v}</span></div>
            <div className="mt-1 h-1.5 rounded-full bg-plum/8"><div className="h-full rounded-full bg-magenta transition-all duration-700" style={{ width: `${(v / total) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </Card>
  );
}

const CRUMB: Record<string, { icon: any; tone: string; label: string }> = {
  nav: { icon: Compass, tone: "bg-sky/30 text-teal", label: "Page" },
  click: { icon: MousePointerClick, tone: "bg-gold/25 text-[#8a5b00]", label: "Clicked" },
  api: { icon: Plug, tone: "bg-plum/8 text-plum", label: "Request" },
  console: { icon: Terminal, tone: "bg-plum/8 text-plum/70", label: "Console" },
  error: { icon: Bug, tone: "bg-bad/10 text-bad", label: "Error" },
};
const secs = (ms: number) => (ms < 1000 ? `${ms} ms` : ms < 60000 ? `${(ms / 1000).toFixed(1)} s` : `${Math.floor(ms / 60000)} min ${Math.round((ms % 60000) / 1000)} s`);
const fileOf = (u: string) => { try { const x = new URL(u); return { host: x.host, name: x.pathname.split("/").filter(Boolean).pop() || x.pathname }; } catch { return { host: "", name: u }; } };

function Breadcrumbs({ ev, message }: { ev: any; message: string }) {
  const crumbs: any[] = ev?.crumbs || [];
  if (!crumbs.length) return <p className="px-5 py-6 text-sm text-plum/60">No steps recorded for this occurrence. Steps are captured by the latest error script — re-copy the snippet if the site uses an old one.</p>;
  return (
    <ol className="relative space-y-0 px-5 py-4">
      {crumbs.map((c, i) => {
        const k = CRUMB[c.c] || CRUMB.console;
        const failed = c.c === "api" && /→ (failed|[45]\d\d)/.test(c.m);
        return (
          <li key={i} className="relative flex gap-3 pb-3">
            <span className="absolute left-[13px] top-7 h-[calc(100%-20px)] w-px bg-plum/10" />
            <span className={cn("relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full", failed ? CRUMB.error.tone : k.tone)}><k.icon className="h-3.5 w-3.5" /></span>
            <div className="min-w-0 flex-1 pt-1">
              <div className={cn("break-words text-[13px]", failed ? "text-bad" : "text-ink")}><span className="font-medium">{k.label}</span> <span className="font-mono text-[12px] text-plum/80">{c.m.replace(/^Opened |^Went to /, "")}</span></div>
            </div>
            <span className="shrink-0 pt-1 font-mono text-[11px] text-plum/45">+{secs(c.t)}</span>
          </li>
        );
      })}
      <li className="relative flex gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bad text-white"><Bug className="h-3.5 w-3.5" /></span>
        <div className="min-w-0 flex-1 pt-1 text-[13px]"><span className="font-semibold text-bad">This error happened</span> <span className="font-mono text-[12px] text-plum/70">{(ev.message || message).slice(0, 140)}</span></div>
      </li>
    </ol>
  );
}

function Frames({ frames, stack }: { frames: any[]; stack: string }) {
  const [all, setAll] = useState(false);
  const [raw, setRaw] = useState(false);
  const shown = all ? frames : frames.filter((f, i) => f.in_app || i === 0).slice(0, 8);
  const hidden = frames.length - shown.length;
  return (
    <Card>
      <CardHeader title="Where in the code" subtitle="The function that crashed, then the code that called it. Highlighted lines are the website's own code."
        action={stack && <button onClick={() => setRaw(!raw)} className="text-xs text-magenta hover:underline">{raw ? "Show tidy view" : "Show raw stack trace"}</button>} />
      {raw || !frames.length ? (
        <pre className="max-h-80 overflow-auto bg-ink p-5 font-mono text-[11.5px] leading-relaxed text-rose scrollbar-thin">{stack || "No stack trace was sent for this error."}</pre>
      ) : (
        <div className="divide-y divide-plum/6">
          {shown.map((f, i) => {
            const { host, name } = fileOf(f.file);
            return (
              <div key={i} className={cn("flex items-center gap-3 px-5 py-2.5", f.in_app ? "bg-magenta/[0.04]" : "opacity-70")}>
                <Code2 className={cn("h-4 w-4 shrink-0", f.in_app ? "text-magenta" : "text-plum/40")} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-[12.5px] text-ink">{f.fn === "?" ? "(anonymous function)" : f.fn}</div>
                  <div className="truncate font-mono text-[11px] text-plum/55" title={f.file}>{name}<span className="text-plum/40">:{f.line}:{f.col}</span>{host && <span className="ml-2 text-plum/40">{host}</span>}</div>
                </div>
                {i === 0 && <Badge tone="critical">crashed here</Badge>}
                {!f.in_app && i !== 0 && <span className="text-[10px] uppercase tracking-wide text-plum/40">library</span>}
              </div>
            );
          })}
          {hidden > 0 && <button onClick={() => setAll(true)} className="flex w-full items-center justify-center gap-1 py-2.5 text-xs text-plum/60 hover:text-magenta"><ChevronDown className="h-3.5 w-3.5" /> Show {hidden} more frame{hidden > 1 ? "s" : ""}</button>}
        </div>
      )}
    </Card>
  );
}

export default function ErrorDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: e, setData, reload } = useApi<any>(`/api/errors/${id}`, { poll: 20000 });
  const [checking, setChecking] = useState(false);
  const [verdict, setVerdict] = useState<{ tone: "ok" | "bad" | "info"; text: string } | null>(null);
  const [range, setRange] = useState<"24h" | "14d">("24h");
  const [picked, setPicked] = useState<string | null>(null);
  const { can } = useAuth();
  const toast = useToast();

  const trend = useMemo(() => {
    const t: number[] = e?.trend || [];
    const end = new Date(); end.setMinutes(0, 0, 0);
    if (range === "24h") return t.slice(-24).map((n, i, arr) => ({ n, t: new Date(end.getTime() - (arr.length - 1 - i) * 3600e3).toLocaleTimeString(undefined, { hour: "numeric" }) }));
    const days: { t: string; n: number }[] = [];
    for (let d = 13; d >= 0; d--) {
      const slice = t.slice(Math.max(0, t.length - (d + 1) * 24), t.length - d * 24);
      days.push({ n: slice.reduce((a, b) => a + b, 0), t: new Date(end.getTime() - d * 86400e3).toLocaleDateString(undefined, { month: "short", day: "numeric" }) });
    }
    return days;
  }, [e?.trend, range]);

  if (!e) return <Loading rows={4} />;
  const ex = explainError(e);
  const withCrumbs = e.events.filter((ev: any) => ev.crumbs?.length);
  const selected = e.events.find((ev: any) => ev.id === picked) || withCrumbs[0] || e.events[0];
  const pages = Object.entries(e.pages || {}).sort((a: any, b: any) => b[1] - a[1]).map(([p]) => p).filter((p) => p.startsWith("http")).slice(0, 3);
  const setStatus = async (status: string) => {
    setData(await patch(`/api/errors/${id}`, { status }));
    toast(status === "resolved" ? "Marked as fixed — it reopens automatically if it comes back" : status === "ignored" ? "Ignored — it won't alert again" : "Reopened");
  };
  const recheck = async () => {
    if (!e.website?.id) return;
    setChecking(true);
    setVerdict(null);
    try {
      const r: any = await post(`/api/websites/${e.website.id}/recheck`, { urls: pages });
      if (r.status === "failed") setVerdict({ tone: "bad", text: `The re-check couldn't finish: ${r.error}` });
      else if (r.found.some((f: any) => f.group_id === id)) setVerdict({ tone: "bad", text: `Still happening — we saw it again just now on ${r.found.filter((f: any) => f.group_id === id).map((f: any) => f.page.replace(/^https?:\/\//, "")).join(", ")}.` });
      else if (r.fixed.some((f: any) => f.group_id === id)) setVerdict({ tone: "ok", text: "Looks fixed — it didn't happen on any of the pages, so we marked it resolved. If it comes back, it reopens automatically." });
      else setVerdict({ tone: "info", text: `It didn't happen in our browser on ${r.pages.length} page${r.pages.length > 1 ? "s" : ""}. Real visitors reported it, so it stays open — it may only happen on certain browsers, devices, after a click, or when logged in. Check the steps below.` });
      reload();
    } catch (er: any) {
      toast(er.message, "error");
    } finally {
      setChecking(false);
    }
  };
  return (
    <div>
      <Link href="/app/errors" className="mb-4 inline-flex items-center gap-1.5 text-sm text-plum/60 hover:text-magenta"><ArrowLeft className="h-4 w-4" /> Browser errors</Link>
      <PageHeader eyebrow={<span className="flex items-center gap-2">{e.kind === "api" ? "Failed request" : "Page error"} <Badge tone={e.status === "resolved" ? "ok" : e.status}>{e.status === "resolved" ? "fixed" : e.status === "active" ? "open" : e.status}</Badge>{e.third_party && <Badge tone="ignored">third-party · {e.third_party}</Badge>}</span>}
        title={ex.title}
        subtitle={<>{e.website?.name} · <span className="font-mono text-xs">{e.message}</span></>}
        action={can("member") && <>
          {e.status !== "resolved" && <Button variant="secondary" onClick={() => setStatus("resolved")}>Mark as fixed</Button>}
          {e.status !== "ignored" && <Button variant="ghost" onClick={() => setStatus("ignored")}>Ignore</Button>}
          {e.status !== "active" && <Button variant="ghost" onClick={() => setStatus("active")}>Reopen</Button>}
        </>} />

      <Card className="mb-6 overflow-hidden">
        <div className="grid gap-5 p-6 md:grid-cols-2">
          <div className="flex gap-3"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><div><div className="text-sm font-semibold text-ink">What this means</div><p className="mt-1 text-sm text-plum/75">{ex.meaning}</p></div></div>
          <div className="flex gap-3"><Wrench className="mt-0.5 h-5 w-5 shrink-0 text-teal" /><div><div className="text-sm font-semibold text-ink">How to fix it</div><p className="mt-1 text-sm text-plum/75">{ex.fix}</p></div></div>
        </div>
        {can("member") && e.website?.id && (
          <div className="flex flex-wrap items-center gap-3 border-t border-plum/8 bg-cream/40 px-6 py-4">
            <div className="flex-1 text-sm text-plum/75">
              {verdict ? <span className={verdict.tone === "ok" ? "text-ok" : verdict.tone === "bad" ? "text-bad" : "text-plum/80"}>{verdict.text}</span>
                : checking ? `Opening ${pages.length || 1} page${pages.length > 1 ? "s" : ""} in a real browser…` : "Fixed it? Re-check the pages where it happened to confirm."}
            </div>
            <Button onClick={recheck} loading={checking}><RefreshCw className="h-4 w-4" /> Re-check {pages.length > 1 ? `these ${pages.length} pages` : "this page"}</Button>
          </div>
        )}
      </Card>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Times it happened" value={e.count} sub={e.origins ? [e.origins.visitors && `${e.origins.visitors} from visitors`, e.origins.recheck && `${e.origins.recheck} in re-checks`].filter(Boolean).join(" · ") : undefined} />
        <Stat label="Visitors affected" value={e.users || (e.origins?.visitors ? "—" : 0)} sub={e.users ? `across ${Object.keys(e.pages || {}).length} page${Object.keys(e.pages || {}).length === 1 ? "" : "s"}` : "counted by the latest error script"} tone={e.users > 10 ? "bad" : "default"} />
        <Stat label="First seen" value={timeAgo(e.first_seen)} sub={e.first_release ? `in release ${e.first_release}` : fmtDate(e.first_seen)} />
        <Stat label="Last seen" value={timeAgo(e.last_seen)} sub={e.regressed_at ? `came back ${timeAgo(e.regressed_at)}` : e.last_release ? `release ${e.last_release}` : undefined} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title="How often it happens" action={<Tabs<"24h" | "14d"> value={range} onChange={setRange} tabs={[{ id: "24h", label: "24 hours" }, { id: "14d", label: "14 days" }]} />} />
            <div className="px-3 pb-4"><TrendBars data={trend} /></div>
          </Card>

          {e.kind === "api" && e.api ? (
            <Card className="p-5">
              <KV k="Method" v={e.api.method} mono /><KV k="URL" v={e.api.url} mono /><KV k="Status" v={e.api.status || "network error"} mono /><KV k="Duration" v={`${e.api.duration} ms`} mono />
            </Card>
          ) : (e.frames?.length > 0 || e.stack) && <Frames frames={e.frames || []} stack={e.stack} />}

          <Card>
            <CardHeader title="What the visitor did before the error" subtitle={selected ? `${selected.origin === "recheck" ? "Watchfront re-check" : `${selected.browser} · ${selected.os} · ${selected.device}`} · ${fmtDate(selected.at)} · ${(selected.page || "").replace(/^https?:\/\//, "")}` : undefined} />
            {selected ? <Breadcrumbs ev={selected} message={e.message} /> : <p className="px-5 py-6 text-sm text-plum/60">No occurrences stored yet.</p>}
          </Card>

          <Card>
            <CardHeader title="Occurrences" subtitle="Click one to see what that visitor did. We keep the first 20 and a sample after that." />
            <div className="max-h-96 divide-y divide-plum/6 overflow-y-auto scrollbar-thin">
              {e.events.map((ev: any) => (
                <button key={ev.id} onClick={() => setPicked(ev.id)} className={cn("flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-5 py-2.5 text-left text-xs transition hover:bg-cream/60", selected?.id === ev.id && "bg-cream")}>
                  <span className="w-32 font-mono text-plum/60">{fmtDate(ev.at)}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-ink">{ev.page}</span>
                  <span className="text-plum/60">{ev.origin === "recheck" ? "Watchfront re-check" : `${ev.browser} · ${ev.os} · ${ev.device}`}</span>
                  {ev.n > 1 && <span className="font-mono text-plum/50">×{ev.n}</span>}
                  {ev.crumbs?.length > 0 && <span className="text-magenta">{ev.crumbs.length} steps</span>}
                </button>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Dist title="Pages" data={e.pages} />
          <Dist title="Browsers" data={e.browsers} />
          <Dist title="Devices" data={e.devices} />
          <Dist title="Operating systems" data={e.os} />
          <Dist title="Releases" data={e.releases} />
        </div>
      </div>
    </div>
  );
}
