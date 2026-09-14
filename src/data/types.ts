/** R2 slide 15 — client's type taxonomy for the motorcycle filter */
export type MotorcycleType =
  | "Underbone"
  | "Scooter"
  | "Cafe Racer"
  | "Mini-sport"
  | "Sport"
  | "Naked";

export interface Motorcycle {
  slug: string;
  brand: string;
  model: string;
  type: MotorcycleType;
  cc: number;
  price: number;
  deposit: number;
  monthly: number;
  year: number;
  colours: string[];
  availability: "In Stock" | "Pre-Order";
  popular?: boolean;
  arrival: string; // ISO date, drives "Newest Arrivals"
  /** Primary (card) photo and the full gallery, under public/products/ */
  image?: string;
  images?: string[];
  /** Colour option → the gallery photo showing that colour */
  colourImages?: Record<string, string>;
  /**
   * Credit partners this model can be financed through. Omit for the full
   * FINANCING_PARTNERS list; Aveta is JCL & Chailease Berjaya only.
   */
  financingPartners?: string[];
  highlights: string[]; // 4 key bullets
  description: string[];
  featureBlocks: { title: string; body: string }[];
  specs: { label: string; value: string }[];
}

export type GearType = "Helmet" | "Helmet Visor" | "Helmet Spoiler" | "Raincoat";

export type AccessoryType = "Sport Rims" | "Fork Lay";

export interface CatalogueProduct {
  slug: string;
  name: string;
  brand: string;
  price: number;
  availability: "In Stock" | "Pre-Order";
  arrival: string;
  highlights: string[];
  description: string[];
  specs: { label: string; value: string }[];
  /** Rider gear only — renders the size selection bar */
  sizes?: string[];
  /** Colour options shown on the detail page (R2 slides 21–22) */
  colours?: string[];
  /** Accessories only — every bike model this part fits (union of fitment) */
  compatibleModels?: string[];
  /** Primary (card) photo and the full gallery, under public/products/ */
  image?: string;
  images?: string[];
  /** Colour option → the gallery photo showing that colour */
  colourImages?: Record<string, string>;
  /** Which share row variant to use */
  shareVariant: "full" | "compact";
}

export interface GearItem extends CatalogueProduct {
  gearType: GearType;
}

export interface AccessoryItem extends CatalogueProduct {
  accessoryType: AccessoryType;
  /**
   * Which bike models each colour is made for — rim colours are not
   * interchangeable across models (client sheet, e.g. Orange 3 Bintang is
   * Y125Z only). The detail page only offers valid colour/model pairs.
   */
  fitment?: { colour: string; models: string[] }[];
}

export interface IphoneModel {
  id: string;
  name: string;
  rrp: number;
  monthlyFrom: number;
  storage: string[];
  colours: string[];
  /** Lineup render (white background, 1000×562) in public/ */
  image?: string;
}

export interface Branch {
  id: string;
  name: string;
  region: "Sarawak" | "KL & Selangor";
  address: string;
  mapUrl: string;
  staff: { name: string; whatsapp: string }[];
}

export interface Faq {
  q: string;
  a: string[];
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  /** true until replaced with live Google Business Profile data */
  isSample: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  /** Listing thumbnail (R2 slide 25) — a placeholder frame renders until set */
  image?: string;
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
}
