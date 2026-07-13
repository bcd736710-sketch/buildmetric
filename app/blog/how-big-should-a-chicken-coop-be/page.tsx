import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-big-should-a-chicken-coop-be"];
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

export default function HowBigShouldAChickenCoopBePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="A good starting point is 3 square feet per small chicken, 4 square feet per medium chicken, and 5 square feet per large chicken inside the coop. Then plan outdoor run space separately."
        primaryTool={{
          href: "/tools/chicken-coop-size-calculator",
          label: "Use coop calculator",
        }}
        secondaryTool={{
          href: "/tools/chicken-run-size-calculator",
          label: "Use run calculator",
        }}
      >
        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Start with flock size
          </h2>
          <p className="mt-4 leading-8">
            Coop size begins with the number of chickens you plan to keep. A
            small starter flock of 4 chickens needs a different layout than a
            flock of 10, even if both are backyard projects. Plan for the flock
            you expect to have within the next year, not only the birds you have
            today.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Match the coop to chicken size
          </h2>
          <p className="mt-4 leading-8">
            Smaller breeds can often use less indoor space, while larger breeds
            benefit from more room around roosts, nesting boxes, feeders, and
            doors. BuildMetric uses 3, 4, and 5 square feet per bird as a simple
            planning range for small, medium, and large chickens.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Example coop sizes
          </h2>
          <div className="mt-5 overflow-hidden rounded-3xl border border-line">
            <table className="w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th className="p-4 font-semibold">Flock</th>
                  <th className="p-4 font-semibold">Medium chickens</th>
                  <th className="p-4 font-semibold">Possible layout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="p-4">4 chickens</td>
                  <td className="p-4">16 sq ft</td>
                  <td className="p-4">4 ft by 4 ft</td>
                </tr>
                <tr>
                  <td className="p-4">6 chickens</td>
                  <td className="p-4">24 sq ft</td>
                  <td className="p-4">4 ft by 6 ft</td>
                </tr>
                <tr>
                  <td className="p-4">8 chickens</td>
                  <td className="p-4">32 sq ft</td>
                  <td className="p-4">4 ft by 8 ft</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Leave room for real coop features
          </h2>
          <p className="mt-4 leading-8">
            A coop is not just empty floor area. Nesting boxes, roost bars,
            feeders, waterers, cleanout doors, and storage can all affect the
            usable space. If your design includes extra built-in features, round
            up instead of cutting the size too close.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
