import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteUrl } from "@/lib/seo/site-keyword-map";

const guides = {
  "pet-carrier-oem-buying-guide": { title: "Pet Carrier OEM Buying Guide", description: "Prepare fit, construction, branding and packing requirements before asking a pet carrier supplier for a wholesale quote.", sections: [["1. Start with the pet and use case", "Specify intended pet size, carrying mode, travel use, ventilation expectations and cleaning needs. Product images alone are not enough to confirm fit or construction."], ["2. Confirm the product brief", "Prepare dimensions, preferred fabric or structure, colour direction, hardware, removable parts and retail positioning. Share reference images or an existing SKU where possible."], ["3. Make branding decisions early", "List logo application, label, hangtag, packaging, carton marking and any marketplace preparation. These decisions affect quotation and production planning."], ["4. Ask for the right quotation", "Include destination market, target quantity, purchase timing and whether you need a sample. The supplier can then confirm the MOQ and production plan relevant to your project."]], rfq: "Request a Pet Carrier Quote" },
  "pet-product-moq-samples": { title: "MOQ & Sample Planning for Pet Products", description: "Use this checklist to prepare a wholesale or private-label pet product RFQ with enough detail for a relevant response.", sections: [["MOQ is product-specific", "MOQ depends on the product, colour, material, logo method, packaging and order mix. Avoid publishing or relying on a universal MOQ without a product brief."], ["Prepare a sample request", "State whether you need a stock sample, a branded sample or a revised development sample. Include the product, quantity, logo and market requirements."], ["Share your target timing", "Indicate whether you are launching within 30 days, 1–3 months, later, or are still planning. This helps the team recommend a realistic next step."], ["Qualify before requesting price", "A useful RFQ identifies company, country, product, expected quantity and customization need. This gives both buyer and supplier a more relevant quotation."]], rfq: "Plan Your Sample or MOQ Request" },
  "private-label-pet-packaging": { title: "Private Label Pet Packaging Checklist", description: "Prepare the brand and packaging details a pet product supplier needs before quoting your private-label program.", sections: [["Brand assets", "Provide your logo files, brand colours and any label rules. State where the logo should appear and whether you need woven labels, printing, embroidery or another method."], ["Retail packaging", "Describe your intended channel and packaging needs: polybag, hangtag, gift box, carton marking, inserts or barcode labels. Confirm whether packaging must meet a marketplace or retailer requirement."], ["Market requirements", "Share your sales market and any product, labelling, language or testing requirements that apply to your program. These should be reviewed before production is confirmed."], ["Approval process", "Agree on sample approval, artwork sign-off and packaging confirmation before bulk production. Keep approved specifications with the final purchase order."]], rfq: "Request Private Label Support" },
  "pet-product-quality-shipping": { title: "Pet Product Quality & Shipping Preparation", description: "A buyer-facing checklist for preparing product, packaging and shipment requirements for an international pet product order.", sections: [["Confirm the approved reference", "Use an approved sample, written specification and artwork as the source of truth for product, colour, packaging and carton requirements."], ["Set a pre-shipment checklist", "Define quantity checks, visual checks, functional checks and packaging checks that matter to your program before shipment is released."], ["Plan shipment information", "Share the destination, preferred shipping approach, required documents and delivery timing early. Freight terms and port details should be confirmed in the quotation or purchase order."], ["Keep documentation together", "Maintain the quotation, approved sample notes, artwork, packaging files, inspection requirements and shipping instructions in one buyer file."]], rfq: "Discuss Quality & Shipping Requirements" },
} as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const guide = guides[slug as keyof typeof guides];
  if (!guide) return {};
  const url = `${siteUrl}/resources/${slug}`;
  const title = `${guide.title} | TROVANE`;
  return {
    title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: guide.description },
    twitter: { card: "summary", title, description: guide.description },
  };
}

export default async function ResourceGuidePage({ params }: Props) {
  const slug = (await params).slug;
  const guide = guides[slug as keyof typeof guides];
  if (!guide) notFound();
  const url = `${siteUrl}/resources/${slug}`;
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: guide.title, description: guide.description, mainEntityOfPage: { "@type": "WebPage", "@id": url }, url, author: { "@type": "Organization", name: "TROVANE" }, publisher: { "@type": "Organization", name: "TROVANE" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Buyer Resources", item: `${siteUrl}/resources` },
      { "@type": "ListItem", position: 3, name: guide.title, item: url },
    ] },
  ] };
  return <main className="bg-white px-5 py-16 text-navy sm:px-8 lg:px-12 lg:py-24"><script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" /><article className="mx-auto max-w-[840px]"><nav aria-label="Breadcrumb" className="mb-10 text-sm text-slate"><Link className="hover:text-forest" href="/resources">Buyer Resources</Link> <span aria-hidden="true">/</span> <span>{guide.title}</span></nav><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Buyer Guide</p><h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{guide.title}</h1><p className="mt-7 text-lg leading-8 text-slate">{guide.description}</p><div className="mt-14 space-y-12">{guide.sections.map(([title, text]) => <section key={title}><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-4 text-base leading-8 text-slate">{text}</p></section>)}</div><div className="mt-16 border-y border-navy/12 py-9"><h2 className="text-2xl font-semibold">Ready to discuss your program?</h2><p className="mt-3 leading-7 text-slate">Tell us your market, product, quantity and customization requirements for a more useful B2B response.</p><Link className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-forest px-6 font-semibold text-white transition hover:bg-navy" href={`/rfq?intent=resource-guide&source=${encodeURIComponent(guide.title)}`}>{guide.rfq}</Link></div></article></main>;
}
