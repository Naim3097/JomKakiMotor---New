import { Suspense } from "react";
import Breadcrumbs from "./Breadcrumbs";
import CatalogueClient, {
  type FacetConfig,
  type ListingItem,
} from "./CatalogueClient";
import FaqAccordion from "./FaqAccordion";
import { Section, SectionHeading } from "./Section";
import { SHOP_FAQS } from "@/data/faqs";

/** Shared server shell for the four shop category pages. */
export default function CatalogueShell({
  title,
  blurb,
  path,
  items,
  facets,
  newestIds,
}: {
  title: string;
  blurb: string;
  path: string;
  items: ListingItem[];
  facets: FacetConfig[];
  newestIds: string[];
}) {
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: title, href: path },
          ]}
        />
        <div className="mt-4">
          <SectionHeading kicker="Shop" title={title} lead={blurb} />
        </div>
        <div className="mt-8">
          <Suspense>
            <CatalogueClient items={items} facets={facets} newestIds={newestIds} />
          </Suspense>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={SHOP_FAQS} />
        </div>
      </Section>
    </>
  );
}

export function priceBand(price: number, bands: [number, string][]): string {
  for (const [max, label] of bands) {
    if (price <= max) return label;
  }
  return bands[bands.length - 1][1];
}
