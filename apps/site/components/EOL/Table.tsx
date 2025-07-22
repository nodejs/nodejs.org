import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import DetailsButton from '#site/components/Downloads/DownloadReleasesTable/DetailsButton';
import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';

import VulnerabilityChips from './VulnerabilityChips';

const EOLTable: FC = () => {
  const releaseData = provideReleaseData();
  const vulnerabilities = provideVulnerabilities();
  const EOLReleases = releaseData.filter(
    release => release.status === 'End-of-life'
  );

  const t = useTranslations('components.eolTable');

  return (
    <table id="tbVulnerabilities">
      <thead>
        <tr>
          <th>
            {t('version')} ({t('codename')})
          </th>
          <th>{t('lastUpdated')}</th>
          <th>{t('vulnerabilities')}</th>
          <th>{t('details')}</th>
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

export default EOLTable;
