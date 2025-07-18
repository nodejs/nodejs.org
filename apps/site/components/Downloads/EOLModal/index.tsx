import { Modal, Title, Content } from '@node-core/ui-components/Common/Modal';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import LinkWithArrow from '#site/components/LinkWithArrow';
import { VulnerabilityChip } from '#site/components/MDX/EOL/VulnerabilityChips';
import type { Vulnerability } from '#site/next-data/providers/vulnerabilities';
import type { ModalProps } from '#site/providers/modalProvider';
import type { NodeRelease } from '#site/types';

type EOLModalData = {
  release: NodeRelease;
  vulnerabilities: Array<Vulnerability>;
};

const EOLModal: FC<ModalProps> = ({ open, closeModal, data }) => {
  const { release, vulnerabilities } = data as EOLModalData;
  const t = useTranslations('components.eolModal');

  const modalHeadingKey = release.codename ? 'title' : 'titleWithoutCodename';

  const modalHeading = t(modalHeadingKey, {
    version: release.major,
    codename: release.codename ?? '',
  });

  const actualVulnerabilities = vulnerabilities.filter(
    vuln => vuln.severity !== 'unknown'
  );

  return (
    <Modal open={open} onOpenChange={closeModal}>
      <Title>{modalHeading}</Title>

      <Content>
        {actualVulnerabilities.length > 0 ? (
          <>
            <p className="m-1">
              {t('vulnerabilitiesMessage', {
                count: actualVulnerabilities.length,
              })}
            </p>

            <table>
              <thead>
                <tr>
                  <th>{t('table.cves')}</th>
                  <th>{t('table.severity')}</th>
                  <th>{t('table.overview')}</th>
                  <th>{t('table.details')}</th>
                </tr>
              </thead>
              <tbody>
                {actualVulnerabilities.map((vuln, index) => (
                  <tr key={index}>
                    <td>
                      {vuln.cve.length > 0
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
                    <td className="max-w-xs truncate">
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
          </>
        ) : (
          <p className="m-1">{t('noVulnerabilitiesMessage')}</p>
        )}
      </Content>
    </Modal>
  );
};

export default EOLModal;
