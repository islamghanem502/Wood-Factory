/* يحقن HTML المُصيَّر من React داخل صفحات dist حتى يرى الزاحف المحتوى كاملاً بلا JavaScript */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const PAGES = [
  { page: "home", file: "dist/index.html" },
  { page: "about", file: "dist/about/index.html" },
];

const ssrEntry = resolve("dist-ssr/entry-server.js");
const { render } = await import(pathToFileURL(ssrEntry).href);

for (const { page, file } of PAGES) {
  const html = render(page);
  const path = resolve(file);
  const index = readFileSync(path, "utf8");
  if (!index.includes('<div id="root"></div>')) throw new Error(`لم يُعثر على <div id="root"></div> في ${file}`);
  writeFileSync(path, index.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`prerender: ${file} ← ${Math.round(html.length / 1024)} KB of HTML`);
}
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
