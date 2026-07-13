import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["diy-shed-materials-list"];
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

export default function DiyShedMaterialsListPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A basic DIY shed materials list usually includes foundation materials, floor framing, wall framing, roof framing, sheathing, siding, roofing, trim, doors, hardware, fasteners, and exterior finish."
        primaryTool={{
          href: "/tools/shed-cost-calculator",
          label: "Estimate shed cost",
        }}
        secondaryTool={{
          href: "/blog/how-much-does-it-cost-to-build-a-shed",
          label: "Read shed cost guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with the shed size
          </h2>
          <p className="mt-4 leading-8">
            A materials list only makes sense after you know the footprint. The
            difference between an 8 by 10 shed and a 10 by 12 shed affects floor
            framing, wall framing, roof area, siding, and roofing. Estimate the
            square footage first, then build the list around that size.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Core material categories
          </h2>
          <p className="mt-4 leading-8">
            Most shed plans include foundation materials, pressure-treated floor
            framing, wall studs, roof rafters or trusses, floor sheathing, wall
            sheathing, siding, roofing, trim boards, door materials, hinges,
            latches, nails, screws, flashing, caulk, primer, and paint or stain.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Add finish and storage details
          </h2>
          <p className="mt-4 leading-8">
            Shelving, pegboard, windows, vents, ramps, gutters, and upgraded
            doors can all change the material list. Decide whether your shed is
            simple storage or a more finished backyard workspace before buying.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Keep a small overage
          </h2>
          <p className="mt-4 leading-8">
            Cut mistakes, damaged boards, and layout adjustments happen. A small
            materials buffer helps avoid extra trips and keeps the project
            moving, especially for fasteners, trim, sheathing, and paint.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
