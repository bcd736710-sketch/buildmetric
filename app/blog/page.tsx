import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import { blogCategories, blogPosts } from "@/lib/blog";

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
          <div className="grid gap-4 sm:grid-cols-3">
            {blogCategories.map((category) => (
              <a
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
              </a>
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
