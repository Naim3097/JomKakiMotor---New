import type { Metadata } from "next";
import { Geist, Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import WhatsAppFab from "@/components/WhatsAppFab";
import JsonLd from "@/components/JsonLd";
import { buildSearchIndex } from "@/lib/catalog";
import { dealerSchemas, organizationSchema } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/data/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Motorcycles, Gear & Genuine Parts in Malaysia`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Malaysia's premier motorcycle dealership. New Yamaha, Honda, Modenas & SYM motorcycles with flexible financing, genuine riding gear and parts. Branches in Kuching, Bintulu, KL & Selangor — enquire on WhatsApp.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = buildSearchIndex();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header searchIndex={searchIndex} />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </CartProvider>
        <JsonLd data={[organizationSchema(), ...dealerSchemas()]} />
      </body>
    </html>
  );
}
