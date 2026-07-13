import { BlogCard } from "@/components/blog-card";
import { Container } from "@/components/container";
import type { BlogPost } from "@/lib/blog";
import { getRelatedPosts } from "@/lib/blog";

type RelatedArticlesProps = {
  post: BlogPost;
};

export function RelatedArticles({ post }: RelatedArticlesProps) {
  const relatedPosts = getRelatedPosts(post);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-surface py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Related articles
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">
            Keep planning this project.
          </h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {relatedPosts.map((relatedPost, index) => (
            <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
