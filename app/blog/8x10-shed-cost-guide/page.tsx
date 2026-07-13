import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["8x10-shed-cost-guide"];
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

export default function EightByTenShedCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="An 8x10 shed is 80 square feet, so the budget is usually driven by floor framing, wall framing, siding, roofing, doors, foundation, and finish level. Small changes in materials can noticeably change the final cost."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed cost",
        }}
        secondaryTool={{
          href: "/blog/10x12-shed-cost-guide",
          label: "Compare 10x12 shed",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Why 8x10 is a popular size
          </h2>
          <p className="mt-4 leading-8">
            An 8x10 shed is large enough for garden tools, a mower, bikes, and
            seasonal storage, but still compact enough for many backyards. It is
            also a size where layout discipline matters because shelves, doors,
            and walking space can use up room quickly.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Main cost categories
          </h2>
          <p className="mt-4 leading-8">
            Plan for foundation materials, floor joists, subfloor, wall studs,
            sheathing, siding, roof framing, roofing, trim, door hardware,
            fasteners, vents, and exterior finish. A basic utility shed will be
            cheaper than a polished shed with windows, ramps, and upgraded
            doors.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Foundation choices matter
          </h2>
          <p className="mt-4 leading-8">
            A gravel pad or block foundation can keep a small shed budget
            manageable. A concrete slab can cost more, but it may be worth it
            for heavier storage or a more permanent structure. Check local
            requirements before choosing.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Keep the layout efficient
          </h2>
          <p className="mt-4 leading-8">
            For an 8x10 shed, place doors where they support the items you move
            most often. Wall shelving, hooks, and a clear center aisle can make a
            modest shed feel much larger without increasing the footprint.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
