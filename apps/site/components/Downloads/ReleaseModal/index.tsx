import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MinorReleasesTable } from '#site/components/Downloads/MinorReleasesTable';
import { ReleaseOverview } from '#site/components/Downloads/ReleaseOverview';
import LinkWithArrow from '#site/components/LinkWithArrow';
import WithReleaseAlertBox from '#site/components/withReleaseAlertBox';
import type { NodeRelease } from '#site/types';

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
    version: `v${release.major}`,
    codename: release.codename ?? '',
  });

  return (
    <Modal open={isOpen} onOpenChange={closeModal}>
      <WithReleaseAlertBox status={release.status} />

      <Title>{modalHeading}</Title>

      <Content>
        {release.releaseAnnounceLink && (
          <LinkWithArrow href={release.releaseAnnounceLink}>
            {t('components.releaseModal.releaseAnnouncement')}
          </LinkWithArrow>
        )}

        <h5>{t('components.releaseModal.overview')}</h5>

        <ReleaseOverview release={release} />

        <h5>{t('components.releaseModal.minorVersions')}</h5>

        <MinorReleasesTable releases={release.minorVersions} />
      </Content>
    </Modal>
  );
};

export default ReleaseModal;
