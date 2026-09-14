import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { RIDER_GEAR, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Rider Gear — Helmets, Visors, Spoilers & Raincoats",
  description:
    "SIRIM-approved KYT, ARC and Yamaha helmets, replacement visors, spoilers and raincoats — 100% genuine stock. Filter by type, brand, size and price, then enquire on WhatsApp.",
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
      image: g.image,
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

  return (
    <CatalogueShell
      title="Rider Gear"
      blurb="Helmets, helmet visors, spoilers and raincoats — genuine stock, SIRIM-certified where it matters, sized for Malaysian riders."
      path="/rider-gear"
      items={items}
      newestIds={newestArrivals(RIDER_GEAR, 3).map((g) => g.slug)}
      facets={[
        /* Option lists fixed by Client Comments R2 slide 17 */
        { key: "brand", label: "Brand", options: ["KYT", "ARC", "Yamaha", "SGV", "BOGO"] },
        {
          key: "type",
          label: "Type",
          options: ["Helmet", "Helmet Spoiler", "Helmet Visor", "Raincoat"],
        },
        { key: "size", label: "Size", options: ["M", "L", "XL", "XXL"] },
        { key: "price", label: "Price", options: ["Under RM100", "RM100 – RM500", "Over RM500"] },
      ]}
    />
  );
}
