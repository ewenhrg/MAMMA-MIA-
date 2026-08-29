import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "mm_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const username = () => process.env.ADMIN_USERNAME?.trim() || "Ewen";
const password = () => process.env.ADMIN_PASSWORD?.trim() || "Mag-60740";
const secret = () =>
  process.env.ADMIN_SESSION_SECRET?.trim() ||
  `mm-admin-${username()}-${password()}`;

const sign = (value: string) =>
  createHmac("sha256", secret()).update(value).digest("hex");

const tokenFor = (user: string) => {
  const issued = Date.now().toString(36);
  const payload = `${user}.${issued}`;
  return `${payload}.${sign(payload)}`;
};

const verifyToken = (token: string | undefined) => {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [user, issued, signature] = parts;
  if (!user || !issued || !signature) return false;
  const expected = sign(`${user}.${issued}`);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  if (user !== username()) return false;
  const issuedAt = parseInt(issued, 36);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > MAX_AGE * 1000) return false;
  return true;
};

export const validateCredentials = (user: string, pass: string) =>
  user === username() && pass === password();

export const createSessionCookie = () => ({
  name: COOKIE,
  value: tokenFor(username()),
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
});

export const clearSessionCookie = () => ({
  name: COOKIE,
  value: "",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 0,
});

export const isAdminAuthenticated = async () => {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
};
