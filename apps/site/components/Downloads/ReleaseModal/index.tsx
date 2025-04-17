/* eslint-disable import-x/order */
import Modal from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MinorReleasesTable } from '@/components/Downloads/MinorReleasesTable';
import LinkWithArrow from '@/components/LinkWithArrow';
import type { NodeRelease } from '@/types';
import { getReleaseAnnounceLink } from '@/util/getReleaseAnnounceLink';

import AlertBox from '@node-core/ui-components/Common/AlertBox';

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

  const modalHeading = t('components.releaseModal.title', {
    version: release.major,
  });

  const releaseAnnounceLink = getReleaseAnnounceLink(release);

  return (
    <Modal
      open={isOpen}
      onOpenChange={closeModal}
      heading={modalHeading}
      subheading={release.codename}
    >
      {releaseAnnounceLink && (
        <LinkWithArrow href={releaseAnnounceLink}>
          {t('components.releaseModal.releaseAnnouncement')}
        </LinkWithArrow>
      )}

      {release.status === 'End-of-life' && (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t('components.releaseModal.unsupportedVersionWarning')}
        </AlertBox>
      )}

      <h3>{t('components.releaseModal.minorVersions')}</h3>

      <MinorReleasesTable releases={release.minorVersions} />
    </Modal>
  );
};

export default ReleaseModal;
