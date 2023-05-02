import { FormattedMessage, useIntl } from 'react-intl';
import styles from './index.module.scss';
import SectionTitle from '../../Common/SectionTitle';
import type { NodeReleaseData } from '../../../types';
import type { FC } from 'react';

type DownloadHeaderProps = {
  release: NodeReleaseData;
};

const DownloadHeader: FC<DownloadHeaderProps> = ({
  release,
}: DownloadHeaderProps) => {
  const intl = useIntl();
  return (
    <>
      <div className={styles.downloadHeader}>
        <SectionTitle
          path={[
            'home',
            intl.formatMessage({
              id: 'components.downloads.downloadHeader.activeSection',
            }),
          ]}
        />
        <div>
          <FormattedMessage
            id="components.downloads.downloadHeader.nodeVersion"
            values={{ lts: release.isLts, nodeVersion: release.fullVersion }}
          />
        </div>
      </div>
      <div className={styles.downloadHeader}>
        <div className={styles.title}>
          <FormattedMessage id="components.downloads.downloadHeader.title" />
        </div>
        <div className={styles.npm}>
          <FormattedMessage id="components.downloads.downloadHeader.npmVersion" />
        </div>
      </div>
    </>
  );
};

export default DownloadHeader;
