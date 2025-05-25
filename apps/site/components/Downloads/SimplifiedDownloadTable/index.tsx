'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Link from '#site/components/Link';
import type { UserOS } from '#site/types/userOS';
import { OperatingSystemLabel } from '#site/util/downloadUtils';
import type { ParsedArtifact } from '#site/util/downloadUtils/simple';

type SimplifiedDownloadTableProps = {
  source: Array<ParsedArtifact>;
};

const SimplifiedDownloadTable: FC<SimplifiedDownloadTableProps> = ({
  source,
}) => {
  const t = useTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{t('components.simpleDownloadTable.fileName')}</th>
          <th className="md:w-24">
            {t('components.simpleDownloadTable.operatingSystem')}
          </th>
          <th className="md:w-24">
            {t('components.simpleDownloadTable.architecture')}
          </th>
        </tr>
      </thead>
      <tbody>
        {source.map(release => (
          <tr key={`${release.file}-${release.architecture}`}>
            <td data-label={t('components.simpleDownloadTable.fileName')}>
              <Link href={release.url}>{release.file}</Link>
            </td>
            <td
              data-label={t('components.simpleDownloadTable.operatingSystem')}
            >
              {OperatingSystemLabel[release.os as UserOS]}
            </td>
            <td data-label={t('components.simpleDownloadTable.architecture')}>
              {release.architecture}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimplifiedDownloadTable;
