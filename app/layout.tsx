import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TROVANE | Pet Outdoor & Travel Products B2B Supplier",
  description:
    "TROVANE helps pet brands, retailers and distributors source and customize pet outdoor, travel, car, hiking and camping products.",
  metadataBase: new URL("https://buildmetriccalc.com"),
  openGraph: {
    title: "TROVANE | Pet Outdoor & Travel",
    description:
      "Pet outdoor and travel products for brands, retailers and distributors worldwide.",
    url: "https://buildmetriccalc.com",
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
    title: "TROVANE | Pet Outdoor & Travel",
    description:
      "Pet outdoor and travel products for B2B sourcing and customization.",
    images: ["/trovane-logo-horizontal.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
