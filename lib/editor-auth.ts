import { createHmac, timingSafeEqual } from "node:crypto";

export const EDITOR_SESSION_COOKIE = "editor_session";
export const EDITOR_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
// Matches Clay Carson Photography's own editor -- same identity, so the
// same login works on both sites instead of a generic "Owner".
const OWNER_NAME = "clayk1959@gmail.com";

function parseEditorUsers(): Map<string, string> {
  const raw = process.env.EDITOR_USERS || "";
  const map = new Map<string, string>();
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;
    const name = trimmed.slice(0, separatorIndex).trim();
    const password = trimmed.slice(separatorIndex + 1).trim();
    if (name && password) map.set(name.toLowerCase(), password);
  }
  return map;
}

// Case-insensitive, since names here are email addresses and people don't
// type those consistently.
function getPasswordForUser(name: string): string | null {
  const normalized = name.trim().toLowerCase();
  if (normalized === OWNER_NAME.toLowerCase()) return process.env.EDITOR_PASSWORD || null;
  return parseEditorUsers().get(normalized) || null;
}

function constantTimeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function verifyCredentials(name: string, password: string): boolean {
  const expected = getPasswordForUser(name);
  if (!expected) return false;
  return constantTimeEqual(password, expected);
}

function sign(name: string, expiry: number, password: string): string {
  return createHmac("sha256", password).update(`${name}:${expiry}`).digest("base64url");
}

export function createSessionCookieValue(name: string): string | null {
  const password = getPasswordForUser(name);
  if (!password) return null;
  const expiry = Date.now() + EDITOR_SESSION_MAX_AGE_SECONDS * 1000;
  const signature = sign(name, expiry, password);
  return `${encodeURIComponent(name)}:${expiry}:${signature}`;
}

export function verifySessionCookieValue(value: string | undefined): { name: string } | null {
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length !== 3) return null;
  const [encodedName, expiryRaw, signature] = parts;
  const name = decodeURIComponent(encodedName);
  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return null;
  const password = getPasswordForUser(name);
  if (!password) return null;
  const expectedSignature = sign(name, expiry, password);
  if (!constantTimeEqual(signature, expectedSignature)) return null;
  return { name };
}

export { OWNER_NAME };
