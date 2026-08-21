import "server-only";

import { neon } from "@neondatabase/serverless";

export type RFQReferenceFile = {
  filename: string;
  originalName: string;
  type: string;
  size: number;
};

export type RFQReferenceBlob = RFQReferenceFile & {
  pathname: string;
  url: string;
};

export type RFQRecord = {
  id: string;
  createdAt: string;
  ipAddress: string;
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  product: string;
  quantity: string;
  customLogo: string;
  customPackaging: string;
  targetPrice: string;
  requirements: string;
  intent: string;
  referenceImage?: RFQReferenceFile;
};

export type RFQEmailStatus = "pending" | "sent" | "failed";
export const RFQ_SUBMISSION_STATUSES = ["new", "contacted", "quoted", "negotiating", "won", "lost"] as const;
export type RFQSubmissionStatus = (typeof RFQ_SUBMISSION_STATUSES)[number];

export type RFQSubmission = {
  id: string;
  createdAt: string;
  status: RFQSubmissionStatus;
  internalNotes: string | null;
  nextFollowUpAt: string | null;
  record: RFQRecord;
  referenceFile: { url: string; filename: string; contentType: string | null; size: number | null } | null;
};

export class RFQDatabaseConfigurationError extends Error {
  constructor() {
    super("RFQ persistence is not configured.");
  }
}

let schemaPromise: Promise<void> | undefined;

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new RFQDatabaseConfigurationError();
  return neon(connectionString);
}

async function ensureRFQSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = database();
      await sql`
        CREATE TABLE IF NOT EXISTS rfq_submissions (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL,
          payload JSONB NOT NULL,
          reference_blob_url TEXT,
          reference_blob_pathname TEXT,
          reference_filename TEXT,
          reference_content_type TEXT,
          reference_size INTEGER,
          internal_notes TEXT,
          next_follow_up_at TIMESTAMP,
          status TEXT NOT NULL DEFAULT 'new'
            CHECK (status IN ('new', 'contacted', 'quoted', 'negotiating', 'won', 'lost')),
          email_status TEXT NOT NULL DEFAULT 'pending'
            CHECK (email_status IN ('pending', 'sent', 'failed')),
          email_provider_id TEXT,
          email_sent_at TIMESTAMPTZ,
          email_error TEXT
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS rfq_submissions_created_at_idx
        ON rfq_submissions (created_at DESC)
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS internal_notes TEXT
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS next_follow_up_at TIMESTAMP
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS customer_email_status TEXT NOT NULL DEFAULT 'pending'
          CHECK (customer_email_status IN ('pending', 'sent', 'failed'))
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS customer_email_provider_id TEXT
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS customer_email_sent_at TIMESTAMPTZ
      `;
      await sql`
        ALTER TABLE rfq_submissions
        ADD COLUMN IF NOT EXISTS customer_email_error TEXT
      `;
    })();
  }
  await schemaPromise;
}

function recordFromPayload(payload: unknown): RFQRecord {
  const value = typeof payload === "string" ? JSON.parse(payload) : payload;
  if (!value || typeof value !== "object") throw new Error("RFQ payload is invalid.");
  return value as RFQRecord;
}

function submissionFromRow(row: {
  id: string; createdAt: string; status: RFQSubmissionStatus; payload: unknown;
  internalNotes: string | null; nextFollowUpAt: string | null;
  referenceBlobUrl: string | null; referenceFilename: string | null;
  referenceContentType: string | null; referenceSize: number | null;
}): RFQSubmission {
  return {
    id: row.id,
    createdAt: row.createdAt,
    status: row.status,
    internalNotes: row.internalNotes,
    nextFollowUpAt: row.nextFollowUpAt,
    record: recordFromPayload(row.payload),
    referenceFile: row.referenceBlobUrl && row.referenceFilename
      ? { url: row.referenceBlobUrl, filename: row.referenceFilename, contentType: row.referenceContentType, size: row.referenceSize }
      : null,
  };
}

export function isRFQSubmissionStatus(value: unknown): value is RFQSubmissionStatus {
  return typeof value === "string" && (RFQ_SUBMISSION_STATUSES as readonly string[]).includes(value);
}

export async function getRFQSubmissions(): Promise<RFQSubmission[]> {
  await ensureRFQSchema();
  const sql = database();
  const rows = await sql`SELECT id, created_at AS "createdAt", status, internal_notes AS "internalNotes",
    next_follow_up_at AS "nextFollowUpAt", payload,
    reference_blob_url AS "referenceBlobUrl", reference_filename AS "referenceFilename",
    reference_content_type AS "referenceContentType", reference_size AS "referenceSize"
    FROM rfq_submissions ORDER BY created_at DESC` as Array<{
      id: string; createdAt: string; status: RFQSubmissionStatus; internalNotes: string | null;
      nextFollowUpAt: string | null; payload: unknown;
      referenceBlobUrl: string | null; referenceFilename: string | null;
      referenceContentType: string | null; referenceSize: number | null;
    }>;
  return rows.map(submissionFromRow);
}

export async function getRFQById(id: string): Promise<RFQSubmission | null> {
  await ensureRFQSchema();
  const sql = database();
  const rows = await sql`SELECT id, created_at AS "createdAt", status, internal_notes AS "internalNotes",
    next_follow_up_at AS "nextFollowUpAt", payload,
    reference_blob_url AS "referenceBlobUrl", reference_filename AS "referenceFilename",
    reference_content_type AS "referenceContentType", reference_size AS "referenceSize"
    FROM rfq_submissions WHERE id = ${id} LIMIT 1` as Array<{
      id: string; createdAt: string; status: RFQSubmissionStatus; internalNotes: string | null;
      nextFollowUpAt: string | null; payload: unknown;
      referenceBlobUrl: string | null; referenceFilename: string | null;
      referenceContentType: string | null; referenceSize: number | null;
    }>;
  return rows[0] ? submissionFromRow(rows[0]) : null;
}

export const getRFQSubmissionById = getRFQById;

export async function setRFQSubmissionStatus(id: string, status: RFQSubmissionStatus) {
  await ensureRFQSchema();
  const sql = database();
  await sql`UPDATE rfq_submissions SET status = ${status} WHERE id = ${id}`;
}

export async function updateRFQNotes(id: string, internalNotes: string | null) {
  await ensureRFQSchema();
  const sql = database();
  await sql`UPDATE rfq_submissions SET internal_notes = ${internalNotes} WHERE id = ${id}`;
}

export async function updateRFQFollowUpDate(id: string, nextFollowUpAt: string | null) {
  await ensureRFQSchema();
  const sql = database();
  await sql`UPDATE rfq_submissions SET next_follow_up_at = ${nextFollowUpAt}::timestamp WHERE id = ${id}`;
}

export async function saveRFQRecord({
  record,
  referenceBlob,
}: {
  record: RFQRecord;
  referenceBlob?: RFQReferenceBlob;
}) {
  await ensureRFQSchema();
  const sql = database();
  await sql`
    INSERT INTO rfq_submissions (
      id, created_at, payload, reference_blob_url, reference_blob_pathname,
      reference_filename, reference_content_type, reference_size, email_status,
      customer_email_status
    ) VALUES (
      ${record.id}, ${record.createdAt}::timestamptz, ${JSON.stringify(record)}::jsonb,
      ${referenceBlob?.url ?? null}, ${referenceBlob?.pathname ?? null},
      ${referenceBlob?.originalName ?? null}, ${referenceBlob?.type ?? null},
      ${referenceBlob?.size ?? null}, 'pending', 'pending'
    )
  `;
}

export async function updateRFQEmailStatus({
  id,
  status,
  providerId,
  error,
}: {
  id: string;
  status: RFQEmailStatus;
  providerId?: string;
  error?: string;
}) {
  await ensureRFQSchema();
  const sql = database();
  await sql`
    UPDATE rfq_submissions
    SET
      email_status = ${status},
      email_provider_id = ${providerId ?? null},
      email_sent_at = ${status === "sent" ? new Date().toISOString() : null}::timestamptz,
      email_error = ${error ?? null}
    WHERE id = ${id}
  `;
}

export async function updateRFQCustomerEmailStatus({
  id,
  status,
  providerId,
  error,
}: {
  id: string;
  status: RFQEmailStatus;
  providerId?: string;
  error?: string;
}) {
  await ensureRFQSchema();
  const sql = database();
  await sql`
    UPDATE rfq_submissions
    SET
      customer_email_status = ${status},
      customer_email_provider_id = ${providerId ?? null},
      customer_email_sent_at = ${status === "sent" ? new Date().toISOString() : null}::timestamptz,
      customer_email_error = ${error ?? null}
    WHERE id = ${id}
  `;
}
