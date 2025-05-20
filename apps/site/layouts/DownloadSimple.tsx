import { getLocale } from 'next-intl/server';
import type { FC, PropsWithChildren } from 'react';

import { getClientContext, setClientContext } from '@/client-context';
import WithFooter from '@/components/withFooter';
import WithMetaBar from '@/components/withMetaBar';
import WithNavBar from '@/components/withNavBar';
import WithProgressionSidebar from '@/components/withProgressionSidebar';
import getReleaseData from '@/next-data/releaseData';
import { dynamicRouter } from '@/next.dynamic.mjs';

import ArticleLayout from './Article';

const mapSidebarItems = (
  releaseData: Awaited<ReturnType<typeof getReleaseData>>
) =>
  Object.values(
    releaseData.reduce<
      Record<
        string,
        { groupName: string; items: Array<{ label: string; link: string }> }
      >
    >((acc, release) => {
      const key = release.status;
      if (!acc[key]) {
        acc[key] = {
          groupName: key,
          items: [],
        };
      }

      const label = [`v${release.major}`];

      if (release.codename) {
        label.push(release.codename);
      }

      acc[key].items.push({
        label: label.join(' '),
        link: `/download/${release.major}`,
      });

      return acc;
    }, {})
  );

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

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => {
  const releaseData = await getReleaseData();
  const sidebarGroups = mapSidebarItems(releaseData);

  const locale = await getLocale();
  const { pathname } = getClientContext();
  const { content } = await getMarkdownContent(locale, pathname, [
    'download',
    'simplified',
  ]);

  return (
    <>
      <WithNavBar />

      <ArticleLayout>
        <WithProgressionSidebar groups={sidebarGroups} />

        <div>
          <main>{children || content}</main>
          <WithMetaBar />
        </div>
      </ArticleLayout>

      <WithFooter />
    </>
  );
};

export default DownloadLayout;
