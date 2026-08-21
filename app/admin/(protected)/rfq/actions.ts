"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { isRFQSubmissionStatus, setRFQSubmissionStatus } from "@/lib/rfq/repository";

export async function updateRFQStatus(id: string, formData: FormData) {
  await requireAdmin();
  const status = formData.get("status");
  if (!isRFQSubmissionStatus(status)) throw new Error("Choose a valid RFQ status.");
  await setRFQSubmissionStatus(id, status);
  revalidatePath("/admin/rfq");
  revalidatePath(`/admin/rfq/${id}`);
}
