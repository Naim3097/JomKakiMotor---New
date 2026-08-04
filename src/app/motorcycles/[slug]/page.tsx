import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { MOTORCYCLES } from "@/lib/catalog";
import { rm } from "@/lib/format";

export function generateStaticParams() {
  return MOTORCYCLES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: PageProps<"/motorcycles/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const bike = MOTORCYCLES.find((m) => m.slug === slug);
  if (!bike) return {};
  return {
    title: `${bike.brand} ${bike.model} Price Malaysia — From ${rm(bike.monthly)}/month`,
    description: `${bike.brand} ${bike.model} (${bike.cc}cc ${bike.type}) at ${rm(bike.price)} with deposit from ${rm(bike.deposit)}. Flexible HP financing, official warranty, collection in Kuching, Bintulu, KL & Selangor. Enquire on WhatsApp.`,
    alternates: { canonical: `/motorcycles/${bike.slug}` },
  };
}

export default async function MotorcyclePage(props: PageProps<"/motorcycles/[slug]">) {
  const { slug } = await props.params;
  const bike = MOTORCYCLES.find((m) => m.slug === slug);
  if (!bike) notFound();

  const related = MOTORCYCLES.filter(
    (m) => m.slug !== bike.slug && (m.brand === bike.brand || m.type === bike.type)
  )
    .slice(0, 4)
    .map((m) => ({
      href: `/motorcycles/${m.slug}`,
      name: `${m.brand} ${m.model}`,
      brand: m.brand,
      price: m.price,
      thumb: "bike" as const,
    }));

  return (
    <ProductDetail
      path={`/motorcycles/${bike.slug}`}
      categoryLabel="Motorcycles"
      categoryHref="/motorcycles"
      thumb="bike"
      brand={bike.brand}
      name={`${bike.brand} ${bike.model}`}
      price={bike.price}
      deposit={bike.deposit}
      monthly={bike.monthly}
      availability={bike.availability}
      highlights={bike.highlights}
      description={bike.description}
      featureBlocks={bike.featureBlocks}
      specs={bike.specs}
      shareVariant="full"
      isVehicle
      cc={bike.cc}
      showTradeIn
      cta="Chat to Apply"
      options={[{ label: "Colour", values: bike.colours }]}
      related={related}
    />
  );
}
