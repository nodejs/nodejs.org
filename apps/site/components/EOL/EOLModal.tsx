import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { FC, ComponentProps } from 'react';

import KnownSeveritySection from '#site/components/EOL/KnownSeveritySection';
import UnknownSeveritySection from '#site/components/EOL/UnknownSeveritySection';
import { SEVERITY_ORDER } from '#site/next.constants.mjs';
import type { NodeRelease } from '#site/types/releases';
import type { Vulnerability } from '#site/types/vulnerabilities';

type EOLModalProps = ComponentProps<typeof Modal> & {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

const EOLModal: FC<EOLModalProps> = ({
  release: { codename, major: version },
  vulnerabilities,
  ...props
}) => {
  const t = useTranslations();

  const modalHeading = codename
    ? t('components.eolModal.title', { version, codename })
    : t('components.eolModal.titleWithoutCodename', { version });

  useMemo(
    () =>
      vulnerabilities.sort(
        (a, b) =>
          SEVERITY_ORDER.indexOf(a.severity) -
          SEVERITY_ORDER.indexOf(b.severity)
      ),
    // Only change when the vulnerabilities change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vulnerabilities.length]
  );

  return (
    <Modal {...props}>
      <Title>{modalHeading}</Title>
      <Content>
        {vulnerabilities.length > 0 && (
          <p className="m-1">
            {t('components.eolModal.vulnerabilitiesMessage', {
              count: vulnerabilities.length,
            })}
          </p>
        )}

        <KnownSeveritySection vulnerabilities={vulnerabilities} />
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
