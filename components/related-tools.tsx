import { Container } from "@/components/container";
import { ToolCard } from "@/components/tool-card";
import { calculators, type CalculatorSummary } from "@/lib/calculators";

type RelatedToolsProps = {
  currentSlug: string;
};

const relatedToolSlugsByTool: Record<string, string[]> = {
  "chicken-coop-size-calculator": [
    "chicken-run-size-calculator",
    "chicken-feed-calculator",
    "shed-cost-calculator",
  ],
  "chicken-run-size-calculator": [
    "chicken-coop-size-calculator",
    "chicken-feed-calculator",
    "fence-cost-calculator",
  ],
  "chicken-feed-calculator": [
    "chicken-coop-size-calculator",
    "chicken-run-size-calculator",
    "raised-garden-bed-soil-calculator",
  ],
  "raised-garden-bed-soil-calculator": [
    "mulch-calculator",
    "gravel-calculator",
    "paint-calculator",
  ],
  "shed-cost-calculator": [
    "gravel-calculator",
    "concrete-slab-calculator",
    "fence-cost-calculator",
  ],
  "mulch-calculator": [
    "raised-garden-bed-soil-calculator",
    "gravel-calculator",
    "paint-calculator",
  ],
  "gravel-calculator": [
    "shed-cost-calculator",
    "concrete-slab-calculator",
    "mulch-calculator",
  ],
  "fence-cost-calculator": [
    "gravel-calculator",
    "shed-cost-calculator",
    "concrete-slab-calculator",
  ],
  "concrete-slab-calculator": [
    "gravel-calculator",
    "shed-cost-calculator",
    "fence-cost-calculator",
  ],
  "paint-calculator": [
    "raised-garden-bed-soil-calculator",
    "mulch-calculator",
    "fence-cost-calculator",
  ],
};

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const preferredSlugs = relatedToolSlugsByTool[currentSlug] ?? [];
  const preferredTools = preferredSlugs
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((tool): tool is CalculatorSummary => Boolean(tool));
  const fallbackTools = calculators.filter(
    (calculator) =>
      calculator.slug !== currentSlug &&
      !preferredSlugs.includes(calculator.slug),
  );
  const relatedTools = [...preferredTools, ...fallbackTools].slice(0, 3);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Related tools
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Keep planning the next part.
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {relatedTools.map((calculator) => (
            <ToolCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </Container>
    </section>
  );
}
