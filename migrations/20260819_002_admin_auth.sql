BEGIN;

CREATE TABLE admin_login_attempts (
  ip_hash TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  failure_count INTEGER NOT NULL DEFAULT 0 CHECK (failure_count >= 0),
  blocked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX admin_login_attempts_blocked_until_idx
  ON admin_login_attempts (blocked_until)
  WHERE blocked_until IS NOT NULL;

COMMIT;
