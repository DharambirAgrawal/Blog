import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Check if user is authenticated
  const token = request.cookies.get("token");
  // console.log(token);

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/auth/login", url));
    }
    // Verify the token
    try {
      const res = await fetch(`${process.env.MAIN_URL}/api/auth/verify`, {
        method: "GET",
        headers: {
          Cookie: `token=${token.value}`,
        },
      });
      if (!res.ok) {
        return NextResponse.redirect(new URL("/auth/login", url));
      }
    } catch (err) {
      console.error(err);
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/auth/login", url));
    }
  }
  if (pathname.startsWith("/auth")) {
    if (!token) {
      return NextResponse.next(); // Allow the request to
    }
    // Verify the token
    try {
      const res = await fetch(`${process.env.MAIN_URL}/api/auth/verify`, {
        method: "GET",
        headers: {
          Cookie: `token=${token.value}`,
        },
      });
      if (res.ok) {
        return NextResponse.redirect(new URL("/dashboard", url));
      }
    } catch (err) {
      console.error(err);
      return NextResponse.next(); // Allow the request
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Matcher: Apply middleware to routes starting with "auth/*" or "dashboard/*"
export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/dashboard"],
};
