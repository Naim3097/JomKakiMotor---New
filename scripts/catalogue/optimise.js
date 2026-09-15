// Shrinks product photos in place: long edge capped at MAX_EDGE, JPEG
// re-encoded with mozjpeg. next/image serves resized WebP/AVIF from these,
// so the source only needs to cover the largest rendered size (detail hero
// ~700 CSS px × 2 DPR). Used by gen.js after download and runnable alone:
//   node scripts/catalogue/optimise.js public/products
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MAX_EDGE = 1600;
const QUALITY = 82;

async function optimiseFile(file) {
  // Read via fs rather than letting libvips open the path — OneDrive-backed
  // folders on Windows refuse libvips' direct open.
  const src = fs.readFileSync(file);
  const before = src.length;
  const img = sharp(src, { failOn: "none" });
  const meta = await img.metadata();
  const isJpeg = meta.format === "jpeg";
  const tooBig = Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE;
  let pipeline = img.rotate(); // bake EXIF orientation
  if (tooBig) pipeline = pipeline.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  const buf = isJpeg
    ? await pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true }).toBuffer()
    : await pipeline.png({ compressionLevel: 9, palette: false }).toBuffer();
  // Only keep the result when it is actually smaller (or was resized)
  if (buf.length < before || tooBig) fs.writeFileSync(file, buf);
  return { before, after: fs.statSync(file).size, resized: tooBig };
}

async function optimiseDir(dir) {
  const files = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(p);
    }
  })(dir);
  let before = 0, after = 0, resized = 0;
  for (const f of files) {
    const r = await optimiseFile(f);
    before += r.before; after += r.after; if (r.resized) resized++;
  }
  return { files: files.length, before, after, resized };
}

module.exports = { optimiseFile, optimiseDir, MAX_EDGE };

if (require.main === module) {
  (async () => {
    for (const dir of process.argv.slice(2)) {
      const r = await optimiseDir(dir);
      const mb = (n) => (n / 1048576).toFixed(1);
      console.log(`${dir}: ${r.files} files, ${mb(r.before)} MB → ${mb(r.after)} MB (${r.resized} resized)`);
    }
  })().catch((e) => { console.error(e); process.exit(1); });
}
