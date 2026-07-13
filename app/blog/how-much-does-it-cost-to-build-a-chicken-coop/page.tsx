import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-much-does-it-cost-to-build-a-chicken-coop"];
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

export default function HowMuchDoesItCostToBuildAChickenCoopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Chicken coop cost depends mostly on size, materials, roofing, predator protection, and whether you reuse lumber or buy everything new. Estimate space first, then build a material list."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Estimate coop size",
        }}
        secondaryTool={{
          href: "/blog/how-big-should-a-chicken-coop-be",
          label: "Read coop size guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Size drives the budget
          </h2>
          <p className="mt-4 leading-8">
            A larger coop needs more framing, siding, roofing, hardware cloth,
            fasteners, and paint or finish. Before comparing designs, calculate
            the indoor coop space your flock needs. Oversizing a little can be
            useful, but building far larger than needed raises cost quickly.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Materials change the estimate
          </h2>
          <p className="mt-4 leading-8">
            New lumber, exterior plywood, metal roofing, quality hinges, and
            predator-resistant wire all add up. Reclaimed materials can lower
            costs, but only if they are sound, safe, and suitable for outdoor
            use.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Do not underbudget predator protection
          </h2>
          <p className="mt-4 leading-8">
            Hardware cloth, secure latches, buried skirts, and strong framing
            are not decorative extras. They are core parts of a backyard chicken
            project. A cheaper build that needs security upgrades later can end
            up costing more.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Build the estimate in layers
          </h2>
          <p className="mt-4 leading-8">
            Break the coop budget into foundation or base, framing, siding,
            roofing, wire, doors, hardware, finish, and interior features. This
            makes it easier to compare design choices and decide where premium
            materials matter most.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
