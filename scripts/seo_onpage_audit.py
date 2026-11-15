#!/usr/bin/env python3
"""On-page SEO audit for every URL in public/sitemap.xml, run against a local `next start`.

Usage: python scripts/seo_onpage_audit.py [base_url]   (default http://127.0.0.1:3123)
Requires: requests, beautifulsoup4
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3123").rstrip("/")
ROOT = Path(__file__).resolve().parent.parent
SITE = "https://www.watchfront.in"

paths = [urlparse(u).path or "/" for u in re.findall(r"<loc>([^<]+)</loc>", (ROOT / "public/sitemap.xml").read_text())]
titles, descs = defaultdict(list), defaultdict(list)
issues: dict[str, list[str]] = defaultdict(list)
internal_links: set[str] = set()
inbound: dict[str, int] = defaultdict(int)
rows = []


def hidden_ancestor(tag) -> bool:
    for el in [tag, *tag.parents]:
        style = (getattr(el, "attrs", {}) or {}).get("style", "")
        if re.search(r"opacity:\s*0(?![.\d])", style or ""):
            return True
    return False


for p in paths:
    r = requests.get(BASE + p, timeout=30)
    if r.status_code != 200:
        issues[p].append(f"HTTP {r.status_code}")
        continue
    soup = BeautifulSoup(r.text, "html.parser")
    t = (soup.title.string or "").strip() if soup.title else ""
    d = (soup.find("meta", attrs={"name": "description"}) or {}).get("content", "")
    titles[t].append(p)
    descs[d].append(p)

    if not 30 <= len(t) <= 60:
        issues[p].append(f"title length {len(t)}: {t!r}")
    if not 110 <= len(d) <= 160:
        issues[p].append(f"description length {len(d)}")

    h1s = soup.find_all("h1")
    if len(h1s) != 1:
        issues[p].append(f"{len(h1s)} H1 tags")
    elif hidden_ancestor(h1s[0]):
        issues[p].append("H1 server-rendered with opacity:0 (hurts LCP)")

    levels = [int(h.name[1]) for h in soup.find_all(re.compile(r"^h[1-6]$"))]
    for a, b in zip(levels, levels[1:]):
        if b > a + 1:
            issues[p].append(f"heading level skip h{a}->h{b}")
            break

    canon = (soup.find("link", rel="canonical") or {}).get("href", "")
    if not canon.startswith(SITE) or (urlparse(canon).path.rstrip("/") or "/") != p:
        issues[p].append(f"canonical {canon!r} does not point at {SITE}{p}")
    if not soup.find("link", rel="alternate", hreflang="x-default"):
        issues[p].append("no hreflang x-default")

    for prop in ("og:title", "og:description", "og:image", "og:url"):
        if not soup.find("meta", property=prop):
            issues[p].append(f"missing {prop}")
    og_img = (soup.find("meta", property="og:image") or {}).get("content", "")
    if p.count("/") >= 2 and urlparse(og_img).path == "/opengraph-image":
        issues[p].append("generic site-wide og:image on a detail page")
    tw_img = (soup.find("meta", attrs={"name": "twitter:image"}) or {}).get("content", "")
    if tw_img and urlparse(tw_img).path != urlparse(og_img).path:
        issues[p].append("twitter:image differs from og:image")

    types = []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
        except json.JSONDecodeError:
            issues[p].append("invalid JSON-LD")
            continue
        for node in data if isinstance(data, list) else [data]:
            types.append(node.get("@type"))
    if "BreadcrumbList" not in types and p not in ("/", "/register"):
        issues[p].append("no BreadcrumbList")

    for img in soup.find_all("img"):
        if not (img.get("alt") or "").strip() and img.get("aria-hidden") != "true":
            issues[p].append(f"img without alt: {img.get('src', '')[:60]}")

    main = soup.find("main") or soup.body
    for bad in main.find_all(["script", "style", "nav", "footer"]):
        bad.decompose()
    words = len(re.findall(r"\w+", main.get_text(" ")))
    hidden_blocks = sum(1 for el in main.find_all(style=re.compile(r"opacity:\s*0(?![.\d])")))

    links = {a["href"].split("#")[0].rstrip("/") or "/" for a in (soup.find("main") or soup).find_all("a", href=True) if a["href"].startswith("/")}
    for l in links:
        internal_links.add(l)
        if l != p:
            inbound[l] += 1

    rows.append((p, len(t), len(d), words, hidden_blocks, len(links), ",".join(sorted({str(x) for x in types if x}))))

for t, ps in titles.items():
    if len(ps) > 1:
        for p in ps:
            issues[p].append(f"duplicate title shared with {len(ps) - 1} page(s)")
for d, ps in descs.items():
    if len(ps) > 1:
        for p in ps:
            issues[p].append(f"duplicate description shared with {len(ps) - 1} page(s)")
for p in paths:
    if p != "/" and inbound.get(p.rstrip("/"), 0) < 3:
        issues[p].append(f"only {inbound.get(p.rstrip('/'), 0)} in-content internal links point here")

broken = []
for l in sorted(internal_links):
    if l.startswith(("/app", "/r/", "/api")):
        continue
    code = requests.get(BASE + l, timeout=30, allow_redirects=False).status_code
    if code >= 400:
        broken.append((l, code))

print(f"{'path':48} {'tit':>4} {'desc':>4} {'words':>6} {'hidden':>6} {'links':>5}  json-ld")
for p, tl, dl, w, h, lk, ty in rows:
    print(f"{p:48} {tl:4} {dl:4} {w:6} {h:6} {lk:5}  {ty}")
print()
total = 0
for p in paths:
    for i in issues.get(p, []):
        total += 1
        print(f"[{p}] {i}")
for l, c in broken:
    total += 1
    print(f"[broken link] {l} -> {c}")
print(f"\n{total} issue(s) across {len(paths)} pages")
