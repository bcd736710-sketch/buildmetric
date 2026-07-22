import type { Metadata } from "next";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The Sky Remembers about personalized celestial artwork, support, or collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact The Sky Remembers",
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
      <section className="bg-midnight py-20 text-starlight sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
              Contact
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
              Questions about a moment, a method, or a collaboration?
            </h1>
            <p className="mt-6 text-lg leading-8 text-starlight/66">
              The Sky Remembers is being rebuilt as a focused personalized
              celestial artwork store. For support, corrections, or business
              inquiries, email directly.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Email
            </p>
            <a
              className="mt-4 block break-all text-2xl font-black text-starlight transition hover:text-brand"
              href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
                "The Sky Remembers inquiry",
              )}`}
            >
              {siteConfig.contactEmail}
            </a>
            <p className="mt-5 leading-7 text-starlight/62">
              Please do not send payment details, private documents, passwords,
              or sensitive personal information by email.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
