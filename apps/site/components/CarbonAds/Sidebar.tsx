'use client';

import classNames from 'classnames';

import useCarbonAd, { adColors } from '#site/hooks/useCarbonAd';
import useClientContext from '#site/hooks/useClientContext';

import type { FC } from 'react';

import styles from './index.module.css';

const CarbonSidebar: FC = () => {
  const { frontmatter } = useClientContext();

  // Must match where each layout's grid gives the MetaBar a right-hand column
  const media =
    frontmatter.layout === 'blog-post'
      ? '(min-width: 896px)'
      : '(min-width: 1280px)';

  const { ad, ref } = useCarbonAd('CWBI6KJU', media);

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
