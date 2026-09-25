import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { RouteTransitionProvider } from "@/components/layout/RouteTransition";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo";
import { isIndexable } from "@/lib/env";
import { config } from "@/lib/config";

const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
// High-contrast Didone for display type (caps, with italic accents)
const serif = Bodoni_Moda({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Event Management Company in Chennai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Maitreya Events",
    "event management company Chennai",
    "event organisers Chennai",
    "wedding event management Chennai",
    "corporate event management Chennai",
    "event production Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  verification: {
    ...(config.googleVerification ? { google: config.googleVerification } : {}),
    ...(config.bingVerification ? { other: { "msvalidate.01": config.bingVerification } } : {}),
  },
  formatDetection: { telephone: true, email: true, address: false },
  category: "events",
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

const GA_ID = config.gaId;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-marigold px-5 py-3 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <RouteTransitionProvider>
          <SmoothScroll />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </RouteTransitionProvider>
        <div className="grain" aria-hidden />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
