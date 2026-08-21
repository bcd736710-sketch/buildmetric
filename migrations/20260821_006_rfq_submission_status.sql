BEGIN;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'rfq_submissions_status_check'
      AND conrelid = 'rfq_submissions'::regclass
  ) THEN
    ALTER TABLE rfq_submissions
      ADD CONSTRAINT rfq_submissions_status_check
      CHECK (status IN ('new', 'contacted', 'quoted', 'negotiating', 'won', 'lost'));
  END IF;
END $$;

COMMIT;
