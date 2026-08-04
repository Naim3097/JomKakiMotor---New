import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { ENGINE_OILS } from "@/lib/catalog";
import { rm } from "@/lib/format";

export function generateStaticParams() {
  return ENGINE_OILS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata(
  props: PageProps<"/engine-oil/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = ENGINE_OILS.find((o) => o.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — ${rm(item.price)}`,
    description: `${item.description[0]?.slice(0, 150)}… Guaranteed authentic at JomKaki Motor — enquire on WhatsApp.`,
    alternates: { canonical: `/engine-oil/${item.slug}` },
  };
}

export default async function OilPage(props: PageProps<"/engine-oil/[slug]">) {
  const { slug } = await props.params;
  const item = ENGINE_OILS.find((o) => o.slug === slug);
  if (!item) notFound();

  const related = ENGINE_OILS.filter((o) => o.slug !== item.slug)
    .slice(0, 4)
    .map((o) => ({
      href: `/engine-oil/${o.slug}`,
      name: o.name,
      brand: o.brand,
      price: o.price,
      thumb: "oil" as const,
    }));

  return (
    <ProductDetail
      path={`/engine-oil/${item.slug}`}
      categoryLabel="Engine Oil"
      categoryHref="/engine-oil"
      thumb="oil"
      brand={item.brand}
      name={item.name}
      price={item.price}
      availability={item.availability}
      highlights={item.highlights}
      description={item.description}
      specs={item.specs}
      shareVariant={item.shareVariant}
      cta="WhatsApp to Enquire"
      related={related}
    />
  );
}
