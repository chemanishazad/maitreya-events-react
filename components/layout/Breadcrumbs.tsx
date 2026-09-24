import Link from "next/link";
import { breadcrumbSchema, JsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="eyebrow flex flex-wrap items-center gap-2 text-muted">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < all.length - 1 ? (
              <>
                <Link href={c.path} className="transition-colors hover:text-bone">
                  {c.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span aria-current="page" className="text-bone/80">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbSchema(all)} />
    </nav>
  );
}
