import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getRFQSubmissions } from "@/lib/rfq/repository";

function date(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function followUpDate(value: string | null) {
  return value ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value)) : "—";
}

export default async function RFQListPage() {
  await requireAdmin();
  const submissions = await getRFQSubmissions();
  return <main className="admin-shell"><section className="admin-card wide"><p className="admin-kicker">TROVANE</p><h1>RFQs</h1><p><Link href="/admin">Admin</Link> · <Link href="/admin/products">Products</Link> · <Link href="/admin/categories">Categories</Link></p>{submissions.length ? <table><thead><tr><th>Status</th><th>Customer</th><th>Company</th><th>Email</th><th>Product</th><th>Quantity</th><th>Country</th><th>Next Follow-up</th><th>Received</th><th /></tr></thead><tbody>{submissions.map((submission) => <tr key={submission.id}><td><span className="admin-status">{submission.status}</span></td><td>{submission.record.name}</td><td>{submission.record.company || "—"}</td><td><a href={`mailto:${submission.record.email}`}>{submission.record.email}</a></td><td>{submission.record.product}</td><td>{submission.record.quantity}</td><td>{submission.record.country}</td><td>{followUpDate(submission.nextFollowUpAt)}</td><td>{date(submission.createdAt)}</td><td><Link href={`/admin/rfq/${encodeURIComponent(submission.id)}`}>View</Link></td></tr>)}</tbody></table> : <p>No RFQ submissions yet.</p>}</section></main>;
}
