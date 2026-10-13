import sharp from "sharp";
const width = 1280,
  height = 960;
const backdrop = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="1280" height="960" fill="#e9e9e1"/><rect x="40" y="40" width="440" height="220" fill="#ed552d"/><text x="65" y="182" fill="#242724" font-family="Arial,sans-serif" font-size="138" font-weight="700" letter-spacing="-10">VELT</text><text x="68" y="225" font-family="Arial,sans-serif" font-size="12" letter-spacing="2">OBJECTS FOR THE OVERLAP. ↗</text><text x="45" y="905" fill="#242724" font-family="Arial,sans-serif" font-size="22">A consumer brand, from first impression to continued use.</text><text x="45" y="935" fill="#606359" font-family="Arial,sans-serif" font-size="12">ANTHONY VOLATILE / BRAND · COMMERCE · MEMBERSHIP · CAMPAIGN</text></svg>`,
);
const photo = await sharp("public/images/hero.webp")
  .resize(716, 460, { fit: "cover", position: "right" })
  .toBuffer();
const storefront = await sharp("portfolio-assets/screenshots/home-1440.png")
  .extract({ left: 0, top: 0, width: 1440, height: 1020 })
  .resize(760, 538, { fit: "cover" })
  .toBuffer();
const campaign = await sharp("public/campaign-assets/concept-3-1080x1080.png")
  .resize(350, 350)
  .toBuffer();
await sharp(backdrop)
  .composite([
    { input: photo, left: 524, top: 40 },
    { input: storefront, left: 40, top: 310 },
    { input: campaign, left: 860, top: 528 },
  ])
  .png()
  .toFile("portfolio-assets/cover-1280x960.png");
console.log("Created portfolio-assets/cover-1280x960.png");
