import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { adminCookieName } from "@/lib/auth-constants";

function getSecret() {
  const secret =
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "development-only-session-secret");
  return secret ? new TextEncoder().encode(secret) : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const secret = getSecret();
  const token = request.cookies.get(adminCookieName)?.value;

  if (secret && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // Fall through to login redirect.
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
