// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const { pathname } = req.nextUrl;

//     const protectedRoutes = [
//       "/main",
//       "/slugUrl",
//       "/editProfile",
//       "/updatePassword",
//     ];

//     const authRoutes = [
//       "/login",
//       "/register",
//       "/forgetPassword",
//       "/resetPassword",
//     ];

//     const isHomePage = pathname === "/";

//     const isProtectedRoute = protectedRoutes.some((route) =>
//       pathname.startsWith(route)
//     );

//     const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

//     if (!token && isProtectedRoute) {
//       const loginUrl = new URL("/login", req.url);
//       loginUrl.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     if (token && (isAuthRoute || isHomePage)) {
//       return NextResponse.redirect(new URL("/main", req.url));
//     }

//     if (!token && (isAuthRoute || isHomePage)) {
//       return NextResponse.next();
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: () => {
//         return true;
//       },
//     },
//     pages: {
//       signIn: "/login",
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/",
//     "/main",
//     "/main/:path*",
//     "/slugUrl",
//     "/editProfile",
//     "/updatePassword",
//     "/login",
//     "/register",
//     "/forgetPassword",
//     "/resetPassword",
//   ],
// };


import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname, origin } = req.nextUrl;

    const protectedRoutes = [
      "/main",
      "/slugUrl",
      "/editProfile",
      "/updatePassword",
    ];

    const authRoutes = [
      "/login",
      "/register",
      "/forgetPassword",
      "/resetPassword",
    ];

    const isHomePage = pathname === "/";
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // If user is NOT logged in and tries to access a protected route
    if (!token && isProtectedRoute) {
      const loginUrl = new URL("/login", origin); // Use `origin` instead of `req.url`
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user IS logged in and tries to access auth routes (login/register)
    if (token && (isAuthRoute || isHomePage)) {
      return NextResponse.redirect(new URL("/main", origin)); // Use `origin`
    }

    // Allow access if not logged in and accessing auth routes
    if (!token && (isAuthRoute || isHomePage)) {
      return NextResponse.next();
    }

    // Default: Allow access
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Must return `true` only if token exists
    },
    pages: {
      signIn: "/login", // Redirect to `/login` if unauthorized
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/main",
    "/main/:path*",
    "/slugUrl",
    "/editProfile",
    "/updatePassword",
    "/login",
    "/register",
    "/forgetPassword",
    "/resetPassword",
  ],
};