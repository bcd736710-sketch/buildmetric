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
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/"
          >
            Home
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/tools"
          >
            Tools
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/blog"
          >
            Blog
          </Link>
        </nav>
      </Container>
    </header>
  );
}
