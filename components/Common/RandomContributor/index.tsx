import { type MutableRefObject, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import styles from './index.module.scss';
import AnimatedPlaceholder from '../AnimatedPlaceholder';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { useNodeJsContributorsApi } from '../../../hooks/useNodeJsContributorsApi';

const DefaultImageSize = 75;

const RandomContributor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const contributor = useNodeJsContributorsApi(isVisible);

  return (
    <div ref={ref} className={styles.randomContributor}>
      {!contributor && isVisible && <AnimatedPlaceholder />}
      {contributor && (
        <>
          <div className={styles.randomContributorAvatar}>
            <a
              href={contributor.profileUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Image
                src={contributor.avatarUri}
                alt="Avatar of a Node.js contributor"
                width={DefaultImageSize}
                height={DefaultImageSize}
              />
            </a>
          </div>
          <a
            href={contributor.profileUri}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <FormattedMessage
              id="components.randomContributor.thankYou"
              values={{
                contributor: contributor.login,
                amount: contributor.contributionsCount,
              }}
            />
          </a>
        </>
      )}
    </div>
  );
};

export default RandomContributor;
