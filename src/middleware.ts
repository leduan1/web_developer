import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'vi', 'ru'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files like favicon.ico
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    // Strip the locale prefix and rewrite to the real page
    const strippedPathname = pathname.replace(`/${pathnameLocale}`, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = strippedPathname;

    const response = NextResponse.rewrite(url);
    // Set cookie so server components could read it if needed
    response.cookies.set('NEXT_LOCALE', pathnameLocale, { path: '/' });
    return response;
  }

  // No locale prefix = Czech (default)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico).*)'],
};
