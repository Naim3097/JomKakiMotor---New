"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { CartIcon } from "./icons";

/** Header cart entry point (R2 slide 2) with a live item-count badge. */
export default function CartLink({ className = "" }: { className?: string }) {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className={`relative rounded-md p-2 text-ink/70 transition-colors hover:text-ink ${className}`}
    >
      <CartIcon className="h-[22px] w-[22px]" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
