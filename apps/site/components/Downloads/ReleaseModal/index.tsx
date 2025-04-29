import AlertBox from '@node-core/ui-components/Common/AlertBox';
import Modal from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MinorReleasesTable } from '@/components/Downloads/MinorReleasesTable';
import { ReleaseOverview } from '@/components/Downloads/ReleaseOverview';
import LinkWithArrow from '@/components/LinkWithArrow';
import type { NodeRelease } from '@/types';

type ReleaseModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  release: NodeRelease;
};

const ReleaseModal: FC<ReleaseModalProps> = ({
  isOpen,
  closeModal,
  release,
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
    <Modal open={isOpen} onOpenChange={closeModal} heading={modalHeading}>
      {release.status === 'End-of-life' && (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t('components.releaseModal.unsupportedVersionWarning')}
        </AlertBox>
      )}

      {release.releaseAnnounceLink && (
        <LinkWithArrow href={release.releaseAnnounceLink}>
          {t('components.releaseModal.releaseAnnouncement')}
        </LinkWithArrow>
      )}

      <h5>{t('components.releaseModal.overview')}</h5>

      <ReleaseOverview release={release} />

      <h5>{t('components.releaseModal.minorVersions')}</h5>

      <MinorReleasesTable releases={release.minorVersions} />
    </Modal>
  );
};

export default ReleaseModal;
