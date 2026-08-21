BEGIN;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS internal_notes TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS next_follow_up_at TIMESTAMP;

COMMIT;
