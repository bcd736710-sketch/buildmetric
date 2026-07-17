import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
          aria-label="BuildMetric home"
        >
          <BrandMark />
          <span className="text-base font-semibold tracking-normal text-ink">
            BuildMetric
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-5">
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/backyard-diy"
          >
            Backyard DIY
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/tools"
          >
            Tools
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:inline-flex"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 md:inline-flex"
            href="/methodology"
          >
            Methodology
          </Link>
          <Link
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:inline-flex"
            href="/start-here"
          >
            Start estimating
          </Link>
        </nav>
      </Container>
    </header>
  );
}
