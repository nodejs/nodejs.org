import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import DetailsButton from '#site/components/Downloads/DownloadReleasesTable/DetailsButton';
import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';

import VulnerabilityChips from './VulnerabilityChips';

const EOLTable: FC = async () => {
  const releaseData = provideReleaseData();
  const vulnerabilities = await provideVulnerabilities();
  const EOLReleases = releaseData.filter(
    release => release.status === 'End-of-life'
  );

  const t = await getTranslations();

  return (
    <table id="tbVulnerabilities" className="download-table full-width">
      <thead>
        <tr>
          {/* TODO @bmuenzenmeyer change these to new i18n keys */}
          <th>
            {t('components.downloadReleasesTable.version')} (
            {t('components.downloadReleasesTable.codename')})
          </th>
          <th>{t('components.downloadReleasesTable.lastUpdated')}</th>
          <th>Vulnerabilities</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {EOLReleases.map(release => (
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
            <td className="download-table-last">
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

export default EOLTable;
