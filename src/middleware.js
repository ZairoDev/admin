// NEXTAUTH: --> Authentication Middleware goes here

import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const otpPath = /^\/verify-otp\/.+$/.test(path);
  console.log("otp path check: ",otpPath);

  const isPublicPath =
    path === "/authentication/login/" ||
    path === "/authentication/signup/" ||
    path === "/verify-otp/" ||
    otpPath;

  const token = request.cookies.get("token")?.value || "";
  console.log("token from middleware: ", token, path);

  console.log(isPublicPath);


  if (isPublicPath && token) {
		console.log(isPublicPath, token);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  return NextResponse.next();
}

// Middleware will run on these routes
export const config = {
  matcher: [
    "/",
		"/users",
		"/allproperties",
    "/authentication/login/",
    "/verify-otp/:path*",
  ],
};