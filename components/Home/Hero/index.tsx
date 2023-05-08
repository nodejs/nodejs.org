import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';
import { useDetectOS } from '../../../hooks/useDetectOS';
import type { FC } from 'react';
import type { NodeReleaseData } from '../../../types';

type HeroProps = {
  title: string;
  subTitle?: string;
  nodeReleaseData: NodeReleaseData[];
};

const Hero: FC<HeroProps> = ({ title, subTitle, nodeReleaseData }) => {
  const { getDownloadLink } = useDetectOS();

  const currentLTS = nodeReleaseData.find(release => release.isLts);
  const currentRelease = nodeReleaseData.find(
    release => release.status === 'Current'
  );

  const ltsVersionUrl = getDownloadLink(currentLTS?.fullVersion || '');
  const currentVersionUrl = getDownloadLink(currentRelease?.fullVersion || '');
  return (
    <div className={styles.hero}>
      <h1>{title}</h1>
      <h2 className={styles.subTitle}>{subTitle}</h2>
      <div className={styles.buttonsContainer}>
        <div className={styles.downloadLtsContainer}>
          <a className={styles.downloadButton} href={ltsVersionUrl}>
            <FormattedMessage id="components.hero.downloadLts" />
            <span>
              <FormattedMessage
                id="components.hero.currentVersion"
                values={{ version: currentLTS?.fullVersion }}
              />
            </span>
          </a>
          <p className="t-caption">
            <a href={currentVersionUrl}>
              <FormattedMessage
                id="components.hero.getCurrent"
                values={{ version: currentRelease?.fullVersion }}
              />
            </a>
          </p>
        </div>
        <Link href="/learn" className={styles.downloadButtonInverse}>
          <FormattedMessage id="components.hero.learn" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
