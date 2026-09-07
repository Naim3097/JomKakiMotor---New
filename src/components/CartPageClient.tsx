"use client";

import Link from "next/link";
import { LinkButton } from "./Button";
import { describeOptions, useCart } from "./CartContext";
import WaButton from "./WaButton";
import { TrashIcon } from "./icons";
import { SITE_URL, WHATSAPP_MOTOR } from "@/data/site";
import { rm } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

/**
 * Cart contents + WhatsApp checkout. There is no online payment — the order
 * summary is handed to a sales advisor as a prefilled WhatsApp message.
 */
export default function CartPageClient() {
  const { items, subtotal, setQty, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="border-t border-line pt-10">
        <p className="text-lg font-semibold text-ink">Your cart is empty.</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Browse the catalogue and tap the cart button on any product to save it
          here, then send the whole list to us on WhatsApp.
        </p>
        <div className="mt-7">
          <LinkButton href="/motorcycles" variant="brand">
            Browse the catalogue
          </LinkButton>
        </div>
      </div>
    );
  }

  // Colour/size travels with each line into WhatsApp (R3 slide 8)
  const orderLines = items
    .map((i) => {
      const opts = describeOptions(i.options);
      return `• ${i.name}${opts ? ` (${opts})` : ""} × ${i.qty} — ${rm(
        i.price * i.qty
      )}`;
    })
    .join("\n");
  const message = `Hi JomKaki Rider, I'd like to order:\n${orderLines}\n\nTotal: ${rm(
    subtotal
  )}\n${SITE_URL}/cart`;

  const qtyBtn =
    "flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-ink disabled:opacity-40";

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const opts = describeOptions(item.options);
          return (
            <li key={item.key} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted">{item.brand}</p>
                <Link
                  href={item.href}
                  className="text-[15px] font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
                {/* Chosen colour / size (R3 slide 8) */}
                {opts && <p className="mt-0.5 text-xs text-muted">{opts}</p>}
                <p className="mt-0.5 text-sm font-semibold text-brand">{rm(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty(item.key, item.qty - 1)}
                  aria-label={`Reduce quantity of ${item.name}`}
                  className={qtyBtn}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-ink">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(item.key, item.qty + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                  className={qtyBtn}
                >
                  +
                </button>
              </div>
              <p className="w-24 text-right text-[15px] font-semibold text-ink">
                {rm(item.price * item.qty)}
              </p>
              <button
                type="button"
                onClick={() => remove(item.key)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-muted transition-colors hover:text-ink"
              >
                <TrashIcon className="h-[18px] w-[18px]" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="h-fit rounded-lg bg-surface p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          Order Summary
        </h2>
        <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
          <span className="text-sm text-muted">Total</span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
            {rm(subtotal)}
          </span>
        </div>
        <div className="mt-6">
          <WaButton href={waLink(WHATSAPP_MOTOR, message)} size="lg" className="w-full">
            Order via WhatsApp
          </WaButton>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          No online payment. Your order goes straight to a sales advisor who
          will confirm stock, pricing and collection at your nearest branch.
        </p>
        <button
          type="button"
          onClick={clear}
          className="mt-5 text-xs font-semibold text-muted underline underline-offset-2 transition-colors hover:text-ink"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
