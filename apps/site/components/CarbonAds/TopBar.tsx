'use client';

import useCarbonAd, { adColors } from '#site/hooks/useCarbonAd';

import type { FC } from 'react';

import styles from './index.module.css';

const CarbonTopBar: FC = () => {
  const { ad, ref } = useCarbonAd('CWBI6KJY');

  if (!ad) {
    return null;
  }

  return (
    <aside
      ref={ref}
      className={styles.topBar}
      style={adColors(ad)}
      aria-label="Advertisement"
    >
      <a
        href={ad.statlink}
        target="_blank"
        rel="sponsored noopener"
        className={styles.topBarLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.image} alt={ad.company} className={styles.logo} />
        <span>{ad.description}</span>
        <span className={styles.cta}>{ad.callToAction}</span>
      </a>

      <a href={ad.ad_via_link} className={styles.badge}>
        Ad
      </a>
    </aside>
  );
};

export default CarbonTopBar;
