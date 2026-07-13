import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-coop-layout-ideas-for-small-backyards"];
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

export default function ChickenCoopLayoutIdeasForSmallBackyardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="For a small backyard, keep the coop compact, make the run efficient, and prioritize easy access for cleaning. A simple rectangular layout is often better than a clever shape that wastes space."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Calculate coop size",
        }}
        secondaryTool={{
          href: "/tools/chicken-run-size-calculator",
          label: "Calculate run size",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with a simple footprint
          </h2>
          <p className="mt-4 leading-8">
            Small yards reward simple shapes. Rectangles are easier to frame,
            easier to roof, and easier to place along a fence or garden edge.
            Before choosing a style, estimate the indoor coop and outdoor run
            space your flock needs so the layout fits the birds first.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Put doors where daily care is easiest
          </h2>
          <p className="mt-4 leading-8">
            A compact coop can become frustrating if you cannot reach the feeder,
            waterer, nesting boxes, or bedding. Place cleanout access on the
            side with the best standing room, and avoid layouts that require you
            to crawl into the run for routine care.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Use vertical space carefully
          </h2>
          <p className="mt-4 leading-8">
            Raised coops can free up shaded run space underneath, which is
            useful in a small yard. Keep ramps gentle, leave enough headroom for
            birds below the coop, and make sure the raised section is still easy
            to inspect and clean.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Leave space around the structure
          </h2>
          <p className="mt-4 leading-8">
            Do not push every side tightly against a wall or fence. You need
            room to open doors, repair wire, clean bedding, and manage drainage.
            A few extra inches of service space can save a lot of frustration
            after the coop is built.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
