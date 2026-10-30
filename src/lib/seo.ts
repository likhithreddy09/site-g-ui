import type { Metadata } from "next";
import type { Faq } from "./marketing";
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
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
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

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: [SITE.name, SITE.tradingAs].filter(Boolean),
  url: SITE.url,
  logo: abs("/icon.svg"),
  image: abs("/opengraph-image"),
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
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en-IN",
  publisher: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
};
