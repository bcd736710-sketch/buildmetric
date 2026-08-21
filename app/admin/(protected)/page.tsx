import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";

import { logout } from "./actions";
import { stats } from "@/lib/admin/products";

export default async function AdminHomePage() {
  const { username } = await requireAdmin();
  const counts = await stats();
  return (
    <main className="admin-shell">
      <section className="admin-card">
        <p className="admin-kicker">TROVANE</p>
        <h1>Admin</h1>
        <p>Signed in as {username}.</p>
        <p>Published {counts.published} · Draft {counts.draft} · Archived {counts.archived} · Categories {counts.categories}</p>
        <p><Link href="/admin/products">Products</Link> · <Link href="/admin/categories">Categories</Link> · <Link href="/admin/rfq">RFQs</Link></p>
        <form action={logout}><button type="submit">Sign Out</button></form>
      </section>
    </main>
  );
}
