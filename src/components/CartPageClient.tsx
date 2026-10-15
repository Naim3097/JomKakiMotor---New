"use client";

import { useMemo } from "react";
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
export default function CartPageClient({ validPaths }: { validPaths: string[] }) {
  const { items, setQty, remove, clear } = useCart();

  /**
   * A saved line can name a product the catalogue no longer carries — the six
   * bikes the client discontinued at R4, say, or anything whose slug changed
   * in a re-import. Those lines used to link straight to the 404 page, so they
   * are now shown without a link, marked, and kept out of both the total and
   * the WhatsApp order.
   */
  const live = useMemo(() => new Set(validPaths), [validPaths]);
  const inStock = items.filter((i) => live.has(i.href));

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
  const orderLines = inStock
    .map((i) => {
      const opts = describeOptions(i.options);
      const amount = i.monthly ? `from RM${i.monthly}/month` : rm(i.price * i.qty);
      return `• ${i.name}${opts ? ` (${opts})` : ""} × ${i.qty} — ${amount}`;
    })
    .join("\n");
  // Financed lines have no cash amount, so they count as zero here
  const total = inStock.reduce((sum, i) => sum + (i.monthly ? 0 : i.price * i.qty), 0);
  const message = `Hi JomKaki Rider, I'd like to order:\n${orderLines}\n\nTotal: ${rm(
    total
  )}\n${SITE_URL}/cart`;

  const qtyBtn =
    "flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-ink disabled:opacity-40";

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => {
          const opts = describeOptions(item.options);
          const available = live.has(item.href);
          return (
            <li key={item.key} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted">{item.brand}</p>
                {available ? (
                  <Link
                    href={item.href}
                    className="text-[15px] font-semibold text-ink underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <p className="text-[15px] font-semibold text-muted">{item.name}</p>
                )}
                {/* Chosen colour / size (R3 slide 8) */}
                {opts && <p className="mt-0.5 text-xs text-muted">{opts}</p>}
                {available ? (
                  <p className="mt-0.5 text-sm font-semibold text-brand">
                    {item.monthly ? `From RM${item.monthly}/month*` : rm(item.price)}
                  </p>
                ) : (
                  <p className="mt-0.5 text-sm font-semibold text-muted">
                    No longer available — remove it to order the rest
                  </p>
                )}
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
                {item.monthly || !available ? "—" : rm(item.price * item.qty)}
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
          <span className="text-sm text-muted">
            Total{inStock.some((i) => i.monthly) ? " (excluding financed items)" : ""}
          </span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
            {rm(total)}
          </span>
        </div>
        {/* Nothing to send if every saved line has since been discontinued */}
        {inStock.length > 0 ? (
          <>
            <div className="mt-6">
              <WaButton href={waLink(WHATSAPP_MOTOR, message)} size="lg" className="w-full">
                Order via WhatsApp
              </WaButton>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              No online payment. Your order goes straight to a sales advisor who
              will confirm stock, pricing and collection at your nearest branch.
            </p>
          </>
        ) : (
          <>
            <div className="mt-6">
              <LinkButton href="/motorcycles" variant="brand" className="w-full">
                Browse the catalogue
              </LinkButton>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Everything saved here has since sold out or been discontinued.
              Pick something from the catalogue and we will take it from there.
            </p>
          </>
        )}
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
