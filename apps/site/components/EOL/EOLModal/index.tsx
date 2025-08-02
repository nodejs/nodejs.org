import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import { useMemo, type FC } from 'react';

import UnknownSeveritySection from '#site/components/EOL/UnknownSeveritySection';
import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import { SEVERITY_ORDER } from '#site/next.constants.mjs';
import type { ModalProps } from '#site/types';
import type {
  EOLModalData,
  KnownVulnerability,
  UnknownSeverityVulnerability,
} from '#site/types/vulnerabilities';

const EOLModal: FC<ModalProps> = ({ open, closeModal, data }) => {
  const { release, vulnerabilities } = data as EOLModalData;
  const t = useTranslations();

  const modalHeading = t(
    release.codename
      ? 'components.eolModal.title'
      : 'components.eolModal.titleWithoutCodename',
    {
      version: release.major,
      codename: release.codename ?? '',
    }
  );

  const [knownVulnerabilities, unknownVulnerabilities] = useMemo(
    () =>
      vulnerabilities.reduce(
        (acc, vulnerability) => {
          if (vulnerability.severity === 'unknown') {
            acc[1].push(vulnerability as UnknownSeverityVulnerability);
          } else {
            acc[0].push(vulnerability as KnownVulnerability);
          }
          return acc;
        },
        [[], []] as [
          Array<KnownVulnerability>,
          Array<UnknownSeverityVulnerability>,
        ]
      ),
    [vulnerabilities]
  );

  useMemo(
    () =>
      knownVulnerabilities.sort(
        (a, b) =>
          SEVERITY_ORDER.indexOf(a.severity) -
          SEVERITY_ORDER.indexOf(b.severity)
      ),
    [knownVulnerabilities]
  );

  const hasKnownVulnerabilities = knownVulnerabilities.length > 0;
  const hasAnyVulnerabilities =
    hasKnownVulnerabilities || unknownVulnerabilities.length > 0;

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

        {hasKnownVulnerabilities && (
          <VulnerabilitiesTable vulnerabilities={knownVulnerabilities} />
        )}

        <UnknownSeveritySection
          vulnerabilities={unknownVulnerabilities}
          hasKnownVulnerabilities={hasKnownVulnerabilities}
        />

        {!hasAnyVulnerabilities && (
          <p className="m-1">
            {t('components.eolModal.noVulnerabilitiesMessage')}
          </p>
        )}
      </Content>
    </Modal>
  );
};

export default EOLModal;
