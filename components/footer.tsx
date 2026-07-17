import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <BrandMark />
            <p className="text-lg font-semibold text-ink">BuildMetric</p>
          </div>
          <p className="mt-3 leading-7 text-muted">
            Simple, accurate, and beautiful online tools for DIY homeowners.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <span className="block font-semibold text-ink">
                {calculators.length} tools
              </span>
              Backyard calculators
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <span className="block font-semibold text-ink">
                {blogPosts.length} guides
              </span>
              Planning library
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <span className="block font-semibold text-ink">Free</span>
              No account needed
            </div>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Explore
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Home", "/"],
                ["Backyard DIY", "/backyard-diy"],
                ["Tools", "/tools"],
                ["Blog", "/blog"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-full text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Topics
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Backyard Chickens", "/backyard-chickens"],
                ["Garden DIY", "/garden-diy"],
                ["Shed Planning", "/shed-planning"],
                ["Home Improvement", "/home-improvement"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-full text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Site
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Partnerships", "/partnerships"],
                ["Methodology", "/methodology"],
                ["Editorial Policy", "/editorial-policy"],
                ["Affiliate Disclosure", "/affiliate-disclosure"],
                ["Privacy", "/privacy-policy"],
                ["RSS Feed", "/feed.xml"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-full text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-line pt-6">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} BuildMetric. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
