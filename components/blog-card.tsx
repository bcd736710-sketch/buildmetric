import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { calculatorBySlug } from "@/lib/calculators";

type BlogCardProps = {
  post: BlogPost;
  index?: number;
};

export function BlogCard({ post, index }: BlogCardProps) {
  const relatedTools = post.relatedTools
    .map((toolSlug) => calculatorBySlug[toolSlug])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
    >
      <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-sm font-semibold text-brand transition group-hover:bg-ink group-hover:text-white">
        {typeof index === "number" ? String(index + 1).padStart(2, "0") : "BM"}
      </div>
      <p className="pr-14 text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        {post.category}
      </p>
      <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-ink">
        {post.title}
      </h2>
      <p className="mt-4 leading-8 text-muted">{post.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {relatedTools.map((tool) => (
          <span
            key={tool.slug}
            className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted"
          >
            {tool.name.replace(" Calculator", "")}
          </span>
        ))}
      </div>
      <p className="mt-6 text-sm font-semibold text-ink">{post.readingTime}</p>
    </Link>
  );
}
