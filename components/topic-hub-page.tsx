import Link from "next/link";
import { Container } from "@/components/container";
import { ToolIcon } from "@/components/tool-icon";
import { blogPosts, type BlogPost } from "@/lib/blog";
import { calculatorBySlug, type CalculatorSummary } from "@/lib/calculators";
import { projectPaths } from "@/lib/project-paths";
import { siteConfig } from "@/lib/site";
import type { TopicHub } from "@/lib/topic-hubs";

type TopicHubPageProps = {
  hub: TopicHub;
};

function getHubPosts(hub: TopicHub) {
  const explicitPosts = hub.postSlugs
    ? hub.postSlugs
        .map((slug) => blogPosts.find((post) => post.slug === slug))
        .filter((post): post is BlogPost => Boolean(post))
    : [];

  const categoryPosts = blogPosts.filter(
    (post) =>
      hub.postCategories.includes(post.category) &&
      !explicitPosts.some((explicitPost) => explicitPost?.slug === post.slug),
  );

  return [...explicitPosts, ...categoryPosts.toReversed()].slice(0, 12);
}

export function TopicHubPage({ hub }: TopicHubPageProps) {
  const tools = hub.toolSlugs
    .map((slug) => calculatorBySlug[slug])
    .filter((tool): tool is CalculatorSummary => Boolean(tool));
  const posts = getHubPosts(hub);
  const hubProjectPaths = projectPaths.filter((path) => path.href === `/${hub.slug}`);
  const pageUrl = `${siteConfig.url}/${hub.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.metaTitle,
      description: hub.metaDescription,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: hub.eyebrow,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${hub.eyebrow} tools and guides`,
      itemListElement: [
        ...tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}/tools/${tool.slug}`,
          name: tool.name,
        })),
        ...posts.map((post, index) => ({
          "@type": "ListItem",
          position: tools.length + index + 1,
          url: `${siteConfig.url}/blog/${post.slug}`,
          name: post.title,
        })),
        ...hubProjectPaths.map((path, index) => ({
          "@type": "ListItem",
          position: tools.length + posts.length + index + 1,
          url: `${siteConfig.url}${path.href}`,
          name: path.title,
        })),
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              {hub.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">
              {hub.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {hub.description}
            </p>
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Start here
            </p>
            <div className="mt-5 grid gap-3">
              {hub.nextLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl bg-surface p-4 transition hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                  <span className="font-semibold text-ink">{link.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">
                    {link.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Calculators
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Estimate the numbers before choosing materials.
              </h2>
            </div>
            <Link
              href="/tools"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              View all tools
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                  <ToolIcon slug={tool.slug} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-ink">
                  {tool.name}
                </h3>
                <p className="mt-3 leading-7 text-muted">
                  {tool.description}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-ink group-hover:text-brand">
                  Open calculator
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {hubProjectPaths.length > 0 ? (
        <section className="border-t border-line bg-white py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Project path
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Follow a practical starter route.
              </h2>
              <p className="mt-4 leading-8 text-muted">
                Use the right calculator first, then read the supporting guides
                before deciding what to buy or build.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {hubProjectPaths.map((path) => {
                const primaryTool = calculatorBySlug[path.primaryTool];
                const secondaryTools = path.secondaryTools
                  .map((slug) => calculatorBySlug[slug])
                  .filter((tool): tool is CalculatorSummary => Boolean(tool));
                const guides = path.guideSlugs
                  .map((slug) => blogPosts.find((post) => post.slug === slug))
                  .filter((post): post is BlogPost => Boolean(post));

                return (
                  <div
                    key={path.title}
                    className="rounded-3xl border border-line bg-surface p-6 shadow-sm"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                      {path.steps.length} step plan
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-ink">
                      {path.title}
                    </h3>
                    <p className="mt-3 leading-7 text-muted">
                      {path.description}
                    </p>

                    <ol className="mt-5 grid gap-2 text-sm font-medium text-ink">
                      {path.steps.map((step) => (
                        <li key={step} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 grid gap-3">
                      <Link
                        href={`/tools/${primaryTool.slug}`}
                        className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                      >
                        Start with: {primaryTool.name}
                      </Link>
                      {secondaryTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                        >
                          Also useful: {tool.name}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-line pt-5">
                      <p className="text-sm font-semibold text-ink">
                        Guides for this path
                      </p>
                      <div className="mt-3 grid gap-2">
                        {guides.map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium leading-6 text-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                          >
                            {post.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Planning guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Read the details behind the estimate.
              </h2>
            </div>
            <Link
              href="/blog"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              View all guides
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-sm font-semibold text-brand transition group-hover:bg-ink group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  {post.category}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
