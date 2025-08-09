import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import { useMemo, type FC } from 'react';

import UnknownSeveritySection from '#site/components/EOL/UnknownSeveritySection';
import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import { SEVERITY_ORDER } from '#site/next.constants.mjs';
import type { ModalProps } from '#site/types';
import type { EOLModalData } from '#site/types/vulnerabilities';

const EOLModal: FC<ModalProps<EOLModalData>> = ({
  open,
  closeModal,
  data: { release, vulnerabilities },
}) => {
  const t = useTranslations();

  const modalHeading = release.codename
    ? t('components.eolModal.title', {
        version: release.major,
        codename: release.codename,
      })
    : t('components.eolModal.titleWithoutCodename', { version: release.major });

  useMemo(
    () =>
      vulnerabilities.sort(
        (a, b) =>
          SEVERITY_ORDER.indexOf(a.severity) -
          SEVERITY_ORDER.indexOf(b.severity)
      ),
    [vulnerabilities]
  );

  return (
    <Modal open={open} onOpenChange={closeModal}>
      <Title>{modalHeading}</Title>
      <Content>
        {vulnerabilities.length > 0 && (
          <p className="m-1">
            {t('components.eolModal.vulnerabilitiesMessage', {
              count: vulnerabilities.length,
            })}
          </p>
        )}

        <VulnerabilitiesTable
          vulnerabilities={vulnerabilities.filter(
            vuln => vuln.severity !== 'unknown'
          )}
        />

        <UnknownSeveritySection vulnerabilities={vulnerabilities} />

        {!vulnerabilities.length && (
          <p className="m-1">
            {t('components.eolModal.noVulnerabilitiesMessage')}
          </p>
        )}
      </Content>
    </Modal>
  );
};

export default EOLModal;
