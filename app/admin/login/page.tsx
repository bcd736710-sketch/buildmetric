import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { verifyAdminUsername } from "@/lib/auth/credentials";

import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user?.name && verifyAdminUsername(session.user.name)) redirect("/admin");

  return (
    <main className="admin-login-shell">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <p className="admin-kicker">TROVANE</p>
        <h1 id="admin-login-title">Admin sign in</h1>
        <p>Use your administrator credentials to continue.</p>
        <LoginForm />
      </section>
    </main>
  );
}
