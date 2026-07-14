import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import { blogCategories, blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";

const categoryLinks: Record<
  string,
  { href: string; label: string; description: string }
> = {
  "Backyard Chickens": {
    href: "/backyard-chickens",
    label: "Open chicken hub",
    description: "Coop, run, feed, bedding, and predator planning.",
  },
  "Garden DIY": {
    href: "/garden-diy",
    label: "Open garden hub",
    description: "Raised beds, soil, mulch, and garden materials.",
  },
  "Backyard DIY": {
    href: "/backyard-diy",
    label: "Open backyard hub",
    description: "Sheds, fences, gravel, concrete, and outdoor projects.",
  },
  "Home Improvement": {
    href: "/home-improvement",
    label: "Open home hub",
    description: "Paint coverage and common homeowner estimates.",
  },
};

export const metadata: Metadata = {
  title: "DIY Planning Guides",
  description:
    "Practical DIY planning guides for backyard projects, chicken coops, garden beds, sheds, and home improvement calculators.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "DIY Planning Guides | BuildMetric",
    description:
      "Practical DIY planning guides for backyard projects and home improvement planning.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const latestPosts = blogPosts.slice(-6).reverse();
  const calculatorsWithGuides = calculators
    .map((calculator) => ({
      calculator,
      guideCount: blogPosts.filter((post) =>
        post.relatedTools.includes(calculator.slug),
      ).length,
    }))
    .filter((item) => item.guideCount > 0)
    .sort((a, b) => b.guideCount - a.guideCount)
    .slice(0, 6);

  return (
    <>
      <section className="border-b border-line bg-[radial-gradient(circle_at_75%_20%,rgba(37,111,90,0.13),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)] py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Guides
              </p>
              <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
                Practical DIY planning advice.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">
                Clear, focused articles that support BuildMetric calculators and
                help homeowners plan projects with fewer surprises.
              </p>
            </div>
            <div className="rounded-[2rem] border border-line bg-white/80 p-5 shadow-soft backdrop-blur">
              <div className="grid grid-cols-2 gap-3">
                {["Measure", "Estimate", "Plan", "Build"].map((step) => (
                  <div
                    key={step}
                    className="rounded-3xl border border-line bg-surface p-4 text-center text-sm font-semibold text-ink"
                  >
                    {step}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                A lightweight content library built around real DIY planning
                questions.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Browse by project
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Choose a planning topic.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-muted">
              Start with the category closest to your project, then move between
              guides and calculators as your estimate gets clearer.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {blogCategories.map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase().replaceAll(" ", "-")}`}
                className="rounded-3xl border border-line bg-white p-5 text-sm font-semibold text-ink shadow-sm transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                {category}
                <span className="mt-2 block text-sm font-medium text-muted">
                  {
                    blogPosts.filter((post) => post.category === category)
                      .length
                  }{" "}
                  guides
                </span>
                <span className="mt-3 block text-xs font-medium leading-5 text-muted">
                  {categoryLinks[category]?.description}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Calculator clusters
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Jump from guides to the tools they support.
              </h2>
            </div>
            <Link
              href="/tools"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              View all calculators
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {calculatorsWithGuides.map(({ calculator, guideCount }) => (
              <Link
                key={calculator.slug}
                href={`/tools/${calculator.slug}`}
                className="rounded-3xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-ink hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  {calculator.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">
                  {calculator.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {guideCount} related guides
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Latest guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                New planning pages to start with.
              </h2>
            </div>
            <Link
              href="/tools"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Browse calculators
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 sm:py-16">
        <Container className="space-y-14">
          {blogCategories.map((category) => {
            const posts = blogPosts.filter((post) => post.category === category);

            return (
              <div
                key={category}
                id={category.toLowerCase().replaceAll(" ", "-")}
                className="scroll-mt-24"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                      {category}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-ink">
                      {posts.length} focused guides
                    </h2>
                  </div>
                  {categoryLinks[category] ? (
                    <Link
                      href={categoryLinks[category].href}
                      className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                    >
                      {categoryLinks[category].label}
                    </Link>
                  ) : null}
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {posts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
