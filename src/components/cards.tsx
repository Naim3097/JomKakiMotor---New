import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import Thumb, { type ThumbKind } from "./Thumb";
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
        <Thumb
          kind="bike"
          label={`${bike.brand} ${bike.model}`}
          className="aspect-4/3 w-full transition-transform duration-500 group-hover:scale-[1.02]"
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
      {/* Typography per the client's card mock (R4): bold name, prominent
          orange price, orange rule, deposit + monthly, *T&C Apply. */}
      <div className="mt-4">
        <h3 className="text-base font-bold leading-snug text-ink">
          {bike.brand} {bike.model}
        </h3>
        <p className="mt-1 font-display text-[26px] font-bold tracking-[-0.02em] text-brand">
          {rm(bike.price)}
        </p>
        <div className="mt-2.5 border-t-2 border-brand pt-2.5">
          <p className="text-sm font-bold text-brand">Deposit: {rm(bike.deposit)}*</p>
          <p className="mt-0.5 text-sm font-bold text-ink">From {rm(bike.monthly)}/month*</p>
        </div>
        <p className="mt-2.5 text-xs text-muted">*T&amp;C Apply</p>
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
  isNew = false,
}: {
  href: string;
  name: string;
  brand: string;
  price: number;
  meta?: string;
  kind: ThumbKind;
  isNew?: boolean;
}) {
  return (
    <Link href={href} className={CARD_HOVER}>
      <div className="relative overflow-hidden rounded-lg">
        <Thumb
          kind={kind}
          label={name}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.02]"
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
      {/* Same card typography as BikeCard (client mock, R4) */}
      <div className="mt-4">
        <h3 className="text-base font-bold leading-snug text-ink">{name}</h3>
        <p className="mt-1 font-display text-[26px] font-bold tracking-[-0.02em] text-brand">
          {rm(price)}
        </p>
        {meta && (
          <div className="mt-2.5 border-t-2 border-brand pt-2.5">
            <p className="text-sm font-semibold text-ink">{meta}</p>
          </div>
        )}
        <p className="mt-2.5 text-xs text-muted">*T&amp;C Apply</p>
      </div>
    </Link>
  );
}
