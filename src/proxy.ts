import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  isDemoAuthEnabled,
  isPublicDemoAccessEnabled,
} from "@/lib/auth";

export function proxy(request: NextRequest) {
  if (isDemoAuthEnabled() || isPublicDemoAccessEnabled()) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  if (!hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/resumes/:path*",
    "/jobs/analyze/:path*",
    "/analysis/:path*",
    "/applications/:path*",
  ],
};
