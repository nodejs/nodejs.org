import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import type { NodeReleaseStatus } from '#site/types';

type WithReleaseAlertBoxProps = {
  status: NodeReleaseStatus;
  link?: string;
};

const WithReleaseAlertBox: FC<WithReleaseAlertBoxProps> = ({
  status,
  link,
}) => {
  const t = useTranslations();

  const getAlertContent = () => {
    if (link) {
      return t.rich('layouts.download.codeBox.unsupportedVersionWarning', {
        link: text => <Link href={link}>{text}</Link>,
      });
    }

    return t('components.releaseModal.unsupportedVersionWarning');
  };

  switch (status) {
    case 'End-of-life':
      return (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
        >
          {getAlertContent()}
        </AlertBox>
      );
    default:
      return null;
  }
};

export default WithReleaseAlertBox;
