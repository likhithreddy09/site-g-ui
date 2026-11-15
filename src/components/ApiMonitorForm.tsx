"use client";

import { Lock, Plus, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import { patch, post } from "@/lib/api";
import { Button, ChipInput, ErrorBox, Input, Select, Textarea } from "./ui";

type KVRow = { k: string; v: string };
const toRows = (o: Record<string, string> = {}): KVRow[] => Object.entries(o).map(([k, v]) => ({ k, v }));
const toObj = (rows: KVRow[]) => Object.fromEntries(rows.filter((r) => r.k.trim()).map((r) => [r.k.trim(), r.v]));

const FREQUENCIES = [
  [60, "Every 1 minute"],
  [300, "Every 5 minutes"],
  [600, "Every 10 minutes"],
  [1800, "Every 30 minutes"],
  [3600, "Every 60 minutes"],
] as const;

function KVEditor({
  label,
  rows,
  setRows,
  keyPh,
  valPh,
  secret,
}: {
  label: React.ReactNode;
  rows: KVRow[];
  setRows: (r: KVRow[]) => void;
  keyPh?: string;
  valPh?: string;
  secret?: boolean;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-plum">{label}</span>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={r.k}
              onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, k: e.target.value } : x)))}
              placeholder={keyPh || "Name"}
            />
            <Input
              type={secret ? "password" : "text"}
              value={r.v}
              onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, v: e.target.value } : x)))}
              placeholder={valPh || (secret ? "Secret (encrypted)" : "Value")}
            />
            <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-plum/40 hover:text-bad" aria-label="Remove">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setRows([...rows, { k: "", v: "" }])} className="flex items-center gap-1 text-xs text-magenta">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </div>
  );
}

function inferAuth(initial?: any): { type: string; token: string; keyName: string; username: string; password: string } {
  const secrets = initial?.secret_headers || {};
  const keys = Object.keys(secrets);
  if (keys.some((k) => k.toLowerCase() === "authorization")) {
    return { type: "bearer", token: "", keyName: "X-API-Key", username: "", password: "" };
  }
  if (keys.length) {
    return { type: "api_key", token: "", keyName: keys[0], username: "", password: "" };
  }
  return { type: "none", token: "", keyName: "X-API-Key", username: "", password: "" };
}

export function ApiMonitorForm({ initial, onSaved }: { initial?: any; onSaved: (m: any) => void }) {
  const inferred = inferAuth(initial);
  const [f, setF] = useState({
    name: initial?.name || "",
    url: initial?.url || "",
    method: initial?.method || "GET",
    body: initial?.body || "",
    body_type: initial?.body_type || "json",
    expected_statuses: (initial?.expected_statuses || [200]).map(String),
    max_response_ms: initial?.max_response_ms || 0,
    interval_sec: initial?.interval_sec || 300,
    timeout_sec: initial?.timeout_sec || 15,
    failure_threshold: initial?.failure_threshold || 2,
    retries: initial?.retries ?? 1,
  });
  const [headers, setHeaders] = useState<KVRow[]>(toRows(initial?.headers));
  const [query, setQuery] = useState<KVRow[]>(toRows(initial?.query));
  const [authType, setAuthType] = useState(inferred.type);
  const [bearer, setBearer] = useState("");
  const [apiKeyName, setApiKeyName] = useState(inferred.keyName);
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [basicUser, setBasicUser] = useState("");
  const [basicPass, setBasicPass] = useState("");
  const [customSecrets, setCustomSecrets] = useState<KVRow[]>(
    inferred.type === "api_key" || inferred.type === "bearer" ? [] : toRows(initial?.secret_headers),
  );
  const [assertions, setAssertions] = useState<any[]>(initial?.assertions || []);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const set = (k: string, v: any) => setF((x) => ({ ...x, [k]: v }));

  const buildSecretHeaders = (): Record<string, string> => {
    if (authType === "bearer") {
      if (!bearer && initial?.secret_headers?.Authorization) return { Authorization: "••••••" };
      return bearer ? { Authorization: `Bearer ${bearer.replace(/^Bearer\s+/i, "")}` } : {};
    }
    if (authType === "api_key") {
      const name = apiKeyName.trim() || "X-API-Key";
      if (!apiKeyValue && initial?.secret_headers?.[name]) return { [name]: "••••••" };
      return apiKeyValue ? { [name]: apiKeyValue } : {};
    }
    if (authType === "basic") {
      if (!basicUser && !basicPass && initial?.secret_headers?.Authorization) return { Authorization: "••••••" };
      if (!basicUser) return {};
      const token = typeof btoa !== "undefined" ? btoa(`${basicUser}:${basicPass}`) : "";
      return token ? { Authorization: `Basic ${token}` } : {};
    }
    if (authType === "custom") {
      const removed = Object.keys(initial?.secret_headers || {}).filter((k) => !customSecrets.find((s) => s.k === k));
      const obj: Record<string, string> = { ...toObj(customSecrets) };
      removed.forEach((k) => (obj[k] = ""));
      return obj;
    }
    // none — clear previous secrets on save if editing
    if (initial?.secret_headers) {
      return Object.fromEntries(Object.keys(initial.secret_headers).map((k) => [k, ""]));
    }
    return {};
  };

  const payload = () => ({
    ...f,
    id: initial?.id,
    website_id: initial?.website_id || null,
    headers: toObj(headers),
    query: toObj(query),
    secret_headers: buildSecretHeaders(),
    assertions,
    store_body: true,
  });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = payload();
      onSaved(initial?.id ? await patch(`/api/api-monitors/${initial.id}`, body) : await post("/api/api-monitors", body));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const testRequest = async () => {
    setTesting(true);
    setError(null);
    setTestResult(null);
    try {
      const r = await post("/api/api-monitors/test", payload());
      setTestResult(r);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTesting(false);
    }
  };

  const setA = (i: number, k: string, v: string) => setAssertions(assertions.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  return (
    <form onSubmit={save} className="space-y-7">
      <ErrorBox error={error} />

      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-ink">Request</h4>
        <Input label="Monitor name" required value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Login API" />
        <div className="flex gap-2">
          <div className="w-32">
            <Select label="Method" value={f.method} onChange={(e) => set("method", e.target.value)}>
              {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </div>
          <div className="flex-1">
            <Input label="API endpoint URL" required value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://api.example.com/v1/health" />
          </div>
        </div>
        {f.method !== "GET" && (
          <p className="rounded-xl bg-gold/15 px-3 py-2 text-xs text-[#8a5b00]">
            A real {f.method} request is sent on every check. Prefer a safe test endpoint or test data.
          </p>
        )}
        <KVEditor label="Request headers" rows={headers} setRows={setHeaders} keyPh="Header name" valPh="Value" />
        <KVEditor label="Query parameters" rows={query} setRows={setQuery} keyPh="Param" valPh="Value" />

        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Authentication" value={authType} onChange={(e) => setAuthType(e.target.value)}>
            <option value="none">None</option>
            <option value="bearer">Bearer token</option>
            <option value="api_key">API key header</option>
            <option value="basic">Basic auth</option>
            <option value="custom">Custom secret headers</option>
          </Select>
          <Input
            label="Request timeout (seconds)"
            type="number"
            value={f.timeout_sec}
            onChange={(e) => set("timeout_sec", Number(e.target.value))}
          />
        </div>

        {authType === "bearer" && (
          <Input
            label="Bearer token (encrypted)"
            type="password"
            value={bearer}
            onChange={(e) => setBearer(e.target.value)}
            placeholder={initial?.secret_headers?.Authorization ? "•••••• (leave blank to keep)" : "eyJhbGciOi…"}
          />
        )}
        {authType === "api_key" && (
          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Header name" value={apiKeyName} onChange={(e) => setApiKeyName(e.target.value)} placeholder="X-API-Key" />
            <Input
              label="API key"
              type="password"
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              placeholder={initial?.secret_headers?.[apiKeyName] ? "•••••• (leave blank to keep)" : "sk_live_…"}
            />
          </div>
        )}
        {authType === "basic" && (
          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Username" value={basicUser} onChange={(e) => setBasicUser(e.target.value)} />
            <Input label="Password" type="password" value={basicPass} onChange={(e) => setBasicPass(e.target.value)} />
          </div>
        )}
        {authType === "custom" && (
          <KVEditor
            label={<span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Secret headers <span className="font-normal text-plum/45">(encrypted)</span></span>}
            rows={customSecrets}
            setRows={setCustomSecrets}
            secret
          />
        )}

        {f.method !== "GET" && (
          <div className="grid gap-3 md:grid-cols-[1fr_140px]">
            <Textarea label="Request body" rows={4} value={f.body} onChange={(e) => set("body", e.target.value)} className="font-mono text-xs" placeholder='{"ping": true}' />
            <Select label="Body format" value={f.body_type} onChange={(e) => set("body_type", e.target.value)}>
              <option value="json">JSON</option>
              <option value="form">Form</option>
              <option value="text">Text</option>
            </Select>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">Response validation</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <ChipInput
            label="Expected status codes"
            values={f.expected_statuses}
            onChange={(v) => set("expected_statuses", v)}
            placeholder="200"
            hint="e.g. 200, 201"
          />
          <Input
            label="Fail if slower than (ms)"
            type="number"
            value={f.max_response_ms || ""}
            onChange={(e) => set("max_response_ms", Number(e.target.value))}
            placeholder="Off"
            hint="Leave empty to skip latency checks"
          />
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-medium text-plum">
            Expected response values <span className="font-normal text-plum/45">— e.g. status equals success</span>
          </span>
          <div className="space-y-2">
            {assertions.map((a, i) => (
              <div key={i} className="grid grid-cols-[150px_1fr_120px_1fr_24px] gap-2">
                <Select value={a.type} onChange={(e) => setA(i, "type", e.target.value)}>
                  <option value="json_path">JSON field</option>
                  <option value="body_contains">Body contains</option>
                  <option value="body_not_contains">Body excludes</option>
                  <option value="header">Header</option>
                  <option value="response_time">Response time</option>
                </Select>
                <Input
                  value={a.path || ""}
                  disabled={a.type.startsWith("body") || a.type === "response_time"}
                  onChange={(e) => setA(i, "path", e.target.value)}
                  placeholder={a.type === "header" ? "content-type" : a.type === "json_path" ? "status" : "-"}
                />
                <Select value={a.op} disabled={a.type.startsWith("body")} onChange={(e) => setA(i, "op", e.target.value)}>
                  {[
                    ["equals", "equals"],
                    ["not_equals", "is not"],
                    ["contains", "contains"],
                    ["exists", "exists"],
                    ["gt", "more than"],
                    ["lt", "less than"],
                  ].map(([o, l]) => (
                    <option key={o} value={o}>
                      {l}
                    </option>
                  ))}
                </Select>
                <Input
                  value={a.value || ""}
                  disabled={a.op === "exists" && !a.type.startsWith("body")}
                  onChange={(e) => setA(i, "value", e.target.value)}
                  placeholder="expected value"
                />
                <button type="button" onClick={() => setAssertions(assertions.filter((_, j) => j !== i))} className="text-plum/40 hover:text-bad" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAssertions([...assertions, { type: "json_path", path: "status", op: "equals", value: "success" }])}
              className="flex items-center gap-1 text-xs text-magenta"
            >
              <Plus className="h-3.5 w-3.5" /> Add validation
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold text-ink">Schedule & alerts</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Monitoring frequency" value={f.interval_sec} onChange={(e) => set("interval_sec", Number(e.target.value))}>
            {FREQUENCIES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
          <Select label="Open incident after" value={f.failure_threshold} onChange={(e) => set("failure_threshold", Number(e.target.value))}>
            <option value={1}>1 consecutive failure</option>
            <option value={2}>2 consecutive failures (recommended)</option>
            <option value={3}>3 consecutive failures</option>
          </Select>
        </div>
      </section>

      {testResult && (
        <div className={`rounded-2xl px-4 py-3 text-sm ring-1 ${testResult.ok ? "bg-ok/8 text-ok ring-ok/20" : "bg-bad/8 text-bad ring-bad/20"}`}>
          <div className="font-semibold">{testResult.ok ? "Test passed" : "Test failed"}</div>
          <div className="mt-1 font-mono text-xs opacity-90">
            {testResult.status_code != null ? `HTTP ${testResult.status_code}` : "No response"}
            {testResult.response_ms != null ? ` · ${Math.round(testResult.response_ms)} ms` : ""}
            {testResult.error ? ` · ${testResult.error}` : ""}
          </div>
          {(testResult.assertions || []).length > 0 && (
            <ul className="mt-2 space-y-0.5 font-mono text-[11px]">
              {testResult.assertions.map((a: any, i: number) => (
                <li key={i}>
                  {a.ok ? "✓" : "✗"} {a.type} {a.path || ""} {a.op || ""} {a.value || ""}
                  {!a.ok && a.actual != null ? ` (got ${String(a.actual)})` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="secondary" loading={testing} onClick={testRequest} disabled={!f.url.trim()}>
          <Zap className="h-4 w-4" /> Test request
        </Button>
        <Button type="submit" loading={saving}>
          {initial?.id ? "Save monitor" : "Save & start monitoring"}
        </Button>
      </div>
    </form>
  );
}
