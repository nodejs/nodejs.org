import { sep } from 'node:path';
import Theme from '@/theme';
import {
  getMarkdownFile,
  generateStaticProps,
  allPaths,
} from '@/next.dynamic.mjs';
import {
  ENABLE_STATIC_EXPORT,
  STATIC_ROUTES_IGNORES,
  DYNAMIC_ROUTES_IGNORES,
  DYNAMIC_ROUTES_REWRITES,
  DYNAMIC_GENERATED_ROUTES,
} from '@/next.constants.mjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { DynamicStaticProps } from '@/types';

type DynamicStaticPaths = { path: string[] };

// This is a small utility that allows us to quickly separate locale from the remaning pathname
const getLocaleAndPathname = ([locale, ...path]: string[] = []) => [
  locale,
  path.join('/'),
];

// This tests if the current pathname matches any expression that belongs
// to the list of ignored routes and if it does we return `true` to indicate that
const shouldIgnoreRoute = (pathname: string) =>
  (pathname.length && DYNAMIC_ROUTES_IGNORES.some(e => e.test(pathname))) ||
  false;

// This tests if the current pathname matches any sort of rewrite rule
// and if it does we return a the replacement expression for the pathname
const getRouteWrite = (pathname: string) =>
  (pathname.length &&
    DYNAMIC_ROUTES_REWRITES.find(([e]) => e.test(pathname))) ||
  [];

// This maps a pathname into an actual route object that can be used
const mapPathnameToRoute = (pathname: string) => ({
  // we use a platform-specific separator to split the pathname
  // since we're using filepaths here and not URL paths
  params: { path: pathname.split(sep) },
});

// This method receives the props from `getStaticProps` and renders/builds the Markdown
// content on demand by loading the file on the server-side and serializing the Markdown/MDX content
export const getStaticProps: GetStaticProps<
  DynamicStaticProps,
  DynamicStaticPaths
> = async ({ params = { path: [] } }) => {
  const [locale, pathname] = getLocaleAndPathname(params.path);

  // Retrieves and rewriting rule if the pathname matches any rule
  const [, rewriteRule] = getRouteWrite(pathname);

  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = getMarkdownFile(
    locale,
    rewriteRule ? rewriteRule(pathname) : pathname
  );

  // This parses the actual Markdown content and returns a full set of props
  // to be passed to the base page (`DynamicPage`) which will render the Markdown
  const staticProps = await generateStaticProps(source, filename);

  // This checks if either we already determined the route does not exist or if we should ignore
  // this route because it's on our ignored list
  staticProps.notFound = staticProps.notFound || shouldIgnoreRoute(pathname);

  // We add the extra `params` to the props as they're used within the `DynamicPage`
  return staticProps;
};

// This method is used to retrieve all native statically supported pages (SCR) that
// we want to provide during build-time + allow fallback for dynamic pages during (ISR)
export const getStaticPaths: GetStaticPaths<DynamicStaticPaths> = async () => {
  const paths = [];

  // Retrieves all the dynamic generated paths
  const dynamicRoutes = DYNAMIC_GENERATED_ROUTES();

  // Retrieves all the static paths (from next.dynamic.mjs)
  const staticPaths = [...allPaths.values()]
    .flat()
    .filter(route => STATIC_ROUTES_IGNORES.every(e => !e(route)))
    .map(route => route.routeWithLocale);

  if (ENABLE_STATIC_EXPORT) {
    paths.push(...staticPaths);

    paths.push(...dynamicRoutes);
  }

  return { paths: paths.sort().map(mapPathnameToRoute), fallback: 'blocking' };
};

export default Theme;
