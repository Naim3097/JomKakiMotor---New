import type { Branch } from "./types";

export const SITE_URL = "https://www.jomkaki.com.my";
export const SITE_NAME = "JomKaki Rider";

export const COPYRIGHT =
  "Copyright © 2026 K Trading Sdn. Bhd. [Registration No. 202201045481 (1491178-H)]. All Rights Reserved.";

/** Primary motorcycle / general enquiry line (Peter Teo, Batu Kawa) */
export const WHATSAPP_MOTOR = "60109726558";
/** iPhone 17 orders — Satok branch */
export const WHATSAPP_IPHONE = "60106608698";

export const EMAIL = "enquiries@jomkaki.com.my";

export const HOURS = [
  { days: "Monday – Friday", time: "8:30 am – 5:30 pm" },
  { days: "Saturday", time: "8:30 am – 12:30 pm" },
  { days: "Sunday & Public Holidays", time: "Closed" },
];

/**
 * Moda replaces CNC per R2 — the client added Moda to the motorcycle brand
 * filter (slide 15) and dropped CNC from accessories (slide 16). The list
 * stays at 15 so the wall grid fills exactly.
 */
export const BRANDS = [
  "Yamaha",
  "Honda",
  "Modenas",
  "SYM",
  "WMOTO",
  "Keeway",
  "QJMOTOR",
  "CFMOTO",
  "Aveta",
  "Moda",
  "KYT",
  "ARC",
  "PPR",
  "ENKEI",
  "AEROX THAI",
];

/**
 * Official brand logo files. Drop the supplied asset into
 * public/brand/logos/ and map it here — the BrandWall grid renders any mapped
 * brand as a logo at uniform height (monochrome until hover) and falls back
 * to the text wordmark for the rest. Do not generate or trace logos; only
 * official artwork from the client/manufacturer press kits goes here.
 * Example: Yamaha: "/brand/logos/yamaha.png",
 */
export const BRAND_LOGOS: Partial<Record<(typeof BRANDS)[number], string>> = {
  Yamaha: "/brand/logos/yamaha.png",
  Honda: "/brand/logos/honda.png",
  Modenas: "/brand/logos/modenas.png",
  SYM: "/brand/logos/sym.png",
  WMOTO: "/brand/logos/wmoto.png",
  Keeway: "/brand/logos/keeway.png",
  QJMOTOR: "/brand/logos/qjmotor.png",
  CFMOTO: "/brand/logos/cfmoto.png",
  Aveta: "/brand/logos/aveta.png",
  Moda: "/brand/logos/moda.png",
  KYT: "/brand/logos/kyt.png",
  ARC: "/brand/logos/arc.png",
  PPR: "/brand/logos/ppr.png",
  ENKEI: "/brand/logos/enkei.png",
  // AEROX THAI: no logo supplied yet — text wordmark fallback
};

/**
 * Where a brand-wall tile should filter to. Bike marques go to the
 * motorcycle catalogue; helmet and rim brands to their own listings. Values
 * must match each product's `brand` field exactly for the filter to select.
 */
export const BRAND_CATALOGUE: Record<string, "/motorcycles" | "/rider-gear" | "/accessories"> = {
  KYT: "/rider-gear",
  ARC: "/rider-gear",
  PPR: "/accessories",
  ENKEI: "/accessories",
  "AEROX THAI": "/accessories",
};

export const FINANCING_PARTNERS = [
  "Loan Kedai",
  "First Class Credit",
  "Chailease Berjaya",
  "JCL",
];

/**
 * Credit-partner logo files (R2 slide 24). Drop the client's supplied assets
 * into public/brand/partners/ and map them here — the About Us page renders
 * any mapped partner as a logo and falls back to the text wordmark.
 * Example: "Loan Kedai": "/brand/partners/loan-kedai.png",
 */
export const PARTNER_LOGOS: Partial<Record<(typeof FINANCING_PARTNERS)[number], string>> = {
  "First Class Credit": "/brand/partners/first-class-credit.png",
  "Chailease Berjaya": "/brand/partners/chailease-berjaya.png",
  JCL: "/brand/partners/jcl.png",
  // Loan Kedai is in-house — no logo supplied; text wordmark fallback
};

export const SOCIALS = {
  sarawak: {
    label: "JomKaki Rider Sarawak",
    facebook: "https://www.facebook.com/jomkakimotor",
    instagram: "https://www.instagram.com/jomkakimotor",
    tiktok: "https://www.tiktok.com/@jomkakimotor",
  },
  kl: {
    label: "JomKaki Rider KL & Selangor",
    facebook: "https://www.facebook.com/jomkakimotorkl",
    instagram: "https://www.instagram.com/jomkakimotorkl",
    tiktok: "https://www.tiktok.com/@jomkakimotorkl",
  },
};

export const BRANCHES: Branch[] = [
  {
    id: "satok",
    name: "Kuching, Satok",
    region: "Sarawak",
    address:
      "LOT 442, Ground Floor Section 11, KTLD, Jln Kulas, Kampung Bandarshah, 93400 Kuching, Sarawak",
    mapUrl: "https://maps.app.goo.gl/zxUcbSChRMHSSFfc8",
    staff: [
      { name: "Yaasin", whatsapp: "601112977806" },
      { name: "Putri", whatsapp: "60162988334" },
      { name: "Effa", whatsapp: "60167055889" },
      { name: "Syamin", whatsapp: "60146536889" },
      { name: "Desmond", whatsapp: "60162094333" },
    ],
  },
  {
    id: "batu-kawa",
    name: "Kuching, Batu Kawa",
    region: "Sarawak",
    address:
      "Ground Floor, Sublot 2, 15 Shoppe, Jalan Batu Kawa, Taman Desa Wira, 93250 Kuching, Sarawak",
    mapUrl: "https://maps.app.goo.gl/VRcJ2Q9C4qJR3pfAA",
    staff: [
      { name: "Peter Teo", whatsapp: "60109726558" },
      { name: "Fung", whatsapp: "60108808968" },
      { name: "Chai", whatsapp: "60108808757" },
      { name: "Shiqien", whatsapp: "60109055998" },
    ],
  },
  {
    id: "kota-samarahan",
    name: "Kuching, Kota Samarahan",
    region: "Sarawak",
    address:
      "SL No.10 Lots 2280 & 3792, MTLD Desa Ilmu Commercial Kota Samarahan, 94300 Kuching, Sarawak",
    mapUrl: "https://maps.app.goo.gl/nbGTrFPbusUy3gZq5",
    staff: [
      { name: "Franky", whatsapp: "60146934654" },
      { name: "Athirah", whatsapp: "60146967889" },
      { name: "Nickson", whatsapp: "60109737553" },
      { name: "Hadi", whatsapp: "60109008757" },
    ],
  },
  {
    id: "bintulu",
    name: "Bintulu",
    region: "Sarawak",
    address:
      "Unit No. A-L1-11, SK One Garden City, Jln Sultan Iskandar, 97000 Bintulu, Sarawak",
    mapUrl: "https://maps.app.goo.gl/qmkg6zyi9HoFBgA68",
    staff: [
      { name: "Yong", whatsapp: "60146044184" },
      { name: "Tigan", whatsapp: "60143768696" },
    ],
  },
  {
    id: "kl-selangor",
    name: "KL & Selangor (Petaling Jaya)",
    region: "KL & Selangor",
    address:
      "15, Ground Floor 10th Mile, Lebuhraya Persekutuan, Sungai Way Free Trade Industrial Zone, 47300 Petaling Jaya, Selangor",
    mapUrl: "https://maps.app.goo.gl/iGH5Lfu8E8g4eVAh6",
    staff: [
      { name: "Ash", whatsapp: "60143175998" },
      { name: "Amirul", whatsapp: "60164238698" },
      { name: "Putra", whatsapp: "60165098757" },
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/motorcycles", children: [
    { label: "Motorcycles", href: "/motorcycles" },
    { label: "Rider Gear", href: "/rider-gear" },
    { label: "Accessories", href: "/accessories" },
  ]},
  { label: "Sell", href: "/sell" },
  { label: "iPhone 17", href: "/iphone-17" },
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];
