import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getRFQSubmissionById, RFQ_SUBMISSION_STATUSES } from "@/lib/rfq/repository";
import { updateRFQStatus } from "../actions";

function value(entry: string | undefined) {
  return entry || "—";
}

function date(entry: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "short" }).format(new Date(entry));
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}

export default async function RFQDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const submission = await getRFQSubmissionById(id);
  if (!submission) notFound();
  const { record } = submission;
  return <main className="admin-shell"><article className="admin-card wide"><p className="admin-kicker">RFQ {submission.id}</p><h1>{record.company || record.name}</h1><p><Link href="/admin/rfq">Back to RFQs</Link></p><form action={updateRFQStatus.bind(null, submission.id)} className="admin-rfq-status"><label>Status<select defaultValue={submission.status} name="status">{RFQ_SUBMISSION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select></label><button type="submit">Update status</button></form><p className="admin-rfq-received">Received {date(submission.createdAt)}</p><div className="admin-rfq-details"><DetailSection title="Customer Information"><dl><div><dt>Name</dt><dd>{record.name}</dd></div><div><dt>Company</dt><dd>{value(record.company)}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${record.email}`}>{record.email}</a></dd></div><div><dt>WhatsApp</dt><dd>{value(record.whatsapp)}</dd></div><div><dt>Country</dt><dd>{record.country}</dd></div></dl></DetailSection><DetailSection title="Product Information"><dl><div><dt>Product</dt><dd>{record.product}</dd></div><div><dt>Quantity</dt><dd>{record.quantity}</dd></div><div><dt>Target Price</dt><dd>{value(record.targetPrice)}</dd></div><div><dt>Intent</dt><dd>{value(record.intent)}</dd></div></dl></DetailSection><DetailSection title="Customization & Packaging"><dl><div><dt>Custom Logo</dt><dd>{value(record.customLogo)}</dd></div><div><dt>Custom Packaging</dt><dd>{value(record.customPackaging)}</dd></div></dl></DetailSection><DetailSection title="Message"><p className="admin-rfq-message">{value(record.requirements)}</p></DetailSection><DetailSection title="Reference File">{submission.referenceFile ? <p><a href={submission.referenceFile.url} rel="noreferrer" target="_blank">{submission.referenceFile.filename}</a>{submission.referenceFile.contentType ? ` (${submission.referenceFile.contentType})` : ""}</p> : <p>—</p>}</DetailSection></div></article></main>;
}
