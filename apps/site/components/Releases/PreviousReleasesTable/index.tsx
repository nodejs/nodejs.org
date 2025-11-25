import { getTranslations } from 'next-intl/server';

import provideReleaseData from '#site/next-data/providers/releaseData';

import type { FC } from 'react';

import PreviousReleasesTableBody from './TableBody';

const PreviousReleasesTable: FC = async () => {
  const releaseData = await provideReleaseData();

  const t = await getTranslations();

  return (
    <table id="tbVersions">
      <thead>
        <tr>
          <th>{t('components.downloadReleasesTable.version')}</th>
          <th>{t('components.downloadReleasesTable.codename')}</th>
          <th>{t('components.downloadReleasesTable.firstReleased')}</th>
          <th>{t('components.downloadReleasesTable.lastUpdated')}</th>
          <th>{t('components.downloadReleasesTable.status')}</th>
          <th></th>
        </tr>
      </thead>

      <PreviousReleasesTableBody releaseData={releaseData} />
    </table>
  );
};

export default PreviousReleasesTable;
