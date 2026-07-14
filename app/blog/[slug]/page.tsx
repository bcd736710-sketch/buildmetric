import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog-article-layout";
import { blogPostBySlug } from "@/lib/blog";
import { guideContentBySlug } from "@/lib/guide-content";
import { siteConfig } from "@/lib/site";

type BlogSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(guideContentBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug[slug];

  if (!post || !guideContentBySlug[slug]) {
    return {};
  }

  const pageUrl = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${post.title} | BuildMetric`,
      description: post.description,
      url: pageUrl,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = blogPostBySlug[slug];
  const content = guideContentBySlug[slug];

  if (!post || !content) {
    notFound();
  }

  const pageUrl = `/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "BuildMetric" },
    publisher: { "@type": "Organization", name: "BuildMetric" },
    mainEntityOfPage: `${siteConfig.url}${pageUrl}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleLayout
        post={post}
        quickAnswer={content.quickAnswer}
        primaryTool={content.primaryTool}
        secondaryTool={content.secondaryTool}
      >
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-3xl font-semibold text-ink">
              {section.heading}
            </h2>
            <p className="mt-4 leading-8">{section.body}</p>
          </section>
        ))}
      </BlogArticleLayout>
    </>
  );
}
