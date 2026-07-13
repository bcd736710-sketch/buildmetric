import Link from "next/link";
import { Container } from "@/components/container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <p className="text-lg font-semibold text-ink">BuildMetric</p>
          <p className="mt-3 leading-7 text-muted">
            Simple, accurate, and beautiful online tools for DIY homeowners.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/"
          >
            Home
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/tools"
          >
            Tools
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/about"
          >
            About
          </Link>
          <Link
            className="rounded-full px-2 py-1 text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            href="/privacy-policy"
          >
            Privacy
          </Link>
        </div>
      </Container>
      <Container className="mt-8">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} BuildMetric. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
