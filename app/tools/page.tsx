import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ToolCard } from "@/components/tool-card";
import { getPostsForTool } from "@/lib/blog";
import { calculators } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "DIY Calculators",
  description:
    "Browse BuildMetric's simple DIY calculators for backyard planning projects.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "DIY Calculators | BuildMetric",
    description:
      "Simple, accurate online calculators for backyard DIY planning.",
    url: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <>
      <section className="border-b border-line bg-[radial-gradient(circle_at_80%_12%,rgba(37,111,90,0.13),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Tools
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
                DIY calculators for clearer backyard planning.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">
                Start with practical estimates for your next backyard project.
                BuildMetric is growing one focused tool at a time.
              </p>
            </div>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Current library
              </p>
              <p className="mt-4 text-5xl font-semibold text-ink">
                {calculators.length}
              </p>
              <p className="mt-3 leading-7 text-muted">
                focused calculators for backyard, chicken, garden, and shed
                planning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {calculators.map((calculator) => (
              <ToolCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Guide clusters
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Learn around each calculator.
            </h2>
            <p className="mt-4 leading-8 text-muted">
              Each tool is supported by focused planning guides, so visitors can
              estimate a project and understand the decisions behind the number.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {calculators.map((calculator) => {
              const guides = getPostsForTool(calculator.slug, 5);

              return (
                <div
                  key={calculator.slug}
                  className="rounded-3xl border border-line bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    {calculator.name}
                  </p>
                  <div className="mt-5 grid gap-3">
                    {guides.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                      >
                        {post.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
