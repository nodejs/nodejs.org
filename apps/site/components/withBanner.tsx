'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Banner from '@node-core/ui-components/Common/Banner';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Link from '#site/components/Link';
import { siteConfig } from '#site/next.json.mjs';
import { BANNER_DISMISSAL_STORAGE_KEY } from '#site/util/banner';
import { dateIsBetween } from '#site/util/date';

import type { FC } from 'react';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];
  const t = useTranslations();

  const [dismissed, setDismissed] = useState(false);

  // The pre-hydration script hides a dismissed banner before the first paint.
  // This effect then synchronizes that state with React after hydration.
  useEffect(() => {
    if (banner) {
      setDismissed(
        localStorage.getItem(BANNER_DISMISSAL_STORAGE_KEY) === banner.text
      );
    }
  }, [banner]);

  if (banner && !dismissed && dateIsBetween(banner.startDate, banner.endDate)) {
    const bannerType = banner.type || 'default';

    const onClose = () => {
      localStorage.setItem(BANNER_DISMISSAL_STORAGE_KEY, banner.text);
      setDismissed(true);
    };

    return (
      <Banner
        type={banner.type}
        aria-label={t(`components.banner.${bannerType}`)}
        data-dismissible-banner=""
        onClose={onClose}
      >
        {banner.link ? (
          <Link href={banner.link}>{banner.text}</Link>
        ) : (
          banner.text
        )}
        {banner.link && <ArrowUpRightIcon />}
      </Banner>
    );
  }

  return null;
};

export default WithBanner;
