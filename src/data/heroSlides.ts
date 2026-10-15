import { WHATSAPP_IPHONE, WHATSAPP_MOTOR } from "./site";
import { waLink } from "@/lib/whatsapp";

/**
 * Homepage sliding main banner — copy and artwork per Client Comments R4
 * slides 3–5. `tone` describes the artwork, not the text: "dark" artwork
 * carries light type, "light" artwork carries dark type.
 */
export interface HeroSlide {
  id: string;
  tag: string;
  headline: string;
  body: string;
  tone: "dark" | "light";
  desktop: string;
  mobile: string;
  /**
   * Where the wide crop is anchored from md up. Between 768 and about 1400px
   * the 2.83:1 artwork is taller than the frame, so `object-cover` throws away
   * several hundred pixels of width — centred, that cuts the subject in half.
   * Each banner puts its subject somewhere different (the riders sit far right,
   * the handsets right of centre, the branch map between the two), so no single
   * anchor keeps all three in frame and each carries its own.
   */
  focus: string;
  /** Alt text for the artwork — the headline already carries the message */
  alt: string;
  ctas: { label: string; href: string; wa?: boolean }[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "motorcycles",
    tag: "Nationwide Showrooms: Kuching • Bintulu • Selangor • KL",
    headline: "Stop Dreaming About the Ride. Own It Today.",
    body: "From daily city commutes to weekend highway runs, JomKaki Rider puts you in the saddle. Explore genuine bikes, riding gear, and custom flexible installment plans tailored to your budget.",
    tone: "dark",
    desktop: "/brand/hero-1-desktop.jpg",
    mobile: "/brand/hero-1-mobile.jpg",
    // Riders occupy the right third of the wide crop
    focus: "md:object-right",
    alt: "Riders on scooters accelerating through a highway tunnel",
    ctas: [
      {
        label: "WhatsApp Us",
        href: waLink(WHATSAPP_MOTOR, "Hi JomKaki Rider, I'd like to make an enquiry."),
        wa: true,
      },
      { label: "Browse Motorcycles", href: "/motorcycles" },
    ],
  },
  {
    id: "smartphones",
    tag: "Exclusive to Kuching Showrooms",
    headline: "The Smartphone You Want. One Message Away.",
    body: "Flexible installments on genuine iPhone and Samsung Galaxy flagships. Fast WhatsApp approval and same-day collection in Kuching.",
    tone: "light",
    desktop: "/brand/hero-2-desktop.jpg",
    mobile: "/brand/hero-2-mobile.jpg",
    // Handsets sit right of centre and need their left edge kept
    focus: "md:object-[65%_center]",
    alt: "iPhone and Samsung Galaxy flagship handsets",
    ctas: [
      {
        label: "WhatsApp Us",
        href: waLink(WHATSAPP_IPHONE, "Hi JomKaki Rider, I'd like to ask about smartphone installments."),
        wa: true,
      },
      { label: "Browse Smartphones", href: "/smartphone" },
    ],
  },
  {
    id: "branches",
    tag: "Rapidly Expanding Across Malaysia",
    headline: "Building Malaysia's Favourite Motorcycle Dealership.",
    body: "From Kuching and Bintulu to Kuala Lumpur and Selangor, JomKaki Rider is growing fast. We are opening new locations nationwide to bring hassle-free financing, genuine bikes, and local support closer to you.",
    tone: "light",
    desktop: "/brand/hero-3-desktop.jpg",
    mobile: "/brand/hero-3-mobile.jpg",
    // The map runs from just past halfway to the right edge. It is the widest
    // of the three subjects — at 768px it is about 1% wider than the window
    // itself, so this anchor trades a sliver of the west coast for keeping
    // Sabah and Sarawak whole, and shows all of it from 1024px up.
    focus: "md:object-[92%_center]",
    alt: "Map of Malaysia marked with JomKaki Rider branch locations",
    ctas: [
      { label: "Find Your Nearest Branch", href: "/contact" },
      { label: "About Us", href: "/about-us" },
    ],
  },
];
