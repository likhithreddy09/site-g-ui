import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/toast";
import { SITE } from "@/lib/site";
import "./globals.css";

const RUM_SRC =
  process.env.NEXT_PUBLIC_WATCHFRONT_SDK_URL ||
  "https://site-g-backend-production.up.railway.app/sdk.js";
const RUM_SITE_KEY =
  process.env.NEXT_PUBLIC_WATCHFRONT_SITE_KEY || "sg_q_7bXnpS-63hVDdr";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jbmono", display: "swap" });

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Watchfront — Website Monitoring for Agencies in India | Uptime, SSL & Forms`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "technology",
  classification: "Website monitoring software",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", en: "/" },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `Watchfront — Website Monitoring for Agencies in India | Uptime, SSL & Forms`,
    description: SITE.description,
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: `Watchfront — Website Monitoring for Agencies in India | Uptime, SSL & Forms`,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
  robots: {
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "default" },
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = { themeColor: "#4b2440", width: "device-width", initialScale: 1 };

const GA_ID = "G-2KJ7JC3FP6";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${poppins.variable} ${mono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
        {/* beforeInteractive embeds into the initial HTML <head> so Google's tag detector can see G-2KJ7JC3FP6 */}
        <Script
          id="google-tag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="beforeInteractive" />
        {RUM_SITE_KEY && (
          <Script src={RUM_SRC} data-site-key={RUM_SITE_KEY} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
