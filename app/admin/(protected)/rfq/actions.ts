"use server";

import { Buffer } from "node:buffer";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getRFQQuote, isRFQSubmissionStatus, setRFQSubmissionStatus, updateRFQFollowUpDate, updateRFQNotes, updateRFQQuote } from "@/lib/rfq/repository";
import { RFQValidationError, validateRFQReferenceFile } from "@/lib/rfq/validation";

export async function updateRFQStatus(id: string, formData: FormData) {
  await requireAdmin();
  const status = formData.get("status");
  if (!isRFQSubmissionStatus(status)) throw new Error("Choose a valid RFQ status.");
  await setRFQSubmissionStatus(id, status);
  revalidatePath("/admin/rfq");
  revalidatePath(`/admin/rfq/${id}`);
}

function refreshRFQ(id: string) {
  revalidatePath("/admin/rfq");
  revalidatePath(`/admin/rfq/${id}`);
}

export async function saveRFQNotes(id: string, formData: FormData) {
  await requireAdmin();
  const notes = String(formData.get("internalNotes") ?? "").trim();
  await updateRFQNotes(id, notes || null);
  refreshRFQ(id);
}

export async function saveRFQFollowUpDate(id: string, formData: FormData) {
  await requireAdmin();
  const nextFollowUpAt = String(formData.get("nextFollowUpAt") ?? "").trim();
  if (nextFollowUpAt && !/^\d{4}-\d{2}-\d{2}$/.test(nextFollowUpAt)) throw new Error("Choose a valid follow-up date.");
  await updateRFQFollowUpDate(id, nextFollowUpAt || null);
  refreshRFQ(id);
}

function optionalText(formData: FormData, key: string, limit: number) {
  const value = String(formData.get(key) ?? "").trim();
  if (value.length > limit) throw new Error(`${key} must be ${limit} characters or fewer.`);
  return value || null;
}

export async function saveRFQQuote(id: string, formData: FormData) {
  await requireAdmin();
  const currentQuote = await getRFQQuote(id);
  if (!currentQuote) throw new Error("RFQ was not found.");
  const quotedAt = optionalText(formData, "quotedAt", 10);
  if (quotedAt && !/^\d{4}-\d{2}-\d{2}$/.test(quotedAt)) throw new Error("Choose a valid quoted date.");
  let quoteFileUrl = currentQuote.quoteFileUrl;
  const quoteFile = formData.get("quoteFile");
  if (quoteFile instanceof File && quoteFile.size > 0) {
    try {
      const validated = await validateRFQReferenceFile(quoteFile);
      if (!validated) throw new Error("Choose a quote file.");
      const uploaded = await put(`rfq/${id}/quotes/${validated.filename}`, Buffer.from(await quoteFile.arrayBuffer()), {
        access: "private",
        addRandomSuffix: false,
        contentType: validated.type,
      });
      quoteFileUrl = uploaded.url;
    } catch (error) {
      if (error instanceof RFQValidationError) throw new Error(error.message.replace("Reference file", "Quote file"));
      throw error;
    }
  }
  await updateRFQQuote(id, {
    quotedPrice: optionalText(formData, "quotedPrice", 80),
    currency: optionalText(formData, "currency", 16),
    quoteFileUrl,
    quoteNotes: optionalText(formData, "quoteNotes", 3000),
    quotedAt,
  });
  refreshRFQ(id);
}
