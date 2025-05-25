import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { getClientContext, setClientContext } from '#site/client-context';

import { dynamicRouter } from '#site/next.dynamic';

const getMarkdownContent = async (
  locale: string,
  pathname: string,
  file: Array<string>
) => {
  const filePathname = dynamicRouter.getPathname(file);

  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    filePathname
  );

  // This parses the source Markdown content and returns a React Component and
  // relevant context from the Markdown File
  const { content, frontmatter, headings, readingTime } =
    await dynamicRouter.getMDXContent(source, filename);

  // Metadata and shared Context to be available through the lifecycle of the page
  const sharedContext = {
    frontmatter,
    headings,
    readingTime,
    filename,
    pathname: `/${pathname}`,
  };

  // Defines a shared Server Context for the Client-Side
  // That is shared for all pages under the dynamic router
  setClientContext(sharedContext);

  return { content };
};

type WithMarkdownContentProps = {
  file: Array<string>;
  fallback?: React.ReactNode;
};

const WithMarkdownContent: FC<
  PropsWithChildren<WithMarkdownContentProps>
> = async ({ file, fallback: children }) => {
  const locale = await getLocale();
  const { pathname } = getClientContext();
  const { content } = await getMarkdownContent(locale, pathname, file);

  return content || children || null;
};

export default WithMarkdownContent;
