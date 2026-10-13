import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
await fs.mkdir("portfolio-assets/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:4000", { waitUntil: "networkidle" });
await page.screenshot({
  path: "portfolio-assets/screenshots/home-desktop.png",
  fullPage: false,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({
  path: "portfolio-assets/screenshots/home-mobile.png",
  fullPage: true,
});
console.log(await page.title());
console.log(
  await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    images: [...document.images]
      .filter((i) => !i.complete || !i.naturalWidth)
      .map((i) => i.src),
  })),
);
await browser.close();
