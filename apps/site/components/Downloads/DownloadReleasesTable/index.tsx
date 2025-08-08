'use client';

import Badge from '@node-core/ui-components/Common/Badge';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import DetailsButton from '#site/components/Downloads/DownloadReleasesTable/DetailsButton';
import provideReleaseData from '#site/next-data/providers/releaseData';
import { ModalProvider } from '#site/providers/modalProvider';

import ReleaseModal from '../ReleaseModal';

const BADGE_KIND_MAP = {
  'End-of-life': 'warning',
  'Maintenance LTS': 'neutral',
  'Active LTS': 'info',
  Current: 'default',
  Pending: 'default',
} as const;

const DownloadReleasesTable: FC = () => {
  const releaseData = provideReleaseData();
  const t = useTranslations();

  return (
    <ModalProvider Component={ReleaseModal}>
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
        <tbody>
          {releaseData.map(release => (
            <tr key={release.major}>
              <td data-label="Version">v{release.major}</td>
              <td data-label="LTS">{release.codename || '-'}</td>
              <td data-label="Date">
                <FormattedTime date={release.currentStart} />
              </td>
              <td data-label="Date">
                <FormattedTime date={release.releaseDate} />
              </td>
              <td data-label="Status">
                <Badge kind={BADGE_KIND_MAP[release.status]} size="small">
                  {release.status}
                  {release.status === 'End-of-life' ? ' (EoL)' : ''}
                </Badge>
              </td>
              <td>
                <DetailsButton data={release} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ModalProvider>
  );
};

export default DownloadReleasesTable;
