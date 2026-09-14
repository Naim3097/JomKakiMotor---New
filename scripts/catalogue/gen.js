// Generates src/data/{motorcycles,accessories,riderGear}.ts from parsed.json
// (yellow rows only) and downloads product images into public/products/.
const fs = require("fs");
const path = require("path");
const { listFolder, download } = require("./drive");

const [, , parsedPath, repo] = process.argv;
const d = require(parsedPath);
const YELLOW = "FFFFFF00";
const PUB = path.join(repo, "public", "products");

/* ---------- text helpers ---------- */
const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
const isYellow = (r) => r.cells.A && r.cells.A.fill === YELLOW && r.cells.A.v;
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const fixTypos = (s) =>
  s.replace(/\bIron Gret\b/g, "Iron Grey").replace(/\bBLue\b/g, "Blue").replace(/\bBlu\b/g, "Blue");

/** "• a • b" or "- a - b" → ["a","b"] */
function bullets(s) {
  s = clean(s);
  if (!s) return [];
  let parts = s.split(/\s*•\s*/).filter(Boolean);
  if (parts.length < 2 && /^-\s/.test(s)) parts = s.split(/(?:^|\s)-\s+/).filter(Boolean);
  return parts.map((p) => p.replace(/[.\s]+$/, "").trim()).filter(Boolean);
}

/** One long paragraph → up to two, split at a sentence boundary. */
function paragraphs(s) {
  s = clean(s);
  if (!s) return [];
  const sentences = s.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [s];
  if (sentences.length < 3) return [s];
  const cut = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, cut).join("").trim(), sentences.slice(cut).join("").trim()];
}

/** "1. Title: body 2. Title: body Flexible Financing Available: body" */
function featureBlocks(s) {
  s = clean(s);
  const out = [];
  const segs = s.split(/(?=(?:^|\s)\d+\.\s+[A-Z])|(?=\sFlexible Financing Available:)/).map((x) => x.trim()).filter(Boolean);
  for (let seg of segs) {
    seg = seg.replace(/^\d+\.\s+/, "");
    const i = seg.indexOf(":");
    if (i < 0) continue;
    out.push({ title: seg.slice(0, i).trim(), body: seg.slice(i + 1).trim() });
  }
  return out;
}

/** Split "Key: value Key2: value" using an ordered list of known labels. */
function specsByKeys(s, keys) {
  s = clean(s).replace(/•/g, " ");
  const hits = [];
  for (const k of keys) {
    const re = new RegExp(`(?:^|\\s)(${k.replace(/[/()]/g, "\\$&")})\\s*:\\s*`, "gi");
    for (const m of s.matchAll(re)) hits.push({ label: k, start: m.index + (m[0].startsWith(" ") ? 1 : 0), valueAt: m.index + m[0].length });
  }
  hits.sort((a, b) => a.start - b.start);
  const out = [];
  for (let i = 0; i < hits.length; i++) {
    const end = i + 1 < hits.length ? hits[i + 1].start : s.length;
    const value = s.slice(hits[i].valueAt, end).replace(/[,\s]+$/, "").trim();
    if (value) out.push({ label: hits[i].label, value });
  }
  return out;
}

/** "• Key: value • Key: value" → pairs; falls back to specsByKeys. */
function specsBullets(s, keys) {
  const parts = bullets(s);
  if (parts.length >= 2 && parts.every((p) => p.includes(":"))) {
    return parts.map((p) => {
      const i = p.indexOf(":");
      return { label: p.slice(0, i).trim(), value: p.slice(i + 1).replace(/[,\s]+$/, "").trim() };
    });
  }
  return specsByKeys(s, keys);
}

const splitList = (s) => clean(s).split(/\s*•\s*|,\s*/).map((x) => x.trim()).filter(Boolean);

/* ---------- images ---------- */
const imageManifest = {};
async function fetchImages(folderUrl, category, slug) {
  if (!folderUrl) return { image: undefined, images: [] };
  const dir = path.join(PUB, category, slug);
  // Reuse an already-downloaded folder unless FRESH=1
  if (fs.existsSync(dir) && fs.readdirSync(dir).length) {
    const cached = fs.readdirSync(dir).map((file) => ({
      file,
      base: file.replace(/\.\w+$/, "").replace(/-/g, " "),
      url: `/products/${category}/${slug}/${file}`,
    }));
    cached.sort((a, b) => /thumbnail/i.test(b.base) - /thumbnail/i.test(a.base));
    imageManifest[slug] = cached.map((s) => s.file);
    console.log(`   ${cached.length} image(s) (cached)`);
    return { image: cached[0]?.url, images: cached.map((s) => s.url), saved: cached };
  }
  fs.mkdirSync(dir, { recursive: true });
  const files = await listFolder(folderUrl);
  const saved = [];
  for (const f of files) {
    const rawName = f.name.replace(/&amp;/g, "&");
    let base = rawName.replace(/\.(jpe?g|png|webp)$/i, "");
    const buf = await download(f.id);
    const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
    const isPng = buf[0] === 0x89 && buf[1] === 0x50;
    const isWebp = buf.slice(8, 12).toString() === "WEBP";
    if (!isJpg && !isPng && !isWebp) {
      console.warn(`   ! skipped ${rawName} (not an image, ${buf.length} bytes)`);
      continue;
    }
    const ext = isJpg ? "jpg" : isPng ? "png" : "webp";
    const fname = `${slugify(base)}.${ext}`;
    fs.writeFileSync(path.join(dir, fname), buf);
    saved.push({ file: fname, base, url: `/products/${category}/${slug}/${fname}` });
  }
  // Thumbnail first, then the rest in Drive order
  saved.sort((a, b) => /thumbnail/i.test(b.base) - /thumbnail/i.test(a.base));
  imageManifest[slug] = saved.map((s) => s.file);
  console.log(`   ${saved.length} image(s)`);
  return { image: saved[0]?.url, images: saved.map((s) => s.url), saved };
}

/** Map each colour option to a gallery image whose name starts with it. */
/** Words that describe a finish, not a hue — ignored when matching. */
const FINISH_WORDS = new Set(["matte", "matt", "gloss", "glossy", "metallic", "pearl", "piano", "ocean", "neon", "racing", "royal", "special", "edition", "sky", "classic", "cosmic", "stellar", "icon", "crystal", "premium", "electric", "deep", "light"]);

const unmatched = [];

/**
 * Map each colour option to a gallery photo. Photo names come from the
 * client and drift from the sheet — prefixes ("r63-black"), spelling
 * ("tricolour"), or a plain hue for a fancy name ("black" for "Piano
 * Black") — so matching is progressively looser, and a lone leftover
 * colour pairs with a lone leftover photo group. Anything still unmatched
 * is reported at the end for the client to reconcile.
 */
function colourImages(colours, saved, productName) {
  const out = {};
  const norm = (x) =>
    x.toLowerCase().replace(/\s*\([^)]*\)$/, "").replace(/colour/g, "color").replace(/grey/g, "gray")
      .replace(/[^a-z0-9]+/g, " ").replace(/\s*\d+$/, "").trim();
  const gallery = saved.filter((s) => !/thumbnail/i.test(s.base));
  // photo groups: "matador red 1/2" → "matador red"
  const groups = new Map();
  for (const s of gallery) { const g = norm(s.base); if (!groups.has(g)) groups.set(g, s); }
  const taken = new Set();
  const claim = (c, g) => { out[c] = groups.get(g).url; taken.add(g); };
  const remaining = [];
  for (const c of colours) {
    const want = norm(c);
    const hues = want.split(" ").filter((w) => w && !FINISH_WORDS.has(w));
    const free = [...groups.keys()].filter((g) => !taken.has(g));
    const g =
      free.find((g) => g === want) ||
      free.find((g) => g.startsWith(want) || g.endsWith(want)) ||
      free.find((g) => g.split(" ").includes(want)) ||
      free.find((g) => hues.length && hues.every((h) => g.split(" ").includes(h))) ||
      free.find((g) => hues.length && g.split(" ").includes(hues[hues.length - 1]));
    if (g) claim(c, g); else remaining.push(c);
  }
  // One colour left and one photo group left → they belong together
  const freeGroups = [...groups.keys()].filter((g) => !taken.has(g));
  if (remaining.length === 1 && freeGroups.length === 1) claim(remaining[0], freeGroups[0]);
  else if (remaining.length && gallery.length) unmatched.push(`${productName}: sheet says "${remaining.join(", ")}" but photos are named "${freeGroups.join(", ") || "(numbered only)"}"`);
  return Object.keys(out).length ? out : undefined;
}

/* ---------- motorcycles ---------- */
const BRAND_PREFIX = [
  ["QJ Motor", "QJMOTOR"], ["WMoto", "WMOTO"], ["CFMoto", "CFMOTO"], ["Keeway", "Keeway"],
  ["SYM", "SYM"], ["Yamaha", "Yamaha"], ["Honda", "Honda"], ["Modenas", "Modenas"],
  ["Aveta", "Aveta"], ["Moda", "Moda"],
];
const AVETA_PARTNERS = ["JCL", "Chailease Berjaya"];
const BIKE_SPEC_KEYS = ["Engine", "Displacement", "Max Power", "Max Torque", "Transmission", "Fuel Capacity", "Brakes", "Weight", "Starting System"];

async function motorcycles() {
  const rows = d["✅ Motorcycle (ENG) "].filter((r) => r.n > 1 && isYellow(r));
  const out = [];
  for (const r of rows) {
    const c = (k) => clean(r.cells[k]?.v);
    const name = c("A");
    const [prefix, brand] = BRAND_PREFIX.find(([p]) => name.startsWith(p)) || ["", name.split(" ")[0]];
    const model = name.slice(prefix.length).trim();
    const slug = slugify(name);
    const year = parseInt(c("C"), 10);
    const deposit = /no deposit/i.test(c("F")) ? 0 : Math.round(parseFloat(c("F")));
    const highlights = bullets(c("H"));
    const specs = specsByKeys(c("L"), BIKE_SPEC_KEYS);
    const disp = specs.find((x) => x.label === "Displacement")?.value || "";
    const cc = parseFloat((c("H").match(/([\d.]+)\s*cc/i) || disp.match(/([\d.]+)/) || [])[1] || "0");
    console.log(`- ${name}`);
    const { image, images, saved } = await fetchImages(c("B"), "motorcycles", slug);
    const colours = splitList(fixTypos(c("I")));
    out.push({
      slug, brand, model, type: c("D"), cc, price: Math.round(parseFloat(c("E"))), deposit,
      monthly: Math.round(parseFloat(c("G"))), year,
      colours,
      availability: "In Stock",
      arrival: `${year}-01-01`,
      image, images, colourImages: colourImages(colours, saved || [], name),
      highlights,
      description: paragraphs(c("J")),
      featureBlocks: featureBlocks(c("K")),
      specs,
      ...(brand === "Aveta" ? { financingPartners: AVETA_PARTNERS } : {}),
    });
  }
  return out;
}

/* ---------- accessories ---------- */
const MODEL_ALIAS = { Y125Z: "Yamaha Y125Z", Y15ZR: "Yamaha Y15ZR", NVX: "Yamaha NVX", LC135: "Yamaha LC135" };
const normModel = (m) => MODEL_ALIAS[m.replace(/^Yamaha\s+/i, "").trim()] || m.trim();

async function accessories() {
  const rows = d["✅ Accessories (ENG)"].filter((r) => r.n > 1 && isYellow(r));
  const out = [];
  for (const r of rows) {
    const c = (k) => clean(r.cells[k]?.v);
    const name = c("A");
    const brand = /^PPR/i.test(name) ? "PPR" : /^ENKEI/i.test(name) ? "ENKEI" : /^AEROX THAI/i.test(name) ? "AEROX THAI" : name.split(" ")[0];
    const accessoryType = /fork lay/i.test(name) ? "Fork Lay" : "Sport Rims";
    const slug = slugify(name);
    // "• Black (Y125Z, Y15ZR, NVX) • White (Y15ZR, NVX)" → fitment per colour
    const fitment = bullets(c("E")).map((e) => {
      const m = e.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
      return { colour: (m ? m[1] : e).trim(), models: m ? m[2].split(/,\s*/).map(normModel) : [] };
    });
    const specs = specsBullets(c("G"), ["Material", "Compatibility", "Inclusions", "Lowering Spec", "Installation", "Available Colours"]);
    // Fork lays list fitment in the Compatibility spec rather than per colour
    const compat = specs.find((s) => /compatib/i.test(s.label))?.value || "";
    for (const f of fitment) if (!f.models.length) f.models = [...compat.matchAll(/Yamaha\s+([A-Z0-9]+)/gi)].map((m) => normModel(m[1]));
    const compatibleModels = [...new Set(fitment.flatMap((f) => f.models))];
    console.log(`- ${name}`);
    const { image, images, saved } = await fetchImages(c("B"), "accessories", slug);
    const colours = fitment.map((f) => f.colour);
    out.push({
      slug, accessoryType, name, brand, price: Math.round(parseFloat(c("C"))),
      availability: "In Stock", arrival: "2026-09-01", shareVariant: "full",
      colours, compatibleModels, fitment,
      image, images, colourImages: colourImages(colours, saved || [], name),
      highlights: bullets(c("D")),
      description: paragraphs(c("F")),
      specs,
    });
  }
  return out;
}

/* ---------- rider gear ---------- */
const GEAR_SHEETS = [
  { sheet: "✅ Helmets (ENG)", gearType: "Helmet", price: "C", short: "D", sizes: "E", colours: "F", long: "G", spec: "H", img: "B",
    keys: ["Helmet Type", "Safety Certification", "Visor Included", "Inner Lining", "Available Sizes"] },
  { sheet: "✅ Raincoat (ENG)", gearType: "Raincoat", price: "C", short: "D", colours: "E", sizes: "F", long: "G", spec: "H", img: "B",
    keys: ["Material", "Seam Construction", "Visibility", "Available Sizes"] },
  { sheet: "✅ Spoiler (ENG)", gearType: "Helmet Spoiler", price: "C", short: "D", colours: "E", long: "F", spec: "G", img: "B",
    keys: ["Compatibility", "Material Build", "Mounting Type", "Color Options"] },
  { sheet: "✅ Visor (ENG)", gearType: "Helmet Visor", price: "B", short: "C", colours: "D", long: "E", spec: "F",
    keys: ["Compatibility", "Tint / Color", "Material", "UV Protection", "Installation"] },
];
const GEAR_BRANDS = ["KYT", "ARC", "Yamaha", "SGV", "BOGO"];

async function riderGear() {
  const out = [];
  for (const g of GEAR_SHEETS) {
    for (const r of d[g.sheet].filter((r) => r.n > 1 && isYellow(r))) {
      const c = (k) => (k ? clean(r.cells[k]?.v) : "");
      const name = c("A");
      const brand = GEAR_BRANDS.find((b) => name.toUpperCase().startsWith(b.toUpperCase())) || name.split(" ")[0];
      const slug = slugify(name);
      const colours = splitList(fixTypos(c(g.colours))).map((x) => x.replace(/\s*\([^)]*\)$/, ""));
      const sizes = g.sizes ? splitList(c(g.sizes)) : [];
      console.log(`- ${name}`);
      const { image, images, saved } = await fetchImages(c(g.img), "rider-gear", slug);
      out.push({
        slug, gearType: g.gearType, name, brand, price: Math.round(parseFloat(c(g.price))),
        availability: "In Stock", arrival: "2026-09-01", shareVariant: "full",
        ...(sizes.length ? { sizes } : {}),
        ...(colours.length ? { colours } : {}),
        image, images, colourImages: colourImages(colours, saved || [], name),
        highlights: bullets(c(g.short)),
        description: paragraphs(c(g.long)),
        specs: specsBullets(c(g.spec), g.keys),
      });
    }
  }
  return out;
}

/* ---------- emit ---------- */
function emit(file, typeName, importLine, header, items) {
  const body = JSON.stringify(items, null, 2)
    .replace(/^(\s+)"([A-Za-z_$][\w$]*)":/gm, "$1$2:")
    .replace(/\n\s*"colourImages": undefined,?/g, "")
    .replace(/,\n(\s*)\}/g, "\n$1}");
  const src = `${importLine}\n\n${header}\nexport const ${typeName} = ${body};\n`;
  fs.writeFileSync(path.join(repo, "src", "data", file), src);
  console.log(`wrote ${file} (${items.length})`);
}

(async () => {
  if (process.env.FRESH) fs.rmSync(PUB, { recursive: true, force: true });
  console.log("\n## Motorcycles");
  const bikes = await motorcycles();
  console.log("\n## Accessories");
  const acc = await accessories();
  console.log("\n## Rider gear");
  const gear = await riderGear();

  const gen = `/**\n * GENERATED from "JomKaki Rider Product Compilation.xlsx" (yellow rows only)\n * on ${new Date().toISOString().slice(0, 10)}. Edit the sheet and re-run the generator rather than\n * hand-editing prices or copy here.\n */`;
  emit("motorcycles.ts", "MOTORCYCLES: Motorcycle[]", 'import type { Motorcycle } from "./types";', gen, bikes);
  emit("accessories.ts", "ACCESSORIES: AccessoryItem[]", 'import type { AccessoryItem } from "./types";', gen, acc);
  emit("riderGear.ts", "RIDER_GEAR: GearItem[]", 'import type { GearItem } from "./types";', gen, gear);
  fs.writeFileSync(path.join(PUB, "manifest.json"), JSON.stringify(imageManifest, null, 2));
  console.log(`\nTotal: ${bikes.length} bikes, ${acc.length} accessories, ${gear.length} gear`);
  if (unmatched.length) {
    console.log(`\nColour names that do not match the photo names (ask the client):\n  - ${unmatched.join("\n  - ")}`);
  }
})().catch((e) => { console.error(e); process.exit(1); });
