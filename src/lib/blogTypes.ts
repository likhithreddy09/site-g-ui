/**
 * Shared blog types (kept separate so growth posts can import without cycles).
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  excerpt: string;
  keywords: string[];
  readMins: number;
  published: string;
  updated: string;
  category: "ops" | "clients" | "stack";
  author: string;
  authorRole: string;
  /** One featured illustration for the article */
  image: { src: string; alt: string };
  product?: string;
  feature?: string;
  tool?: string;
  guide?: string;
  relatedSlugs?: string[];
  body: BlogBlock[];
};
