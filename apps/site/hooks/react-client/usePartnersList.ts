'use client';

import { useEffect, useRef, useState } from 'react';

import { randomPartnerList } from '#site/components/Common/Partners/utils';
import type { PartnerCategory, Partners } from '#site/types/partners';

const usePartnersList = ({
  logos,
  maxLength,
  sort,
  categories,
}: {
  logos: Array<Partners>;
  maxLength: number;
  sort?: 'name' | 'weight';
  categories?: PartnerCategory;
}) => {
  const initialRenderer = useRef(true);

  const [seedList, setSeedList] = useState<Array<Partners>>(() => {
    const filteredLogos = logos.filter(
      partner => !categories || partner.categories.includes(categories)
    );

    return filteredLogos.slice(0, maxLength || filteredLogos.length);
  });

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
    const renderSponsorsAnimation = setTimeout(async () => {
      initialRenderer.current = false;

      setSeedList(
        await randomPartnerList(logos, {
          pick: maxLength,
          dateSeed: 1,
          category: categories,
          sort,
        })
      );
    }, 0);

    return () => clearTimeout(renderSponsorsAnimation);
    // We only want this to run once on initial render
    // We don't really care if the props change as realistically they shouldn't ever
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { seedList, initialRenderer };
};

export default usePartnersList;
