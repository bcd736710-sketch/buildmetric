import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
const hashPattern = /^scrypt\$(\d+)\$(\d+)\$(\d+)\$([A-Za-z0-9_-]+)\$([A-Za-z0-9_-]+)$/;

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  const size = Math.max(leftBuffer.length, rightBuffer.length, 1);
  const paddedLeft = Buffer.alloc(size);
  const paddedRight = Buffer.alloc(size);
  leftBuffer.copy(paddedLeft);
  rightBuffer.copy(paddedRight);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(paddedLeft, paddedRight);
}

export async function verifyAdminPassword(password: string) {
  const encodedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!encodedHash) return false;

  const match = encodedHash.match(hashPattern);
  if (!match) return false;

  const [, workFactor, blockSize, parallelization, saltValue, hashValue] = match;
  const expected = Buffer.from(hashValue, "base64url");
  const salt = Buffer.from(saltValue, "base64url");
  const derived = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, expected.length, {
      N: Number(workFactor),
      r: Number(blockSize),
      p: Number(parallelization),
      maxmem: 64 * 1024 * 1024,
    }, (error, key) => error ? reject(error) : resolve(key));
  });

  return expected.length === derived.length && timingSafeEqual(expected, derived);
}

export function verifyAdminUsername(username: string) {
  const configuredUsername = process.env.ADMIN_USERNAME;
  return configuredUsername ? safeEqual(username, configuredUsername) : false;
}

export function loginIpHash(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not configured.");
  return createHmac("sha256", secret).update(ipAddress).digest("hex");
}
