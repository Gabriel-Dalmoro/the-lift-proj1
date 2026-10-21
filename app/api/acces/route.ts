import { NextResponse } from "next/server";
import { COOKIE_NAME, accessToken } from "@/lib/auth";

export async function POST(req: Request) {
  const password = process.env.SITE_PASSWORD;
  const { password: attempt } = (await req.json().catch(() => ({}))) as { password?: string };

  if (!password || typeof attempt !== "string" || attempt.trim() !== password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await accessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
