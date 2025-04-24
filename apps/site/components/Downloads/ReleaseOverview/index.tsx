import {
  CalendarIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import type { FC, ReactNode } from 'react';

import FormattedTime from '@/components/Common/FormattedTime';
import type { NodeRelease } from '@/types';

import styles from './index.module.css';

type ItemProps = {
  icon: React.JSX.Element;
  title: ReactNode;
  subtitle: ReactNode;
};

const Item: FC<ItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className={styles.item}>
      {icon}
      <div>
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

type ReleaseOverviewProps = {
  release: NodeRelease;
};

export const ReleaseOverview: FC<ReleaseOverviewProps> = ({ release }) => {
  const t = useTranslations();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Item
          icon={<CalendarIcon />}
          title={<FormattedTime date={release.currentStart} />}
          subtitle={t('components.releaseOverview.firstReleased')}
        />
        <Item
          icon={<ClockIcon />}
          title={<FormattedTime date={release.releaseDate} />}
          subtitle={t('components.releaseOverview.lastUpdated')}
        />
        <Item
          icon={<Square3Stack3DIcon />}
          title={release.minorVersions.length}
          subtitle={t('components.releaseOverview.minorVersions')}
        />
        {release.modules && (
          <Item
            icon={<CodeBracketSquareIcon />}
            title={`v${release.modules}`}
            subtitle={t('components.releaseOverview.nApiVersion')}
          />
        )}
        {release.npm && (
          <Item
            icon={<CodeBracketSquareIcon />}
            title={`v${release.npm}`}
            subtitle={t('components.releaseOverview.npmVersion')}
          />
        )}
        <Item
          icon={<CodeBracketSquareIcon />}
          title={`v${release.v8}`}
          subtitle={t('components.releaseOverview.v8Version')}
        />
      </div>
    </div>
  );
};
