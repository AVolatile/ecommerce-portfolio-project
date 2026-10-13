import sharp from "sharp";
import fs from "node:fs/promises";
const source = "portfolio-assets/image-source";
const slugs = [
  "p01-day-pack",
  "p02-transit-pack",
  "p03-travel-pack",
  "b01-weekender",
  "b02-utility-duffel",
  "a01-packing-set",
  "a02-tech-organizer",
  "a03-utility-pouch",
  "a04-bottle",
  "s01-overshirt",
  "s02-light-shell",
  "s03-cap",
];
await fs.mkdir("public/images", { recursive: true });
for (const name of ["hero", "lifestyle"])
  await sharp(`${source}/${name}.png`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
const metadata = await sharp(`${source}/catalog.png`).metadata();
for (let i = 0; i < slugs.length; i++) {
  const col = i % 3,
    row = Math.floor(i / 3);
  const left = Math.round((col * metadata.width) / 3) + 2;
  const top = [0, 354, 696, 1029][row] + 3;
  const right = Math.round(((col + 1) * metadata.width) / 3) - 2;
  const bottom = [354, 696, 1029, 1448][row] - 3;
  await sharp(`${source}/catalog.png`)
    .extract({ left, top, width: right - left, height: bottom - top })
    .resize(560, 560, { fit: "contain", background: "#e5e5dd" })
    .webp({ quality: 88 })
    .toFile(`public/images/${slugs[i]}.webp`);
}
await sharp(`${source}/hero.png`)
  .extract({ left: 570, top: 0, width: 950, height: 1024 })
  .resize(560, 560, { fit: "contain", background: "#e5e5dd" })
  .webp({ quality: 88 })
  .toFile("public/images/p02-transit-pack.webp");
await sharp(`${source}/hero.png`)
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 85 })
  .toFile("public/images/og.jpg");
console.log(
  "Prepared 15 optimized local assets from original generated photographs.",
);
