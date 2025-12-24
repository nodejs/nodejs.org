import { join } from 'node:path';

import {
  allLocaleCodes,
  defaultLocale,
  availableLocaleCodes,
} from '@node-core/website-i18n';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { setClientContext } from '#site/client-context';
import WithLayout from '#site/components/withLayout';
import { PAGE_VIEWPORT } from '#site/next.dynamic.constants.mjs';
import { dynamicRouter } from '#site/next.dynamic.mjs';
import { MatterProvider } from '#site/providers/matterProvider';

/**
 * This is the default Viewport Metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
 *
 * @returns {import('next').Viewport} the default viewport metadata
 */
export const generateViewport = () => ({ ...PAGE_VIEWPORT });

/**
 * This generates each page's HTML Metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 *
 * @param {{ params: Promise<{ path: Array<string>; locale: string }>, prefix?: string }} props
 * @returns {Promise<import('next').Metadata>} the metadata for the page
 */
export const generateMetadata = async ({ params, prefix }) => {
  const { path = [], locale = defaultLocale.code } = await params;

  const pathname = dynamicRouter.getPathname(path);

  return dynamicRouter.getPageMetadata(
    locale,
    // If there's a prefix, `join` it with the pathname
    prefix ? join(prefix, pathname) : pathname
  );
};

/**
 * This method is used for retrieving the current locale and pathname from the request
 *
 * @param {string|Array<string>} path
 * @param {string} locale
 * @returns {[string, string]} the locale and pathname for the request
 */
export const getLocaleAndPath = (path = [], locale = defaultLocale.code) => {
  if (!availableLocaleCodes.includes(locale)) {
    // Forces the current locale to be the Default Locale
    setRequestLocale(defaultLocale.code);

    if (!allLocaleCodes.includes(locale)) {
      // when the locale is not listed in the locales, return NotFound
      return notFound();
    }

    // Redirect to the default locale path
    const pathname = dynamicRouter.getPathname(path);

    return redirect(`/${defaultLocale.code}/${pathname}`);
  }

  // Configures the current Locale to be the given Locale of the Request
  setRequestLocale(locale);

  // Gets the current full pathname for a given path
  return [locale, dynamicRouter.getPathname(path)];
};

/**
 * This method is used for retrieving the Markdown content and context
 *
 * @param {{ locale: string; pathname: string }} props
 * @returns {Promise<[import('react').ReactNode, import('#site/types/server').ClientSharedServerContext]>}
 */
export const getMarkdownContext = async props => {
  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    props.locale,
    props.pathname
  );

  // This parses the source Markdown content and returns a React Component and
  // relevant context from the Markdown File
  const { content, frontmatter, headings, readingTime } =
    await dynamicRouter.getMDXContent(source, filename);

  // Metadata and shared Context to be available through the lifecycle of the page
  const context = {
    frontmatter,
    headings,
    pathname: `/${props.pathname}`,
    readingTime,
    filename,
  };

  return [content, context];
};

/**
 * This method is used for rendering the actual page
 *
 * @param {{ content: import('react').ReactNode; layout: import('#site/types/layouts').Layouts; context: Partial<import('#site/types/server').ClientSharedServerContext>; }} props
 * @returns {import('react').ReactElement}
 */
export const renderPage = props => {
  // Defines a shared Server Context for the Client-Side
  // That is shared for all pages under the dynamic router
  setClientContext(props.context);

  // The Matter Provider allows Client-Side injection of the data
  // to a shared React Client Provider even though the page is rendered
  // within a server-side context
  return (
    <MatterProvider {...props.context}>
      <WithLayout layout={props.layout}>{props.content}</WithLayout>
    </MatterProvider>
  );
};
