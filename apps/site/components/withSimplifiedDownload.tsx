import type { FC } from 'react';

import { getClientContext } from '#site/client-context';
import getReleaseData from '#site/next-data/releaseData';
import { getDownloadTable } from '#site/util/downloadUtils';

type DownloadTable = ReturnType<typeof getDownloadTable>;

type WithSimplifiedDownloadProps = {
  children: FC<DownloadTable>;
};

const WithSimplifiedDownload: FC<WithSimplifiedDownloadProps> = async ({
  children: Component,
}) => {
  const { pathname } = getClientContext();
  const releaseData = await getReleaseData();

  const version = pathname.split('/').pop();
  const matchingRelease = releaseData.find(
    ({ major, isLts }) =>
      major === Number(version) || (isLts === true && version === 'simplified')
  );

  if (matchingRelease !== undefined) {
    const table = getDownloadTable(matchingRelease);

    return <Component {...table} />;
  }

  return null;
};

export default WithSimplifiedDownload;
