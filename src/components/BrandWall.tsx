import Link from "next/link";
import SearchBox from "./SearchBox";
import { BRANDS, BRAND_LOGOS } from "@/data/site";
import type { SearchEntry } from "@/lib/catalog";

/**
 * Search + brand index as a structured logo-wall grid.
 * R2 slide 6: the search bar spans the full section width and the count
 * label is gone; brand cells render full-colour official logos once the
 * client's files are mapped in BRAND_LOGOS.
 * 15 brands fill the grid exactly: 3 cols × 5 rows on mobile,
 * 5 cols × 3 rows from sm up — no ragged rows, no orphans.
 */
export default function BrandWall({ searchIndex }: { searchIndex: SearchEntry[] }) {
  return (
    <div>
      <div className="w-full">
        <SearchBox index={searchIndex} placeholder="Search by brand or model" />
      </div>
      {/* Open logo wall — no cell borders (client feedback R5) */}
      <ul className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-5">
        {BRANDS.map((brand) => (
          <li key={brand}>
            <Link
              href={`/motorcycles?brand=${encodeURIComponent(brand)}`}
              className="group flex h-full min-h-[72px] items-center justify-center px-3 py-5 text-center font-display text-sm font-semibold tracking-[-0.01em] text-muted transition-colors hover:text-brand sm:text-base"
            >
              {BRAND_LOGOS[brand] ? (
                // Uniform sizing: every logo renders inside the same 28px-high
                // box regardless of its native proportions. Full colour per R2
                // slide 6.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={BRAND_LOGOS[brand]}
                  alt={brand}
                  loading="lazy"
                  className="h-7 w-auto max-w-[70%] object-contain"
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
