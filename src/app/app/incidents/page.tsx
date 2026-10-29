"use client";

import { AlertOctagon, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge, Card, Empty, Loading, PageHeader, Select, SoftBusy, Table, Td } from "@/components/ui";
import { duration, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

const SOURCES: Record<string, string> = {
  website: "Uptime", ssl: "SSL", domain: "Domain", api: "API", page_check: "Content", browser_test: "Journey", js_errors: "JS errors", rum_api: "Visitor API",
};

export default function IncidentsPage() {
  const [status, setStatus] = useState("active");
  const [severity, setSeverity] = useState("");
  const [source, setSource] = useState("");
  const [q, setQ] = useState("");
  const params = new URLSearchParams({ status, ...(severity && { severity }), ...(source && { source_type: source }), ...(q && { q }) });
  const { data, loading, refreshing } = useApi<any>(`/api/incidents?${params}`, { poll: 15000 });
  const c = data?.counts || {};
  const tabs = [
    ["active", "Active", (c.open || 0) + (c.investigating || 0)], ["open", "Open", c.open], ["investigating", "Investigating", c.investigating],
    ["resolved", "Resolved", c.resolved], ["ignored", "Ignored", c.ignored], ["all", "All", null],
  ];

  return (
    <div>
      <PageHeader eyebrow="Operations" title="Incidents" subtitle="Repeated failures are grouped into one incident. Incidents reopen automatically if the issue returns within 24 hours." />
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map(([id, label, n]) => (
          <button key={id as string} onClick={() => setStatus(id as string)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${status === id ? "bg-plum text-cream" : "bg-white text-plum/70 ring-1 ring-plum/10 hover:ring-plum/30"}`}>
            {label}{n != null && <span className="ml-1.5 font-mono text-xs opacity-70">{n as number}</span>}
          </button>
        ))}
      </div>
      <Card className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search incidents…" className="h-10 w-full rounded-xl bg-cream/60 pl-9 pr-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-2 focus:ring-magenta/40" />
        </div>
        <div className="w-40"><Select value={severity} onChange={(e) => setSeverity(e.target.value)}><option value="">Any severity</option>{["critical", "major", "minor", "info"].map((s) => <option key={s}>{s}</option>)}</Select></div>
        <div className="w-40"><Select value={source} onChange={(e) => setSource(e.target.value)}><option value="">Any source</option>{Object.entries(SOURCES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</Select></div>
      </Card>
      {loading && !data ? <Loading rows={5} /> : !data?.incidents.length ? (
        <Empty icon={<AlertOctagon className="h-6 w-6" />} title="No incidents here" body={status === "active" ? "Nothing needs attention right now." : "Try a different filter."} />
      ) : (
        <SoftBusy busy={refreshing}>
        <Card>
          <Table head={["Incident", "Severity", "Status", "Source", "Website", "Assignee", "Started", "Duration", "Seen"]}>
            {data.incidents.map((i: any) => (
              <tr key={i.id} className="transition hover:bg-cream/50">
                <Td className="max-w-[340px]">
                  <Link href={`/app/incidents/${i.id}`} className="font-medium text-ink hover:text-magenta">{i.title}</Link>
                  <div className="mt-0.5 flex gap-2 text-[11px] text-plum/50">
                    {i.false_positive && <span className="text-warn">false positive</span>}
                    {i.reopen_count > 0 && <span>reopened {i.reopen_count}×</span>}
                    {i.client_name && <span>{i.client_name}</span>}
                  </div>
                </Td>
                <Td><Badge>{i.severity}</Badge></Td>
                <Td><Badge>{i.status}</Badge></Td>
                <Td className="text-xs text-plum/70">{SOURCES[i.source_type] || i.source_type}</Td>
                <Td className="text-xs">{i.website_name || "—"}</Td>
                <Td className="text-xs text-plum/70">{i.assignee_email || "—"}</Td>
                <Td className="whitespace-nowrap text-xs text-plum/60">{timeAgo(i.started_at)}</Td>
                <Td className="whitespace-nowrap font-mono text-xs">{duration(((i.resolved_at ? +new Date(i.resolved_at) : Date.now()) - +new Date(i.started_at)) / 1000)}</Td>
                <Td className="font-mono text-xs">{i.occurrences}×</Td>
              </tr>
            ))}
          </Table>
        </Card>
        </SoftBusy>
      )}
    </div>
  );
}
