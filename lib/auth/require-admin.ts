import "server-only";

import { auth } from "@/auth";
import { verifyAdminUsername } from "./credentials";

export class AdminUnauthorizedError extends Error {
  constructor() {
    super("Administrator authentication is required.");
  }
}

export async function requireAdmin() {
  const session = await auth();
  const username = session?.user?.name;
  if (!username || !verifyAdminUsername(username)) {
    throw new AdminUnauthorizedError();
  }
  return { username };
}
