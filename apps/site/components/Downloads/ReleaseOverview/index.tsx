import {
  CalendarIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import NpmIcon from '@node-core/ui-components/Icons/PackageManager/Npm';
import { useTranslations } from 'next-intl';
import type { FC, ReactNode, SVGProps } from 'react';

import FormattedTime from '#site/components/Common/FormattedTime';
import type { NodeRelease } from '#site/types';

import styles from './index.module.css';

type ItemProps = {
  Icon: FC<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  subtitle: ReactNode;
};

const Item: FC<ItemProps> = ({ Icon, title, subtitle }) => {
  return (
    <div className={styles.item}>
      <Icon />
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
          Icon={CalendarIcon}
          title={<FormattedTime date={release.currentStart} />}
          subtitle={t('components.releaseOverview.firstReleased')}
        />
        <Item
          Icon={ClockIcon}
          title={<FormattedTime date={release.releaseDate} />}
          subtitle={t('components.releaseOverview.lastUpdated')}
        />
        <Item
          Icon={Square3Stack3DIcon}
          title={release.minorVersions.length}
          subtitle={t('components.releaseOverview.minorVersions')}
        />
        {release.modules && (
          <Item
            Icon={CodeBracketSquareIcon}
            title={`v${release.modules}`}
            subtitle={t('components.releaseOverview.nApiVersion')}
          />
        )}
        {release.npm && (
          <Item
            Icon={NpmIcon}
            title={`v${release.npm}`}
            subtitle={t('components.releaseOverview.npmVersion')}
          />
        )}
        <Item
          Icon={CodeBracketSquareIcon}
          title={`v${release.v8}`}
          subtitle={t('components.releaseOverview.v8Version')}
        />
      </div>
    </div>
  );
};
