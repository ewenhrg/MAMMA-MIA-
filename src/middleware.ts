import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  isLocale,
  locales,
} from "@/lib/i18n";

const hasLocalePrefix = (pathname: string) =>
  locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

/** Remembered choice first, browser preference second, English last. */
const resolveLocale = (request: NextRequest) => {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) return stored;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((entry) => isLocale(entry.tag));

  return preferred && isLocale(preferred.tag) ? preferred.tag : defaultLocale;
};

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (hasLocalePrefix(pathname)) {
    const locale = pathname.split("/")[1];
    const response = NextResponse.next();
    if (isLocale(locale) && request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
      response.cookies.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return response;
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|brand|photos|favicon.ico|.*\\.[\\w]+$).*)"],
};
