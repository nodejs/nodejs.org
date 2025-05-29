import type { FC } from 'react';

import WithFooter from '#site/components/withFooter';
import WithMarkdownContent from '#site/components/withMarkdownContent';
import WithMetaBar from '#site/components/withMetaBar';
import WithNavBar from '#site/components/withNavBar';
import WithProgressionSidebar from '#site/components/withProgressionSidebar';
import WithSimplifiedDownload from '#site/components/withSimplifiedDownload';

import ArticleLayout from './Article';

const DownloadSimpleLayout: FC = () => (
  <>
    <WithNavBar />

    <ArticleLayout>
      <WithSimplifiedDownload>
        {({ sidebarItems, metabarItems }) => (
          <>
            <WithProgressionSidebar groups={sidebarItems} />
            <div>
              <main>
                <WithMarkdownContent file={['download', 'simplified']} />
              </main>
              <WithMetaBar items={metabarItems} />
            </div>
          </>
        )}
      </WithSimplifiedDownload>
    </ArticleLayout>

    <WithFooter />
  </>
);

export default DownloadSimpleLayout;
