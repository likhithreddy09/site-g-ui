import type { Metadata } from "next";
import type { Faq } from "./marketing";
import { PRIMARY_KEYWORDS } from "./seoKeywords";
import { SITE, abs } from "./site";

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` };

export function pageMeta({
  title,
  description,
  path,
  noindex,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: string[];
}): Metadata {
  const merged = [...new Set([...(keywords || []), ...PRIMARY_KEYWORDS, ...SITE.keywords.slice(0, 8)])];
  return {
    title,
    description,
    keywords: merged,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: abs(path),
      siteName: SITE.name,
      title,
      description,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SITE.twitter,
      images: [OG_IMAGE.url],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

/** Primary marketing destinations Google may promote as sitelinks. */
export const SITE_NAV: [string, string][] = [
  ["Features", "/features"],
  ["Pricing", "/pricing"],
  ["Use cases", "/use-cases"],
  ["Security", "/security"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Start free", "/register"],
];

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: [SITE.tradingAs, "Watchfront India"].filter(Boolean),
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: abs("/logo.png"),
    width: 512,
    height: 512,
  },
  image: abs("/logo.png"),
  description: SITE.description,
  email: SITE.email.hello,
  telephone: SITE.phone,
  areaServed: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1 || undefined,
    addressLocality: SITE.address.city || undefined,
    addressCountry: SITE.address.country || "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email.hello,
      telephone: SITE.phone,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email.sales,
      telephone: SITE.phone,
      areaServed: "IN",
    },
  ],
  sameAs: [SITE.twitter.startsWith("http") ? SITE.twitter : `https://x.com/${SITE.twitter.replace(/^@/, "")}`],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: ["Watchfront India", "Watchfront monitoring"],
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#organization` },
  hasPart: SITE_NAV.map(([name, path]) => ({
    "@type": "WebPage",
    name,
    url: abs(path),
  })),
};

/** Helps Google understand primary subpages (sitelinks candidates). */
export const siteNavLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Watchfront primary pages",
  itemListElement: SITE_NAV.map(([name, path], i) => ({
    "@type": "SiteNavigationElement",
    position: i + 1,
    name,
    url: abs(path),
  })),
};

export const organizationIdLd = {
  ...organizationLd,
  "@id": `${SITE.url}/#organization`,
};
