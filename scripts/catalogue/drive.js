// List a public Drive folder and download files. Folder pages embed an
// "ivd" JSON blob with \x22-escaped strings: \x22<fileId>\x22,\x22<name>\x22
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
        r.on("end", () => res({ status: r.statusCode, headers: r.headers, body: Buffer.concat(chunks) }));
      })
      .on("error", rej);
  });
}

/**
 * Files in a public folder, recursing into sub-folders (bikes keep their
 * colour shots in a "Gallery" sub-folder beside the thumbnail). Each entry
 * is {id, name, folder} where folder is the sub-folder path, "" at the top.
 */
async function listFolder(folderUrl, depth = 0, prefix = "") {
  const id = (folderUrl.match(/folders\/([A-Za-z0-9_-]+)/) || [, folderUrl])[1];
  const { body } = await get(`https://drive.google.com/drive/folders/${id}`);
  const html = body.toString("utf8");
  const files = new Map();
  const folders = new Map();

  // Every grid row carries data-id and, a little later, a tooltip of the
  // form "<name> Image" / "<name> Shared folder" / "<name> Folder".
  const rowRe = /data-id="([A-Za-z0-9_-]{25,})"/g;
  for (const m of html.matchAll(rowRe)) {
    const rid = m[1];
    if (files.has(rid) || folders.has(rid)) continue;
    const win = html.slice(m.index, m.index + 6000);
    const tip = (win.match(/data-tooltip="([^"]+)"/) || [])[1];
    if (!tip) continue;
    const f = tip.match(/^(.+?) (?:Shared )?[Ff]older$/);
    const i = tip.match(/^(.+?) (?:Image|JPEG image|PNG image|WebP image)$/);
    if (f) folders.set(rid, f[1].replace(/&amp;/g, "&"));
    else if (i) files.set(rid, i[1].replace(/&amp;/g, "&"));
  }
  // Older page variant: an ivd blob with \x22-escaped [id, name] pairs
  if (!files.size && !folders.size) {
    const blob = /\\x22([A-Za-z0-9_-]{25,})\\x22,\\x22([^\\]+?)\\x22/g;
    for (const m of html.matchAll(blob)) {
      if (!files.has(m[1]) && /\.(jpe?g|png|webp)$/i.test(m[2])) files.set(m[1], m[2]);
    }
  }

  const out = [...files].map(([fid, name]) => ({ id: fid, name, folder: prefix }));
  if (depth < 3) {
    for (const [fid, name] of folders) {
      const sub = await listFolder(fid, depth + 1, prefix ? `${prefix}/${name}` : name);
      out.push(...sub);
    }
  }
  return out;
}

async function download(fileId) {
  let r = await get(`https://drive.google.com/uc?export=download&id=${fileId}`);
  const ct = r.headers["content-type"] || "";
  if (ct.includes("text/html")) {
    // large-file virus-scan interstitial
    const html = r.body.toString("utf8");
    const confirm = (html.match(/confirm=([0-9A-Za-z_-]+)/) || [])[1];
    const uuid = (html.match(/name="uuid" value="([^"]+)"/) || [])[1];
    r = await get(
      `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${confirm || "t"}${uuid ? "&uuid=" + uuid : ""}`
    );
  }
  return r.body;
}

module.exports = { listFolder, download };

if (require.main === module) {
  (async () => {
    for (const u of process.argv.slice(2)) {
      console.log("\n" + u);
      const files = await listFolder(u);
      console.log(files.map((f) => `  ${f.name}  [${f.id}]`).join("\n") || "  (nothing found)");
    }
  })();
}
