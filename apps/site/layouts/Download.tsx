import { getClientContext } from '#site/client-context';
import DownloadSection from '#site/components/DownloadSection';
import Footer from '#site/components/Footer';
import NavBar from '#site/components/NavBar';
import provideReleaseData from '#site/next-data/providers/releaseData';

import type { FC, PropsWithChildren } from 'react';

import styles from './layouts.module.css';

const DownloadLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { frontmatter } = getClientContext();

  const releases = await provideReleaseData();

  return (
    <>
      <NavBar />

      <div className={styles.downloadLayout}>
        <main id="main" tabIndex={-1}>
          <h1>{frontmatter.title}</h1>

          <DownloadSection releases={releases}>{children}</DownloadSection>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DownloadLayout;
