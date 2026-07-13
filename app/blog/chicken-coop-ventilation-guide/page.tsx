import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-coop-ventilation-guide"];
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

export default function ChickenCoopVentilationGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Good coop ventilation lets moist air escape without putting a cold draft directly on roosting chickens. High vents, protected openings, and dry bedding matter more than complicated hardware."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Plan coop size",
        }}
        secondaryTool={{
          href: "/blog/how-big-should-a-chicken-coop-be",
          label: "Read coop size guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Ventilation is not the same as drafts
          </h2>
          <p className="mt-4 leading-8">
            Ventilation moves stale, humid air out of the coop. Drafts blow
            directly across chickens while they sleep. A good coop design gives
            warm moist air a way to rise and leave without placing strong air
            movement at roost height.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Put most vent area high
          </h2>
          <p className="mt-4 leading-8">
            High wall vents, ridge vents, or protected openings near the roof
            line help moisture escape. Lower openings can help with fresh air,
            but they should be managed so birds are not sitting in a direct
            winter draft.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Protect every opening
          </h2>
          <p className="mt-4 leading-8">
            Ventilation openings still need security. Use sturdy hardware cloth
            over vents and windows, attach it firmly, and avoid gaps that could
            let pests or predators reach the flock.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Watch for moisture clues
          </h2>
          <p className="mt-4 leading-8">
            Condensation, strong ammonia smell, damp bedding, or frost inside
            the coop can all point to poor airflow. Cleaning helps, but if the
            coop keeps getting wet inside, the ventilation plan probably needs
            more attention.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
