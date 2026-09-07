import type { IphoneModel } from "./types";

/**
 * Lineup and monthly figures follow the client's preferred card UI (R4
 * feedback) — 17e dropped, "From RM___/month*" figures as supplied. RRP is
 * retained for structured data / the cart, never displayed on the page.
 */
export const IPHONE_MODELS: IphoneModel[] = [
  {
    id: "iphone-17",
    image: "/brand/iphone-17.jpg",
    name: "iPhone 17",
    rrp: 3999,
    monthlyFrom: 200,
    storage: ["256GB", "512GB"],
    colours: ["Lavender", "Sage", "Mist Blue", "Black", "White"],
  },
  {
    id: "iphone-17-pro",
    image: "/brand/iphone-17-pro.jpg",
    name: "iPhone 17 Pro",
    rrp: 5499,
    monthlyFrom: 260,
    storage: ["256GB", "512GB", "1TB"],
    colours: ["Silver", "Cosmic Orange", "Deep Blue"],
  },
  {
    id: "iphone-17-pro-max",
    image: "/brand/iphone-17-pro-max.jpg",
    name: "iPhone 17 Pro Max",
    rrp: 5799,
    monthlyFrom: 280,
    storage: ["256GB", "512GB", "1TB", "2TB"],
    colours: ["Silver", "Cosmic Orange", "Deep Blue"],
  },
];

/** `logo` renders the partner's official mark in place of the name (R3 slide 12) */
export const IPHONE_FINANCING = [
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
        body: "Once approved, simply walk into our designated JomKaki Rider Satok branch to pick up your new iPhone.",
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
        body: "Once approved, simply walk into our designated JomKaki Rider Satok branch to pick up your new iPhone.",
        icon: "packageCheck",
      },
    ],
  },
] as const;

/** Icons rather than step numbers (R3 slide 11) */
export const IPHONE_STEPS = [
  { title: "Choose Your iPhone 17 Model & Specs", icon: "smartphone" },
  { title: "Contact Us Directly via WhatsApp", icon: "chat" },
  { title: "Secure Your Financing", icon: "creditCard" },
  { title: "Collect at JomKaki Rider Satok Branch", icon: "store" },
] as const;

export const IPHONE_WHY = [
  { title: "Backed by a Trusted Local Brand", icon: "handshake" },
  { title: "Exclusive, Hassle-Free Financing", icon: "banknote" },
  { title: "100% Original & Guaranteed", icon: "badgeCheck" },
  { title: "VIP WhatsApp Service", icon: "chat" },
] as const;
