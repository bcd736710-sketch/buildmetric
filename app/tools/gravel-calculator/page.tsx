import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { GravelCalculator } from "@/components/gravel-calculator";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const calculator = calculatorBySlug["gravel-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${calculator.seoTitle} | BuildMetric`,
    description: calculator.metaDescription,
    url: pageUrl,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: calculator.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: `${siteConfig.url}${pageUrl}`,
      description: calculator.metaDescription,
      featureList: [
        ...calculator.formulaSummary,
        ...calculator.assumptions,
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: calculator.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function GravelCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolHero calculatorName={calculator.name} description={calculator.description} />
      <ToolSection calculator={<GravelCalculator />} guideTitle="Plan volume before ordering stone." guideBody="Gravel projects are easier when you estimate both cubic yards and tons. Depth, compaction, and gravel type can all change the final order." />
      <Explanation title="How gravel quantity is calculated" body="The calculator multiplies length by width by gravel depth. Depth is converted from inches to feet. Cubic yards are cubic feet divided by 27, then tons are estimated from the selected gravel density." example="For a 12 by 8 foot area at 4 inches deep, the estimate is 32 cubic feet, or 1.19 cubic yards. Standard gravel is about 1.66 tons." />
      <FaqSection title="Gravel calculator questions" />
      <ToolNextSteps toolSlug={calculator.slug} />
      <RelatedTools currentSlug={calculator.slug} />
    </>
  );
}

function ToolHero({ calculatorName, description }: { calculatorName: string; description: string }) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
      <Container><div className="max-w-3xl"><Link href="/tools" className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20">Tools</Link><h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{calculatorName}</h1><p className="mt-5 text-lg leading-8 text-muted">{description}</p></div></Container>
    </section>
  );
}

function ToolSection({ calculator, guideTitle, guideBody }: { calculator: ReactNode; guideTitle: string; guideBody: string }) {
  return (
    <section className="py-12 sm:py-16"><Container><div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">{calculator}<aside className="rounded-3xl border border-line bg-surface p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Quick guide</p><h2 className="mt-3 text-2xl font-semibold text-ink">{guideTitle}</h2><p className="mt-4 leading-7 text-muted">{guideBody}</p></aside></div></Container></section>
  );
}

function Explanation({ title, body, example }: { title: string; body: string; example: string }) {
  return (
    <section className="border-t border-line py-12 sm:py-16"><Container className="grid gap-12 lg:grid-cols-[0.75fr_1fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Explanation</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2></div><div className="space-y-8 text-muted"><div><h3 className="text-xl font-semibold text-ink">How the calculation works</h3><p className="mt-3 leading-8">{body}</p></div><div><h3 className="text-xl font-semibold text-ink">Example calculation</h3><p className="mt-3 leading-8">{example}</p></div></div></Container></section>
  );
}

function FaqSection({ title }: { title: string }) {
  return (
    <section className="border-t border-line bg-surface py-12 sm:py-16"><Container><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2><div className="mt-8 grid gap-4">{calculator.faqs.map((faq) => (<details key={faq.question} className="rounded-2xl border border-line bg-white p-5"><summary className="cursor-pointer text-lg font-semibold text-ink">{faq.question}</summary><p className="mt-3 leading-7 text-muted">{faq.answer}</p></details>))}</div></Container></section>
  );
}
