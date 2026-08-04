import type { Metadata } from "next";
import CatalogueShell from "@/components/CatalogueShell";
import type { ListingItem } from "@/components/CatalogueClient";
import { MOTORCYCLES, newestArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Motorcycles for Sale in Malaysia — Kuching, Bintulu, KL & Selangor",
  description:
    "New Yamaha, Honda, Modenas, SYM and more with flexible HP financing. Filter by brand, engine capacity, price and monthly payment — then enquire on WhatsApp.",
  alternates: { canonical: "/motorcycles" },
};

const ccBand = (cc: number) =>
  cc <= 125 ? "125cc & below" : cc <= 150 ? "126 – 150cc" : cc <= 250 ? "151 – 250cc" : "Above 250cc";

const priceBand = (p: number) =>
  p < 5000 ? "Under RM5,000" : p <= 10000 ? "RM5,000 – RM10,000" : "Over RM10,000";

const monthlyBand = (m: number) =>
  m < 200 ? "Under RM200/mth" : m <= 400 ? "RM200 – RM400/mth" : "Over RM400/mth";

export default function MotorcyclesPage() {
  const items: ListingItem[] = MOTORCYCLES.map((m) => ({
    id: m.slug,
    bike: m,
    price: m.price,
    arrival: m.arrival,
    facetValues: {
      brand: m.brand,
      type: m.type,
      cc: ccBand(m.cc),
      price: priceBand(m.price),
      monthly: monthlyBand(m.monthly),
      year: String(m.year),
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
        { key: "brand", label: "Brand", options: uniq("brand") },
        { key: "type", label: "Type", options: ["Kapcai", "Scooter", "Sport", "Naked"].filter((t) => uniq("type").includes(t)) },
        { key: "cc", label: "Engine Capacity", options: ["125cc & below", "126 – 150cc", "151 – 250cc", "Above 250cc"].filter((c) => uniq("cc").includes(c)) },
        { key: "price", label: "Price Range", options: ["Under RM5,000", "RM5,000 – RM10,000", "Over RM10,000"].filter((p) => uniq("price").includes(p)) },
        { key: "monthly", label: "Monthly Payment", options: ["Under RM200/mth", "RM200 – RM400/mth", "Over RM400/mth"].filter((p) => uniq("monthly").includes(p)) },
        { key: "year", label: "Year", options: uniq("year").sort().reverse() },
        { key: "availability", label: "Availability", options: uniq("availability") },
      ]}
    />
  );
}
