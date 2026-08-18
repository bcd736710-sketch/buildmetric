"use client";

import { useMemo, useState } from "react";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string; referenceId?: string }
  | { status: "error"; message: string };

const productOptions = [
  "Pet Travel Carrier",
  "Pet Travel Backpack / Carrier",
  "2-in-1 Pet Travel Bottle",
  "Collapsible Travel Bowl",
  "Portable Outdoor Pet Bed",
  "Adjustable Outdoor Harness",
  "Outdoor Apparel",
  "Camping & Accessories",
  "Other / Not sure yet",
];

function FieldLabel({
  children,
  htmlFor,
  required = false,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label
      className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-navy/70"
      htmlFor={htmlFor}
    >
      {children}
      {required ? <span className="text-forest"> *</span> : null}
    </label>
  );
}

const inputClass =
  "min-h-12 w-full border border-navy/14 bg-warm px-4 text-base text-navy outline-none transition placeholder:text-slate/55 focus:border-forest";

export function RFQForm({
  initialProduct = "",
  initialIntent = "",
}: {
  initialProduct?: string;
  initialIntent?: string;
}) {
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultProduct = useMemo(() => {
    if (!initialProduct) return "";
    return productOptions.includes(initialProduct) ? initialProduct : initialProduct;
  }, [initialProduct]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ status: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        setState({
          status: "error",
          message: result?.message ?? "Please check the form and try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        referenceId: result.referenceId,
        message:
          result.emailSent === true
            ? "Your RFQ has been submitted and emailed to the TROVANE team."
            : "Your RFQ has been saved. Email delivery will activate after SMTP is configured.",
      });
    } catch {
      setState({
        status: "error",
        message: "The RFQ could not be submitted. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="grid gap-5"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <input name="intent" type="hidden" value={initialIntent} />
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />

      {state.status !== "idle" ? (
        <div
          className={`border px-4 py-3 text-sm leading-6 ${
            state.status === "success"
              ? "border-forest/25 bg-mist text-navy"
              : "border-red-300 bg-red-50 text-red-800"
          }`}
          role="status"
        >
          <strong className="block font-semibold">
            {state.status === "success" ? "RFQ submitted" : "Submission failed"}
          </strong>
          {state.message}
          {state.status === "success" && state.referenceId ? (
            <span className="block text-xs text-slate">
              Reference ID: {state.referenceId}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="rfq-name" required>Name</FieldLabel>
          <input className={inputClass} id="rfq-name" name="name" required type="text" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-company" required>Company</FieldLabel>
          <input className={inputClass} id="rfq-company" name="company" required type="text" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-country" required>Country</FieldLabel>
          <input className={inputClass} id="rfq-country" name="country" required type="text" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-email" required>Email</FieldLabel>
          <input className={inputClass} id="rfq-email" name="email" required type="email" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-whatsapp">WhatsApp</FieldLabel>
          <input className={inputClass} id="rfq-whatsapp" name="whatsapp" type="text" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-product" required>Product</FieldLabel>
          <select
            className={inputClass}
            defaultValue={defaultProduct}
            id="rfq-product"
            name="product"
            required
          >
            <option value="">Select a product</option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="rfq-quantity" required>Quantity</FieldLabel>
          <input
            className={inputClass}
            id="rfq-quantity"
            min="1"
            name="quantity"
            required
            type="number"
          />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-target-price">Target Price optional</FieldLabel>
          <input className={inputClass} id="rfq-target-price" name="targetPrice" type="text" />
        </div>
        <div>
          <FieldLabel htmlFor="rfq-custom-logo" required>Custom Logo</FieldLabel>
          <select
            className={inputClass}
            defaultValue=""
            id="rfq-custom-logo"
            name="customLogo"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="rfq-custom-packaging" required>Custom Packaging</FieldLabel>
          <select
            className={inputClass}
            defaultValue=""
            id="rfq-custom-packaging"
            name="customPackaging"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="rfq-requirements" required>Requirements</FieldLabel>
        <textarea
          className={`${inputClass} min-h-36 py-3`}
          id="rfq-requirements"
          name="requirements"
          required
        />
      </div>

      <div>
        <FieldLabel htmlFor="rfq-reference-image">Reference Image optional</FieldLabel>
        <input
          accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
          className="block w-full border border-dashed border-navy/20 bg-warm px-4 py-4 text-sm text-slate file:mr-4 file:border-0 file:bg-forest file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:text-white"
          id="rfq-reference-image"
          name="referenceImage"
          type="file"
        />
      </div>

      <button
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-7 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Submitting..." : "Submit RFQ"}
      </button>
    </form>
  );
}
