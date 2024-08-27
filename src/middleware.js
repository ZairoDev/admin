// NEXTAUTH: --> Authentication Middleware goes here

import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/authentication/login" ||
    path === "/authentication/signup" ||
    path === "/verify-otp";

  const token = request.cookies.get("token")?.value || "";
  console.log("token from middleware: ", token);

  // Always allow access to the home route
  // if (path === "/") {
  //   return NextResponse.next();
  // }
	console.log("\n", isPublicPath, token);

	if (!token){
		return NextResponse.redirect(new URL("/authentication/login", request.url));
	}

  if (isPublicPath && token) {
		console.log(isPublicPath, token);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Middleware will run on these routes
export const config = {
  matcher: [
    "/",
		"/users",
		"/allproperties",
  ],
};
