# Brand assets

## Manufacturer brand logos (`logos/`)

The homepage BrandWall grid renders official manufacturer logos when they are
supplied. Drop each file into `public/brand/logos/` (PNG or SVG, transparent
background) and map it in `BRAND_LOGOS` in `src/data/site.ts`. Every logo
renders in the same 28px-high box (`object-contain`, monochrome until hover),
so mixed native proportions stay uniform. Brands without a mapped file fall
back to their text wordmark. Only official artwork from the client or
manufacturer press kits — never generated or traced logos.

## `jomkaki-rider-logo.png`

Web copy of the client's master logo, rendered by `src/components/Logo.tsx`.
Orange is **#F26522** — the source of the site's `--color-brand` token. Do not
recreate, recolour, or redraw it. `jomkaki-logo.png` is the retired JomKaki
Motor mark, kept only as reference; nothing on the site loads it.

## Homepage banner carousel (`hero-{1,2,3}-{desktop,mobile}.jpg`)

Three client-supplied banners, one per slide of `HeroCarousel` (R4 slides
3–5). Copy and CTAs live in `src/data/heroSlides.ts`, not in the artwork.

| Slide | `tone` | Subject | Copy |
|---|---|---|---|
| 1 | `dark` | Riders in a highway tunnel | "Stop Dreaming About the Ride" |
| 2 | `light` | iPhone & Galaxy handsets on warm orange | "The Smartphone You Want" |
| 3 | `light` | Branch map of Malaysia | "Building Malaysia's Favourite…" |

`tone` describes the **artwork**, not the text: a `dark` banner carries light
type, a `light` banner carries dark type. Get it wrong and the headline
disappears.

Banner 2 is also the hero of `/smartphone` (R4 slide 16 supplies the same two
file IDs), so replacing it changes both places.

## Page heroes

| File | Size | Used by |
|---|---|---|
| `hero-1-desktop.jpg` etc. | 1600 × 566 | Carousel, **≥ 768px** — full-bleed, `object-center` |
| `hero-1-mobile.jpg` etc. | 671 × 1600 | Carousel, **< 768px** — full-bleed, `object-center` |
| `sell-hero.jpg` | 1600 × 893 | `/sell` — right-hand column beside the write-up |
| `about-hero.jpg` | 1600 × 1152 | `/about-us` — right-hand column, flush to the section edge |

## Handset renders (`phones/`)

One render per model in `PHONE_MODELS` (`src/data/phones.ts`), from the client's
Smartphone sheet image folder. All eight share **1000 × 562** on a white
background, which is what keeps the lineup cards equal-height — crop any
replacement to 16:9 on white rather than letting the card letterbox it.

## Rules for replacement artwork

- **Composition.** Wide banners must keep the left ~40% quiet: the tag,
  headline, body copy and CTAs sit there, and `object-cover` crops the sides
  first at narrow desktop widths. Portrait banners must keep the **top** ~55%
  quiet — the copy sits there and the subject is bottom-anchored, which the
  `/smartphone` hero relies on with its reserved bottom band.
- **Contrast.** Check the headline against the artwork at 768, 1024, 1280 and
  1440. A pale banner needs dark type (`tone: "light"`), and the primary CTA
  is a solid button either way.
- **Export.** The originals arrive as ~2560 × 906 / 812 × 1937 JPEGs of 1–2 MB
  each. Run them through `scripts/catalogue/optimise.js` (long edge 1600px,
  mozjpeg q82) before committing — that is what produces the sizes in the
  table above, at 28–95 KB per banner with no visible loss. These are served
  as static files, so the file on disk is the file the visitor downloads.

Layered guide templates are in `../../Hero Background Guides/`.
