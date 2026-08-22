"use client";

import { useState } from "react";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string; referenceId?: string }
  | { status: "error"; message: string };

function FieldLabel({ children, htmlFor, required = false }: { children: React.ReactNode; htmlFor: string; required?: boolean }) {
  return <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-navy/70" htmlFor={htmlFor}>{children}{required ? <span className="text-forest"> *</span> : null}</label>;
}

const inputClass = "min-h-12 w-full border border-navy/14 bg-warm px-4 text-base text-navy outline-none transition placeholder:text-slate/55 focus:border-forest";

export function RFQForm({ initialProduct = "", initialIntent = "" }: { initialProduct?: string; initialIntent?: string }) {
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ status: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("company", String(formData.get("company") || "Not provided"));
    formData.set("country", "Not provided");
    formData.set("product", initialProduct || "General inquiry");
    formData.set("quantity", "1");
    formData.set("customLogo", "Not sure");
    formData.set("customPackaging", "Not sure");
    formData.set("targetPrice", "");

    try {
      const response = await fetch("/api/rfq", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) {
        setState({ status: "error", message: result?.message ?? "Please check the form and try again." });
        return;
      }
      form.reset();
      setState({
        status: "success",
        referenceId: result.referenceId,
        message: result.emailSent === true
          ? "Your message has been sent to the TROVANE team."
          : "Your message has been received. We will be in touch soon.",
      });
    } catch {
      setState({ status: "error", message: "The message could not be submitted. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form className="grid gap-5" onSubmit={handleSubmit}>
    <input name="intent" type="hidden" value={initialIntent} />
    <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />

    {initialProduct ? <p className="border border-forest/20 bg-mist px-4 py-3 text-sm leading-6 text-navy"><span className="font-semibold">Product:</span> {initialProduct}</p> : null}

    {state.status !== "idle" ? <div className={`border px-4 py-3 text-sm leading-6 ${state.status === "success" ? "border-forest/25 bg-mist text-navy" : "border-red-300 bg-red-50 text-red-800"}`} role="status"><strong className="block font-semibold">{state.status === "success" ? "Message sent" : "Submission failed"}</strong>{state.message}{state.status === "success" && state.referenceId ? <span className="block text-xs text-slate">Reference ID: {state.referenceId}</span> : null}</div> : null}

    <div className="grid gap-5 sm:grid-cols-2">
      <div><FieldLabel htmlFor="rfq-name" required>Name</FieldLabel><input autoComplete="name" className={inputClass} id="rfq-name" name="name" required type="text" /></div>
      <div><FieldLabel htmlFor="rfq-email" required>Business Email</FieldLabel><input autoComplete="email" className={inputClass} id="rfq-email" name="email" required type="email" /></div>
      <div><FieldLabel htmlFor="rfq-company">Company</FieldLabel><input autoComplete="organization" className={inputClass} id="rfq-company" name="company" type="text" /></div>
      <div><FieldLabel htmlFor="rfq-whatsapp">WhatsApp</FieldLabel><input autoComplete="tel" className={inputClass} id="rfq-whatsapp" name="whatsapp" type="tel" /></div>
    </div>

    <div><FieldLabel htmlFor="rfq-requirements" required>Message</FieldLabel><textarea className={`${inputClass} min-h-40 py-3`} id="rfq-requirements" name="requirements" placeholder="Tell us about your product requirements or project." required /></div>

    <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-7 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit" disabled={isSubmitting} type="submit">{isSubmitting ? "Sending..." : "Send Message"}</button>
  </form>;
}
