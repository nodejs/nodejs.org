import type { FC, PropsWithChildren } from 'react';

import WithFooter from '#site/components/withFooter';
import WithMarkdownContent from '#site/components/withMarkdownContent';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithProgressionSidebar from '#site/components/withProgressionSidebar';
import WithSimplifiedDownload from '#site/components/withSimplifiedDownload';

import ArticleLayout from './Article';

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSimplifiedDownload>
        {({ mappedSidebarItems }) => (
          <>
            <WithProgressionSidebar groups={mappedSidebarItems} />
            <div>
              <main>
                <WithMarkdownContent
                  file={['download', 'simplified']}
                  fallback={children}
                />
              </main>
              <WithMetaBar />
            </div>
          </>
        )}
      </WithSimplifiedDownload>
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DownloadLayout;
