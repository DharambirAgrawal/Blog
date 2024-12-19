import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A utility to securely store and retrieve encrypted tokens
// import jwt from 'jsonwebtoken';

// Secret key for encrypting/decrypting tokens (should be stored in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your-secure-secret-key";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Check if user is authenticated
  const token = request.cookies.get("auth-token");
  // console.log(token);
  const cok = request.cookies.has("nextjs");
  // console.log(cok);
  //   const response = NextResponse.next()
  //   response.cookies.set('vercel', 'fast')
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Redirect to login if not authenticated
      // return NextResponse.redirect(new URL("/auth/login", url));
    }
    // request.cookies.get('auth-token')
    // Verify the token
    try {
      //   jwt.verify(token.value, JWT_SECRET); // Verify token
    } catch (err) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/auth/login", url));
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Matcher: Apply middleware to routes starting with "auth/*" or "dashboard/*"
export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};

// res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; Path=/;`);
// return res.status(200).json({ message: 'Login successful' });

// logout
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     res.setHeader('Set-Cookie', `auth-token=; HttpOnly; Secure; Path=/; Max-Age=0;`);
//     return res.status(200).json({ message: 'Logged out' });
//   }
