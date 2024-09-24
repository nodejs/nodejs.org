import { provideChangelogData } from '@/next-data/providers/changelogData';
import provideReleaseData from '@/next-data/providers/releaseData';
import { VERCEL_REVALIDATE } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';

type StaticParams = {
  params: { version: string };
};

// This is the Route Handler for the `GET` method which handles the request
// for generating static data related to the Node.js Changelog Data
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, { params }: StaticParams) => {
  const changelogData = await provideChangelogData(params.version);

  return Response.json(changelogData);
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/changelog-data/[version]` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => {
  const releases = provideReleaseData();

  const mappedParams = releases.map(release => ({
    locale: defaultLocale.code,
    version: String(release.versionWithPrefix),
  }));

  return mappedParams;
};

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'error';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
