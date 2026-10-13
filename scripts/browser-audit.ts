import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import { routePaths } from "../lib/routes";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
const representative = [
  "/",
  "/shop",
  "/product/p02-transit-pack",
  "/product-finder",
  "/compare",
  "/cart",
  "/checkout",
  "/membership",
  "/account",
  "/campaign",
  "/brand",
  "/case-study",
];
await fs.mkdir("portfolio-assets/validation", { recursive: true });
await fs.mkdir("portfolio-assets/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const report: {
  responsive: unknown[];
  accessibility: unknown[];
  routes: unknown[];
  links: unknown[];
  console: string[];
  images: unknown[];
} = {
  responsive: [],
  accessibility: [],
  routes: [],
  links: [],
  console: [],
  images: [],
};
page.on("pageerror", (error) => report.console.push(error.message));
page.on("console", (msg) => {
  if (msg.type() === "error") report.console.push(msg.text());
});
const seed = {
  cart: [{ slug: "p02-transit-pack", color: "Graphite", quantity: 1 }],
  wishlist: ["p01-day-pack"],
  compare: ["p01-day-pack", "p02-transit-pack", "p03-travel-pack"],
  member: true,
  memberSince: "2026-10-13T12:00:00Z",
  profile: { name: "Alex Sample", email: "alex@example.com" },
  orders: [],
  preferences: ["Daily commute"],
  promo: "",
};
await page.addInitScript(
  (value) => localStorage.setItem("velt-commerce-v1", JSON.stringify(value)),
  seed,
);
const links = new Set<string>();
for (const route of ["/", ...routePaths.map((p) => `/${p}`)]) {
  const res = await page.goto(origin + route);
  report.routes.push({ route, status: res?.status() });
  const found = await page
    .locator("a[href]")
    .evaluateAll((nodes) =>
      nodes
        .map((n) => n.getAttribute("href"))
        .filter((v): v is string => !!v && v.startsWith("/")),
    );
  found.forEach((v) => links.add(v.split("#")[0]));
}
for (const link of links) {
  const response = await page.request.get(origin + link);
  if (response.status() >= 400)
    report.links.push({ link, status: response.status() });
}
for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440]) {
  await page.setViewportSize({ width, height: 960 });
  for (const route of representative) {
    await page.goto(origin + route);
    await page.getByRole("button", { name: "Open bag, 1 items" }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    const measurement = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    report.responsive.push({ route, width, ...measurement });
    if (width === 390 || width === 1440) {
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((i) => {
            i.loading = "eager";
            return i.decode().catch(() => {});
          }),
        );
      });
      const broken = await page
        .locator("img")
        .evaluateAll((images) =>
          images
            .filter((i) => !(i as HTMLImageElement).naturalWidth)
            .map((i) => i.getAttribute("src")),
        );
      if (broken.length) report.images.push({ route, width, broken });
      const name =
        route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
      await page.screenshot({
        path: `portfolio-assets/screenshots/${name}-${width}.png`,
        fullPage: true,
      });
    }
    if (width === 390) {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      report.accessibility.push({
        route,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
    }
  }
  console.log(`Checked responsive width ${width}.`);
}
await fs.writeFile(
  "portfolio-assets/validation/audit.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
const overflow = (
  report.responsive as { viewport: number; content: number }[]
).filter((r) => r.content > r.viewport + 1);
const violations = (report.accessibility as { violations: unknown[] }[]).reduce(
  (n, r) => n + r.violations.length,
  0,
);
console.log(
  JSON.stringify({
    routes: report.routes.length,
    responsiveChecks: report.responsive.length,
    overflow: overflow.length,
    accessibilityViolations: violations,
    brokenLinks: report.links.length,
    brokenImages: report.images.length,
    consoleErrors: report.console.length,
  }),
);
if (
  overflow.length ||
  violations ||
  report.links.length ||
  report.images.length ||
  report.console.length
)
  process.exitCode = 1;
