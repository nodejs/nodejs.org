import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import type { Vulnerability } from '#site/next-data/providers/vulnerabilities';
import type { ModalProps } from '#site/providers/modalProvider';
import type { NodeRelease } from '#site/types';

type EOLModalData = {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

const EOLModal: FC<ModalProps> = ({ open, closeModal, data }) => {
  const { release } = data as EOLModalData;
  const t = useTranslations();

  const modalHeadingKey = release.codename
    ? 'components.releaseModal.title'
    : 'components.releaseModal.titleWithoutCodename';

  const modalHeading = t(modalHeadingKey, {
    version: release.major,
    codename: release.codename ?? '',
  });

  return (
    <Modal open={open} onOpenChange={closeModal}>
      <Title>{modalHeading}</Title>

      <Content></Content>
    </Modal>
  );
};

export default EOLModal;
