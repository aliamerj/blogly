import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./middleware.type";

const configPath = ["/blog", "/blog/write", "/blog/update", "/integrate"]

export const authMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (configPath.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const url = new URL("/api/auth/signin", request.url);
        url.searchParams.set("callback ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    if (pathname.length === 1 && pathname.startsWith("/")) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (token) {
        const url = new URL("/blog", request.url);
        url.searchParams.set("callback ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    if (pathname.startsWith("/login")) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (token) {
        const url = new URL("/blog", request.url);
        url.searchParams.set("callback ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    if (pathname.startsWith("/register")) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (token) {
        const url = new URL("/blog", request.url);
        url.searchParams.set("callback ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
