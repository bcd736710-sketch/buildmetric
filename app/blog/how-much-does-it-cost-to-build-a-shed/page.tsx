import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-much-does-it-cost-to-build-a-shed"];
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

export default function HowMuchDoesItCostToBuildAShedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="DIY shed cost is mainly driven by square footage, foundation, framing, siding, roofing, doors, windows, and finish level. Estimate the size first, then apply a cost range that matches your material choices."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Use shed cost calculator",
        }}
        secondaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Plan garden soil",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Square footage is the starting point
          </h2>
          <p className="mt-4 leading-8">
            Most shed estimates begin with length times width. A 10 by 12 foot
            shed is 120 square feet, while a 12 by 16 foot shed is 192 square
            feet. The larger shed is not just wider; it needs more framing,
            sheathing, roofing, flooring, and finish material.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Foundation choices affect cost
          </h2>
          <p className="mt-4 leading-8">
            Skids, gravel pads, deck blocks, concrete piers, and slabs can all
            make sense in different situations. The right base depends on shed
            size, site drainage, local requirements, and how permanent the
            structure will be.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Finish level changes the budget
          </h2>
          <p className="mt-4 leading-8">
            A basic storage shed with simple siding and one door is very
            different from a premium shed with windows, upgraded roofing,
            finished trim, shelves, electrical planning, or workshop features.
            Define the finish level before comparing costs.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Do not forget site-specific costs
          </h2>
          <p className="mt-4 leading-8">
            Delivery, tools, fasteners, paint, gravel, permits, and site prep
            are easy to miss in a first estimate. Keep a contingency amount in
            the budget so the project can absorb small surprises without
            stopping halfway.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
