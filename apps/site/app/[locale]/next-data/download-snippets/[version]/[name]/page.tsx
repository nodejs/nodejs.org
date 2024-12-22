import { notFound } from 'next/navigation';
import type { FC } from 'react';
import { VFile } from 'vfile';

import JSXCodeBox from '@/components/JSX/CodeBox';
import provideDownloadSnippets from '@/next-data/providers/downloadSnippets';
import provideReleaseData from '@/next-data/providers/releaseData';
import { defaultLocale } from '@/next.locales.mjs';
import { compile } from '@/next.mdx.compiler.mjs';

type DynamicStaticPaths = { locale: string; version: string; name: string };
type StaticParams = { params: Promise<DynamicStaticPaths> };

// This is the Route Handler for the `GET` method which handles the request
// for generating OpenGraph images for Blog Posts and Pages
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
const getPage: FC<StaticParams> = async props => {
  const params = await props.params;

  const releaseData = provideReleaseData();
  const snippets = provideDownloadSnippets(params.locale);

  const release = releaseData.find(({ version }) => version === params.version);
  const snippet = snippets?.find(({ name }) => name === params.name);

  // If the release data, snippets data, and the snippet are available we proceed
  // Since we need to find a matching Node.js release metadata, and also render the code snippet
  // for the correct locale, version and snippet name (i.e.: nvm)
  if (snippets && release && snippet) {
    // Wraps the code snippet (which is a plain string imported from `provideDownloadSnippets`)
    // To be wrapped with the JSX CodeBox component that invokes Shiki's Hast to JSX runtime compiler
    // Whilst evaluating the snippet as a JavaScript template literal, which allows us to access
    // the `props` object passed to the MDX Compiler.
    const wrappedSource = `<CodeBox language="${snippet.language}">{\`${snippet.content}\`}</CodeBox>`;

    // Compiles the wrapped code snippet with the MDX Compiler
    const { content } = await compile(
      // Wraps the code snippet with a VFile object to be passed to the MDX Compiler
      new VFile(wrappedSource),
      // The MDX Compiler will use the `jsx` extension to compile the code snippet
      'mdx',
      // Passes the `CodeBox` component to the MDX Compiler as a component within the `components` object
      { CodeBox: JSXCodeBox },
      // Passes the `release` object to the MDX Compiler as a property within the `props` object
      { release }
    );

    return content;
  }

  return notFound();
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/download-snippets/[version]/[name]` this will return a default value as we don't want to
// statically generate this route as it is compute-expensive.
// Hence we generate a fake route just to satisfy Next.js requirements.
export const generateStaticParams = async () => [
  {
    locale: defaultLocale.code,
    version: 'latest',
    name: 'default',
  },
];

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

export default getPage;
