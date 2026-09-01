import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { ACCESSORIES, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Motorcycle Accessories — Sport Rims, Fork Lays & Upgrades",
  description:
    "Genuine sport rims, fork lays and bolt-on upgrades with model-matched fitment for Y15ZR, NVX, LC135 and more. Filter by type, brand and compatible model.",
  alternates: { canonical: "/accessories" },
};

/* Facet bands per Client Comments R2 slide 16 (plus an Over RM400 band so
   higher-priced rim sets stay filterable) */
const priceBand = (p: number) =>
  p < 100
    ? "Under RM100"
    : p <= 200
      ? "RM100 - RM200"
      : p <= 300
        ? "RM200 - RM300"
        : p <= 400
          ? "RM300 - RM400"
          : "Over RM400";

export default function AccessoriesPage() {
  const items: ListingItem[] = ACCESSORIES.map((a) => ({
    id: a.slug,
    product: {
      href: `/accessories/${a.slug}`,
      name: a.name,
      brand: a.brand,
      price: a.price,
      meta: a.compatibleModels ? `Fits: ${a.compatibleModels.join(", ")}` : a.accessoryType,
      thumb: a.accessoryType === "Sport Rims" ? "rim" : "part",
    },
    price: a.price,
    arrival: a.arrival,
    facetValues: {
      type: a.accessoryType,
      brand: a.brand,
      model: (a.compatibleModels ?? []).join("|"),
      price: priceBand(a.price),
    },
  }));

  return (
    <CatalogueShell
      title="Accessories"
      blurb="Sport rims, fork lays and bolt-on upgrades — 100% genuine parts with fitment matched to your exact model. No cutting, no guesswork."
      path="/accessories"
      items={items}
      newestIds={newestArrivals(ACCESSORIES, 2).map((a) => a.slug)}
      facets={[
        /* Option lists fixed by Client Comments R2 slide 16 */
        { key: "brand", label: "Brand", options: ["PPR", "ENKEI", "AEROX THAI"] },
        { key: "type", label: "Type", options: ["Sport Rims", "Fork Lay"] },
        {
          key: "model",
          label: "Compatible Model",
          options: ["Yamaha Y15ZR", "Yamaha Y125Z", "Yamaha LC135", "Yamaha NVX 155"],
        },
        {
          key: "price",
          label: "Price",
          options: ["RM100 - RM200", "RM200 - RM300", "RM300 - RM400", "Over RM400"],
        },
      ]}
    />
  );
}
