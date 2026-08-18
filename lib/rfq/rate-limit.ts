type RateEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateEntry>();

export type RFQRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkRFQRateLimit(ipAddress: string): RFQRateLimitResult {
  const windowMs = Number(process.env.RFQ_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
  const maxRequests = Number(process.env.RFQ_RATE_LIMIT_MAX ?? 5);
  const now = Date.now();
  const key = ipAddress || "unknown";
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { allowed: true };
}
