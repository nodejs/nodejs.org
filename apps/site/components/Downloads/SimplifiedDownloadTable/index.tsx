'use client';

import type { FC } from 'react';

import Link from '@/components/Link';
import type { UserOS } from '@/types/userOS';
import { OperatingSystemLabel } from '@/util/downloadUtils';

type DownloadTable = {
  file: string;
  os: string;
  architecture: string;
  url: string;
};

type SimplifiedDownloadTableProps = {
  source: Array<DownloadTable>;
};

const SimplifiedDownloadTable: FC<SimplifiedDownloadTableProps> = ({
  source,
}) => (
  <table>
    <thead>
      <tr>
        <th>File Name</th>
        <th className="md:w-24">OS</th>
        <th className="md:w-24">Architecture</th>
      </tr>
    </thead>
    <tbody>
      {source.map(release => (
        <tr key={`${release.file}-${release.architecture}`}>
          <td data-label="File Name">
            <Link href={release.url}>{release.file}</Link>
          </td>
          <td data-label="OS">{OperatingSystemLabel[release.os as UserOS]}</td>
          <td data-label="Architecture">{release.architecture}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SimplifiedDownloadTable;
