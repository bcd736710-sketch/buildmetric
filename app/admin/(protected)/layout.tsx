import { redirect } from "next/navigation";

import { AdminUnauthorizedError, requireAdmin } from "@/lib/auth/require-admin";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof AdminUnauthorizedError) redirect("/admin/login");
    throw error;
  }
  return children;
}
