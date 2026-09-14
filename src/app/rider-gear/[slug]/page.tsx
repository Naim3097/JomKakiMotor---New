import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { RIDER_GEAR } from "@/lib/catalog";
import { rm } from "@/lib/format";

export function generateStaticParams() {
  return RIDER_GEAR.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  props: PageProps<"/rider-gear/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = RIDER_GEAR.find((g) => g.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — ${rm(item.price)}`,
    description: `${item.description[0]?.slice(0, 150)}… Genuine stock at JomKaki Motor — enquire on WhatsApp.`,
    alternates: { canonical: `/rider-gear/${item.slug}` },
  };
}

export default async function GearPage(props: PageProps<"/rider-gear/[slug]">) {
  const { slug } = await props.params;
  const item = RIDER_GEAR.find((g) => g.slug === slug);
  if (!item) notFound();

  const related = RIDER_GEAR.filter((g) => g.slug !== item.slug)
    .slice(0, 8)
    .map((g) => ({
      href: `/rider-gear/${g.slug}`,
      name: g.name,
      brand: g.brand,
      price: g.price,
      thumb: (g.gearType === "Helmet" || g.gearType === "Helmet Visor" ? "helmet" : "gear") as "helmet" | "gear",
      image: g.image,
    }));

  return (
    <ProductDetail
      path={`/rider-gear/${item.slug}`}
      categoryLabel="Rider Gear"
      categoryHref="/rider-gear"
      thumb={item.gearType === "Helmet" || item.gearType === "Helmet Visor" ? "helmet" : "gear"}
      brand={item.brand}
      name={item.name}
      price={item.price}
      availability={item.availability}
      highlights={item.highlights}
      description={item.description}
      specs={item.specs}
      shareVariant={item.shareVariant}
      cta="WhatsApp to Order"
      images={item.images}
      colourImages={item.colourImages}
      options={[
        ...(item.sizes ? [{ label: "Size", values: item.sizes }] : []),
        ...(item.colours ? [{ label: "Colour", values: item.colours }] : []),
      ]}
      related={related}
    />
  );
}
