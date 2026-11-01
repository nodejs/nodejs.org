'use client';

import classNames from 'classnames';

import useCarbonAd, { adColors } from '#site/hooks/useCarbonAd';

import type { FC } from 'react';

import styles from './index.module.css';

const CarbonSidebar: FC = () => {
  const { ad, ref } = useCarbonAd('CWBI6KJU', '(min-width: 1280px)');

  if (!ad) {
    return null;
  }

  return (
    <aside
      ref={ref}
      className={styles.sideBar}
      style={adColors(ad)}
      aria-label="Advertisement"
    >
      <a
        href={ad.statlink}
        target="_blank"
        rel="sponsored noopener"
        className={styles.sideBarLink}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.largeImage} alt={ad.company} className={styles.image} />
        <span className={styles.sideBarBody}>
          {ad.title && <strong>{ad.title}</strong>}
          <span>{ad.description}</span>
          <span className={styles.sideBarCta}>{ad.callToAction}</span>
        </span>
      </a>

      <a
        href={ad.ad_via_link}
        className={classNames(styles.badge, styles.overlay)}
      >
        Ad
      </a>
    </aside>
  );
};

export default CarbonSidebar;
