import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import VulnerabilityChip from '#site/components/EOL/VulnerabilityChips/Chip';
import LinkWithArrow from '#site/components/LinkWithArrow';
import type { ModalProps } from '#site/providers/modalProvider';
import type { NodeRelease } from '#site/types';
import type { Vulnerability } from '#site/types/vulnerabilities';

import { SEVERITY_ORDER } from './VulnerabilityChips';

type EOLModalData = {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

type KnownVulnerability = Vulnerability & {
  severity: (typeof SEVERITY_ORDER)[number];
};

const VulnerabilitiesTable: FC<{
  vulnerabilities: Array<Vulnerability>;
  maxWidth?: string;
}> = ({ vulnerabilities, maxWidth = 'max-w-2xs' }) => {
  const t = useTranslations('components.eolModal');

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>{t('table.cves')}</th>
          <th>{t('table.severity')}</th>
          <th>{t('table.overview')}</th>
          <th>{t('table.details')}</th>
        </tr>
      </thead>
      <tbody>
        {vulnerabilities.map((vuln, i) => (
          <tr key={i}>
            <td>
              {vuln.cve.length
                ? vuln.cve.map(cveId => (
                    <div key={cveId}>
                      <LinkWithArrow
                        href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cveId}
                      </LinkWithArrow>
                    </div>
                  ))
                : '-'}
            </td>
            <td>
              <VulnerabilityChip severity={vuln.severity} />
            </td>
            <td className={classNames(maxWidth, 'truncate')}>
              {vuln.description || vuln.overview || '-'}
            </td>
            <td>
              {vuln.ref ? (
                <LinkWithArrow
                  href={vuln.ref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('blogLinkText')}
                </LinkWithArrow>
              ) : (
                '—'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UnknownSeveritySection: FC<{
  vulnerabilities: Array<Vulnerability>;
  hasKnownVulns: boolean;
}> = ({ vulnerabilities, hasKnownVulns }) => {
  const t = useTranslations('components.eolModal');

  if (!vulnerabilities.length) {
    return null;
  }

  return (
    <details open={!hasKnownVulns}>
      <summary className="cursor-pointer font-semibold">
        {t('showUnknownSeverities')} ({vulnerabilities.length})
      </summary>
      <div className="mt-4">
        <VulnerabilitiesTable
          vulnerabilities={vulnerabilities}
          maxWidth={'max-w-3xs'}
        />
      </div>
    </details>
  );
};

const EOLModal: FC<ModalProps> = ({ open, closeModal, data }) => {
  const { release, vulnerabilities } = data as EOLModalData;
  const t = useTranslations('components.eolModal');

  const modalHeading = t(release.codename ? 'title' : 'titleWithoutCodename', {
    version: release.major,
    codename: release.codename ?? '',
  });

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
            {t('vulnerabilitiesMessage', { count: vulnerabilities.length })}
          </p>
        )}

        {hasKnownVulns && <VulnerabilitiesTable vulnerabilities={knownVulns} />}

        <UnknownSeveritySection
          vulnerabilities={unknownVulns}
          hasKnownVulns={hasKnownVulns}
        />

        {!hasAnyVulns && <p className="m-1">{t('noVulnerabilitiesMessage')}</p>}
      </Content>
    </Modal>
  );
};

export default EOLModal;
