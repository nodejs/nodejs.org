import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import { MinorReleasesTable } from '#site/components/Downloads/MinorReleasesTable';
import { ReleaseOverview } from '#site/components/Downloads/ReleaseOverview';
import Link from '#site/components/Link';
import type { NodeRelease } from '#site/types';

type ReleaseModalProps = ComponentProps<typeof Modal> & {
  release: NodeRelease;
};

const ReleaseModal: FC<ReleaseModalProps> = ({
  release,
  onOpenChange,
  ...props
}) => {
  const t = useTranslations();

  const modalHeadingKey = release.codename
    ? 'components.releaseModal.title'
    : 'components.releaseModal.titleWithoutCodename';

  const modalHeading = t(modalHeadingKey, {
    version: release.major,
    codename: release.codename ?? '',
  });

  return (
    <Modal onOpenChange={onOpenChange} {...props}>
      {release.status === 'End-of-life' && (
        <div className="mb-4">
          <AlertBox
            title={t('components.common.alertBox.warning')}
            level="warning"
            size="small"
          >
            {t.rich('components.releaseModal.unsupportedVersionWarning', {
              link: text => <Link href="/eol">{text}</Link>,
            })}
          </AlertBox>
        </div>
      )}

      {release.isLts && (
        <div className="mb-4">
          <AlertBox
            title={t('components.common.alertBox.info')}
            level="info"
            size="small"
          >
            {t.rich('components.releaseModal.ltsVersionFeaturesNotice', {
              link: text => <Link href="/download/current">{text}</Link>,
            })}
          </AlertBox>
        </div>
      )}

      <Title>{modalHeading}</Title>

      <Content>
        <ReleaseOverview release={release} />

        <h5>{t('components.releaseModal.minorVersions')}</h5>

        <MinorReleasesTable releases={release.minorVersions} />
      </Content>
    </Modal>
  );
};

export default ReleaseModal;
