import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { GoogleAnalyticsPageView } from "@/components/google-analytics-page-view";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Sky Remembers | Personalized Star Maps",
    template: "%s | The Sky Remembers",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  keywords: [
    "personalized star map",
    "custom star map",
    "anniversary star map",
    "night sky print",
    "celestial poster",
    "meaningful date gift",
    "digital star map",
  ],
  category: "art",
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
    title: "The Sky Remembers | Personalized Star Maps",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sky Remembers | Personalized Star Maps",
    description: siteConfig.description,
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
        "Create",
        "How It Works",
        "Our Method",
        "FAQ",
        "Contact",
        "Privacy",
        "Terms",
        "Refund Policy",
      ],
      url: [
        siteConfig.url,
        `${siteConfig.url}/#create`,
        `${siteConfig.url}/how-it-works`,
        `${siteConfig.url}/our-method`,
        `${siteConfig.url}/faq`,
        `${siteConfig.url}/contact`,
        `${siteConfig.url}/privacy-policy`,
        `${siteConfig.url}/terms`,
        `${siteConfig.url}/refund-policy`,
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
      <head>
        <GoogleAnalytics measurementId={siteConfig.googleAnalyticsId} />
      </head>
      <body className="min-h-screen bg-white text-ink antialiased">
        <GoogleAnalyticsPageView measurementId={siteConfig.googleAnalyticsId} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
