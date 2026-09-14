import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ProductImage from "./ProductImage";
import { type ThumbKind } from "./Thumb";
import { rm } from "@/lib/format";
import type { Motorcycle } from "@/data/types";

/**
 * Borderless product tiles — image block, then typography.
 * R2 slide 18: every card carries an add-to-cart icon, slightly larger
 * text, and an orange hover treatment.
 */

const CARD_HOVER =
  "group block rounded-lg p-3 -m-3 transition-colors hover:bg-brand/10";

function Flag({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-paper px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
      {children}
    </span>
  );
}

export function BikeCard({ bike, isNew = false }: { bike: Motorcycle; isNew?: boolean }) {
  return (
    <Link href={`/motorcycles/${bike.slug}`} className={CARD_HOVER}>
      <div className="relative overflow-hidden rounded-lg">
        <ProductImage
          src={bike.image}
          kind="bike"
          alt={`${bike.brand} ${bike.model}`}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="aspect-4/3 w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {isNew && <Flag>New</Flag>}
          {bike.availability === "Pre-Order" && <Flag>Pre-order</Flag>}
        </div>
        <AddToCartButton
          product={{
            id: bike.slug,
            name: `${bike.brand} ${bike.model}`,
            brand: bike.brand,
            price: bike.price,
            href: `/motorcycles/${bike.slug}`,
          }}
          className="absolute right-3 top-3"
        />
      </div>
      {/* Typography per the client's card mock (R4), with a clear scale:
          price (display, 26px, orange) > name (15px semibold) > detail
          lines (14px) > *T&C (11px muted). One bold weight per tier so
          the price stays the unambiguous focal point. */}
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          {bike.brand} {bike.model}
        </h3>
        <p className="mt-1 font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-brand">
          {rm(bike.price)}
        </p>
        <div className="mt-2.5 border-t-2 border-brand pt-2.5">
          <p className="text-sm font-semibold text-brand">
            {bike.deposit > 0 ? `Deposit: ${rm(bike.deposit)}*` : "No Deposit Required*"}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-ink">From {rm(bike.monthly)}/month*</p>
        </div>
        <p className="mt-2.5 text-[11px] text-muted">*T&amp;C Apply</p>
      </div>
    </Link>
  );
}

export function ProductCard({
  href,
  name,
  brand,
  price,
  meta,
  kind,
  image,
  isNew = false,
}: {
  href: string;
  name: string;
  brand: string;
  price: number;
  meta?: string;
  kind: ThumbKind;
  image?: string;
  isNew?: boolean;
}) {
  return (
    <Link href={href} className={CARD_HOVER}>
      <div className="relative overflow-hidden rounded-lg">
        <ProductImage
          src={image}
          kind={kind}
          alt={name}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="aspect-square w-full rounded-lg transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isNew && (
          <div className="absolute left-3 top-3">
            <Flag>New</Flag>
          </div>
        )}
        <AddToCartButton
          product={{ id: href, name, brand, price, href }}
          className="absolute right-3 top-3"
        />
      </div>
      {/* Same type scale as BikeCard: price > name > meta > *T&C */}
      <div className="mt-4">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">{name}</h3>
        <p className="mt-1 font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-brand">
          {rm(price)}
        </p>
        {meta && (
          <div className="mt-2.5 border-t-2 border-brand pt-2.5">
            <p className="text-sm font-medium text-muted">{meta}</p>
          </div>
        )}
        <p className="mt-2.5 text-[11px] text-muted">*T&amp;C Apply</p>
      </div>
    </Link>
  );
}
