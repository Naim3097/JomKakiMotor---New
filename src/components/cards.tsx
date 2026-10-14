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

/**
 * `flex flex-col` matters: grid rows stretch their items to a common height,
 * so the card can pin its detail block to the bottom edge. Without it a name
 * that wraps to two lines drags its own price, rule and deposit a line below
 * the neighbouring cards' — the client flagged exactly that.
 */
const CARD_HOVER =
  "group flex flex-col rounded-lg p-3 -m-3 transition-colors hover:bg-brand/10";

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
            monthly: bike.monthly,
          }}
          className="absolute right-3 top-3"
        />
      </div>
      {/* Card format per R4 slide 7: no selling price — the monthly band is
          the focal figure, then the rule, deposit and T&C note. */}
      {/* justify-end drops the whole name-and-figure group to the card's
          bottom edge, so a two-line name steals its slack from the gap under
          the photo instead of pushing the figure, rule and deposit a line
          below the neighbouring cards'. The name stays tight to its figure. */}
      <div className="mt-4 flex flex-1 flex-col justify-end">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          {bike.brand} {bike.model}
        </h3>
        <div className="mt-1">
          <p className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-brand">
            From RM{bike.monthly}
            <span className="text-base font-semibold">/month*</span>
          </p>
          <div className="mt-2.5 border-t-2 border-brand pt-2.5">
            <p className="text-sm font-semibold text-ink">
              {bike.deposit > 0 ? `Deposit: ${rm(bike.deposit)}*` : "No Deposit Required*"}
            </p>
          </div>
          <p className="mt-2.5 text-[11px] text-muted">*T&amp;C Apply</p>
        </div>
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
      {/* Bottom-aligned for the same reason as BikeCard — gear names such as
          "KYT NFJ 5th Memorial FT Full Package" run to two or three lines */}
      <div className="mt-4 flex flex-1 flex-col justify-end">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">{name}</h3>
        <div className="mt-1">
          <p className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-brand">
            {rm(price)}
          </p>
          {meta && (
            <div className="mt-2.5 border-t-2 border-brand pt-2.5">
              {/* One line, so a long fitment list cannot make this card's rule
                  and price sit lower than its neighbours'. The full list is on
                  the product page, and the tooltip carries it meanwhile. */}
              <p className="line-clamp-1 text-sm font-medium text-muted" title={meta}>
                {meta}
              </p>
            </div>
          )}
          <p className="mt-2.5 text-[11px] text-muted">*T&amp;C Apply</p>
        </div>
      </div>
    </Link>
  );
}
