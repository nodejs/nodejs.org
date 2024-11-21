import { deflateSync } from 'node:zlib';

import provideReleaseData from '@/next-data/providers/releaseData';
import { GITHUB_API_KEY } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import type { GitHubApiFile } from '@/types';
import { getGitHubApiDocsUrl } from '@/util/gitHubUtils';
import { parseRichTextIntoPlainText } from '@/util/stringUtils';

// Defines if we should use the GitHub API Key for the request
// based on the environment variable `GITHUB_API_KEY`
const authorizationHeaders = GITHUB_API_KEY
  ? { headers: { Authorization: `Bearer ${GITHUB_API_KEY}` } }
  : undefined;

// Formats a pathname for an API file from Markdown file basename
const getPathnameForApiFile = (name: string, version: string) =>
  `docs/${version}/api/${name.replace('.md', '.html')}`;

// This is the Route Handler for the `GET` method which handles the request
// for a digest and metadata of all API pages from the Node.js Website
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async () => {
  const releases = provideReleaseData();

  const { versionWithPrefix } = releases.find(
    release => release.status === 'LTS'
  )!;

  const gitHubApiResponse = await fetch(
    getGitHubApiDocsUrl(versionWithPrefix),
    authorizationHeaders
  );

  return gitHubApiResponse.json().then((apiDocsFiles: Array<GitHubApiFile>) => {
    // maps over each api file and get the download_url, fetch the content and deflates it
    const mappedApiFiles = apiDocsFiles.map(
      async ({ name, path: filename, download_url }) => {
        const apiFileResponse = await fetch(download_url);

        // Retrieves the content as a raw text string
        const source = await apiFileResponse.text();

        // Removes empty/blank lines or lines just with spaces and trims each line
        // from leading and trailing paddings/spaces
        const cleanedContent = parseRichTextIntoPlainText(source);

        const deflatedSource = deflateSync(cleanedContent).toString('base64');

        return {
          filename,
          pathname: getPathnameForApiFile(name, versionWithPrefix),
          content: deflatedSource,
        };
      }
    );

    return Promise.all(mappedApiFiles).then(Response.json);
  });
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/api-data/` and returns an array of all available static paths
// This is used for ISR static validation and generation
export const generateStaticParams = async () => [
  { locale: defaultLocale.code },
];

// Enforces that only the paths from `generateStaticParams` are allowed, giving 404 on the contrary
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = false;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;
