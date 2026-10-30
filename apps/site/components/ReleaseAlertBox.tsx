import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

import type { NodeRelease } from '#site/types';
import type { FC } from 'react';

type ReleaseAlertBoxProps = {
  release: NodeRelease;
  releases: Array<NodeRelease>;
};

const ReleaseAlertBox: FC<ReleaseAlertBoxProps> = ({ release, releases }) => {
  const t = useTranslations();

  switch (release.status) {
    case 'EOL':
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
    case 'Alpha':
      return (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t.rich('layouts.download.codeBox.alphaVersionWarning', {
            link: text => (
              <Link href="/blog/announcements/evolving-the-nodejs-release-schedule">
                {text}
              </Link>
            ),
          })}
        </AlertBox>
      );
    case 'LTS': {
      const hasCurrent = releases.some(({ status }) => status === 'Current');
      const hasAlpha = releases.some(({ status }) => status === 'Alpha');

      if (hasCurrent || hasAlpha) {
        return (
          <AlertBox
            title={t('components.common.alertBox.info')}
            level="success"
            size="small"
          >
            {t.rich('components.releaseModal.ltsVersionFeaturesNotice', {
              link: text => (
                <Link href={`/download/${hasCurrent ? 'current' : 'alpha'}`}>
                  {text}
                </Link>
              ),
            })}
          </AlertBox>
        );
      }

      return null;
    }
    default:
      return null;
  }
};

export default ReleaseAlertBox;
