import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { releaseData } from '@/next.json.mjs';
import { getNodeApiLink } from '@/util/getNodeApiLink';
import { getNodejsChangelog } from '@/util/getNodeJsChangelog';

const DownloadReleasesTable: FC = () => {
  const t = useTranslations();

  return (
    <table id="tbVersions" className="download-table full-width">
      <thead>
        <tr>
          <td>Version</td>
          <td>LTS</td>
          <td>Date</td>
          <td>V8</td>
          <td>npm</td>
          <td>
            NODE_MODULE_VERSION<a href="#ref-1">[1]</a>
            <span id="backref-1"></span>
          </td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {releaseData.map(release => (
          <tr key={release.major}>
            <td data-label="Version">Node.js {release.version}</td>
            <td data-label="LTS">{release.codename}</td>
            <td data-label="Date">
              <time>{release.releaseDate}</time>
            </td>
            <td data-label="V8">{release.v8}</td>
            <td data-label="npm">{release.npm}</td>
            <td data-label="NODE_MODULE_VERSION">{release.modules}</td>
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
