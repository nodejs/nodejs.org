import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import DetailsButton from '#site/components/Downloads/DownloadReleasesTable/DetailsButton';
import VulnerabilityChips from '#site/components/EOL/VulnerabilityChips';
import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';
import { EOL_VERSION_IDENTIFIER } from '#site/next.constants.mjs';

const EOLReleaseTable: FC = () => {
  const releaseData = provideReleaseData();
  const vulnerabilities = provideVulnerabilities();
  const eolReleases = releaseData.filter(
    release => release.status === EOL_VERSION_IDENTIFIER
  );

  const t = useTranslations();

  return (
    <table id="tbVulnerabilities">
      <thead>
        <tr>
          <th>
            {t('components.eolTable.version')} (
            {t('components.eolTable.codename')})
          </th>
          <th>{t('components.eolTable.lastUpdated')}</th>
          <th>{t('components.eolTable.vulnerabilities')}</th>
          <th>{t('components.eolTable.details')}</th>
        </tr>
      </thead>
      <tbody>
        {eolReleases.map(release => (
          <tr key={release.major}>
            <td data-label="Version">
              v{release.major} {release.codename ? `(${release.codename})` : ''}
            </td>
            <td data-label="Date">
              <FormattedTime date={release.releaseDate} />
            </td>
            <td>
              <VulnerabilityChips
                vulnerabilities={vulnerabilities[release.major]}
              />
            </td>
            <td>
              <DetailsButton
                data={{
                  release: release,
                  vulnerabilities: vulnerabilities[release.major],
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EOLReleaseTable;
