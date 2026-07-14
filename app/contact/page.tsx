import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact BuildMetric",
  description:
    "Contact BuildMetric for calculator questions, feedback, corrections, partnerships, and project planning suggestions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact BuildMetric",
    description:
      "Send BuildMetric calculator questions, feedback, corrections, partnerships, and planning suggestions.",
    url: "/contact",
    type: "website",
  },
};

const contactReasons = [
  {
    title: "Calculator feedback",
    description:
      "Tell us when an estimate, unit label, assumption, or example could be clearer.",
  },
  {
    title: "Content corrections",
    description:
      "Send a note if you spot outdated wording, a broken link, or a planning detail that needs review.",
  },
  {
    title: "Partnerships and media",
    description:
      "Reach out about collaboration, mentions, product questions, or other business inquiries.",
  },
];

const emailActions = [
  {
    label: "Send feedback",
    subject: "BuildMetric feedback",
    primary: true,
  },
  {
    label: "Report a correction",
    subject: "BuildMetric correction",
    primary: false,
  },
  {
    label: "Partnership inquiry",
    subject: "BuildMetric partnership inquiry",
    primary: false,
  },
];

const contactNotes = [
  "Include the page URL when your message is about a specific calculator or guide.",
  "For corrections, describe what seems unclear and what source or context we should check.",
  "Do not send passwords, payment details, private documents, or sensitive personal information.",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BuildMetric",
  url: `${siteConfig.url}/contact`,
  about: siteConfig.description,
  email: siteConfig.contactEmail,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Contact
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Questions, corrections, or partnership ideas?
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              BuildMetric is built around practical homeowner planning. If a
              calculator could be clearer, a guide needs a correction, or you
              want to discuss a collaboration, email us directly.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
          <aside className="rounded-3xl border border-line bg-surface p-6 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Email
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 block break-all text-2xl font-semibold text-ink transition hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="mt-4 leading-7 text-muted">
              Please include the page URL and a short description when your
              message is about a specific calculator or guide.
            </p>
            <div className="mt-6 grid gap-3">
              {emailActions.map((action) => (
                <a
                  key={action.subject}
                  href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(action.subject)}`}
                  className={
                    action.primary
                      ? "inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                      : "inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  }
                >
                  {action.label}
                </a>
              ))}
              <Link
                href="/methodology"
                className="inline-flex justify-center rounded-full px-4 py-3 text-sm font-semibold text-brand transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                View methodology
              </Link>
            </div>
          </aside>

          <div className="grid gap-5">
            {contactReasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-3xl border border-line bg-white p-6 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-ink">
                  {reason.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">
                  {reason.description}
                </p>
              </div>
            ))}
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="text-2xl font-semibold text-ink">
                Before you email
              </h2>
              <ul className="mt-4 grid gap-3">
                {contactNotes.map((note) => (
                  <li key={note} className="flex gap-3 leading-7 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-muted">
                BuildMetric is a small planning tools site, so replies may not
                be immediate. Clear, specific notes are easiest to review.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
