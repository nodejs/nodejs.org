'use client';

import type { FC } from 'react';
import { useMemo } from 'react';

import SupporterLogo from '@/components/Common/Supporters/SupporterLogo';
import type { Supporter } from '@/types';

import styles from './index.module.css';

type SupporterLogoListProps = {
  supporters: Array<Supporter>;
};

const SupporterLogoList: FC<SupporterLogoListProps> = ({ supporters }) => {
  const tiers = useMemo(() => {
    const sortedSupporters = [...supporters].sort(
      (a, b) => b.threshold - a.threshold
    );

    return sortedSupporters.reduce<Record<string, Array<Supporter>>>(
      (acc, supporter) => ({
        ...acc,
        [supporter.threshold]: [...(acc[supporter.threshold] ?? []), supporter],
      }),
      {}
    );
  }, [supporters]);

  return (
    <div className={styles.supporterLogoList}>
      {Object.keys(tiers).map((threshold, index) => (
        <div className={styles.supporterTier} key={index}>
          {tiers[threshold].map((supporter, idx) => (
            <div key={idx} className={styles.supporterLogo}>
              <SupporterLogo
                name={supporter.name}
                logo={supporter.logo}
                icon={supporter.icon}
                href={supporter.href}
                threshold={supporter.threshold}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SupporterLogoList;
