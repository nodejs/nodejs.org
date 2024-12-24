import provideDownloadSnippets from '@/next-data/providers/downloadSnippets';
import { defaultLocale } from '@/next.locales.mjs';

type DynamicStaticPaths = { locale: string };
type StaticParams = { params: Promise<DynamicStaticPaths> };

// This is the Route Handler for the `GET` method which handles the request
// for generating JSON data for Download Snippets
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, props: StaticParams) => {
  const params = await props.params;

  // Retrieve all available Download snippets for a given locale if available
  const snippets = provideDownloadSnippets(params.locale);

  // We append always the default/fallback snippets when a result is found
  return Response.json(snippets, {
    status: snippets !== undefined ? 200 : 404,
  });
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/download-snippets/` this will return a default value as we don't want to
// statically generate this route as it is compute-expensive.
// Hence we generate a fake route just to satisfy Next.js requirements.
export const generateStaticParams = async () => [
  { locale: defaultLocale.code },
];

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;
