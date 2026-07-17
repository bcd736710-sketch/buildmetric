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
    google: [
      "KZHn52r1HB9-ff1UmPuhMcJEQyhUpSCceal7icrKEDw",
      "NVovzWT0yCiXKftowwkpMsHpUUmhZZkb9zCod4MEi-w",
    ],
    other: {
      "msvalidate.01": [
        "33D5684FC661A2807740B2027FAB673E",
        "285C044377F9CFB06B672A0D6D302E6F",
      ],
    },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/feed+json": "/feed.json",
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
      email: siteConfig.contactEmail,
      contactPoint: {
        "@type": "ContactPoint",
        email: siteConfig.contactEmail,
        contactType: "customer support",
        availableLanguage: "en",
      },
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
        "Contact",
        "Partnerships",
        "Methodology",
        "Editorial Policy",
        "Affiliate Disclosure",
      ],
      url: [
        siteConfig.url,
        `${siteConfig.url}/tools`,
        `${siteConfig.url}/blog`,
        `${siteConfig.url}/backyard-diy`,
        `${siteConfig.url}/contact`,
        `${siteConfig.url}/partnerships`,
        `${siteConfig.url}/methodology`,
        `${siteConfig.url}/editorial-policy`,
        `${siteConfig.url}/affiliate-disclosure`,
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
