import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="border-b border-line bg-surface py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Page not found
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
            This estimate is not available.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            The page may have moved, or the URL may be incomplete. Start with
            the calculator library or the backyard DIY planning hub.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="inline-flex justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Browse calculators
            </Link>
            <Link
              href="/backyard-diy"
              className="inline-flex justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Open backyard hub
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
