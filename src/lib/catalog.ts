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

/**
 * Every product page a cart line is allowed to point at.
 *
 * The cart is kept in localStorage, so it outlives the catalogue: a line
 * saved before a re-import can name a product that has since been
 * discontinued or re-slugged, and following it used to land on the 404 page.
 * The cart page hands this list to the client so those lines are flagged
 * instead of linked. It is a list of short strings, not the catalogue itself,
 * so passing it through the RSC payload costs about a kilobyte and keeps the
 * product data off the client.
 */
export const PRODUCT_PATHS: string[] = [
  "/smartphone",
  // Cart lines saved before the Smartphone page existed; the old URL still
  // redirects there, so they are perfectly followable.
  "/iphone-17",
  ...MOTORCYCLES.map((m) => `/motorcycles/${m.slug}`),
  ...RIDER_GEAR.map((g) => `/rider-gear/${g.slug}`),
  ...ACCESSORIES.map((a) => `/accessories/${a.slug}`),
];

export function newestArrivals<T extends { arrival: string }>(
  items: T[],
  count: number
): T[] {
  return [...items].sort((a, b) => b.arrival.localeCompare(a.arrival)).slice(0, count);
}

export { MOTORCYCLES, RIDER_GEAR, ACCESSORIES };
