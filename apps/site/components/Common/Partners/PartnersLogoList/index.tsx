'use client';

import { useEffect, useRef, useState, type FC } from 'react';

import { LOGO_PARTNERS } from '#site/next.partners.constants';
import type { PartnerCategory, Partners } from '#site/types';

import PartnerLogo from '../PartnerLogo';
import style from './index.module.css';
import { randomPartnerList } from '../utils';

type PartnersLogoListProps = {
  maxLength?: number;
  categories?: PartnerCategory;
};

const PartnersLogoList: FC<PartnersLogoListProps> = ({
  maxLength = 3,
  categories,
}) => {
  const initialRenderer = useRef(true);

  const [seedList, setSeedList] = useState<Array<Partners>>(
    LOGO_PARTNERS.slice(0, maxLength)
  );

  useEffect(() => {
    // We intentionally render the initial default "mock" list of sponsors
    // to have the Skeletons loading, and then we render the actual list
    // after an enough amount of time has passed to give a proper sense of Animation
    // We do this client-side effect, to ensure that a random-amount of sponsors is renderered
    // on every page load. Since our page is natively static, we need to ensure that
    // on the client-side we have a random amount of sponsors rendered.
    // Although whilst we are deployed on Vercel or other environment that supports ISR
    // (Incremental Static Generation) whose would invalidate the cache every 5 minutes
    // We want to ensure that this feature is compatible on a full-static environment
    const renderSponsorsAnimation = setTimeout(() => {
      initialRenderer.current = false;

      setSeedList(randomPartnerList(LOGO_PARTNERS, maxLength, 1, categories));
    }, 0);

    return () => clearTimeout(renderSponsorsAnimation);
    // We only want this to run once on initial render
    // We don't really care if the props change as realistically they shouldn't ever
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.partnersLogoList}>
      {seedList.map((partner, index) => (
        <PartnerLogo
          {...partner}
          key={index}
          loading={initialRenderer.current}
        />
      ))}
    </div>
  );
};

export default PartnersLogoList;
