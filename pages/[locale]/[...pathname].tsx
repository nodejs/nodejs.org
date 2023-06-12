import DynamicTheme from '../../theme.dynamic';
import * as nextConfig from '../../next.config.mjs';
import * as nextDynamic from '../../next.dynamic.mjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

type StaticParams = { pathname: string[]; locale: string };
type StaticProps = { content: MDXRemoteSerializeResult };

// This method receives the props from `getStaticProps` and renders/builds the Markdown
// content on demand by loading the file on the server-side and serializing the Markdown/MDX content
export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params = { pathname: [], locale: 'en' } }) => {
  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename, pathname } = nextDynamic.getMarkdownFileSource(
    params.pathname
  );

  // This parses the actual Markdown content and returns a full set of props
  // to be passed to the base page (`DynamicPage`) which will render the Markdown
  const staticProps = await nextDynamic.serializeDynamicPage(
    source,
    pathname,
    filename
  );

  // We add the extra `params` to the props as they're used within the `DynamicPage`
  return staticProps;
};

// This method is called once during build-time and retrieves a full path
// of all pages on each locale that were not translated yet.
// allowing us to generate localized pages with only the content fallbacking to English
// Note.: during full ISR blog pages are also supported as they do not increase weight on the build time
// but on static-mode the blog pages will not be generated/included on the build.
export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // During full-static builds we want to generate all minimal required pages
  // as static exports cannot leverage from ISR (Incremental Static Builds)
  // whereas on non-static exports we don't need to build these paths at build-time
  // and we can fully leverage from ISR builds without the need of pre-building these static pages
  if (nextConfig.enableStaticExport) {
    const nonLocalizedPages = await nextDynamic.getDynamicLocalizedPaths();

    const dynamicPathsByLocale = nonLocalizedPages.map(([locale, pages]) =>
      pages.map(pathname => ({ params: { locale, pathname } }))
    );

    return { paths: dynamicPathsByLocale.flat(), fallback: 'blocking' };
  }

  return { paths: [], fallback: 'blocking' };
};

export default DynamicTheme;
