'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import { OperatingSystemLabel } from '#site/util/downloadUtils';
import type { ParsedArtifact } from '#site/util/downloadUtils/simple';

type DownloadsTableProps = {
  source: Array<ParsedArtifact>;
};

const DownloadsTable: FC<DownloadsTableProps> = ({ source }) => {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('components.downloadsTable.fileName')}</th>
          <th className="md:w-24">
            {t('components.downloadsTable.operatingSystem')}
          </th>
          <th className="md:w-24">
            {t('components.downloadsTable.architecture')}
          </th>
        </tr>
      </thead>
      <tbody>
        {source.map(release => (
          <tr key={`${release.file}-${release.architecture}`}>
            <td data-label={t('components.downloadsTable.fileName')}>
              <Link href={release.url}>{release.file}</Link>
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
