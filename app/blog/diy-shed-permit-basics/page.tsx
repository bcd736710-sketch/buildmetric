import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["diy-shed-permit-basics"];
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

export default function DiyShedPermitBasicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Shed permit rules vary by location. Before building, check size limits, setbacks, height restrictions, foundation rules, utility easements, HOA rules, and whether electrical work changes the permit requirement."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed cost",
        }}
        secondaryTool={{
          href: "/blog/10x12-shed-cost-guide",
          label: "Read 10x12 cost guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with local rules
          </h2>
          <p className="mt-4 leading-8">
            Shed permit requirements are local. A shed that is allowed without a
            permit in one city may require review in another. Check your city,
            county, or local building department before buying materials.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Size and height often matter
          </h2>
          <p className="mt-4 leading-8">
            Many rules depend on square footage, height, and whether the shed is
            permanent. Even if a small shed is exempt from a permit, it may
            still need to follow placement and setback rules.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Check setbacks and easements
          </h2>
          <p className="mt-4 leading-8">
            Setbacks control how close a shed can be to property lines, fences,
            buildings, or utilities. Easements can limit where structures are
            allowed even on your own lot.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Electrical work can change the project
          </h2>
          <p className="mt-4 leading-8">
            A simple storage shed and a powered workshop may be treated
            differently. If you plan lighting, outlets, heat, or tools, ask
            about electrical permits and inspections before finalizing the shed
            budget.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
