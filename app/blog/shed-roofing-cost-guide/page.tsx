import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["shed-roofing-cost-guide"];
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

export default function ShedRoofingCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Shed roofing cost depends mostly on roof area, material choice, slope, underlayment, drip edge, fasteners, and trim. Simple asphalt shingles are often affordable, while metal panels can cost more upfront but may last longer."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed cost",
        }}
        secondaryTool={{
          href: "/blog/diy-shed-materials-list",
          label: "View materials list",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with roof area
          </h2>
          <p className="mt-4 leading-8">
            Roofing cost is not based only on the shed footprint. Overhangs,
            roof pitch, and roof style all change the actual roof area. A gable
            roof on a 10x12 shed usually needs more material than a flat 10 by
            12 rectangle because each sloped side adds surface area.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Common shed roofing materials
          </h2>
          <p className="mt-4 leading-8">
            Asphalt shingles are familiar and easy to match with many homes.
            Metal panels can be durable and fast to install, but trim pieces and
            fasteners matter. Rolled roofing is simple for some utility sheds,
            but it is usually less premium and may not suit every roof slope.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Do not forget the small parts
          </h2>
          <p className="mt-4 leading-8">
            Underlayment, drip edge, ridge cap, flashing, sealant, nails,
            screws, and replacement blades can add up. These items are easy to
            miss when comparing only the headline price of shingles or metal
            panels.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            When to spend more
          </h2>
          <p className="mt-4 leading-8">
            A more durable roof can make sense if the shed stores expensive
            tools, sits under trees, or needs to match a finished backyard. For
            a basic storage shed, a simple roof installed carefully is often the
            better value than an overbuilt design.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
