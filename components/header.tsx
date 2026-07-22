import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/86 text-starlight backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
          aria-label="The Sky Remembers home"
        >
          <BrandMark />
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-starlight">
            {siteConfig.brandName}
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-4">
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-starlight/70 transition hover:text-starlight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 sm:inline-flex"
            href="/#create"
          >
            Create
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-starlight/70 transition hover:text-starlight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 md:inline-flex"
            href="/how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-starlight/70 transition hover:text-starlight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 lg:inline-flex"
            href="/our-method"
          >
            Our Method
          </Link>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-starlight px-4 py-2 text-sm font-bold text-midnight transition hover:bg-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
            href="/#create"
          >
            Choose Your Moment
          </Link>
        </nav>
      </Container>
    </header>
  );
}
