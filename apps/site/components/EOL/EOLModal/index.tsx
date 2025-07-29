import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import UnknownSeveritySection from '#site/components/EOL/UnknownSeveritySection';
import VulnerabilitiesTable from '#site/components/EOL/VulnerabilitiesTable';
import { SEVERITY_ORDER } from '#site/components/EOL/VulnerabilityChips';
import type { ModalProps } from '#site/providers/modalProvider';
import type { NodeRelease } from '#site/types';
import type { Vulnerability } from '#site/types/vulnerabilities';

type EOLModalData = {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

type KnownVulnerability = Vulnerability & {
  severity: (typeof SEVERITY_ORDER)[number];
};

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

  const [knownVulns, unknownVulns] = vulnerabilities.reduce(
    (acc, vuln) => {
      acc[vuln.severity === 'unknown' ? 1 : 0].push(vuln as KnownVulnerability);
      return acc;
    },
    [[], []] as [Array<KnownVulnerability>, Array<Vulnerability>]
  );

  knownVulns.sort(
    (a, b) =>
      SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );

  const hasKnownVulns = knownVulns.length > 0;
  const hasAnyVulns = hasKnownVulns || unknownVulns.length > 0;

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

        {hasKnownVulns && <VulnerabilitiesTable vulnerabilities={knownVulns} />}

        <UnknownSeveritySection
          vulnerabilities={unknownVulns}
          hasKnownVulns={hasKnownVulns}
        />

        {!hasAnyVulns && (
          <p className="m-1">
            {t('components.eolModal.noVulnerabilitiesMessage')}
          </p>
        )}
      </Content>
    </Modal>
  );
};

export default EOLModal;
