import type { FC, PropsWithChildren } from 'react';

import { getClientContext } from '@/client-context';
import WithDownloadSection from '@/components/withDownloadSection';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => {
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
