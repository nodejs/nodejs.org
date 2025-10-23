import type { FC } from 'react';

import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';
import { EOL_VERSION_IDENTIFIER } from '#site/next.constants.mjs';

import EOLReleaseTableInner from './TableBody';

const EOLReleaseTable: FC = async () => {
  const releaseData = await provideReleaseData();
  const vulnerabilities = await provideVulnerabilities();

  const eolReleases = releaseData.filter(
    release => release.status === EOL_VERSION_IDENTIFIER
  );

  return (
    <EOLReleaseTableInner
      eolReleases={eolReleases}
      vulnerabilities={vulnerabilities}
    />
  );
};

export default EOLReleaseTable;
