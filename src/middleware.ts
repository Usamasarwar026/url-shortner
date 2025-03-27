import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const publicRoutes = [
      "/",
      "/login",
      "/register",
      "/forgetPassword",
      "/resetPassword",
    ];

    const protectedRoutes = [
      "/main",
      "/slugUrl",
      "/editProfile",
      "/updatePassword",
    ];

    if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
      const loginUrl = new URL("/login", req.url);

      return NextResponse.redirect(loginUrl);
    }

    if (token && publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/main", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname;
        const publicRoutes = [
          "/",
          "/login",
          "/register",
          "/forgetPassword",
          "/resetPassword",
        ];

        if (publicRoutes.includes(pathname)) {
          return true;
        }

        return !!token;
      },
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
