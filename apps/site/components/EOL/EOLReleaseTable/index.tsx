import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import provideReleaseData from '#site/next-data/providers/releaseData';
import provideVulnerabilities from '#site/next-data/providers/vulnerabilities';
import { EOL_VERSION_IDENTIFIER } from '#site/next.constants.mjs';

import EOLReleaseTableBody from './TableBody';

const EOLReleaseTable: FC = async () => {
  const releaseData = await provideReleaseData();
  const vulnerabilities = await provideVulnerabilities();

  const eolReleases = releaseData.filter(
    release => release.status === EOL_VERSION_IDENTIFIER
  );

  const t = await getTranslations();

  return (
    <table id="tbVulnerabilities">
      <thead>
        <tr>
          <th>
            {t('components.eolTable.version')} (
            {t('components.eolTable.codename')})
          </th>
          <th>{t('components.eolTable.lastUpdated')}</th>
          <th>{t('components.eolTable.vulnerabilities')}</th>
          <th>{t('components.eolTable.details')}</th>
        </tr>
      </thead>

      <EOLReleaseTableBody
        eolReleases={eolReleases}
        vulnerabilities={vulnerabilities}
      />
    </table>
  );
};

export default EOLReleaseTable;
