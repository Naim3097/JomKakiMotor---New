import type { PhoneModel } from "./types";

/**
 * Flagship handset lineup, straight from the client's "Smartphone" sheet
 * (R4 slides 15–23): official product name, storage tiers and the lowest
 * monthly instalment band per tier. The sheet publishes no handset prices
 * and no colour options, so neither is shown.
 */
export const PHONE_MODELS: PhoneModel[] = [
  {
    id: "iphone-17",
    make: "Apple",
    name: "iPhone 17",
    image: "/brand/phones/iphone-17.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "2++" },
    ],
  },
  {
    id: "iphone-17-pro",
    make: "Apple",
    name: "iPhone 17 Pro",
    image: "/brand/phones/iphone-17-pro.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "2++" },
    ],
  },
  {
    id: "iphone-17-pro-max",
    make: "Apple",
    name: "iPhone 17 Pro Max",
    image: "/brand/phones/iphone-17-pro-max.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "3++" },
    ],
  },
  {
    id: "iphone-18-pro",
    make: "Apple",
    name: "iPhone 18 Pro",
    image: "/brand/phones/iphone-18-pro.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "3++" },
    ],
  },
  {
    id: "iphone-18-pro-max",
    make: "Apple",
    name: "iPhone 18 Pro Max",
    image: "/brand/phones/iphone-18-pro-max.jpg",
    storage: [
      { size: "256GB", monthly: "3++" },
      { size: "512GB", monthly: "3++" },
    ],
  },
  {
    id: "galaxy-z-flip-8",
    make: "Samsung",
    name: "Samsung Galaxy Z Flip 8",
    image: "/brand/phones/galaxy-z-flip-8.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "2++" },
    ],
  },
  {
    id: "galaxy-s26-plus",
    make: "Samsung",
    name: "Samsung Galaxy S26+",
    image: "/brand/phones/galaxy-s26-plus.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "2++" },
    ],
  },
  {
    id: "galaxy-s26-ultra",
    make: "Samsung",
    name: "Samsung Galaxy S26 Ultra",
    image: "/brand/phones/galaxy-s26-ultra.jpg",
    storage: [
      { size: "256GB", monthly: "2++" },
      { size: "512GB", monthly: "2++" },
    ],
  },
];

/** Category buttons above the lineup (R4 slide 17) */
export const PHONE_MAKES = ["Apple", "Samsung"] as const;

/** Cheapest band across a model's storage tiers, e.g. "2++" */
export function lowestBand(m: PhoneModel): string {
  return m.storage.map((s) => s.monthly).sort()[0];
}

/** `logo` renders the partner's official mark in place of the name (R3 slide 12) */
export const PHONE_FINANCING = [
  {
    name: "Loan Kedai (In-House)",
    tagline:
      "Our exclusive in-house \"Loan Kedai\" option is designed specifically for our Kuching community.",
    points: [
      {
        title: "Easy Access",
        body: "More accommodating credit assessments compared to traditional banking routes.",
        icon: "zap",
      },
      {
        title: "Minimal Hassle",
        body: "A streamlined, local application process managed directly by our JomKaki Rider team.",
        icon: "sliders",
      },
      {
        title: "Personalized Service",
        body: "We work with you directly via WhatsApp to arrange a practical payment structure.",
        icon: "userCheck",
      },
      {
        title: "Direct Collection",
        body: "Once approved, simply walk into our designated JomKaki Rider Satok branch to pick up your new phone.",
        icon: "packageCheck",
      },
    ],
  },
  {
    name: "First Class Credit",
    logo: "/brand/partners/first-class-credit.png",
    tagline:
      "Leverage our trusted partnership with First Class Credit for a seamless installment experience.",
    points: [
      {
        title: "Fast Approvals",
        body: "Get your application reviewed and approved quickly.",
        icon: "zap",
      },
      {
        title: "Flexible Tenures",
        body: "Choose a repayment period that comfortably aligns with your monthly income.",
        icon: "sliders",
      },
      {
        title: "Simple Documentation",
        body: "Just prepare your standard income documents (latest payslips, bank statements, and IC).",
        icon: "fileText",
      },
      {
        title: "Direct Collection",
        body: "Once approved, simply walk into our designated JomKaki Rider Satok branch to pick up your new phone.",
        icon: "packageCheck",
      },
    ],
  },
] as const;

/** Icons rather than step numbers (R3 slide 11); wording per R4 slide 20 */
export const PHONE_STEPS = [
  { title: "Choose Your Smartphone Model & Specs", icon: "smartphone" },
  { title: "Contact Us Directly via WhatsApp", icon: "chat" },
  { title: "Secure Your Financing", icon: "creditCard" },
  { title: "Collect at JomKaki Rider Satok Branch", icon: "store" },
] as const;

export const PHONE_WHY = [
  { title: "Backed by a Trusted Local Brand", icon: "handshake" },
  { title: "Exclusive, Hassle-Free Financing", icon: "banknote" },
  { title: "100% Original & Guaranteed", icon: "badgeCheck" },
  { title: "VIP WhatsApp Service", icon: "chat" },
] as const;
