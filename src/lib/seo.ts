import type { Metadata } from "next";
import type { Faq } from "./marketing";
import { SITE, abs } from "./site";

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} - ${SITE.tagline}` };

/**
 * SERP / browser title with clear site hierarchy.
 * Example: hierarchicalTitle("SEO audit", "Features") → "SEO audit | Features | Watchfront"
 */
export function hierarchicalTitle(...parts: string[]) {
  return [...parts.map((p) => p.trim()).filter(Boolean), SITE.name].join(" | ");
}

type PageMetaInput = {
  /** Browser / SERP title. Prefer hierarchicalTitle(...). Absolute - skips layout template. */
  title: string;
  description: string;
  path: string;
  /** 3-6 focused phrases for this page only. Do not stuff the whole site list. */
  keywords?: string[];
  /** Defaults to title when omitted. */
  ogTitle?: string;
  /** Defaults to description when omitted. */
  ogDescription?: string;
  noindex?: boolean;
};

/**
 * Per-page metadata. Titles are absolute (no double brand from the layout template).
 * Keywords stay page-specific - Google ignores stuffed meta keywords.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords = [],
  ogTitle,
  ogDescription,
  noindex,
}: PageMetaInput): Metadata {
  const socialTitle = ogTitle || title;
  const socialDesc = ogDescription || description;
  const kw = [...new Set(keywords.map((k) => k.trim()).filter(Boolean))].slice(0, 8);
  const canonical = abs(path);

  return {
    title: { absolute: title },
    description,
    keywords: kw,
    alternates: {
      canonical: path,
      languages: { "en-IN": path, en: path },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title: socialTitle,
      description: socialDesc,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDesc,
      site: SITE.twitter,
      images: [OG_IMAGE.url],
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
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

/** Google breadcrumb trail: Home › Features › SEO audit */
export const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => {
    const url = abs(path);
    return {
      "@type": "ListItem",
      position: i + 1,
      name,
      item: {
        "@type": "WebPage",
        "@id": url,
        name,
        url,
      },
    };
  }),
});

/** WebPage node that sits under a parent section (Features / Use cases / …). */
export function webPageLd({
  name,
  description,
  path,
  parentName,
  parentPath,
}: {
  name: string;
  description: string;
  path: string;
  parentName: string;
  parentPath: string;
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@type": "CollectionPage",
      "@id": `${abs(parentPath)}#webpage`,
      name: parentName,
      url: abs(parentPath),
    },
    about: {
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE.url,
    },
  };
}

/** Hub page that lists child pages (Features index, Use cases index). */
export function collectionPageLd({
  name,
  description,
  path,
  children,
}: {
  name: string;
  description: string;
  path: string;
  children: { name: string; path: string }[];
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    hasPart: children.map((c) => ({
      "@type": "WebPage",
      name: c.name,
      url: abs(c.path),
    })),
  };
}

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
  // Google Knowledge / brand logo: square, ≥112×112, crawlable, stable URL
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE.url}/#logo`,
    url: abs("/logo.png"),
    contentUrl: abs("/logo.png"),
    width: 512,
    height: 512,
    caption: SITE.name,
  },
  image: [abs("/logo.png"), abs("/icon-512.png")],
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
