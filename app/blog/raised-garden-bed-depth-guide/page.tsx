import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["raised-garden-bed-depth-guide"];
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

export default function RaisedGardenBedDepthGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A 10 to 12 inch raised bed is a practical all-purpose depth for many backyard gardens. Shallow beds can work for herbs and greens, while root crops and poor native soil often benefit from more depth."
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
            Choose depth by what you grow
          </h2>
          <p className="mt-4 leading-8">
            Herbs and leafy greens can often grow in shallower beds, while
            tomatoes, peppers, and root crops usually benefit from more soil
            depth. If you want one flexible bed for mixed planting, start around
            10 to 12 inches.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Native soil still matters
          </h2>
          <p className="mt-4 leading-8">
            A raised bed placed over healthy, loosened soil can act deeper than
            the lumber height suggests. A bed over compacted clay, gravel, or a
            hard surface may need more imported soil because plant roots cannot
            easily move downward.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Deeper beds need more soil
          </h2>
          <p className="mt-4 leading-8">
            Every extra inch of depth increases soil volume and cost. Before
            choosing a tall bed, calculate how many cubic feet, cubic yards, or
            bags you will need. The depth decision is both a growing decision
            and a budget decision.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">Plan for settling</h2>
          <p className="mt-4 leading-8">
            Soil mixes with compost and organic material often settle after
            watering. If you fill a bed exactly to the top on day one, expect it
            to drop. Keep a small amount of extra mix available for topping up.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
