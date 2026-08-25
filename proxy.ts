// import { NextRequest, NextResponse } from "next/server";

// export function proxy(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;
//   const protectedRoutes = [
//     "/",
//     "/profile",
//     "/task",
//     "/users",
//     "/setting",
//   ];
//   const isProtected = protectedRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route),
//   );

//   const authRoutes = ["/login", "/signup"];
//   const isAuthRoute = authRoutes.includes(pathname)

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }
//   return NextResponse.next()
// }

// export const config = {
//     matcher: [ "/:path*","/profile/:path*","/setting/:path*","/login","/signup"]
// }
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Routes that anyone can visit (public)
  const publicRoutes = ["/login", "/signup"];

  const isPublicRoute = publicRoutes.includes(pathname);

  // 1. User is NOT logged in
  if (!token) {
    // If they try to visit any protected page (including "/") → go to login
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. User IS logged in
  if (token) {
    // If they try to visit login or signup → go to home
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api routes
     * - static files (_next, images, favicon, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};