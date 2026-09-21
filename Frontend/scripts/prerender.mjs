/* يحقن HTML المُصيَّر من React داخل dist/index.html حتى يرى الزاحف المحتوى كاملاً بلا JavaScript */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const ssrEntry = resolve("dist-ssr/entry-server.js");
const { render } = await import(pathToFileURL(ssrEntry).href);
const html = render();

const indexPath = resolve("dist/index.html");
const index = readFileSync(indexPath, "utf8");
if (!index.includes('<div id="root"></div>')) throw new Error("لم يُعثر على <div id=\"root\"></div> في dist/index.html");
writeFileSync(indexPath, index.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
console.log(`prerender: ${Math.round(html.length / 1024)} KB of HTML injected`);
