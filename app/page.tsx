import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import { HomeVisual } from "@/components/home-visual";
import { ToolCard } from "@/components/tool-card";
import { blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { projectPaths } from "@/lib/project-paths";

export default function HomePage() {
  const featuredCalculators = calculators.slice(-6).reverse();
  const featuredGuides = blogPosts.slice(-4).reverse();
  const toolCategories = [
    {
      label: "Garden DIY",
      href: "/garden-diy",
      description: "Soil, mulch, and planting material planning.",
    },
    {
      label: "Shed Planning",
      href: "/shed-planning",
      description: "Costs, gravel bases, and concrete slabs.",
    },
    {
      label: "Backyard Chickens",
      href: "/backyard-chickens",
      description: "Coop, run, and feed planning tools.",
    },
    {
      label: "Home Improvement",
      href: "/home-improvement",
      description: "Paint and practical household estimates.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_72%_8%,rgba(37,111,90,0.14),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(20,20,20,0.06),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand shadow-sm backdrop-blur">
              BuildMetric DIY planning tools
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl lg:text-7xl">
              Smart DIY Calculators for Your Backyard Projects
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Plan smarter, estimate costs, and build with confidence using
              focused calculators and clear homeowner guides.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Browse calculators
              </Link>
              <Link
                href="/tools/paint-calculator"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Try paint calculator
              </Link>
              <Link
                href="/backyard-diy"
                className="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-brand transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                View planning hub
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                [String(calculators.length), "calculators"],
                [String(blogPosts.length), "guides"],
                ["0", "accounts"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-ink">{value}</p>
                  <p className="mt-1 text-sm font-medium text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <HomeVisual />
        </Container>
      </section>

      <section className="border-b border-line bg-white py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-4">
            {toolCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-3xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-ink hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  {category.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Project starters
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              Pick a project path before choosing a calculator.
            </h2>
            <p className="mt-4 leading-8 text-muted">
              Start with the goal, then move through the right estimate, guide,
              and planning check without hunting across the whole site.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {projectPaths.map((path) => (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
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
                <span className="mt-6 inline-flex text-sm font-semibold text-ink transition group-hover:text-brand">
                  Open project hub
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Featured calculators
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Start with practical backyard planning tools.
              </h2>
            </div>
            <Link
              href="/tools"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              View all tools
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredCalculators.map((calculator) => (
              <ToolCard key={calculator.slug} calculator={calculator} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Simple inputs", "No clutter, no account, no spreadsheet setup."],
              [
                "Practical estimates",
                "Clear outputs for real planning decisions at home.",
              ],
              [
                "Built for search",
                "Useful pages designed to answer common DIY questions.",
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-3xl border border-line bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Why BuildMetric
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Lightweight tools for decisions before the project starts.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Transparent formulas",
                  "Each calculator explains the assumptions behind the result.",
                ],
                [
                  "Mobile-first planning",
                  "Use it at the store, in the yard, or while comparing plans.",
                ],
                [
                  "No sign-up wall",
                  "The useful parts stay accessible without accounts.",
                ],
                [
                  "Content connected to tools",
                  "Guides and calculators link together around real projects.",
                ],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-line bg-surface p-6"
                >
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 leading-7 text-muted">{body}</p>
                </div>
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
                Planning guides
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Support every calculator with clear advice.
              </h2>
            </div>
            <Link
              href="/blog"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Read all guides
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {featuredGuides.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Feedback
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
              See something unclear? Help improve the next version.
            </h2>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7 shadow-sm">
            <p className="leading-8 text-muted">
              BuildMetric is growing calculator by calculator. If an estimate,
              formula, unit label, or guide could be clearer, send a short note
              with the page URL.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Contact BuildMetric
              </Link>
              <Link
                href="/editorial-policy"
                className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Editorial policy
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
