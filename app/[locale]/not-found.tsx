import { getLocale } from 'next-intl/server';
import type { FC } from 'react';

import { MDXRenderer } from '@/components/mdxRenderer';
import WithLayout from '@/components/withLayout';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';
import { dynamicRouter } from '@/next.dynamic.mjs';

const LocalizedNotFound: FC = async () => {
  const locale = await getLocale();

  /** @deprecated replace the legacy page when website redesign is done */
  const notFoundSource = ENABLE_WEBSITE_REDESIGN ? 'new-design/404' : '404';

  // Retrieves the markdown source created for the not-found page
  const { source, filename } = await dynamicRouter.getMarkdownFile(
    locale,
    notFoundSource
  );

  // Parses the source Markdown content and returns a React Component
  const { MDXContent } = await dynamicRouter.getMDXContent(source, filename);

  return (
    <WithLayout layout="centered.hbs">
      <MDXRenderer Component={MDXContent} />
    </WithLayout>
  );
};

export default LocalizedNotFound;
