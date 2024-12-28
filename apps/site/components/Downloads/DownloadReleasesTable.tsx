import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import LinkWithArrow from '@/components/LinkWithArrow';
import getReleaseData from '@/next-data/releaseData';
import { getNodeApiLink } from '@/util/getNodeApiLink';
import { getNodeJsChangelog } from '@/util/getNodeJsChangelog';

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
          <th>{t('components.downloadReleasesTable.releaseDate')}</th>
          <th>{t('components.downloadReleasesTable.npmVersion')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {releaseData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">v{release.version}</td>
            <td data-label="Modules">v{release.modules}</td>
            <td data-label="LTS">{release.codename || '-'}</td>
            <td data-label="Date">
              <time>{release.releaseDate}</time>
            </td>
            <td data-label="npm">v{release.npm}</td>
            <td className="download-table-last">
              <LinkWithArrow
                href={`https://nodejs.org/download/release/${release.versionWithPrefix}/`}
              >
                {t('components.downloadReleasesTable.actions.releases')}
              </LinkWithArrow>

              <LinkWithArrow
                href={getNodeJsChangelog(release.versionWithPrefix)}
              >
                {t('components.downloadReleasesTable.actions.changelog')}
              </LinkWithArrow>

              <LinkWithArrow href={getNodeApiLink(release.versionWithPrefix)}>
                {t('components.downloadReleasesTable.actions.docs')}
              </LinkWithArrow>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DownloadReleasesTable;
