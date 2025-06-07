import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import type { NodeReleaseStatus } from '#site/types';

type WithReleaseAlertBoxProps = {
  status: NodeReleaseStatus;
};

const WithReleaseAlertBox: FC<WithReleaseAlertBoxProps> = ({ status }) => {
  const t = useTranslations();

  switch (status) {
    case 'End-of-life':
      return (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t('components.releaseModal.unsupportedVersionWarning')}
        </AlertBox>
      );
    default:
      return null;
  }
};

export default WithReleaseAlertBox;
