import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { FC } from 'react';

import { setClientContext } from '@/client-context';
import { MDXRenderer } from '@/components/mdxRenderer';
import { WithLayout } from '@/components/withLayout';
import { ENABLE_STATIC_EXPORT } from '@/next.constants.mjs';
import { DEFAULT_VIEWPORT } from '@/next.dynamic.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';
import { availableLocaleCodes, defaultLocale } from '@/next.locales.mjs';
import { MatterProvider } from '@/providers/matterProvider';

type DynamicStaticPaths = { path: string[]; locale: string };
type DynamicParams = { params: DynamicStaticPaths };

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = async () => ({ ...DEFAULT_VIEWPORT });

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = async ({ params }: DynamicParams) => {
  const { path = [], locale = defaultLocale.code } = params;

  const pathname = dynamicRouter.getPathname(path);

  // Retrieves and rewriting rule if the pathname matches any rule
  const [, rewriteRule] = dynamicRouter.getRouteRewrite(pathname);

  return dynamicRouter.getPageMetadata(
    locale,
    rewriteRule ? rewriteRule(pathname) : pathname
  );
};

// This provides all the possible paths that can be generated statically
// + provides all the paths that we support on the Node.js Website
export const generateStaticParams = async () => {
  const paths: DynamicStaticPaths[] = [];

  // We don't need to compute all possible paths on regular builds
  // as we benefit from Next.js's ISR (Incremental Static Regeneration)
  if (!ENABLE_STATIC_EXPORT) {
    return [];
  }

  for (const locale of availableLocaleCodes) {
    const routesForLanguage = await dynamicRouter.getRoutesByLanguage(locale);

    const mappedRoutesWithLocale = routesForLanguage.map(pathname =>
      dynamicRouter.mapPathToRoute(locale, pathname)
    );

    paths.push(...mappedRoutesWithLocale);
  }

  return paths.sort();
};

// This method parses the current pathname and does any sort of modifications needed on the route
// then it proceeds to retrieve the Markdown file and parse the MDX Content into a React Component
// finally it returns (if the locale and route are valid) the React Component with the relevant context
// and attached context providers for rendering the current page
const getPage: FC<DynamicParams> = async ({ params }) => {
  const { path = [], locale = defaultLocale.code } = params;

  if (!availableLocaleCodes.includes(locale)) {
    // Forces the current locale to be the Default Locale
    unstable_setRequestLocale(defaultLocale.code);

    return notFound();
  }

  // Configures the current Locale to be the given Locale of the Request
  unstable_setRequestLocale(locale);

  const pathname = dynamicRouter.getPathname(path);

  if (dynamicRouter.shouldIgnoreRoute(pathname)) {
    return notFound();
  }

  // Retrieves and rewriting rule if the pathname matches any rule
  const [, rewriteRule] = dynamicRouter.getRouteRewrite(pathname);

  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    rewriteRule ? rewriteRule(pathname) : pathname
  );

  if (source.length && filename.length) {
    // This parses the source Markdown content and returns a React Component and
    // relevant context from the Markdown File
    const { MDXContent, frontmatter, headings } =
      await dynamicRouter.getMDXContent(source, filename);

    // Defines a shared Server Context for the Client-Side
    // That is shared for all pages under the dynamic router
    setClientContext({ frontmatter, headings, pathname });

    return (
      <MatterProvider matter={frontmatter} headings={headings}>
        <WithLayout layout={frontmatter.layout}>
          <MDXRenderer Component={MDXContent} />
        </WithLayout>
      </MatterProvider>
    );
  }

  return notFound();
};

// Enforce that all these routes are compatible with SSR
export const dynamic = 'error';

export default getPage;
