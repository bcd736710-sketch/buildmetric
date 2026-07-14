import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { RelatedArticles } from "@/components/related-articles";
import type { BlogPost } from "@/lib/blog";
import { calculatorBySlug } from "@/lib/calculators";

const planningChecklists: Record<string, string[]> = {
  "Backyard Chickens": [
    "Confirm the flock size you are planning for now and the flock size you may want later.",
    "Check coop, run, feed, ventilation, cleaning, and predator-protection needs together.",
    "Measure the real yard space available before choosing a final layout.",
    "Use calculator results as a planning baseline, then adjust for climate, breed, and daily access.",
  ],
  "Garden DIY": [
    "Measure the actual bed length, width, and depth before buying materials.",
    "Compare bagged materials with bulk delivery if the project is larger than one small bed.",
    "Plan for settling, drainage, compost, mulch, and access around the bed.",
    "Use calculator results as a baseline, then adjust for plant type and local conditions.",
  ],
  "Backyard DIY": [
    "Confirm the project footprint, site access, and any local rules before buying materials.",
    "Estimate the core materials first, then add a buffer for hardware, delivery, tools, and waste.",
    "Check foundation, drainage, durability, and maintenance needs before choosing a final plan.",
    "Use calculator results as a starting budget, then compare with local material prices.",
  ],
};

type BlogArticleLayoutProps = {
  post: BlogPost;
  quickAnswer: string;
  primaryTool: {
    href: string;
    label: string;
  };
  secondaryTool?: {
    href: string;
    label: string;
  };
  children: ReactNode;
};

export function BlogArticleLayout({
  post,
  quickAnswer,
  primaryTool,
  secondaryTool,
  children,
}: BlogArticleLayoutProps) {
  const relatedCalculators = post.relatedTools
    .map((toolSlug) => calculatorBySlug[toolSlug])
    .filter(Boolean);
  const checklist =
    planningChecklists[post.category] ?? planningChecklists["Backyard DIY"];

  return (
    <article>
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Guides
            </Link>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {post.description}
            </p>
            <p className="mt-5 text-sm font-medium text-muted">
              {post.readingTime}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1fr]">
          <aside className="rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Quick answer
            </p>
            <p className="mt-4 leading-7 text-muted">{quickAnswer}</p>
            <div className="mt-6 grid gap-3">
              <Link
                href={primaryTool.href}
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                {primaryTool.label}
              </Link>
              {secondaryTool ? (
                <Link
                  href={secondaryTool.href}
                  className="rounded-full border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                  {secondaryTool.label}
                </Link>
              ) : null}
            </div>
          </aside>

          <div className="space-y-10 text-muted">
            {children}

            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Planning checklist
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Before you make the final plan
              </h2>
              <ul className="mt-5 space-y-4">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {relatedCalculators.length > 0 ? (
              <section>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  Related calculators
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">
                  Turn this guide into numbers.
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {relatedCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/tools/${calculator.slug}`}
                      className="rounded-3xl border border-line bg-surface p-5 transition hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                        {calculator.category}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-ink">
                        {calculator.name}
                      </h3>
                      <p className="mt-3 leading-7">
                        {calculator.description}
                      </p>
                      <span className="mt-5 inline-flex text-sm font-semibold text-ink">
                        Open calculator
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </section>

      <RelatedArticles post={post} />
    </article>
  );
}
