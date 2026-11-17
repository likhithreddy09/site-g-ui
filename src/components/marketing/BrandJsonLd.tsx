import { editorialPersonLd, organizationIdLd, siteNavLd, websiteLd } from "@/lib/seo";

/** Sitewide Organization + WebSite + editorial Person + primary nav graph. */
export function BrandJsonLd() {
  const data = [organizationIdLd, websiteLd, editorialPersonLd, siteNavLd];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
