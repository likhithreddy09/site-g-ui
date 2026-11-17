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
  /** Social image route. Config metadata beats file-based opengraph-image, so detail pages must pass theirs. */
  image?: string;
  noindex?: boolean;
  /**
   * Optional canonical override for true duplicates only.
   * Prefer unique content + cluster linking over consolidating distinct angles.
   */
  canonicalPath?: string;
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
  image,
  noindex,
  canonicalPath,
}: PageMetaInput): Metadata {
  const socialTitle = (ogTitle || title).trim();
  const socialDesc = (ogDescription || description).trim();
  const ogImage = {
    ...OG_IMAGE,
    url: image || OG_IMAGE.url,
    alt: socialTitle,
  };
  const kw = [...new Set(keywords.map((k) => k.trim()).filter(Boolean))].slice(0, 8);
  const canonPath = canonicalPath || path;
  const canonical = abs(canonPath);

  return {
    title: { absolute: title },
    description,
    keywords: kw,
    alternates: {
      canonical: canonPath,
      languages: { "en-IN": canonPath, en: canonPath, "x-default": canonPath },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE.name,
      title: socialTitle,
      description: socialDesc,
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDesc,
      site: SITE.twitter,
      images: [ogImage.url],
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

export function articleLd({
  title,
  description,
  path,
  published,
  updated,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  keywords?: string[];
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: published,
    dateModified: updated,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    image: abs(`${path}/opengraph-image`),
    author: { "@id": `${SITE.url}/#editorial-team`, "@type": "Person", name: "Watchfront editorial team", url: abs("/about/editorial") },
    publisher: { "@id": `${SITE.url}/#organization`, "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: abs("/logo.png") } },
    ...(keywords.length ? { keywords: keywords.join(", ") } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p:first-of-type", "[data-definition]"],
    },
  };
}

/** DefinedTerm for glossary / “what is X” pages (featured-snippet friendly). */
export function definedTermLd({
  term,
  definition,
  description,
  path,
}: {
  term: string;
  definition: string;
  description: string;
  path: string;
}) {
  const url = abs(path);
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Watchfront website monitoring glossary",
      url: abs("/glossary"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      name: term,
      description,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "[data-definition]"],
      },
    },
  };
}

/** E-E-A-T author Person node for articles (org-backed editorial). */
export const editorialPersonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/#editorial-team`,
  name: "Watchfront editorial team",
  jobTitle: "Product + support",
  worksFor: { "@id": `${SITE.url}/#organization` },
  url: abs("/about/editorial"),
  sameAs: [SITE.url, abs("/about"), abs("/security")],
  knowsAbout: [
    "Website monitoring",
    "Uptime monitoring",
    "SSL certificate monitoring",
    "Agency website operations",
    "WordPress care plans",
  ],
};

export function webAppLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: abs(path),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

/** Primary marketing destinations Google may promote as sitelinks. */
export const SITE_NAV: [string, string][] = [
  ["Website monitoring", "/website-monitoring"],
  ["Uptime monitoring", "/uptime-monitoring-tool"],
  ["Website uptime monitor", "/website-uptime-monitor"],
  ["SSL monitoring", "/ssl-certificate-monitoring"],
  ["WordPress monitoring", "/wordpress-website-monitoring"],
  ["Contact form monitoring", "/contact-form-monitoring"],
  ["Features", "/features"],
  ["Use cases", "/use-cases"],
  ["Free tools", "/tools"],
  ["Blog", "/blog"],
  ["Guides", "/guides"],
  ["Glossary", "/glossary"],
  ["Resources", "/resources"],
  ["Compare", "/compare"],
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
  sameAs: [
    SITE.twitter.startsWith("http") ? SITE.twitter : `https://x.com/${SITE.twitter.replace(/^@/, "")}`,
    SITE.url,
  ],
  knowsAbout: [
    "Website monitoring",
    "Uptime monitoring",
    "SSL certificate monitoring",
    "Contact form monitoring",
    "SEO audits",
    "Website monitoring for agencies in India",
  ],
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

/** HowTo schema for guide-style playbooks (rich results when content matches). */
export function howToLd({
  name,
  description,
  path,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: abs(path),
    inLanguage: "en-IN",
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${abs(path)}#step-${i + 1}`,
    })),
  };
}

/** SoftwareApplication node for money pages / product landers. */
export function softwareAppLd({
  name,
  description,
  path,
  category = "BusinessApplication",
}: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: abs(path),
    applicationCategory: category,
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    countriesSupported: "IN",
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "INR",
      description: "3-day free trial with every feature",
      availability: "https://schema.org/InStock",
      url: abs("/register"),
    },
    provider: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

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
