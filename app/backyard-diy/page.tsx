import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ToolIcon } from "@/components/tool-icon";
import { blogPostBySlug, blogPosts } from "@/lib/blog";
import { calculatorBySlug, calculators } from "@/lib/calculators";
import { projectPaths } from "@/lib/project-paths";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Backyard DIY Planning Hub",
  description:
    "Plan backyard DIY projects with practical calculators and homeowner guides for chickens, sheds, garden beds, mulch, gravel, fences, and concrete slabs.",
  alternates: { canonical: "/backyard-diy" },
  openGraph: {
    title: "Backyard DIY Planning Hub | BuildMetric",
    description:
      "Use focused calculators and clear DIY guides to plan backyard projects before you buy materials.",
    url: "/backyard-diy",
    type: "website",
  },
};

const categoryIntro = {
  "Backyard DIY":
    "Plan outdoor structures, bases, fences, runs, and practical backyard layouts.",
  "Garden DIY":
    "Estimate soil, mulch, and garden bed materials before buying bags or bulk delivery.",
  "Home Improvement":
    "Related planning tools for common homeowner projects that connect to outdoor work.",
};

function getPostsByCategory(category: string) {
  return blogPosts
    .filter((post) => post.category === category)
    .toReversed()
    .slice(0, 6);
}

export default function BackyardDiyPage() {
  const categories = Array.from(
    new Set(calculators.map((calculator) => calculator.category)),
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Backyard DIY Planning Hub",
      description:
        "A collection of DIY calculators and planning guides for backyard homeowners.",
      url: `${siteConfig.url}/backyard-diy`,
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
          name: "Backyard DIY",
          item: `${siteConfig.url}/backyard-diy`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "BuildMetric backyard planning tools",
      itemListElement: calculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/tools/${calculator.slug}`,
        name: calculator.name,
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Backyard DIY hub
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl">
              Plan backyard projects from first estimate to material list.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Use BuildMetric calculators and guides to estimate space, volume,
              cost, and materials before you start a backyard DIY project.
            </p>
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Planning library
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                [calculators.length, "calculators"],
                [blogPosts.length, "guides"],
                [categories.length, "topics"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-surface p-4">
                  <p className="text-3xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-sm font-medium text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10">
          {categories.map((category) => {
            const categoryTools = calculators.filter(
              (calculator) => calculator.category === category,
            );
            const categoryPosts = getPostsByCategory(category);

            return (
              <div key={category} className="grid gap-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                      {category}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-ink">
                      {category === "Backyard DIY"
                        ? "Outdoor project calculators"
                        : category === "Garden DIY"
                          ? "Garden material calculators"
                          : "Related homeowner tools"}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-7 text-muted">
                      {
                        categoryIntro[
                          category as keyof typeof categoryIntro
                        ]
                      }
                    </p>
                  </div>
                  <Link
                    href="/tools"
                    className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  >
                    Browse all tools
                  </Link>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {categoryTools.map((calculator) => (
                      <Link
                        key={calculator.slug}
                        href={`/tools/${calculator.slug}`}
                        className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                          <ToolIcon slug={calculator.slug} />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-ink">
                          {calculator.name}
                        </h3>
                        <p className="mt-3 leading-7 text-muted">
                          {calculator.description}
                        </p>
                        <span className="mt-5 inline-flex text-sm font-semibold text-ink group-hover:text-brand">
                          Open calculator
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-line bg-surface p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                      Related guides
                    </p>
                    <div className="mt-5 grid gap-4">
                      {categoryPosts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="rounded-2xl bg-white p-4 transition hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                        >
                          <h3 className="font-semibold text-ink">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                            {post.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Project routes
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Start with the project you are trying to plan.
              </h2>
              <p className="mt-4 leading-8 text-muted">
                Each route connects the first calculator to supporting tools and
                the most relevant planning guides.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Request another route
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projectPaths.map((path) => {
              const primaryTool = calculatorBySlug[path.primaryTool];
              const guides = path.guideSlugs
                .map((slug) => blogPostBySlug[slug])
                .filter(Boolean);

              return (
                <div
                  key={path.title}
                  className="rounded-3xl border border-line bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                        {path.steps.length} step route
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-ink">
                        {path.title}
                      </h3>
                    </div>
                    <Link
                      href={path.href}
                      className="text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                    >
                      Open hub
                    </Link>
                  </div>
                  <p className="mt-4 leading-7 text-muted">
                    {path.description}
                  </p>

                  <Link
                    href={`/tools/${primaryTool.slug}`}
                    className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  >
                    Start: {primaryTool.name}
                  </Link>

                  <div className="mt-6 grid gap-2">
                    {guides.slice(0, 3).map((post) => (
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
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
