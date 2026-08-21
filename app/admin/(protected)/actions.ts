"use server";

import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function logout() {
  await requireAdmin();
  await signOut({ redirectTo: "/admin/login" });
}
