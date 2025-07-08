import Badge from '@node-core/ui-components/Common/Badge';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import DetailsButton from '#site/components/Downloads/DownloadReleasesTable/DetailsButton';
import getReleaseData from '#site/next-data/releaseData';

const BADGE_KIND_MAP = {
  'End-of-life': 'warning',
  Maintenance: 'neutral',
  LTS: 'info',
  Current: 'default',
  Pending: 'default',
} as const;

const BADGE_TEXT_MAP = {
  'End-of-life': 'End-of-Life (EOL)',
  Maintenance: 'Maintenance LTS',
  LTS: 'Active LTS',
  Current: 'Current',
  Pending: 'Pending',
} as const;

const DownloadReleasesTable: FC = async () => {
  const releaseData = await getReleaseData();

  const t = await getTranslations();

  return (
    <table id="tbVersions" className="download-table full-width">
      <thead>
        <tr>
          <th>{t('components.downloadReleasesTable.version')}</th>
          <th>{t('components.downloadReleasesTable.codename')}</th>
          <th>{t('components.downloadReleasesTable.firstReleased')}</th>
          <th>{t('components.downloadReleasesTable.lastUpdated')}</th>
          <th>{t('components.downloadReleasesTable.status')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {releaseData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">v{release.major}</td>
            <td data-label="LTS">{release.codename || '-'}</td>
            <td data-label="Date">
              <FormattedTime date={release.currentStart} />
            </td>
            <td data-label="Date">
              <FormattedTime date={release.releaseDate} />
            </td>
            <td data-label="Status">
              <Badge kind={BADGE_KIND_MAP[release.status]} size="small">
                {BADGE_TEXT_MAP[release.status]}
              </Badge>
            </td>
            <td className="download-table-last">
              <DetailsButton versionData={release} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DownloadReleasesTable;
