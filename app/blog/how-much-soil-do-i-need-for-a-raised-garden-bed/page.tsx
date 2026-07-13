import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-much-soil-do-i-need-for-a-raised-garden-bed"];
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

export default function HowMuchSoilDoINeedForARaisedGardenBedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Multiply bed length by width by soil depth. Convert depth from inches to feet first. Then convert cubic feet to bags or cubic yards depending on how you plan to buy soil."
        primaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Use soil calculator",
        }}
        secondaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed cost",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            The raised bed soil formula
          </h2>
          <p className="mt-4 leading-8">
            Soil volume is length times width times depth. The common mistake is
            mixing inches and feet. If your bed depth is measured in inches,
            divide it by 12 before multiplying by the bed length and width.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Example: 8 by 4 by 10 inches
          </h2>
          <p className="mt-4 leading-8">
            An 8 foot by 4 foot bed filled 10 inches deep needs about 26.7 cubic
            feet of soil. If each bag contains 1.5 cubic feet, that is about 18
            bags before adding a small buffer for settling.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Bags versus bulk soil
          </h2>
          <p className="mt-4 leading-8">
            Bagged soil is convenient for smaller beds and easier transport.
            Bulk soil can be more economical for larger projects, but delivery,
            access, and where the soil will be dumped can affect the real
            project cost.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Plan for settling
          </h2>
          <p className="mt-4 leading-8">
            Fresh soil often settles after watering and planting. Buying a
            little extra helps you top up the bed without making a second trip,
            especially for deeper beds or new mixes with compost.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
