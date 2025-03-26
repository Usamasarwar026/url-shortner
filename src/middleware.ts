import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

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

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (!token && isProtectedRoute) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token && (isAuthRoute || isHomePage)) {
      return NextResponse.redirect(new URL("/main", req.url));
    }

    if (!token && (isAuthRoute || isHomePage)) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/main",
    "/slugUrl",
    "/editProfile",
    "/updatePassword",
    "/login",
    "/register",
    "/forgetPassword",
    "/resetPassword",
  ],
};
