'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import BannerContainer from '@node-core/ui-components/Common/Banner';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';
import useLocalStorage from '#site/hooks/useLocalStorage';
import { dateIsBetween } from '#site/util/date';

import type { WebsiteBanner } from '#site/types';
import type { FC } from 'react';

const STORAGE_KEY = 'banner-dismissal';

const Banner: FC<{ banner: WebsiteBanner }> = ({ banner }) => {
  const t = useTranslations();

  const [dismissed, setDismissed] = useLocalStorage(STORAGE_KEY);

  // The banner stays closed until the storage tells whether it was dismissed
  const open = dismissed !== undefined && dismissed !== banner.text;

  if (open && dateIsBetween(banner.startDate, banner.endDate)) {
    const bannerType = banner.type || 'default';

    return (
      <BannerContainer
        type={banner.type}
        aria-label={t(`components.banner.${bannerType}`)}
        closeButtonAriaLabel={t('components.banner.close')}
        onClose={() => setDismissed(banner.text)}
      >
        {banner.link ? (
          <Link href={banner.link}>{banner.text}</Link>
        ) : (
          banner.text
        )}
        {banner.link && <ArrowUpRightIcon />}
      </BannerContainer>
    );
  }

  return null;
};

export default Banner;
