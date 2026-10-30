export type Explanation = { title: string; meaning: string; fix: string };

const host = (u: string) => { try { return new URL(u).host; } catch { return ""; } };
const file = (u: string) => { try { const p = new URL(u).pathname.split("/").filter(Boolean); return p[p.length - 1] || u; } catch { return u; } };

export function explainError(e: { kind: string; message: string; api?: any; source?: string; third_party?: string | null }): Explanation {
  const m = e.message || "";
  if (e.kind !== "api" && e.third_party) return { title: `A script from ${e.third_party} crashed`, meaning: `This error comes from code loaded from ${e.third_party} (a widget, chat, analytics, ads or similar), not from the website's own code. Whatever that script does may not work for visitors.`, fix: `Update or reconfigure that integration, contact its vendor, or remove it if it isn't needed. If it's harmless, click Ignore.` };
  if (m.startsWith("Blocked by Content Security Policy")) return { title: "The browser blocked something on the page", meaning: "The site's security policy (CSP) stopped a script, style, image or connection from loading. Usually a new widget or CDN wasn't added to the allowed list.", fix: "Add the blocked address to the website's Content-Security-Policy header, or remove whatever is trying to load it." };
  if (m.startsWith("console.error")) return { title: "The website logged an error", meaning: "The site's own code reported a problem in the browser console. It didn't crash the page, but something didn't go as planned.", fix: "Search the website code for this message to find where it's logged." };
  if (e.kind === "api" && e.api) {
    const s = e.api.status;
    const where = `${e.api.method} ${host(e.api.url)}${(() => { try { return new URL(e.api.url).pathname; } catch { return ""; } })()}`;
    if (!s) return { title: "A request couldn't reach the server", meaning: `The page asked ${where} for data, but got no answer. The server may be down, blocked by an ad-blocker, or not allowing requests from this site (CORS).`, fix: "Check the API server is running and that it allows requests from the website's domain." };
    if (s === 401 || s === 403) return { title: "A request was refused (not logged in / no permission)", meaning: `${where} answered ${s}. Visitors may see missing data or get logged out.`, fix: "Check login tokens, API keys and session expiry." };
    if (s === 404) return { title: "The page is calling an address that doesn't exist", meaning: `${where} answered 404 Not Found. Part of the page probably shows empty or broken.`, fix: "The API route was renamed or removed - update the website code or restore the route." };
    if (s === 429) return { title: "Too many requests - the API is rate-limiting", meaning: `${where} answered 429. Some visitors are being turned away.`, fix: "Raise the rate limit or reduce how often the page calls this API." };
    if (s >= 500) return { title: "The server crashed while answering", meaning: `${where} answered ${s}. Whatever this request powers (a form, a list, a login) is failing for visitors.`, fix: "Check the backend server logs around the time it happened." };
    return { title: `A request failed with ${s}`, meaning: `${where} answered ${s}.`, fix: "Check what this request does and why the server rejected it." };
  }
  if (m.startsWith("Failed to load resource")) {
    const u = m.replace(/^Failed to load resource:\s*/, "");
    return { title: `A file is missing: ${file(u)}`, meaning: `The page tries to load ${u} but it couldn't be found or downloaded. If it's a script or stylesheet, part of the page may look or work wrong; if it's an image, visitors see a broken picture.`, fix: "Upload the file again or remove the reference to it." };
  }
  if (/^Script error\.?$/i.test(m.trim())) return { title: "Error in a script from another website", meaning: "A script loaded from another domain (a widget, chat, analytics or ad) crashed. Browsers hide the details for privacy.", fix: "If it's your own script on a CDN, add crossorigin=\"anonymous\" to the script tag to see details." };
  const notDefined = m.match(/(\w[\w$.]*) is not defined/);
  if (notDefined) return { title: `The code uses “${notDefined[1]}”, which doesn't exist`, meaning: "Usually a script that should have loaded first didn't (blocked, slow or missing), or there's a typo. The feature that needs it won't work.", fix: `Make sure the script providing “${notDefined[1]}” loads before this code runs.` };
  const readProp = m.match(/Cannot read propert(?:y|ies) of (undefined|null)(?: \(reading '([^']+)'\))?/) || m.match(/(undefined|null) is not an object \(evaluating '([^']+)'\)/);
  if (readProp) return { title: "The code expected data that wasn't there", meaning: `The code tried to use ${readProp[2] ? `“${readProp[2]}”` : "a value"} on something that was ${readProp[1]} - often because an API returned nothing or an element wasn't on the page.`, fix: "Add a check for missing data, and look at failed API requests on the same page." };
  const notFn = m.match(/([\w$.]+) is not a function/);
  if (notFn) return { title: `“${notFn[1]}” was called but isn't a function`, meaning: "A library may not have loaded, loaded the wrong version, or two scripts are clashing.", fix: "Check the library versions and the order scripts load in." };
  if (/ChunkLoadError|Loading chunk \d+ failed|Failed to fetch dynamically imported module/i.test(m)) return { title: "Part of the app couldn't be downloaded", meaning: "Usually happens right after a new release: visitors with the old version open still ask for files that no longer exist.", fix: "Keep old build files for a while after deploying, or reload the page automatically on this error." };
  if (/Unhandled rejection/i.test(m)) return { title: "Something failed in the background without being handled", meaning: "A background task (often an API call) failed and the code didn't deal with it. The visitor may see nothing happen when they click.", fix: "Add error handling (catch) to that request or promise." };
  if (/SyntaxError/i.test(m)) return { title: "A script has a typo or got corrupted", meaning: "The browser couldn't even read the script, so nothing in it runs. Sometimes an API returned an HTML error page where JSON was expected.", fix: "Check the latest deployment and any JSON responses on this page." };
  if (/ResizeObserver loop/i.test(m)) return { title: "Harmless layout warning", meaning: "Browsers report this when a page resizes itself quickly. Visitors don't notice anything.", fix: "Usually safe to ignore." };
  return { title: "JavaScript error on the page", meaning: "Some code on the page crashed. Whatever it was doing (a button, slider, form or tracking) may not work for visitors.", fix: "Share the technical details below with the developer." };
}
