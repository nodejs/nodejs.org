import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MinorReleasesTable } from '#site/components/Downloads/MinorReleasesTable';
import { ReleaseOverview } from '#site/components/Downloads/ReleaseOverview';
import Link from '#site/components/Link';
import type { ModalProps, NodeRelease } from '#site/types';

const ReleaseModal: FC<ModalProps<NodeRelease>> = ({
  open,
  closeModal,
  data,
}) => {
  const t = useTranslations();

  const modalHeadingKey = data.codename
    ? 'components.releaseModal.title'
    : 'components.releaseModal.titleWithoutCodename';

  const modalHeading = t(modalHeadingKey, {
    version: data.major,
    codename: data.codename ?? '',
  });

  return (
    <Modal open={open} onOpenChange={closeModal}>
      {data.status === 'End-of-life' && (
        <div className="mb-4">
          <AlertBox
            title={t('components.common.alertBox.warning')}
            level="warning"
            size="small"
          >
            {t.rich('components.releaseModal.unsupportedVersionWarning', {
              link: text => (
                <Link onClick={closeModal} href="/eol">
                  {text}
                </Link>
              ),
            })}
          </AlertBox>
        </div>
      )}

      {data.isLts && (
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
        <ReleaseOverview release={data} />

        <h5>{t('components.releaseModal.minorVersions')}</h5>

        <MinorReleasesTable releases={data.minorVersions} />
      </Content>
    </Modal>
  );
};

export default ReleaseModal;
