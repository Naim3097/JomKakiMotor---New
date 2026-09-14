# Catalogue import

Regenerates `src/data/{motorcycles,accessories,riderGear}.ts` and downloads
product photos into `public/products/` from the client's master sheet
"JomKaki Rider Product Compilation.xlsx". Only yellow-highlighted rows
(fill `FFFFFF00`) are imported — that is the client's "ready" flag and it
matches the rows that carry a Google Drive image folder.

No Python needed; Node only.

```bash
# 1. unzip the workbook (it is a zip of XML)
cp "JomKaki Rider Product Compilation.xlsx" /tmp/sheet.zip
powershell -Command "Expand-Archive /tmp/sheet.zip /tmp/sheet -Force"

# 2. parse every sheet (cell values + fill colours) to parsed.json
node scripts/catalogue/parse.js /tmp/sheet        # writes /tmp/parsed.json

# 3. generate data files + fetch images (FRESH=1 re-downloads everything)
node scripts/catalogue/gen.js /tmp/parsed.json "$(pwd)"
```

What the generator encodes from the sheet:

- **Motorcycles** — brand/model split, type, cc (from the first highlight or the
  Displacement spec), price, deposit (`No Deposit Required` → 0), monthly,
  year, colours, highlights, description (split into two paragraphs),
  numbered feature blocks, and the spec table. Aveta rows say "JCL &
  Chailease Berjaya Credit only" in their Highlights, so they get
  `financingPartners: ["JCL", "Chailease Berjaya"]`.
- **Accessories** — colour → bike-model `fitment` parsed from the colour cell
  (`• Orange (Y125Z) • Black (Y125Z, Y15ZR, NVX)`); `compatibleModels` is the
  union; `colourImages` maps each colour to its gallery photo.
- **Rider gear** — helmets, raincoats, spoilers and visors with sizes,
  colours and specs. Visors have no image column yet.

Drive folders are read by scraping the public folder page and downloading
each file via `uc?export=download`. The `Thumbnail` file becomes the card
image; the rest form the gallery.
