import { availableLocales, getCurrentLocale } from './next.locales.mjs';
import type { NextRequest, NextResponse } from 'next/server';
import type { CustomMiddleware, NextMiddlewareLocale } from './types';

const availableLocaleCodes = availableLocales.map(locale => locale.code);

const createMiddleware = (response: typeof NextResponse) => {
  const localeMiddleware = (request: NextRequest): NextMiddlewareLocale => {
    const currentLocale = getCurrentLocale(request.nextUrl.pathname);

    return {
      currentLocale: currentLocale.code,
      availableLocales: availableLocaleCodes,
      isLocalisedRoute: currentLocale.code !== 'en',
    };
  };

  return (middlewares: CustomMiddleware[]) => {
    const middleware = async (request: NextRequest) => {
      const locale = localeMiddleware(request);

      const matchedMiddleware = middlewares.find(middleware =>
        middleware.matcher(request, locale)
      );

      if (matchedMiddleware) {
        return matchedMiddleware.handler(request, response, locale);
      }

      return response.next();
    };

    const matcher = middlewares.map(middleware => middleware.routes).flat();

    return { middleware, matcher };
  };
};

export default createMiddleware;
