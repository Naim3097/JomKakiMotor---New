# Brand assets

## Manufacturer brand logos (`logos/`)

The homepage BrandWall grid renders official manufacturer logos when they are
supplied. Drop each file into `public/brand/logos/` (PNG or SVG, transparent
background) and map it in `BRAND_LOGOS` in `src/data/site.ts`. Every logo
renders in the same 28px-high box (`object-contain`, monochrome until hover),
so mixed native proportions stay uniform. Brands without a mapped file fall
back to their text wordmark. Only official artwork from the client or
manufacturer press kits — never generated or traced logos.

## iPhone 17 hero (`iphone-hero-*.jpg`)

Same structure as the homepage hero, but on pure black (#000 — matches the
artwork's edges): `iphone-hero-mobile.jpg` is the full portrait background
below 768px; `iphone-hero-phones.jpg` (right-hand crop of the master
`iphone-hero-desktop.jpg`, from x=900) fills the desktop right panel with a
`from-black` gradient edge. To re-crop after replacing the master, cut from
~43% width to the right edge at full height.

## `jomkaki-logo.png`

Web copy (640px wide, transparent) of the client's master logo
`LOGO JOM KAKI (1).png`. Orange is **#F26522** — the source of the site's
`--color-brand` token. Do not recreate, recolour, or redraw it.

## Hero imagery

| File | Size | Used by | Notes |
|---|---|---|---|
| `hero-mobile.jpg` | 812 × 1937 | **< 768px** — full background, `object-bottom` | Rider centred, bottom-anchored below the text |
| `hero-rider.jpg` | 1156 × 747 | **≥ 768px** — right-hand panel, `object-center` | Rider-focused crop of the desktop master |
| `hero-desktop.jpg` | 2106 × 747 | *not served* | The client's full-width master, kept as the source for re-crops |

### Why the desktop hero is a panel, not a full-bleed background

The wide master is composed for a 2.82:1 frame — it only fills a 1920 × 680
hero exactly. At any narrower viewport `object-cover` scales it to the hero's
height and crops from the left, which drags the rider across the headline: the
clear left-hand area falls to ~420px at 1280 and ~160px at 1024, far less than
the headline needs. No font size fixes that.

So from 768px up the rider gets his own right-hand column
(45% at md, 48% at lg) with a `from-brand` gradient dissolving its left edge
into the orange field, and the text column is width-capped
(`md:max-w-[330px] lg:max-w-[450px] xl:max-w-[600px]`) so it can never reach
him. Verified clear at 768, 1024, 1280, 1440 and 1920.

**If the artwork is ever replaced,** regenerate `hero-rider.jpg` by cropping the
new master from roughly 45% width to the right edge, full height, keeping the
subject centred in that crop — then it survives any column ratio.

### Rules for replacement artwork

- **Base colour exactly #F26522**, fading to flat at the edges so it meets the
  section background seamlessly.
- **Mobile:** the top ~62% must stay quiet — headline, body copy and CTAs sit
  there. Subject bottom-anchored in the lower third.
- **Contrast:** the headline is white + near-black and the primary CTA is a
  black button. Avoid light detail behind them.
- **Export:** JPG or WebP at ~quality 82. Target < 150 KB per file; the
  supplied 1.5 MB PNGs were converted down to ~105 KB with no visible loss.
  These are served as static files, so compress before committing.

Layered guide templates are in `../../Hero Background Guides/`.
