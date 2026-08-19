import "server-only";

import { neon } from "@neondatabase/serverless";

const maximumFailures = 5;

function database() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");
  return neon(connectionString);
}

export async function isLoginAllowed(ipHash: string) {
  const sql = database();
  const rows = await sql.query(
    "SELECT blocked_until > now() AS blocked FROM admin_login_attempts WHERE ip_hash = $1",
    [ipHash],
  ) as Array<{ blocked: boolean }>;
  return !rows[0]?.blocked;
}

export async function recordFailedLogin(ipHash: string) {
  const sql = database();
  await sql.query(
    `INSERT INTO admin_login_attempts (ip_hash, failure_count)
     VALUES ($1, 1)
     ON CONFLICT (ip_hash) DO UPDATE SET
       window_started_at = CASE
         WHEN admin_login_attempts.window_started_at <= now() - INTERVAL '15 minutes' THEN now()
         ELSE admin_login_attempts.window_started_at
       END,
       failure_count = CASE
         WHEN admin_login_attempts.window_started_at <= now() - INTERVAL '15 minutes' THEN 1
         ELSE admin_login_attempts.failure_count + 1
       END,
       blocked_until = CASE
         WHEN (CASE
           WHEN admin_login_attempts.window_started_at <= now() - INTERVAL '15 minutes' THEN 1
           ELSE admin_login_attempts.failure_count + 1
         END) >= ${maximumFailures} THEN now() + INTERVAL '15 minutes'
         ELSE NULL
       END,
       updated_at = now()`,
    [ipHash],
  );
}

export async function clearLoginAttempts(ipHash: string) {
  const sql = database();
  await sql.query("DELETE FROM admin_login_attempts WHERE ip_hash = $1", [ipHash]);
}
