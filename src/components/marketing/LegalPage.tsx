import { MarketingShell, MotionSection, PageHero } from "./Site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalPage({ title, intro, path, updated, sections }: { title: string; intro: string; path: string; updated: string; sections: LegalSection[] }) {
  return (
    <MarketingShell>
      <PageHero crumbs={[["Home", "/"], [title, path]]} title={title} intro={intro}>
        <p className="mt-4 text-sm text-plum-2">Last updated: <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></p>
      </PageHero>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="hidden md:block">
          <div className="sticky top-24 space-y-2 rounded-2xl bg-cream p-5 text-sm ring-1 ring-plum/8">
            <div className="font-medium text-ink">On this page</div>
            {sections.map((s) => <a key={s.id} href={`#${s.id}`} className="block text-plum-2 transition hover:text-magenta">{s.title}</a>)}
          </div>
        </nav>
        <MotionSection>
          <article className="max-w-3xl space-y-8 rounded-[2rem] bg-cream p-8 ring-1 ring-plum/8 md:p-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-plum/10 pb-8 last:border-0 last:pb-0">
                <h2 className="text-xl font-medium tracking-tight text-ink md:text-2xl">{s.title}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-plum-2 [&_a]:text-magenta [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_ul_li]:ml-5 [&_ul_li]:list-disc [&_strong]:text-ink">{s.body}</div>
              </section>
            ))}
          </article>
        </MotionSection>
      </div>
    </MarketingShell>
  );
}
