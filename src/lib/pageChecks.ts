export type Tone = "ok" | "bad" | "warn" | "info";

export function checkStatus(c: any): { tone: Tone; title: string; text: string } {
  if (c.status === "failing") return { tone: "bad", title: "Problem found", text: "Something you asked us to watch is missing." };
  if (c.status === "changed" || c.pending_changes > 0) return { tone: "warn", title: "Needs your review", text: "The page looks different from the version you approved." };
  if (c.status === "passing" && c.last_broken_links > 0)
    return { tone: "warn", title: "Mostly good", text: `${c.last_broken_links} broken link${c.last_broken_links > 1 ? "s" : ""} found — everything else is in place.` };
  if (c.status === "passing") return { tone: "ok", title: "All good", text: "Everything you asked us to watch is in place." };
  return { tone: "info", title: "First check running", text: "We're taking the first picture of the page." };
}

export function linkProblem(b: { status?: number; error?: string }): string {
  if (!b.status) return "Couldn't connect";
  if (b.status === 404) return "Page not found (404)";
  if (b.status === 410) return "Page removed (410)";
  if (b.status === 401 || b.status === 403) return `Access denied (${b.status})`;
  if (b.status >= 500) return `Server error (${b.status})`;
  return `Error ${b.status}`;
}

export function friendlyPageError(e: string): string {
  if (/timeout/i.test(e)) return "The page took longer than 30 seconds to load, so we couldn't check it.";
  if (/ERR_NAME_NOT_RESOLVED/.test(e)) return "The website's address couldn't be found — the domain may have expired or DNS is broken.";
  if (/ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED/.test(e)) return "The website's server refused the connection — it may be down.";
  if (/ERR_CERT|SSL/i.test(e)) return "The website's security certificate has a problem, so browsers will show a warning.";
  return e.replace(/^Page could not be loaded:\s*/, "We couldn't open the page: ").split("\n")[0];
}

export type Finding = { tone: Tone; text: string; detail?: string };

export function findings(c: any, r: any): Finding[] {
  if (!r) return [];
  const d = r.details || {};
  if (r.error) return [{ tone: "bad", text: friendlyPageError(r.error), detail: r.error }];
  const out: Finding[] = [];
  const missingT = new Set<string>(d.missing_texts || []);
  for (const t of c.expected_texts || []) out.push(missingT.has(t) ? { tone: "bad", text: `“${t}” is no longer on the page` } : { tone: "ok", text: `“${t}” is on the page` });
  const missingS = new Set<string>(d.missing_selectors || []);
  for (const s of c.required_selectors || []) {
    const label = c.element_labels?.[s] || s;
    out.push(missingS.has(s) ? { tone: "bad", text: `${label} is missing`, detail: s } : { tone: "ok", text: `${label} is there`, detail: s });
  }
  const v = d.visual;
  if (v) {
    if (v.new_baseline) out.push({ tone: "info", text: "Took the first picture of the page — this is now the approved look" });
    else if (v.changed) out.push({ tone: "warn", text: `Looks different from the approved version (${v.diff_pct}% of the screen changed)` });
    else out.push({ tone: "ok", text: "Looks the same as the approved version" });
  }
  if (c.check_links && d.links_checked != null) {
    const n = d.broken_links?.length || 0;
    out.push(n ? { tone: "bad", text: `${n} of ${d.links_checked} links are broken` } : { tone: "ok", text: `All ${d.links_checked} links work` });
  }
  return out;
}

export function runSummary(c: any, r: any): string {
  const f = findings(c, r);
  const bad = f.filter((x) => x.tone === "bad");
  if (bad.length) return bad.map((x) => x.text).join(" · ");
  const warn = f.find((x) => x.tone === "warn");
  if (warn) return warn.text;
  return "Everything looked right";
}
