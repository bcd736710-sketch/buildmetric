import type { Metadata } from "next";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using The Sky Remembers.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
          Terms
        </p>
        <h1 className="mt-5 text-5xl font-black">Terms of use</h1>
        <div className="mt-8 space-y-5 leading-8 text-starlight/66">
          <p>
            The Sky Remembers is currently an MVP experience for personalized
            celestial artwork. Checkout and final digital delivery are not live
            yet.
          </p>
          <p>
            Artwork previews, astronomy spikes, and example outputs are provided
            for evaluation while the production purchase and delivery system is
            being built.
          </p>
          <p>
            For questions, contact{" "}
            <a className="font-semibold text-brand" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
