import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import { getPostsForTool } from "@/lib/blog";

type RelatedGuidesProps = {
  toolSlug: string;
};

export function RelatedGuides({ toolSlug }: RelatedGuidesProps) {
  const guides = getPostsForTool(toolSlug);

  if (guides.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-surface py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Related guides
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Learn before you build.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {guides.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
