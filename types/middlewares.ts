import type { NextRequest, NextResponse } from 'next/server';

export type NextMiddlewareLocale = {
  isLocalisedRoute: boolean;
  currentLocale: string | null;
  availableLocales: string[];
};

export type CustomMiddleware = {
  handler: (
    request: NextRequest,
    response: typeof NextResponse,
    locale: NextMiddlewareLocale
  ) => Promise<NextResponse>;
  matcher: (request: NextRequest, locale: NextMiddlewareLocale) => boolean;
  routes: string[];
};
