import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Syne } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/toast";
import { BrandJsonLd } from "@/components/marketing/BrandJsonLd";
import { SITE, abs } from "@/lib/site";
import "./globals.css";

const RUM_SRC =
  process.env.NEXT_PUBLIC_WATCHFRONT_SDK_URL ||
  "https://api.watchfront.in/sdk.js";
const RUM_SITE_KEY =
  process.env.NEXT_PUBLIC_WATCHFRONT_SITE_KEY || "sg_q_7bXnpS-63hVDdr";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jbmono", display: "swap" });
const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} - ${SITE.tagline}` };

const HOME_TITLE = "Website Monitoring for Agencies in India | Watchfront";
const HOME_DESC = SITE.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: HOME_DESC,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "technology",
  classification: "Website monitoring software",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: HOME_TITLE,
    description: HOME_DESC,
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    title: HOME_TITLE,
    description: HOME_DESC,
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
    // Google SERP favicon: square ≥48px PNG first (stable URL)
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
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
      <head>
        {/* Explicit favicon links - Google looks for rel=icon on the homepage */}
        <link rel="icon" href={abs("/favicon-48.png")} type="image/png" sizes="48x48" />
        <link rel="icon" href={abs("/favicon.ico")} sizes="any" />
        <link rel="apple-touch-icon" href={abs("/apple-touch-icon.png")} sizes="180x180" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <BrandJsonLd />
        {/* Raw <script> tags (not next/script) so Google's detector sees G-2KJ7JC3FP6 in HTML source */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
      </head>
      <body className={`${mono.variable} ${display.variable} ${serif.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
        {RUM_SITE_KEY && (
          <Script src={RUM_SRC} data-site-key={RUM_SITE_KEY} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
