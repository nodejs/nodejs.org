import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';

import ReleaseAlertBox from '#site/components/ReleaseAlertBox';
import MinorReleasesTable from '#site/components/Releases/MinorReleasesTable';
import ReleaseOverview from '#site/components/Releases/ReleaseOverview';

import type { NodeRelease } from '#site/types';
import type { ComponentProps, FC } from 'react';

type ReleaseModalProps = ComponentProps<typeof Modal> & {
  release: NodeRelease;
  releases: Array<NodeRelease>;
};

const ReleaseModal: FC<ReleaseModalProps> = ({
  release,
  releases,
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
    <Modal {...props}>
      <ReleaseAlertBox release={release} releases={releases} />

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
