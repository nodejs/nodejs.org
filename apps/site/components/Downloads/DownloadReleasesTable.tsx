import { getTranslations } from 'next-intl/server';
import { type FC } from 'react';

import getReleaseData from '@/next-data/releaseData';

import DetailsButton from './DetailsButton';

// This is a React Async Server Component
// Note that Hooks cannot be used in a RSC async component
// Async Components do not get re-rendered at all.
const DownloadReleasesTable: FC = async () => {
  const releaseData = await getReleaseData();

  const t = await getTranslations();

  return (
    <table id="tbVersions" className="download-table full-width">
      <thead>
        <tr>
          <th>{t('components.downloadReleasesTable.version')}</th>
          <th>{t('components.downloadReleasesTable.nApiVersion')}</th>
          <th>{t('components.downloadReleasesTable.codename')}</th>
          <th> First released</th>
          <th>Latest Update</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {releaseData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">v{release.major}</td>
            <td data-label="Modules">v{release.modules}</td>
            <td data-label="LTS">{release.codename || '-'}</td>
            <td data-label="Date">
              <time>{release.currentStart}</time>
            </td>
            <td data-label="Date">
              <time>{release.releaseDate}</time>
            </td>
            {/* <td data-label="npm">v{release.npm}</td> */}
            <td data-label="Status">{release.status}</td>
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
