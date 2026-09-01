import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CartPageClient from "@/components/CartPageClient";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the motorcycles, gear and parts in your cart, then send the order to our sales team on WhatsApp. No online payment — pay on collection at your nearest branch.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <Section pad="tight">
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }]} />
      <div className="mt-10">
        <p className="eyebrow text-brand">Your selection</p>
        <h1 className="display-1 mt-4 text-ink">Cart</h1>
      </div>
      <div className="mt-10">
        <CartPageClient />
      </div>
    </Section>
  );
}
