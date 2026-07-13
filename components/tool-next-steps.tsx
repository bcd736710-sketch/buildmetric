import Link from "next/link";
import { Container } from "@/components/container";
import { getPostsForTool } from "@/lib/blog";
import { calculators } from "@/lib/calculators";

type ToolNextStepsProps = {
  toolSlug: string;
};

export function ToolNextSteps({ toolSlug }: ToolNextStepsProps) {
  const guides = getPostsForTool(toolSlug, 2);
  const relatedTools = calculators
    .filter((calculator) => calculator.slug !== toolSlug)
    .slice(0, 2);

  const cards = [
    guides[0]
      ? {
          eyebrow: "Read next",
          title: guides[0].title,
          description: guides[0].description,
          href: `/blog/${guides[0].slug}`,
          cta: "Open guide",
        }
      : null,
    relatedTools[0]
      ? {
          eyebrow: "Try next",
          title: relatedTools[0].name,
          description: relatedTools[0].description,
          href: `/tools/${relatedTools[0].slug}`,
          cta: "Open tool",
        }
      : null,
  ].filter((card): card is NonNullable<typeof card> => Boolean(card));

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Next steps
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Turn the estimate into a plan.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Use the result as a starting point, then check the supporting
              guide or continue with the next calculator before buying
              materials.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ink hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-ink transition group-hover:text-brand">
                  {card.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
