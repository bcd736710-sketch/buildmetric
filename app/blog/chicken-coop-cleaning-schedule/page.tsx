import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["chicken-coop-cleaning-schedule"];
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

export default function ChickenCoopCleaningSchedulePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A simple chicken coop cleaning schedule includes quick daily checks, weekly bedding refreshes, monthly deeper cleaning, and seasonal inspections for moisture, pests, ventilation, and repairs."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Plan coop space",
        }}
        secondaryTool={{
          href: "/blog/best-chicken-coop-bedding",
          label: "Read bedding guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">Daily checks</h2>
          <p className="mt-4 leading-8">
            Daily care does not need to be complicated. Check feed and water,
            collect eggs, look for wet bedding, notice odors, and make sure
            doors, latches, and run access are secure.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">Weekly refresh</h2>
          <p className="mt-4 leading-8">
            Once a week, remove obviously soiled bedding, scrape droppings from
            high-use areas, refresh nesting boxes, and check that ventilation is
            keeping the coop dry. A small weekly habit prevents larger cleaning
            problems later.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">Monthly cleaning</h2>
          <p className="mt-4 leading-8">
            A monthly deeper clean can include replacing more bedding, wiping
            surfaces, checking roost bars, clearing dust from vents, and looking
            for pests or water intrusion. Adjust the schedule based on flock
            size and weather.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Seasonal maintenance
          </h2>
          <p className="mt-4 leading-8">
            Before wet, hot, or cold seasons, inspect roofing, drainage,
            ventilation, door hardware, and predator protection. Seasonal checks
            help catch small issues before they become expensive coop repairs.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
