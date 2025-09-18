import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
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
          {t.rich('layouts.download.codeBox.unsupportedVersionWarning', {
            link: text => <Link href="/about/eol">{text}</Link>,
          })}
        </AlertBox>
      );
    case 'Active LTS':
    case 'Maintenance LTS':
      return (
        <AlertBox
          title={t('components.common.alertBox.info')}
          level="success"
          size="small"
        >
          {t.rich('components.releaseModal.ltsVersionFeaturesNotice', {
            link: text => <Link href="/download/current">{text}</Link>,
          })}
        </AlertBox>
      );
    default:
      return null;
  }
};

export default WithReleaseAlertBox;
