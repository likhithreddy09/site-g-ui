"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api, formatApiError } from "@/lib/api";
import type { ToolKind } from "@/lib/tools";

const ENDPOINT: Record<ToolKind, string> = {
  "website-status": "/api/tools/website-status",
  ssl: "/api/tools/ssl",
  seo: "/api/tools/seo",
  headers: "/api/tools/headers",
};

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-t border-plum/8 py-2.5 sm:flex-row sm:gap-4">
      <dt className="w-40 shrink-0 text-sm text-plum-2">{k}</dt>
      <dd className="min-w-0 break-words text-sm text-ink">{v ?? "—"}</dd>
    </div>
  );
}

function Verdict({ tone, title, body }: { tone: "ok" | "warn" | "bad"; title: string; body?: string }) {
  const Icon = tone === "ok" ? CheckCircle2 : tone === "warn" ? AlertTriangle : XCircle;
  const cls = tone === "ok" ? "bg-ok/10 text-ok" : tone === "warn" ? "bg-gold/25 text-[#6b4700]" : "bg-bad/10 text-bad";
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-4 ${cls}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <div className="font-medium">{title}</div>
        {body && <div className="mt-0.5 text-sm opacity-90">{body}</div>}
      </div>
    </div>
  );
}

function StatusResult({ r }: { r: any }) {
  return (
    <>
      <Verdict
        tone={r.up ? "ok" : "bad"}
        title={r.up ? "It's up - the site is responding from our servers." : "It looks down from our servers."}
        body={r.up ? "If it isn't loading for you, the issue is likely your network, DNS or browser cache." : r.error}
      />
      <dl className="mt-4">
        <Row k="HTTP status" v={r.status_code} />
        <Row k="Response time" v={r.response_ms != null ? `${Math.round(r.response_ms)} ms` : null} />
        <Row k="Final URL" v={r.final_url} />
        <Row k="Redirects" v={r.redirects?.length ? r.redirects.map((h: any) => `${h.status} → ${h.location}`).join("  ·  ") : "None"} />
        {r.server && <Row k="Server" v={r.server} />}
      </dl>
    </>
  );
}

function SslResult({ r }: { r: any }) {
  const days = r.days_left as number;
  const tone = !r.valid || days < 0 ? "bad" : days <= 14 ? "warn" : "ok";
  const title = days < 0 ? `Expired ${Math.abs(days)} days ago` : !r.valid ? "Certificate is not trusted" : days <= 14 ? `Expires in ${days} days - renew soon` : `Valid - ${days} days left`;
  return (
    <>
      <Verdict tone={tone} title={title} body={r.error || undefined} />
      <dl className="mt-4">
        <Row k="Expires" v={r.valid_to ? new Date(r.valid_to).toLocaleString() : null} />
        <Row k="Issued" v={r.valid_from ? new Date(r.valid_from).toLocaleString() : null} />
        <Row k="Issuer" v={r.issuer} />
        <Row k="Subject" v={r.subject} />
        <Row k="Covers" v={r.sans?.length ? r.sans.join(", ") : null} />
        <Row k="TLS version" v={r.protocol} />
      </dl>
    </>
  );
}

function SeoResult({ r }: { r: any }) {
  const tone = r.score >= 80 ? "ok" : r.score >= 60 ? "warn" : "bad";
  return (
    <>
      <div className="flex items-center gap-5">
        <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl ${tone === "ok" ? "bg-ok/10 text-ok" : tone === "warn" ? "bg-gold/25 text-[#6b4700]" : "bg-bad/10 text-bad"}`}>
          <span className="text-2xl font-semibold">{r.score}</span>
          <span className="text-xs font-medium">Grade {r.grade}</span>
        </div>
        <div>
          <div className="font-medium text-ink">{r.title || r.url}</div>
          <p className="mt-1 text-sm text-plum-2">{r.summary}</p>
          <p className="mt-1 text-xs text-plum/60">{r.passed} passed · {r.warned} warnings · {r.failed} failed</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {r.checks?.map((c: any) => (
          <li key={c.id} className="flex gap-3 rounded-xl bg-cream/70 p-3 text-sm">
            {c.status === "pass" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> : c.status === "warn" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a87600]" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-bad" />}
            <div className="min-w-0">
              <div className="text-ink"><b className="font-medium">{c.label}:</b> {c.message}</div>
              {c.value && <div className="mt-0.5 truncate text-xs text-plum/60">{c.value}</div>}
              {c.tip && c.status !== "pass" && <div className="mt-1 text-xs text-plum-2">Fix: {c.tip}</div>}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function HeadersResult({ r }: { r: any }) {
  const tone = r.security_score >= 80 ? "ok" : r.security_score >= 50 ? "warn" : "bad";
  return (
    <>
      <Verdict
        tone={tone}
        title={`Security headers grade ${r.security_grade} (${r.security_score}/100)`}
        body={`HTTP ${r.status_code}${r.response_ms != null ? ` · ${Math.round(r.response_ms)} ms` : ""}`}
      />
      <ul className="mt-5 space-y-2">
        {r.security?.map((c: any) => (
          <li key={c.id} className="flex gap-3 rounded-xl bg-cream/70 p-3 text-sm">
            {c.present ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-bad" />}
            <div className="min-w-0">
              <div className="text-ink"><b className="font-medium">{c.label}</b>{c.present ? " present" : " missing"}</div>
              {c.value && <div className="mt-0.5 break-all text-xs text-plum/60">{c.value}</div>}
              {c.tip && !c.present && <div className="mt-1 text-xs text-plum-2">Fix: {c.tip}</div>}
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-6 text-sm font-medium text-ink">All response headers</h3>
      <dl className="mt-2 max-h-72 overflow-auto rounded-xl bg-cream/70 px-3">
        {r.headers?.map((h: any) => (
          <Row key={`${h.name}-${h.value?.slice?.(0, 24) || ""}`} k={h.name} v={h.value} />
        ))}
      </dl>
    </>
  );
}

export function ToolWidget({
  kind,
  placeholder,
  button,
  feature,
  product,
}: {
  kind: ToolKind;
  placeholder: string;
  button: string;
  feature: string;
  product?: string;
}) {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      setResult(await api(ENDPOINT[kind], { method: "POST", body: { url: url.trim() }, auth: false }));
    } catch (e2) {
      setErr(formatApiError(e2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-8 max-w-3xl">
      <form onSubmit={run} className="flex flex-col gap-3 rounded-[1.75rem] bg-white p-3 shadow-xl ring-1 ring-plum/10 sm:flex-row">
        <label htmlFor="tool-url" className="sr-only">Website address</label>
        <input
          id="tool-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          inputMode="url"
          autoComplete="url"
          className="h-12 min-w-0 flex-1 rounded-2xl bg-cream px-4 text-base text-ink outline-none ring-magenta/30 placeholder:text-plum/40 focus:ring-2"
        />
        <button type="submit" disabled={busy} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-plum px-6 text-[15px] font-medium text-cream transition hover:bg-ink disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {busy ? "Checking…" : button}
        </button>
      </form>

      {err && <div className="mt-4"><Verdict tone="bad" title="Couldn't complete the check" body={err} /></div>}

      {result && (
        <div className="mt-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-plum/10 sm:p-6">
          {kind === "website-status" && <StatusResult r={result} />}
          {kind === "ssl" && <SslResult r={result} />}
          {kind === "seo" && <SeoResult r={result} />}
          {kind === "headers" && <HeadersResult r={result} />}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-ink p-5 text-cream sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-cream/80">Want to know the moment this changes? Watchfront monitors it 24/7 and alerts you with evidence.</p>
            <Link href="/register" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-sky">
              Monitor it free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {product && (
              <Link href={`/${product}`} className="link-underline text-plum-2">
                Full product page →
              </Link>
            )}
            <Link href={`/features/${feature}`} className="link-underline text-plum-2">
              How continuous monitoring works →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
