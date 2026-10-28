import type { Metadata } from "next";
import type { Faq } from "./marketing";
import { SITE, abs } from "./site";

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` };

export function pageMeta({ title, description, path, noindex }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: abs(path), siteName: SITE.name, title, description, locale: "en_US", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, site: SITE.twitter, images: [OG_IMAGE.url] },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});

export const organizationLd = {
  "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: abs("/icon.svg"),
  email: SITE.email.hello, contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: SITE.email.sales }],
};

export const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, description: SITE.description };
