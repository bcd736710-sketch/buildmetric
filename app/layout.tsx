import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "BuildMetric | Smart DIY Calculators",
    template: "%s | BuildMetric",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/icon.svg",
  },
  verification: {
    other: {
      "msvalidate.01": "33D5684FC661A2807740B2027FAB673E",
    },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "BuildMetric | Smart DIY Calculators",
    description:
      "Plan smarter, estimate costs, and build backyard projects with confidence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildMetric | Smart DIY Calculators",
    description:
      "Simple, accurate, and beautiful online calculators for DIY homeowners.",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      audience: {
        "@type": "Audience",
        audienceType: siteConfig.audience,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en",
    },
    {
      "@type": "SiteNavigationElement",
      name: [
        "Home",
        "Tools",
        "Blog",
        "Backyard DIY",
        "Methodology",
        "Editorial Policy",
      ],
      url: [
        siteConfig.url,
        `${siteConfig.url}/tools`,
        `${siteConfig.url}/blog`,
        `${siteConfig.url}/backyard-diy`,
        `${siteConfig.url}/methodology`,
        `${siteConfig.url}/editorial-policy`,
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
