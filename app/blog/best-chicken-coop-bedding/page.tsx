import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["best-chicken-coop-bedding"];
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

export default function BestChickenCoopBeddingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Good chicken coop bedding should help manage moisture, reduce odor, cushion the floor, and be easy to refresh. Common options include pine shavings, straw, hemp, sand, and deep litter systems."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Calculate coop size",
        }}
        secondaryTool={{
          href: "/blog/chicken-coop-cleaning-schedule",
          label: "Read cleaning schedule",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Bedding is moisture management
          </h2>
          <p className="mt-4 leading-8">
            The best bedding is not only soft. It helps keep the coop dry,
            reduces smell, and makes cleaning more manageable. If bedding stays
            wet, the issue may be ventilation, leaks, crowding, or waterer
            placement.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Common bedding options
          </h2>
          <p className="mt-4 leading-8">
            Pine shavings are widely used and easy to refresh. Straw can be
            affordable but may mat down. Hemp can be absorbent but often costs
            more. Sand can be easy to sift in dry setups, but it must be managed
            carefully in wet conditions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Match bedding to your cleaning style
          </h2>
          <p className="mt-4 leading-8">
            If you want quick weekly refreshes, choose a bedding that is easy to
            remove and replace. If you use deep litter, plan for more material,
            good ventilation, and careful moisture control.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Watch for warning signs
          </h2>
          <p className="mt-4 leading-8">
            Strong ammonia smell, damp corners, flies, mold, or bedding that
            compacts into a wet layer are signs that the system needs adjustment.
            Bedding works best as part of the whole coop design.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
