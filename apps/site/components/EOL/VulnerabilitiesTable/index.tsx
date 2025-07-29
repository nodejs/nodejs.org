import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import VulnerabilityChip from '#site/components/EOL/VulnerabilityChips/Chip';
import LinkWithArrow from '#site/components/LinkWithArrow';
import type { Vulnerability } from '#site/types/vulnerabilities';

const VulnerabilitiesTable: FC<{
  vulnerabilities: Array<Vulnerability>;
  maxWidth?: string;
}> = ({ vulnerabilities, maxWidth = 'max-w-2xs' }) => {
  const t = useTranslations();

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
        {vulnerabilities.map((vuln, i) => (
          <tr key={i}>
            <td>
              {vuln.cve.length
                ? vuln.cve.map(cveId => (
                    <div key={cveId}>
                      <LinkWithArrow
                        href={`https://www.cve.org/CVERecord?id=${cveId}`}
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
                  {t('components.eolModal.blogLinkText')}
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

export default VulnerabilitiesTable;
