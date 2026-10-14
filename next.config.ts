import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (30–50% smaller than WebP), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    // Product photos change only when the catalogue is re-imported, so
    // optimised variants can stay cached for a month.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Cards render at ≤ 400 CSS px, detail heroes at ≤ 700 — no need for
    // the default 3840 tier.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 128, 256, 384],
    qualities: [75],
  },
  // The iPhone-only page became the Apple & Samsung Smartphone page (R4
  // slides 2, 15–23); keep the old URL working for anything already linking
  // to it.
  async redirects() {
    return [{ source: "/iphone-17", destination: "/smartphone", permanent: true }];
  },
};

export default nextConfig;
