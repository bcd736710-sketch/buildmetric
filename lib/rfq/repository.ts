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
