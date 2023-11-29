import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import getReleaseData from '@/next-data/releaseData';
import { getNodeApiLink } from '@/util/getNodeApiLink';
import { getNodejsChangelog } from '@/util/getNodeJsChangelog';

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
          <th>Node.js Version</th>
          <th>Codename</th>
          <th>Release Date</th>
          <th colSpan={2}>npm</th>
        </tr>
      </thead>
      <tbody>
        {releaseData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">v{release.version}</td>
            <td data-label="LTS">{release.codename || '-'}</td>
            <td data-label="Date">
              <time>{release.releaseDate}</time>
            </td>
            <td data-label="npm">v{release.npm}</td>
            <td className="download-table-last">
              <a
                href={`https://nodejs.org/download/release/${release.versionWithPrefix}/`}
              >
                {t('components.downloadReleasesTable.releases')}
              </a>
              <a href={getNodejsChangelog(release.versionWithPrefix)}>
                {t('components.downloadReleasesTable.changelog')}
              </a>
              <a href={getNodeApiLink(release.versionWithPrefix)}>
                {t('components.downloadReleasesTable.docs')}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DownloadReleasesTable;
