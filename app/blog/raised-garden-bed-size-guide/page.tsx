import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["raised-garden-bed-size-guide"];
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

export default function RaisedGardenBedSizeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A 4-foot-wide raised bed is popular because most people can reach the center from both sides. Common sizes include 2x4, 3x6, 4x4, and 4x8 feet, depending on space, access, and soil budget."
        primaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Calculate soil volume",
        }}
        secondaryTool={{
          href: "/blog/how-many-bags-of-soil-for-a-4x8-raised-bed",
          label: "Read 4x8 soil guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Width affects reach
          </h2>
          <p className="mt-4 leading-8">
            Raised beds are easiest to use when you can reach the middle without
            stepping into the soil. Four feet wide is common for beds accessible
            from both sides. If a bed sits against a fence, a narrower 2-foot or
            3-foot width may be better.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Length affects materials and layout
          </h2>
          <p className="mt-4 leading-8">
            Longer beds create more planting area but need more lumber, soil,
            and support. A 4x8 bed is a practical standard because materials are
            easy to plan, but smaller beds can fit patios, narrow yards, and
            starter gardens.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Depth affects soil cost
          </h2>
          <p className="mt-4 leading-8">
            A deeper bed gives roots more room but increases the amount of soil
            you need to buy. Before building tall beds, estimate cubic feet and
            bag count so the soil budget does not surprise you.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Leave walking space
          </h2>
          <p className="mt-4 leading-8">
            Plan paths around the bed for watering, harvesting, and carrying
            soil or compost. A garden that looks efficient on paper can become
            awkward if there is no room to move comfortably between beds.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
