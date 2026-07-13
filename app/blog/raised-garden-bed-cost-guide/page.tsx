import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["raised-garden-bed-cost-guide"];
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

export default function RaisedGardenBedCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Raised garden bed cost usually comes from the frame, soil volume, compost or amendments, hardware, delivery, and optional features like trellises, covers, liners, or irrigation."
        primaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Calculate soil volume",
        }}
        secondaryTool={{
          href: "/blog/how-much-soil-do-i-need-for-a-raised-garden-bed",
          label: "Read soil guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Soil is often the hidden cost
          </h2>
          <p className="mt-4 leading-8">
            Many homeowners price lumber first, then get surprised by soil. A
            deep 4x8 bed can require a meaningful amount of material. Calculate
            cubic feet before buying bags or arranging bulk delivery.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Frame material changes the budget
          </h2>
          <p className="mt-4 leading-8">
            Wood is common and easy to work with, but cost depends on species,
            thickness, and local availability. Metal beds, composite kits, and
            stone beds may cost more upfront, but they can reduce maintenance or
            create a more finished look.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Hardware and extras
          </h2>
          <p className="mt-4 leading-8">
            Screws, corner brackets, landscape fabric, mulch, trellises, hoops,
            covers, drip irrigation, and delivery fees can all affect the final
            price. Decide which extras are needed now and which can wait until
            after planting.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with one good bed
          </h2>
          <p className="mt-4 leading-8">
            For a first garden, one well-built bed with good soil is usually
            better than several underfilled beds. You can expand later once you
            know how much time, water, and harvest space you actually need.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
