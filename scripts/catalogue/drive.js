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

async function listFolder(folderUrl) {
  const id = (folderUrl.match(/folders\/([A-Za-z0-9_-]+)/) || [])[1];
  const { body } = await get(`https://drive.google.com/drive/folders/${id}`);
  const html = body.toString("utf8");
  const out = new Map();
  const blob = /\\x22([A-Za-z0-9_-]{25,})\\x22,\\x22([^\\]+?)\\x22/g;
  for (const m of html.matchAll(blob)) {
    if (!out.has(m[1]) && /\.(jpe?g|png|webp)$/i.test(m[2])) out.set(m[1], m[2]);
  }
  if (!out.size) {
    const rows = /data-id="([A-Za-z0-9_-]{25,})"[\s\S]{0,3000}?data-tooltip="([^"]+?) (?:Image|JPEG image|PNG image)"/g;
    for (const m of html.matchAll(rows)) if (!out.has(m[1])) out.set(m[1], m[2]);
  }
  return [...out].map(([fid, name]) => ({ id: fid, name }));
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
