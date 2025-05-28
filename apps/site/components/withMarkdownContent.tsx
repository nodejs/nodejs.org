import { getLocale } from 'next-intl/server';
import type { FC } from 'react';

import { dynamicRouter } from '#site/next.dynamic';

const getMarkdownContent = async (locale: string, file: Array<string>) => {
  const filePathname = dynamicRouter.getPathname(file);

  // We retrieve the source of the Markdown file by doing an educated guess
  // of what possible files could be the source of the page, since the extension
  // context is lost from `getStaticProps` as a limitation of Next.js itself
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    filePathname
  );

  // This parses the source Markdown content and returns a React Component
  // from the Markdown File
  const { content } = await dynamicRouter.getMDXContent(source, filename);

  return content;
};

type WithMarkdownContentProps = {
  file: Array<string>;
};

const WithMarkdownContent: FC<WithMarkdownContentProps> = async ({ file }) => {
  const locale = await getLocale();
  const content = await getMarkdownContent(locale, file);

  return content || null;
};

export default WithMarkdownContent;
