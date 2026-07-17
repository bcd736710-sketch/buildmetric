import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { projectPaths } from "@/lib/project-paths";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Start planning a backyard DIY project with BuildMetric calculators, material estimates, and practical guides.",
  alternates: {
    canonical: "/start-here",
  },
  openGraph: {
    title: "Start Here | BuildMetric",
    description:
      "Choose a backyard DIY project path and jump into the right calculator and material planning guides.",
    url: "/start-here",
    type: "website",
  },
};

export default function StartHerePage() {
  return (
    <>
      <section className="border-b border-line bg-[radial-gradient(circle_at_78%_14%,rgba(37,111,90,0.14),transparent_32%),linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)] py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Start here
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Choose your backyard DIY project.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              BuildMetric connects calculators, material estimates, and simple
              planning guides so you can move from rough idea to shopping list
              without a spreadsheet.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {projectPaths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  {path.steps.length} step path
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-ink">
                  {path.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{path.description}</p>
                <ol className="mt-5 grid gap-2 text-sm font-medium text-ink">
                  {path.steps.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <span className="mt-6 inline-flex text-sm font-semibold text-brand">
                  Open this path
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Quick access
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Already know what you need?
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Browse all calculators", "/tools"],
              ["Read all guides", "/blog"],
              ["See methodology", "/methodology"],
              ["Contact BuildMetric", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-line bg-white px-5 py-4 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                {label}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
