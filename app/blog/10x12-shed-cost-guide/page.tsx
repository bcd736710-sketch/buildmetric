import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["10x12-shed-cost-guide"];
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

export default function TenByTwelveShedCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A 10x12 shed is 120 square feet. The final DIY cost depends on foundation, siding, roofing, doors, windows, and finish level, so start with square footage and then apply a realistic cost range."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Calculate shed cost",
        }}
        secondaryTool={{
          href: "/blog/diy-shed-materials-list",
          label: "View materials list",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Why 10x12 is a useful size
          </h2>
          <p className="mt-4 leading-8">
            A 10 by 12 foot shed offers 120 square feet of floor area, which is
            enough for garden tools, seasonal storage, bikes, or a compact
            workshop layout. It is large enough to be useful but still small
            enough for many backyard sites.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Main cost drivers
          </h2>
          <p className="mt-4 leading-8">
            The biggest variables are foundation type, floor framing, siding
            choice, roof material, door quality, windows, trim, and finish. A
            basic storage shed and a premium finished shed can have the same
            footprint but very different budgets.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Example planning estimate
          </h2>
          <p className="mt-4 leading-8">
            If you use a simple $45 per square foot planning estimate, a 120
            square foot shed would be about $5,400. A basic build may come in
            lower, while premium finishes, a stronger foundation, or added
            windows can push the budget higher.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Check local requirements
          </h2>
          <p className="mt-4 leading-8">
            Some areas have permit, setback, height, or foundation rules for
            sheds around this size. Check local requirements before buying
            materials so the design does not need expensive changes later.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
