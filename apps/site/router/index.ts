import { readFile } from 'node:fs/promises';
import { join, normalize, sep } from 'node:path';

import { availableLocaleCodes, defaultLocale } from '@node-core/website-i18n';
import { compileMDX } from 'next-mdx-remote/rsc';
import { cache } from 'react';
import readingTime from 'reading-time';

import {
  BASE_PATH,
  BASE_URL,
  DEFAULT_CATEGORY_OG_TYPE,
  ENABLE_STATIC_EXPORT,
} from '#site/next.constants.mjs';
import { CONTENT_ROOT, getMarkdownFiles } from '#site/next.helpers.mjs';
import { siteConfig } from '#site/next.json.mjs';

import type { MarkdownFile } from '../types';

import { PAGE_METADATA, INDEX_PATTERN } from './constants';
import components from './mdx/components.mjs';
import getPlugins from './mdx/plugins';

const pathnameToFilename = new Map<string, string>();

/**
 * Normalize any filesystem path into a stable, URL-safe form.
 */
const normalizePath = (path: string): string =>
  normalize(path).replace(/\\/g, '/').replace(/^\./, '');

/**
 * Convert a filename into a route pathname
 */
const normalizePathname = (filename: string): string => {
  let pathname = filename.replace(INDEX_PATTERN, '');

  if (pathname.length > 1 && pathname.endsWith(sep)) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
};

/**
 * Attempt to load and compile a markdown file for a given locale + pathname.
 * Returns `null` if the file does not exist
 */
const tryLoadMarkdown = async (locale: string, pathname: string) => {
  const normalizedPath = normalizePath(pathname);
  const filename = pathnameToFilename.get(normalizedPath);

  if (!filename) {
    return null;
  }

  const filePath = join(CONTENT_ROOT, locale, filename);

  const source = await readFile(filePath, 'utf-8');

  const metadata = {
    readingTime: readingTime(source),
  };

  const compiled = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: getPlugins(metadata),
    },
  });

  return {
    pathname: `/${normalizedPath}`,
    filename,
    ...metadata,
    ...compiled,
  } as MarkdownFile;
};

/**
 * Load markdown with locale fallback.
 * Tries requested locale first, then default locale.
 */
export const getMarkdownFile = cache(
  async (locale: string, pathname: string) => {
    return (
      (await tryLoadMarkdown(locale, pathname)) ??
      (locale !== defaultLocale.code
        ? tryLoadMarkdown(defaultLocale.code, pathname)
        : null)
    );
  }
);

/**
 * Construct a fully-qualified URL for a locale + pathname.
 */
const getUrlForPathname = (locale: string, pathname: string) => {
  const normalizedPath = normalizePath(pathname);
  const suffix = normalizedPath ? `/${normalizedPath}` : '';
  return `${BASE_URL}${BASE_PATH}/${locale}${suffix}`;
};

/**
 * Generate alternate-language URLs for SEO metadata.
 */
const buildAlternateLanguages = (path: string): Record<string, string> => {
  const alternates: Record<string, string> = {
    'x-default': getUrlForPathname(defaultLocale.code, path),
  };

  for (const locale of availableLocaleCodes) {
    alternates[locale] = getUrlForPathname(locale, path);
  }

  return alternates;
};

/**
 * Generate full metadata object for a page
 */
export const getPageMetadata = cache(async (locale: string, path: string) => {
  const markdown = await getMarkdownFile(locale, path);
  const metadata = Object.assign({}, PAGE_METADATA);

  if (!markdown) {
    return metadata;
  }

  const { frontmatter } = markdown;

  /* Title */
  metadata.title = frontmatter.title
    ? `${siteConfig.title} — ${frontmatter.title}`
    : siteConfig.title;

  /* Description */
  metadata.description = frontmatter.description ?? siteConfig.description;

  /* Twitter */
  metadata.twitter.title = metadata.title;

  /* Open Graph Image */
  metadata.openGraph.images = [
    ENABLE_STATIC_EXPORT
      ? `${defaultLocale.code}/next-data/og/announcement/Run JavaScript Everywhere`
      : `${defaultLocale.code}/next-data/og/${
          frontmatter.category ?? DEFAULT_CATEGORY_OG_TYPE
        }/${metadata.title}`,
  ];

  /* Canonical & alternates */
  metadata.alternates.canonical =
    frontmatter.canonical ?? getUrlForPathname(locale, path);

  metadata.alternates.languages = buildAlternateLanguages(path);

  /* RSS Feed */
  const feed =
    siteConfig.rssFeeds.find(f => f.category === frontmatter.category)?.file ??
    'blog.xml';

  metadata.alternates.types['application/rss+xml'] = getUrlForPathname(
    locale,
    `feed/${feed}`
  );

  return metadata;
});

export const allRoutes = (await getMarkdownFiles())
  .map(file => {
    const normalizedFile = normalizePath(file);
    const pathname = normalizePathname(normalizedFile);

    pathnameToFilename.set(pathname, normalizedFile);

    return pathname;
  })
  .filter(Boolean);
