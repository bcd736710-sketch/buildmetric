"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type LoginState = { error: string | null };

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  try {
    formData.set("redirectTo", "/admin");
    await signIn("credentials", formData);
    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) return { error: "Invalid username or password." };
    throw error;
  }
}
