// Dump every entry (files AND sub-folders) of a public Drive folder.
// Usage: node scripts/catalogue/inspect.js <folderUrl> [...more]
const https = require("https");

function get(url, redirects = 5) {
  return new Promise((res, rej) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (r) => {
        if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location && redirects > 0) {
          r.resume();
          return res(get(new URL(r.headers.location, url).href, redirects - 1));
        }
        const chunks = [];
        r.on("data", (c) => chunks.push(c));
        r.on("end", () => res(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", rej);
  });
}

const FOLDER_MIME = "application/vnd.google-apps.folder";

/** Entries as {id, name, isFolder} — folders carry the folder mimetype nearby. */
async function entries(folderId) {
  const html = await get(`https://drive.google.com/drive/folders/${folderId}`);
  const out = new Map();
  const re = /\\x22([A-Za-z0-9_-]{25,})\\x22,\\x22([^\\]+?)\\x22([\s\S]{0,400})/g;
  for (const m of html.matchAll(re)) {
    if (out.has(m[1])) continue;
    const name = m[2].replace(/&amp;/g, "&");
    if (/^https?:|^[0-9]+$/.test(name)) continue;
    const isFolder = m[3].replace(/\\x2f/g, "/").includes(FOLDER_MIME);
    out.set(m[1], { id: m[1], name, isFolder });
  }
  return [...out.values()];
}

async function walk(folderId, depth = 0, path = "") {
  const list = await entries(folderId);
  for (const e of list) {
    console.log(`${"  ".repeat(depth)}${e.isFolder ? "📁" : "  "} ${e.name}  [${e.id}]`);
    if (e.isFolder && depth < 3) await walk(e.id, depth + 1, path + "/" + e.name);
  }
}

module.exports = { entries, walk };

if (require.main === module) {
  (async () => {
    for (const u of process.argv.slice(2)) {
      const id = (u.match(/folders\/([A-Za-z0-9_-]+)/) || [, u])[1];
      console.log(`\n${u}`);
      await walk(id);
    }
  })();
}
