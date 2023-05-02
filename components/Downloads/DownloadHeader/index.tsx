import { FormattedMessage, useIntl } from 'react-intl';
import styles from './index.module.scss';
import SectionTitle from '../../Common/SectionTitle';
import type { NodeReleaseData } from '../../../types';
import type { FC } from 'react';

type DownloadHeaderProps = {
  release?: NodeReleaseData;
};

const DownloadHeader: FC<DownloadHeaderProps> = ({
  release,
}: DownloadHeaderProps) => (
  <>
    <div className={styles.downloadHeader}>
      <SectionTitle
        path={[
          'home',
          useIntl().formatMessage({
            id: 'components.Downloads.downloadHeader.activeSection',
          }),
        ]}
      />
      <div>
        <FormattedMessage
          id="components.Downloads.downloadHeader.nodeVersion"
          values={{ lts: release?.isLts, nodeVersion: release?.fullVersion }}
        />
      </div>
    </div>
    <div className={styles.downloadHeader}>
      <div className={styles.title}>
        <FormattedMessage id="components.Downloads.downloadHeader.title" />
      </div>
      <div className={styles.npm}>
        <FormattedMessage id="components.Downloads.downloadHeader.npmVersion" />
      </div>
    </div>
  </>
);

export default DownloadHeader;
