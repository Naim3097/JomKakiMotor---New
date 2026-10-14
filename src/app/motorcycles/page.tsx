import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { MOTORCYCLES, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Motorcycles for Sale in Malaysia — Kuching, Bintulu, KL & Selangor",
  description:
    "New Yamaha, Honda, Modenas, SYM and more with flexible HP financing. Filter by brand, type, deposit and year — then enquire on WhatsApp.",
  alternates: { canonical: "/motorcycles" },
};

/* Facet bands per Client Comments R2 slide 15; the price band is gone —
   R4 slide 7 removes published motorcycle prices, so a price filter would
   have nothing to stand on. */

const depositBand = (d: number) =>
  d <= 0
    ? "No Deposit Required"
    : d <= 1000
      ? "RM500 - RM1,000"
      : d <= 5000
        ? "RM1,000 - RM5,000"
        : "Over RM5,000";

const yearBand = (y: number) =>
  y >= 2026 ? "Latest Models (2026 - Present)" : "Older Models (Before 2026)";

/** Brand list is fixed by the client — includes marques arriving in stock soon. */
const BRAND_OPTIONS = [
  "Yamaha",
  "Honda",
  "Modenas",
  "SYM",
  "WMOTO",
  "CFMOTO",
  "Moda",
  "Keeway",
  "Aveta",
  "QJMOTOR",
];

const TYPE_OPTIONS = ["Underbone", "Scooter", "Cafe Racer", "Mini-sport", "Sport", "Naked"];

export default function MotorcyclesPage() {
  const items: ListingItem[] = MOTORCYCLES.map((m) => ({
    id: m.slug,
    bike: m,
    price: m.price,
    arrival: m.arrival,
    facetValues: {
      brand: m.brand,
      type: m.type,
      deposit: depositBand(m.deposit),
      year: yearBand(m.year),
      availability: m.availability,
    },
  }));

  const uniq = (key: keyof (typeof items)[0]["facetValues"]) =>
    [...new Set(items.map((i) => i.facetValues[key]))];

  return (
    <CatalogueShell
      title="Motorcycles"
      blurb="New motorcycles from Malaysia's most trusted brands — with flexible financing and collection at any of our branches in Kuching, Bintulu, KL & Selangor."
      path="/motorcycles"
      items={items}
      newestIds={newestArrivals(MOTORCYCLES, 4).map((m) => m.slug)}
      facets={[
        /* Options are the client's preferred order, narrowed to what is
           actually in stock — a discontinued brand or type disappears. */
        { key: "brand", label: "Brand", options: BRAND_OPTIONS.filter((b) => uniq("brand").includes(b)) },
        { key: "type", label: "Type", options: TYPE_OPTIONS.filter((t) => uniq("type").includes(t)) },
        {
          key: "deposit",
          label: "Deposit",
          options: ["No Deposit Required", "RM500 - RM1,000", "RM1,000 - RM5,000", "Over RM5,000"].filter(
            (dp) => uniq("deposit").includes(dp)
          ),
        },
        {
          key: "year",
          label: "Year",
          options: ["Latest Models (2026 - Present)", "Older Models (Before 2026)"].filter((y) =>
            uniq("year").includes(y)
          ),
        },
        { key: "availability", label: "Availability", options: uniq("availability") },
      ]}
    />
  );
}
