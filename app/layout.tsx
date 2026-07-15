import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import WhatsAppButton from "./components/WhatsAppButton";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velayembotu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VELA Yem Botu — El Yapımı Yem Botları | Denizli",
    template: "%s | VELA Yem Botu",
  },
  description:
    "Türkiye'nin en kaliteli el yapımı yem botları. Denizli'de üretim, Türkiye geneline gönderim. Pil ve batarya değişim servisi. WhatsApp ile sipariş verin.",
  keywords: [
    "yem botu", "yem botu satış", "yem botu türkiye", "el yapımı yem botu",
    "yem botu fiyat", "yem botu denizli", "yem botu batarya", "yem botu pil değişimi",
    "rc yem botu", "sazan avı yem botu", "uzaktan kumandalı yem botu",
  ],
  authors: [{ name: "VELA Yem Botu Atölyesi" }],
  creator: "VELA Yem Botu Atölyesi",
  publisher: "VELA Yem Botu Atölyesi",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "VELA Yem Botu",
    title: "VELA Yem Botu — El Yapımı Yem Botları | Denizli",
    description:
      "Türkiye'nin en kaliteli el yapımı yem botları. Denizli'de üretim, Türkiye geneline gönderim. Pil ve batarya değişim servisi.",
    images: [{ url: "/images/poyraz1.png", width: 1200, height: 630, alt: "VELA Yem Botu" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VELA Yem Botu Atölyesi",
    description: "El yapımı yem botu üretimi ve pil batarya değişim servisi.",
    url: siteUrl,
    telephone: "+393271192778",
    email: "info@velayembotu.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denizli",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "TR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [`https://wa.me/393271192778`],
  };

  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
