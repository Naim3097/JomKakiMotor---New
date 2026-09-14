"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";
import { type ThumbKind } from "./Thumb";

/**
 * Product picture gallery in a carousel structure (R2 slides 19 & 21).
 * Renders the supplied image list; until client photography lands it shows
 * placeholder frames so the carousel behaviour is already in place.
 */
export default function DetailGallery({
  kind,
  label,
  images = [],
}: {
  kind: ThumbKind;
  label: string;
  images?: string[];
}) {
  // Three placeholder frames stand in for the main/side/detail shots.
  const slides = images.length > 0 ? images : [null, null, null];
  const [active, setActive] = useState(0);

  const go = (next: number) =>
    setActive((next + slides.length) % slides.length);

  const arrowBtn =
    "absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sm transition-colors hover:bg-paper";

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg">
        <ProductImage
          src={slides[active] ?? undefined}
          kind={kind}
          alt={`${label} — photo ${active + 1}`}
          priority={active === 0}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="aspect-4/3 w-full"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous photo"
              className={`${arrowBtn} left-3`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next photo"
              className={`${arrowBtn} right-3`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 4l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === active}
              className={`overflow-hidden rounded-md border-2 transition-colors ${
                i === active ? "border-brand" : "border-transparent hover:border-line"
              }`}
            >
              <ProductImage
                src={src ?? undefined}
                kind={kind}
                alt=""
                sizes="120px"
                className="aspect-4/3 w-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
