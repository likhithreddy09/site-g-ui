"use client";

import { Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { patch, post } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { Button, ChipInput, ErrorBox, Input, Select, Textarea, Toggle } from "./ui";

type KVRow = { k: string; v: string };
const toRows = (o: Record<string, string> = {}): KVRow[] => Object.entries(o).map(([k, v]) => ({ k, v }));
const toObj = (rows: KVRow[]) => Object.fromEntries(rows.filter((r) => r.k.trim()).map((r) => [r.k.trim(), r.v]));

function KVEditor({ label, rows, setRows, secret }: { label: React.ReactNode; rows: KVRow[]; setRows: (r: KVRow[]) => void; secret?: boolean }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <Input value={r.k} onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, k: e.target.value } : x)))} placeholder="Header name" />
            <Input type={secret ? "password" : "text"} value={r.v} onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)))} placeholder={secret ? "Secret value (stored encrypted)" : "Value"} />
            <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-plum/40 hover:text-bad"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setRows([...rows, { k: "", v: "" }])} className="flex items-center gap-1 text-xs text-magenta"><Plus className="h-3.5 w-3.5" /> Add</button>
      </div>
    </div>
  );
}

export function ApiMonitorForm({ initial, onSaved }: { initial?: any; onSaved: (m: any) => void }) {
  const { data: sites } = useApi<any[]>("/api/websites");
  const [f, setF] = useState({
    name: initial?.name || "", url: initial?.url || "", method: initial?.method || "GET", website_id: initial?.website_id || "",
    body: initial?.body || "", body_type: initial?.body_type || "json", expected_statuses: (initial?.expected_statuses || [200]).map(String),
    max_response_ms: initial?.max_response_ms || 0, interval_sec: initial?.interval_sec || 300, timeout_sec: initial?.timeout_sec || 15,
    retries: initial?.retries ?? 1, failure_threshold: initial?.failure_threshold || 2, store_body: initial?.store_body || false,
  });
  const [headers, setHeaders] = useState<KVRow[]>(toRows(initial?.headers));
  const [query, setQuery] = useState<KVRow[]>(toRows(initial?.query));
  const [secrets, setSecrets] = useState<KVRow[]>(toRows(initial?.secret_headers));
  const [assertions, setAssertions] = useState<any[]>(initial?.assertions || []);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setF((x) => ({ ...x, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const removed = Object.keys(initial?.secret_headers || {}).filter((k) => !secrets.find((s) => s.k === k));
    const secretObj: Record<string, string> = { ...toObj(secrets) };
    removed.forEach((k) => (secretObj[k] = ""));
    try {
      const body = { ...f, website_id: f.website_id || null, headers: toObj(headers), query: toObj(query), secret_headers: secretObj, assertions };
      onSaved(initial?.id ? await patch(`/api/api-monitors/${initial.id}`, body) : await post("/api/api-monitors", body));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const setA = (i: number, k: string, v: string) => setAssertions(assertions.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  return (
    <form onSubmit={save} className="space-y-6">
      <ErrorBox error={error} />
      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-ink">1. Which API?</h4>
        <div className="flex gap-2">
          <div className="w-32"><Select label="Method" value={f.method} onChange={(e) => set("method", e.target.value)}>{["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"].map((m) => <option key={m}>{m}</option>)}</Select></div>
          <div className="flex-1"><Input label="Address (URL)" required value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://api.client.com/health" /></div>
        </div>
        {f.method !== "GET" && f.method !== "HEAD" && (
          <p className="rounded-xl bg-gold/15 px-3 py-2 text-xs text-[#8a5b00]">A {f.method} request is sent for real on every check. Use a test endpoint or test data so nothing important is created or changed.</p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Booking API health" />
          <Select label="Website (optional)" value={f.website_id} onChange={(e) => set("website_id", e.target.value)}>
            <option value="">— none —</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </div>
        {f.method !== "GET" && f.method !== "HEAD" && (
          <div className="grid gap-3 md:grid-cols-[1fr_140px]">
            <Textarea label="Data to send (body)" rows={4} value={f.body} onChange={(e) => set("body", e.target.value)} className="font-mono text-xs" placeholder='{"ping": true}' />
            <Select label="Format" value={f.body_type} onChange={(e) => set("body_type", e.target.value)}><option value="json">JSON</option><option value="form">Form</option><option value="text">Text</option></Select>
          </div>
        )}
        <KVEditor label={<span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Login / API key headers <span className="font-normal text-plum/45">(stored encrypted, never shown again)</span></span>} rows={secrets} setRows={setSecrets} secret />
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">2. What counts as working?</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <ChipInput label="Expected status codes" values={f.expected_statuses} onChange={(v) => set("expected_statuses", v)} placeholder="200" hint="200 = OK, 201 = created, 204 = no content" />
          <Input label="Slow if it takes longer than (ms)" type="number" value={f.max_response_ms || ""} onChange={(e) => set("max_response_ms", Number(e.target.value))} placeholder="Off" hint="1000 ms = 1 second. Leave empty to not check speed." />
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-medium text-plum">Extra checks on the answer <span className="font-normal text-plum/45">— e.g. the response must say &quot;status&quot;: &quot;ok&quot;</span></span>
          <div className="space-y-2">
            {assertions.map((a, i) => (
              <div key={i} className="grid grid-cols-[170px_1fr_130px_1fr_24px] gap-2">
                <Select value={a.type} onChange={(e) => setA(i, "type", e.target.value)}>
                  <option value="json_path">Response field</option><option value="body_contains">Response contains</option><option value="body_not_contains">Response doesn&apos;t contain</option><option value="header">Response header</option><option value="response_time">Response time (ms)</option>
                </Select>
                <Input value={a.path || ""} disabled={a.type.startsWith("body") || a.type === "response_time"} onChange={(e) => setA(i, "path", e.target.value)} placeholder={a.type === "header" ? "content-type" : a.type === "json_path" ? "data.status" : "—"} />
                <Select value={a.op} disabled={a.type.startsWith("body")} onChange={(e) => setA(i, "op", e.target.value)}>
                  {[["equals", "equals"], ["not_equals", "is not"], ["contains", "contains"], ["exists", "exists"], ["gt", "more than"], ["lt", "less than"]].map(([o, l]) => <option key={o} value={o}>{l}</option>)}
                </Select>
                <Input value={a.value || ""} disabled={a.op === "exists" && !a.type.startsWith("body")} onChange={(e) => setA(i, "value", e.target.value)} placeholder="expected value" />
                <button type="button" onClick={() => setAssertions(assertions.filter((_, j) => j !== i))} className="text-plum/40 hover:text-bad" aria-label="Remove check"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => setAssertions([...assertions, { type: "json_path", path: "", op: "equals", value: "" }])} className="flex items-center gap-1 text-xs text-magenta"><Plus className="h-3.5 w-3.5" /> Add a check</button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">3. How often?</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Check every" value={f.interval_sec} onChange={(e) => set("interval_sec", Number(e.target.value))}>
            {[60, 120, 300, 600, 1800, 3600].map((v) => <option key={v} value={v}>{v < 3600 ? `${v / 60} minute${v > 60 ? "s" : ""}` : "1 hour"}</option>)}
          </Select>
          <Select label="Alert me" value={f.failure_threshold} onChange={(e) => set("failure_threshold", Number(e.target.value))}>
            <option value={1}>On the first failure</option><option value={2}>After 2 failures in a row (recommended)</option><option value={3}>After 3 failures in a row</option>
          </Select>
        </div>
      </section>

      <details className="rounded-2xl p-4 ring-1 ring-plum/10">
        <summary className="cursor-pointer text-xs font-medium text-plum/60">Advanced (headers, query, timeouts)</summary>
        <div className="mt-4 space-y-4">
          <KVEditor label="Other headers" rows={headers} setRows={setHeaders} />
          <KVEditor label="Query parameters" rows={query} setRows={setQuery} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Give up after (seconds)" type="number" value={f.timeout_sec} onChange={(e) => set("timeout_sec", Number(e.target.value))} />
            <Input label="Retry before counting a failure" type="number" value={f.retries} onChange={(e) => set("retries", Number(e.target.value))} />
          </div>
          <Toggle checked={f.store_body} onChange={(v) => set("store_body", v)} label="Keep response samples" hint="Off by default. When on, the first 2 KB is stored with tokens and emails removed." />
        </div>
      </details>
      <div className="flex justify-end"><Button type="submit" loading={saving}>{initial?.id ? "Save" : "Add monitor"}</Button></div>
    </form>
  );
}
