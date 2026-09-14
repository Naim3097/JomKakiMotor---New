import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { ACCESSORIES } from "@/lib/catalog";
import { rm } from "@/lib/format";

export function generateStaticParams() {
  return ACCESSORIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/accessories/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = ACCESSORIES.find((a) => a.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — ${rm(item.price)}`,
    description: `${item.description[0]?.slice(0, 150)}… 100% genuine part at JomKaki Motor — enquire on WhatsApp.`,
    alternates: { canonical: `/accessories/${item.slug}` },
  };
}

export default async function AccessoryPage(props: PageProps<"/accessories/[slug]">) {
  const { slug } = await props.params;
  const item = ACCESSORIES.find((a) => a.slug === slug);
  if (!item) notFound();

  const related = ACCESSORIES.filter((a) => a.slug !== item.slug)
    .slice(0, 4)
    .map((a) => ({
      href: `/accessories/${a.slug}`,
      name: a.name,
      brand: a.brand,
      price: a.price,
      thumb: (a.accessoryType === "Sport Rims" ? "rim" : "part") as "rim" | "part",
      image: a.image,
    }));

  return (
    <ProductDetail
      path={`/accessories/${item.slug}`}
      categoryLabel="Accessories"
      categoryHref="/accessories"
      thumb={item.accessoryType === "Sport Rims" ? "rim" : "part"}
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
      fitment={item.fitment}
      options={item.fitment ? [] : item.colours ? [{ label: "Colour", values: item.colours }] : []}
      related={related}
    />
  );
}
