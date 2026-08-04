import {
  BRANCHES,
  EMAIL,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from "@/data/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "K Trading Sdn. Bhd.",
    url: SITE_URL,
    email: EMAIL,
    identifier: "202201045481 (1491178-H)",
    sameAs: [
      SOCIALS.sarawak.facebook,
      SOCIALS.sarawak.instagram,
      SOCIALS.sarawak.tiktok,
      SOCIALS.kl.facebook,
      SOCIALS.kl.instagram,
      SOCIALS.kl.tiktok,
    ],
  };
}

export function dealerSchemas() {
  return BRANCHES.map((b) => ({
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    name: `${SITE_NAME} — ${b.name}`,
    address: b.address,
    url: `${SITE_URL}/contact`,
    hasMap: b.mapUrl,
    email: EMAIL,
    openingHours: ["Mo-Fr 08:30-17:30", "Sa 08:30-12:30"],
    parentOrganization: { "@type": "Organization", name: SITE_NAME },
  }));
}

export function productSchema(opts: {
  name: string;
  description: string;
  price: number;
  path: string;
  brand: string;
  availability: "In Stock" | "Pre-Order";
  isVehicle?: boolean;
  cc?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.isVehicle ? "Motorcycle" : "Product",
    name: opts.name,
    description: opts.description,
    brand: { "@type": "Brand", name: opts.brand },
    url: `${SITE_URL}${opts.path}`,
    ...(opts.isVehicle && opts.cc
      ? {
          vehicleEngine: {
            "@type": "EngineSpecification",
            engineDisplacement: { "@type": "QuantitativeValue", value: opts.cc, unitCode: "CMQ" },
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: "MYR",
      availability:
        opts.availability === "In Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

export function faqSchema(faqs: { q: string; a: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}
