import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  createSessionCookie,
  validateCredentials,
} from "@/lib/events/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const user = body?.username?.trim() ?? "";
  const pass = body?.password ?? "";

  if (!validateCredentials(user, pass)) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(createSessionCookie());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clearSessionCookie());
  return response;
}
