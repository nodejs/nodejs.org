import {
  CalendarIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import NpmIcon from '@node-core/ui-components/Icons/PackageManager/Npm';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import type { NodeRelease } from '#site/types';

import styles from './index.module.css';
import ReleaseOverviewItem from './ReleaseOverviewItem';

type ReleaseOverviewProps = {
  release: NodeRelease;
};

const ReleaseOverview: FC<ReleaseOverviewProps> = ({ release }) => {
  const t = useTranslations();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <ReleaseOverviewItem
          Icon={CalendarIcon}
          title={<FormattedTime date={release.currentStart} />}
          subtitle={t('components.releaseOverview.firstReleased')}
        />

        <ReleaseOverviewItem
          Icon={ClockIcon}
          title={<FormattedTime date={release.releaseDate} />}
          subtitle={t('components.releaseOverview.lastUpdated')}
        />

        <ReleaseOverviewItem
          Icon={Square3Stack3DIcon}
          title={release.minorVersions.length}
          subtitle={t('components.releaseOverview.minorVersions')}
        />

        {release.modules && (
          <ReleaseOverviewItem
            Icon={CodeBracketSquareIcon}
            title={`v${release.modules}`}
            subtitle={t('components.releaseOverview.nApiVersion')}
          />
        )}

        {release.npm && (
          <ReleaseOverviewItem
            Icon={NpmIcon}
            title={`v${release.npm}`}
            subtitle={t('components.releaseOverview.npmVersion')}
          />
        )}

        <ReleaseOverviewItem
          Icon={CodeBracketSquareIcon}
          title={`v${release.v8}`}
          subtitle={t('components.releaseOverview.v8Version')}
        />
      </div>
    </div>
  );
};

export default ReleaseOverview;
