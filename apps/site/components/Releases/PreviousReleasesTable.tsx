'use client';

import Badge from '@node-core/ui-components/Common/Badge';
import ResponsiveTable from '@node-core/ui-components/Common/ResponsiveTable';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useState } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import LinkWithArrow from '#site/components/LinkWithArrow';
import provideReleaseData from '#site/next-data/providers/releaseData';

import ReleaseModal from './ReleaseModal';

const BADGE_KIND_MAP = {
  'End-of-life': 'warning',
  'Maintenance LTS': 'neutral',
  'Active LTS': 'info',
  Current: 'default',
  Pending: 'default',
} as const;

const PreviousReleasesTable: FC = () => {
  const releaseData = provideReleaseData();

  const t = useTranslations();

  const [currentModal, setCurrentModal] = useState<string | undefined>();

  const columns = [
    { key: 'version', header: t('components.downloadReleasesTable.version') },
    { key: 'codename', header: t('components.downloadReleasesTable.codename') },
    {
      key: 'firstReleased',
      header: t('components.downloadReleasesTable.firstReleased'),
    },
    {
      key: 'lastUpdated',
      header: t('components.downloadReleasesTable.lastUpdated'),
    },
    { key: 'status', header: t('components.downloadReleasesTable.status') },
    { key: 'details', header: '' },
  ];

  const data = releaseData.map(release => ({
    version: `v${release.major}`,
    codename: release.codename || '-',
    firstReleased: <FormattedTime date={release.currentStart} />,
    lastUpdated: <FormattedTime date={release.releaseDate} />,
    status: (
      <Badge
        kind={BADGE_KIND_MAP[release.status]}
        size="small"
        className="block"
      >
        {release.status}
        {release.status === 'End-of-life' ? ' (EoL)' : ''}
      </Badge>
    ),
    details: (
      <LinkWithArrow
        className="cursor-pointer"
        onClick={() => setCurrentModal(release.version)}
      >
        {t('components.downloadReleasesTable.details')}
      </LinkWithArrow>
    ),
  }));

  return (
    <>
      <ResponsiveTable
        data={data}
        columns={columns}
        getRowId={data => data.version}
        getRowLabel={data => data.version}
      />
      {releaseData.map(release => (
        <ReleaseModal
          key={release.version}
          release={release}
          open={currentModal === release.version}
          onOpenChange={open => open || setCurrentModal(undefined)}
        />
      ))}
    </>
  );
};

export default PreviousReleasesTable;
