import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import type { BlogPost } from "@/lib/blog";

type BlogArticleLayoutProps = {
  post: BlogPost;
  quickAnswer: string;
  primaryTool: {
    href: string;
    label: string;
  };
  secondaryTool?: {
    href: string;
    label: string;
  };
  children: ReactNode;
};

export function BlogArticleLayout({
  post,
  quickAnswer,
  primaryTool,
  secondaryTool,
  children,
}: BlogArticleLayoutProps) {
  return (
    <article>
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Guides
            </Link>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {post.description}
            </p>
            <p className="mt-5 text-sm font-medium text-muted">
              {post.readingTime}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1fr]">
          <aside className="rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Quick answer
            </p>
            <p className="mt-4 leading-7 text-muted">{quickAnswer}</p>
            <div className="mt-6 grid gap-3">
              <Link
                href={primaryTool.href}
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                {primaryTool.label}
              </Link>
              {secondaryTool ? (
                <Link
                  href={secondaryTool.href}
                  className="rounded-full border border-line bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                >
                  {secondaryTool.label}
                </Link>
              ) : null}
            </div>
          </aside>

          <div className="space-y-10 text-muted">{children}</div>
        </Container>
      </section>
    </article>
  );
}
