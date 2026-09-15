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
each file via `uc?export=download`, **recursing into sub-folders** — bikes
keep their colour shots in a `Gallery` sub-folder beside the thumbnail.
The two layers never mix: with a sub-folder present, the top-level file is
the listing-card image (whatever it is named) and the sub-folder is the
product-page gallery; in a flat folder the file named `Thumbnail` is the
card image and the rest are the gallery. `public/products/manifest.json`
records each file's layer. On the product page,
`colourImages` maps each colour option to its photo so picking a colour on
the product page shows it. The generator prints any colour whose name
could not be matched to a photo name — take those back to the client.

`node scripts/catalogue/inspect.js <folderUrl>` walks a folder tree for a
quick look at what the client uploaded.
