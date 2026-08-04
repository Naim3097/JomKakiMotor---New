import type { IphoneModel } from "./types";

/** Prices and monthly figures from the client's iPhone Website layout draft. */
export const IPHONE_MODELS: IphoneModel[] = [
  {
    id: "iphone-17e",
    image: "/brand/iphone-17e.jpg",
    name: "iPhone 17e",
    rrp: 2999,
    monthlyFrom: 108.3,
    storage: ["256GB", "512GB"],
    colours: ["Black", "White"],
  },
  {
    id: "iphone-17",
    image: "/brand/iphone-17.jpg",
    name: "iPhone 17",
    rrp: 3999,
    monthlyFrom: 144.41,
    storage: ["256GB", "512GB"],
    colours: ["Lavender", "Sage", "Mist Blue", "Black", "White"],
  },
  {
    id: "iphone-17-pro",
    image: "/brand/iphone-17-pro.jpg",
    name: "iPhone 17 Pro",
    rrp: 5499,
    monthlyFrom: 198.51,
    storage: ["256GB", "512GB", "1TB"],
    colours: ["Silver", "Cosmic Orange", "Deep Blue"],
  },
  {
    id: "iphone-17-pro-max",
    image: "/brand/iphone-17-pro-max.jpg",
    name: "iPhone 17 Pro Max",
    rrp: 5799,
    monthlyFrom: 216.63,
    storage: ["256GB", "512GB", "1TB", "2TB"],
    colours: ["Silver", "Cosmic Orange", "Deep Blue"],
  },
];

export const IPHONE_FINANCING = [
  {
    name: "Loan Kedai (In-House)",
    tagline:
      "Our exclusive in-house \"Loan Kedai\" option is designed specifically for our Kuching community.",
    points: [
      {
        title: "Easy Access",
        body: "More accommodating credit assessments compared to traditional banking routes.",
      },
      {
        title: "Minimal Hassle",
        body: "A streamlined, local application process managed directly by our JomKaki team.",
      },
      {
        title: "Personalized Service",
        body: "We work with you directly via WhatsApp to arrange a practical payment structure.",
      },
      {
        title: "Direct Collection",
        body: "Once approved, simply walk into our designated JomKaki Motor Satok branch to pick up your new iPhone.",
      },
    ],
  },
  {
    name: "First Class Credit",
    tagline:
      "Leverage our trusted partnership with First Class Credit for a seamless installment experience.",
    points: [
      {
        title: "Fast Approvals",
        body: "Get your application reviewed and approved quickly.",
      },
      {
        title: "Flexible Tenures",
        body: "Choose a repayment period that comfortably aligns with your monthly income.",
      },
      {
        title: "Simple Documentation",
        body: "Just prepare your standard income documents (latest payslips, bank statements, and IC).",
      },
      {
        title: "Direct Collection",
        body: "Once approved, simply walk into our designated JomKaki Motor Satok branch to pick up your new iPhone.",
      },
    ],
  },
];

export const IPHONE_STEPS = [
  { step: "Step 1", title: "Choose Your iPhone 17 Model & Specs" },
  { step: "Step 2", title: "Contact Us Directly via WhatsApp" },
  { step: "Step 3", title: "Secure Your Financing" },
  { step: "Step 4", title: "Collect at JomKaki Motor Satok Branch" },
];

export const IPHONE_WHY = [
  { title: "Backed by a Trusted Local Brand" },
  { title: "Exclusive, Hassle-Free Financing" },
  { title: "100% Original & Guaranteed" },
  { title: "VIP WhatsApp Service" },
];
