import type { FC } from 'react';

import WithFooter from '#site/components/withFooter';
import WithMarkdownContent from '#site/components/withMarkdownContent';
import WithNavBar from '#site/components/withNavBar';

import styles from './layouts.module.css';

const DownloadArchiveLayout: FC = () => (
  <>
    <WithNavBar />

    <div className={styles.downloadLayout}>
      <main>
        <WithMarkdownContent file={['download', 'archive']} />
      </main>
    </div>

    <WithFooter />
  </>
);

export default DownloadArchiveLayout;
