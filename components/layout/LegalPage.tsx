import { Breadcrumbs } from "./Breadcrumbs";

export function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <section className="bg-ink pb-24 pt-36 sm:pt-44">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="display mt-10 text-[clamp(2.8rem,7vw,5.5rem)]">{title}</h1>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-bone/75 [&_a]:text-marigold [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-bone">
          {children}
        </div>
      </div>
    </section>
  );
}
