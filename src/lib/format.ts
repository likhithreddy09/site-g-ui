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
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, withTime
    ? { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    : { year: "numeric", month: "short", day: "numeric" });
}

export const ms = (v?: number | null) => (v == null ? "—" : v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`);
export const pct = (v?: number | null, d = 2) => (v == null ? "—" : `${v.toFixed(d)}%`);

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
