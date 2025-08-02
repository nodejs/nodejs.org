import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '#site/client-context';
import WithDownloadSection from '#site/components/withDownloadSection';
import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';

import styles from './layouts.module.css';

const DownloadLayout: FC<PropsWithChildren> = ({ children }) => {
  const { frontmatter } = getClientContext();

  return (
    <>
      <WithNavBar />

      <div className={styles.downloadLayout}>
        <main>
          <h1>{frontmatter.title}</h1>

          <WithDownloadSection>{children}</WithDownloadSection>
        </main>
      </div>

      <WithFooter />
    </>
  );
};

export default DownloadLayout;
