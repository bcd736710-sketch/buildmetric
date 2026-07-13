import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-coop-door-size-guide"];
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

export default function ChickenCoopDoorSizeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A chicken pop door should be large enough for your biggest bird to pass through easily, while human access doors should be sized for cleaning, bedding changes, and equipment access."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Calculate coop size",
        }}
        secondaryTool={{
          href: "/blog/how-big-should-a-chicken-coop-be",
          label: "Read coop size guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Plan two kinds of doors
          </h2>
          <p className="mt-4 leading-8">
            Most coops need a chicken pop door and a larger human access door.
            The pop door is for daily movement between coop and run. The larger
            door is for cleaning, bedding, feeders, waterers, and repairs.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Size for the largest chicken
          </h2>
          <p className="mt-4 leading-8">
            A door that works for small breeds may feel tight for larger birds.
            Leave enough height and width for easy movement, especially if you
            plan to keep mixed breeds or heavier chickens later.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Cleaning access matters
          </h2>
          <p className="mt-4 leading-8">
            A beautiful coop can become frustrating if the access door is too
            small. Make sure you can reach corners, remove bedding, inspect
            roosts, and clean around nesting areas without awkward tools or
            repeated disassembly.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Keep doors secure
          </h2>
          <p className="mt-4 leading-8">
            Door size is only part of the design. Use sturdy hinges, latches
            that cannot be nudged open easily, and tight edges that do not leave
            gaps. A convenient door should still close firmly every night.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
