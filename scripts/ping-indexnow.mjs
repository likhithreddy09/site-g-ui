#!/usr/bin/env node
/**
 * Notify IndexNow (Bing/Yandex/etc.) about fresh public URLs.
 * Run after deploy: node scripts/ping-indexnow.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const key = "watchfront-indexnow-2026-a7f3c91e";
const host = "www.watchfront.in";
const keyLocation = `https://${host}/${key}.txt`;

// Prefer generated public sitemap if present; else fall back to a seed list.
const sitemapPath = path.join(root, "public/sitemap.xml");
let urls = [
  `https://${host}/`,
  `https://${host}/website-monitoring-for-agencies`,
  `https://${host}/website-monitoring-tool-india`,
  `https://${host}/uptime-monitoring-tool`,
  `https://${host}/blog/best-website-monitoring-tools-india-2026`,
  `https://${host}/blog/whatsapp-alerts-website-downtime-india`,
  `https://${host}/guides/how-to-sell-website-monitoring`,
  `https://${host}/guides/website-monitoring-checklist-freelancers`,
  `https://${host}/compare/betteruptime-alternative`,
  `https://${host}/compare/checkly-alternative`,
  `https://${host}/compare/oh-dear-alternative`,
];

if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const found = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  if (found.length) urls = found.slice(0, 200);
}

const body = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow ${res.status} — submitted ${urls.length} URLs`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
