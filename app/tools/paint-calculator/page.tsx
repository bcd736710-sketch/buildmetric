import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { MaterialChecklist } from "@/components/material-checklist";
import { PaintCalculator } from "@/components/paint-calculator";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { buildToolJsonLd } from "@/lib/structured-data";

const calculator = calculatorBySlug["paint-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${calculator.seoTitle} | BuildMetric`, description: calculator.metaDescription, url: pageUrl, type: "website" },
};

const jsonLd = buildToolJsonLd(calculator, pageUrl);

export default function PaintCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolHero calculatorName={calculator.name} description={calculator.description} />
      <ToolSection calculator={<PaintCalculator />} guideTitle="Estimate gallons before you shop." guideBody="Paint needs depend on wall area, coverage, coats, surface texture, and color change. Use this as a practical first estimate before checking product labels." />
      <Explanation title="How paint quantity is calculated" body="The calculator multiplies paintable wall area by the number of coats, then divides by the selected coverage per gallon. Gallons to buy are rounded up." example="For 400 square feet of wall area with two coats at 350 square feet per gallon, the estimate is 2.29 gallons, so plan to buy 3 gallons." />
      <PaintBuyingGuide />
      <MaterialChecklist toolSlug={calculator.slug} />
      <FaqSection title="Paint calculator questions" />
      <ToolNextSteps toolSlug={calculator.slug} />
      <RelatedGuides toolSlug={calculator.slug} />
      <RelatedTools currentSlug={calculator.slug} />
    </>
  );
}

function ToolHero({ calculatorName, description }: { calculatorName: string; description: string }) {
  return <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20"><Container><div className="max-w-3xl"><Link href="/tools" className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20">Tools</Link><h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{calculatorName}</h1><p className="mt-5 text-lg leading-8 text-muted">{description}</p></div></Container></section>;
}

function ToolSection({ calculator, guideTitle, guideBody }: { calculator: ReactNode; guideTitle: string; guideBody: string }) {
  return <section className="py-12 sm:py-16"><Container><div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">{calculator}<aside className="rounded-3xl border border-line bg-surface p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Quick guide</p><h2 className="mt-3 text-2xl font-semibold text-ink">{guideTitle}</h2><p className="mt-4 leading-7 text-muted">{guideBody}</p></aside></div></Container></section>;
}

function Explanation({ title, body, example }: { title: string; body: string; example: string }) {
  return <section className="border-t border-line py-12 sm:py-16"><Container className="grid gap-12 lg:grid-cols-[0.75fr_1fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Explanation</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2></div><div className="space-y-8 text-muted"><div><h3 className="text-xl font-semibold text-ink">How the calculation works</h3><p className="mt-3 leading-8">{body}</p></div><div><h3 className="text-xl font-semibold text-ink">Example calculation</h3><p className="mt-3 leading-8">{example}</p></div></div></Container></section>;
}

function PaintBuyingGuide() {
  const guides = [
    {
      href: "/blog/paint-primer-guide",
      title: "Check whether primer belongs in the estimate",
      body: "Primer can change both the shopping list and the final finish, especially on patches, stains, bare drywall, or strong color changes.",
    },
    {
      href: "/blog/interior-vs-exterior-paint-guide",
      title: "Choose the right paint type before comparing gallons",
      body: "Interior and exterior paint are built for different conditions, so match the product to the surface before relying on coverage numbers.",
    },
    {
      href: "/blog/paint-tools-and-materials-checklist",
      title: "Build the full materials list",
      body: "Rollers, brushes, tape, trays, drop cloths, patching supplies, and cleanup items often matter as much as the paint itself.",
    },
    {
      href: "/blog/paint-coverage-guide",
      title: "Use product coverage carefully",
      body: "Coverage per gallon changes with texture, sheen, color change, primer, and wall condition.",
    },
  ];

  return (
    <section className="border-t border-line py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Before you buy
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Turn gallons into a practical paint shopping plan.
          </h2>
          <p className="mt-4 leading-8 text-muted">
            A gallon estimate is the starting point. Primer, paint type, surface
            condition, tools, and room details can all change what belongs in
            the cart.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-3xl border border-line bg-surface p-6 transition hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              <h3 className="text-xl font-semibold text-ink">{guide.title}</h3>
              <p className="mt-3 leading-7 text-muted">{guide.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-ink">
                Read guide
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection({ title }: { title: string }) {
  return <section className="border-t border-line bg-surface py-12 sm:py-16"><Container><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2><div className="mt-8 grid gap-4">{calculator.faqs.map((faq) => <details key={faq.question} className="rounded-2xl border border-line bg-white p-5"><summary className="cursor-pointer text-lg font-semibold text-ink">{faq.question}</summary><p className="mt-3 leading-7 text-muted">{faq.answer}</p></details>)}</div></Container></section>;
}
