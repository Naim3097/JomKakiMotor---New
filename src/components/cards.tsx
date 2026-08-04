import Link from "next/link";
import Thumb, { type ThumbKind } from "./Thumb";
import { rm } from "@/lib/format";
import type { Motorcycle } from "@/data/types";

/**
 * Borderless product tiles — image block, then typography.
 * No card chrome, no badges-as-pills; whitespace does the separating.
 */

function Flag({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3 top-3 bg-paper px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
      {children}
    </span>
  );
}

export function BikeCard({ bike, isNew = false }: { bike: Motorcycle; isNew?: boolean }) {
  return (
    <Link href={`/motorcycles/${bike.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        <Thumb
          kind="bike"
          label={`${bike.brand} ${bike.model}`}
          className="aspect-4/3 w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isNew && <Flag>New</Flag>}
        {bike.availability === "Pre-Order" && <Flag>Pre-order</Flag>}
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-muted">{bike.brand}</p>
        <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
          {bike.model}
        </h3>
        {/* One value per line — the layout is identical on every card at
            every viewport width, instead of wrapping when prices get long. */}
        <p className="mt-1.5 text-[15px] font-semibold text-ink">{rm(bike.price)}</p>
        <p className="mt-0.5 text-xs font-semibold text-brand">From {rm(bike.monthly)}/mo</p>
        <p className="text-xs text-muted">Deposit from {rm(bike.deposit)}</p>
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
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        <Thumb
          kind={kind}
          label={name}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isNew && <Flag>New</Flag>}
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium text-muted">{brand}</p>
        <h3 className="text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">{name}</h3>
        {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
        <p className="mt-1.5 text-[15px] font-semibold text-ink">{rm(price)}</p>
      </div>
    </Link>
  );
}
