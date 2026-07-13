import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-many-bags-of-soil-for-a-4x8-raised-bed"];
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

export default function HowManyBagsOfSoilForA4x8RaisedBedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A 4x8 raised bed needs about 16 cubic feet of soil at 6 inches deep, 21.3 cubic feet at 8 inches, 26.7 cubic feet at 10 inches, and 32 cubic feet at 12 inches. Divide by your bag size to estimate bags."
        primaryTool={{
          href: "/tools/raised-garden-bed-soil-calculator",
          label: "Use soil calculator",
        }}
        secondaryTool={{
          href: "/blog/best-soil-mix-for-raised-garden-beds",
          label: "Read soil mix guide",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            A 4x8 bed is 32 square feet
          </h2>
          <p className="mt-4 leading-8">
            The footprint is simple: 4 feet times 8 feet equals 32 square feet.
            To calculate soil volume, multiply that area by the fill depth in
            feet. Six inches is 0.5 feet, 12 inches is 1 foot, and other depths
            fall between those values.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Common depth examples
          </h2>
          <div className="mt-5 overflow-hidden rounded-3xl border border-line">
            <table className="w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th className="p-4 font-semibold">Depth</th>
                  <th className="p-4 font-semibold">Soil volume</th>
                  <th className="p-4 font-semibold">1.5 cu ft bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="p-4">6 inches</td>
                  <td className="p-4">16 cu ft</td>
                  <td className="p-4">11 bags</td>
                </tr>
                <tr>
                  <td className="p-4">8 inches</td>
                  <td className="p-4">21.3 cu ft</td>
                  <td className="p-4">15 bags</td>
                </tr>
                <tr>
                  <td className="p-4">10 inches</td>
                  <td className="p-4">26.7 cu ft</td>
                  <td className="p-4">18 bags</td>
                </tr>
                <tr>
                  <td className="p-4">12 inches</td>
                  <td className="p-4">32 cu ft</td>
                  <td className="p-4">22 bags</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Bag size changes the count
          </h2>
          <p className="mt-4 leading-8">
            Not every bag contains 1.5 cubic feet. Some are 1 cubic foot, 2
            cubic feet, or measured differently. Always divide total cubic feet
            by the actual bag volume printed on the product label, then round up.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Buy a little extra for settling
          </h2>
          <p className="mt-4 leading-8">
            Raised bed soil often settles after watering. If your calculation is
            close to a full bag count, round up and keep extra mix for topping
            off the bed after the first few weeks.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
