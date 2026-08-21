BEGIN;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS quoted_price TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS currency TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS quote_file_url TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS quote_notes TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS quoted_at TIMESTAMP;

COMMIT;
