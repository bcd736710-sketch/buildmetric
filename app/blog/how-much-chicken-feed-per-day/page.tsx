import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-much-chicken-feed-per-day"];
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

export default function HowMuchChickenFeedPerDayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A common planning estimate for an adult laying hen is about 0.25 pounds of feed per day. Chicks and growing birds usually eat less, while season, breed, and forage access can change the real number."
        primaryTool={{
          href: "/tools/chicken-feed-calculator",
          label: "Use feed calculator",
        }}
        secondaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Plan coop size",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Daily feed estimate
          </h2>
          <p className="mt-4 leading-8">
            For simple budgeting, many backyard keepers start with about 0.25
            pounds of feed per adult laying hen per day. That means 6 adult hens
            may use about 1.5 pounds per day, or around 45 pounds in a 30-day
            month.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Feed needs change by age
          </h2>
          <p className="mt-4 leading-8">
            Chicks eat less than adult chickens, and growing birds often sit
            between the two. If your flock includes mixed ages, estimate each
            group separately or use the calculator more than once.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            What affects feed use?
          </h2>
          <p className="mt-4 leading-8">
            Breed size, laying activity, weather, spilled feed, feeder design,
            and access to forage can all change real feed use. Treat any online
            estimate as a planning baseline, then adjust after watching your
            flock for a few weeks.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Simple buying example
          </h2>
          <p className="mt-4 leading-8">
            If 6 adult hens use about 45 pounds per month, one 50-pound bag may
            cover roughly a month under normal conditions. Buying a little ahead
            can prevent last-minute feed runs, but store feed somewhere dry and
            protected.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
