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

  const locale = pathnameLocale ?? 'cs';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  requestHeaders.set('x-pathname', pathname);

  if (pathnameLocale) {
    // Strip the locale prefix and rewrite to the real page.
    // Forward the locale on the request so server components and metadata
    // render that language instead of always emitting Czech HTML.
    const strippedPathname = pathname.replace(`/${pathnameLocale}`, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = strippedPathname;

    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.cookies.set('NEXT_LOCALE', pathnameLocale, { path: '/' });
    return response;
  }

  // No locale prefix = Czech (default)
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set('NEXT_LOCALE', 'cs', { path: '/' });
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico).*)'],
};
