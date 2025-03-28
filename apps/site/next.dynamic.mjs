'use strict';

import { readFile } from 'node:fs/promises';
import { join, normalize, sep } from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';
import { VFile } from 'vfile';

import {
  BASE_PATH,
  BASE_URL,
  DEFAULT_CATEGORY_OG_TYPE,
  ENABLE_STATIC_EXPORT,
  IS_DEV_ENV,
} from './next.constants.mjs';
import {
  DYNAMIC_ROUTES,
  IGNORED_ROUTES,
  PAGE_METADATA,
} from './next.dynamic.constants.mjs';
import { getMarkdownFiles } from './next.helpers.mjs';
import { siteConfig } from './next.json.mjs';
import { availableLocaleCodes, defaultLocale } from './next.locales.mjs';
import { compile } from './next.mdx.compiler.mjs';
import { MDX_COMPONENTS } from './next.mdx.components.mjs';

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${BASE_URL}${BASE_PATH}`;

// This is a small utility that allows us to quickly separate locale from the remaining pathname
const getPathname = (path = []) => path.join('/');

// This maps a pathname into an actual route object that can be used
// we use a platform-specific separator to split the pathname
// since we're using filepaths here and not URL paths
const mapPathToRoute = (locale = defaultLocale.code, path = '') => ({
  locale,
  path: path.split(sep),
});

// Provides an in-memory Map that lasts the whole build process
// and disabled when on development mode (stubbed)
const createCachedMarkdownCache = () => {
  if (IS_DEV_ENV) {
    return {
      has: () => false,
      set: () => {},
      get: () => null,
    };
  }

  return new Map();
};

const getDynamicRouter = async () => {
  // Creates a Cache System that is disabled during development mode
  const cachedMarkdownFiles = createCachedMarkdownCache();

  // Keeps the map of pathnames to filenames
  const pathnameToFilename = new Map();

  const websitePages = await getMarkdownFiles(
    process.cwd(),
    `pages/${defaultLocale.code}`
  );

  websitePages.forEach(filename => {
    // This Regular Expression is used to remove the `index.md(x)` suffix
    // of a name and to remove the `.md(x)` extensions of a filename.
    let pathname = filename.replace(/((\/)?(index))?\.mdx?$/i, '');

    if (pathname.length > 1 && pathname.endsWith(sep)) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    pathname = normalize(pathname).replace('.', '');

    // We map the pathname to the filename to be able to quickly
    // resolve the filename for a given pathname
    pathnameToFilename.set(pathname, filename);
  });

  /**
   * This method returns a list of all routes that exist for a given locale
   *
   * @param {string} locale
   * @returns {Promise<Array<string>>}
   */
  const getRoutesByLanguage = async (locale = defaultLocale.code) => {
    const shouldIgnoreStaticRoute = pathname =>
      IGNORED_ROUTES.every(e => !e({ pathname, locale }));

    return [...pathnameToFilename.keys()]
      .filter(shouldIgnoreStaticRoute)
      .concat([...DYNAMIC_ROUTES.keys()]);
  };

  /**
   * This method attempts to retrieve either a localized Markdown file
   * or the English version of the Markdown file if no localized version exists
   * and then returns the contents of the file and the name of the file (not the path)
   *
   * @param {string} locale
   * @param {string} pathname
   * @returns {Promise<{ source: string; filename: string }>}
   */
  const _getMarkdownFile = async (locale = '', pathname = '') => {
    const normalizedPathname = normalize(pathname).replace('.', '');

    // This verifies if the given pathname actually exists on our Map
    // meaning that the route exists on the website and can be rendered
    if (pathnameToFilename.has(normalizedPathname)) {
      const filename = pathnameToFilename.get(normalizedPathname);
      const filepath = join(process.cwd(), 'pages', locale, filename);

      // We verify if our Markdown cache already has a cache entry for a localized
      // version of this file, because if not, it means that either
      // we did not cache this file yet or there is no localized version of this file
      if (cachedMarkdownFiles.has(`${locale}${normalizedPathname}`)) {
        const fileContent = cachedMarkdownFiles.get(
          `${locale}${normalizedPathname}`
        );

        return { source: fileContent, filename };
      }

      // Attempts to read a file or simply (and silently) fail, as the file might
      // simply not exist or whatever other reason that might cause the file to not be read
      const fileLanguageContent = await readFile(filepath, 'utf8').catch(
        () => undefined
      );

      // No cache hit exists, so we check if the localized file actually
      // exists within our file system and if it does we set it on the cache
      // and return the current fetched result;
      if (fileLanguageContent && typeof fileLanguageContent === 'string') {
        cachedMarkdownFiles.set(
          `${locale}${normalizedPathname}`,
          fileLanguageContent
        );

        return { source: fileLanguageContent, filename };
      }

      // Prevent infinite loops as if at this point the file does not exist with the default locale
      // then there must be an issue on the file system or there's an error on the mapping of paths to files
      if (locale === defaultLocale.code) {
        return { filename: '', source: '' };
      }

      // We attempt to retrieve the source version (defaultLocale) of the file as there is no localised version
      // of the file and we set it on the cache to prevent future checks of the same locale for this file
      const { source: fileContent } = await _getMarkdownFile(
        defaultLocale.code,
        pathname
      );

      // We set the source file on the localized cache to prevent future checks
      // of the same locale for this file and improve read performance
      cachedMarkdownFiles.set(`${locale}${normalizedPathname}`, fileContent);

      return { source: fileContent, filename };
    }

    return { filename: '', source: '' };
  };

  // Creates a Cached Version of the Markdown File Resolver
  const getMarkdownFile = cache(async (locale, pathname) => {
    return await _getMarkdownFile(locale, pathname);
  });

  /**
   * This method runs the MDX compiler on the server-side and returns the
   * parsed JSX ready to be rendered on a page as a React Component
   *
   * @param {string} source
   * @param {string} filename
   */
  const _getMDXContent = async (source = '', filename = '') => {
    // We create a VFile (Virtual File) to be able to access some contextual
    // data post serialization (compilation) of the source Markdown into MDX
    const sourceAsVirtualFile = new VFile(source);

    // Gets the file extension of the file, to determine which parser and plugins to use
    const fileExtension = filename.endsWith('.mdx') ? 'mdx' : 'md';

    // This compiles our MDX source (VFile) into a final MDX-parsed VFile
    // that then is passed as a string to the MDXProvider which will run the MDX Code
    return compile(sourceAsVirtualFile, fileExtension, MDX_COMPONENTS);
  };

  // Creates a Cached Version of the MDX Compiler
  const getMDXContent = cache(async (source, filename) => {
    return await _getMDXContent(source, filename);
  });

  /**
   * This method generates the Next.js App Router Metadata
   * that can be used for each page to provide metadata
   *
   * @param {string} locale
   * @param {string} path
   * @returns {Promise<import('next').Metadata>}
   */
  const _getPageMetadata = async (locale = defaultLocale.code, path = '') => {
    const pageMetadata = { ...PAGE_METADATA };

    const { source = '' } = await getMarkdownFile(locale, path);

    const { data } = matter(source);

    const getUrlForPathname = (l, p) =>
      `${baseUrlAndPath}/${l}${p ? `/${p}` : ''}`;

    // Default Title for the page
    pageMetadata.title = data.title
      ? `${siteConfig.title} — ${data.title}`
      : siteConfig.title;

    // Default Twitter Title for the page
    pageMetadata.twitter.title = pageMetadata.title;

    // Default Open Graph Image for the page
    pageMetadata.openGraph.images = [
      ENABLE_STATIC_EXPORT
        ? `${defaultLocale.code}/next-data/og/announcement/Run JavaScript Everywhere`
        : `${defaultLocale.code}/next-data/og/${data.category ?? DEFAULT_CATEGORY_OG_TYPE}/${pageMetadata.title}`,
    ];

    // Default canonical URL for the page
    pageMetadata.alternates.canonical = getUrlForPathname(locale, path);

    // Default alternate URL for the page in the default locale
    pageMetadata.alternates.languages['x-default'] = getUrlForPathname(
      defaultLocale.code,
      path
    );

    // Retrieves a matching blog feed for the category of the blog post
    // If no matching blog feed is found, we simply fallback to the default blog feed
    const matchingBlogFeed = siteConfig.rssFeeds.find(
      feed => feed.category === data.category
    );

    // Adds the RSS Feed URL to the page metadata, if a matching feed is found
    // otherwise, we fallback to the default blog feed
    pageMetadata.alternates.types['application/rss+xml'] = getUrlForPathname(
      locale,
      `feed/${matchingBlogFeed?.file ?? 'blog.xml'}`
    );

    // Iterate all languages to generate alternate URLs for each language
    availableLocaleCodes.forEach(currentLocale => {
      pageMetadata.alternates.languages[currentLocale] = getUrlForPathname(
        currentLocale,
        path
      );
    });

    return pageMetadata;
  };

  // Creates a Cached Version of the Page Metadata Context
  const getPageMetadata = cache(async (locale, path) => {
    return await _getPageMetadata(locale, path);
  });

  return {
    mapPathToRoute,
    getPathname,
    getRoutesByLanguage,
    getMDXContent,
    getMarkdownFile,
    getPageMetadata,
  };
};

export const dynamicRouter = await getDynamicRouter();
