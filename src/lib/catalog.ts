import { MOTORCYCLES } from "@/data/motorcycles";
import { RIDER_GEAR } from "@/data/riderGear";
import { ACCESSORIES } from "@/data/accessories";

export type CategoryKey = "motorcycles" | "rider-gear" | "accessories";

export const CATEGORY_META: Record<
  CategoryKey,
  { label: string; blurb: string }
> = {
  motorcycles: {
    label: "Motorcycles",
    blurb:
      "New motorcycles from Malaysia's most trusted brands — with flexible financing and nationwide branch collection.",
  },
  "rider-gear": {
    label: "Rider Gear",
    blurb:
      "Helmets, helmet visors, spoilers and raincoats — genuine stock, SIRIM-certified where it matters.",
  },
  accessories: {
    label: "Accessories",
    blurb:
      "Sport rims, fork lays and bolt-on upgrades — 100% genuine parts with model-matched fitment.",
  },
};

/** Flat search index across all four catalogues. */
export interface SearchEntry {
  label: string;
  sub: string;
  href: string;
}

export function buildSearchIndex(): SearchEntry[] {
  return [
    ...MOTORCYCLES.map((m) => ({
      label: `${m.brand} ${m.model}`,
      sub: `Motorcycle · ${m.type} · ${m.cc}cc`,
      href: `/motorcycles/${m.slug}`,
    })),
    ...RIDER_GEAR.map((g) => ({
      label: g.name,
      sub: `Rider Gear · ${g.gearType}`,
      href: `/rider-gear/${g.slug}`,
    })),
    ...ACCESSORIES.map((a) => ({
      label: a.name,
      sub: `Accessories · ${a.accessoryType}`,
      href: `/accessories/${a.slug}`,
    })),
  ];
}

export function newestArrivals<T extends { arrival: string }>(
  items: T[],
  count: number
): T[] {
  return [...items].sort((a, b) => b.arrival.localeCompare(a.arrival)).slice(0, count);
}

export { MOTORCYCLES, RIDER_GEAR, ACCESSORIES };
