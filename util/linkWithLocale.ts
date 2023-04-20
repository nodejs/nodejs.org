import type { UrlObject } from 'url';

export const linkWithLocale = (locale: string) => {
  return (path: string | UrlObject) => {
    path = path.toString();
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };
};
