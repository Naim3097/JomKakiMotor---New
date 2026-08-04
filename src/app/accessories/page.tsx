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

const priceBand = (p: number) =>
  p < 500 ? "Under RM500" : p <= 1000 ? "RM500 – RM1,000" : "Over RM1,000";

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

  const uniq = (key: string) => [...new Set(items.map((i) => i.facetValues[key]).filter(Boolean))];
  const allModels = [...new Set(ACCESSORIES.flatMap((a) => a.compatibleModels ?? []))];

  return (
    <CatalogueShell
      title="Accessories"
      blurb="Sport rims, fork lays and bolt-on upgrades — 100% genuine parts with fitment matched to your exact model. No cutting, no guesswork."
      path="/accessories"
      items={items}
      newestIds={newestArrivals(ACCESSORIES, 2).map((a) => a.slug)}
      facets={[
        { key: "type", label: "Type", options: uniq("type") },
        { key: "brand", label: "Brand", options: uniq("brand") },
        { key: "model", label: "Compatible Model", options: allModels },
        { key: "price", label: "Price", options: ["Under RM500", "RM500 – RM1,000", "Over RM1,000"].filter((p) => uniq("price").includes(p)) },
      ]}
    />
  );
}
