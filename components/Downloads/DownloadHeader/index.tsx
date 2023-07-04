import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import SectionTitle from '../../Common/SectionTitle';
import type { NodeRelease } from '../../../types/releases';
import type { FC } from 'react';

const DownloadHeader: FC<NodeRelease> = ({ versionWithPrefix, isLts, npm }) => (
  <>
    <div className={styles.downloadHeader}>
      <SectionTitle
        path={[
          'home',
          <FormattedMessage
            key="downloads"
            id="components.downloads.downloadHeader.activeSection"
          />,
        ]}
      />
      <div>
        <FormattedMessage
          id="components.downloads.downloadHeader.nodeVersion"
          values={{
            lts: isLts,
            nodeVersion: versionWithPrefix,
          }}
        />
      </div>
    </div>
    <div className={styles.downloadHeader}>
      <div className={styles.title}>
        <FormattedMessage id="components.downloads.downloadHeader.title" />
      </div>
      <div className={styles.npm}>
        <FormattedMessage
          id="components.downloads.downloadHeader.npmVersion"
          values={{ npmVersion: npm }}
        />
      </div>
    </div>
  </>
);

export default DownloadHeader;
