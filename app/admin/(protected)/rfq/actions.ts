"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { isRFQSubmissionStatus, setRFQSubmissionStatus, updateRFQFollowUpDate, updateRFQNotes } from "@/lib/rfq/repository";

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
