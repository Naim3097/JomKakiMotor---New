"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Lightweight cart, per Client Comments R2. No online payment — the cart
 * collects items and hands the order summary to WhatsApp at checkout.
 * Persisted in localStorage so it survives navigation and reloads.
 */
export interface CartItem {
  /** Product identity — the catalogue slug or page path */
  id: string;
  name: string;
  brand: string;
  price: number;
  /** Product page, so the cart can link back */
  href: string;
  /**
   * Chosen variant, e.g. { Colour: "Matte Grey", Size: "L" } (R3 slide 8).
   * Two different variants of one product are separate line items.
   */
  options?: Record<string, string>;
  /** Identity + variant — what setQty/remove address */
  key: string;
  qty: number;
}

/** What a caller hands to `add` — the key and qty are derived. */
export type CartInput = Omit<CartItem, "qty" | "key">;

interface CartApi {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

/** Stable line key so "Black / L" and "Black / XL" don't merge. */
export function variantKey(id: string, options?: Record<string, string>): string {
  const chosen = Object.entries(options ?? {})
    .filter(([, v]) => v)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return chosen ? `${id}::${chosen}` : id;
}

/** "Colour: Matte Grey · Size: L" — shared by the cart page and WhatsApp. */
export function describeOptions(options?: Record<string, string>): string {
  return Object.entries(options ?? {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
}

const CartContext = createContext<CartApi | null>(null);

const STORAGE_KEY = "jomkaki-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  // Gates the persist effect until the stored cart has been loaded — without
  // it, the first render's empty array overwrites the saved cart.
  const [hydrated, setHydrated] = useState(false);

  // Hydrate after mount — localStorage is unavailable during SSR, and
  // reading it in the useState initializer would mismatch the server HTML.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // Carts saved before variants existed have no `key` — backfill it.
        const stored: CartItem[] = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from persisted storage
        setItems(
          stored.map((i) => ({ ...i, key: i.key ?? variantKey(i.id, i.options) }))
        );
      }
    } catch {
      /* corrupted or unavailable storage — start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked — cart still works in-memory */
    }
  }, [items, hydrated]);

  const add = useCallback((item: CartInput) => {
    const key = variantKey(item.id, item.options);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, key, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartApi>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
