import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
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

      <article>
        <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <Link
                href="/blog"
                className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Guides
              </Link>
              <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">
                {post.description}
              </p>
              <p className="mt-5 text-sm font-medium text-muted">
                {post.readingTime}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16">
          <Container className="grid gap-12 lg:grid-cols-[0.72fr_1fr]">
            <aside className="rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick answer
              </p>
              <p className="mt-4 leading-7 text-muted">
                Plan about 3 to 5 square feet of indoor coop space per chicken
                and at least 10 square feet of outdoor run space per chicken.
                Larger breeds and crowded sites usually need more room.
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  href="/tools/chicken-coop-size-calculator"
                  className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                  Use coop calculator
                </Link>
                <Link
                  href="/tools/chicken-run-size-calculator"
                  className="rounded-full border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                  Use run calculator
                </Link>
              </div>
            </aside>

            <div className="space-y-10 text-muted">
              <section>
                <h2 className="text-3xl font-semibold text-ink">
                  The simple space rule
                </h2>
                <p className="mt-4 leading-8">
                  Backyard chicken planning starts with two numbers: indoor coop
                  space and outdoor run space. The coop gives chickens a secure
                  place to sleep and shelter. The run gives them space to move,
                  scratch, and spend the day outside.
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
                  For 6 medium chickens, plan about 24 square feet of indoor
                  coop space and 60 square feet of outdoor run space. If your
                  yard allows it, extra run space is often the easier upgrade
                  because it reduces crowding during the day.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-ink">
                  When to add more space
                </h2>
                <p className="mt-4 leading-8">
                  Consider adding more room if your chickens are large breeds,
                  your run will not have much enrichment, your climate keeps
                  chickens indoors for long periods, or you plan to grow the
                  flock later. A slightly larger layout is usually easier than
                  rebuilding too soon.
                </p>
              </section>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
