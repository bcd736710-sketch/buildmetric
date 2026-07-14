import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Contact BuildMetric about relevant partnerships, sponsorships, product feedback, and DIY planning collaborations.",
  alternates: {
    canonical: "/partnerships",
  },
  openGraph: {
    title: "Partnerships | BuildMetric",
    description:
      "Reach BuildMetric for relevant DIY calculator partnerships, sponsorships, product feedback, and collaboration ideas.",
    url: "/partnerships",
    type: "website",
  },
};

const partnershipTypes = [
  {
    title: "Relevant tool sponsorships",
    description:
      "A calculator or planning guide can be sponsored only when the offer is useful to DIY homeowners and clearly disclosed.",
  },
  {
    title: "Product and material feedback",
    description:
      "Brands can suggest calculator improvements, missing assumptions, or useful planning details for review.",
  },
  {
    title: "Content and data collaboration",
    description:
      "BuildMetric can review practical project data, cost ranges, or educational resources when they improve planning quality.",
  },
];

const fitRules = [
  "Relevant to DIY homeowners, backyard projects, garden planning, sheds, fences, concrete, paint, or small livestock care.",
  "Useful before purchase, not only promotional after a product decision has already been made.",
  "Clear about limitations, pricing variability, and regional differences.",
  "Compatible with BuildMetric's editorial policy and affiliate disclosure.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "BuildMetric Partnerships",
  url: `${siteConfig.url}/partnerships`,
  email: siteConfig.contactEmail,
  about:
    "Partnership, sponsorship, and collaboration inquiries for BuildMetric.",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function PartnershipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Partnerships
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Useful collaborations for DIY planning.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              BuildMetric is built for homeowners who want quick, practical
              estimates before buying materials or starting a project.
            </p>
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Current reach foundation
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-surface p-4">
                <p className="text-3xl font-semibold text-ink">
                  {calculators.length}
                </p>
                <p className="mt-1 text-sm font-medium text-muted">
                  calculators
                </p>
              </div>
              <div className="rounded-3xl bg-surface p-4">
                <p className="text-3xl font-semibold text-ink">
                  {blogPosts.length}
                </p>
                <p className="mt-1 text-sm font-medium text-muted">guides</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
          <aside className="rounded-3xl border border-line bg-surface p-6 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Contact
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("BuildMetric partnership inquiry")}`}
              className="mt-4 block break-all text-2xl font-semibold text-ink transition hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="mt-4 leading-7 text-muted">
              Include your website, the relevant BuildMetric page, the proposed
              collaboration, and why it helps homeowners plan better.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("BuildMetric partnership inquiry")}`}
                className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Send partnership inquiry
              </a>
              <Link
                href="/affiliate-disclosure"
                className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Read disclosure
              </Link>
            </div>
          </aside>

          <div className="grid gap-5">
            {partnershipTypes.map((item) => (
              <section
                key={item.title}
                className="rounded-3xl border border-line bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">
                  {item.description}
                </p>
              </section>
            ))}

            <section className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-2xl font-semibold text-ink">
                Good-fit partnerships
              </h2>
              <ul className="mt-4 grid gap-3">
                {fitRules.map((rule) => (
                  <li key={rule} className="flex gap-3 leading-7 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
