import { organizationIdLd, websiteLd } from "@/lib/seo";

/** Sitewide Organization + WebSite graph so Google can pick up the brand logo. */
export function BrandJsonLd() {
  const data = [organizationIdLd, websiteLd];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
