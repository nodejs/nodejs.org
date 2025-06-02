import type { FC } from 'react';

import WithFooter from '#site/components/withFooter';
import WithMarkdownContent from '#site/components/withMarkdownContent';
import WithNavBar from '#site/components/withNavBar';

import styles from './layouts.module.css';

const DownloadSimpleLayout: FC = () => (
  <>
    <WithNavBar />

    <div className={styles.downloadLayout}>
      <main>
        <WithMarkdownContent file={['download', 'simplified']} />
      </main>
    </div>

    <WithFooter />
  </>
);

export default DownloadSimpleLayout;
