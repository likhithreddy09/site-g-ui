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
  `https://${host}/tools`,
  `https://${host}/tools/website-down-checker`,
  `https://${host}/tools/down-for-everyone-or-just-me`,
  `https://${host}/tools/check-if-website-is-up`,
  `https://${host}/tools/ssl-expiry-checker`,
  `https://${host}/tools/http-headers-checker`,
  `https://${host}/tools/security-headers-checker`,
  `https://${host}/website-monitoring-tool`,
  `https://${host}/uptime-monitoring-tool`,
  `https://${host}/blog`,
  `https://${host}/blog/is-my-website-down-for-everyone-or-just-me`,
  `https://${host}/blog/how-to-check-if-website-is-up-right-now`,
  `https://${host}/blog/free-website-down-checker-no-signup`,
  `https://${host}/blog/how-to-check-ssl-certificate-expiry`,
  `https://${host}/blog/security-headers-checklist-for-client-sites`,
  `https://${host}/blog/open-graph-tags-fix-social-preview`,
  `https://${host}/blog/noindex-left-on-production`,
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
