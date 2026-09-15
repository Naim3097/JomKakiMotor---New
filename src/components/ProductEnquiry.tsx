"use client";

import { useState } from "react";
import AddToCartButton, { type CartProduct } from "./AddToCartButton";
import { useProductMedia } from "./ProductMedia";
import WaButton from "./WaButton";
import { productEnquiry } from "@/lib/whatsapp";

/**
 * Variant pickers (size / colour / storage) feeding the prefilled WhatsApp
 * message, so every chat starts qualified.
 */
export default function ProductEnquiry({
  productName,
  path,
  number,
  cta = "WhatsApp to Order",
  options = [],
  stretch = false,
  note = true,
  cartItem,
  fitment,
  colourImages,
}: {
  productName: string;
  path: string;
  number: string;
  cta?: string;
  options?: { label: string; values: string[] }[];
  /** Fill the parent's height and pin the CTA to the bottom (grid alignment) */
  stretch?: boolean;
  /** Show the "no online payment" reassurance under the CTA */
  note?: boolean;
  /** When set, an Add to Cart button renders beside the WhatsApp CTA (R2) */
  cartItem?: CartProduct;
  /**
   * Colour ↔ bike-model compatibility (rims). Adds a "Your Bike Model"
   * picker beside Colour and filters each by the other: choose a bike and
   * only its colours remain; choose a colour and only the bikes it is made
   * for remain. A buyer can never pair e.g. an Orange 3 Bintang with an NVX.
   */
  fitment?: { colour: string; models: string[] }[];
  /** Colour option → gallery photo; picking a colour shows that photo */
  colourImages?: Record<string, string>;
}) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const { setFocus } = useProductMedia();

  const MODEL = "Your Bike Model";
  const COLOUR = "Colour";
  let groups = options;
  if (fitment && fitment.length) {
    const chosenModel = picks[MODEL];
    const chosenColour = picks[COLOUR];
    // Each list is narrowed by the other selection (both directions)
    const models = [
      ...new Set(
        fitment
          .filter((f) => !chosenColour || f.colour === chosenColour)
          .flatMap((f) => f.models)
      ),
    ];
    const colours = fitment
      .filter((f) => !chosenModel || f.models.includes(chosenModel))
      .map((f) => f.colour);
    groups = [
      { label: MODEL, values: models },
      { label: COLOUR, values: colours },
      ...options.filter((o) => o.label !== COLOUR),
    ];
  }

  const pick = (label: string, value: string) => {
    if (label === COLOUR && colourImages?.[value]) setFocus(colourImages[value]);
    setPicks((prev) => {
      const next = { ...prev, [label]: prev[label] === value ? "" : value };
      // Changing the bike can invalidate the colour already chosen
      if (fitment && label === MODEL && next[COLOUR]) {
        const ok = fitment.find((f) => f.colour === next[COLOUR])?.models.includes(next[MODEL]);
        if (next[MODEL] && !ok) next[COLOUR] = "";
      }
      return next;
    });
  };

  const extras = Object.entries(picks)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  const href = productEnquiry(number, productName, path, extras || undefined);

  // Carry the chosen colour/size into the cart line (R3 slide 8)
  const chosen = Object.fromEntries(
    Object.entries(picks).filter(([, v]) => v)
  );

  return (
    <div className={`flex flex-col gap-6 ${stretch ? "h-full" : ""}`}>
      {groups.map((opt) => (
        <div key={opt.label}>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {opt.label}
            {picks[opt.label] && (
              <span className="ml-2 font-medium normal-case tracking-normal text-ink">
                {picks[opt.label]}
              </span>
            )}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {opt.values.map((v) => {
              const active = picks[opt.label] === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => pick(opt.label, v)}
                  aria-pressed={active}
                  className={`min-w-11 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-paper text-ink hover:border-brand hover:text-brand"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className={stretch ? "mt-auto" : ""}>
        <div className={`flex flex-col gap-3 ${stretch ? "" : "sm:flex-row sm:flex-wrap sm:items-center"}`}>
          <WaButton href={href} size="lg" className={stretch ? "w-full" : "w-full sm:w-auto"}>
            {cta}
          </WaButton>
          {cartItem && (
            <AddToCartButton
              product={{ ...cartItem, options: chosen }}
              variant="button"
              className={stretch ? "w-full" : "w-full sm:w-auto"}
            />
          )}
        </div>
        {note && (
          <p className="mt-3 text-xs leading-relaxed text-muted">
            No online payment. Chat with a sales advisor, confirm stock, and
            collect at your nearest branch.
          </p>
        )}
      </div>
    </div>
  );
}
