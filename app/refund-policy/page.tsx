import type { Metadata } from "next";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for The Sky Remembers digital artwork.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
          Refund Policy
        </p>
        <h1 className="mt-5 text-5xl font-black">Refund policy</h1>
        <div className="mt-8 space-y-5 leading-8 text-starlight/66">
          <p>
            Checkout is not live yet, so no paid digital artwork is currently
            being sold through this site.
          </p>
          <p>
            Before launch, this page will be updated with the final policy for
            digital downloads, failed delivery, duplicate purchases, and support
            requests.
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
