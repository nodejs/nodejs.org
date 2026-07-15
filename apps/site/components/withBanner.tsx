'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Banner from '@node-core/ui-components/Common/Banner';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Link from '#site/components/Link';
import { siteConfig } from '#site/next.json.mjs';
import { dateIsBetween } from '#site/util/date';

import type { FC } from 'react';

const STORAGE_KEY = 'banner-dismissal';

const WithBanner: FC<{ section: string }> = ({ section }) => {
  const banner = siteConfig.websiteBanners[section];
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (banner) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setOpen(localStorage.getItem(STORAGE_KEY) !== banner.text);
    }
  }, [banner]);

  if (banner && open && dateIsBetween(banner.startDate, banner.endDate)) {
    const bannerType = banner.type || 'default';

    const onClose = () => {
      localStorage.setItem(STORAGE_KEY, banner.text);
      setOpen(false);
    };

    return (
      <Banner
        type={banner.type}
        aria-label={t(`components.banner.${bannerType}`)}
        closeButtonAriaLabel={t('components.banner.close')}
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
