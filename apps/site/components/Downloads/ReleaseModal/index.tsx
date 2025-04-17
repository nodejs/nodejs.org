import Modal from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MinorReleasesTable } from '@/components/Downloads/MinorReleasesTable';
import LinkWithArrow from '@/components/LinkWithArrow';
import type { NodeRelease } from '@/types';
import { getReleaseAnnounceLink } from '@/util/getReleaseAnnounceLink';

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
  const t = useTranslations('components.releaseModal');

  const modalHeading = t('title', {
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
          {t('releaseAnnouncement')}
        </LinkWithArrow>
      )}

      <h3>{t('minorVersions')}</h3>

      <MinorReleasesTable releases={release.minorVersions} />
    </Modal>
  );
};

export default ReleaseModal;
