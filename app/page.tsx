import Link from "next/link";
import { Container } from "@/components/container";
import { ToolCard } from "@/components/tool-card";
import { calculators } from "@/lib/calculators";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(circle_at_70%_10%,rgba(37,111,90,0.12),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              BuildMetric
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-ink sm:text-6xl lg:text-7xl">
              Smart DIY Calculators for Your Backyard Projects
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Plan smarter, estimate costs, and build with confidence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/chicken-coop-size-calculator"
                className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Try the calculator
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Browse tools
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur sm:p-6">
            <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted">
                    Backyard planning kit
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-ink">
                    Five focused planning tools
                  </h2>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand">
                  MVP
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  ["Chicken coop", "4 sq ft", "/ medium chicken"],
                  ["Chicken run", "10 sq ft", "/ chicken"],
                  ["Garden soil", "1.5 cu ft", "/ bag estimate"],
                ].map(([label, value, unit]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-line bg-white p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-ink">
                      {value}
                      <span className="text-base font-medium text-muted">
                        {" "}
                        {unit}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
            {calculators.map((calculator) => (
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
    </>
  );
}
