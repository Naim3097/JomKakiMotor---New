import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { ENGINE_OILS, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Engine Oil — Genuine Yamalube, Honda & More",
  description:
    "Guaranteed-authentic engine oils for kapcai, scooter and high-performance engines. Filter by brand, oil type and viscosity — enquire on WhatsApp.",
  alternates: { canonical: "/engine-oil" },
};

export default function EngineOilPage() {
  const items: ListingItem[] = ENGINE_OILS.map((o) => ({
    id: o.slug,
    product: {
      href: `/engine-oil/${o.slug}`,
      name: o.name,
      brand: o.brand,
      price: o.price,
      meta: `${o.oilType} · ${o.viscosity} · ${o.volume}`,
      thumb: "oil",
    },
    price: o.price,
    arrival: o.arrival,
    facetValues: {
      brand: o.brand,
      oilType: o.oilType,
      viscosity: o.viscosity,
      volume: o.volume,
    },
  }));

  const uniq = (key: string) => [...new Set(items.map((i) => i.facetValues[key]).filter(Boolean))];

  return (
    <CatalogueShell
      title="Engine Oil"
      blurb="Every bottle guaranteed authentic — the right oil for kapcai, scooter and high-performance engines, matched to manufacturer specification."
      path="/engine-oil"
      items={items}
      newestIds={newestArrivals(ENGINE_OILS, 2).map((o) => o.slug)}
      facets={[
        { key: "brand", label: "Brand", options: uniq("brand") },
        { key: "oilType", label: "Oil Type", options: uniq("oilType") },
        { key: "viscosity", label: "Viscosity", options: uniq("viscosity") },
        { key: "volume", label: "Volume", options: uniq("volume") },
      ]}
    />
  );
}
