import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { TextLink } from "./Button";
import Carousel from "./Carousel";
import DetailGallery from "./DetailGallery";
import FaqAccordion from "./FaqAccordion";
import JsonLd from "./JsonLd";
import ProductEnquiry from "./ProductEnquiry";
import { Section, SectionHeading } from "./Section";
import ShareRow from "./ShareRow";
import Thumb, { type ThumbKind } from "./Thumb";
import { SHOP_FAQS } from "@/data/faqs";
import { FINANCING_PARTNERS, WHATSAPP_MOTOR } from "@/data/site";
import { rm } from "@/lib/format";
import { productSchema } from "@/lib/schema";
import type { Faq } from "@/data/types";

export interface DetailProps {
  path: string;
  categoryLabel: string;
  categoryHref: string;
  thumb: ThumbKind;
  brand: string;
  name: string;
  price: number;
  availability: "In Stock" | "Pre-Order";
  highlights: string[];
  description: string[];
  featureBlocks?: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  shareVariant: "full" | "compact";
  options?: { label: string; values: string[] }[];
  cta?: string;
  /** Gallery photos — placeholder frames render until these are supplied */
  images?: string[];
  /** Motorcycle extras */
  deposit?: number;
  monthly?: number;
  isVehicle?: boolean;
  cc?: number;
  faqs?: Faq[];
  related?: {
    href: string;
    name: string;
    brand: string;
    price: number;
    thumb: ThumbKind;
  }[];
}

export default function ProductDetail(p: DetailProps) {
  const faqs = p.faqs ?? SHOP_FAQS;
  return (
    <>
      <Section pad="tight">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: p.categoryLabel, href: p.categoryHref },
            { label: p.name, href: p.path },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Presentation — picture gallery in carousel structure (R2) */}
          <div>
            <DetailGallery kind={p.thumb} label={p.name} images={p.images} />
            {(!p.images || p.images.length === 0) && (
              <p className="mt-3 text-xs text-muted/70">
                Product photography placeholder. Client imagery to follow.
              </p>
            )}
          </div>

          {/* Buy box */}
          <div>
            <p className="text-sm font-medium text-muted">{p.brand}</p>
            <h1 className="display-2 mt-1 text-ink">{p.name}</h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <div>
                <p className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
                  {rm(p.price)}
                </p>
                {p.monthly !== undefined && (
                  <p className="mt-1 text-sm text-muted">
                    From <span className="font-semibold text-brand">{rm(p.monthly)}/month</span>
                    {p.deposit !== undefined && <> · deposit {rm(p.deposit)}</>}
                  </p>
                )}
              </div>
              <span
                className={`text-xs font-semibold uppercase tracking-[0.08em] ${
                  p.availability === "In Stock" ? "text-wa" : "text-muted"
                }`}
              >
                {p.availability}
              </span>
            </div>
            {p.monthly !== undefined && (
              <p className="mt-2 text-xs text-muted/80">
                Estimated installment. Final terms depend on financing approval. T&amp;C apply.
              </p>
            )}

            {/* Bullet-point form per R2 slides 19/21/22 */}
            <ul className="mt-8 list-disc space-y-2.5 border-t border-line pl-5 pt-7 text-[15px] leading-relaxed text-ink marker:text-brand">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-7">
              <ProductEnquiry
                productName={
                  p.name.toLowerCase().includes(p.brand.toLowerCase())
                    ? p.name
                    : `${p.brand} ${p.name}`
                }
                path={p.path}
                number={WHATSAPP_MOTOR}
                cta={p.cta ?? "WhatsApp to Order"}
                options={p.options}
                cartItem={{
                  id: p.path,
                  name: p.name,
                  brand: p.brand,
                  price: p.price,
                  href: p.path,
                }}
              />
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <ShareRow path={p.path} title={p.name} variant={p.shareVariant} />
            </div>
          </div>
        </div>
      </Section>

      {/* Description + specs */}
      <Section tone="surface" pad="tight">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display-3 text-ink">Description</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
              {p.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {p.featureBlocks && p.featureBlocks.length > 0 && (
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {p.featureBlocks.map((f) => (
                  <div key={f.title} className="py-4">
                    <dt className="text-[15px] font-semibold text-ink">{f.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted">{f.body}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <div>
            <h2 className="display-3 text-ink">Specifications</h2>
            <table className="mt-5 w-full text-sm">
              <tbody className="divide-y divide-line border-y border-line">
                {p.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row" className="w-2/5 py-3.5 pr-4 text-left font-medium text-muted">
                      {s.label}
                    </th>
                    <td className="py-3.5 font-medium text-ink">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {p.isVehicle && (
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  Financing Partners
                </h3>
                <p className="mt-3 text-[15px] font-medium text-ink">
                  {FINANCING_PARTNERS.join("  ·  ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Related — carousel structure with View All (R2 slide 20) */}
      {p.related && p.related.length > 0 && (
        <Section pad="tight">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading title="You May Also Like" />
            <TextLink href={p.categoryHref} className="shrink-0">
              View All
            </TextLink>
          </div>
          <div className="mt-8">
            <Carousel>
              {p.related.map((r) => (
                <Link key={r.href} href={r.href} className="group block w-60 shrink-0 snap-start sm:w-72">
                  <Thumb
                    kind={r.thumb}
                    label={r.name}
                    className="aspect-4/3 w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted">{r.brand}</p>
                    <h3 className="text-[15px] font-semibold text-ink transition-colors group-hover:text-brand">{r.name}</h3>
                    <p className="mt-1 text-[15px] font-semibold text-ink">{rm(r.price)}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </Section>
      )}

      {/* FAQ — last section before footer, per R1 */}
      <Section tone="surface">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>

      <JsonLd
        data={productSchema({
          name: p.name,
          description: p.description[0] ?? "",
          price: p.price,
          path: p.path,
          brand: p.brand,
          availability: p.availability,
          isVehicle: p.isVehicle,
          cc: p.cc,
        })}
      />
    </>
  );
}
