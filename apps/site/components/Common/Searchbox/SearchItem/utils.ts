import type { Document } from '../DocumentLink';

export const uppercaseFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getFormattedPath = (path: string, title: string) =>
  `${path
    .replace(/#.+$/, '')
    .split('/')
    .map(element => element.replaceAll('-', ' '))
    .map(element => uppercaseFirst(element))
    .filter(Boolean)
    .join(' > ')} — ${title}`;

export const getDocumentHref = (document: Document, locale: string) =>
  document.siteSection?.toLowerCase() === 'docs'
    ? `/${document.path}`
    : `/${locale}/${document.path}`;
