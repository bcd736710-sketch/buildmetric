import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-run-flooring-ideas"];
const pageUrl = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${post.title} | BuildMetric`,
    description: post.description,
    url: pageUrl,
    type: "article",
    publishedTime: post.publishedAt,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  author: { "@type": "Organization", name: "BuildMetric" },
  publisher: { "@type": "Organization", name: "BuildMetric" },
  mainEntityOfPage: `${siteConfig.url}${pageUrl}`,
};

export default function ChickenRunFlooringIdeasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Good chicken run flooring drains well, gives chickens something to scratch through, and stays manageable after rain. Common options include bare soil, sand, wood chips, gravel bases, and deep litter blends."
        primaryTool={{
          href: "/tools/chicken-run-size-calculator",
          label: "Calculate run size",
        }}
        secondaryTool={{
          href: "/blog/how-much-space-does-a-chicken-need",
          label: "Read space guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with drainage
          </h2>
          <p className="mt-4 leading-8">
            The best run flooring depends on your yard, but drainage comes
            first. A run that stays wet becomes harder to clean and less pleasant
            for the flock. If water collects after rain, solve grading or base
            drainage before choosing a surface material.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Bare soil and grass
          </h2>
          <p className="mt-4 leading-8">
            Bare soil is simple and inexpensive, but chickens can quickly turn
            grass into dirt in a permanent run. It works best where the run is
            large enough, rotated occasionally, or refreshed with organic
            material as the surface breaks down.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Sand, chips, and deep litter
          </h2>
          <p className="mt-4 leading-8">
            Sand can drain well when installed correctly, but it may need regular
            sifting. Wood chips and deep litter materials can create a softer,
            scratch-friendly surface. In wet climates, organic materials may
            need topping up more often.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Avoid slippery hard surfaces
          </h2>
          <p className="mt-4 leading-8">
            Smooth concrete or slick pavers are easy to hose down but can be
            harsh if they are the only surface. If you use hardscape for part of
            the run, add softer scratch areas and bedding so the birds have a
            more natural surface during the day.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
