import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["predator-proof-chicken-run-guide"];
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

export default function PredatorProofChickenRunGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A safer chicken run usually combines strong mesh, buried or outward-facing apron protection, secure latches, tight corners, covered gaps, and a layout that is easy to inspect regularly."
        primaryTool={{
          href: "/tools/chicken-run-size-calculator",
          label: "Calculate run size",
        }}
        secondaryTool={{
          href: "/blog/chicken-run-flooring-ideas",
          label: "Plan run flooring",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with strong mesh
          </h2>
          <p className="mt-4 leading-8">
            A predator-resistant run depends on more than ordinary fencing.
            Hardware cloth is commonly used because it is stronger and has
            smaller openings than many lightweight wire products. Choose mesh
            based on the animals common in your area.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Protect the bottom edge
          </h2>
          <p className="mt-4 leading-8">
            Many run failures happen near the ground. A buried barrier or an
            outward-facing apron can help reduce digging at the perimeter. Pay
            special attention to corners, gates, and any place where the ground
            is uneven.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Secure the top and doors
          </h2>
          <p className="mt-4 leading-8">
            A roof or covered section can protect against climbing animals and
            aerial threats, while good latches keep gates from becoming the weak
            point. Use hardware that closes firmly and is easy for you to check
            during daily chores.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Make inspection easy
          </h2>
          <p className="mt-4 leading-8">
            The best safety detail is one you can maintain. Keep the perimeter
            visible, trim heavy growth around the run, and inspect mesh,
            fasteners, hinges, and ground edges regularly so small problems do
            not become expensive rebuilds.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
