export function timeAgo(iso?: string | null): string {
  if (!iso) return "never";
  const s = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 0) return "in " + duration(-s);
  if (s < 10) return "just now";
  return duration(s) + " ago";
}

export function duration(sec: number): string {
  if (sec < 60) return `${Math.round(sec)}s`;
  if (sec < 3600) return `${Math.round(sec / 60)}m`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ${Math.round((sec % 3600) / 60)}m`;
  return `${Math.floor(sec / 86400)}d ${Math.round((sec % 86400) / 3600)}h`;
}

export function fmtDate(iso?: string | null, withTime = true): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString(undefined, withTime
    ? { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "short", day: "numeric" });
}

export const ms = (v?: number | null) => (v == null ? "-" : v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`);
export const pct = (v?: number | null, d = 2) => (v == null ? "-" : `${Number(v.toFixed(d))}%`);

/** Human label for a certificate or domain countdown. Negative means already expired. */
export function expiryLabel(days?: number | null, style: "badge" | "inline" | "full" = "inline"): string {
  if (days == null || Number.isNaN(Number(days))) return "";
  const n = Math.trunc(Number(days));
  if (n < 0) {
    if (style === "badge") return "Expired";
    const ago = Math.abs(n);
    if (ago >= 365) {
      const y = Math.max(1, Math.round(ago / 365));
      return style === "full" ? `Expired ${y} year${y === 1 ? "" : "s"} ago` : `${y}y ago`;
    }
    return style === "full" ? `Expired ${ago} day${ago === 1 ? "" : "s"} ago` : `${ago}d ago`;
  }
  if (n === 0) return style === "badge" ? "Today" : style === "full" ? "Expires today" : "today";
  if (style === "badge") return `${n}d`;
  if (style === "full") return n === 1 ? "1 day left" : `${n} days left`;
  return `${n}d left`;
}

export function expiryHeadline(days?: number | null): string {
  if (days == null || Number.isNaN(Number(days))) return "-";
  const n = Math.trunc(Number(days));
  if (n < 0) return "Expired";
  if (n === 0) return "Expires today";
  return n === 1 ? "1 day left" : `${n} days left`;
}

/** Badge tone for an SSL or domain record. Unknown is not a failure. */
export function certTone(status?: string | null, days?: number | null): string {
  if (typeof days === "number" && days < 0) return "expired";
  if (!status || status === "unknown") return "unknown";
  if (status === "invalid") return "invalid";
  if (status === "expiring" || (status === "valid" && days != null && days <= 30)) return "expiring";
  if (status === "valid") return "valid";
  return status;
}

/** Short issuer for tables. Let's Encrypt intermediates use codes like YR1 - hide those. */
export function issuerShort(issuer?: string | null): string {
  if (!issuer) return "";
  const raw = String(issuer).split(",")[0].trim();
  if (/^[A-Z]{1,3}\d{0,3}$/.test(raw)) return "";
  const word = raw.split(/\s+/)[0];
  return word.length > 22 ? `${word.slice(0, 22)}…` : word;
}

export function shortError(err?: string | null): string {
  if (!err) return "";
  if (/certificate verify failed|CERTIFICATE_VERIFY_FAILED|certificate has expired/i.test(err)) return "TLS certificate is not trusted";
  if (/timed out|timeout/i.test(err)) return "The site did not respond in time";
  if (/name or service not known|getaddrinfo|ENOTFOUND/i.test(err)) return "The hostname could not be resolved";
  if (/connection refused|ECONNREFUSED/i.test(err)) return "Connection refused";
  const clean = err.replace(/\s+/g, " ").trim();
  return clean.length > 160 ? `${clean.slice(0, 157)}…` : clean;
}

export function intervalLabel(sec: number) {
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${sec / 60} min`;
  if (sec < 86400) return `${sec / 3600} h`;
  return `${sec / 86400} d`;
}

export function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
