# JomKaki Motor — Website

Next.js 16 (App Router, TypeScript, Tailwind v4) catalogue site. No checkout —
every conversion path leads to a WhatsApp enquiry. Built to the plan in
[`../JomKaki-Website-Plan.md`](../JomKaki-Website-Plan.md).

## Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (static-first)
```

## Where things live

| Path | Purpose |
|---|---|
| `src/data/` | All content: motorcycles, gear, accessories, oils, iPhone models, branches, FAQs, reviews, blog posts, site config (WhatsApp numbers, socials, hours) |
| `src/lib/` | WhatsApp deep-link builders, RM formatting, catalogue helpers, JSON-LD schema builders |
| `src/components/` | Design system + page sections |
| `src/app/` | Routes per the sitemap (motorcycles / rider-gear / accessories / engine-oil each with `[slug]` detail pages) |

The data layer mirrors the planned Sanity content model — when the client
confirms the CMS, swap `src/data/*.ts` for Sanity queries without touching
components.

## Placeholders that MUST be replaced before launch

1. **All inventory data** (`src/data/motorcycles.ts`, `riderGear.ts`,
   `accessories.ts`, `engineOils.ts`) — prices, deposits and monthly figures are
   indicative samples pending the client's confirmed price list. Y15ZR copy/specs
   and all product-type templates come from Client Comments R1.
2. **Reviews** (`src/data/reviews.ts`) — every entry is `isSample: true` and the
   homepage shows a visible "sample reviews" note until real Google Business
   Profile reviews are wired in (Places API fetch cached at build time).
3. **Photography** — `Thumb` renders neutral placeholders; swap for client
   photography via `next/image` (fields are ready on the data model).
4. **Logo** (`src/components/Logo.tsx`) — text approximation; replace with the
   official SVG asset.
5. **Brand & financing-partner logos** — text chips until official files arrive.
6. **Social URLs** (`src/data/site.ts`) — placeholder handles; confirm the real
   Linktree/FB/IG/TikTok URLs for both regions.
7. **Legal pages** — Terms of Use and Privacy Notice are placeholder copy
   (noindexed until final).
8. **Contact form** (`src/components/ContactForm.tsx`) — currently composes a
   prefilled email; wire an API route + Resend for server-side delivery.
9. **BM (Bahasa Malaysia)** — the header shows a disabled BM chip. The i18n
   mirror (`/ms/**` + hreflang) is planned in §6 of the plan doc and blocked on
   the client's translation-ownership decision.
10. **Domain** — `SITE_URL` in `src/data/site.ts` assumes `www.jomkaki.com.my`;
    confirm before generating the production sitemap.

## Fixed business facts (do not change without client sign-off)

- Motorcycle/general WhatsApp: **+60 10-972 6558** · iPhone 17: **+60 10-660 8698**
- Footer copyright: K Trading Sdn. Bhd. [202201045481 (1491178-H)]
- 5 branches + per-salesperson WhatsApp numbers: `src/data/site.ts` (from R1 slide 42)
- Removed by client instruction: login/register, wishlist, newsletter, cart,
  product review widgets, JomKaki Gadget page.
