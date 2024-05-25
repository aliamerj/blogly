import { NextResponse } from "next/server";
import { middleware } from "./auth.config";

const protectedRoutes = ["/blog", "/blog/write", "/integrate"];
const publicRoutes = ["/"];
const loginRoutes = ["/login", "/register"];
export default middleware((req) => {
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const url = req.url.replace(req.nextUrl.pathname, "/login");
    return Response.redirect(url);
  }
  if (req.auth && loginRoutes.includes(req.nextUrl.pathname)) {
    const url = req.url.replace(req.nextUrl.pathname, "/blog");
    return Response.redirect(url);
  }
  if (req.auth && publicRoutes.includes(req.nextUrl.pathname)) {
    const dashboard = new URL("/blog", req.url);
    return NextResponse.redirect(dashboard);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
