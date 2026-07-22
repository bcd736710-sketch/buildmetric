import type { Metadata } from "next";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for The Sky Remembers.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
          Privacy
        </p>
        <h1 className="mt-5 text-5xl font-black">Privacy policy</h1>
        <div className="mt-8 space-y-6 leading-8 text-starlight/66">
          <p>
            The Sky Remembers creates personalized celestial artwork from a
            date, time, and place. The current MVP does not have live checkout,
            account creation, or final order delivery.
          </p>
          <p>
            Moment inputs may include a date, time, approximate place, title,
            message, and selected artwork style. Do not enter sensitive personal
            information into optional title or message fields.
          </p>
          <p>
            This site uses Google Analytics and Vercel Analytics to understand
            traffic and technical performance. Analytics tools may collect
            device, browser, page, and approximate location information.
          </p>
          <p>
            Future checkout and digital delivery features will require
            additional privacy details before launch, including payment
            processor, order storage, and download delivery information.
          </p>
          <p>
            Questions can be sent to{" "}
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
