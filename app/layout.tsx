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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
