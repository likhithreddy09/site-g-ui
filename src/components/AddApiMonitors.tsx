"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, FileJson, Lock, PenLine, Plug, Terminal, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ApiMonitorForm } from "./ApiMonitorForm";
import { useToast } from "./toast";
import { Button, Input, Select, cn } from "./ui";
import { post } from "@/lib/api";
import { useApi } from "@/lib/hooks";

type Mode = "menu" | "manual" | "curl" | "openapi";

const OPTIONS: { id: Mode; icon: typeof PenLine; title: string; body: string }[] = [
  {
    id: "manual",
    icon: PenLine,
    title: "Add API monitor",
    body: "Name, URL, method, headers, auth, validation and frequency — then test before you save.",
  },
  {
    id: "curl",
    icon: Terminal,
    title: "Import from cURL",
    body: "Paste a cURL command. We extract the URL, method, headers, body and auth for you.",
  },
  {
    id: "openapi",
    icon: FileJson,
    title: "Import OpenAPI / Swagger",
    body: "Upload an OpenAPI spec, pick the endpoints to watch, and create monitors in bulk.",
  },
];

export function AddApiMonitors({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [mode, setMode] = useState<Mode>("menu");
  const opt = OPTIONS.find((o) => o.id === mode);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cream">
      <header className="flex items-center gap-3 border-b border-plum/10 bg-white px-5 py-3">
        {mode !== "menu" && (
          <button onClick={() => setMode("menu")} className="rounded-lg p-1.5 text-plum/60 hover:bg-plum/5" aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-magenta text-white">
          <Plug className="h-4 w-4" />
        </span>
        <span className="text-sm font-semibold text-ink">{opt ? opt.title : "API monitoring"}</span>
        <button onClick={onClose} className="ml-auto rounded-lg p-2 text-plum/50 hover:bg-plum/5 hover:text-ink" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        {mode === "menu" && (
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-ink">Add an API to monitor</h2>
            <p className="mt-1 text-sm text-plum/70">
              Watchfront calls your endpoints on a schedule, validates the response, and opens an incident when something breaks.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {OPTIONS.map((o, i) => (
                <motion.button
                  key={o.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMode(o.id)}
                  className="group rounded-3xl bg-white p-5 text-left ring-1 ring-plum/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-magenta/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream-2 text-magenta transition group-hover:bg-magenta group-hover:text-white">
                    <o.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 text-base font-semibold text-ink">{o.title}</div>
                  <p className="mt-1 text-sm text-plum/70">{o.body}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 ring-1 ring-plum/10">
            <ApiMonitorForm
              onSaved={() => {
                onDone();
                onClose();
              }}
            />
          </div>
        )}

        {mode === "curl" && (
          <CurlImport
            onSaved={() => {
              onDone();
              onClose();
            }}
          />
        )}

        {mode === "openapi" && <OpenApiImport onDone={onDone} onClose={onClose} />}
      </div>
    </div>
  );
}

function CurlImport({ onSaved }: { onSaved: () => void }) {
  const toast = useToast();
  const [curl, setCurl] = useState("");
  const [prefill, setPrefill] = useState<any>(null);
  const [n, setN] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const read = async () => {
    setErr(null);
    setBusy(true);
    try {
      const r: any = await post("/api/api-monitors/import/parse", { content: curl, format: "curl" });
      if (!r.items?.length) throw new Error("Could not parse that cURL command.");
      setPrefill(r.items[0]);
      setN((x) => x + 1);
      toast("Filled from your cURL command");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-2xl bg-white p-5 ring-1 ring-plum/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Terminal className="h-4 w-4 text-magenta" /> Paste cURL
        </div>
        <p className="mt-1 text-xs text-plum/60">
          Chrome DevTools → Network → right-click request → Copy → Copy as cURL. Tokens move into encrypted secret headers.
        </p>
        <textarea
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          rows={4}
          placeholder={`curl 'https://api.example.com/v1/health' -H 'Authorization: Bearer …'`}
          className="mt-3 w-full rounded-xl bg-cream/60 px-3.5 py-2.5 font-mono text-xs text-ink outline-none ring-1 ring-plum/15 focus:ring-2 focus:ring-magenta/50"
        />
        {err && <p className="mt-2 text-sm text-bad">{err}</p>}
        <div className="mt-2 flex justify-end">
          <Button size="sm" variant="secondary" disabled={!curl.trim()} loading={busy} onClick={read}>
            Fill form
          </Button>
        </div>
      </div>
      {prefill && (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-plum/10">
          <ApiMonitorForm
            key={n}
            initial={prefill}
            onSaved={() => {
              toast("API monitor added");
              onSaved();
            }}
          />
        </div>
      )}
    </div>
  );
}

function OpenApiImport({ onDone, onClose }: { onDone: () => void; onClose: () => void }) {
  const toast = useToast();
  const { data: sites } = useApi<any[]>("/api/websites");
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
      const r: any = await post("/api/api-monitors/import/parse", { content: text, format: "auto" });
      if (!r.items?.length) throw new Error("No endpoints found in this file.");
      // Prefer OpenAPI; still accept Postman if user drops one
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
      const r: any = await post("/api/api-monitors/import", {
        items,
        variables: vars,
        website_id: siteId || null,
        interval_sec: interval,
      });
      setResult(r);
      if (r.created.length) {
        toast(`${r.created.length} API monitor${r.created.length > 1 ? "s" : ""} added`);
        onDone();
      }
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 rounded-3xl bg-white p-8 ring-1 ring-plum/10">
        <h2 className="text-2xl font-semibold text-ink">
          {result.created.length ? `${result.created.length} monitor${result.created.length > 1 ? "s" : ""} added` : "Nothing was added"}
        </h2>
        <p className="text-sm text-plum/70">First checks run within a few seconds.</p>
        {result.skipped.length > 0 && (
          <div className="rounded-xl bg-plum/5 p-3 text-sm text-plum/75">
            <b>{result.skipped.length} skipped</b> (already monitored)
          </div>
        )}
        {result.failed.length > 0 && (
          <div className="rounded-xl bg-bad/8 p-3 text-sm text-bad">
            <b>{result.failed.length} failed:</b>
            <ul className="mt-1 list-disc pl-5">
              {result.failed.map((f: any, i: number) => (
                <li key={i}>
                  {f.name}: {f.error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end">
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
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              loadFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed bg-white p-10 text-center transition",
              drag ? "border-magenta bg-magenta/5" : "border-plum/15 hover:border-magenta/40",
            )}
          >
            <Upload className="h-8 w-8 text-magenta" />
            <div className="font-semibold text-ink">Drop OpenAPI / Swagger JSON here</div>
            <div className="text-xs text-plum/60">openapi.json, swagger.json — or paste below</div>
            {fileName && <div className="text-xs text-teal">{fileName}</div>}
            <input ref={fileRef} type="file" className="hidden" accept=".json,application/json" onChange={(e) => loadFile(e.target.files?.[0])} />
          </label>
          <details className="rounded-2xl bg-white p-4 ring-1 ring-plum/10">
            <summary className="cursor-pointer text-sm font-medium text-plum">…or paste the JSON</summary>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder='{"openapi":"3.0.0","paths":{…}}'
              className="mt-3 w-full rounded-xl bg-cream/60 px-3.5 py-2.5 font-mono text-xs outline-none ring-1 ring-plum/15 focus:ring-2 focus:ring-magenta/50"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" disabled={!content.trim()} loading={busy} onClick={() => read(content)}>
                Read endpoints
              </Button>
            </div>
          </details>
          {busy && <p className="text-center text-sm text-plum/60">Reading…</p>}
          {err && <p className="rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad">{err}</p>}
        </>
      )}

      {parsed && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Found {items.length} endpoint{items.length === 1 ? "" : "s"}{" "}
                <span className="text-sm font-normal text-plum/55">in {fileName || "your paste"}</span>
              </h2>
              <p className="text-xs text-plum/60">GET requests are pre-selected. Review before creating monitors.</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setParsed(null);
                setContent("");
                setFileName("");
              }}
            >
              Choose another file
            </Button>
          </div>

          {varNames.length > 0 && (
            <div className="rounded-2xl bg-white p-5 ring-1 ring-plum/10">
              <div className="text-sm font-semibold text-ink">Fill in variables</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {varNames.map((k) => (
                  <Input
                    key={k}
                    label={k}
                    value={vars[k]}
                    type={/token|key|secret|password/i.test(k) ? "password" : "text"}
                    onChange={(e) => setVars({ ...vars, [k]: e.target.value })}
                    placeholder={k === "baseUrl" ? "https://api.example.com" : "value"}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-plum/10">
            <div className="flex items-center gap-3 border-b border-plum/8 px-5 py-3 text-xs text-plum/60">
              <input
                type="checkbox"
                className="accent-magenta"
                aria-label="Select all"
                checked={items.filter((i) => !i.exists).every((i) => picked.has(i.key)) && items.some((i) => !i.exists)}
                onChange={(e) =>
                  setPicked(e.target.checked ? new Set(items.filter((i) => !i.exists).map((i) => i.key)) : new Set())
                }
              />
              {picked.size} selected
            </div>
            <ul className="max-h-[45vh] divide-y divide-plum/6 overflow-y-auto">
              {items.map((i) => (
                <li key={i.key} className={cn("flex items-start gap-3 px-5 py-3", i.exists && "opacity-50")}>
                  <input
                    type="checkbox"
                    className="mt-1 accent-magenta"
                    disabled={i.exists}
                    checked={picked.has(i.key)}
                    aria-label={`Select ${i.name}`}
                    onChange={() =>
                      setPicked((s) => {
                        const n = new Set(s);
                        if (n.has(i.key)) n.delete(i.key);
                        else n.add(i.key);
                        return n;
                      })
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                          i.method === "GET" ? "bg-teal/10 text-teal" : "bg-gold/20 text-[#8a5b00]",
                        )}
                      >
                        {i.method}
                      </span>
                      <span className="text-sm font-medium text-ink">{i.name}</span>
                      {Object.keys(i.secret_headers || {}).length > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-magenta">
                          <Lock className="h-3 w-3" /> secrets
                        </span>
                      )}
                      {i.exists && <span className="text-[11px] text-ok">Already monitored</span>}
                    </div>
                    <div className="truncate font-mono text-[11px] text-plum/60">{i.url}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-end gap-4 rounded-2xl bg-white p-5 ring-1 ring-plum/10">
            <div className="w-56">
              <Select label="Link to website (optional)" value={siteId} onChange={(e) => setSiteId(e.target.value)}>
                <option value="">- none -</option>
                {(sites || []).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-48">
              <Select label="Check every" value={interval} onChange={(e) => setInterval_(Number(e.target.value))}>
                {[
                  [60, "1 minute"],
                  [300, "5 minutes"],
                  [600, "10 minutes"],
                  [1800, "30 minutes"],
                  [3600, "60 minutes"],
                ].map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>
            {missingVars.length > 0 && <p className="text-xs text-[#8a5b00]">Fill in {missingVars.join(", ")} first.</p>}
            <div className="ml-auto">
              <Button onClick={doImport} loading={busy} disabled={!picked.size || missingVars.length > 0}>
                <Check className="h-4 w-4" /> Add {picked.size} monitor{picked.size === 1 ? "" : "s"}
              </Button>
            </div>
          </div>
          {err && <p className="rounded-xl bg-bad/8 px-4 py-3 text-sm text-bad">{err}</p>}
        </>
      )}
    </div>
  );
}
