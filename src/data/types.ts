export type MotorcycleType = "Kapcai" | "Scooter" | "Sport" | "Naked";

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
  highlights: string[]; // 4 key bullets
  description: string[];
  featureBlocks: { title: string; body: string }[];
  specs: { label: string; value: string }[];
}

export type GearType =
  | "Helmet"
  | "Helmet Visor"
  | "Gloves"
  | "T-Shirt"
  | "Raincoat"
  | "Cap";

export type AccessoryType = "Sport Rims" | "Fork Lay" | "Bodykit" | "Lighting";

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
  /** Accessories only — bike models this part fits */
  compatibleModels?: string[];
  /** Which share row variant to use */
  shareVariant: "full" | "compact";
}

export interface GearItem extends CatalogueProduct {
  gearType: GearType;
}

export interface AccessoryItem extends CatalogueProduct {
  accessoryType: AccessoryType;
}

export interface OilItem extends CatalogueProduct {
  oilType: "Mineral" | "Semi-Synthetic" | "Fully Synthetic";
  viscosity: string;
  volume: string;
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
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
}
