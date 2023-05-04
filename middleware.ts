import { NextResponse } from 'next/server';
import localeConfig from './i18n/config.json';
import type { NextRequest } from 'next/server';

const LOCALE_CODES = localeConfig.map(locale => locale.code);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // This function allows us to redirect with a Locale Code
  const redirectWithLocale = (locale: string) => {
    const redirectUrl = `/${locale}${pathname}${search}`;

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  };

  const localeCookie = req.cookies.get('NEXT_LOCALE');

  // If we already have a NEXT_LOCALE Cookie, then Redirect to the stored Locale Code
  if (localeCookie && localeCookie.value) {
    return redirectWithLocale(localeCookie.value);
  }

  // If not, we try to check if the Browser is sending `Accept-Language` Header
  const acceptedLanguagesRaw = req.headers.get('Accept-Language') || 'en';

  // If present, we try to split the format into ['code', 'q=order', ...]
  // Where q= is the precedence of the Accepted Language
  // We then filter those out as we don't want them
  const acceptedLanguages = acceptedLanguagesRaw
    .split(';')
    .map(collection => collection.split(','))
    .flat()
    .filter(locale => !locale.startsWith('q='));

  // We check if we have any matching Language in the order of preference given
  // And if yes, we return that Locale Code
  const matchedLocaleCode = acceptedLanguages.find(acceptedLocale =>
    LOCALE_CODES.some(supportedLocale => supportedLocale === acceptedLocale)
  );

  // We create a new Response Object containing the Locale Match or the default Language
  const responseWithCookie = redirectWithLocale(matchedLocaleCode || 'en');

  // Then we set a Cookie to avoid this calculation from happening on every / hit
  responseWithCookie.cookies.set('NEXT_LOCALE', matchedLocaleCode || 'en');

  return responseWithCookie;
}

export const config = { matcher: '/' };
