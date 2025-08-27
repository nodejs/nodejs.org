import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { ComponentProps, FC } from 'react';

import MinorReleasesTable from '#site/components/Releases/MinorReleasesTable';
import ReleaseOverview from '#site/components/Releases/ReleaseOverview';
import WithReleaseAlertBox from '#site/components/withReleaseAlertBox';
import type { NodeRelease } from '#site/types';

type ReleaseModalProps = ComponentProps<typeof Modal> & {
  release: NodeRelease;
};

const ReleaseModal: FC<ReleaseModalProps> = ({ release, ...props }) => {
  const t = useTranslations();

  const modalHeadingKey = release.codename
    ? 'components.releaseModal.title'
    : 'components.releaseModal.titleWithoutCodename';

  const modalHeading = t(modalHeadingKey, {
    version: release.major,
    codename: release.codename ?? '',
  });

  return (
    <Modal {...props}>
      <WithReleaseAlertBox status={release.status} />

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
