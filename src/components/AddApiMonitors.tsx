"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, Download, FileJson, FileSpreadsheet, Lock, PenLine, Plug, Radar, Sparkles, Terminal, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ApiMonitorForm } from "./ApiMonitorForm";
import { DiscoveryPanel } from "./DiscoveryPanel";
import { useToast } from "./toast";
import { Button, Input, Select, cn } from "./ui";
import { post } from "@/lib/api";
import { API_MONITOR_TEMPLATES, SAMPLE_CSV } from "@/lib/apiMonitors";
import { useApi } from "@/lib/hooks";

type Mode = "menu" | "discover" | "templates" | "manual" | "file" | "csv";

const OPTIONS: { id: Mode; icon: any; title: string; body: string; who: string }[] = [
  { id: "discover", icon: Radar, title: "Find them automatically", body: "We browse the site, capture live API traffic, and pull OpenAPI / Swagger specs when present. Recommended endpoints are ready to watch in one click.", who: "Easiest - no technical knowledge needed" },
  { id: "templates", icon: Sparkles, title: "Start from a template", body: "Health, auth, and marketing-site API packs for startups and agencies. Paste your base URL and create monitors in one click.", who: "Fastest for common SaaS setups" },
  { id: "manual", icon: PenLine, title: "Add one by hand", body: "Type the address, or paste a cURL command copied from the browser or terminal.", who: "For a single endpoint" },
  { id: "file", icon: FileJson, title: "Import Postman / OpenAPI", body: "Upload a Postman collection, OpenAPI (Swagger) spec, or a HAR file exported from browser DevTools.", who: "For developers - add many at once" },
  { id: "csv", icon: FileSpreadsheet, title: "Upload a spreadsheet", body: "Fill in our sample sheet in Excel or Google Sheets (one API per row) and upload it as CSV.", who: "For teams handing over a list" },
];

export function AddApiMonitors({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [mode, setMode] = useState<Mode>("menu");
  const { data: sites } = useApi<any[]>("/api/websites");
  const [siteId, setSiteId] = useState("");
  const site = sites?.find((s) => s.id === siteId);
  const opt = OPTIONS.find((o) => o.id === mode);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cream">
      <header className="flex items-center gap-3 border-b border-plum/10 bg-white px-5 py-3">
        {mode !== "menu" && <button onClick={() => setMode("menu")} className="rounded-lg p-1.5 text-plum/60 hover:bg-plum/5" aria-label="Back"><ArrowLeft className="h-5 w-5" /></button>}
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-magenta text-white"><Plug className="h-4 w-4" /></span>
        <span className="text-sm font-semibold text-ink">{opt ? opt.title : "Add API monitors"}</span>
        <button onClick={onClose} className="ml-auto rounded-lg p-2 text-plum/50 hover:bg-plum/5 hover:text-ink" aria-label="Close"><X className="h-5 w-5" /></button>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        {mode === "menu" && (
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold text-ink">How would you like to add APIs?</h2>
            <p className="mt-1 text-sm text-plum/70">An API monitor calls a backend address on a schedule and alerts you if it stops answering correctly. Pick whichever is easiest.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {OPTIONS.map((o, i) => (
                <motion.button key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setMode(o.id)}
                  className="group rounded-3xl bg-white p-6 text-left ring-1 ring-plum/10 transition hover:-translate-y-1 hover:shadow-xl hover:ring-magenta/30">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream-2 text-magenta transition group-hover:bg-magenta group-hover:text-white"><o.icon className="h-5 w-5" /></span>
                  <div className="mt-4 text-lg font-semibold text-ink">{o.title}</div>
                  <p className="mt-1 text-sm text-plum/70">{o.body}</p>
                  <p className="mt-3 text-xs font-medium text-teal">{o.who}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {mode === "discover" && (
          <div className="mx-auto max-w-6xl space-y-5">
            <div className="max-w-sm">
              <Select label="Which website?" value={siteId} onChange={(e) => setSiteId(e.target.value)}>
                <option value="">- choose a website -</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
            </div>
            {site ? <DiscoveryPanel key={site.id} site={site} onMonitorsChange={onDone} /> : <p className="text-sm text-plum/60">Choose a website to scan. You can add websites from the Websites page.</p>}
          </div>
        )}

        {mode === "templates" && <TemplatePacks sites={sites || []} onDone={() => { onDone(); onClose(); }} />}
        {mode === "manual" && <ManualAdd onSaved={() => { onDone(); onClose(); }} />}
        {(mode === "file" || mode === "csv") && <ImportPanel key={mode} csv={mode === "csv"} sites={sites || []} onDone={onDone} onClose={onClose} />}
      </div>
    </div>
  );
}

function TemplatePacks({ sites, onDone }: { sites: any[]; onDone: () => void }) {
  const toast = useToast();
  const [base, setBase] = useState("https://api.example.com");
  const [websiteId, setWebsiteId] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const apply = async (pack: (typeof API_MONITOR_TEMPLATES)[number]) => {
    setBusy(pack.id);
    try {
      const root = base.replace(/\/$/, "");
      const items = pack.monitors.map((m) => ({
        name: m.name,
        method: m.method,
        url: `${root}${m.path.startsWith("/") ? m.path : `/${m.path}`}`,
        expected_statuses: m.expected_statuses,
        max_response_ms: m.max_response_ms,
        assertions: m.assertions || [],
        interval_sec: 300,
      }));
      const res: any = await post("/api/api-monitors/import", { items, website_id: websiteId || null });
      toast(`Created ${res.created?.length ?? items.length} monitors from “${pack.name}”`);
      onDone();
    } catch (e: any) {
      toast(e.message, "error");
    } finally {
      setBusy(null);
    }
  };
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="API base URL" value={base} onChange={(e) => setBase(e.target.value)} placeholder="https://api.yourapp.com" />
        <Select label="Attach to website (optional)" value={websiteId} onChange={(e) => setWebsiteId(e.target.value)}>
          <option value="">- none -</option>
          {sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>
      <div className="grid gap-4">
        {API_MONITOR_TEMPLATES.map((pack) => (
          <div key={pack.id} className="rounded-3xl bg-white p-5 ring-1 ring-plum/10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-ink">{pack.name}</div>
                <p className="mt-1 text-sm text-plum/65">{pack.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-plum/70">
                  {pack.monitors.map((m) => <li key={m.name} className="font-mono">{m.method} {m.path}</li>)}
                </ul>
              </div>
              <Button size="sm" loading={busy === pack.id} onClick={() => apply(pack)}>Use template</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManualAdd({ onSaved }: { onSaved: () => void }) {
  const toast = useToast();
  const [curl, setCurl] = useState("");
  const [prefill, setPrefill] = useState<any>(null);
  const [n, setN] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const read = async () => {
    setErr(null);
    try {
      const r: any = await post("/api/api-monitors/import/parse", { content: curl, format: "curl" });
      setPrefill(r.items[0]);
      setN((x) => x + 1);
      toast("Filled in from your cURL command");
    } catch (e: any) {
      setErr(e.message);
    }
  };
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl bg-white p-5 ring-1 ring-plum/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Terminal className="h-4 w-4 text-magenta" /> Have a cURL command? <span className="font-normal text-plum/55">(optional)</span></div>
        <p className="mt-1 text-xs text-plum/60">In Chrome DevTools → Network, right-click a request → Copy → Copy as cURL, then paste it here. Tokens are moved to secret headers automatically.</p>
        <textarea value={curl} onChange={(e) => setCurl(e.target.value)} rows={3} placeholder="curl 'https://api.client.com/v1/health' -H 'Authorization: Bearer …'"
          className="mt-3 w-full rounded-xl bg-cream/60 px-3.5 py-2.5 font-mono text-xs text-ink outline-none ring-1 ring-plum/15 focus:ring-2 focus:ring-magenta/50" />
        {err && <p className="mt-2 text-sm text-bad">{err}</p>}
        <div className="mt-2 flex justify-end"><Button size="sm" variant="secondary" disabled={!curl.trim()} onClick={read}>Fill in the form</Button></div>
      </div>
      <div className="rounded-2xl bg-white p-6 ring-1 ring-plum/10">
        <ApiMonitorForm key={n} initial={prefill || undefined} onSaved={() => { toast("API monitor added - first check in a few seconds"); onSaved(); }} />
      </div>
    </div>
  );
}

function ImportPanel({ csv, sites, onDone, onClose }: { csv: boolean; sites: any[]; onDone: () => void; onClose: () => void }) {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [vars, setVars] = useState<Record<string, string>>({});
  const [siteId, setSiteId] = useState("");
  const [interval, setInterval_] = useState(300);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [drag, setDrag] = useState(false);

  const read = async (text: string) => {
    setErr(null);
    setBusy(true);
    try {
      const r: any = await post("/api/api-monitors/import/parse", { content: text, format: csv ? "csv" : "auto" });
      if (!r.items.length) throw new Error("No APIs found in this file.");
      setParsed(r);
      setVars(r.variables || {});
      setPicked(new Set(r.items.filter((i: any) => !i.exists && i.method === "GET").map((i: any) => i.key)));
    } catch (e: any) {
      setErr(e.message);
      setParsed(null);
    } finally {
      setBusy(false);
    }
  };
  const loadFile = async (f?: File | null) => {
    if (!f) return;
    setFileName(f.name);
    const text = await f.text();
    setContent(text);
    read(text);
  };
  const doImport = async () => {
    setBusy(true);
    setErr(null);
    try {
      const items = parsed.items.filter((i: any) => picked.has(i.key));
      const r: any = await post("/api/api-monitors/import", { items, variables: vars, website_id: siteId || null, interval_sec: interval });
      setResult(r);
      if (r.created.length) { toast(`${r.created.length} API monitor${r.created.length > 1 ? "s" : ""} added`); onDone(); }
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };
  const downloadSample = () => {
    const url = URL.createObjectURL(new Blob([SAMPLE_CSV], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "watchfront-api-monitors-sample.csv" });
    a.click();
    URL.revokeObjectURL(url);
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-white p-8 ring-1 ring-plum/10">
        <h2 className="text-2xl font-semibold text-ink">{result.created.length ? `${result.created.length} API monitor${result.created.length > 1 ? "s" : ""} added` : "Nothing was added"}</h2>
        <p className="text-sm text-plum/70">The first checks run within a few seconds.</p>
        {result.skipped.length > 0 && <div className="rounded-xl bg-plum/5 p-3 text-sm text-plum/75"><b>{result.skipped.length} skipped</b> (already monitored): {result.skipped.map((s: any) => s.name).join(", ")}</div>}
        {result.failed.length > 0 && (
          <div className="rounded-xl bg-bad/8 p-3 text-sm text-bad">
            <b>{result.failed.length} couldn&apos;t be added:</b>
            <ul className="mt-1 list-disc pl-5">{result.failed.map((f: any, i: number) => <li key={i}>{f.row ? `Row ${f.row} - ` : ""}{f.name}: {f.error}</li>)}</ul>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => { setResult(null); setParsed(null); setContent(""); setFileName(""); }}>Import another</Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    );
  }

  const items: any[] = parsed?.items || [];
  const varNames = Object.keys(vars);
  const missingVars = varNames.filter((k) => !vars[k]?.trim() && items.some((i) => picked.has(i.key) && i.url.includes(`{{${k}}}`)));
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {!parsed && (
        <>
          {csv && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-sky/10 p-5 ring-1 ring-sky/30">
              <div className="text-sm text-plum/80">
                <div className="font-semibold text-ink">Step 1 - download the sample sheet</div>
                Open it in Excel or Google Sheets, keep the first row, and add one API per row. Only <b>url</b> is required.
                <div className="mt-1 font-mono text-[11px] text-plum/60">name · method · url · expected_status · max_response_ms · check_every_minutes · headers · body · must_contain · website</div>
              </div>
              <Button variant="secondary" onClick={downloadSample}><Download className="h-4 w-4" /> Sample CSV</Button>
            </div>
          )}
          <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); loadFile(e.dataTransfer.files?.[0]); }}
            className={cn("flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed bg-white p-10 text-center transition", drag ? "border-magenta bg-magenta/5" : "border-plum/15 hover:border-magenta/40")}>
            <Upload className="h-8 w-8 text-magenta" />
            <div className="font-semibold text-ink">{csv ? "Step 2 - upload your CSV" : "Drop your file here, or click to choose"}</div>
            <div className="text-xs text-plum/60">{csv ? "Save as .csv from Excel or Google Sheets (File → Download → CSV)." : "Postman collection (.json), OpenAPI / Swagger (.json), or HAR (.har)"}</div>
            {fileName && <div className="text-xs text-teal">{fileName}</div>}
            <input ref={fileRef} type="file" className="hidden" accept={csv ? ".csv,text/csv" : ".json,.har,application/json"} onChange={(e) => loadFile(e.target.files?.[0])} />
          </label>
          {!csv && (
            <details className="rounded-2xl bg-white p-4 ring-1 ring-plum/10">
              <summary className="cursor-pointer text-sm font-medium text-plum">…or paste the JSON instead</summary>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder='{"info": {"name": "My API", "schema": "…postman…"}, "item": [ … ]}'
                className="mt-3 w-full rounded-xl bg-cream/60 px-3.5 py-2.5 font-mono text-xs outline-none ring-1 ring-plum/15 focus:ring-2 focus:ring-magenta/50" />
              <div className="mt-2 flex justify-end"><Button size="sm" disabled={!content.trim()} loading={busy} onClick={() => read(content)}>Read it</Button></div>
            </details>
          )}
          {!csv && (
            <div className="grid gap-3 text-xs text-plum/70 sm:grid-cols-3">
              <Tip title="Postman">Collection → ⋯ → Export → Collection v2.1</Tip>
              <Tip title="OpenAPI / Swagger">Download the openapi.json / swagger.json from your API docs</Tip>
              <Tip title="HAR (any website)">Chrome DevTools → Network → right-click → Save all as HAR</Tip>
            </div>
          )}
          {busy && <p className="text-center text-sm text-plum/60">Reading…</p>}
          {err && <p className="rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad">{err}</p>}
        </>
      )}

      {parsed && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">Found {items.length} API{items.length === 1 ? "" : "s"} <span className="text-sm font-normal text-plum/55">in {fileName || "your paste"} · {({ postman: "Postman collection", openapi: "OpenAPI spec", har: "HAR file", csv: "CSV sheet", curl: "cURL" } as any)[parsed.format]}</span></h2>
              <p className="text-xs text-plum/60">GET requests are pre-selected. Others send a real request on every check - only tick them if that&apos;s safe.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setParsed(null); setContent(""); setFileName(""); }}>Choose another file</Button>
          </div>

          {varNames.length > 0 && (
            <div className="rounded-2xl bg-white p-5 ring-1 ring-plum/10">
              <div className="text-sm font-semibold text-ink">Fill in the variables</div>
              <p className="mb-3 text-xs text-plum/60">These <span className="font-mono">{"{{placeholders}}"}</span> appear in the requests. Values that look like tokens are stored encrypted.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {varNames.map((k) => (
                  <Input key={k} label={k} value={vars[k]} type={/token|key|secret|password/i.test(k) ? "password" : "text"}
                    onChange={(e) => setVars({ ...vars, [k]: e.target.value })} placeholder={k === "baseUrl" ? "https://api.client.com" : "value"} />
                ))}
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-plum/10">
            <div className="flex items-center gap-3 border-b border-plum/8 px-5 py-3 text-xs text-plum/60">
              <input type="checkbox" className="accent-magenta" aria-label="Select all"
                checked={items.filter((i) => !i.exists).every((i) => picked.has(i.key))}
                onChange={(e) => setPicked(e.target.checked ? new Set(items.filter((i) => !i.exists).map((i) => i.key)) : new Set())} />
              {picked.size} selected
            </div>
            <ul className="max-h-[45vh] divide-y divide-plum/6 overflow-y-auto">
              {items.map((i) => (
                <li key={i.key} className={cn("flex items-start gap-3 px-5 py-3", i.exists && "opacity-50")}>
                  <input type="checkbox" className="mt-1 accent-magenta" disabled={i.exists} checked={picked.has(i.key)} aria-label={`Select ${i.name}`}
                    onChange={() => setPicked((s) => { const n = new Set(s); if (n.has(i.key)) n.delete(i.key); else n.add(i.key); return n; })} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold", i.method === "GET" ? "bg-teal/10 text-teal" : "bg-gold/20 text-[#8a5b00]")}>{i.method}</span>
                      <span className="text-sm font-medium text-ink">{i.name}</span>
                      {i.folder && <span className="text-[11px] text-plum/45">{i.folder}</span>}
                      {Object.keys(i.secret_headers || {}).length > 0 && <span className="flex items-center gap-1 text-[11px] text-magenta"><Lock className="h-3 w-3" /> {Object.keys(i.secret_headers).join(", ")}</span>}
                      {i.exists && <span className="text-[11px] text-ok">Already monitored</span>}
                    </div>
                    <div className="truncate font-mono text-[11px] text-plum/60">{i.url}</div>
                    {(i.warnings || []).length > 0 && i.method !== "GET" && <div className="text-[11px] text-[#8a5b00]">{i.warnings.join(" · ")}</div>}
                  </div>
                  <span className="whitespace-nowrap text-[11px] text-plum/50">expects {i.expected_statuses.join("/")}{i.row ? ` · row ${i.row}` : ""}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-end gap-4 rounded-2xl bg-white p-5 ring-1 ring-plum/10">
            {!csv && (
              <div className="w-56"><Select label="Link to website (optional)" value={siteId} onChange={(e) => setSiteId(e.target.value)}>
                <option value="">- none -</option>{sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select></div>
            )}
            <div className="w-44"><Select label="Check every" value={interval} onChange={(e) => setInterval_(Number(e.target.value))}>
              {[[60, "1 minute"], [300, "5 minutes"], [900, "15 minutes"], [3600, "1 hour"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </Select></div>
            {missingVars.length > 0 && <p className="text-xs text-[#8a5b00]">Fill in {missingVars.map((v) => `“${v}”`).join(", ")} first.</p>}
            <div className="ml-auto"><Button onClick={doImport} loading={busy} disabled={!picked.size || missingVars.length > 0}><Check className="h-4 w-4" /> Add {picked.size} monitor{picked.size === 1 ? "" : "s"}</Button></div>
          </div>
          {err && <p className="rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad">{err}</p>}
        </>
      )}
    </div>
  );
}

function Tip({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-xl bg-white/70 p-3 ring-1 ring-plum/8"><div className="font-semibold text-ink">{title}</div>{children}</div>;
}
