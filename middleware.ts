import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, accessToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  const cookie = req.cookies.get(COOKIE_NAME)?.value;

  if (password && cookie && cookie === (await accessToken(password))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/acces";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except the gate itself, its API, Next internals and static files.
  matcher: ["/((?!acces|api/acces|_next/static|_next/image|favicon.ico|robots.txt|images/).*)"],
};
