import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/seo/site-keyword-map";

export const metadata: Metadata = {
  title: "Pet Product Sourcing Resources | TROVANE",
  description: "Practical guidance for pet product buyers planning OEM, wholesale, samples, packaging and international shipping.",
  alternates: { canonical: `${siteUrl}/resources` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/resources`,
    title: "Pet Product Sourcing Resources | TROVANE",
    description: "Practical resources for pet product buyers planning samples, packaging, quality checks and shipping.",
    images: [{ url: `${siteUrl}/trovane-hero-pets-gear-roadtrip.jpg`, alt: "Pet product sourcing resources" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Product Sourcing Resources | TROVANE",
    description: "Practical resources for pet product buyers planning samples, packaging and shipping.",
    images: [`${siteUrl}/trovane-hero-pets-gear-roadtrip.jpg`],
  },
};

const guides = [
  { slug: "pet-carrier-oem-buying-guide", title: "Pet Carrier OEM Buying Guide", text: "A buyer checklist for fit, materials, ventilation, packaging and sampling before requesting a quotation." },
  { slug: "pet-product-moq-samples", title: "MOQ & Sample Planning", text: "How to prepare quantity, branding and market requirements so a supplier can give a useful wholesale proposal." },
  { slug: "private-label-pet-packaging", title: "Private Label Pet Packaging", text: "The information to prepare for logo, labels, cartons and retail-ready pet product packaging." },
  { slug: "pet-product-quality-shipping", title: "Quality & Shipping Preparation", text: "A practical handoff checklist for product confirmation, packaging review, quality checks and shipment planning." },
];

export default function ResourcesPage() {
  return <main className="bg-white px-5 py-16 text-navy sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1080px]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Buyer Resources</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Practical sourcing guidance for pet product buyers.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate">Built for distributors, retailers and brand teams planning a pet outdoor or travel program. Use these guides to prepare a clearer RFQ.</p><div className="mt-14 grid gap-5 sm:grid-cols-2">{guides.map((guide) => <Link className="group border border-navy/12 p-7 transition hover:border-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest" href={`/resources/${guide.slug}`} key={guide.slug}><h2 className="text-2xl font-semibold tracking-tight group-hover:text-forest">{guide.title}</h2><p className="mt-4 leading-7 text-slate">{guide.text}</p><span className="mt-7 inline-block text-sm font-bold uppercase tracking-[0.08em] text-forest">Read guide →</span></Link>)}</div></div></main>;
}
