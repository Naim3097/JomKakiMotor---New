import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { RIDER_GEAR, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Rider Gear — Helmets, Gloves, Apparel & Rain Protection",
  description:
    "SIRIM-approved helmets, riding gloves, T-shirts, raincoats and caps — 100% genuine stock. Filter by type, brand, size and price, then enquire on WhatsApp.",
  alternates: { canonical: "/rider-gear" },
};

const priceBand = (p: number) =>
  p < 100 ? "Under RM100" : p <= 500 ? "RM100 – RM500" : "Over RM500";

export default function RiderGearPage() {
  const items: ListingItem[] = RIDER_GEAR.map((g) => ({
    id: g.slug,
    product: {
      href: `/rider-gear/${g.slug}`,
      name: g.name,
      brand: g.brand,
      price: g.price,
      meta: g.sizes ? `Sizes: ${g.sizes.join(", ")}` : g.gearType,
      thumb: g.gearType === "Helmet" || g.gearType === "Helmet Visor" ? "helmet" : "gear",
    },
    price: g.price,
    arrival: g.arrival,
    facetValues: {
      type: g.gearType,
      brand: g.brand,
      size: (g.sizes ?? []).join("|"),
      price: priceBand(g.price),
    },
  }));

  const uniq = (key: string) => [...new Set(items.map((i) => i.facetValues[key]).filter(Boolean))];
  const allSizes = [...new Set(RIDER_GEAR.flatMap((g) => g.sizes ?? []))];

  return (
    <CatalogueShell
      title="Rider Gear"
      blurb="Helmets, gloves, apparel and rain protection — genuine stock, SIRIM-certified where it matters, sized for Malaysian riders."
      path="/rider-gear"
      items={items}
      newestIds={newestArrivals(RIDER_GEAR, 3).map((g) => g.slug)}
      facets={[
        { key: "type", label: "Type", options: uniq("type") },
        { key: "brand", label: "Brand", options: uniq("brand") },
        { key: "size", label: "Size", options: allSizes },
        { key: "price", label: "Price", options: ["Under RM100", "RM100 – RM500", "Over RM500"].filter((p) => uniq("price").includes(p)) },
      ]}
    />
  );
}
