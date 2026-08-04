import Link from "next/link";
import SearchBox from "./SearchBox";
import { BRANDS, BRAND_LOGOS } from "@/data/site";
import type { SearchEntry } from "@/lib/catalog";

/**
 * Search + brand index (R1 slide 7) as a structured logo-wall grid.
 * 15 brands fill the grid exactly: 3 cols × 5 rows on mobile,
 * 5 cols × 3 rows from sm up — no ragged rows, no orphans.
 * Text wordmarks become official logo files when the client supplies them.
 */
export default function BrandWall({ searchIndex }: { searchIndex: SearchEntry[] }) {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-xl">
          <SearchBox index={searchIndex} placeholder="Search by brand or model" />
        </div>
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          {BRANDS.length} brands in the catalogue
        </p>
      </div>
      <ul className="mt-8 grid grid-cols-3 border-b border-t border-line sm:grid-cols-5">
        {BRANDS.map((brand, i) => (
          <li
            key={brand}
            className={`border-line ${i % 3 !== 2 ? "border-r" : ""} ${
              i % 5 !== 4 ? "sm:border-r" : "sm:border-r-0"
            } ${i < 12 ? "border-b" : ""} ${i < 10 ? "sm:border-b" : "sm:border-b-0"}`}
          >
            <Link
              href={`/motorcycles?brand=${encodeURIComponent(brand)}`}
              className="group flex h-full min-h-[72px] items-center justify-center px-3 py-5 text-center font-display text-sm font-semibold tracking-[-0.01em] text-muted transition-colors hover:text-brand sm:text-base"
            >
              {BRAND_LOGOS[brand] ? (
                // Uniform sizing: every logo renders inside the same 28px-high
                // box regardless of its native proportions, muted until hover.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={BRAND_LOGOS[brand]}
                  alt={brand}
                  loading="lazy"
                  className="h-7 w-auto max-w-[70%] object-contain opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                brand
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
