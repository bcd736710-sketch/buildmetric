import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { blogPosts } from "@/lib/blog";

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
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
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
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-line bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  {post.category}
                </p>
                <h2 className="mt-5 text-3xl font-semibold text-ink">
                  {post.title}
                </h2>
                <p className="mt-4 leading-8 text-muted">{post.description}</p>
                <p className="mt-8 text-sm font-semibold text-ink">
                  {post.readingTime}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
