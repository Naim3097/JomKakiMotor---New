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
      <div className="mt-4">
        <p className="text-[13px] font-medium text-muted">{bike.brand}</p>
        <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
          {bike.model}
        </h3>
        {/* One value per line — the layout is identical on every card at
            every viewport width, instead of wrapping when prices get long. */}
        <p className="mt-1.5 text-base font-semibold text-ink transition-colors group-hover:text-brand">
          {rm(bike.price)}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-brand">From {rm(bike.monthly)}/mo</p>
        <p className="text-[13px] text-muted">Deposit from {rm(bike.deposit)}</p>
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
      <div className="mt-4">
        <p className="text-[13px] font-medium text-muted">{brand}</p>
        <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand">{name}</h3>
        {meta && <p className="mt-0.5 text-[13px] text-muted">{meta}</p>}
        <p className="mt-1.5 text-base font-semibold text-ink transition-colors group-hover:text-brand">{rm(price)}</p>
      </div>
    </Link>
  );
}
