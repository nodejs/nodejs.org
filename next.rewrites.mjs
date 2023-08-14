'use strict';

import { siteRedirects } from './next.json.mjs';
import { availableLocales } from './next.locales.mjs';

// We only need Locale Codes for our URL redirects and rewrties
const localeCodes = availableLocales.map(locale => locale.code);

// This allows us to prefix redirects with all available locale codes so that redirects are not bound to a single locale
// This also transforms the locale itself as a matching group that can be used for rewrites
// This match group also has an empty string match for the lack of locales, for example
// Example: /:locale(ar/|ca/|de/|en/|es/|fa/|fr/|)about/security
// Would match /ar/about/security, /ar/about/security/ for every language code (replace "ar") and
// it would also match /about/security (without any language prefix)
const localesMatch = `/:locale(${localeCodes.join('|')}|)?/`;

/**
 * These are external redirects that happen before we check dynamic routes and rewrites
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 * @type {import('next').NextConfig['redirects']}
 */
const redirects = async () => {
  return siteRedirects.external.map(({ source, destination }) => ({
    source: source.replace('/:locale/', localesMatch),
    permanent: true,
    destination,
  }));
};

/**
 * These are rewrites that happen before we check dynamic routes and after we check regular redirects
 * These should be used either for internal or external rewrite rules (like NGINX, for example)
 * These are sourced originally from https://github.com/nodejs/build/blob/main/ansible/www-standalone/resources/config/nodejs.org?plain=1
 * and were then converted to Next.js rewrites. Note that only relevant rewrites were added, and some were modified to match Next.js's syntax
 *
 * @type {import('next').NextConfig['rewrites']}
 */
const rewrites = async () => ({
  afterFiles: siteRedirects.internal.map(({ source, destination }) => ({
    source: source.replace('/:locale/', localesMatch),
    destination,
  })),
});

export { rewrites, redirects };
