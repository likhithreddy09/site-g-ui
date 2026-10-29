import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/toast";
import { SITE } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jbmono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url, title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description, locale: "en_US" },
  twitter: { card: "summary_large_image", site: SITE.twitter, title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#4b2440", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${mono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
