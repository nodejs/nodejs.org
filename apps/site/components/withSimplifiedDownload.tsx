import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import { getDownloadTable } from '#site/util/downloadUtils';

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
  const { pathname } = getClientContext();
  const releaseData = await getReleaseData();

  const version = pathname.split('/').pop();
  const matchingRelease = releaseData.find(
    ({ major, codename, isLts }) =>
      major === Number(version) ||
      codename === version ||
      (isLts === true && version === 'simplified')
  );

  if (matchingRelease !== undefined) {
    const { binaries, installers, minors } = getDownloadTable(matchingRelease);

    return (
      <Component
        version={matchingRelease.versionWithPrefix}
        binaries={binaries}
        installers={installers}
        minors={minors}
      />
    );
  }

  return null;
};

export default WithSimplifiedDownload;
