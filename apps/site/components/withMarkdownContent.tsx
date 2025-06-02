import { getLocale } from 'next-intl/server';
import type { FC } from 'react';

import { dynamicRouter } from '#site/next.dynamic';

const getMarkdownContent = async (locale: string, file: Array<string>) => {
  const filePathname = dynamicRouter.getPathname(file);

  // Retrieves the Markdown file source content based on the file path and locale
  // Uses dynamic routing to locate and load the appropriate markdown file
  // for the given locale and file path segments
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    filePathname
  );

  // Parses the Markdown/MDX source content and transforms it into a React component
  // Handles both standard Markdown and MDX files
  const { content } = await dynamicRouter.getMDXContent(source, filename);

  return content;
};

type WithMarkdownContentProps = {
  file: Array<string>;
};

const WithMarkdownContent: FC<WithMarkdownContentProps> = async ({ file }) => {
  const locale = await getLocale();
  const content = await getMarkdownContent(locale, file);

  return content;
};

export default WithMarkdownContent;
