import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "About BuildMetric",
  description:
    "BuildMetric creates simple, accurate, and beautiful online planning tools for DIY homeowners.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About BuildMetric",
    description:
      "BuildMetric creates simple, accurate, and beautiful online planning tools for DIY homeowners.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              About
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              BuildMetric helps homeowners plan with clearer numbers.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              We build focused calculators and planning guides for practical DIY
              projects. The goal is simple: make early project decisions easier,
              faster, and less stressful.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-3">
          {[
            ["Simple", "Tools should be easy to use without reading a manual."],
            [
              "Useful",
              "Every calculator starts with a real planning question homeowners search for.",
            ],
            [
              "Transparent",
              "Each tool explains the assumptions behind its estimate.",
            ],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-line bg-white p-7">
              <h2 className="text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-4 leading-7 text-muted">{description}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-ink">
              Start with the tools.
            </h2>
            <p className="mt-4 leading-8 text-muted">
              BuildMetric is currently focused on backyard DIY calculators, with
              more garden, woodworking, and home improvement tools planned over
              time.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Browse tools
              </Link>
              <Link
                href="/methodology"
                className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                View methodology
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
