import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the BuildMetric privacy policy for this early-stage DIY calculator website.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | BuildMetric",
    description:
      "Read the BuildMetric privacy policy for this early-stage DIY calculator website.",
    url: "/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Privacy
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Last updated: July 13, 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-9 text-muted">
            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Information we collect
              </h2>
              <p className="mt-3 leading-8">
                BuildMetric does not require accounts and does not ask for
                personal information to use the calculators. If analytics,
                advertising, affiliate links, or paid products are added later,
                this policy should be updated before those features go live.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Calculator inputs
              </h2>
              <p className="mt-3 leading-8">
                Calculator inputs are used in your browser to show estimates.
                This MVP does not store calculator inputs in a database.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Third-party services
              </h2>
              <p className="mt-3 leading-8">
                BuildMetric is hosted by third-party hosting providers.
                Hosting providers may process basic technical data such as IP
                address, browser type, and request logs to deliver and secure
                the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Contact
              </h2>
              <p className="mt-3 leading-8">
                For privacy questions, email BuildMetric at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand"
                >
                  {siteConfig.contactEmail}
                </a>
                . You can also use the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand"
                >
                  contact page
                </Link>{" "}
                for calculator feedback, corrections, and business inquiries.
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
