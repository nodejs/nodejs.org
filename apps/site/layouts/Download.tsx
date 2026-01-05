import { getClientContext } from '#site/client-context';
import WithDownloadSection from '#site/components/withDownloadSection';
import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import provideReleaseData from '#site/next-data/providers/releaseData';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { frontmatter } = getClientContext();

  const releases = await provideReleaseData();

  return (
    <>
      <WithNavBar />

      <div className={styles.downloadLayout}>
        <main id="main" tabIndex={-1}>
          <h1>{frontmatter.title}</h1>

          <WithDownloadSection releases={releases}>
            {children}
          </WithDownloadSection>
        </main>
      </div>

      <WithFooter />
    </>
  );
};

export default DownloadLayout;
