import "server-only";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { adminCookieName } from "@/lib/auth-constants";

function secretKey() {
  const secret =
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "development-only-session-secret");

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export function getAdminCredentials() {
  const email =
    process.env.ADMIN_EMAIL ||
    (process.env.NODE_ENV === "production" ? "" : "admin@example.com");
  const password =
    process.env.ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "production" ? "" : "admin123");

  return { email, password };
}

export async function createAdminToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey());
}

export async function verifyAdminToken(token?: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.email ? { email: String(payload.email) } : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(adminCookieName)?.value);
}

export async function setAdminSession(email: string) {
  const cookieStore = await cookies();
  const token = await createAdminToken(email);

  cookieStore.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}

export { adminCookieName };
