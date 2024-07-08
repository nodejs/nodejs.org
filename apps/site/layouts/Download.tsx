import type { FC, PropsWithChildren } from 'react';

import WithDownloadCategories from '@/components/withDownloadCategories';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';
import { useClientContext } from '@/hooks/react-server';

import styles from './layouts.module.css';

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => {
  const {
    frontmatter: { title, subtitle },
  } = useClientContext();

  return (
    <>
      <WithNavBar />

      <div className={styles.downloadLayout}>
        <main>
          <h1>{title}</h1>

          <p>{subtitle}</p>

          <WithDownloadCategories>{children}</WithDownloadCategories>
        </main>
      </div>

      <WithFooter />
    </>
  );
};

export default DownloadLayout;
