import type { Metadata } from "next";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const post = blogPostBySlug["how-much-space-does-a-chicken-need"];
const pageUrl = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: pageUrl,
  },
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
  author: {
    "@type": "Organization",
    name: "BuildMetric",
  },
  publisher: {
    "@type": "Organization",
    name: "BuildMetric",
  },
  mainEntityOfPage: `${siteConfig.url}${pageUrl}`,
};

export default function HowMuchSpaceDoesAChickenNeedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer="Plan about 3 to 5 square feet of indoor coop space per chicken and at least 10 square feet of outdoor run space per chicken. Larger breeds and crowded sites usually need more room."
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
            The simple space rule
          </h2>
          <p className="mt-4 leading-8">
            Backyard chicken planning starts with two numbers: indoor coop
            space and outdoor run space. The coop gives chickens a secure place
            to sleep and shelter. The run gives them space to move, scratch, and
            spend the day outside.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Recommended planning numbers
          </h2>
          <div className="mt-5 overflow-hidden rounded-3xl border border-line">
            <table className="w-full border-collapse bg-white text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th className="p-4 font-semibold">Chicken size</th>
                  <th className="p-4 font-semibold">Indoor coop</th>
                  <th className="p-4 font-semibold">Outdoor run</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="p-4">Small</td>
                  <td className="p-4">3 sq ft per chicken</td>
                  <td className="p-4">10 sq ft per chicken</td>
                </tr>
                <tr>
                  <td className="p-4">Medium</td>
                  <td className="p-4">4 sq ft per chicken</td>
                  <td className="p-4">10 sq ft per chicken</td>
                </tr>
                <tr>
                  <td className="p-4">Large</td>
                  <td className="p-4">5 sq ft per chicken</td>
                  <td className="p-4">10 sq ft per chicken</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            Example: 6 medium chickens
          </h2>
          <p className="mt-4 leading-8">
            For 6 medium chickens, plan about 24 square feet of indoor coop
            space and 60 square feet of outdoor run space. If your yard allows
            it, extra run space is often the easier upgrade because it reduces
            crowding during the day.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-ink">
            When to add more space
          </h2>
          <p className="mt-4 leading-8">
            Consider adding more room if your chickens are large breeds, your
            run will not have much enrichment, your climate keeps chickens
            indoors for long periods, or you plan to grow the flock later. A
            slightly larger layout is usually easier than rebuilding too soon.
          </p>
        </section>
      </BlogArticleLayout>
    </>
  );
}
