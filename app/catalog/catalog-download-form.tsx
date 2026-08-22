"use client";

import { FormEvent, useState } from "react";
import { trovaneButton } from "@/components/trovane-button";

const catalogUrl = "/catalog/trovane-catalog.pdf";

export function CatalogDownloadForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      const link = document.createElement("a");
      link.href = catalogUrl;
      link.download = "trovane-2026-product-catalog.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, 250);
  }

  if (submitted) {
    return <div className="flex min-h-[430px] flex-col justify-center border border-forest/15 bg-white/45 p-7 sm:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Thank you</p>
      <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-navy">Your download will begin shortly.</h3>
      <p className="mt-5 max-w-sm leading-7 text-slate">Your information will only be used to send the catalog and follow up on related inquiries.</p>
      <a className="mt-8 text-sm font-bold uppercase tracking-[0.1em] text-forest underline underline-offset-4" href={catalogUrl}>Download PDF again</a>
    </div>;
  }

  return <form className="border border-forest/15 bg-white/45 p-7 sm:p-10" onSubmit={handleSubmit}>
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Download Catalog</p>
    <h3 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">Get the 2026 TROVANE Catalog.</h3>
    <p className="mt-4 leading-7 text-slate">Fill in the details below and download the PDF instantly.</p>
    <div className="mt-8 space-y-5">
      <label className="block text-sm font-medium text-navy">Full Name *<input required className="mt-2 block h-12 w-full border border-navy/20 bg-white px-3 text-base outline-none transition focus:border-forest" name="fullName" /></label>
      <label className="block text-sm font-medium text-navy">Business Email *<input required className="mt-2 block h-12 w-full border border-navy/20 bg-white px-3 text-base outline-none transition focus:border-forest" name="email" type="email" /></label>
      <label className="block text-sm font-medium text-navy">Company *<input required className="mt-2 block h-12 w-full border border-navy/20 bg-white px-3 text-base outline-none transition focus:border-forest" name="company" /></label>
      <label className="block text-sm font-medium text-navy">Market / Country *<input required className="mt-2 block h-12 w-full border border-navy/20 bg-white px-3 text-base outline-none transition focus:border-forest" name="market" /></label>
    </div>
    <button className={`mt-8 w-full ${trovaneButton.primary}`} type="submit">Download PDF</button>
  </form>;
}
