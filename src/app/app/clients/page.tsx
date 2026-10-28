"use client";

import { Building2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/toast";
import { Button, Card, Empty, ErrorBox, Input, Loading, Modal, PageHeader, Textarea } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/hooks";

export default function ClientsPage() {
  const { data, loading, reload } = useApi<any[]>("/api/clients");
  const [edit, setEdit] = useState<any | null>(null);
  const [f, setF] = useState({ name: "", contact_email: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const { can } = useAuth();
  const toast = useToast();

  const open = (c?: any) => {
    setF({ name: c?.name || "", contact_email: c?.contact_email || "", notes: c?.notes || "" });
    setError(null);
    setEdit(c || {});
  };
  const save = async () => {
    try {
      if (edit?.id) await patch(`/api/clients/${edit.id}`, f);
      else await post("/api/clients", f);
      toast(edit?.id ? "Client updated" : "Client added");
      setEdit(null);
      reload();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Agency" title="Clients" subtitle="Group websites by the customer who owns them. Reports, incidents, and client-portal access are scoped per client."
        action={can("member") && <Button onClick={() => open()}><Plus className="h-4 w-4" /> Add client</Button>} />
      {loading && !data ? <Loading /> : !data?.length ? (
        <Empty icon={<Building2 className="h-6 w-6" />} title="No clients yet" body="Create a client, then assign websites to it." action={can("member") && <Button onClick={() => open()}>Add client</Button>} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((c, i) => (
            <Card key={c.id} className="group p-6 transition hover:-translate-y-1 hover:shadow-xl animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-plum text-lg font-semibold text-cream">{c.name[0]}</span>
                  <div><div className="font-semibold text-ink">{c.name}</div><div className="text-xs text-plum/55">{c.contact_email || "No contact"}</div></div>
                </div>
                {can("member") && <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                  <button onClick={() => open(c)} className="rounded-lg p-1.5 text-plum/50 hover:bg-plum/5"><Pencil className="h-4 w-4" /></button>
                  {can("admin") && <button onClick={async () => { if (confirm(`Delete ${c.name}? Websites stay but become unassigned.`)) { await del(`/api/clients/${c.id}`); reload(); } }} className="rounded-lg p-1.5 text-plum/50 hover:bg-bad/10 hover:text-bad"><Trash2 className="h-4 w-4" /></button>}
                </div>}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-cream/70 py-2"><div className="font-mono text-lg font-semibold text-ink">{c.website_count}</div><div className="text-[10px] text-plum/55">websites</div></div>
                <div className="rounded-xl bg-cream/70 py-2"><div className={`font-mono text-lg font-semibold ${c.down_count ? "text-bad" : "text-ok"}`}>{c.down_count}</div><div className="text-[10px] text-plum/55">down</div></div>
                <div className="rounded-xl bg-cream/70 py-2"><div className={`font-mono text-lg font-semibold ${c.open_incidents ? "text-bad" : "text-ink"}`}>{c.open_incidents}</div><div className="text-[10px] text-plum/55">incidents</div></div>
              </div>
              {c.notes && <p className="mt-4 line-clamp-2 text-xs text-plum/60">{c.notes}</p>}
              <div className="mt-5 flex gap-4 text-xs">
                <Link href={`/app/websites?client_id=${c.id}`} className="text-magenta">Websites →</Link>
                <Link href={`/app/reports?client_id=${c.id}`} className="text-magenta">Reports →</Link>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? "Edit client" : "Add client"}>
        <div className="space-y-4">
          <ErrorBox error={error} />
          <Input label="Client name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Bright Law LLP" />
          <Input label="Contact email" type="email" value={f.contact_email} onChange={(e) => setF({ ...f, contact_email: e.target.value })} />
          <Textarea label="Notes" rows={3} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} placeholder="Retainer, hosting provider, key contacts…" />
          <div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button><Button onClick={save}>Save</Button></div>
        </div>
      </Modal>
    </div>
  );
}
