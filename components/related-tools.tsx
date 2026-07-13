import { Container } from "@/components/container";
import { ToolCard } from "@/components/tool-card";
import { calculators } from "@/lib/calculators";

type RelatedToolsProps = {
  currentSlug: string;
};

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const relatedTools = calculators
    .filter((calculator) => calculator.slug !== currentSlug)
    .slice(0, 3);

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
