import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Learn how BuildMetric creates, reviews, and maintains DIY calculator content, formulas, assumptions, and planning guides.",
  alternates: { canonical: "/editorial-policy" },
  openGraph: {
    title: "Editorial Policy | BuildMetric",
    description:
      "How BuildMetric creates practical DIY calculator content and keeps formulas transparent.",
    url: "/editorial-policy",
    type: "website",
  },
};

const policySections = [
  {
    title: "What BuildMetric publishes",
    body: "BuildMetric publishes DIY calculators, formula explanations, planning guides, checklists, and project hubs for homeowners. Content is focused on early planning questions: space, volume, quantity, cost ranges, and practical project assumptions.",
  },
  {
    title: "How formulas are handled",
    body: "Calculator formulas are kept short and visible wherever possible. Tool pages include formula summaries, assumptions, examples, FAQs, and related guides so users can understand how an estimate was produced.",
  },
  {
    title: "How content is reviewed",
    body: "Before publication, pages are checked for clear inputs, consistent units, mobile usability, internal links, metadata, structured data, and obvious formula mistakes. BuildMetric prioritizes clarity over complex hidden models.",
  },
  {
    title: "How updates are made",
    body: "Pages may be updated when formulas change, new calculators are added, internal links improve, or better explanations are needed. Sitemap and structured data are kept aligned with published pages.",
  },
  {
    title: "What users should verify",
    body: "Users should verify local rules, permits, material labels, contractor guidance, engineering needs, utility locations, property lines, climate conditions, and supplier pricing before making final decisions.",
  },
  {
    title: "Corrections",
    body: "If a formula, assumption, link, or explanation appears unclear or incorrect, contact BuildMetric with the page URL and a short note. Corrections should be handled quickly and transparently as the calculator library grows.",
  },
];

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "BuildMetric Editorial Policy",
    description:
      "How BuildMetric creates and maintains DIY calculator formulas, assumptions, and planning guides.",
    url: `${siteConfig.url}/editorial-policy`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Editorial policy
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              How BuildMetric creates and maintains planning content.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              BuildMetric is designed as a practical calculator and planning
              library. The goal is to publish useful estimates that are easy to
              inspect, easy to use, and clear about their limits.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-line bg-white p-7 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              <p className="mt-4 leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Transparency
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Estimates are useful when the assumptions are visible.
            </h2>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7 shadow-sm">
            <p className="leading-8 text-muted">
              BuildMetric calculators should help homeowners make better early
              decisions, not hide uncertainty. For that reason, tool pages show
              formula summaries and planning assumptions, while guide pages
              connect back to relevant calculators.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/methodology"
                className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                View methodology
              </Link>
              <Link
                href="/tools"
                className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Browse calculators
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full px-4 py-3 text-sm font-semibold text-brand transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Report a correction
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
