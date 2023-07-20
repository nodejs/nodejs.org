import { downloadUrlByOS } from '@/util/downloadUrlByOS';
import Link from 'next/link';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDetectOS } from '@/hooks/useDetectOS';
import styles from './index.module.scss';

type HeroProps = {
  title: string;
  subTitle?: string;
  ltsVersion: string;
  currentVersion: string;
};

const Hero: FC<HeroProps> = ({
  title,
  subTitle,
  ltsVersion,
  currentVersion,
}) => {
  const userOSState = useDetectOS();

  const ltsVersionUrl = downloadUrlByOS(
    ltsVersion,
    userOSState.os,
    userOSState.bitness
  );
  const currentVersionUrl = downloadUrlByOS(
    currentVersion,
    userOSState.os,
    userOSState.bitness
  );

  return (
    <div className={styles.hero}>
      <h1>{title}</h1>
      <h2 className={styles.subTitle}>{subTitle}</h2>
      <div className={styles.buttonsContainer}>
        <div className={styles.downloadLtsContainer}>
          <a className={styles.downloadButton} href={ltsVersionUrl}>
            <FormattedMessage id="components.home.hero.downloadLts" />
            <span>
              <FormattedMessage
                id="components.home.hero.currentVersion"
                values={{ version: ltsVersion }}
              />
            </span>
          </a>
          <p className="t-caption">
            <a href={currentVersionUrl}>
              <FormattedMessage
                id="components.home.hero.getCurrent"
                values={{ version: currentVersion }}
              />
            </a>
          </p>
        </div>
        <Link href="/learn" className={styles.downloadButtonInverse}>
          <FormattedMessage id="components.home.hero.learn" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
