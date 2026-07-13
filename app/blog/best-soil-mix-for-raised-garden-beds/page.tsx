import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["best-soil-mix-for-raised-garden-beds"];
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

export default function BestSoilMixForRaisedGardenBedsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A practical raised bed soil mix should balance drainage, moisture retention, nutrients, and structure. Many gardeners combine quality topsoil, compost, and an aeration material rather than filling the bed with only one product."
        primaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Calculate soil amount",
        }}
        secondaryTool={{
          href: "/blog/raised-garden-bed-depth-guide",
          label: "Read depth guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Avoid using only one ingredient
          </h2>
          <p className="mt-4 leading-8">
            A raised bed filled with only compost can settle heavily. A bed
            filled with only dense topsoil may drain poorly. A balanced mix
            gives roots nutrients, air, moisture, and structure across the whole
            growing season.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Think in three roles
          </h2>
          <p className="mt-4 leading-8">
            Topsoil or garden soil gives mineral structure. Compost adds organic
            matter and nutrients. Aeration materials such as coarse composted
            bark, perlite, or similar amendments can improve drainage and root
            oxygen when used appropriately.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Match mix to your climate
          </h2>
          <p className="mt-4 leading-8">
            Hot, dry climates may need more moisture retention. Wet climates may
            need better drainage. The best mix is not just a recipe; it is a
            match between your plants, bed depth, watering habits, and local
            weather.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Calculate before buying
          </h2>
          <p className="mt-4 leading-8">
            Soil mixes are bulky. Before buying bags or scheduling bulk
            delivery, calculate the bed volume in cubic feet or cubic yards.
            This keeps the project budget realistic and avoids hauling far more
            material than you need.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
