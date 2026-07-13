import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["shed-foundation-cost-guide"];
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

export default function ShedFoundationCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Shed foundation cost depends on size, ground slope, drainage, soil conditions, and foundation type. Gravel pads, blocks, piers, and concrete slabs can all work, but they fit different budgets and shed designs."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed budget",
        }}
        secondaryTool={{
          href: "/blog/how-much-does-it-cost-to-build-a-shed",
          label: "Read shed cost guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Foundation choice affects the whole project
          </h2>
          <p className="mt-4 leading-8">
            A shed foundation supports the structure, manages moisture, and
            helps keep doors and walls aligned. Choosing only the cheapest base
            can create problems if the site is wet, uneven, or supporting a
            heavy shed.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Common foundation options
          </h2>
          <p className="mt-4 leading-8">
            Small sheds often use skids, deck blocks, or gravel pads. Larger or
            more permanent sheds may use concrete piers or a slab. Gravel helps
            with drainage, while concrete can add strength and permanence but
            usually increases cost and planning complexity.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Site prep can be the hidden cost
          </h2>
          <p className="mt-4 leading-8">
            Clearing, leveling, compacting, drainage work, gravel delivery, and
            access limitations can all affect the real foundation budget. A
            simple foundation on a flat, dry site can become more expensive on a
            sloped or poorly draining yard.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Match foundation to shed use
          </h2>
          <p className="mt-4 leading-8">
            A light garden storage shed may not need the same base as a workshop
            filled with tools. Think about weight, permanence, local rules, and
            moisture before deciding where to save money.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
