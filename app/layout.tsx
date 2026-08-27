import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { homeSeo, siteUrl } from "@/lib/seo/site-keyword-map";
import "./globals.css";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: siteUrl,
    siteName: "TROVANE",
    images: [
      {
        url: "/trovane-logo-horizontal.jpg",
        width: 2400,
        height: 960,
        alt: "TROVANE Pet Outdoor and Travel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: ["/trovane-logo-horizontal.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "TROVANE", url: siteUrl, logo: `${siteUrl}/trovane-logo-horizontal-cropped.png`, email: "jin.gou@buildmetriccalc.com", telephone: "+8618215529827", description: "Supplier and sourcing partner for pet outdoor and travel products." },
      { "@type": "WebSite", name: "TROVANE", url: siteUrl },
    ],
  };
  return (
    <html lang="en">
      <body><script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} type="application/ld+json" /><SiteHeader />{children}<WhatsAppWidget /></body>
    </html>
  );
}
