import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import { OperatingSystemLabel } from '#site/util/download';

import type { DownloadArtifact } from '#site/types';
import type { FC } from 'react';

type DownloadsTableProps = {
  source: Array<DownloadArtifact>;
};

const DownloadsTable: FC<DownloadsTableProps> = ({ source }) => {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('components.downloadsTable.fileName')}</th>
          <th className="md:w-28">
            {t('components.downloadsTable.operatingSystem')}
          </th>
          <th className="md:w-28">
            {t('components.downloadsTable.architecture')}
          </th>
        </tr>
      </thead>
      <tbody>
        {source.map(release => (
          <tr key={`${release.fileName}-${release.architecture}`}>
            <td data-label={t('components.downloadsTable.fileName')}>
              <Link href={release.url}>{release.fileName}</Link>
            </td>
            <td data-label={t('components.downloadsTable.operatingSystem')}>
              {OperatingSystemLabel[release.os]}
            </td>
            <td data-label={t('components.downloadsTable.architecture')}>
              {release.architecture}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DownloadsTable;
