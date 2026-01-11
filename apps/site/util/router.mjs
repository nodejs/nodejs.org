import { glob } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { join as posixJoin } from 'node:path/posix';

import { defaultLocale } from '@node-core/website-i18n/index.mjs';

export const APP_ROOT = join(process.cwd(), 'app');
export const DEFAULT_LOCALE_ROOT = join(APP_ROOT, `[${defaultLocale.code}]`);

export const getAllPages = (options = {}) =>
  Array.fromAsync(
    glob('**/page.{md,mdx}', {
      cwd: DEFAULT_LOCALE_ROOT,
      ...options,
    })
  );

export const getAllRoutes = async options =>
  (await getAllPages(options)).map(pathToRoute);

export const pathToRoute = path => {
  const rel = relative(APP_ROOT, path).replaceAll(sep, '/');

  // Filename is the locale-less filepath
  const filename = rel.substring(rel.indexOf('/'));

  // Derive a URL-like pathnam
  return posixJoin(filename, '..');
};
