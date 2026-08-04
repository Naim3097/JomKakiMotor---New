import { MOTORCYCLES } from "@/data/motorcycles";
import { RIDER_GEAR } from "@/data/riderGear";
import { ACCESSORIES } from "@/data/accessories";
import { ENGINE_OILS } from "@/data/engineOils";

export type CategoryKey = "motorcycles" | "rider-gear" | "accessories" | "engine-oil";

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
      "Helmets, gloves, apparel and rain protection — genuine stock, SIRIM-certified where it matters.",
  },
  accessories: {
    label: "Accessories",
    blurb:
      "Sport rims, fork lays and bolt-on upgrades — 100% genuine parts with model-matched fitment.",
  },
  "engine-oil": {
    label: "Engine Oil",
    blurb:
      "Guaranteed-authentic engine oils for kapcai, scooter and high-performance engines.",
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
    ...ENGINE_OILS.map((o) => ({
      label: o.name,
      sub: `Engine Oil · ${o.viscosity}`,
      href: `/engine-oil/${o.slug}`,
    })),
  ];
}

export function newestArrivals<T extends { arrival: string }>(
  items: T[],
  count: number
): T[] {
  return [...items].sort((a, b) => b.arrival.localeCompare(a.arrival)).slice(0, count);
}

export { MOTORCYCLES, RIDER_GEAR, ACCESSORIES, ENGINE_OILS };
