"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BikeCard, ProductCard } from "./cards";
import { ChevronDown } from "./icons";
import type { ThumbKind } from "./Thumb";
import type { Motorcycle } from "@/data/types";

export interface ListingItem {
  id: string;
  bike?: Motorcycle;
  product?: {
    href: string;
    name: string;
    brand: string;
    price: number;
    meta?: string;
    thumb: ThumbKind;
  };
  /** All filterable dimensions precomputed to strings by the server page */
  facetValues: Record<string, string>;
  price: number;
  arrival: string;
}

export interface FacetConfig {
  key: string;
  label: string;
  options: string[];
}

type SortKey = "newest" | "price-asc" | "price-desc";

export default function CatalogueClient({
  items,
  facets,
  newestIds,
}: {
  items: ListingItem[];
  facets: FacetConfig[];
  newestIds: string[];
}) {
  const searchParams = useSearchParams();
  const brandParam = searchParams.get("brand");

  const [selected, setSelected] = useState<Record<string, string[]>>(() =>
    brandParam ? { brand: [brandParam] } : ({} as Record<string, string[]>)
  );
  const [sort, setSort] = useState<SortKey>("newest");

  const toggle = (key: string, value: string) => {
    setSelected((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const activeChips = Object.entries(selected).flatMap(([key, values]) =>
    values.map((v) => ({ key, value: v }))
  );

  const filtered = useMemo(() => {
    const out = items.filter((item) =>
      Object.entries(selected).every(([key, values]) => {
        if (values.length === 0) return true;
        // Items may carry multiple values for one facet, joined with "|"
        const itemValues = (item.facetValues[key] ?? "").split("|");
        return values.some((v) => itemValues.includes(v));
      })
    );
    switch (sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      default:
        return [...out].sort((a, b) => b.arrival.localeCompare(a.arrival));
    }
  }, [items, selected, sort]);

  const filterPanel = (
    <div className="space-y-7">
      {facets.map((facet) => (
        <fieldset key={facet.key}>
          <legend className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {facet.label}
          </legend>
          <div className="mt-3 space-y-2.5">
            {facet.options.map((opt) => {
              const checked = (selected[facet.key] ?? []).includes(opt);
              return (
                <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(facet.key, opt)}
                    className="h-4 w-4 rounded-sm border-line accent-brand"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block" aria-label="Filters">
        {filterPanel}
      </aside>

      {/* Mobile filter drawer */}
      <details className="rounded-lg border border-line lg:hidden">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
          Filters {activeChips.length > 0 && `(${activeChips.length})`}
        </summary>
        <div className="border-t border-line px-4 py-5">{filterPanel}</div>
      </details>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            <span className="font-bold text-ink">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "result" : "results"}
          </p>
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort
            <span className="relative inline-flex">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-md border border-line bg-paper py-2 pl-3.5 pr-10 text-sm font-medium text-ink transition-colors focus:border-ink focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </span>
          </label>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                type="button"
                onClick={() => toggle(chip.key, chip.value)}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand hover:text-white"
              >
                {chip.value}
                <span aria-hidden>×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelected({})}
              className="text-xs font-semibold text-muted underline underline-offset-2 hover:text-ink"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
          {filtered.map((item) =>
            item.bike ? (
              <BikeCard key={item.id} bike={item.bike} isNew={newestIds.includes(item.id)} />
            ) : item.product ? (
              <ProductCard
                key={item.id}
                href={item.product.href}
                name={item.product.name}
                brand={item.product.brand}
                price={item.product.price}
                meta={item.product.meta}
                kind={item.product.thumb}
                isNew={newestIds.includes(item.id)}
              />
            ) : null
          )}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 border-t border-line pt-10 text-muted">
            <p className="font-semibold text-ink">No products match those filters.</p>
            <p className="mt-1 text-sm">Clear a filter or two, or WhatsApp us — we may have it in-store.</p>
          </div>
        )}
      </div>
    </div>
  );
}
