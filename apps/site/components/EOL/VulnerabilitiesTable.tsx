import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import VulnerabilityChip from '#site/components/EOL/VulnerabilityChips/VulnerabilityChip';
import type { Vulnerability } from '#site/types/vulnerabilities';

const VulnerabilitiesTable: FC<{
  vulnerabilities: Array<Vulnerability>;
  maxWidth?: string;
}> = ({ vulnerabilities, maxWidth = 'max-w-2xs' }) => {
  const t = useTranslations();

  if (!vulnerabilities.length) {
    return null;
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>{t('components.eolModal.table.cves')}</th>
          <th>{t('components.eolModal.table.severity')}</th>
          <th>{t('components.eolModal.table.overview')}</th>
          <th>{t('components.eolModal.table.details')}</th>
        </tr>
      </thead>
      <tbody>
        {vulnerabilities.map((vulnerability, i) => (
          <tr key={i}>
            <td>
              {vulnerability.cve.map(cveId => (
                <div key={cveId}>
                  <LinkWithArrow
                    href={`https://www.cve.org/CVERecord?id=${cveId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cveId}
                  </LinkWithArrow>
                </div>
              ))}

              {vulnerability.cve.length > 0 || '-'}
            </td>
            <td>
              <VulnerabilityChip severity={vulnerability.severity} />
            </td>
            <td className={classNames(maxWidth, 'truncate')}>
              {vulnerability.description || vulnerability.overview || '-'}
            </td>
            <td>
              {vulnerability.url && (
                <LinkWithArrow
                  href={vulnerability.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('components.eolModal.blogLinkText')}
                </LinkWithArrow>
              )}

              {!!vulnerability.url || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VulnerabilitiesTable;
