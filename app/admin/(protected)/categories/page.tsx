import Link from "next/link";
import { getAllCategories } from "@/lib/categories/repository";

export default async function CategoriesPage() {
  const rows = await getAllCategories();
  return <main className="admin-shell"><section className="admin-card wide"><h1>Categories</h1><p><Link href="/admin/categories/new">New category</Link></p><table><thead><tr><th>Name</th><th>Slug</th><th>Order</th><th>Status</th><th /></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td>{row.name}</td><td>{row.slug}</td><td>{row.sortOrder}</td><td>{row.status}</td><td><Link href={`/admin/categories/${row.id}/edit`}>Edit</Link></td></tr>)}</tbody></table></section></main>;
}
