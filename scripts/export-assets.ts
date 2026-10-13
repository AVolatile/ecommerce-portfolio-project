import fs from "node:fs/promises";
import { chromium } from "@playwright/test";
import { campaigns, emails, getProduct } from "../lib/catalog";
const root = "public/campaign-assets";
await fs.mkdir(root, { recursive: true });
await fs.mkdir("public/brand-assets", { recursive: true });
await fs.mkdir("public/emails", { recursive: true });
const esc = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const displayFont = await fs.readFile(
  "node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2",
);
const uiFont = await fs.readFile(
  "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
async function imageData(slug: string) {
  return `data:image/webp;base64,${(await fs.readFile(`public/images/${slug}.webp`)).toString("base64")}`;
}
async function render(
  file: string,
  width: number,
  height: number,
  index: number,
  display = false,
) {
  const c = campaigns[index];
  const dark = c.tone === "dark";
  const bg = dark ? "#242724" : c.tone === "orange" ? "#ed552d" : "#e5e5dd";
  const ink = dark ? "#f6f5f0" : "#242724";
  const pad = Math.max(16, Math.round(Math.min(width, height) * 0.055));
  const horizontal = display && width / height > 2;
  const fontSize = horizontal
    ? height * 0.44
    : width < 200
      ? width * 0.29
      : width * 0.13;
  const data = await imageData(
    index === 0 ? "lifestyle" : index === 6 ? "hero" : c.product,
  );
  await page.setViewportSize({ width, height });
  await page.setContent(
    `<html><head><style>@font-face{font-family:Display;src:url(data:font/woff2;base64,${displayFont.toString("base64")})}@font-face{font-family:UI;src:url(data:font/woff2;base64,${uiFont.toString("base64")})}*{box-sizing:border-box}body{margin:0;background:${bg};color:${ink};width:${width}px;height:${height}px;overflow:hidden;padding:${pad}px;font-family:UI;position:relative}.label{font-size:${Math.max(9, width * 0.015)}px;letter-spacing:.15em;position:relative;z-index:2}h1{font-family:Display;font-weight:600;font-size:${fontSize}px;line-height:.94;letter-spacing:-.018em;max-width:${horizontal ? "75" : "90"}%;position:relative;z-index:2;margin:${horizontal ? 8 : width * 0.06}px 0}img{position:absolute;right:${horizontal ? -20 : -width * 0.07}px;bottom:${horizontal ? -height * 0.25 : -height * 0.07}px;width:${horizontal ? height * 1.5 : width * 0.97}px;height:${horizontal ? height * 1.5 : height * 0.72}px;object-fit:contain;${dark ? "opacity:.9;mask-image:linear-gradient(transparent,#000 28%);mix-blend-mode:luminosity;" : "mix-blend-mode:multiply;"}transform:rotate(-8deg)}.footer{position:absolute;bottom:${pad}px;left:${pad}px;right:${pad}px;display:flex;justify-content:space-between;align-items:center;font-size:${Math.max(8, width * 0.011)}px;letter-spacing:.14em;z-index:2}.mode0 img{width:100%;height:100%;inset:0;transform:none;object-fit:cover;mix-blend-mode:normal;mask-image:none;opacity:1}.mode0:after{content:'';position:absolute;inset:0;background:linear-gradient(#0008,#0002)}.mode0{color:#f6f5f0}.mode5 img{height:100%;width:55%;right:0;bottom:0;object-fit:cover;object-position:80% center;transform:none;mix-blend-mode:normal;mask-image:none}.mode5 h1{max-width:55%}.mode6 img{width:100%;height:65%;right:0;bottom:0;transform:none;object-fit:cover;object-position:80% center;mix-blend-mode:normal;mask-image:none}.mode6 h1{max-width:100%;font-size:${fontSize * 0.85}px}.member{position:absolute;left:10%;right:10%;bottom:15%;height:36%;border:2px solid #697160;background:#383e33;transform:rotate(-7deg);padding:5%;box-shadow:12px 20px 20px #0004}.member span{font-size:${width * 0.025}px;letter-spacing:.1em}.member b{position:absolute;right:7%;top:5%;font-size:${width * 0.13}px;color:#ed552d}.member strong{position:absolute;left:7%;bottom:10%;font-size:${width * 0.052}px;line-height:1.1;font-weight:400}.number{font-family:Display;font-size:${width * 0.42}px;line-height:1;color:#f6f5f027;position:absolute;left:5%;bottom:10%;z-index:1}.mode7 img{width:68%;right:-8%}.mark{font-size:${Math.max(15, width * 0.03)}px}</style></head><body class="mode${index}"><div class="label">VELT / ${esc(c.label.toUpperCase())}</div><h1>${esc(c.title)}</h1>${index === 4 ? '<div class="member"><span>VELT / IN USE</span><b>↗</b><strong>Keep it close.<br>Keep it going.</strong></div>' : `<img src="${data}"/>`}${index === 7 ? '<div class="number">03</div>' : ""}<div class="footer"><span>FEWER THINGS. FULLER DAYS.</span><span class="mark">↗</span></div></body></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  if (index !== 4)
    await page.locator("img").evaluate((img: HTMLImageElement) => img.decode());
  await page.screenshot({ path: `${root}/${file}.png` });
}
for (let i = 0; i < campaigns.length; i++)
  await render(`concept-${i + 1}-1080x1080`, 1080, 1080, i);
await render("social-square", 1080, 1080, 0);
await render("social-portrait", 1080, 1350, 2);
await render("social-story", 1080, 1920, 4);
await render("display-300x250", 300, 250, 0, true);
await render("display-728x90", 728, 90, 0, true);
await render("display-160x600", 160, 600, 1, true);
await render("display-970x250", 970, 250, 5, true);
for (const [n, i] of [0, 1, 2, 5].entries())
  await render(`poster-${n + 1}`, 1200, 1800, i);
await browser.close();
for (const e of emails) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(e.subject)} / VELT email concept</title><style>body{margin:0;background:#eeede7;font-family:Arial,sans-serif;color:#242724}table{border-collapse:collapse}td{padding:0}a{color:inherit}img{display:block;width:100%;max-width:100%;height:auto}.email{table-layout:fixed;width:100%;max-width:600px;background:#f6f5f0}.pad{padding:40px}.headline{font-size:44px;line-height:1.05;letter-spacing:-1.8px;margin:25px 0}.body{font-size:15px;line-height:1.8}.cta{display:inline-block;background:#242724;color:#f6f5f0;padding:17px 25px;text-decoration:none;font-size:13px}.fine{font-size:11px;line-height:1.7;color:#6c6e66}.logo{font-size:36px;font-weight:700;letter-spacing:-3px}.tag{font-size:10px;letter-spacing:2px;text-transform:uppercase}@media(max-width:600px){.pad{padding:28px 22px}.headline{font-size:36px}}</style></head><body><div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(e.preheader)}</div><table role="presentation" width="100%"><tr><td align="center"><table class="email" role="presentation"><tr><td class="pad"><div class="logo">VELT ↗</div><p class="tag">Objects for the overlap / ${esc(e.slug.replaceAll("-", " "))}</p><h1 class="headline">${esc(e.title)}</h1><img src="../images/${e.product}.webp" width="520" alt="${esc(getProduct(e.product)!.name)}"/><p class="body">${esc(e.body)}</p><a class="cta" href="${e.href}">${esc(e.cta)} ↗</a></td></tr><tr><td class="pad" style="border-top:1px solid #d9d9d0"><p class="fine">VELT / Fewer things. Fuller days.<br>Self-initiated portfolio concept by Anthony Volatile. This email is a preview and was not sent.</p><p class="fine">Production handoff: replace relative assets with verified absolute URLs, connect real transactional fields where needed, and add the mailing provider’s unsubscribe and consent controls for marketing sends.</p><a class="fine" href="/campaign">Back to campaign system</a></td></tr></table></td></tr></table></body></html>`;
  await fs.writeFile(`public/emails/${e.slug}.html`, html);
}
const identity = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#ed552d"/><text x="65" y="435" fill="#242724" font-family="Arial,sans-serif" font-weight="700" font-size="350" letter-spacing="-26">VELT</text><g transform="translate(905 225) scale(3.5)" fill="#242724"><path d="M8 13h13l12 26 9-26h14L35 54H24z"/></g><path d="M65 620h1070" stroke="#242724"/><text x="65" y="670" font-family="Arial,sans-serif" fill="#242724" font-size="18" letter-spacing="3">OBJECTS FOR THE OVERLAP. / FEWER THINGS. FULLER DAYS.</text></svg>`;
await fs.writeFile("public/brand-assets/velt-identity.svg", identity);
await fs.copyFile("public/favicon.svg", "public/brand-assets/velt-symbol.svg");
await fs.writeFile(
  "public/brand-assets/packaging.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000"><rect width="1600" height="1000" fill="#d9d9cf"/><g font-family="Arial,sans-serif" fill="#242724"><rect x="75" y="100" width="780" height="440" fill="#a39b83" stroke="#86806d" stroke-width="8"/><text x="130" y="330" font-weight="700" font-size="190" letter-spacing="-14">VELT</text><text x="130" y="475" font-size="18" letter-spacing="3">OBJECTS FOR THE OVERLAP.</text><rect x="980" y="100" width="300" height="440" fill="#f6f5f0"/><circle cx="1130" cy="130" r="8" fill="#d9d9cf"/><text x="1015" y="230" font-size="56" font-weight="700" letter-spacing="-4">VELT</text><text x="1015" y="330" font-size="22">P—02 / 24L</text><text x="1015" y="390" font-size="42">Transit Pack.</text><text x="1015" y="495" font-size="14">KEEP IT IN GOOD USE.</text><rect x="75" y="650" width="430" height="235" fill="#242724"/><text x="105" y="700" font-size="19" fill="#f6f5f0">VELT / IN USE</text><text x="105" y="765" font-size="37" fill="#f6f5f0">Keep it going.</text><text x="105" y="850" font-size="13" fill="#f6f5f0">MEMBER / 0001 · CONCEPT</text><rect x="590" y="650" width="410" height="235" fill="#f6f5f0"/><text x="620" y="705" font-size="20">CARE / REPAIR / REPEAT</text><text x="620" y="765" font-size="30">A small fix.</text><text x="620" y="810" font-size="30">A longer story.</text><rect x="1110" y="660" width="340" height="85" fill="#242724"/><text x="1140" y="722" font-size="58" fill="#f6f5f0" font-weight="700" letter-spacing="-4">VELT</text><text x="1110" y="795" font-size="16">WOVEN LABEL / GRAPHITE</text><rect x="1110" y="835" width="340" height="50" fill="#ed552d"/><text x="1130" y="868" font-size="17">A—01 / PACKING SET / SLEEVE</text></g></svg>`,
);
await fs.writeFile(
  "public/brand-assets/palette.json",
  JSON.stringify(
    {
      graphite: "#242724",
      chalk: "#f6f5f0",
      mineral: "#b3b0a4",
      signal: "#ed552d",
      rust: "#b33416",
      petrol: "#344b4d",
    },
    null,
    2,
  ),
);
await fs.writeFile(
  "portfolio-assets/ASSET-MANIFEST.md",
  `# VELT asset manifest\n\n19 PNG campaign exports: eight concepts, three social formats, four display formats, four posters.\nEight responsive HTML emails in public/emails.\nIdentity, symbol, packaging SVGs and palette JSON in public/brand-assets.\nOriginal AI-generated images in portfolio-assets/image-source; optimized WebP assets in public/images.\n\nGenerate with node --import tsx scripts/export-assets.ts. This does not send, place, or publish any campaign.\n`,
);
console.log(
  "Exported 19 campaign PNGs, eight responsive emails, and four brand assets.",
);
