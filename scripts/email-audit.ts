import { chromium } from "@playwright/test";
import { emails } from "../lib/catalog";
import fs from "node:fs/promises";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const results = [];
for (const width of [375, 600]) {
  await page.setViewportSize({ width, height: 900 });
  for (const email of emails) {
    const response = await page.goto(
      `http://127.0.0.1:4000/emails/${email.slug}.html`,
    );
    const result = await page.evaluate(async () => {
      await Promise.all([...document.images].map((i) => i.decode()));
      return {
        viewport: innerWidth,
        content: document.documentElement.scrollWidth,
        broken: [...document.images].filter((i) => !i.naturalWidth).length,
      };
    });
    results.push({
      email: email.slug,
      width,
      status: response?.status(),
      ...result,
    });
    if (
      email.slug === "cart-reminder" ||
      email.slug === "membership-invitation"
    )
      await page.screenshot({
        path: `portfolio-assets/screenshots/email-${email.slug}-${width}.png`,
        fullPage: true,
      });
  }
}
await fs.writeFile(
  "portfolio-assets/validation/email-audit.json",
  JSON.stringify(results, null, 2),
);
await browser.close();
const failures = results.filter(
  (r) => r.status !== 200 || r.content > r.viewport || r.broken,
);
console.log(JSON.stringify({ emailChecks: results.length, failures }));
if (failures.length) process.exitCode = 1;
