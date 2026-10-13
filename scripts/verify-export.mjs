import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? walk(path.join(directory, e.name))
          : path.join(directory, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter(
  (f) => f.endsWith(".html") && !f.includes("/emails/"),
);
const problems = [];
const references = new Set();
for (const file of htmlFiles) {
  const html = await fs.readFile(file, "utf8");
  if (!html.includes("noindex")) problems.push(`${file}: missing noindex`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"<>]+)"/g))
    references.add(match[1].split("?")[0].split("#")[0]);
}
for (const ref of references) {
  const decoded = decodeURIComponent(ref);
  const candidate = path.join(root, decoded);
  let found = false;
  for (const target of [candidate, path.join(candidate, "index.html")]) {
    try {
      const s = await fs.stat(target);
      if (s.isFile()) found = true;
    } catch {}
  }
  if (!found) problems.push(`Missing output target: ${decoded}`);
}
const creatives = files.filter(
  (f) => f.includes("/campaign-assets/") && f.endsWith(".png"),
);
const emails = files.filter(
  (f) => f.includes("/emails/") && f.endsWith(".html"),
);
if (creatives.length !== 19)
  problems.push(`Expected 19 campaign exports, got ${creatives.length}`);
if (emails.length !== 8)
  problems.push(`Expected 8 email previews, got ${emails.length}`);
console.log(
  JSON.stringify(
    {
      htmlPages: htmlFiles.length,
      localReferences: references.size,
      campaignExports: creatives.length,
      emailTemplates: emails.length,
      problems,
    },
    null,
    2,
  ),
);
if (problems.length) process.exitCode = 1;
