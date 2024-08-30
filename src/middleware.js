// // NEXTAUTH: --> Authentication Middleware goes here

// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const otpPath = /^\/verify-otp\/.+$/.test(path);
//   console.log("otp path check: ",otpPath);

//   const isPublicPath =
//     path === "/authentication/login/" ||
//     path === "/authentication/signup/" ||
//     path === "/verify-otp/" ||
//     otpPath;

//   const token = request.cookies.get("token")?.value || "";
//   console.log("token from middleware: ", token, path);

//   console.log(isPublicPath);


//   if (isPublicPath && token) {
// 		console.log(isPublicPath, token);
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/authentication/login", request.url));
//   }

//   return NextResponse.next();
// }

// // Middleware will run on these routes
// export const config = {
//   matcher: [
//     "/",
// 		"/users",
// 		"/allproperties",
//     "/authentication/login/",
//     "/authentication/signup/",
//     "/verify-otp/:path*",
//   ],
// };

// Above code work fine but have to add route for making them lock 



import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/authentication/login/" ||
    path === "/authentication/signup/" ||
    path.startsWith("/verify-otp/");

  // Retrieve the authentication token from cookies
  const token = request.cookies.get("token")?.value || "";
  console.log("Token from middleware:", token, path);

  // If the user is authenticated and tries to access a public path, redirect to home
  if (isPublicPath && token) {
    console.log("Authenticated user trying to access public path:", isPublicPath, token);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not authenticated and tries to access a protected path, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  // Allow access to the requested path
  return NextResponse.next();
}

// Middleware will run on all routes except for public paths
export const config = {
  matcher: [
    "/((?!_next/static|favicon.ico).*)", // Matches all paths except for static files and favicon
  ],
};
