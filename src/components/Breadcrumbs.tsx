import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default function Breadcrumbs({
  crumbs,
}: {
  crumbs: { label: string; href: string }[];
}) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-brand">
                      {c.label}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
