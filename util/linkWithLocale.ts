import { UrlObject } from 'url';

export const linkWithLocale = (locale: string) => (path: string | UrlObject) =>
  `/${locale}${path.toString()}`;
