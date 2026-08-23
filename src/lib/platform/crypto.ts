import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { ACTIVATION_TOKEN_HOURS, RESET_TOKEN_HOURS, type AuthTokenType } from "./types";

export function newId() {
  return randomUUID();
}

export function nowIso(date = new Date()) {
  return date.toISOString();
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function generateRawToken() {
  return randomBytes(32).toString("base64url");
}

export function tokenEquals(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function expiryHoursFromNow(hours: number, from = new Date()) {
  return new Date(from.getTime() + hours * 60 * 60 * 1000).toISOString();
}

export function expiryForTokenType(type: AuthTokenType, from = new Date()) {
  return expiryHoursFromNow(
    type === "activation" ? ACTIVATION_TOKEN_HOURS : RESET_TOKEN_HOURS,
    from,
  );
}

export function isExpired(expiresAt: string, from = new Date()) {
  return new Date(expiresAt).getTime() <= from.getTime();
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function passwordIssues(password: string): string | null {
  if (password.length < 10) return "Use at least 10 characters.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Use a mix of letters and numbers.";
  }
  return null;
}

export function uploadIssues(mimeType: string, sizeBytes: number): string | null {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
  ];
  if (!allowed.includes(mimeType)) {
    return "Please upload a JPG, PNG, WebP, GIF, or PDF.";
  }
  if (sizeBytes > 10 * 1024 * 1024) return "Files must be 10 MB or smaller.";
  return null;
}
