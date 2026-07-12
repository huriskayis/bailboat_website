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

export const metadata: Metadata = {
  title: "VELA Atölye — El Yapımı Yem Botları",
  description:
    "Dünya standartlarında, atölyemizde el işçiliğiyle inşa edilen yem botları.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
