const fs = require('fs'), path = require('path');
const dir = process.argv[2];
const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const unesc = s => s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&');
// shared strings
const ss = [];
const ssx = fs.existsSync(path.join(dir,'xl/sharedStrings.xml')) ? rd('xl/sharedStrings.xml') : '';
for (const m of ssx.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
  ss.push(unesc([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(t=>t[1]).join('')));
}
// styles: cellXfs -> fillId -> fill colour
const st = rd('xl/styles.xml');
const fills = [...(st.match(/<fills[^>]*>([\s\S]*?)<\/fills>/)||['',''])[1].matchAll(/<fill>([\s\S]*?)<\/fill>/g)].map(f=>{
  const fg = f[1].match(/<fgColor[^>]*rgb="([0-9A-Fa-f]+)"/); const th = f[1].match(/<fgColor[^>]*theme="(\d+)"[^>]*(tint="([-\d.]+)")?/);
  const pat = f[1].match(/patternType="(\w+)"/);
  return { pat: pat?pat[1]:'', rgb: fg?fg[1]:null, theme: th?th[1]:null, tint: th&&th[3]?th[3]:null };
});
const xfs = [...(st.match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/)||['',''])[1].matchAll(/<xf [^>]*?fillId="(\d+)"/g)].map(m=>+m[1]);
// workbook sheet names + rels
const wb = rd('xl/workbook.xml');
const rels = rd('xl/_rels/workbook.xml.rels');
const relMap = {}; for (const m of rels.matchAll(/<Relationship [^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap[m[1]] = m[2];
for (const m of rels.matchAll(/<Relationship [^>]*Target="([^"]+)"[^>]*Id="([^"]+)"/g)) relMap[m[2]] = m[1];
const sheets = [...wb.matchAll(/<sheet [^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)].map(m=>({name:unesc(m[1]), file: relMap[m[2]].replace(/^\/?xl\//,'').replace(/^\//,'')}));
const colIdx = c => { let n=0; for (const ch of c) n = n*26 + (ch.charCodeAt(0)-64); return n; };
const out = {};
for (const sh of sheets) {
  const x = rd(path.join('xl', sh.file.replace(/^xl\//,'')));
  const rows = [];
  for (const r of x.matchAll(/<row [^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = {};
    for (const c of r[2].matchAll(/<c r="([A-Z]+)(\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = c[3]||'', inner = c[4]||'';
      const t = (attrs.match(/t="(\w+)"/)||[])[1]; const s = +((attrs.match(/s="(\d+)"/)||[])[1]||0);
      let v = (inner.match(/<v>([\s\S]*?)<\/v>/)||[])[1];
      if (t==='s') v = ss[+v]; else if (t==='inlineStr') v = unesc([...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(a=>a[1]).join('')); else if (v!==undefined) v = unesc(v);
      const fill = fills[xfs[s]]||{};
      cells[c[1]] = { v: v===undefined?'':String(v).replace(/\s+/g,' ').trim(), fill: fill.pat==='solid' ? (fill.rgb||('theme'+fill.theme+(fill.tint?'/'+fill.tint:''))) : null };
    }
    if (Object.keys(cells).length) rows.push({ n:+r[1], cells });
  }
  out[sh.name] = rows;
}
fs.writeFileSync(path.join(dir,'..','parsed.json'), JSON.stringify(out));
// summary
for (const [name, rows] of Object.entries(out)) {
  const fillsUsed = {}; rows.forEach(r=>Object.values(r.cells).forEach(c=>{ if(c.fill) fillsUsed[c.fill]=(fillsUsed[c.fill]||0)+1; }));
  console.log(`\n== ${name} == rows:${rows.length} fills:${JSON.stringify(fillsUsed)}`);
}
