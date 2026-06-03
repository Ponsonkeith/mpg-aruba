import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader }   from "@/components/layout/SiteHeader";
import { SiteFooter }   from "@/components/layout/SiteFooter";
import { MobileTabNav } from "@/components/layout/MobileTabNav";

// In production: replace with next/font/google imports for Cormorant Garamond + DM Sans
// Blocked in this sandbox env — loaded via CSS variables in globals.css instead

export const metadata: Metadata = {
  title: {
    default: "MPG Aruba Real Estate | Buy, Sell & Rent Property in Aruba",
    template: "%s | MPG Aruba Real Estate",
  },
  description:
    "MPG Aruba Real Estate — Aruba's trusted luxury real estate platform. Browse villas, condos, land, and commercial properties for sale and rent. Licensed broker. Local expertise.",
  keywords: ["Aruba real estate", "property Aruba", "villas Aruba", "buy property Aruba", "MPG Aruba"],
  authors: [{ name: "MPG Aruba Real Estate" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mpgaruba.com"),
  openGraph: { type: "website", locale: "en_US", siteName: "MPG Aruba Real Estate" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10293e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileTabNav />
      </body>
    </html>
  );
}
