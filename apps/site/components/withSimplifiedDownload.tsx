import type { FC } from 'react';

import { getClientContext } from '@/client-context';
import getReleaseData from '@/next-data/releaseData';
import { getDownloadTable } from '@/util/downloadUtils';

type DownloadTable = ReturnType<typeof getDownloadTable>;

type WithSimplifiedDownloadProps = {
  children: FC<{
    version: string;
    binaries: DownloadTable['binaries'];
    installers: DownloadTable['installers'];
    minors: DownloadTable['minors'];
  }>;
};

const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const releaseData = await getReleaseData();

  const { pathname } = getClientContext();
  const major = pathname.split('/').pop();
  const release = releaseData.find(
    release =>
      release.major === Number(major) ||
      (release.isLts === true && major === 'simplified')
  );

  const { binaries, installers, minors } = getDownloadTable(release!);

  return (
    <Component
      version={release?.versionWithPrefix || ''}
      binaries={binaries}
      installers={installers}
      minors={minors}
    />
  );
};

export default WithSimplifiedDownload;
