import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import type {
  BuyerProductGuide,
  RichText,
} from "@/lib/blog/buyer-product-guides";
import { getCategorySeo } from "@/lib/seo/site-keyword-map";

const siteUrl = "https://buildmetriccalc.com";
const linkClass =
  "font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition hover:text-navy";

function RichParagraph({ content }: { content: RichText }) {
  return (
    <p className="mt-5">
      {content.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link className={linkClass} href={part.href} key={`${part.href}-${index}`}>
            {part.text}
          </Link>
        ),
      )}
    </p>
  );
}

function RichList({ items }: { items: RichText[] }) {
  return (
    <ul className="mt-6 space-y-3 border-l-2 border-forest/25 pl-5">
      {items.map((item, itemIndex) => (
        <li key={itemIndex}>
          {item.map((part, partIndex) =>
            typeof part === "string" ? (
              part
            ) : (
              <Link
                className={linkClass}
                href={part.href}
                key={`${part.href}-${partIndex}`}
              >
                {part.text}
              </Link>
            ),
          )}
        </li>
      ))}
    </ul>
  );
}

export function BuyerProductGuidePage({ article }: { article: BuyerProductGuide }) {
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const categorySlug = article.productHref.split("/")[2];
  const categorySeo = categorySlug ? getCategorySeo(categorySlug) : null;
  const categoryHref = categorySlug ? `/products/${categorySlug}` : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        url: articleUrl,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        image: `${siteUrl}${article.image}`,
        articleSection: article.category,
        author: { "@type": "Organization", name: "TROVANE" },
        publisher: {
          "@type": "Organization",
          name: "TROVANE",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/trovane-logo-horizontal-cropped.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-white text-navy">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <article>
        <header className="border-b border-navy/10 bg-warm px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
          <div className="mx-auto max-w-[920px]">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-slate"
            >
              <Link className="transition hover:text-forest" href="/">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-forest" href="/blog">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-navy/70">{article.category}</span>
            </nav>
            <div className="mt-12">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-forest">
                <span>{article.category}</span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-forest/60"
                />
                <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate">
                {article.description}
              </p>
            </div>
          </div>
        </header>

        <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[780px]">
            <figure className="relative aspect-[16/8] overflow-hidden bg-mist">
              <Image
                alt={article.imageAlt}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 780px, 100vw"
                src={article.image}
                unoptimized
              />
            </figure>
            <div className="mt-12 text-base leading-8 text-slate sm:text-lg">
              <p className="text-xl leading-9 text-navy">{article.introduction}</p>

              {article.sections.map((section) => (
                <section className="mt-14" key={section.heading}>
                  <h2 className="text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <RichParagraph content={paragraph} key={index} />
                  ))}
                  {section.bullets ? <RichList items={section.bullets} /> : null}
                  {section.points?.map((point) => (
                    <div className="mt-9" key={point.heading}>
                      <h3 className="text-2xl font-semibold tracking-tight text-navy">
                        {point.heading}
                      </h3>
                      {point.paragraphs.map((paragraph, index) => (
                        <RichParagraph content={paragraph} key={index} />
                      ))}
                      {point.bullets ? <RichList items={point.bullets} /> : null}
                    </div>
                  ))}
                </section>
              ))}

              <section className="mt-14 border-t border-navy/15 pt-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
                  Practical takeaway
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">
                  Make the decision around real use
                </h2>
                {article.conclusion.map((paragraph, index) => (
                  <RichParagraph content={paragraph} key={index} />
                ))}
              </section>

              <div className="mt-14 border-t border-navy/15 pt-8">
                <Link
                  className="inline-flex items-center text-sm font-bold uppercase tracking-[0.08em] text-forest transition hover:text-navy"
                  href="/blog"
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-navy/10 bg-mist px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[780px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
              Product reference
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Review {article.productName}.
            </h2>
            {categorySeo && categoryHref ? (
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate">
                Compare it with other{" "}
                <Link className={linkClass} href={categoryHref}>
                  {categorySeo.primaryKeyword}
                </Link>
                {" "}in the same product cluster.
              </p>
            ) : null}
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy"
            href={article.productHref}
          >
            View Product
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
