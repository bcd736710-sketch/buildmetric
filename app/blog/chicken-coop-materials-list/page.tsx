import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-coop-materials-list"];
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

export default function ChickenCoopMaterialsListPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A basic chicken coop materials list usually includes framing lumber, siding, roofing, floor material, hardware cloth, hinges, latches, screws, exterior finish, roost bars, nesting boxes, and bedding."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Calculate coop size",
        }}
        secondaryTool={{
          href: "/blog/how-much-does-it-cost-to-build-a-chicken-coop",
          label: "Read coop cost guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with the coop size
          </h2>
          <p className="mt-4 leading-8">
            Your material list depends on the number of chickens, the coop
            footprint, and whether the design is a compact standard coop or a
            walk-in structure. Estimate the required indoor space first, then
            choose dimensions that are practical to frame and clean.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Core exterior materials
          </h2>
          <p className="mt-4 leading-8">
            Most DIY coops need framing lumber, exterior siding or plywood,
            roofing material, trim, fasteners, exterior paint or stain, and
            weather-resistant flashing or sealant where water may enter.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Security materials matter
          </h2>
          <p className="mt-4 leading-8">
            Hardware cloth, strong hinges, secure latches, predator-resistant
            vents, and a protected run connection are not optional details. They
            are part of the real coop budget and should be planned before buying
            lumber.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Interior materials
          </h2>
          <p className="mt-4 leading-8">
            Inside the coop, plan roost bars, nesting boxes, bedding, a cleanout
            door, feeder placement, and water access. Simple interiors are often
            easier to keep clean than complicated layouts with many hard-to-reach
            corners.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
