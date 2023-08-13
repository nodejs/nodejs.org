'use strict';

import { join, normalize, sep } from 'node:path';
import { readFileSync } from 'node:fs';
import { VFile } from 'vfile';
import remarkGfm from 'remark-gfm';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'next-mdx-remote/serialize';
import { availableLocales } from './next.locales.mjs';
import { getMarkdownFiles } from './next.helpers.mjs';
import { DEFAULT_LOCALE_CODE, MD_EXTENSION_REGEX } from './next.constants.mjs';

// allows us to run a glob to get markdown files based on a language folder
const getPathsByLanguage = async (locale = DEFAULT_LOCALE_CODE, ignored = []) =>
  getMarkdownFiles(process.cwd(), `pages/${locale}`, ignored);

/**
 * This method is responsible for generating a Collection of all available paths that
 * are served by the Website dynamically based on the Markdown pages on `pages/` folder.
 *
 * Each Collection is associated to its Locale Code and contains a subset of Dictionaries
 * that inform which pages are provided by that language and which not.
 *
 * The non-localised pages will still be served but our runtime Markdown loader `getMarkdownFile`
 * will recognise that the requested route should be provided via the fallback language.
 */
const getAllPaths = async () => {
  // during full static build we don't want to cover blog posts
  // as otherwise they will all get built as static pages during build time
  const sourcePages = await getPathsByLanguage(DEFAULT_LOCALE_CODE);

  /**
   * This method is used to provide the list of pages that are provided by a given locale
   * and what pages require fallback to the default locale.
   */
  const mergePathsWithFallback =
    (locale = '') =>
    (files = []) =>
      sourcePages.map(filename => {
        // remove the index.md(x) suffix from a pathname
        let pathname = filename.replace(MD_EXTENSION_REGEX, '');

        // remove trailing slash for correct Windows pathing of the index files
        if (pathname.length > 1 && pathname.endsWith(sep)) {
          pathname = pathname.substring(0, pathname.length - 1);
        }

        return {
          pathname: normalize(pathname),
          filename: filename,
          localised: files.includes(filename),
          routeWithLocale: `${locale}/${pathname}`,
        };
      });

  /**
   * This creates an index with the information for each language
   * and the pages that they provide in relation to the source pages
   * and the pages that are missing in relation to the source pages.
   *
   * @type {[string, import('./types').RouteSegment[]][]}
   */
  const allAvailableMarkdownPaths = availableLocales.map(({ code }) =>
    getPathsByLanguage(code)
      .then(mergePathsWithFallback(code))
      .then(files => [code, files])
  );

  return Promise.all(allAvailableMarkdownPaths);
};

// A Map containing all the dynamic paths and their information
export const allPaths = new Map(await getAllPaths());

/**
 * This method attempts to find a matching file in the fileystem provided originally
 * by `getStaticPaths` and returns the file source and filename.
 *
 * Note that this method is safe as it is always provided by paths determined by the server
 * that are non-localized pages that exist on the English locale.
 *
 * Hence we don't fallback for non-existing pages as it should never fall into this scenario.
 * Next.js will already protect against common attack vectors
 * such as `/../../` on the URL pathname and other methodologies
 *
 * @param {string} locale the locale code to be used
 * @param {string} pathname the pathname string
 * @returns {{ source: string, filename: string }} the source and filename
 * @throws {Error} if the file does not exist, which should never happen
 */
export const getMarkdownFile = (
  locale = DEFAULT_LOCALE_CODE,
  pathname = ''
) => {
  const metadata = { source: '', filename: '' };

  const routes = allPaths.get(locale);

  // We verify if the file exists within the list of allowed pages
  // which prevents any malicious attempts to access non-allowed pages
  // or other files that do not belong to the `sourcePages`
  if (routes && routes.length) {
    const route = routes.find(route => route.pathname === normalize(pathname));

    if (route && route.filename) {
      // this determines if we should be using the fallback rendering to the default locale
      // or if we can use the current locale
      const localeToUse = !route.localised ? DEFAULT_LOCALE_CODE : locale;

      // gets the full pathname for the file (absolute path)
      metadata.filename = join(
        process.cwd(),
        'pages',
        localeToUse,
        route.filename
      );

      // Since we always will only read files that we know exist
      // we don't need to handle a possibility of an error being thrown
      // as any other case is if we don't have file system access and that should
      // then be thrown and reported
      metadata.source = readFileSync(metadata.filename, 'utf8');
    }
  }

  return metadata;
};

/**
 * This Method gathers the Markdown Source and the source filename
 * and processes the data (parses the markdown) and generate props
 * for the application to consume (`getStaticProps`)
 *
 * @returns {Promise<{ notFound: boolean, props: any; revalidate: number | boolean }>} the props for the page
 */
export const generateStaticProps = async (source = '', filename = '') => {
  // by default a page is not found if there's no source or filename
  const staticProps = { notFound: true, props: {}, revalidate: false };

  // We only attempt to serialize data if the `source` has content and `filename` has content
  // otherwise we return a 404 since this means that it is not a valid file or a file we should care about
  if (source.length && filename.length) {
    // We create a VFile (Virtual File) to be able to access some contextual
    // data post serialization (compilation) of the source Markdown into MDX
    const sourceAsVirtualFile = new VFile(source);

    // This act as a MDX "compiler" but, lightweight. It parses the Markdown
    // string source into a React Component tree, and then it serializes it
    // it also supports Remark plugins, and MDX components
    // Note.: We use the filename extension to define the mode of execution
    const { compiledSource } = await serialize(sourceAsVirtualFile, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behaviour: 'append',
              properties: { ariaHidden: true, tabIndex: -1, class: 'anchor' },
            },
          ],
        ],
        remarkPlugins: [remarkGfm, remarkHeadings],
        format: filename.includes('.mdx') ? 'mdx' : 'md',
      },
    });

    // After the MDX gets processed with the remarkPlugins, some extra `data` that might come along
    // the `frontmatter` comes from `serialize` built-in support to `remark-frontmatter`
    const { headings, matter: rawFrontmatter } = sourceAsVirtualFile.data;

    // This serialises the Frontmatter into a JSON object that is compatible with the
    // `getStaticProps` supported data type for props. (No prop value can be an object or not a primitive)
    const frontmatter = JSON.parse(JSON.stringify(rawFrontmatter));

    // this defines the basic props that should be passed back to the `DynamicPage` component
    // We only want the `compiledSource` as we use `MDXProvider` for custom components along the journey
    // And then we want the frontmatter and heading information from the VFile `data`
    staticProps.props = { content: compiledSource, headings, frontmatter };
    staticProps.notFound = false;
  }

  return staticProps;
};
