"use client";

import { useState } from "react";
import { useCart, type CartInput } from "./CartContext";
import { CartIcon, CheckIcon } from "./icons";

export type CartProduct = CartInput;

/**
 * Two shapes, per R2: a corner icon on product cards (slide 18) and a full
 * button beside the WhatsApp CTA on detail pages (slides 19, 21, 22).
 */
export default function AddToCartButton({
  product,
  variant = "icon",
  className = "",
}: {
  product: CartProduct;
  variant?: "icon" | "button";
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    // Cards wrap the button in a Link — keep the click from navigating.
    e.preventDefault();
    e.stopPropagation();
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
        title="Add to cart"
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-sm transition hover:bg-brand-deep ${className}`}
      >
        {added ? <CheckIcon className="h-4 w-4" /> : <CartIcon className="h-[18px] w-[18px]" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg border border-ink bg-transparent px-8 py-3.5 text-base font-semibold tracking-[-0.01em] text-ink transition-colors hover:bg-ink hover:text-white ${className}`}
    >
      {added ? <CheckIcon className="h-[18px] w-[18px]" /> : <CartIcon className="h-[18px] w-[18px]" />}
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
