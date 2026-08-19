import { requireAdmin } from "@/lib/auth/require-admin";

import { logout } from "./actions";

export default async function AdminHomePage() {
  const { username } = await requireAdmin();
  return (
    <main className="admin-shell">
      <section className="admin-card">
        <p className="admin-kicker">TROVANE</p>
        <h1>Admin</h1>
        <p>Signed in as {username}.</p>
        <p>Products management will be added in the next phase.</p>
        <form action={logout}><button type="submit">Sign Out</button></form>
      </section>
    </main>
  );
}
